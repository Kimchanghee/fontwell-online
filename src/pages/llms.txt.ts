import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../site.config';
import { stats, fontsData, asOfHuman, curated } from '../lib/data';

export const GET: APIRoute = async () => {
  const st = stats();
  const guides = (await getCollection('guides')).sort((a, b) => a.data.order - b.data.order);
  const body = `# ${site.name}

> ${site.description}

Fontwell indexes all ${st.total} families in the Google Fonts library (snapshot ${asOfHuman}) and the licence folder each sits in on github.com/google/fonts: ${st.lic.ofl} under the SIL Open Font License 1.1, ${st.lic.apache} under Apache 2.0, ${st.lic.ufl} under the Ubuntu Font Licence 1.0, ${st.lic.none} unmatched. Licence verdicts are plain-English readings of the licence text with the clause cited; they are not legal advice. Data refreshes from official sources only; every page shows its as-of date.

## Tools
- [Proofing desk (search and filter all families)](${site.url}/): category, script/subset, licence, weights, variable axes
- [Licence checker](${site.url}/tools/license-checker/): family + use (logo, app, merch, resale, modification) -> verdict with clause
- [Pairing tester](${site.url}/tools/pairing/): heading/body pairs scored from Google Fonts metadata
- [Type-scale generator](${site.url}/tools/type-scale/): modular scale and fluid clamp() values

## Guides
${guides.map((g) => `- [${g.data.question}](${site.url}/guides/${g.id}/): ${g.data.answer}`).join('\n')}

## Font licence pages
- [Index of ${curated.length} most-used families](${site.url}/fonts/): one page per family with licence matrix, coverage, pairings and CSS

## Reference
- [Methodology and data sources](${site.url}/methodology/)
- [About Fontwell](${site.url}/about/)
- [Machine-readable index (JSON)](${site.url}/data/fonts-index.json): data as of ${fontsData.asOf}
- Contact: ${site.contactEmail}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
