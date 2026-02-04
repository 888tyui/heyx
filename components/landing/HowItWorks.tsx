"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Wallet, FileUp, Lock, Database, ArrowRight, Check } from "lucide-react";

const steps = [
  {
    step: "Connect",
    description: "Link your Solana wallet. Phantom, Solflare, or any compatible wallet.",
    icon: Wallet,
    code: "wallet.connect()",
  },
  {
    step: "Select",
    description: "Choose your files. Any type, any size. AI models, datasets, documents.",
    icon: FileUp,
    code: "helix.select(files)",
  },
  {
    step: "Encrypt",
    description: "Toggle encryption. AES-256 in-browser before upload.",
    icon: Lock,
    code: "helix.encrypt(data, key)",
  },
  {
    step: "Store",
    description: "One transaction. Permanent storage. Your files live forever.",
    icon: Database,
    code: "helix.store() // ar://...",
  },
];

// Interactive step card
function StepCard({
  item,
  index,
  isInView,
  activeStep,
  setActiveStep,
}: {
  item: (typeof steps)[0];
  index: number;
  isInView: boolean;
  activeStep: number;
  setActiveStep: (index: number) => void;
}) {
  const Icon = item.icon;
  const isActive = activeStep === index;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
      onMouseEnter={() => setActiveStep(index)}
      className={`group relative cursor-pointer py-6 lg:py-8 border-b border-[#1a1a1a]/10 last:border-0 transition-all duration-300 ${
        isActive ? "pl-4" : "pl-0"
      }`}
    >
      {/* Active indicator line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isActive ? 4 : 0 }}
        className="absolute left-0 top-0 bottom-0 bg-[#d4622a]"
      />

      <div className="flex items-start gap-4 lg:gap-6">
        {/* Icon circle */}
        <motion.div
          animate={{
            backgroundColor: isActive ? "#d4622a" : "transparent",
            borderColor: isActive ? "#d4622a" : "rgba(26, 26, 26, 0.1)",
          }}
          className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300"
        >
          <Icon
            className={`w-5 h-5 lg:w-6 lg:h-6 transition-colors duration-300 ${
              isActive ? "text-white" : "text-[#1a1a1a]/40"
            }`}
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1 pt-1">
          <div className="flex items-center gap-3 mb-2">
            <h3
              className={`text-xl lg:text-2xl font-serif transition-colors duration-300 ${
                isActive ? "text-[#d4622a]" : "text-[#1a1a1a]"
              }`}
            >
              {item.step}
            </h3>
            <motion.div
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
              className="flex items-center gap-1"
            >
              <span className="text-[10px] font-mono text-[#d4622a] tracking-wider">0{index + 1}</span>
            </motion.div>
          </div>
          <p className="text-[#1a1a1a]/40 leading-relaxed text-sm lg:text-base">
            {item.description}
          </p>

          {/* Code snippet that appears on hover */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isActive ? "auto" : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 px-4 py-3 bg-[#0a0a0a] rounded-sm">
              <code className="text-[13px] font-mono text-[#d4622a]">{item.code}</code>
            </div>
          </motion.div>
        </div>

        {/* Arrow indicator */}
        <motion.div
          animate={{
            opacity: isActive ? 1 : 0,
            x: isActive ? 0 : -10,
          }}
          className="hidden lg:flex items-center self-center"
        >
          <ArrowRight className="w-5 h-5 text-[#d4622a]" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Interactive code terminal
function CodeTerminal({ activeStep, isInView }: { activeStep: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="bg-[#0a0a0a] text-white font-mono text-sm overflow-hidden"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-[11px] text-white/30 tracking-wider">helix-cli</span>
      </div>

      {/* Terminal content */}
      <div className="p-4 lg:p-6 space-y-3">
        <div className="text-white/30 text-[11px] tracking-wider mb-4">{`// EXAMPLE WORKFLOW`}</div>

        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: index <= activeStep ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <motion.span
              animate={{
                color: index < activeStep ? "#22c55e" : index === activeStep ? "#d4622a" : "rgba(255,255,255,0.3)",
              }}
              className="text-sm"
            >
              {index < activeStep ? (
                <Check className="w-4 h-4" />
              ) : index === activeStep ? (
                <span className="inline-block w-4 text-center">▸</span>
              ) : (
                <span className="inline-block w-4 text-center opacity-30">○</span>
              )}
            </motion.span>
            <span
              className={`text-[13px] transition-colors duration-300 ${
                index === activeStep ? "text-white" : index < activeStep ? "text-white/50" : "text-white/20"
              }`}
            >
              {step.code}
            </span>
          </motion.div>
        ))}

        {/* Output */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: activeStep === 3 ? 1 : 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-4 border-t border-white/10"
        >
          <div className="text-green-400 text-[13px]">
            ✓ Upload complete
          </div>
          <div className="mt-2 text-[#d4622a]/70 text-[12px]">
            Transaction: ar://Kx7F...3nQ9
          </div>
          <div className="text-white/30 text-[12px]">
            Status: Permanent
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  // Mouse tracking for subtle gradient
  const mouseY = useMotionValue(0.5);
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.target as HTMLElement).closest("section")?.getBoundingClientRect();
      if (rect) {
        const y = (e.clientY - rect.top) / rect.height;
        mouseY.set(y);
      }
    },
    [mouseY]
  );

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#f5f5f0] text-[#1a1a1a] flex items-center overflow-hidden"
    >
      {/* Accent corner */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-0 left-0 w-20 lg:w-28 h-20 lg:h-28 bg-[#d4622a]"
        style={{ transformOrigin: "top left" }}
      />

      {/* Decorative grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#d4622a]/[0.02] to-transparent" />
        <div className="absolute top-[20%] left-0 w-full h-px bg-[#1a1a1a]/[0.03]" />
        <div className="absolute top-[40%] left-0 w-full h-px bg-[#1a1a1a]/[0.03]" />
        <div className="absolute top-[60%] left-0 w-full h-px bg-[#1a1a1a]/[0.03]" />
        <div className="absolute top-[80%] left-0 w-full h-px bg-[#1a1a1a]/[0.03]" />
        <div className="absolute bottom-0 left-1/4 w-px h-2/3 bg-[#1a1a1a]/[0.03]" />
        <div className="absolute bottom-0 left-3/4 w-px h-1/2 bg-[#1a1a1a]/[0.03]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Header + Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
          >
            <span className="text-[10px] font-mono text-[#d4622a] tracking-[0.2em]">
              PROCESS
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl xl:text-6xl font-serif leading-[1.1]">
              Four steps to
              <br />
              <span className="italic text-[#1a1a1a]/50">permanence.</span>
            </h2>
            <p className="mt-6 text-[#1a1a1a]/40 leading-relaxed max-w-sm text-sm">
              No accounts to create. No credit cards. No recurring payments.
              Just your wallet and your files.
            </p>

            {/* Interactive terminal */}
            <div className="mt-10 lg:mt-12">
              <CodeTerminal activeStep={activeStep} isInView={isInView} />
            </div>

            {/* Progress indicator */}
            <div className="mt-6 flex items-center gap-2">
              {steps.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  animate={{
                    backgroundColor: index === activeStep ? "#d4622a" : "transparent",
                    borderColor: index <= activeStep ? "#d4622a" : "rgba(26, 26, 26, 0.2)",
                  }}
                  className="w-8 h-1 border transition-all duration-300 hover:border-[#d4622a]"
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Steps */}
          <div className="lg:col-span-7">
            <div className="space-y-0">
              {steps.map((item, index) => (
                <StepCard
                  key={item.step}
                  item={item}
                  index={index}
                  isInView={isInView}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-12 pt-8 border-t border-[#1a1a1a]/10"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-mono text-[#1a1a1a]/30 tracking-wider">
                  READY TO START?
                </p>
                <motion.a
                  href="#"
                  whileHover={{ x: 5 }}
                  className="group flex items-center gap-2 text-[#d4622a] font-serif text-lg"
                >
                  Try Helix
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom decorative text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-20 lg:mt-28 flex justify-between items-end"
        >
          <p className="text-[10px] font-mono text-[#1a1a1a]/20 tracking-[0.2em]">
            SIMPLE BY DESIGN
          </p>
          <p className="text-[10px] font-mono text-[#1a1a1a]/20 tracking-[0.2em]">
            HELIX / 2024
          </p>
        </motion.div>
      </div>
    </section>
  );
}
