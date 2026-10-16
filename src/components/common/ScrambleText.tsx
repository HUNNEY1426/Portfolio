"use client";

import { useEffect, useLayoutEffect, useRef, type ElementType } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useIntroDone } from "@/lib/intro";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+=?/<>[]{}";

/** useLayoutEffect on the client, nothing on the server. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

interface ScrambleTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Extra wait before writing starts, in ms. */
  delay?: number;
  /** "view": start when scrolled into view. "intro": start as soon as the intro opens. */
  trigger?: "view" | "intro";
}

/**
 * Decode effect: the text is written one character at a time, with a short
 * run of random glyphs flickering just ahead of the cursor that settle into
 * the real letters. Unwritten text is kept in place but invisible, so the
 * layout never jumps. Screen readers get the real text straight away, and
 * reduced motion shows it with no effect.
 */
export function ScrambleText({ text, as: Tag = "span", className, delay = 0, trigger = "view" }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const srRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const introDone = useIntroDone();
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const start = introDone && (trigger === "intro" || inView);

  // Before the first paint: hide the text so it can be written in, and move
  // the readable copy to a screen-reader-only span for the duration. The
  // server HTML has the text exactly once, so search engines and AI parsers
  // never see it doubled.
  useIsoLayoutEffect(() => {
    if (reduce || !ref.current || !srRef.current) return;
    srRef.current.textContent = text;
    ref.current.setAttribute("aria-hidden", "true");
    ref.current.innerHTML = `<span style="opacity:0">${escape(text)}</span>`;
  }, [text, reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !start) return;

    const chars = [...text];
    // Short labels write slowly enough to read; long descriptions speed up.
    const step = chars.length < 24 ? 42 : chars.length < 80 ? 16 : 7;
    const lead = Math.min(6, chars.length);
    const total = (chars.length + lead) * step;
    let frame = 0;
    let t0 = 0;
    let lastGlyphs = 0;
    let glyphs: string[] = [];

    const render = (now: number) => {
      if (!t0) t0 = now + delay;
      const elapsed = now - t0;
      if (elapsed < 0) {
        frame = requestAnimationFrame(render);
        return;
      }
      const cursor = Math.floor(elapsed / step);

      // New random glyphs every ~45ms, so the flicker reads as motion, not noise.
      if (now - lastGlyphs > 45) {
        glyphs = Array.from({ length: lead }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        lastGlyphs = now;
      }

      const written = chars.slice(0, Math.max(0, cursor - lead)).join("");
      const headStart = Math.max(0, cursor - lead);
      const headEnd = Math.min(chars.length, cursor);
      const head = chars
        .slice(headStart, headEnd)
        .map((c, i) => (c === " " ? " " : glyphs[i % glyphs.length]))
        .join("");
      const rest = chars.slice(headEnd).join("");

      el.innerHTML =
        escape(written) +
        (head ? `<span style="opacity:.55">${escape(head)}</span>` : "") +
        (rest ? `<span style="opacity:0">${escape(rest)}</span>` : "");

      if (elapsed < total) {
        frame = requestAnimationFrame(render);
      } else {
        // Done: one plain, readable copy again.
        el.textContent = text;
        el.removeAttribute("aria-hidden");
        if (srRef.current) srRef.current.textContent = "";
      }
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [start, reduce, text, delay]);

  return (
    <Tag className={className}>
      {/* Both spans are filled through dangerouslySetInnerHTML (React never
          re-renders their contents), so the animation can write into them. */}
      <span ref={srRef} className="sr-only" dangerouslySetInnerHTML={{ __html: "" }} />
      <span ref={ref} dangerouslySetInnerHTML={{ __html: escape(text) }} />
    </Tag>
  );
}
