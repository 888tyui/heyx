import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import type { SolanaNetwork } from "@/types";

export function getConnection(network: SolanaNetwork = "mainnet-beta"): Connection {
  const endpoint = network === "mainnet-beta"
    ? process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(network)
    : clusterApiUrl(network);

  return new Connection(endpoint, "confirmed");
}

export function isValidPublicKey(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

export async function getBalance(
  connection: Connection,
  publicKey: PublicKey
): Promise<number> {
  const balance = await connection.getBalance(publicKey);
  return balance / 1e9; // Convert lamports to SOL
}

export async function getSolPrice(): Promise<number> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    const data = await response.json();
    return data.solana.usd;
  } catch {
    return 0;
  }
}

export function lamportsToSol(lamports: number): number {
  return lamports / 1e9;
}

export function solToLamports(sol: number): number {
  return Math.floor(sol * 1e9);
}

export const NETWORKS: { label: string; value: SolanaNetwork }[] = [
  { label: "Mainnet", value: "mainnet-beta" },
  { label: "Devnet", value: "devnet" },
  { label: "Testnet", value: "testnet" },
];
