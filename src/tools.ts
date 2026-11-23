// 도구 목록. 새 도구를 추가할 때:
// 1) 여기에 한 줄 추가  2) 모든 언어 파일(src/i18n/*.ts)의 tools 에 같은 키로 문구 추가
// 3) src/pages/[lang]/<slug>.astro 페이지 작성
export type Category = 'tax' | 'finance' | 'image';

export const tools = [
  { slug: 'vat-calculator', category: 'tax' },
  { slug: 'loan-calculator', category: 'finance' },
  { slug: 'image-compressor', category: 'image' },
] as const satisfies readonly { slug: string; category: Category }[];

export type ToolSlug = (typeof tools)[number]['slug'];
export const categories: Category[] = ['tax', 'finance', 'image'];
