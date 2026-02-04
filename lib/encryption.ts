import type { EncryptionResult, DecryptionParams } from "@/types";

const ALGORITHM = "AES-GCM";
const KEY_LENGTH = 256;
const IV_LENGTH = 12;

export async function generateEncryptionKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: ALGORITHM,
      length: KEY_LENGTH,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function exportKey(key: CryptoKey): Promise<string> {
  const exportedKey = await crypto.subtle.exportKey("raw", key);
  const bytes = new Uint8Array(exportedKey);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function importKey(keyString: string): Promise<CryptoKey> {
  const binaryString = atob(keyString);
  const keyData = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    keyData[i] = binaryString.charCodeAt(i);
  }
  return await crypto.subtle.importKey(
    "raw",
    keyData.buffer as ArrayBuffer,
    { name: ALGORITHM, length: KEY_LENGTH },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encryptFile(file: File): Promise<EncryptionResult> {
  const key = await generateEncryptionKey();
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const fileBuffer = await file.arrayBuffer();

  const encryptedData = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv: iv.buffer as ArrayBuffer },
    key,
    fileBuffer
  );

  const exportedKey = await exportKey(key);

  return {
    encryptedData,
    iv,
    key,
    exportedKey,
  };
}

export async function encryptData(
  data: ArrayBuffer,
  key: CryptoKey
): Promise<{ encryptedData: ArrayBuffer; iv: Uint8Array }> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

  const encryptedData = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv: iv.buffer as ArrayBuffer },
    key,
    data
  );

  return { encryptedData, iv };
}

export async function decryptData({
  encryptedData,
  iv,
  key,
}: DecryptionParams): Promise<ArrayBuffer> {
  return await crypto.subtle.decrypt(
    { name: ALGORITHM, iv: iv.buffer as ArrayBuffer },
    key,
    encryptedData
  );
}

export async function decryptFile(
  encryptedData: ArrayBuffer,
  ivBase64: string,
  keyString: string
): Promise<ArrayBuffer> {
  const key = await importKey(keyString);
  const binaryString = atob(ivBase64);
  const iv = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    iv[i] = binaryString.charCodeAt(i);
  }

  return await decryptData({ encryptedData, iv, key });
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer as ArrayBuffer;
}

export function ivToBase64(iv: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < iv.length; i++) {
    binary += String.fromCharCode(iv[i]);
  }
  return btoa(binary);
}
