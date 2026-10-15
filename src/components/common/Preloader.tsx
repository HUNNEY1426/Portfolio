"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { usePreferences } from "@/context/PreferencesContext";
import { markIntroDone } from "@/lib/intro";

/* ------------------------------------------------------------------ clock */

function subscribeClock(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}
const readClock = () => Math.floor(Date.now() / 1000);
/** No clock on the server: the time is the visitor's, rendered on arrival. */
const readServerClock = () => 0;

function greetingFor(hour: number) {
  if (hour < 5) return "Still up?";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 22) return "Good evening";
  return "Good night";
}

/* ----------------------------------------------------------------- timing */

const EASE = [0.16, 1, 0.3, 1] as const;
const SPLIT_EASE = [0.76, 0, 0.24, 1] as const;
/** When the horizon line draws, when the screen opens, when the intro is gone (ms). */
const AT_HORIZON = 1500;
const AT_OPEN = 2150;
const AT_DONE = 3100;

type Phase = "arrive" | "horizon" | "open" | "done";

/**
 * The intro: a greeting for the time of day and the visitor's own local
 * time, ticking. A horizon line draws across the middle, then the screen
 * parts along it, upward and downward, onto the page.
 */
export function Preloader() {
  const { preloader } = usePreferences();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("arrive");
  const now = useSyncExternalStore(subscribeClock, readClock, readServerClock);

  useEffect(() => {
    // Intro turned off: the page animations can start straight away.
    if (!preloader) {
      markIntroDone();
      return;
    }
    const root = document.documentElement;
    root.style.overflow = "hidden";

    // The page animations start as the screen opens, so they play in view.
    const timers = reduce
      ? [
          window.setTimeout(() => {
            markIntroDone();
            setPhase("done");
          }, 1400),
        ]
      : [
          window.setTimeout(() => setPhase("horizon"), AT_HORIZON),
          window.setTimeout(() => {
            markIntroDone();
            setPhase("open");
          }, AT_OPEN),
          window.setTimeout(() => setPhase("done"), AT_DONE),
        ];

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      root.style.overflow = "";
    };
  }, [preloader, reduce]);

  useEffect(() => {
    if (phase === "done") document.documentElement.style.overflow = "";
  }, [phase]);

  if (!preloader) return null;

  const date = now ? new Date(now * 1000) : null;
  const time = date?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" });
  const day = date
    ?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();
  const opening = phase === "open";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          className="intro"
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.4 : 0.2 }}
        >
          {/* The two halves that part along the horizon. */}
          <motion.div
            className="intro-half intro-half--top"
            animate={opening ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.95, ease: SPLIT_EASE }}
          />
          <motion.div
            className="intro-half intro-half--bottom"
            animate={opening ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.95, ease: SPLIT_EASE }}
          />

          <motion.div
            className="intro-content"
            animate={opening ? { opacity: 0, y: -12, filter: "blur(6px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <motion.p
              className="intro-greeting"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: date ? 1 : 0, y: date ? 0 : 8 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              {date ? greetingFor(date.getHours()) : " "}
            </motion.p>

            <span className="intro-line">
              <motion.span
                className="intro-time"
                initial={{ y: "105%" }}
                animate={{ y: date ? "0%" : "105%" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              >
                {time ?? " "}
              </motion.span>
            </span>
            <span className="intro-line">
              <motion.span
                className="intro-date"
                initial={{ y: "105%" }}
                animate={{ y: date ? "0%" : "105%" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.38 }}
              >
                {day ?? " "}
              </motion.span>
            </span>
          </motion.div>

          {/* The horizon: drawn from the centre out, just before the screen opens. */}
          <motion.span
            className="intro-horizon"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: phase === "arrive" ? 0 : 1, opacity: opening ? 0 : 1 }}
            transition={{ duration: opening ? 0.3 : 0.6, ease: EASE }}
          />

          <motion.p
            className="intro-footnote"
            initial={{ opacity: 0 }}
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.5, delay: opening ? 0 : 0.6 }}
          >
            The moment you arrived <span>· Gauri</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
