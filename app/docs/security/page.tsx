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
  Quote,
  LayerDiagram,
  FlowDiagram,
} from "../components";
import { Shield, Lock, Key, Eye, AlertTriangle, Check, Server, Globe } from "lucide-react";

export default function Security() {
  return (
    <>
      <PageHeader
        badge="SECURITY"
        title="Security Model"
        description="Zero-knowledge architecture, client-side encryption, and defense in depth. How Helix protects your data without requiring trust."
        readTime="~4 min read"
      />

      <Section>
        <Quote>
          Security through mathematics, not promises.
        </Quote>

        <Lead>
          Traditional cloud services ask you to trust them with your data. Helix
          takes a different approach: we've designed a system where trust isn't
          required. Even if our servers were completely compromised, your data
          would remain secure.
        </Lead>
      </Section>

      <SectionTitle>Zero-Knowledge Architecture</SectionTitle>

      <Section>
        <Paragraph>
          "Zero-knowledge" means we never have access to your unencrypted data.
          This isn't a policy decision—it's a mathematical guarantee built into
          the architecture.
        </Paragraph>

        <LayerDiagram
          layers={[
            {
              name: "Your Browser (Trust Boundary)",
              items: ["Plaintext File", "AES-GCM Encryption", "Encryption Key (stored locally)", "Key never leaves browser"],
              color: "bg-green-500",
            },
            {
              name: "Helix Servers",
              items: ["Sees: Ciphertext only", "Sees: Encrypted metadata", "Sees: Wallet address", "Never sees: Plaintext, Keys, File names"],
              color: "bg-blue-500",
            },
            {
              name: "Arweave Network",
              items: ["Stores: Encrypted blobs", "Publicly accessible", "Anyone can download", "No one can decrypt"],
              color: "bg-orange-500",
            },
          ]}
        />

        <Callout type="tip" title="What This Means">
          Even if an attacker gained complete access to our servers and the
          Arweave network, they would only have encrypted blobs. Without your
          encryption keys, which never leave your browser, the data is useless.
        </Callout>
      </Section>

      <SectionTitle>Encryption Details</SectionTitle>

      <Section>
        <SubSection>Algorithm: AES-256-GCM</SubSection>
        <Paragraph>
          We use AES-256-GCM (Galois/Counter Mode), the same algorithm used by
          governments and financial institutions worldwide. It provides both
          confidentiality and authenticity.
        </Paragraph>

        <Table
          headers={["Property", "Value", "Why It Matters"]}
          rows={[
            ["Algorithm", "AES-256-GCM", "NIST-approved, quantum-resistant key size"],
            ["Key Size", "256 bits", "2^256 possible keys—unbreakable by brute force"],
            ["IV Size", "96 bits", "Unique per encryption, prevents pattern analysis"],
            ["Auth Tag", "128 bits", "Detects any tampering with ciphertext"],
          ]}
        />

        <SubSection>Key Generation</SubSection>
        <Paragraph>
          Encryption keys are generated using the Web Crypto API's
          cryptographically secure random number generator. Each file gets a
          unique key.
        </Paragraph>

        <CodeBlock title="key-generation.ts">
{`// Generate cryptographically secure key
const key = await crypto.subtle.generateKey(
  {
    name: 'AES-GCM',
    length: 256  // 256-bit key
  },
  true,          // Extractable (for storage)
  ['encrypt', 'decrypt']
);

// Key is generated from CSPRNG
// Entropy source: window.crypto.getRandomValues()
// Backed by OS-level entropy (e.g., /dev/urandom)`}
        </CodeBlock>

        <SubSection>IV (Initialization Vector)</SubSection>
        <Paragraph>
          A fresh random IV is generated for every encryption operation. This
          ensures that even identical files produce different ciphertext.
        </Paragraph>

        <CodeBlock title="iv-generation.ts">
{`// 96-bit IV, randomly generated per encryption
const iv = crypto.getRandomValues(new Uint8Array(12));

// IV is prepended to ciphertext (not secret)
// Format: [IV (12 bytes)][Ciphertext][Auth Tag (16 bytes)]`}
        </CodeBlock>

        <Callout type="warning" title="Never Reuse IVs">
          AES-GCM's security completely breaks down if an IV is reused with the
          same key. By generating a fresh random IV every time, we eliminate
          this risk entirely.
        </Callout>
      </Section>

      <SectionTitle>Key Management</SectionTitle>

      <Section>
        <Paragraph>
          Encryption keys are the crown jewels. Here's how we handle them:
        </Paragraph>

        <FeatureGrid>
          <FeatureCard
            icon={Key}
            title="Local Storage"
            description="Keys are stored in your browser's localStorage, keyed to your wallet address. They never touch our servers."
          />
          <FeatureCard
            icon={Lock}
            title="Export Format"
            description="Keys can be exported as base64 strings for backup. You control your keys completely."
          />
          <FeatureCard
            icon={Shield}
            title="Per-File Keys"
            description="Each file has its own unique key. Compromising one key doesn't affect other files."
          />
          <FeatureCard
            icon={Eye}
            title="No Recovery"
            description="We cannot recover lost keys. This is a feature—it means we can never access your data."
          />
        </FeatureGrid>

        <CodeBlock title="key-storage.ts">
{`// Store key in localStorage
const keyData = await crypto.subtle.exportKey('raw', key);
const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(keyData)));

localStorage.setItem(
  \`helix_key_\${transactionId}\`,
  JSON.stringify({
    key: keyBase64,
    createdAt: Date.now(),
    walletAddress: wallet.publicKey.toString()
  })
);

// Keys are isolated by wallet address
// Switching wallets = different key namespace`}
        </CodeBlock>

        <Callout type="info" title="Key Backup Responsibility">
          Because we can't recover your keys, backing them up is your
          responsibility. We provide export functionality—use it for important
          files. Future versions will support encrypted key sync.
        </Callout>
      </Section>

      <SectionTitle>Threat Model</SectionTitle>

      <Section>
        <Paragraph>
          We've designed Helix to be secure against a wide range of threats:
        </Paragraph>

        <div className="my-6 space-y-4">
          <div className="border border-green-500/30 bg-green-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-4 w-4 text-green-400" />
              <span className="text-white font-medium text-sm">Protected Against</span>
            </div>
            <ul className="text-white/60 text-sm space-y-2 ml-6">
              <li>• <strong>Server Compromise:</strong> Attackers get encrypted blobs only</li>
              <li>• <strong>Database Breach:</strong> No plaintext data, no keys stored</li>
              <li>• <strong>Network Interception:</strong> TLS + encryption = double protection</li>
              <li>• <strong>Malicious Employees:</strong> We can't access data we can't decrypt</li>
              <li>• <strong>Government Requests:</strong> We can only provide encrypted data</li>
              <li>• <strong>Arweave Node Operators:</strong> They see encrypted blobs only</li>
            </ul>
          </div>

          <div className="border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span className="text-white font-medium text-sm">Your Responsibility</span>
            </div>
            <ul className="text-white/60 text-sm space-y-2 ml-6">
              <li>• <strong>Browser Security:</strong> Keep your browser updated</li>
              <li>• <strong>Device Security:</strong> Protect your computer from malware</li>
              <li>• <strong>Wallet Security:</strong> Protect your wallet's seed phrase</li>
              <li>• <strong>Key Backup:</strong> Export and securely store encryption keys</li>
              <li>• <strong>Phishing:</strong> Verify you're on the real Helix site</li>
            </ul>
          </div>

          <div className="border border-red-500/30 bg-red-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-white font-medium text-sm">Cannot Protect Against</span>
            </div>
            <ul className="text-white/60 text-sm space-y-2 ml-6">
              <li>• <strong>Compromised Device:</strong> If malware controls your browser</li>
              <li>• <strong>Lost Keys:</strong> No recovery possible by design</li>
              <li>• <strong>Quantum Computers:</strong> AES-256 is resistant, but future-proof isn't guaranteed</li>
            </ul>
          </div>
        </div>
      </Section>

      <SectionTitle>Wallet Security</SectionTitle>

      <Section>
        <Paragraph>
          Your Solana wallet is your identity on Helix. Wallet security is
          critical:
        </Paragraph>

        <SubSection>What Your Wallet Does</SubSection>
        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <Check className="h-4 w-4 text-green-400" />
            <span className="text-white/60 text-sm">Signs transactions to authorize payments</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <Check className="h-4 w-4 text-green-400" />
            <span className="text-white/60 text-sm">Proves ownership of your files (via public key)</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <Check className="h-4 w-4 text-green-400" />
            <span className="text-white/60 text-sm">Signs authentication messages (no blockchain transaction)</span>
          </div>
        </div>

        <SubSection>What Your Wallet Doesn't Do</SubSection>
        <div className="my-4 space-y-2">
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-white/60 text-sm">Does NOT generate or store encryption keys</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-white/60 text-sm">Does NOT encrypt or decrypt files</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-white/60 text-sm">Does NOT have access to file contents</span>
          </div>
        </div>

        <Callout type="tip" title="Wallet vs. Encryption Keys">
          Your wallet proves who you are. Encryption keys protect your data.
          These are separate concerns: losing wallet access means losing the
          ability to upload new files; losing encryption keys means losing
          access to file contents.
        </Callout>
      </Section>

      <SectionTitle>Data Integrity</SectionTitle>

      <Section>
        <Paragraph>
          AES-GCM provides authenticated encryption, meaning it detects any
          tampering with the ciphertext:
        </Paragraph>

        <CodeBlock title="integrity-check.ts">
{`// When decrypting, GCM verifies the auth tag
try {
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );
  // Success: data is authentic and unmodified
} catch (error) {
  // Decryption failed: data was tampered with
  // or wrong key was used
  throw new Error('Data integrity check failed');
}`}
        </CodeBlock>

        <Paragraph>
          Additionally, Arweave provides content addressing—the transaction ID
          is derived from the data itself. If anyone modified the stored data,
          the ID wouldn't match.
        </Paragraph>

        <FlowDiagram
          steps={[
            {
              title: "Original Upload",
              description: "Data → SHA-256 hash → Transaction ID: abc123...",
            },
            {
              title: "Later Download",
              description: "Fetch abc123... → Data → SHA-256 → abc123... ✓ (Match!)",
            },
            {
              title: "If Tampered",
              description: "Modified Data → SHA-256 → xyz789... ✗ (Different ID doesn't exist)",
            },
          ]}
        />
      </Section>

      <SectionTitle>Security Roadmap</SectionTitle>

      <Section>
        <Paragraph>
          Security is never "done." Here's what we're working on:
        </Paragraph>

        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-white/60 text-sm">Third-party security audit (in progress)</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-white/60 text-sm">Encrypted key sync across devices</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-white/60 text-sm">Hardware wallet key derivation</span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-white/60 text-sm">Post-quantum encryption options</span>
          </div>
        </div>

        <Quote>
          We publish our security model because transparency builds trust. If
          you find a vulnerability, please report it responsibly.
        </Quote>
      </Section>
    </>
  );
}
