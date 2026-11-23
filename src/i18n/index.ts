import en from './en';
import ko from './ko';
import ja from './ja';
import es from './es';
import { SITE } from '../site';

// 새 언어 추가: 파일 하나(src/i18n/xx.ts)를 만들고 여기에 등록하면 모든 페이지가 자동 생성됩니다.
export const dictionaries = { en, ko, ja, es };
export type Locale = keyof typeof dictionaries;
export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = 'en';

export const t = (lang: Locale) => dictionaries[lang];
export const localeStaticPaths = () => locales.map((lang) => ({ params: { lang } }));

/** {site}, {email} 자리표시를 실제 값으로 바꿉니다. */
export const fill = (text: string) => text.replaceAll('{site}', SITE.name).replaceAll('{email}', SITE.email);
