"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Backend: "#00ff88",
  Frontend: "#61dafb",
  Database: "#f39c12",
  "Cloud & DevOps": "#e74c3c",
  Architecture: "#9b59b6",
};

function SkillBar({
  name,
  level,
  color,
  delay,
  inView,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-[#aaa]">{name}</span>
        <span className="font-mono text-[10px] text-[#777]">{level}%</span>
      </div>
      <div className="h-1 bg-[#111] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function CategoryCard({
  category,
  skillList,
  index,
}: {
  category: string;
  skillList: { name: string; level: number }[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const color = categoryColors[category] ?? "#00ff88";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#1f1f1f] transition-all duration-300 group"
      style={{
        boxShadow: isInView ? undefined : "none",
      }}
      whileHover={{
        boxShadow: `0 0 30px ${color}12`,
        borderColor: `${color}25`,
      }}
    >
      {/* Category header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <h3 className="font-mono text-xs font-semibold tracking-widest uppercase text-[#666]">
          {category}
        </h3>
        <div className="flex-1 h-px bg-[#1a1a1a]" />
        <span className="font-mono text-[10px] text-[#777]">
          {skillList.length} skills
        </span>
      </div>

      {/* Skill bars */}
      <div className="space-y-3.5">
        {skillList.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={color}
            delay={0.05 + i * 0.04}
            inView={isInView}
          />
        ))}
      </div>

      {/* Badge pills */}
      <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#111]">
        {skillList.map((skill) => (
          <span
            key={skill.name}
            className="px-2 py-0.5 rounded text-[10px] font-mono border transition-all duration-200 group-hover:border-opacity-40"
            style={{
              backgroundColor: `${color}08`,
              borderColor: `${color}20`,
              color: color === "#00ff88" ? "#00ff88" : color,
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const skillEntries = Object.entries(skills);

  return (
    <section id="skills" className="py-28 bg-[#040404] relative">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 80% 50%, rgba(0,255,136,0.04) 0%, transparent 60%)`,
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
            02. SKILLS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 section-title">
            Technical Arsenal
          </h2>
          <p className="text-[#888] text-sm mt-4 max-w-md">
            Tools, frameworks, and platforms I use to build production-grade
            systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {skillEntries.map(([category, skillList], i) => (
            <CategoryCard
              key={category}
              category={category}
              skillList={skillList}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
