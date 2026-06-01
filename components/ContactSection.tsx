"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Send, Terminal, MapPin } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    handle: "@mh-shuvo",
    href: "https://github.com/mh-shuvo",
    color: "#e8e8e8",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "in/mh-shuvo",
    href: "https://linkedin.com/in/mh-shuvo",
    color: "#0077b5",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "mehedifci907@gmail.com",
    href: "mailto:mehedifci907@gmail.com",
    color: "#00ff88",
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-28 bg-[#050505] relative">
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
          className="w-full h-full"
        />
        <div
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,255,136,0.05) 0%, transparent 70%)",
          }}
          className="absolute inset-0"
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
            07. CONTACT
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 section-title">
            Get In Touch
          </h2>
          <p className="text-[#888] text-sm mt-4 max-w-md">
            Open to senior engineering roles, consulting, and aviation
            technology projects. Let&apos;s build something remarkable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Terminal info block */}
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0d0d0d] border-b border-[#1a1a1a]">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]/50" />
                <div className="w-2 h-2 rounded-full bg-[#febc2e]/50" />
                <div className="w-2 h-2 rounded-full bg-[#28c840]/50" />
                <span className="ml-2 font-mono text-[10px] text-[#777]">
                  contact.json
                </span>
              </div>
              <div className="p-5 font-mono text-xs space-y-2">
                <div className="text-[#00ff88]">{"{"}</div>
                <div className="pl-4 space-y-1.5">
                  <div>
                    <span className="text-[#61dafb]">&quot;name&quot;</span>
                    <span className="text-[#666]">: </span>
                    <span className="text-[#f39c12]">
                      &quot;Mohammad Mehedi Hasan&quot;
                    </span>
                    <span className="text-[#666]">,</span>
                  </div>
                  <div>
                    <span className="text-[#61dafb]">&quot;role&quot;</span>
                    <span className="text-[#666]">: </span>
                    <span className="text-[#f39c12]">
                      &quot;Senior Software Engineer&quot;
                    </span>
                    <span className="text-[#666]">,</span>
                  </div>
                  <div>
                    <span className="text-[#61dafb]">&quot;email&quot;</span>
                    <span className="text-[#666]">: </span>
                    <span className="text-[#f39c12]">
                      &quot;mehedifci907@gmail.com&quot;
                    </span>
                    <span className="text-[#666]">,</span>
                  </div>
                  <div>
                    <span className="text-[#61dafb]">&quot;location&quot;</span>
                    <span className="text-[#666]">: </span>
                    <span className="text-[#f39c12]">
                      &quot;Dhaka, Bangladesh&quot;
                    </span>
                    <span className="text-[#666]">,</span>
                  </div>
                  <div>
                    <span className="text-[#61dafb]">&quot;status&quot;</span>
                    <span className="text-[#666]">: </span>
                    <span className="text-[#00ff88]">&quot;available&quot;</span>
                  </div>
                </div>
                <div className="text-[#00ff88]">{"}"}</div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs text-[#888] font-mono">
              <MapPin size={12} className="text-[#00ff88]/60" />
              <span>Dhaka, Bangladesh · GMT+6</span>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl hover:border-[#00ff88]/25 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 bg-[#111] border border-[#1f1f1f] rounded-lg flex items-center justify-center group-hover:border-[#00ff88]/20 transition-colors">
                    <social.icon size={16} className="text-[#555] group-hover:text-[#00ff88] transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#aaa] group-hover:text-white transition-colors">
                      {social.label}
                    </div>
                    <div className="text-[11px] font-mono text-[#888] group-hover:text-[#00ff88] transition-colors">
                      {social.handle}
                    </div>
                  </div>
                  <div className="ml-auto text-[#777] group-hover:text-[#00ff88] transition-colors">
                    →
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden">
              {/* Form header */}
              <div className="flex items-center gap-2 px-5 py-3.5 bg-[#0d0d0d] border-b border-[#1a1a1a]">
                <Terminal size={13} className="text-[#00ff88]" />
                <span className="font-mono text-xs text-[#888]">
                  compose_message.sh
                </span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-[#888] uppercase tracking-widest">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full px-3 py-2.5 bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg text-sm text-[#e8e8e8] placeholder-[#555] font-mono focus:outline-none focus:border-[#00ff88]/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-[#888] uppercase tracking-widest">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@company.com"
                      className="w-full px-3 py-2.5 bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg text-sm text-[#e8e8e8] placeholder-[#555] font-mono focus:outline-none focus:border-[#00ff88]/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-[#444] uppercase tracking-widest">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Project inquiry / Job opportunity / Consultation"
                    className="w-full px-3 py-2.5 bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg text-sm text-[#e8e8e8] placeholder-[#555] font-mono focus:outline-none focus:border-[#00ff88]/40 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-[#444] uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project, requirements, or opportunity..."
                    className="w-full px-3 py-2.5 bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg text-sm text-[#e8e8e8] placeholder-[#555] font-mono focus:outline-none focus:border-[#00ff88]/40 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-[10px] text-[#777]">
                    * I typically respond within 24 hours
                  </span>
                  <button
                    type="submit"
                    className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      submitted
                        ? "bg-[#00ff88]/20 border border-[#00ff88]/40 text-[#00ff88]"
                        : "bg-[#00ff88] text-black hover:bg-[#00e67a] active:scale-95"
                    }`}
                  >
                    <Send size={14} />
                    {submitted ? "Message Sent!" : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
