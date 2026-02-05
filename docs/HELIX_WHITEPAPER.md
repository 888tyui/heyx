# Helix Technical Documentation

**Decentralized Permanent Storage Platform on Solana**

Version 1.0 | February 2025

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Solution Overview](#3-solution-overview)
4. [System Architecture](#4-system-architecture)
5. [Core Technologies](#5-core-technologies)
6. [Upload Flow & Data Lifecycle](#6-upload-flow--data-lifecycle)
7. [Encryption & Security](#7-encryption--security)
8. [Database Schema & API](#8-database-schema--api)
9. [File Sharing System](#9-file-sharing-system)
10. [Cost Structure](#10-cost-structure)
11. [Use Cases](#11-use-cases)
12. [Future Roadmap](#12-future-roadmap)

---

## 1. Executive Summary

Helix는 Solana 블록체인과 Arweave 영구 저장소를 결합한 탈중앙화 파일 저장 플랫폼입니다. 사용자는 지갑 연결만으로 파일을 영구적으로 저장하고, 선택적으로 클라이언트 사이드 암호화를 적용하여 프라이버시를 보장받을 수 있습니다.

### Key Features

| Feature | Description |
|---------|-------------|
| **Permanent Storage** | Arweave에 저장된 데이터는 최소 200년 이상 보존 |
| **Client-Side Encryption** | AES-256-GCM 암호화로 서버도 데이터 열람 불가 |
| **Wallet-Based Auth** | 이메일/비밀번호 없이 Solana 지갑으로 인증 |
| **Shareable Links** | 암호화된 파일도 안전하게 공유 가능 |
| **One-Time Payment** | 월 구독 없이 저장 비용 1회 지불 |

### Technical Stack

```
Frontend:     Next.js 14 (App Router) + TypeScript
Styling:      Tailwind CSS + Framer Motion
Blockchain:   Solana (wallet authentication)
Storage:      Arweave via Irys SDK
Encryption:   Web Crypto API (AES-256-GCM)
Database:     PostgreSQL + Prisma ORM
Deployment:   Railway
```

---

## 2. Problem Statement

### 2.1 중앙화된 클라우드 스토리지의 한계

현재 대부분의 클라우드 스토리지 서비스(Google Drive, Dropbox, AWS S3)는 다음과 같은 근본적인 문제를 가지고 있습니다:

#### 데이터 주권 상실

```
┌─────────────────────────────────────────────────────────┐
│                    Traditional Cloud                     │
├─────────────────────────────────────────────────────────┤
│  User → Upload → Company Server → Company Controls Data │
│                                                         │
│  - 서비스 종료 시 데이터 손실                              │
│  - 약관 변경으로 접근 제한 가능                            │
│  - 정부/기관 요청 시 데이터 제공                           │
│  - 서버 해킹 시 전체 데이터 유출                           │
└─────────────────────────────────────────────────────────┘
```

**실제 사례:**
- 2023년 Google, 2년간 비활성 계정 데이터 삭제 정책 시행
- 2022년 AWS S3 버킷 설정 오류로 수백만 건 데이터 노출
- 다수의 클라우드 서비스 돌연 종료로 사용자 데이터 손실

#### 지속적인 비용 부담

```javascript
// Traditional Cloud: Recurring Monthly Cost
const monthlyCost = storageGB * pricePerGB; // $0.02-0.10/GB/month
const yearlyCost = monthlyCost * 12;
const decadeCost = yearlyCost * 10; // 10년간 지속 지불

// Example: 100GB for 10 years
// AWS S3: ~$276 (recurring)
// Google Drive: ~$240 (recurring)
```

### 2.2 기존 탈중앙화 스토리지의 문제점

IPFS, Filecoin 등 기존 솔루션의 한계:

| 솔루션 | 문제점 |
|--------|--------|
| **IPFS** | 영구성 미보장 (pinning 필요), 복잡한 노드 운영 |
| **Filecoin** | 높은 최소 저장 용량, 복잡한 deal 과정 |
| **Storj** | 중앙화된 게이트웨이 의존 |

### 2.3 AI 시대의 새로운 요구사항

```
┌─────────────────────────────────────────────────────────┐
│              AI Model Storage Requirements               │
├─────────────────────────────────────────────────────────┤
│  • 대용량 파일 (수 GB ~ 수백 GB)                          │
│  • 모델 가중치의 변조 방지 (무결성)                        │
│  • 장기 보존 (연구 재현성)                                │
│  • 선택적 공개/비공개                                     │
│  • 버전 관리 및 출처 증명                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Solution Overview

### 3.1 Helix의 접근 방식

Helix는 **"Upload Once, Store Forever"** 철학을 기반으로 설계되었습니다.

```
┌─────────────────────────────────────────────────────────┐
│                      Helix Flow                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐  │
│  │  User    │───▶│  Helix   │───▶│    Arweave       │  │
│  │  Wallet  │    │  Client  │    │  (Permanent)     │  │
│  └──────────┘    └──────────┘    └──────────────────┘  │
│       │               │                   │            │
│       │               ▼                   │            │
│       │         ┌──────────┐              │            │
│       │         │  Irys    │◀─────────────┘            │
│       │         │  Network │   (payment relay)        │
│       │         └──────────┘                          │
│       │               │                               │
│       └───────────────┘                               │
│         (SOL payment)                                 │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### 3.2 핵심 가치 제안

#### 1. 영구 저장 (Permanent Storage)

Arweave의 **Permaweb** 기술을 활용:

```javascript
// Arweave's Endowment Model
const ARWEAVE_STORAGE_COST = {
  // One-time payment covers 200+ years of storage
  mechanism: "Storage Endowment",

  // Cost decreases over time due to:
  // 1. Kryder's Law (storage cost -30% yearly)
  // 2. Endowment interest accumulation

  guarantee: "Data replicated across global nodes",
  immutability: "Content-addressed (txId = hash)",
};
```

#### 2. 진정한 데이터 소유권

```typescript
// Traditional: Platform controls access
const traditionalAccess = {
  owner: "Platform",
  userRole: "Tenant",
  risks: ["account suspension", "policy changes", "shutdown"],
};

// Helix: User controls access
const helixAccess = {
  owner: "User (wallet holder)",
  control: "Cryptographic keys",
  access: "Direct Arweave URL (no intermediary)",
  risks: ["key loss only"],
};
```

#### 3. 클라이언트 사이드 암호화

```typescript
// Encryption happens in browser - server never sees plaintext
const encryptionFlow = {
  location: "Browser (client-side)",
  algorithm: "AES-256-GCM",
  keyDerivation: "Generated per-file",
  serverKnowledge: "Zero (encrypted blob only)",
};
```

---

## 4. System Architecture

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Next.js   │  │   Solana    │  │     Web Crypto API      │ │
│  │   Frontend  │  │   Wallet    │  │  (AES-256-GCM)          │ │
│  │             │  │   Adapter   │  │                         │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘ │
│         │                │                      │               │
└─────────┼────────────────┼──────────────────────┼───────────────┘
          │                │                      │
          ▼                ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Next.js API Routes                     │   │
│  │  /api/files    /api/share    /api/stats    /api/users   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Prisma ORM                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
└──────────────────────────────┼──────────────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   PostgreSQL    │  │      Irys       │  │    Arweave      │
│   (Metadata)    │  │   (Payment)     │  │   (Storage)     │
│                 │  │                 │  │                 │
│  - File info    │  │  - SOL → AR     │  │  - Permanent    │
│  - Share links  │  │  - Bundling     │  │  - Immutable    │
│  - User data    │  │  - Fast upload  │  │  - Replicated   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 4.2 Component Breakdown

#### Frontend Components

```
components/
├── layout/
│   ├── Header.tsx          # Navigation, wallet connection
│   └── Footer.tsx          # Links, branding
├── landing/
│   ├── Hero.tsx            # Main value proposition
│   ├── Features.tsx        # Feature showcase
│   └── HowItWorks.tsx      # Step-by-step guide
├── upload/
│   ├── FileDropzone.tsx    # Drag & drop interface
│   └── UploadProgress.tsx  # Real-time progress
├── dashboard/
│   ├── FileList.tsx        # User's files
│   └── StorageStats.tsx    # Usage statistics
└── wallet/
    └── WalletButton.tsx    # Phantom/Solflare connect
```

#### Custom Hooks

```typescript
// hooks/useFileUpload.ts - Orchestrates the entire upload process
export function useFileUpload(): UseFileUploadReturn {
  const { publicKey } = useWallet();
  const { irys, connect, checkAndFund } = useIrys();
  const { encrypt } = useEncryption();

  const upload = async (file: File, options: UploadOptions) => {
    // 1. Connect to Irys
    // 2. Encrypt (optional)
    // 3. Check balance & fund
    // 4. Upload to Arweave
    // 5. Save metadata to DB
  };
}

// hooks/useIrys.ts - Irys SDK wrapper
export function useIrys(): UseIrysReturn {
  // connect, fund, getBalance, checkAndFund
}

// hooks/useEncryption.ts - Web Crypto API wrapper
export function useEncryption(): UseEncryptionReturn {
  // encrypt, decrypt, generateKey
}
```

### 4.3 Data Flow Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                     FILE UPLOAD FLOW                            │
└────────────────────────────────────────────────────────────────┘

User selects file
       │
       ▼
┌──────────────────┐
│ 1. File Reading  │  ArrayBuffer loaded into memory
└────────┬─────────┘
         │
         ▼
┌──────────────────┐     ┌─────────────────────────────────┐
│ 2. Encryption?   │────▶│ Yes: AES-256-GCM encryption     │
└────────┬─────────┘     │      Key generated, IV created  │
         │               │      Output: encrypted blob     │
         │               └─────────────────────────────────┘
         ▼
┌──────────────────┐
│ 3. Irys Connect  │  signMessage for authentication
└────────┬─────────┘
         │
         ▼
┌──────────────────┐     ┌─────────────────────────────────┐
│ 4. Balance Check │────▶│ Insufficient: Fund transaction  │
└────────┬─────────┘     │              (SOL → Irys node)  │
         │               └─────────────────────────────────┘
         ▼
┌──────────────────┐
│ 5. Upload        │  Data + tags → Irys → Arweave
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 6. Save Metadata │  txId, encryption info → PostgreSQL
└────────┬─────────┘
         │
         ▼
    Upload Complete
    (Arweave TX ID returned)
```

---

## 5. Core Technologies

### 5.1 Arweave: The Permaweb

Arweave는 "pay once, store forever" 모델을 구현한 블록체인 기반 영구 저장소입니다.

#### Blockweave Structure

```
Traditional Blockchain:
Block₁ ← Block₂ ← Block₃ ← Block₄  (linear chain)

Arweave Blockweave:
Block₁ ◀─────────────────────────┐
   ↑                              │
Block₂ ◀──────────┐               │
   ↑               │              │
Block₃ ◀───┐       │              │
   ↑        │      │              │
Block₄ ────┴──────┴──────────────┘
        (recall block references)
```

#### SPoRA (Succinct Proofs of Random Access)

```javascript
// Miners must prove they store historical data
const sporaConsensus = {
  requirement: "Store random chunks of entire weave",
  verification: "Prove access to recalled block data",
  incentive: "More data stored = higher mining reward",
  result: "Natural replication across network",
};
```

### 5.2 Irys: The Upload Layer

Irys(구 Bundlr)는 Arweave 업로드를 최적화하는 레이어입니다.

#### Why Irys?

```typescript
// Direct Arweave upload problems:
const directUpload = {
  minWait: "~2 minutes for block confirmation",
  payment: "Requires AR tokens",
  complexity: "Transaction construction",
};

// Irys advantages:
const irysUpload = {
  speed: "Instant upload, guaranteed inclusion",
  payment: "SOL, ETH, MATIC, and more",
  simplicity: "Simple SDK",
  bundling: "Multiple files in one transaction",
};
```

#### Irys Integration Code

```typescript
// lib/irys.ts
import { WebIrys } from "@irys/sdk";

export async function getIrys(wallet: WalletAdapter): Promise<WebIrys> {
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK === "devnet"
    ? "devnet"
    : "mainnet";

  const webIrys = new WebIrys({
    network,
    token: "solana",
    wallet: {
      rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
      name: "solana",
      provider: wallet,
    },
  });

  await webIrys.ready();
  return webIrys;
}

// Upload with tags for discoverability
export async function uploadData(
  irys: WebIrys,
  data: Buffer,
  tags: { name: string; value: string }[]
): Promise<string> {
  const receipt = await irys.upload(data, { tags });
  return receipt.id; // Arweave transaction ID
}
```

### 5.3 Solana Wallet Integration

#### Wallet Adapter Setup

```typescript
// providers/WalletProvider.tsx
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

const wallets = [
  new PhantomWalletAdapter(),
  // Additional wallets...
];

export function SolanaWalletProvider({ children }: Props) {
  return (
    <ConnectionProvider endpoint={rpcUrl}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
```

#### Authentication Flow

```
┌─────────────┐                    ┌─────────────┐
│   Browser   │                    │   Phantom   │
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       │  1. Request connect              │
       │─────────────────────────────────▶│
       │                                  │
       │  2. User approves                │
       │◀─────────────────────────────────│
       │                                  │
       │  3. Public key received          │
       │◀─────────────────────────────────│
       │                                  │
       │  4. signMessage (Irys auth)      │
       │─────────────────────────────────▶│
       │                                  │
       │  5. Signature returned           │
       │◀─────────────────────────────────│
       │                                  │
```

---

## 6. Upload Flow & Data Lifecycle

### 6.1 Complete Upload Sequence

```typescript
// hooks/useFileUpload.ts - Simplified flow
async function upload(file: File, options: UploadOptions) {
  // Step 1: Connect to Irys (requires signMessage)
  const irysClient = await connect();

  // Step 2: Optional encryption
  let dataToUpload: Buffer;
  let encryptionKey: string | undefined;

  if (options.encrypt) {
    const encrypted = await encrypt(file);
    dataToUpload = Buffer.from(encrypted.data);
    encryptionKey = encrypted.key;
  } else {
    dataToUpload = Buffer.from(await file.arrayBuffer());
  }

  // Step 3: Prepare Arweave tags
  const tags = [
    { name: "Content-Type", value: file.type },
    { name: "App-Name", value: "Helix" },
    { name: "File-Name", value: file.name },
    { name: "Encrypted", value: options.encrypt ? "true" : "false" },
  ];

  // Step 4: Check balance and fund if needed
  const price = await irysClient.getPrice(dataToUpload.length);
  const balance = await irysClient.getLoadedBalance();

  if (balance < price) {
    await irysClient.fund(price - balance);
  }

  // Step 5: Upload to Arweave via Irys
  const receipt = await irysClient.upload(dataToUpload, { tags });

  // Step 6: Save metadata to database
  await saveFile(walletAddress, {
    name: file.name,
    size: file.size,
    arweaveTxId: receipt.id,
    encrypted: options.encrypt,
    encryptionKey,
  });

  return receipt.id;
}
```

### 6.2 Data Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LIFECYCLE                              │
└─────────────────────────────────────────────────────────────────┘

Phase 1: Upload
───────────────
  User → Browser → Irys → Arweave miners

  Timeline: Seconds to minutes
  Status: Pending confirmation

Phase 2: Confirmation
───────────────────────
  Arweave block confirmation (~2 min)
  Data distributed to multiple nodes

  Timeline: ~2-20 minutes
  Status: Confirmed, propagating

Phase 3: Replication
────────────────────
  SPoRA incentivizes storage across network
  Minimum 3x replication typical

  Timeline: Hours to days
  Status: Fully replicated

Phase 4: Permanent Storage
──────────────────────────
  Data served from nearest node
  Endowment covers ongoing costs

  Timeline: 200+ years
  Status: Permanent
```

### 6.3 File Retrieval

```typescript
// Retrieve file from Arweave
const getArweaveUrl = (txId: string): string => {
  return `https://arweave.net/${txId}`;
};

// For encrypted files, client-side decryption required
async function downloadAndDecrypt(
  txId: string,
  encryptionKey: string,
  encryptionIv: string
): Promise<ArrayBuffer> {
  // 1. Fetch encrypted data from Arweave
  const response = await fetch(getArweaveUrl(txId));
  const encryptedData = await response.arrayBuffer();

  // 2. Import the encryption key
  const key = await importKey(encryptionKey);

  // 3. Decrypt in browser
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: hexToBytes(encryptionIv) },
    key,
    encryptedData
  );

  return decrypted;
}
```

---

## 7. Encryption & Security

### 7.1 Client-Side Encryption Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                 ZERO-KNOWLEDGE ENCRYPTION                        │
└─────────────────────────────────────────────────────────────────┘

          Browser (Client)              │         Server
                                        │
   ┌─────────────────────┐              │
   │   Original File     │              │
   │   (plaintext)       │              │
   └──────────┬──────────┘              │
              │                         │
              ▼                         │
   ┌─────────────────────┐              │
   │   Generate Key      │              │
   │   (AES-256)         │              │
   │   Generate IV       │              │
   │   (12 bytes random) │              │
   └──────────┬──────────┘              │
              │                         │
              ▼                         │
   ┌─────────────────────┐              │    ┌─────────────────┐
   │   AES-GCM Encrypt   │─────────────────▶│  Encrypted Blob │
   │                     │              │    │  (unreadable)   │
   └──────────┬──────────┘              │    └─────────────────┘
              │                         │
              ▼                         │
   ┌─────────────────────┐              │
   │   Key stored        │              │
   │   locally or shown  │              │
   │   to user           │              │
   └─────────────────────┘              │
                                        │
   Server NEVER sees:                   │
   - Original file content              │
   - Encryption key                     │
   - Decrypted data                     │
```

### 7.2 Encryption Implementation

```typescript
// hooks/useEncryption.ts
export function useEncryption() {
  const encrypt = async (file: File): Promise<EncryptionResult | null> => {
    try {
      // Generate a random 256-bit key
      const key = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true, // extractable
        ["encrypt", "decrypt"]
      );

      // Generate random IV (12 bytes for GCM)
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // Read file as ArrayBuffer
      const fileData = await file.arrayBuffer();

      // Encrypt
      const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        fileData
      );

      // Export key for storage/sharing
      const exportedKey = await crypto.subtle.exportKey("raw", key);
      const keyString = bytesToHex(new Uint8Array(exportedKey));
      const ivString = bytesToHex(iv);

      return {
        data: encryptedData,
        key: keyString,
        iv: ivString,
      };
    } catch (error) {
      console.error("Encryption failed:", error);
      return null;
    }
  };

  const decrypt = async (
    encryptedData: ArrayBuffer,
    keyHex: string,
    ivHex: string
  ): Promise<ArrayBuffer | null> => {
    try {
      const keyBytes = hexToBytes(keyHex);
      const iv = hexToBytes(ivHex);

      const key = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );

      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
      );

      return decrypted;
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  };

  return { encrypt, decrypt };
}
```

### 7.3 Security Properties

#### AES-256-GCM Characteristics

| Property | Description |
|----------|-------------|
| **Key Size** | 256 bits (32 bytes) - resistant to brute force |
| **Mode** | GCM (Galois/Counter Mode) |
| **Authentication** | Built-in integrity check (GMAC) |
| **IV** | 12 bytes, random per encryption |
| **Security Level** | 128-bit equivalent security |

#### Threat Model

```typescript
const securityGuarantees = {
  // What we protect against:
  serverCompromise: "Server only sees encrypted blobs",
  networkSnooping: "HTTPS + encrypted content",
  arweavePublic: "Encrypted data is publicly stored but unreadable",

  // User responsibilities:
  keyManagement: "User must securely store encryption key",
  walletSecurity: "Wallet private key must be protected",

  // Not protected:
  clientCompromise: "If browser is compromised, keys can be stolen",
  keyLoss: "Lost key = unrecoverable data",
};
```

### 7.4 Key Management Best Practices

```
┌─────────────────────────────────────────────────────────────────┐
│                    KEY MANAGEMENT OPTIONS                        │
└─────────────────────────────────────────────────────────────────┘

Option 1: User-Managed
─────────────────────
  - Key displayed to user after encryption
  - User stores key externally (password manager, paper)
  - Maximum security, user responsibility

Option 2: Wallet-Derived (Future)
─────────────────────────────────
  - Derive key from wallet signature
  - Same wallet can always decrypt
  - Trade-off: wallet compromise = data compromise

Option 3: Threshold Encryption (Future)
──────────────────────────────────────
  - Split key into N shares
  - M of N required to decrypt
  - Social recovery possible
```

---

## 8. Database Schema & API

### 8.1 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User: Linked to Solana wallet
model User {
  id            String      @id @default(cuid())
  walletAddress String      @unique
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  files         File[]
  shareLinks    ShareLink[]

  @@index([walletAddress])
}

// File: Metadata for uploaded files
model File {
  id            String      @id @default(cuid())
  name          String
  size          BigInt
  mimeType      String
  arweaveTxId   String      @unique
  irysReceiptId String?

  // Encryption fields
  encrypted     Boolean     @default(false)
  encryptionKey String?     // Stored only if user opts in
  encryptionIv  String?

  uploadedAt    DateTime    @default(now())

  // Relations
  userId        String
  user          User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  shareLinks    ShareLink[]

  @@index([userId])
  @@index([arweaveTxId])
}

// ShareLink: Shareable access to files
model ShareLink {
  id            String      @id @default(cuid())
  accessKey     String      @unique @default(cuid())

  expiresAt     DateTime?   // Optional expiration
  maxDownloads  Int?        // Optional download limit
  downloadCount Int         @default(0)
  passwordHash  String?     // Optional password protection

  createdAt     DateTime    @default(now())

  // Relations
  fileId        String
  file          File        @relation(fields: [fileId], references: [id], onDelete: Cascade)
  createdById   String
  createdBy     User        @relation(fields: [createdById], references: [id], onDelete: Cascade)

  @@index([accessKey])
  @@index([fileId])
}
```

### 8.2 API Routes

#### Files API

```typescript
// app/api/files/route.ts

// GET /api/files?wallet=<address>
// Returns all files for a wallet
export async function GET(request: NextRequest) {
  const walletAddress = request.nextUrl.searchParams.get("wallet");

  const user = await prisma.user.findUnique({
    where: { walletAddress },
    include: { files: { orderBy: { uploadedAt: "desc" } } },
  });

  return NextResponse.json({ files: user?.files || [] });
}

// POST /api/files
// Create new file record
export async function POST(request: NextRequest) {
  const { name, size, mimeType, arweaveTxId, encrypted, walletAddress } =
    await request.json();

  const user = await prisma.user.upsert({
    where: { walletAddress },
    update: {},
    create: { walletAddress },
  });

  const file = await prisma.file.create({
    data: {
      name,
      size: BigInt(size),
      mimeType,
      arweaveTxId,
      encrypted,
      userId: user.id,
    },
  });

  return NextResponse.json({ file });
}
```

#### Share API

```typescript
// app/api/share/route.ts

// GET /api/share?key=<accessKey>
// Public endpoint for accessing shared files
export async function GET(request: NextRequest) {
  const accessKey = request.nextUrl.searchParams.get("key");

  const shareLink = await prisma.shareLink.findUnique({
    where: { accessKey },
    include: { file: true },
  });

  if (!shareLink) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Check expiration
  if (shareLink.expiresAt && new Date() > shareLink.expiresAt) {
    return NextResponse.json({ error: "Expired" }, { status: 410 });
  }

  // Check download limit
  if (shareLink.maxDownloads &&
      shareLink.downloadCount >= shareLink.maxDownloads) {
    return NextResponse.json({ error: "Limit reached" }, { status: 410 });
  }

  // Increment download count
  await prisma.shareLink.update({
    where: { id: shareLink.id },
    data: { downloadCount: { increment: 1 } },
  });

  return NextResponse.json({ share: shareLink });
}

// POST /api/share
// Create share link
export async function POST(request: NextRequest) {
  const { fileId, walletAddress, expiresAt, maxDownloads } =
    await request.json();

  // Verify file ownership
  const file = await prisma.file.findFirst({
    where: { id: fileId, user: { walletAddress } },
    include: { user: true },
  });

  if (!file) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const shareLink = await prisma.shareLink.create({
    data: {
      fileId,
      createdById: file.user.id,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      maxDownloads,
    },
  });

  return NextResponse.json({ share: shareLink });
}
```

### 8.3 API Response Examples

```javascript
// GET /api/files?wallet=ABC123...
{
  "files": [
    {
      "id": "clx1234...",
      "name": "model-weights.safetensors",
      "size": 4294967296,
      "mimeType": "application/octet-stream",
      "arweaveTxId": "ar_tx_123...",
      "encrypted": true,
      "uploadedAt": "2025-02-05T10:30:00.000Z"
    }
  ]
}

// GET /api/stats?wallet=ABC123...
{
  "stats": {
    "totalFiles": 15,
    "totalSize": 10737418240,
    "encryptedFiles": 8,
    "recentUploads": [...]
  }
}

// POST /api/share
{
  "share": {
    "id": "clx5678...",
    "accessKey": "share_abc123xyz",
    "expiresAt": "2025-03-05T00:00:00.000Z",
    "maxDownloads": 10,
    "downloadCount": 0
  }
}
```

---

## 9. File Sharing System

### 9.1 Share Link Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     SHARING FLOW                                 │
└─────────────────────────────────────────────────────────────────┘

Owner                           Recipient
  │                                │
  │  1. Create share link          │
  │  ┌──────────────────────┐      │
  │  │ POST /api/share      │      │
  │  │ {fileId, options}    │      │
  │  └──────────┬───────────┘      │
  │             │                  │
  │  2. Get accessKey              │
  │  ◀──────────┘                  │
  │                                │
  │  3. Share URL                  │
  │  ─────────────────────────────▶│
  │  https://helix.app/share/xyz   │
  │                                │
  │                                │  4. Access shared file
  │                                │  ┌──────────────────────┐
  │                                │  │ GET /api/share?key=  │
  │                                │  └──────────┬───────────┘
  │                                │             │
  │                                │  5. File metadata +
  │                                │     Arweave URL
  │                                │  ◀──────────┘
  │                                │
  │                                │  6. Download from Arweave
  │                                │  ┌──────────────────────┐
  │                                │  │ arweave.net/txId     │
  │                                │  └──────────────────────┘
```

### 9.2 Share Link Options

```typescript
interface ShareLinkOptions {
  // Time-based expiration
  expiresAt?: Date;

  // Download count limit
  maxDownloads?: number;

  // Password protection (future)
  password?: string;

  // Encryption key inclusion (future)
  // For encrypted files, optionally embed key
  includeKey?: boolean;
}

// Example: Create a limited share
const shareLink = await createShareLink(walletAddress, fileId, {
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  maxDownloads: 5,
});

// Generated URL
const shareUrl = `https://helix.app/share/${shareLink.accessKey}`;
```

### 9.3 Share Page UI

```typescript
// app/share/[key]/page.tsx
export default function SharePage() {
  const [file, setFile] = useState<FileMetadata | null>(null);
  const [share, setShare] = useState<ShareLink | null>(null);

  useEffect(() => {
    async function loadShare() {
      const result = await getShareByAccessKey(accessKey);
      if (result) {
        setShare(result.share);
        setFile(result.file);
      }
    }
    loadShare();
  }, [accessKey]);

  return (
    <div>
      <h1>{file?.name}</h1>
      <p>Size: {formatBytes(file?.size)}</p>
      <p>Uploaded: {formatDate(file?.uploadedAt)}</p>

      {file?.encrypted && (
        <Warning>
          This file is encrypted. You need the decryption key.
        </Warning>
      )}

      <DownloadButton href={getArweaveUrl(file?.arweaveId)} />

      {share?.maxDownloads && (
        <p>Downloads: {share.downloadCount} / {share.maxDownloads}</p>
      )}
    </div>
  );
}
```

---

## 10. Cost Structure

### 10.1 Arweave Storage Costs

```
┌─────────────────────────────────────────────────────────────────┐
│                    STORAGE COST MODEL                            │
└─────────────────────────────────────────────────────────────────┘

Arweave Endowment Pricing (as of 2025):
───────────────────────────────────────

  1 KB   ≈ $0.000005
  1 MB   ≈ $0.005
  1 GB   ≈ $5.00
  100 GB ≈ $500 (one-time, permanent)

Comparison with Traditional Cloud (10-year TCO):
────────────────────────────────────────────────

  100 GB on AWS S3:     ~$276  (recurring annually)
  100 GB on Arweave:    ~$500  (one-time, permanent)

  Break-even: ~2 years
  After 2 years: Arweave is cheaper
  After 10 years: Arweave is 5x cheaper
  After 50 years: Arweave is essentially free
```

### 10.2 Transaction Cost Breakdown

```typescript
// Real cost calculation example
const uploadCostBreakdown = {
  file: "10MB PDF document",

  // Irys/Arweave storage cost
  storageCost: 0.00005, // SOL (≈ $0.01)

  // Solana transaction fees
  fundingTx: 0.000005, // SOL

  // Total
  totalCost: 0.000055, // SOL (≈ $0.011)

  // This covers PERMANENT storage
  duration: "200+ years",
};
```

### 10.3 Cost Optimization

```typescript
// Bundling multiple files reduces per-file cost
const bundlingBenefit = {
  singleUpload: {
    files: 1,
    baseCost: 0.00001, // SOL overhead
    storageCost: 0.00005,
    total: 0.00006,
  },

  bundledUpload: {
    files: 10,
    baseCost: 0.00001, // Same overhead
    storageCost: 0.0005,
    total: 0.00051,
    perFile: 0.000051, // 15% cheaper per file
  },
};
```

---

## 11. Use Cases

### 11.1 AI Model Storage

```typescript
// Store ML model weights permanently
const aiModelUseCase = {
  problem: "Model versioning and reproducibility",

  solution: {
    // Upload model with metadata tags
    tags: [
      { name: "Model-Name", value: "llama-3-8b-instruct" },
      { name: "Version", value: "1.0.0" },
      { name: "Framework", value: "PyTorch" },
      { name: "Training-Date", value: "2025-01-15" },
      { name: "Checkpoint", value: "final" },
    ],

    benefits: [
      "Immutable version history",
      "Cryptographic proof of existence",
      "No model hosting costs",
      "Always reproducible",
    ],
  },
};
```

### 11.2 Research Data Archival

```typescript
const researchUseCase = {
  scenario: "University research dataset preservation",

  requirements: {
    permanence: "Data must outlive researchers",
    integrity: "No tampering possible",
    citation: "Stable URL for papers",
    cost: "One-time grant expenditure",
  },

  helixSolution: {
    upload: "Dataset + methodology + code",
    result: "Permanent Arweave TX ID",
    citation: "arweave.net/txId",
    guarantee: "200+ year preservation",
  },
};
```

### 11.3 NFT Metadata & Assets

```typescript
const nftUseCase = {
  problem: "NFT metadata on IPFS can disappear",

  // Traditional NFT metadata
  traditional: {
    metadata: "ipfs://QmXyz...",
    risk: "IPFS pin expires → 404",
  },

  // Helix-backed NFT
  permanent: {
    metadata: "ar://abc123...",
    image: "ar://def456...",
    guarantee: "Truly permanent on-chain art",
  },
};
```

### 11.4 Legal Document Storage

```typescript
const legalUseCase = {
  documents: [
    "Contracts",
    "Patents",
    "Intellectual Property",
    "Corporate Records",
  ],

  requirements: {
    tamperProof: true,
    timestamped: true,
    longTermAccess: true,
    privacyOption: true,
  },

  helixFeatures: {
    immutability: "Arweave guarantees no modification",
    timestamp: "Block timestamp = proof of existence",
    encryption: "Client-side AES-256-GCM",
    sharing: "Controlled access via share links",
  },
};
```

### 11.5 Personal Data Vault

```typescript
const personalVaultUseCase = {
  data: [
    "Family photos",
    "Important documents",
    "Digital inheritance",
    "Medical records",
  ],

  benefits: {
    permanence: "Outlives any company",
    ownership: "Your keys, your data",
    privacy: "Encrypted, only you can read",
    accessibility: "Global CDN via Arweave gateways",
  },

  example: {
    scenario: "Store family photos for generations",
    cost: "~$5 per GB, one-time",
    duration: "Available for your grandchildren",
  },
};
```

---

## 12. Future Roadmap

### Phase 1: Foundation (Current)
- [x] Solana wallet integration
- [x] Irys/Arweave upload
- [x] Client-side encryption
- [x] PostgreSQL metadata storage
- [x] Basic file sharing

### Phase 2: Enhanced Features (Q2 2025)
- [ ] Folder organization
- [ ] Batch upload
- [ ] Download with decryption
- [ ] Password-protected shares
- [ ] File preview (images, PDFs)

### Phase 3: Advanced Security (Q3 2025)
- [ ] Wallet-derived encryption keys
- [ ] Threshold encryption (social recovery)
- [ ] Hardware wallet support
- [ ] End-to-end encrypted sharing

### Phase 4: Ecosystem (Q4 2025)
- [ ] API for developers
- [ ] SDK release
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)

### Phase 5: Decentralization (2026)
- [ ] IPFS backup layer
- [ ] Decentralized metadata storage
- [ ] DAO governance
- [ ] Token economics (optional)

---

## Appendix A: Environment Variables

```bash
# .env.local

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://your-rpc-url.com

# Database
DATABASE_URL=postgresql://user:pass@host:5432/helix

# Optional: Analytics, etc.
NEXT_PUBLIC_APP_URL=https://helix.app
```

## Appendix B: Deployment Checklist

```markdown
## Pre-Deployment
- [ ] Environment variables set
- [ ] Database migrated (prisma db push)
- [ ] RPC endpoint configured
- [ ] Domain configured

## Post-Deployment
- [ ] Wallet connection tested
- [ ] Upload flow tested
- [ ] Share link tested
- [ ] SSL certificate valid
```

## Appendix C: Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Wallet won't connect | Popup blocked | Allow popups for domain |
| Upload fails | Insufficient SOL | Fund wallet with SOL |
| "Malicious dapp" warning | New domain | Normal for new dapps |
| Slow upload | Large file | Expected, Arweave confirmation takes time |
| Can't decrypt | Wrong key | Verify encryption key is correct |

---

**Document Version:** 1.0.0
**Last Updated:** February 2025
**Authors:** Helix Team

---

*This document is stored permanently on Arweave.*
