"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/components/wallet/WalletButton";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Animated stat counter
function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [displayValue, setDisplayValue] = useState(value.startsWith("$") ? "$0" : "0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const numericPart = value.replace(/[^0-9]/g, "");
    const target = parseInt(numericPart, 10);
    const prefix = value.startsWith("$") ? "$" : "";
    const suffix = value.endsWith("%") ? "%" : "";

    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      setDisplayValue(`${prefix}${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay, isInView]);

  return (
    <div ref={ref} className="group">
      <div className="text-3xl lg:text-4xl font-serif text-white mb-2 group-hover:text-[#d4622a] transition-colors duration-300 tabular-nums">
        {displayValue}
      </div>
      <div className="text-[10px] font-mono text-white/20 tracking-[0.15em]">
        {label}
      </div>
    </div>
  );
}

export function CTA() {
  const { connected } = useWallet();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Mouse tracking for interactive gradient
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#0a0a0a] flex items-center overflow-hidden"
    >
      {/* Mouse-following gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${smoothX.get() * 100}% ${smoothY.get() * 100}%, rgba(212, 98, 42, 0.06) 0%, transparent 50%)`,
        }}
      />

      {/* Large accent text background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
      >
        <motion.span
          animate={{
            x: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-[25vw] font-serif italic text-white/[0.015] whitespace-nowrap"
        >
          forever
        </motion.span>
      </motion.div>

      {/* Decorative grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/4 h-px bg-gradient-to-l from-[#d4622a]/20 to-transparent" />
        <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-[#d4622a]/10 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[10px] font-mono text-[#d4622a] tracking-[0.2em] block mb-6"
          >
            GET STARTED
          </motion.span>

          {/* Main headline with staggered animation */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95]">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="block"
            >
              Your data
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="block"
            >
              deserves
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="block"
            >
              <motion.span
                className="italic text-[#d4622a] inline-block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                better.
              </motion.span>
            </motion.span>
          </h2>

          {/* CTA section */}
          <div className="mt-16 lg:mt-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-white/30 text-base lg:text-lg max-w-md leading-relaxed"
            >
              Stop paying monthly for storage that disappears when you stop paying.
              Upload once, own forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              {connected ? (
                <Link href="/upload" className="group inline-flex items-center gap-4">
                  <span className="text-2xl lg:text-3xl font-serif text-white group-hover:text-[#d4622a] transition-colors duration-300">
                    Start uploading
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#d4622a] group-hover:bg-[#d4622a] transition-all duration-300"
                  >
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </motion.div>
                </Link>
              ) : (
                <div className="space-y-4">
                  <p className="text-[11px] font-mono text-white/30 tracking-wider">
                    Connect wallet to begin
                  </p>
                  <WalletButton />
                </div>
              )}
            </motion.div>
          </div>

          {/* Bottom stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-24 lg:mt-32 pt-12 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {[
              { label: "MONTHLY FEES", value: "$0" },
              { label: "DATA BREACHES", value: "0" },
              { label: "UPTIME", value: "100%" },
              { label: "KYC REQUIRED", value: "None" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {stat.value === "None" ? (
                  <div className="group">
                    <div className="text-3xl lg:text-4xl font-serif text-white mb-2 group-hover:text-[#d4622a] transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-mono text-white/20 tracking-[0.15em]">
                      {stat.label}
                    </div>
                  </div>
                ) : (
                  <AnimatedStat value={stat.value} label={stat.label} delay={0.8 + index * 0.1} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom right decorative */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="absolute bottom-12 right-6 lg:right-12"
        >
          <p
            className="text-[10px] font-mono text-white/10 tracking-[0.2em] hidden lg:block"
            style={{ writingMode: "vertical-rl" }}
          >
            HELIX / 2024
          </p>
        </motion.div>
      </div>
    </section>
  );
}
