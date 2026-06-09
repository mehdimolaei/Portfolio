# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal, static 3-page personal website (Home, Projects, CV) for Mehdi Molaei, deployable to GitHub Pages with no build step.

**Architecture:** Plain HTML/CSS/JS — three HTML files sharing one stylesheet and one JS file. No frameworks, no dependencies, no build tooling. Nav and footer are duplicated across pages (acceptable for a 3-page static site).

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid), vanilla JS. Hosted on GitHub Pages.

---

## File Map

| File | Responsibility |
| --- | --- |
| `index.html` | Home page — bio, photo, links, contact |
| `projects.html` | Projects listing — Research + Personal sections |
| `cv.html` | CV page — download button + full rendered CV |
| `assets/css/style.css` | All styles — variables, reset, layout, nav, components |
| `assets/js/main.js` | Mobile nav toggle only |
| `assets/img/` | Profile photo + project thumbnails (placeholders initially) |
| `.nojekyll` | Tells GitHub Pages to skip Jekyll processing |

---

## Task 1: Scaffold directory structure and CSS foundation

**Files:**
- Create: `assets/css/style.css`
- Create: `assets/js/main.js`
- Create: `assets/img/.gitkeep`
- Create: `.nojekyll`

- [ ] **Step 1: Create directories**

```bash
mkdir -p assets/css assets/js assets/img
touch assets/img/.gitkeep
touch .nojekyll
```

- [ ] **Step 2: Create `assets/css/style.css` with CSS variables, reset, and base layout**

```css
/* ============================================================
   CSS Custom Properties
   ============================================================ */
:root {
  --color-bg: #ffffff;
  --color-text: #222222;
  --color-text-muted: #666666;
  --color-accent: #4a7fa5;
  --color-accent-hover: #2e5f82;
  --color-border: #e0e0e0;
  --color-tag-bg: #f0f4f8;
  --font-stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --max-width: 800px;
  --nav-height: 56px;
}

/* ============================================================
   Reset
   ============================================================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ============================================================
   Base
   ============================================================ */
html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-stack);
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.65;
  min-height: 100vh;
}

a {
  color: var(--color-accent);
  text-decoration: none;
}

a:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}

/* ============================================================
   Layout
   ============================================================ */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
}

/* ============================================================
   Navigation
   ============================================================ */
nav {
  height: var(--nav-height);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  background: var(--color-bg);
  z-index: 100;
}

.nav-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-text);
  text-decoration: none;
}

.nav-brand:hover {
  color: var(--color-accent);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  text-decoration: none;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--color-accent);
  text-decoration: none;
}

.nav-links a.active {
  font-weight: 600;
  border-bottom: 2px solid var(--color-accent);
  padding-bottom: 2px;
}

/* Mobile nav toggle button */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--color-text);
  font-size: 1.4rem;
  line-height: 1;
}

/* ============================================================
   Footer
   ============================================================ */
footer {
  margin-top: 5rem;
  padding: 2rem 20px;
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* ============================================================
   Main content spacing
   ============================================================ */
main {
  padding: 3rem 0 4rem;
}

/* ============================================================
   Responsive — mobile
   ============================================================ */
@media (max-width: 600px) {
  .nav-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    gap: 0;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    padding: 0.5rem 0;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links li a {
    display: block;
    padding: 0.75rem 20px;
  }
}
```

- [ ] **Step 3: Create `assets/js/main.js`**

```js
// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }
});
```

- [ ] **Step 4: Commit scaffold**

```bash
git init
git add assets/ .nojekyll
git commit -m "feat: scaffold static site structure and shared CSS/JS"
```

---

## Task 2: Home page (`index.html`)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mehdi Molaei</title>
  <link rel="stylesheet" href="assets/css/style.css" />
  <style>
    /* ---- Home-page specific styles ---- */
    .profile-block {
      display: flex;
      gap: 2.5rem;
      align-items: flex-start;
      margin-bottom: 2.5rem;
    }

    .profile-text {
      flex: 1;
    }

    .profile-text h1 {
      font-size: 1.9rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .profile-text .title {
      font-size: 1rem;
      color: var(--color-text-muted);
      margin-bottom: 1.2rem;
    }

    .profile-text .bio {
      font-size: 0.97rem;
      margin-bottom: 1.5rem;
      max-width: 540px;
    }

    .profile-photo {
      flex-shrink: 0;
    }

    .profile-photo img {
      width: 160px;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
    }

    .profile-photo .photo-placeholder {
      width: 160px;
      height: 160px;
      border-radius: 8px;
      background: var(--color-tag-bg);
      border: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-muted);
      font-size: 0.8rem;
    }

    .links-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .links-row a {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      display: flex;
      align-items: center;
      gap: 0.35rem;
      text-decoration: none;
    }

    .links-row a:hover {
      color: var(--color-accent);
    }

    @media (max-width: 600px) {
      .profile-block {
        flex-direction: column-reverse;
        gap: 1.5rem;
      }

      .profile-photo img,
      .profile-photo .photo-placeholder {
        width: 120px;
        height: 120px;
      }
    }
  </style>
</head>
<body>

  <!-- Navigation -->
  <nav>
    <div class="nav-inner">
      <a class="nav-brand" href="index.html">Mehdi Molaei</a>
      <button class="nav-toggle" aria-label="Toggle navigation">&#9776;</button>
      <ul class="nav-links">
        <li><a href="index.html" class="active">Home</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="cv.html">CV</a></li>
      </ul>
    </div>
  </nav>

  <!-- Main -->
  <main>
    <div class="container">

      <div class="profile-block">
        <div class="profile-text">
          <h1>Mehdi Molaei</h1>
          <p class="title">Senior Staff Engineer &middot; Computational Imaging &amp; ML</p>
          <p class="bio">
            I am a scientist-engineer working at the intersection of computational imaging,
            machine learning, and soft matter physics. I spent a decade in academic research
            &mdash; from bacterial hydrodynamics to cell membrane mechanics &mdash; before
            building production ML and imaging systems at Countable Labs. My work spans
            algorithm development, quantitative microscopy, and deploying data-driven
            pipelines for real scientific instruments.
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
          </div>
        </div>
        <div class="profile-photo">
          <!-- Replace src with your actual photo path, e.g. assets/img/profile.jpg -->
          <div class="photo-placeholder">Photo</div>
        </div>
      </div>

    </div>
  </main>

  <!-- Footer -->
  <footer>
    <p>&copy; 2026 Mehdi Molaei</p>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/index.html`. Verify:
- Name, title, bio, and links render correctly
- Photo placeholder is visible
- Nav links to Projects and CV are present
- Page is readable on a narrow window (resize to ~375px)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add home page with bio, links, and profile block"
```

---

## Task 3: Projects page (`projects.html`)

**Files:**
- Create: `projects.html`

- [ ] **Step 1: Create `projects.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Projects &mdash; Mehdi Molaei</title>
  <link rel="stylesheet" href="assets/css/style.css" />
  <style>
    /* ---- Projects-page specific styles ---- */
    .page-title {
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 0.4rem;
    }

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

    .project-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .project-card {
      display: flex;
      gap: 1.5rem;
      align-items: flex-start;
    }

    .project-thumb {
      flex-shrink: 0;
      width: 120px;
      height: 90px;
      border-radius: 6px;
      background: var(--color-tag-bg);
      border: 1px solid var(--color-border);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-muted);
      font-size: 0.75rem;
    }

    .project-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .project-body {
      flex: 1;
    }

    .project-title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.35rem;
    }

    .project-title a {
      color: var(--color-text);
      text-decoration: none;
    }

    .project-title a:hover {
      color: var(--color-accent);
    }

    .project-desc {
      font-size: 0.92rem;
      color: var(--color-text-muted);
      margin-bottom: 0.6rem;
      line-height: 1.55;
    }

    .project-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
    }

    .tag {
      font-size: 0.78rem;
      background: var(--color-tag-bg);
      border: 1px solid var(--color-border);
      border-radius: 4px;
      padding: 2px 8px;
      color: var(--color-text-muted);
    }

    .project-links {
      display: flex;
      gap: 0.75rem;
      margin-left: 0.25rem;
    }

    .project-links a {
      font-size: 0.82rem;
      color: var(--color-accent);
      text-decoration: none;
    }

    .project-links a:hover {
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      .project-card {
        flex-direction: column;
        gap: 0.75rem;
      }

      .project-thumb {
        width: 100%;
        height: 120px;
      }
    }
  </style>
</head>
<body>

  <!-- Navigation -->
  <nav>
    <div class="nav-inner">
      <a class="nav-brand" href="index.html">Mehdi Molaei</a>
      <button class="nav-toggle" aria-label="Toggle navigation">&#9776;</button>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="projects.html" class="active">Projects</a></li>
        <li><a href="cv.html">CV</a></li>
      </ul>
    </div>
  </nav>

  <!-- Main -->
  <main>
    <div class="container">

      <h1 class="page-title">Projects</h1>

      <!-- ===== Research Projects ===== -->
      <h2 class="section-heading">Research</h2>
      <div class="project-list">

        <div class="project-card">
          <div class="project-thumb">Thumbnail</div>
          <div class="project-body">
            <div class="project-title">
              <a href="https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.4.013052" target="_blank" rel="noopener">
                Probing Lipid Membrane Bending Mechanics via Gold Nanorod Tracking
              </a>
            </div>
            <p class="project-desc">
              We developed a polarization-resolved dark-field optical metrology system for tracking single gold nanorods
              with sub-degree angular precision on lipid membranes. By combining physics-informed forward models with
              correlated orientation fluctuations, we extracted quantitative bending moduli from model and cellular membranes.
            </p>
            <div class="project-meta">
              <span class="tag">Physical Review Research</span>
              <span class="tag">2022</span>
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
                Measuring Response Functions of Active Materials from Data
              </a>
            </div>
            <p class="project-desc">
              We developed a domain-general spatiotemporal correlation framework for tensor fields in stochastic active systems.
              By recasting correlation analysis as an ensemble-averaged material response function, we enabled robust inference
              of mechanical properties from actomyosin networks in model systems and living cells.
            </p>
            <div class="project-meta">
              <span class="tag">PNAS</span>
              <span class="tag">2023</span>
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
              <a href="https://physics.aps.org/articles/v14/s65" target="_blank" rel="noopener">
                Interfacial Flow around Brownian Colloids
              </a>
            </div>
            <p class="project-desc">
              We developed correlated displacement velocimetry (CDV), a correlation-based statistical estimator
              built on particle tracking that reconstructs nanoscale interfacial velocity fields. Applied to
              thermally driven colloidal probes at fluid interfaces, CDV revealed vortex-like hydrodynamic structures.
            </p>
            <div class="project-meta">
              <span class="tag">Physical Review Letters</span>
              <span class="tag">2021</span>
              <div class="project-links">
                <a href="https://physics.aps.org/articles/v14/s65" target="_blank" rel="noopener">Paper</a>
              </div>
            </div>
          </div>
        </div>

        <div class="project-card">
          <div class="project-thumb">Thumbnail</div>
          <div class="project-body">
            <div class="project-title">
              <a href="https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.120.118002" target="_blank" rel="noopener">
                Nanoscale Rheology with Single Gold Nanorod Probes
              </a>
            </div>
            <p class="project-desc">
              Using polarization-resolved dark-field microscopy, we tracked single gold nanorods to measure both
              translational and rotational diffusion simultaneously. We extracted nanoscale viscoelastic properties
              and anisotropic diffusion tensors in complex fluids, including polymer solutions and living cells.
            </p>
            <div class="project-meta">
              <span class="tag">Physical Review Letters</span>
              <span class="tag">2018</span>
              <div class="project-links">
                <a href="https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.120.118002" target="_blank" rel="noopener">Paper</a>
              </div>
            </div>
          </div>
        </div>

        <div class="project-card">
          <div class="project-thumb">Thumbnail</div>
          <div class="project-body">
            <div class="project-title">
              <a href="https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.113.068103" target="_blank" rel="noopener">
                Failed Escape: Solid Surfaces Prevent Tumbling of E. coli
              </a>
            </div>
            <p class="project-desc">
              Using inline digital holographic microscopy, we showed that E. coli swimming near a solid surface
              are hydrodynamically trapped — the surface suppresses the tumbling that normally reorients the cell,
              causing extended near-surface runs. This work explained a longstanding puzzle in bacterial locomotion.
            </p>
            <div class="project-meta">
              <span class="tag">Physical Review Letters</span>
              <span class="tag">2014</span>
              <div class="project-links">
                <a href="https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.113.068103" target="_blank" rel="noopener">Paper</a>
              </div>
            </div>
          </div>
        </div>

        <div class="project-card">
          <div class="project-thumb">Thumbnail</div>
          <div class="project-body">
            <div class="project-title">
              <a href="https://www.nature.com/articles/srep18883" target="_blank" rel="noopener">
                Succeed Escape: Shear Flow Promotes Tumbling of E. coli near Surfaces
              </a>
            </div>
            <p class="project-desc">
              As a counterpart to the "Failed Escape" work, we showed that ambient shear flow rescues E. coli from
              surface entrapment by restoring tumbling near solid boundaries. This provided a mechanistic explanation
              for how bacteria escape surfaces in flow environments.
            </p>
            <div class="project-meta">
              <span class="tag">Scientific Reports</span>
              <span class="tag">2016</span>
              <div class="project-links">
                <a href="https://www.nature.com/articles/srep18883" target="_blank" rel="noopener">Paper</a>
              </div>
            </div>
          </div>
        </div>

        <div class="project-card">
          <div class="project-thumb">Thumbnail</div>
          <div class="project-body">
            <div class="project-title">
              <a href="https://opg.optica.org/oe/fulltext.cfm?uri=oe-22-8-9643" target="_blank" rel="noopener">
                Imaging Bacterial 3D Motion with Digital Holographic Microscopy
              </a>
            </div>
            <p class="project-desc">
              We built an inline digital holographic microscopy platform and developed a correlation-based denoising
              algorithm for 3D tracking of bacteria in dense suspensions. The method enabled nanometer-precision
              localization and full 3D trajectory reconstruction without fluorescent labels.
            </p>
            <div class="project-meta">
              <span class="tag">Optics Express</span>
              <span class="tag">2014</span>
              <div class="project-links">
                <a href="https://opg.optica.org/oe/fulltext.cfm?uri=oe-22-8-9643" target="_blank" rel="noopener">Paper</a>
              </div>
            </div>
          </div>
        </div>

        <div class="project-card">
          <div class="project-thumb">Thumbnail</div>
          <div class="project-body">
            <div class="project-title">
              <a href="https://www.sciencedirect.com/science/article/pii/S0021979719312610" target="_blank" rel="noopener">
                Interfacial Microrheology in a Miniature 3D-Printed Langmuir Trough
              </a>
            </div>
            <p class="project-desc">
              We designed and built a microscope-stage Langmuir trough using 3D printing, enabling simultaneous
              interfacial tensiometry and microrheology. The device measured interfacial viscosity over an
              8-order-of-magnitude dynamic range, opening access to previously intractable soft interface systems.
            </p>
            <div class="project-meta">
              <span class="tag">J. Colloid Interface Sci.</span>
              <span class="tag">2020</span>
              <div class="project-links">
                <a href="https://www.sciencedirect.com/science/article/pii/S0021979719312610" target="_blank" rel="noopener">Paper</a>
              </div>
            </div>
          </div>
        </div>

        <div class="project-card">
          <div class="project-thumb">Thumbnail</div>
          <div class="project-body">
            <div class="project-title">
              <a href="https://www.biorxiv.org/content/10.1101/2023.07.17.549421" target="_blank" rel="noopener">
                UltraPCR: Massively Parallel Single-Molecule Multiplexing
              </a>
            </div>
            <p class="project-desc">
              We developed the computational analysis platform for UltraPCR, a massively parallel single-molecule
              digital PCR system. The platform converts multichannel light-sheet 3D imaging into calibrated molecular
              counts, enabling precision multiplexing across 10+ targets simultaneously.
            </p>
            <div class="project-meta">
              <span class="tag">bioRxiv</span>
              <span class="tag">2023</span>
              <div class="project-links">
                <a href="https://www.biorxiv.org/content/10.1101/2023.07.17.549421" target="_blank" rel="noopener">Preprint</a>
              </div>
            </div>
          </div>
        </div>

      </div><!-- /.project-list research -->

      <!-- ===== Personal Projects ===== -->
      <h2 class="section-heading">Personal Projects</h2>
      <div class="project-list">

        <div class="project-card">
          <div class="project-thumb">Thumbnail</div>
          <div class="project-body">
            <div class="project-title">
              <a href="https://trajkit-learn.readthedocs.io/en/latest/index.html" target="_blank" rel="noopener">
                Trajkit
              </a>
            </div>
            <p class="project-desc">
              An open-source Python toolkit for analyzing spatiotemporal trajectories and structured time-series data.
              Trajkit provides tools for correlation analysis, ensemble averaging, and inference from noisy particle
              tracking experiments across physical, biological, and engineering systems.
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

      </div><!-- /.project-list personal -->

    </div>
  </main>

  <!-- Footer -->
  <footer>
    <p>&copy; 2026 Mehdi Molaei</p>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/projects.html`. Verify:
- Research section shows 9 project cards, Personal shows 1
- Each card has thumbnail placeholder, title, description, venue/year tags, and paper link
- Cards stack to single column below 600px width

- [ ] **Step 3: Commit**

```bash
git add projects.html
git commit -m "feat: add projects page with research and personal project listings"
```

---

## Task 4: CV page (`cv.html`)

**Files:**
- Create: `cv.html`

**Note:** The downloadable PDF (`docs/CV_MehdiMolaei.pdf`) needs to be compiled from the existing `.tex` file. The HTML page links to it at `docs/CV_MehdiMolaei.pdf`. If the PDF is not yet compiled, the download button will 404 until it is — that is fine for now.

- [ ] **Step 1: Create `cv.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CV &mdash; Mehdi Molaei</title>
  <link rel="stylesheet" href="assets/css/style.css" />
  <style>
    /* ---- CV-page specific styles ---- */
    .cv-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .cv-header h1 {
      font-size: 1.6rem;
      font-weight: 700;
    }

    .btn-download {
      display: inline-block;
      padding: 0.55rem 1.2rem;
      background: var(--color-accent);
      color: #fff;
      border-radius: 5px;
      font-size: 0.9rem;
      font-weight: 500;
      text-decoration: none;
      transition: background 0.15s;
    }

    .btn-download:hover {
      background: var(--color-accent-hover);
      color: #fff;
      text-decoration: none;
    }

    .cv-section {
      margin-bottom: 2.5rem;
    }

    .cv-section h2 {
      font-size: 1.05rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--color-text-muted);
      border-bottom: 1px solid var(--color-border);
      padding-bottom: 0.4rem;
      margin-bottom: 1.2rem;
    }

    .cv-item {
      margin-bottom: 1.2rem;
    }

    .cv-item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-bottom: 0.15rem;
    }

    .cv-item-title {
      font-weight: 600;
      font-size: 0.97rem;
    }

    .cv-item-date {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      white-space: nowrap;
    }

    .cv-item-sub {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      margin-bottom: 0.1rem;
    }

    .cv-item-body {
      font-size: 0.9rem;
      color: var(--color-text-muted);
    }

    .cv-item ul {
      padding-left: 1.4rem;
      margin-top: 0.4rem;
    }

    .cv-item ul li {
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
      line-height: 1.5;
    }

    .pub-list {
      padding-left: 1.4rem;
    }

    .pub-list li {
      font-size: 0.9rem;
      margin-bottom: 0.6rem;
      line-height: 1.55;
    }

    .pub-list li strong {
      font-weight: 600;
    }

    .cv-interests {
      font-size: 0.93rem;
      line-height: 1.65;
    }
  </style>
</head>
<body>

  <!-- Navigation -->
  <nav>
    <div class="nav-inner">
      <a class="nav-brand" href="index.html">Mehdi Molaei</a>
      <button class="nav-toggle" aria-label="Toggle navigation">&#9776;</button>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="cv.html" class="active">CV</a></li>
      </ul>
    </div>
  </nav>

  <!-- Main -->
  <main>
    <div class="container">

      <div class="cv-header">
        <h1>Curriculum Vitae</h1>
        <a class="btn-download" href="docs/CV_MehdiMolaei.pdf" download>&#8595; Download PDF</a>
      </div>

      <!-- Education -->
      <div class="cv-section">
        <h2>Education</h2>

        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">Ph.D., Mechanical Engineering &mdash; Texas Tech University</span>
            <span class="cv-item-date">2012 &ndash; 2015</span>
          </div>
          <div class="cv-item-sub">Advisor: Prof. Jian Sheng &middot; Lubbock, TX</div>
          <div class="cv-item-body">Dissertation: <em>Hydrodynamics of bacterial locomotion near interfaces</em></div>
        </div>

        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">M.S., Aerospace Engineering and Mechanics &mdash; University of Minnesota</span>
            <span class="cv-item-date">2010 &ndash; 2012</span>
          </div>
          <div class="cv-item-sub">Advisor: Prof. Jian Sheng &middot; Minneapolis, MN</div>
          <div class="cv-item-body">Dissertation: <em>Hydrodynamics of bacteria and solid-surface interaction using microfluidics and digital holographic microscopy</em></div>
        </div>

        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">M.S., Mechanical Engineering &mdash; Sharif University of Technology</span>
            <span class="cv-item-date">2007 &ndash; 2010</span>
          </div>
          <div class="cv-item-sub">Tehran, Iran</div>
          <div class="cv-item-body">Dissertation: <em>One-dimensional modeling of the cardiovascular system</em></div>
        </div>

        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">B.S., Mechanical Engineering &mdash; Sharif University of Technology</span>
            <span class="cv-item-date">2003 &ndash; 2007</span>
          </div>
          <div class="cv-item-sub">Tehran, Iran</div>
        </div>
      </div>

      <!-- Research Interests -->
      <div class="cv-section">
        <h2>Research Interests</h2>
        <p class="cv-interests">
          Spatiotemporal modeling and inference; multimodal signal fusion and representation learning;
          rare-event and rare-class inference; machine-learning-enabled scientific instrumentation;
          real-time scientific computing; computational imaging and quantitative microscopy;
          soft and living matter physics; diffusion models.
        </p>
      </div>

      <!-- Experience -->
      <div class="cv-section">
        <h2>Professional Appointments</h2>

        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">Senior Staff Engineer, Computational Imaging &mdash; Countable Labs</span>
            <span class="cv-item-date">Aug 2022 &ndash; Jan 2026</span>
          </div>
          <div class="cv-item-sub">Palo Alto, CA</div>
          <ul>
            <li>Led architecture and delivery of the production analysis platform for multichannel light-sheet 3D PCR imaging; recognized with the #1 Analytical Scientist Innovation Award (2025).</li>
            <li>Built end-to-end ETL and computational imaging pipeline for DNA molecule counting: 3D reconstruction, artifact correction, compartment segmentation, and unsupervised state assignment.</li>
            <li>Designed a low-latency on-prem microservice platform with DAG-based scheduling, reducing time-to-result from &gt;12 hours to live results.</li>
            <li>Led DNA linkage detection, multiplexed decoding (4 to 10 channels), and 24-plex combinatorial labeling via a multimodal VAE; achieved 97&ndash;98% accuracy.</li>
          </ul>
        </div>

        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">Research Scientist &mdash; University of Chicago</span>
            <span class="cv-item-date">Aug 2020 &ndash; Aug 2022</span>
          </div>
          <div class="cv-item-sub">Pritzker School of Molecular Engineering &middot; Chicago, IL</div>
          <ul>
            <li>Developed a domain-general spatiotemporal correlation framework for tensor fields in stochastic systems, extending correlation analysis to incorporate internal headings and orientations.</li>
            <li>Recast correlation analysis as a data-driven material response function and applied it to actomyosin active systems.</li>
            <li>Mentored doctoral students and presented results at conferences.</li>
          </ul>
        </div>

        <div class="cv-item">
          <div class="cv-item-header">
            <span class="cv-item-title">Postdoctoral Researcher &mdash; University of Pennsylvania</span>
            <span class="cv-item-date">Sep 2015 &ndash; Aug 2020</span>
          </div>
          <div class="cv-item-sub">Physical Sciences Oncology Center; Crocker Lab; Stebe Lab &middot; Philadelphia, PA</div>
          <ul>
            <li>Developed correlated displacement velocimetry (CDV) for nanoscale interfacial velocity field reconstruction.</li>
            <li>Built a polarization-resolved dark-field optical metrology system for sub-degree nanorod orientation tracking and membrane mechanical inference.</li>
            <li>Designed a miniature 3D-printed Langmuir trough enabling simultaneous imaging tensiometry and interfacial microrheology.</li>
          </ul>
        </div>
      </div>

      <!-- Publications -->
      <div class="cv-section">
        <h2>Selected Publications</h2>
        <p style="font-size:0.88rem; color:var(--color-text-muted); margin-bottom:0.8rem;">
          Full list on <a href="https://scholar.google.com/citations?user=X3997dAAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a>.
        </p>

        <ol class="pub-list">
          <li><strong>Molaei, M.</strong> et al. &ldquo;High dynamic range digital quantitation of targets.&rdquo; U.S. Patent Application US20250264395A1, Countable Labs.</li>
          <li>Chauhan, R., Usman, H., Minocha, N., <strong>Molaei, M.</strong>, et al. &ldquo;Predictive modeling and experimental validation of magnetophoretic delivery of magnetic nanocultures.&rdquo; <em>ACS Materials Letters</em>, 2025.</li>
          <li>Usman, H., <strong>Molaei, M.</strong>, House, S. D., et al. &ldquo;Magnetically responsive nanocultures for direct microbial assessment in soil environments.&rdquo; <em>Science Advances</em>, 2025.</li>
          <li>Redford, S. A., Colen, J., Zemsky, S., <strong>Molaei, M.</strong>, et al. &ldquo;Motor crosslinking augments elasticity in active nematics.&rdquo; <em>Soft Matter</em>, 2024.</li>
          <li>Chou, W. H., <strong>Molaei, M.</strong>, et al. &ldquo;Limiting pool and actin architecture controls myosin cluster sizes in adherent cells.&rdquo; <em>Biophysical Journal</em>, 2024.</li>
          <li><strong>Molaei, M.</strong> et al. &ldquo;Measuring response functions of active materials from data.&rdquo; <em>PNAS</em>, 2023.</li>
          <li>Lai, J. H., Keum, J., Lee, H. G., <strong>Molaei, M.</strong>, et al. &ldquo;New realm of precision multiplexing enabled by massively-parallel single molecule UltraPCR.&rdquo; <em>bioRxiv</em>, 2023.</li>
          <li><strong>Molaei, M.</strong>, Sreeja, K. K., Graber, Z. T., et al. &ldquo;Probing lipid membrane bending mechanics using gold nanorod tracking.&rdquo; <em>Physical Review Research</em>, 2022.</li>
          <li><strong>Molaei, M.</strong>, Chisholm, N. G., et al. &ldquo;Interfacial flow around Brownian colloids.&rdquo; <em>Physical Review Letters</em>, 2021.</li>
          <li><strong>Molaei, M.</strong> and Crocker, J. C. &ldquo;Interfacial microrheology and tensiometry in a miniature, 3-D printed Langmuir trough.&rdquo; <em>Journal of Colloid and Interface Science</em>, 2020.</li>
          <li><strong>Molaei, M.</strong>, Atefi, E., and Crocker, J. C. &ldquo;Nanoscale rheology and anisotropic diffusion using single gold nanorod probes.&rdquo; <em>Physical Review Letters</em>, 2018.</li>
          <li><strong>Molaei, M.</strong> and Sheng, J. &ldquo;Succeed escape: Flow shear promotes tumbling of <em>Escherichia coli</em> near a solid surface.&rdquo; <em>Scientific Reports</em>, 2016.</li>
          <li><strong>Molaei, M.</strong>, Barry, M., Stocker, R., et al. &ldquo;Failed escape: Solid surfaces prevent tumbling of <em>Escherichia coli</em>.&rdquo; <em>Physical Review Letters</em>, 2014.</li>
          <li><strong>Molaei, M.</strong> and Sheng, J. &ldquo;Imaging bacterial 3D motion using digital in-line holographic microscopy.&rdquo; <em>Optics Express</em>, 2014.</li>
        </ol>
      </div>

      <!-- Honors -->
      <div class="cv-section">
        <h2>Honors &amp; Recognition</h2>
        <ul style="padding-left:1.4rem; font-size:0.93rem;">
          <li>#1 Analytical Scientist Innovation Award, Countable Labs (2025)</li>
          <li>GoMRI Scholar for oil-spill research (2014)</li>
          <li>Top 0.1% in nationwide M.S. entrance examination, Iran (2007)</li>
          <li>Top 0.1% in nationwide B.S. entrance examination, Iran (2003)</li>
        </ul>
      </div>

      <!-- Service -->
      <div class="cv-section">
        <h2>Professional Service</h2>
        <ul style="padding-left:1.4rem; font-size:0.93rem;">
          <li>Journal reviewer: <em>Science Advances</em>, <em>PNAS</em>, <em>Soft Matter</em>, <em>Journal of Fluid Mechanics</em>, <em>Langmuir</em>, <em>Nano Letters</em></li>
          <li>Member, American Physical Society and American Institute of Chemical Engineers</li>
          <li>Open-source: <a href="https://trajkit-learn.readthedocs.io/en/latest/index.html" target="_blank" rel="noopener">Trajkit</a> — Python toolkit for spatiotemporal trajectory analysis</li>
        </ul>
      </div>

    </div>
  </main>

  <!-- Footer -->
  <footer>
    <p>&copy; 2026 Mehdi Molaei</p>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/cv.html`. Verify:
- "Download PDF" button is visible at the top
- All CV sections render: Education, Research Interests, Appointments, Publications, Honors, Service
- Google Scholar link at the bottom of Publications section works
- Layout stays readable at narrow widths

- [ ] **Step 3: Commit**

```bash
git add cv.html
git commit -m "feat: add CV page with rendered content and PDF download link"
```

---

## Task 5: Cross-page verification and GitHub Pages setup

**Files:**
- Verify: `index.html`, `projects.html`, `cv.html`
- Verify: `assets/css/style.css`, `assets/js/main.js`

- [ ] **Step 1: Verify nav active states across all pages**

Open each page and confirm:
- `index.html` → "Home" link is bold/underlined in nav
- `projects.html` → "Projects" link is bold/underlined in nav
- `cv.html` → "CV" link is bold/underlined in nav
- Clicking the brand name ("Mehdi Molaei") on all pages goes to `index.html`

- [ ] **Step 2: Verify mobile nav on all pages**

Resize browser to 375px width. On each page:
- Hamburger (☰) button is visible in nav
- Clicking it opens the nav links dropdown
- Clicking again closes it
- All three nav links are reachable via the dropdown

- [ ] **Step 3: Initialize git and push to GitHub**

If not already on GitHub, create the repo and push:

```bash
git remote add origin https://github.com/mehdimolaei/Portfolio.git
git branch -M main
git push -u origin main
```

- [ ] **Step 4: Enable GitHub Pages**

In the GitHub repository settings:
- Go to Settings → Pages
- Source: Deploy from branch → `main` → `/ (root)`
- Save

Wait ~1 minute, then visit `https://mehdimolaei.github.io/Portfolio/` (or the URL GitHub shows) to confirm the site is live.

- [ ] **Step 5: Add profile photo**

Place your photo at `assets/img/profile.jpg` (or `.png`), then in `index.html` replace:

```html
<div class="photo-placeholder">Photo</div>
```

with:

```html
<img src="assets/img/profile.jpg" alt="Mehdi Molaei" />
```

Commit:

```bash
git add assets/img/profile.jpg index.html
git commit -m "feat: add profile photo"
git push
```

- [ ] **Step 6: Compile and add CV PDF**

Compile the LaTeX CV:

```bash
cd docs
pdflatex CV_MehdiMolaei.tex
```

The output `docs/CV_MehdiMolaei.pdf` is already where `cv.html` expects it. Commit:

```bash
git add docs/CV_MehdiMolaei.pdf
git commit -m "docs: add compiled CV PDF"
git push
```

---

## Self-Review Notes

**Spec coverage check:**
- Home page with bio, photo, links, contact ✓ (Task 2)
- Projects page with Research + Personal sections ✓ (Task 3)
- CV page with download button + rendered content ✓ (Task 4)
- Shared nav across all pages ✓ (Tasks 2, 3, 4)
- Active nav state per page ✓ (Task 5)
- Mobile responsive nav ✓ (Task 1 CSS + Task 5)
- Static HTML/CSS/JS, no build step ✓
- GitHub Pages hosting ✓ (Task 5)
- Muted blue accent (`#4a7fa5`) ✓
- Max-width 800px centered column ✓

**Out-of-scope confirmed not in plan:** blog, individual project pages, dark mode, filtering, analytics.
