import en, { type Dict } from './en';
import ko from './ko';
import ja from './ja';
import es from './es';
import { SITE } from '../site';

/**
 * 언어 사전. 기존 4개 언어(en·ko·ja·es)는 모든 도구 문구를 가진 Dict.
 * 새 언어는 LiteDict: 그 나라에서 인기 있고 만들 수 있는 도구 문구만 넣으면 됩니다.
 * 문구가 없는 도구는 그 언어에서 페이지가 만들어지지 않습니다 (tools.ts 의 toolsFor 참고).
 */
export type LiteDict = Omit<Dict, 'tools' | 'radio'> & { tools: Partial<Dict['tools']>; radio?: Dict['radio'] };

// 새 언어 추가: src/i18n/xx.ts (LiteDict) 를 만들어 여기에 등록 + seo.ts 에 주소·제목 추가
export const dictionaries = { en, ko, ja, es } satisfies Record<string, LiteDict>;
export type Locale = keyof typeof dictionaries;
export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = 'en';

export const t = (lang: Locale): LiteDict => dictionaries[lang];
export const localeStaticPaths = () => locales.map((lang) => ({ params: { lang } }));

/** {site}, {email} 자리표시를 실제 값으로 바꿉니다. */
export const fill = (text: string) => text.replaceAll('{site}', SITE.name).replaceAll('{email}', SITE.email);
