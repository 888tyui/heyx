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
  List,
  FlowDiagram,
  Timeline,
  LayerDiagram,
  ProcessFlow,
} from "../components";
import { Upload, Lock, Wallet, Check, Zap, Database, Globe, FileText } from "lucide-react";

export default function UploadFlow() {
  return (
    <>
      <PageHeader
        badge="UPLOAD FLOW"
        title="How Uploads Work"
        description="A step-by-step walkthrough of the upload process, from file selection to permanent storage on Arweave."
        readTime="~3 min read"
      />

      <Section>
        <Lead>
          Uploading to Helix takes seconds, but behind that simple interface is
          a carefully orchestrated process ensuring your data is encrypted,
          paid for, and permanently stored. Let's trace a file's journey from
          your device to the permaweb.
        </Lead>
      </Section>

      <SectionTitle>The Upload Journey</SectionTitle>

      <Section>
        <div className="space-y-6 my-8">
          {/* Step 1 */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#d4622a]/20 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-[#d4622a]" />
            </div>
            <div className="flex-1 border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#d4622a] font-mono text-sm">01</span>
                <h3 className="text-white font-medium">File Selection</h3>
              </div>
              <p className="text-white/50 text-sm">
                You select a file through drag-and-drop or the file picker. The
                file is read into memory using the browser's FileReader API. At
                this point, your file has not left your device.
              </p>
              <CodeBlock>
{`// Read file into memory
const reader = new FileReader();
reader.onload = (e) => {
  const arrayBuffer = e.target.result;
  // File now in memory, ready for processing
};
reader.readAsArrayBuffer(file);`}
              </CodeBlock>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#d4622a]/20 flex items-center justify-center flex-shrink-0">
              <Lock className="h-5 w-5 text-[#d4622a]" />
            </div>
            <div className="flex-1 border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#d4622a] font-mono text-sm">02</span>
                <h3 className="text-white font-medium">Encryption (Optional)</h3>
              </div>
              <p className="text-white/50 text-sm">
                If encryption is enabled (default), a random 256-bit AES key is
                generated. The file is encrypted using AES-GCM with a random IV.
                The key is stored locally—it never leaves your browser.
              </p>
              <CodeBlock>
{`// Generate random key
const key = await crypto.subtle.generateKey(
  { name: 'AES-GCM', length: 256 },
  true,
  ['encrypt', 'decrypt']
);

// Generate random IV
const iv = crypto.getRandomValues(new Uint8Array(12));

// Encrypt file data
const encrypted = await crypto.subtle.encrypt(
  { name: 'AES-GCM', iv },
  key,
  fileData
);

// Combine IV + encrypted data for storage
const combined = new Uint8Array(iv.length + encrypted.byteLength);
combined.set(iv);
combined.set(new Uint8Array(encrypted), iv.length);`}
              </CodeBlock>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#d4622a]/20 flex items-center justify-center flex-shrink-0">
              <Wallet className="h-5 w-5 text-[#d4622a]" />
            </div>
            <div className="flex-1 border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#d4622a] font-mono text-sm">03</span>
                <h3 className="text-white font-medium">Cost Calculation</h3>
              </div>
              <p className="text-white/50 text-sm">
                We query Irys for the exact cost to store your file permanently.
                The cost is based on file size and current network conditions.
                You see the price in SOL before approving anything.
              </p>
              <CodeBlock>
{`// Get exact cost from Irys
const price = await irys.getPrice(fileBytes);
const priceInSol = irys.utils.fromAtomic(price);

// Display to user
console.log(\`Storage cost: \${priceInSol} SOL\`);
// Typical: 0.000005 SOL for 1KB (~$0.001)`}
              </CodeBlock>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#d4622a]/20 flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-[#d4622a]" />
            </div>
            <div className="flex-1 border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#d4622a] font-mono text-sm">04</span>
                <h3 className="text-white font-medium">Wallet Approval</h3>
              </div>
              <p className="text-white/50 text-sm">
                Your wallet (Phantom, Solflare, etc.) prompts you to approve the
                transaction. You see exactly how much SOL will be spent. This is
                a real Solana transaction transferring funds to Irys.
              </p>
              <div className="my-4 p-4 bg-black/30 border border-white/5 text-center">
                <p className="text-white/30 text-xs font-mono mb-2">WALLET PROMPT</p>
                <p className="text-white text-sm">Approve transaction</p>
                <p className="text-white/50 text-xs mt-1">0.000218 SOL to Irys</p>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#d4622a]/20 flex items-center justify-center flex-shrink-0">
              <Upload className="h-5 w-5 text-[#d4622a]" />
            </div>
            <div className="flex-1 border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#d4622a] font-mono text-sm">05</span>
                <h3 className="text-white font-medium">Irys Upload</h3>
              </div>
              <p className="text-white/50 text-sm">
                Once payment confirms on Solana (~400ms), the encrypted data is
                uploaded to Irys. You receive a transaction ID immediately—this
                is your file's permanent address.
              </p>
              <CodeBlock>
{`// Upload to Irys
const receipt = await irys.upload(encryptedData, {
  tags: [
    { name: "Content-Type", value: "application/octet-stream" },
    { name: "App-Name", value: "Helix" },
    { name: "Wallet", value: walletAddress },
  ]
});

// Permanent URL available immediately
const url = \`https://arweave.net/\${receipt.id}\`;
// e.g., https://arweave.net/abc123...xyz`}
              </CodeBlock>
            </div>
          </div>

          {/* Step 6 */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#d4622a]/20 flex items-center justify-center flex-shrink-0">
              <Globe className="h-5 w-5 text-[#d4622a]" />
            </div>
            <div className="flex-1 border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#d4622a] font-mono text-sm">06</span>
                <h3 className="text-white font-medium">Arweave Anchoring</h3>
              </div>
              <p className="text-white/50 text-sm">
                In the background, Irys bundles your data with others and anchors
                it to the Arweave blockchain. This happens automatically—your
                file is already accessible via the transaction ID.
              </p>
              <ProcessFlow
                items={[
                  { label: "Irys Bundle", sublabel: "Your File + Others" },
                  { label: "Anchor", sublabel: "Bundle verification" },
                  { label: "Arweave Block", sublabel: "Permanent storage" },
                ]}
              />
            </div>
          </div>

          {/* Step 7 */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#d4622a]/20 flex items-center justify-center flex-shrink-0">
              <Database className="h-5 w-5 text-[#d4622a]" />
            </div>
            <div className="flex-1 border border-white/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#d4622a] font-mono text-sm">07</span>
                <h3 className="text-white font-medium">Metadata Storage</h3>
              </div>
              <p className="text-white/50 text-sm">
                We save the transaction ID and metadata to our database, linked
                to your wallet address. This enables your dashboard and sharing
                features. The actual file content stays on Arweave.
              </p>
              <CodeBlock>
{`// Save to database
await prisma.file.create({
  data: {
    walletAddress: wallet.publicKey.toString(),
    transactionId: receipt.id,
    encryptedName: encryptedFileName,  // Client-encrypted
    mimeType: file.type,
    size: file.size,
    isEncrypted: true,
  }
});`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </Section>

      <SectionTitle>Timeline</SectionTitle>

      <Section>
        <Timeline
          items={[
            { time: "0.0s", title: "File Selected", description: "User selects file through UI" },
            { time: "0.1s", title: "Encryption Complete", description: "Client-side AES-256 encryption" },
            { time: "0.2s", title: "Cost Calculated", description: "Irys returns exact storage price" },
            { time: "0.5s", title: "Wallet Approved", description: "User signs transaction" },
            { time: "0.9s", title: "Solana Confirmed", description: "Payment confirmed on-chain" },
            { time: "1.5s", title: "Upload Complete", description: "File accessible at arweave.net/{id}" },
            { time: "~10min", title: "Arweave Anchored", description: "Permanent block confirmation" },
            { time: "∞", title: "Forever Stored", description: "Data persists permanently" },
          ]}
        />

        <Callout type="info" title="Instant Availability">
          Your file is accessible within seconds of upload, even though Arweave
          block confirmation takes longer. Irys provides this instant
          availability while guaranteeing eventual permanent storage.
        </Callout>
      </Section>

      <SectionTitle>What Gets Stored Where</SectionTitle>

      <Section>
        <div className="my-6 border border-white/10">
          <div className="grid grid-cols-3 border-b border-white/10 bg-white/5">
            <div className="p-3 text-white text-sm font-medium">Data</div>
            <div className="p-3 text-white text-sm font-medium border-l border-white/10">Location</div>
            <div className="p-3 text-white text-sm font-medium border-l border-white/10">Access</div>
          </div>
          <div className="grid grid-cols-3 border-b border-white/5">
            <div className="p-3 text-white/60 text-sm">Encrypted file content</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Arweave</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Public (but encrypted)</div>
          </div>
          <div className="grid grid-cols-3 border-b border-white/5">
            <div className="p-3 text-white/60 text-sm">Encryption key</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Your browser (localStorage)</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Only you</div>
          </div>
          <div className="grid grid-cols-3 border-b border-white/5">
            <div className="p-3 text-white/60 text-sm">Transaction ID</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Helix database</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Your wallet</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-3 text-white/60 text-sm">File metadata</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Helix database (encrypted)</div>
            <div className="p-3 text-white/60 text-sm border-l border-white/10">Your wallet</div>
          </div>
        </div>
      </Section>

      <SectionTitle>Error Handling</SectionTitle>

      <Section>
        <Paragraph>
          Uploads can fail at various stages. Here's how we handle each:
        </Paragraph>

        <div className="my-6 space-y-4">
          <div className="border border-white/10 p-4">
            <p className="text-white font-medium text-sm mb-2">Wallet Rejection</p>
            <p className="text-white/50 text-sm">
              If you reject the wallet transaction, nothing happens. No data has
              been uploaded, no payment made. Simply try again when ready.
            </p>
          </div>

          <div className="border border-white/10 p-4">
            <p className="text-white font-medium text-sm mb-2">Insufficient Balance</p>
            <p className="text-white/50 text-sm">
              If your wallet doesn't have enough SOL, we'll show the required
              amount before you attempt the transaction. No failed partial uploads.
            </p>
          </div>

          <div className="border border-white/10 p-4">
            <p className="text-white font-medium text-sm mb-2">Network Error During Upload</p>
            <p className="text-white/50 text-sm">
              If the upload fails after payment, the funds are held in your Irys
              balance. You can retry the upload without paying again—the balance
              persists.
            </p>
          </div>

          <div className="border border-white/10 p-4">
            <p className="text-white font-medium text-sm mb-2">Browser Closed Mid-Upload</p>
            <p className="text-white/50 text-sm">
              If payment succeeded but upload didn't complete, your Irys balance
              still has the funds. Reconnect your wallet and upload again.
            </p>
          </div>
        </div>

        <Callout type="tip" title="Atomic Operations">
          We designed the flow so that you never lose money without getting
          storage. Either the entire process completes, or your funds remain
          available for retry.
        </Callout>
      </Section>

      <SectionTitle>Download Flow</SectionTitle>

      <Section>
        <Paragraph>
          Downloading reverses the upload process:
        </Paragraph>

        <List
          ordered
          items={[
            "Fetch encrypted data from arweave.net/{transactionId}",
            "Retrieve encryption key from localStorage",
            "Extract IV from first 12 bytes of data",
            "Decrypt remaining data using AES-GCM",
            "Create blob and trigger browser download",
          ]}
        />

        <CodeBlock title="download.ts">
{`async function downloadFile(transactionId: string, key: CryptoKey) {
  // Fetch encrypted data from Arweave
  const response = await fetch(\`https://arweave.net/\${transactionId}\`);
  const encrypted = await response.arrayBuffer();

  // Extract IV (first 12 bytes)
  const iv = new Uint8Array(encrypted.slice(0, 12));
  const ciphertext = encrypted.slice(12);

  // Decrypt
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );

  // Create download
  const blob = new Blob([decrypted]);
  const url = URL.createObjectURL(blob);
  // Trigger download...
}`}
        </CodeBlock>
      </Section>
    </>
  );
}
