# Momentum — Marketing Consultancy Site

A static, single-page marketing site for a marketing consultancy ("Momentum"). Vanilla HTML/CSS/JS only — no framework, no build step, no package manager.

## Live site

Deployed via GitHub Actions to GitHub Pages: https://bryanlsurya-sketch.github.io/agenticcourse202607/

## Structure

- `index.html` — all markup: sticky nav, hero, testimonials grid, enquiry form, footer
- `styles.css` — all styling, themed via CSS custom properties in `:root` (black/dark theme with a coral accent)
- `script.js` — mobile nav toggle, smooth scroll, and client-side enquiry form validation/submission

## Running locally

No build tooling required. Either open `index.html` directly in a browser, or serve the folder with any static file server:

```
python -m http.server
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which publishes the site to GitHub Pages.

## Note

`FORMSPREE_ENDPOINT` in `script.js` is a placeholder and must be replaced with a real Formspree form ID before the enquiry form will deliver submissions.

## Mascot

```
    \    /\
     )  ( ')
    (  /  )
     \(__)|
```
