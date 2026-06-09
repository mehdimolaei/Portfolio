# Personal Website Design Spec
**Date:** 2026-04-06  
**Author:** Mehdi Molaei  
**Status:** Approved

---

## Overview

A minimal, static personal website for Mehdi Molaei — scientist-engineer bridging academic research and industry ML/computational imaging. The site serves both academic and industry audiences equally. Built with plain HTML/CSS/JS, hosted on GitHub Pages.

**Reference sites:** Jon Barron (jonbarron.info), Andrej Karpathy (karpathy.ai) — minimal academic style with slightly more visual hierarchy and personality.

---

## File Structure

```
Portfolio/
├── index.html               # Home — bio, links, contact
├── projects.html            # Projects listing
├── cv.html                  # CV page
├── assets/
│   ├── css/style.css        # All shared styles
│   ├── js/main.js           # Minimal JS (mobile nav toggle)
│   └── img/                 # Profile photo, project thumbnails
├── docs/
│   ├── CV_MehdiMolaei.pdf   # Downloadable CV (to be generated from .tex)
│   ├── CV_MehdiMolaei.tex   # (existing)
│   └── MehdiMolaei_Master_Resume.tex  # (existing)
└── MyPublication/           # (existing, untouched)
```

---

## Visual Style

- **Background:** White (`#ffffff`)
- **Text:** Dark charcoal (`#222222`)
- **Accent / links:** Muted blue (`#4a7fa5`), slightly darker on hover (`#2e5f82`)
- **Font:** System font stack — `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Content column:** Centered, max-width 800px, horizontal padding 20px
- **Whitespace:** Generous — sections separated by 3–4rem
- **No decorative elements:** No gradients, shadows, animations, or background images
- **Responsive:** Single-column stacks gracefully on mobile (breakpoint: 600px)

---

## Navigation

Shared across all three pages. Simple top bar:
- Left: **Mehdi Molaei** (text link → `index.html`)
- Right: **Projects** (`projects.html`) · **CV** (`cv.html`)
- Active page link is underlined or slightly bolder
- On mobile (<600px): links stack below the name, or collapse into a simple toggle

---

## Pages

### 1. Home (`index.html`)

**Header block (two-column):**
- Left column: Name (`<h1>`), title ("Senior Staff Engineer · Computational Imaging & ML"), 2–3 sentence bio framing the research-to-industry arc, followed by icon/text links:
  - Google Scholar
  - GitHub (`github.com/mehdimolaei`)
  - LinkedIn (`linkedin.com/in/mehdi-molaei`)
  - Email (`m.aban.molaei@gmail.com`)
- Right column: Profile photo (circular or square with slight rounding), ~160px wide

**Bio text (draft):**
> I am a scientist-engineer working at the intersection of computational imaging, machine learning, and soft matter physics. I spent a decade in academic research — from bacterial hydrodynamics to cell membrane mechanics — before building production ML and imaging systems at Countable Labs. My work spans algorithm development, quantitative microscopy, and deploying data-driven pipelines for real scientific instruments.

**Contact:**
Inline in the bio section — email link, no separate contact form.

**No separate sections on the home page** — keep it focused.

---

### 2. Projects (`projects.html`)

**Layout:** Vertical list. Each project is a row with:
- Left: thumbnail image (~120×90px), or a colored placeholder if no image
- Right: title (linked to paper/project if available), 2–3 sentence description, tag pills (venue + year), optional links (Paper, Code, arXiv)

**Two sections:**

#### Research Projects
Derived from publications. Initial set (to be expanded):

| Title | Venue | Year | Links |
|---|---|---|---|
| Probing Lipid Membrane Bending Mechanics via Gold Nanorod Tracking | Physical Review Research | 2022 | Paper |
| Measuring Response Functions of Active Materials | PNAS | 2023 | Paper |
| Interfacial Flow around Brownian Colloids | Physical Review Letters | 2021 | Paper |
| Nanoscale Rheology with Single Gold Nanorod Probes | Physical Review Letters | 2018 | Paper |
| Failed Escape: Bacteria near Solid Surfaces | Physical Review Letters | 2014 | Paper |
| Succeed Escape: Shear-Promoted Tumbling of E. coli | Scientific Reports | 2016 | Paper |
| Imaging Bacterial 3D Motion with Holographic Microscopy | Optics Express | 2014 | Paper |
| Interfacial Microrheology in a 3D-Printed Langmuir Trough | J. Colloid Interface Sci. | 2020 | Paper |
| UltraPCR: Massively Parallel Single-Molecule Multiplexing | bioRxiv | 2023 | Paper |

#### Personal Projects
| Title | Description | Links |
|---|---|---|
| Trajkit | Open-source Python toolkit for spatiotemporal trajectory analysis | Code, Docs |

**Note:** Descriptions for each project will be written by Mehdi. The implementation scaffolds the structure with placeholder text.

---

### 3. CV (`cv.html`)

**Top:** "Download PDF" button linking to `docs/CV_MehdiMolaei.pdf`

**Rendered sections (from `CV_MehdiMolaei.tex`):**
1. Education
2. Research Interests
3. Professional Appointments & Research Experience
4. Publications (Peer-Reviewed, Reviews, Patent, Preprint)
5. Mentoring & Teaching
6. Selected Conference Presentations
7. Professional Service
8. Honors & Recognition

Styled to match the site's visual language — no attempt to replicate LaTeX formatting exactly, just clean readable HTML.

---

## JavaScript (`main.js`)

Minimal. Only:
- Mobile nav toggle (show/hide nav links on small screens)
- No frameworks, no dependencies

---

## Hosting

GitHub Pages from the `main` branch of the `Portfolio` repository. No build step required — push HTML/CSS/JS and it's live.

---

## Out of Scope (for now)

- Blog / notes section
- Individual project detail pages (each project → its own HTML file)
- Dark mode
- Search or filtering on projects page
- Contact form
- Analytics
