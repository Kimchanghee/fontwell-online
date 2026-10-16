---
title: "What is the SIL Open Font License? OFL 1.1 in plain English"
description: "The SIL Open Font License 1.1 explained clause by clause: what it permits, its five conditions, Reserved Font Names, and why documents made with it stay yours."
question: "What is the SIL Open Font License?"
answer: "The SIL Open Font License (OFL) 1.1 is a free licence for fonts published by SIL International in 2007. It lets anyone use, modify, embed and redistribute a font, including commercially, on five conditions; the best known is that the font may not be sold by itself."
published: 2026-10-16
updated: 2026-10-16
data_asof: "16 Oct 2026"
order: 2
related: ["can-i-use-google-fonts-commercially", "ofl-vs-apache-vs-ubuntu-font-licence", "can-i-use-a-free-font-in-a-logo"]
sources:
  - title: "SIL Open Font License 1.1, official text"
    url: "https://openfontlicense.org/open-font-license-official-text/"
  - title: "OFL FAQ (openfontlicense.org)"
    url: "https://openfontlicense.org/ofl-faq/"
  - title: "google/fonts repository: ofl/ folder"
    url: "https://github.com/google/fonts/tree/main/ofl"
faq:
  - q: "Is the OFL a copyleft licence?"
    a: "Partly. The font and any modified version of it must stay under the OFL, which is a copyleft-style requirement. Documents, images, websites and products you create with the font are explicitly outside that requirement."
  - q: "Do I have to publish the source if I modify an OFL font?"
    a: "The OFL does not require you to publish source files. It requires modified versions to remain under the OFL, to carry the copyright notice and licence, and not to use any Reserved Font Name."
  - q: "What happens if I break an OFL condition?"
    a: "The licence text says it becomes null and void if any of the conditions are not met, so you would lose the permissions it grants for that font."
---

## Where the OFL comes from

SIL International, a non-profit known for its work on minority-language scripts, published version 1.1 of the Open Font License in February 2007 (version 1.0 appeared in 2005). It was written because general software licences fit fonts awkwardly: a font is software, but most of what people do with it is produce documents, and nobody wanted a licence that might reach into the documents themselves.

The OFL is now the default licence of open typography. In the google/fonts repository it covers 1,904 of the 1,950 families in Google's metadata as of 15 October 2026, which is why understanding it answers most "can I use this free font?" questions. The official text and FAQ live at [openfontlicense.org](https://openfontlicense.org/).

## What the OFL permits

The permission paragraph is broad. Anyone who obtains a copy of the font may "use, study, copy, merge, embed, modify, redistribute, and sell modified and unmodified copies of the Font Software", subject to five conditions. Note that "sell" appears in the grant: you can sell copies of the font as part of something larger, which condition 1 then narrows.

There is no fee, no registration and no restriction by field of use. Commercial, governmental and personal use are treated identically.

## The five conditions, one by one

**1. No selling the font by itself.** "Neither the Font Software nor any of its individual components, in Original or Modified Versions, may be sold by itself." A font bundle, a font marketplace listing or a paid download of the font file are out. Selling software, templates or products that include the font is allowed.

**2. Keep the notice and licence with every copy.** Fonts may be bundled, redistributed and sold with any software, provided each copy contains the copyright notice and the licence. These may be stand-alone text files, human-readable headers, or machine-readable metadata fields inside the font file "as long as those fields can be easily viewed by the user". This is why a web font with intact metadata is compliant without a separate text file.

**3. Reserved Font Names stay with the original.** A copyright holder may declare one or more Reserved Font Names in the copyright line. No modified version may use them without explicit written permission. The restriction applies to the primary font name presented to users.

**4. Do not use the authors' names to promote your version.** The names of the copyright holders and authors may not be used to promote, endorse or advertise a modified version, except to acknowledge their contribution or with their written permission.

**5. The font stays under the OFL; your documents do not.** The font software, modified or not, must be distributed entirely under the OFL and not under any other licence. Then the crucial sentence: "The requirement for fonts to remain under this license does not apply to any document created using the Font Software."

## Why condition 5 matters most for designers

Condition 5 is the firewall between the font and everything you make with it. A website, an app interface, a logo, a book, a video: these are documents created using the font, so they can carry any licence you like, including fully proprietary terms. The OFL's copyleft only follows the font file.

The OFL FAQ adds a nuance for embedding: when a document includes the font itself (a PDF with embedded fonts, a web page serving the font file), the document is fine, but the embedded font remains under the OFL. That is consistent with condition 2: the font carries its licence with it.

## Reserved Font Names and modification in practice

If you only use an OFL font, Reserved Font Names never matter. They matter when you change the font and distribute the result: adding glyphs, adjusting spacing, or producing a derivative family. Then:

- check the copyright line in the font (or the family's `METADATA.pb` and `OFL.txt` in google/fonts) for "with Reserved Font Name …";
- if a name is reserved, give your version a different name, or get written permission;
- keep your version under the OFL, with the original copyright notice plus your own.

The OFL FAQ discusses whether converting or subsetting a font for the web creates a modified version, and recommends that authors who reserve names grant permission for such technical changes. If you self-host a subset of a font that declares a Reserved Font Name, read that part of the FAQ and the font's copyright line before shipping.

## What the OFL does not cover

- **Trademarks.** The OFL is a copyright licence. It neither grants nor removes trademark rights, including any trademark in the font's name.
- **Exclusivity.** Nobody can get exclusive rights to an OFL font, so a logo set in one is not unique to you. See [using free fonts in logos](/guides/can-i-use-a-free-font-in-a-logo/).
- **Warranty.** Like most open licences, the OFL disclaims all warranties.

## How to check a specific family

Every family page on Fontwell, such as [Inter](/fonts/inter/) or [Noto Sans KR](/fonts/noto-sans-kr/), shows an eight-use licence matrix with the clause behind each verdict, and links to the family's own `OFL.txt` in google/fonts. For a quick answer about one use, the [licence checker](/tools/license-checker/) does the same lookup for all 1,950 families.
