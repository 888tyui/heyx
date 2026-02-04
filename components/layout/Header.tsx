"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { WalletButton } from "@/components/wallet/WalletButton";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Upload", href: "/upload" },
];

export function Header() {
  const pathname = usePathname();
  const { connected } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], [12, 20]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      style={{ opacity: headerOpacity }}
      className="fixed top-0 left-0 right-0 z-50 h-16"
    >
      {/* Background with dynamic blur */}
      <motion.div
        className="absolute inset-0 bg-[#0a0a0a]/90"
        style={{ backdropFilter: `blur(${headerBlur}px)` }}
      />

      {/* Bottom border */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300",
          isScrolled ? "bg-white/10" : "bg-white/5"
        )}
      />

      {/* Accent line - animated on scroll */}
      <motion.div
        initial={{ width: 64 }}
        animate={{ width: isScrolled ? 32 : 64 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 h-px bg-[#d4622a]/50"
      />

      {/* Subtle top glow when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-b from-[#d4622a]/5 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      <nav className="relative h-full container mx-auto flex items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Image
              src="/lw.png"
              alt="Helix"
              width={80}
              height={28}
              className="h-6 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {connected &&
            navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative text-[13px] tracking-wide transition-colors duration-200 py-1 link-underline link-underline-accent",
                  pathname === item.href
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-[5px] left-0 right-0 h-px bg-[#d4622a]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">
          {/* Network indicator with pulse */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-white/30 font-mono tracking-widest">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="opacity-60">MAINNET</span>
          </div>

          {/* Divider with gradient */}
          <div className="hidden sm:block w-px h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          {/* Wallet Button - Desktop */}
          <div className="hidden md:block">
            <WalletButton />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors border border-transparent hover:border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden absolute top-16 left-0 right-0 border-t border-white/5 bg-[#0a0a0a]/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 space-y-2">
              {connected &&
                navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-3 text-lg font-serif border-b border-white/5 transition-colors",
                        pathname === item.href
                          ? "text-[#d4622a]"
                          : "text-white/50 hover:text-white"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center justify-between">
                        {item.name}
                        {pathname === item.href && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4622a]" />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-6"
              >
                <WalletButton />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
