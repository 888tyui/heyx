"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Lock,
  ExternalLink,
  Search,
  Trash2,
  Download,
  ChevronRight,
} from "lucide-react";
import { formatBytes, formatDate, truncateString, getArweaveUrl } from "@/lib/utils";
import type { FileMetadata } from "@/types";

interface FileListProps {
  files: FileMetadata[];
  isLoading?: boolean;
  onDelete?: (fileId: string) => void;
}

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return Image;
  if (type.startsWith("video/")) return Video;
  if (type.startsWith("audio/")) return Music;
  if (type.includes("zip") || type.includes("tar") || type.includes("gz")) return Archive;
  if (type.includes("text") || type.includes("json") || type.includes("pdf")) return FileText;
  return File;
};

const getFileColor = (type: string) => {
  if (type.startsWith("image/")) return "text-pink-400";
  if (type.startsWith("video/")) return "text-purple-400";
  if (type.startsWith("audio/")) return "text-green-400";
  if (type.includes("zip") || type.includes("tar") || type.includes("gz")) return "text-yellow-400";
  if (type.includes("text") || type.includes("json") || type.includes("pdf")) return "text-blue-400";
  return "text-white/40";
};

export function FileList({ files, isLoading, onDelete }: FileListProps) {
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="border border-white/10">
        <div className="p-6 border-b border-white/10">
          <div className="h-6 w-24 bg-white/10 shimmer" />
        </div>
        <div className="divide-y divide-white/5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-6">
              <div className="h-12 w-12 bg-white/5 shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-white/10 shimmer" />
                <div className="h-3 w-1/4 bg-white/5 shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-white/10 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-serif text-white">Files</h2>
          <span className="text-[10px] font-mono text-white/30 px-2 py-0.5 bg-white/5 tracking-wider">
            {filteredFiles.length}
          </span>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 group-focus-within:text-[#d4622a] transition-colors" />
          <input
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 bg-transparent border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#d4622a]/50 focus:outline-none transition-all"
          />
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileFocus={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-[#d4622a] origin-left"
          />
        </div>
      </div>

      {/* File list */}
      {filteredFiles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <File className="mx-auto h-12 w-12 text-white/10" />
          </motion.div>
          <p className="mt-4 text-white/40">
            {files.length === 0
              ? "No files uploaded yet"
              : "No files match your search"}
          </p>
          {files.length === 0 && (
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 mt-4 text-sm text-[#d4622a] hover:text-white transition-colors"
            >
              Upload your first file
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </motion.div>
      ) : (
        <div className="divide-y divide-white/5">
          <AnimatePresence>
            {filteredFiles.map((file, index) => {
              const FileIcon = getFileIcon(file.type);
              const fileColor = getFileColor(file.type);
              const isHovered = hoveredId === file.id;

              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredId(file.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative flex items-center gap-4 p-6 hover:bg-white/[0.02] transition-all duration-200"
                >
                  {/* Left accent line on hover */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isHovered ? 1 : 0 }}
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#d4622a] origin-top"
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`relative flex h-12 w-12 items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors ${fileColor}`}
                  >
                    <FileIcon className="h-5 w-5" />
                    {/* File type badge */}
                    <span className="absolute -bottom-1 -right-1 px-1 py-0.5 bg-[#0a0a0a] border border-white/10 text-[8px] font-mono text-white/40 tracking-wider">
                      {file.type.split("/")[1]?.toUpperCase().slice(0, 4) || "FILE"}
                    </span>
                  </motion.div>

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/files/${file.id}`}
                        className="text-white hover:text-[#d4622a] truncate transition-colors link-underline link-underline-accent"
                      >
                        {truncateString(file.name, 40)}
                      </Link>
                      {file.encrypted && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] text-[#d4622a] border border-[#d4622a]/30 bg-[#d4622a]/5 font-mono tracking-wider"
                        >
                          <Lock className="h-2.5 w-2.5" />
                          ENC
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/30 mt-1.5 font-mono">
                      <span>{formatBytes(file.size)}</span>
                      <span className="text-white/10">·</span>
                      <span>{formatDate(file.uploadedAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                    className="flex items-center gap-1"
                  >
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={getArweaveUrl(file.arweaveId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                      title="View on Arweave"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={getArweaveUrl(file.arweaveId)}
                      download={file.name}
                      className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </motion.a>
                    {onDelete && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete(file.id)}
                        className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                        title="Remove from list"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    )}
                  </motion.div>

                  {/* Hover indicator arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -5 }}
                    className="text-[#d4622a]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Bottom info bar */}
      {filteredFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/20 tracking-wider"
        >
          <span>
            {filteredFiles.length} FILE{filteredFiles.length !== 1 ? "S" : ""}
          </span>
          <span>
            TOTAL: {formatBytes(filteredFiles.reduce((acc, f) => acc + f.size, 0))}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
