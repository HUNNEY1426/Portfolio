"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useIntroDone } from "@/lib/intro";

/**
 * Mask reveal: each line is clipped by its own row and slides up into
 * place, staggered. Waits for the intro screen to open, so it plays in view.
 * Reduced motion renders the lines in place.
 */
export function RevealLines({ lines, delay = 0.2, stagger = 0.12 }: { lines: ReactNode[]; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion();
  const ready = useIntroDone();

  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <motion.span
            className="reveal-line-inner"
            initial={reduce ? false : { y: "105%" }}
            animate={ready || reduce ? { y: "0%" } : { y: "105%" }}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: EASE_OUT_EXPO }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Fades and lifts a block in once the intro has opened. */
export function FadeUp({ children, delay = 0.6, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const ready = useIntroDone();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={ready || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Handwriting: the text is revealed left to right, like a pen stroke.
 * Used for the script eyebrows above the page titles.
 */
export function Handwrite({ children, delay = 0.1, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const ready = useIntroDone();
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block", paddingInline: "0.1em" }}
      initial={reduce ? false : { clipPath: "inset(-20% 100% -20% 0)" }}
      animate={ready || reduce ? { clipPath: "inset(-20% -10% -20% 0)" } : { clipPath: "inset(-20% 100% -20% 0)" }}
      transition={{ duration: 1.3, delay, ease: [0.45, 0.05, 0.25, 1] }}
    >
      {children}
    </motion.span>
  );
}
