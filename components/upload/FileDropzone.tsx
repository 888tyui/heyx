"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatBytes } from "@/lib/utils";
import { Upload, File, X, Sparkles } from "lucide-react";

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  disabled?: boolean;
}

export function FileDropzone({
  onFileSelect,
  selectedFile,
  onClear,
  disabled,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [disabled, onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  // Get file extension for icon display
  const getFileExtension = (filename: string) => {
    const ext = filename.split('.').pop()?.toUpperCase() || '';
    return ext.length > 4 ? ext.slice(0, 4) : ext;
  };

  if (selectedFile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative border border-[#d4622a]/30 bg-[#d4622a]/5 p-6 overflow-hidden"
      >
        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 shimmer pointer-events-none" />

        <div className="relative flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            className="relative flex h-14 w-14 items-center justify-center bg-[#d4622a]/10 border border-[#d4622a]/20"
          >
            <File className="h-6 w-6 text-[#d4622a]" />
            {/* File extension badge */}
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-[#d4622a] text-[8px] font-mono text-white tracking-wider">
              {getFileExtension(selectedFile.name)}
            </span>
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="font-medium text-white truncate"
            >
              {selectedFile.name}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mt-1"
            >
              <span className="text-sm text-white/40">{formatBytes(selectedFile.size)}</span>
              <span className="text-white/20">·</span>
              <span className="text-sm text-white/40">{selectedFile.type || "Unknown type"}</span>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClear}
            disabled={disabled}
            className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Success indicator line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4622a] to-[#d4622a]/50 origin-left"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{
        borderColor: isDragging ? "#d4622a" : "rgba(255,255,255,0.1)",
        backgroundColor: isDragging ? "rgba(212, 98, 42, 0.05)" : "transparent",
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative border-2 border-dashed p-12 text-center transition-all group",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        onChange={handleFileInput}
        disabled={disabled}
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-[#d4622a]/50 transition-colors" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-[#d4622a]/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-[#d4622a]/50 transition-colors" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-[#d4622a]/50 transition-colors" />

      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative"
        >
          <div className="flex h-16 w-16 items-center justify-center border border-white/10 group-hover:border-[#d4622a]/30 transition-colors">
            <Upload className={cn(
              "h-7 w-7 transition-colors",
              isDragging ? "text-[#d4622a]" : "text-white/30 group-hover:text-white/50"
            )} />
          </div>

          {/* Floating sparkles when dragging */}
          <AnimatePresence>
            {isDragging && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="h-4 w-4 text-[#d4622a]" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute -bottom-1 -left-2"
                >
                  <Sparkles className="h-3 w-3 text-[#d4622a]/60" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        <div>
          <motion.p
            animate={{ y: isDragging ? -2 : 0 }}
            className="text-white"
          >
            {isDragging ? (
              <span className="text-[#d4622a]">Release to upload</span>
            ) : (
              <>
                Drop your file here, or{" "}
                <span className="text-[#d4622a] link-underline link-underline-accent">browse</span>
              </>
            )}
          </motion.p>
          <p className="mt-2 text-sm text-white/30 font-mono tracking-wider">
            ANY FILE TYPE · MAX 100GB
          </p>
        </div>
      </div>

      {/* Dragging overlay effect */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-[#d4622a]/10 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
