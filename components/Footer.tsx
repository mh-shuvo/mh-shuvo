"use client";

import { motion } from "framer-motion";
import { Terminal, Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#040404] border-t border-[#1a1a1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-md flex items-center justify-center">
                <Terminal size={14} className="text-[#00ff88]" />
              </div>
              <span className="font-mono text-sm">
                <span className="text-[#00ff88]">mmh</span>
                <span className="text-[#888]">@asl</span>
              </span>
            </div>
            <p className="text-xs text-[#999] leading-relaxed max-w-xs">
              Senior Software Engineer building scalable backends, aviation
              systems, and enterprise software since 2017.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/mh-shuvo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-[#888] hover:text-[#00ff88] transition-colors"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href="https://linkedin.com/in/mh-shuvo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-[#888] hover:text-[#00ff88] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="mailto:mehedifci907@gmail.com"
                className="p-1.5 text-[#888] hover:text-[#00ff88] transition-colors"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-mono text-[10px] text-[#888] uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-[#999] hover:text-[#00ff88] transition-colors font-mono"
                >
                  <span className="text-[#666]">./</span>
                  {link.label.toLowerCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <h4 className="font-mono text-[10px] text-[#888] uppercase tracking-widest mb-4">
              Core Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                "PHP",
                "Laravel",
                "Python",
                "Django",
                "ReactJS",
                "PostgreSQL",
                "Docker",
                "GCP",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 bg-[#0d0d0d] border border-[#1f1f1f] text-[#999] text-[10px] font-mono rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1a1a1a]">
          <p className="font-mono text-[11px] text-[#888] text-center sm:text-left">
            Built with{" "}
            <span className="text-[#00ff88]">Next.js</span>,{" "}
            <span className="text-[#61dafb]">TypeScript</span> &{" "}
            <span className="text-[#e8e8e8]">Engineering Passion</span>.
            <span className="text-[#666] ml-3">
              © {new Date().getFullYear()} Mohammad Mehedi Hasan
            </span>
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#1f1f1f] text-[#888] hover:border-[#00ff88]/30 hover:text-[#00ff88] text-[11px] font-mono rounded-lg transition-all duration-200"
          >
            <ArrowUp size={12} />
            back_to_top()
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
