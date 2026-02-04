"use client";

import { useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useIrys } from "./useIrys";
import { useEncryption } from "./useEncryption";
import { saveFile } from "@/lib/storage";
import type { FileMetadata, UploadProgress } from "@/types";

interface UploadOptions {
  encrypt?: boolean;
  tags?: Record<string, string>;
}

interface UseFileUploadReturn {
  progress: UploadProgress;
  upload: (file: File, options?: UploadOptions) => Promise<FileMetadata | null>;
  reset: () => void;
}

export function useFileUpload(): UseFileUploadReturn {
  const { publicKey } = useWallet();
  const { irys, connect } = useIrys();
  const { encrypt } = useEncryption();

  const [progress, setProgress] = useState<UploadProgress>({
    status: "idle",
    progress: 0,
    message: "",
  });

  const reset = useCallback(() => {
    setProgress({
      status: "idle",
      progress: 0,
      message: "",
    });
  }, []);

  const upload = useCallback(
    async (file: File, options: UploadOptions = {}): Promise<FileMetadata | null> => {
      if (!publicKey) {
        setProgress({
          status: "error",
          progress: 0,
          message: "Wallet not connected",
          error: "Please connect your wallet first",
        });
        return null;
      }

      const walletAddress = publicKey.toBase58();

      try {
        // Connect to Irys if not already connected
        let irysClient = irys;
        if (!irysClient) {
          setProgress({
            status: "uploading",
            progress: 10,
            message: "Connecting to Irys...",
          });
          irysClient = await connect();
          if (!irysClient) {
            throw new Error("Failed to connect to Irys");
          }
        }

        let dataToUpload: Buffer;
        let encryptionKey: string | undefined;
        let encryptionIv: string | undefined;

        // Encrypt if requested
        if (options.encrypt) {
          setProgress({
            status: "encrypting",
            progress: 20,
            message: "Encrypting file...",
          });

          const encrypted = await encrypt(file);
          if (!encrypted) {
            throw new Error("Encryption failed");
          }

          dataToUpload = Buffer.from(encrypted.data);
          encryptionKey = encrypted.key;
          encryptionIv = encrypted.iv;
        } else {
          dataToUpload = Buffer.from(await file.arrayBuffer());
        }

        // Prepare tags
        const tags = [
          { name: "Content-Type", value: options.encrypt ? "application/octet-stream" : file.type },
          { name: "App-Name", value: "Helix" },
          { name: "File-Name", value: file.name },
          { name: "Encrypted", value: options.encrypt ? "true" : "false" },
        ];

        if (options.tags) {
          Object.entries(options.tags).forEach(([name, value]) => {
            tags.push({ name, value });
          });
        }

        // Upload to Irys
        setProgress({
          status: "uploading",
          progress: 50,
          message: "Uploading to Arweave via Irys...",
        });

        const receipt = await irysClient.upload(dataToUpload, { tags });

        setProgress({
          status: "confirming",
          progress: 80,
          message: "Saving to database...",
          txId: receipt.id,
        });

        // Save to database via API
        const savedFile = await saveFile(walletAddress, {
          name: file.name,
          size: file.size,
          mimeType: file.type || "application/octet-stream",
          arweaveTxId: receipt.id,
          irysReceiptId: receipt.id,
          encrypted: options.encrypt || false,
          encryptionKey,
          encryptionIv,
        });

        if (!savedFile) {
          throw new Error("Failed to save file to database");
        }

        setProgress({
          status: "complete",
          progress: 100,
          message: "Upload complete!",
          txId: receipt.id,
        });

        return savedFile;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Upload failed";
        setProgress({
          status: "error",
          progress: 0,
          message: "Upload failed",
          error: message,
        });
        return null;
      }
    },
    [publicKey, irys, connect, encrypt]
  );

  return {
    progress,
    upload,
    reset,
  };
}
