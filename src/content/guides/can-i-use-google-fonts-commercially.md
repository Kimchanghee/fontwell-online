---
title: "Can I use Google Fonts commercially? Licences explained"
description: "Yes: every Google Fonts family is under an open licence (OFL, Apache 2.0 or Ubuntu). What that allows for client work, products and apps, and where it stops."
question: "Can I use Google Fonts commercially?"
answer: "Yes. Every family in the Google Fonts library is published under an open licence: the SIL Open Font License, Apache 2.0 or the Ubuntu Font Licence. All three allow commercial websites, print, logos, client work and apps. The main limit is that OFL fonts cannot be sold on their own."
published: 2026-10-16
updated: 2026-10-16
data_asof: "16 Oct 2026"
order: 1
related: ["what-is-the-sil-open-font-license", "can-i-use-a-free-font-in-a-logo", "ofl-vs-apache-vs-ubuntu-font-licence"]
sources:
  - title: "Google Fonts FAQ (licensing and commercial use)"
    url: "https://fonts.google.com/faq"
  - title: "SIL Open Font License 1.1, official text"
    url: "https://openfontlicense.org/open-font-license-official-text/"
  - title: "Apache License 2.0"
    url: "https://www.apache.org/licenses/LICENSE-2.0"
  - title: "Ubuntu Font Licence 1.0"
    url: "https://canonical.com/legal/font-licence"
  - title: "google/fonts repository (licence folders)"
    url: "https://github.com/google/fonts"
faq:
  - q: "Do I need to credit Google Fonts on my website?"
    a: "No. None of the three licences requires a visible credit on a website, poster or product. The licence and copyright notice must travel with the font files themselves when you redistribute them, which the files from Google Fonts already carry in their metadata."
  - q: "Can I use Google Fonts for client work?"
    a: "Yes. Designing a website, brochure or brand for a client is ordinary use of the font. You can also hand the font files to the client, as long as the licence stays with them."
  - q: "Are Google Fonts free for commercial use in apps?"
    a: "Yes. You may bundle the font files inside an app or game, including a paid one, provided each copy includes the copyright notice and licence text (for OFL and UFL) or the licence and NOTICE file (for Apache 2.0)."
---

## Which licences does Google Fonts use?

Google Fonts does not have its own font licence. Each family keeps the open licence its designers chose, and the [google/fonts](https://github.com/google/fonts) repository files every family into a folder named after that licence: `ofl/`, `apache/` or `ufl/`. Counting those folders against the 1,950 families in Google's metadata on 15 October 2026 gives this split:

| Licence | Families | Share |
|---|---:|---:|
| SIL Open Font License 1.1 (OFL) | 1,904 | 97.6% |
| Apache License 2.0 | 35 | 1.8% |
| Ubuntu Font Licence 1.0 (UFL) | 5 | 0.3% |
| Not matched to a folder by name | 6 | 0.3% |

The six unmatched families are a naming quirk of our matching (several "Edu" handwriting families), not a sign of a different licence; we flag them rather than guess. Our [methodology page](/methodology/) explains the matching.

The practical takeaway is that the OFL governs almost everything you will pick from the library, so it is the licence worth understanding first. Our [OFL guide](/guides/what-is-the-sil-open-font-license/) goes clause by clause.

## What "commercial use" actually covers

Google's own FAQ answers the question directly: you can use the fonts commercially, and even include them within a product that is sold commercially, with usage and redistribution conditions set by each font's licence. In licence terms, "using" a font splits into two very different activities:

1. **Making things with the font.** Websites, PDFs, packaging, video titles, ads, logos, book covers, T-shirts. The OFL calls these "documents created using the Font Software" and its condition 5 says the licence's requirements do not apply to them. Apache 2.0 and the UFL have no conditions on output either.
2. **Passing the font file itself to someone else.** Self-hosting web fonts, bundling a font in an app, sending files to a printer or a client. This is redistribution, and it is where the licences attach conditions.

Most commercial worries are about the first activity, and the answer there is simply yes.

## The conditions that apply when you redistribute the files

Redistribution is allowed under all three licences, with paperwork:

- **OFL:** each copy must contain the copyright notice and the licence. The licence explicitly allows this to live in machine-readable metadata inside the font file, and the files Google serves include it. Modified versions must stay under the OFL and must not use any Reserved Font Name.
- **Apache 2.0:** include a copy of the licence, keep existing copyright and attribution notices, ship any NOTICE file, and mark files you changed.
- **UFL:** each copy must contain the copyright notice and licence, and modified versions follow strict renaming rules.

Self-hosting a web font counts as redistribution because visitors' browsers download the file from your server. In practice the embedded metadata covers it, but keeping the licence text next to the font files in your repository is cheap and removes any doubt.

## The one thing you cannot do: sell the font

OFL condition 1 says the font, original or modified, "may not be sold by itself". You can sell a template, a game or an app that includes the font, but a product whose value is the font file (a font bundle, a "premium" re-upload of an OFL font) is not allowed. Apache 2.0 and the UFL do not contain this ban, but they do not give you any rights in the font's name, and selling a freely downloadable font as-is is hard to justify to a buyer.

## Is a Google-hosted font different from a downloaded one?

The licence is the same whether you link to `fonts.googleapis.com` or download the files from the specimen page. What differs is privacy and performance: linking means each visitor's browser contacts Google's servers. If that matters for your audience, see [self-hosting Google Fonts and GDPR](/guides/self-hosting-google-fonts-gdpr/).

## What to check before you ship

The library is open, but individual projects still deserve a thirty-second check:

- **Open the family's licence file.** Each folder in google/fonts contains `OFL.txt`, `LICENSE.txt` or `UFL.txt` and a `METADATA.pb` that names the licence. Every [font page on Fontwell](/fonts/) links to both.
- **Look for a Reserved Font Name** in the copyright line if you plan to modify and redistribute the font. Using it unmodified is unaffected.
- **Check script coverage**, not licence, if you are working in Korean, Japanese or Chinese. Only 38 families include a Korean subset, 68 Japanese and 10 Simplified Chinese (snapshot of 15 October 2026).
- **Keep your source.** Downloads from fonts.google.com or the google/fonts repository are the canonical copies. Third-party "free font" mirrors sometimes repackage files without the licence or rename families.

If you need a verdict for a specific family and use, the [licence checker](/tools/license-checker/) shows the answer with the clause it rests on.
