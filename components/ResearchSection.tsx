"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Cpu,
  Shield,
  Search,
  FileCheck,
  Plane,
  Network,
} from "lucide-react";
import { researchInterests } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Cpu,
  Shield,
  Search,
  FileCheck,
  Plane,
  Network,
};

function ResearchCard({
  item,
  index,
}: {
  item: (typeof researchInterests)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const Icon = iconMap[item.icon] ?? Brain;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden hover:border-[#00ff88]/25 transition-all duration-300"
      whileHover={{ y: -3 }}
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0d0d0d] border-b border-[#1a1a1a]">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]/50" />
        <div className="w-2 h-2 rounded-full bg-[#febc2e]/50" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]/50" />
        <span className="ml-2 font-mono text-[10px] text-[#777]">
          research/{item.title.toLowerCase().replace(/\s+/g, "-")}.md
        </span>
      </div>

      {/* Card content */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-[#00ff88]/8 border border-[#00ff88]/15 rounded-lg flex items-center justify-center group-hover:bg-[#00ff88]/15 transition-colors">
            <Icon size={15} className="text-[#00ff88]" />
          </div>
          <h3 className="text-sm font-semibold text-[#ddd] group-hover:text-white transition-colors">
            {item.title}
          </h3>
        </div>
        <p className="text-xs text-[#999] leading-relaxed font-mono">
          <span className="text-[#666]"># </span>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ResearchSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="research" className="py-28 bg-[#050505] relative">
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, rgba(0,255,136,0.04) 0%, transparent 60%)`,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-[#00ff88] mb-3 tracking-widest">
            05. RESEARCH & INTERESTS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 section-title">
            Areas of Exploration
          </h2>
          <p className="text-[#888] text-sm mt-4 max-w-md">
            Domains I study, research, and build side-projects in beyond my
            primary engineering work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {researchInterests.map((item, i) => (
            <ResearchCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Terminal-style footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 p-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl font-mono text-xs"
        >
          <span className="text-[#00ff88]">$</span>
          <span className="text-[#888] ml-2">cat philosophy.txt</span>
          <p className="text-[#999] mt-2 pl-4 border-l border-[#1a1a1a]">
            &ldquo;Great engineers are not just code writers — they are systems
            thinkers, security-minded architects, and continuous learners.
            The intersection of aviation safety requirements and software
            engineering discipline produces the most reliable systems.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
