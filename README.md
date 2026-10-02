# Sugandha Jha — Portfolio

A static portfolio site (HTML, CSS, a little JavaScript). No build step, so it can go straight onto GitHub Pages.

```
sugandha-portfolio/
├── index.html                 page content
├── styles.css                 design (colours, type, layout)
├── script.js                  nav, scroll fade-ins, timeline, parallax
├── .nojekyll                  tells GitHub Pages to serve files as-is
└── assets/
    ├── favicon.svg
    ├── og-image.png           preview image LinkedIn shows when the link is shared
    └── Sugandha_Jha_Resume.pdf  the "Download PDF" file in Contact
```

## Preview locally

```bash
python -m http.server 5180 --directory sugandha-portfolio
```

Then open http://localhost:5180.

## Publish on GitHub Pages

1. Create a GitHub account (if needed) and a new **public** repository.
   - Name it `<your-username>.github.io` for the address `https://<your-username>.github.io/`, or
   - give it any name (e.g. `portfolio`) for `https://<your-username>.github.io/portfolio/`.
2. Upload everything **inside** this folder (not the folder itself) to the repository root — including `.nojekyll` and `assets/`. On github.com: *Add file → Upload files*, drag the files in, commit.
3. Go to **Settings → Pages**, set *Source* to **Deploy from a branch**, branch **main**, folder **/ (root)**, and save.
4. After a minute or two the site is live at the address shown on that page.

## Before sharing on LinkedIn

In `index.html`, replace `YOUR-GITHUB-USERNAME` in the two `og:` lines near the top with the real address, e.g.

```html
<meta property="og:url" content="https://sugandhajha.github.io/">
<meta property="og:image" content="https://sugandhajha.github.io/assets/og-image.png">
```

(If the repository isn't named `<username>.github.io`, include the repo name: `https://sugandhajha.github.io/portfolio/assets/og-image.png`.)

LinkedIn needs that full address to show the preview card. After publishing, paste the link into the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to refresh the preview, then:

- add it under **Profile → Contact info → Website**, and/or
- add it to **Featured** as a link, and/or
- share it in a post.

## Editing content

All text lives in `index.html`, one section per `<section>` block. Colours and fonts are set at the top of `styles.css`. To update the resume download, replace `assets/Sugandha_Jha_Resume.pdf` with a new file of the same name.
