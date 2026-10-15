---
title: "Can I use a free font in a logo? OFL, Apache and trademarks"
description: "Open-licensed fonts can be used in logos, but you cannot stop others using the same font. What the OFL says, how trademark protection works, and how to make a mark your own."
question: "Can I use a free font in a logo?"
answer: "Yes, if the font is under an open licence such as the OFL, Apache 2.0 or the Ubuntu Font Licence. A logo is a document made with the font, which these licences do not restrict. What you cannot get is exclusivity: anyone else may use the same font."
published: 2026-10-16
updated: 2026-10-16
data_asof: "16 Oct 2026"
order: 3
related: ["what-is-the-sil-open-font-license", "can-i-use-google-fonts-commercially", "web-vs-desktop-font-licenses"]
sources:
  - title: "SIL Open Font License 1.1, condition 5"
    url: "https://openfontlicense.org/open-font-license-official-text/"
  - title: "OFL FAQ (openfontlicense.org)"
    url: "https://openfontlicense.org/ofl-faq/"
  - title: "Google Fonts FAQ"
    url: "https://developers.google.com/fonts/faq"
  - title: "Apache License 2.0, section 6 (trademarks)"
    url: "https://www.apache.org/licenses/LICENSE-2.0"
  - title: "USPTO: Trademark basics"
    url: "https://www.uspto.gov/trademarks/basics"
faq:
  - q: "Can I trademark a logo made with an OFL font?"
    a: "The font licence does not stop you from applying, because the logo is your document. Whether a mark is registrable depends on trademark law, and plain words set in an off-the-shelf font are usually weaker marks than distinctive designs."
  - q: "Do I need to credit the font designer in my logo?"
    a: "No. None of the open licences used by Google Fonts requires attribution in work you create with the font. Crediting the designer is a courtesy, not an obligation."
  - q: "Can I modify letters from an OFL font for my logo?"
    a: "Yes. Outlining the text and reshaping it produces artwork, not a new font. The OFL's naming and redistribution rules only apply if you distribute a modified font file."
---

## The licence answer: a logo is a document

The SIL Open Font License, which covers 1,904 of the 1,950 Google Fonts families (snapshot 15 October 2026), separates the font from what you make with it. Condition 5 says the requirement to stay under the OFL "does not apply to any document created using the Font Software". A logo, wordmark, letterhead or sign is such a document. You can use it commercially, register it, sell products bearing it and license it to others without the OFL following it.

Apache 2.0 and the Ubuntu Font Licence reach the same result by a different route: their conditions apply to redistributing the font itself, and a logo does not redistribute the font. Google's FAQ also confirms that its fonts may be used commercially in print and digital products.

So the licence question has a short answer. The harder questions are about distinctiveness and trademarks.

## What you cannot get: exclusivity

An open licence is open to everyone. If your logo is the word "Northwind" set in Montserrat Bold, the next company can set "Northwind" in Montserrat Bold too, at least as far as the font licence is concerned. Whether they may do that in a market where you operate is a trademark question, not a font one.

That has design consequences:

- **Plain type is a weak identity.** A wordmark in one of the twenty most-used families on the web will look like many other things. Montserrat, Poppins and Inter are each among the most-used families in Google's own popularity order.
- **Customisation is allowed.** Converting the text to outlines and adjusting letterforms (a custom ligature, a cut terminal, altered spacing) makes the artwork yours. This is editing a document, not modifying the font software.
- **Pair the wordmark with a symbol** if you want stronger distinctiveness.

## How trademark law fits in

Trademark protection attaches to how a mark identifies the source of goods or services, not to the font. In the United States, the USPTO explains that a trademark can be a word, phrase, symbol or design, or a combination. Rights can arise from use in commerce, and registration strengthens them. Similar systems exist elsewhere.

Three points connect this to fonts:

1. **The font licence does not grant trademark rights.** Apache 2.0 section 6 says so explicitly for the licensor's marks, and the OFL is a copyright licence that is silent on trademarks.
2. **Using an open font does not block registration.** Your registration covers your mark (the word and its overall look) for your goods and services. It does not give you rights over the font.
3. **A distinctive design is easier to protect** than standard characters in a common typeface. If registration matters, take advice from a trademark professional in your jurisdiction.

## When the font file itself is involved

A logo is usually delivered as artwork (SVG, PDF, PNG). Problems only appear if you start distributing the font:

- Sending the font files to a printer or agency is redistribution: keep the licence with the files.
- If you modify the font (not just outlined artwork) and give the modified file to others, OFL conditions 3 to 5 apply: keep it under the OFL and avoid any Reserved Font Name.
- Do not sell the font, even renamed, as part of a "brand kit" priced for the font. Selling the brand kit's artwork and guidelines is fine.

## A short checklist for logo projects

- Confirm the licence of the exact family on its [Fontwell page](/fonts/) or with the [licence checker](/tools/license-checker/) (choose "Set a logo or wordmark in it").
- Download from fonts.google.com or github.com/google/fonts, not a mirror, so you know which version and licence you have.
- Outline the final wordmark in the artwork files you hand over.
- Record the font name, version and licence in the brand guidelines, so future designers can set supporting text in the same family.
- If exclusivity matters, plan for custom lettering or a commissioned typeface rather than an open one.

For a broader look at what different licence models allow, read [web vs desktop font licences](/guides/web-vs-desktop-font-licenses/).
