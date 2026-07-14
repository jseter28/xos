# Midnight Gold — Cinematic Design Spec

Date: 2026-07-14

## Context

XOS Coaching (`~/Desktop/xos`, static HTML/CSS/JS, GitHub Pages via CNAME)
had a generic sections-and-cards layout. Through brainstorming (visual
mockups reviewed and approved by the user), the site converges on a full
redesign:

- **Reference**: https://mont-fort.com/fort-energy/ — scroll-driven
  cinematic: full-screen chapters, one idea per screen, glowing wireframe
  scenes on a Tron grid, sparse floating text, then a contrasting light
  footer.
- **Approved storyboard**: mockups in
  `.superpowers/brainstorm/13694-1784041149/content/storyboard-cinematic.html`
  — treat as the visual spec, especially `fullpage-midnight-gold.html` and
  `storyboard-cinematic.html`.
- **Tech constraint**: no frameworks, no build step (GitHub Pages). Vanilla
  JS + one canvas. All animation behind `prefers-reduced-motion` guards.

## Palette — "Midnight Gold" (gold neon on black)

The background ramp was originally deep navy; it is now neutral black. The three
`bg*` steps keep their relative luminance, so the depth gradients still read —
they fade through greys instead of blue.

| Token | Value |
|---|---|
| bg | `#000000` |
| bg-mid | `#0c0c0e` |
| bg-warm | `#17171b` |
| panel | `rgba(28,28,32,0.45)` |
| hairline | `rgba(245,193,93,0.22)` |
| gold | `#c9a24b` |
| hot gold | `#f5c15d` |
| white-hot core | `#ffe9c4` |
| headline | `#fdfbf5` |
| text | `#e9edf4` |
| muted | `#8fa0b8` |

## Type system

- **Anton** — display, glow-treated.
- **Inter** — body (add weight 300).
- **JetBrains Mono** (new) — labels/buttons/tags, tiny, uppercase,
  0.2–0.5em tracking.

## Signature effects (CSS snippets)

```css
/* white-hot text glow */
.glow-text {
  color: var(--core);
  text-shadow:
    0 0 14px rgba(245, 193, 93, 0.6),
    0 0 34px rgba(201, 162, 75, 0.45);
}

/* 1px "lightsaber" line — core + gold halo */
.saber {
  height: 1px;
  background: var(--core);
  box-shadow:
    0 0 6px 1px rgba(255, 233, 196, 0.9),
    0 0 18px 4px rgba(201, 162, 75, 0.5);
}
@keyframes saber-ignite {
  from { transform: scaleX(0); opacity: 0; }
  to   { transform: scaleX(1); opacity: 1; }
}

/* perspective grid floor */
.grid-floor {
  background-image:
    linear-gradient(rgba(245,193,93,.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245,193,93,.18) 1px, transparent 1px);
  background-size: 60px 60px;
  transform: perspective(500px) rotateX(60deg);
  mask-image: linear-gradient(to top, black, transparent);
}

/* blue-night duotone photo treatment */
.duotone {
  filter: grayscale(1) brightness(.5) contrast(1.15)
          sepia(.5) saturate(1.4) hue-rotate(170deg);
}

/* glassy hairline-gold surface */
.panel {
  background: var(--panel);
  border: 1px solid var(--hairline);
  backdrop-filter: blur(6px);
}

/* reduced motion: kill all animation/transitions */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

Dossier cards use a mono `FILE.NN` corner tag over a duotone photo
background, with a gold mono tag (e.g. `QB · CLASS OF '27`) beneath the name.

## index.html — 8-chapter structure

Full-screen scroll chapters (`min-height: 100vh`), content fades/rises in on
arrival via `IntersectionObserver`.

| Chapter | Content |
|---|---|
| CH0 Arrival | Night sky + CSS stars, stadium-silhouette horizon with glowing 1px horizon line, canvas rising gold light-beams behind the horizon, perspective grid floor below. Centered XOS wordmark (Anton, 0.42em tracking, white-hot glow) + "QUARTERBACK DEVELOPMENT" mono sub. Bottom-left "SCROLL DOWN TO DISCOVER" cue. Minimal fixed header (logo + round menu toggle, gold-on-black). |
| CH1 Statement | One huge Anton headline alone: "Developing QBs who win **Friday nights** and reach the next level." — "Friday nights" in hot gold. |
| CH2 The System | Glowing SVG play diagram (O-line, QB, 3 route trees) that draws itself on scroll-arrival (`stroke-dashoffset` animation) on a faint grid background. Copy block floats right: 100+ NFL & college QBs coached. |
| CH3 The Advantage | "The XOS Advantage" + three floating text columns (On-Field 1:1 / On-Field Group / Virtual Coaching) — no cards, no boxes. |
| CH4 The Coaches | Left 55%: duotone blue-night photo with scanline overlay, masked fade to right. Right: "Built by players who've been there" + Rafe Peavey (Former Arkansas QB), Kolt Peavey (QB Coach) as dossier entries. |
| CH5 The Roster | "Players We've Developed" + dossier cards (`FILE.01` mono corner tag, name, "QB · Class of '27" gold mono tag) using player photos as duotone card backgrounds. Ghost button → players.html. |
| CH6 The Ask | Centered "Ready to Train?" glow headline, saber line, solid gold CTA → contact.html. Stars behind. |
| CH7 Footer | Light footer (`#f4f3f0`, dark text) — deliberate contrast: mono nav links, XOS brand row, © line. |

Interior pages (`about.html`, `training.html`, `players.html`,
`contact.html`) keep conventional flow layouts but share the same theme
classes, fonts, and effects (page-banner gets stars + saber; player cards
become dossier style; final CTA bands become dark glass with glow).
