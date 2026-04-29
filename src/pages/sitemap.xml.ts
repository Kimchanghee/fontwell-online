import type { APIRoute } from 'astro';
import { readFile } from 'fs/promises';
import { join } from 'path';

const SITE = 'https://fontwell.online';

export const GET: APIRoute = async () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries: Array<{ loc: string; priority: number; changefreq: string }> = [
    { loc: SITE, priority: 1.0, changefreq: 'weekly' },
    ...['sans-serif', 'serif', 'display', 'handwriting', 'monospace', 'korean'].map((c) => ({
      loc: `${SITE}/category/${c}`, priority: 0.8, changefreq: 'weekly',
    })),
  ];

  try {
    const data = await readFile(join(process.cwd(), 'src/data/fonts.json'), 'utf-8');
    const fonts: any[] = JSON.parse(data);
    for (const f of fonts.slice(0, 200)) {
      entries.push({
        loc: `${SITE}/font/${encodeURIComponent(f.family.toLowerCase().replace(/\s+/g, '-'))}`,
        priority: 0.7,
        changefreq: 'monthly',
      });
    }
  } catch {}

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url><loc>${e.loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
