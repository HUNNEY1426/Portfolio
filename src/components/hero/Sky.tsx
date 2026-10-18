import type { CSSProperties } from "react";

/**
 * The sky plate: sunset in light mode, nebula in dark mode.
 *
 * `top` hangs from the top of the hero and runs on past it, fading into the
 * page colour halfway through the next section. `bottom` rises from the
 * bottom of the footer and fades out upward. Either way there is no seam.
 */
export function Sky({ edge = "top", focus }: { edge?: "top" | "bottom"; focus?: string }) {
  return (
    <div
      className={`sky sky--${edge}`}
      style={focus ? ({ "--sky-focus": focus } as CSSProperties) : undefined}
      aria-hidden="true"
    />
  );
}
