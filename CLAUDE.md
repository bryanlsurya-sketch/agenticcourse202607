# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A static, single-page marketing site for a marketing consultancy ("Momentum"). Vanilla HTML/CSS/JS only — no framework, no build step, no package manager, no test suite. Visual direction is a professional, futuristic/high-tech aesthetic (deep black with an electric cyan/blue accent), built around a "Free Growth Audit" lead magnet to drive enquiry-form conversions, and structured for on-page SEO.

## Running

There is no build/lint/test tooling in this repo. To view changes, open `index.html` directly in a browser, or serve the folder with any static file server (e.g. `python -m http.server`) and visit it — either works since there's no bundler or dev server dependency.

## Architecture

Three files, each with a single responsibility:

- `index.html` — all markup for the one page: sticky nav, hero, proof-stats strip, "What You Get" (lead magnet offer cards), testimonials, FAQ accordion, enquiry form, footer. Includes Open Graph/Twitter meta tags and a `ProfessionalService` JSON-LD schema block. Loads Space Grotesk (display), Inter (body), and JetBrains Mono (eyebrows/stats/labels) from Google Fonts.
- `styles.css` — all styling. Theming is centralized in the `:root` CSS custom properties block at the top (colors, spacing scale, radii, shadows). The site uses a **deep black theme with an electric cyan/blue accent** (`--color-cyan*`, `--color-blue`); change the palette by editing these variables rather than hard-coded colors elsewhere in the file. The signature visual motif is `.hud-frame` — a reusable utility class that draws four corner brackets via layered CSS backgrounds (no extra markup), applied to every "data unit" panel (stat cards, offer cards, testimonial cards, FAQ items, the contact form). Photos get a consistent cyan/blue tint via `mix-blend-mode: color` overlays (see `.hero__frame::after` and `.testimonial-card__avatar-wrap::after`) rather than CSS filter hacks — `sepia()`+`hue-rotate()` was tried first and produced unpredictable hue shifts depending on the source photo's own colors.
- `script.js` — all behavior, split into setup functions called on `DOMContentLoaded`:
  - `setupMobileNav()` — hamburger toggle for the nav links below the 700px breakpoint
  - `setupSmoothScroll()` — intercepts in-page `#anchor` links and scrolls with an offset for the sticky nav height (`NAV_HEIGHT` constant, must match `--nav-height` in CSS)
  - `setupEnquiryForm()` — client-side validation (required fields + email regex) followed by a `fetch()` POST to Formspree as JSON, with Sending…/success/error UI states
  - `setupScrollReveal()` — IntersectionObserver-driven fade/rise-in for elements with class `.reveal`. Progressive enhancement: elements are only hidden (`.pre-reveal`, added via JS) after confirming JS is running, so no-JS visitors and crawlers always see full content. Skipped entirely when `prefers-reduced-motion: reduce` is set.
  - `animateCounters()` — called by the reveal observer; count-up animation for elements with `data-count-to`/`data-suffix`. The static number already in the HTML is the real, correct value (used as the no-JS/crawler fallback) — JS only animates the transition from 0, it never introduces data that isn't already present in the markup.

Other root files: `sitemap.xml`, `robots.txt` (reference the live GitHub Pages URL — update if the repo/owner ever changes).

## Key detail: Formspree endpoint

`FORMSPREE_ENDPOINT` at the top of `script.js` is a live Formspree form ID (`https://formspree.io/f/xvzevznw`), verified end-to-end via Playwright MCP. If this ever needs to move to a different Formspree account/form, update the constant and confirm the new form's recipient is verified in the Formspree dashboard (first submissions to an unconfirmed recipient are accepted with a 200 but not forwarded).

## CSS/JS breakpoints

Responsive behavior hinges on two breakpoints that must stay in sync across `styles.css`:
- `700px` — nav switches between hamburger (mobile) and inline links (desktop)
- `860px` — hero, proof-stats, "What You Get", and testimonial grids switch from 1 column to 2/3 columns
