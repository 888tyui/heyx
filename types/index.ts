export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  encrypted: boolean;
  arweaveId: string;
  uploadedAt: string;
  owner: string;
  tags?: Record<string, string>;
}

export interface UploadedFile extends FileMetadata {
  downloadUrl: string;
  shareUrl?: string;
}

export interface ShareLink {
  id: string;
  fileId: string;
  accessKey?: string;
  expiresAt?: string;
  accessCount: number;
  maxAccess?: number;
  password?: string;
  createdAt: string;
}

export interface StorageStats {
  totalFiles: number;
  totalSize: number;
  encryptedFiles: number;
  recentUploads: FileMetadata[];
}

export interface UploadProgress {
  status: "idle" | "encrypting" | "uploading" | "confirming" | "complete" | "error";
  progress: number;
  message: string;
  txId?: string;
  error?: string;
}

export interface EncryptionResult {
  encryptedData: ArrayBuffer;
  iv: Uint8Array;
  key: CryptoKey;
  exportedKey: string;
}

export interface DecryptionParams {
  encryptedData: ArrayBuffer;
  iv: Uint8Array;
  key: CryptoKey;
}

export type SolanaNetwork = "mainnet-beta" | "devnet" | "testnet";

export interface IrysConfig {
  network: "mainnet" | "devnet";
  token: "solana";
  rpcUrl?: string;
}
