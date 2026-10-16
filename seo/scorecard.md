# Fontwell local scorecard, 2026-10-16

## Before
Shared contract records the old public deployment as HTTP 402. This is inherited historical evidence, not a fresh live measurement. No deployment/account work was performed.

## After: local evidence
- Build: direct Astro 7.3.8 CLI completed 225 pages in 53.84s (qa/verified-build.log). Package build generated OG images, but pnpm launcher stalled; direct CLI used without changing dependencies.
- Gate rerun after build: PASS, 224 indexable pages and 224 sitemap URLs. Genuine 404 excluded from sitemap/canonical and intentionally noindex.
- Unit tests: 12/12 pass, 0 failed (qa/last-test.log).
- Astro check was started; final result must be reconciled in qa/verified-check.log before release.
- Final curl checks after build: /, /fonts/inter/, /tools/type-scale/, /guides/what-is-the-sil-open-font-license/, /sitemap-index.xml, /robots.txt, /llms.txt, /ads.txt all 200; /missing-final-qa/ 404. Raw no-JS bodies: qa/crawl-final*.txt. Earlier transient 404s happened while dist was rebuilding and are superseded by this completed-build crawl.

SEO: local gate passes title/description/canonical/JSON-LD/source/sitemap checks. AEO: direct answers and visible FAQ source model. GEO: dated official source snapshots and llms.txt. LLMO: consistent identity, methodology and stable routes. NEO: English product, not a Korean locale campaign. Content: 11 guide entries; editorial backlog now recorded. These are implementation checks, not indexing or citation outcomes.

## Visual evidence and adversarial review
qa/final-verified covers home, Inter and type-scale at 390/1440; qa/final-home is a post-build repeat of home. Initial qa/final-screens contains connection-error pages and MUST NOT be treated as success. First desktop home in final-verified was captured during rebuild and is invalid; use final-home only if status=200.
Inspected mobile home, Inter, type-scale and desktop proof-sheet/404 screenshots. The paper, ink, ruled specimen layout and restrained typography are product-specific, not generic SaaS. Mobile form hierarchy and 3px keyboard focus are clear. The prior 726px-wide Inter screenshot in qa/screens is stale; latest report has 390/390 and no document overflow. Horizontal table/code scroll is contained.
Remaining quality finding: desktop type-scale CLS-ish observation 0.1523 (above 0.1); do not claim a complete stability pass. Small inline links remain below 44px; touch controls are generally 44px, but an exhaustive target audit is still needed. No browser downloaded: shared _pw-browsers directory absent; installed Edge used. Screenshot runner now exits nonzero on wrong HTTP status, navigation failure or document overflow.

## Preserved constraints and release gaps
Astro 7.3.8 is inherited, versus contract Astro 5; no unapproved downgrade attempted. Snapshot: 1,950 families, 200 curated font pages; asOf 2026-10-15T14:46:57.695Z; official Google Fonts metadata and google/fonts METADATA.pb/licence directories. 11 guides, 3 tools, other hubs/legal pages, 225 total including 404. GA/GSC identifiers, CMP/account setup, public release verification and +14-day measurement belong to parent. No deployment, account changes, indexing claims or revenue claims.

## Bounded follow-up (2026-10-16, from 4f2648f)
- Fixed late self-hosted font swaps: explicit optional Fontsource faces plus preloads for the three primary Latin faces. The prior desktop type-scale movement involved the form/table following text reflow; no JS initial rerender was present. Optional display prevents late swaps rather than hiding the content or reserving a guessed page height.
- Direct ASTRO_TELEMETRY_DISABLED=1 Astro check: 45 files, 0 errors/warnings/hints (qa/bounded-check.log). Direct build completed 225 pages in 53.69s, gate 224/224, tests 12/12 before the last home-target CSS rule.
- Installed Edge preview+QA in one owned process: home, Inter, type-scale, privacy and real 404 at 1440/390. All expected statuses, no document overflow; type-scale CLS 0 at both sizes, maximum observed 0.0004 (desktop Inter). Focus outlines 3px. qa/bounded-screens/report.json and screenshots. Desktop type-scale focus screenshot visually inspected; proofing-desk identity preserved.
- adsEnabled defaults false and requires PUBLIC_ADS_ENABLED === 'true'. Only loader gated; live local checks confirmed loader absent, account meta and ads.txt intact. Removed false verified-CMP claim. No account or deployment action.
- Increased logo/copy/source/margin/404 target sizes. Initial home audit found 3 small checkbox glyphs inside 44px labels and 5 desk links. Added 44px desk-link rule and corrected label-aware audit; strict runner now rejects CLS >0.1 and standalone targets <44px.
- IMPORTANT final reconciliation gap: after the last home-link CSS rule, server restart interrupted a build; retry exceeded 180 seconds and was stopped mid-build. Thus current dist is incomplete, and the final home-target change/stricter audit have NOT completed a fresh full run. Do not deploy this dist or mark M8 complete. Re-run direct build, gate, then node scripts/qa-local.cjs (preview and QA remain in one process). The earlier complete-run screenshots are evidence of the pre-final-target source, not current dist.
- Astro 7.3.8 vs contract 5 remains explicitly unresolved; no blind dependency downgrade. CMP/GA/GSC/public verification remain parent-owned.
