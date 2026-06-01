"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "research", href: "#research" },
  { label: "contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/92 backdrop-blur-xl border-b border-[#1a1a1a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[#00ff88]/10 border border-[#00ff88]/25 rounded-md flex items-center justify-center group-hover:bg-[#00ff88]/15 group-hover:border-[#00ff88]/40 transition-all duration-200">
              <Terminal size={14} className="text-[#00ff88]" />
            </div>
            <span className="font-mono text-sm font-medium">
              <span className="text-[#00ff88]">mmh</span>
              <span className="text-[#888]">@asl</span>
              <span className="text-[#00ff88] cursor-blink">_</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 font-mono text-xs text-[#aaa] hover:text-[#00ff88] transition-colors duration-200 group"
              >
                <span className="text-[#555] group-hover:text-[#00ff88]/50 transition-colors">~/</span>
                {link.label}
                <span className="absolute bottom-1.5 left-3 right-3 h-px bg-[#00ff88] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 px-4 py-1.5 bg-[#00ff88]/8 border border-[#00ff88]/25 text-[#00ff88] text-xs font-mono rounded-md hover:bg-[#00ff88]/15 hover:border-[#00ff88]/50 transition-all duration-200"
            >
              hire_me()
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 text-[#555] hover:text-[#00ff88] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#080808] border-b border-[#1a1a1a] overflow-hidden"
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2.5 font-mono text-sm text-[#aaa] hover:text-[#00ff88] transition-colors"
                >
                  <span className="text-[#00ff88]/40">$</span>
                  cd {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
