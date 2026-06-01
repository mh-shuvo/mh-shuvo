"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Plane, Building2, Heart, Wallet } from "lucide-react";
import { projects } from "@/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  Aviation: <Plane size={14} />,
  Enterprise: <Building2 size={14} />,
  Government: <Heart size={14} />,
  SaaS: <Wallet size={14} />,
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden group cursor-default transition-all duration-300"
      style={{
        boxShadow: hovered ? "0 0 40px rgba(0,255,136,0.1)" : "none",
        borderColor: hovered ? "rgba(0,255,136,0.25)" : "#1a1a1a",
      }}
    >
      {/* Top accent bar */}
      <div
        className={`h-px w-full transition-all duration-500 ${
          hovered
            ? "bg-gradient-to-r from-transparent via-[#00ff88] to-transparent"
            : "bg-[#1a1a1a]"
        }`}
      />

      {/* Highlight badge */}
      {project.highlight && (
        <div className="absolute top-4 right-4 px-2 py-0.5 bg-[#00ff88]/10 border border-[#00ff88]/25 text-[#00ff88] text-[10px] font-mono rounded-full">
          featured
        </div>
      )}

      <div className="p-6">
        {/* Category */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-[#00ff88]/60">
            {categoryIcons[project.category]}
          </span>
          <span className="font-mono text-[10px] text-[#888] tracking-widest uppercase">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white mb-3 group-hover:text-[#00ff88] transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[#999] text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-[#00ff88]/6 border border-[#00ff88]/15 text-[#00ff88] text-[10px] font-mono rounded"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#111]">
          <button className="flex items-center gap-1.5 text-[#888] hover:text-[#00ff88] text-xs font-mono transition-colors">
            <Github size={13} />
            <span>Source</span>
          </button>
          <button className="flex items-center gap-1.5 text-[#888] hover:text-[#00ff88] text-xs font-mono transition-colors">
            <ExternalLink size={13} />
            <span>Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="projects" className="py-28 bg-[#040404] relative">
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
          className="w-full h-full"
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
            04. PROJECTS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 section-title">
            Featured Work
          </h2>
          <p className="text-[#888] text-sm mt-4 max-w-md">
            Production systems spanning aviation, government services, and
            enterprise SaaS platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
