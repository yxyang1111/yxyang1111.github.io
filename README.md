# Yuxin Yang · Academic Homepage

Personal academic homepage for Yuxin Yang (杨宇昕), Peking University.

**Website:** https://yxyang1111.github.io/

## Site

A dependency-free, responsive static website with English/Chinese switching, a direct publication list and BibTeX citation copying. All academic content is based on the supplied CV, dated November 11, 2026. The ICASSP 2027 submission is explicitly labeled under review and is not represented as an accepted publication.

## Edit

- `index.html`: academic content. Bilingual strings use `data-en` and `data-zh`; update both attributes and the visible English text.
- `honors.html`: honors and awards, linked discreetly from the homepage footer.
- `research-*.html`: five individual research pages with project context, contributions and progress. Add supplied figures, benchmarks and demos to the relevant page.
- `styles.css`: typography, colors, responsive layout, and print styles.
- `script.js`: language switching and citation copying.
- `favicon.svg`: site icon.

The homepage uses the university email address supplied in the CV. It does not include the login email, phone number, or the original CV file. No analytics, external fonts, or third-party JavaScript are loaded.

## Local preview

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. The site can also be opened directly via `index.html`; citation copying depends on browser clipboard permissions.

## GitHub Pages

Repository: `yxyang1111/yxyang1111.github.io`.

In **Settings → Pages**, set **Source → Deploy from a branch**, **Branch → main**, **Folder → /(root)**, and save. The `.nojekyll` file allows the static site to be served directly. Future commits to `main` update the website automatically.

Official documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Content maintenance

- Update manuscript status only after it is confirmed; do not turn a submission into a publication automatically.
- Add real paper and project links when available; no placeholder DOI or Scholar links are included.
- Update the footer and `sitemap.xml` when substantive content changes.
