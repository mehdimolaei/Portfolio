# Portfolio Repositioning — Design Spec

**Date:** 2026-06-08
**Author:** Mehdi Molaei (with Claude Code)
**Status:** Approved for planning

## Goal

Reposition the personal portfolio (https://mehdimolaei.github.io/Portfolio/) from a
biography-first academic page to an **industry-first** page that leads with production
computational imaging and scientific ML, while keeping the deliberately minimal
Barron/Karpathy visual style.

The site must answer, within ~5 seconds: what Mehdi builds, why it is technically
valuable, what proof exists, and which projects best demonstrate senior-level work.

## Scope decisions (locked)

- **Positioning:** Industry-first. Production computational imaging / scientific ML
  leads; academic research is supporting proof, not the headline.
- **Additions:** Selective. Sharpen the hero, add a Featured Work block, add a compact
  one-line impact statement. **Do NOT** add the heavier sections from the original brief
  (separate "Selected Impact" table, "What I Build" bullet list, "Career Bridge"
  paragraph). The career-bridge idea survives as a single sentence in the hero.
- **Projects page:** A **single flat reordered list** — no academia/industry split, no
  "Research" / "Personal Projects" section headers. Production/engineering work first,
  then research papers by impact/recency.
- **Featured Work on home:** UltraPCR is featured **once** as the lead (not split into
  two cards). Curated set of 4 cards total.
- **Tech stack unchanged:** Static HTML/CSS/JS, no framework. Reuse existing
  `.project-card` styles and CSS custom properties.

## Non-goals

- No framework migration, no build step.
- No FoveaLab / consulting content mixed in (kept separate per original brief).
- No invented quantified claims. Any metric appears as a clearly marked placeholder for
  Mehdi to fill with defensible numbers.

---

## Home page (`index.html`)

### Hero
Replace current title + bio with industry-first framing.

- **Name:** Mehdi Molaei
- **Title line:** `Computational Imaging & Scientific ML for Real-World Instruments`
- **Bio (2–3 sentences):** Lead with what he builds (computational imaging + ML systems
  that turn raw microscopy / instrument data into calibrated, defensible biological
  measurements), then one sentence bridging the academic foundation (soft matter,
  biophysics, quantitative microscopy) to deployed production work at Countable Labs.
- **Keywords to weave in naturally (no stuffing):** computational imaging, scientific ML,
  quantitative microscopy, light-sheet microscopy, 3D/4D imaging, production pipelines,
  molecular counting, multiplexed decoding, physics-informed inference.
- Keep the existing photo + `.profile-block` layout.

### Compact impact line
A single line folded directly under the bio (not a separate table/strip). Contains one
placeholder metric, e.g.:

> Deployed imaging pipelines that reduced analysis from `[PLACEHOLDER: e.g. >12 h]` to
> near-real-time results.

Placeholder must be visually obvious in source (`[PLACEHOLDER: ...]`) so Mehdi can find
and edit it.

### Links row
Existing links + add **CV**. Order: Email · Google Scholar · GitHub · LinkedIn · CV.
(Email currently `m.aban.molaei@gmail.com` — flagged for Mehdi to confirm as the
preferred public contact; not changed by default.)

### Featured Work block
New section below the links row. Heading: `Featured Work`. Reuse the existing
`.project-card` visual style (thumb + body + tags + links) so it matches the Projects
page. Four cards, production first:

1. **UltraPCR — Production Imaging Pipeline for Molecular Counting**
   Computational platform converting multichannel light-sheet 3D PCR imaging into
   calibrated molecular counts with QC. Tags: Light-sheet · 3D imaging · Molecular
   counting · Scientific ML · Production. Link: bioRxiv preprint.
2. **Gold Nanorod Tracking for Membrane Mechanics**
   Polarization-resolved dark-field metrology + physics-informed inference for membrane
   bending moduli. Tags: Quantitative microscopy · Soft matter · Inference. Link: PRR
   paper. (Has a real thumbnail image: `assets/img/membrane-bending.png`.)
3. **Response Functions of Active Materials**
   Spatiotemporal correlation framework inferring mechanical response from active
   biological materials. Tags: Active matter · Microrheology · Statistical physics.
   Link: PNAS paper.
4. **Trajkit — Open-Source Trajectory Toolkit**
   Python toolkit for correlation analysis and inference from noisy particle tracking.
   Tags: Python · Open Source. Links: Code · Docs.

Each card: one-sentence problem→approach→result, tags, and a link to paper/code.

### Metadata / SEO
Add to `<head>`:
- `<title>Mehdi Molaei | Computational Imaging & Scientific ML</title>`
- `<meta name="description" content="...computational imaging, scientific ML,
  quantitative microscopy, and production biological measurement systems.">`
- Open Graph: `og:title`, `og:description` (production-grade computational imaging and ML
  for microscopy, molecular counting, and biological measurement platforms),
  `og:type=website`, `og:url`. Optional `og:image` using `assets/img/profile.jpg` if
  trivial.

---

## Projects page (`projects.html`)

Convert from two sections (Research, Personal Projects) to a **single flat list**.

- Remove both `<h2 class="section-heading">` headers and their wrapping structure so all
  cards live in one `.project-list`.
- Keep the existing page title (`Projects`).
- **New order (production/engineering first, then research by impact/recency):**
  1. UltraPCR (bioRxiv 2023)
  2. Trajkit (open source)
  3. Response Functions of Active Materials (PNAS 2023)
  4. Probing Lipid Membrane Bending Mechanics (PRR 2022)
  5. Interfacial Flow around Brownian Colloids (PRL 2021)
  6. Interfacial Microrheology / 3D-Printed Langmuir Trough (JCIS 2020)
  7. Nanoscale Rheology with Single Gold Nanorod Probes (PRL 2018)
  8. Succeed Escape: Shear Flow Promotes Tumbling (Sci. Rep. 2016)
  9. Failed Escape: Solid Surfaces Prevent Tumbling (PRL 2014)
  10. Imaging Bacterial 3D Motion with Digital Holographic Microscopy (Optics Express 2014)
- All existing card content (descriptions, tags, links) preserved verbatim; only order
  and grouping change.

---

## Accessibility & polish

- Project cards with **real images** get descriptive `alt` text (the membrane-bending
  thumbnail already does — verify/keep). Cards without images keep their clean
  placeholder div (the literal text "Thumbnail"); no fake alt text invented.
- Ensure all links have readable labels and `rel="noopener"` on `target="_blank"`.
- Verify mobile layout still works (existing responsive CSS already handles
  `.project-card` and `.profile-block`; Featured Work reuses `.project-card`, so it
  inherits the mobile rules — confirm visually).

---

## Acceptance criteria

- Home hero communicates the industry-first value proposition immediately; production
  imaging/ML work is visible without opening the CV.
- Featured Work shows 4 curated cards, UltraPCR first, styled consistently with the
  Projects page.
- Projects page is a single reordered list with no academia/industry headers; UltraPCR
  and Trajkit appear first.
- No invented metrics — any number is a visible `[PLACEHOLDER: ...]`.
- `<title>`, meta description, and OG tags present on the home page.
- Site remains minimal, readable, and visually unchanged in style (same accent color,
  column width, typography).
- Existing CSS reused; no framework introduced.

## Open items for Mehdi (post-implementation, non-blocking)

1. Fill in placeholder metric(s) with defensible numbers.
2. Confirm public contact email.
3. Optionally add real thumbnails for more project cards.
