"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Lock,
  Upload,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { cn, getIrysUrl } from "@/lib/utils";
import type { UploadProgress as UploadProgressType } from "@/types";

interface UploadProgressProps {
  progress: UploadProgressType;
  onReset?: () => void;
}

const statusConfig = {
  idle: {
    icon: Upload,
    color: "text-white/40",
    borderColor: "border-white/10",
    bgColor: "bg-white/5",
    label: "READY",
  },
  encrypting: {
    icon: Lock,
    color: "text-yellow-500",
    borderColor: "border-yellow-500/30",
    bgColor: "bg-yellow-500/5",
    label: "ENCRYPTING",
  },
  uploading: {
    icon: Loader2,
    color: "text-[#d4622a]",
    borderColor: "border-[#d4622a]/30",
    bgColor: "bg-[#d4622a]/5",
    label: "UPLOADING",
  },
  confirming: {
    icon: Loader2,
    color: "text-blue-500",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/5",
    label: "CONFIRMING",
  },
  complete: {
    icon: CheckCircle,
    color: "text-green-500",
    borderColor: "border-green-500/30",
    bgColor: "bg-green-500/5",
    label: "COMPLETE",
  },
  error: {
    icon: XCircle,
    color: "text-red-500",
    borderColor: "border-red-500/30",
    bgColor: "bg-red-500/5",
    label: "ERROR",
  },
};

export function UploadProgress({ progress, onReset }: UploadProgressProps) {
  const config = statusConfig[progress.status];
  const Icon = config.icon;
  const isAnimated = progress.status === "uploading" || progress.status === "confirming" || progress.status === "encrypting";
  const isComplete = progress.status === "complete";
  const isError = progress.status === "error";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("relative border p-6 overflow-hidden", config.borderColor, config.bgColor)}
    >
      {/* Animated background gradient */}
      {isAnimated && (
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
        />
      )}

      {/* Success sparkles */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4"
          >
            <Sparkles className="h-5 w-5 text-green-500/50" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex items-start gap-4">
        {/* Icon with animation */}
        <motion.div
          animate={isComplete ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
          className={cn("mt-0.5 flex-shrink-0", config.color)}
        >
          <Icon className={cn("h-6 w-6", isAnimated && "animate-spin")} />
        </motion.div>

        <div className="flex-1 space-y-4 min-w-0">
          {/* Status header */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <motion.p
                key={progress.message}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-medium text-white"
              >
                {progress.message}
              </motion.p>
              {progress.error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-400 mt-1"
                >
                  {progress.error}
                </motion.p>
              )}
            </div>
            <span className={cn(
              "text-[10px] font-mono uppercase tracking-[0.15em] px-2 py-1 border flex-shrink-0",
              config.color,
              config.borderColor
            )}>
              {config.label}
            </span>
          </div>

          {/* Progress bar */}
          {progress.status !== "idle" && progress.status !== "error" && (
            <div className="space-y-2">
              <div className="relative h-1.5 bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={cn(
                    "h-full transition-all duration-300",
                    isComplete ? "bg-green-500" : "bg-[#d4622a]"
                  )}
                />
                {/* Animated shine on progress bar */}
                {isAnimated && (
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                )}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/30">
                <span>{progress.progress.toFixed(0)}%</span>
                {isComplete && <span className="text-green-500/70">PERMANENT</span>}
              </div>
              {isComplete && (
                <p className="text-[9px] text-white/20 font-mono tracking-wider">
                  ARWEAVE CHAIN CONFIRMATION MAY TAKE UP TO 15 MIN
                </p>
              )}
            </div>
          )}

          {/* Transaction ID */}
          <AnimatePresence>
            {progress.txId && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 p-3 bg-white/5"
              >
                <span className="text-[10px] font-mono text-white/30 tracking-wider">TX</span>
                <a
                  href={getIrysUrl(progress.txId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#d4622a] hover:text-white transition-colors font-mono text-sm group"
                >
                  <span className="truncate">
                    {progress.txId.slice(0, 12)}...{progress.txId.slice(-12)}
                  </span>
                  <ExternalLink className="h-3 w-3 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action button */}
          <AnimatePresence>
            {(isComplete || isError) && onReset && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onReset}
                className={cn(
                  "px-4 py-2.5 border text-sm transition-all btn-shine",
                  isComplete
                    ? "border-green-500/30 text-green-400 hover:bg-green-500/10"
                    : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
                )}
              >
                {isComplete ? "Upload Another File" : "Try Again"}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress.progress / 100 }}
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5 origin-left",
          isComplete ? "bg-green-500" : isError ? "bg-red-500" : "bg-[#d4622a]"
        )}
      />
    </motion.div>
  );
}
