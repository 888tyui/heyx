"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Shield, Lock, Globe, Wallet } from "lucide-react";

const features = [
  {
    number: "01",
    title: "Permanent",
    description:
      "Stored on Arweave's permaweb. 200+ years guaranteed by the network's endowment model. No renewals, no deletions.",
    icon: Shield,
    stat: "200+",
    statLabel: "YEARS",
  },
  {
    number: "02",
    title: "Encrypted",
    description:
      "AES-256-GCM encryption in your browser. We never see your data. You hold the keys. Zero knowledge.",
    icon: Lock,
    stat: "256",
    statLabel: "BIT",
  },
  {
    number: "03",
    title: "Decentralized",
    description:
      "No single point of failure. Replicated across hundreds of nodes worldwide. No company to go bankrupt.",
    icon: Globe,
    stat: "100+",
    statLabel: "NODES",
  },
  {
    number: "04",
    title: "Sovereign",
    description:
      "Pay with SOL from your wallet. No accounts, no email, no KYC. Connect, encrypt, upload.",
    icon: Wallet,
    stat: "0",
    statLabel: "KYC",
  },
];

function FeatureCard({
  feature,
  index,
  isInView,
}: {
  feature: (typeof features)[0];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#0a0a0a] p-8 lg:p-12 cursor-default"
    >
      {/* Corner accent */}
      <motion.div
        initial={{ width: 0, height: 0 }}
        animate={{
          width: isHovered ? 40 : 0,
          height: isHovered ? 40 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 border-t-2 border-l-2 border-[#d4622a]"
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-8">
        <span className="text-[10px] font-mono text-[#d4622a] tracking-widest">
          {feature.number}
        </span>
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
            backgroundColor: isHovered ? "rgba(212, 98, 42, 0.2)" : "transparent",
          }}
          transition={{ duration: 0.3 }}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10"
        >
          <Icon
            className={`w-4 h-4 transition-colors duration-300 ${
              isHovered ? "text-[#d4622a]" : "text-white/30"
            }`}
          />
        </motion.div>
      </div>

      {/* Title */}
      <motion.h3
        animate={{ x: isHovered ? 8 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl lg:text-3xl font-serif text-white mb-4 group-hover:text-[#d4622a] transition-colors duration-300"
      >
        {feature.title}
      </motion.h3>

      {/* Description */}
      <p className="text-white/30 leading-relaxed text-sm mb-8">
        {feature.description}
      </p>

      {/* Stat badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        className="flex items-baseline gap-2"
      >
        <span className="text-3xl lg:text-4xl font-serif text-white/80">
          {feature.stat}
        </span>
        <span className="text-[10px] font-mono text-white/30 tracking-wider">
          {feature.statLabel}
        </span>
      </motion.div>

      {/* Bottom line accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-8 right-8 lg:left-12 lg:right-12 h-px bg-[#d4622a]/50 origin-left"
      />
    </motion.div>
  );
}

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Parallax effect for background
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      id="features"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#0a0a0a] flex items-center"
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.02]" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-white/[0.02]" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-white/[0.02]" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-white/[0.02]" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-white/[0.02]" />
      </div>

      {/* Subtle glow following mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${springX.get() * 100}% ${springY.get() * 100}%, rgba(212, 98, 42, 0.03) 0%, transparent 40%)`,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <span className="text-[10px] font-mono text-[#d4622a] tracking-[0.2em]">
              WHY HELIX
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl xl:text-6xl font-serif text-white leading-[1.1]">
              Storage that
              <br />
              <span className="italic text-white/60">respects</span> you.
            </h2>
          </div>
          <p className="text-white/30 max-w-sm lg:text-right text-sm leading-relaxed">
            Built for those who value privacy, permanence, and true ownership of their digital assets.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/[0.03]">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.number}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 lg:mt-24 flex items-center justify-center gap-8"
        >
          {["YOUR DATA", "YOUR RULES", "YOUR FUTURE"].map((text, i) => (
            <motion.span
              key={text}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="text-[10px] font-mono text-white/20 tracking-[0.2em] flex items-center gap-8"
            >
              {text}
              {i < 2 && <span className="text-[#d4622a]/40">/</span>}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
