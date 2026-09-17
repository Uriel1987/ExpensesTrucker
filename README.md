# מעקב הוצאות – PWA package (same structure as TlushOmatic)

This mirrors exactly how TlushOmatic was set up: a real `manifest.json`,
`service-worker.js`, and icon files sitting alongside `index.html` — not a
single self-contained file. That's different from how this chat's Artifact
tool publishes things (one HTML file only), so this package needs to be
hosted somewhere that serves these as separate files — for example,
through Claude Cowork (the same way TlushOmatic was built), or any static
web host (GitHub Pages, Netlify, Vercel, a plain web server, etc.).

## What's here
- `index.html` — the app
- `manifest.json` — installability metadata (name, icons, standalone display, RTL/Hebrew)
- `service-worker.js` — offline caching (stale-while-revalidate, same pattern as TlushOmatic)
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png` — app icons

## On an Android phone, once hosted
Open the URL in Chrome → Chrome will offer "Add to Home Screen" / "Install
app" → it gets a real icon and opens full-screen, and after the first
successful load it keeps working with no internet connection at all.

## Receipt scanning in this version
This PWA version has no cloud connection to Claude and no native Google ML
Kit (that only exists in the separate native Android/Capacitor build) — so
the scan button will show as unavailable here. Everything else (expenses,
categories, budgets, recurring, search, charts, CSV export) works fully
offline once the service worker has cached the app.
