import { SITE_URL } from "@/lib/site";
import { PROFILE } from "@/data/profile";
import { BLOG_POSTS } from "@/data/blogPosts";
import { DETAILED_PROJECTS } from "@/data/projects";

/**
 * /llms.txt: a plain-text summary of the site for AI crawlers (llmstxt.org).
 * Optional and not used by Google, but cheap and helpful for other engines.
 */
export function GET() {
  const body = [
    `# ${PROFILE.name} (${PROFILE.handle})`,
    "",
    `> ${PROFILE.name}, also known as ${PROFILE.handle}, is a full stack developer in ${PROFILE.location}, India, with 2 years building production web apps in Next.js, React, TypeScript, Tailwind CSS, Zustand and Prisma. Front End Developer at Inventive Rhino Pvt. Ltd. since February 2024.`,
    "",
    "## Pages",
    `- [Work](${SITE_URL}/work): experience and projects, with live demos and source code`,
    `- [Résumé](${SITE_URL}/resume): résumé (PDF), education, setup and tools`,
    `- [Blog](${SITE_URL}/blog): articles on Next.js, TypeScript, CSS and AI coding agents`,
    `- [Contact](${SITE_URL}/connect): email, LinkedIn, GitHub and X`,
    "",
    "## Projects",
    ...DETAILED_PROJECTS.map((p) => `- [${p.title}](${SITE_URL}/work/${p.slug}): ${p.summary}`),
    "",
    "## Articles",
    ...BLOG_POSTS.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`),
    "",
    "## Profiles",
    `- GitHub: ${PROFILE.github.url}`,
    `- LinkedIn: ${PROFILE.linkedin.url}`,
    `- X: ${PROFILE.x.url}`,
    `- Email: ${PROFILE.email}`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
