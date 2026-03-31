# CLAUDE.md

This file provides guidance for AI assistants working on this repository.

## Project Overview

A personal portfolio website for **colivares.cl**, built with plain HTML, CSS, and JavaScript. Hosted on GitHub Pages with a custom domain. No framework, no build step, no dependencies.

- **Live site:** https://colivares.cl
- **Repo:** coliwares/coliwares.github.io
- **Deployment:** Auto-deploys to GitHub Pages on every push to `main`

## Repository Structure

```
coliwares.github.io/
├── index.html              # Entire site markup (single page)
├── style.css               # All styles (~690 lines)
├── script.js               # All JavaScript (~148 lines)
├── CNAME                   # Custom domain: colivares.cl
├── README.md               # User-facing project documentation
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions: push to main → deploy
```

Everything is flat at the root — no subdirectories for assets, components, or pages.

## Development Workflow

### Local development
No setup required. Open `index.html` directly in a browser, or use any static file server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

### Deployment
Pushing to `main` automatically triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which uploads the entire repository as a GitHub Pages artifact and deploys it. There is no build step.

### Branch convention
- `main` — production branch, auto-deploys
- Feature branches: use descriptive names, merge to `main` when done

## Architecture & Conventions

### HTML (`index.html`)
- Single-page application with anchor-based navigation
- Semantic HTML5 sections: `<header>`, `<nav>`, `<section>`, `<footer>`
- Section IDs used for scroll-spy and nav links: `#hero`, `#about`, `#skills`, `#projects`, `#contact`
- Font Awesome 6.5.0 loaded via CDN (icons only, no FA JavaScript)
- No other external scripts or stylesheets

### CSS (`style.css`)
- **Design token system**: All colors, spacing, and radii are defined as CSS custom properties on `:root`
- **Dark theme** by default — primary color tokens:
  - `--bg-primary: #0f172a` (dark navy background)
  - `--accent: #38bdf8` (sky blue accent)
  - `--text-primary: #e2e8f0` (light text)
  - `--border: #334155` (muted borders)
- **Mobile-first** responsive design
- Breakpoints: `768px` (tablet), `480px` (mobile)
- Layout: Flexbox and CSS Grid
- Transitions: `0.25s ease` standard duration
- Font stack: `"Segoe UI", system-ui` with `"Cascadia Code", "Fira Code"` for monospace

When changing colors or spacing, update the CSS custom properties in `:root` rather than individual selectors.

### JavaScript (`script.js`)
- **Vanilla JS only** — no libraries or frameworks
- Uses `IntersectionObserver` for scroll-reveal animations
- Uses passive scroll listeners for performance
- Form validation with regex: `/^[^\s@]+@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/`
- Contact form submission is simulated (1.2s delay) — needs a real backend (e.g. Formspree, EmailJS) to send actual emails
- ARIA attributes (`aria-expanded`, `aria-live`) are managed dynamically

## Page Sections

| Section | ID | Key elements |
|---|---|---|
| Hero | `#hero` | Name, role tagline, CTA buttons, social links |
| About | `#about` | Bio text, avatar placeholder (`div.avatar-placeholder`), CV download |
| Skills | `#skills` | Three skill category cards (Frontend, Backend, Data & Tools) |
| Projects | `#projects` | Three project cards with tags, GitHub/demo links |
| Contact | `#contact` | Validated form (name, email, message), status feedback |

## Common Customization Tasks

**Change name/role:** Edit the `<h1>` and `<p class="hero-subtitle">` in the `#hero` section of `index.html`.

**Add a project:** Copy an existing `.project-card` block in `#projects` and update the title, description, tags, and links.

**Replace avatar:** Swap `<div class="avatar-placeholder">` in `#about` with `<img src="..." alt="...">` and update CSS targeting `.avatar-placeholder` to `.avatar-placeholder img`.

**Connect contact form:** Replace the simulated submission in `script.js` with a real API call (Formspree endpoint, EmailJS, etc.).

**Retheme colors:** Update CSS custom properties on `:root` in `style.css`.

## Accessibility Requirements

Maintain these accessibility features when editing:
- Semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on interactive elements (`aria-label`, `aria-expanded`)
- `aria-live="polite"` on form status messages
- Proper heading hierarchy: `h1` → `h2` → `h3` (no skipping levels)
- Visible focus states on interactive elements

## CI/CD

The `.github/workflows/deploy.yml` workflow:
1. Triggers on push to `main`
2. Checks out the repo
3. Uploads the entire directory as a Pages artifact
4. Deploys to GitHub Pages

Concurrent deployments are cancelled (`cancel-in-progress: true` under the `pages` concurrency group). Required permissions: `pages: write`, `id-token: write`.

## Constraints

- **No build tools** — Do not introduce npm, bundlers, transpilers, or preprocessors
- **No frameworks** — Keep vanilla HTML/CSS/JS
- **No new dependencies** — Avoid adding CDN imports unless truly necessary
- **Single page** — All content lives in `index.html`; do not split into multiple HTML files
- **Flat structure** — Avoid creating subdirectories unless absolutely required
