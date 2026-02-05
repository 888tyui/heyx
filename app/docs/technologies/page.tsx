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
  FeatureGrid,
  FeatureCard,
} from "../components";
import { Cpu, Database, Lock, Globe, Zap, Server, Code, Layers } from "lucide-react";

export default function CoreTechnologies() {
  return (
    <>
      <PageHeader
        badge="TECHNOLOGIES"
        title="Core Technologies"
        description="The building blocks of Helix—battle-tested technologies chosen for reliability, security, and long-term viability."
        readTime="~3 min read"
      />

      <Section>
        <Lead>
          Every technology in the Helix stack was chosen deliberately. We
          prioritize proven, well-maintained tools over cutting-edge
          experiments. When you're building for permanence, stability matters
          more than novelty.
        </Lead>
      </Section>

      <SectionTitle>Frontend Stack</SectionTitle>

      <Section>
        <SubSection>Next.js 14</SubSection>
        <Paragraph>
          Next.js provides the foundation for our application—a React framework
          with server-side rendering, API routes, and excellent developer
          experience. Version 14 introduces the stable App Router with React
          Server Components.
        </Paragraph>

        <Table
          headers={["Feature", "Benefit for Helix"]}
          rows={[
            ["App Router", "Clean URL structure, nested layouts for docs/dashboard"],
            ["Server Components", "Reduced client bundle, faster initial load"],
            ["API Routes", "Backend logic without separate server deployment"],
            ["Edge Runtime", "Low-latency responses globally"],
          ]}
        />

        <SubSection>Tailwind CSS</SubSection>
        <Paragraph>
          Utility-first CSS that compiles to minimal production bundles. Our
          design system is built on Tailwind's constraint-based approach,
          ensuring visual consistency across the application.
        </Paragraph>

        <CodeBlock title="tailwind.config.ts">
{`// Custom design tokens
const config = {
  theme: {
    extend: {
      colors: {
        helix: {
          orange: '#d4622a',
          dark: '#0a0a0a',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};`}
        </CodeBlock>

        <SubSection>Framer Motion</SubSection>
        <Paragraph>
          Production-ready animation library for React. We use it sparingly—
          subtle transitions that enhance usability without distracting from
          functionality.
        </Paragraph>
      </Section>

      <SectionTitle>Blockchain Stack</SectionTitle>

      <Section>
        <FeatureGrid>
          <FeatureCard
            icon={Zap}
            title="Solana Web3.js"
            description="Official Solana JavaScript SDK for wallet connections, transaction building, and network interaction."
          />
          <FeatureCard
            icon={Lock}
            title="Wallet Adapter"
            description="Unified interface for connecting multiple Solana wallets—Phantom, Solflare, Backpack, and more."
          />
          <FeatureCard
            icon={Database}
            title="Irys SDK"
            description="TypeScript SDK for uploading data to Arweave with Solana payments and instant availability."
          />
          <FeatureCard
            icon={Globe}
            title="Arweave Protocol"
            description="The permanent storage layer—decentralized, immutable, and economically sustainable."
          />
        </FeatureGrid>

        <SubSection>Solana Integration</SubSection>
        <Paragraph>
          Solana serves as our identity and payment layer. The wallet adapter
          provides a consistent experience regardless of which wallet the user
          prefers.
        </Paragraph>

        <CodeBlock title="wallet-adapter-setup.ts">
{`import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';

const network = WalletAdapterNetwork.Mainnet;
const endpoint = useMemo(() => clusterApiUrl(network), [network]);

const wallets = useMemo(() => [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
  new TorusWalletAdapter(),
], []);

// Wrap application
<ConnectionProvider endpoint={endpoint}>
  <WalletProvider wallets={wallets} autoConnect>
    <WalletModalProvider>
      {children}
    </WalletModalProvider>
  </WalletProvider>
</ConnectionProvider>`}
        </CodeBlock>

        <SubSection>Irys Integration</SubSection>
        <Paragraph>
          Irys connects Solana wallets to Arweave storage. It handles the
          complexity of cross-chain operations, providing a simple upload API
          while ensuring permanent storage.
        </Paragraph>

        <CodeBlock title="irys-client.ts">
{`import { WebIrys } from '@irys/sdk';

export async function getIrysClient(wallet: WalletContextState) {
  const irys = new WebIrys({
    network: "mainnet",  // Production network
    token: "solana",     // Pay with SOL
    wallet: {
      rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
      name: "solana",
      provider: wallet,  // Full wallet adapter object
    },
  });

  await irys.ready();
  return irys;
}

// Get upload cost in SOL
export async function getUploadPrice(irys: WebIrys, bytes: number) {
  const price = await irys.getPrice(bytes);
  return irys.utils.fromAtomic(price);
}

// Fund Irys balance for uploads
export async function fundIrys(irys: WebIrys, amount: number) {
  const atomicAmount = irys.utils.toAtomic(amount);
  const intAmount = Math.ceil(atomicAmount.toNumber());
  const tx = await irys.fund(intAmount);
  return tx.id;
}`}
        </CodeBlock>

        <Callout type="info" title="Network Configuration">
          Helix operates on Solana mainnet and Irys mainnet. This ensures real
          economic incentives align with storage permanence—devnet tokens have
          no value, so devnet storage has no guarantees.
        </Callout>
      </Section>

      <SectionTitle>Security Stack</SectionTitle>

      <Section>
        <SubSection>Web Crypto API</SubSection>
        <Paragraph>
          We use the browser's native Web Crypto API for all encryption
          operations. This provides hardware-accelerated, audited cryptographic
          primitives without external dependencies.
        </Paragraph>

        <Table
          headers={["Algorithm", "Usage", "Key Size"]}
          rows={[
            ["AES-GCM", "File encryption", "256 bits"],
            ["PBKDF2", "Key derivation (if password-based)", "N/A"],
            ["SHA-256", "Content hashing", "256 bits"],
            ["ECDSA", "Transaction signing (via wallet)", "256 bits"],
          ]}
        />

        <CodeBlock title="encryption.ts">
{`// Generate a random encryption key
export async function generateKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,  // Extractable (for storage)
    ['encrypt', 'decrypt']
  );
}

// Encrypt file data
export async function encryptFile(
  data: ArrayBuffer,
  key: CryptoKey
): Promise<{ encrypted: ArrayBuffer; iv: Uint8Array }> {
  // Generate random IV for each encryption
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  return { encrypted, iv };
}

// Decrypt file data
export async function decryptFile(
  encrypted: ArrayBuffer,
  key: CryptoKey,
  iv: Uint8Array
): Promise<ArrayBuffer> {
  return crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encrypted
  );
}

// Export key for storage (base64)
export async function exportKey(key: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey('raw', key);
  return btoa(String.fromCharCode(...new Uint8Array(exported)));
}`}
        </CodeBlock>

        <Callout type="tip" title="Why AES-GCM?">
          AES-GCM provides both confidentiality and authenticity. The
          authentication tag ensures data hasn't been tampered with, and the
          mode is NIST-approved and widely audited. It's the same encryption
          used by TLS 1.3.
        </Callout>
      </Section>

      <SectionTitle>Infrastructure Stack</SectionTitle>

      <Section>
        <SubSection>PostgreSQL</SubSection>
        <Paragraph>
          PostgreSQL stores metadata, user preferences, and share links. File
          content never touches our database—only references to Arweave
          transactions and encrypted metadata.
        </Paragraph>

        <CodeBlock title="prisma/schema.prisma">
{`model File {
  id            String   @id @default(cuid())
  walletAddress String   @map("wallet_address")

  // Arweave reference (public, permanent)
  transactionId String   @unique @map("transaction_id")

  // Metadata (encrypted client-side)
  encryptedName String?  @map("encrypted_name")
  mimeType      String   @map("mime_type")
  size          Int

  // Client-side encryption status
  isEncrypted   Boolean  @default(true) @map("is_encrypted")

  createdAt     DateTime @default(now()) @map("created_at")

  @@index([walletAddress])
  @@map("files")
}

model ShareLink {
  id            String    @id @default(cuid())
  fileId        String    @map("file_id")

  // Access controls
  expiresAt     DateTime? @map("expires_at")
  maxDownloads  Int?      @map("max_downloads")
  downloadCount Int       @default(0) @map("download_count")

  // The shared encryption key (encrypted with share password)
  encryptedKey  String?   @map("encrypted_key")

  createdAt     DateTime  @default(now()) @map("created_at")

  file          File      @relation(fields: [fileId], references: [id])

  @@map("share_links")
}`}
        </CodeBlock>

        <SubSection>Railway Deployment</SubSection>
        <Paragraph>
          Railway provides simple, scalable deployment with managed PostgreSQL.
          Environment variables are injected automatically, and deployments
          happen on every git push.
        </Paragraph>

        <CodeBlock title="railway.json">
{`{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}`}
        </CodeBlock>
      </Section>

      <SectionTitle>Technology Selection Criteria</SectionTitle>

      <Section>
        <Paragraph>
          Every technology in our stack meets these criteria:
        </Paragraph>

        <div className="my-6 space-y-4">
          <div className="flex items-start gap-4 p-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              1
            </div>
            <div>
              <p className="text-white font-medium">Proven Track Record</p>
              <p className="text-white/50 text-sm mt-1">
                Minimum 3 years in production use, with clear maintenance history
                and active development.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              2
            </div>
            <div>
              <p className="text-white font-medium">Open Source</p>
              <p className="text-white/50 text-sm mt-1">
                All core dependencies are open source, auditable, and not
                dependent on a single company's continued operation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              3
            </div>
            <div>
              <p className="text-white font-medium">Security Audited</p>
              <p className="text-white/50 text-sm mt-1">
                Cryptographic implementations are formally verified or widely
                audited. No rolling our own crypto.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              4
            </div>
            <div>
              <p className="text-white font-medium">Active Community</p>
              <p className="text-white/50 text-sm mt-1">
                Strong ecosystem with regular updates, good documentation, and
                responsive maintainers.
              </p>
            </div>
          </div>
        </div>

        <Callout type="tip" title="Future-Proofing">
          We regularly evaluate our stack against emerging alternatives. If a
          better technology emerges that meets our criteria, we'll migrate—but
          only when the benefits clearly outweigh the risks of change.
        </Callout>
      </Section>
    </>
  );
}
