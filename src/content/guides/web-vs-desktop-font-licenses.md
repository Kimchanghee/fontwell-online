---
title: "Web vs desktop font licences: what changes and why it matters"
description: "Commercial fonts are licensed per use: desktop seats, web pageviews, apps, ebooks. Open fonts are not. How the models differ and what to check before you buy or embed a font."
question: "What is the difference between a web font licence and a desktop font licence?"
answer: "A desktop licence lets you install a font on a set number of computers to make documents; a web licence lets you serve the font file to visitors' browsers, often capped by pageviews. Open licences such as the OFL make no such split: one licence covers every use."
published: 2026-10-16
updated: 2026-10-16
data_asof: "16 Oct 2026"
order: 4
related: ["can-i-use-google-fonts-commercially", "self-hosting-google-fonts-gdpr", "can-i-use-a-free-font-in-a-logo"]
sources:
  - title: "SIL Open Font License 1.1, official text"
    url: "https://openfontlicense.org/open-font-license-official-text/"
  - title: "Google Fonts FAQ"
    url: "https://developers.google.com/fonts/faq"
  - title: "MDN: @font-face"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face"
  - title: "W3C WOFF File Format 2.0"
    url: "https://www.w3.org/TR/WOFF2/"
faq:
  - q: "Can I use a desktop-licensed font on my website as an image?"
    a: "Many commercial desktop licences allow static images of text, such as a headline exported as PNG, because no font file is distributed. Serving the font file to browsers needs a web licence. Check the specific licence, because terms vary by foundry."
  - q: "Do Google Fonts need a separate web licence?"
    a: "No. Google Fonts families are under open licences that cover desktop, web, app and print use alike, with no pageview limits or seat counts."
  - q: "Is a WOFF2 file a different font legally?"
    a: "It is the same font in a compressed container. Commercial licences usually specify which formats you may use for which purpose; open licences let you convert formats, with the OFL treating conversion as a possible modified version if a Reserved Font Name is declared."
---

## Why commercial fonts are licensed by use

A font is software that ends up in two very different places. On a designer's computer it is a tool used to make documents. On a website or in an app it is a file shipped to every visitor or user. Commercial foundries price those situations differently, so their end-user licence agreements (EULAs) usually split into separate products:

| Licence type | What it allows | Typical metric |
|---|---|---|
| Desktop | Install on computers to create documents, print, images, PDFs | Number of users or devices |
| Web | Serve the font via `@font-face` to browsers on named domains | Monthly pageviews or a flat tier |
| App / embedding | Bundle the font inside a mobile or desktop application | Number of apps or titles |
| Ebook / digital publication | Embed the font in ePub or PDF publications | Number of titles |
| Broadcast, server, enterprise | Video, on-demand rendering, large organisations | Custom quote |

The details are foundry-specific. Some count pageviews per month, some per year; some allow staging domains, some do not; some forbid letting users type their own text with the font (for example, in a product customiser). The only reliable reference is the EULA for the exact product you bought.

## How open licences differ

The SIL Open Font License, Apache 2.0 and the Ubuntu Font Licence do not divide use into products. The OFL's permission covers use, embedding, modification and redistribution in a single grant, with conditions that are the same for a website, an app or a printed book. That is why the 1,950 families in the Google Fonts library (snapshot of 15 October 2026) need no web licence, no seat count and no pageview reporting.

Open licences still have rules, but they attach to distributing the font file rather than to the channel:

- keep the copyright notice and licence with the file;
- do not sell the font by itself (OFL);
- keep modified versions under the same licence and respect Reserved Font Names (OFL).

## What "web use" means technically

Web use means the font file leaves your server. With `@font-face`, the browser downloads a WOFF2 (or WOFF, TTF) file and renders text with it. Anyone can save that file. Commercial web licences therefore often require measures like obfuscated file names, domain restrictions or a hosted service that serves the file from the foundry's servers.

With open fonts none of that is necessary: redistributing the file is allowed. The [Google Fonts CSS API](/guides/self-hosting-google-fonts-gdpr/) hosts the files for you, or you can self-host them.

## Converting formats

Desktop fonts come as OTF or TTF; the web uses WOFF2, a compressed container defined by the W3C. Commercial EULAs often specify which formats you may create or must obtain from the foundry. Open licences let you convert. One wrinkle: if an OFL font declares a Reserved Font Name, the OFL FAQ discusses whether a converted or subsetted file counts as a modified version, which would need a different name unless the author permits otherwise. The files on Google Fonts are already web-ready, so most projects never convert anything.

## Mixed projects: one open, one commercial

It is common to pair a commercial display face with an open text face. Then each font follows its own licence:

- the open body font may be self-hosted, bundled and modified under its licence;
- the commercial headline font may need separate desktop seats for designers, a web licence for the site, and an app licence for the mobile build.

Budget for every channel in which the commercial font will appear. An agency licence covering only the designer's desktop does not cover the client's website.

## A decision checklist

1. **List every channel**: design files, website, app, email templates, ebooks, video, user-generated content (customisers, editors).
2. **For each commercial font**, find the licence tier covering each channel. If one is missing, the font is not cleared for that channel.
3. **For each open font**, confirm the licence on its [Fontwell page](/fonts/) and keep the licence file with the files you distribute.
4. **Record it** in the project's documentation, including version numbers and where files came from.

If you are choosing between buying and using an open family, start with the [licence checker](/tools/license-checker/) and the [proofing desk](/) to see whether an open font already covers your scripts and weights.
