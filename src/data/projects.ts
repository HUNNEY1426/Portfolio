import { getRepos } from "@/lib/github";
import { PROFILE } from "@/data/profile";
import { RESUME } from "@/data/resume";

export interface Project {
  /** Set for projects with a detail page at /work/[slug]. */
  slug: string | null;
  title: string;
  subtitle: string;
  summary: string;
  tech: string[];
  /** What was built: the bullet points on the detail page. */
  points: string[];
  year: string;
  /** Live site, when there is one. */
  live: string | null;
  /** Source repository. */
  repo: string;
}

const pointsFor = (title: string) => [...(RESUME.projects.find((p) => p.title === title)?.points ?? [])];

/**
 * Known projects, in display order (this order is also Previous / Next on
 * the detail pages). `repoName` ties each one to its GitHub repository.
 */
const CURATED: Array<Project & { repoName: string }> = [
  {
    slug: "ai-repopilot",
    repoName: "Repopilot_AI",
    title: "AI RepoPilot",
    subtitle: "Full-stack AI software engineer agent",
    summary: "An AI agent that reads a GitHub repository, finds bugs, explains code and helps review pull requests, grounded in the repo itself through a RAG pipeline.",
    tech: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "RAG", "GitHub API", "Docker"],
    points: pointsFor("AI RepoPilot"),
    year: "2026",
    live: "https://repopilotai-delta.vercel.app",
    repo: `${PROFILE.github.url}/Repopilot_AI`,
  },
  {
    slug: "ai-terminal-agent",
    repoName: "Agent",
    title: "AI Terminal Agent",
    subtitle: "AI agent chatbot for the terminal",
    summary: "A terminal chatbot with persistent memory, multiple sessions and switchable LLM providers, plus tools for files and controlled shell commands.",
    tech: ["Node.js", "Express", "JavaScript", "Gemini API", "Commander.js"],
    points: pointsFor("AI Terminal Agent"),
    year: "2026",
    live: "https://agent-lemon-five.vercel.app/",
    repo: `${PROFILE.github.url}/Agent`,
  },
  {
    slug: "inventive-rhino",
    repoName: "inventivRhino",
    title: "Inventive Rhino",
    subtitle: "Company website",
    summary: "The production website for Inventive Rhino, built from scratch: responsive, SEO-friendly and tuned for Core Web Vitals.",
    tech: ["React", "TypeScript", "Tailwind CSS", "SEO", "Performance"],
    points: pointsFor("Inventive Rhino"),
    year: "2025",
    live: "https://inventiverhino.com",
    repo: `${PROFILE.github.url}/inventivRhino`,
  },
  {
    slug: "portfolio",
    repoName: "Portfolio",
    title: "Portfolio",
    subtitle: "This website",
    summary: "This site: a Next.js portfolio with light and dark themes, live GitHub data and motion throughout.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    points: [
      "Built with the Next.js App Router, TypeScript and Tailwind CSS, with light and dark themes that follow your device or your choice.",
      "Pulls the GitHub contribution graph and project list live from GitHub, cached on the server and refreshed hourly.",
      "Search-friendly by design: page metadata, structured data and semantic, accessible markup.",
      "Motion-led interactions with Motion for React, all respecting the reduced-motion preference.",
    ],
    year: "2026",
    live: null,
    repo: `${PROFILE.github.url}/Portfolio`,
  },
];

/** The detail-page projects, in order. Static: safe for generateStaticParams. */
/** A curated entry without its internal repo key. */
function toProject(entry: Project & { repoName: string }): Project {
  const { repoName, ...project } = entry;
  void repoName;
  return project;
}

export const DETAILED_PROJECTS: Project[] = CURATED.map(toProject);

export function getProjectBySlug(slug: string) {
  const index = DETAILED_PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  const count = DETAILED_PROJECTS.length;
  return {
    project: DETAILED_PROJECTS[index],
    previous: DETAILED_PROJECTS[(index - 1 + count) % count],
    next: DETAILED_PROJECTS[(index + 1) % count],
  };
}

/**
 * Everything for the work index: the curated projects (refreshed with live
 * GitHub data: last-updated year and homepage) followed by any other public
 * repositories, which link straight to GitHub.
 */
export async function getProjects(): Promise<Project[]> {
  const repos = (await getRepos()) ?? [];
  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

  const curated = CURATED.map(({ repoName, ...p }) => {
    const repo = byName.get(repoName.toLowerCase());
    return repo ? { ...p, year: repo.updatedAt.slice(0, 4), live: p.live ?? repo.homepage, repo: repo.url } : p;
  });

  const known = new Set(CURATED.map((p) => p.repoName.toLowerCase()));
  const others: Project[] = repos
    .filter((r) => !known.has(r.name.toLowerCase()))
    .map((r) => ({
      slug: null,
      title: r.name.replace(/[-_]/g, " "),
      subtitle: r.language ?? "Repository",
      summary: r.description ?? "",
      tech: r.language ? [r.language] : [],
      points: [],
      year: r.updatedAt.slice(0, 4),
      live: r.homepage,
      repo: r.url,
    }));

  return [...curated, ...others];
}
