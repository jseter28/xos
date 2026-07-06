# XOS Coaching — Website Design Spec

**Date:** 2026-07-06
**Project:** `~/Desktop/xos`
**Type:** Redesign of the existing XOS Coaching website (fresh look)

---

## 1. Purpose & Goal

A quarterback-coaching marketing website whose **primary goal is to get athletes and
parents to book training**. Everything on the site funnels toward the booking form.

- Business: **XOS Coaching** — QB development run by **Kolt Peavey** and **Rafe Peavey**
  (Rafe: former Arkansas QB, #9).
- Credibility anchor: **100+ NFL & College quarterbacks coached.**
- Audience is largely **mobile** (parents/athletes on phones) — mobile-first.

## 2. Brand & Visual Direction

- **Colors:** black (`#0d0d0d` / `#111` / `#151515`) + gold (`~#c9a24b`) + white.
- **Type:** bold, heavy athletic sans; large impactful headlines.
- **Imagery:** high-contrast QB action photography does the heavy lifting.
- **Signature hero element (kept from current site):** a giant **"XOS" watermark**
  behind a **collage of QB cutout photos**.
- **Accent motif:** a **gold diagonal "slash"** band (nods to the X / crosshair) used on
  section dividers — NOT in the header.
- **Logo:** the XOS crosshairs-football mark, top-left on every page.

## 3. Approach (Tech)

**Hand-built static site — HTML + CSS + a touch of JavaScript.** No framework, no build
step. Portable: uploads to essentially any host. Chosen for simplicity, longevity, and
easy handoff to a non-technical owner.

- JS is used only for: the full-screen menu toggle, mobile behavior, the gallery
  lightbox, and form submission UX.
- Shared header/footer markup repeated across pages (kept in sync manually; small site).

### File structure
```
xos/
  index.html            # Home
  about.html            # Who We Are
  training.html         # What We Do
  players.html          # Players / Gallery
  contact.html          # Contact / Book
  css/styles.css        # shared styling
  js/main.js            # menu, lightbox, form
  images/               # optimized copies of photos
  photos/               # original photos (untouched, source assets)
```

## 4. Header / Navigation (sitewide)

**Direction: "Floating minimal."**

- Logo mark top-left (links Home). **Gold crosshair button top-right.**
- No visible nav bar — tapping the crosshair opens a **bold full-screen menu**:
  giant nav links (hovered/active item turns gold), coaches' names + Instagram at the
  bottom. Crosshair becomes an ✕ to close.
- **Nav items:** Who We Are · What We Do · Players · Contact.
- On mobile: identical pattern (logo + crosshair → full-screen menu).

**Out of scope for now:** XOS University, Login/member area, online courses, payments.
(Can be scoped as a separate future project.)

## 5. Pages

### 5.1 Home (`index.html`)
Top-to-bottom (all sections confirmed — keep all):
1. **Hero** — XOS watermark + QB collage; gold credibility line "100+ NFL & College QBs
   Coached"; headline **"UNLOCK YOUR POTENTIAL."** (white, subtle shadow); gold primary
   button **"BOOK TRAINING →"**.
2. **Intro** — short "who XOS is" statement.
3. **What We Do** — service preview cards (the four services below) linking to the Training page.
4. **Stats band** — gold slash divider: `100+ QBs Coached · NFL & College · D1 Commits`.
5. **Meet the Coaches** — Kolt & Rafe preview.
6. **Players We've Developed** — featured highlight cards.
7. **Testimonial** — parent/athlete quote.
8. **Final CTA** — "Ready to train?" → Book Training.
9. **Footer.**

### 5.2 Who We Are (`about.html`)
1. Page banner: "WHO WE ARE".
2. **Our Story** — XOS origin/mission (short).
3. **Coach bios**, alternating left/right with photos — **Rafe first** (Former Arkansas
   QB #9), then Kolt.
4. **Our Philosophy** — gold slash band.
5. **Where Our QBs Play** — credibility strip (NFL / SEC / D1 / etc.).
6. **CTA** → Book Training. Footer.

### 5.3 What We Do (`training.html`)
1. Page banner: "WHAT WE DO".
2. Intro line.
3. **Services** (detailed rows) — aligned to real offerings:
   - **On-Field Coaching (1:1)**
   - **On-Field Coaching (Group)**
   - **Virtual Coaching**
   - **Video Submission**
4. **How It Works** — gold slash band, 4 steps: Reach Out → Assessment → Train → Compete.
5. **Who It's For** — Youth · Middle School · High School · College; all levels.
6. **Pricing note** — "Packages tailored to each athlete. Contact us for pricing."
   (No prices shown anywhere.)
7. **CTA** → Book Training. Footer.

### 5.4 Players / Gallery (`players.html`)
1. Page banner: "PLAYERS".
2. **Featured QBs** — highlight cards (name + school), styled like the Luke Lawrence
   graphic. **Content kept flexible/placeholder for now**; real names supplied later.
3. **Commitments & Placements** — gold slash band listing schools.
4. **Gallery** — responsive photo grid, **click-to-enlarge lightbox**.
5. **CTA** → "Be the next one" / Book Training. Footer.

### 5.5 Contact / Book (`contact.html`)
Two-column (stacks on mobile): form + contact info.

**Form fields:**
- Athlete Name
- Grad Year
- Parent / Guardian
- Phone
- Email
- School / Team
- **Area of Interest (required)** — choices: On-Field Coaching (1:1) · On-Field Coaching
  (Group) · Virtual Coaching · Video Submission · Other. (Rendered as selectable chips or
  a dropdown.)
- Goals / Message
- Submit → **"SEND REQUEST →"**, then an on-page "Thanks — we'll be in touch within 24h"
  confirmation.

**Contact info panel:** Email (e.g. info@xoscoaching.com) + Instagram (@xoscoaching).
Note: "Serious inquiries get a personal reply from Kolt or Rafe."

## 6. Form Delivery

- Build the form UI + validation now. **Delivery decided later**, structured so wiring a
  service like **Formspree** (or similar) is a ~2-minute change (email to the owner).
- No backend server required.

## 7. Hosting

- **Decided later.** Site is built fully portable/static so it runs on any host
  (static host, traditional web host, or a domain pointed at a free host).

## 8. Content Needed From Owner (before launch)

- Coach bios (Rafe, Kolt) + coach photos.
- Real tagline/intro copy (headline "Unlock Your Potential." confirmed).
- Service descriptions (final wording).
- Featured players + real commitments/placements (optional; placeholders until then).
- Testimonial quote(s).
- Real contact email + Instagram handle.
- Confirmation of which photos go where (from `photos/`).

## 9. Out of Scope (this project)

- XOS University, member logins, online courses, e-commerce/payments.
- Online scheduling/calendar booking and integrated payment (form → manual follow-up only).
- SMS notifications (email delivery first; SMS possible later).

## 10. Success Criteria

- A visitor on a phone can, within seconds, understand XOS is elite QB coaching and reach
  the booking form in ≤ 2 taps.
- All five pages consistent in brand, header, and CTA.
- Form captures the fields above with required-field validation and a clear confirmation.
- Site is a self-contained folder that can be uploaded to a host without a build step.
