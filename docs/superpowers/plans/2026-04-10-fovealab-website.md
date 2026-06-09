# Fovea Lab Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the Fovea Lab LLC website at fovealab.com — a 4-page professional marketing site using Hugo, custom CSS, and Netlify.

**Architecture:** Hugo static site with no third-party theme. All layouts live in `layouts/`. A single `static/css/style.css` handles all styles. Each page has a dedicated layout file to keep templates focused. Content is Markdown files in `content/`. Netlify auto-deploys from `main` branch on every git push. Netlify Forms handles the contact form with zero backend.

**Tech Stack:** Hugo ≥ 0.124.0, HTML5, CSS3 (no framework), Google Fonts (DM Serif Display + DM Sans), Netlify (hosting + forms), GitHub (version control).

---

## File Map

```
fovealab.com/                          ← project root / git repo
├── config.toml                        ← Hugo site config (title, baseURL, nav menu, params)
├── netlify.toml                       ← Netlify build config (Hugo version, publish dir)
├── .gitignore                         ← ignore /public/, /resources/
├── content/
│   ├── _index.md                      ← Home page (triggers layouts/index.html)
│   ├── solutions.md                   ← Solutions page (front matter: layout: solutions)
│   ├── work-with-us.md                ← Work With Us page (front matter: layout: work-with-us)
│   └── lab-notes/
│       ├── _index.md                  ← Lab Notes index (triggers layouts/_default/list.html)
│       └── why-microscopy-needs-verified-outputs.md  ← example post
├── layouts/
│   ├── index.html                     ← Home page template
│   ├── _default/
│   │   ├── baseof.html                ← Base shell: <html>, <head>, nav, footer, main block
│   │   ├── solutions.html             ← Solutions page template
│   │   ├── work-with-us.html          ← Work With Us page template
│   │   ├── list.html                  ← Lab Notes index template
│   │   └── single.html                ← Individual Lab Notes post template
│   └── partials/
│       ├── head.html                  ← <meta>, fonts, CSS link, title
│       ├── nav.html                   ← Sticky nav with active-state logic
│       └── footer.html                ← Footer with nav links
└── static/
    └── css/
        └── style.css                  ← All styles (design tokens, shared, per-page)
```

**Hugo template lookup:** When a content file sets `layout: solutions` in its front matter, Hugo looks for `layouts/_default/solutions.html`. Lab Notes posts automatically use `layouts/_default/single.html`. The Lab Notes index (`_index.md`) automatically uses `layouts/_default/list.html`. The home page (`_index.md` at root) uses `layouts/index.html`.

---

## Task 1: Environment Setup & Project Scaffold

**Files:**
- Create: `/Users/mehdi/Documents/Github/FoveaLabWebsite/` (project root)

- [ ] **Step 1: Install Hugo**

```bash
brew install hugo
hugo version
```

Expected output contains: `hugo v0.1` (any recent version)

- [ ] **Step 2: Create Hugo site**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
hugo new site . --force
```

Expected output: `Congratulations! Your new Hugo site was created in ...`

This creates the Hugo directory structure: `content/`, `layouts/`, `static/`, `themes/`, `archetypes/`, and `hugo.toml`.

- [ ] **Step 3: Remove the default config and unused directories**

Hugo creates `hugo.toml` by default. We'll replace it with `config.toml` (TOML format, same thing, cleaner name). Delete the default file and unused dirs:

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
rm -f hugo.toml
rm -rf themes/ archetypes/
mkdir -p static/css static/images layouts/partials layouts/_default content/lab-notes
```

- [ ] **Step 4: Initialize git repo**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git init
git branch -M main
```

- [ ] **Step 5: Create .gitignore**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/.gitignore`:

```
/public/
/resources/
.hugo_build.lock
.DS_Store
```

- [ ] **Step 6: Commit scaffold**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git add .
git commit -m "chore: initialize Hugo project scaffold"
```

---

## Task 2: Site Configuration

**Files:**
- Create: `config.toml`
- Create: `netlify.toml`

- [ ] **Step 1: Create config.toml**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/config.toml`:

```toml
baseURL = "https://fovealab.com/"
languageCode = "en-us"
title = "Fovea Lab"

[params]
  description = "Precision computational microscopy infrastructure — turning imaging experiments into verified, audit-ready scientific measurements."
  email = "hello@fovealab.com"

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
```

The `unsafe = true` allows HTML in Markdown files — useful for Lab Notes posts that might embed figures or callouts.

- [ ] **Step 2: Create netlify.toml**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/netlify.toml`:

```toml
[build]
  command = "hugo --minify"
  publish = "public"

[build.environment]
  HUGO_VERSION = "0.124.0"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

- [ ] **Step 3: Verify Hugo can build**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
hugo server
```

Open http://localhost:1313 in the browser. Expected: a blank white page (no content yet — that's correct). Press Ctrl+C to stop.

- [ ] **Step 4: Commit configuration**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git add config.toml netlify.toml
git commit -m "chore: add Hugo and Netlify configuration"
```

---

## Task 3: Complete CSS Design System

**Files:**
- Create: `static/css/style.css`

This single file contains all styles for all pages. Sections are clearly commented.

- [ ] **Step 1: Create style.css**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/static/css/style.css`:

```css
/* ============================================================
   FOVEA LAB — style.css
   Single stylesheet. Sections:
   1. Design tokens (CSS variables)
   2. Reset & base
   3. Typography
   4. Nav
   5. Footer
   6. Shared components (buttons, eyebrow, section headers, cards)
   7. Home page
   8. Solutions page
   9. Lab Notes (index + post)
   10. Work With Us (form)
   11. Media queries (mobile)
   ============================================================ */


/* ============================================================
   1. DESIGN TOKENS
   ============================================================ */
:root {
  --navy:        #0f2347;
  --navy-mid:    #1a3a6b;
  --blue:        #3a6fc7;
  --blue-light:  #e8edf8;
  --bg:          #f7f9fc;
  --white:       #ffffff;
  --text:        #0d1f3c;
  --muted:       #5a6a82;
  --border:      #dde4ef;

  --font-serif:  'DM Serif Display', Georgia, serif;
  --font-sans:   'DM Sans', system-ui, sans-serif;

  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   12px;

  --section-pad: 72px 48px;
  --container:   1100px;
  --container-wide: 1200px;
}


/* ============================================================
   2. RESET & BASE
   ============================================================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }

a { color: var(--blue); }


/* ============================================================
   3. TYPOGRAPHY
   ============================================================ */
h1, h2, h3, h4 {
  font-family: var(--font-serif);
  font-weight: 400;
  line-height: 1.2;
  color: var(--navy);
}

h1 { font-size: 40px; }
h2 { font-size: 30px; }
h3 { font-size: 22px; }
h4 { font-size: 17px; }

p { line-height: 1.65; }


/* ============================================================
   4. NAV
   ============================================================ */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--white);
  border-bottom: 1px solid var(--border);
  height: 64px;
  padding: 0 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: var(--font-serif);
  font-size: 20px;
  color: var(--navy);
  text-decoration: none;
}
.nav-logo span { color: var(--blue); }

.nav-links {
  display: flex;
  gap: 32px;
  align-items: center;
  list-style: none;
}

.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.15s;
}

.nav-links a:hover { color: var(--navy); }
.nav-links a.active { color: var(--navy); font-weight: 600; }

.nav-cta {
  background: var(--navy) !important;
  color: var(--white) !important;
  padding: 8px 20px;
  border-radius: var(--radius-sm);
  font-weight: 600 !important;
  font-size: 13px !important;
  transition: background 0.15s !important;
}
.nav-cta:hover { background: var(--navy-mid) !important; }


/* ============================================================
   5. FOOTER
   ============================================================ */
.site-footer {
  background: var(--navy);
  color: #a0b4cc;
  padding: 36px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  gap: 24px;
  flex-wrap: wrap;
}

.footer-logo {
  font-family: var(--font-serif);
  color: var(--white);
  font-size: 18px;
  text-decoration: none;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: #7aaee8;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.15s;
}
.footer-links a:hover { color: var(--white); }


/* ============================================================
   6. SHARED COMPONENTS
   ============================================================ */

/* Container */
.container {
  max-width: var(--container);
  margin: 0 auto;
}
.container-wide {
  max-width: var(--container-wide);
  margin: 0 auto;
}

/* Section wrapper */
.section {
  padding: var(--section-pad);
}
.section--white { background: var(--white); border-bottom: 1px solid var(--border); }
.section--gray  { background: var(--bg); }
.section--navy  { background: var(--navy); }
.section--blue  { background: var(--blue-light); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

/* Eyebrow label */
.eyebrow {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--blue);
  font-weight: 600;
  margin-bottom: 12px;
  font-family: var(--font-sans);
}
.section--navy .eyebrow { color: #7aaee8; }

/* Section heading block */
.section-title {
  font-family: var(--font-serif);
  font-size: 30px;
  color: var(--navy);
  margin-bottom: 12px;
}
.section--navy .section-title { color: var(--white); }

.section-sub {
  font-size: 16px;
  color: var(--muted);
  line-height: 1.65;
  max-width: 560px;
  margin-bottom: 48px;
}
.section--navy .section-sub { color: #a0b4cc; }

/* Buttons */
.btn-primary {
  display: inline-block;
  background: var(--navy);
  color: var(--white);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
}
.btn-primary:hover { background: var(--navy-mid); color: var(--white); }

.btn-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--navy);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}
.btn-text:hover { color: var(--blue); }


/* ============================================================
   7. HOME PAGE
   ============================================================ */

/* Hero */
.hero {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  padding: 80px 48px 72px;
}
.hero-inner {
  max-width: var(--container-wide);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.hero-eyebrow {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--blue);
  font-weight: 600;
  margin-bottom: 16px;
  font-family: var(--font-sans);
}

.hero h1 {
  font-size: 42px;
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: 20px;
}

.hero h1 em {
  font-style: normal;
  color: var(--blue);
  border-bottom: 2px solid var(--blue);
  padding-bottom: 1px;
}

.hero-sub {
  font-size: 16px;
  color: var(--muted);
  line-height: 1.65;
  margin-bottom: 32px;
  max-width: 440px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

/* Pipeline diagram (hero right side) */
.hero-visual {
  background: var(--blue-light);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pipeline-step {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.step-icon--blue  { background: var(--blue-light); }
.step-icon--green { background: #e6f4ea; }
.step-icon--amber { background: #fef9e8; }

.step-text { flex: 1; }
.step-label { font-weight: 600; color: var(--navy); font-size: 13px; }
.step-sub   { color: var(--muted); font-size: 11px; }

.step-badge {
  font-size: 10px;
  padding: 3px 9px;
  border-radius: 10px;
  font-weight: 600;
  flex-shrink: 0;
}
.badge-blue  { background: var(--blue-light); color: var(--navy-mid); }
.badge-green { background: #e6f4ea; color: #1e6e34; }

.pipeline-arrow {
  text-align: center;
  color: var(--blue);
  font-size: 16px;
  line-height: 1;
  padding: 2px 0;
}

/* Problem section */
.problem-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.problem-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 24px;
}

.problem-icon {
  font-size: 24px;
  margin-bottom: 12px;
  display: block;
}

.problem-card h4 {
  margin-bottom: 8px;
}

.problem-card p {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
}

/* Home solutions teaser (dark) */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.pillar-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--radius-md);
  padding: 24px;
}

.pillar-num {
  font-size: 11px;
  color: #7aaee8;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 10px;
  font-family: var(--font-sans);
}

.pillar-card h4 { color: var(--white); margin-bottom: 8px; }
.pillar-card p  { font-size: 13px; color: #a0b4cc; line-height: 1.6; }

/* Home CTA strip */
.cta-strip {
  text-align: center;
}
.cta-strip .section-sub { margin: 0 auto 32px; }
.cta-email {
  margin-top: 16px;
  font-size: 14px;
  color: var(--muted);
}
.cta-email a { color: var(--blue); text-decoration: none; font-weight: 500; }


/* ============================================================
   8. SOLUTIONS PAGE
   ============================================================ */

/* Page header (shared by Solutions and Work With Us) */
.page-header {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  padding: 64px 48px 56px;
}
.page-header h1 { font-size: 38px; max-width: 640px; margin-bottom: 16px; }
.page-header .lead { font-size: 17px; color: var(--muted); line-height: 1.65; max-width: 580px; }

/* Paradigm table */
.paradigm {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 48px;
}

.paradigm-header {
  display: grid;
  grid-template-columns: 1fr 1.4fr 2fr;
  background: var(--navy);
  padding: 14px 24px;
  font-size: 12px;
  font-weight: 600;
  color: #a0b8d8;
  letter-spacing: 0.05em;
  font-family: var(--font-sans);
}

.paradigm-row {
  display: grid;
  grid-template-columns: 1fr 1.4fr 2fr;
  padding: 14px 24px;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  align-items: center;
  gap: 8px;
}
.paradigm-row:last-child { border-bottom: none; }
.paradigm-row:nth-child(even) { background: var(--bg); }

.paradigm-row--highlight {
  background: var(--blue-light) !important;
}

.paradigm-instrument { color: var(--navy); font-weight: 600; }
.paradigm-raw        { color: var(--muted); }
.paradigm-output     { color: #1a6e34; font-weight: 500; }
.paradigm-row--highlight .paradigm-instrument { color: var(--blue); }
.paradigm-row--highlight .paradigm-output     { color: var(--blue); font-weight: 700; }

/* Solutions pillars (light bg, 2-column) */
.pillars-grid--light {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.pillar-card--light {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 28px;
  display: flex;
  gap: 18px;
}

.pillar-badge {
  width: 36px;
  height: 36px;
  background: var(--blue-light);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--blue);
  flex-shrink: 0;
  font-family: var(--font-sans);
}

.pillar-card--light h4 { margin-bottom: 6px; }
.pillar-card--light p  { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* Modalities */
.modality-groups {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.modality-group-title {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7aaee8;
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  font-family: var(--font-sans);
}

.modality-item {
  font-size: 13px;
  color: #c8d8ec;
  padding: 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  line-height: 1.4;
}
.modality-item:last-child { border-bottom: none; }


/* ============================================================
   9. LAB NOTES
   ============================================================ */

/* Index: post card grid */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.post-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: box-shadow 0.15s, transform 0.15s;
  text-decoration: none;
  display: block;
  color: inherit;
}
.post-card:hover {
  box-shadow: 0 6px 24px rgba(15, 35, 71, 0.10);
  transform: translateY(-2px);
}

.post-thumb {
  height: 130px;
  background: var(--blue-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  border-bottom: 1px solid var(--border);
}

.post-body { padding: 20px; }

.post-tag {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--blue);
  font-weight: 600;
  margin-bottom: 8px;
  font-family: var(--font-sans);
}

.post-title {
  font-family: var(--font-serif);
  font-size: 17px;
  color: var(--navy);
  line-height: 1.3;
  margin-bottom: 8px;
}

.post-excerpt {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 14px;
}

.post-meta {
  font-size: 11px;
  color: #8a9ab5;
  display: flex;
  justify-content: space-between;
  font-family: var(--font-sans);
}

/* Individual post */
.post-content {
  max-width: 680px;
  margin: 0 auto;
  padding: 56px 48px 80px;
}

.post-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--blue);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 32px;
}
.post-back:hover { color: var(--navy); }

.post-header { margin-bottom: 40px; }

.post-header .post-tag { margin-bottom: 12px; }

.post-header h1 {
  font-size: 34px;
  margin-bottom: 16px;
  line-height: 1.2;
}

.post-header .post-meta { justify-content: flex-start; gap: 16px; }

.post-body-content h2 { font-size: 24px; margin: 40px 0 12px; }
.post-body-content h3 { font-size: 19px; margin: 32px 0 10px; }
.post-body-content p  { margin-bottom: 20px; font-size: 16px; line-height: 1.75; }
.post-body-content ul, .post-body-content ol {
  margin: 0 0 20px 24px;
  font-size: 16px;
  line-height: 1.75;
}
.post-body-content li { margin-bottom: 6px; }
.post-body-content code {
  background: var(--blue-light);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  font-family: 'Courier New', monospace;
}
.post-body-content pre {
  background: var(--navy);
  color: #c8d8ec;
  padding: 20px;
  border-radius: var(--radius-sm);
  overflow-x: auto;
  margin-bottom: 20px;
}
.post-body-content pre code {
  background: none;
  color: inherit;
  padding: 0;
}
.post-body-content blockquote {
  border-left: 3px solid var(--blue);
  margin: 24px 0;
  padding: 12px 20px;
  background: var(--blue-light);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-style: italic;
  color: var(--muted);
}


/* ============================================================
   10. WORK WITH US (FORM)
   ============================================================ */

.form-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

.form-info h2 { font-size: 26px; margin-bottom: 14px; }

.form-info > p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 20px;
}

.form-steps {
  list-style: none;
  margin-bottom: 28px;
}

.form-steps li {
  font-size: 13px;
  color: var(--muted);
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.form-steps li::before {
  content: "→";
  color: var(--blue);
  font-weight: 600;
  flex-shrink: 0;
}

.form-email-box {
  padding: 20px;
  background: var(--blue-light);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}

.form-email-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--navy);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
  font-family: var(--font-sans);
}

.form-email-value {
  font-size: 14px;
  color: var(--blue);
}

/* The form card */
.contact-form-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 36px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.form-group { margin-bottom: 20px; }

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--navy);
  margin-bottom: 6px;
  letter-spacing: 0.04em;
  font-family: var(--font-sans);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--text);
  font-family: var(--font-sans);
  background: var(--bg);
  transition: border-color 0.15s, background 0.15s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--blue);
  background: var(--white);
}

.form-group textarea {
  resize: vertical;
  min-height: 110px;
  line-height: 1.6;
}

.form-submit {
  width: 100%;
  padding: 13px;
  background: var(--navy);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: background 0.15s;
  margin-top: 8px;
}
.form-submit:hover { background: var(--navy-mid); }

.form-note {
  font-size: 11px;
  color: #8a9ab5;
  text-align: center;
  margin-top: 12px;
  line-height: 1.5;
}


/* ============================================================
   11. MEDIA QUERIES (MOBILE)
   ============================================================ */

@media (max-width: 900px) {
  :root {
    --section-pad: 48px 24px;
  }

  /* Nav */
  .site-nav { padding: 0 24px; }
  .nav-links { gap: 16px; }

  /* Hero */
  .hero { padding: 48px 24px; }
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero h1 { font-size: 32px; }
  .hero-sub { max-width: 100%; }

  /* Grids → single column */
  .problem-grid,
  .pillars-grid,
  .pillars-grid--light,
  .modality-groups,
  .posts-grid {
    grid-template-columns: 1fr;
  }

  /* Page header */
  .page-header { padding: 40px 24px 36px; }
  .page-header h1 { font-size: 28px; }

  /* Paradigm table */
  .paradigm-header,
  .paradigm-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .paradigm-header span:not(:first-child),
  .paradigm-row > *:not(:first-child) { display: none; }

  /* Post content */
  .post-content { padding: 32px 24px 56px; }

  /* Form layout */
  .form-layout { grid-template-columns: 1fr; gap: 40px; }
  .form-row { grid-template-columns: 1fr; }

  /* Footer */
  .site-footer {
    flex-direction: column;
    text-align: center;
    gap: 16px;
    padding: 32px 24px;
  }
}

@media (max-width: 600px) {
  h1 { font-size: 28px; }
  h2 { font-size: 24px; }

  .hero h1 { font-size: 26px; }
  .hero-actions { flex-direction: column; align-items: flex-start; }

  /* Nav: hide text links on very small screens, keep logo + CTA */
  .nav-links li:not(:last-child) { display: none; }

  .pillars-grid { grid-template-columns: 1fr; }

  .contact-form-card { padding: 24px; }
}
```

- [ ] **Step 2: Verify CSS file is present**

```bash
ls /Users/mehdi/Documents/Github/FoveaLabWebsite/static/css/style.css
```

Expected: file path is printed (no "not found" error).

- [ ] **Step 3: Commit CSS**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git add static/css/style.css
git commit -m "feat: add complete CSS design system"
```

---

## Task 4: Base Templates (head, nav, footer, baseof)

**Files:**
- Create: `layouts/partials/head.html`
- Create: `layouts/partials/nav.html`
- Create: `layouts/partials/footer.html`
- Create: `layouts/_default/baseof.html`

These four files are the shared shell wrapping every page. All other templates extend `baseof.html` using Hugo's `{{ define "main" }}` block syntax.

- [ ] **Step 1: Create head.html**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/layouts/partials/head.html`:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{{ with .Description }}{{ . }}{{ else }}{{ .Site.Params.description }}{{ end }}">
<title>{{ if .IsHome }}{{ .Site.Title }} — Precision Computational Microscopy{{ else }}{{ .Title }} · {{ .Site.Title }}{{ end }}</title>

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">

<!-- Stylesheet -->
<link rel="stylesheet" href="/css/style.css">
```

- [ ] **Step 2: Create nav.html**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/layouts/partials/nav.html`:

```html
<nav class="site-nav">
  <a href="/" class="nav-logo">Fovea<span>Lab</span></a>
  <ul class="nav-links">
    <li>
      <a href="/"{{ if .IsHome }} class="active"{{ end }}>Home</a>
    </li>
    <li>
      <a href="/solutions/"{{ if eq .RelPermalink "/solutions/" }} class="active"{{ end }}>Solutions</a>
    </li>
    <li>
      <a href="/lab-notes/"{{ if eq .Section "lab-notes" }} class="active"{{ end }}>Lab Notes</a>
    </li>
    <li>
      <a href="/work-with-us/" class="nav-cta">Work With Us</a>
    </li>
  </ul>
</nav>
```

- [ ] **Step 3: Create footer.html**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/layouts/partials/footer.html`:

```html
<footer class="site-footer">
  <a href="/" class="footer-logo">FoveaLab</a>
  <div>© {{ now.Year }} Fovea Lab LLC &middot; Precision Computational Microscopy</div>
  <nav class="footer-links">
    <a href="/solutions/">Solutions</a>
    <a href="/lab-notes/">Lab Notes</a>
  </nav>
</footer>
```

- [ ] **Step 4: Create baseof.html**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/layouts/_default/baseof.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  {{ partial "head.html" . }}
</head>
<body>
  {{ partial "nav.html" . }}
  {{ block "main" . }}{{ end }}
  {{ partial "footer.html" . }}
</body>
</html>
```

- [ ] **Step 5: Verify templates load**

Create a temporary `content/_index.md` to test (will be replaced in Task 5):

```bash
echo '---
title: "Home"
---' > /Users/mehdi/Documents/Github/FoveaLabWebsite/content/_index.md
```

Run the dev server:

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
hugo server
```

Open http://localhost:1313. Expected: page with nav (FoveaLab logo + links) and footer visible. Body is empty — that's correct, no template for main content yet. Press Ctrl+C.

- [ ] **Step 6: Commit templates**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git add layouts/
git commit -m "feat: add base templates (head, nav, footer, baseof)"
```

---

## Task 5: Home Page

**Files:**
- Create: `layouts/index.html`
- Modify: `content/_index.md`

- [ ] **Step 1: Create the home page layout**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/layouts/index.html`:

```html
{{ define "main" }}

<!-- HERO -->
<section class="hero">
  <div class="hero-inner container-wide">
    <div class="hero-copy">
      <div class="hero-eyebrow">Precision Computational Microscopy</div>
      <h1>Microscopy images<br>are raw data.<br>We deliver <em>verified</em><br>measurements.</h1>
      <p class="hero-sub">Fovea Lab builds precision pipeline infrastructure for academic labs, core facilities, and pharma R&amp;D — with built-in QC, uncertainty quantification, and full audit trails.</p>
      <div class="hero-actions">
        <a href="/work-with-us/" class="btn-primary">Work With Us</a>
        <a href="/solutions/" class="btn-text">Our Approach →</a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="pipeline-step">
        <div class="step-icon step-icon--blue">🔬</div>
        <div class="step-text">
          <div class="step-label">Raw Acquisition</div>
          <div class="step-sub">Confocal · Light-sheet · Custom systems</div>
        </div>
      </div>
      <div class="pipeline-arrow">↓</div>
      <div class="pipeline-step">
        <div class="step-icon step-icon--green">⚙️</div>
        <div class="step-text">
          <div class="step-label">Pipeline Processing</div>
          <div class="step-sub">Segmentation · Analysis · QC validation</div>
        </div>
        <span class="step-badge badge-blue">Automated</span>
      </div>
      <div class="pipeline-arrow">↓</div>
      <div class="pipeline-step">
        <div class="step-icon step-icon--amber">📊</div>
        <div class="step-text">
          <div class="step-label">Verified Measurements</div>
          <div class="step-sub">Structured data · Confidence scores · Audit trail</div>
        </div>
        <span class="step-badge badge-green">Verified ✓</span>
      </div>
    </div>
  </div>
</section>

<!-- PROBLEM -->
<section class="section section--gray">
  <div class="container">
    <div class="eyebrow">The Problem</div>
    <h2 class="section-title">Every lab reinvents the wheel</h2>
    <p class="section-sub">Advanced microscopy systems produce the most scientifically novel data — and have the weakest pipeline support. Researchers are left stitching together fragmented tools with no verifiability layer.</p>
    <div class="problem-grid">
      <div class="problem-card">
        <span class="problem-icon">🧩</span>
        <h4>Fragmented Toolchains</h4>
        <p>Acquisition, management, and analysis software are siloed — manually stitched together in error-prone, undocumented ways that rarely survive the next lab rotation.</p>
      </div>
      <div class="problem-card">
        <span class="problem-icon">❓</span>
        <h4>No Verifiability Layer</h4>
        <p>AI segmentation tools produce outputs with no confidence scores, no QC reports, and no audit trail. A researcher can assert results — they cannot demonstrate them.</p>
      </div>
      <div class="problem-card">
        <span class="problem-icon">🔄</span>
        <h4>Reproducibility Gap</h4>
        <p>Pipelines built ad hoc are rarely documented well enough for replication, regulatory filing, or journal review. The same experiment run twice produces inconsistent outputs.</p>
      </div>
    </div>
  </div>
</section>

<!-- SOLUTIONS TEASER -->
<section class="section section--navy">
  <div class="container">
    <div class="eyebrow">Our Approach</div>
    <h2 class="section-title">The instrument paradigm</h2>
    <p class="section-sub">Flow cytometers and mass spectrometers don't produce images — they produce verified, structured measurements. We bring the same precision to quantitative microscopy.</p>
    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-num">01</div>
        <h4>Verified Outputs</h4>
        <p>Structured quantitative data — not images. Cell counts, morphology, colocalization — with confidence intervals.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-num">02</div>
        <h4>Uncertainty Quantification</h4>
        <p>Per-object confidence scores, calibration curves, and explicit flags for out-of-distribution inputs.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-num">03</div>
        <h4>Automated QC</h4>
        <p>Validation against controls, artifact detection, and structured pass/fail reports — before results are released.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-num">04</div>
        <h4>Full Audit Trail</h4>
        <p>Every output linked to the exact pipeline version, model weights, and acquisition metadata that produced it.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-num">05</div>
        <h4>Modality-Agnostic</h4>
        <p>Confocal, light-sheet, dark-field, holographic, SMLM, CARS, and custom-engineered systems — one framework.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-num">06</div>
        <h4>Custom Instrument Focus</h4>
        <p>Purpose-built support for lab-built systems — the instruments with the most novel science and weakest software.</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA STRIP -->
<section class="section section--blue cta-strip">
  <div class="container">
    <div class="eyebrow">Get In Touch</div>
    <h2 class="section-title">Ready to build a pipeline that holds up?</h2>
    <p class="section-sub">Whether you're running a core facility, managing a pharma imaging workflow, or operating a custom-built system with no existing software ecosystem — we'd like to hear about your setup.</p>
    <a href="/work-with-us/" class="btn-primary" style="font-size:15px; padding:14px 32px;">Work With Us</a>
    <div class="cta-email">Or reach us at <a href="mailto:{{ .Site.Params.email }}">{{ .Site.Params.email }}</a></div>
  </div>
</section>

{{ end }}
```

- [ ] **Step 2: Update content/_index.md**

Replace the contents of `/Users/mehdi/Documents/Github/FoveaLabWebsite/content/_index.md`:

```markdown
---
title: "Fovea Lab"
description: "Precision computational microscopy infrastructure — turning imaging experiments into verified, audit-ready scientific measurements."
---
```

- [ ] **Step 3: Verify home page in browser**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
hugo server
```

Open http://localhost:1313. Check:
- Nav: "FoveaLab" logo, Home (active/bold), Solutions, Lab Notes, "Work With Us" navy button
- Hero: bold headline with "verified" underlined in blue, pipeline diagram on the right
- Problem section: gray background, 3 cards
- Solutions teaser: dark navy background, 6 pillar cards
- CTA strip: light blue, "Work With Us" button, email below
- Footer: navy background

Press Ctrl+C.

- [ ] **Step 4: Commit**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git add layouts/index.html content/_index.md
git commit -m "feat: add home page layout and content"
```

---

## Task 6: Solutions Page

**Files:**
- Create: `layouts/_default/solutions.html`
- Create: `content/solutions.md`

- [ ] **Step 1: Create solutions layout**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/layouts/_default/solutions.html`:

```html
{{ define "main" }}

<!-- PAGE HEADER -->
<div class="page-header">
  <div class="container">
    <div class="eyebrow">Our Approach</div>
    <h1>The measurement infrastructure microscopy has been missing</h1>
    <p class="lead">Most microscopy software treats the image as the end product. We treat it as raw input — and deliver verified, structured, audit-ready scientific measurements.</p>
  </div>
</div>

<!-- PARADIGM TABLE -->
<section class="section section--white">
  <div class="container">
    <div class="eyebrow">The Paradigm Shift</div>
    <h2 class="section-title">Other precision instruments already work this way</h2>
    <p class="section-sub">Flow cytometers don't hand you scattered light — they hand you cell counts with QC reports. Fovea Lab brings the same rigor to quantitative microscopy.</p>
    <div class="paradigm">
      <div class="paradigm-header">
        <span>Instrument</span>
        <span>Raw Input</span>
        <span>Structured Output</span>
      </div>
      <div class="paradigm-row">
        <span class="paradigm-instrument">Flow Cytometer</span>
        <span class="paradigm-raw">Scattered / emitted light</span>
        <span class="paradigm-output">Cell counts, % positive, MFI — with QC report</span>
      </div>
      <div class="paradigm-row">
        <span class="paradigm-instrument">Mass Spectrometer</span>
        <span class="paradigm-raw">Ion signal</span>
        <span class="paradigm-output">Peptide table with confidence scores</span>
      </div>
      <div class="paradigm-row">
        <span class="paradigm-instrument">DNA Sequencer</span>
        <span class="paradigm-raw">Fluorescence signal</span>
        <span class="paradigm-output">FASTQ reads with per-base quality scores</span>
      </div>
      <div class="paradigm-row paradigm-row--highlight">
        <span class="paradigm-instrument">Fovea Lab</span>
        <span class="paradigm-raw">Microscopy image</span>
        <span class="paradigm-output">Structured measurements · confidence intervals · provenance · QC report</span>
      </div>
    </div>
  </div>
</section>

<!-- SIX PILLARS -->
<section class="section section--gray">
  <div class="container">
    <div class="eyebrow">Six Pillars of Precision</div>
    <h2 class="section-title">What every Fovea Lab pipeline delivers</h2>
    <p class="section-sub">These are not optional add-ons. They are the baseline for what we consider a production-grade measurement pipeline.</p>
    <div class="pillars-grid--light">
      <div class="pillar-card--light">
        <div class="pillar-badge">01</div>
        <div>
          <h4>Verified Quantitative Outputs</h4>
          <p>Cell counts with confidence intervals, morphological measurements, spatial statistics — as CSV, JSON, OME-XML, or LIMS-compatible formats. The measurement, not the image, is the deliverable.</p>
        </div>
      </div>
      <div class="pillar-card--light">
        <div class="pillar-badge">02</div>
        <div>
          <h4>Uncertainty Quantification</h4>
          <p>Per-object confidence scores, model calibration curves, and explicit flags for out-of-distribution inputs. Not just a number — a number with a known error bar and a model confidence rating.</p>
        </div>
      </div>
      <div class="pillar-card--light">
        <div class="pillar-badge">03</div>
        <div>
          <h4>Automated QC &amp; Validation</h4>
          <p>Built-in comparison against positive and negative controls, artifact detection (focus drift, photobleaching, saturation), batch effect checks, and a structured pass/fail report before results are released.</p>
        </div>
      </div>
      <div class="pillar-card--light">
        <div class="pillar-badge">04</div>
        <div>
          <h4>Provenance &amp; Audit Trail</h4>
          <p>Every output cryptographically linked to the exact pipeline version, model weights, acquisition metadata, and input files that produced it. GxP-compatible, 21 CFR Part 11 aligned.</p>
        </div>
      </div>
      <div class="pillar-card--light">
        <div class="pillar-badge">05</div>
        <div>
          <h4>Standardized Measurement Schemas</h4>
          <p>Structured schemas for common assay classes: cell viability, nuclear morphology, organelle count, protein colocalization, spheroid geometry, migration tracking. Machine-readable, LIMS-ingestible.</p>
        </div>
      </div>
      <div class="pillar-card--light">
        <div class="pillar-badge">06</div>
        <div>
          <h4>Cross-Modality Consistency</h4>
          <p>Calibration layers so a cell count produced on a confocal is comparable to one produced on a light-sheet or widefield system for the same sample. Critical for multi-site pharma studies.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- MODALITIES -->
<section class="section section--navy">
  <div class="container">
    <div class="eyebrow">Supported Systems</div>
    <h2 class="section-title">Built for every modality — including yours</h2>
    <p class="section-sub">Especially custom-engineered instruments. The systems producing the most scientifically novel data, with the weakest existing software ecosystem. That is where we focus.</p>
    <div class="modality-groups">
      <div>
        <div class="modality-group-title">Fluorescence</div>
        <div class="modality-item">Confocal Laser Scanning (CLSM)</div>
        <div class="modality-item">Spinning Disk Confocal</div>
        <div class="modality-item">Two-Photon Excitation</div>
        <div class="modality-item">Light-Sheet / SPIM / LLSM</div>
        <div class="modality-item">TIRF</div>
        <div class="modality-item">STORM / PALM / SMLM</div>
        <div class="modality-item">STED</div>
        <div class="modality-item">Structured Illumination (SIM)</div>
      </div>
      <div>
        <div class="modality-group-title">Label-Free &amp; Advanced</div>
        <div class="modality-item">Dark-Field Microscopy</div>
        <div class="modality-item">Digital Holographic (DHM)</div>
        <div class="modality-item">Quantitative Phase (QPI)</div>
        <div class="modality-item">CARS / SRS</div>
        <div class="modality-item">DIC &amp; Phase Contrast</div>
        <div class="modality-item">Oblique Plane (OPM)</div>
        <div class="modality-item">Polarization Microscopy</div>
      </div>
      <div>
        <div class="modality-group-title">Custom &amp; Correlative</div>
        <div class="modality-item">Custom-Engineered Systems</div>
        <div class="modality-item">CLEM (pipeline integration)</div>
        <div class="modality-item">Cryo-EM (data integration)</div>
        <div class="modality-item">Synchrotron X-ray Tomography</div>
        <div class="modality-item">Any Python-controllable instrument</div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section section--blue cta-strip">
  <div class="container">
    <h2 class="section-title">Tell us about your system</h2>
    <p class="section-sub">We work with labs running standard platforms and completely custom-built instruments. No pipeline is too bespoke.</p>
    <a href="/work-with-us/" class="btn-primary">Work With Us</a>
  </div>
</section>

{{ end }}
```

- [ ] **Step 2: Create content/solutions.md**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/content/solutions.md`:

```markdown
---
title: "Solutions"
description: "Precision measurement infrastructure for quantitative microscopy — verified outputs, uncertainty quantification, QC, and full audit trails."
layout: "solutions"
---
```

The `layout: solutions` front matter tells Hugo to use `layouts/_default/solutions.html` for this page.

- [ ] **Step 3: Verify Solutions page**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
hugo server
```

Open http://localhost:1313/solutions/. Check:
- Nav: "Solutions" link is bold/active
- Page header with headline and lead paragraph
- Paradigm table with 4 rows (last row highlighted blue)
- Six pillars in a 2-column grid
- Modalities in 3-column list on navy background
- CTA strip

Press Ctrl+C.

- [ ] **Step 4: Commit**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git add layouts/_default/solutions.html content/solutions.md
git commit -m "feat: add Solutions page"
```

---

## Task 7: Lab Notes Index

**Files:**
- Create: `layouts/_default/list.html`
- Create: `content/lab-notes/_index.md`

- [ ] **Step 1: Create list.html (Lab Notes index)**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/layouts/_default/list.html`:

```html
{{ define "main" }}

<div class="page-header">
  <div class="container">
    <div class="eyebrow">Lab Notes</div>
    <h1>From the bench to the pipeline</h1>
    <p class="lead">Writing on precision measurement, microscopy infrastructure, reproducibility, and the tools that make quantitative imaging actually work.</p>
  </div>
</div>

<section class="section section--gray">
  <div class="container">
    {{ if .Pages }}
      <div class="posts-grid">
        {{ range .Pages.ByDate.Reverse }}
          <a href="{{ .RelPermalink }}" class="post-card">
            <div class="post-thumb">{{ with .Params.emoji }}{{ . }}{{ else }}🔬{{ end }}</div>
            <div class="post-body">
              {{ with .Params.tags }}
                <div class="post-tag">{{ index . 0 }}</div>
              {{ end }}
              <div class="post-title">{{ .Title }}</div>
              <p class="post-excerpt">{{ .Summary | truncate 140 }}</p>
              <div class="post-meta">
                <span>{{ .Params.author | default "Mehdi Molaei" }}</span>
                <span>{{ .Date.Format "Jan 2006" }}</span>
              </div>
            </div>
          </a>
        {{ end }}
      </div>
    {{ else }}
      <p style="color: var(--muted); font-size: 15px;">No posts yet — check back soon.</p>
    {{ end }}
  </div>
</section>

{{ end }}
```

- [ ] **Step 2: Create content/lab-notes/_index.md**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/content/lab-notes/_index.md`:

```markdown
---
title: "Lab Notes"
description: "Writing on precision measurement, microscopy infrastructure, and reproducibility in quantitative imaging."
---
```

- [ ] **Step 3: Verify Lab Notes index**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
hugo server
```

Open http://localhost:1313/lab-notes/. Check:
- Nav: "Lab Notes" link is active
- Page header with eyebrow, headline, and lead paragraph
- "No posts yet" message (correct — no posts exist yet)

Press Ctrl+C.

- [ ] **Step 4: Commit**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git add layouts/_default/list.html content/lab-notes/_index.md
git commit -m "feat: add Lab Notes index page"
```

---

## Task 8: Lab Notes Post Template + Example Post

**Files:**
- Create: `layouts/_default/single.html`
- Create: `content/lab-notes/why-microscopy-needs-verified-outputs.md`

- [ ] **Step 1: Create single.html (individual post template)**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/layouts/_default/single.html`:

```html
{{ define "main" }}

<article class="post-content">
  <a href="/lab-notes/" class="post-back">← Lab Notes</a>

  <header class="post-header">
    {{ with .Params.tags }}
      <div class="post-tag">{{ index . 0 }}</div>
    {{ end }}
    <h1>{{ .Title }}</h1>
    <div class="post-meta">
      <span>{{ .Params.author | default "Mehdi Molaei" }}</span>
      <span>{{ .Date.Format "January 2, 2006" }}</span>
      <span>{{ .ReadingTime }} min read</span>
    </div>
  </header>

  <div class="post-body-content">
    {{ .Content }}
  </div>
</article>

{{ end }}
```

- [ ] **Step 2: Create the example post**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/content/lab-notes/why-microscopy-needs-verified-outputs.md`:

```markdown
---
title: "Why microscopy still doesn't have a verified output standard"
date: 2026-04-01
author: "Mehdi Molaei"
tags: ["Infrastructure"]
emoji: "🔬"
summary: "Flow cytometers ship QC reports. Mass spectrometers ship confidence scores. Microscopes ship images. Here is what that gap costs researchers — and how to fix it."
---

Flow cytometers don't hand researchers scattered light. They produce cell counts, percentage-positive values, and median fluorescence intensities — each accompanied by a QC report that documents whether the run was valid.

Mass spectrometers don't hand researchers raw ion signals. They produce peptide identification tables with confidence scores, decoy FDR estimates, and calibration curves.

DNA sequencers don't hand researchers raw fluorescence traces. They produce FASTQ files where every base call carries a Phred quality score encoding the probability that the base is correct.

Microscopes hand researchers images.

## The gap

This is not a minor gap. It is a structural failure in the measurement infrastructure of modern biology. Every other precision instrument in a typical research facility has solved — decades ago — the problem of converting raw sensor data into structured, verifiable, uncertainty-quantified measurements. Microscopy has not.

The consequences are real. A researcher presenting a cell count to a collaborator, a regulatory reviewer, or a journal editor cannot demonstrate that the count is correct. They can only assert it. The pipeline that produced it may have been assembled from four different tools over three years by two different graduate students, none of whom documented the parameter choices, model versions, or control comparisons.

## Why this is hard to fix

The challenge is not technical. The algorithms to segment cells, quantify fluorescence, and detect artifacts have existed for years — StarDist, Cellpose, CellProfiler, and dozens of others do the underlying image analysis well.

The challenge is architectural. These tools were designed in the viewer paradigm: the image is the product. Quantitative outputs are an afterthought, typically exported as loosely structured CSVs with no provenance, no confidence metadata, and no standardized schema.

Bolting a QC layer onto a viewer-paradigm tool is like bolting a safety cage onto a consumer car and calling it a racing vehicle. The structure underneath isn't designed for it.

## What the instrument paradigm looks like

The fix requires building from the other direction: start with the verified measurement as the deliverable, and design the pipeline to produce it. This means:

- Every pipeline run produces a structured output with explicit uncertainty estimates
- Every output is cryptographically linked to the pipeline version, model weights, and acquisition metadata that produced it
- Every run compares against defined positive and negative controls before releasing results
- The schema for "cell viability assay output" is the same whether the images came from a Zeiss confocal or a custom-built light-sheet system

This is not new science. It is measurement engineering applied to a domain that has, until now, mostly ignored it.

The field is ready. Reproducibility requirements from journals and funders are tightening. Pharma teams running high-content screening cannot afford undocumented pipelines. Core facilities serving dozens of labs need standardized, defensible outputs.

The infrastructure just needs to be built.
```

- [ ] **Step 3: Verify post renders correctly**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
hugo server
```

Open http://localhost:1313/lab-notes/. Check: the post card is visible with emoji thumb, tag, title, excerpt, and date.

Click the card. Check http://localhost:1313/lab-notes/why-microscopy-needs-verified-outputs/:
- "← Lab Notes" back link at top
- Tag, title, author, date, reading time in header
- Full post body with correct typography (h2 headings, paragraph spacing)

Press Ctrl+C.

- [ ] **Step 4: Commit**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git add layouts/_default/single.html content/lab-notes/
git commit -m "feat: add Lab Notes post template and example post"
```

---

## Task 9: Work With Us Page

**Files:**
- Create: `layouts/_default/work-with-us.html`
- Create: `content/work-with-us.md`

- [ ] **Step 1: Create work-with-us layout**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/layouts/_default/work-with-us.html`:

```html
{{ define "main" }}

<div class="page-header">
  <div class="container">
    <div class="eyebrow">Work With Us</div>
    <h1>Tell us about your system</h1>
    <p class="lead">We work with labs running standard platforms and completely custom-built instruments. The more you can tell us about your setup, the better.</p>
  </div>
</div>

<section class="section section--gray">
  <div class="container">
    <div class="form-layout">

      <!-- Left: What happens next -->
      <div class="form-info">
        <h2>What happens next</h2>
        <p>After you submit, we'll review your setup and respond within 2 business days. No sales calls, no pitch decks — just a direct conversation about whether and how we can help.</p>
        <ul class="form-steps">
          <li>We'll confirm we received your message</li>
          <li>Review your imaging setup and goals</li>
          <li>Schedule a 30-minute technical call if it's a fit</li>
          <li>Propose a scoped engagement or point you somewhere useful if not</li>
        </ul>
        <div class="form-email-box">
          <div class="form-email-label">Prefer email?</div>
          <div class="form-email-value">
            <a href="mailto:{{ .Site.Params.email }}">{{ .Site.Params.email }}</a>
          </div>
        </div>
      </div>

      <!-- Right: Intake form -->
      <div class="contact-form-card">
        <form
          name="work-with-us"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/thank-you/"
        >
          <!-- Netlify requires this hidden field -->
          <input type="hidden" name="form-name" value="work-with-us">
          <!-- Honeypot to block spam -->
          <p hidden>
            <label>Don't fill this out: <input name="bot-field"></label>
          </p>

          <div class="form-row">
            <div class="form-group">
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" name="first-name" placeholder="Jane" required>
            </div>
            <div class="form-group">
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" name="last-name" placeholder="Smith" required>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="jane@university.edu" required>
          </div>

          <div class="form-group">
            <label for="institution">Institution / Organization</label>
            <input type="text" id="institution" name="institution" placeholder="MIT, Genentech, ...">
          </div>

          <div class="form-group">
            <label for="system">Microscopy System(s)</label>
            <input type="text" id="system" name="system" placeholder="e.g. Zeiss LSM 980, custom light-sheet, ...">
          </div>

          <div class="form-group">
            <label for="message">What do you need help with?</label>
            <textarea id="message" name="message" placeholder="Describe your current pipeline, what's broken or missing, and what a good outcome looks like for you." required></textarea>
          </div>

          <button type="submit" class="form-submit">Send Message</button>
          <div class="form-note">We respond within 2 business days. Your information is never shared.</div>
        </form>
      </div>

    </div>
  </div>
</section>

{{ end }}
```

- [ ] **Step 2: Create the thank-you layout and page**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/layouts/_default/thank-you.html`:

```html
{{ define "main" }}
<section class="section section--white" style="min-height: 60vh; display: flex; align-items: center;">
  <div class="container" style="text-align: center;">
    <div style="font-size: 48px; margin-bottom: 20px;">✓</div>
    <h1 style="margin-bottom: 16px;">Message received.</h1>
    <p style="color: var(--muted); font-size: 17px; margin-bottom: 32px;">We'll review your setup and respond within 2 business days.</p>
    <a href="/" class="btn-primary">Back to Home</a>
  </div>
</section>
{{ end }}
```

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/content/thank-you.md`:

```markdown
---
title: "Message received"
layout: "thank-you"
---
```

The `layout: thank-you` front matter tells Hugo to use `layouts/_default/thank-you.html`. The form's `action="/thank-you/"` redirects here after a successful Netlify Forms submission.

- [ ] **Step 3: Create content/work-with-us.md**

Create `/Users/mehdi/Documents/Github/FoveaLabWebsite/content/work-with-us.md`:

```markdown
---
title: "Work With Us"
description: "Tell Fovea Lab about your microscopy system and pipeline needs."
layout: "work-with-us"
---
```

- [ ] **Step 4: Verify Work With Us page**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
hugo server
```

Open http://localhost:1313/work-with-us/. Check:
- Page header with eyebrow, headline, lead paragraph
- Two-column layout: left has "What happens next" list + email box; right has the intake form
- All form fields present: First/Last name, Email, Institution, System, Message textarea
- "Send Message" submit button

Note: Form submission won't work locally — Netlify Forms only activates when deployed to Netlify. Press Ctrl+C.

- [ ] **Step 5: Commit**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git add layouts/_default/work-with-us.html layouts/_default/thank-you.html content/work-with-us.md content/thank-you.md
git commit -m "feat: add Work With Us page with Netlify form and thank-you page"
```

---

## Task 10: Mobile Verification

The CSS media queries were written in Task 3. This task verifies they work correctly across breakpoints.

- [ ] **Step 1: Start dev server**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
hugo server
```

- [ ] **Step 2: Check home page at 375px (iPhone)**

In the browser, open http://localhost:1313. Open browser DevTools (right-click → Inspect → Toggle device toolbar). Set width to 375px. Check:
- Hero: single column (pipeline diagram below headline), not side by side
- Problem cards: single column
- Pillars: single column
- Nav: only logo + "Work With Us" button visible (text links hidden at 600px)

- [ ] **Step 3: Check Solutions page at 375px**

Open http://localhost:1313/solutions/ at 375px. Check:
- Paradigm table: readable (only first column shown on very small screens)
- Pillars: single column
- Modalities: single column

- [ ] **Step 4: Check Lab Notes at 375px**

Open http://localhost:1313/lab-notes/ at 375px. Check:
- Post cards: single column
- Post body: full width with comfortable padding

- [ ] **Step 5: Check at 768px (tablet)**

Set width to 768px. Check that the layout looks sensible — some grids may be single column, some may be 2-column. The key is no horizontal overflow.

- [ ] **Step 6: Fix any overflow issues**

If any element causes horizontal scroll at any breakpoint, add a targeted fix to the bottom of `static/css/style.css`:

```css
/* Overflow fix — add only if needed */
/* Example: if paradigm table overflows on mobile */
/*
@media (max-width: 600px) {
  .paradigm { overflow-x: auto; }
}
*/
```

Uncomment and adapt as needed.

- [ ] **Step 7: Commit**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git add static/css/style.css
git commit -m "fix: verify and adjust mobile layout"
```

---

## Task 11: Netlify Deployment & Custom Domain

- [ ] **Step 1: Create GitHub repository**

Go to github.com → New repository → name it `fovealab-website` → Private → No README → Create.

- [ ] **Step 2: Push to GitHub**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/fovealab-website.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

- [ ] **Step 3: Connect to Netlify**

1. Go to netlify.com → Log in (or sign up with GitHub)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub → Authorize Netlify → Select `fovealab-website`
4. Netlify auto-detects Hugo from `netlify.toml`. Leave build settings as-is.
5. Click "Deploy site"
6. Wait ~60 seconds. Netlify gives you a random URL like `peaceful-einstein-abc123.netlify.app`
7. Open that URL. Verify the site loads correctly — all pages, all styles.

- [ ] **Step 4: Connect custom domain fovealab.com**

In Netlify:
1. Go to Site settings → Domain management → Add custom domain
2. Enter `fovealab.com` → Verify → Add domain
3. Netlify shows you DNS instructions. You'll need to add records at your domain registrar (wherever you bought fovealab.com — GoDaddy, Namecheap, Google Domains, etc.)

At your domain registrar, add these DNS records:

```
Type: A
Name: @
Value: 75.2.60.5    ← Netlify's load balancer IP

Type: CNAME
Name: www
Value: peaceful-einstein-abc123.netlify.app    ← your Netlify URL
```

DNS propagation takes 10 minutes to 48 hours. Netlify shows a green checkmark when it detects the records.

- [ ] **Step 5: Enable HTTPS**

Once DNS is verified, in Netlify:
- Site settings → Domain management → HTTPS → "Verify DNS configuration" → "Provision certificate"

Netlify provisions a free Let's Encrypt SSL certificate automatically. This makes fovealab.com load over https:// (required for a professional site).

- [ ] **Step 6: Verify Netlify Forms is active**

Go to Netlify dashboard → Forms. After the site deploys, Netlify scans the HTML and detects the `data-netlify="true"` form automatically. You should see "work-with-us" listed as a form.

To test it:
1. Open https://fovealab.com/work-with-us/
2. Fill in the form and submit
3. You should be redirected to https://fovealab.com/thank-you/
4. Check Netlify dashboard → Forms → work-with-us → you should see the submission

- [ ] **Step 7: Set up form email notifications**

In Netlify → Forms → work-with-us → Settings → "Email notifications":
- Add your email address
- Netlify emails you every time someone submits the form

- [ ] **Step 8: Final check — all pages at fovealab.com**

Visit each URL and confirm it loads correctly:
- https://fovealab.com/
- https://fovealab.com/solutions/
- https://fovealab.com/lab-notes/
- https://fovealab.com/lab-notes/why-microscopy-needs-verified-outputs/
- https://fovealab.com/work-with-us/

- [ ] **Step 9: Final commit**

```bash
cd /Users/mehdi/Documents/Github/FoveaLabWebsite
git add .
git commit -m "chore: site live at fovealab.com"
```

---

## Publishing Future Lab Notes Posts

Once the site is live, adding a new post is always the same 3 steps:

```bash
# 1. Create the post file
# File: content/lab-notes/your-post-title.md

---
title: "Your Post Title"
date: 2026-05-01
author: "Mehdi Molaei"
tags: ["Infrastructure"]   # or "Uncertainty", "Custom Systems", "Reproducibility", etc.
emoji: "📊"
summary: "One sentence shown on the index card."
---

Your post body in Markdown here...

# 2. Preview locally
hugo server   # check at http://localhost:1313/lab-notes/

# 3. Publish
git add content/lab-notes/your-post-title.md
git commit -m "post: your post title"
git push   # Netlify deploys in ~30 seconds
```
