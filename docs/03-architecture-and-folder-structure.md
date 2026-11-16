# 03 · Architecture and folder structure

Routes are thin; pages compose feature sections; shared pieces live in `components`; all content is typed data.

```
src/
├── app/                     Routes and metadata files
│   ├── layout.tsx           Fonts, theme boot script, site metadata, shell, analytics
│   ├── page.tsx             Home (+ Person / WebSite structured data)
│   ├── work/                /work and /work/[slug]
│   ├── blog/                /blog and /blog/[slug]
│   ├── resume/ connect/     /resume, /connect
│   ├── robots.ts sitemap.ts manifest.ts llms.txt/route.ts
│   └── icons, share image   favicon.ico, icon1/2.png, apple-icon.png, opengraph-image.png
├── components/
│   ├── common/              ScrambleText, IndexList, ContributionGraph, TechIcon, JsonLd,
│   │                        Analytics, Preloader, FloatingController, ArticleSkeleton, BrandIcons
│   ├── hero/                Sky, PageHero, RevealLines (RevealLines, FadeUp, Handwrite), HeroScroll
│   └── layout/              Navbar, SiteFooter
├── context/                 PreferencesContext (theme, sound, intro, section tags)
├── data/                    profile, resume, projects, blogPosts, uses
├── features/                Page sections: home/, work/, blog/, resume/, connect/
└── lib/                     github (live data), intro (intro-done signal), site (URL, updated date),
                             sound, motion, utils, year
```

## Key decisions

- **Server first.** Pages and data are server components; only interactive pieces are client components (`"use client"`).
- **Cache Components.** Live GitHub data (`getContributions`, `getRepos`) uses `"use cache"` + `cacheLife("hours")`, so pages stay static and refresh in the background.
- **URL data behind Suspense.** `[slug]` pages read `params` inside a Suspense boundary (`ArticleSkeleton` fallback), so navigation stays instant.
- **One source of truth.** Contact details in `data/profile.ts`; résumé content in `data/resume.ts`, reused by the résumé page, the Work experience section and `llms.txt`.
- **Animation gating.** `lib/intro.ts` exposes `useIntroDone()`; hero and text animations wait until the intro opens.
- **Accessibility.** Animated text (`ScrambleText`) keeps one copy in the HTML; screen readers get the real text during the effect; everything respects `prefers-reduced-motion`.
