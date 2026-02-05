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
  FeatureGrid,
  FeatureCard,
  LayerDiagram,
  ComparisonTable,
  FlowDiagram,
  Timeline,
  InfoCard,
} from "../components";
import { Layers, Cpu, Database, Globe, Shield, Zap, Server, Lock, Key, Cloud } from "lucide-react";

export default function Architecture() {
  return (
    <>
      <PageHeader
        badge="ARCHITECTURE"
        title="System Architecture"
        description="A deep dive into how Helix combines Solana's speed with Arweave's permanence to create a storage solution greater than the sum of its parts."
        readTime="~4 min read"
      />

      <Section>
        <Lead>
          Helix is built on a three-layer architecture that separates concerns
          while maximizing the strengths of each technology. Understanding this
          architecture helps explain why Helix can offer permanent storage at a
          fraction of traditional costs.
        </Lead>
      </Section>

      <SectionTitle>The Three Layers</SectionTitle>

      <Section>
        <LayerDiagram
          layers={[
            {
              name: "Application Layer",
              items: ["Next.js 14", "React UI", "Tailwind CSS", "Web Crypto API", "Client-side Encryption"],
              color: "bg-blue-500",
            },
            {
              name: "Transaction Layer",
              items: ["Solana Network", "Wallet Authentication", "Payment Processing", "Irys SDK", "Data Bundling"],
              color: "bg-purple-500",
            },
            {
              name: "Storage Layer",
              items: ["Arweave Permaweb", "Permanent Storage", "PostgreSQL", "Metadata", "Share Links"],
              color: "bg-[#d4622a]",
            },
          ]}
        />

        <FeatureGrid>
          <FeatureCard
            icon={Layers}
            title="Application Layer"
            description="Next.js frontend handles user interaction, file processing, and client-side encryption before any data leaves the browser."
          />
          <FeatureCard
            icon={Cpu}
            title="Transaction Layer"
            description="Solana processes payments and authentication. Irys bundles data and provides instant access while anchoring to Arweave."
          />
          <FeatureCard
            icon={Database}
            title="Storage Layer"
            description="Arweave provides permanent, decentralized storage. PostgreSQL maintains searchable metadata and user preferences."
          />
          <FeatureCard
            icon={Globe}
            title="Network Layer"
            description="Data is replicated across thousands of nodes worldwide, ensuring availability regardless of individual node status."
          />
        </FeatureGrid>
      </Section>

      <SectionTitle>Why Solana?</SectionTitle>

      <Section>
        <Paragraph>
          Solana serves as the payment and authentication layer for Helix.
          We chose Solana over other blockchains for several reasons:
        </Paragraph>

        <div className="my-6 space-y-4">
          <InfoCard icon={Zap} title="Sub-Second Finality" color="green">
            Transactions confirm in ~400ms, enabling real-time upload experiences.
            No waiting minutes for blockchain confirmations.
          </InfoCard>

          <InfoCard icon={Server} title="Minimal Transaction Fees" color="green">
            Average transaction cost is $0.00025. This means payments and uploads
            can remain economical even for small files.
          </InfoCard>

          <InfoCard icon={Shield} title="Robust Wallet Ecosystem" color="green">
            Phantom, Solflare, and dozens of other wallets provide familiar,
            secure interfaces for users to manage their identity.
          </InfoCard>
        </div>

        <CodeBlock title="wallet-connection.ts">
{`// Solana wallet adapter integration
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';

const network = WalletAdapterNetwork.Mainnet;
const endpoint = clusterApiUrl(network);

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

// User's wallet = their identity
// No email, no password, no account creation`}
        </CodeBlock>
      </Section>

      <SectionTitle>Why Arweave?</SectionTitle>

      <Section>
        <Paragraph>
          Arweave is the only blockchain designed for permanent
          data storage. Its unique endowment model makes true permanence
          economically sustainable.
        </Paragraph>

        <Callout type="info" title="The Endowment Model">
          When you pay for Arweave storage, a portion goes into an endowment
          that generates returns over time. As storage costs decrease (they
          drop ~30% annually), the endowment's returns exceed maintenance
          costs, funding storage indefinitely.
        </Callout>

        <Timeline
          items={[
            { time: "YEAR 0", title: "Payment → Endowment Pool", description: "Storage costs fully covered" },
            { time: "YEAR 10", title: "Returns > Reduced Costs", description: "30% annual cost decline creates surplus" },
            { time: "YEAR 50", title: "Returns >> Minimal Costs", description: "Large surplus accumulated" },
            { time: "YEAR 200+", title: "Returns >>> Near Zero Costs", description: "Perpetual storage guaranteed" },
          ]}
        />

        <Paragraph>
          This model has been validated by economic simulations and real-world
          operation. Arweave has been running since 2018, storing over 140TB
          of data permanently.
        </Paragraph>
      </Section>

      <SectionTitle>Why Irys?</SectionTitle>

      <Section>
        <Paragraph>
          Irys (formerly Bundlr) serves as the bridge between Solana and
          Arweave. It solves several challenges:
        </Paragraph>

        <ComparisonTable
          title="IRYS COMPARISON"
          left={{
            label: "WITHOUT IRYS",
            items: [
              "Wait 20+ minutes for Arweave confirmation",
              "Pay with AR token (need to acquire separately)",
              "Handle Arweave's unique transaction format",
              "No instant data availability",
            ],
          }}
          right={{
            label: "WITH IRYS",
            items: [
              "Instant data availability (<1 second)",
              "Pay with SOL (native to your wallet)",
              "Simple, familiar upload API",
              "Guaranteed Arweave anchoring",
            ],
          }}
        />

        <CodeBlock title="irys-upload.ts">
{`import { WebIrys } from '@irys/sdk';

// Initialize Irys with Solana wallet
const irys = new WebIrys({
  network: "mainnet",
  token: "solana",
  wallet: { provider: wallet }
});

// Upload returns immediately with transaction ID
// Irys handles Arweave anchoring in background
const receipt = await irys.upload(encryptedData, {
  tags: [
    { name: "Content-Type", value: file.type },
    { name: "App-Name", value: "Helix" },
  ]
});

// Data available instantly at:
// https://arweave.net/{receipt.id}`}
        </CodeBlock>

        <Callout type="tip" title="Optimistic Data Availability">
          Irys provides instant access to your data while it anchors to Arweave.
          This means no waiting—your files are accessible immediately after upload,
          with the same permanent URL they'll have forever.
        </Callout>
      </Section>

      <SectionTitle>Data Flow</SectionTitle>

      <Section>
        <Paragraph>
          Understanding the complete data flow helps clarify how each layer
          contributes to security and permanence:
        </Paragraph>

        <FlowDiagram
          steps={[
            {
              title: "File Selection",
              description: "User selects file through drag-and-drop or file picker. Browser FileReader API loads the file into memory.",
            },
            {
              title: "Client-Side Encryption",
              description: "If enabled, a unique AES-256 key is generated. File is encrypted with AES-GCM. Key stored locally, never transmitted.",
            },
            {
              title: "Cost Calculation",
              description: "Irys API calculates exact storage cost in SOL based on file size. Price displayed to user before any transaction.",
            },
            {
              title: "Solana Transaction",
              description: "Wallet signs the transaction. SOL transferred to Irys. Transaction confirmed on Solana (~400ms).",
            },
            {
              title: "Irys Upload",
              description: "Encrypted data bundled and uploaded. Instant receipt generated. Data available immediately at arweave.net/{id}.",
            },
            {
              title: "Arweave Anchoring",
              description: "Irys anchors bundle to Arweave in background. Data replicated across network nodes. Permanent storage guaranteed.",
            },
            {
              title: "Metadata Storage",
              description: "Transaction ID saved to PostgreSQL. Encrypted file metadata linked to user's dashboard.",
            },
          ]}
        />
      </Section>

      <SectionTitle>Security Boundaries</SectionTitle>

      <Section>
        <Paragraph>
          Each layer has clear security responsibilities:
        </Paragraph>

        <LayerDiagram
          layers={[
            {
              name: "Client (Browser)",
              items: ["Encryption/Decryption", "Key Generation", "Key Storage", "Zero-Knowledge"],
              color: "bg-green-500",
            },
            {
              name: "Solana",
              items: ["Identity", "Payments", "Wallet Signatures", "No Sensitive Data"],
              color: "bg-blue-500",
            },
            {
              name: "Irys",
              items: ["Encrypted Data Only", "Upload Receipts", "Cannot Decrypt"],
              color: "bg-purple-500",
            },
            {
              name: "Arweave",
              items: ["Encrypted Blobs", "Content Addressing", "Public but Unreadable"],
              color: "bg-orange-500",
            },
            {
              name: "PostgreSQL",
              items: ["Metadata Only", "Encrypted References", "No File Content"],
              color: "bg-gray-500",
            },
          ]}
        />

        <Callout type="tip" title="Defense in Depth">
          Even if an attacker compromises our servers, they gain nothing—no
          keys, no plaintext data. The architecture ensures that only you can
          access your files, using cryptographic guarantees rather than trust.
        </Callout>
      </Section>
    </>
  );
}
