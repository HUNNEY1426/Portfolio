import type { Config } from "tailwindcss";

/**
 * Colour tokens resolve to CSS custom properties holding bare RGB channel
 * triplets, so Tailwind can apply alpha modifiers such as
 * bg-surface-container-low/70.
 */
const channel = (name: string) => "rgb(var(" + name + ") / <alpha-value>)";

/**
 * Design tokens for the Gxuri portfolio.
 *
 * The palette is derived from the two hero plates - the nebula (dark) and
 * the sunset (light) - so the UI, the photography and the gradients that
 * join them read as one image rather than three layers.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ------------------------------------------------------------------ */
      /*                              Colour                                 */
      /* ------------------------------------------------------------------ */
      colors: {
        /* Page + card surfaces */
        background: channel("--background"),
        surface: channel("--surface"),
        "surface-dim": channel("--surface-dim"),
        "surface-bright": channel("--surface-bright"),
        "surface-container-lowest": channel("--surface-container-lowest"),
        "surface-container-low": channel("--surface-container-low"),
        "surface-container": channel("--surface-container"),
        "surface-container-high": channel("--surface-container-high"),
        "surface-container-highest": channel("--surface-container-highest"),

        /* Foreground */
        "on-surface": channel("--on-surface"),
        "on-surface-variant": channel("--on-surface-variant"),
        "on-background": channel("--foreground"),
        "inverse-surface": channel("--inverse-surface"),
        "inverse-on-surface": channel("--inverse-on-surface"),

        /* Outline */
        outline: channel("--outline"),
        "outline-variant": channel("--outline-variant"),
        "surface-tint": channel("--surface-tint"),

        /* Primary */
        primary: channel("--primary"),
        "on-primary": channel("--on-primary"),
        "primary-container": channel("--primary-container"),
        "on-primary-container": channel("--on-primary-container"),
        "inverse-primary": channel("--inverse-primary"),

        /* Secondary */
        secondary: channel("--secondary"),
        "on-secondary": channel("--on-secondary"),
        "secondary-container": channel("--secondary-container"),
        "on-secondary-container": channel("--on-secondary-container"),

        /* Tertiary */
        tertiary: channel("--tertiary"),
        "on-tertiary": channel("--on-tertiary"),
        "tertiary-container": channel("--tertiary-container"),
        "on-tertiary-container": channel("--on-tertiary-container"),

        /* Status */
        error: channel("--error"),
        "on-error": channel("--on-error"),
        "error-container": channel("--error-container"),
        "on-error-container": channel("--on-error-container"),

        /* Accents + utility */
        accent: channel("--accent"),
        "hairline-border": channel("--hairline-border"),
        "muted-subtle": channel("--muted-subtle"),
        "canvas-white": channel("--canvas-white"),
      },

      /* ------------------------------------------------------------------ */
      /*                           Typography                               */
      /* ------------------------------------------------------------------ */
      fontFamily: {
        /* Editorial display face - Cormorant Garamond. */
        display: ["var(--font-display)", "Georgia", "serif"],
        /* UI / body face - Inter. */
        body: ["var(--font-body)", "ui-sans-serif", "sans-serif"],
        /* Technical face - Geist Mono. */
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        /* Handwritten face - Caveat. */
        script: ["var(--font-script)", "cursive"],
        /* Back-compat alias: `font-sans` has always meant the display face. */
        sans: ["var(--font-display)", "Georgia", "serif"],
      },

      /**
       * The type scale. Cormorant Garamond has a small x-height, so display
       * sizes sit larger and looser than a grotesque would.
       */
      fontSize: {
        "headline-lg": [
          "clamp(2.5rem, 5.4vw, 4.25rem)",
          { lineHeight: "1.06", letterSpacing: "-0.02em" },
        ],
        "headline-md": [
          "clamp(1.5rem, 2.4vw, 2rem)",
          { lineHeight: "1.15", letterSpacing: "-0.015em" },
        ],
        "headline-sm": ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55", letterSpacing: "-0.005em" }],
        "label-code": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },

      /* ------------------------------------------------------------------ */
      /*                                Space                                */
      /* ------------------------------------------------------------------ */
      spacing: {
        gutter: "1.5rem",
        "gutter-desktop": "2.5rem",
        margin: "1.25rem",
        "margin-desktop": "4rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "3rem",
        "space-2xl": "6rem",
      },

      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },

      /* ------------------------------------------------------------------ */
      /*                          Letter spacing                            */
      /* ------------------------------------------------------------------ */
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.04em",
      },

      lineHeight: {
        tightest: "0.95",
        tighter: "1.05",
        tight: "1.1",
        snug: "1.2",
        normal: "1.4",
        relaxed: "1.5",
        loose: "1.6",
      },

      /* ------------------------------------------------------------------ */
      /*                                Motion                               */
      /* ------------------------------------------------------------------ */
      transitionDuration: {
        instant: "150ms",
        fast: "250ms",
        base: "400ms",
        slow: "700ms",
      },

      transitionTimingFunction: {
        /* The signature curve - fast start, long decelerating settle. */
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        /* Editorial entrance - matches the reference direction. */
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
        inout: "cubic-bezier(0.65, 0, 0.35, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
      },

      /* ------------------------------------------------------------------ */
      /*                              Elevation                              */
      /* ------------------------------------------------------------------ */
      boxShadow: {
        hairline: "0 1px 8px rgba(0, 0, 0, 0.04)",
        card: "0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 16px -4px rgba(0, 0, 0, 0.06)",
        float: "0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
        modal: "0 25px 70px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
