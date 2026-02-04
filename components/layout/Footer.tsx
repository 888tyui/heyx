"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Twitter, ArrowUpRight } from "lucide-react";

const links = {
  product: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Upload", href: "/upload" },
  ],
  resources: [
    { name: "Irys Docs", href: "https://docs.irys.xyz", external: true },
    { name: "Arweave", href: "https://arweave.org", external: true },
    { name: "Solana", href: "https://solana.com", external: true },
  ],
  social: [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  ],
};

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Accent line at top right */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 96 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 right-0 h-px bg-[#d4622a]/30"
      />

      {/* Subtle corner glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#d4622a]/5 via-transparent to-transparent pointer-events-none" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.02]" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-white/[0.02]" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-white/[0.02]" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <Link href="/" className="inline-block mb-6 group">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Image
                  src="/lw.png"
                  alt="Helix"
                  width={100}
                  height={35}
                  className="h-7 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </motion.div>
            </Link>
            <p className="text-white/30 text-sm max-w-sm mb-8 leading-relaxed">
              Decentralized permanent storage powered by Solana and Arweave.
              Your data, encrypted, forever.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {links.social.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="w-9 h-9 flex items-center justify-center border border-white/10
                      text-white/30 hover:text-[#d4622a] hover:border-[#d4622a]/50 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Product links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-4">
                PRODUCT
              </h3>
              <ul className="space-y-3">
                {links.product.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-white/40 hover:text-white transition-colors duration-200 text-sm link-underline"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-4">
                RESOURCES
              </h3>
              <ul className="space-y-3">
                {links.resources.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-white/40 hover:text-white transition-colors duration-200 text-sm group"
                    >
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-[10px] font-mono text-white/20 tracking-[0.2em] mb-4">
                STATUS
              </h3>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Operational
              </div>
              <div className="mt-4 text-[11px] text-white/20 font-mono">
                <div className="flex justify-between mb-1">
                  <span>Uptime</span>
                  <span className="text-green-500/70">99.99%</span>
                </div>
                <div className="w-full h-1 bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "99.99%" } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-green-500/50"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-[11px] font-mono tracking-wider">
              {new Date().getFullYear()} HELIX. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/terms">
                <motion.span
                  whileHover={{ y: -1 }}
                  className="text-white/10 text-[11px] font-mono tracking-[0.2em] hover:text-white/30 transition-colors cursor-pointer"
                >
                  TERMS
                </motion.span>
              </Link>
              <Link href="/privacy">
                <motion.span
                  whileHover={{ y: -1 }}
                  className="text-white/10 text-[11px] font-mono tracking-[0.2em] hover:text-white/30 transition-colors cursor-pointer"
                >
                  PRIVACY
                </motion.span>
              </Link>
              <p className="text-white/10 text-[11px] font-mono tracking-[0.2em]">
                BUILT FOR PERMANENCE
              </p>
            </div>
          </div>
        </motion.div>

        {/* Corner decoration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/5"
        />
      </div>
    </footer>
  );
}
