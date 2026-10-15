// Lazy specimen loader: requests a tiny Google Fonts CSS file (text= subset) only for rows in view.
// Rows keep a fixed height, so swapping the font never shifts layout.
import { cssApiUrl } from '../lib/core.mjs';

const loaded = new Set<string>();
let enabled = true;
try { enabled = localStorage.getItem('fw-specimens') !== 'off'; } catch { /* storage blocked */ }

export function specimensEnabled() { return enabled; }
export function setSpecimens(on: boolean) {
  enabled = on;
  try { localStorage.setItem('fw-specimens', on ? 'on' : 'off'); } catch { /* ignore */ }
}

export function loadFace(family: string, text: string, weights: number[] = []) {
  if (!enabled) return;
  const chars = [...new Set([...text])].sort().join('').slice(0, 200);
  const url = cssApiUrl(family, { text: chars, weights });
  if (loaded.has(url)) return;
  loaded.add(url);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.dataset.family = family;
  document.head.appendChild(link);
}

let io: IntersectionObserver | null = null;
const textFor = new WeakMap<Element, () => string>();

export function observe(el: HTMLElement, family: string, getText: () => string) {
  textFor.set(el, getText);
  if (!('IntersectionObserver' in window)) { loadFace(family, getText()); return; }
  io ??= new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const t = e.target as HTMLElement;
      const fam = t.dataset.family!;
      loadFace(fam, textFor.get(t)?.() ?? '');
      io!.unobserve(t);
    }
  }, { rootMargin: '300px 0px' });
  el.dataset.family = family;
  io.observe(el);
}
