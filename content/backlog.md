# Question inventory and backlog

Baseline 2026-10-16. Existing guides are built locally, not deployed by this task. All traffic and query-demand metrics are unmeasured.

## Existing question inventory
- can-i-use-a-free-font-in-a-logo: "Can I use a free font in a logo?" | /guides/can-i-use-a-free-font-in-a-logo/ | local-built
- can-i-use-google-fonts-commercially: "Can I use Google Fonts commercially?" | /guides/can-i-use-google-fonts-commercially/ | local-built
- font-display-and-layout-shift: "How do I stop web fonts from causing layout shift?" | /guides/font-display-and-layout-shift/ | local-built
- how-to-choose-a-ui-font: "How do I choose a font for a user interface?" | /guides/how-to-choose-a-ui-font/ | local-built
- how-to-pair-fonts: "How do you pair two fonts?" | /guides/how-to-pair-fonts/ | local-built
- ofl-vs-apache-vs-ubuntu-font-licence: "What is the difference between the OFL, Apache 2.0 and the Ubuntu Font Licence?" | /guides/ofl-vs-apache-vs-ubuntu-font-licence/ | local-built
- self-hosting-google-fonts-gdpr: "Should I self-host Google Fonts for GDPR?" | /guides/self-hosting-google-fonts-gdpr/ | local-built
- subset-korean-cjk-web-fonts: "How do I make Korean or CJK web fonts load fast?" | /guides/subset-korean-cjk-web-fonts/ | local-built
- variable-fonts-explained: "What is a variable font?" | /guides/variable-fonts-explained/ | local-built
- web-vs-desktop-font-licenses: "What is the difference between a web font licence and a desktop font licence?" | /guides/web-vs-desktop-font-licenses/ | local-built
- what-is-the-sil-open-font-license: "What is the SIL Open Font License?" | /guides/what-is-the-sil-open-font-license/ | local-built

## Backlog, editorial hypotheses only
- How do I audit fallback metrics before swapping fonts? Sources: CSS Fonts specification and reproducible before/after measurement; extend layout-shift guide if duplicate.
- Which font files must accompany an app redistribution? Sources: exact OFL/Apache/Ubuntu licence text; link licence checker and current OFL guide.
- How can I verify a font supports a specific writing system? Sources: Google Fonts subset metadata and specimen testing; link CJK guide and font detail pages.
- How should I document a modified OFL font with a reserved name? Sources: SIL FAQ and exact upstream licence; merge into current OFL guide if intent overlaps.

Prioritize observed GSC queries and user questions after launch over these unmeasured hypotheses. Each new item needs question, answer, dated primary evidence, three subquestions and hub + related links. Re-run gate and source review; no bulk automatic publication. Review at deployment +14 days.
