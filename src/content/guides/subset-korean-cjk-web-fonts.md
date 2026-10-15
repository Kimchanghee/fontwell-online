---
title: "How to subset Korean and CJK web fonts without breaking text"
description: "Korean, Japanese and Chinese fonts hold thousands of glyphs. How unicode-range slicing works, what Google Fonts does (124 slices for Noto Sans KR), and how to subset your own files."
question: "How do I make Korean or CJK web fonts load fast?"
answer: "Split the font into many small files by Unicode range and let the browser download only the slices a page uses. Google Fonts already does this: on 16 October 2026 one weight of Noto Sans KR was served as 124 unicode-range slices. When self-hosting, subset with fontTools and declare unicode-range."
published: 2026-10-16
updated: 2026-10-16
data_asof: "16 Oct 2026 (measured against the Google Fonts CSS API)"
order: 6
related: ["self-hosting-google-fonts-gdpr", "font-display-and-layout-shift", "variable-fonts-explained"]
sources:
  - title: "MDN: unicode-range descriptor"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range"
  - title: "fontTools subset (pyftsubset) documentation"
    url: "https://fonttools.readthedocs.io/en/latest/subset/index.html"
  - title: "Google Fonts CSS API v2 (text= parameter)"
    url: "https://developers.google.com/fonts/docs/css2"
  - title: "Unicode: Hangul Syllables block chart (U+AC00–U+D7AF)"
    url: "https://www.unicode.org/charts/PDF/UAC00.pdf"
  - title: "SIL Open Font License 1.1"
    url: "https://openfontlicense.org/open-font-license-official-text/"
faq:
  - q: "Why are Korean fonts so large?"
    a: "Unicode encodes 11,172 precomposed Hangul syllables (U+AC00 to U+D7A3), and many Korean fonts also include Hanja and Latin. A Latin font needs a few hundred glyphs; a full Korean font needs well over ten thousand."
  - q: "Can I subset only the characters on my page?"
    a: "Yes, for fixed text such as a logo or headline: the Google Fonts text= parameter or pyftsubset --text does exactly that. For text that changes, such as articles or user input, use unicode-range slicing so unexpected characters still render."
  - q: "Does subsetting break the OFL?"
    a: "Subsetting is permitted. The OFL FAQ discusses whether a subset counts as a modified version, which only matters if the font declares a Reserved Font Name. Keep the copyright and licence metadata in the subset files."
---

## Why CJK fonts need special treatment

A Latin font covering Western European languages holds a few hundred glyphs. Korean needs far more: Unicode's Hangul Syllables block contains 11,172 precomposed syllables (U+AC00 to U+D7A3), and the older Korean standard KS X 1001 lists 2,350 of them as the commonly used set. Japanese fonts combine kana with thousands of kanji; Chinese fonts cover tens of thousands of Han characters. The result is font files measured in megabytes, not kilobytes.

Coverage in the Google Fonts library is correspondingly thin. In the metadata snapshot of 15 October 2026, 38 families include a Korean subset, 68 Japanese, 10 Simplified Chinese and 16 Traditional Chinese, out of 1,950. Popular choices include [Noto Sans KR](/fonts/noto-sans-kr/), [Nanum Gothic](/fonts/nanum-gothic/) and Noto Serif KR; filter the [proofing desk](/) by script to see them all.

## How unicode-range slicing works

CSS lets you split one family across many `@font-face` rules, each with a `unicode-range`. The browser downloads a file only when text on the page contains a character in its range:

```css
@font-face {
  font-family: 'Noto Sans KR';
  src: url('/fonts/noto-sans-kr-400-slice-12.woff2') format('woff2');
  font-weight: 400;
  unicode-range: U+AC00-AC5F, U+B098-B0FF;
}
/* …one rule per slice… */
```

A typical Korean paragraph then pulls a dozen or so small files instead of one multi-megabyte file, and pages that only show Latin text download no Hangul at all.

## What Google Fonts does

The Google Fonts CSS API applies this slicing automatically. Requesting `family=Noto+Sans+KR:wght@400` with a current browser user agent on 16 October 2026 returned 124 `@font-face` rules for that single weight; Noto Sans JP also returned 124. By contrast, Inter returned 7 (one per script subset). Slices group characters by how often they appear together, so ordinary text touches relatively few of them.

Two practical consequences:

- **Each weight multiplies requests.** Loading 400, 500 and 700 triples the slices. For CJK body text, two weights are usually enough.
- **The `text=` parameter** returns a single file containing only the characters you list. For a fixed headline it is ideal: our request for six characters (three Hangul syllables plus "ABC") returned a 1,816-byte font file.

## Subsetting your own files

When you self-host (for privacy or control, see [self-hosting and GDPR](/guides/self-hosting-google-fonts-gdpr/)), you need to produce slices yourself. The standard tool is `pyftsubset` from fontTools:

```bash
pip install fonttools brotli
# a slice for the 2,350 common Hangul syllables listed in a text file
pyftsubset NotoSansKR-Regular.ttf \
  --text-file=ksx1001-hangul.txt \
  --flavor=woff2 \
  --layout-features='*' \
  --name-IDs='*' \
  --output-file=noto-sans-kr-400-common.woff2
```

Then add a second file for the remaining Hangul range as a fallback, and a Latin slice. Three tiers work well for Korean:

1. **Latin and punctuation** (U+0000-00FF, U+2000-206F): small, loaded everywhere.
2. **Common Hangul** (the 2,350 KS X 1001 syllables plus jamo): covers almost all real text.
3. **Remaining Hangul and Hanja**: loaded only when a rare character appears.

Keep `--layout-features='*'` (or at least the features your text uses), otherwise kerning and vertical forms may disappear.

## Preventing layout shift and invisible text

Large fonts arrive late, so plan the fallback:

- use `font-display: swap` for body text so readers see text immediately in a system font;
- choose a metric-compatible fallback such as `'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif` for Korean sans;
- reserve layout space for headlines, as explained in [font-display and layout shift](/guides/font-display-and-layout-shift/).

## Licence check

Every Korean family in Google Fonts is under the OFL, which permits subsetting and redistribution of the resulting files. Keep the copyright notice and licence metadata in the subsets: by default pyftsubset keeps only name IDs 0 to 6, which drops the licence description (ID 13) and licence URL (ID 14), so pass `--name-IDs='*'` as in the command above, and if a family declares a Reserved Font Name, read the [OFL guide](/guides/what-is-the-sil-open-font-license/) section on modified versions.
