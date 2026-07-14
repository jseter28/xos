# CLAUDE.md — XOS Coaching

## Project Overview

XOS Coaching is a quarterback-training marketing site. It is a plain static
HTML/CSS/JS site — **no build step, no framework, no package manager**. It
deploys directly to GitHub Pages (a `CNAME` file is present at the repo root).

Local development:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Pages: `index.html` (cinematic landing page), `about.html`, `training.html`,
`players.html`, `contact.html`. Shared styles live in `css/styles.css`;
shared behavior (menu, lightbox, contact form) in `js/main.js`; the landing
page's scroll/canvas behavior lives in `js/cinematic.js`.

## Design System — "Midnight Gold"

Gold neon on deep navy, Tron-cinematic. Reference: Fort Energy
(https://mont-fort.com/fort-energy/) — full-screen scroll chapters, one idea
per screen, glowing wireframe scenes on a grid, sparse floating text.

### Palette tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#04070f` | base background |
| `--bg-mid` | `#0a1222` | mid background |
| `--bg-warm` | `#12203a` | warm background |
| `--panel` | `rgba(18,32,58,0.45)` | glass panel fill |
| `--hairline` | `rgba(245,193,93,0.22)` | 1px borders/dividers |
| `--gold` | `#c9a24b` | primary accent |
| `--hot` | `#f5c15d` | hot gold accent |
| `--core` | `#ffe9c4` | white-hot core (glow/saber center) |
| headline | `#fdfbf5` | display text |
| body text | `#e9edf4` | body copy |
| muted | `#8fa0b8` | secondary/muted text |

### Type system

- **Josefin Sans** — display headlines, glow-treated. Weight **700**
  (the heaviest weight Google Fonts serves for this family — there is no 900),
  `uppercase`, `letter-spacing: 0.2em`, `line-height: 1.1`.
- **Quicksand** — body copy. Base weight **300**, `line-height: 1.7`.
  Tops out at 700 — never specify 800.
- **JetBrains Mono** — labels, buttons, tags: small, uppercase, 0.2–0.5em
  letter-tracking.

Display sizes are tuned for Josefin's wide, airy metrics at 0.2em tracking.
If you swap the display face, re-check every `clamp()` on a display element —
a condensed face would leave them undersized, a wider one will overflow.

### Signature effects

- **Glow text**: `text-shadow: 0 0 14px rgba(245,193,93,.6), 0 0 34px rgba(201,162,75,.45)`
- **Saber lines**: 1px lines with a `--core` center and gold halo shadow,
  used as dividers/underlines (`.saber`, `saber-ignite` keyframe).
- **Grid floors**: CSS perspective grid used as a scene floor under hero/CTA
  content.
- **Duotone photos**: `grayscale(1) brightness(.5) contrast(1.15) sepia(.5)
  saturate(1.4) hue-rotate(170deg)` — blue-night treatment on photography.
- **Dossier cards**: glassy hairline-gold panels with mono `FILE.NN`
  corner tags, used for player/coach profiles.

`index.html` is a full-screen scroll-chapter cinematic (8 chapters, each
`min-height: 100vh`, content revealed via `IntersectionObserver` on scroll
arrival, plus a canvas light-beam effect in the opening chapter). Interior
pages (`about.html`, `training.html`, `players.html`, `contact.html`) are
conventional top-to-bottom flow pages that share the same theme, type
system, and effect classes, but are not chapter-based.

See `docs/superpowers/specs/2026-07-14-midnight-gold-cinematic-design.md`
for the full design spec.

## Workflow

All planning and review happens in the main session (Fable). All code
execution is delegated to subagents — `model: opus` for substantive edits,
`model: sonnet` for mechanical edits. The main session verifies results.

## Accessibility / Performance Constraints

- All animation (chapter reveals, canvas beams, saber-ignite, etc.) must be
  gated behind `prefers-reduced-motion: reduce` — when set, the page must be
  fully readable and static, with no motion.
- No frameworks or third-party JS/CSS dependencies. Vanilla HTML/CSS/JS
  only (Google Fonts links are the one external dependency).
