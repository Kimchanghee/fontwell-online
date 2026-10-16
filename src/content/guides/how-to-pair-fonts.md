---
title: "How to pair fonts: a repeatable method for heading and body"
description: "A practical font-pairing method: start from body text, contrast one property, match script coverage and proportions, then test at real sizes. Worked examples."
question: "How do you pair two fonts?"
answer: "Choose the body font first for reading comfort and script coverage, then pick a heading font that contrasts in one clear way (classification, weight or width) while sharing proportions such as x-height and line spacing. Test the pair at real sizes with real text before committing."
published: 2026-10-16
updated: 2026-10-16
data_asof: "15 Oct 2026 (Google Fonts metadata)"
order: 8
related: ["how-to-choose-a-ui-font", "variable-fonts-explained", "font-display-and-layout-shift"]
sources:
  - title: "Google Fonts Knowledge: Choosing type"
    url: "https://fonts.google.com/knowledge/choosing_type"
  - title: "Google Fonts family metadata (categories, metrics, subsets)"
    url: "https://fonts.google.com/metadata/fonts"
  - title: "MDN: font-size-adjust"
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust"
  - title: "W3C CSS Fonts Module Level 4"
    url: "https://www.w3.org/TR/css-fonts-4/"
faq:
  - q: "How many fonts should a website use?"
    a: "Two families cover most sites: one for headings and one for body text. Many good sites use a single family in several weights. A third family, such as a monospace for code, should have a distinct job."
  - q: "Can I pair two sans serifs?"
    a: "Yes, if they differ clearly, for example a geometric heading face over a humanist body face, or a condensed heading over a normal-width body. Two similar sans serifs usually look like a mistake."
  - q: "Is a serif heading with a sans body still a good pairing?"
    a: "It remains the most dependable contrast because the two classifications differ in construction while doing different jobs. The pairing works best when both share a similar x-height and the serif is not too delicate at heading sizes."
---

## Start with the body, not the headline

Readers spend most of their time in body text, so it decides more than any display face. Pick it on four criteria:

1. **Script coverage.** If any page needs Cyrillic, Greek, Vietnamese or Korean, the body font must cover it. Of the 1,950 families in the Google Fonts library (snapshot of 15 October 2026), 1,829 include Latin, 294 Cyrillic, 118 Greek, 520 Vietnamese and 38 Korean.
2. **Weights.** You need at least a regular and a bold, ideally with italics. Variable fonts with a `wght` range spanning 400 to 700 qualify.
3. **Comfort at 16 to 20 px.** Open apertures, a moderate x-height and even texture matter more than personality.
4. **Rendering on your audience's screens.** Test on a low-density Windows display as well as a high-density phone.

## Then contrast one thing, clearly

A pair works when the difference is obvious and deliberate. Pick one axis of contrast and keep the rest similar:

| Contrast | Example pairing | Why it works |
|---|---|---|
| Classification | Playfair Display headings over Source Sans 3 | Serif vs sans signals "title" vs "text" instantly |
| Weight | Inter 800 headings over Inter 400 | Same skeleton, strong hierarchy, one download |
| Width | Oswald (condensed) over Lato | Narrow headings fit long titles in short lines |
| Construction | Montserrat (geometric) over Merriweather (serif text) | Different builds, both robust on screen |

Avoid contrasting two things at once in opposite directions (for example a light condensed serif over a heavy wide sans). The eye reads that as disorder rather than hierarchy.

## Match proportions

Even contrasting fonts should share rhythm:

- **x-height:** if one face has a much smaller x-height, it looks smaller at the same font size. CSS `font-size-adjust` can normalise this for fallbacks.
- **Line spacing:** Google's metadata publishes a default line-height for each family's regular style. Faces with similar values sit comfortably in mixed blocks such as cards and teasers.
- **Mood:** a playful handwriting heading over a strict technical body text may be the point, but decide that on purpose.

## How Fontwell computes pairings

Every [family page](/fonts/) suggests three body partners. The score is computed only from Google's metadata, not taste:

- the body face must be serif, sans serif or monospace and offer a usable weight range (400 and 700, or a `wght` axis spanning both);
- both fonts must share the Latin subset, or the same primary script;
- different classifications score higher; display and handwriting headings get a bonus because they need a calm partner;
- shared subsets add points, and large differences in the published width and line-height metrics subtract them;
- established families get a small bonus because they are better tested.

The [methodology page](/methodology/#pairing) has the formula. Treat suggestions as a shortlist to proof, not an answer.

## Proof the pair at real sizes

Thumbnails flatter everything. Before committing:

1. Set a real heading (long and short), a paragraph of real copy, a caption and a button label.
2. View at 390 px and at desktop width.
3. Check numerals in both faces if you show prices or data.
4. Check italics and bold in the body face, in running text.
5. Look at it in a mixed language if your audience reads one.

The [pairing tester](/tools/pairing/) does this with any two of the 1,950 families, and links straight to each family's licence page.

## Common mistakes

- **Two decorative faces.** One personality per pair.
- **Display faces at body size.** Fonts designed for 48 px often fall apart at 16 px.
- **Ignoring the fallback.** While web fonts load, your pair renders in system fonts; choose fallbacks with similar width to reduce reflow (see [font-display and layout shift](/guides/font-display-and-layout-shift/)).
- **Too many weights.** Each static weight is a download. Two or three per family is plenty; variable fonts relax this.
