import { cacheLife } from "next/cache";
import { PROFILE } from "@/data/profile";

/**
 * Live GitHub data, fetched on the server and cached for an hour, so the
 * graph and the project list follow the real account without a token.
 * Both functions return null on any failure; callers render a fallback.
 */

/**
 * An optional GITHUB_TOKEN (server-only, read-only public access is enough)
 * lifts GitHub's anonymous rate limit, which shared hosting IPs can hit.
 */
const HEADERS: Record<string, string> = {
  "User-Agent": "gauri-portfolio",
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

export interface ContributionDay {
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
  /** GitHub's own label, e.g. "3 contributions on March 4th." */
  label: string;
}

export interface Contributions {
  total: number;
  /** Week columns, oldest first; each holds up to seven days, Sunday first. */
  weeks: ContributionDay[][];
}

/** The public contribution calendar, parsed from GitHub's profile fragment. */
export async function getContributions(): Promise<Contributions | null> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch(`https://github.com/users/${PROFILE.github.user}/contributions`, { headers: HEADERS });
    if (!res.ok) return null;
    const html = await res.text();

    const labels = new Map<string, string>();
    for (const m of html.matchAll(/<tool-tip[^>]*for="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      labels.set(m[1], m[2].trim());
    }

    const weeks: ContributionDay[][] = [];
    const cell = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="(contribution-day-component-(\d+)-(\d+))"[^>]*data-level="(\d)"/g;
    for (const m of html.matchAll(cell)) {
      const [, date, id, row, col, level] = m;
      const w = Number(col);
      (weeks[w] ??= [])[Number(row)] = { date, level: Number(level) as ContributionDay["level"], label: labels.get(id) ?? date };
    }
    if (!weeks.length) return null;

    const totalMatch = html.replace(/\s+/g, " ").match(/([\d,]+) contributions? in the last year/);
    const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : 0;

    return { total, weeks: weeks.map((w) => (w ?? []).filter(Boolean)) };
  } catch {
    return null;
  }
}

export interface Repo {
  name: string;
  description: string | null;
  homepage: string | null;
  url: string;
  language: string | null;
  updatedAt: string;
}

/** Public, non-fork repositories, most recently updated first. */
export async function getRepos(): Promise<Repo[] | null> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch(`https://api.github.com/users/${PROFILE.github.user}/repos?per_page=100&sort=updated`, {
      headers: HEADERS,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{
      name: string;
      fork: boolean;
      description: string | null;
      homepage: string | null;
      html_url: string;
      language: string | null;
      updated_at: string;
    }>;

    return data
      .filter((r) => !r.fork && r.name.toLowerCase() !== PROFILE.github.user.toLowerCase())
      .map((r) => ({
        name: r.name,
        description: r.description,
        homepage: r.homepage && !r.homepage.includes("github.com") ? r.homepage : null,
        url: r.html_url,
        language: r.language,
        updatedAt: r.updated_at,
      }));
  } catch {
    return null;
  }
}
