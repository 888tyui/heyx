import type { FileMetadata, ShareLink, StorageStats } from "@/types";

const FILES_KEY = "helix_files";
const SHARES_KEY = "helix_shares";

// File Storage
export function getStoredFiles(walletAddress: string): FileMetadata[] {
  if (typeof window === "undefined") return [];

  const key = `${FILES_KEY}_${walletAddress}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function saveFile(walletAddress: string, file: FileMetadata): void {
  const files = getStoredFiles(walletAddress);
  files.unshift(file);
  localStorage.setItem(`${FILES_KEY}_${walletAddress}`, JSON.stringify(files));
}

export function getFileById(walletAddress: string, fileId: string): FileMetadata | null {
  const files = getStoredFiles(walletAddress);
  return files.find((f) => f.id === fileId) || null;
}

export function deleteFile(walletAddress: string, fileId: string): void {
  const files = getStoredFiles(walletAddress);
  const filtered = files.filter((f) => f.id !== fileId);
  localStorage.setItem(`${FILES_KEY}_${walletAddress}`, JSON.stringify(filtered));
}

export function updateFile(walletAddress: string, fileId: string, updates: Partial<FileMetadata>): void {
  const files = getStoredFiles(walletAddress);
  const index = files.findIndex((f) => f.id === fileId);
  if (index !== -1) {
    files[index] = { ...files[index], ...updates };
    localStorage.setItem(`${FILES_KEY}_${walletAddress}`, JSON.stringify(files));
  }
}

// Share Links
export function getShareLinks(walletAddress: string): ShareLink[] {
  if (typeof window === "undefined") return [];

  const key = `${SHARES_KEY}_${walletAddress}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function createShareLink(walletAddress: string, share: ShareLink): void {
  const shares = getShareLinks(walletAddress);
  shares.unshift(share);
  localStorage.setItem(`${SHARES_KEY}_${walletAddress}`, JSON.stringify(shares));
}

export function getShareById(walletAddress: string, shareId: string): ShareLink | null {
  const shares = getShareLinks(walletAddress);
  return shares.find((s) => s.id === shareId) || null;
}

export function deleteShareLink(walletAddress: string, shareId: string): void {
  const shares = getShareLinks(walletAddress);
  const filtered = shares.filter((s) => s.id !== shareId);
  localStorage.setItem(`${SHARES_KEY}_${walletAddress}`, JSON.stringify(filtered));
}

export function incrementShareAccess(walletAddress: string, shareId: string): void {
  const shares = getShareLinks(walletAddress);
  const index = shares.findIndex((s) => s.id === shareId);
  if (index !== -1) {
    shares[index].accessCount += 1;
    localStorage.setItem(`${SHARES_KEY}_${walletAddress}`, JSON.stringify(shares));
  }
}

// Storage Stats
export function getStorageStats(walletAddress: string): StorageStats {
  const files = getStoredFiles(walletAddress);

  return {
    totalFiles: files.length,
    totalSize: files.reduce((acc, f) => acc + f.size, 0),
    encryptedFiles: files.filter((f) => f.encrypted).length,
    recentUploads: files.slice(0, 5),
  };
}

// Clear all data for a wallet
export function clearWalletData(walletAddress: string): void {
  localStorage.removeItem(`${FILES_KEY}_${walletAddress}`);
  localStorage.removeItem(`${SHARES_KEY}_${walletAddress}`);
}
