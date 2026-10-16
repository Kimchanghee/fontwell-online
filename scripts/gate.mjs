#!/usr/bin/env node
// Publish gate (fire-your-seo-agency Phase 5). Runs against the built dist/ and fails non-zero on any problem.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const dist = join(root, 'dist');
const ORIGIN = 'https://fontwell.online';
const KEY = (readFileSync(join(root, 'src', 'site.config.ts'), 'utf8').match(/indexNowKey:\s*'([0-9a-f]+)'/) || [])[1];

const errors = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);
if (!existsSync(dist)) { console.error('dist/ missing: run pnpm build first'); process.exit(1); }

const ent = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", '#x27': "'" };
const decode = (s) => s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
  if (ent[e]) return ent[e];
  if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
  return m;
});
const norm = (s) => decode(s).replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\s+/g, ' ').trim();
const visible = (html) => norm(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' '));
const words = (s) => s.split(/\s+/).filter(Boolean).length;

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out); else if (n.endsWith('.html')) out.push(p);
  }
  return out;
}

// ---- site-level files ----
for (const f of ['robots.txt', 'llms.txt', 'ads.txt', 'sitemap-index.xml', '404.html', 'guides/rss.xml', 'favicon.svg']) {
  if (!existsSync(join(dist, f))) fail('site', `missing ${f}`);
}
if (KEY && !existsSync(join(dist, `${KEY}.txt`))) fail('site', 'IndexNow key file missing');
const robots = existsSync(join(dist, 'robots.txt')) ? readFileSync(join(dist, 'robots.txt'), 'utf8') : '';
if (!/Sitemap:\s*https:\/\/fontwell\.online\/sitemap-index\.xml/.test(robots)) fail('robots.txt', 'no sitemap line');
if (/Disallow:\s*\/\s*$/m.test(robots)) fail('robots.txt', 'blocks the whole site');
const ads = existsSync(join(dist, 'ads.txt')) ? readFileSync(join(dist, 'ads.txt'), 'utf8') : '';
if (!ads.includes('google.com, pub-4490818204529253, DIRECT, f08c47fec0942fa0')) fail('ads.txt', 'wrong content');

const sitemapUrls = new Set();
for (const n of readdirSync(dist).filter((n) => /^sitemap-.*\.xml$/.test(n) && n !== 'sitemap-index.xml')) {
  const xml = readFileSync(join(dist, n), 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.add(m[1]);
  for (const m of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) if (Number.isNaN(Date.parse(m[1]))) fail(n, `bad lastmod ${m[1]}`);
}
if (sitemapUrls.size === 0) fail('sitemap', 'no URLs');

const PLACEHOLDER = /lorem ipsum|\bTODO\b|\bTBD\b|\bFIXME\b|\{\{|\[object Object\]|\bundefined\b|\bNaN\b(?! \(type foundry\))|placeholder text/i;
const SOURCED = /^\/(fonts\/[^/]+|guides\/[^/]+|tools\/[^/]+|methodology)\/$/;

let pages = 0;
for (const file of walk(dist)) {
  const rel = '/' + relative(dist, file).split(sep).join('/');
  if (rel === '/404.html') {
    const h = readFileSync(file, 'utf8');
    if (!/<title>/.test(h)) fail(rel, 'no title');
    continue;
  }
  const path = rel.replace(/index\.html$/, '');
  const html = readFileSync(file, 'utf8');
  pages++;
  const title = norm((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  if (title.length < 50 || title.length > 60) fail(path, `title length ${title.length}: "${title}"`);
  const desc = norm((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  if (desc.length < 150 || desc.length > 160) fail(path, `description length ${desc.length}`);
  const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (canon !== ORIGIN + path) fail(path, `canonical ${canon}`);
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html) || /noindex/i.test((html.match(/<meta name="robots"[^>]*>/) || [''])[0])) fail(path, 'noindex');
  if (!/property="og:image" content="https:\/\/fontwell\.online\/og\/[^"]+\.png"/.test(html)) fail(path, 'og:image missing');
  else {
    const og = html.match(/property="og:image" content="https:\/\/fontwell\.online(\/og\/[^"]+\.png)"/)[1];
    if (!existsSync(join(dist, og))) fail(path, `og image file missing ${og}`);
  }
  if (!sitemapUrls.has(ORIGIN + path)) fail(path, 'not in sitemap');

  const vis = visible(html);
  const visNoPunct = vis.toLowerCase();
  if (PLACEHOLDER.test(vis)) fail(path, `placeholder-like text: ${vis.match(PLACEHOLDER)[0]}`);

  const ansM = html.match(/<p[^>]*data-answer[^>]*>([\s\S]*?)<\/p>/);
  if (!ansM) fail(path, 'no direct answer (data-answer)');
  else { const w = words(visible(ansM[1])); if (w < 12 || w > 75) fail(path, `direct answer ${w} words`); }

  const h1 = norm(visible((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || ''));
  if (!h1) fail(path, 'no h1');
  if ((html.match(/<h1[\s>]/g) || []).length > 1) fail(path, 'multiple h1');

  const main = (html.match(/<main[\s\S]*?<\/main>/) || [''])[0];
  const internal = [...main.matchAll(/<a [^>]*href="(\/[^"#]*)"/g)].map((m) => m[1]).filter((h) => h !== path);
  if (new Set(internal).size < 2) fail(path, `internal links ${new Set(internal).size}`);
  for (const h of new Set(internal)) {
    const clean = h.split('?')[0];
    const target = clean.endsWith('/') ? join(dist, clean, 'index.html') : join(dist, clean);
    if (!existsSync(target)) fail(path, `broken internal link ${h}`);
  }

  if (SOURCED.test(path)) {
    const srcSec = main.match(/<h2[^>]*>Sources<\/h2>([\s\S]*?)(<h2|<\/article>|<\/main>)/);
    const ext = srcSec ? (srcSec[1].match(/href="https?:\/\//g) || []).length : 0;
    if (ext < 1) fail(path, 'no Sources section with external links');
  }

  const lds = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!lds.length) fail(path, 'no JSON-LD');
  for (const m of lds) {
    let data;
    try { data = JSON.parse(m[1]); } catch (e) { fail(path, 'JSON-LD parse error'); continue; }
    const nodes = data['@graph'] || [data];
    for (const n of nodes) {
      const t = n['@type'];
      if (['Article', 'TechArticle', 'BlogPosting'].includes(t)) {
        if (norm(n.headline) !== h1) fail(path, `LD headline "${n.headline}" != h1 "${h1}"`);
        if (!n.dateModified || Number.isNaN(Date.parse(n.dateModified))) fail(path, 'Article without valid dateModified');
      }
      if (t === 'FAQPage') {
        for (const q of n.mainEntity) {
          if (!vis.includes(norm(q.name))) fail(path, `FAQ question not visible: ${q.name}`);
          if (!vis.includes(norm(q.acceptedAnswer.text))) fail(path, `FAQ answer not visible: ${q.name}`);
        }
      }
      if (t === 'BreadcrumbList' && n.itemListElement.length > 1) {
        for (const it of n.itemListElement) if (!visNoPunct.includes(norm(it.name).toLowerCase())) fail(path, `breadcrumb not visible: ${it.name}`);
      }
      if (['Review', 'AggregateRating', 'Offer'].includes(t)) fail(path, `forbidden LD type ${t}`);
      if (t === 'Dataset' && !n.dateModified) fail(path, 'Dataset without dateModified');
    }
  }
}

if (errors.length) {
  console.error(`GATE FAIL: ${errors.length} problem(s) across ${pages} pages`);
  for (const e of errors.slice(0, 80)) console.error(' -', e);
  process.exit(1);
}
console.log(`GATE PASS: ${pages} pages, ${sitemapUrls.size} sitemap URLs`);
