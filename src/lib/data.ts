// Build-time access to the committed data snapshot. Everything rendered comes from here.
import fontsJson from '../data/fonts.json';
import detailsJson from '../data/details.json';
import axesJson from '../data/axes.json';
import { CURATED_COUNT, LICENSES, suggestPairs } from './core.mjs';

export interface Axis { t: string; min: number; max: number; d: number }
export interface Family {
  f: string; s: string; c: string; sub: string[]; w: number[]; i: boolean; ax: Axis[]; d: string[];
  lm: string; da: string; p: number; t: number; sz: number; lic: 'ofl' | 'apache' | 'ufl' | null; dir: string | null;
  m: { th: number | null; wd: number | null; lh: number | null; sl: number | null };
  noto: boolean; ps: string; color: string[];
}
export interface Detail { license: string | null; copyright: string | null; repo: string | null; metadataUrl: string }

export const fontsData = fontsJson as unknown as {
  asOf: string; source: string; sourceUrl: string; licenseSource: string; licenseSourceUrl: string;
  licenseCommit: string | null; licenseAsOf: string | null; latestFamilyUpdate: string; count: number; families: Family[];
};
export const details = (detailsJson as unknown as { items: Record<string, Detail>; commit: string | null }).items;
export const axesRegistry = (axesJson as unknown as { axes: { tag: string; name: string; min: number; max: number; def: number; desc: string }[] }).axes;

export const families = fontsData.families;
/** Families with their own page: top CURATED_COUNT by Google Fonts popularity among license-matched families. */
export const curated: Family[] = families.filter((f) => f.lic).slice(0, CURATED_COUNT);
export const curatedSet = new Set(curated.map((f) => f.s));
export const bySlug = new Map(families.map((f) => [f.s, f]));

export const asOfDate = fontsData.asOf.slice(0, 10);
export const asOfHuman = fmtDate(fontsData.asOf);

export function fmtDate(iso: string): string {
  const d = new Date(iso.length === 10 ? iso + 'T00:00:00Z' : iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
export const fmtInt = (n: number) => n.toLocaleString('en-US');

export const CATEGORY_SLUG: Record<string, string> = {
  'Sans Serif': 'sans-serif', Serif: 'serif', Display: 'display', Handwriting: 'handwriting', Monospace: 'monospace',
};
export const CATEGORIES = Object.keys(CATEGORY_SLUG);

/** CSS generic fallback for a category. */
export function fallbackStack(c: string): string {
  if (c === 'Serif') return 'Georgia, serif';
  if (c === 'Monospace') return 'ui-monospace, monospace';
  if (c === 'Handwriting') return 'cursive';
  return 'system-ui, sans-serif';
}

export function isVariable(f: Family) { return f.ax.length > 0; }
export function styleCount(f: Family) { return f.w.length * (f.i ? 2 : 1); }
export function licenseOf(f: Family) { return f.lic ? LICENSES[f.lic] : null; }
export const popularityRank = (f: Family) => families.indexOf(f) + 1;

/** Pretty subset label. */
export function subsetLabel(s: string) {
  return s.replace(/-ext$/, ' extended').replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

/** Native-script sample sentences for fonts whose primary script is not Latin. */
export const SCRIPT_SAMPLES: Record<string, string> = {
  Kore: '다람쥐 헌 쳇바퀴에 타고파',
  Jpan: 'いろはにほへと ちりぬるを',
  Hans: '天地玄黄 宇宙洪荒 永字八法',
  Hant: '天地玄黃 宇宙洪荒 永字八法',
  Arab: 'نص حكيم له سر قاطع',
  Hebr: 'דג סקרן שט בים מאוכזב',
  Deva: 'ऋषियों को सताने वाले',
  Thai: 'เป็นมนุษย์สุดประเสริฐ',
  Beng: 'আমার সোনার বাংলা',
  Taml: 'யாமறிந்த மொழிகளிலே',
  Grek: 'Ξεσκεπάζω την ψυχοφθόρα',
  Cyrl: 'Съешь же ещё этих мягких',
};
export const LATIN_SAMPLE = 'Handgloves & Quartz 1234';
export function sampleFor(f: Family) { return SCRIPT_SAMPLES[f.ps] ?? LATIN_SAMPLE; }

/** Share of families in the same category with fewer subsets (0..100). */
export function subsetPercentile(f: Family): number {
  const peers = families.filter((x) => x.c === f.c);
  const fewer = peers.filter((x) => x.sub.length < f.sub.length).length;
  return Math.round((fewer / peers.length) * 100);
}

export function pairsFor(f: Family, n = 3) {
  return suggestPairs(f, curated, n) as { f: Family; score: number }[];
}

export function similarFor(f: Family, n = 4): Family[] {
  return curated
    .filter((x) => x.c === f.c && x.s !== f.s)
    .map((x) => ({ x, d: Math.abs((x.m.lh ?? 1.2) - (f.m.lh ?? 1.2)) * 10 + Math.abs(x.w.length - f.w.length) * 0.3 + (isVariable(x) === isVariable(f) ? 0 : 1) }))
    .sort((a, b) => a.d - b.d || a.x.p - b.x.p)
    .slice(0, n)
    .map((o) => o.x);
}

export function stats() {
  const lic: Record<string, number> = { ofl: 0, apache: 0, ufl: 0, none: 0 };
  const cat: Record<string, number> = {};
  let variable = 0, korean = 0, cjk = 0;
  for (const f of families) {
    lic[f.lic ?? 'none']++;
    cat[f.c] = (cat[f.c] ?? 0) + 1;
    if (f.ax.length) variable++;
    if (f.sub.includes('korean')) korean++;
    if (f.sub.some((s) => ['korean', 'japanese', 'chinese-simplified', 'chinese-traditional', 'chinese-hongkong'].includes(s))) cjk++;
  }
  return { total: families.length, lic, cat, variable, korean, cjk };
}
