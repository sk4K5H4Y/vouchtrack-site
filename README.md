# vouchtrack.com

Static marketing site built with [Astro](https://astro.build) 5 and deployed on Vercel.

## Where things live

| Path | What |
| --- | --- |
| `src/components/Header.astro` | The site header and nav. One copy for every page. |
| `src/components/Footer.astro` | The site footer. One copy for every page. |
| `src/raw/**/*.html` | Each page's content as plain HTML. Edit copy here. `<!--@header active=…-->` and `<!--@footer-->` mark where the shared header and footer go. |
| `src/pages/**/*.astro` | One tiny file per page that pairs its HTML with the layout. URLs follow these paths. |
| `src/layouts/Page.astro` | Swaps the markers for the shared header and footer. |
| `public/` | Files served as-is: `styles.css`, `assets/site.js`, images, `robots.txt`, `sitemap.xml`, `llms.txt`. |

`active` on the header marker is one of `how`, `whatwedo`, `industries`, `pricing`, `tools`, or empty.

## Commands

```
npm install
npm run dev       # live preview at http://localhost:4321
npm run build     # writes dist/
python3 preview.py  # serves dist/ with Vercel-style clean URLs
```

## Adding a page

1. Copy an existing file in `src/raw/` to the new path and edit it.
2. Add a matching `src/pages/<path>.astro` (copy any neighbor and fix the two paths).
3. Add the URL to `public/sitemap.xml`.

Vercel builds with `npm run build` and serves `dist/` (see `vercel.json`).
