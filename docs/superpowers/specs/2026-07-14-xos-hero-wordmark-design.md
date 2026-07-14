# XOS Hero Wordmark — Solid Letterforms with Saber-Trace Reveal

**Date:** 2026-07-14
**Status:** Approved design, pending implementation plan
**Scope:** `index.html` (hero `.xos-mark` SVG), `css/styles.css` (`.xos-mark` block)

## Problem

The hero wordmark in chapter 0 (`ch--arrival`) is built as a three-layer stroked
SVG: a gold halo stroke (50u), a hot-gold "lit tube" stroke (30u), and a white-hot
core stroke (16u), all tracing the same skeleton paths. The rendered result is a
neon tube, not a wordmark:

- **Every letter reads as two colors at once** — a white core wrapped in a gold
  ring. This is the "multi-colored letters" the client rejected.
- The stacked strokes make the glyphs **puffy and blobby**. At the current weights
  the O's counter is nearly closed into a solid disc.
- The mark has no typographic presence. It is a light fixture in the shape of
  letters, rather than letters.

The reference (client-supplied poster crop) shows the opposite: heavy, solid,
flat letterforms with generous tracking — white X and O, gold S — with real
typographic weight.

## Goal

Replace the neon tube with **solid, heavy, flat letterforms**, while preserving
the existing lightsaber ignition motion. The motion stays; only what it leaves
behind changes.

## Design Decisions

These were settled with the client during brainstorming:

| Decision | Choice |
|---|---|
| Letter color | Flat fills. White X and O (`--core`), gold gradient S. Each letter is exactly one fill. |
| Letterforms | Heavy face matching the reference (**Archivo Black**). |
| Delivery of letterforms | **Embedded SVG outline paths — no webfont loaded.** |
| Finish | Crisp solid letters + soft gold bloom *behind* the mark. No glow ring or outline inside any letter. |
| Entrance | Lightsaber ignition, preserved. |
| Blade during trace | **Hot tip only** — a white-hot leading point rides the front of the reveal. No gold tube behind it. |
| Gold S timing | The S is revealed already gold. No cool-down beat. |

### Why embedded outlines instead of loading the font

Rendering live `<text>` in Archivo Black would require the font to load before the
reveal mask can align to the glyphs, producing a flash or a broken reveal on slow
connections — the mask geometry and the glyph geometry must agree exactly or the
reveal leaves bald patches.

Embedding the three glyph outlines as `<path>` data removes that race entirely:
no font request, no FOUT, no mask/glyph misalignment. It also *reduces* external
dependencies rather than adding one, satisfying the project's "no third-party
dependencies" constraint outright.

Archivo Black is OFL-licensed; embedding glyph outlines in a static asset is
permitted under the license.

The mark already carries `role="img" aria-label="XOS"`, so converting from
(hypothetical) live text to paths has no accessibility cost.

## Architecture

**The saber becomes the reveal mask, not the letter.**

Today the saber stroke *is* the letter — which is precisely why the letters look
like tubes. Instead, the solid letterform is the thing you see, and an animated
saber stroke acts as an SVG mask that wipes it into existence.

```
<svg class="xos-mark" viewBox="...">
  <defs>
    <mask id="xos-reveal">
      <!-- Thick WHITE strokes tracing each glyph's centerline.
           Animated with the existing stroke-dasharray/dashoffset draw-on.
           White = reveal, black = hide. -->
      <path class="xos-trace" pathLength="1" style="--xd:.15s" d="X skeleton"/>
      <path class="xos-trace" pathLength="1" style="--xd:.4s"  d="O skeleton"/>
      <path class="xos-trace" pathLength="1" style="--xd:.65s" d="S skeleton"/>
    </mask>

    <linearGradient id="xos-s-gold">
      <!-- --gold -> --hot, matching the reference's gradient S -->
    </linearGradient>
  </defs>

  <!-- The letters: solid fills, uncovered by the mask as the saber traces -->
  <g mask="url(#xos-reveal)">
    <path class="xos-glyph" fill="var(--core)"        d="X outline"/>
    <path class="xos-glyph" fill="var(--core)"        d="O outline"/>
    <path class="xos-glyph" fill="url(#xos-s-gold)"   d="S outline"/>
  </g>

  <!-- The hot tips: white-hot points riding the front of each trace -->
  <g class="xos-tips" aria-hidden="true">
    <circle class="xos-tip" style="--xd:.15s"/>  <!-- offset-path: X skeleton -->
    <circle class="xos-tip" style="--xd:.4s"/>   <!-- offset-path: O skeleton -->
    <circle class="xos-tip" style="--xd:.65s"/>  <!-- offset-path: S skeleton -->
  </g>
</svg>
```

### Components

**Glyph layer** — three `<path>` elements holding Archivo Black's X, O, S outlines,
positioned with the reference's wide tracking. X and O fill with `--core`; the S
fills with the gold gradient. This layer is entirely static; it does not animate.
Its only dependency is the mask that clips it.

**Reveal mask** — three thick white strokes tracing the glyph centerlines, animated
with `stroke-dashoffset: 1 → 0` on the existing `xos-draw` keyframe and the existing
per-letter stagger (`--xd: .15s / .4s / .65s`). White reveals, black hides, so as
each stroke draws it uncovers its letter. This layer is invisible; it exists only
to clip the glyph layer.

**Tip layer** — three small white-hot circles with a bright `drop-shadow`, each
animated along its glyph's skeleton via `offset-path` on the same timing as its
trace, so each tip sits exactly at the leading edge of its reveal. Each fades out
as its trace completes. This is the only part of the saber that is visible on top
of the letters.

**Bloom** — a `drop-shadow()` filter on the root `<svg>`, gold, soft, sitting
behind the mark. It replaces the current per-stroke halo. Critically, it is a
shadow, not a stroke: it never puts color inside a letter.

### Data flow

The three layers are coupled by exactly one thing: **the skeleton path data.** The
mask strokes and the tip `offset-path`s must use identical `d` values, and those
values must trace the centerlines of the glyph outlines. Everything else about the
layers is independent.

## The Load-Bearing Risk

**The mask stroke must trace each glyph's centerline and be thick enough to cover
the glyph at its widest point.** If it is too thin, or its path deviates from the
centerline, the reveal leaves permanent bald patches in the finished letter.

The skeleton paths currently in `index.html` were drawn against **Josefin Sans**
geometry (the file documents this: stroke widths derived from Josefin's 150/1000upm
stem). They **will not fit Archivo Black** and must be redrawn from the new outlines.

Expected trouble spots:

- **The O** — its outer curve is the farthest point from any centerline, and its
  stroke weight varies around the bowl. A single-width mask stroke may not cover
  the horizontal extremes while still fitting inside the counter.
- **The S** — the spine's inflection is where a centerline trace is easiest to get
  subtly wrong, and Archivo Black's S has heavy terminals that a centerline stroke
  may not reach.
- **The X** — the crossing point double-covers, which is harmless in a mask (white
  over white), but the four terminals are the risk.

**Mitigation:** the mask stroke **must** be deliberately overweight — strictly wider
than the glyph's widest stem — since the stroke is invisible and the glyph outline
itself constrains the final shape. Sizing the mask to the stem weight (as the
current tube implementation does) is exactly the mistake that produces bald patches.
The only upper bound is that an overweight stroke on one letter must not spill into
a neighbor's glyph; the reference's wide tracking gives ample room. Where a single
stroke provably cannot cover a glyph (most likely the S's terminals), that glyph's
skeleton may be a multi-segment path, so long as all segments draw on the same
timing and in a single continuous direction.

**Verification:** the reveal must be inspected frame-by-frame in the browser at
multiple viewport widths. A completed reveal that leaves any part of any glyph
unfilled is a failure, and it will not be caught by looking only at the final state
if the mask happens to fully cover by the end — the mid-trace frames must be checked
too.

## Accessibility

Per `CLAUDE.md`, all motion is gated behind `prefers-reduced-motion: reduce`. When
set:

- The reveal mask is disabled entirely (or the traces are set to
  `stroke-dashoffset: 0` with no animation), so the solid XOS is simply present.
- The tip layer is hidden.
- The bloom is static.

The result must be a fully readable, completely static wordmark. The mark retains
`role="img" aria-label="XOS"`.

## Non-Goals

- `assets/logo.svg` — the circular header/footer icon — is **out of scope** and
  unchanged.
- Interior pages (`about.html`, `training.html`, `players.html`, `contact.html`)
  are unchanged; they do not carry the hero mark.
- No changes to the site's type system. Josefin Sans remains the display face for
  all headlines. Archivo Black appears only as embedded outlines in this one mark
  and is never loaded as a font.
- No grunge/distress texture on the letters (considered and declined).

## Success Criteria

1. Each letter renders as exactly **one** flat color — no white core inside a gold
   ring, anywhere, at any point after the reveal completes.
2. The finished mark reads as heavy, solid, typographic letterforms comparable in
   weight to the reference image.
3. The O's counter is open and clearly legible.
4. The ignition motion — per-letter stagger, draw-on direction, timing — is
   preserved from the current implementation.
5. A white-hot tip is visible riding the leading edge of each letter's reveal.
6. The reveal completes with **no bald patches**: every pixel of every glyph outline
   is uncovered.
7. With `prefers-reduced-motion: reduce`, the mark is static, complete, and readable.
8. No new network requests are added (no webfont, no third-party asset).
