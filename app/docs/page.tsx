"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  FileText,
  Shield,
  Database,
  Upload,
  Share2,
  Coins,
  Lightbulb,
  Rocket,
  ArrowLeft,
  Menu,
  X,
  ExternalLink,
  Lock,
  Server,
  Wallet,
  Globe,
  Code,
  Box,
} from "lucide-react";

const sections = [
  { id: "overview", title: "Overview", icon: FileText },
  { id: "problem", title: "Problem Statement", icon: Lightbulb },
  { id: "architecture", title: "Architecture", icon: Server },
  { id: "technologies", title: "Core Technologies", icon: Code },
  { id: "upload-flow", title: "Upload Flow", icon: Upload },
  { id: "security", title: "Security", icon: Shield },
  { id: "database", title: "Database & API", icon: Database },
  { id: "sharing", title: "File Sharing", icon: Share2 },
  { id: "costs", title: "Cost Structure", icon: Coins },
  { id: "use-cases", title: "Use Cases", icon: Box },
  { id: "roadmap", title: "Roadmap", icon: Rocket },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-black/50 border border-white/10 p-4 overflow-x-auto text-sm">
      <code className="text-green-400 font-mono">{children}</code>
    </pre>
  );
}

function Diagram({ children }: { children: string }) {
  return (
    <pre className="bg-black/30 border border-white/5 p-4 overflow-x-auto text-xs text-white/60 font-mono leading-relaxed">
      {children}
    </pre>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl lg:text-3xl font-serif text-white mt-16 mb-6 scroll-mt-24">
      {children}
    </h2>
  );
}

function SubSection({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-serif text-white mt-8 mb-4">{children}</h3>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-white/60 leading-relaxed mb-4">{children}</p>;
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="border border-white/10 p-4 bg-white/[0.02]">
      <Icon className="h-5 w-5 text-[#d4622a] mb-3" />
      <h4 className="text-white font-medium mb-2">{title}</h4>
      <p className="text-white/40 text-sm">{description}</p>
    </div>
  );
}

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 w-10 h-10 bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-white/60 hover:text-white"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#0a0a0a] border-r border-white/5 overflow-y-auto z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-6">
            <span className="text-[10px] font-mono text-[#d4622a] tracking-[0.2em]">
              DOCUMENTATION
            </span>
            <h1 className="text-xl font-serif text-white mt-1">Helix Docs</h1>
          </div>

          <nav className="space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm text-white/40 hover:text-white hover:bg-white/5 transition-colors"
              >
                <section.icon className="h-4 w-4" />
                {section.title}
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-[10px] font-mono text-white/20 tracking-wider mb-3">VERSION</p>
            <p className="text-white/40 text-sm">1.0.0 - February 2025</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 px-6 lg:px-12 py-12 max-w-4xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-[10px] font-mono text-[#d4622a] tracking-[0.2em]">
            TECHNICAL DOCUMENTATION
          </span>
          <h1 className="text-3xl lg:text-4xl font-serif text-white mt-3 mb-4">
            Helix Whitepaper
          </h1>
          <p className="text-white/40 text-lg">
            Decentralized Permanent Storage Platform on Solana
          </p>
          <p className="text-white/20 text-sm mt-2 font-mono">
            ~20 min read
          </p>
        </motion.div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {/* Overview */}
          <SectionTitle id="overview">1. Overview</SectionTitle>
          <Paragraph>
            Helix is a decentralized file storage platform that combines Solana blockchain
            with Arweave permanent storage. Users can permanently store files with just a
            wallet connection and optionally apply client-side encryption for complete privacy.
          </Paragraph>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
            <FeatureCard
              icon={Globe}
              title="Permanent Storage"
              description="Data stored on Arweave is preserved for 200+ years"
            />
            <FeatureCard
              icon={Lock}
              title="Client-Side Encryption"
              description="AES-256-GCM encryption - even the server can't read your data"
            />
            <FeatureCard
              icon={Wallet}
              title="Wallet-Based Auth"
              description="No email or password needed - just connect your Solana wallet"
            />
            <FeatureCard
              icon={Share2}
              title="Shareable Links"
              description="Share encrypted files securely with anyone"
            />
            <FeatureCard
              icon={Coins}
              title="One-Time Payment"
              description="No monthly subscriptions - pay once, store forever"
            />
            <FeatureCard
              icon={Code}
              title="Open Architecture"
              description="Transparent code using industry-standard technologies"
            />
          </div>

          <SubSection>Technical Stack</SubSection>
          <CodeBlock>{`Frontend:     Next.js 14 (App Router) + TypeScript
Styling:      Tailwind CSS + Framer Motion
Blockchain:   Solana (wallet authentication)
Storage:      Arweave via Irys SDK
Encryption:   Web Crypto API (AES-256-GCM)
Database:     PostgreSQL + Prisma ORM
Deployment:   Railway`}</CodeBlock>

          {/* Problem Statement */}
          <SectionTitle id="problem">2. Problem Statement</SectionTitle>

          <SubSection>Limitations of Centralized Cloud Storage</SubSection>
          <Paragraph>
            Most cloud storage services (Google Drive, Dropbox, AWS S3) have fundamental
            problems that compromise data ownership and longevity.
          </Paragraph>

          <Diagram>{`┌─────────────────────────────────────────────────────────┐
│                    Traditional Cloud                     │
├─────────────────────────────────────────────────────────┤
│  User → Upload → Company Server → Company Controls Data │
│                                                         │
│  - Data loss when service shuts down                    │
│  - Access can be restricted by policy changes           │
│  - Data can be handed over to authorities               │
│  - Server breach exposes all data                       │
└─────────────────────────────────────────────────────────┘`}</Diagram>

          <SubSection>Recurring Cost Burden</SubSection>
          <CodeBlock>{`// Traditional Cloud: Recurring Monthly Cost
const monthlyCost = storageGB * pricePerGB; // $0.02-0.10/GB/month
const yearlyCost = monthlyCost * 12;
const decadeCost = yearlyCost * 10; // Continuous payment for 10 years

// Example: 100GB for 10 years
// AWS S3: ~$276 (recurring annually)
// Google Drive: ~$240 (recurring annually)`}</CodeBlock>

          <SubSection>Problems with Existing Decentralized Storage</SubSection>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-white/10">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left p-3 text-white">Solution</th>
                  <th className="text-left p-3 text-white">Problems</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-b border-white/5">
                  <td className="p-3 font-mono">IPFS</td>
                  <td className="p-3">No permanence guarantee (requires pinning), complex node operation</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-mono">Filecoin</td>
                  <td className="p-3">High minimum storage requirements, complex deal process</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">Storj</td>
                  <td className="p-3">Relies on centralized gateways</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Architecture */}
          <SectionTitle id="architecture">3. System Architecture</SectionTitle>

          <SubSection>High-Level Architecture</SubSection>
          <Diagram>{`┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Next.js   │  │   Solana    │  │     Web Crypto API      │ │
│  │   Frontend  │  │   Wallet    │  │  (AES-256-GCM)          │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘ │
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
└─────────────────────────────────────────────────────────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   PostgreSQL    │  │      Irys       │  │    Arweave      │
│   (Metadata)    │  │   (Payment)     │  │   (Storage)     │
└─────────────────┘  └─────────────────┘  └─────────────────┘`}</Diagram>

          <SubSection>Component Structure</SubSection>
          <CodeBlock>{`components/
├── layout/
│   ├── Header.tsx          # Navigation, wallet connection
│   └── Footer.tsx          # Links, branding
├── upload/
│   ├── FileDropzone.tsx    # Drag & drop interface
│   └── UploadProgress.tsx  # Real-time progress
├── dashboard/
│   ├── FileList.tsx        # User's files
│   └── StorageStats.tsx    # Usage statistics
└── wallet/
    └── WalletButton.tsx    # Phantom/Solflare connect`}</CodeBlock>

          {/* Core Technologies */}
          <SectionTitle id="technologies">4. Core Technologies</SectionTitle>

          <SubSection>Arweave: The Permaweb</SubSection>
          <Paragraph>
            Arweave is a blockchain-based permanent storage system implementing the
            &ldquo;pay once, store forever&rdquo; model. Through the Storage Endowment model,
            a single payment guarantees storage for over 200 years.
          </Paragraph>

          <CodeBlock>{`// Arweave's Endowment Model
const ARWEAVE_STORAGE = {
  mechanism: "Storage Endowment",

  // Cost decreases over time due to:
  // 1. Kryder's Law (storage cost -30% yearly)
  // 2. Endowment interest accumulation

  guarantee: "Data replicated across global nodes",
  immutability: "Content-addressed (txId = hash)",
  duration: "200+ years",
};`}</CodeBlock>

          <SubSection>Irys: The Upload Layer</SubSection>
          <Paragraph>
            Irys (formerly Bundlr) is a layer that optimizes uploads to Arweave.
            Pay with SOL and upload instantly.
          </Paragraph>

          <CodeBlock>{`import { WebIrys } from "@irys/sdk";

const webIrys = new WebIrys({
  network: "mainnet",
  token: "solana",
  wallet: {
    rpcUrl: "https://api.mainnet-beta.solana.com",
    name: "solana",
    provider: wallet,
  },
});

await webIrys.ready();

// Upload with tags
const receipt = await webIrys.upload(data, {
  tags: [
    { name: "Content-Type", value: "application/pdf" },
    { name: "App-Name", value: "Helix" },
  ],
});

console.log("Arweave TX:", receipt.id);`}</CodeBlock>

          {/* Upload Flow */}
          <SectionTitle id="upload-flow">5. Upload Flow</SectionTitle>

          <Diagram>{`User selects file
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
    (Arweave TX ID returned)`}</Diagram>

          <SubSection>Signature Requests</SubSection>
          <Paragraph>
            During the upload process, 3 signature requests are made to your wallet:
          </Paragraph>
          <ol className="list-decimal list-inside text-white/60 space-y-2 ml-4">
            <li><span className="text-white">Irys Authentication</span> - signMessage to authenticate with Irys node</li>
            <li><span className="text-white">Funding Transaction</span> - Transfer SOL to Irys node (if balance insufficient)</li>
            <li><span className="text-white">Data Signing</span> - Sign the data to be uploaded</li>
          </ol>

          {/* Security */}
          <SectionTitle id="security">6. Security</SectionTitle>

          <SubSection>Zero-Knowledge Encryption</SubSection>
          <Diagram>{`┌─────────────────────────────────────────────────────────────────┐
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
   - Decrypted data                     │`}</Diagram>

          <SubSection>AES-256-GCM Implementation</SubSection>
          <CodeBlock>{`// hooks/useEncryption.ts
const encrypt = async (file: File) => {
  // Generate a random 256-bit key
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
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

  // Export key for storage
  const exportedKey = await crypto.subtle.exportKey("raw", key);

  return { data: encryptedData, key: exportedKey, iv };
};`}</CodeBlock>

          <SubSection>Security Properties</SubSection>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-white/10">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left p-3 text-white">Property</th>
                  <th className="text-left p-3 text-white">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-b border-white/5">
                  <td className="p-3">Key Size</td>
                  <td className="p-3">256 bits - impossible to brute force</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3">Mode</td>
                  <td className="p-3">GCM (Galois/Counter Mode)</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3">Authentication</td>
                  <td className="p-3">Built-in integrity check (GMAC)</td>
                </tr>
                <tr>
                  <td className="p-3">IV</td>
                  <td className="p-3">12 bytes, randomly generated per file</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Database & API */}
          <SectionTitle id="database">7. Database & API</SectionTitle>

          <SubSection>Prisma Schema</SubSection>
          <CodeBlock>{`// prisma/schema.prisma

model User {
  id            String      @id @default(cuid())
  walletAddress String      @unique
  createdAt     DateTime    @default(now())
  files         File[]
  shareLinks    ShareLink[]
}

model File {
  id            String      @id @default(cuid())
  name          String
  size          BigInt
  mimeType      String
  arweaveTxId   String      @unique
  encrypted     Boolean     @default(false)
  encryptionKey String?
  encryptionIv  String?
  uploadedAt    DateTime    @default(now())
  userId        String
  user          User        @relation(...)
  shareLinks    ShareLink[]
}

model ShareLink {
  id            String      @id @default(cuid())
  accessKey     String      @unique @default(cuid())
  expiresAt     DateTime?
  maxDownloads  Int?
  downloadCount Int         @default(0)
  fileId        String
  file          File        @relation(...)
}`}</CodeBlock>

          <SubSection>API Endpoints</SubSection>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-white/10">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left p-3 text-white">Endpoint</th>
                  <th className="text-left p-3 text-white">Method</th>
                  <th className="text-left p-3 text-white">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/60 font-mono text-xs">
                <tr className="border-b border-white/5">
                  <td className="p-3">/api/files</td>
                  <td className="p-3">GET</td>
                  <td className="p-3">Get user&apos;s file list</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3">/api/files</td>
                  <td className="p-3">POST</td>
                  <td className="p-3">Save new file metadata</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3">/api/files/[id]</td>
                  <td className="p-3">DELETE</td>
                  <td className="p-3">Delete file metadata</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3">/api/share</td>
                  <td className="p-3">GET</td>
                  <td className="p-3">Access file via share link</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3">/api/share</td>
                  <td className="p-3">POST</td>
                  <td className="p-3">Create share link</td>
                </tr>
                <tr>
                  <td className="p-3">/api/stats</td>
                  <td className="p-3">GET</td>
                  <td className="p-3">Get storage statistics</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* File Sharing */}
          <SectionTitle id="sharing">8. File Sharing</SectionTitle>

          <Diagram>{`Owner                           Recipient
  │                                │
  │  1. Create share link          │
  │  POST /api/share               │
  │  {fileId, options}             │
  │                                │
  │  2. Get accessKey              │
  │  ◀──────────────               │
  │                                │
  │  3. Share URL                  │
  │  ─────────────────────────────▶│
  │  https://helix.app/share/xyz   │
  │                                │
  │                                │  4. Access shared file
  │                                │  GET /api/share?key=xyz
  │                                │
  │                                │  5. Download from Arweave
  │                                │  arweave.net/txId`}</Diagram>

          <SubSection>Share Link Options</SubSection>
          <CodeBlock>{`interface ShareLinkOptions {
  // Time-based expiration
  expiresAt?: Date;

  // Download count limit
  maxDownloads?: number;

  // Password protection (future)
  password?: string;
}

// Example: Create a limited share
const shareLink = await createShareLink(walletAddress, fileId, {
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  maxDownloads: 5,
});`}</CodeBlock>

          {/* Cost Structure */}
          <SectionTitle id="costs">9. Cost Structure</SectionTitle>

          <SubSection>Arweave Storage Costs</SubSection>
          <Diagram>{`┌─────────────────────────────────────────────────────────────────┐
│                    STORAGE COST MODEL                            │
└─────────────────────────────────────────────────────────────────┘

Arweave Pricing (as of 2025):
─────────────────────────────

  1 KB   ≈ $0.000005
  1 MB   ≈ $0.005
  1 GB   ≈ $5.00
  100 GB ≈ $500 (one-time, permanent)

Comparison (10-year TCO for 100GB):
────────────────────────────────────

  AWS S3:        ~$276  (recurring annually)
  Google Drive:  ~$240  (recurring annually)
  Arweave:       ~$500  (one-time, permanent)

  Break-even:    ~2 years
  After 10 years: Arweave is 5x cheaper`}</Diagram>

          {/* Use Cases */}
          <SectionTitle id="use-cases">10. Use Cases</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="border border-white/10 p-5 bg-white/[0.02]">
              <h4 className="text-white font-serif text-lg mb-3">AI Model Storage</h4>
              <ul className="text-white/50 text-sm space-y-2">
                <li>- Permanent storage of model weights</li>
                <li>- Version control and provenance</li>
                <li>- Research reproducibility</li>
                <li>- Integrity verification</li>
              </ul>
            </div>
            <div className="border border-white/10 p-5 bg-white/[0.02]">
              <h4 className="text-white font-serif text-lg mb-3">Research Data</h4>
              <ul className="text-white/50 text-sm space-y-2">
                <li>- Dataset preservation</li>
                <li>- Permanent URLs for citations</li>
                <li>- Tamper-proof records</li>
                <li>- One-time grant expenditure</li>
              </ul>
            </div>
            <div className="border border-white/10 p-5 bg-white/[0.02]">
              <h4 className="text-white font-serif text-lg mb-3">NFT Assets</h4>
              <ul className="text-white/50 text-sm space-y-2">
                <li>- Permanent metadata storage</li>
                <li>- Solve IPFS 404 problem</li>
                <li>- True on-chain art</li>
                <li>- Collection asset protection</li>
              </ul>
            </div>
            <div className="border border-white/10 p-5 bg-white/[0.02]">
              <h4 className="text-white font-serif text-lg mb-3">Personal Vault</h4>
              <ul className="text-white/50 text-sm space-y-2">
                <li>- Family photo preservation</li>
                <li>- Important document backup</li>
                <li>- Digital inheritance</li>
                <li>- Cross-generational storage</li>
              </ul>
            </div>
          </div>

          {/* Roadmap */}
          <SectionTitle id="roadmap">11. Roadmap</SectionTitle>

          <div className="space-y-6">
            <div className="border-l-2 border-[#d4622a] pl-4">
              <p className="text-[#d4622a] font-mono text-sm">Phase 1 - Current</p>
              <h4 className="text-white font-serif text-lg mt-1">Foundation</h4>
              <ul className="text-white/50 text-sm mt-2 space-y-1">
                <li>&#10003; Solana wallet integration</li>
                <li>&#10003; Irys/Arweave upload</li>
                <li>&#10003; Client-side encryption</li>
                <li>&#10003; PostgreSQL metadata storage</li>
                <li>&#10003; Basic file sharing</li>
              </ul>
            </div>

            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-white/40 font-mono text-sm">Phase 2 - Q2 2025</p>
              <h4 className="text-white font-serif text-lg mt-1">Enhanced Features</h4>
              <ul className="text-white/50 text-sm mt-2 space-y-1">
                <li>&#9675; Folder organization</li>
                <li>&#9675; Batch upload</li>
                <li>&#9675; Download with decryption</li>
                <li>&#9675; Password-protected shares</li>
                <li>&#9675; File preview</li>
              </ul>
            </div>

            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-white/40 font-mono text-sm">Phase 3 - Q3 2025</p>
              <h4 className="text-white font-serif text-lg mt-1">Advanced Security</h4>
              <ul className="text-white/50 text-sm mt-2 space-y-1">
                <li>&#9675; Wallet-derived encryption keys</li>
                <li>&#9675; Threshold encryption</li>
                <li>&#9675; Hardware wallet support</li>
                <li>&#9675; E2E encrypted sharing</li>
              </ul>
            </div>

            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-white/40 font-mono text-sm">Phase 4 - Q4 2025</p>
              <h4 className="text-white font-serif text-lg mt-1">Ecosystem</h4>
              <ul className="text-white/50 text-sm mt-2 space-y-1">
                <li>&#9675; Public API</li>
                <li>&#9675; SDK release</li>
                <li>&#9675; Mobile app</li>
                <li>&#9675; Desktop app</li>
              </ul>
            </div>

            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-white/40 font-mono text-sm">Phase 5 - 2026</p>
              <h4 className="text-white font-serif text-lg mt-1">Decentralization</h4>
              <ul className="text-white/50 text-sm mt-2 space-y-1">
                <li>&#9675; IPFS backup layer</li>
                <li>&#9675; Decentralized metadata</li>
                <li>&#9675; DAO governance</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-white/10">
            <p className="text-white/20 text-sm">
              Document Version: 1.0.0 | Last Updated: February 2025
            </p>
            <p className="text-white/20 text-sm mt-2">
              This documentation is stored permanently on Arweave.
            </p>
          </div>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
