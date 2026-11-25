// 셀프 빨래방 화면용 계산·문구 조립 (허브 위젯과 도시 페이지가 같이 씀)
import { t, type Locale } from '../i18n';
import { toolPath } from '../tools';
import { COUNTRIES, CITIES, citySlug, type City } from '../data/laundromats';

export const laundryUi = (lang: Locale) => t(lang).tools.laundromat!.ui;

export const cityPath = (lang: Locale, city: City) => `${toolPath(lang, 'laundromat')}${citySlug(city, lang)}/`;

export const cityPaths = (city: City) =>
  Object.fromEntries((Object.keys(city.name) as Locale[]).map((l) => [l, cityPath(l, city)])) as Record<Locale, string>;

// 달러 계열은 어느 언어에서나 A$·S$·HK$·NT$로 (그냥 "$"나 "SGD"보다 알아보기 쉬움), 나머지는 짧은 기호(¥, ₩, €, RM…)
const DOLLAR_PREFIX: Record<string, string> = { AUD: 'A$', SGD: 'S$', HKD: 'HK$', TWD: 'NT$', CAD: 'C$' };

/** 통화 금액 (소수점이 필요한 값만 소수점 표시) */
export function money(lang: Locale, currency: string, v: number) {
  const parts = new Intl.NumberFormat(lang, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: Number.isInteger(v) ? 0 : 2,
    maximumFractionDigits: 2,
  }).formatToParts(v);
  const prefix = DOLLAR_PREFIX[currency];
  // 기호 부분만 통째로 바꿈 (언어에 따라 "$"·"NT$"·"US$" 등으로 나오므로)
  return parts.map((p) => (p.type === 'currency' && prefix ? prefix : p.value)).join('');
}
export function range(lang: Locale, currency: string, [a, b]: [number, number]) {
  return a === b ? money(lang, currency, a) : `${money(lang, currency, a)}–${money(lang, currency, b)}`;
}

/** 한 도시의 화면 표시용 정보 */
export function cityInfo(city: City, lang: Locale) {
  const c = COUNTRIES[city.country];
  const ui = laundryUi(lang);
  const cur = c.currency;
  const wash = range(lang, cur, city.wash ?? c.wash);
  const dry = c.dry
    ? ui.dryPer.replace('{price}', range(lang, cur, c.dry.price)).replace('{n}', String(c.dry.per))
    : c.dryCycle
      ? ui.dryCycle.replace('{price}', range(lang, cur, c.dryCycle))
      : '';
  const total = c.total ? range(lang, cur, c.total) : '';
  const dropOff = c.dropOffKg ? ui.perKg.replace('{price}', range(lang, cur, c.dropOffKg)) : '';
  const list = new Intl.ListFormat(lang, { type: 'conjunction' });
  const pay = list.format(c.pay.map((p) => ui.payV[p]));
  return { country: c, wash, dry, total, dropOff, pay, hours: ui.hoursV[c.hours], detergent: ui.detV[c.detergent] };
}

/** 구글 지도 검색어: 현지 간판 단어 + 영문 도시명이 가장 결과가 잘 나옴 */
export const mapQuery = (city: City) => `${COUNTRIES[city.country].term} ${city.name.en}`;
export const mapEmbed = (city: City, lang: Locale) =>
  `https://www.google.com/maps?q=${encodeURIComponent(mapQuery(city))}&hl=${lang}&z=13&output=embed`;
export const mapLink = (city: City) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery(city))}`;

export { CITIES };
