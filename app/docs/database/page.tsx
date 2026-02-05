"use client";
/* eslint-disable react/no-unescaped-entities */
import {
  PageHeader,
  Section,
  SectionTitle,
  SubSection,
  Paragraph,
  Lead,
  CodeBlock,
  Callout,
  Table,
  FlowDiagram,
} from "../components";
import { Database, Server, Lock, Code, Globe, Zap } from "lucide-react";

export default function DatabaseAPI() {
  return (
    <>
      <PageHeader
        badge="DATABASE & API"
        title="Database & API"
        description="How Helix stores metadata, manages user data, and provides API access—all while keeping file contents on the decentralized permaweb."
        readTime="~2 min read"
      />

      <Section>
        <Lead>
          Helix uses a hybrid storage model: file contents live permanently on
          Arweave, while metadata lives in PostgreSQL for fast queries and
          user-friendly features. This gives you the best of both worlds.
        </Lead>
      </Section>

      <SectionTitle>What We Store</SectionTitle>

      <Section>
        <Paragraph>
          Our database stores references and metadata—never file contents:
        </Paragraph>

        <div className="my-6 border border-white/10">
          <div className="grid grid-cols-3 border-b border-white/10 bg-white/5">
            <div className="p-3 text-white text-sm font-medium">Data Type</div>
            <div className="p-3 text-white text-sm font-medium border-l border-white/10">Stored In</div>
            <div className="p-3 text-white text-sm font-medium border-l border-white/10">Why</div>
          </div>
          <div className="grid grid-cols-3 border-b border-white/5">
            <div className="p-3 text-white/60 text-sm">File content (encrypted)</div>
            <div className="p-3 text-[#d4622a] text-sm border-l border-white/10">Arweave</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Permanent, decentralized</div>
          </div>
          <div className="grid grid-cols-3 border-b border-white/5">
            <div className="p-3 text-white/60 text-sm">Transaction IDs</div>
            <div className="p-3 text-blue-400 text-sm border-l border-white/10">PostgreSQL</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Fast lookup by wallet</div>
          </div>
          <div className="grid grid-cols-3 border-b border-white/5">
            <div className="p-3 text-white/60 text-sm">File metadata (encrypted names)</div>
            <div className="p-3 text-blue-400 text-sm border-l border-white/10">PostgreSQL</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Dashboard display</div>
          </div>
          <div className="grid grid-cols-3 border-b border-white/5">
            <div className="p-3 text-white/60 text-sm">Share links</div>
            <div className="p-3 text-blue-400 text-sm border-l border-white/10">PostgreSQL</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Access control</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-3 text-white/60 text-sm">Encryption keys</div>
            <div className="p-3 text-green-400 text-sm border-l border-white/10">Your Browser</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Zero-knowledge</div>
          </div>
        </div>

        <Callout type="info" title="Why PostgreSQL?">
          Arweave is permanent but slow for queries. PostgreSQL lets us provide
          instant dashboard loads, search, and filtering. If our database
          disappeared, your files would still exist on Arweave—you&apos;d just need
          to know the transaction IDs.
        </Callout>
      </Section>

      <SectionTitle>Database Schema</SectionTitle>

      <Section>
        <Paragraph>
          Our schema is designed for minimal data retention:
        </Paragraph>

        <CodeBlock title="prisma/schema.prisma">
{`// User's file records
model File {
  id              String   @id @default(cuid())
  walletAddress   String   @map("wallet_address")

  // Arweave reference
  transactionId   String   @unique @map("transaction_id")

  // Metadata (client-encrypted)
  encryptedName   String?  @map("encrypted_name")
  mimeType        String   @map("mime_type")
  size            Int

  // Encryption status
  isEncrypted     Boolean  @default(true) @map("is_encrypted")

  // Timestamps
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  // Relations
  shareLinks      ShareLink[]

  @@index([walletAddress])
  @@index([createdAt])
  @@map("files")
}

// Share links for files
model ShareLink {
  id              String    @id @default(cuid())
  fileId          String    @map("file_id")

  // Access controls
  expiresAt       DateTime? @map("expires_at")
  maxDownloads    Int?      @map("max_downloads")
  downloadCount   Int       @default(0) @map("download_count")

  // Encrypted key for sharing
  encryptedKey    String?   @map("encrypted_key")

  // Timestamps
  createdAt       DateTime  @default(now()) @map("created_at")

  // Relations
  file            File      @relation(fields: [fileId], references: [id])

  @@index([fileId])
  @@map("share_links")
}`}
        </CodeBlock>
      </Section>

      <SectionTitle>API Endpoints</SectionTitle>

      <Section>
        <Paragraph>
          Helix exposes REST API endpoints for file management:
        </Paragraph>

        <SubSection>GET /api/files</SubSection>
        <Paragraph>
          List all files for the authenticated wallet.
        </Paragraph>

        <CodeBlock title="Response">
{`{
  "files": [
    {
      "id": "clx1234...",
      "transactionId": "abc123...",
      "encryptedName": "encrypted_base64...",
      "mimeType": "application/pdf",
      "size": 1048576,
      "isEncrypted": true,
      "createdAt": "2025-02-01T12:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 20
}`}
        </CodeBlock>

        <SubSection>POST /api/files</SubSection>
        <Paragraph>
          Create a file record after Arweave upload.
        </Paragraph>

        <CodeBlock title="Request">
{`{
  "transactionId": "abc123...",
  "encryptedName": "encrypted_base64...",
  "mimeType": "application/pdf",
  "size": 1048576,
  "isEncrypted": true
}`}
        </CodeBlock>

        <SubSection>DELETE /api/files/[id]</SubSection>
        <Paragraph>
          Remove a file from your dashboard (does not delete from Arweave).
        </Paragraph>

        <Callout type="warning" title="Permanence Note">
          Deleting a file from Helix removes it from your dashboard and our
          database. The actual file remains on Arweave forever—that&apos;s the
          nature of permanent storage. Plan accordingly.
        </Callout>

        <SubSection>POST /api/share</SubSection>
        <Paragraph>
          Generate a share link for a file.
        </Paragraph>

        <CodeBlock title="Request">
{`{
  "fileId": "clx1234...",
  "expiresAt": "2025-03-01T00:00:00Z",  // Optional
  "maxDownloads": 10,                    // Optional
  "encryptedKey": "encrypted_base64..."  // For encrypted files
}`}
        </CodeBlock>

        <CodeBlock title="Response">
{`{
  "shareLink": {
    "id": "clx5678...",
    "url": "https://helix.storage/share/clx5678...",
    "expiresAt": "2025-03-01T00:00:00Z",
    "maxDownloads": 10
  }
}`}
        </CodeBlock>
      </Section>

      <SectionTitle>Authentication</SectionTitle>

      <Section>
        <Paragraph>
          API authentication uses wallet signatures—no API keys needed:
        </Paragraph>

        <FlowDiagram
          steps={[
            {
              title: "1. Request Nonce",
              description: "GET /api/auth/nonce?wallet=ABC123... → { nonce: \"random-string-12345\" }",
            },
            {
              title: "2. Sign with Wallet",
              description: "Wallet.signMessage(\"Sign in to Helix: random-string-12345\") → signature",
            },
            {
              title: "3. Verify Signature",
              description: "POST /api/auth/verify { wallet, signature, nonce } → { token: \"jwt-token...\" }",
            },
            {
              title: "4. Authenticated Requests",
              description: "GET /api/files with Authorization: Bearer jwt-token...",
            },
          ]}
        />

        <CodeBlock title="authentication.ts">
{`// Server-side signature verification
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';

export function verifySignature(
  wallet: string,
  message: string,
  signature: string
): boolean {
  const publicKey = new PublicKey(wallet);
  const messageBytes = new TextEncoder().encode(message);
  const signatureBytes = Buffer.from(signature, 'base64');

  return nacl.sign.detached.verify(
    messageBytes,
    signatureBytes,
    publicKey.toBytes()
  );
}`}
        </CodeBlock>

        <Callout type="tip" title="No Passwords">
          Your wallet is your login. No passwords to remember, no accounts to
          create, no email verification. Connect your wallet and you&apos;re
          authenticated.
        </Callout>
      </Section>

      <SectionTitle>Data Lifecycle</SectionTitle>

      <Section>
        <FlowDiagram
          steps={[
            {
              title: "Upload",
              description: "File → Encrypt → Upload to Arweave → Save metadata to PostgreSQL → arweave.net/{txId}",
            },
            {
              title: "Access",
              description: "Dashboard → Query PostgreSQL → Get Transaction IDs → Fetch from Arweave → Decrypt in browser",
            },
            {
              title: "Delete from Dashboard",
              description: "Remove from PostgreSQL (File persists on Arweave - permanent by design)",
            },
            {
              title: "Share",
              description: "Create ShareLink in PostgreSQL → Include encrypted key if needed → Recipient accesses via share URL",
            },
          ]}
        />
      </Section>

      <SectionTitle>Rate Limits</SectionTitle>

      <Section>
        <Paragraph>
          To ensure fair usage, API endpoints have rate limits:
        </Paragraph>

        <Table
          headers={["Endpoint", "Limit", "Window"]}
          rows={[
            ["GET /api/files", "100 requests", "1 minute"],
            ["POST /api/files", "30 requests", "1 minute"],
            ["POST /api/share", "20 requests", "1 minute"],
            ["GET /api/auth/nonce", "10 requests", "1 minute"],
          ]}
        />

        <Paragraph>
          Rate limits are per-wallet. If you hit a limit, wait for the window
          to reset. Response headers include remaining quota:
        </Paragraph>

        <CodeBlock>
{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1706803200`}
        </CodeBlock>
      </Section>
    </>
  );
}
