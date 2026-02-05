"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { WalletButton } from "@/components/wallet/WalletButton";
import { cn } from "@/lib/utils";
import { Menu, X, Github, Twitter, FileText, LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";

interface LeftLink {
  name: string;
  href: string;
  icon: LucideIcon;
  external: boolean;
}

interface RightLink {
  name: string;
  href: string;
}

const leftLinks: LeftLink[] = [
  { name: "GitHub", href: "https://github.com/888tyui/heyx", icon: Github, external: true },
  { name: "Twitter", href: "https://twitter.com/helix", icon: Twitter, external: true },
  { name: "Docs", href: "/docs", icon: FileText, external: false },
];

const rightLinks: RightLink[] = [
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
        {/* Left side - Logo + GitHub, Twitter, Docs */}
        <div className="flex items-center gap-6">
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

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-white/10" />

          {/* Left Nav Links - GitHub, Twitter, Docs */}
          <div className="hidden md:flex items-center gap-1">
            {leftLinks.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-white/40 hover:text-white/80 hover:bg-white/5 rounded-md transition-all duration-200"
                  title={item.name}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-[13px] tracking-wide">{item.name}</span>
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-200",
                    pathname?.startsWith(item.href)
                      ? "text-white bg-white/5"
                      : "text-white/40 hover:text-white/80 hover:bg-white/5"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-[13px] tracking-wide">{item.name}</span>
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Right side - Dashboard, Upload, Network, Connect */}
        <div className="flex items-center gap-2">
          {/* Right Nav Links - Dashboard, Upload */}
          <div className="hidden md:flex items-center gap-1">
            {rightLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3 py-1.5 text-[13px] tracking-wide rounded-md transition-all duration-200",
                  pathname === item.href
                    ? "text-white bg-white/5"
                    : "text-white/40 hover:text-white/80 hover:bg-white/5"
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-3 right-3 h-px bg-[#d4622a]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-white/10 mx-2" />

          {/* Network indicator with pulse */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-white/30 font-mono tracking-widest mr-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="opacity-60">MAINNET</span>
          </div>

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
              {/* Left Links with Icons */}
              {leftLinks.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 py-3 text-lg border-b border-white/5 text-white/50 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 py-3 text-lg border-b border-white/5 transition-colors",
                        pathname === item.href || (item.href === "/docs" && pathname?.startsWith("/docs"))
                          ? "text-[#d4622a]"
                          : "text-white/50 hover:text-white"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1">{item.name}</span>
                      {(pathname === item.href || (item.href === "/docs" && pathname?.startsWith("/docs"))) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4622a]" />
                      )}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Right Links without Icons */}
              {rightLinks.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (leftLinks.length + index) * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 py-3 text-lg border-b border-white/5 transition-colors",
                      pathname === item.href
                        ? "text-[#d4622a]"
                        : "text-white/50 hover:text-white"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex-1">{item.name}</span>
                    {pathname === item.href && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4622a]" />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
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
