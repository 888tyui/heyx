"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0a0a0a]">
      {/* Decorative elements */}
      <div className="fixed top-16 left-0 w-px h-[calc(100vh-4rem)] bg-gradient-to-b from-[#d4622a]/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-mono text-white/30 hover:text-white transition-colors duration-200 mb-6 tracking-wider"
          >
            <ArrowLeft className="h-3 w-3" />
            BACK
          </Link>
          <span className="block text-[10px] font-mono text-[#d4622a] tracking-[0.2em]">
            LEGAL
          </span>
          <h1 className="mt-2 text-3xl lg:text-4xl font-serif text-white">
            Terms of Service
          </h1>
          <p className="mt-2 text-white/30 text-sm font-mono">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              By accessing and using Helix, you accept and agree to be bound by the terms and conditions of this agreement.
              If you do not agree to these terms, you should not use this service.
            </p>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">2. Description of Service</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Helix provides decentralized file storage services using Arweave blockchain technology and Solana for payments.
              Files are stored permanently on the Arweave network with optional client-side encryption.
            </p>
            <ul className="text-white/40 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>Permanent storage on Arweave&apos;s permaweb</li>
              <li>AES-256-GCM client-side encryption (optional)</li>
              <li>Payment via Solana blockchain</li>
              <li>No account registration required</li>
            </ul>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">3. User Responsibilities</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Users are solely responsible for:
            </p>
            <ul className="text-white/40 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>The content they upload to the service</li>
              <li>Maintaining the security of their wallet and encryption keys</li>
              <li>Ensuring they have the right to upload and store the content</li>
              <li>Compliance with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">4. Prohibited Content</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Users may not upload content that:
            </p>
            <ul className="text-white/40 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>Violates any applicable laws or regulations</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains malware or harmful code</li>
              <li>Promotes illegal activities</li>
            </ul>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">5. Data Permanence</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Files uploaded to Helix are stored permanently on the Arweave network. Once uploaded, files cannot be deleted
              or modified. Users should carefully consider what they upload, as the storage is immutable by design.
              While you can remove file references from your local dashboard, the actual files will remain on Arweave.
            </p>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">6. Encryption & Security</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              When encryption is enabled, files are encrypted client-side before upload. Helix never has access to your
              encryption keys. If you lose your encryption key, your files will be permanently unrecoverable.
              We recommend securely backing up your encryption keys.
            </p>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">7. Limitation of Liability</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Helix is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from
              the use of this service, including but not limited to data loss, unauthorized access, or service interruptions.
              Use of this service is at your own risk.
            </p>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">8. Changes to Terms</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
              Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">9. Contact</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              For questions about these terms, please contact us through our official channels.
            </p>
          </section>
        </motion.div>

        {/* Bottom navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between"
        >
          <Link
            href="/privacy"
            className="text-sm text-white/30 hover:text-[#d4622a] transition-colors"
          >
            Privacy Policy →
          </Link>
          <p className="text-[10px] font-mono text-white/20 tracking-wider">
            HELIX / 2024
          </p>
        </motion.div>
      </div>
    </div>
  );
}
