import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { STATIC_PAGES, RELEASE } from '../lib/pages';
import { curated, fontsData } from '../lib/data';
import { site } from '../site.config';

const day = (d: string | Date) => (typeof d === 'string' ? d : d.toISOString()).slice(0, 10);
const max = (...d: string[]) => d.sort().at(-1)!;
const xml = (urls: { loc: string; lastmod: string }[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site.url}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}\n</urlset>\n`;

export async function sitemapParts() {
  const dataDay = day(fontsData.asOf);
  const guides = (await getCollection('guides')).sort((a, b) => a.data.order - b.data.order);
  return {
    pages: STATIC_PAGES.map((p) => ({ loc: p.path, lastmod: p.updated === 'data' ? dataDay : p.updated })),
    fonts: curated.map((f) => ({ loc: `/fonts/${f.s}/`, lastmod: max(f.lm, RELEASE) })),
    guides: guides.map((g) => ({ loc: `/guides/${g.id}/`, lastmod: day(g.data.updated) })),
  };
}
export const render = xml;

export const GET: APIRoute = async () => {
  const parts = await sitemapParts();
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.entries(parts)
    .map(([k, urls]) => `  <sitemap><loc>${site.url}/sitemap-${k}.xml</loc><lastmod>${urls.map((u) => u.lastmod).sort().at(-1)}</lastmod></sitemap>`)
    .join('\n')}\n</sitemapindex>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
