// Pure, dependency-free logic shared by the site build, the browser tools and node:test.
// Keep this file free of DOM/Node APIs.

/** Number of families that get their own page (ranked by Google Fonts popularity). */
export const CURATED_COUNT = 200;

/** @param {string} name */
export function slugify(name) {
  return name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// ---------------------------------------------------------------------------
// Licenses. Every verdict cites the clause it rests on. Plain-English summary,
// not legal advice.
// ---------------------------------------------------------------------------

export const LICENSES = {
  ofl: {
    id: 'ofl',
    name: 'SIL Open Font License 1.1',
    short: 'OFL 1.1',
    spdx: 'OFL-1.1',
    url: 'https://openfontlicense.org/open-font-license-official-text/',
    faqUrl: 'https://openfontlicense.org/ofl-faq/',
  },
  apache: {
    id: 'apache',
    name: 'Apache License 2.0',
    short: 'Apache 2.0',
    spdx: 'Apache-2.0',
    url: 'https://www.apache.org/licenses/LICENSE-2.0',
    faqUrl: 'https://www.apache.org/foundation/license-faq.html',
  },
  ufl: {
    id: 'ufl',
    name: 'Ubuntu Font Licence 1.0',
    short: 'UFL 1.0',
    spdx: 'Ubuntu-font-1.0',
    url: 'https://canonical.com/legal/font-licence',
    faqUrl: 'https://canonical.com/legal/font-licence/faq',
  },
};

/** Use cases offered by the license checker, in display order. */
export const USES = [
  { id: 'website', label: 'Use it on a website (self-hosted or via the Google Fonts API)' },
  { id: 'print', label: 'Print, packaging, posters, PDFs and other documents' },
  { id: 'logo', label: 'Set a logo or wordmark in it' },
  { id: 'merch', label: 'Put it on products I sell (T-shirts, mugs, book covers)' },
  { id: 'app', label: 'Bundle the font file inside an app, game or software I sell' },
  { id: 'modify', label: 'Modify the font (add glyphs, change shapes, subset) and ship it' },
  { id: 'resell', label: 'Sell the font file on its own (or in a font bundle)' },
  { id: 'video', label: 'Use it in video, broadcast, social posts or ads' },
];

/**
 * Verdict levels: 'yes' | 'conditions' | 'no'.
 * Each entry: [level, plain-English answer, clause quote/reference].
 */
const RULES = {
  ofl: {
    website: ['yes', 'Yes. Embedding is explicitly permitted. Self-hosted font files must keep the copyright notice and license; the OFL lets that live in the font file\u2019s own metadata, which Google Fonts files already carry.', 'Permission & Conditions: \u201cuse, study, copy, merge, embed, modify, redistribute\u201d; condition 2 on including the notice and license.'],
    print: ['yes', 'Yes. Documents you create with the font are not covered by the OFL\u2019s distribution conditions at all.', 'Condition 5: \u201cThe requirement for fonts to remain under this license does not apply to any document created using the Font Software.\u201d'],
    logo: ['yes', 'Yes. A logo is a document made with the font, so the OFL places no restriction on it. Note that other people can use the same font, and trademark registration is a separate question the font license does not answer.', 'Condition 5 (documents are outside the license); OFL FAQ on logos and trademarks.'],
    merch: ['yes', 'Yes. Printed or embroidered artwork is a document created with the font, and selling that product is not selling the font.', 'Condition 5 (documents); condition 1 only forbids selling the font software by itself.'],
    app: ['conditions', 'Yes, with conditions. You may bundle and even sell the font inside software, as long as each copy includes the copyright notice and the OFL text (a license file or the font\u2019s metadata).', 'Condition 2: bundled, redistributed and/or sold with any software, provided that each copy contains the copyright notice and this license.'],
    modify: ['conditions', 'Yes, with conditions. Modified versions must stay under the OFL, must not use any Reserved Font Name without written permission, and must not use the authors\u2019 names to promote the modified version.', 'Conditions 3, 4 and 5 (Reserved Font Names, author names, remain under OFL).'],
    resell: ['no', 'No. The font, modified or not, may not be sold by itself. You can sell things made with it, or software that includes it, but not the font file as the product.', 'Condition 1: \u201cNeither the Font Software nor any of its individual components, in Original or Modified Versions, may be sold by itself.\u201d'],
    video: ['yes', 'Yes. Rendered text in video, images or ads is output created with the font, which the OFL does not restrict.', 'Condition 5 (documents created using the Font Software).'],
  },
  apache: {
    website: ['yes', 'Yes. Apache 2.0 grants a broad copyright license to reproduce and distribute. If you redistribute the font files (self-hosting), keep the license text and any NOTICE file.', 'Section 2 (grant of copyright license) and Section 4 (redistribution conditions).'],
    print: ['yes', 'Yes. Using the font to produce documents is covered by the broad grant; the license puts conditions only on redistributing the work itself.', 'Section 2 (grant of copyright license).'],
    logo: ['yes', 'Yes. Nothing in Apache 2.0 restricts what you design with the font. The license grants no trademark rights in the font\u2019s own name, which does not affect your logo.', 'Section 2 (grant); Section 6 (trademarks: no permission to use the licensor\u2019s names or marks).'],
    merch: ['yes', 'Yes. Products carrying text set in the font are your own work output.', 'Section 2 (grant of copyright license).'],
    app: ['conditions', 'Yes, with conditions. Include a copy of the Apache License, keep existing copyright/attribution notices and the NOTICE file if one exists.', 'Section 4(a)\u2013(d) redistribution conditions.'],
    modify: ['conditions', 'Yes, with conditions. Modified files must carry prominent notices that you changed them, and you must keep the license and attribution notices. You may license your own modifications differently, but the original parts stay Apache-licensed.', 'Section 4(b) (state changes) and 4(c) (retain notices).'],
    resell: ['conditions', 'Technically permitted: Apache 2.0 does not forbid charging for copies, provided you keep the license and notices. Selling a freely available font as-is offers buyers little and the font\u2019s name is not licensed to you as a trademark.', 'Section 2 (grant includes distribution); Section 4 (conditions); Section 6 (trademarks).'],
    video: ['yes', 'Yes. Rendered output is not restricted.', 'Section 2 (grant of copyright license).'],
  },
  ufl: {
    website: ['conditions', 'Yes. Each copy of the font must contain the copyright notice and licence (font metadata qualifies). Documents such as web pages are not required to be under the UFL unless their primary purpose is distributing the font.', 'Condition 1 (notice and licence in each copy); Preamble on documents.'],
    print: ['yes', 'Yes. Documents created using the font are unaffected by the licence, as long as the document is not a vehicle for distributing the font.', 'Condition 4 and Preamble (documents).'],
    logo: ['yes', 'Yes. A logo is a document made with the font. The UFL grants no trademark rights in the font\u2019s own name, which does not affect your logo.', 'Condition 4 (documents); \u201cThis licence does not grant any rights under trademark law.\u201d'],
    merch: ['yes', 'Yes. Products carrying artwork set in the font are documents created with it.', 'Condition 4 (documents).'],
    app: ['conditions', 'Yes, with conditions. Every copy you ship must contain the copyright notice and the UFL text, and the font must stay under the UFL.', 'Conditions 1 and 4.'],
    modify: ['conditions', 'Yes, with strict naming rules. Substantially changed versions must drop the original name entirely; lightly changed versions must keep it and append \u201cderivative X\u201d. Modified fonts stay under the UFL.', 'Condition 2(a)\u2013(c) (naming) and condition 4.'],
    resell: ['conditions', 'The UFL\u2019s definition of propagation includes distribution \u201cwith or without charging a redistribution fee\u201d, and it has no OFL-style ban on standalone sale. The licence and notice must travel with every copy and the name rules still apply.', 'Definitions (\u201cPropagate\u201d); conditions 1, 2 and 4.'],
    video: ['yes', 'Yes. Rendered output is a document created using the font.', 'Condition 4 (documents).'],
  },
};

/**
 * @param {string|null} license  'ofl' | 'apache' | 'ufl' | null
 * @param {string} use one of USES ids
 * @returns {{level:'yes'|'conditions'|'no'|'unknown', answer:string, clause:string, licenseUrl:string|null}}
 */
export function checkUse(license, use) {
  const lic = license && RULES[license];
  if (!lic) {
    return { level: 'unknown', answer: 'We could not match this family to a license folder in the google/fonts repository, so we will not guess. Check the license file shipped with the font or its Google Fonts page.', clause: 'No license file matched.', licenseUrl: null };
  }
  const r = lic[use];
  if (!r) throw new Error(`unknown use: ${use}`);
  return { level: r[0], answer: r[1], clause: r[2], licenseUrl: LICENSES[license].url };
}

export function licenseMatrix(license) {
  return USES.map((u) => ({ ...u, ...checkUse(license, u.id) }));
}

// ---------------------------------------------------------------------------
// Type scale
// ---------------------------------------------------------------------------

export const RATIOS = [
  { id: '1.067', label: 'Minor second', value: 1.067 },
  { id: '1.125', label: 'Major second', value: 1.125 },
  { id: '1.2', label: 'Minor third', value: 1.2 },
  { id: '1.25', label: 'Major third', value: 1.25 },
  { id: '1.333', label: 'Perfect fourth', value: 1.333 },
  { id: '1.414', label: 'Augmented fourth', value: 1.414 },
  { id: '1.5', label: 'Perfect fifth', value: 1.5 },
  { id: '1.618', label: 'Golden ratio', value: 1.618 },
];

const round = (n, d = 3) => Math.round(n * 10 ** d) / 10 ** d;

/**
 * Modular scale: size(step) = base * ratio^step.
 * @returns {{step:number, px:number, rem:number}[]} largest first
 */
export function typeScale(base, ratio, stepsUp, stepsDown, rootPx = 16) {
  if (!(base > 0) || !(ratio > 1) || !Number.isInteger(stepsUp) || !Number.isInteger(stepsDown) || stepsUp < 0 || stepsDown < 0) {
    throw new RangeError('invalid scale input');
  }
  const out = [];
  for (let s = stepsUp; s >= -stepsDown; s--) {
    const px = base * ratio ** s;
    out.push({ step: s, px: round(px, 2), rem: round(px / rootPx, 4) });
  }
  return out;
}

/**
 * Fluid clamp() between two viewport widths: min size at minVw, max size at maxVw.
 * Returns the CSS string and the parts (slope in vw, intercept in rem).
 */
export function fluidClamp(minPx, maxPx, minVw, maxVw, rootPx = 16) {
  if (!(maxVw > minVw)) throw new RangeError('maxVw must be greater than minVw');
  const slope = (maxPx - minPx) / (maxVw - minVw);
  const interceptPx = minPx - slope * minVw;
  const lo = Math.min(minPx, maxPx), hi = Math.max(minPx, maxPx);
  const css = `clamp(${round(lo / rootPx, 4)}rem, ${round(interceptPx / rootPx, 4)}rem + ${round(slope * 100, 4)}vw, ${round(hi / rootPx, 4)}rem)`;
  return { css, slopeVw: round(slope * 100, 4), interceptRem: round(interceptPx / rootPx, 4) };
}

// ---------------------------------------------------------------------------
// Pairing. Heuristic, explained on /methodology/:
//  - role contrast: a display/serif/handwriting heading over a sans or serif body
//  - shared script coverage (subsets) so both fonts render the same text
//  - similar metric "width" and "lineHeight" from Google's metadata keep rhythm
//  - body fonts need >= 3 weights incl. 400 and 700 (or a wght axis)
// ---------------------------------------------------------------------------

const BODY_OK = new Set(['Sans Serif', 'Serif', 'Monospace']);

function hasWeightRange(f) {
  const wAxis = f.ax?.find((a) => a.t === 'wght');
  if (wAxis) return wAxis.min <= 400 && wAxis.max >= 700;
  return f.w.includes(400) && f.w.includes(700) && f.w.length >= 3;
}

function subsetOverlap(a, b) {
  const sa = new Set(a.sub);
  const shared = b.sub.filter((s) => sa.has(s));
  return { shared, ratio: shared.length / Math.max(1, Math.min(a.sub.length, b.sub.length)) };
}

/** Score how well `body` works under heading `head`. Higher is better; -Infinity = unusable. */
export function pairScore(head, body) {
  if (head.f === body.f) return -Infinity;
  if (!BODY_OK.has(body.c) || !hasWeightRange(body)) return -Infinity;
  const { shared, ratio } = subsetOverlap(head, body);
  if (!shared.includes('latin') && !(head.ps && head.ps === body.ps)) return -Infinity;
  let score = 0;
  // category contrast
  if (head.c !== body.c) score += 3;
  if (head.c === 'Display' || head.c === 'Handwriting') score += 1;
  if (body.c === 'Monospace') score -= 2;
  // script coverage
  score += 2 * ratio;
  // rhythm: metric proximity (Google metrics are small integers / ratios)
  const dw = Math.abs((head.m?.wd ?? 7) - (body.m?.wd ?? 7));
  const dl = Math.abs((head.m?.lh ?? 1.2) - (body.m?.lh ?? 1.2));
  score -= dw * 0.4 + dl * 3;
  // prefer established families (popularity is a rank, 1 = most used)
  score += 1.5 / Math.log10(10 + (body.p ?? 1000));
  return round(score, 4);
}

/** Top n body partners for a heading family from a candidate pool. */
export function suggestPairs(head, pool, n = 3) {
  return pool
    .map((b) => ({ f: b, score: pairScore(head, b) }))
    .filter((x) => Number.isFinite(x.score))
    .sort((a, b) => b.score - a.score || a.f.p - b.f.p)
    .slice(0, n);
}

/** Human explanation for a suggested pair, built only from metadata facts. */
export function explainPair(head, body) {
  const parts = [];
  if (head.c !== body.c) parts.push(`${head.c.toLowerCase()} heading over a ${body.c.toLowerCase()} body gives clear contrast`);
  else parts.push(`both are ${body.c.toLowerCase()}, so contrast has to come from weight and size`);
  const { shared } = subsetOverlap(head, body);
  parts.push(`${shared.length} shared subset${shared.length === 1 ? '' : 's'} (${shared.slice(0, 4).join(', ')}${shared.length > 4 ? ', \u2026' : ''})`);
  const wAxis = body.ax?.find((a) => a.t === 'wght');
  parts.push(wAxis ? `${body.f} is variable (wght ${wAxis.min}\u2013${wAxis.max})` : `${body.f} ships ${body.w.length} static weights`);
  return parts.join('; ') + '.';
}

// ---------------------------------------------------------------------------
// Google Fonts CSS API URL for a specimen (text= keeps downloads tiny).
// ---------------------------------------------------------------------------
export function cssApiUrl(family, { weights = [], text = '', display = 'swap', ital = false } = {}) {
  const fam = family.trim().replace(/ /g, '+');
  let spec = fam;
  if (weights.length) spec += ital ? `:ital,wght@${weights.map((w) => `0,${w}`).join(';')}` : `:wght@${weights.join(';')}`;
  let url = `https://fonts.googleapis.com/css2?family=${spec}&display=${display}`;
  if (text) url += `&text=${encodeURIComponent(text)}`;
  return url;
}

/** Variable-axis range string for the CSS API, e.g. "wght@100..900". */
export function axisSpec(f) {
  const w = f.ax?.find((a) => a.t === 'wght');
  if (w) return `${f.f.replace(/ /g, '+')}:wght@${w.min}..${w.max}`;
  if (f.w.length) return `${f.f.replace(/ /g, '+')}:wght@${f.w.join(';')}`;
  return f.f.replace(/ /g, '+');
}
