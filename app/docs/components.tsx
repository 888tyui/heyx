"use client";
/* eslint-disable react/no-unescaped-entities */

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { ChevronRight, Copy, Check, ExternalLink } from "lucide-react";

export function PageHeader({
  badge,
  title,
  description,
  readTime,
}: {
  badge: string;
  title: string;
  description: string;
  readTime?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-block text-[10px] font-mono text-[#d4622a] tracking-[0.2em] px-2 py-1 bg-[#d4622a]/10 border border-[#d4622a]/20 rounded"
      >
        {badge}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl lg:text-4xl font-serif text-white mt-4 mb-4"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/50 text-lg leading-relaxed"
      >
        {description}
      </motion.p>
      {readTime && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 mt-4"
        >
          <div className="w-8 h-px bg-gradient-to-r from-[#d4622a]/50 to-transparent" />
          <p className="text-white/20 text-sm font-mono">{readTime}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-xl lg:text-2xl font-serif text-white mt-16 mb-6 flex items-center gap-3"
    >
      <span className="w-1 h-6 bg-gradient-to-b from-[#d4622a] to-[#d4622a]/30 rounded-full" />
      {children}
    </motion.h2>
  );
}

export function SubSection({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-lg font-serif text-white mt-8 mb-4 flex items-center gap-2">
      <ChevronRight className="h-4 w-4 text-[#d4622a]" />
      {children}
    </h3>
  );
}

export function Paragraph({ children }: { children: ReactNode }) {
  return <p className="text-white/60 leading-relaxed mb-4">{children}</p>;
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="text-white/70 text-lg leading-relaxed mb-6 first-letter:text-3xl first-letter:font-serif first-letter:text-[#d4622a] first-letter:mr-1">
      {children}
    </p>
  );
}

export function CodeBlock({ children, title }: { children: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-6 group"
    >
      {title && (
        <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 border-b-0 px-4 py-2 rounded-t-lg">
          <span className="text-xs font-mono text-white/40">{title}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-400" />
                <span className="text-green-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <pre className={`bg-black/50 border border-white/10 p-4 overflow-x-auto text-sm ${title ? 'border-t-0 rounded-b-lg' : 'rounded-lg'}`}>
        <code className="text-green-400/90 font-mono">{children}</code>
      </pre>
    </motion.div>
  );
}

export function Diagram({ children, title }: { children: string; title?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="my-8"
    >
      {title && (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#d4622a]/50" />
          <p className="text-[10px] font-mono text-white/30 tracking-[0.15em]">
            {title}
          </p>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        </div>
      )}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4622a]/5 to-transparent rounded-xl" />
        <pre className="relative bg-black/30 border border-white/5 p-6 overflow-x-auto text-xs text-white/60 font-mono leading-relaxed rounded-xl">
          {children}
        </pre>
      </div>
    </motion.div>
  );
}

export function FeatureGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">{children}</div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group relative border border-white/10 p-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 rounded-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#d4622a]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <Icon className="h-5 w-5 text-[#d4622a] mb-3 group-hover:scale-110 transition-transform" />
      <h4 className="text-white font-medium mb-2">{title}</h4>
      <p className="text-white/40 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="overflow-x-auto my-6 rounded-xl border border-white/10"
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.03]">
            {headers.map((header, i) => (
              <th key={i} className="text-left p-4 text-white font-medium first:rounded-tl-xl last:rounded-tr-xl">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-white/60">
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="p-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "tip";
  title?: string;
  children: ReactNode;
}) {
  const styles = {
    info: {
      border: "border-blue-500/30",
      bg: "bg-gradient-to-r from-blue-500/10 to-transparent",
      icon: "bg-blue-500",
      title: "text-blue-400",
    },
    warning: {
      border: "border-amber-500/30",
      bg: "bg-gradient-to-r from-amber-500/10 to-transparent",
      icon: "bg-amber-500",
      title: "text-amber-400",
    },
    tip: {
      border: "border-[#d4622a]/30",
      bg: "bg-gradient-to-r from-[#d4622a]/10 to-transparent",
      icon: "bg-[#d4622a]",
      title: "text-[#d4622a]",
    },
  };

  const s = styles[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`border-l-2 ${s.border} ${s.bg} p-5 my-6 rounded-r-xl`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-1.5 h-1.5 rounded-full ${s.icon} mt-2 flex-shrink-0`} />
        <div>
          {title && (
            <p className={`text-sm font-medium ${s.title} mb-2`}>
              {title}
            </p>
          )}
          <div className="text-white/60 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Quote({ children, author }: { children: ReactNode; author?: string }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative my-8 py-6 px-6"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#d4622a] via-[#d4622a]/50 to-transparent rounded-full" />
      <div className="absolute top-2 left-4 text-[#d4622a]/20 text-6xl font-serif leading-none">"</div>
      <p className="relative text-white/80 text-xl font-serif italic leading-relaxed pl-4">
        {children}
      </p>
      {author && (
        <p className="text-white/40 text-sm mt-4 pl-4 flex items-center gap-2">
          <span className="w-4 h-px bg-white/20" />
          {author}
        </p>
      )}
    </motion.blockquote>
  );
}

export function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`${ordered ? "list-decimal" : "list-none"} text-white/60 space-y-3 my-4 ml-2`}>
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-3"
        >
          {!ordered && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4622a]/50 mt-2 flex-shrink-0" />
          )}
          <span>{item}</span>
        </motion.li>
      ))}
    </Tag>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="text-center p-4"
    >
      <p className="text-3xl font-serif text-[#d4622a]">{value}</p>
      <p className="text-white/40 text-sm mt-1">{label}</p>
    </motion.div>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 border border-white/10 p-4 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent"
    >
      {children}
    </motion.div>
  );
}

// New interactive components for architecture diagrams

export function FlowDiagram({
  steps
}: {
  steps: Array<{ title: string; description: string; icon?: any }>
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="my-8 relative"
    >
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-4 mb-6 last:mb-0"
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-[#d4622a]/20 border border-[#d4622a]/30 flex items-center justify-center text-[#d4622a] font-mono text-sm font-bold">
              {String(i + 1).padStart(2, '0')}
            </div>
            {i < steps.length - 1 && (
              <div className="w-px flex-1 bg-gradient-to-b from-[#d4622a]/30 to-transparent my-2" />
            )}
          </div>
          <div className="flex-1 pb-6">
            <h4 className="text-white font-medium mb-1">{step.title}</h4>
            <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function LayerDiagram({
  layers,
}: {
  layers: Array<{ name: string; items: string[]; color: string }>;
}) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="my-8 space-y-3"
    >
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          onMouseEnter={() => setActiveLayer(i)}
          onMouseLeave={() => setActiveLayer(null)}
          className={`relative border rounded-xl p-4 transition-all duration-300 cursor-pointer ${
            activeLayer === i
              ? 'border-white/20 bg-white/[0.04]'
              : 'border-white/10 bg-white/[0.02]'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-3 h-3 rounded-full ${layer.color}`} />
            <span className="text-white font-medium text-sm">{layer.name}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {layer.items.map((item, j) => (
              <motion.span
                key={j}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: j * 0.05 }}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all duration-200 ${
                  activeLayer === i
                    ? 'bg-white/10 text-white/80'
                    : 'bg-white/5 text-white/50'
                }`}
              >
                {item}
              </motion.span>
            ))}
          </div>
          {i < layers.length - 1 && (
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-white/20">
              ↓
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ComparisonTable({
  title,
  left,
  right,
}: {
  title?: string;
  left: { label: string; items: string[] };
  right: { label: string; items: string[] };
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="my-8 rounded-xl border border-white/10 overflow-hidden"
    >
      {title && (
        <div className="px-4 py-3 bg-white/[0.03] border-b border-white/10">
          <span className="text-xs font-mono text-white/40 tracking-wider">{title}</span>
        </div>
      )}
      <div className="grid grid-cols-2">
        <div className="border-r border-white/10 p-4">
          <div className="text-white/40 text-xs font-mono tracking-wider mb-3">{left.label}</div>
          <ul className="space-y-2">
            {left.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-white/50 text-sm">
                <span className="text-red-400/60">×</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-[#d4622a]/5">
          <div className="text-[#d4622a] text-xs font-mono tracking-wider mb-3">{right.label}</div>
          <ul className="space-y-2">
            {right.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                <span className="text-[#d4622a]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function InfoCard({
  icon: Icon,
  title,
  children,
  color = "orange",
}: {
  icon?: any;
  title: string;
  children: ReactNode;
  color?: "orange" | "green" | "blue" | "purple";
}) {
  const colors = {
    orange: "border-[#d4622a]/30 bg-[#d4622a]/5",
    green: "border-green-500/30 bg-green-500/5",
    blue: "border-blue-500/30 bg-blue-500/5",
    purple: "border-purple-500/30 bg-purple-500/5",
  };

  const iconColors = {
    orange: "text-[#d4622a]",
    green: "text-green-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`border ${colors[color]} p-4 rounded-xl my-4`}
    >
      <div className="flex items-start gap-3">
        {Icon && <Icon className={`h-5 w-5 ${iconColors[color]} flex-shrink-0 mt-0.5`} />}
        <div>
          <p className="text-white font-medium text-sm mb-1">{title}</p>
          <div className="text-white/50 text-sm">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Timeline({
  items,
}: {
  items: Array<{ time: string; title: string; description?: string }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="my-8 relative"
    >
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#d4622a] via-[#d4622a]/30 to-transparent" />
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-4 mb-4 last:mb-0"
        >
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-[#d4622a] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4622a]" />
            </div>
          </div>
          <div className="flex-1 pb-4">
            <span className="text-[10px] font-mono text-[#d4622a] tracking-wider">{item.time}</span>
            <h4 className="text-white font-medium text-sm mt-1">{item.title}</h4>
            {item.description && (
              <p className="text-white/40 text-xs mt-1">{item.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ProcessFlow({
  items,
}: {
  items: Array<{ label: string; sublabel?: string }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="my-8 flex flex-wrap items-center justify-center gap-2"
    >
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-center hover:bg-white/[0.05] hover:border-white/20 transition-all"
          >
            <div className="text-white text-sm font-medium">{item.label}</div>
            {item.sublabel && (
              <div className="text-white/40 text-[10px] font-mono mt-0.5">{item.sublabel}</div>
            )}
          </motion.div>
          {i < items.length - 1 && (
            <ChevronRight className="h-4 w-4 text-[#d4622a]/50" />
          )}
        </div>
      ))}
    </motion.div>
  );
}
