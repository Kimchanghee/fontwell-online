import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../../site.config';

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
  <title>${site.name} guides</title>
  <link>${site.url}/guides/</link>
  <atom:link href="${site.url}/guides/rss.xml" rel="self" type="application/rss+xml" />
  <description>Plain-English guides to open font licensing, variable fonts, CJK subsetting and web type.</description>
  <language>en</language>
  <lastBuildDate>${(guides[0]?.data.updated ?? new Date()).toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
