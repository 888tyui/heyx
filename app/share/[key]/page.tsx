"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getShareByAccessKey } from "@/lib/storage";
import { formatBytes, formatDateTime, getArweaveUrl } from "@/lib/utils";
import {
  Download,
  ExternalLink,
  Lock,
  FileText,
  Calendar,
  HardDrive,
  AlertCircle,
  Loader2,
} from "lucide-react";
import type { FileMetadata, ShareLink } from "@/types";

export default function SharePage() {
  const params = useParams();
  const accessKey = params.key as string;

  const [file, setFile] = useState<FileMetadata | null>(null);
  const [share, setShare] = useState<ShareLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadShare() {
      if (!accessKey) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await getShareByAccessKey(accessKey);

        if (!result) {
          setError("This share link is invalid or has expired.");
          return;
        }

        setShare(result.share);
        setFile(result.file);
      } catch (err) {
        console.error("Error loading share:", err);
        setError("Failed to load shared file.");
      } finally {
        setIsLoading(false);
      }
    }

    loadShare();
  }, [accessKey]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-[#d4622a] animate-spin mx-auto" />
          <p className="mt-4 text-white/30 text-sm">Loading shared file...</p>
        </div>
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <AlertCircle className="h-12 w-12 text-red-400/50 mx-auto" />
          <h1 className="mt-4 text-xl font-serif text-white">
            Share Link Unavailable
          </h1>
          <p className="mt-2 text-white/30 text-sm">
            {error || "This file is no longer available."}
          </p>
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-3 bg-white text-[#0a0a0a] hover:bg-[#d4622a] hover:text-white transition-all duration-200"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto max-w-2xl px-6 py-12 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] font-mono text-[#d4622a] tracking-[0.2em]">
            SHARED FILE
          </span>
          <h1 className="mt-3 text-2xl lg:text-3xl font-serif text-white break-all">
            {file.name}
          </h1>
          {file.encrypted && (
            <span className="inline-flex items-center gap-1 mt-4 px-3 py-1 text-[10px] text-[#d4622a] border border-[#d4622a]/30 bg-[#d4622a]/5 font-mono tracking-wider">
              <Lock className="h-3 w-3" />
              ENCRYPTED
            </span>
          )}
        </motion.div>

        {/* File Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-white/5 p-6 lg:p-8 mb-6"
        >
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <HardDrive className="h-4 w-4 text-white/20 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-1">
                  SIZE
                </p>
                <p className="text-white text-sm">{formatBytes(file.size)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 text-white/20 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-1">
                  UPLOADED
                </p>
                <p className="text-white text-sm">
                  {formatDateTime(file.uploadedAt)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-4 w-4 text-white/20 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-1">
                  TYPE
                </p>
                <p className="text-white text-sm">{file.type || "Unknown"}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-white/5 p-6 lg:p-8"
        >
          <h2 className="text-base font-serif text-white mb-1">Download</h2>
          <p className="text-[11px] text-white/30 mb-6 font-mono tracking-wider">
            PERMANENTLY STORED ON ARWEAVE
          </p>

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
              Download File
            </a>
          </div>

          {file.encrypted && (
            <p className="mt-4 text-[10px] text-amber-400/80 font-mono tracking-wider text-center">
              NOTE: THIS FILE IS ENCRYPTED. YOU WILL NEED THE DECRYPTION KEY.
            </p>
          )}
        </motion.div>

        {/* Share Info */}
        {share && (share.maxAccess || share.expiresAt) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center text-[11px] text-white/20 font-mono tracking-wider"
          >
            {share.maxAccess && (
              <p>
                DOWNLOADS: {share.accessCount} / {share.maxAccess}
              </p>
            )}
            {share.expiresAt && (
              <p className="mt-1">
                EXPIRES: {formatDateTime(share.expiresAt)}
              </p>
            )}
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[11px] text-white/20 font-mono tracking-wider mb-3">
            SHARED VIA HELIX
          </p>
          <Link
            href="/"
            className="text-[#d4622a] hover:text-white text-sm transition-colors duration-200"
          >
            Learn more about decentralized storage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
