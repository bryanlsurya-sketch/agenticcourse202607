# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A static, single-page marketing site for a marketing consultancy ("Momentum"). Vanilla HTML/CSS/JS only — no framework, no build step, no package manager, no test suite.

## Running

There is no build/lint/test tooling in this repo. To view changes, open `index.html` directly in a browser, or serve the folder with any static file server (e.g. `python -m http.server`) and visit it — either works since there's no bundler or dev server dependency.

## Architecture

Three files, each with a single responsibility:

- `index.html` — all markup for the one page: sticky nav, hero, testimonials grid, enquiry form, footer. Loads Inter from Google Fonts.
- `styles.css` — all styling. Theming is centralized in the `:root` CSS custom properties block at the top (colors, spacing scale, radii, shadows). The site uses a **black/dark theme** with a coral accent (`--color-coral*`); change the palette by editing these variables rather than hard-coded colors elsewhere in the file.
- `script.js` — all behavior, split into three setup functions called on `DOMContentLoaded`:
  - `setupMobileNav()` — hamburger toggle for the nav links below the 700px breakpoint
  - `setupSmoothScroll()` — intercepts in-page `#anchor` links and scrolls with an offset for the sticky nav height (`NAV_HEIGHT` constant, must match `--nav-height` in CSS)
  - `setupEnquiryForm()` — client-side validation (required fields + email regex) followed by a `fetch()` POST to Formspree as JSON, with Sending…/success/error UI states

## Key detail: Formspree endpoint

`FORMSPREE_ENDPOINT` at the top of `script.js` is a placeholder (`https://formspree.io/f/{YOUR_FORM_ID}`). It must be replaced with a real Formspree form ID before the enquiry form will actually deliver submissions — until then, submissions will fail and show the inline error state by design. The same placeholder is flagged with a `TODO` comment in `index.html` above the `<form>`.

## CSS/JS breakpoints

Responsive behavior hinges on two breakpoints that must stay in sync across `styles.css`:
- `700px` — nav switches between hamburger (mobile) and inline links (desktop)
- `860px` — testimonial grid switches from 1 column to 3 columns
