import type { APIRoute } from 'astro';
import { sitemapParts, render } from './sitemap-index.xml';

export const GET: APIRoute = async () =>
  new Response(render((await sitemapParts()).pages), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
