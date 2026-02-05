"use client";

import { useState, useCallback } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WebIrys } from "@irys/sdk";
import { getIrysBalance, getUploadPrice } from "@/lib/irys";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

interface UseIrysReturn {
  irys: WebIrys | null;
  isLoading: boolean;
  error: string | null;
  balance: number;
  connect: () => Promise<WebIrys | null>;
  getPrice: (bytes: number) => Promise<number>;
  fund: (amount: number) => Promise<string | null>;
  refreshBalance: () => Promise<void>;
  checkAndFund: (bytes: number) => Promise<boolean>;
}

export function useIrys(): UseIrysReturn {
  const wallet = useWallet();
  const { publicKey, signMessage, signTransaction, sendTransaction } = wallet;
  const { connection } = useConnection();
  const [irys, setIrys] = useState<WebIrys | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  const connect = useCallback(async (): Promise<WebIrys | null> => {
    if (!publicKey || !signMessage || !signTransaction || !sendTransaction) {
      setError("Wallet not connected or missing required methods");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK === "devnet" ? "devnet" : "mainnet";
      const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
        (network === "devnet" ? "https://api.devnet.solana.com" : "https://api.mainnet-beta.solana.com");

      // Create a custom provider that overrides Irys SDK's skipPreflight: true
      // to allow Phantom to properly simulate transactions
      // See: https://docs.phantom.com/developer-powertools/domain-and-transaction-warnings
      const customProvider = {
        publicKey,
        signMessage,
        signTransaction,
        signAllTransactions: wallet.signAllTransactions,
        // Override sendTransaction to fix Irys SDK's skipPreflight: true
        // Irys SDK hardcodes skipPreflight: true which prevents Phantom from simulating
        sendTransaction: async (
          tx: Parameters<typeof sendTransaction>[0],
          conn: Parameters<typeof sendTransaction>[1],
          opts?: Parameters<typeof sendTransaction>[2]
        ) => {
          // Override skipPreflight to false to allow Phantom simulation
          // This helps avoid "malicious dApp" warnings
          return await sendTransaction(tx, conn, {
            ...opts,
            skipPreflight: false,
            preflightCommitment: "confirmed",
            maxRetries: 3,
          });
        },
      };

      const webIrys = new WebIrys({
        network,
        token: "solana",
        wallet: {
          rpcUrl,
          name: "solana",
          provider: customProvider,
        },
      });

      await webIrys.ready();
      setIrys(webIrys);

      const bal = await getIrysBalance(webIrys);
      setBalance(bal);

      return webIrys;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to connect to Irys";
      setError(message);
      console.error("Irys connection error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, signMessage, signTransaction, sendTransaction, connection]);

  const getPrice = useCallback(
    async (bytes: number): Promise<number> => {
      if (!irys) {
        const connected = await connect();
        if (!connected) return 0;
        return await getUploadPrice(connected, bytes);
      }
      return await getUploadPrice(irys, bytes);
    },
    [irys, connect]
  );

  // Get Irys bundler address for direct SOL transfer
  const getBundlerAddress = useCallback(async (client: WebIrys): Promise<string> => {
    const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK === "devnet" ? "devnet" : "mainnet";
    const baseUrl = network === "devnet"
      ? "https://devnet.irys.xyz"
      : "https://node1.irys.xyz";

    const response = await fetch(`${baseUrl}/info`);
    const info = await response.json();
    return info.addresses.solana;
  }, []);

  // Direct SOL transfer to Irys bundler (avoids Phantom warnings)
  const fundWithDirectTransfer = useCallback(
    async (amount: number): Promise<string | null> => {
      if (!publicKey || !signTransaction || !connection) {
        setError("Wallet not connected");
        return null;
      }

      let client = irys;
      if (!client) {
        client = await connect();
        if (!client) return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Get Irys bundler address
        const bundlerAddress = await getBundlerAddress(client);
        console.log("Irys bundler address:", bundlerAddress);

        // Create a simple SOL transfer transaction
        const lamports = Math.ceil(amount * LAMPORTS_PER_SOL);
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(bundlerAddress),
            lamports,
          })
        );

        // Get recent blockhash
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey;

        // Sign the transaction (Phantom will show a normal SOL transfer)
        const signedTx = await signTransaction(transaction);

        // Send the signed transaction
        const txId = await connection.sendRawTransaction(signedTx.serialize(), {
          skipPreflight: false,
          preflightCommitment: "confirmed",
        });

        // Wait for confirmation
        await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature: txId,
        }, "confirmed");

        console.log("Fund transaction confirmed:", txId);

        // Wait a bit for Irys to recognize the deposit
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Refresh balance
        const bal = await getIrysBalance(client);
        setBalance(bal);

        return txId;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fund Irys";
        setError(message);
        console.error("Direct fund error:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [irys, publicKey, signTransaction, connection, connect, getBundlerAddress]
  );

  const fund = useCallback(
    async (amount: number): Promise<string | null> => {
      // Use direct transfer instead of Irys SDK fund
      return fundWithDirectTransfer(amount);
    },
    [fundWithDirectTransfer]
  );

  const refreshBalance = useCallback(async (): Promise<void> => {
    if (irys) {
      const bal = await getIrysBalance(irys);
      setBalance(bal);
    }
  }, [irys]);

  const checkAndFund = useCallback(
    async (bytes: number): Promise<boolean> => {
      let client = irys;
      if (!client) {
        client = await connect();
        if (!client) return false;
      }

      try {
        const price = await getUploadPrice(client, bytes);
        const currentBalance = await getIrysBalance(client);
        setBalance(currentBalance);

        if (currentBalance < price) {
          // Fund with a little extra (10% buffer)
          const amountToFund = (price - currentBalance) * 1.1;
          console.log(`Funding Irys with ${amountToFund} SOL via direct transfer...`);

          // Use direct SOL transfer instead of Irys SDK
          const txId = await fundWithDirectTransfer(amountToFund);
          if (!txId) {
            throw new Error("Failed to fund Irys");
          }

          const newBalance = await getIrysBalance(client);
          setBalance(newBalance);
        }

        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to check/fund balance";
        setError(message);
        console.error("Check and fund error:", err);
        return false;
      }
    },
    [irys, connect]
  );

  return {
    irys,
    isLoading,
    error,
    balance,
    connect,
    getPrice,
    fund,
    refreshBalance,
    checkAndFund,
  };
}
