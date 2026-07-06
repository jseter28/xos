# XOS Coaching Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, responsive static marketing website for XOS Coaching that funnels visitors to a booking/contact form.

**Architecture:** Hand-built static site — plain HTML5, one shared CSS stylesheet, and a small vanilla-JS file (menu, lightbox, form UX). Five pages sharing an identical header/footer. No framework, no build step; the folder uploads to any host. Responsive across phone, tablet, and desktop.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid, `@media` queries), vanilla JavaScript (ES6, no dependencies). Fonts via Google Fonts `<link>` with system fallbacks. Optional form delivery via Formspree (wired later).

## Global Constraints

- **Brand colors:** ink `#0d0d0d`, panel `#111111`, panel-2 `#151515`, gold `#c9a24b`, text `#f4f4f4`, muted `#a0a0a0`. Copy these into CSS custom properties; use the variables everywhere.
- **Display font:** `Anton` (single ultra-bold weight) for headlines; **body/UI font:** `Inter`. Fallback stack: `Anton` → `Impact, sans-serif`; `Inter` → `-apple-system, Segoe UI, Roboto, sans-serif`.
- **Responsive is required (mobile + web):** every page must work and look correct at 375px (phone), 768px (tablet), and 1280px (desktop). Breakpoints: mobile `< 640px`, tablet `640–1023px`, desktop `≥ 1024px`. Content container max-width `1200px`, centered, with `1rem` side padding on mobile.
- **Header/menu, footer, and the primary "BOOK TRAINING →" button are identical on every page.** Nav items: Who We Are, What We Do, Players, Contact.
- **No prices anywhere.** Pricing is "Contact us for pricing."
- **No external JS/CSS dependencies** other than the Google Fonts stylesheet link.
- **Every `<img>` has descriptive `alt` text; every interactive control is keyboard-accessible.**
- **All internal links are relative** (e.g. `href="about.html"`) so the site is host-portable.
- Verification is done in the browser at the three widths above. "Verify" steps mean: open the file in a browser, resize/emulate the width, confirm the stated result.

---

## File Structure

```
xos/
  index.html        # Home
  about.html        # Who We Are
  training.html     # What We Do
  players.html      # Players / Gallery
  contact.html      # Contact / Book
  css/styles.css    # ALL shared styling (design tokens, layout, components, pages)
  js/main.js        # menu toggle, gallery lightbox, contact form validation/UX
  assets/logo.svg   # XOS crosshairs-football mark (scalable, brand gold)
  images/           # optimized web copies of selected photos
  photos/           # ORIGINAL source photos — never edited, not shipped
```

- `css/styles.css` — single stylesheet. Organized top-to-bottom: `:root` tokens → reset/base → layout utilities → header/menu → footer → buttons/components → page-specific sections. One responsibility: all presentation.
- `js/main.js` — single script, three independent modules behind small init functions: `initMenu()`, `initLightbox()`, `initContactForm()`. Each guards on element existence so the one file is safe to include on every page.
- `assets/logo.svg` — the reusable brand mark referenced by header and footer on all pages.

Rationale: at five static pages, a single CSS file and single JS file are easier to keep consistent (one source of truth for the shared header) than partials that must be duplicated. Files stay focused by responsibility (style vs behavior vs markup).

---

### Task 1: Scaffold, design tokens, and shared shell

Establishes the folder structure, the logo asset, the CSS token/reset foundation, and a minimal `index.html` proving the shell renders. Header/footer/menu behavior comes in Task 2.

**Files:**
- Create: `assets/logo.svg`
- Create: `css/styles.css`
- Create: `js/main.js`
- Create: `index.html`

**Interfaces:**
- Produces: `css/styles.css` design tokens (CSS vars listed in Global Constraints); base container class `.container`; the color/font system every later task consumes. `js/main.js` exposing `initMenu`, `initLightbox`, `initContactForm` (stubs now, filled later), each element-guarded and called on `DOMContentLoaded`.

- [ ] **Step 1: Create the logo SVG**

`assets/logo.svg` — crosshairs-football mark, gold ring + white cross + gold football, transparent background, `viewBox="0 0 40 40"`, `currentColor`-friendly where possible:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" role="img" aria-label="XOS Coaching">
  <circle cx="20" cy="20" r="16" fill="none" stroke="#c9a24b" stroke-width="2.5"/>
  <line x1="6" y1="6" x2="34" y2="34" stroke="#f4f4f4" stroke-width="2.5"/>
  <line x1="34" y1="6" x2="6" y2="34" stroke="#f4f4f4" stroke-width="2.5"/>
  <ellipse cx="20" cy="20" rx="9" ry="5.5" fill="#0d0d0d" stroke="#c9a24b" stroke-width="2"/>
  <line x1="14" y1="20" x2="26" y2="20" stroke="#f4f4f4" stroke-width="1.5"/>
</svg>
```

- [ ] **Step 2: Create the CSS foundation**

`css/styles.css` — tokens, reset, base type, container. (Components/pages appended in later tasks.)

```css
:root{
  --ink:#0d0d0d; --panel:#111; --panel-2:#151515;
  --gold:#c9a24b; --gold-dim:#7a5a1a;
  --text:#f4f4f4; --muted:#a0a0a0; --line:#262626;
  --max:1200px;
  --font-display:"Anton","Impact",sans-serif;
  --font-body:"Inter",-apple-system,"Segoe UI",Roboto,sans-serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--ink);color:var(--text);font-family:var(--font-body);line-height:1.6;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
h1,h2,h3{font-family:var(--font-display);font-weight:400;letter-spacing:.01em;line-height:.95;text-transform:uppercase}
.container{max-width:var(--max);margin:0 auto;padding:0 1rem}
.label{color:var(--gold);font-size:.7rem;letter-spacing:.25em;text-transform:uppercase;font-weight:700;font-family:var(--font-body)}
.section{padding:3.5rem 0}
@media (min-width:1024px){.section{padding:5rem 0}}
```

- [ ] **Step 3: Create the JS skeleton**

`js/main.js`:

```js
function initMenu(){ /* Task 2 */ }
function initLightbox(){ /* Task 4 */ }
function initContactForm(){ /* Task 5 */ }
document.addEventListener("DOMContentLoaded",()=>{ initMenu(); initLightbox(); initContactForm(); });
```

- [ ] **Step 4: Create index.html shell**

`index.html` — head with fonts + stylesheet + script, and a placeholder body proving tokens load:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>XOS Coaching — Elite Quarterback Development</title>
  <meta name="description" content="XOS Coaching — quarterback development from Kolt & Rafe Peavey. 100+ NFL and college QBs coached. Book training today.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="icon" href="assets/logo.svg">
</head>
<body>
  <main class="container section">
    <h1 style="font-size:2rem">XOS shell OK</h1>
    <p class="label">Tokens loaded</p>
  </main>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 5: Verify**

Open `index.html` in a browser. Expected: black background, gold "TOKENS LOADED" label in Anton-adjacent uppercase, no console errors. Resize to 375px and 1280px — content stays padded and centered.

- [ ] **Step 6: Commit**

```bash
git add assets/logo.svg css/styles.css js/main.js index.html
git commit -m "feat: scaffold static site shell, design tokens, and logo"
```

---

### Task 2: Shared header + full-screen menu + footer

Builds the sitewide floating-minimal header (logo left, gold crosshair button right), the full-screen overlay menu, and the footer. This markup block is copied verbatim into every page in later tasks; define it once here correctly.

**Files:**
- Modify: `css/styles.css` (append header/menu/footer/button styles)
- Modify: `js/main.js` (`initMenu`)
- Modify: `index.html` (insert real header + footer around the shell)

**Interfaces:**
- Produces: the canonical header markup (`<header class="site-header">…</header>`), the overlay menu (`#site-menu`), the footer (`<footer class="site-footer">`), and the `.btn`/`.btn-gold` button classes reused everywhere. `initMenu()` wires the toggle.

- [ ] **Step 1: Append header/menu/footer/button CSS**

```css
/* buttons */
.btn{display:inline-block;font-family:var(--font-body);font-weight:800;font-size:.85rem;letter-spacing:.05em;padding:.8rem 1.5rem;border-radius:4px;cursor:pointer;border:0;transition:transform .1s,filter .15s}
.btn:hover{filter:brightness(1.08)}.btn:active{transform:translateY(1px)}
.btn-gold{background:var(--gold);color:var(--ink)}
.btn-ghost{background:transparent;color:var(--text);border:2px solid var(--gold)}

/* header */
.site-header{position:absolute;top:0;left:0;right:0;z-index:30;display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem}
.site-header .logo{width:40px;height:40px}
.menu-toggle{width:44px;height:44px;border-radius:50%;border:2px solid var(--gold);background:#0d0d0daa;color:var(--gold);display:flex;align-items:center;justify-content:center;cursor:pointer}
.menu-toggle svg{width:20px;height:20px}

/* full-screen menu */
.site-menu{position:fixed;inset:0;z-index:40;background:var(--ink);display:flex;flex-direction:column;justify-content:center;padding:2rem 1.5rem;transform:translateY(-100%);opacity:0;visibility:hidden;transition:transform .35s ease,opacity .3s}
.site-menu.open{transform:translateY(0);opacity:1;visibility:visible}
.site-menu nav{display:flex;flex-direction:column;gap:.75rem}
.site-menu nav a{font-family:var(--font-display);font-size:2.25rem;text-transform:uppercase;color:var(--text);width:fit-content;transition:color .15s}
.site-menu nav a:hover,.site-menu nav a[aria-current="page"]{color:var(--gold)}
.site-menu .menu-close{position:absolute;top:1rem;right:1.25rem}
.site-menu .menu-foot{position:absolute;bottom:1.5rem;left:1.5rem;color:var(--muted);font-size:.75rem;letter-spacing:.1em}
@media (min-width:1024px){.site-menu nav a{font-size:3.5rem}}

/* footer */
.site-footer{background:#000;color:var(--muted);font-size:.75rem;padding:1.25rem;display:flex;flex-wrap:wrap;gap:.5rem;justify-content:space-between;align-items:center}
.site-footer .logo{width:26px;height:26px;vertical-align:middle;margin-right:.4rem}
```

- [ ] **Step 2: Implement initMenu()**

```js
function initMenu(){
  const toggle=document.querySelector(".menu-toggle");
  const menu=document.getElementById("site-menu");
  if(!toggle||!menu) return;
  const close=menu.querySelector(".menu-close");
  const open=()=>{menu.classList.add("open");toggle.setAttribute("aria-expanded","true");document.body.style.overflow="hidden";};
  const shut=()=>{menu.classList.remove("open");toggle.setAttribute("aria-expanded","false");document.body.style.overflow="";};
  toggle.addEventListener("click",open);
  if(close) close.addEventListener("click",shut);
  menu.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",shut));
  document.addEventListener("keydown",e=>{if(e.key==="Escape") shut();});
}
```

- [ ] **Step 3: Insert canonical header + menu + footer into index.html**

Replace the `<body>` contents' outer structure so it reads: header, main (shell for now), menu overlay, footer, script. Header:

```html
<header class="site-header">
  <a href="index.html" aria-label="XOS Coaching home"><img class="logo" src="assets/logo.svg" alt="XOS Coaching"></a>
  <button class="menu-toggle" aria-label="Open menu" aria-controls="site-menu" aria-expanded="false">
    <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="3"/><line x1="8" y1="8" x2="32" y2="32" stroke="currentColor" stroke-width="3"/><line x1="32" y1="8" x2="8" y2="32" stroke="currentColor" stroke-width="3"/></svg>
  </button>
</header>

<div class="site-menu" id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu">
  <button class="menu-toggle menu-close" aria-label="Close menu">✕</button>
  <nav>
    <a href="about.html">Who We Are</a>
    <a href="training.html">What We Do</a>
    <a href="players.html">Players</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="menu-foot">KOLT &amp; RAFE PEAVEY · @XOSCOACHING</div>
</div>
```

Footer (before `</body>`):

```html
<footer class="site-footer">
  <span><img class="logo" src="assets/logo.svg" alt="">XOS COACHING</span>
  <span>© 2026 XOS Coaching · @xoscoaching</span>
</footer>
```

Each page sets `aria-current="page"` on its own menu link.

- [ ] **Step 4: Verify**

Open `index.html`. Click the gold crosshair → full-screen black menu slides down with four large nav links; hovering a link turns it gold; ✕ and Escape close it; body scroll locks while open. Test at 375px and 1280px (links larger on desktop). Tab to the toggle and activate with Enter/Space.

- [ ] **Step 5: Commit**

```bash
git add css/styles.css js/main.js index.html
git commit -m "feat: shared floating header, full-screen menu, and footer"
```

---

### Task 3: Home page (`index.html`)

Replaces the shell `<main>` with the full 9-section home page. Header/menu/footer from Task 2 stay.

**Files:**
- Modify: `index.html` (replace `<main>` content)
- Modify: `css/styles.css` (append `.hero`, `.slash`, home section styles)
- Create: uses `images/` placeholders (real photos assigned in Task 6)

**Interfaces:**
- Consumes: `.container`, `.section`, `.btn-gold`, header/footer from Tasks 1–2.
- Produces: `.hero` (reused conceptually by page banners in later tasks via `.page-banner`), `.slash` gold-diagonal band utility used on multiple pages.

- [ ] **Step 1: Append hero + slash + home CSS**

```css
.hero{position:relative;min-height:88vh;display:flex;align-items:flex-end;overflow:hidden;background:#c9c4b8}
.hero__collage{position:absolute;inset:0;z-index:0}
.hero__collage img{position:absolute;bottom:0;height:auto;object-fit:cover}
.hero__watermark{position:absolute;top:44%;left:50%;transform:translate(-50%,-50%);font-family:var(--font-display);font-size:32vw;color:#000;opacity:.08;z-index:0;pointer-events:none;line-height:1}
.hero__scrim{position:absolute;inset:0;background:linear-gradient(0deg,#000000aa,transparent 55%);z-index:1}
.hero__inner{position:relative;z-index:2;padding:0 1.25rem 2.5rem}
.hero h1{color:#fff;font-size:clamp(2.75rem,10vw,6rem);text-shadow:0 2px 12px #0009}
.hero .cta{margin-top:1.25rem}
.slash{background:var(--gold);color:var(--ink);clip-path:polygon(0 8%,100% 0,100% 92%,0 100%);padding:2.5rem 0}
.stats{display:flex;justify-content:space-around;text-align:center;gap:1rem;flex-wrap:wrap}
.stats .n{font-family:var(--font-display);font-size:2.5rem}
.cards{display:grid;grid-template-columns:1fr;gap:1rem}
@media(min-width:640px){.cards{grid-template-columns:repeat(3,1fr)}}
.card{background:var(--panel);border:1px solid var(--line);border-top:3px solid var(--gold);border-radius:6px;padding:1.25rem}
.coach-row{display:flex;gap:1rem;align-items:center;flex-wrap:wrap}
```

- [ ] **Step 2: Build the hero markup** inside `<main>`

Hero with watermark, a collage of 4 QB images (placeholders `images/qb1.jpg`…`qb4.jpg` until Task 6), gold credibility label, `UNLOCK YOUR POTENTIAL.` H1, and `BOOK TRAINING →` button linking to `contact.html`:

```html
<section class="hero">
  <div class="hero__watermark">XOS</div>
  <div class="hero__collage">
    <img src="images/qb1.jpg" alt="Quarterback throwing" style="left:4%;width:22%">
    <img src="images/qb2.jpg" alt="Quarterback dropping back" style="left:30%;width:26%">
    <img src="images/qb3.jpg" alt="Quarterback in motion" style="left:56%;width:24%">
    <img src="images/qb4.jpg" alt="Quarterback celebrating" style="left:80%;width:20%">
  </div>
  <div class="hero__scrim"></div>
  <div class="hero__inner container">
    <p class="label">100+ NFL &amp; College QBs Coached</p>
    <h1>Unlock Your<br>Potential.</h1>
    <a class="btn btn-gold cta" href="contact.html">BOOK TRAINING →</a>
  </div>
</section>
```

- [ ] **Step 3: Build sections 2–9** (intro, what-we-do preview cards, stats slash band, coaches, featured players, testimonial, final CTA)

```html
<section class="section container" style="text-align:center">
  <p class="label">Welcome to XOS</p>
  <p style="max-width:34rem;margin:.75rem auto 0">XOS develops quarterbacks who win on Friday nights and get to the next level. Real coaching from players who've been there.</p>
</section>

<section class="section" style="background:var(--panel-2)">
  <div class="container">
    <h2 style="text-align:center;font-size:1.8rem;margin-bottom:1.5rem">What We Do</h2>
    <div class="cards">
      <a class="card" href="training.html"><h3 style="font-size:1.1rem">On-Field 1:1</h3><p style="color:var(--muted);font-size:.9rem">Private QB development.</p></a>
      <a class="card" href="training.html"><h3 style="font-size:1.1rem">On-Field Group</h3><p style="color:var(--muted);font-size:.9rem">Competition &amp; reps.</p></a>
      <a class="card" href="training.html"><h3 style="font-size:1.1rem">Virtual Coaching</h3><p style="color:var(--muted);font-size:.9rem">Train from anywhere.</p></a>
    </div>
  </div>
</section>

<section class="slash"><div class="container stats">
  <div><div class="n">100+</div><div class="label">QBs Coached</div></div>
  <div><div class="n">NFL</div><div class="label">&amp; College</div></div>
  <div><div class="n">D1</div><div class="label">Commits</div></div>
</div></section>

<section class="section container">
  <h2 style="text-align:center;font-size:1.8rem;margin-bottom:1.5rem">Meet the Coaches</h2>
  <div class="cards" style="grid-template-columns:1fr;gap:1rem">
    <div class="coach-row"><img src="images/rafe.jpg" alt="Rafe Peavey" style="width:80px;height:80px;border-radius:50%;object-fit:cover"><div><h3 style="font-size:1.2rem">Rafe Peavey</h3><p class="label">Former Arkansas QB</p></div></div>
    <div class="coach-row"><img src="images/kolt.jpg" alt="Kolt Peavey" style="width:80px;height:80px;border-radius:50%;object-fit:cover"><div><h3 style="font-size:1.2rem">Kolt Peavey</h3><p class="label">QB Coach</p></div></div>
  </div>
</section>

<section class="section" style="background:var(--panel-2)"><div class="container">
  <h2 style="text-align:center;font-size:1.8rem;margin-bottom:1.5rem">Players We've Developed</h2>
  <div class="cards" style="grid-template-columns:repeat(2,1fr)">
    <img src="images/player1.jpg" alt="Featured quarterback" style="border-radius:6px">
    <img src="images/player2.jpg" alt="Featured quarterback" style="border-radius:6px">
  </div>
  <p style="text-align:center;margin-top:1rem"><a class="btn btn-ghost" href="players.html">SEE ALL PLAYERS</a></p>
</div></section>

<section class="section container" style="text-align:center;max-width:36rem">
  <div style="color:var(--gold);font-size:2rem;line-height:0">&ldquo;</div>
  <p style="font-style:italic;margin-top:.5rem">Placeholder testimonial about results — recruiting offers, confidence, mechanics.</p>
  <p class="label" style="margin-top:.75rem">— Parent of a D1 commit</p>
</section>

<section class="section" style="background:linear-gradient(135deg,#1a1a1a,#000);text-align:center">
  <div class="container">
    <h2 style="font-size:2rem">Ready to Train?</h2>
    <p style="color:var(--muted);margin:.5rem 0 1.25rem">Spots are limited. Tell us about your athlete.</p>
    <a class="btn btn-gold" href="contact.html">BOOK TRAINING →</a>
  </div>
</section>
```

- [ ] **Step 4: Set `aria-current="page"` is N/A for Home** (Home has no menu link). Leave menu as-is.

- [ ] **Step 5: Verify**

Open `index.html`. Hero fills most of the first screen with the "XOS" watermark, collage, credibility label, headline, and gold button. Scroll through all 9 sections; the gold slash band renders diagonally. At 375px: cards stack to 1 column, hero text scales down, nothing overflows horizontally. At 1280px: cards show 3 across, generous spacing. Buttons link to `contact.html`/`training.html`/`players.html`.

- [ ] **Step 6: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: home page with hero, sections, and CTA flow"
```

---

### Task 4: Players / Gallery page (`players.html`) + lightbox

Built before the other content pages because it introduces the reusable `.page-banner` and the lightbox behavior.

**Files:**
- Create: `players.html`
- Modify: `css/styles.css` (append `.page-banner`, `.gallery`, `.lightbox`)
- Modify: `js/main.js` (`initLightbox`)

**Interfaces:**
- Consumes: header/menu/footer block (copy from `index.html`), `.slash`, `.btn-gold`, `.container`, `.section`.
- Produces: `.page-banner` reused by Tasks 5–7; lightbox markup contract (`.gallery` container with `<img data-full="...">`, `#lightbox` overlay).

- [ ] **Step 1: Append page-banner + gallery + lightbox CSS**

```css
.page-banner{position:relative;min-height:34vh;display:flex;align-items:flex-end;background:linear-gradient(135deg,#1a1a1a,#333);overflow:hidden}
.page-banner .container{position:relative;z-index:2;padding-bottom:1.5rem}
.page-banner h1{color:#fff;font-size:clamp(2rem,7vw,3.5rem)}
.gallery{display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem}
@media(min-width:640px){.gallery{grid-template-columns:repeat(4,1fr)}}
.gallery img{width:100%;height:100%;aspect-ratio:1;object-fit:cover;border-radius:4px;cursor:pointer;transition:opacity .15s}
.gallery img:hover{opacity:.85}
.lightbox{position:fixed;inset:0;z-index:60;background:#000000ee;display:none;align-items:center;justify-content:center;padding:1.5rem}
.lightbox.open{display:flex}
.lightbox img{max-width:92vw;max-height:88vh;border-radius:6px}
.lightbox .lb-close{position:absolute;top:1rem;right:1.25rem;color:#fff;font-size:2rem;cursor:pointer;background:none;border:0}
.commit-list{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem 1.25rem;font-weight:700}
```

- [ ] **Step 2: Implement initLightbox()**

```js
function initLightbox(){
  const gallery=document.querySelector(".gallery");
  const box=document.getElementById("lightbox");
  if(!gallery||!box) return;
  const img=box.querySelector("img");
  const closeBtn=box.querySelector(".lb-close");
  const shut=()=>{box.classList.remove("open");document.body.style.overflow="";};
  gallery.addEventListener("click",e=>{
    const t=e.target.closest("img"); if(!t) return;
    img.src=t.dataset.full||t.src; img.alt=t.alt;
    box.classList.add("open"); document.body.style.overflow="hidden";
  });
  closeBtn.addEventListener("click",shut);
  box.addEventListener("click",e=>{if(e.target===box) shut();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape") shut();});
}
```

- [ ] **Step 3: Create players.html**

Copy the full head + header + menu + footer + script structure from `index.html`; set `aria-current="page"` on the Players menu link; body content:

```html
<main>
  <section class="page-banner"><div class="container"><p class="label">XOS Coaching</p><h1>Players</h1></div></section>

  <section class="section container">
    <p class="label" style="text-align:center;display:block">Featured QBs</p>
    <div class="cards" style="margin-top:1rem">
      <div><img src="images/player1.jpg" alt="Featured quarterback" style="border-radius:6px"><p style="font-weight:800;margin-top:.4rem">Player Name</p><p style="color:var(--muted);font-size:.85rem">QB · School</p></div>
      <div><img src="images/player2.jpg" alt="Featured quarterback" style="border-radius:6px"><p style="font-weight:800;margin-top:.4rem">Player Name</p><p style="color:var(--muted);font-size:.85rem">QB · School</p></div>
      <div><img src="images/player3.jpg" alt="Featured quarterback" style="border-radius:6px"><p style="font-weight:800;margin-top:.4rem">Player Name</p><p style="color:var(--muted);font-size:.85rem">QB · School</p></div>
    </div>
  </section>

  <section class="slash"><div class="container">
    <h2 style="text-align:center;font-size:1.4rem;margin-bottom:1rem">Commitments &amp; Placements</h2>
    <div class="commit-list"><span>ARKANSAS</span><span>MEMPHIS</span><span>ARIZONA</span><span>+ MORE</span></div>
  </div></section>

  <section class="section container">
    <p class="label" style="text-align:center;display:block;margin-bottom:1rem">Gallery</p>
    <div class="gallery">
      <img src="images/g1.jpg" data-full="images/g1.jpg" alt="Training session">
      <img src="images/g2.jpg" data-full="images/g2.jpg" alt="Quarterback throwing">
      <img src="images/g3.jpg" data-full="images/g3.jpg" alt="Camp day">
      <img src="images/g4.jpg" data-full="images/g4.jpg" alt="On-field coaching">
      <img src="images/g5.jpg" data-full="images/g5.jpg" alt="Group session">
      <img src="images/g6.jpg" data-full="images/g6.jpg" alt="Quarterback drill">
      <img src="images/g7.jpg" data-full="images/g7.jpg" alt="Player portrait">
      <img src="images/g8.jpg" data-full="images/g8.jpg" alt="Game action">
    </div>
  </section>

  <section class="section" style="background:linear-gradient(135deg,#1a1a1a,#000);text-align:center"><div class="container">
    <h2 style="font-size:2rem">Be the Next One</h2>
    <a class="btn btn-gold" href="contact.html" style="margin-top:1rem">BOOK TRAINING →</a>
  </div></section>
</main>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
  <button class="lb-close" aria-label="Close">✕</button>
  <img src="" alt="">
</div>
```

- [ ] **Step 4: Verify**

Open `players.html`. Banner shows "PLAYERS". Featured cards render (3 across desktop, stack on mobile). Gallery is 4 columns desktop / 2 mobile. Click any gallery photo → dark lightbox opens with the enlarged image; ✕, Escape, and clicking the backdrop all close it; body scroll locks while open. No horizontal overflow at 375px.

- [ ] **Step 5: Commit**

```bash
git add players.html css/styles.css js/main.js
git commit -m "feat: players/gallery page with lightbox"
```

---

### Task 5: Contact page (`contact.html`) + form validation

**Files:**
- Create: `contact.html`
- Modify: `css/styles.css` (append form styles)
- Modify: `js/main.js` (`initContactForm`)

**Interfaces:**
- Consumes: `.page-banner`, header/menu/footer, `.btn-gold`, `.container`.
- Produces: the `#booking-form` contract with `required` fields and the `#form-status` confirmation region; a Formspree-ready `<form>` (action commented, `method="POST"`).

- [ ] **Step 1: Append form CSS**

```css
.contact-grid{display:grid;grid-template-columns:1fr;gap:1.5rem}
@media(min-width:900px){.contact-grid{grid-template-columns:1.4fr 1fr}}
.field label{display:block;color:var(--muted);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:.3rem}
.field input,.field select,.field textarea{width:100%;background:#1a1a1a;border:1px solid var(--line);border-radius:4px;color:var(--text);padding:.6rem;font-family:var(--font-body)}
.field{margin-bottom:.8rem}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
.field input:focus,.field select:focus,.field textarea:focus{outline:2px solid var(--gold);border-color:var(--gold)}
.field.required label::after{content:" *";color:var(--gold)}
.form-status{margin-top:.8rem;padding:.8rem;border-radius:4px;display:none}
.form-status.ok{display:block;background:#14351f;color:#7fdca0}
.form-status.err{display:block;background:#3a1414;color:#f0a0a0}
.contact-info a{color:var(--gold)}
.contact-info div{margin:.5rem 0}
```

- [ ] **Step 2: Implement initContactForm()**

```js
function initContactForm(){
  const form=document.getElementById("booking-form");
  if(!form) return;
  const status=document.getElementById("form-status");
  form.addEventListener("submit",e=>{
    e.preventDefault();
    if(!form.checkValidity()){
      status.className="form-status err";
      status.textContent="Please fill in all required fields.";
      form.reportValidity();
      return;
    }
    // Delivery wired later (Formspree). For now, confirm on-page.
    status.className="form-status ok";
    status.textContent="Thanks — we'll be in touch within 24 hours.";
    form.reset();
  });
}
```

- [ ] **Step 3: Create contact.html**

Copy head/header/menu/footer/script from `index.html`; `aria-current="page"` on Contact link; body:

```html
<main>
  <section class="page-banner"><div class="container"><p class="label">XOS Coaching</p><h1>Book Training</h1></div></section>
  <section class="section container">
    <div class="contact-grid">
      <form id="booking-form" method="POST" novalidate>
        <!-- To enable email delivery later: set action="https://formspree.io/f/XXXX" -->
        <p style="color:var(--muted);margin-bottom:1rem">Tell us about your athlete and we'll be in touch within 24 hours.</p>
        <div class="field-row">
          <div class="field required"><label for="athlete">Athlete Name</label><input id="athlete" name="athlete" required></div>
          <div class="field required"><label for="grad">Grad Year</label><input id="grad" name="grad_year" inputmode="numeric" required></div>
        </div>
        <div class="field-row">
          <div class="field required"><label for="parent">Parent / Guardian</label><input id="parent" name="parent" required></div>
          <div class="field required"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" required></div>
        </div>
        <div class="field required"><label for="email">Email</label><input id="email" name="email" type="email" required></div>
        <div class="field"><label for="school">School / Team</label><input id="school" name="school"></div>
        <div class="field required"><label for="interest">Area of Interest</label>
          <select id="interest" name="area_of_interest" required>
            <option value="" disabled selected>Choose one…</option>
            <option>On-Field Coaching (1:1)</option>
            <option>On-Field Coaching (Group)</option>
            <option>Virtual Coaching</option>
            <option>Video Submission</option>
            <option>Other</option>
          </select>
        </div>
        <div class="field"><label for="goals">Goals / Message</label><textarea id="goals" name="goals" rows="4"></textarea></div>
        <button class="btn btn-gold" type="submit">SEND REQUEST →</button>
        <div class="form-status" id="form-status" role="status" aria-live="polite"></div>
      </form>

      <aside class="contact-info">
        <p class="label">Other Ways to Reach Us</p>
        <div>✉️ <a href="mailto:info@xoscoaching.com">info@xoscoaching.com</a></div>
        <div>📸 <a href="https://instagram.com/xoscoaching">@xoscoaching</a></div>
        <p style="color:var(--muted);font-size:.85rem;margin-top:1rem;border-top:1px solid var(--line);padding-top:1rem">Serious inquiries get a personal reply from Kolt or Rafe.</p>
      </aside>
    </div>
  </section>
</main>
```

- [ ] **Step 4: Verify**

Open `contact.html`. Two columns on desktop (form + contact info), stacked on mobile. Submitting empty → browser blocks and shows "Please fill in all required fields."; required fields marked with gold `*`. Fill all required + pick an Area of Interest → submit shows green "Thanks — we'll be in touch within 24 hours." and clears the form. Email and Instagram links work. Focus states show gold outline (keyboard accessible).

- [ ] **Step 5: Commit**

```bash
git add contact.html css/styles.css js/main.js
git commit -m "feat: contact/booking page with validated form"
```

---

### Task 6: About (`about.html`) and Training (`training.html`) pages

Two content pages sharing the `.page-banner` and `.slash` patterns. Grouped: same structure, no new components.

**Files:**
- Create: `about.html`
- Create: `training.html`
- Modify: `css/styles.css` (append `.about-coach` alternating layout if needed)

**Interfaces:**
- Consumes: `.page-banner`, `.slash`, `.cards`, `.btn-gold`, header/menu/footer.

- [ ] **Step 1: Append coach-row alternating CSS**

```css
.about-coach{display:flex;gap:1.25rem;align-items:center;flex-wrap:wrap}
.about-coach img{width:120px;height:150px;object-fit:cover;border-radius:6px}
@media(min-width:640px){.about-coach.reverse{flex-direction:row-reverse;text-align:right}}
```

- [ ] **Step 2: Create about.html** (head/header/menu/footer/script copied; `aria-current` on "Who We Are")

```html
<main>
  <section class="page-banner"><div class="container"><p class="label">XOS Coaching</p><h1>Who We Are</h1></div></section>

  <section class="section container" style="text-align:center">
    <p class="label">Our Story</p>
    <p style="max-width:36rem;margin:.75rem auto 0;color:#cfcfcf">Placeholder: how XOS started, the mission, and what makes our QB development different. Personal and credible.</p>
  </section>

  <section class="section" style="background:var(--panel-2)"><div class="container">
    <div class="about-coach">
      <img src="images/rafe.jpg" alt="Rafe Peavey">
      <div><h2 style="font-size:1.6rem">Rafe Peavey</h2><p class="label">Former Arkansas QB · #9</p><p style="color:var(--muted);margin-top:.5rem">Placeholder bio: playing career (Arkansas, SEC), coaching background, specialties.</p></div>
    </div>
  </div></section>

  <section class="section"><div class="container">
    <div class="about-coach reverse">
      <img src="images/kolt.jpg" alt="Kolt Peavey">
      <div><h2 style="font-size:1.6rem">Kolt Peavey</h2><p class="label">QB Coach</p><p style="color:var(--muted);margin-top:.5rem">Placeholder bio: playing/coaching background, philosophy, specialties.</p></div>
    </div>
  </div></section>

  <section class="slash"><div class="container" style="text-align:center">
    <h2 style="font-size:1.5rem">Our Philosophy</h2>
    <p style="max-width:34rem;margin:.5rem auto 0;font-weight:600">Placeholder: the XOS approach — mechanics, mental game, film, recruiting.</p>
  </div></section>

  <section class="section container" style="text-align:center">
    <p class="label">Where Our QBs Play</p>
    <div class="commit-list" style="margin-top:1rem;color:var(--muted)"><span>NFL</span><span>SEC</span><span>BIG 12</span><span>D1</span><span>D2</span><span>HS ALL-STATE</span></div>
  </section>

  <section class="section" style="background:linear-gradient(135deg,#1a1a1a,#000);text-align:center"><div class="container">
    <h2 style="font-size:2rem">Train With Kolt &amp; Rafe</h2>
    <a class="btn btn-gold" href="contact.html" style="margin-top:1rem">BOOK TRAINING →</a>
  </div></section>
</main>
```

- [ ] **Step 3: Create training.html** (head/header/menu/footer/script copied; `aria-current` on "What We Do")

```html
<main>
  <section class="page-banner"><div class="container"><p class="label">XOS Coaching</p><h1>What We Do</h1></div></section>

  <section class="section container" style="text-align:center">
    <p style="max-width:34rem;margin:0 auto;color:#cfcfcf">How XOS develops quarterbacks — mechanics, mind, and recruiting — at every level.</p>
  </section>

  <section class="section" style="background:var(--panel-2)"><div class="container" style="display:flex;flex-direction:column;gap:1rem">
    <div class="card" style="border-top:0;border-left:3px solid var(--gold)"><h3 style="font-size:1.1rem">On-Field Coaching (1:1)</h3><p style="color:var(--muted)">Private sessions built around the athlete — footwork, throwing motion, reads.</p></div>
    <div class="card" style="border-top:0;border-left:3px solid var(--gold)"><h3 style="font-size:1.1rem">On-Field Coaching (Group)</h3><p style="color:var(--muted)">Competitive reps with other QBs; camps and clinics.</p></div>
    <div class="card" style="border-top:0;border-left:3px solid var(--gold)"><h3 style="font-size:1.1rem">Virtual Coaching</h3><p style="color:var(--muted)">Remote development and check-ins — train from anywhere.</p></div>
    <div class="card" style="border-top:0;border-left:3px solid var(--gold)"><h3 style="font-size:1.1rem">Video Submission</h3><p style="color:var(--muted)">Send film; get detailed breakdown and a plan.</p></div>
  </div></section>

  <section class="slash"><div class="container">
    <h2 style="text-align:center;font-size:1.4rem;margin-bottom:1.25rem">How It Works</h2>
    <div class="stats">
      <div><div class="n">1</div><div class="label">Reach Out</div></div>
      <div><div class="n">2</div><div class="label">Assessment</div></div>
      <div><div class="n">3</div><div class="label">Train</div></div>
      <div><div class="n">4</div><div class="label">Compete</div></div>
    </div>
  </div></section>

  <section class="section container" style="text-align:center">
    <p class="label">Who It's For</p>
    <p style="color:#cfcfcf;margin-top:.5rem">Youth · Middle School · High School · College QBs — all skill levels welcome.</p>
  </section>

  <section class="section" style="background:var(--panel-2);text-align:center"><div class="container">
    <p style="color:var(--muted)">Packages tailored to each athlete. <span style="color:var(--gold);font-weight:700">Contact us for pricing.</span></p>
  </div></section>

  <section class="section" style="background:linear-gradient(135deg,#1a1a1a,#000);text-align:center"><div class="container">
    <h2 style="font-size:2rem">Start Your Development</h2>
    <a class="btn btn-gold" href="contact.html" style="margin-top:1rem">BOOK TRAINING →</a>
  </div></section>
</main>
```

- [ ] **Step 4: Verify**

Open `about.html`: banner "WHO WE ARE"; Rafe's block first, Kolt's block image-reversed on desktop and stacked on mobile; gold philosophy slash; credibility strip; CTA. Open `training.html`: four service cards in order (On-Field 1:1, On-Field Group, Virtual, Video Submission), 4-step How It Works slash, pricing note, CTA. Both: no horizontal overflow at 375px; menu link for the current page shows gold.

- [ ] **Step 5: Commit**

```bash
git add about.html training.html css/styles.css
git commit -m "feat: about and training pages"
```

---

### Task 7: Image preparation and wiring

Replace all placeholder `images/*.jpg` references with optimized copies of real photos from `photos/`.

**Files:**
- Create: `images/*.jpg` (optimized copies)
- Modify: all five HTML files (point `src`/`data-full` at real filenames; finalize `alt` text)

**Interfaces:**
- Consumes: the `<img>` references defined in Tasks 3–6.

- [ ] **Step 1: Catalog source photos**

List `photos/` and view them; categorize into: hero collage cutouts (4 dynamic action shots), coach portraits (Rafe, Kolt), featured player cards (e.g. Luke Lawrence graphic), and gallery (training/camp/action). Note: `photos/` contains duplicates (`DAC96FFE… (1)`, `IMG_9777 (1)`) and non-photo assets (`XOS _1 v2 (flip).jpeg` logo lockup, `View recent photos.jpeg`, the website reference) — exclude those from web images.

- [ ] **Step 2: Produce optimized web copies into `images/`**

For each chosen photo, create a resized/compressed copy (longest edge ≤ 1600px, JPEG quality ~80) with a semantic name matching the HTML (`qb1.jpg`…`qb4.jpg`, `rafe.jpg`, `kolt.jpg`, `player1.jpg`…, `g1.jpg`…`g8.jpg`). Use `sips` (built into macOS), e.g.:

```bash
sips -Z 1600 -s formatOptions 80 "photos/IMG_2102.jpeg" --out "images/qb2.jpg"
```

Map real files to targets during Step 1; run one `sips` command per image.

- [ ] **Step 3: Finalize alt text** in each HTML file to describe the actual photo (player name/action where known).

- [ ] **Step 4: Verify**

Open all five pages. Every image loads (no broken-image icons), the hero collage composes cleanly, coach portraits are correct (Rafe/Kolt), gallery thumbnails and lightbox show real photos. Check total page weight is reasonable (images optimized, not multi-MB originals). Re-check 375px and 1280px.

- [ ] **Step 5: Commit**

```bash
git add images/ index.html about.html training.html players.html contact.html
git commit -m "feat: add optimized photos and wire real images"
```

---

### Task 8: Responsive + consistency + accessibility QA pass

Final sweep across all pages and widths. Fixes only — no new features.

**Files:**
- Modify: any of the HTML/CSS files as issues are found.

- [ ] **Step 1: Cross-page header/footer consistency**

Confirm the header, menu overlay (same four links, correct `aria-current` per page), and footer are byte-identical across all five pages except the `aria-current` marker. Fix any drift.

- [ ] **Step 2: Responsive sweep**

At 375px, 768px, 1024px, 1280px on every page: no horizontal scrollbar; text legible; tap targets ≥ 44px; hero/banner heights reasonable; cards/gallery reflow correctly; the gold slash bands don't clip text.

- [ ] **Step 3: Accessibility & links**

Keyboard-only pass: Tab reaches the menu toggle, opens the menu, Tab through links, Escape closes; form is fully operable by keyboard with visible focus. Every `<img>` has meaningful `alt`. Every internal link resolves (click each nav item and every CTA). Run the page through the browser console with no errors.

- [ ] **Step 4: Metadata**

Each page has a unique `<title>` and `<meta name="description">`. Favicon (`assets/logo.svg`) shows in the tab.

- [ ] **Step 5: Verify + commit**

```bash
git add -A
git commit -m "fix: responsive, consistency, and accessibility QA pass"
```

---

## Post-Plan: Owner content & launch (not code tasks)

Tracked in the spec §8. Before launch the owner supplies: coach bios + photos, final copy, featured players/commitments, testimonial(s), real contact email + Instagram, and the Formspree endpoint (set `action` on `#booking-form`). Hosting is chosen later; the folder deploys as-is.

---

## Self-Review

- **Spec coverage:** Purpose/booking funnel (Tasks 3,5 CTAs) ✓; brand tokens (Task 1) ✓; watermark+collage hero (Task 3) ✓; gold slash on dividers not header (Tasks 3,4,6) ✓; floating-minimal header + full-screen menu (Task 2) ✓; nav Who We Are/What We Do/Players/Contact (Task 2) ✓; all 5 pages with their sections (Tasks 3–6) ✓; Rafe first (Task 6) ✓; four real services (Task 6) ✓; flexible players + lightbox (Task 4) ✓; contact form incl. required Area of Interest + email/IG (Task 5) ✓; form-delivery-later/Formspree-ready (Task 5) ✓; portable static/no build (all) ✓; responsive mobile+web (Global Constraints, Task 8) ✓; content-needed + out-of-scope (Post-Plan) ✓.
- **Placeholder scan:** Content placeholders in copy are intentional and flagged as owner-supplied; no plan-step placeholders (each step has concrete code/commands).
- **Type/name consistency:** `initMenu`/`initLightbox`/`initContactForm` defined in Task 1, implemented in Tasks 2/4/5, all called on `DOMContentLoaded`. `#site-menu`, `.menu-toggle`, `.gallery`+`#lightbox`, `#booking-form`+`#form-status` referenced consistently between HTML and JS. `.page-banner`/`.slash`/`.cards`/`.btn-gold` defined before reuse.
