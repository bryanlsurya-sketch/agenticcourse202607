---
description: Security-scan, push to GitHub, refresh README/About, and (re)deploy GitHub Pages via Actions
---

Run the full publish workflow for this repo, in order. Do not skip the security scan step, and do not push if it finds anything unresolved.

## 1. Security scan (before touching git)

Scan the working tree (staged, unstaged, and untracked files — `git status`, `git diff`) for anything that shouldn't be pushed publicly:

- Secrets/keys: API keys, tokens, private keys, `.env` files, credentials, connection strings (grep for patterns like `AKIA`, `-----BEGIN`, `sk-`, `api_key`, `password=`, etc.)
- Files that look accidental: editor swap files, OS files (`.DS_Store`, `Thumbs.db`), local config, `node_modules`, build artifacts
- The `FORMSPREE_ENDPOINT` placeholder in `script.js` is expected and fine — it's not a secret, just flag if it's been replaced with what looks like a real, private-looking ID and confirm with the user that's intended.

If anything sensitive is found: stop, report it, and ask the user how to handle it (exclude via `.gitignore`, remove, or explicit override) rather than pushing it. Never silently proceed past a finding.

If nothing sensitive is found, say so briefly and continue.

## 2. README

Review `README.md` against the current state of the repo (files present, what the site does, how to run it, deployment method). Update it if it's stale. Keep/restore these sections:

- Project description
- Live site link (GitHub Pages URL — see step 4)
- File structure
- How to run locally
- Deployment note (GitHub Actions → Pages)
- A "Mascot" section containing this exact ASCII art mouse (keep it verbatim in a fenced code block):

```
    \    /\
     )  ( ')
    (  /  )
     \(__)|
```

## 3. GitHub Pages workflow

Confirm `.github/workflows/deploy.yml` exists and deploys the static site to GitHub Pages on push to `main` (using `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`). Create it if missing; leave it alone if already correct.

## 4. Commit and push

Stage the relevant changes (README, workflow file, any other tracked edits — never `git add -A` blindly, review what's staged first), commit with a clear message, and push to `origin main`. Confirm with the user before pushing, per standard practice for actions visible to others.

## 5. About section (description, website, topics)

Check whether `gh` CLI is available and authenticated (`gh auth status`). 

- If yes: use `gh repo edit` to set the description, homepage (the GitHub Pages URL from step 3/6), and topics.
- If no: don't attempt raw API calls with scraped credentials. Instead, output the exact description, website URL, and topic list for the user to paste into the repo's About → gear icon panel themselves.

## 6. GitHub Pages link

The Pages URL follows the pattern `https://<owner>.github.io/<repo>/`. Confirm it (or check the Actions run / Pages settings if uncertain) and make sure it's used consistently in both the README and the About section (step 5).

## 7. Report back

Summarize what changed, whether the security scan found anything, whether the push succeeded, and whether the About section was updated automatically or needs the user to paste values in manually.
