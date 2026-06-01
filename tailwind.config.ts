import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#00ff88",
        "bg-primary": "#050505",
        "bg-secondary": "#0d0d0d",
        "bg-card": "#111111",
        "border-subtle": "#1f1f1f",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 4s linear infinite",
        "grid-move": "grid-move 20s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "grid-move": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "50px 50px" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(0, 255, 136, 0.15)",
        "glow": "0 0 30px rgba(0, 255, 136, 0.2)",
        "glow-lg": "0 0 60px rgba(0, 255, 136, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
