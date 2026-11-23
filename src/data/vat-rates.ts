// 국가별 부가세(VAT/GST/소비세) 세율 (%).
// ⚠ 세율은 바뀝니다. 배포 전과 분기마다 각국 국세청 공식 자료로 다시 확인하고 VAT_REVIEWED 날짜를 갱신하세요.
// 2026-11-23 확인: 17개국 모두 (+ 오스트리아 20%/13%/10%, 벨기에 21%/12%/6% 추가) 아래 값과 일치 (PwC Tax Summaries, ESTV, vatupdate 2026-07 표 대조).
// 주의: 스위스는 2026-11-29 국민투표 가결 시 2028-01-01부터 기본 8.5% / 숙박 4.0% 예정 → 2027년 말에 반영.
export const VAT_REVIEWED = '2026-11';

export interface VatCountry {
  code: string; // ISO 3166-1 alpha-2
  currency: string; // ISO 4217
  standard: number;
  reduced: number[];
}

export const vatRates: VatCountry[] = [
  { code: 'KR', currency: 'KRW', standard: 10, reduced: [] },
  { code: 'JP', currency: 'JPY', standard: 10, reduced: [8] },
  { code: 'CN', currency: 'CNY', standard: 13, reduced: [9, 6] },
  { code: 'TW', currency: 'TWD', standard: 5, reduced: [] },
  { code: 'SG', currency: 'SGD', standard: 9, reduced: [] },
  { code: 'AU', currency: 'AUD', standard: 10, reduced: [] },
  { code: 'NZ', currency: 'NZD', standard: 15, reduced: [] },
  { code: 'GB', currency: 'GBP', standard: 20, reduced: [5] },
  { code: 'DE', currency: 'EUR', standard: 19, reduced: [7] },
  { code: 'AT', currency: 'EUR', standard: 20, reduced: [13, 10] },
  { code: 'FR', currency: 'EUR', standard: 20, reduced: [10, 5.5, 2.1] },
  { code: 'BE', currency: 'EUR', standard: 21, reduced: [12, 6] },
  { code: 'ES', currency: 'EUR', standard: 21, reduced: [10, 4] },
  { code: 'IT', currency: 'EUR', standard: 22, reduced: [10, 5, 4] },
  { code: 'NL', currency: 'EUR', standard: 21, reduced: [9] },
  { code: 'SE', currency: 'SEK', standard: 25, reduced: [12, 6] },
  { code: 'PL', currency: 'PLN', standard: 23, reduced: [8, 5] },
  { code: 'CH', currency: 'CHF', standard: 8.1, reduced: [3.8, 2.6] },
  { code: 'MX', currency: 'MXN', standard: 16, reduced: [] },
];
