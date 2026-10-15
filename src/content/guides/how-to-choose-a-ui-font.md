---
title: "How to choose a font for UI and brand: a working checklist"
description: "What makes a font work in interfaces: legible shapes, tabular numerals, weights, language coverage and licence. A checklist with examples from the open Google Fonts library."
question: "How do I choose a font for a user interface?"
answer: "Pick a font that stays legible at 12 to 16 px, distinguishes look-alike characters (I, l, 1, O, 0), offers tabular numerals and at least four weights, covers every language you ship, and has a licence that allows embedding in apps. Then test it with your real interface text."
published: 2026-10-16
updated: 2026-10-16
data_asof: "15 Oct 2026 (Google Fonts metadata)"
order: 9
related: ["how-to-pair-fonts", "variable-fonts-explained", "web-vs-desktop-font-licenses"]
sources:
  - title: "W3C WCAG 2.2: Understanding Success Criterion 1.4.12 Text Spacing"
    url: "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html"
  - title: "MDN: font-variant-numeric"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric"
  - title: "Microsoft Typography: OpenType feature tags (tnum, ss01, zero)"
    url: "https://learn.microsoft.com/en-us/typography/opentype/spec/featuretags"
  - title: "Google Fonts family metadata"
    url: "https://fonts.google.com/metadata/fonts"
  - title: "SIL Open Font License 1.1"
    url: "https://openfontlicense.org/open-font-license-official-text/"
faq:
  - q: "Should I just use the system font stack?"
    a: "For many products it is the best choice: zero download, native feel and excellent hinting on each platform. Choose a web font when brand consistency across platforms, language coverage or specific features such as tabular numerals matter more."
  - q: "What are tabular numerals and why do they matter?"
    a: "Tabular numerals all have the same width, so digits line up in columns and counters do not jitter as values change. In CSS you enable them with font-variant-numeric: tabular-nums, if the font includes the tnum feature."
  - q: "Can I embed an open font in a commercial app?"
    a: "Yes. The OFL, Apache 2.0 and Ubuntu Font Licence all allow bundling fonts in commercial software, provided the licence and copyright notice ship with the font files."
---

## Interfaces are read differently from articles

Interface text is short, small, dense and often scanned rather than read: labels, buttons, tables, error messages, numbers that change. A font that is lovely in a long article can fail here. The checklist below is ordered by how often each point causes real problems.

## 1. Legibility at small sizes

- **Distinguish look-alikes.** Type "Il1 O0 rn m" and check each is unmistakable. Some fonts offer stylistic sets (for example a slashed or dotted zero, `zero`, or a tailed l) you can switch on in CSS with `font-feature-settings`.
- **Open apertures.** Letters like c, e and s with open counters stay readable when blurred or small.
- **Generous x-height, but not extreme.** A larger x-height helps at 12 to 14 px; an extreme one makes words look alike.
- **Hinting and rendering.** Test on a standard-density Windows screen, where differences between fonts are most visible.

## 2. Numerals

Dashboards, prices and tables need **tabular numerals** (`tnum`), so digits align and values do not shift when they update:

```css
.amount, td.num { font-variant-numeric: tabular-nums; }
```

Check that the font actually includes the feature; the CSS property does nothing otherwise. Also look at lining versus old-style figures: old-style figures suit prose but look odd in data tables.

## 3. Weights and styles

Interfaces use more weights than articles: regular for body, medium for labels and buttons, semibold or bold for headings, sometimes light for large numbers. Look for at least four weights, or a variable `wght` axis. In the library snapshot of 15 October 2026, 544 families have a variable weight axis. [Inter](/fonts/inter/), for example, spans weights 100 to 900 and also has an optical-size axis, which loosens spacing at small sizes automatically.

## 4. Language coverage

Check every language you ship, including user-generated content. Names, addresses and comments arrive in scripts you did not plan for, and missing glyphs fall back to another font mid-word. Families from the Noto project aim at broad coverage. On the [proofing desk](/) you can filter by script; each [family page](/fonts/) lists its subsets.

## 5. Spacing resilience

WCAG 2.2 success criterion 1.4.12 requires that content still works when users increase line height to 1.5, paragraph spacing to 2 times the font size, letter spacing to 0.12 and word spacing to 0.16 times the font size. Fonts that are already wide or tightly fitted break layouts sooner under those overrides. Test your components with the overrides applied.

## 6. Licence for every channel

Interfaces end up in web apps, native apps, marketing pages, documents and sometimes hardware. Open licences cover all of those with one licence; commercial fonts often need separate app and web licences (see [web vs desktop font licences](/guides/web-vs-desktop-font-licenses/)). For an open font, check the exact family with the [licence checker](/tools/license-checker/) using the "bundle inside an app" use.

## 7. Brand fit, last

Personality matters, but it should come from a font that already passes the checks above. A common pattern is a distinctive heading or wordmark face for brand moments and a sober UI face for everything else; our [pairing guide](/guides/how-to-pair-fonts/) shows how to make the two work together.

## Monospace for code and data

If your product shows code, IDs or log output, add a monospace with clear zero and one, and enough weights. Among the most-used monospace families in the library are [JetBrains Mono](/fonts/jetbrains-mono/), [Roboto Mono](/fonts/roboto-mono/), [Source Code Pro](/fonts/source-code-pro/) and [IBM Plex Mono](/fonts/ibm-plex-mono/).

## A one-hour evaluation routine

1. Shortlist three families that pass coverage and licence checks.
2. Rebuild one dense screen (a table with numbers, a form with errors, a navigation bar) in each.
3. View on a phone at 390 px and a desktop monitor.
4. Apply the WCAG text-spacing overrides.
5. Pick the one that disappears into the task; then tune sizes with the [type-scale generator](/tools/type-scale/).
