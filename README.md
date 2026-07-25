<div align="center">

# Momentum — Marketing Consultancy Site

A static, single-page marketing site for a marketing consultancy ("Momentum").
Vanilla HTML/CSS/JS only — no framework, no build step, no package manager.

[![Deploy to GitHub Pages](https://github.com/bryanlsurya-sketch/agenticcourse202607/actions/workflows/deploy.yml/badge.svg)](https://github.com/bryanlsurya-sketch/agenticcourse202607/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/live%20site-momentum-coral?logo=github)](https://bryanlsurya-sketch.github.io/agenticcourse202607/)
[![No Build Step](https://img.shields.io/badge/build-none-lightgrey)](#running-locally)

</div>

---

## Overview

| | |
|---|---|
| **Type** | Static single-page marketing site |
| **Stack** | HTML5, CSS3, vanilla JavaScript |
| **Hosting** | GitHub Pages, via GitHub Actions |
| **Live URL** | [bryanlsurya-sketch.github.io/agenticcourse202607](https://bryanlsurya-sketch.github.io/agenticcourse202607/) |
| **Theme** | Black/dark, coral accent |

---

## Structure

| File | Responsibility |
|---|---|
| `index.html` | All markup — sticky nav, hero, testimonials grid, enquiry form, footer |
| `styles.css` | All styling — theme variables live in the `:root` custom-properties block |
| `script.js` | All behavior — mobile nav toggle, smooth scroll, enquiry form validation/submission |
| `.github/workflows/deploy.yml` | GitHub Actions workflow that publishes the site to GitHub Pages on push to `main` |

---

## Running locally

No build tooling required. Either open `index.html` directly in a browser, or serve the folder with any static file server:

```sh
python -m http.server
```

---

## Deployment

| Trigger | Action | Result |
|---|---|---|
| Push to `main` | `.github/workflows/deploy.yml` runs | Site published to GitHub Pages |

---

## Note

> `FORMSPREE_ENDPOINT` in `script.js` is a placeholder and must be replaced with a real Formspree form ID before the enquiry form will deliver submissions.

---

<div align="center">

## Mascot

```
    \    /\
     )  ( ')
    (  /  )
     \(__)|
```

</div>
