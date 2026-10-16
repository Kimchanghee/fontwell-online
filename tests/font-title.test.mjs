import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('curated font names and newly ranked IBM Plex title have a complete untruncated candidate',async()=>{
  const source=await readFile(new URL('../src/pages/fonts/[slug].astro',import.meta.url),'utf8');
  const block=source.match(/const title = fitTitle\(\[([\s\S]+?)\]\);/);
  assert.ok(block,'title candidate block missing');
  const templates=[...block[1].matchAll(/`([^`]*)`/g)].map(m=>m[1]);
  const data=JSON.parse(await readFile(new URL('../src/data/fonts.json',import.meta.url),'utf8'));
  const names=new Set([...data.families.filter(f=>f.lic).slice(0,200).map(f=>f.f),'IBM Plex Sans Condensed']);
  for(const name of names){
    const candidates=templates.map(t=>t.replaceAll('${f.f}',name));
    const selected=candidates.find(t=>t.length>=50&&t.length<=60);
    assert.ok(selected,`No complete title for ${name}`);
    assert.ok(selected.includes(name));
    assert.ok(!selected.includes('…'));
  }
});
