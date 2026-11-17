# 05 · Design system

## Colour

All colours are CSS custom properties holding RGB triplets (`--background`, `--surface`, `--on-surface`, `--accent`, …), so Tailwind can apply alpha (`bg-surface/60`). Light and dark are two states of the same tokens, switched by the `.dark` class on `<html>`.

| Token | Light | Dark |
| --- | --- | --- |
| background | `#f7f4f1` warm paper | `#07050e` nebula |
| on-surface | `#17121a` | `#f2eef7` |
| accent | `#7a3e9d` violet | `#c9a0e8` lilac |
| `primary` / `on-primary` | inverts between themes, so the primary action is always the highest-contrast element |

Rail and divider lines use `--rail-line` and `--rail-edge` (darker, the two column borders).

## Type

| Role | Face | Variable |
| --- | --- | --- |
| Display (titles, statements) | Cormorant Garamond | `--font-display` |
| Body and UI | Inter | `--font-body` |
| Labels, code, data | Geist Mono | `--font-mono` |
| Handwriting (signature, eyebrows) | Caveat | `--font-script` |

Minimum text size on phones: 11px (chart axis labels excepted).

## Layout

- Content column: `--rail` = 0.75rem (phones), 8vw (tablet), 20vw (desktop ≥ 1100px), giving a 60 / 40 split on desktop.
- Sections are transparent so the hero sky can run into them; dashed rules divide sections edge to edge.

## Motion

- Signature curve `cubic-bezier(0.16, 1, 0.3, 1)`.
- Intro: visitor's local time and a greeting, a horizon line, then the screen parts.
- Heroes: mask reveal of title lines, handwritten eyebrow, decode-effect description; all wait for the intro.
- Decode effect (`ScrambleText`): characters written one by one with flickering glyphs ahead of the cursor; on section labels, titles and descriptions when they scroll into view.
- Tech bands: three rows, alternating direction, pause on hover; logos grey → brand colour on hover with the hover sound.
- Everything respects `prefers-reduced-motion`.

## Components

Section pill (mono label in a capsule), index row card (title / meta / date / arrow, sibling dimming on hover), bento card (`rounded-2xl`, hairline border), logo tag (logo + mono label), floating controller (scroll-top, sound, settings), settings panel (opens bottom-centre).
