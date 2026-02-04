"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { truncateAddress } from "@/lib/utils";
import { Wallet, LogOut, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function WalletButton() {
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (connected) {
      return;
    }
    setVisible(true);
  };

  const copyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={copyAddress}
          className="flex items-center gap-3 px-4 py-2.5 border border-white/20 bg-transparent
            text-white text-sm font-mono hover:border-[#d4622a]/50 transition-all duration-200"
        >
          <Wallet className="h-4 w-4 text-[#d4622a]" />
          <span className="tracking-wider">{truncateAddress(publicKey.toBase58())}</span>
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-white/30 hover:text-white transition-colors" />
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => disconnect()}
          className="p-2.5 border border-white/20 text-white/40 hover:text-red-400 hover:border-red-400/50 transition-all duration-200"
          title="Disconnect wallet"
        >
          <LogOut className="h-4 w-4" />
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="group flex items-center gap-3 px-6 py-3 bg-white text-[#0a0a0a] font-medium
        hover:bg-[#d4622a] hover:text-white transition-all duration-300"
    >
      <Wallet className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
      <span className="text-sm tracking-wider">CONNECT</span>
    </motion.button>
  );
}
