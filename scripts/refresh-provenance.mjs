// Pure provenance guards. These checks are not proof of repository authenticity;
// the parent validator still owns trusted source/cache and publication checks.
const REPO = 'https://github.com/google/fonts';
const LICENSES = { ofl: 'OFL', apache: 'APACHE2', ufl: 'UFL' };
const requireThat = (yes, message) => { if (!yes) throw new Error('FONT provenance: ' + message); };
export function metadataUrls(commit, dir) {
  requireThat(typeof commit === 'string' && /^[a-f0-9]{40}$/.test(commit), 'immutable commit required');
  requireThat(typeof dir === 'string' && /^(ofl|apache|ufl)\/[a-z0-9]+$/.test(dir), 'exact license directory required');
  return {
    raw: `https://raw.githubusercontent.com/google/fonts/${commit}/${dir}/METADATA.pb`,
    page: `${REPO}/blob/${commit}/${dir}/METADATA.pb`,
  };
}
export function preserveLicense(previous, observedLicense, normalizedName) {
  requireThat(observedLicense === null || Object.hasOwn(LICENSES, observedLicense), 'unknown repository license class');
  const oldLicense = previous?.lic ?? null;
  requireThat(oldLicense === observedLicense, 'new or changed license needs separate trusted review');
  if (oldLicense === null) return { lic: null, dir: null };
  const dir = `${oldLicense}/${normalizedName}`;
  requireThat(previous.dir === dir, 'license directory changed');
  return { lic: oldLicense, dir };
}
export function parseMetadata(pb) {
  requireThat(typeof pb === 'string' && pb.length > 0, 'empty METADATA.pb');
  const get = re => (pb.match(re) || [])[1] || null;
  return {
    license: get(/^license:\s*"([^"]+)"/m),
    copyright: get(/copyright:\s*"((?:[^"\\]|\\.)*)"/),
    repo: get(/repository_url:\s*"([^"]+)"/),
  };
}
export function mergeDetails({ commit, curated, previous, results }) {
  requireThat(Array.isArray(curated) && Array.isArray(results), 'curated/results arrays required');
  const families = new Map(curated.map(f => [f.f, f]));
  requireThat(families.size === curated.length && results.length === curated.length, 'incomplete or duplicate detail batch');
  const items = Object.create(null);
  for (const result of results) {
    const family = families.get(result.family);
    requireThat(family && !Object.hasOwn(items, result.family), 'unexpected or duplicate family');
    requireThat(result.commit === commit && result.dir === family.dir, 'mixed detail provenance');
    const urls = metadataUrls(commit, family.dir);
    requireThat(result.rawUrl === urls.raw && result.metadataUrl === urls.page, 'detail URL does not pin observed commit');
    const item = parseMetadata(result.pb), prior = previous?.items?.[family.f];
    requireThat(item.license === null || item.license === LICENSES[family.lic], 'detail/folder license mismatch');
    requireThat(item.license === null || prior?.license === item.license, 'new or promoted detail license needs separate trusted review');
    items[family.f] = { ...item, metadataUrl: urls.page };
  }
  // Never substitute any prior detail bytes, even on a same-commit failure.
  // A complete freshly fetched batch is necessary before any data-file write.
  return items;
}
