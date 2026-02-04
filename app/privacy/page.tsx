"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Server } from "lucide-react";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-2 text-white/30 text-sm font-mono">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </motion.div>

        {/* Privacy Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mb-8"
        >
          {[
            { icon: Shield, label: "Zero Knowledge", desc: "We can't see your data" },
            { icon: Lock, label: "Client Encryption", desc: "Keys stay with you" },
            { icon: Eye, label: "No Tracking", desc: "No analytics or cookies" },
            { icon: Server, label: "No Servers", desc: "Fully decentralized" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-[#0a0a0a] p-4 text-center"
            >
              <item.icon className="h-5 w-5 text-[#d4622a] mx-auto mb-2" />
              <p className="text-xs font-medium text-white">{item.label}</p>
              <p className="text-[10px] text-white/30 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">Our Privacy Commitment</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Helix is built with privacy as a core principle. We believe your data belongs to you and you alone.
              Our architecture is designed so that we physically cannot access your encrypted files or personal information.
            </p>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">Information We Don&apos;t Collect</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Unlike traditional services, we do not collect:
            </p>
            <ul className="text-white/40 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>Personal identification information (name, email, phone)</li>
              <li>IP addresses or location data</li>
              <li>Browsing history or cookies</li>
              <li>File contents (encrypted before reaching any server)</li>
              <li>Encryption keys (generated and stored locally)</li>
              <li>Analytics or usage tracking data</li>
            </ul>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">Blockchain Data</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              The following information is publicly recorded on the blockchain:
            </p>
            <ul className="text-white/40 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>Your wallet address (pseudonymous)</li>
              <li>Transaction hashes for uploads</li>
              <li>Arweave transaction IDs for stored files</li>
              <li>File metadata (if not encrypted)</li>
            </ul>
            <p className="text-white/40 text-sm leading-relaxed mt-4">
              This data is inherent to blockchain technology and is publicly accessible. We recommend using
              encryption for sensitive files to protect their contents.
            </p>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">Local Storage</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Helix stores minimal data locally in your browser (localStorage) to provide functionality:
            </p>
            <ul className="text-white/40 text-sm leading-relaxed space-y-2 list-disc list-inside mt-4">
              <li>File metadata for your dashboard view</li>
              <li>Share link references</li>
              <li>UI preferences</li>
            </ul>
            <p className="text-white/40 text-sm leading-relaxed mt-4">
              This data never leaves your device and can be cleared at any time through your browser settings.
            </p>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">Encryption</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              When you enable encryption, your files are encrypted using AES-256-GCM directly in your browser
              before being uploaded. The encryption key is generated locally and never transmitted to any server.
              Without the encryption key, the file contents are computationally impossible to access.
            </p>
            <div className="mt-4 p-4 bg-[#d4622a]/10 border border-[#d4622a]/20">
              <p className="text-[#d4622a] text-sm font-medium">Important</p>
              <p className="text-white/40 text-sm mt-1">
                If you lose your encryption key, your files cannot be recovered. We recommend storing keys securely.
              </p>
            </div>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">Third-Party Services</h2>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Helix interacts with the following decentralized networks:
            </p>
            <ul className="text-white/40 text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li><strong className="text-white/60">Arweave:</strong> Permanent file storage network</li>
              <li><strong className="text-white/60">Irys (formerly Bundlr):</strong> Upload bundling service</li>
              <li><strong className="text-white/60">Solana:</strong> Payment processing blockchain</li>
            </ul>
            <p className="text-white/40 text-sm leading-relaxed mt-4">
              These networks have their own privacy characteristics. Transactions are public and permanent.
            </p>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">Your Rights</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Since we don&apos;t collect personal data, traditional data rights (access, deletion, portability) don&apos;t apply
              in the conventional sense. You have full control over your local data through your browser.
              Blockchain data, by design, cannot be modified or deleted.
            </p>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">Changes to This Policy</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              We may update this privacy policy to reflect changes in our practices or for legal reasons.
              Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="border border-white/5 p-6 lg:p-8">
            <h2 className="text-lg font-serif text-white mb-4">Contact</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              For privacy-related questions or concerns, please reach out through our official channels.
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
            href="/terms"
            className="text-sm text-white/30 hover:text-[#d4622a] transition-colors"
          >
            ← Terms of Service
          </Link>
          <p className="text-[10px] font-mono text-white/20 tracking-wider">
            HELIX / 2024
          </p>
        </motion.div>
      </div>
    </div>
  );
}
