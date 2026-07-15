# XOS Menu — Cinematic Dossier Drawer (Saber + Frost)

**Date:** 2026-07-15
**Status:** Approved for implementation

## Goal

Replace the plain full-screen navigation overlay with an intentional,
on-theme **right-side drawer** that speaks the Midnight Gold vocabulary
(saber lines, grid floor, mono numbering, glow) and is revealed with a
combined **Saber-unsheath + Frost-dissolve** animation.

## Form — the drawer

A fixed, full-height panel anchored to the right edge:

- Width `min(430px, 88vw)`; gold hairline left border; layered dark fill.
- **Backdrop** behind the panel: dims + frosts the page (frost dissolve).
- **Contents**, top → bottom:
  - Circular **close button** top-right, matching the header `.menu-toggle`
    (currently a bare `✕` — this unifies it).
  - Mono **eyebrow** `MENU / NAVIGATION`.
  - **Saber divider** (1px, `--core` core + gold halo) that ignites on open.
  - **Numbered nav**, five entries: `00 HOME · 01 WHO WE ARE ·
    02 WHAT WE DO · 03 PLAYERS · 04 CONTACT`. Each = mono index digit
    (`--gold`) + Josefin label. Hover/focus → label glows + a short saber
    underline sweeps in from the number. Current page carries
    `aria-current="page"` and is pre-lit (gold + glow).
  - Mono **footer** line `KOLT & RAFE PEAVEY · @XOSCOACHING`.
  - Ambient depth: low-opacity `XOS` watermark + perspective grid floor at
    the base, both `aria-hidden`, `z-index:-1`.

## Reveal — Saber + Frost

On open (`.site-menu.open`):

1. **Backdrop frosts in** — `backdrop-filter` blur `0 → ~9px` with opacity,
   over ~.6s.
2. **Panel unsheathes** — a `--core` saber line ignites down the panel's
   left edge, then the panel reveals left→right via `clip-path:
   inset(0 0 0 100%) → inset(0 0 0 0)`.
3. **Nav items stagger** up (opacity + translateY) with per-item delay.

Close reverses to a plain opacity fade.

## Structure (markup)

Single dialog element preserved for focus-trap / `aria-modal`:

```html
<div class="site-menu" id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu">
  <div class="menu-backdrop"></div>
  <div class="menu-panel">
    <button class="menu-toggle menu-close" aria-label="Close menu">✕</button>
    <div class="menu-eyebrow">Menu / Navigation</div>
    <div class="saber menu-saber"></div>
    <nav>
      <a href="index.html"><span class="mnum">00</span><span class="mlabel">Home</span></a>
      <a href="about.html"><span class="mnum">01</span><span class="mlabel">Who We Are</span></a>
      <a href="training.html"><span class="mnum">02</span><span class="mlabel">What We Do</span></a>
      <a href="players.html"><span class="mnum">03</span><span class="mlabel">Players</span></a>
      <a href="contact.html"><span class="mnum">04</span><span class="mlabel">Contact</span></a>
    </nav>
    <div class="menu-foot">KOLT &amp; RAFE PEAVEY · @XOSCOACHING</div>
    <span class="menu-watermark" aria-hidden="true">XOS</span>
    <div class="menu-grid grid-floor" aria-hidden="true"></div>
  </div>
</div>
```

`aria-current="page"` is set on the link for the current page (Home link on
`index.html`, etc.). The `menu-saber` reuses the existing `.saber` /
`saber-ignite` machinery.

## Behavior (JS)

`initMenu()` stays intact (open/close/Esc/focus-trap/`overflow:hidden`).
Add one line: clicking `.menu-backdrop` closes the menu (same `shut()`).
Panel/backdrop reveal is pure CSS keyed off `.site-menu.open`.

## Constraints

- **Reduced motion:** the existing global `@media (prefers-reduced-motion:
  reduce)` kills all animation/transition. The drawer's *base open state*
  must therefore be fully visible without animation: no `clip-path`/`mask`
  on the base rule (reveal lives only in keyframes), panel/backdrop shown
  via opacity+visibility, saber divider forced to `scaleX(1)` (already
  handled by the existing `.saber` override), backdrop retains its dim fill.
  Result: menu appears instantly, static, fully readable.
- **`backdrop-filter` fallback:** the backdrop keeps a solid
  `rgba(0,0,0,.55)` base fill so browsers without `backdrop-filter` show a
  clean dimmed overlay instead of blur.
- No new dependencies; reuses saber/grid/glow tokens and inline vocabulary.

## Files touched

- `css/styles.css` — rework the `HEADER + FULL-SCREEN MENU` block into the
  drawer + reveal keyframes.
- `index.html`, `about.html`, `training.html`, `players.html`,
  `contact.html` — replace the `.site-menu` markup (identical except
  `aria-current`), adding the Home entry, numbers, backdrop, panel,
  watermark, grid.
- `js/main.js` — add backdrop click-to-close in `initMenu()`.
