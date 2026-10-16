// Usage: node shots.cjs <baseUrl> <outDir> <path1> <path2> ...
const { chromium } = require('D:/웹 수익 자동화/rebuild-202610/_qa-tools/node_modules/playwright');
const fs = require('fs'); const path = require('path');
const [base, out, ...paths] = process.argv.slice(2);
const launchOptions = process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : { channel: 'msedge' };
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch(launchOptions);
  const report = [];
  for (const w of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, deviceScaleFactor: 1, isMobile: w === 390, hasTouch: w === 390 });
    await ctx.addInitScript(() => {
      window.__cls = 0; window.__shifts = [];
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__cls += e.value; window.__shifts.push({ v: e.value, src: (e.sources || []).map((s) => s.node && s.node.nodeName + '.' + (s.node.className || '')).join(',') }); } }).observe({ type: 'layout-shift', buffered: true });
    });
    for (const p of paths) {
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      const resp = await page.goto(base + p, { waitUntil: 'networkidle', timeout: 45000 }).catch((e) => { errors.push(String(e)); return null; });
      await page.waitForTimeout(800);
      // scroll through to trigger lazy content, then back
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(500);
      const m = await page.evaluate(() => {
        const de = document.documentElement;
        const wide = [...document.querySelectorAll('body *')].filter((el) => { const r = el.getBoundingClientRect(); return r.right > de.clientWidth + 1 && getComputedStyle(el).position !== 'fixed'; }).slice(0, 5).map((el) => el.tagName + '.' + el.className);
        const small = [...document.querySelectorAll('a, button, input, select, textarea, summary')].filter((el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && r.height < 24 && !el.closest('p, li p, td, .prose, article p'); }).length;
        return { scrollW: de.scrollWidth, clientW: de.clientWidth, overflow: de.scrollWidth > de.clientWidth, wide, cls: +window.__cls.toFixed(4), shifts: window.__shifts.slice(0, 4), smallTargets: small, h: document.body.scrollHeight };
      });
      // keyboard focus visibility: tab 3 times, check outline/box-shadow on active element
      const focus = [];
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Tab');
        focus.push(await page.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return 'body'; const cs = getComputedStyle(a); return `${a.tagName}${a.className ? '.' + String(a.className).split(' ')[0] : ''}:${cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0 ? 'outline ' + cs.outlineWidth : cs.boxShadow !== 'none' ? 'shadow' : 'NONE'}`; }));
      }
      const slug = (p.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home') + '-' + w;
      await page.screenshot({ path: path.join(out, slug + '-focus.png') });
      await page.keyboard.press('Escape'); await page.evaluate(() => document.activeElement && document.activeElement.blur());
      await page.screenshot({ path: path.join(out, slug + '.png'), fullPage: true });
      report.push({ path: p, width: w, status: resp ? resp.status() : null, ...m, focus, errors: errors.slice(0, 5) });
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
  if (report.some(r => r.status !== (r.path.includes('does-not-exist') ? 404 : 200) || r.overflow || r.errors.some(e => e.includes('page.goto:')))) process.exitCode = 1;
  for (const r of report) console.log(`${r.width} ${r.path} status=${r.status} overflow=${r.overflow}(${r.scrollW}/${r.clientW}) cls=${r.cls} small=${r.smallTargets} h=${r.h} focus=${r.focus.join(' | ')} ${r.wide.length ? 'WIDE:' + r.wide.join(',') : ''} ${r.errors.length ? 'ERR:' + r.errors.join(' ;; ') : ''}`);
})().catch((e) => { console.error(e); process.exit(1); });
