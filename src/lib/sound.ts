// Micro-haptic feedback synthesised with the Web Audio API: no audio files.
//
// Hover ticks are never dropped: if two arrive closer than MIN_GAP they
// are queued a few milliseconds apart, so sweeping across five items gives
// five distinct ticks in order.

let audioCtx: AudioContext | null = null;

/** Next free slot on the audio clock for a hover tick (seconds). */
let nextHoverAt = 0;
/** Ticks closer than this are spaced out rather than stacked (seconds). */
const MIN_GAP = 0.024;
/** Never queue more than this far ahead, so a long fast sweep can't lag behind the pointer. */
const MAX_LAG = 0.08;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass({ latencyHint: "interactive" });
      }
    }
  } catch {
    // AudioContext blocked or unsupported
  }
  return audioCtx;
}

// Resume the context on the first user gesture so sound works straight away.
if (typeof window !== "undefined") {
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
  };
  ["pointerdown", "pointermove", "touchstart", "keydown", "scroll"].forEach((evt) => {
    window.addEventListener(evt, unlockAudio, { passive: true, once: true });
  });
}

function suspendIfMuted() {
  if (audioCtx && audioCtx.state === "running") audioCtx.suspend().catch(() => {});
}

/** A single sine sweep with an exponential decay, as the site always had. */
function sweep(ctx: AudioContext, at: number, from: number, to: number, peak: number, length: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(from, at);
  osc.frequency.exponentialRampToValueAtTime(to, at + length);
  gain.gain.setValueAtTime(peak, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.onended = () => {
    try {
      gain.disconnect();
      osc.disconnect();
    } catch {
      // already disconnected
    }
  };
  osc.start(at);
  osc.stop(at + length + 0.002);
}

function withContext(run: (ctx: AudioContext) => void) {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    ctx.resume().then(() => run(ctx)).catch(() => {});
  } else {
    run(ctx);
  }
}

/**
 * The original hover tick: a sine sweep from 1600 to 420 Hz over 24ms.
 * Ticks are spaced out rather than dropped during a fast sweep.
 */
export function playHoverSound(isSoundEnabled = true) {
  if (typeof window === "undefined") return;
  if (!isSoundEnabled) return suspendIfMuted();

  withContext((ctx) => {
    const now = ctx.currentTime;
    let at = Math.max(now, nextHoverAt);
    if (at - now > MAX_LAG) at = now;
    nextHoverAt = at + MIN_GAP;
    sweep(ctx, at, 1600, 420, 0.16, 0.024);
  });
}

/** The original click: a sine sweep from 900 to 180 Hz over 38ms. */
export function playClickSound(isSoundEnabled = true) {
  if (typeof window === "undefined") return;
  if (!isSoundEnabled) return suspendIfMuted();

  withContext((ctx) => {
    sweep(ctx, ctx.currentTime, 900, 180, 0.2, 0.038);
  });
}
