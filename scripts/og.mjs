#!/usr/bin/env node
// Build-time Open Graph images (1200x630 PNG) rendered from SVG with resvg.
// Proof-sheet look: paper, double rule, red kicker, serif title. Uses system Georgia/Consolas
// (present on the Windows build PC); falls back to any serif/mono resvg finds.
import { Resvg } from '@resvg/resvg-js';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CURATED_COUNT } from '../src/lib/core.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'og');
const fonts = JSON.parse(readFileSync(join(root, 'src', 'data', 'fonts.json'), 'utf8'));
const asOf = new Date(fonts.asOf).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function wrap(text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max) { if (cur) lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

function card({ kicker, title, sub = '', foot = `fontwell.online · data as of ${asOf}` }) {
  const size = title.length > 60 ? 58 : title.length > 38 ? 68 : 84;
  const lines = wrap(title, Math.floor(1500 / size)).slice(0, 4);
  const lh = size * 1.12;
  const y0 = 290 - ((lines.length - 1) * lh) / 2 + (sub ? -20 : 0);
  const subLines = sub ? wrap(sub, 70).slice(0, 2) : [];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#e2dac6"/>
  <rect x="36" y="30" width="1128" height="570" fill="#f3efe4"/>
  <path d="M24 18v14M18 24h14M1176 612v-14M1182 606h-14" stroke="#1c1a16" stroke-width="1.5"/>
  <text x="80" y="92" font-family="Georgia" font-weight="700" font-size="40" fill="#1c1a16">Fontwell<tspan fill="#a8261c">.</tspan></text>
  <text x="1120" y="90" text-anchor="end" font-family="Consolas, monospace" font-size="20" letter-spacing="2" fill="#a8261c">${esc(kicker.toUpperCase())}</text>
  <rect x="80" y="112" width="1040" height="2" fill="#1c1a16"/><rect x="80" y="118" width="1040" height="2" fill="#1c1a16"/>
  ${lines.map((l, i) => `<text x="80" y="${(y0 + i * lh).toFixed(0)}" font-family="Georgia" font-weight="700" font-size="${size}" fill="#1c1a16">${esc(l)}</text>`).join('\n  ')}
  ${subLines.map((l, i) => `<text x="80" y="${(y0 + (lines.length - 1) * lh + 62 + i * 36).toFixed(0)}" font-family="Georgia" font-style="italic" font-size="28" fill="#4f4a3d">${esc(l)}</text>`).join('\n  ')}
  <rect x="80" y="520" width="1040" height="1" fill="#c9bfa6"/>
  <text x="80" y="562" font-family="Consolas, monospace" font-size="22" fill="#4f4a3d">${esc(foot)}</text>
</svg>`;
}

const WIN = 'C:/Windows/Fonts/';
const fontFiles = ['georgia.ttf', 'georgiab.ttf', 'georgiai.ttf', 'consola.ttf'].map((f) => WIN + f).filter((f) => existsSync(f));
const fontOpt = fontFiles.length === 4 ? { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Georgia' } : { loadSystemFonts: true, defaultFontFamily: 'Georgia' };
function render(svg, file, width = 1200) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: fontOpt }).render().asPng();
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, png);
}

const t0 = Date.now();
const pages = [
  ['home', { kicker: 'Proofing desk', title: 'Which free fonts can you use commercially?', sub: `${fonts.count.toLocaleString('en-US')} Google Fonts families, licence-checked` }],
  ['fonts', { kicker: 'Index', title: `The ${CURATED_COUNT} most-used open fonts`, sub: 'Licence matrix, coverage, pairings and CSS for each' }],
  ['guides', { kicker: 'Guides', title: 'What to know before using a free font', sub: 'Licences, logos, GDPR, variable fonts, CJK subsetting' }],
  ['tools', { kicker: 'Tools', title: 'Licence checker, pairing tester, type scale' }],
  ['tools/license-checker', { kicker: 'Licence checker', title: 'Can I use this font for that?', sub: 'Logo, app, merch, resale: verdict plus the clause' }],
  ['tools/pairing', { kicker: 'Pairing tester', title: 'Do these two fonts work together?' }],
  ['tools/type-scale', { kicker: 'Type scale', title: 'Modular type scale with fluid clamp() values' }],
  ['methodology', { kicker: 'Methodology', title: 'How Fontwell checks font licences' }],
  ['about', { kicker: 'About', title: 'An independent reference for open-licensed fonts' }],
];
for (const [name, c] of pages) render(card(c), join(out, `${name}.png`));

// guides: read frontmatter question without a YAML dependency
const gdir = join(root, 'src', 'content', 'guides');
for (const f of readdirSync(gdir).filter((n) => n.endsWith('.md'))) {
  const md = readFileSync(join(gdir, f), 'utf8');
  const q = (md.match(/^question:\s*"(.+)"\s*$/m) || [])[1] || f;
  render(card({ kicker: 'Guide', title: q }), join(out, 'guides', f.replace(/\.md$/, '.png')));
}

// family pages
const LIC = { ofl: 'SIL Open Font License 1.1', apache: 'Apache License 2.0', ufl: 'Ubuntu Font Licence 1.0' };
const curated = fonts.families.filter((x) => x.lic).slice(0, CURATED_COUNT);
for (const x of curated) {
  const styles = x.w.length * (x.i ? 2 : 1);
  render(card({ kicker: `${x.c} · ${x.lic.toUpperCase()}`, title: `Is ${x.f} free for commercial use?`, sub: `${LIC[x.lic]} · ${x.ax.length ? 'variable' : styles + ' styles'} · ${x.sub.length} subsets` }), join(out, 'fonts', `${x.s}.png`));
}

// square logo for Organization LD
render(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#f3efe4"/><text x="70" y="400" font-family="Georgia" font-weight="700" font-size="400" fill="#1c1a16">F</text><circle cx="400" cy="372" r="40" fill="#a8261c"/></svg>`, join(out, 'logo.png'), 512);

console.log(`[og] ${pages.length + curated.length + 1} + guides images in ${Date.now() - t0} ms`);
