# Fovea Lab Website Design Spec

**Date:** 2026-04-10
**Owner:** Mehdi Molaei
**Domain:** fovealab.com
**Status:** Approved — ready for implementation planning

---

## 1. Goals

**Primary:** Credibility signal — when someone Googles "Fovea Lab" after a conference encounter or cold outreach, the site must immediately communicate that this is a serious, rigorous operation.

**Secondary:** Lead generation — a clear, frictionless path for interested researchers or pharma R&D scientists to reach out.

**Future-proofing:** The structure must scale to add SaaS, open-source, and product pages later without a redesign.

**Not in scope for v1:** Product demos, pricing, team bios (beyond placeholder), case studies.

---

## 2. Target Audience

Both audiences addressed equally. The shared pain point (fragmented pipelines, no verifiable outputs) resonates with both — copy leads with the problem, not a specific persona.

- **Academic researchers / core facility managers** — running instruments day-to-day, frustrated with fragmented toolchains and unreproducible pipelines
- **Pharma / biotech R&D decision-makers** — focused on reproducibility, compliance, and audit trails

---

## 3. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Site generator | **Hugo** | Markdown-based posts for Lab Notes, fast builds, no server required, maps to how a developer thinks |
| Styling | **Custom CSS** (single `style.css`) | Full control, no framework bloat, completely debuggable |
| Fonts | **Google Fonts** (DM Serif Display + DM Sans) | Free, fast, no licensing issues |
| Hosting | **Netlify** | Free tier, auto-deploy from Git, custom domain in < 10 minutes |
| Domain | **fovealab.com** (already purchased) | Connected to Netlify via DNS CNAME/A record |
| Forms | **Netlify Forms** | Zero-backend form handling, no server needed, free tier covers early volume |
| Version control | **GitHub** | Netlify watches the repo and deploys on every push to `main` |

---

## 4. Site Structure

```
fovealab.com/              → Home
fovealab.com/solutions/    → Solutions
fovealab.com/lab-notes/    → Lab Notes index
fovealab.com/lab-notes/post-slug/  → Individual post
fovealab.com/work-with-us/ → Contact/intake form
```

### Hugo Project Layout

```
fovealab.com/
├── config.toml              # Site config (title, baseURL, menu)
├── content/
│   ├── _index.md            # Home page front matter + content
│   ├── solutions.md         # Solutions page
│   ├── work-with-us.md      # Contact page
│   └── lab-notes/
│       ├── _index.md        # Lab Notes index page
│       └── *.md             # Individual posts (one file per post)
├── layouts/
│   ├── _default/
│   │   ├── baseof.html      # Base template (html/head/nav/footer)
│   │   ├── single.html      # Single content page template
│   │   └── list.html        # List page template (Lab Notes index)
│   ├── index.html           # Home page template
│   └── partials/
│       ├── nav.html
│       ├── footer.html
│       └── head.html        # Meta tags, font imports, CSS link
├── static/
│   ├── css/
│   │   └── style.css        # All styles — single file
│   └── images/              # Logo, favicons, any graphics
└── .gitignore
```

---

## 5. Visual Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--navy` | `#0f2347` | Primary headings, nav background (footer), buttons |
| `--navy-mid` | `#1a3a6b` | Secondary navy, active nav states |
| `--blue` | `#3a6fc7` | Eyebrow labels, links, accents, icon badges |
| `--blue-light` | `#e8edf8` | Section backgrounds, card highlights, CTA strip |
| `--bg` | `#f7f9fc` | Page background |
| `--white` | `#ffffff` | Card backgrounds, hero, nav |
| `--text` | `#0d1f3c` | Body text |
| `--muted` | `#5a6a82` | Secondary text, subtitles, descriptions |
| `--border` | `#dde4ef` | All borders, dividers |

### Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display headings (H1, hero) | DM Serif Display | 400 (regular) | 36–42px |
| Section headings (H2) | DM Serif Display | 400 | 28–32px |
| Card headings (H3/H4) | DM Serif Display | 400 | 17–20px |
| Body text | DM Sans | 400 | 15px |
| Nav links | DM Sans | 500 | 14px |
| Eyebrow labels | DM Sans | 600 | 11px, uppercase, 0.18em letter-spacing |
| Subtitles / lead | DM Sans | 400 | 16–17px |
| Small / meta | DM Sans | 400 | 11–13px |

### Spacing
- Section vertical padding: `72px` top/bottom
- Container max-width: `1100px` (content), `1200px` (hero)
- Horizontal page padding: `48px`
- Card padding: `24–28px`
- Card border-radius: `10px`
- Button border-radius: `6px`

---

## 6. Navigation

**Layout:** Sticky, white background, 64px height, 1px bottom border.

```
[FoveaLab]    Home · Solutions · Lab Notes    [Work With Us ▪]
```

- Logo: "Fovea" in `--navy` + "Lab" in `--blue`, DM Serif Display 20px
- Links: `--muted`, 14px DM Sans 500. Active page: `--navy` 600
- "Work With Us": filled navy button, 8px/20px padding, 6px radius, 13px 600

**No "Contact" link in nav** — the only path to the contact page is the "Work With Us" CTA button.

---

## 7. Page Designs

### 7.1 Home (`/`)

**Sections (top to bottom):**

1. **Nav** (sticky, shared)

2. **Hero** — split layout, white background
   - Left: eyebrow label · DM Serif Display H1 ("Microscopy images are raw data. We deliver *verified* measurements.") · subtitle paragraph · two CTAs ("Work With Us" filled navy, "Our Approach →" text link)
   - Right: pipeline diagram card (light blue background) showing three steps: Raw Acquisition → Pipeline Processing → Verified Measurements, with badges ("Automated", "Verified ✓")
   - The word "verified" in the headline is underlined with a 2px `--blue` border

3. **Problem** — light gray background (`--bg`)
   - Eyebrow: "The Problem"
   - H2: "Every lab reinvents the wheel"
   - 3-column card grid: Fragmented Toolchains · No Verifiability Layer · Reproducibility Gap

4. **Solutions teaser** — dark navy background (`--navy`)
   - Eyebrow: "Our Approach"
   - H2: "The instrument paradigm"
   - Subtitle referencing flow cytometers/mass specs
   - 3×2 grid of the six pillars (dark card style, navy text on semi-transparent white)

5. **CTA strip** — light blue background (`--blue-light`)
   - Headline + 1-line description + "Work With Us" button + plain email link below

6. **Footer** — navy background
   - Left: FoveaLab wordmark · Center: copyright · Right: Solutions, Lab Notes links

### 7.2 Solutions (`/solutions/`)

**Sections:**

1. **Nav** (active: Solutions)

2. **Page header** — white background
   - Eyebrow: "Our Approach"
   - H1: "The measurement infrastructure microscopy has been missing"
   - Lead paragraph: viewer paradigm vs. instrument paradigm

3. **Paradigm table** — white background
   - H2: "Other instruments already work this way"
   - 3-column table: Instrument | Raw Input | Structured Output
   - Rows: Flow Cytometer, Mass Spectrometer, DNA Sequencer, **Fovea Lab** (highlighted row in `--blue-light`)

4. **Six pillars** — light gray background (`--bg`)
   - H2: "What every Fovea Lab pipeline delivers"
   - 2×3 grid of pillar cards (white, bordered), each with number badge + DM Serif title + description

5. **Modalities** — navy background
   - H2: "Built for every modality — including yours"
   - 3-column list: Fluorescence | Label-Free & Advanced | Custom & Correlative
   - Special callout: emphasis on custom-engineered systems

6. **CTA strip** + **Footer**

### 7.3 Lab Notes (`/lab-notes/`)

**Index page:**
- Page header: "From the bench to the pipeline" + lead paragraph
- 3-column post card grid
  - Each card: emoji/image thumbnail · topic tag · DM Serif title · excerpt · author + date
  - Hover: subtle lift (`translateY(-2px)`) + shadow

**Individual post (`/lab-notes/post-slug/`):**
- Narrow reading column (~680px max-width), centered
- DM Serif Display for post title
- DM Sans body at 16px, 1.7 line-height
- Published date + reading time in `--muted`
- Back link to Lab Notes index at top

**Adding a post:** Create a new `.md` file in `content/lab-notes/`. Hugo handles everything else automatically.

### 7.4 Work With Us (`/work-with-us/`)

**Layout:** Two-column, white page header + form section

- **Left column:** "What happens next" — 4-step expectation-setting list + direct email fallback (`hello@fovealab.com`)
- **Right column:** Intake form (white card, bordered)
  - First name / Last name (side by side)
  - Email
  - Institution / Organization
  - Microscopy system(s) (text input)
  - What do you need help with? (textarea)
  - "Send Message" button (full width, navy)
  - Small note: "We respond within 2 business days. Your information is never shared."
- **Form backend:** Netlify Forms (`netlify` attribute on `<form>` tag, zero-configuration)

---

## 8. Content Strategy (Placeholder → Real)

All copy at launch will be placeholder drawn from the business plan document. The following should be replaced with real content as they become available:

| Placeholder | Replace with |
|---|---|
| `hello@fovealab.com` | Real contact email |
| Example Lab Notes posts | Real published posts |
| Pipeline diagram (emoji-based) | A real diagram or microscopy image |
| "© 2026 Fovea Lab LLC" | Keep, update year automatically |

---

## 9. Deployment & Maintenance

### Initial Setup
1. Create GitHub repo `fovealab-website`
2. Push Hugo project to `main` branch
3. Connect repo to Netlify (auto-detects Hugo)
4. Add custom domain `fovealab.com` in Netlify UI
5. Update DNS: add Netlify's CNAME record at domain registrar

### Publishing a new Lab Note
1. Create `content/lab-notes/my-post-title.md` with front matter (`title`, `date`, `tags`)
2. Write post body in Markdown
3. `git add`, `git commit`, `git push`
4. Netlify auto-deploys in ~30 seconds

### Updating site content
- Edit any `.md` file in `content/` for copy changes
- Edit `static/css/style.css` for style changes
- Push to `main` → live in ~30 seconds

---

## 10. What This Spec Does Not Cover (Intentional Scope Limits)

- **Logo design** — wordmark in DM Serif Display text for v1; real logo can be swapped in later by replacing an `<img>` tag
- **Analytics** — can add Plausible or Fathom (privacy-first) later with a single script tag
- **SEO** — basic meta tags included in `head.html`; deeper SEO work is a later phase
- **Dark mode** — not in scope for v1
- **Mobile responsiveness** — CSS Grid with sensible breakpoints; full mobile spec to be addressed in implementation plan
- **Blog categories/tags** — Hugo supports this natively; implement if/when Lab Notes grows beyond ~10 posts
- **RSS feed** — Hugo generates one automatically; no extra work needed
