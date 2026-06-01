"use client";

import { useState, useEffect } from "react";

export function useTypingEffect(
  texts: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 2800
): string {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = texts[textIndex];

    if (!isDeleting && charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayText(current.substring(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, typingSpeed + Math.random() * 40);
      return () => clearTimeout(t);
    }

    if (!isDeleting && charIndex === current.length) {
      const t = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayText(current.substring(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, deletingSpeed);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
    }
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

export function useTerminalEffect(
  totalLines: number,
  lineDelay = 600
): number {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= totalLines) return;
    const t = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, lineDelay);
    return () => clearTimeout(t);
  }, [visibleCount, totalLines, lineDelay]);

  return visibleCount;
}
