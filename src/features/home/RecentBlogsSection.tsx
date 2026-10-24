"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { BLOG_POSTS } from "@/data/blogPosts";
import { ScrambleText } from "@/components/common/ScrambleText";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function RecentBlogsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.35, once: false });
  const [revealComplete, setRevealComplete] = useState(false);

  // Hover focus only unlocks once the staggered reveal has settled.
  const isInteractive = isInView && revealComplete;

  
  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-gutter lg:px-gutter-desktop py-20 sm:py-28 bg-background overflow-hidden" 
      id="blog"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        {/* Minimal Centered Heading Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="section-pill inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low dark:bg-surface-container-low border border-hairline-border dark:border-white/10 shadow-sm">
            <ScrambleText as="h2" className="font-mono text-xs uppercase tracking-wider font-semibold text-on-surface" text="Writings" />
          </div>
        </motion.div>

        {/* Minimal Grid / List with Staggered Entrance and Card Blur Focus */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onAnimationComplete={() => setRevealComplete(isInView)}
          className={`w-full flex flex-col gap-2.5 experience-list ${isInteractive ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {BLOG_POSTS.slice(0, 4).map((post) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="blog-card experience-card group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-surface-container-low/70 hover:bg-surface-container/60 dark:bg-surface-container-low/80 dark:hover:bg-[#181c20] border border-hairline-border/80 dark:border-white/10 transition-all duration-300 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                {/* Topic & Category */}
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-subtle uppercase tracking-wider font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-base sm:text-lg text-on-surface dark:text-on-surface group-hover:text-on-surface dark:group-hover:text-on-surface transition-colors">
                    <ScrambleText text={post.title} />
                  </h3>
                </div>

                {/* Date & -> Symbol */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0 justify-between sm:justify-end">
                  <span className="font-mono text-xs sm:text-sm text-muted-subtle font-medium">
                    {post.date}
                  </span>
                  <span className="font-mono text-base font-bold text-muted-subtle group-hover:text-on-surface dark:group-hover:text-on-surface transition-all duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* See All Writings Button on the Bottom Center with subtle scale */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10"
        >
          <Link
            href="/blog"
            className="px-6 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container dark:bg-surface-container-low dark:hover:bg-[#1a1e23] text-on-surface dark:text-on-surface font-mono text-label-code font-semibold transition-all duration-300 flex items-center gap-2 border border-hairline-border dark:border-white/10 shadow-sm hover:scale-[1.015] hover:border-hairline-border dark:hover:border-white/20 cursor-pointer group"
          >
            <span>See all writings</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
