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
  Table,
  FlowDiagram,
  InfoCard,
} from "../components";
import { Share2, Link, Lock, Clock, Download, Eye, Shield, Key } from "lucide-react";

export default function FileSharing() {
  return (
    <>
      <PageHeader
        badge="FILE SHARING"
        title="Sharing Files"
        description="Share encrypted files securely without exposing your keys. Control access with expiration dates and download limits."
        readTime="~2 min read"
      />

      <Section>
        <Lead>
          Sharing encrypted files presents a challenge: how do you give someone
          access without giving them your encryption key? Helix solves this with
          secure share links that can include time-limited decryption
          capabilities.
        </Lead>
      </Section>

      <SectionTitle>Sharing Options</SectionTitle>

      <Section>
        <FeatureGrid>
          <FeatureCard
            icon={Link}
            title="Public Link"
            description="For unencrypted files. Anyone with the link can download directly from Arweave."
          />
          <FeatureCard
            icon={Lock}
            title="Encrypted Share"
            description="Share encrypted files by including a re-encrypted key in the share link."
          />
          <FeatureCard
            icon={Clock}
            title="Time-Limited"
            description="Set an expiration date. After expiry, the share link stops working."
          />
          <FeatureCard
            icon={Download}
            title="Download Limits"
            description="Limit the number of downloads. After the limit, the link is disabled."
          />
        </FeatureGrid>
      </Section>

      <SectionTitle>How It Works</SectionTitle>

      <Section>
        <SubSection>Unencrypted Files</SubSection>
        <Paragraph>
          For files uploaded without encryption, sharing is simple—the share
          link points directly to the Arweave content:
        </Paragraph>

        <CodeBlock>
{`// Direct Arweave link
https://arweave.net/abc123xyz...

// Or through Helix for tracking
https://helix.storage/share/clx1234...
  → Redirects to arweave.net/abc123xyz...
  → Increments download counter`}
        </CodeBlock>

        <SubSection>Encrypted Files</SubSection>
        <Paragraph>
          Sharing encrypted files requires securely transmitting the decryption
          key. Here's how we handle it:
        </Paragraph>

        <div className="my-8 space-y-6">
          <InfoCard icon={Key} title="Owner Creates Share Link" color="blue">
            <ol className="text-sm space-y-1 mt-2 list-decimal list-inside text-white/60">
              <li>Owner&apos;s encryption key (K1)</li>
              <li>Generate share password (P)</li>
              <li>Derive share key from password: K2 = PBKDF2(P)</li>
              <li>Encrypt K1 with K2: encrypted_key = AES(K1, K2)</li>
              <li>Store encrypted_key in database</li>
              <li>Share URL includes password in fragment</li>
            </ol>
            <p className="text-[#d4622a] text-sm mt-3 font-mono">→ helix.storage/share/abc123#password_here</p>
          </InfoCard>

          <InfoCard icon={Download} title="Recipient Accesses File" color="green">
            <ol className="text-sm space-y-1 mt-2 list-decimal list-inside text-white/60">
              <li>Extract password from URL fragment (never sent to server)</li>
              <li>Request encrypted_key from server</li>
              <li>Derive K2 from password: K2 = PBKDF2(P)</li>
              <li>Decrypt: K1 = AES_decrypt(encrypted_key, K2)</li>
              <li>Fetch encrypted file from Arweave</li>
              <li>Decrypt file with K1</li>
            </ol>
          </InfoCard>
        </div>

        <Callout type="info" title="Fragment Privacy">
          The password is in the URL fragment (after #). Fragments are never
          sent to servers—they stay in the browser. This means we never see the
          password needed to decrypt the share key.
        </Callout>
      </Section>

      <SectionTitle>Creating Share Links</SectionTitle>

      <Section>
        <CodeBlock title="create-share.ts">
{`// Generate a secure share link for an encrypted file
async function createEncryptedShare(
  fileId: string,
  encryptionKey: CryptoKey,
  options: ShareOptions
) {
  // Generate random password for URL
  const password = generateSecurePassword(32);

  // Derive key from password
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const shareKey = await deriveKey(password, salt);

  // Encrypt the file's encryption key
  const exportedKey = await crypto.subtle.exportKey('raw', encryptionKey);
  const { encrypted, iv } = await encrypt(exportedKey, shareKey);

  // Create share in database
  const share = await fetch('/api/share', {
    method: 'POST',
    body: JSON.stringify({
      fileId,
      encryptedKey: packKeyData(encrypted, iv, salt),
      expiresAt: options.expiresAt,
      maxDownloads: options.maxDownloads,
    }),
  });

  const { id } = await share.json();

  // Return URL with password in fragment
  return \`https://helix.storage/share/\${id}#\${password}\`;
}

function generateSecurePassword(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(array, b => chars[b % chars.length]).join('');
}`}
        </CodeBlock>
      </Section>

      <SectionTitle>Access Controls</SectionTitle>

      <Section>
        <Paragraph>
          Share links support multiple access control mechanisms:
        </Paragraph>

        <Table
          headers={["Control", "Description", "Use Case"]}
          rows={[
            ["Expiration Date", "Link stops working after specified time", "Time-sensitive documents"],
            ["Download Limit", "Maximum number of downloads allowed", "Prevent unlimited redistribution"],
            ["Password", "Built into URL fragment for encrypted files", "Secure key transmission"],
          ]}
        />

        <CodeBlock title="share-options.ts">
{`interface ShareOptions {
  // Expiration (optional)
  expiresAt?: Date;

  // Download limit (optional)
  maxDownloads?: number;
}

// Examples
const shareOptions = {
  // Expires in 7 days
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

  // Allow only 5 downloads
  maxDownloads: 5,
};`}
        </CodeBlock>

        <SubSection>Checking Access</SubSection>
        <Paragraph>
          When someone accesses a share link, we verify:
        </Paragraph>

        <CodeBlock title="verify-share-access.ts">
{`async function verifyShareAccess(shareId: string) {
  const share = await prisma.shareLink.findUnique({
    where: { id: shareId },
    include: { file: true },
  });

  if (!share) {
    throw new Error('Share link not found');
  }

  // Check expiration
  if (share.expiresAt && share.expiresAt < new Date()) {
    throw new Error('Share link has expired');
  }

  // Check download limit
  if (share.maxDownloads && share.downloadCount >= share.maxDownloads) {
    throw new Error('Download limit reached');
  }

  // Increment download count
  await prisma.shareLink.update({
    where: { id: shareId },
    data: { downloadCount: { increment: 1 } },
  });

  return share;
}`}
        </CodeBlock>
      </Section>

      <SectionTitle>Revoking Access</SectionTitle>

      <Section>
        <Paragraph>
          You can revoke share links at any time:
        </Paragraph>

        <CodeBlock title="revoke-share.ts">
{`// Delete the share link
await fetch(\`/api/share/\${shareId}\`, {
  method: 'DELETE',
  headers: {
    Authorization: \`Bearer \${token}\`,
  },
});

// The file remains on Arweave, but the share link
// no longer resolves. Recipients who saved the
// encrypted key locally may still access the file.`}
        </CodeBlock>

        <Callout type="warning" title="Revocation Limits">
          Once someone has downloaded an encrypted file and extracted the key,
          revoking the share link won't prevent them from accessing the Arweave
          data directly. Revocation prevents new access, not existing access.
        </Callout>
      </Section>

      <SectionTitle>Share Link Anatomy</SectionTitle>

      <Section>
        <div className="my-6 border border-white/10 rounded-lg p-6 bg-white/[0.02]">
          <p className="text-white/40 text-xs font-mono tracking-wider mb-4">SHARE URL STRUCTURE</p>
          <div className="font-mono text-sm mb-6">
            <span className="text-blue-400">https://helix.storage</span>
            <span className="text-white/60">/share/</span>
            <span className="text-purple-400">clx1234abc</span>
            <span className="text-white/60">#</span>
            <span className="text-green-400">Kj8mNp2qRs5tUv7w</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
              <p className="text-blue-400 font-medium mb-1">Domain</p>
              <p className="text-white/50 text-xs">helix.storage</p>
            </div>
            <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
              <p className="text-purple-400 font-medium mb-1">Share ID</p>
              <p className="text-white/50 text-xs">Identifies the share link</p>
            </div>
            <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
              <p className="text-green-400 font-medium mb-1">Password</p>
              <p className="text-white/50 text-xs">Never sent to server</p>
            </div>
          </div>
          <p className="text-white/40 text-xs mt-4">For unencrypted files, no fragment is needed: helix.storage/share/clx1234abc</p>
        </div>
      </Section>

      <SectionTitle>Sharing Best Practices</SectionTitle>

      <Section>
        <div className="my-6 space-y-4">
          <div className="flex items-start gap-4 p-4 border border-white/10">
            <Shield className="h-5 w-5 text-[#d4622a] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Use Expiration for Sensitive Files</p>
              <p className="text-white/50 text-sm mt-1">
                Always set expiration dates for sensitive documents. A week is
                usually plenty—recipients can download and save locally.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <Download className="h-5 w-5 text-[#d4622a] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Set Download Limits</p>
              <p className="text-white/50 text-sm mt-1">
                If sharing with one person, set maxDownloads to 1-2. This
                prevents accidental forwarding of the link.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <Key className="h-5 w-5 text-[#d4622a] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Share Full URL</p>
              <p className="text-white/50 text-sm mt-1">
                Always share the complete URL including the fragment. If
                truncated, recipients won't be able to decrypt.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-white/10">
            <Eye className="h-5 w-5 text-[#d4622a] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Verify Before Sharing</p>
              <p className="text-white/50 text-sm mt-1">
                Test share links before sending. Open in an incognito window to
                confirm recipients will see what you expect.
              </p>
            </div>
          </div>
        </div>

        <Callout type="tip" title="Secure Channels">
          The share URL contains the decryption key. Share it through secure
          channels—encrypted messaging apps, not public posts.
        </Callout>
      </Section>
    </>
  );
}
