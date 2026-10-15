# fontwell.online v2 rebuild — progress (resume from here)

Branch: `v2-cloudflare-static` (push after every milestone). Contract: `../CONTRACT.md`. Brief: fontwell section of `../BRIEFS.md`.

## Milestones
- [x] M0 Old tree removed (incl. .env.local/.env.production), new package.json/.gitignore, `scripts/refresh.mjs`, `src/lib/core.mjs` (licenses, type scale, pairing)
- [ ] M1 Data snapshot committed (`pnpm refresh` -> src/data/fonts.json, axes.json, details.json)
- [ ] M2 Astro skeleton: astro.config, site.config.ts, wrangler.jsonc, layout (proofing-desk design), ads.txt/robots/llms, OG script
- [ ] M3 Home live search/filter + per-font pages (curated ~200)
- [ ] M4 Tools: pairing tester, license checker, type-scale generator (+ node:test)
- [ ] M5 Guides x10+ (content collection) + RSS + backlog
- [ ] M6 Legal/About/Methodology/Contact/404
- [ ] M7 gate.mjs, refresh-build.ps1, `pnpm build/check/gate` pass
- [ ] M8 QA: curl crawler checks, Playwright 390/1440 screenshots, scorecard.md, measure.md, DESIGN_REFERENCES.md

## Notes
- Metaphor: type-foundry specimen sheet / proofing desk.
