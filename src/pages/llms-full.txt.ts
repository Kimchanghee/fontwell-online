import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../site.config';
import { stats, asOfHuman } from '../lib/data';

// Full-text companion to /llms.txt: every guide body, generated from the same sources the guide pages render.
export const GET: APIRoute = async () => {
  const st = stats();
  const guides = (await getCollection('guides')).sort((a, b) => a.data.order - b.data.order);
  const text = guides
    .map((g) => `## ${g.data.question}\nURL: ${site.url}/guides/${g.id}/\nUpdated: ${g.data.updated.toISOString().slice(0, 10)}\nData as of: ${g.data.data_asof}\n\nAnswer: ${g.data.answer}\n\n${(g.body ?? '').trim()}\n\nSources: ${g.data.sources.map((s) => s.url).join(', ')}`)
    .join('\n\n');
  const body = `# ${site.name} — full text\n\n> ${site.description}\n\nFontwell indexes ${st.total} Google Fonts families (snapshot ${asOfHuman}): ${st.lic.ofl} under SIL OFL 1.1, ${st.lic.apache} under Apache 2.0, ${st.lic.ufl} under the Ubuntu Font Licence 1.0, ${st.lic.none} unmatched. Licence verdicts are plain-English readings of the licence text, not legal advice. Method: ${site.url}/methodology/\n\n# Guides\n\n${text}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
