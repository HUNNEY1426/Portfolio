import type { Transition, Variants } from "motion/react";

/**
 * Canonical motion tokens.
 *
 * Every animated surface in the product (page reveals, card focus, list
 * staggers, drawer / modal choreography) pulls its timing from here so the
 * interface feels like one system instead of a collection of hand-tuned
 * literals.
 *
 * The signature curve is `EASE_OUT_EXPO` — a fast start with a long,
 * decelerating settle. It is the reason the product reads as "tactile"
 * rather than "floaty".
 */

/* -------------------------------------------------------------------------- */
/*                                  Easing                                    */
/* -------------------------------------------------------------------------- */

/** Signature curve. Fast departure, long decelerating settle. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Symmetric curve for reversible state changes (tabs, filters, accordions). */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** Curve for elements that overshoot slightly. Use sparingly. */
export const EASE_SPRING_SOFT = [0.34, 1.56, 0.64, 1] as const;

/** Curve for exits. Accelerates away. */
export const EASE_IN = [0.4, 0, 1, 1] as const;

/* -------------------------------------------------------------------------- */
/*                                 Duration                                   */
/* -------------------------------------------------------------------------- */

/** Duration scale in seconds. Mirrors the `duration-*` tokens in Tailwind. */
export const DURATION = {
  /** Micro-feedback: icon swaps, checkbox ticks. */
  instant: 0.15,
  /** Hover / focus / press feedback. */
  fast: 0.25,
  /** Default UI transition (chips, pills, borders). */
  base: 0.4,
  /** Section-level reveal. */
  slow: 0.7,
  /** Hero-scale choreography (mask reveals, name rotation). */
  reveal: 1.5,
} as const;

/* -------------------------------------------------------------------------- */
/*                                 Transition                                 */
/* -------------------------------------------------------------------------- */

/** The house transition. Use unless there is a reason not to. */
export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT_EXPO,
};

/** Hero-scale entrance. */
export const revealTransition: Transition = {
  duration: DURATION.reveal,
  ease: EASE_OUT_EXPO,
};

/** Fast feedback for hover/press states. */
export const microTransition: Transition = {
  duration: DURATION.fast,
  ease: EASE_OUT_EXPO,
};

/**
 * Spring used for surfaces that enter from off-screen (settings sheet).
 * `damping: 28 / stiffness: 320` gives a firm arrival with no overshoot.
 */
export const surfaceSpring: Transition = {
  type: "spring",
  damping: 28,
  stiffness: 320,
  mass: 0.9,
};

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

/** Parent container that staggers its children in. */
export function staggerContainer(
  staggerChildren = 0.1,
  delayChildren = 0.05
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren, delayChildren },
    },
  };
}

/** Child item for a staggered list: rises and un-blurs into place. */
export const listItem: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

/** Section-level block that rises into place. */
export const block: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

/** Word-level reveal used by the hero and the about statement. */
export const word: Variants = {
  hidden: { opacity: 0, y: 8, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};
