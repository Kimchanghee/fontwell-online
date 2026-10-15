// Static (non-generated) pages and the date their content last really changed.
// Used by the sitemaps; keep dates honest — bump only when the page text changes.
export const RELEASE = '2026-10-16';
export const STATIC_PAGES: { path: string; updated: string | 'data' }[] = [
  { path: '/', updated: 'data' },
  { path: '/fonts/', updated: 'data' },
  { path: '/tools/', updated: RELEASE },
  { path: '/tools/license-checker/', updated: RELEASE },
  { path: '/tools/pairing/', updated: 'data' },
  { path: '/tools/type-scale/', updated: RELEASE },
  { path: '/guides/', updated: RELEASE },
  { path: '/about/', updated: RELEASE },
  { path: '/methodology/', updated: 'data' },
  { path: '/contact/', updated: RELEASE },
  { path: '/privacy/', updated: RELEASE },
  { path: '/terms/', updated: RELEASE },
  { path: '/disclaimer/', updated: RELEASE },
];
