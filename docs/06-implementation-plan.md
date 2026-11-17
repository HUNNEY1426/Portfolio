# 06 · Launch and growth plan

## 1. Ship

1. Push to `HUNNEY1426/Portfolio` (`main`).
2. Import the repo in Vercel; add the environment variables from `.env.example`; deploy.
3. In Vercel → Domains, add `gxuri.is-a.dev`; note the A record and TXT verification value Vercel shows.
4. Register the domain with is-a.dev: fork `is-a-dev/register`, add `domains/gxuri.json` (A record) and `domains/_vercel.gxuri.json` (TXT), open a PR with a screenshot. After merge, confirm the domain in Vercel.

## 2. Measure

| Tool | Setting |
| --- | --- |
| Google Analytics 4 | Property in IST; web stream for https://gxuri.is-a.dev; Enhanced Measurement on; `NEXT_PUBLIC_GA_ID` in Vercel |
| GA4 hygiene | Define internal traffic (own IP) and filter it; data retention 14 months |
| Microsoft Clarity | Project for the site; `NEXT_PUBLIC_CLARITY_ID` in Vercel (heatmaps, recordings) |
| Google Search Console | URL-prefix property, HTML-tag method → `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`; submit `/sitemap.xml` |

Reports to watch: Acquisition → Traffic acquisition (incl. AI referrers such as chatgpt.com, perplexity.ai); Engagement → Pages and screens; Landing pages.

## 3. Rank (SEO · AEO · GEO)

Done in code: titles and descriptions within limits, one H1 per page, canonical links, share image, robots.txt open to AI crawlers, sitemap, `llms.txt`, structured data on every page, "Updated" date in the footer, cited sources on every article.

Ongoing, off-site:
- Same name and title everywhere: "Gauri Patel (Gxuri), Full Stack Developer" on LinkedIn, GitHub, X.
- GitHub: profile name and location, repo descriptions and READMEs.
- Publish a new article roughly monthly; update the "Updated" date (`src/lib/site.ts`) with content changes.
- Track AI visibility monthly: ask ChatGPT, Perplexity and Google a fixed set of questions and note citations.
