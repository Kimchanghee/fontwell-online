---
title: "font-display and layout shift: loading web fonts without CLS"
description: "How font-display swap, fallback and optional behave, why web fonts shift layout, and how size-adjust and metric overrides make the fallback match. With CSS."
question: "How do I stop web fonts from causing layout shift?"
answer: "Use font-display: swap or optional, preload only the one or two critical font files, and make the fallback font occupy the same space with the size-adjust, ascent-override and descent-override descriptors. Then the swap from fallback to web font barely moves anything."
published: 2026-10-16
updated: 2026-10-16
data_asof: "16 Oct 2026"
order: 10
related: ["self-hosting-google-fonts-gdpr", "subset-korean-cjk-web-fonts", "variable-fonts-explained"]
sources:
  - title: "MDN: font-display"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display"
  - title: "MDN: size-adjust"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust"
  - title: "MDN: ascent-override"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/ascent-override"
  - title: "web.dev: Cumulative Layout Shift (CLS)"
    url: "https://web.dev/articles/cls"
  - title: "web.dev: Best practices for fonts"
    url: "https://web.dev/articles/font-best-practices"
  - title: "W3C CSS Fonts Module Level 4"
    url: "https://www.w3.org/TR/css-fonts-4/"
faq:
  - q: "Which font-display value should I use?"
    a: "Use swap for body text you want readable immediately, and optional when avoiding any late swap matters more than showing the web font on a first visit. Avoid block for body text because it hides text for up to about three seconds."
  - q: "Does font-display: swap cause CLS?"
    a: "It can. Swapping from a fallback to a web font with different metrics re-flows text and moves content below it. Matching the fallback's size and vertical metrics with size-adjust and the override descriptors keeps that shift small."
  - q: "Should I preload web fonts?"
    a: "Preload the one or two files needed for above-the-fold text, with crossorigin set. Preloading every weight competes with other critical resources and can make the page slower."
---

## Why fonts move pages

A browser that needs a web font has three options while the file downloads: hide the text, show it in a fallback font, or give up on the web font. When the web font finally arrives and differs in width, height or line spacing from the fallback, every line re-wraps and content below it jumps. That jump counts towards **Cumulative Layout Shift (CLS)**, one of Google's Core Web Vitals; web.dev describes a CLS of 0.1 or less as good.

## What each font-display value does

The `font-display` descriptor in `@font-face` sets how long text stays invisible ("block period") and how long a late font may still be swapped in ("swap period"):

| Value | Block period | Swap period | Best for |
|---|---|---|---|
| `block` | short (around 3 s in practice) | infinite | Icon fonts, where fallback glyphs are meaningless |
| `swap` | extremely small | infinite | Body and headings that must be readable at once |
| `fallback` | extremely small (about 100 ms) | short (about 3 s) | Text where a very late swap is not worth it |
| `optional` | extremely small | none | Performance-first pages; web font used if cached or very fast |
| `auto` | browser decides | browser decides | Avoid; behaves like block in most browsers |

The Google Fonts CSS API sets the value through its `display=` parameter; `display=swap` is the usual choice.

## Make the fallback the same size

The modern fix is to tune the fallback font so it occupies the same box as the web font. CSS Fonts Level 4 provides four descriptors for a local fallback face:

- `size-adjust` scales the glyphs (and so the width of every line);
- `ascent-override` and `descent-override` set the vertical metrics;
- `line-gap-override` sets the extra line gap.

```css
@font-face {
  font-family: 'Inter Fallback';
  src: local('Arial');
  size-adjust: 107%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}
body { font-family: 'Inter', 'Inter Fallback', system-ui, sans-serif; }
```

The percentages shown are illustrative. Compute real values from the two fonts' metrics (units per em, ascender, descender, average character width); tools such as the Fontaine and Capsize projects automate it, and some frameworks generate fallback faces at build time. Browser support for the override descriptors differs, so check MDN's compatibility tables; unsupported descriptors are simply ignored.

## Preload the critical file only

```html
<link rel="preload" href="/fonts/inter-latin-var.woff2" as="font" type="font/woff2" crossorigin>
```

The `crossorigin` attribute is required even for same-origin fonts, otherwise the preloaded file is not reused. Preload the one file used above the fold: usually the regular weight of the body font, or a variable file covering all weights.

## Reduce what must load

- **Subset.** Latin-only sites do not need Cyrillic or Vietnamese glyphs. CJK sites need slicing (see [subsetting Korean and CJK fonts](/guides/subset-korean-cjk-web-fonts/)).
- **Fewer files.** One variable file can replace several static weights ([variable fonts explained](/guides/variable-fonts-explained/)).
- **Self-host** to avoid extra connections to other origins ([self-hosting guide](/guides/self-hosting-google-fonts-gdpr/)).
- **Cache for a year** with immutable file names.

## Reserve space for things that swap

Even with tuned fallbacks, give fixed-height boxes to elements whose size depends on a font, such as one-line headlines in cards or specimen rows. On Fontwell's [proofing desk](/), each specimen row has a fixed height and clips overflow, so loading 48 different fonts from Google does not move the list.

## How to check your result

1. Open Chrome DevTools, throttle the network, and record a Performance trace; layout shifts appear as "Layout Shift" entries with the moved elements.
2. Compare a cold load with a warm (cached) load.
3. Watch the field data in Search Console's Core Web Vitals report or the Chrome UX Report after release, because lab tests miss slow real-world networks.
