"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { GithubIcon } from "@/components/common/BrandIcons";
import { MAILTO, PROFILE } from "@/data/profile";
import { SITE_UPDATED } from "@/lib/site";
import { Sky } from "@/components/hero/Sky";

const SIGNATURE = "Gauri";

/** Pen-like pacing: a slow start, an even stroke, a soft lift at the end. */
const WRITE_EASE = [0.45, 0.05, 0.25, 1] as const;

/**
 * The site footer, the same on every page: the handwritten signature over
 * a sky that rises from the bottom of the page, then the colophon.
 */
export function SiteFooter({ year }: { year: number }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.35, once: true });
  const reduce = useReducedMotion();

  return (
    <footer ref={ref} className="site-footer" id="finale">
      <Sky edge="bottom" />

      <div className="finale-signature-wrap">
        <p className="finale-signature">
          {/* The name is revealed left to right, as if written with a pen. */}
          <motion.span
            className="finale-ink"
            aria-hidden="true"
            initial={reduce ? false : { clipPath: "inset(-20% 100% -20% 0)" }}
            animate={isInView || reduce ? { clipPath: "inset(-20% -10% -20% 0)" } : undefined}
            transition={{ duration: 2.2, ease: WRITE_EASE, delay: 0.15 }}
          >
            {SIGNATURE}
          </motion.span>
          <span className="sr-only">{SIGNATURE}</span>
        </p>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={isInView || reduce ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="finale-footer"
      >
        <div className="finale-footer-meta">
          <span>© {year} Gauri</span>
          <span className="footer-coordinate">Ahmedabad, Gujarat</span>
          <span className="footer-coordinate">
            Updated <time dateTime={SITE_UPDATED.iso}>{SITE_UPDATED.label}</time>
          </span>
        </div>

        <nav className="finale-footer-nav" aria-label="Footer navigation">
          <Link href="/work">Work</Link>
          <Link href="/blog">Writing</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/connect">Contact</Link>
        </nav>

        <div className="finale-footer-socials">
          <a href={PROFILE.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon aria-hidden="true" />
          </a>
          <a href={PROFILE.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <span aria-hidden="true" className="font-sans text-[0.8rem] font-bold leading-none">in</span>
          </a>
          <a href={PROFILE.x.url} target="_blank" rel="noopener noreferrer" aria-label="X">
            <span aria-hidden="true">𝕏</span>
          </a>
          <a href={MAILTO} aria-label={`Email ${PROFILE.email}`}>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
