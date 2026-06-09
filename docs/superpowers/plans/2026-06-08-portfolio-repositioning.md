# Portfolio Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the static portfolio site to lead with industry/production computational-imaging + scientific-ML work, while keeping the existing minimal style.

**Architecture:** Static HTML/CSS/JS, no framework, no build step. Edits are confined to `index.html` (hero, impact line, Featured Work, SEO meta) and `projects.html` (collapse two sections into one reordered list). All visuals reuse the existing `.project-card` styles and CSS custom properties in `assets/css/style.css` — no CSS changes required unless a Featured Work wrapper needs a heading style (reuse the projects-page `.section-heading` pattern inline).

**Tech Stack:** HTML5, existing `assets/css/style.css`, `assets/js/main.js` (mobile nav, untouched). Hosted on GitHub Pages.

**Reference spec:** `docs/superpowers/specs/2026-06-08-portfolio-repositioning-design.md`

**Verification note:** There is no test framework. "Verify" steps mean: run the given `grep` and confirm the match, and open the file in a browser to confirm layout. Commit after each task.

---

### Task 1: Rewrite the home-page hero + impact line + add CV link

**Files:**
- Modify: `index.html` (the `.profile-text` block, currently lines ~117–142)

- [ ] **Step 1: Replace the title, bio, and links-row**

In `index.html`, replace the entire `<div class="profile-text"> ... </div>` block (from `<h1>Mehdi Molaei</h1>` through the closing `</div>` of `links-row`) with:

```html
<div class="profile-text">
  <h1>Mehdi Molaei</h1>
  <p class="title">Computational Imaging &amp; Scientific ML for Real-World Instruments</p>
  <p class="bio">
    I build computational imaging and machine-learning systems that turn raw
    microscopy and instrument data into calibrated, defensible biological
    measurements. My work spans quantitative microscopy, physics-informed
    inference, and production software &mdash; from light-sheet 3D imaging and
    molecular counting to multiplexed decoding for real scientific instruments.
    A decade of soft-matter and biophysics research underpins the production
    pipelines I now build, most recently at Countable Labs.
  </p>
  <p class="bio" style="color: var(--color-text-muted);">
    <!-- PLACEHOLDER METRIC: replace bracketed text with a defensible number -->
    Deployed imaging pipelines that reduced analysis from
    [PLACEHOLDER: e.g. &gt;12&nbsp;h] to near-real-time results.
  </p>
  <div class="links-row">
    <a href="mailto:m.aban.molaei@gmail.com">
      &#9993; m.aban.molaei@gmail.com
    </a>
    <a href="https://scholar.google.com/citations?user=X3997dAAAAAJ&hl=en" target="_blank" rel="noopener">
      &#128218; Google Scholar
    </a>
    <a href="https://github.com/mehdimolaei" target="_blank" rel="noopener">
      &#128736; GitHub
    </a>
    <a href="https://www.linkedin.com/in/mehdi-molaei" target="_blank" rel="noopener">
      &#128101; LinkedIn
    </a>
    <a href="cv.html">
      &#128196; CV
    </a>
  </div>
</div>
```

- [ ] **Step 2: Verify the new copy and CV link are present**

Run: `grep -c "Computational Imaging &amp; Scientific ML for Real-World Instruments\|PLACEHOLDER METRIC\|>&#128196; CV\|&#128196; CV" index.html`
Expected: at least 3 matches (title line, placeholder comment, CV link).

Run: `grep -n "PLACEHOLDER" index.html`
Expected: one line showing the placeholder metric comment.

- [ ] **Step 3: Visual check**

Open `index.html` in a browser. Confirm: new title line under the name, two bio paragraphs (second is the muted impact line with the visible `[PLACEHOLDER...]`), and a links row ending in "CV". Photo still on the right.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: industry-first hero, impact line, CV link on home"
```

---

### Task 2: Add the Featured Work block to the home page

**Files:**
- Modify: `index.html` — insert after the `.profile-block` div closes (~line 146), still inside `<div class="container">`
- Modify: `index.html` `<head>` `<style>` — add minimal Featured Work styles reusing project-card patterns

- [ ] **Step 1: Add scoped styles for the Featured Work cards**

The home page does not currently include the `.project-card` styles (those live inline in `projects.html`). Add this block inside the existing `<style>` element in `index.html` `<head>`, just before its closing `</style>`:

```css
/* ---- Featured Work (reuses projects-page card pattern) ---- */
.section-heading {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 2.5rem 0 1.2rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--color-border);
}
.project-list { display: flex; flex-direction: column; gap: 1.5rem; }
.project-card { display: flex; gap: 1.5rem; align-items: flex-start; }
.project-thumb {
  flex-shrink: 0; width: 120px; height: 90px; border-radius: 6px;
  background: var(--color-tag-bg); border: 1px solid var(--color-border);
  overflow: hidden; display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted); font-size: 0.75rem;
}
.project-thumb img { width: 100%; height: 100%; object-fit: cover; }
.project-body { flex: 1; }
.project-title { font-size: 1rem; font-weight: 600; margin-bottom: 0.35rem; }
.project-title a { color: var(--color-text); text-decoration: none; }
.project-title a:hover { color: var(--color-accent); }
.project-desc {
  font-size: 0.92rem; color: var(--color-text-muted);
  margin-bottom: 0.6rem; line-height: 1.55;
}
.project-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
.tag {
  font-size: 0.78rem; background: var(--color-tag-bg);
  border: 1px solid var(--color-border); border-radius: 4px;
  padding: 2px 8px; color: var(--color-text-muted);
}
.project-links { display: flex; gap: 0.75rem; margin-left: 0.25rem; }
.project-links a { font-size: 0.82rem; color: var(--color-accent); text-decoration: none; }
.project-links a:hover { text-decoration: underline; }
@media (max-width: 600px) {
  .project-card { flex-direction: column; gap: 0.75rem; }
  .project-thumb { width: 100%; height: 120px; }
}
```

- [ ] **Step 2: Insert the Featured Work section**

In `index.html`, immediately after the closing `</div>` of `.profile-block` and before the closing `</div>` of `.container`, insert:

```html
<h2 class="section-heading">Featured Work</h2>
<div class="project-list">

  <div class="project-card">
    <div class="project-thumb">Thumbnail</div>
    <div class="project-body">
      <div class="project-title">
        <a href="https://www.biorxiv.org/content/10.1101/2023.07.17.549421" target="_blank" rel="noopener">
          UltraPCR &mdash; Production Imaging Pipeline for Molecular Counting
        </a>
      </div>
      <p class="project-desc">
        Built the computational analysis platform for UltraPCR, a massively parallel
        single-molecule digital PCR system. It converts multichannel light-sheet 3D
        imaging into calibrated, quality-controlled molecular counts, enabling precision
        multiplexing across 10+ targets simultaneously.
      </p>
      <div class="project-meta">
        <span class="tag">Light-sheet microscopy</span>
        <span class="tag">3D imaging</span>
        <span class="tag">Molecular counting</span>
        <span class="tag">Scientific ML</span>
        <span class="tag">Production pipeline</span>
        <div class="project-links">
          <a href="https://www.biorxiv.org/content/10.1101/2023.07.17.549421" target="_blank" rel="noopener">Preprint</a>
        </div>
      </div>
    </div>
  </div>

  <div class="project-card">
    <div class="project-thumb">
      <img src="assets/img/membrane-bending.png" alt="Polarization-resolved tracking of gold nanorods on a lipid membrane to measure bending mechanics" />
    </div>
    <div class="project-body">
      <div class="project-title">
        <a href="https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.4.013052" target="_blank" rel="noopener">
          Gold Nanorod Tracking for Membrane Mechanics
        </a>
      </div>
      <p class="project-desc">
        Developed a polarization-resolved dark-field metrology system and physics-informed
        forward models to track single gold nanorods with sub-degree angular precision,
        extracting quantitative bending moduli from model and cellular membranes.
      </p>
      <div class="project-meta">
        <span class="tag">Quantitative microscopy</span>
        <span class="tag">Soft matter</span>
        <span class="tag">Physics-informed inference</span>
        <div class="project-links">
          <a href="https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.4.013052" target="_blank" rel="noopener">Paper</a>
        </div>
      </div>
    </div>
  </div>

  <div class="project-card">
    <div class="project-thumb">Thumbnail</div>
    <div class="project-body">
      <div class="project-title">
        <a href="https://www.pnas.org/doi/abs/10.1073/pnas.2305283120" target="_blank" rel="noopener">
          Response Functions of Active Materials
        </a>
      </div>
      <p class="project-desc">
        Built a domain-general spatiotemporal correlation framework that recasts correlation
        analysis as an ensemble-averaged response function, enabling robust inference of
        mechanical properties from actomyosin networks in model systems and living cells.
      </p>
      <div class="project-meta">
        <span class="tag">Active matter</span>
        <span class="tag">Microrheology</span>
        <span class="tag">Statistical physics</span>
        <div class="project-links">
          <a href="https://www.pnas.org/doi/abs/10.1073/pnas.2305283120" target="_blank" rel="noopener">Paper</a>
        </div>
      </div>
    </div>
  </div>

  <div class="project-card">
    <div class="project-thumb">Thumbnail</div>
    <div class="project-body">
      <div class="project-title">
        <a href="https://trajkit-learn.readthedocs.io/en/latest/index.html" target="_blank" rel="noopener">
          Trajkit &mdash; Open-Source Trajectory Toolkit
        </a>
      </div>
      <p class="project-desc">
        An open-source Python toolkit for correlation analysis, ensemble averaging, and
        inference from noisy particle-tracking experiments across physical, biological,
        and engineering systems.
      </p>
      <div class="project-meta">
        <span class="tag">Python</span>
        <span class="tag">Open Source</span>
        <div class="project-links">
          <a href="https://github.com/mehdimolaei/trajkit" target="_blank" rel="noopener">Code</a>
          <a href="https://trajkit-learn.readthedocs.io/en/latest/index.html" target="_blank" rel="noopener">Docs</a>
        </div>
      </div>
    </div>
  </div>

</div><!-- /.project-list featured -->
```

- [ ] **Step 3: Verify the four cards exist and UltraPCR is first**

Run: `grep -c "project-card" index.html`
Expected: `4`

Run: `grep -n "project-title" index.html | head -1` then confirm the first card title below it is UltraPCR:
Run: `grep -n "UltraPCR &mdash; Production Imaging Pipeline" index.html`
Expected: one match, appearing before the other three card titles.

- [ ] **Step 4: Visual check**

Open `index.html`. Confirm: "Featured Work" heading, four cards in order (UltraPCR, Gold Nanorod, Response Functions, Trajkit). The Gold Nanorod card shows the membrane-bending image; the others show the "Thumbnail" placeholder. Resize narrow to confirm cards stack on mobile.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add Featured Work block to home page"
```

---

### Task 3: Add SEO + Open Graph metadata to the home page

**Files:**
- Modify: `index.html` `<head>` (currently the `<title>` is at line ~6)

- [ ] **Step 1: Replace the bare `<title>` and add meta tags**

In `index.html`, replace the line `<title>Mehdi Molaei</title>` with:

```html
<title>Mehdi Molaei | Computational Imaging &amp; Scientific ML</title>
<meta name="description" content="Mehdi Molaei builds computational imaging and scientific machine-learning systems for microscopy, molecular counting, and production biological measurement platforms." />
<meta property="og:title" content="Mehdi Molaei | Computational Imaging & Scientific ML" />
<meta property="og:description" content="Production-grade computational imaging and machine-learning systems for microscopy, molecular counting, and biological measurement platforms." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://mehdimolaei.github.io/Portfolio/index.html" />
<meta property="og:image" content="https://mehdimolaei.github.io/Portfolio/assets/img/profile.jpg" />
```

- [ ] **Step 2: Verify meta tags present**

Run: `grep -c 'property="og:' index.html`
Expected: `5`

Run: `grep -c 'name="description"' index.html`
Expected: `1`

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add SEO and Open Graph metadata to home page"
```

---

### Task 4: Collapse the Projects page into a single reordered list

**Files:**
- Modify: `projects.html` (the `<main>` content, currently lines ~150–395)

- [ ] **Step 1: Remove the two section headers and merge into one list**

In `projects.html`, the content currently is:
- `<h2 class="section-heading">Research</h2>` followed by a `.project-list` of 9 cards
- `<h2 class="section-heading">Personal Projects</h2>` followed by a `.project-list` with the Trajkit card

Restructure so there is **one** `.project-list` and **no** `section-heading` elements. Keep `<h1 class="page-title">Projects</h1>`. The new single list contains all 10 existing cards, **verbatim in content**, in this order:

1. UltraPCR (the existing bioRxiv card — currently last in the Research list)
2. Trajkit (the existing Personal Projects card)
3. Response Functions of Active Materials (PNAS 2023)
4. Probing Lipid Membrane Bending Mechanics (PRR 2022)
5. Interfacial Flow around Brownian Colloids (PRL 2021)
6. Interfacial Microrheology in a Miniature 3D-Printed Langmuir Trough (JCIS 2020)
7. Nanoscale Rheology with Single Gold Nanorod Probes (PRL 2018)
8. Succeed Escape: Shear Flow Promotes Tumbling (Sci. Rep. 2016)
9. Failed Escape: Solid Surfaces Prevent Tumbling (PRL 2014)
10. Imaging Bacterial 3D Motion with Digital Holographic Microscopy (Optics Express 2014)

Concretely: delete the two `<h2 class="section-heading">...</h2>` lines and the second `<div class="project-list">...</div>` wrapper/closing so all cards live inside the first `.project-list`. Then move the existing UltraPCR card and Trajkit card to the top of that list, and reorder the remaining research cards to match the order above. Do not edit any card's inner HTML (titles, descriptions, tags, links, images stay exactly as they are).

- [ ] **Step 2: Verify structure — one list, no headers, correct first card**

Run: `grep -c 'class="section-heading"' projects.html`
Expected: `0`

Run: `grep -c 'class="project-list"' projects.html`
Expected: `1`

Run: `grep -c 'class="project-card"' projects.html`
Expected: `10`

Run: `grep -n 'project-title' projects.html | head -1` and confirm the first card title that follows is UltraPCR:
Run: `grep -n 'UltraPCR: Massively Parallel' projects.html`
Expected: one match, and it appears before the Trajkit and all research card titles (lowest line number among card titles).

- [ ] **Step 3: Verify no card content was lost**

Run: `grep -c 'project-desc' projects.html`
Expected: `10` (one description per card).

Run: `grep -c 'Trajkit' projects.html`
Expected: at least `1`.

- [ ] **Step 4: Visual check**

Open `projects.html`. Confirm: single "Projects" title, no "Research"/"Personal Projects" subheadings, 10 cards in one continuous list, UltraPCR first and Trajkit second. Membrane-bending card still shows its image.

- [ ] **Step 5: Commit**

```bash
git add projects.html
git commit -m "refactor: single reordered Projects list, production work first"
```

---

### Task 5: Final cross-page review

**Files:** none modified (review only; fix-forward if an issue is found)

- [ ] **Step 1: Confirm all internal links resolve**

Run: `grep -o 'href="[a-z]*\.html"' index.html projects.html cv.html | sort -u`
Expected: only `index.html`, `projects.html`, `cv.html` appear — no broken internal targets.

- [ ] **Step 2: Confirm every external link has rel="noopener"**

Run: `grep -n 'target="_blank"' index.html projects.html | grep -vc 'rel="noopener"'`
Expected: `0` (every `target="_blank"` also has `rel="noopener"`).

- [ ] **Step 3: Confirm placeholder metric is still visible for Mehdi to edit**

Run: `grep -c "PLACEHOLDER" index.html`
Expected: `1`

- [ ] **Step 4: Visual pass on mobile widths**

Open both pages, narrow the window below 600px. Confirm the nav toggle works, the profile block stacks (photo above text), and project cards stack vertically.

- [ ] **Step 5: Commit any fixes (skip if none)**

```bash
git add -A
git commit -m "fix: cross-page link and accessibility review"
```

---

## Notes for the implementing session

- **Do not invent metrics.** The single `[PLACEHOLDER: ...]` line in `index.html` is intentional — leave it for Mehdi to fill.
- **Do not restyle.** Keep the existing accent color, 800px column, and typography. Featured Work intentionally reuses the projects-page card styles.
- **Email** `m.aban.molaei@gmail.com` is kept as-is; Mehdi will confirm the preferred public contact separately.
- Do not push or enable Pages — Mehdi handles deploy.
