# 04 · Routing and page map

## Pages

### `/` Home
1. Hero: "Yo! I'm Gxuri, a Full Stack Developer And I Build Stuff", portrait, sky.
2. About: keyword-highlight statement.
3. Experience: current role, with highlights.
4. Tech stack: three bordered logo bands scrolling in alternating directions; grey until hover.
5. GitHub activity: live contribution graph (26 weeks on phones).
6. Writings: latest posts.
7. Quote.

### `/work`
Hero → Experience (role, what was built, stack logos, links) → Projects (live from GitHub; each card opens `/work/[slug]`, with Live and Code buttons).

### `/work/[slug]`
`ai-repopilot`, `ai-terminal-agent`, `inventive-rhino`, `portfolio`. Summary, Built with (real logos), What I built, Previous / Next (wraps around).

### `/blog` and `/blog/[slug]`
Index shows 3 posts, then "Show more". Each article: category, title, excerpt, cover photo with credit, sections and code, Sources & further reading, Newer / Older.

### `/resume`
Download PDF, Copy as text, Google Drive preview; bento: Education, My setup, Tools I use daily, GitHub activity; then Work.

### `/connect`
Email card, LinkedIn card, Elsewhere (X, GitHub), Working style.

## Metadata routes

| Route | Source |
| --- | --- |
| `/robots.txt` | `src/app/robots.ts`: all crawlers allowed, AI crawlers named |
| `/sitemap.xml` | `src/app/sitemap.ts`: pages, posts and projects |
| `/manifest.webmanifest` | `src/app/manifest.ts` |
| `/llms.txt` | `src/app/llms.txt/route.ts`: plain-text site summary for AI crawlers |
| `/opengraph-image.png`, `/twitter-image.png` | Share card |

## Redirects

`/writings` and `/writings/:slug` → `/blog` (permanent).
