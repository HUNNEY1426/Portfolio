"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.35, once: false });
  const [revealComplete, setRevealComplete] = useState(false);

  // Pointer interaction unlocks only once the word reveal has settled, so a
  // hover never lands on a still-blurring word.
  const isInteractive = isInView && revealComplete;

  const sentence =
    "I specialize in creating ultra-tactile interfaces. My work focuses on bridging spatial aesthetics with deep engineering rigor. Delivering highly resilient design systems with mathematically perfect fluid motion.";
  const words = sentence.split(" ");

  const keywords = [
    "ultra-tactile",
    "interfaces.",
    "spatial",
    "aesthetics",
    "engineering",
    "rigor.",
    "resilient",
    "systems",
    "mathematically",
    "perfect",
    "motion.",
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-gutter lg:px-gutter-desktop py-24 sm:py-32 bg-background overflow-hidden"
      id="about"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Script eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="script-eyebrow text-3xl sm:text-4xl text-accent mb-6"
        >
          About me
        </motion.p>

        {/* The statement */}
        <h2
          className={`font-display text-[clamp(1.5rem,2.9vw,2.4rem)] font-medium text-on-surface leading-[1.34] about-container ${isInteractive ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {words.map((word, i) => {
            const isKeyword = keywords.includes(word);
            return (
              <motion.span
                key={i}
                initial={{ filter: "blur(12px)", opacity: 0, y: 10 }}
                animate={
                  isInView
                    ? { filter: "blur(0px)", opacity: 1, y: 0 }
                    : { filter: "blur(12px)", opacity: 0, y: 10 }
                }
                transition={{
                  delay: isInView ? i * 0.035 : 0,
                  duration: 0.7,
                  ease: "easeOut",
                }}
                onAnimationComplete={
                  i === words.length - 1 ? () => setRevealComplete(isInView) : undefined
                }
                className={`about-word inline-block mr-2 md:mr-3 ${isKeyword ? "about-keyword cursor-pointer" : ""}`}
              >
                {word}
              </motion.span>
            );
          })}
        </h2>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <Link
            href="/resume"
            className="font-mono text-label-code uppercase tracking-widest font-semibold text-on-surface bg-surface-container-high/70 border border-hairline-border hover:bg-surface-container-highest hover:border-on-surface-variant/40 transition-all duration-300 rounded-full px-6 py-3 cursor-pointer"
          >
            Learn more about me
          </Link>
          <Link
            href="/work"
            aria-label="See selected work"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-hairline-border text-on-surface bg-surface-container-high/70 hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 cursor-pointer group"
          >
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
