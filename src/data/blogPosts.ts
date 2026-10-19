/**
 * Writing. Every factual claim in these posts is taken from the official
 * source listed in that post's `sources`, checked on 18 Nov 2026. Cover
 * photos are from Unsplash under the free Unsplash License, credited on
 * each post.
 */

export interface BlogSection {
  heading?: string;
  content?: string[];
  bullets?: string[];
  code?: string;
  codeLanguage?: string;
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  date: string;
  /** Machine-readable publish date (ISO 8601, month precision), for the sitemap and structured data. */
  published: string;
  readTime: string;
  /** One-sentence summary, used for search and link previews. */
  excerpt: string;
  cover: {
    src: string;
    alt: string;
    credit: string;
    creditUrl: string;
  };
  /** The primary source, linked at the top of the post. */
  externalLink?: { label: string; url: string };
  sections: BlogSection[];
  sources: { label: string; url: string }[];
}

const unsplash = (photoUrl: string) => `${photoUrl}?auto=format&fit=crop&w=1600&q=80`;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mcp-explained-how-ai-tools-plug-into-your-stack",
    category: "AI tooling",
    title: "MCP, explained: how AI tools plug into your stack",
    date: "Nov 2026",
    published: "2026-11",
    readTime: "5 min read",
    excerpt:
      "The Model Context Protocol is the reason one AI agent can talk to your database, your docs and your dev server. Here is what it is and how to use it safely.",
    cover: {
      src: unsplash("https://images.unsplash.com/photo-1750365919971-7dd273e7b317"),
      alt: "Illustration of a chip-filled brain inside a light bulb on a blue and purple gradient",
      credit: "Omar Lopez-Rincon on Unsplash",
      creditUrl: "https://unsplash.com/photos/ai-brain-inside-a-lightbulb-illustrates-an-idea-zips8ILZd04",
    },
    externalLink: { label: "modelcontextprotocol.io", url: "https://modelcontextprotocol.io/" },
    sections: [
      {
        heading: "The problem it solves",
        content: [
          "Every AI coding tool wants the same things: read your files, query your database, look at your running app, open an issue. Before MCP, each tool built its own one-off integration for each service, so connecting N tools to M services meant N × M pieces of glue.",
          "The Model Context Protocol fixes that with one shared interface. The official site describes it as \"an open-source standard for connecting AI applications to external systems.\" Anthropic introduced it in late 2024, and it has since become the common plug that most agents speak.",
        ],
      },
      {
        heading: "How it works",
        content: [
          "An MCP server wraps a system (a database, a design tool, your framework's dev server) and exposes what it can do as tools and resources. An MCP client, built into the AI app, discovers those capabilities and calls them when the model decides they help. Write the server once and every MCP-capable tool can use it.",
        ],
        bullets: [
          "Claude Code's docs describe MCP as \"an open standard for connecting AI tools to external data sources\" and use it for integrations.",
          "Google's Antigravity app lists MCPs alongside Skills and hooks as ways to customise its agents.",
          "Next.js 16 shipped a Next.js DevTools MCP, so an agent can inspect your running Next.js app while it debugs.",
        ],
      },
      {
        heading: "Adding a server to a project",
        content: [
          "In Claude Code, project-level servers live in a `.mcp.json` file at the repo root, so the whole team shares the same setup. A minimal example that wires up the Next.js DevTools server:",
        ],
        code: `{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    }
  }
}`,
        codeLanguage: "json",
      },
      {
        heading: "Use it safely",
        content: [
          "An MCP server is code that runs with your permissions and feeds text straight to a model, so treat it like any other dependency.",
        ],
        bullets: [
          "Install servers only from sources you trust, and pin versions for anything that touches production data.",
          "Give each server the narrowest access it needs: a read-only database user, a scoped API token.",
          "Remember that tool output is untrusted input. A web page or an issue body can contain instructions aimed at the model, so keep a human in the loop for anything destructive.",
        ],
      },
    ],
    sources: [
      { label: "Model Context Protocol: official site", url: "https://modelcontextprotocol.io/" },
      { label: "Claude Code overview (Anthropic docs)", url: "https://code.claude.com/docs/en/overview" },
      { label: "Antigravity app (Google)", url: "https://antigravity.google/product/antigravity-2" },
      { label: "Next.js 16 release post", url: "https://nextjs.org/blog/next-16" },
    ],
  },
  {
    slug: "ai-coding-agents-late-2026-from-assistant-to-team",
    category: "AI agents",
    title: "AI coding agents in late 2026: from one assistant to a team",
    date: "Nov 2026",
    published: "2026-11",
    readTime: "6 min read",
    excerpt:
      "Claude Code, Cursor and Google Antigravity have all moved the same way this year: from one chat in your editor to several agents working in parallel.",
    cover: {
      src: unsplash("https://images.unsplash.com/photo-1674027444485-cec3da58eef4"),
      alt: "Abstract sphere made of glowing dots and connecting lines",
      credit: "Growtika on Unsplash",
      creditUrl: "https://unsplash.com/photos/an-abstract-image-of-a-sphere-with-dots-and-lines-nGoCBxiaRO0",
    },
    sections: [
      {
        heading: "The shift",
        content: [
          "A year ago the typical setup was one AI assistant in one editor, answering one prompt at a time. By late 2026 the three tools I use every day, Claude Code, Cursor and Antigravity, have all moved to the same model: you describe the work, and a coordinator splits it across several agents running in parallel, often in the background.",
        ],
      },
      {
        heading: "Claude Code",
        content: [
          "Anthropic describes Claude Code as \"an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools.\" It runs in the terminal, IDEs, a desktop app and the web.",
        ],
        bullets: [
          "Subagents: spawn multiple agents that \"work on different parts of a task simultaneously.\"",
          "Hooks: run your own shell commands before or after the agent acts, for example a formatter or a test gate.",
          "MCP for connecting to external tools, plus background agents and an Agent SDK for building your own.",
        ],
      },
      {
        heading: "Cursor",
        content: [
          "Cursor's September Projects release introduced coordinators that run sub-tasks \"as many in parallel as the work needs.\" An Agent SDK followed in October, and in November Cursor added voice chat with agents from its Agents Window.",
        ],
      },
      {
        heading: "Google Antigravity",
        content: [
          "Google's Antigravity app is built to \"orchestrate multiple autonomous agents working in parallel across independent projects.\" Its feature list reads like a summary of where the whole category is going:",
        ],
        bullets: [
          "Dynamic subagents, defined and created on the fly for a task.",
          "Scheduled tasks that run on a cron, plus Artifacts for reviewing what agents produced.",
          "Customisation through Skills, MCP servers and JSON hooks, and a CLI for managing background subagents.",
        ],
      },
      {
        heading: "What changes for us",
        content: [
          "The job moves from typing code to directing and reviewing it. In my own work at Inventive Rhino that means three habits:",
        ],
        bullets: [
          "Write the task down properly first. Agents running in parallel need a clear goal and clear boundaries, or they collide.",
          "Keep the guard rails in code, not in prompts: tests, type checks and lint as hooks or CI gates.",
          "Review every diff. Faster output is only useful if it is correct, accessible and secure.",
        ],
      },
    ],
    sources: [
      { label: "Claude Code overview (Anthropic docs)", url: "https://code.claude.com/docs/en/overview" },
      { label: "Cursor changelog: Projects (Sep 2026)", url: "https://cursor.com/changelog/projects" },
      { label: "Cursor changelog", url: "https://cursor.com/changelog" },
      { label: "Antigravity app (Google)", url: "https://antigravity.google/product/antigravity-2" },
    ],
  },
  {
    slug: "nextjs-16-4-cache-components-for-every-app",
    category: "Next.js",
    title: "Next.js 16.4: Cache Components are now the recommended default",
    date: "Oct 2026",
    published: "2026-10",
    readTime: "5 min read",
    excerpt:
      "With 16.4, Vercel recommends Cache Components for every Next.js app and plans to make them the default in Next.js 17. Here is what that means and how to switch.",
    cover: {
      src: unsplash("https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9"),
      alt: "Lines of colourful code on a dark screen",
      credit: "Mitchell Luo on Unsplash",
      creditUrl: "https://unsplash.com/photos/computer-code-on-dark-screen-FWoq_ldWlNQ",
    },
    externalLink: { label: "nextjs.org", url: "https://nextjs.org/blog/next-16-4" },
    sections: [
      {
        heading: "The headline",
        content: [
          "Next.js 16.4 shipped on 6 October 2026 with a clear message: \"we're excited to recommend Cache Components as the best choice for every Next.js app.\" New apps from create-next-app have them on by default, and the team says they will become the default in Next.js 17.",
          "Cache Components arrived in Next.js 16 (October 2025) and replace the old implicit caching with an explicit model: nothing is cached unless you say so, using the `use cache` directive.",
        ],
      },
      {
        heading: "Turning it on",
        content: ["Two flags in `next.config.ts`, the same ones this portfolio runs on:"],
        code: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;`,
        codeLanguage: "ts",
      },
      {
        heading: "Caching a fetch",
        content: [
          "Mark a function as cacheable with `use cache` and set how long it lives with `cacheLife`. This is how the GitHub graph on my home page stays fresh without hitting GitHub on every visit:",
        ],
        code: `import { cacheLife } from "next/cache";

export async function getContributions() {
  "use cache";
  cacheLife("hours");

  const res = await fetch("https://github.com/users/HUNNEY1426/contributions");
  return parse(await res.text());
}`,
        codeLanguage: "ts",
      },
      {
        heading: "Also in 16.4",
        bullets: [
          "`next upgrade --agent` and `experimental.agentUpgrade` (default 'security') let a coding agent apply upgrades for you.",
          "Agent Skills to help adopt Cache Components, and opt-in agent feedback reports.",
          "Turbopack: a disk cache that uses 20–25% less space, lazy server HMR and smaller CSS Module class names in production.",
          "React 19.3, plus an experimental Rust-based React Compiler.",
        ],
      },
      {
        heading: "Coming from Next.js 15?",
        content: [
          "Next.js 16 itself also made Turbopack the default bundler (2–5× faster production builds, according to the release post), renamed `middleware.ts` to `proxy.ts`, and raised the minimum Node.js version to 20.9.",
        ],
      },
    ],
    sources: [
      { label: "Next.js 16.4 release post", url: "https://nextjs.org/blog/next-16-4" },
      { label: "Next.js 16 release post", url: "https://nextjs.org/blog/next-16" },
    ],
  },
  {
    slug: "css-that-became-baseline-in-2026",
    category: "CSS",
    title: "CSS that became Baseline in 2026, and what to use it for",
    date: "Oct 2026",
    published: "2026-10",
    readTime: "5 min read",
    excerpt:
      "Container style queries, field-sizing, sibling-count() and progress() all reached Baseline this year, which means they now work in every major browser.",
    cover: {
      src: unsplash("https://images.unsplash.com/photo-1779393424918-f5c17a6c2701"),
      alt: "A vibrant wavy line against a colourful gradient background",
      credit: "BoliviaInteligente on Unsplash",
      creditUrl: "https://unsplash.com/photos/vibrant-wavy-abstract-line-against-a-colorful-gradient-background-LWBs-wB7Mj0",
    },
    externalLink: { label: "web.dev", url: "https://web.dev/blog/web-platform-09-2026" },
    sections: [
      {
        heading: "What Baseline means",
        content: [
          "A feature is \"Baseline Newly available\" once it works in the current versions of every major browser engine. In practice that is the point where you can start shipping it with only a light fallback. These are the ones from 2026 I am most excited about, taken from web.dev's monthly digests.",
        ],
      },
      {
        heading: "May: container style queries and :open",
        content: [
          "Container queries could already react to size. Style queries let a component react to a custom property set by its container, so one card can have several variants without extra classes.",
        ],
        code: `.card-list { --layout: compact; container-name: list; }

@container list style(--layout: compact) {
  .card { padding: 0.75rem; font-size: 0.9rem; }
}`,
        codeLanguage: "css",
      },
      {
        heading: "June: field-sizing",
        content: ["One line to make a textarea or input grow with what the user types, with no JavaScript:"],
        code: `textarea {
  field-sizing: content;
  min-height: 3lh;
}`,
        codeLanguage: "css",
      },
      {
        heading: "August: :paused and sibling-count()",
        content: [
          "`sibling-count()` returns how many siblings an element has, which makes evenly divided layouts and staggered effects possible in pure CSS. The `:paused` pseudo-class lets you style media that is paused.",
        ],
        code: `.tab {
  width: calc(100% / sibling-count());
}`,
        codeLanguage: "css",
      },
      {
        heading: "September: progress(), alpha() and revert-rule",
        bullets: [
          "`progress()` turns a value into a 0 to 1 ratio between a start and an end point, which is handy for fluid sizing and scroll-linked effects.",
          "`alpha()` relative colour syntax adjusts just the transparency of an existing colour.",
          "`revert-rule` rolls a property back to the value from the previous matching rule.",
        ],
      },
    ],
    sources: [
      { label: "web.dev: New to the web platform in September 2026", url: "https://web.dev/blog/web-platform-09-2026" },
      { label: "web.dev: August 2026 Baseline digest", url: "https://web.dev/blog/baseline-digest-aug-2026" },
      { label: "web.dev: June 2026 Baseline digest", url: "https://web.dev/blog/baseline-digest-jun-2026" },
      { label: "web.dev: May 2026 Baseline digest", url: "https://web.dev/blog/baseline-digest-may-2026" },
    ],
  },
  {
    slug: "typescript-7-the-compiler-rewritten-in-go",
    category: "TypeScript",
    title: "TypeScript 7 is here: the compiler, rewritten in Go",
    date: "Jul 2026",
    published: "2026-07",
    readTime: "5 min read",
    excerpt:
      "TypeScript 7.0 is a native Go port of the compiler, 8 to 12 times faster on full builds. What changes, and how to upgrade without breaking your tooling.",
    cover: {
      src: unsplash("https://images.unsplash.com/photo-1760670399462-f5e479452c27"),
      alt: "Close-up of colourful code on a laptop screen at night",
      credit: "Vishnu Kalanad on Unsplash",
      creditUrl: "https://unsplash.com/photos/computer-screen-displaying-colorful-code-evzHeMgbKOg",
    },
    externalLink: { label: "devblogs.microsoft.com", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/" },
    sections: [
      {
        heading: "What shipped",
        content: [
          "TypeScript 7.0 reached general availability on 8 July 2026, after a beta in April and a release candidate on 18 June. It is the same language, but the compiler has been ported from JavaScript to Go.",
          "Microsoft reports \"speedups between 8x and 12x on full builds.\" Their own benchmark on the VS Code codebase dropped from 125.7 seconds with TypeScript 6 to 10.6 seconds with TypeScript 7.",
        ],
      },
      {
        heading: "Upgrading",
        content: ["For most projects the upgrade is just installing the new version. You still run `tsc`:"],
        code: `npm install -D typescript
npx tsc --noEmit`,
        codeLanguage: "bash",
      },
      {
        heading: "When to stay on TypeScript 6 for now",
        content: [
          "TypeScript 7.0 does not have a stable programmatic API yet. Tools that call into the compiler, such as typescript-eslint, keep working through a compatibility package that provides TypeScript 6 as `tsc6`. The release post suggests an npm alias:",
        ],
        code: `npm install -D typescript@npm:@typescript/typescript6`,
        codeLanguage: "bash",
        bullets: [
          "Vue, Astro, Svelte, MDX and Angular template tooling still need TypeScript 6 for editor support.",
          "Plain .ts and .tsx projects, such as a Next.js app, are the easy win.",
        ],
      },
      {
        heading: "Editors",
        content: [
          "The new language service is built on the Language Server Protocol. Microsoft says it reduced failing language server commands by over 80% and crashes by over 60% compared with TypeScript 6.0. A dedicated VS Code extension is available today, and support is shipping inside VS Code itself.",
        ],
      },
    ],
    sources: [
      { label: "Announcing TypeScript 7.0 (Microsoft)", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/" },
      { label: "Announcing TypeScript 7.0 RC (Microsoft)", url: "https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/" },
    ],
  },
];

/** Previous (newer) and next (older) posts, for the article footer. */
export function getAdjacentPosts(slug: string) {
  const i = BLOG_POSTS.findIndex((p) => p.slug === slug);
  return {
    newer: i > 0 ? BLOG_POSTS[i - 1] : null,
    older: i >= 0 && i < BLOG_POSTS.length - 1 ? BLOG_POSTS[i + 1] : null,
  };
}
