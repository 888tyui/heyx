"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/components/wallet/WalletButton";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const numericPart = value.replace(/[^0-9]/g, "");
    const target = parseInt(numericPart, 10);

    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      setDisplayValue(current.toString());

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setHasAnimated(true);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1200);

    return () => clearTimeout(timer);
  }, [value, hasAnimated]);

  return (
    <span className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

// Floating particle component
function FloatingParticle({ delay, duration, x, y }: { delay: number; duration: number; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        y: [0, -100, -200, -300],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute w-1 h-1 bg-[#d4622a]/40 rounded-full"
    />
  );
}

export function Hero() {
  const { connected } = useWallet();
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("00:00:00");
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number; duration: number }[]>([]);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    }
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 50 + Math.random() * 40,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[calc(100vh-4rem)] bg-[#0a0a0a] flex flex-col overflow-hidden"
    >
      {/* Interactive gradient that follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(212, 98, 42, 0.08) 0%, transparent 50%)`,
          // @ts-ignore - CSS custom properties
          "--mouse-x": smoothX,
          "--mouse-y": smoothY,
        }}
      />

      {/* Subtle accent gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#d4622a]/5 via-transparent to-transparent" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <FloatingParticle key={p.id} {...p} />
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-white/0 via-white/[0.03] to-white/0" />
        <div className="absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-white/0 via-white/[0.02] to-white/0" />
        <div className="absolute top-0 left-[90%] w-px h-full bg-gradient-to-b from-white/0 via-white/[0.03] to-white/0" />
        <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-white/0 via-white/[0.02] to-white/0" />
        <div className="absolute top-[70%] left-0 w-full h-px bg-gradient-to-r from-white/0 via-white/[0.02] to-white/0" />
      </div>

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex-1 flex flex-col container mx-auto px-6 lg:px-12"
      >
        {/* Top bar */}
        <div className="pt-12 pb-8 flex justify-between items-start text-xs text-white/40 border-b border-white/5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-1"
          >
            <div className="font-mono tracking-widest text-[10px]">LOCATION</div>
            <div className="text-white/60">Decentralized</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block text-center space-y-1"
          >
            <div className="font-mono tracking-widest text-[10px]">STATUS</div>
            <div className="flex items-center gap-2 text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Online
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-right space-y-1"
          >
            <div className="font-mono tracking-widest text-[10px]">LOCAL TIME</div>
            <div className="text-white/60 font-mono tabular-nums tracking-wider">{time}</div>
          </motion.div>
        </div>

        {/* Main content - vertically centered */}
        <div className="flex-1 flex flex-col justify-center py-8 lg:py-12">
          {/* CA Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#d4622a]/30 bg-[#d4622a]/5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4622a] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4622a]" />
              </span>
              <span className="text-[11px] font-mono tracking-wider text-[#d4622a]/80">
                CA: AwnQvpSU7E1VraPLNZ2SaJeTgiVENzDMXq4Eozygpump
              </span>
            </div>
          </motion.div>

          {/* Oversized headline with serif */}
          <div className="relative">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -left-4 lg:-left-8 top-0 w-px bg-gradient-to-b from-[#d4622a] via-[#d4622a]/50 to-transparent"
            />

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[14vw] md:text-[12vw] lg:text-[9vw] font-serif font-normal leading-[0.85] tracking-[-0.02em] text-white"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Data that
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.span
                  className="italic text-[#d4622a] inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  outlives
                </motion.span>{" "}
                you.
              </motion.span>
            </motion.h1>

            {/* Side annotation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute right-0 bottom-0 hidden xl:block max-w-[200px] text-right"
            >
              <div className="text-[10px] font-mono text-white/30 tracking-widest mb-2">ABOUT</div>
              <p className="text-sm text-white/40 leading-relaxed">
                Permanent storage on Arweave.
                <br />
                Military-grade encryption.
                <br />
                <span className="text-[#d4622a]">Pay once.</span>
              </p>
            </motion.div>
          </div>

          {/* Bottom section */}
          <div className="mt-12 lg:mt-20 grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-md"
            >
              <p className="text-base lg:text-lg text-white/40 leading-relaxed">
                Stop renting storage from corporations that mine your data.
                Helix encrypts your files client-side and stores them permanently
                on the permaweb.
              </p>
            </motion.div>

            {/* Right: CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-start lg:items-end justify-end"
            >
              {connected ? (
                <Link href="/upload" className="group">
                  <div className="flex items-end gap-4">
                    <span className="text-3xl lg:text-4xl font-serif text-white group-hover:text-[#d4622a] transition-colors duration-300">
                      Upload
                    </span>
                    <ArrowDownRight className="w-7 h-7 text-[#d4622a] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
                  </div>
                  <motion.div
                    className="mt-3 h-px w-full bg-white/10 origin-left"
                    whileHover={{ scaleX: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-white/30 lg:text-right font-mono text-[11px] tracking-wider">
                    Connect wallet to begin
                  </p>
                  <WalletButton />
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="py-8 border-t border-white/5 grid grid-cols-3 gap-6 lg:gap-8"
        >
          {[
            { label: "STORAGE", value: "200", suffix: "+ yrs" },
            { label: "ENCRYPTION", value: "AES-256", suffix: "" },
            { label: "NETWORK", value: "Arweave", suffix: "" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="group cursor-default"
            >
              <div className="text-[10px] font-mono text-white/20 mb-2 tracking-widest group-hover:text-[#d4622a]/50 transition-colors">
                {stat.label}
              </div>
              <div className="text-xl lg:text-2xl font-serif text-white group-hover:text-white/80 transition-colors">
                {stat.label === "STORAGE" ? (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-white/20 tracking-[0.2em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-[#d4622a]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
