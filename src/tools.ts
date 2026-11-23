// 도구 목록. 새 도구 추가 순서는 README.md 참고.
import { locales, type Locale } from './i18n';
import { toolSeo } from './i18n/seo';

export type Category = 'study' | 'tax' | 'finance' | 'image';

export const tools = [
  { id: 'focus-timer', category: 'study' },
  { id: 'typing-practice', category: 'study' },
  { id: 'vat-calculator', category: 'tax' },
  { id: 'loan-calculator', category: 'finance' },
  { id: 'compound-interest-calculator', category: 'finance' },
  { id: 'image-compressor', category: 'image' },
  { id: 'image-to-pdf', category: 'image' },
] as const satisfies readonly { id: string; category: Category }[];

export type ToolId = (typeof tools)[number]['id'];
export const categories: Category[] = ['study', 'tax', 'finance', 'image'];

/** 언어별 도구 주소. 예: toolPath('ko', 'vat-calculator') → "/ko/부가세-계산기/" */
export const toolPath = (lang: Locale, id: ToolId) => `/${lang}/${toolSeo[lang][id].slug}/`;

/** 한 도구의 모든 언어 주소 (hreflang·언어 메뉴용) */
export const toolPaths = (id: ToolId) =>
  Object.fromEntries(locales.map((l) => [l, toolPath(l, id)])) as Record<Locale, string>;

/** 모든 언어에서 같은 경로를 쓰는 페이지(홈·소개 등)의 주소 */
export const samePaths = (path: string) =>
  Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])) as Record<Locale, string>;
