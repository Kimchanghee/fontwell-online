import type { APIRoute } from 'astro';
import { families } from '../../lib/data';

// Secondary sort fields for the desk: [slug, trendingRank, dateAdded]
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ rows: families.map((f) => [f.s, f.t, f.da]) }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
