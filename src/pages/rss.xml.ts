import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../site.config';

// Site-wide feed. Guides are the only dated editorial items; the guides-only feed stays at /guides/rss.xml.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async () => {
  const guides = (await getCollection('guides')).sort((a, b) => +b.data.updated - +a.data.updated);
  const items = guides.map((g) => `  <item>
    <title>${esc(g.data.question)}</title>
    <link>${site.url}/guides/${g.id}/</link>
    <guid isPermaLink="true">${site.url}/guides/${g.id}/</guid>
    <pubDate>${g.data.published.toUTCString()}</pubDate>
    <description>${esc(g.data.answer)}</description>
  </item>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(site.name)}</title>
  <link>${site.url}/</link>
  <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
  <description>${esc(site.description)}</description>
  <language>en</language>
  <lastBuildDate>${(guides[0]?.data.updated ?? new Date()).toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
