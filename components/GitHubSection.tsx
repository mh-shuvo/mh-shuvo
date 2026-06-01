"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, GitCommit, Star, GitFork } from "lucide-react";

const TOTAL_DAYS = 53 * 7;

const levelColors = [
  "#0d1117",
  "#003d1f",
  "#006632",
  "#009944",
  "#00ff88",
];

const githubStats = [
  { icon: GitCommit, label: "Commits (2024)", value: "400+" },
  { icon: Star, label: "Repositories", value: "25+" },
  { icon: GitFork, label: "Pull Requests", value: "180+" },
  { icon: Github, label: "Contributions", value: "Active" },
];

// Seeded deterministic pseudo-random — same output on server and client
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const CONTRIBUTIONS: number[] = Array.from({ length: TOTAL_DAYS }, (_, i) => {
  const r = seededRandom(i);
  if (r > 0.95) return 4;
  if (r > 0.88) return 3;
  if (r > 0.78) return 2;
  if (r > 0.65) return 1;
  return 0;
});

const WEEKS: number[][] = Array.from({ length: 53 }, (_, wi) =>
  CONTRIBUTIONS.slice(wi * 7, wi * 7 + 7)
);

export default function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="github" className="py-28 bg-[#040404] relative">
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-[#00ff88] mb-3 tracking-widest">
            06. GITHUB
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 section-title">
            Activity Graph
          </h2>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {githubStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-5 flex items-center gap-4"
            >
              <stat.icon size={18} className="text-[#00ff88]/60 flex-shrink-0" />
              <div>
                <div className="text-lg font-bold font-mono text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] text-[#888] font-mono uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 overflow-x-auto"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Github size={15} className="text-[#00ff88]" />
              <span className="font-mono text-xs text-[#999]">
                Contribution activity — last 12 months
              </span>
            </div>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-[#777] hover:text-[#00ff88] transition-colors"
            >
              View on GitHub →
            </a>
          </div>

          {/* Graph */}
          <div className="flex gap-[3px] min-w-max">
            {WEEKS.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((level, di) => (
                  <motion.div
                    key={di}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.2,
                      delay: 0.3 + (wi * 7 + di) * 0.001,
                    }}
                    className="w-[11px] h-[11px] rounded-sm"
                    style={{ backgroundColor: levelColors[level] }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="font-mono text-[10px] text-[#777]">Less</span>
            {levelColors.map((color, i) => (
              <div
                key={i}
                className="w-[11px] h-[11px] rounded-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="font-mono text-[10px] text-[#777]">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
