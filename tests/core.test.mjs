// Hand-computed checks for the calculators and licence rules (node --test).
import test from 'node:test';
import assert from 'node:assert/strict';
import { typeScale, fluidClamp, checkUse, licenseMatrix, pairScore, suggestPairs, cssApiUrl, axisSpec, slugify, USES } from '../src/lib/core.mjs';

test('typeScale: 16px, major third, 5 up 2 down', () => {
  const s = typeScale(16, 1.25, 5, 2);
  assert.deepEqual(s.map((x) => x.px), [48.83, 39.06, 31.25, 25, 20, 16, 12.8, 10.24]);
  assert.equal(s.find((x) => x.step === 0).rem, 1);
  assert.equal(s.find((x) => x.step === 2).rem, 1.5625); // 25 / 16
});

test('typeScale rejects invalid input', () => {
  assert.throws(() => typeScale(0, 1.25, 1, 1), RangeError);
  assert.throws(() => typeScale(16, 1, 1, 1), RangeError);
  assert.throws(() => typeScale(16, 1.25, 1.5, 1), RangeError);
  assert.throws(() => typeScale(16, 1.25, -1, 1), RangeError);
});

test('fluidClamp: 25px@390 -> 28.125px@1440 (worked example on the tool page)', () => {
  const r = fluidClamp(25, 28.125, 390, 1440);
  // slope = 3.125 / 1050 = 0.0029762 px per px -> 0.2976vw
  assert.equal(r.slopeVw, 0.2976);
  // intercept = 25 - 0.0029762 * 390 = 23.8393px = 1.49rem
  assert.equal(r.interceptRem, 1.49);
  assert.equal(r.css, 'clamp(1.5625rem, 1.49rem + 0.2976vw, 1.7578rem)');
});

test('fluidClamp: equal sizes give zero slope; inverted range throws', () => {
  assert.equal(fluidClamp(16, 16, 390, 1440).slopeVw, 0);
  assert.throws(() => fluidClamp(16, 18, 1440, 390), RangeError);
});

test('fluidClamp handles shrinking sizes (min > max) with ordered clamp bounds', () => {
  const r = fluidClamp(20, 16, 400, 1200);
  assert.equal(r.slopeVw, -0.5); // -4 / 800 * 100
  assert.match(r.css, /^clamp\(1rem, /);
  assert.match(r.css, /1\.25rem\)$/);
});

test('licence rules: OFL forbids standalone sale, allows logos', () => {
  assert.equal(checkUse('ofl', 'resell').level, 'no');
  assert.equal(checkUse('ofl', 'logo').level, 'yes');
  assert.equal(checkUse('ofl', 'app').level, 'conditions');
  assert.equal(checkUse('apache', 'resell').level, 'conditions');
  assert.equal(checkUse('ufl', 'modify').level, 'conditions');
});

test('licence rules: unknown licence never guesses', () => {
  const r = checkUse(null, 'logo');
  assert.equal(r.level, 'unknown');
  assert.equal(r.licenseUrl, null);
  assert.throws(() => checkUse('ofl', 'nonsense'));
});

test('licenseMatrix covers every use for every licence', () => {
  for (const l of ['ofl', 'apache', 'ufl']) {
    const m = licenseMatrix(l);
    assert.equal(m.length, USES.length);
    for (const row of m) assert.ok(row.answer.length > 20 && row.clause.length > 5);
  }
});

const mk = (o) => ({ f: 'X', c: 'Sans Serif', sub: ['latin'], w: [400, 700, 900], ax: [], m: { wd: 7, lh: 1.2 }, p: 10, ps: '', ...o });

test('pairScore: same family, display body and non-shared script are unusable', () => {
  const a = mk({ f: 'A', c: 'Serif' });
  assert.equal(pairScore(a, a), -Infinity);
  assert.equal(pairScore(a, mk({ f: 'B', c: 'Display' })), -Infinity);
  assert.equal(pairScore(a, mk({ f: 'C', sub: ['korean'] })), -Infinity);
  assert.equal(pairScore(a, mk({ f: 'D', w: [400] })), -Infinity);
});

test('pairScore: classification contrast beats same classification', () => {
  const head = mk({ f: 'H', c: 'Serif' });
  const sans = mk({ f: 'S', c: 'Sans Serif' });
  const serif = mk({ f: 'T', c: 'Serif' });
  assert.ok(pairScore(head, sans) > pairScore(head, serif));
  assert.equal(suggestPairs(head, [serif, sans], 1)[0].f.f, 'S');
});

test('variable body with wght 100-900 qualifies', () => {
  const head = mk({ f: 'H', c: 'Display' });
  const vf = mk({ f: 'V', w: [400], ax: [{ t: 'wght', min: 100, max: 900, d: 400 }] });
  assert.ok(Number.isFinite(pairScore(head, vf)));
});

test('CSS API URLs', () => {
  assert.equal(cssApiUrl('Noto Sans KR', { weights: [400, 700] }), 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
  assert.equal(cssApiUrl('Inter', { text: 'Ag&' }), 'https://fonts.googleapis.com/css2?family=Inter&display=swap&text=Ag%26');
  assert.equal(axisSpec(mk({ f: 'Inter', ax: [{ t: 'wght', min: 100, max: 900 }] })), 'Inter:wght@100..900');
  assert.equal(slugify('Noto Sans KR'), 'noto-sans-kr');
  assert.equal(slugify('M PLUS 1p'), 'm-plus-1p');
});
