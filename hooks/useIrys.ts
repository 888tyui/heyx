"use client";

import { useState, useCallback } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WebIrys } from "@irys/sdk";
import { getIrysBalance, getUploadPrice, fundIrys } from "@/lib/irys";

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
    if (!publicKey || !signMessage) {
      setError("Wallet not connected");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK === "devnet" ? "devnet" : "mainnet";
      const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
        (network === "devnet" ? "https://api.devnet.solana.com" : "https://api.mainnet-beta.solana.com");

      const webIrys = new WebIrys({
        network,
        token: "solana",
        wallet: {
          rpcUrl,
          name: "solana",
          provider: wallet,
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
  }, [publicKey, signMessage, signTransaction, sendTransaction, connection, wallet]);

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

  const fund = useCallback(
    async (amount: number): Promise<string | null> => {
      if (!irys) {
        setError("Irys not connected");
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const txId = await fundIrys(irys, amount);
        const bal = await getIrysBalance(irys);
        setBalance(bal);
        return txId;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fund Irys";
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [irys]
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
          console.log(`Funding Irys with ${amountToFund} SOL...`);
          await fundIrys(client, amountToFund);
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
