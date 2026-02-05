"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Shield,
  Database,
  Upload,
  Share2,
  Coins,
  Lightbulb,
  Menu,
  X,
  Server,
  Code,
  Box,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "overview", title: "Overview", href: "/docs", icon: FileText },
  { id: "problem", title: "Problem Statement", href: "/docs/problem", icon: Lightbulb },
  { id: "architecture", title: "Architecture", href: "/docs/architecture", icon: Server },
  { id: "technologies", title: "Core Technologies", href: "/docs/technologies", icon: Code },
  { id: "upload-flow", title: "Upload Flow", href: "/docs/upload-flow", icon: Upload },
  { id: "security", title: "Security", href: "/docs/security", icon: Shield },
  { id: "database", title: "Database & API", href: "/docs/database", icon: Database },
  { id: "sharing", title: "File Sharing", href: "/docs/sharing", icon: Share2 },
  { id: "costs", title: "Cost Structure", href: "/docs/costs", icon: Coins },
  { id: "use-cases", title: "Use Cases", href: "/docs/use-cases", icon: Box },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const currentIndex = sections.findIndex(
    (s) => s.href === pathname || (pathname === "/docs" && s.href === "/docs")
  );
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 w-10 h-10 bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-white/60 hover:text-white"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Centered container */}
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-64 bg-[#0a0a0a] border-r border-white/5 overflow-y-auto z-40 transition-transform duration-300 flex-shrink-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="p-6">
            <div className="mb-8">
              <span className="text-[10px] font-mono text-[#d4622a] tracking-[0.2em]">
                DOCUMENTATION
              </span>
              <h1 className="text-xl font-serif text-white mt-1">Helix Docs</h1>
              <p className="text-white/30 text-xs mt-2">v1.0.0</p>
            </div>

            <nav className="space-y-1">
              {sections.map((section) => {
                const isActive = pathname === section.href ||
                  (pathname === "/docs" && section.href === "/docs");
                return (
                  <Link
                    key={section.id}
                    href={section.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200 rounded",
                      isActive
                        ? "bg-[#d4622a]/10 text-[#d4622a] border-l-2 border-[#d4622a] -ml-[2px] pl-[14px]"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <section.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{section.title}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[10px] font-mono text-white/20 tracking-wider mb-2">
                RESOURCES
              </p>
              <div className="space-y-1">
                <a
                  href="https://github.com/888tyui/heyx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm text-white/40 hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
                <a
                  href="https://arweave.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm text-white/40 hover:text-white transition-colors"
                >
                  Arweave Network
                </a>
                <a
                  href="https://irys.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm text-white/40 hover:text-white transition-colors"
                >
                  Irys Documentation
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-12">
          <div className="max-w-3xl mx-auto">
            {children}

            {/* Navigation footer */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between gap-4">
                {prevSection ? (
                  <Link
                    href={prevSection.href}
                    className="group flex-1 p-4 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <p className="text-[10px] font-mono text-white/30 tracking-wider mb-1">
                      PREVIOUS
                    </p>
                    <p className="text-white group-hover:text-[#d4622a] transition-colors flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 rotate-180" />
                      {prevSection.title}
                    </p>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}

                {nextSection ? (
                  <Link
                    href={nextSection.href}
                    className="group flex-1 p-4 border border-white/10 hover:border-white/20 transition-colors text-right"
                  >
                    <p className="text-[10px] font-mono text-white/30 tracking-wider mb-1">
                      NEXT
                    </p>
                    <p className="text-white group-hover:text-[#d4622a] transition-colors flex items-center justify-end gap-2">
                      {nextSection.title}
                      <ChevronRight className="h-4 w-4" />
                    </p>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>

              <p className="text-center text-white/20 text-xs mt-8 font-mono">
                Last updated: February 2025
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
