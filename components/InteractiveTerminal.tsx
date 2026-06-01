"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type Color = "green" | "cyan" | "yellow" | "red" | "dim" | "white" | "normal";

interface Line {
  id: number;
  text: string;
  isCmd: boolean;
  color: Color;
  cmdPrompt?: string; // prompt captured at the moment the command ran
}

type CmdResult =
  | { kind: "lines"; lines: Line[]; newPath?: string }
  | { kind: "clear" };

// ── Virtual filesystem ────────────────────────────────────────────────────────

const FS: Record<string, { dirs: string[]; files: string[] }> = {
  "~": {
    dirs: ["projects"],
    files: ["about.txt", "skills.txt", "experience.txt", "contact.txt", "research.txt", "resume.pdf"],
  },
  "~/projects": {
    dirs: [
      "aircraft-signal-processing",
      "bane-billing",
      "healthcare-pms",
      "qorum-expense",
    ],
    files: [],
  },
  "~/projects/aircraft-signal-processing": {
    dirs: [],
    files: ["README.md", "stack.txt"],
  },
  "~/projects/bane-billing": {
    dirs: [],
    files: ["README.md", "stack.txt"],
  },
  "~/projects/healthcare-pms": {
    dirs: [],
    files: ["README.md"],
  },
  "~/projects/qorum-expense": {
    dirs: [],
    files: ["README.md"],
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const colorMap: Record<Color, string> = {
  green: "text-[#00ff88]",
  cyan: "text-[#61dafb]",
  yellow: "text-[#febc2e]",
  red: "text-[#ff5f57]",
  dim: "text-[#555]",
  white: "text-[#e8e8e8]",
  normal: "text-[#999]",
};

let _uid = 100;
const uid = () => ++_uid;
const L = (text: string, color: Color = "normal", isCmd = false): Line => ({
  id: uid(),
  text,
  color,
  isCmd,
});

function resolvePath(current: string, target: string): string | null {
  if (!target || target === "~") return "~";
  if (target === "..") {
    if (current === "~") return "~";
    const parts = current.split("/");
    parts.pop();
    return parts.join("/") || "~";
  }
  if (target === ".") return current;
  // absolute
  if (target.startsWith("~")) return target.replace(/\/$/, "");
  // relative
  const joined = `${current}/${target}`.replace(/\/$/, "");
  return joined;
}

function promptFor(path: string): string {
  const short =
    path === "~"
      ? "~"
      : path.split("/").length > 3
      ? `…/${path.split("/").pop()}`
      : path;
  return `mehedi@asl:${short}$`;
}

// ── File contents ─────────────────────────────────────────────────────────────

const FILE_CONTENT: Record<string, () => Line[]> = {
  "about.txt": () => [
    L(""),
    L("Mohammad Mehedi Hasan", "green"),
    L("Senior Software Engineer @ ASL Systems Ltd", "white"),
    L(""),
    L("8+ years building aviation systems, enterprise SaaS,", "normal"),
    L("scalable backends, and security-focused architectures.", "normal"),
    L(""),
  ],
  "skills.txt": () => [
    L(""),
    L("Backend    PHP · Laravel · Python · Django · Flask · Node.js", "green"),
    L("Frontend   ReactJS · JavaScript · TypeScript · HTML/CSS", "cyan"),
    L("Database   PostgreSQL · MySQL · PostGIS · Redis", "yellow"),
    L("DevOps     Docker · GCP · AWS · CI/CD · Linux", "normal"),
    L("Arch       REST API · System Design · SaaS · Real-Time", "dim"),
    L(""),
  ],
  "experience.txt": () => [
    L(""),
    L("2021–Now   Senior Software Engineer", "green"),
    L("           ASL Systems Ltd", "white"),
    L("           Aviation systems, ADS-B, billing platforms", "dim"),
    L(""),
    L("2019–2021  Software Engineer", "green"),
    L("           Dream71 Bangladesh Ltd", "white"),
    L("           Govt platforms, Ministry of Health", "dim"),
    L(""),
    L("2017–2018  Junior Software Engineer", "green"),
    L("           Software Galaxy Ltd", "white"),
    L("           POS systems, inventory, web apps", "dim"),
    L(""),
  ],
  "contact.txt": () => [
    L(""),
    L("Email      mehedifci907@gmail.com", "green"),
    L("LinkedIn   linkedin.com/in/mh-shuvo", "cyan"),
    L("GitHub     github.com/mh-shuvo", "normal"),
    L("Location   Dhaka, Bangladesh · GMT+6", "dim"),
    L("Status     Available for opportunities ✓", "green"),
    L(""),
  ],
  "research.txt": () => [
    L(""),
    L("Research Interests:", "green"),
    L("  · Artificial Intelligence & Machine Learning", "normal"),
    L("  · Cyber Security & Digital Forensics", "normal"),
    L("  · Information Systems Audit (ISACA)", "normal"),
    L("  · Aviation Technology (ADS-B, MLAT, CNS/ATM)", "normal"),
    L("  · System Architecture & Distributed Systems", "normal"),
    L(""),
  ],
  "resume.pdf": () => [L(""), L("error: cannot display binary file. Download from the site.", "red"), L("")],
  "~/projects/aircraft-signal-processing/README.md": () => [
    L(""),
    L("# Aircraft Signal Processing System", "green"),
    L("─────────────────────────────────────────────", "dim"),
    L("Real-time aircraft tracking platform using ADS-B", "normal"),
    L("and MLAT technologies for aviation monitoring,", "normal"),
    L("air traffic visualization, and operational analytics.", "normal"),
    L(""),
    L("Status   Production", "green"),
    L("Role     Lead Engineer", "normal"),
    L("Year     2022–Present", "dim"),
    L(""),
  ],
  "~/projects/aircraft-signal-processing/stack.txt": () => [
    L(""),
    L("Python · ReactJS · PostgreSQL · PostGIS · WebSocket · Docker", "cyan"),
    L(""),
  ],
  "~/projects/bane-billing/README.md": () => [
    L(""),
    L("# BANE Billing Platform", "green"),
    L("─────────────────────────────────────────────", "dim"),
    L("Enterprise aeronautical billing and revenue management", "normal"),
    L("platform for Air Navigation Service Providers.", "normal"),
    L("Handles multi-jurisdiction rate calculations at scale.", "normal"),
    L(""),
    L("Status   Production", "green"),
    L("Role     Backend Architect", "normal"),
    L("Year     2021–Present", "dim"),
    L(""),
  ],
  "~/projects/bane-billing/stack.txt": () => [
    L(""),
    L("Python · Django · ReactJS · Docker · GCP · PostgreSQL", "cyan"),
    L(""),
  ],
  "~/projects/healthcare-pms/README.md": () => [
    L(""),
    L("# Healthcare Project Management System", "green"),
    L("─────────────────────────────────────────────", "dim"),
    L("Government platform for monitoring nationwide", "normal"),
    L("healthcare infrastructure projects across Bangladesh.", "normal"),
    L(""),
    L("Status   Delivered", "yellow"),
    L("Role     Software Engineer", "normal"),
    L("Year     2019–2021", "dim"),
    L(""),
  ],
  "~/projects/qorum-expense/README.md": () => [
    L(""),
    L("# Qorum Expense Management", "green"),
    L("─────────────────────────────────────────────", "dim"),
    L("Enterprise expense management platform with real-time", "normal"),
    L("approval workflows, receipt capture, and mobile integrations.", "normal"),
    L(""),
    L("Status   Delivered", "yellow"),
    L("Role     Software Engineer", "normal"),
    L("Year     2020–2021", "dim"),
    L(""),
  ],
};

function getFileContent(currentPath: string, filename: string): Line[] {
  // Try absolute key first (for project READMEs)
  const absKey = `${currentPath}/${filename}`;
  if (FILE_CONTENT[absKey]) return FILE_CONTENT[absKey]();
  // Then try bare filename
  if (FILE_CONTENT[filename]) return FILE_CONTENT[filename]();
  return [L(""), L(`cat: ${filename}: No such file or directory`, "red"), L("")];
}

// ── Command runner ────────────────────────────────────────────────────────────

const TOP_CMDS = ["help", "whoami", "about", "skills", "experience", "projects", "contact", "ls", "cat", "cd", "date", "pwd", "clear"];

function runCommand(raw: string, currentPath: string): CmdResult {
  const trimmed = raw.trim();
  if (!trimmed) return { kind: "lines", lines: [] };

  const [cmd, ...args] = trimmed.split(/\s+/);
  const node = FS[currentPath];

  switch (cmd.toLowerCase()) {
    // ── Navigation ──────────────────────────────────────────────────────────
    case "cd": {
      const target = args[0];
      if (!target || target === "~") return { kind: "lines", lines: [], newPath: "~" };
      const resolved = resolvePath(currentPath, target);
      if (resolved && FS[resolved]) {
        return { kind: "lines", lines: [], newPath: resolved };
      }
      // Check if target is a dir in current node
      const candidate = `${currentPath}/${target.replace(/\/$/, "")}`;
      if (FS[candidate]) {
        return { kind: "lines", lines: [], newPath: candidate };
      }
      return {
        kind: "lines",
        lines: [L(""), L(`cd: ${target}: No such directory`, "red"), L("")],
      };
    }

    // ── Listing ─────────────────────────────────────────────────────────────
    case "ls": {
      const targetArg = args[0]?.replace(/\/$/, "");
      let listPath = currentPath;

      if (targetArg) {
        const resolved = resolvePath(currentPath, targetArg);
        if (resolved && FS[resolved]) {
          listPath = resolved;
        } else {
          const candidate = `${currentPath}/${targetArg}`;
          if (FS[candidate]) listPath = candidate;
          else return { kind: "lines", lines: [L(""), L(`ls: ${targetArg}: No such file or directory`, "red"), L("")] };
        }
      }

      const lsNode = FS[listPath];
      if (!lsNode) return { kind: "lines", lines: [L(""), L(`ls: cannot access '${targetArg}'`, "red"), L("")] };

      const entries: Line[] = [L("")];
      if (lsNode.dirs.length) {
        entries.push(L(lsNode.dirs.map((d) => d + "/").join("   "), "cyan"));
      }
      if (lsNode.files.length) {
        entries.push(L(lsNode.files.join("   "), "normal"));
      }
      if (!lsNode.dirs.length && !lsNode.files.length) {
        entries.push(L("(empty directory)", "dim"));
      }
      entries.push(L(""));
      return { kind: "lines", lines: entries };
    }

    // ── File reading ─────────────────────────────────────────────────────────
    case "cat": {
      if (!args[0]) {
        const allFiles = node?.files ?? [];
        return {
          kind: "lines",
          lines: [L(""), L("usage: cat <filename>", "red"), L("files: " + allFiles.join("  "), "dim"), L("")],
        };
      }
      return { kind: "lines", lines: getFileContent(currentPath, args[0]) };
    }

    // ── Info commands ────────────────────────────────────────────────────────
    case "pwd":
      return {
        kind: "lines",
        lines: [L(""), L(`/home/${currentPath.replace("~", "mehedi")}`, "normal"), L("")],
      };

    case "whoami":
      return {
        kind: "lines",
        lines: [
          L(""),
          L("Mohammad Mehedi Hasan", "green"),
          L("Senior Software Engineer @ ASL Systems Ltd", "white"),
          L("Dhaka, Bangladesh  ·  8+ years experience", "dim"),
          L(""),
        ],
      };

    case "about":
      return { kind: "lines", lines: getFileContent("~", "about.txt") };

    case "skills":
      return { kind: "lines", lines: getFileContent("~", "skills.txt") };

    case "experience":
      return { kind: "lines", lines: getFileContent("~", "experience.txt") };

    case "contact":
      return { kind: "lines", lines: getFileContent("~", "contact.txt") };

    case "projects":
      return { kind: "lines", lines: [], newPath: "~/projects" };

    case "date":
      return {
        kind: "lines",
        lines: [L(""), L(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }) + "  (GMT+6)", "white"), L("")],
      };

    case "help":
      return {
        kind: "lines",
        lines: [
          L(""),
          L("  COMMANDS", "green"),
          L("  ─────────────────────────────────────────────────", "dim"),
          L("  whoami          identity & current role", "normal"),
          L("  about           personal overview", "normal"),
          L("  skills          full technical stack", "normal"),
          L("  experience      work history timeline", "normal"),
          L("  projects        open projects directory", "normal"),
          L("  contact         contact information", "normal"),
          L("  ls [path]       list directory contents", "normal"),
          L("  cd <dir>        change directory", "normal"),
          L("  cat <file>      read a file", "normal"),
          L("  pwd             print working directory", "normal"),
          L("  date            current date/time", "normal"),
          L("  clear           clear screen", "normal"),
          L(""),
          L("  ↑↓ history · Tab autocomplete · Ctrl+L clear", "dim"),
          L(""),
        ],
      };

    case "clear":
      return { kind: "clear" };

    default:
      return {
        kind: "lines",
        lines: [
          L(""),
          L(`command not found: ${cmd}`, "red"),
          L("Type 'help' for available commands.", "dim"),
          L(""),
        ],
      };
  }
}

// ── Welcome lines ─────────────────────────────────────────────────────────────

const WELCOME: Line[] = [
  { id: 1, text: "┌──────────────────────────────────────────┐", color: "dim", isCmd: false },
  { id: 2, text: "│   Mehedi's Interactive Shell  v1.0.0    │", color: "green", isCmd: false },
  { id: 3, text: "│   Type 'help' for available commands.   │", color: "dim", isCmd: false },
  { id: 4, text: "└──────────────────────────────────────────┘", color: "dim", isCmd: false },
  { id: 5, text: "", color: "dim", isCmd: false },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState("~");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Focus input on mount — avoids SSR/client autoFocus hydration mismatch
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const prompt = promptFor(currentPath);

  const submit = () => {
    const result = runCommand(input, currentPath);
    const cmdLine: Line = { id: uid(), text: input, isCmd: true, color: "white", cmdPrompt: prompt };

    if (result.kind === "clear") {
      setLines(WELCOME);
      setCurrentPath("~");
    } else {
      if (result.newPath !== undefined) setCurrentPath(result.newPath);
      setLines((prev) => [...prev, cmdLine, ...result.lines]);
    }

    if (input.trim()) setHistory((prev) => [input.trim(), ...prev.slice(0, 49)]);
    setHistIdx(-1);
    setInput("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      const node = FS[currentPath];

      if (parts.length === 1) {
        // complete command
        const match = TOP_CMDS.find((c) => c.startsWith(input) && c !== input);
        if (match) setInput(match);
      } else if (parts[0] === "cat" && parts.length === 2) {
        const files = node?.files ?? [];
        const match = files.find((f) => f.startsWith(parts[1]) && f !== parts[1]);
        if (match) setInput(`cat ${match}`);
      } else if ((parts[0] === "cd" || parts[0] === "ls") && parts.length === 2) {
        const dirs = node?.dirs ?? [];
        const match = dirs.find((d) => d.startsWith(parts[1]) && d !== parts[1]);
        if (match) setInput(`${parts[0]} ${match}`);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines(WELCOME);
      setInput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-md"
    >
      <div
        className="bg-[#0a0a0a] rounded-xl border border-[#1f1f1f] overflow-hidden shadow-2xl shadow-black/60 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-[#1a1a1a] select-none">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] opacity-80" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <Terminal size={11} className="text-[#555]" />
            <span className="font-mono text-[11px] text-[#777]">
              {prompt}
            </span>
          </div>
        </div>

        {/* Output */}
        <div
          ref={outputRef}
          className="p-4 font-mono text-[12px] h-[300px] overflow-y-auto space-y-px leading-[1.6]"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#1f1f1f #0a0a0a" }}
        >
          {lines.map((line) => (
            <div key={line.id} className="flex items-start whitespace-pre-wrap break-all">
              {line.isCmd && (
                <span className="text-[#00ff88] mr-2 flex-shrink-0">
                  {line.cmdPrompt ?? prompt}
                  <span className="text-[#555]"> </span>
                </span>
              )}
              <span className={colorMap[line.color]}>{line.text}</span>
            </div>
          ))}

          {/* Live input line */}
          <div className="flex items-center whitespace-pre">
            <span className="text-[#00ff88] mr-2 flex-shrink-0">
              {prompt}{" "}
            </span>
            <span className="text-[#e8e8e8]">{input}</span>
            <span className="w-[7px] h-[13px] bg-[#00ff88] cursor-blink ml-px flex-shrink-0" />
          </div>
        </div>

        {/* Hidden input */}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck={false}
          className="absolute opacity-0 pointer-events-none w-0 h-0"
          aria-label="Terminal input"
        />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent mt-4" />
      <p className="text-center font-mono text-[10px] text-[#444] mt-2">
        click to focus · tab to complete · ↑↓ history · ctrl+l clear
      </p>
    </motion.div>
  );
}
