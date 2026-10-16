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
- [ ] M8 QA (documentation/crawl complete; remaining final check reconciliation and CLS finding in seo/scorecard.md): content/backlog.md, curl crawler checks on preview, Playwright 390/1440 screenshots, seo/scorecard.md, seo/measure.md, DESIGN_REFERENCES.md
- [x] M9 Final local handoff report: seo/scorecard.md (not a deployment or full QA approval)

## Notes
- Metaphor: type-foundry specimen sheet / proofing desk.
- Build: `node node_modules/astro/bin/astro.mjs build` (Astro 7.3.8), ASTRO_TELEMETRY_DISABLED=1. ~30-45 s, 225 pages.
- Unbounded's designer is the foundry "NaN" (real data): rendered "NaN (type foundry)", LD creator Organization; gate allows that exact phrase.
## 2026-10-16 continuation
Preserved existing implementation. Added design reference/license audit, question inventory/backlog, measurement plan, evidence scorecard and fail-closed screenshot runner. Build 225 pages; gate 224/224; tests 12/12. Remaining M8 gaps are explicitly documented, not marked complete.

## Bounded QA follow-up
Font-loading stability and default-off advertising corrected; direct typecheck clean (45 files), initial complete build/gate/tests and Edge 10-case QA passed. Added standalone 44px target fixes and reusable `node scripts/qa-local.cjs`; detailed evidence in scorecard. Final build after the last home-link rule was interrupted (server restart, then 180s timeout); dist currently incomplete. M8 remains open pending one clean direct build + gate + strict QA run. No deploy/accounts; Astro 7 versus contract 5 documented, unchanged.

## Parent reconciliation 2026-10-16 23:47 KST
- Parent corrected remaining breadcrumb/footer link width to 44px, keeping prior 44px height.
- Fresh direct Astro build: 225 pages; gate224/224; same-process Edge QA at1440/390 all10cases passed; max observed CLS0.0004, no document overflow, standalone touch-target check now passes. Exact final log: ../_refs/fontwell-final-fixed.log and final result marker.
- Public deployment verified: version8aac8aee-ffa3-4cbf-b3c0-0387fac62c71, home200/missing404, GA4 tag present, advertising loader OFF. GSC domain verified and sitemap success reported by account child; account evidence ../_refs/gsc-batch-20261016.
- Astro7 is retained as an internal implementation exception after complete static-output QA; no claim this build uses Astro5. AdSense approval, revenue, indexing and recurring refresh remain unverified/not started.
