"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { staggerContainer, listItem } from "@/lib/motion";
import { ScrambleText } from "@/components/common/ScrambleText";

export interface IndexItem {
  title: string;
  /** Secondary text after the slash: a category, a role, a subtitle. */
  meta: string;
  /** Right-aligned mono label: a year, a date range, a publish date. */
  year: string;
  href: string;
  external?: boolean;
}

const containerVariants = staggerContainer(0.08, 0.05);

const ROW_CLASS =
  "experience-card group flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-surface-container-low/70 hover:bg-surface-container/60 dark:bg-surface-container-low/80 dark:hover:bg-surface-container-high border border-hairline-border/80 dark:border-white/10 transition-all duration-300 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer";

function Row({ item }: { item: IndexItem }) {
  const body = (
    <>
      <div className="flex items-baseline gap-2 flex-wrap min-w-0">
        <ScrambleText className="font-sans font-semibold text-base sm:text-lg text-on-surface" text={item.title} />
        <span className="text-muted-subtle hidden sm:inline text-sm">/</span>
        <ScrambleText className="font-body text-sm sm:text-base text-on-surface-variant line-clamp-1 sm:line-clamp-none" text={item.meta} delay={150} />
      </div>
      <div className="flex items-center gap-3 sm:gap-4 shrink-0 justify-between sm:justify-end">
        <span className="font-mono text-xs sm:text-sm text-muted-subtle font-medium whitespace-nowrap">{item.year}</span>
        <span className="font-mono text-base font-bold text-muted-subtle group-hover:text-on-surface transition-all duration-300 group-hover:translate-x-1.5">
          →
        </span>
      </div>
    </>
  );

  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={ROW_CLASS}>
      {body}
    </a>
  ) : (
    <Link href={item.href} className={ROW_CLASS}>
      {body}
    </Link>
  );
}

/**
 * The index list used by /work and /blog: a capsule heading, then rows
 * that rise in one after another. Once they have settled, hovering a row
 * dims its siblings.
 */
export function IndexList({ heading, items }: { heading: string; items: IndexItem[] }) {
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onAnimationComplete={() => setRevealComplete(isInView)}
        className={`w-full flex flex-col gap-2.5 experience-list ${isInteractive ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {items.map((item) => (
          <motion.div key={item.href + item.title} variants={listItem}>
            <Row item={item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
