<div align="center">

# Momentum — Marketing Consultancy Site

A static, single-page marketing site for a marketing consultancy ("Momentum").
Vanilla HTML/CSS/JS only — no framework, no build step, no package manager.

[![Deploy to GitHub Pages](https://github.com/bryanlsurya-sketch/agenticcourse202607/actions/workflows/deploy.yml/badge.svg)](https://github.com/bryanlsurya-sketch/agenticcourse202607/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/live%20site-momentum-00e5ff?logo=github)](https://bryanlsurya-sketch.github.io/agenticcourse202607/)
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
| **Theme** | Futuristic, deep black with an electric cyan/blue accent |

---

## Screenshot

![Momentum site screenshot](assets/screenshot.png)

---

## Structure

| File | Responsibility |
|---|---|
| `index.html` | All markup — nav, hero, proof stats, "What You Get" (lead magnet offer), testimonials, FAQ, enquiry form, footer. Includes Open Graph/Twitter tags and JSON-LD schema |
| `styles.css` | All styling — theme variables live in the `:root` custom-properties block. Signature `.hud-frame` corner-bracket motif used across cards, form, and FAQ |
| `script.js` | All behavior — mobile nav toggle, smooth scroll, enquiry form validation/submission, scroll-reveal animations, stat counters |
| `assets/images/` | Hero and testimonial photography, cyan/blue-tinted via `mix-blend-mode` overlays to match the accent |
| `sitemap.xml` / `robots.txt` | SEO crawl directives, pointing at the GitHub Pages URL |
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

<div align="center">

## Mascot

```
    \    /\
     )  ( ')
    (  /  )
     \(__)|
```

</div>
