import { WebIrys } from "@irys/sdk";
import type { IrysConfig } from "@/types";

let irysInstance: WebIrys | null = null;

// Get custom RPC URL or default
function getRpcUrl(): string {
  const customRpc = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;
  if (customRpc) return customRpc;

  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "mainnet-beta";
  if (network === "devnet") {
    return "https://api.devnet.solana.com";
  }
  return "https://api.mainnet-beta.solana.com";
}

export async function getIrys(wallet: { publicKey: { toBase58(): string }; signMessage?: (message: Uint8Array) => Promise<Uint8Array> }): Promise<WebIrys> {
  if (irysInstance) {
    return irysInstance;
  }

  const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK === "devnet" ? "devnet" : "mainnet") as IrysConfig["network"];
  const rpcUrl = getRpcUrl();

  const irys = new WebIrys({
    network,
    token: "solana",
    wallet: {
      provider: wallet,
      rpcUrl,
    },
  });

  await irys.ready();
  irysInstance = irys;

  return irys;
}

export async function getIrysBalance(irys: WebIrys): Promise<number> {
  const balance = await irys.getLoadedBalance();
  return irys.utils.fromAtomic(balance).toNumber();
}

export async function fundIrys(irys: WebIrys, amount: number): Promise<string> {
  // Convert to atomic units and ensure it's an integer
  const atomicAmount = irys.utils.toAtomic(amount);
  const integerAmount = Math.ceil(atomicAmount.toNumber());

  // Fund with multiplier to ensure sufficient balance
  // This helps avoid multiple transaction warnings from Phantom
  const fundTx = await irys.fund(integerAmount, 1.0);
  return fundTx.id;
}

export async function getUploadPrice(irys: WebIrys, bytes: number): Promise<number> {
  const price = await irys.getPrice(bytes);
  return irys.utils.fromAtomic(price).toNumber();
}

export async function uploadData(
  irys: WebIrys,
  data: Buffer | Uint8Array,
  tags: { name: string; value: string }[] = []
): Promise<string> {
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const receipt = await irys.upload(buffer, { tags });
  return receipt.id;
}

export async function uploadFile(
  irys: WebIrys,
  file: File,
  tags: { name: string; value: string }[] = []
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return await uploadData(irys, buffer, tags);
}

export function getArweaveUrl(txId: string): string {
  return `https://arweave.net/${txId}`;
}

export function resetIrysInstance(): void {
  irysInstance = null;
}

export async function checkAndFundIfNeeded(
  irys: WebIrys,
  requiredBytes: number
): Promise<{ needsFunding: boolean; price: number; balance: number }> {
  const price = await getUploadPrice(irys, requiredBytes);
  const balance = await getIrysBalance(irys);

  return {
    needsFunding: balance < price,
    price,
    balance,
  };
}
