"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ScrambleText } from "@/components/common/ScrambleText";

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
  href: string;
}

/** Work experience only; education lives on the résumé page. */
const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Inventive Rhino Pvt. Ltd.",
    role: "Front End Developer",
    location: "Gandhinagar, Gujarat",
    period: "Feb 2024 — Present",
    highlights: [
      "Full stack features for enterprise apps with Next.js, TypeScript, Tailwind CSS, Zustand and Prisma",
      "Admin dashboards with CRUD, server-side pagination, filtering and role-based access control",
      "Secure login with JWT and OAuth, and faster loads through code splitting and lazy loading",
    ],
    href: "/resume",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.35, once: false });
  const [revealComplete, setRevealComplete] = useState(false);

  // Hover focus only unlocks once the staggered reveal has settled.
  const isInteractive = isInView && revealComplete;

  
  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-gutter lg:px-gutter-desktop py-20 sm:py-28 bg-background overflow-hidden" 
      id="experience"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        {/* Minimal Centered Section Heading Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="section-pill inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low dark:bg-surface-container-low border border-hairline-border dark:border-white/10 shadow-sm">
            <ScrambleText as="h2" className="font-mono text-xs uppercase tracking-wider font-semibold text-on-surface" text="Experience" />
          </div>
        </motion.div>

        {/* Minimal Grid / List with Smooth Staggered Scroll Entrance and Card Blur Focus */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onAnimationComplete={() => setRevealComplete(isInView)}
          className={`w-full flex flex-col gap-2.5 experience-list ${isInteractive ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {EXPERIENCES.map((item) => (
            <motion.div
              key={`${item.company}-${item.role}`}
              variants={itemVariants}
            >
              <Link
                href={item.href}
                className="experience-card group flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-surface-container-low/70 hover:bg-surface-container/60 dark:bg-surface-container-low/80 dark:hover:bg-[#181c20] border border-hairline-border/80 dark:border-white/10 transition-all duration-300 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                <div className="flex w-full flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-sans font-semibold text-base sm:text-lg text-on-surface">{item.role}</span>
                      <span className="text-muted-subtle text-sm">·</span>
                      <span className="font-body text-sm sm:text-base text-on-surface-variant">{item.company}</span>
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-muted-subtle font-medium shrink-0">{item.period}</span>
                  </div>
                  <ul className="flex flex-col gap-1.5 font-body text-sm text-on-surface-variant text-left">
                    {item.highlights.map((h) => (
                      <li key={h} className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent/70">
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between font-mono text-[11px] text-muted-subtle">
                    <span>{item.location}</span>
                    <span className="group-hover:text-on-surface transition-colors">
                      Résumé <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* See All My Experience Button on the Bottom Center with subtle scale */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10"
        >
          <Link
            href="/resume"
            className="px-6 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container dark:bg-surface-container-low dark:hover:bg-[#1a1e23] text-on-surface dark:text-on-surface font-mono text-label-code font-semibold transition-all duration-300 flex items-center gap-2 border border-hairline-border dark:border-white/10 shadow-sm hover:scale-[1.015] hover:border-hairline-border dark:hover:border-white/20 cursor-pointer group"
          >
            <span>See my full résumé</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
        </div>
    </section>
  );
}
