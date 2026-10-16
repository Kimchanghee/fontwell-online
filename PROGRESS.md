# fontwell.online v2 rebuild — progress (resume from here)

Branch: `v2-cloudflare-static` (push after every milestone). Contract: `../CONTRACT.md`. Brief: fontwell section of `../BRIEFS.md`.

## Milestones
- [x] M0 Old tree removed (incl. .env.local/.env.production), new package.json/.gitignore, `scripts/refresh.mjs`, `src/lib/core.mjs` (licenses, type scale, pairing)
- [x] M1 Data snapshot committed (`pnpm refresh` -> src/data/fonts.json, axes.json, details.json)
- [x] M2 Astro skeleton: astro.config, site.config.ts, wrangler.jsonc, layout (proofing-desk design), ads.txt/robots/llms, OG script
- [x] M3 Home live search/filter + per-font pages (curated ~200)
- [x] M4 Tools: pairing tester, license checker, type-scale generator (+ node:test, 12 pass)  (commit d32c1d1)
- [x] M5 Guides x11 (content collection) + RSS (commit 55cfd13)
- [x] M6 Legal/About/Methodology/Contact/404 + tools index (commit b6ee781)
- [x] M7 gate.mjs passes 224 pages; `astro check` 0 errors (TypeScript pinned to 6.x: astro check refuses TS 7); scripts/refresh-build.ps1
- [x] M7b Typography made distinct from raterunner/stockmarketnews (which share Source Serif 4 + Plex Mono): Fraunces (display) + Public Sans (text) + Red Hat Mono (labels); footer links 44 px
- [ ] M8 QA: content/backlog.md, curl crawler checks on preview, Playwright 390/1440 screenshots, seo/scorecard.md, seo/measure.md, DESIGN_REFERENCES.md
- [ ] M9 Final report

## Notes
- Metaphor: type-foundry specimen sheet / proofing desk.
- Build: `node node_modules/astro/bin/astro.mjs build` (Astro 7.3.8), ASTRO_TELEMETRY_DISABLED=1. ~30-45 s, 225 pages.
- Unbounded's designer is the foundry "NaN" (real data): rendered "NaN (type foundry)", LD creator Organization; gate allows that exact phrase.