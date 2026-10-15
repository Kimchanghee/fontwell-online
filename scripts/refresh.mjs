#!/usr/bin/env node
// Fontwell data refresh.
// 1. Google Fonts public family metadata  -> src/data/fonts.json
// 2. google/fonts repository license folders (ofl/ apache/ ufl/) -> license per family
// 3. METADATA.pb (copyright line + upstream repo) for the curated set -> src/data/details.json
// On any failure the last good snapshot is kept untouched (its real asOf keeps rendering).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CURATED_COUNT, slugify } from '../src/lib/core.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'src', 'data');
const cacheDir = join(root, '.cache');
const UA = 'fontwell-refresh/2.0 (+https://fontwell.online/methodology/; contact@fontwell.online)';
const METADATA_URL = 'https://fonts.google.com/metadata/fonts';
const REPO_URL = 'https://github.com/google/fonts';

mkdirSync(dataDir, { recursive: true });
mkdirSync(cacheDir, { recursive: true });

const log = (...a) => console.log('[refresh]', ...a);
const warn = (...a) => console.warn('[refresh] WARN', ...a);

function readJson(p) {
  try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; }
}

async function fetchText(url, timeoutMs = 60000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: ctrl.signal });
    if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
    return await res.text();
  } finally { clearTimeout(t); }
}

// ---------- license folders via a tree-only partial clone (no API rate limit) ----------
function licenseDirs() {
  const repo = join(cacheDir, 'google-fonts');
  const git = (...args) => execFileSync('git', args, { cwd: existsSync(repo) ? repo : cacheDir, encoding: 'utf8', maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'pipe'] });
  if (!existsSync(join(repo, '.git'))) {
    execFileSync('git', ['clone', '--filter=blob:none', '--no-checkout', '--depth', '1', REPO_URL + '.git', repo], { stdio: 'inherit' });
  } else {
    git('fetch', '--depth', '1', '--filter=blob:none', 'origin', 'main');
    git('update-ref', 'HEAD', 'FETCH_HEAD');
  }
  const commit = git('rev-parse', 'HEAD').trim();
  const commitDate = git('log', '-1', '--format=%cI', 'HEAD').trim();
  const out = git('ls-tree', '-d', '--name-only', 'HEAD', 'ofl/', 'apache/', 'ufl/');
  const map = {};
  for (const line of out.split(/\r?\n/)) {
    const [lic, dir] = line.trim().split('/');
    if (lic && dir) map[dir] = lic;
  }
  return { map, commit, commitDate };
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

function pickMetrics(fonts) {
  const k = fonts['400'] ? '400' : Object.keys(fonts).filter((x) => !x.endsWith('i')).sort()[0] || Object.keys(fonts)[0];
  const m = fonts[k] || {};
  return { th: m.thickness ?? null, wd: m.width ?? null, lh: m.lineHeight ?? null, sl: m.slant ?? null };
}

async function main() {
  const prev = readJson(join(dataDir, 'fonts.json'));
  let raw;
  try {
    raw = await fetchText(METADATA_URL);
  } catch (e) {
    warn('metadata fetch failed, keeping last good snapshot', prev?.asOf, String(e));
    return;
  }
  if (raw.startsWith(")]}'")) raw = raw.slice(4);
  let md;
  try { md = JSON.parse(raw); } catch (e) { warn('metadata parse failed, keeping snapshot', String(e)); return; }
  const list = md.familyMetadataList;
  if (!Array.isArray(list) || list.length < 1000) { warn('metadata looks incomplete', list?.length, '- keeping snapshot'); return; }

  let lic = null;
  try { lic = licenseDirs(); } catch (e) { warn('license tree failed; reusing previous license mapping', String(e)); }
  const prevLic = Object.fromEntries((prev?.families || []).map((f) => [f.f, { lic: f.lic, dir: f.dir }]));

  const families = list.map((x) => {
    const n = norm(x.family);
    let licName = null, dir = null;
    if (lic) { licName = lic.map[n] || null; dir = licName ? `${licName}/${n}` : null; }
    else if (prevLic[x.family]) { licName = prevLic[x.family].lic; dir = prevLic[x.family].dir; }
    const styles = Object.keys(x.fonts || {});
    const weights = [...new Set(styles.map((s) => parseInt(s, 10)).filter(Number.isFinite))].sort((a, b) => a - b);
    return {
      f: x.family,
      s: slugify(x.family),
      c: x.category,
      sub: (x.subsets || []).filter((s) => s !== 'menu'),
      w: weights,
      i: styles.some((s) => s.endsWith('i')),
      ax: (x.axes || []).map((a) => ({ t: a.tag, min: a.min, max: a.max, d: a.defaultValue })),
      d: x.designers || [],
      lm: x.lastModified,
      da: x.dateAdded,
      p: x.popularity,
      t: x.trending,
      sz: x.size,
      lic: licName,
      dir,
      m: pickMetrics(x.fonts || {}),
      noto: !!x.isNoto,
      ps: x.primaryScript || '',
      color: x.colorCapabilities || [],
    };
  }).sort((a, b) => a.p - b.p || a.f.localeCompare(b.f));

  const usedAxes = new Set(families.flatMap((f) => f.ax.map((a) => a.t)));
  const axes = (md.axisRegistry || []).filter((a) => usedAxes.has(a.tag)).map((a) => ({ tag: a.tag, name: a.displayName, min: a.min, max: a.max, def: a.defaultValue, desc: a.description }));

  const asOf = new Date().toISOString();
  const out = {
    asOf,
    source: 'Google Fonts family metadata',
    sourceUrl: METADATA_URL,
    licenseSource: 'google/fonts GitHub repository (ofl/, apache/, ufl/ folders)',
    licenseSourceUrl: REPO_URL,
    licenseCommit: lic?.commit ?? prev?.licenseCommit ?? null,
    licenseAsOf: lic?.commitDate ?? prev?.licenseAsOf ?? null,
    latestFamilyUpdate: families.reduce((m, f) => (f.lm > m ? f.lm : m), ''),
    count: families.length,
    families,
  };
  writeFileSync(join(dataDir, 'fonts.json'), JSON.stringify(out));
  writeFileSync(join(dataDir, 'axes.json'), JSON.stringify({ asOf, source: 'Google Fonts axis registry (in family metadata)', sourceUrl: METADATA_URL, axes }, null, 1));
  log('families', families.length, 'license mapped', families.filter((f) => f.lic).length, 'commit', out.licenseCommit);

  // ---------- METADATA.pb for the curated set ----------
  const prevDetails = readJson(join(dataDir, 'details.json'))?.items || {};
  const curated = families.filter((f) => f.lic).slice(0, CURATED_COUNT);
  const items = {};
  let ok = 0, kept = 0;
  const queue = [...curated];
  async function worker() {
    while (queue.length) {
      const f = queue.shift();
      const url = `https://raw.githubusercontent.com/google/fonts/${out.licenseCommit || 'main'}/${f.dir}/METADATA.pb`;
      try {
        const pb = await fetchText(url, 30000);
        const get = (re) => (pb.match(re) || [])[1] || null;
        items[f.f] = {
          license: get(/^license:\s*"([^"]+)"/m),
          copyright: get(/copyright:\s*"((?:[^"\\]|\\.)*)"/),
          repo: get(/repository_url:\s*"([^"]+)"/),
          metadataUrl: `${REPO_URL}/blob/main/${f.dir}/METADATA.pb`,
        };
        ok++;
      } catch (e) {
        if (prevDetails[f.f]) { items[f.f] = prevDetails[f.f]; kept++; }
        else warn('METADATA.pb missing', f.f, String(e));
      }
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  writeFileSync(join(dataDir, 'details.json'), JSON.stringify({ asOf, source: 'google/fonts METADATA.pb files', sourceUrl: REPO_URL, commit: out.licenseCommit, items }, null, 1));
  log('details fetched', ok, 'kept from previous', kept);
}

main().catch((e) => { warn('unexpected', e); process.exitCode = 0; });
