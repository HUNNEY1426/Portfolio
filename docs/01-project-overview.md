# 01 · Project overview

Personal portfolio of **Gauri Patel (Gxuri)**, a full stack developer in Ahmedabad, Gujarat, India.

- **Live:** https://gxuri.is-a.dev
- **Repo:** https://github.com/HUNNEY1426/Portfolio

## Purpose

1. Introduce Gauri and Gauri's work in one scroll: who Gauri is, what gets built, and with what.
2. Let recruiters and collaborators check the details: experience, projects (live + source), résumé, writing.
3. Be easy to find: in Google results and in AI answers (ChatGPT, Perplexity, Google AI Overviews).

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero, about, experience, tech stack bands, GitHub activity, recent writing, quote |
| `/work` | Experience at Inventive Rhino with what was built, then all projects |
| `/work/[slug]` | One project: summary, stack (real logos), what was built, Previous / Next |
| `/blog` | Article index with "Show more" |
| `/blog/[slug]` | One article: cover photo, sections, code, sources, Newer / Older |
| `/resume` | PDF preview (Google Drive), download, copy as text, education, setup, tools, GitHub graph, work |
| `/connect` | Email, LinkedIn, GitHub, X, working style |

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Partial Prefetching, Turbopack) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 3.4 + CSS custom properties (light / dark tokens) |
| Motion | Motion for React (`motion/react`) |
| Icons | Lucide (UI), Simple Icons (technology logos, CC0) |
| Data | Typed TypeScript modules in `src/data`, live GitHub data in `src/lib/github.ts` |
| Hosting | Vercel |
| Analytics | Google Analytics 4 + Microsoft Clarity (switched on by environment variables) |

## Content sources

All personal facts (roles, dates, projects, education) come from the résumé PDF (`public/Gauri-Patel-Resume.pdf`) and are kept in `src/data/resume.ts` and `src/data/profile.ts`. Blog posts cite official sources only; cover photos are Unsplash (free licence), credited on each post.
