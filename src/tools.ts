// 도구 목록. 새 도구 추가 순서는 README.md 참고.
import { locales, t, type Locale } from './i18n';
import { toolSeo } from './i18n/seo';

export type Category = 'study' | 'puzzle' | 'music' | 'business' | 'tax' | 'finance' | 'image';

export const tools = [
  { id: 'metronome', category: 'music' },
  { id: 'tuner', category: 'music' },
  { id: 'sudoku', category: 'puzzle' },
  { id: 'focus-timer', category: 'study' },
  { id: 'typing-practice', category: 'study' },
  { id: 'vat-calculator', category: 'tax' },
  { id: 'us-paycheck', category: 'finance' },
  { id: 'mortgage', category: 'finance' },
  { id: 'debt-payoff', category: 'finance' },
  { id: 'self-employed-tax', category: 'tax' },
  { id: 'saas-cost', category: 'business' },
  { id: 'loan-calculator', category: 'finance' },
  { id: 'compound-interest-calculator', category: 'finance' },
  { id: 'image-compressor', category: 'image' },
  { id: 'image-to-pdf', category: 'image' },
] as const satisfies readonly { id: string; category: Category }[];

export type ToolId = (typeof tools)[number]['id'];
export const categories: Category[] = ['study', 'puzzle', 'music', 'tax', 'finance', 'business', 'image'];

/** 이 언어에 페이지가 있는가 (문구와 주소가 둘 다 있어야 함) */
export const hasTool = (lang: Locale, id: ToolId) => Boolean(t(lang).tools[id] && toolSeo[lang][id]);

/** 이 언어에서 제공하는 도구만 */
export const toolsFor = (lang: Locale) => tools.filter((tool) => hasTool(lang, tool.id));

/** 언어별 도구 주소. 예: toolPath('ko', 'vat-calculator') → "/ko/부가세-계산기/" */
export const toolPath = (lang: Locale, id: ToolId) => `/${lang}/${toolSeo[lang][id]!.slug}/`;

/** 한 도구가 있는 언어들의 주소 (hreflang·언어 메뉴용) */
export const toolPaths = (id: ToolId) =>
  Object.fromEntries(locales.filter((l) => hasTool(l, id)).map((l) => [l, toolPath(l, id)])) as Partial<Record<Locale, string>>;

/** 모든 언어에서 같은 경로를 쓰는 페이지(홈·소개 등)의 주소 */
export const samePaths = (path: string) =>
  Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])) as Record<Locale, string>;
