# What We Do — "QB HUD" Cockpit (`training.html`)

**Date:** 2026-07-15
**Status:** Shipped (`f6890eb`)

## Goal

Replace the stacked-card `training.html` with a **quarterback heads-up
display**: a single cockpit screen where the four XOS services read as
onboard *systems* wired to a central **XOS reticle-core**, powering on in
sequence as the athlete "boots" the page. One idea per screen, in the
Midnight Gold vocabulary (gold neon on black, mono telemetry, saber glow,
grid floor) — no cards.

## Form — the cockpit

Top → bottom, all on a faint 64px perspective-less grid with an edge
vignette:

- **Fixed HUD frame** — bottom-left/right corner brackets (`.hud-corner`)
  with a hot-gold node, plus four `aria-hidden` mono **telemetry readouts**
  in the page corners (`Ready`, `Sys NN/04`, `Launch Bay · Armed`,
  `What We Do · Scroll ↓`) and a center **`+ Target Lock +`** cross that
  scrolls away with the hero.
- **Hero / Radial Rig** (`min-height:100vh`) — eyebrow `SYSTEM ONLINE`,
  glow `What We Do` headline, one-line intro, then the **rig**:
  - Central **core** — concentric rings (one dashed + slow-spinning), a
    reticle crosshair, `CORE / XOS / QB SYSTEMS`, and an expanding
    `core-pulse`.
  - Four **system nodes** at the rig corners: `SYS 01` On-Field 1:1,
    `SYS 02` On-Field Group, `SYS 03` Virtual Coaching, `SYS 04` Video
    Submission. Each has a status badge (`Standby → Online`), an anchor
    dot, heading, and one line of copy.
  - **SVG filaments** curve from each node to the core; once a system is
    online, a small fleet of **data pips** streams continuously down its
    wire into the core.
- **Launch Sequence** panel — `How It Works` / **Launch Sequence** timeline:
  a fill-bar with four numbered **stage nodes** (`01–04`) and step copy
  `Reach Out · Assessment · Train · Compete`. Once filled it stays alive
  with a looping **comet** sweep and breathing lit nodes.
- **Who It's For** panel — `Field Parameters`; two bracketed **readouts**:
  *Target Profile* (Youth → College, all levels) and *Pricing · Config*
  (packages tailored per athlete, contact for pricing).
- **Final CTA** — reticle glyph, `Clear For Launch` / **Start Your
  Development**, HUD button → `contact.html` (Book Training).
- Shared **site header**, **menu drawer** (What We Do = `aria-current`),
  and **footer**.

## Behavior — boot & stream

Driven by an inline IIFE + `IntersectionObserver`:

1. **Filaments** are drawn in JS from each node's `top/left %` to the core
   as quadratic curves (rebuilt on resize; skipped ≤760px).
2. When the rig enters view, systems **power on in sequence**
   (`500 + i*650ms`): badge → Online, anchor lights, filament goes live,
   and the top-right telemetry counts `Sys 00→04/04 · Lock`.
3. **Pips** ride each live filament node→core on a shared rAF loop
   (`STREAM_PERIOD 1500ms`, 3 per line, phase-staggered), fading in off the
   node and swelling into the core.
4. When the Launch panel enters view, the fill bar sweeps to 100%, stage
   nodes/steps light `300 + i*400ms`, then the comet loop **arms**.

## Responsive

- **≤760px** — the rig collapses to a **wired vertical column** down a left
  spine (`.spine-v`); filaments and core-pulse hidden. Fixed corner
  telemetry text + center cross are **hidden** so they never overlap
  centered content on scroll (corner brackets stay). Section padding
  tightened; readouts and steps stack to one column.
- **≤480px** — display type shrinks (`h1`, `.xos`, section headings) and
  padding tightens further.

## Accessibility / Motion

- All HUD telemetry, filaments, cross, and rig are `aria-hidden` — the page
  reads as a normal heading/section/list document to assistive tech.
- **`prefers-reduced-motion: reduce`** — every animation/transition off;
  end-state shown static: all four systems Online, filaments drawn, pips
  parked along the wires, launch bar full, all stage nodes/steps lit.
- No frameworks or third-party JS/CSS; Google Fonts links only. Page-scoped
  CSS lives in `training.html`'s `<style>`; shared behavior in `js/main.js`.

## Copy reference

| System | Heading | Line |
|---|---|---|
| SYS 01 | On-Field Coaching · 1:1 | Private sessions built around the athlete — footwork, throwing motion, reads. |
| SYS 02 | On-Field Coaching · Group | Competitive reps with other QBs — camps and clinics. |
| SYS 03 | Virtual Coaching | Remote development and check-ins — train from anywhere. |
| SYS 04 | Video Submission | Send film; get a detailed breakdown and a plan. |

| Stage | Title | Line |
|---|---|---|
| 01 | Reach Out | Make contact and tell us about the athlete. |
| 02 | Assessment | Evaluate mechanics, reads, and goals. |
| 03 | Train | Build the plan and put in the reps. |
| 04 | Compete | Take it to the field and perform. |

See `docs/superpowers/specs/2026-07-14-midnight-gold-cinematic-design.md`
for the shared design system.
