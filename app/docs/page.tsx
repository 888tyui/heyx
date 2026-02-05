"use client";
/* eslint-disable react/no-unescaped-entities */
import {
  PageHeader,
  Section,
  SectionTitle,
  Paragraph,
  Lead,
  FeatureGrid,
  FeatureCard,
  CodeBlock,
  Callout,
  Quote,
  StatGrid,
  Stat,
} from "./components";
import {
  Globe,
  Lock,
  Wallet,
  Share2,
  Coins,
  Code,
  Zap,
  Shield,
} from "lucide-react";

export default function DocsOverview() {
  return (
    <>
      <PageHeader
        badge="INTRODUCTION"
        title="Welcome to Helix"
        description="The decentralized permanent storage platform built on Solana and Arweave. Store your data forever with a single payment."
        readTime="~3 min read"
      />

      <Section>
        <Quote>
          Your data should outlive the companies that store it.
        </Quote>

        <Lead>
          Helix is a new paradigm in data storage. We combine the speed and low
          cost of Solana with the permanence of Arweave to create a storage
          solution that truly belongs to you—not to a corporation, not to a
          government, but to you.
        </Lead>

        <Paragraph>
          In a world where cloud services shut down, terms of service change
          overnight, and your data can be held hostage, Helix offers something
          different: true ownership. When you upload a file to Helix, it becomes
          permanently stored on the Arweave network, replicated across thousands
          of nodes worldwide, and accessible via a simple URL that will work for
          centuries.
        </Paragraph>

        <Paragraph>
          No monthly fees. No storage limits that throttle after a year. No
          company that can decide your files violate their policies. Just
          permanent, censorship-resistant storage that you control with your
          Solana wallet.
        </Paragraph>
      </Section>

      <SectionTitle>Why Helix Exists</SectionTitle>

      <Section>
        <Paragraph>
          We built Helix because we were frustrated. Frustrated with losing
          access to files when services shut down. Frustrated with paying
          monthly fees that compound into thousands of dollars over a lifetime.
          Frustrated with the false promise of &ldquo;cloud storage&rdquo; that
          is really just someone else&apos;s computer, subject to someone
          else&apos;s rules.
        </Paragraph>

        <Paragraph>
          The blockchain revolution promised to give power back to individuals.
          Bitcoin did it for money. Ethereum did it for contracts. But storage?
          Storage remained centralized, fragile, and temporary. Until now.
        </Paragraph>

        <Callout type="tip" title="The Helix Philosophy">
          We believe that truly important data—family photos, research,
          creative works, legal documents—deserves better than a 5-year business
          plan horizon. It deserves permanence.
        </Callout>
      </Section>

      <SectionTitle>Core Features</SectionTitle>

      <FeatureGrid>
        <FeatureCard
          icon={Globe}
          title="Permanent Storage"
          description="Your data is stored on Arweave's permaweb, guaranteed to persist for 200+ years through a sustainable endowment model."
        />
        <FeatureCard
          icon={Lock}
          title="Zero-Knowledge Encryption"
          description="Client-side AES-256-GCM encryption means even we can't see your data. Your keys, your files, your privacy."
        />
        <FeatureCard
          icon={Wallet}
          title="Wallet Authentication"
          description="No email, no password, no account. Your Solana wallet is your identity. Connect and start storing immediately."
        />
        <FeatureCard
          icon={Coins}
          title="One-Time Payment"
          description="Pay once in SOL, store forever. No subscriptions, no renewals, no surprise charges. The endowment model handles the rest."
        />
        <FeatureCard
          icon={Share2}
          title="Secure Sharing"
          description="Generate shareable links with optional expiration and download limits. Share encrypted files without exposing your keys."
        />
        <FeatureCard
          icon={Zap}
          title="Instant Uploads"
          description="Powered by Irys, your files are available immediately while being permanently anchored to Arweave in the background."
        />
        <FeatureCard
          icon={Shield}
          title="Censorship Resistant"
          description="No single entity can delete or modify your files. Data is replicated across a global network of independent nodes."
        />
        <FeatureCard
          icon={Code}
          title="Open Source"
          description="Every line of code is public. Audit our encryption, verify our claims, or build on top of our infrastructure."
        />
      </FeatureGrid>

      <SectionTitle>By The Numbers</SectionTitle>

      <StatGrid>
        <Stat value="200+" label="Years of storage" />
        <Stat value="256-bit" label="Encryption" />
        <Stat value="$0.005" label="Per MB (one-time)" />
        <Stat value="0" label="Monthly fees" />
      </StatGrid>

      <SectionTitle>Technical Stack</SectionTitle>

      <Section>
        <Paragraph>
          Helix is built with modern, battle-tested technologies chosen for
          reliability, security, and developer experience.
        </Paragraph>

        <CodeBlock title="technology-stack.txt">{`FRONTEND
  Next.js 14        App Router, Server Components, TypeScript
  Tailwind CSS      Utility-first styling with custom design system
  Framer Motion     Smooth animations and transitions

BLOCKCHAIN
  Solana            Fast, low-cost transactions for payments
  Wallet Adapter    Support for Phantom, Solflare, and more
  Irys SDK          Optimized uploads to Arweave network

SECURITY
  Web Crypto API    Browser-native AES-256-GCM encryption
  Zero-Knowledge    Server never sees plaintext data

INFRASTRUCTURE
  Arweave           Permanent, decentralized storage layer
  PostgreSQL        Metadata and user data (encrypted)
  Railway           Scalable deployment platform`}</CodeBlock>
      </Section>

      <SectionTitle>How It Works</SectionTitle>

      <Section>
        <Paragraph>
          The Helix workflow is designed to be simple while maintaining the
          highest security standards:
        </Paragraph>

        <div className="space-y-4 my-6">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              1
            </div>
            <div>
              <p className="text-white font-medium">Connect Your Wallet</p>
              <p className="text-white/50 text-sm mt-1">
                Use Phantom, Solflare, or any Solana wallet. No account creation
                needed—your wallet address is your identity.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              2
            </div>
            <div>
              <p className="text-white font-medium">Select Your File</p>
              <p className="text-white/50 text-sm mt-1">
                Drag and drop or click to upload. Choose whether to encrypt your
                file with AES-256-GCM encryption.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              3
            </div>
            <div>
              <p className="text-white font-medium">Approve Transaction</p>
              <p className="text-white/50 text-sm mt-1">
                Sign the upload transaction with your wallet. The cost is
                calculated based on file size—typically fractions of a cent.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#d4622a]/20 flex items-center justify-center text-[#d4622a] font-mono text-sm flex-shrink-0">
              4
            </div>
            <div>
              <p className="text-white font-medium">Permanent Storage</p>
              <p className="text-white/50 text-sm mt-1">
                Your file is uploaded to Arweave via Irys. You receive a
                permanent transaction ID that serves as your file&apos;s
                immutable address.
              </p>
            </div>
          </div>
        </div>

        <Callout type="info" title="What about large files?">
          Helix handles files of any size. Large files are automatically chunked
          and reassembled, ensuring reliable uploads even on slower connections.
          The cost scales linearly with size—no surprise multipliers.
        </Callout>
      </Section>

      <SectionTitle>Getting Started</SectionTitle>

      <Section>
        <Paragraph>
          Ready to experience permanent storage? Here&apos;s what you need:
        </Paragraph>

        <div className="border border-white/10 p-6 my-6">
          <p className="text-white font-medium mb-4">Prerequisites</p>
          <ul className="space-y-3 text-white/60 text-sm">
            <li className="flex items-center gap-3">
              <span className="text-[#d4622a]">✓</span>
              A Solana wallet (Phantom recommended)
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#d4622a]">✓</span>
              Some SOL for storage payments (typically &lt;$0.01 per MB)
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#d4622a]">✓</span>A modern web browser
              (Chrome, Firefox, Safari, Edge)
            </li>
          </ul>
        </div>

        <Paragraph>
          That&apos;s it. No API keys, no account verification, no waiting
          periods. Connect your wallet and start uploading in seconds.
        </Paragraph>
      </Section>
    </>
  );
}
