"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getFileById, createShareLink, getShareLinks } from "@/lib/storage";
import {
  formatBytes,
  formatDateTime,
  getArweaveUrl,
  truncateAddress,
} from "@/lib/utils";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Lock,
  Copy,
  Check,
  Share2,
  FileText,
  Calendar,
  HardDrive,
  User,
  Key,
} from "lucide-react";
import type { FileMetadata, ShareLink } from "@/types";

export default function FileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { publicKey, connected } = useWallet();

  const [file, setFile] = useState<FileMetadata | null>(null);
  const [shares, setShares] = useState<ShareLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const fileId = params.id as string;

  const loadFile = useCallback(async () => {
    if (!publicKey) return;

    setIsLoading(true);
    const walletAddress = publicKey.toBase58();

    try {
      const [fileData, fileShares] = await Promise.all([
        getFileById(walletAddress, fileId),
        getShareLinks(walletAddress, fileId),
      ]);

      setFile(fileData);
      setShares(fileShares);
    } catch (error) {
      console.error("Error loading file:", error);
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, fileId]);

  useEffect(() => {
    if (!connected) {
      router.push("/");
      return;
    }

    if (publicKey && fileId) {
      loadFile();
    }
  }, [connected, publicKey, fileId, router, loadFile]);

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCreateShare = async () => {
    if (!publicKey || !file) return;

    await createShareLink(publicKey.toBase58(), file.id);
    await loadFile();
  };

  const getShareUrl = (share: ShareLink) => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/share/${share.accessKey || share.id}`;
    }
    return "";
  };

  if (!connected) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#0a0a0a]">
        <div className="container mx-auto max-w-3xl px-6 lg:px-12 py-12 lg:py-16">
          <div className="h-6 w-32 bg-white/10 animate-pulse mb-8" />
          <div className="space-y-6">
            <div className="h-40 w-full bg-white/5 animate-pulse" />
            <div className="h-32 w-full bg-white/5 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#0a0a0a]">
        <div className="container mx-auto max-w-3xl px-6 lg:px-12 py-12 lg:py-16">
          <div className="text-center py-20">
            <FileText className="mx-auto h-12 w-12 text-white/10" />
            <h2 className="mt-4 text-xl font-serif text-white">File Not Found</h2>
            <p className="mt-2 text-white/30 text-sm">
              This file doesn&apos;t exist or you don&apos;t have access.
            </p>
            <Link
              href="/dashboard"
              className="inline-block mt-6 px-6 py-3 bg-white text-[#0a0a0a] hover:bg-[#d4622a] hover:text-white transition-all duration-200"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0a0a0a]">
      <div className="container mx-auto max-w-3xl px-6 lg:px-12 py-12 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[11px] font-mono text-white/30 hover:text-white transition-colors duration-200 mb-6 tracking-wider"
          >
            <ArrowLeft className="h-3 w-3" />
            BACK
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-mono text-[#d4622a] tracking-[0.2em] mb-2">
                FILE DETAILS
              </span>
              <h1 className="text-xl lg:text-2xl font-serif text-white break-all">
                {file.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                {file.encrypted && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] text-[#d4622a] border border-[#d4622a]/30 bg-[#d4622a]/5 font-mono tracking-wider">
                    <Lock className="h-3 w-3" />
                    ENCRYPTED
                  </span>
                )}
                <span className="text-[10px] text-white/20 font-mono tracking-wider">
                  {file.type || "UNKNOWN"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* File Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-white/5 p-6 lg:p-8"
          >
            <h2 className="text-base font-serif text-white mb-6">Details</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <HardDrive className="h-4 w-4 text-white/20 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-1">SIZE</p>
                  <p className="text-white text-sm">{formatBytes(file.size)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-white/20 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-1">UPLOADED</p>
                  <p className="text-white text-sm">{formatDateTime(file.uploadedAt)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-white/20 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-1">OWNER</p>
                  <p className="text-white font-mono text-sm">
                    {truncateAddress(file.owner, 6)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-white/20 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-1">TYPE</p>
                  <p className="text-white text-sm">{file.type || "Unknown"}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Arweave Transaction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-white/5 p-6 lg:p-8"
          >
            <h2 className="text-base font-serif text-white mb-1">Arweave Transaction</h2>
            <p className="text-[11px] text-white/30 mb-6 font-mono tracking-wider">
              PERMANENTLY STORED ON ARWEAVE
            </p>

            <div className="flex items-center gap-2 mb-6">
              <input
                readOnly
                value={file.arweaveId}
                className="flex-1 bg-transparent border border-white/10 px-4 py-3 text-sm text-white font-mono focus:outline-none"
              />
              <button
                onClick={() => handleCopy(file.arweaveId, "txId")}
                className="w-11 h-11 flex items-center justify-center border border-white/10 text-white/30 hover:text-white hover:border-white/20 transition-all duration-200"
              >
                {copied === "txId" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="flex gap-3">
              <a
                href={getArweaveUrl(file.arweaveId)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                View on Arweave
              </a>
              <a
                href={getArweaveUrl(file.arweaveId)}
                download={file.name}
                className="flex-1 py-3 bg-white text-[#0a0a0a] hover:bg-[#d4622a] hover:text-white transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </motion.div>

          {/* Encryption Key (if encrypted) */}
          {file.encrypted && file.tags?.encryptionKey && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-[#d4622a]/20 bg-[#d4622a]/5 p-6 lg:p-8"
            >
              <div className="flex items-center gap-2 mb-1">
                <Key className="h-4 w-4 text-[#d4622a]" />
                <h2 className="text-base font-serif text-white">Encryption Key</h2>
              </div>
              <p className="text-[11px] text-white/30 mb-6 font-mono tracking-wider">
                KEEP THIS KEY SAFE
              </p>

              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={file.tags.encryptionKey}
                  type="password"
                  className="flex-1 bg-transparent border border-white/10 px-4 py-3 text-sm text-white font-mono focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(file.tags!.encryptionKey!, "encKey")}
                  className="w-11 h-11 flex items-center justify-center border border-white/10 text-white/30 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  {copied === "encKey" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-4 text-[10px] text-red-400/80 font-mono tracking-wider">
                WARNING: LOST KEY = UNRECOVERABLE FILE
              </p>
            </motion.div>
          )}

          {/* Share Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-white/5 p-6 lg:p-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-base font-serif text-white mb-1">Share Links</h2>
                <p className="text-[11px] text-white/30 font-mono tracking-wider">
                  CREATE SHAREABLE LINKS
                </p>
              </div>
              <button
                onClick={handleCreateShare}
                className="px-4 py-2 border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all duration-200 flex items-center gap-2 text-sm"
              >
                <Share2 className="h-4 w-4" />
                Create
              </button>
            </div>

            {shares.length === 0 ? (
              <p className="text-center text-white/20 py-8 text-sm">
                No share links created yet
              </p>
            ) : (
              <div className="space-y-3">
                {shares.map((share) => (
                  <div
                    key={share.id}
                    className="flex items-center gap-2 p-3 bg-white/[0.02]"
                  >
                    <input
                      readOnly
                      value={getShareUrl(share)}
                      className="flex-1 bg-transparent text-sm text-white font-mono focus:outline-none"
                    />
                    <button
                      onClick={() => handleCopy(getShareUrl(share), share.id)}
                      className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors duration-200"
                    >
                      {copied === share.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
