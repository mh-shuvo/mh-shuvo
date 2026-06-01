"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import InteractiveTerminal from "@/components/InteractiveTerminal";

const TITLES = [
  "Senior Software Engineer",
  "Backend Architect",
  "Aviation Systems Developer",
  "Security Enthusiast",
  "System Designer",
];


function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(0,255,136,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[#00ff88]/40 to-transparent" />
      <div className="absolute top-0 left-0 h-32 w-px bg-gradient-to-b from-[#00ff88]/40 to-transparent" />
      <div className="absolute bottom-0 right-0 w-32 h-px bg-gradient-to-l from-[#00ff88]/40 to-transparent" />
      <div className="absolute bottom-0 right-0 h-32 w-px bg-gradient-to-t from-[#00ff88]/40 to-transparent" />
    </div>
  );
}

export default function HeroSection() {
  const typedTitle = useTypingEffect(TITLES, 75, 40, 2800);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden"
    >
      <GridBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text content */}
          <div className="space-y-7">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#00ff88]/8 border border-[#00ff88]/20 rounded-full"
            >
              <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
              <span className="font-mono text-[11px] text-[#00ff88] tracking-wide">
                Available for opportunities
              </span>
            </motion.div>

            {/* Name block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="font-mono text-xs text-[#444] mb-3">
                <span className="text-[#00ff88]/60">const</span> engineer ={" "}
                <span className="text-[#00ff88]/60">{"{"}</span>
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                <span className="text-white">Mohammad</span>
                <br />
                <span className="text-[#00ff88]">Mehedi</span>
                <br />
                <span className="text-white">Hasan</span>
              </h1>
              <p className="font-mono text-xs text-[#444] mt-3">
                <span className="text-[#00ff88]/60">{"}"}</span>
              </p>
            </motion.div>

            {/* Typing title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-7 flex items-center"
            >
              <span className="font-mono text-base text-[#888]">
                &gt;{" "}
                <span className="text-[#00ff88]">{typedTitle}</span>
                <span className="cursor-blink text-[#00ff88]">|</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[#666] text-base leading-relaxed max-w-md"
            >
              Building scalable systems, secure software, and aviation
              technologies. Backend architect with 8+ years crafting
              enterprise applications, real-time data platforms, and
              air navigation solutions.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#00ff88] text-black font-semibold text-sm rounded-lg hover:bg-[#00e67a] active:scale-95 transition-all duration-200"
              >
                <ChevronRight size={15} />
                View Projects
              </a>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-5 py-2.5 border border-[#1f1f1f] text-[#aaa] text-sm rounded-lg hover:border-[#333] hover:text-white transition-all duration-200"
              >
                <Download size={15} />
                Download Resume
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 px-5 py-2.5 border border-[#00ff88]/20 text-[#00ff88] text-sm rounded-lg hover:bg-[#00ff88]/8 hover:border-[#00ff88]/40 transition-all duration-200"
              >
                <Mail size={15} />
                Contact Me
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4 pt-1"
            >
              <a
                href="https://github.com/mh-shuvo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#777] hover:text-[#00ff88] transition-colors border border-transparent hover:border-[#00ff88]/20 rounded-md"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/mh-shuvo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#777] hover:text-[#00ff88] transition-colors border border-transparent hover:border-[#00ff88]/20 rounded-md"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:mehedifci907@gmail.com"
                className="p-2 text-[#777] hover:text-[#00ff88] transition-colors border border-transparent hover:border-[#00ff88]/20 rounded-md"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <div className="flex-1 h-px bg-[#1a1a1a]" />
              <span className="font-mono text-[11px] text-[#666]">
                mehedifci907@gmail.com
              </span>
            </motion.div>
          </div>

          {/* Right: Interactive Terminal */}
          <div className="hidden lg:flex items-center justify-center">
            <InteractiveTerminal />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#666]"
      >
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
