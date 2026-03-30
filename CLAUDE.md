# CLAUDE.md

This file provides guidance for AI assistants working in this repository.

## Project Overview

This is a **single-page personal portfolio website** deployed on GitHub Pages at the custom domain `colivares.cl`. It is a pure static site with no build tools, no frameworks, and no server-side processing — just three files: `index.html`, `style.css`, and `script.js`.

## Repository Structure

```
coliwares.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions auto-deploy to GitHub Pages on push to main
├── CNAME                # Custom domain: colivares.cl
├── README.md
├── index.html           # Entire site markup (~300 lines)
├── style.css            # All styles with CSS custom properties (~430 lines)
└── script.js            # All interactivity, vanilla JS (~148 lines)
```

## Technology Stack

- **No build tools** — no npm, no webpack, no bundler of any kind
- **No JavaScript framework** — vanilla ES6+ JS only
- **No CSS preprocessor** — plain CSS with custom properties
- **External dependency**: Font Awesome 6.5.0 via CDN (icons only)
- **Deployment**: GitHub Actions → GitHub Pages (auto-deploys on push to `main`)

## Development Workflow

### Local Development

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Serve locally (avoids some browser restrictions)
python -m http.server 8000
# Then visit http://localhost:8000
```

No install step, no build step. Changes to any file are immediately reflected on reload.

### Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which uploads the entire repository as a GitHub Pages artifact and deploys it. The live site updates within ~1–2 minutes of a push.

**Do not push unfinished work directly to `main` if the site is live.**

## Code Conventions

### HTML (`index.html`)

- Section IDs follow single-word kebab-case: `#hero`, `#about`, `#skills`, `#projects`, `#contact`
- CSS classes use hyphenated compound names: `.hero-cta`, `.project-card`, `.skill-category`
- All icon-only links and buttons have `aria-label` attributes
- Interactive elements that toggle visibility use `aria-expanded`
- Use semantic elements: `<section>`, `<article>`, `<header>`, `<footer>`
- No `data-*` attributes are used; rely on semantic HTML and class selectors

### CSS (`style.css`)

All design tokens are defined as CSS custom properties in `:root`. **Always use these variables; never hardcode colors, spacing, or font families.**

Key variables:
```css
/* Colors */
--color-bg: #0f172a          /* Dark navy background */
--color-bg-alt: #1e293b      /* Slightly lighter navy */
--color-surface: #1e293b     /* Card/surface backgrounds */
--color-primary: #38bdf8     /* Cyan accent (links, highlights) */
--color-primary-dark: #0ea5e9
--color-text: #e2e8f0        /* Body text */
--color-text-muted: #94a3b8  /* Secondary text */
--color-heading: #f8fafc     /* Headings */

/* Typography */
--font-sans: "Segoe UI", system-ui, -apple-system, sans-serif
--font-mono: "Cascadia Code", "Fira Code", "Courier New", monospace

/* Misc */
--section-padding: 5rem 0
--radius: 0.5rem
--radius-lg: 1rem
--transition: 0.25s ease
--shadow: 0 4px 24px rgba(0, 0, 0, 0.35)
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2)
```

Responsive breakpoints:
- `max-width: 768px` — tablet/mobile layout switch (grids collapse to single column)
- `max-width: 480px` — small mobile adjustments

Grid layouts use `repeat(auto-fit, minmax(..., 1fr))` for fluid responsiveness without hardcoded column counts.

### JavaScript (`script.js`)

- All vanilla ES6+; no jQuery, no libraries
- DOM element references are cached at the top of each handler, not queried repeatedly
- Scroll listener uses `{ passive: true }` for performance
- Scroll-reveal animations use `IntersectionObserver` (not scroll events)
- Form validation uses a regex for email; the form currently **simulates** submission — it does not actually send data to any endpoint
- The footer year is dynamically set via `new Date().getFullYear()`

**When adding new interactive features**, follow the existing pattern: query elements, add event listeners, keep logic self-contained. Do not introduce external libraries unless absolutely necessary.

## Key Areas Awaiting Customization

The site is a template. The following placeholders exist throughout `index.html`:

| Placeholder | Location | What to Replace With |
|---|---|---|
| `"Your Name"` | `<title>`, hero, footer | Actual name |
| `href="https://github.com/"` | Hero + footer social links | Real GitHub profile URL |
| `href="https://linkedin.com/"` | Hero + footer social links | Real LinkedIn profile URL |
| `href="#"` (CV button) | About section | Path to downloadable CV file |
| Avatar `<div>` placeholder | About section | `<img>` with real photo |
| Project cards (3 generic) | Projects section | Real project info + links |
| Skill lists | Skills section | Accurate skill set |
| Contact form action | Contact section | Real backend (Formspree, EmailJS, etc.) |

## Contact Form

The contact form in `#contact` currently **does not send email**. It validates client-side and simulates a 1.2-second delay before showing a success message. To make it functional, integrate one of:
- **Formspree**: Add `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` to the `<form>` tag
- **EmailJS**: Replace the form submit handler in `script.js`
- **Custom API**: POST to a backend endpoint

## Accessibility Requirements

Maintain these accessibility patterns when making changes:
- All icon-only interactive elements must have `aria-label`
- Form fields must have associated `<label>` elements
- Dynamic status messages must use `role="status"` and `aria-live="polite"`
- Maintain keyboard navigability for all interactive elements
- Do not remove focus styles (defined in `style.css`)

## Common Tasks

### Add a new project card

Copy an existing `.project-card` block in `index.html` within the `#projects` section and update the title, description, tech tags, and links. No CSS changes needed.

### Add a new skill category

Copy an existing `.skill-category` block within `#skills` and update the heading and list items. The grid is auto-fit so it will reflow automatically.

### Change the color scheme

Update the CSS custom properties in the `:root` block at the top of `style.css`. The entire site will update.

### Add a new section

1. Add a `<section id="new-section">` block in `index.html` after the existing sections but before the footer
2. Add a nav link `<a href="#new-section">Label</a>` in the navbar
3. Add matching CSS in `style.css` following existing patterns
4. The scroll-reveal animation will automatically pick up `.section-title`, `.card`, and `.contact-form` classes

## Git Conventions

- The `main` branch is the production branch — it auto-deploys on push
- Commit messages should be short and descriptive (imperative mood preferred)
- There is no `.gitignore` since there are no generated files to exclude
