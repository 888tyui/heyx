"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileList, StorageStats } from "@/components/dashboard";
import { getStoredFiles, getStorageStats, deleteFile } from "@/lib/storage";
import { Upload, RefreshCw, ArrowUpRight } from "lucide-react";
import { ConfirmModal } from "@/components/ui/Modal";
import type { FileMetadata, StorageStats as StorageStatsType } from "@/types";

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [stats, setStats] = useState<StorageStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!publicKey) return;

    setIsLoading(true);
    const walletAddress = publicKey.toBase58();

    try {
      const [storedFiles, storageStats] = await Promise.all([
        getStoredFiles(walletAddress),
        getStorageStats(walletAddress),
      ]);

      setFiles(storedFiles);
      setStats(storageStats);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    if (!connected) {
      router.push("/");
      return;
    }

    if (publicKey) {
      loadData();
    }
  }, [connected, publicKey, router, loadData]);

  const handleDelete = (fileId: string) => {
    if (!publicKey) return;
    setFileToDelete(fileId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!publicKey || !fileToDelete) return;
    await deleteFile(publicKey.toBase58(), fileToDelete);
    setFileToDelete(null);
    await loadData();
  };

  if (!connected) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0a0a0a]">
      {/* Decorative elements */}
      <div className="fixed top-16 right-0 w-px h-[calc(100vh-4rem)] bg-gradient-to-b from-[#d4622a]/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <span className="text-[10px] font-mono text-[#d4622a] tracking-[0.2em]">
              YOUR FILES
            </span>
            <h1 className="mt-2 text-3xl lg:text-4xl font-serif text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-white/30 text-sm">
              Manage your decentralized files
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/30 hover:text-white hover:border-white/20 transition-all duration-200"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <Link
              href="/upload"
              className="group inline-flex items-center gap-3 px-5 py-2.5 bg-white text-[#0a0a0a] hover:bg-[#d4622a] hover:text-white transition-all duration-200"
            >
              <Upload className="h-4 w-4" />
              <span className="text-sm font-medium">Upload</span>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <StorageStats stats={stats} isLoading={isLoading} />
        </motion.div>

        {/* File List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FileList files={files} isLoading={isLoading} onDelete={handleDelete} />
        </motion.div>

        {/* Empty state */}
        {!isLoading && files.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-20"
          >
            <p className="text-white/30 mb-6 text-sm">No files uploaded yet</p>
            <Link
              href="/upload"
              className="group inline-flex items-center gap-2 text-[#d4622a] hover:text-white transition-colors duration-200"
            >
              <span className="font-serif text-lg">Upload your first file</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setFileToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Remove File"
        message="Remove this file from your list? The file will remain permanently stored on Arweave."
        confirmText="Remove"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
