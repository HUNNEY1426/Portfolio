import type { SimpleIcon } from "simple-icons";
import {
  siApollographql,
  siAxios,
  siClaude,
  siCss,
  siCursor,
  siDocker,
  siExpress,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siGooglegemini,
  siGraphql,
  siHtml5,
  siJavascript,
  siJira,
  siJsonwebtokens,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siPostman,
  siPrisma,
  siReact,
  siReactquery,
  siRedux,
  siSocketdotio,
  siSwagger,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";
import { FadeUp } from "@/components/hero/RevealLines";
import { ScrambleText } from "@/components/common/ScrambleText";

/**
 * The tech stack as three bands of bordered tiles that scroll forever,
 * alternating direction. Logos are the real brand marks (Simple Icons, CC0),
 * shown in grey until hovered, when they light up in their brand colour and
 * play the hover tick. Hovering a band pauses it, so a logo can be read.
 */
const ROWS: SimpleIcon[][] = [
  // Building the interface
  [siNextdotjs, siReact, siTypescript, siJavascript, siTailwindcss, siHtml5, siCss, siMui, siFigma],
  // State, data and the backend
  [siRedux, siReactquery, siPrisma, siNodedotjs, siExpress, siGraphql, siApollographql, siAxios, siSocketdotio, siJsonwebtokens],
  // Tools, delivery and AI
  [siGit, siGithub, siPostman, siSwagger, siJira, siVercel, siFirebase, siDocker, siCursor, siClaude, siGooglegemini],
];

/** Near-black brand colours follow the text colour, so they show in dark mode. */
function brandFill(hex: string) {
  const n = parseInt(hex, 16);
  const lum = 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
  return lum < 60 ? "currentColor" : `#${hex}`;
}

function Tile({ icon, hidden }: { icon: SimpleIcon; hidden?: boolean }) {
  return (
    <li className="tech-tile" data-hover-sound aria-hidden={hidden || undefined}>
      <svg viewBox="0 0 24 24" fill={brandFill(icon.hex)} role="img" aria-label={hidden ? undefined : icon.title}>
        <path d={icon.path} />
      </svg>
      <span className="tech-tile-name">{icon.title}</span>
    </li>
  );
}

export function TechStackSection() {
  return (
    <section className="relative w-full flex flex-col items-center py-20 sm:py-28" id="stack">
      <FadeUp delay={0} className="flex justify-center mb-10">
        <div className="section-pill inline-flex items-center px-4 py-1.5 rounded-full bg-surface-container-low border border-hairline-border dark:border-white/10 shadow-sm">
          <ScrambleText as="h2" className="font-mono text-xs uppercase tracking-wider font-semibold text-on-surface" text="Tech Stack" />
        </div>
      </FadeUp>

      <div className="tech-bands w-full">
        {ROWS.map((row, i) => (
          <div key={i} className="tech-band">
            {/* Each row is rendered twice end to end so the loop is seamless. */}
            <ul className={`tech-track ${i % 2 === 1 ? "tech-track--reverse" : ""}`} style={{ animationDuration: `${row.length * 4.5}s` }}>
              {row.map((icon) => (
                <Tile key={icon.slug} icon={icon} />
              ))}
              {row.map((icon) => (
                <Tile key={`${icon.slug}-copy`} icon={icon} hidden />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
