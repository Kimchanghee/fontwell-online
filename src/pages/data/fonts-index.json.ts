import type { APIRoute } from 'astro';
import { families, curatedSet, fontsData } from '../../lib/data';

// Compact search index for the proofing desk (loaded on demand by the browser).
// Row: [family, slug, category, subsets, weights, italic, axes, licence, primaryScript, curated, popularityRank]
export const GET: APIRoute = () => {
  const rows = families.map((f, i) => [
    f.f, f.s, f.c, f.sub.join(' '), f.w.join(' '), f.i ? 1 : 0, f.ax.map((a) => `${a.t}:${a.min}-${a.max}`).join(' '),
    f.lic ?? '', f.ps, curatedSet.has(f.s) ? 1 : 0, i + 1,
  ]);
  return new Response(JSON.stringify({ asOf: fontsData.asOf, source: fontsData.sourceUrl, rows }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
