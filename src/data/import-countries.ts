// 수입 비용 계산기용 나라별 규칙. 부가세율은 vat-rates.ts 를 그대로 씀 (검증된 값).
// 관세율은 품목(HS 코드)마다 달라서 여기 두지 않음 → 사용자가 공식 관세율표에서 확인해 입력.
// basis: 관세를 매기는 과세가격 기준
//   CIF = 물품가 + 운임 + 보험료 (한국·일본·중국·EU·영국·멕시코 등 대부분)
//   FOB = 물품가만 (미국·호주·뉴질랜드: 국제 운임은 관세 과세가격에서 제외)
// 수입 부가세(GST)는 모든 나라에서 (물품가 + 운임·보험 + 관세)에 부과한다고 단순화.
import { vatRates } from './vat-rates';

export type Basis = 'CIF' | 'FOB';

const FOB = new Set(['US', 'AU', 'NZ']);

/** 공식 관세율 조회 사이트 (확실한 곳만. 없으면 WTO 관세 데이터) */
const TARIFF_LINKS: Record<string, string> = {
  KR: 'https://unipass.customs.go.kr/',
  JP: 'https://www.customs.go.jp/tariff/',
  US: 'https://hts.usitc.gov/',
  GB: 'https://www.trade-tariff.service.gov.uk/',
  AU: 'https://www.abf.gov.au/',
  NZ: 'https://www.customs.govt.nz/',
  SG: 'https://www.customs.gov.sg/',
};
const EU = new Set(['DE', 'AT', 'FR', 'BE', 'ES', 'IT', 'NL', 'SE', 'PL']);
const EU_TARIC = 'https://ec.europa.eu/taxation_customs/dds2/taric/';
const WTO = 'https://ttd.wto.org/';

export interface ImportCountry {
  code: string;
  currency: string;
  vat: number; // 표준 수입 부가세율 % (미국은 수입 단계 부가세 없음)
  reduced: number[];
  basis: Basis;
  tariffLink: string;
}

export const importCountries: ImportCountry[] = [
  ...vatRates.map((c) => ({
    code: c.code,
    currency: c.currency,
    vat: c.standard,
    reduced: c.reduced,
    basis: (FOB.has(c.code) ? 'FOB' : 'CIF') as Basis,
    tariffLink: TARIFF_LINKS[c.code] ?? (EU.has(c.code) ? EU_TARIC : WTO),
  })),
  { code: 'US', currency: 'USD', vat: 0, reduced: [], basis: 'FOB', tariffLink: TARIFF_LINKS.US },
];
