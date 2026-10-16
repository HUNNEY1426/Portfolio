"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Ties the hero copy to the scroll: as the page moves on, the intro lifts
 * and fades, handing over to the next section. Static for reduced motion.
 */
export function ScrollFade({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -110]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <motion.div className={className} style={reduce ? undefined : { y, opacity }}>
      {children}
    </motion.div>
  );
}
