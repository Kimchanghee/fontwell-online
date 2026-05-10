/**
 * Google Fonts API + 추가 무료 한글폰트 메타 동기화.
 *
 * 출력: src/data/fonts.json (1700+ 폰트 + 한글 무료폰트 메타)
 * 빌드 시 페이지당 1폰트 SSG → 약 2000개 SEO 페이지 자동 생성.
 */
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';

const OUT = join(process.cwd(), 'src/data/fonts.json');

interface FontMeta {
  family: string;
  category: 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace' | 'korean';
  variants: string[];
  subsets: string[];
  source: 'google' | 'noonnu';
  designer?: string;
  license: string;
  previewUrl: string;
  downloadUrl?: string;
  popularity?: number;
}

async function fetchGoogleFonts(): Promise<FontMeta[]> {
  const apiKey = process.env.GOOGLE_FONTS_API_KEY;
  if (!apiKey) {
    console.warn('  ⚠️ GOOGLE_FONTS_API_KEY missing, using public CSS endpoint');
  }

  const url = apiKey
    ? `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`
    : 'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity';

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn('  ⚠️ Google Fonts API failed, returning empty');
      return [];
    }
    const data = await res.json();
    return (data.items || []).map(
      (f: any, idx: number): FontMeta => ({
        family: f.family,
        category: f.category,
        variants: f.variants,
        subsets: f.subsets,
        source: 'google',
        license: 'OFL or Apache 2.0',
        previewUrl: `https://fonts.google.com/specimen/${encodeURIComponent(f.family.replace(/\s/g, '+'))}`,
        downloadUrl: `https://fonts.google.com/download?family=${encodeURIComponent(f.family)}`,
        popularity: idx + 1,
      })
    );
  } catch (e) {
    console.error('  ❌ Google Fonts fetch failed:', e);
    return [];
  }
}

/* 눈누 한글 무료폰트 일부 — 실제 운영시 nuunuu.com 스크래핑 또는 정적 데이터 매핑 */
const KOREAN_FREE_FONTS: FontMeta[] = [
  {
    family: 'Pretendard',
    category: 'korean',
    variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['korean', 'latin'],
    source: 'noonnu',
    designer: '길형진',
    license: 'OFL',
    previewUrl: 'https://noonnu.cc/font_page/9',
    downloadUrl: 'https://github.com/orioncactus/pretendard/releases',
  },
  {
    family: 'IBM Plex Sans KR',
    category: 'korean',
    variants: ['100', '200', '300', '400', '500', '600', '700'],
    subsets: ['korean', 'latin'],
    source: 'noonnu',
    license: 'OFL',
    previewUrl: 'https://fonts.google.com/specimen/IBM+Plex+Sans+KR',
  },
  {
    family: 'Noto Sans KR',
    category: 'korean',
    variants: ['100', '300', '400', '500', '700', '900'],
    subsets: ['korean', 'latin'],
    source: 'noonnu',
    license: 'OFL',
    previewUrl: 'https://fonts.google.com/specimen/Noto+Sans+KR',
  },
  {
    family: '나눔고딕',
    category: 'korean',
    variants: ['400', '700', '800'],
    subsets: ['korean'],
    source: 'noonnu',
    designer: '네이버',
    license: 'OFL',
    previewUrl: 'https://hangeul.naver.com/font',
  },
  {
    family: '본고딕',
    category: 'korean',
    variants: ['100', '300', '400', '500', '700', '900'],
    subsets: ['korean', 'cjk'],
    source: 'noonnu',
    designer: 'Adobe',
    license: 'OFL',
    previewUrl: 'https://github.com/adobe-fonts/source-han-sans',
  },
];

async function main() {
  console.log('→ Fetching Google Fonts...');
  const google = await fetchGoogleFonts();
  console.log(`  ✓ ${google.length} fonts`);

  // Guard: if API returned nothing AND a seeded fonts.json already exists with
  // more entries than our minimal hardcoded set, KEEP the seeded data.
  if (google.length === 0 && existsSync(OUT)) {
    try {
      const existing = JSON.parse(await (await import('fs/promises')).readFile(OUT, 'utf-8'));
      if (Array.isArray(existing) && existing.length > KOREAN_FREE_FONTS.length) {
        console.log(`✅ Keeping existing seeded ${existing.length} fonts (Google Fonts API unavailable)`);
        return;
      }
    } catch {}
  }

  const all = [...KOREAN_FREE_FONTS, ...google];
  if (!existsSync(dirname(OUT))) await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(all, null, 2), 'utf-8');
  console.log(`✅ Wrote ${all.length} fonts to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
