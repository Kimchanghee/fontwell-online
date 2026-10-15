import { site } from '../site.config';

export const abs = (path: string) => new URL(path, site.url).href;

/** Pick the first candidate whose length is within [min,max]; otherwise trim/pad the best one. */
export function fit(cands: string[], min: number, max: number): string {
  for (const c of cands) if (c.length >= min && c.length <= max) return c;
  const longest = [...cands].sort((a, b) => b.length - a.length)[0];
  if (longest.length > max) {
    const cut = longest.slice(0, max - 1);
    return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s]+$/, '') + '…';
  }
  return longest;
}
export const fitTitle = (c: string[]) => fit(c, 50, 60);
export const fitDesc = (c: string[]) => fit(c, 150, 160);

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

export function orgLd() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    url: site.url + '/',
    email: site.contactEmail,
    description: site.description,
    logo: { '@type': 'ImageObject', url: abs('/og/logo.png'), width: 512, height: 512 },
  };
}
export function websiteLd() {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, name: site.name, url: site.url + '/', publisher: { '@id': ORG_ID }, inLanguage: 'en' };
}
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}
export function faqLd(faq: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
  };
}
