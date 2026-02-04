"use client";

import { useState, useCallback } from "react";
import {
  encryptFile,
  decryptFile,
  exportKey,
  ivToBase64,
} from "@/lib/encryption";
import type { EncryptionResult } from "@/types";

interface EncryptedFileData {
  data: ArrayBuffer;
  iv: string;
  key: string;
}

interface UseEncryptionReturn {
  isEncrypting: boolean;
  isDecrypting: boolean;
  error: string | null;
  encrypt: (file: File) => Promise<EncryptedFileData | null>;
  decrypt: (data: ArrayBuffer, iv: string, key: string) => Promise<ArrayBuffer | null>;
}

export function useEncryption(): UseEncryptionReturn {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const encrypt = useCallback(async (file: File): Promise<EncryptedFileData | null> => {
    setIsEncrypting(true);
    setError(null);

    try {
      const result: EncryptionResult = await encryptFile(file);

      return {
        data: result.encryptedData,
        iv: ivToBase64(result.iv),
        key: result.exportedKey,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Encryption failed";
      setError(message);
      return null;
    } finally {
      setIsEncrypting(false);
    }
  }, []);

  const decrypt = useCallback(
    async (data: ArrayBuffer, iv: string, key: string): Promise<ArrayBuffer | null> => {
      setIsDecrypting(true);
      setError(null);

      try {
        return await decryptFile(data, iv, key);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Decryption failed";
        setError(message);
        return null;
      } finally {
        setIsDecrypting(false);
      }
    },
    []
  );

  return {
    isEncrypting,
    isDecrypting,
    error,
    encrypt,
    decrypt,
  };
}
