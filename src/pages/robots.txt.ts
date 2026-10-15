import type { APIRoute } from 'astro';
import { site } from '../site.config';

export const GET: APIRoute = () => new Response(
`# ${site.name} — all crawlers welcome, including AI crawlers.
User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap-index.xml
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
