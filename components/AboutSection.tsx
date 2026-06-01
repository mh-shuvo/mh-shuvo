"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Server,
  Shield,
  Plane,
  Code2,
  MapPin,
  Building2,
  Calendar,
} from "lucide-react";
import { stats } from "@/lib/data";

const pillars = [
  {
    icon: Server,
    title: "Backend Architecture",
    desc: "Designing scalable, fault-tolerant systems handling millions of transactions.",
  },
  {
    icon: Plane,
    title: "Aviation Systems",
    desc: "Real-time air navigation platforms, ADS-B processing, and ANS billing.",
  },
  {
    icon: Shield,
    title: "Security Engineering",
    desc: "Secure-by-design APIs, threat modeling, and application hardening.",
  },
  {
    icon: Code2,
    title: "Enterprise Software",
    desc: "End-to-end enterprise solutions from architecture to production deployment.",
  },
];

function AnimatedStat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center p-5 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl"
    >
      <div className="text-3xl font-bold text-[#00ff88] font-mono mb-1">
        {value}
      </div>
      <div className="text-xs text-[#555] font-medium uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 bg-[#050505] relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-[#00ff88] mb-3 tracking-widest">
            01. ABOUT
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 section-title">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: profile card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Profile block */}
            <div className="flex items-start gap-5">
              {/* Avatar placeholder */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] flex items-center justify-center overflow-hidden">
                  <span className="font-mono text-2xl font-bold text-[#00ff88]">
                    MH
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00ff88] rounded-full border-2 border-[#050505]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Mohammad Mehedi Hasan
                </h3>
                <p className="text-[#00ff88] font-mono text-sm mt-0.5">
                  Senior Software Engineer
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  <span className="flex items-center gap-1.5 text-xs text-[#555]">
                    <Building2 size={11} />
                    ASL Systems Ltd
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#555]">
                    <MapPin size={11} />
                    Dhaka, Bangladesh
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#555]">
                    <Calendar size={11} />
                    2017 – Present
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4 text-[#666] text-[15px] leading-relaxed">
              <p>
                I&apos;m a Senior Software Engineer with over{" "}
                <span className="text-[#aaa]">8 years of professional experience</span>{" "}
                building enterprise applications, scalable backend systems, and
                mission-critical aviation software.
              </p>
              <p>
                Currently at{" "}
                <span className="text-[#00ff88]">ASL Systems Ltd</span>, I architect
                and develop real-time air navigation platforms—including ADS-B
                signal processing pipelines, MLAT tracking systems, and
                aeronautical billing solutions used by Air Navigation Service
                Providers.
              </p>
              <p>
                My engineering philosophy centers on{" "}
                <span className="text-[#aaa]">security-first design</span>,{" "}
                <span className="text-[#aaa]">clean architecture</span>, and{" "}
                <span className="text-[#aaa]">operational reliability</span>. I
                believe the best systems are ones that operators never notice
                because they just work.
              </p>
            </div>

            {/* Quick facts */}
            <div className="font-mono text-xs space-y-2 pt-2 border-t border-[#1a1a1a]">
              {[
                ["email", "mehedifci907@gmail.com"],
                ["domain", "Aviation · Enterprise · Security"],
                ["stack", "PHP · Python · Laravel · Django"],
                ["status", "Online & Available"],
              ].map(([key, val]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-[#333] w-16 flex-shrink-0">{key}:</span>
                  <span className="text-[#666]">{val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: pillars + stats */}
          <div className="space-y-8">
            {/* Expertise pillars */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                  className="p-5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl hover:border-[#00ff88]/25 transition-all duration-300 group"
                >
                  <pillar.icon
                    size={20}
                    className="text-[#00ff88] mb-3 group-hover:scale-110 transition-transform"
                  />
                  <h4 className="text-sm font-semibold text-[#ddd] mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#555] leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <AnimatedStat
                  key={s.label}
                  value={s.value}
                  label={s.label}
                  delay={0.3 + i * 0.07}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
