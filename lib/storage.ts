// API client for file storage operations
// All data is now stored in PostgreSQL via API routes

import type { StorageStats, FileMetadata, ShareLink } from "@/types";

export interface DBFile {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  arweaveTxId: string;
  irysReceiptId: string | null;
  encrypted: boolean;
  uploadedAt: string;
  userId: string;
  encryptionKey?: string | null;
  encryptionIv?: string | null;
}

// Convert DBFile to FileMetadata for frontend use
function dbFileToMetadata(dbFile: DBFile, owner: string): FileMetadata {
  return {
    id: dbFile.id,
    name: dbFile.name,
    size: dbFile.size,
    type: dbFile.mimeType,
    encrypted: dbFile.encrypted,
    arweaveId: dbFile.arweaveTxId,
    uploadedAt: dbFile.uploadedAt,
    owner,
    tags: {
      ...(dbFile.encryptionKey && { encryptionKey: dbFile.encryptionKey }),
      ...(dbFile.encryptionIv && { encryptionIv: dbFile.encryptionIv }),
    },
  };
}

export interface DBShareLink {
  id: string;
  accessKey: string;
  expiresAt: string | null;
  maxDownloads: number | null;
  downloadCount: number;
  passwordHash: string | null;
  createdAt: string;
  fileId: string;
  createdById: string;
}

// Convert DBShareLink to ShareLink for frontend use
function dbShareToShareLink(dbShare: DBShareLink): ShareLink {
  return {
    id: dbShare.id,
    fileId: dbShare.fileId,
    expiresAt: dbShare.expiresAt || undefined,
    accessCount: dbShare.downloadCount,
    maxAccess: dbShare.maxDownloads || undefined,
    createdAt: dbShare.createdAt,
    accessKey: dbShare.accessKey,
  };
}

// User Operations
export async function ensureUser(walletAddress: string): Promise<boolean> {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error ensuring user:", error);
    return false;
  }
}

// File Operations
export async function getStoredFiles(walletAddress: string): Promise<FileMetadata[]> {
  try {
    const response = await fetch(`/api/files?wallet=${encodeURIComponent(walletAddress)}`);
    if (!response.ok) {
      console.error("Failed to fetch files:", response.statusText);
      return [];
    }
    const data = await response.json();
    const files: DBFile[] = data.files || [];
    return files.map((f) => dbFileToMetadata(f, walletAddress));
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
}

export async function saveFile(
  walletAddress: string,
  file: {
    name: string;
    size: number;
    mimeType: string;
    arweaveTxId: string;
    irysReceiptId?: string;
    encrypted: boolean;
    encryptionKey?: string;
    encryptionIv?: string;
  }
): Promise<FileMetadata | null> {
  try {
    // Ensure user exists first
    await ensureUser(walletAddress);

    const response = await fetch("/api/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...file,
        walletAddress,
      }),
    });

    if (!response.ok) {
      console.error("Failed to save file:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.file ? dbFileToMetadata(data.file, walletAddress) : null;
  } catch (error) {
    console.error("Error saving file:", error);
    return null;
  }
}

export async function getFileById(
  walletAddress: string,
  fileId: string
): Promise<FileMetadata | null> {
  try {
    const response = await fetch(
      `/api/files/${fileId}?wallet=${encodeURIComponent(walletAddress)}`
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.file ? dbFileToMetadata(data.file, walletAddress) : null;
  } catch (error) {
    console.error("Error fetching file:", error);
    return null;
  }
}

export async function deleteFile(
  walletAddress: string,
  fileId: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `/api/files/${fileId}?wallet=${encodeURIComponent(walletAddress)}`,
      { method: "DELETE" }
    );
    return response.ok;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
}

// Share Link Operations
export async function getShareLinks(
  walletAddress: string,
  fileId: string
): Promise<ShareLink[]> {
  try {
    const response = await fetch(
      `/api/share/${fileId}?wallet=${encodeURIComponent(walletAddress)}`
    );
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    const shares: DBShareLink[] = data.shares || [];
    return shares.map(dbShareToShareLink);
  } catch (error) {
    console.error("Error fetching share links:", error);
    return [];
  }
}

export async function createShareLink(
  walletAddress: string,
  fileId: string,
  options?: {
    expiresAt?: string;
    maxDownloads?: number;
    password?: string;
  }
): Promise<ShareLink | null> {
  try {
    const response = await fetch("/api/share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileId,
        walletAddress,
        ...options,
      }),
    });

    if (!response.ok) {
      console.error("Failed to create share link:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.share ? dbShareToShareLink(data.share) : null;
  } catch (error) {
    console.error("Error creating share link:", error);
    return null;
  }
}

export async function getShareByAccessKey(
  accessKey: string
): Promise<{ share: ShareLink; file: FileMetadata } | null> {
  try {
    const response = await fetch(`/api/share?key=${encodeURIComponent(accessKey)}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    if (!data.share) return null;

    const dbShare: DBShareLink = data.share;
    const dbFile: DBFile = data.share.file;

    return {
      share: dbShareToShareLink(dbShare),
      file: dbFileToMetadata(dbFile, "shared"),
    };
  } catch (error) {
    console.error("Error fetching share by access key:", error);
    return null;
  }
}

export async function deleteShareLink(
  walletAddress: string,
  shareId: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `/api/share/${shareId}?wallet=${encodeURIComponent(walletAddress)}`,
      { method: "DELETE" }
    );
    return response.ok;
  } catch (error) {
    console.error("Error deleting share link:", error);
    return false;
  }
}

// Storage Stats
export async function getStorageStats(walletAddress: string): Promise<StorageStats> {
  const emptyStats: StorageStats = {
    totalFiles: 0,
    totalSize: 0,
    encryptedFiles: 0,
    recentUploads: [],
  };

  try {
    const response = await fetch(`/api/stats?wallet=${encodeURIComponent(walletAddress)}`);
    if (!response.ok) {
      return emptyStats;
    }
    const data = await response.json();
    const stats = data.stats;

    // Convert recentUploads from DBFile to FileMetadata
    return {
      ...stats,
      recentUploads: (stats.recentUploads || []).map((f: DBFile) =>
        dbFileToMetadata(f, walletAddress)
      ),
    };
  } catch (error) {
    console.error("Error fetching storage stats:", error);
    return emptyStats;
  }
}
