"use client";

import { motion } from "framer-motion";
import { FileText, HardDrive, Lock, Upload, TrendingUp } from "lucide-react";
import { formatBytes } from "@/lib/utils";
import type { StorageStats as StorageStatsType } from "@/types";

interface StorageStatsProps {
  stats: StorageStatsType | null;
  isLoading?: boolean;
}

export function StorageStats({ stats, isLoading }: StorageStatsProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid gap-px bg-white/5 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#0a0a0a] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-3 w-20 bg-white/10 animate-pulse" />
              <div className="h-4 w-4 bg-white/5 animate-pulse" />
            </div>
            <div className="h-9 w-20 bg-white/10 shimmer" />
          </div>
        ))}
      </div>
    );
  }

  const statItems = [
    {
      title: "Total Files",
      value: stats.totalFiles.toString(),
      icon: FileText,
      trend: "+3",
      color: "text-blue-400",
    },
    {
      title: "Total Storage",
      value: formatBytes(stats.totalSize),
      icon: HardDrive,
      trend: null,
      color: "text-[#d4622a]",
    },
    {
      title: "Encrypted",
      value: stats.encryptedFiles.toString(),
      icon: Lock,
      trend: null,
      color: "text-yellow-400",
    },
    {
      title: "Recent",
      value: stats.recentUploads.length.toString(),
      icon: Upload,
      trend: "7d",
      color: "text-green-400",
    },
  ];

  return (
    <div className="grid gap-px bg-white/5 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-[#0a0a0a] p-6 hover:bg-[#0d0d0d] transition-all duration-300 overflow-hidden"
          >
            {/* Corner accent on hover */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#d4622a]/30"
            />

            {/* Background glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">
                  {item.title}
                </span>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`p-1.5 rounded-sm bg-white/5 group-hover:bg-white/10 transition-colors ${item.color}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </motion.div>
              </div>

              <div className="flex items-end justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-3xl lg:text-4xl font-serif text-white tracking-tight"
                >
                  {item.value}
                </motion.div>

                {item.trend && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-1 text-[10px] font-mono text-white/20"
                  >
                    {item.trend.startsWith("+") && (
                      <TrendingUp className="h-3 w-3 text-green-500/50" />
                    )}
                    <span>{item.trend}</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#d4622a]/50 to-transparent origin-left"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
