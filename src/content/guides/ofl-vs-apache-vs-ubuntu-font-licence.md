---
title: "OFL vs Apache 2.0 vs Ubuntu Font Licence: what's different?"
description: "The three open licences in Google Fonts compared use by use: resale, renaming, notices and modification. Based on the licence texts, with counts from the google/fonts repository."
question: "What is the difference between the OFL, Apache 2.0 and the Ubuntu Font Licence?"
answer: "All three let you use fonts commercially, embed them and modify them. The OFL bans selling the font by itself and protects Reserved Font Names; Apache 2.0 is a general software licence that asks you to keep notices and mark changes; the Ubuntu Font Licence adds strict renaming rules for modified versions."
published: 2026-10-16
updated: 2026-10-16
data_asof: "15 Oct 2026 (google/fonts repository)"
order: 11
related: ["what-is-the-sil-open-font-license", "can-i-use-google-fonts-commercially", "web-vs-desktop-font-licenses"]
sources:
  - title: "SIL Open Font License 1.1, official text"
    url: "https://openfontlicense.org/open-font-license-official-text/"
  - title: "Apache License 2.0"
    url: "https://www.apache.org/licenses/LICENSE-2.0"
  - title: "Ubuntu Font Licence 1.0"
    url: "https://canonical.com/legal/font-licence"
  - title: "Ubuntu Font Licence FAQ"
    url: "https://canonical.com/legal/font-licence/faq"
  - title: "google/fonts repository (ofl/, apache/, ufl/ folders)"
    url: "https://github.com/google/fonts"
faq:
  - q: "Which open font licence is the most permissive?"
    a: "For users, Apache 2.0 is the least restrictive because it has no ban on standalone sale and no font-specific naming rules. For typical design work the difference is irrelevant: all three allow commercial use, embedding and logos."
  - q: "Is Roboto under Apache or OFL?"
    a: "Roboto sits in the ofl/ folder of the google/fonts repository as of 15 October 2026, so its current files are distributed under the SIL Open Font License. Older Roboto releases were published under Apache 2.0."
  - q: "Can I combine fonts under different open licences in one product?"
    a: "Yes. Each font keeps its own licence; include each licence text and notice with the corresponding font files."
---

## The three licences in the library

Every Google Fonts family sits in a folder named after its licence in the [google/fonts](https://github.com/google/fonts) repository. On 15 October 2026 the 1,950 families in Google's metadata split as follows: 1,904 under the SIL Open Font License 1.1, 35 under Apache License 2.0 and 5 under the Ubuntu Font Licence 1.0 (Ubuntu, Ubuntu Mono, Ubuntu Sans, Ubuntu Sans Mono and Ubuntu Condensed). Six families could not be matched by name.

The Apache group consists mostly of fonts added in the library's early years, such as Roboto Slab, Permanent Marker, Special Elite, Rock Salt and Luckiest Guy.

## Side by side

| Question | OFL 1.1 | Apache 2.0 | UFL 1.0 |
|---|---|---|---|
| Commercial use, print, web, logos | Yes | Yes | Yes |
| Bundle in software you sell | Yes, with notice and licence | Yes, with licence and notices | Yes, with notice and licence |
| Sell the font file by itself | **No** (condition 1) | Not prohibited | Not prohibited ("with or without charging a redistribution fee") |
| Modify the font | Yes | Yes | Yes |
| Rename modified versions | Only if the original declares a Reserved Font Name | Not required; mark changed files | **Required** if substantially changed; append "derivative X" if lightly changed |
| Modified versions must keep the licence | Yes (condition 5) | Your own changes may be licensed differently | Yes |
| Documents made with the font affected | No (condition 5) | No | No |
| Explicit patent licence | No | Yes (section 3) | No |
| Trademark rights granted | No | No (section 6) | No |

## The OFL: built for fonts

The OFL was written specifically for fonts. Its two distinctive features are the ban on selling the font by itself and the Reserved Font Name mechanism. Its copyleft keeps the font free, while condition 5 makes sure documents are untouched. Read the clause-by-clause [OFL guide](/guides/what-is-the-sil-open-font-license/).

## Apache 2.0: a software licence used for fonts

Apache 2.0 is a general open-source software licence. Applied to fonts, it asks you to:

- give recipients a copy of the licence;
- keep copyright, patent, trademark and attribution notices from the source;
- ship the NOTICE file, if the font has one;
- state prominently in changed files that you changed them.

It also contains an express patent licence and a termination clause for patent litigation, which rarely matter for fonts but do for some corporate legal reviews. It does not prohibit selling copies, but section 6 grants no trademark rights in the font's name.

## The Ubuntu Font Licence: OFL-like, with naming rules

The UFL was written for the Ubuntu font family. Like the OFL, it lets you use, modify and redistribute the fonts, keeps documents outside its scope, and requires the licence and copyright notice in every copy. Its distinctive part is condition 2 on naming: a modified version that is substantially changed must not use the original name at all, while a lightly changed one must keep the original name and add "derivative" and a word of your choosing. It defines propagation as distribution "with or without charging a redistribution fee", so standalone sale is not prohibited as it is under the OFL.

## What this means in practice

For using fonts (websites, apps, print, logos, video) the three licences lead to the same answer: yes. The differences only matter when you redistribute or modify the font files themselves:

- **Shipping files in an app or self-hosting:** include the right licence text for each family.
- **Modifying a font:** check naming rules (OFL Reserved Font Names, UFL derivative naming) before choosing a name.
- **Building a font product:** OFL fonts cannot be sold on their own.

Fontwell's [licence checker](/tools/license-checker/) applies these rules to any of the 1,950 families, and every [family page](/fonts/) shows the full matrix. This comparison is a plain-English reading of the licence texts, not legal advice.
