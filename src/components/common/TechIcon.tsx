import type { ComponentType, SVGProps } from "react";
import { Boxes, BrainCircuit, Gauge, KeyRound, Network, Search, ShieldCheck, Sparkles, SquareTerminal } from "lucide-react";
import {
  siDocker,
  siExpress,
  siGithub,
  siGooglegemini,
  siJavascript,
  siJsonwebtokens,
  siPrisma,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

/**
 * Real brand logos for tech tags, from Simple Icons (CC0). Concepts that
 * are not brands (RAG, SEO, Performance) and tools without an official mark
 * in the set use a matching line icon instead.
 */
const BRANDS: Record<string, SimpleIcon> = {
  react: siReact,
  typescript: siTypescript,
  "node.js": siNodedotjs,
  express: siExpress,
  "tailwind css": siTailwindcss,
  docker: siDocker,
  javascript: siJavascript,
  "gemini api": siGooglegemini,
  "next.js": siNextdotjs,
  "github api": siGithub,
  prisma: siPrisma,
  jwt: siJsonwebtokens,
};

const GENERIC: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  rag: BrainCircuit,
  seo: Search,
  performance: Gauge,
  "commander.js": SquareTerminal,
  motion: Sparkles,
  zustand: Boxes,
  "rest apis": Network,
  oauth: KeyRound,
  rbac: ShieldCheck,
};

/** Near-black brand colours (Next.js, Express, GitHub) follow the text colour so they show in dark mode. */
function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
}

export function TechIcon({ name, className = "w-3.5 h-3.5" }: { name: string; className?: string }) {
  const key = name.toLowerCase();
  const brand = BRANDS[key];

  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill={isDark(brand.hex) ? "currentColor" : `#${brand.hex}`}
        role="img"
        aria-label={`${brand.title} logo`}
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const Generic = GENERIC[key];
  return Generic ? <Generic className={`${className} text-accent`} aria-hidden="true" /> : null;
}
