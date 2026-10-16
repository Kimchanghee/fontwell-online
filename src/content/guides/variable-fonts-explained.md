---
title: "What are variable fonts? Axes, CSS and when to use them"
description: "Variable fonts pack a range of weights, widths or optical sizes into one file. How axes work, the CSS to use, how many Google Fonts are variable, and limits."
question: "What is a variable font?"
answer: "A variable font is a single font file that contains a continuous range of styles along one or more axes, such as weight (wght) from 100 to 900, instead of one file per style. On 15 October 2026, 561 of the 1,950 Google Fonts families shipped as variable fonts."
published: 2026-10-16
updated: 2026-10-16
data_asof: "15 Oct 2026 (Google Fonts metadata)"
order: 5
related: ["font-display-and-layout-shift", "how-to-choose-a-ui-font", "subset-korean-cjk-web-fonts"]
sources:
  - title: "Microsoft Typography: OpenType Design-Variation Axis Tag Registry"
    url: "https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxisreg"
  - title: "MDN: Variable fonts guide"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide"
  - title: "W3C CSS Fonts Module Level 4"
    url: "https://www.w3.org/TR/css-fonts-4/"
  - title: "Google Fonts CSS API v2 (axis ranges)"
    url: "https://developers.google.com/fonts/docs/css2"
  - title: "Google Fonts family metadata (axis counts)"
    url: "https://fonts.google.com/metadata/fonts"
faq:
  - q: "Are variable fonts smaller than static fonts?"
    a: "Usually only when you use several styles. One variable file is typically larger than one static weight but smaller than four or five static weights combined. If you only need Regular and Bold, two static files can be lighter."
  - q: "Do all browsers support variable fonts?"
    a: "All current major browsers support OpenType variable fonts and the CSS properties font-variation-settings and font-optical-sizing. Very old browsers fall back to the nearest static rendering."
  - q: "What is the difference between font-weight and font-variation-settings?"
    a: "font-weight maps to the registered wght axis and cascades like any CSS property. font-variation-settings sets raw axis values, overrides higher-level properties and should be reserved for custom axes."
---

## How a variable font works

A traditional family is a set of separate files: Regular, Italic, Bold, Bold Italic and so on. A variable font stores the outlines once, together with instructions for how each point moves between extremes ("masters"). The renderer interpolates any position in between. The format was introduced in OpenType 1.8 in 2016, developed jointly by Apple, Google, Microsoft and Adobe.

Each dimension of change is an **axis**, identified by a four-letter tag. Lower-case tags are registered in the OpenType specification; upper-case tags are custom axes defined by the designer.

## How many Google Fonts are variable, and along which axes?

Counting the axes in Google Fonts' family metadata on 15 October 2026:

| Axis | Tag | Families |
|---|---|---:|
| Weight | `wght` | 544 |
| Width | `wdth` | 97 |
| Optical size | `opsz` | 29 |
| Slant | `slnt` | 23 |
| Element shape (custom) | `ELSH` | 15 |
| Cursive (custom) | `CRSV` | 14 |
| Element expansion (custom) | `ELXP` | 12 |

561 of 1,950 families (29%) have at least one axis; almost all of them vary in weight. Roboto, for example, varies along `wdth` 75 to 100 and `wght` 100 to 900; Inter along `opsz` 14 to 32 and `wght` 100 to 900. The [proofing desk](/) has a "Variable only" filter, and each [family page](/fonts/) lists its axes and ranges.

## The five registered axes

- **`wght` (weight)**: 1 to 1000 in the spec, mapped to CSS `font-weight`.
- **`wdth` (width)**: a percentage of normal width, mapped to CSS `font-stretch`.
- **`opsz` (optical size)**: adjusts design details for the size in points; with CSS `font-optical-sizing: auto` (the default) the browser sets it from `font-size`.
- **`slnt` (slant)**: angle in degrees, mapped to `font-style: oblique <angle>`.
- **`ital` (italic)**: 0 or 1, switching to italic forms, mapped to `font-style: italic`.

## Using a variable font in CSS

With the Google Fonts CSS API, request a range with `..`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
```

When self-hosting, declare the range in `@font-face` so the browser knows one file covers it:

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
h1 { font-weight: 720; }
.caption { font-weight: 430; }
```

Prefer the high-level properties (`font-weight`, `font-stretch`, `font-style`, `font-optical-sizing`). Use `font-variation-settings` only for custom axes, because it overrides the others and does not inherit per axis:

```css
.headline { font-variation-settings: 'CRSV' 1; }
```

## When a variable font is the better choice

- **You use three or more styles** of a family. One request replaces several and usually weighs less in total.
- **You want in-between weights** for hierarchy (for example 450 for UI text, 650 for headings) or responsive width changes.
- **Optical sizing matters**: families with `opsz` (Inter, Source Serif 4, DM Sans and 26 others in the library) render small text with looser spacing and sturdier details automatically.

## When static files win

- **You only need one or two styles.** Requesting `wght@400;700` from the CSS API returns static instances that may be smaller than the full variable range.
- **CJK fonts.** Korean, Japanese and Chinese families are large; whether variable or not, the decisive optimisation is [subsetting](/guides/subset-korean-cjk-web-fonts/), not axes.
- **Legacy rendering targets**, such as some email clients or embedded systems, may not support variations.

## Licensing is unchanged

A variable font is the same family under the same licence. For Google Fonts that is almost always the OFL. Creating static instances from a variable font for your own use is permitted; distributing them follows the usual OFL rules on modified versions and Reserved Font Names, explained in our [OFL guide](/guides/what-is-the-sil-open-font-license/).

To build a type scale that takes advantage of fine weight steps, try the [type-scale generator](/tools/type-scale/).
