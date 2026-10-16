---
title: "Self-hosting Google Fonts: GDPR, privacy and how to do it"
description: "Why EU site owners self-host Google Fonts after the 2022 Munich ruling, what Google says it logs, and a step-by-step self-hosting setup with @font-face rules."
question: "Should I self-host Google Fonts for GDPR?"
answer: "If your site serves visitors in the EU or UK, self-hosting is the low-risk choice. Linking to the Google Fonts API sends each visitor's IP address to Google, and a Munich court held in January 2022 that doing so without consent breached the GDPR. Self-hosting sends nothing to Google."
published: 2026-10-16
updated: 2026-10-16
data_asof: "16 Oct 2026"
order: 7
related: ["subset-korean-cjk-web-fonts", "font-display-and-layout-shift", "web-vs-desktop-font-licenses"]
sources:
  - title: "Google Fonts FAQ: privacy and data collection"
    url: "https://fonts.google.com/faq#privacy"
  - title: "LG München I, judgment of 20 January 2022, 3 O 17493/20 (Bavarian court database)"
    url: "https://www.gesetze-bayern.de/Content/Document/Y-300-Z-BECKRS-B-2022-N-612"
  - title: "General Data Protection Regulation (EU) 2016/679, Article 6"
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj"
  - title: "MDN: @font-face"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face"
  - title: "google/fonts repository"
    url: "https://github.com/google/fonts"
faq:
  - q: "Is using the Google Fonts API illegal in the EU?"
    a: "No law bans it. The 2022 Munich judgment found that one website's undisclosed transfer of a visitor's IP address to Google lacked a legal basis under the GDPR. The decision binds only that case, but it led many EU site owners to self-host or ask for consent."
  - q: "Does the Google Fonts API set cookies?"
    a: "Google's Fonts FAQ says the Google Fonts Web API does not set or log cookies. It does receive the visitor's IP address and request headers, because the browser fetches files from Google's servers."
  - q: "Am I allowed to self-host Google Fonts?"
    a: "Yes. The open licences used by Google Fonts allow redistribution, so you may serve the files from your own server, as long as the licence and copyright notice stay with the font files."
---

## What happens when you link to Google Fonts

A typical embed loads a stylesheet from `fonts.googleapis.com`, which in turn points at font files on `fonts.gstatic.com`. The visitor's browser makes both requests directly. Like any HTTP request, that reveals the visitor's IP address, user agent and the referring page to Google.

Google's Fonts FAQ confirms this: the API is unauthenticated and does not set or log cookies, and each request carries the visitor's IP address, the requested URL and HTTP headers including the user agent and referer. Google states that it does not use information collected by Google Fonts to create profiles of end users or for targeted advertising. Those assurances describe Google's handling; they do not change the fact that personal data (an IP address) leaves the visitor's browser for a third party.

## The 2022 Munich ruling

On 20 January 2022 the Regional Court of Munich (Landgericht München I, case 3 O 17493/20) ruled on a website that embedded Google Fonts dynamically. The court held that passing the visitor's IP address to Google without consent had no legal basis under Article 6 GDPR, because the site could have self-hosted the fonts instead, and awarded the visitor 100 euros in damages plus an injunction.

The judgment binds only that case and that court, but it was widely reported and followed by waves of warning letters to German site owners. The practical lesson most lawyers drew is simple: if a technically equivalent option sends no personal data to a third party, use it.

This page is general information, not legal advice. Your obligations depend on your audience, your consent setup and your jurisdiction.

## Self-hosting step by step

### 1. Get the files

Download the family from its Google Fonts specimen page or from the [google/fonts](https://github.com/google/fonts) repository. For the web you want WOFF2. If the download only contains TTF, convert or subset it with fontTools (see [subsetting CJK fonts](/guides/subset-korean-cjk-web-fonts/)), or use an npm package that redistributes the Google Fonts files.

### 2. Keep only what you use

List the weights and scripts your design actually uses. A Latin site using Regular and Bold of a static family needs two files. A variable family needs one file per script subset for the whole weight range. Every [family page on Fontwell](/fonts/) lists weights, axes and subsets so you can decide before downloading.

### 3. Write the @font-face rules

```css
@font-face {
  font-family: 'Source Serif 4';
  src: url('/fonts/source-serif-4-latin-var.woff2') format('woff2');
  font-weight: 200 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
body { font-family: 'Source Serif 4', Georgia, serif; }
```

### 4. Preload only the critical file

```html
<link rel="preload" href="/fonts/source-serif-4-latin-var.woff2" as="font" type="font/woff2" crossorigin>
```

Preload one or two files at most; preloading everything delays other resources.

### 5. Cache them for a long time

Font files rarely change. Serve them with `Cache-Control: public, max-age=31536000, immutable` and change the file name when you update.

### 6. Remove every remaining Google Fonts reference

Search your templates, plugins and theme for `fonts.googleapis.com` and `fonts.gstatic.com`. WordPress themes and page builders often load Google Fonts on their own; disable that setting or the self-hosted copy is pointless. Then confirm in the browser's network panel that no request goes to either host.

## Licence obligations when self-hosting

Serving font files is redistribution. Under the OFL and the Ubuntu Font Licence each copy must carry the copyright notice and licence; the metadata inside the Google Fonts files satisfies that, and adding the `OFL.txt` next to your files removes any doubt. Under Apache 2.0, keep the licence and any NOTICE file. You may not sell the font by itself (OFL), but serving it for your website is not selling it. Our [OFL guide](/guides/what-is-the-sil-open-font-license/) covers the details.

## Trade-offs

- **Performance**: there is no longer a shared cross-site cache for Google Fonts (browsers partition caches by site), so self-hosting usually costs nothing in speed and saves a connection to another origin.
- **Updates**: Google occasionally updates families (Roboto's files were last updated on 19 February 2026 per Google's metadata). Self-hosted copies stay frozen until you refresh them.
- **Effort**: CJK families need slicing to perform well, which the API did for you.

How Fontwell itself handles this: the site's own text fonts are self-hosted. The live specimens on the [proofing desk](/) do load from the Google Fonts API, which is disclosed in our [privacy policy](/privacy/) and can be switched off with one checkbox.
