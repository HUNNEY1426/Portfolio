# 02 · Design direction and assets

## Direction

A calm, cinematic portfolio: a full-screen sky for every hero, editorial serif type, and quiet motion that rewards scrolling. The visual identity is original to this site.

- **Hero:** full width, full height, title centred over the sky. The home hero adds Gauri's portrait rising from the bottom.
- **Sky:** sunset (light mode) and nebula (dark mode). It runs on past the hero and dissolves halfway into the next section.
- **Rails:** below the hero, two hairlines frame a centred content column (60% of the width on desktop), with a sparse dot grid in the margins and dashed section dividers that cross the rails with a small "+".
- **Footer:** the handwritten signature "Gauri" over a sky that rises from the bottom, then the colophon.

## Assets (`public/`)

| File | Use |
| --- | --- |
| `assets/sunset.webp`, `assets/nebula.webp` | Hero sky, light and dark |
| `assets/gauri-pastel-hd.png`, `assets/gauri-twilight-hd.png` | Home hero portrait, light and dark (cropped, 3× Lanczos upscale + sharpen) |
| `assets/favicon*.png`, `assets/android-chrome-*.png`, `assets/apple-touch-icon.png` | Favicon set (portrait illustration) |
| `Gauri-Patel-Resume.pdf` | Résumé download |

Icon routes in `src/app` (`favicon.ico`, `icon1.png`, `icon2.png`, `apple-icon.png`) are copies of the favicon set; `opengraph-image.png` / `twitter-image.png` are the 1200 × 630 share card.

## Third-party media

- Blog cover photos: Unsplash, free Unsplash License, photographer credited under each cover.
- Technology logos: Simple Icons (CC0), rendered from the `simple-icons` package; nothing is hot-linked.

## Open items

- A higher-resolution portrait (transparent background) would make the home hero fully sharp.
