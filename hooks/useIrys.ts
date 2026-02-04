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
}

export function useIrys(): UseIrysReturn {
  const { publicKey, signMessage } = useWallet();
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

      const webIrys = new WebIrys({
        network,
        token: "solana",
        wallet: {
          provider: {
            publicKey,
            signMessage,
            connection,
          },
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
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, signMessage, connection]);

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

  return {
    irys,
    isLoading,
    error,
    balance,
    connect,
    getPrice,
    fund,
    refreshBalance,
  };
}
