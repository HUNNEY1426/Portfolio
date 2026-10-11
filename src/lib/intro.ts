"use client";

import { useSyncExternalStore } from "react";

/**
 * A tiny shared flag: has the intro screen finished?
 *
 * The Preloader flips it when the intro opens onto the page (or straight
 * away when the intro is turned off). Hero and text animations wait for it,
 * so they play as the page is revealed rather than behind the intro. It
 * stays true for the rest of the visit, so client-side navigations animate
 * immediately.
 */

let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** True once the intro has opened. Always false during server rendering. */
export function useIntroDone() {
  return useSyncExternalStore(subscribe, () => done, () => false);
}
