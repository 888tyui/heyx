"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileDropzone, UploadProgress } from "@/components/upload";
import { useFileUpload, useIrys } from "@/hooks";
import { ArrowLeft, Upload, Lock, Unlock, Info, AlertTriangle } from "lucide-react";
import { formatBytes } from "@/lib/utils";

export default function UploadPage() {
  const { connected } = useWallet();
  const router = useRouter();
  const { progress, upload, reset } = useFileUpload();
  const { getPrice } = useIrys();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [encrypt, setEncrypt] = useState(true);
  const [tags, setTags] = useState<Record<string, string>>({});
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  useEffect(() => {
    if (!connected) {
      router.push("/");
    }
  }, [connected, router]);

  useEffect(() => {
    const fetchPrice = async () => {
      if (selectedFile) {
        const price = await getPrice(selectedFile.size);
        setEstimatedPrice(price);
      }
    };
    fetchPrice();
  }, [selectedFile, getPrice]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    reset();
  };

  const handleClear = () => {
    setSelectedFile(null);
    setEstimatedPrice(0);
    reset();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const result = await upload(selectedFile, {
      encrypt,
      tags,
    });

    if (result) {
      setTimeout(() => {
        router.push(`/files/${result.id}`);
      }, 2000);
    }
  };

  const isUploading = progress.status !== "idle" && progress.status !== "complete" && progress.status !== "error";

  if (!connected) {
    return null;
  }

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
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[11px] font-mono text-white/30 hover:text-white transition-colors duration-200 mb-6 tracking-wider"
          >
            <ArrowLeft className="h-3 w-3" />
            BACK
          </Link>
          <span className="block text-[10px] font-mono text-[#d4622a] tracking-[0.2em]">
            NEW FILE
          </span>
          <h1 className="mt-2 text-3xl lg:text-4xl font-serif text-white">
            Upload
          </h1>
          <p className="mt-2 text-white/30 text-sm">
            Store a file permanently on Arweave
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* File Dropzone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-white/5 p-6 lg:p-8"
          >
            <h2 className="text-base font-serif text-white mb-1">Select File</h2>
            <p className="text-[11px] text-white/30 mb-6 font-mono tracking-wider">
              ANY FILE TYPE SUPPORTED
            </p>
            <FileDropzone
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onClear={handleClear}
              disabled={isUploading}
            />
          </motion.div>

          {/* Encryption Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-white/5 p-6 lg:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {encrypt ? (
                    <Lock className="h-4 w-4 text-[#d4622a]" />
                  ) : (
                    <Unlock className="h-4 w-4 text-white/30" />
                  )}
                  <h2 className="text-base font-serif text-white">Encryption</h2>
                </div>
                <p className="text-[11px] text-white/30 font-mono tracking-wider">
                  {encrypt
                    ? "AES-256-GCM / ONLY YOU CAN DECRYPT"
                    : "FILE WILL BE PUBLICLY ACCESSIBLE"
                  }
                </p>
              </div>
              <button
                onClick={() => setEncrypt(!encrypt)}
                disabled={isUploading}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  encrypt ? "bg-[#d4622a]" : "bg-white/10"
                } ${isUploading ? "opacity-50" : ""}`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    encrypt ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Tags (Optional) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-white/5 p-6 lg:p-8"
          >
            <h2 className="text-base font-serif text-white mb-1">Tags</h2>
            <p className="text-[11px] text-white/30 mb-6 font-mono tracking-wider">
              OPTIONAL METADATA
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-2 block">
                  DESCRIPTION
                </label>
                <input
                  type="text"
                  placeholder="File description..."
                  value={tags.Description || ""}
                  onChange={(e) =>
                    setTags({ ...tags, Description: e.target.value })
                  }
                  disabled={isUploading}
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#d4622a]/50 focus:outline-none transition-colors duration-200 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-2 block">
                  CATEGORY
                </label>
                <input
                  type="text"
                  placeholder="e.g., AI Model, Dataset"
                  value={tags.Category || ""}
                  onChange={(e) =>
                    setTags({ ...tags, Category: e.target.value })
                  }
                  disabled={isUploading}
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#d4622a]/50 focus:outline-none transition-colors duration-200 disabled:opacity-50"
                />
              </div>
            </div>
          </motion.div>

          {/* Upload Progress */}
          {progress.status !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <UploadProgress progress={progress} onReset={handleClear} />
            </motion.div>
          )}

          {/* Price Estimate & Upload Button */}
          {selectedFile && progress.status === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border border-white/5 p-6 lg:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[11px] text-white/30 font-mono tracking-wider">
                  <Info className="h-3 w-3" />
                  ESTIMATED COST
                </div>
                <div className="text-right">
                  <p className="font-serif text-xl text-white">
                    {estimatedPrice > 0
                      ? `~${estimatedPrice.toFixed(6)} SOL`
                      : "Calculating..."}
                  </p>
                  <p className="text-[10px] text-white/30 font-mono tracking-wider">
                    FOR {formatBytes(selectedFile.size).toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Phantom Warning Notice */}
              <div className="flex items-start gap-3 p-4 bg-yellow-500/5 border border-yellow-500/20 mb-4">
                <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] text-yellow-500/80 leading-relaxed">
                  <span className="font-medium">Phantom may show a warning</span> — This is normal when
                  sending SOL to Irys for permanent storage. The transaction is safe to approve.
                </div>
              </div>

              <button
                className="w-full py-4 bg-white text-[#0a0a0a] font-medium hover:bg-[#d4622a] hover:text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
              >
                <Upload className="h-4 w-4" />
                Upload to Arweave
              </button>

              <p className="mt-4 text-center text-[10px] text-white/20 font-mono tracking-wider">
                FILES ARE STORED PERMANENTLY
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
