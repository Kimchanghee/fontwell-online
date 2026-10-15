// Proofing desk: client-side filter over the static font index (no server, no Worker).
import { observe, specimensEnabled, setSpecimens } from './specimen';

type Row = [string, string, string, string, string, number, string, string, string, number, number];
interface Item { f: string; s: string; c: string; sub: string[]; w: number[]; i: boolean; ax: string; lic: string; ps: string; cur: boolean; rank: number; hay: string }

const LIC: Record<string, string> = { ofl: 'OFL 1.1', apache: 'Apache 2.0', ufl: 'UFL 1.0' };
const FALLBACK: Record<string, string> = { Serif: 'Georgia, serif', Monospace: 'ui-monospace, monospace', Handwriting: 'cursive' };
const SAMPLES: Record<string, string> = {
  Kore: '다람쥐 헌 쳇바퀴에 타고파', Jpan: 'いろはにほへと ちりぬるを', Hans: '天地玄黄 宇宙洪荒 永字八法', Hant: '天地玄黃 宇宙洪荒 永字八法',
  Arab: 'نص حكيم له سر قاطع', Hebr: 'דג סקרן שט בים מאוכזב', Deva: 'ऋषियों को सताने वाले', Thai: 'เป็นมนุษย์สุดประเสริฐ',
  Beng: 'আমার সোনার বাংলা', Taml: 'யாமறிந்த மொழிகளிலே', Grek: 'Ξεσκεπάζω την ψυχοφθόρα', Cyrl: 'Съешь же ещё этих мягких',
};
const LATIN = 'Handgloves & Quartz 1234';
const PAGE = 48;

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

export function initDesk() {
  const form = $<HTMLFormElement>('desk');
  if (!form) return;
  const rowsEl = $<HTMLOListElement>('rows');
  const countEl = $('count');
  const stateEl = $('state');
  const more = $<HTMLButtonElement>('more');
  const q = $<HTMLInputElement>('q'), cat = $<HTMLSelectElement>('cat'), script = $<HTMLSelectElement>('script');
  const lic = $<HTMLSelectElement>('lic'), minw = $<HTMLSelectElement>('minw'), sort = $<HTMLSelectElement>('sort');
  const vf = $<HTMLInputElement>('vf'), it = $<HTMLInputElement>('it');
  const sample = $<HTMLInputElement>('sample'), size = $<HTMLInputElement>('size'), sizeOut = $<HTMLOutputElement>('sizeOut');

  let items: Item[] | null = null;
  let loading: Promise<Item[] | null> | null = null;
  let current: Item[] = [];
  let shown = 0;
  let tracked = false;

  const custom = () => sample.value.trim();
  const textOf = (el: HTMLElement) => custom() || el.dataset.sample || LATIN;

  // specimens toggle (privacy: each specimen is a request to Google Fonts)
  const toggle = document.createElement('label');
  toggle.className = 'check';
  toggle.innerHTML = '<input type="checkbox" id="specs"> Load live specimens from Google Fonts';
  stateEl.before(toggle);
  const specs = toggle.querySelector('input')!;
  specs.checked = specimensEnabled();
  specs.addEventListener('change', () => { setSpecimens(specs.checked); if (specs.checked) rowsEl.querySelectorAll<HTMLElement>('.row').forEach(watch); else stateEl.textContent = 'Specimens off: rows show the fallback face. Nothing is requested from Google.'; });

  function watch(li: HTMLElement) {
    const spec = li.querySelector<HTMLElement>('.spec')!;
    observe(spec, li.dataset.family!, () => textOf(li));
  }
  rowsEl.querySelectorAll<HTMLElement>('.row').forEach(watch);

  async function load(): Promise<Item[] | null> {
    if (items) return items;
    loading ??= (async () => {
      stateEl.textContent = 'Loading the full index…';
      try {
        const res = await fetch('/data/fonts-index.json');
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { asOf: string; rows: Row[] };
        items = data.rows.map((r) => ({ f: r[0], s: r[1], c: r[2], sub: r[3] ? r[3].split(' ') : [], w: r[4] ? r[4].split(' ').map(Number) : [], i: !!r[5], ax: r[6], lic: r[7], ps: r[8], cur: !!r[9], rank: r[10], hay: (r[0]).toLowerCase() }));
        stateEl.textContent = `Index loaded · data as of ${data.asOf.slice(0, 10)}`;
        return items;
      } catch {
        stateEl.textContent = 'The full index could not be loaded. You are seeing the 48 most-used families; reload to try again.';
        stateEl.classList.add('stale');
        loading = null;
        return null;
      }
    })();
    return loading;
  }

  function rowEl(x: Item): HTMLLIElement {
    const li = document.createElement('li');
    li.className = 'row';
    li.dataset.family = x.f;
    li.dataset.sample = SAMPLES[x.ps] ?? LATIN;
    const no = document.createElement('span'); no.className = 'row-no mono'; no.setAttribute('aria-hidden', 'true'); no.textContent = String(x.rank).padStart(4, '0');
    const body = document.createElement('div'); body.className = 'row-body';
    const spec = document.createElement('p'); spec.className = 'spec'; spec.setAttribute('aria-hidden', 'true');
    spec.style.fontFamily = `'${x.f}', ${FALLBACK[x.c] ?? 'system-ui, sans-serif'}`;
    spec.textContent = textOf(li);
    const meta = document.createElement('p'); meta.className = 'row-meta mono';
    const a = document.createElement('a'); a.className = 'row-name'; a.textContent = x.f;
    a.href = x.cur ? `/fonts/${x.s}/` : `https://fonts.google.com/specimen/${x.f.replace(/ /g, '+')}`;
    const styles = x.w.length * (x.i ? 2 : 1);
    const bits = [x.c, x.lic ? LIC[x.lic] : 'licence unmatched', `${styles} style${styles === 1 ? '' : 's'}`];
    if (x.ax) bits.push('var: ' + x.ax.split(' ').map((s) => s.split(':')[0]).join(' '));
    bits.push(`${x.sub.length} subset${x.sub.length === 1 ? '' : 's'}`);
    meta.append(a);
    bits.forEach((b, i) => { const s = document.createElement('span'); s.textContent = b; if (i === 1) s.className = x.lic ? 'lic' : 'lic lic-unknown'; meta.append(s); });
    body.append(spec, meta);
    li.append(no, body);
    return li;
  }

  function render(reset: boolean) {
    if (reset) { rowsEl.textContent = ''; shown = 0; }
    const next = current.slice(shown, shown + PAGE);
    const frag = document.createDocumentFragment();
    for (const x of next) { const li = rowEl(x); frag.append(li); }
    rowsEl.append(frag);
    rowsEl.querySelectorAll<HTMLElement>('.row').forEach((li, i) => { if (i >= shown) watch(li); });
    shown += next.length;
    more.hidden = shown >= current.length;
    more.textContent = `Show ${Math.min(PAGE, current.length - shown)} more`;
    if (!current.length) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.innerHTML = '<p>No family matches every filter. Loosen one of them, or <button type="button" class="ghost" id="clear">clear all filters</button>.</p>';
      rowsEl.append(li);
      li.querySelector('#clear')!.addEventListener('click', () => { form.reset(); sizeOut.textContent = size.value; apply(); });
    }
    countEl.textContent = current.length ? `${current.length.toLocaleString('en-US')} famil${current.length === 1 ? 'y' : 'ies'} match · showing ${shown}` : '0 families match';
  }

  function syncUrl() {
    const p = new URLSearchParams();
    if (q.value.trim()) p.set('q', q.value.trim());
    for (const [k, el] of [['cat', cat], ['script', script], ['lic', lic], ['minw', minw]] as const) if (el.value && el.value !== '0') p.set(k, el.value);
    if (sort.value !== 'pop') p.set('sort', sort.value);
    if (vf.checked) p.set('vf', '1');
    if (it.checked) p.set('it', '1');
    const s = p.toString();
    history.replaceState(null, '', s ? `?${s}` : location.pathname);
  }

  async function apply() {
    const all = await load();
    if (!all) return;
    const term = q.value.trim().toLowerCase();
    const mw = Number(minw.value);
    current = all.filter((x) =>
      (!term || x.hay.includes(term)) && (!cat.value || x.c === cat.value) && (!script.value || x.sub.includes(script.value)) &&
      (!lic.value || x.lic === lic.value) && (!vf.checked || !!x.ax) && (!it.checked || x.i) &&
      (!mw || x.w.length >= mw || /wght:(\d+)-(\d+)/.test(x.ax) && wghtSpan(x.ax) >= (mw - 1) * 100));
    const s = sort.value;
    if (s === 'name') current.sort((a, b) => a.f.localeCompare(b.f));
    else if (s === 'new' || s === 'trend') current = await sortExtra(current, s);
    render(true);
    syncUrl();
    if (!tracked) { tracked = true; (window as any).fwTrack?.('tool_used', { tool: 'desk' }); }
  }

  // trending/newest need fields not in the compact index; fetch them lazily from the same file order
  let extra: Map<string, { t: number; da: string }> | null = null;
  async function sortExtra(list: Item[], s: string) {
    if (!extra) {
      try {
        const r = await fetch('/data/fonts-extra.json');
        const d = (await r.json()) as { rows: [string, number, string][] };
        extra = new Map(d.rows.map((x) => [x[0], { t: x[1], da: x[2] }]));
      } catch { stateEl.textContent = 'Sort data unavailable; showing most-used order.'; return list; }
    }
    const e = extra;
    return [...list].sort((a, b) => s === 'trend' ? (e.get(a.s)?.t ?? 1e9) - (e.get(b.s)?.t ?? 1e9) : (e.get(b.s)?.da ?? '').localeCompare(e.get(a.s)?.da ?? ''));
  }

  function wghtSpan(ax: string) { const m = ax.match(/wght:(\d+)-(\d+)/); return m ? Number(m[2]) - Number(m[1]) : 0; }

  let t: number | undefined;
  const debounced = () => { clearTimeout(t); t = window.setTimeout(apply, 180); };
  q.addEventListener('input', debounced);
  for (const el of [cat, script, lic, minw, sort, vf, it]) el.addEventListener('change', apply);
  more.addEventListener('click', () => render(false));

  let st: number | undefined;
  sample.addEventListener('input', () => {
    rowsEl.querySelectorAll<HTMLElement>('.row').forEach((li) => { li.querySelector('.spec')!.textContent = textOf(li); });
    clearTimeout(st);
    st = window.setTimeout(() => rowsEl.querySelectorAll<HTMLElement>('.row').forEach(watch), 450);
  });
  size.addEventListener('input', () => { rowsEl.style.setProperty('--spec', size.value + 'px'); sizeOut.textContent = size.value; });

  // restore state from URL
  const p = new URLSearchParams(location.search);
  if ([...p.keys()].length) {
    q.value = p.get('q') ?? ''; cat.value = p.get('cat') ?? ''; script.value = p.get('script') ?? ''; lic.value = p.get('lic') ?? '';
    minw.value = p.get('minw') ?? '0'; sort.value = p.get('sort') ?? 'pop'; vf.checked = p.get('vf') === '1'; it.checked = p.get('it') === '1';
    apply();
  }
}
