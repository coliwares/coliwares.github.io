# About Me – Portfolio

A clean, modern personal portfolio website built with plain HTML, CSS, and JavaScript – no framework or build step required.

## Structure

```
aboutme/
├── index.html   # Main markup (Hero, About, Skills, Projects, Contact)
├── style.css    # Custom-property-driven dark theme
└── script.js    # Scroll effects, mobile nav, reveal animations & form UX
```

## Sections

| Section  | Description |
|----------|-------------|
| **Hero** | Name, role, CTA buttons and social links |
| **About** | Short bio and CV download button |
| **Skills** | Frontend, Backend and Tools categories |
| **Projects** | Card grid with links to source code / live demo |
| **Contact** | Client-validated email form |

## Getting started

Just open `index.html` in any browser – no dependencies to install.

To customise:
1. Replace `Your Name` and the placeholder texts in `index.html`
2. Update social / project links
3. Swap the avatar placeholder (`div.avatar-placeholder`) for a real `<img>` tag
4. Connect the contact form to a real backend or service (e.g. Formspree, EmailJS)

## Features

- 🌙 Dark theme with CSS custom properties (easy to retheme)
- 📱 Fully responsive (mobile-first)
- ♿ Accessible markup (ARIA labels, semantic HTML, keyboard-navigable)
- ✨ Scroll-reveal animations via `IntersectionObserver`
- 🔢 Dynamic footer year
