# XOS Hero Wordmark Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Later change (font) — 2026-07-14:** this plan was executed with Archivo Black, then the mark was reworked to **Bruno Ace** (wide, geometric, broken-joint; white X/O + gold S) with the reveal skeletons re-cut for the new shapes. The saber-trace architecture is unchanged; the font references below are the original build record.

**Goal:** Replace the hero's three-layer neon-tube XOS with solid Archivo Black letterforms that are revealed by an animated saber-trace mask, preserving the existing ignition motion.

**Architecture:** The saber becomes the reveal *mask*, not the letter. Three static filled glyph paths (Archivo Black outlines, embedded — no webfont) sit under three **per-glyph** SVG masks. Each mask holds a thick white stroke tracing that glyph's centerline, animated with the existing `stroke-dashoffset: 1 → 0` draw-on. As the stroke draws, it uncovers the solid letter behind it. A white-hot tip rides the leading edge of each trace. A gold `drop-shadow` bloom sits behind the whole mark.

**Tech Stack:** Vanilla HTML + CSS + SVG. No JS changes. No new network requests.

## Global Constraints

- **No new dependencies.** No webfont is loaded for this mark — Archivo Black ships as embedded outline path data only. No new `<link>`, no third-party JS/CSS. (Archivo Black is OFL; embedding outlines is permitted.)
- **All motion gated behind `prefers-reduced-motion: reduce`.** When set, the mark must be static, complete, and readable — no trace, no tip, no flash.
- **Every letter is exactly one flat color.** White `--core` for X and O; a gold gradient for S. No white core inside a gold ring, ever. No stroke of any color may be visible on a finished letter.
- **Existing palette tokens only:** `--core` (`#ffe9c4`), `--gold` (`#c9a24b`), `--hot` (`#f5c15d`), `--head` (`#fdfbf5`). Do not introduce new color literals.
- **Per-glyph masks are mandatory.** Each glyph gets its own `<mask>`. This is what makes overweight mask strokes safe — an overweight stroke can never spill into a neighboring letter, because it is only ever applied to its own glyph.
- The mark keeps `role="img" aria-label="XOS"` on `.arrival-logo`.

## Reference Geometry (measured, do not re-derive)

All coordinates are in the mark's viewBox space: **`viewBox="0 -12 2773 712"`**.

Derived from Archivo Black (1000 upm, capHeight 688) with letters placed at
cursors 0 / 998 / 2051 and 220 units of tracking between them. y = 0 is the cap
line, y = 688 is the baseline; the O and S overshoot to -12 and 700.

**Mask stroke widths — these are verified, not estimates.** Each was checked by
rasterizing the glyph and the stroke and counting glyph pixels the stroke fails to
cover. Coverage is 100.000% (zero uncovered pixels) at these widths:

| Glyph | Stroke width | Minimum that still gives full coverage |
|---|---|---|
| X | **250** | 235 |
| O | **270** | 260 |
| S | **300** | 280 |

The widths above carry a deliberate safety margin over the minimum. **Do not reduce
them.** Sizing a mask stroke to the glyph's stem weight — what the current tube
implementation does — is exactly the mistake that produces bald patches.

Mask strokes intentionally overshoot the glyph (past terminals, outside the O's
outer curve, into the O's counter). **This is harmless and expected:** the mask only
reveals where the glyph is actually painted, and per-glyph masking prevents any
spill into a neighbor.

---

## File Structure

- **Modify:** `index.html` — lines 32–72, the `.arrival-logo` block. The entire
  `<svg class="xos-mark">` element is replaced.
- **Modify:** `css/styles.css` — lines 296–321, the `--- XOS lightsaber-ignition
  wordmark ---` block. Replaced in full.

No files are created. No other page carries this mark.

---

### Task 1: Solid letterforms (static, no animation)

Get the correct letterforms on screen first. If the shapes are wrong, no amount of
animation work matters. This task ends with a static, solid, correctly-colored XOS.

**Files:**
- Modify: `index.html:32-72`
- Modify: `css/styles.css:296-321`

**Interfaces:**
- Consumes: nothing.
- Produces: `.xos-mark` (root `<svg>`), `.xos-glyph` (the three filled paths),
  `#xos-s-gold` (the S's gradient). Tasks 2–4 attach to these exact names.

- [ ] **Step 1: Replace the SVG markup in `index.html`**

Replace the whole `<svg class="xos-mark">...</svg>` element (currently lines 33–71,
inside `<div class="arrival-logo">`) with this. Keep the surrounding
`<div class="arrival-logo" role="img" aria-label="XOS">` exactly as it is.

```html
          <svg class="xos-mark" viewBox="0 -12 2773 712" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="xos-s-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="var(--core)"/>
                <stop offset=".45" stop-color="var(--hot)"/>
                <stop offset="1" stop-color="var(--gold)"/>
              </linearGradient>
            </defs>

            <!-- Archivo Black outlines, embedded. evenodd so the O's counter is a
                 hole regardless of contour winding. -->
            <g class="xos-glyphs" fill-rule="evenodd">
              <path class="xos-glyph" fill="var(--core)" d="M778 688H510L383 474H379L252 688H4L250 324L28 0H295L399 176H403L508 0H755L532 325Z"/>
              <path class="xos-glyph" fill="var(--core)" d="M1786 344Q1786 518 1689 609Q1592 700 1414 700Q1236 700 1139.5 609.5Q1043 519 1043 344Q1043 169 1139.5 78.5Q1236 -12 1414 -12Q1592 -12 1689 79Q1786 170 1786 344ZM1269 312V376Q1269 449 1306 492Q1343 535 1414 535Q1485 535 1522.5 492Q1560 449 1560 376V312Q1560 239 1522.5 196Q1485 153 1414 153Q1343 153 1306 196Q1269 239 1269 312Z"/>
              <path class="xos-glyph" fill="url(#xos-s-gold)" d="M2718 200V212H2511V208Q2511 178 2489 158Q2467 138 2422 138Q2378 138 2354.5 151Q2331 164 2331 183Q2331 210 2363 223Q2395 236 2466 250Q2549 267 2602.5 285.5Q2656 304 2696 346Q2736 388 2737 460Q2737 582 2654.5 641Q2572 700 2434 700Q2273 700 2183.5 646Q2094 592 2094 455H2303Q2303 507 2330 524.5Q2357 542 2414 542Q2456 542 2483.5 533Q2511 524 2511 496Q2511 471 2480.5 458.5Q2450 446 2381 432Q2297 414 2242 394.5Q2187 375 2146 330Q2105 285 2105 208Q2105 95 2192.5 41.5Q2280 -12 2414 -12Q2546 -12 2631 41.5Q2716 95 2718 200Z"/>
            </g>
          </svg>
```

- [ ] **Step 2: Replace the CSS block in `css/styles.css`**

Delete the entire existing block from the `/* --- XOS lightsaber-ignition wordmark --- */`
comment through the `@keyframes xos-flash` rule (lines 296–321), including the
`.xos-mark path`, `.xos-halo`, `.xos-mid`, `.xos-core`, `xos-draw` and `xos-flash`
rules. The tube is gone; none of it is reused. Replace with:

```css
/* --- XOS wordmark: solid Archivo Black outlines, saber-trace reveal --- */
/* The saber is the MASK, not the letter. Glyphs are flat fills; an animated
   stroke uncovers them. Mask strokes are deliberately OVERWEIGHT (wider than
   the stem) and overshoot the glyph — that is safe because each glyph has its
   own mask, so a stroke can never spill into a neighbour. Sizing them to the
   stem is what produced the old white-core-in-gold-ring tube. */
.xos-mark{
  width:clamp(16rem,72vw,46rem);height:auto;display:block;margin:0 auto;
  overflow:visible;
}
.xos-glyph{stroke:none}
```

- [ ] **Step 3: Verify the letterforms render**

The server is already running (`python3 -m http.server 8000`). If not, start it.

Load `http://localhost:8000/` and look at the hero.

Expected: a solid, heavy **XOS** with wide tracking. X and O are off-white; the S
carries a vertical gold gradient (near-white at the top, gold at the bottom). The
O's counter is an open hole, clearly legible — **not** a filled disc. No glow, no
outline, no tube. Nothing is animated yet.

If the O renders as a solid blob, `fill-rule="evenodd"` is missing or misplaced.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "Replace XOS neon tube with solid Archivo Black letterforms"
```

---

### Task 2: Saber-trace reveal mask

Now restore the ignition. This is the load-bearing task: a mask that doesn't fully
cover its glyph leaves permanent bald patches in the finished mark.

**Files:**
- Modify: `index.html` (the `.xos-mark` `<defs>` and glyph group)
- Modify: `css/styles.css` (`.xos-mark` block)

**Interfaces:**
- Consumes: `.xos-mark`, `.xos-glyph`, `.xos-glyphs` from Task 1.
- Produces: `#xos-mask-x`, `#xos-mask-o`, `#xos-mask-s` (the three masks);
  `.xos-trace` (the mask strokes); the `--xd` per-letter delay custom property
  (`.15s` / `.28s` for the X's two diagonals, `.45s` O, `.7s` S); the `xos-draw`
  keyframe. Task 3's tips reuse `--xd` and the same skeleton `d` values.

- [ ] **Step 1: Add the three masks to `<defs>` in `index.html`**

Insert these inside the existing `<defs>`, after the `<linearGradient>`:

```html
              <!-- Reveal masks. White = reveal. One mask PER GLYPH so an
                   overweight stroke can never spill into a neighbouring letter.
                   Widths are verified to give 100% glyph coverage; do not lower
                   them. Skeletons trace each glyph's centreline. -->
              <mask id="xos-mask-x" maskUnits="userSpaceOnUse" x="-200" y="-212" width="3173" height="1112">
                <path class="xos-trace" pathLength="1" style="--xd:.15s" stroke-width="250" d="M121.3 -57.3L684.2 745.3"/>
                <path class="xos-trace" pathLength="1" style="--xd:.28s" stroke-width="250" d="M672.8 -56.5L86.7 744.5"/>
              </mask>
              <mask id="xos-mask-o" maskUnits="userSpaceOnUse" x="-200" y="-212" width="3173" height="1112">
                <path class="xos-trace" pathLength="1" style="--xd:.45s" stroke-width="270" d="M1414.5 70.5A258.5 273.5 0 1 1 1414.5 617.5A258.5 273.5 0 1 1 1414.5 70.5"/>
              </mask>
              <mask id="xos-mask-s" maskUnits="userSpaceOnUse" x="-200" y="-212" width="3173" height="1112">
                <path class="xos-trace" pathLength="1" style="--xd:.7s" stroke-width="300" d="M2614 205C2610 40 2500 20 2410 25C2300 30 2215 105 2218 190C2225 265 2330 290 2430 330C2540 372 2618 405 2618 495C2618 585 2520 660 2415 655C2310 650 2205 590 2198 487"/>
              </mask>
```

- [ ] **Step 2: Attach each mask to its own glyph in `index.html`**

Change the three `<path class="xos-glyph">` elements to each carry a `mask`
attribute. Only the `mask="..."` attribute is added; the `d` and `fill` values are
unchanged from Task 1.

```html
              <path class="xos-glyph" mask="url(#xos-mask-x)" fill="var(--core)" d="M778 688H510L383 474H379L252 688H4L250 324L28 0H295L399 176H403L508 0H755L532 325Z"/>
              <path class="xos-glyph" mask="url(#xos-mask-o)" fill="var(--core)" d="M1786 344Q1786 518 1689 609Q1592 700 1414 700Q1236 700 1139.5 609.5Q1043 519 1043 344Q1043 169 1139.5 78.5Q1236 -12 1414 -12Q1592 -12 1689 79Q1786 170 1786 344ZM1269 312V376Q1269 449 1306 492Q1343 535 1414 535Q1485 535 1522.5 492Q1560 449 1560 376V312Q1560 239 1522.5 196Q1485 153 1414 153Q1343 153 1306 196Q1269 239 1269 312Z"/>
              <path class="xos-glyph" mask="url(#xos-mask-s)" fill="url(#xos-s-gold)" d="M2718 200V212H2511V208Q2511 178 2489 158Q2467 138 2422 138Q2378 138 2354.5 151Q2331 164 2331 183Q2331 210 2363 223Q2395 236 2466 250Q2549 267 2602.5 285.5Q2656 304 2696 346Q2736 388 2737 460Q2737 582 2654.5 641Q2572 700 2434 700Q2273 700 2183.5 646Q2094 592 2094 455H2303Q2303 507 2330 524.5Q2357 542 2414 542Q2456 542 2483.5 533Q2511 524 2511 496Q2511 471 2480.5 458.5Q2450 446 2381 432Q2297 414 2242 394.5Q2187 375 2146 330Q2105 285 2105 208Q2105 95 2192.5 41.5Q2280 -12 2414 -12Q2546 -12 2631 41.5Q2716 95 2718 200Z"/>
```

- [ ] **Step 3: Add the trace animation CSS**

Append to the `.xos-mark` block in `css/styles.css`:

```css
/* Mask strokes: white reveals the glyph beneath. stroke-width is set per-path
   in the markup (X 250 / O 270 / S 300) — verified for 100% coverage. */
.xos-trace{
  fill:none;stroke:#fff;
  stroke-linecap:round;stroke-linejoin:round;
  stroke-dasharray:1;stroke-dashoffset:1;
  animation:xos-draw .62s cubic-bezier(.2,.8,.2,1) var(--xd,0s) both;
}
@keyframes xos-draw{to{stroke-dashoffset:0}}
```

- [ ] **Step 4: Verify the ignition, then prove there are no bald patches**

Reload `http://localhost:8000/`. Expected: each letter is wiped into existence
along its own centreline — the X's two diagonals in sequence, then the O sweeping
round, then the S. Letters stay flat and solid as they appear. No tube, no ring.

The final state is what matters most, and eyeballing it is not sufficient — a
single-pixel bald seam along the S's spine is easy to miss and impossible to unsee
once shipped. Run this in the browser console **after the animation has finished**.
It compares the masked mark against an unmasked copy and counts glyph pixels the
mask failed to reveal:

```js
(async () => {
  const svg = document.querySelector('.xos-mark');
  const W = 1400, H = 360;
  const render = (markup) => new Promise(res => {
    const blob = new Blob([markup], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = W; c.height = H;
      const g = c.getContext('2d');
      g.drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(url);
      res(g.getImageData(0, 0, W, H).data);
    };
    img.src = url;
  });
  // resolve the CSS vars the SVG references, since a detached blob has no page styles
  const cs = getComputedStyle(document.documentElement);
  const sub = s => s.replace(/var\(--core\)/g, cs.getPropertyValue('--core').trim() || '#ffe9c4')
                    .replace(/var\(--hot\)/g,  cs.getPropertyValue('--hot').trim()  || '#f5c15d')
                    .replace(/var\(--gold\)/g, cs.getPropertyValue('--gold').trim() || '#c9a24b');
  const masked   = sub(svg.outerHTML);
  const unmasked = sub(svg.outerHTML).replace(/mask="url\(#xos-mask-[xos]\)"/g, '');
  const [A, B] = [await render(masked), await render(unmasked)];
  let glyph = 0, bald = 0;
  for (let i = 3; i < B.length; i += 4) {
    if (B[i] > 128) { glyph++; if (A[i] <= 128) bald++; }
  }
  console.log(`glyph px: ${glyph}  BALD px: ${bald}  (${(100*bald/glyph).toFixed(3)}%)`);
  console.log(bald === 0 ? '✅ PASS — full coverage' : '❌ FAIL — mask leaves bald patches');
})();
```

Expected: `BALD px: 0` and `✅ PASS`. **A non-zero bald count is a hard failure** —
increase the offending glyph's `stroke-width` (X→265, O→290, S→320) and re-run.
Do not proceed to Task 3 until this passes.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css
git commit -m "Reveal XOS glyphs with per-glyph saber-trace masks"
```

---

### Task 3: White-hot leading tip

**Files:**
- Modify: `index.html` (add a tip layer to `.xos-mark`)
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `--xd` delays and the skeleton `d` values from Task 2.
- Produces: `.xos-tips`, `.xos-tip`; the `xos-tip-travel` and `xos-tip-out`
  keyframes.

Each tip is a small white-hot circle riding the leading edge of its trace. It uses
`offset-path` with **the same `d` value** as its trace and the **same duration,
easing, and `--xd` delay** — that is what keeps the tip pinned to the front of the
reveal. If you change a skeleton, you must change it in both places.

- [ ] **Step 1: Add the tip layer to `index.html`**

Insert immediately after the closing `</g>` of `.xos-glyphs`, before `</svg>`:

```html
            <!-- Hot tips: ride the leading edge of each trace. Same d, same
                 timing, same --xd as the matching .xos-trace above. -->
            <g class="xos-tips" aria-hidden="true">
              <circle class="xos-tip" r="26" style="--xd:.15s;offset-path:path('M121.3 -57.3L684.2 745.3')"/>
              <circle class="xos-tip" r="26" style="--xd:.28s;offset-path:path('M672.8 -56.5L86.7 744.5')"/>
              <circle class="xos-tip" r="26" style="--xd:.45s;offset-path:path('M1414.5 70.5A258.5 273.5 0 1 1 1414.5 617.5A258.5 273.5 0 1 1 1414.5 70.5')"/>
              <circle class="xos-tip" r="26" style="--xd:.7s;offset-path:path('M2614 205C2610 40 2500 20 2410 25C2300 30 2215 105 2218 190C2225 265 2330 290 2430 330C2540 372 2618 405 2618 495C2618 585 2520 660 2415 655C2310 650 2205 590 2198 487')"/>
            </g>
```

- [ ] **Step 2: Add the tip CSS**

Append to the `.xos-mark` block in `css/styles.css`:

```css
/* The only part of the saber visible on top of the letters. Travels the same
   skeleton, on the same clock, as its .xos-trace — so it sits exactly at the
   leading edge of the reveal, then flares out as the letter completes. */
.xos-tip{
  fill:var(--head);
  filter:drop-shadow(0 0 18px var(--core)) drop-shadow(0 0 40px var(--hot));
  offset-distance:0%;opacity:0;
  animation:
    xos-tip-travel .62s cubic-bezier(.2,.8,.2,1) var(--xd,0s) both,
    xos-tip-out .3s ease-out calc(var(--xd,0s) + .5s) both;
}
@keyframes xos-tip-travel{to{offset-distance:100%}}
@keyframes xos-tip-out{0%{opacity:1;r:26}60%{opacity:1;r:34}100%{opacity:0;r:10}}
```

- [ ] **Step 3: Verify the tip tracks the reveal**

Reload. Expected: a bright white-hot point leads each letter's reveal, travelling
exactly at the boundary between revealed and unrevealed, then flaring and fading as
that letter completes. No gold tube trails behind it.

If a tip runs ahead of or behind its reveal, its `offset-path` `d`, duration,
easing, or `--xd` does not match its trace. They must be identical.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "Add white-hot leading tip to XOS saber reveal"
```

---

### Task 4: Gold bloom, reduced-motion gate, and responsive check

**Files:**
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: everything from Tasks 1–3.
- Produces: final `.xos-mark` styles. Nothing downstream.

- [ ] **Step 1: Add the bloom**

The bloom is a `drop-shadow` on the root `<svg>` — it sits *behind* the mark. It is
a shadow, not a stroke, so it never puts colour inside a letter. Add to `.xos-mark`
in `css/styles.css`:

```css
.xos-mark{
  filter:drop-shadow(0 0 22px rgba(245,193,93,.38)) drop-shadow(0 0 60px rgba(201,162,75,.28));
}
```

- [ ] **Step 2: Add the reduced-motion gate**

Required by `CLAUDE.md`. With reduced motion, the traces are fully drawn with no
animation, and the tips never appear.

```css
@media(prefers-reduced-motion:reduce){
  .xos-trace{animation:none;stroke-dashoffset:0}
  .xos-tip{animation:none;display:none}
}
```

- [ ] **Step 3: Verify reduced motion**

In Chrome DevTools: Rendering panel → *Emulate CSS media feature
prefers-reduced-motion* → `reduce`. Reload.

Expected: the complete solid XOS is simply present on load. No trace, no travelling
tip, no flash. The mark is fully readable and completely static. **The letters must
be complete** — if reduced motion reveals bald patches, the mask strokes are
undersized and Task 2's coverage check was not actually passing.

- [ ] **Step 4: Verify across viewports**

Check the hero at widths **390px, 768px, 1280px, and 1920px**.

Expected at every width: the mark stays centred and horizontally contained (the
`clamp(16rem,72vw,46rem)` width is inherited from the old mark and is unchanged);
the bloom is not clipped (`overflow:visible` on `.xos-mark` guarantees this); the
O's counter stays open and legible even at 390px.

- [ ] **Step 5: Confirm no dead CSS or new requests remain**

```bash
grep -n "xos-halo\|xos-mid\|xos-core\|xos-flash\|xos-letter" css/styles.css index.html
```

Expected: **no output.** Every one of these belonged to the deleted neon tube. Any
hit is dead code — remove it.

```bash
grep -rn "Archivo\|fonts.googleapis" index.html
```

Expected: only the pre-existing Josefin/Quicksand/JetBrains Mono `<link>`. **No
Archivo font request** — the mark ships as outlines. A hit for `Archivo` here means
someone added a font load, which violates the design.

- [ ] **Step 6: Commit**

```bash
git add css/styles.css
git commit -m "Add gold bloom and reduced-motion gate to XOS wordmark"
```

---

## Definition of Done

Maps 1:1 to the spec's success criteria.

1. Each letter renders as exactly **one** flat colour — no white core inside a gold ring anywhere, at any point after the reveal completes.
2. The finished mark reads as heavy, solid, typographic letterforms comparable in weight to the reference image.
3. The O's counter is open and legible at every viewport width.
4. The ignition motion is preserved — per-letter stagger, draw-on direction, comparable timing.
5. A white-hot tip is visible riding the leading edge of each letter's reveal.
6. **Task 2 Step 4's coverage check reports `BALD px: 0`.** No bald patches.
7. With `prefers-reduced-motion: reduce`, the mark is static, complete, and readable.
8. No new network requests: no Archivo webfont, no third-party asset.
