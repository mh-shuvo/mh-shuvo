"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { experiences } from "@/lib/data";

function ExperienceCard({
  exp,
  index,
  isLast,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-8">
      {/* Timeline spine */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          className={`w-3 h-3 rounded-full border-2 mt-1.5 flex-shrink-0 z-10 ${
            index === 0
              ? "border-[#00ff88] bg-[#00ff88]"
              : "border-[#333] bg-[#0a0a0a]"
          }`}
        />
        {!isLast && (
          <div className="w-px flex-1 mt-1 bg-gradient-to-b from-[#1f1f1f] to-transparent min-h-[40px]" />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.1 }}
        className={`flex-1 pb-10 ${isLast ? "pb-0" : ""}`}
      >
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#00ff88]/20 transition-all duration-300 group">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#00ff88] transition-colors">
                {exp.role}
              </h3>
              <p className="text-[#00ff88] font-mono text-sm mt-0.5">
                {exp.company}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 text-[#888] font-mono text-xs">
              <span className="flex items-center gap-1.5">
                <Calendar size={10} />
                {exp.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={10} />
                {exp.location}
              </span>
            </div>
          </div>

          {/* Highlights */}
          <ul className="space-y-2 mb-5">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#999]">
                <ChevronRight
                  size={13}
                  className="text-[#00ff88]/60 flex-shrink-0 mt-0.5"
                />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#111]">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 bg-[#00ff88]/6 border border-[#00ff88]/15 text-[#00ff88] text-[10px] font-mono rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ExperienceSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="py-28 bg-[#050505] relative">
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0,255,136,0.03) 0%, transparent 50%)`,
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
            03. EXPERIENCE
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 section-title">
            Work History
          </h2>
          <p className="text-[#888] text-sm mt-4 max-w-md">
            8+ years engineering software across aviation, government, and
            enterprise domains.
          </p>
        </motion.div>

        <div className="max-w-3xl">
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
