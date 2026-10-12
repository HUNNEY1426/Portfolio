/**
 * The site's public address, used for the sitemap, robots.txt, canonical
 * links and link previews.
 *
 * Set NEXT_PUBLIC_SITE_URL to your domain (https://gxuri.is-a.dev).
 * On Vercel, the production domain is picked up automatically as a fallback.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

/** Shown as "Updated …" in the footer and used as dateModified in structured data. Bump on content changes. */
export const SITE_UPDATED = { label: "November 2026", iso: "2026-11-18" };
