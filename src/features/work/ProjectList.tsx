"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { staggerContainer, listItem } from "@/lib/motion";
import { GithubIcon } from "@/components/common/BrandIcons";
import type { Project } from "@/data/projects";
import { ScrambleText } from "@/components/common/ScrambleText";

const containerVariants = staggerContainer(0.08, 0.05);

const LINK =
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-hairline-border dark:border-white/10 bg-surface/60 font-mono text-[11px] font-semibold text-on-surface hover:border-accent/50 hover:text-accent transition-colors";

/**
 * The work index: one row per project, in the same card style as the blog
 * archive, with a link to the live site (when there is one) and the repo.
 */
export function ProjectList({ projects, heading = "Projects" }: { projects: Project[]; heading?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.15, once: false });
  const [revealComplete, setRevealComplete] = useState(false);
  const isInteractive = isInView && revealComplete;

  return (
    <div ref={ref} className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center mb-8"
      >
        <div className="section-pill inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low border border-hairline-border dark:border-white/10 shadow-sm">
          <ScrambleText as="h2" className="font-mono text-xs uppercase tracking-wider font-semibold text-on-surface" text={heading} />
        </div>
      </motion.div>

      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onAnimationComplete={() => setRevealComplete(isInView)}
        className={`w-full flex flex-col gap-2.5 experience-list ${isInteractive ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {projects.map((p) => (
          <motion.li
            key={p.repo}
            variants={listItem}
            className="experience-card group relative flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-surface-container-low/70 dark:bg-surface-container-low/80 border border-hairline-border/80 dark:border-white/10 shadow-sm"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-sans font-semibold text-lg sm:text-xl text-on-surface">
                {p.slug ? (
                  // The title link stretches over the whole card, so the card opens the detail page.
                  <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">
                    <ScrambleText text={p.title} />
                  </Link>
                ) : (
                  <ScrambleText text={p.title} />
                )}
              </h3>
              <span className="font-mono text-xs sm:text-sm text-muted-subtle shrink-0">{p.year}</span>
            </div>
            {p.summary && <ScrambleText as="p" className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed" text={p.summary} delay={200} />}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <ul className="flex flex-wrap gap-1.5" aria-label="Tech">
                {p.tech.map((t, i) => (
                  <li key={t} className="font-mono text-[11px] text-muted-subtle">
                    {t}
                    {i < p.tech.length - 1 && <span aria-hidden="true"> ·</span>}
                  </li>
                ))}
              </ul>
              <div className="relative z-10 flex items-center gap-2">
                {p.slug && (
                  <span className="pointer-events-none hidden sm:inline font-mono text-[11px] text-muted-subtle group-hover:text-on-surface transition-colors mr-1">
                    Details →
                  </span>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className={LINK}>
                    Live <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className={LINK}>
                  <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" /> Code
                </a>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
