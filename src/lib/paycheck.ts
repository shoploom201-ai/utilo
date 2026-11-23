// 미국 급여 실수령액 계산 (연 단위). 연방소득세 + FICA(사회보장·메디케어) + 주 소득세.
// 단순화: 표준공제만 적용(항목별 공제·세액공제·부양가족 미반영), 주 공제 축소(phase-out)·시군 소득세 미반영.
import { FEDERAL, FICA, STATES, type Filing } from '../data/us-tax-2026';

export interface PayInput {
  gross: number; // 연봉 (세전)
  filing: Filing;
  state: string; // 두 글자 주 코드
  k401Pct?: number; // 401(k) 세전 적립 비율 (0~100)
}

export interface PayResult {
  gross: number;
  k401: number;
  federal: number;
  socialSecurity: number;
  medicare: number;
  state: number;
  net: number;
  totalTax: number;
  effectiveRate: number; // 세금 합계 / 세전
  marginalFederal: number; // 마지막 1달러에 붙는 연방 세율
}

/** 연방 방식 구간: [구간 상한, 세율] */
function federalTax(taxable: number, filing: Filing) {
  let tax = 0, lower = 0, marginal = 0;
  for (const [upper, rate] of FEDERAL[filing].brackets) {
    if (taxable > lower) {
      tax += (Math.min(taxable, upper) - lower) * rate;
      marginal = rate;
    }
    lower = upper;
  }
  return { tax, marginal: taxable > 0 ? marginal : 0 };
}

/** 주 방식 구간: [세율, 이 금액 초과분부터] */
function stateBracketTax(taxable: number, brackets: [number, number][]) {
  let tax = 0;
  brackets.forEach(([rate, start], i) => {
    const end = brackets[i + 1]?.[1] ?? Infinity;
    if (taxable > start) tax += (Math.min(taxable, end) - start) * rate;
  });
  return tax;
}

export function stateTax(wages: number, filing: Filing, code: string) {
  const st = STATES[code];
  if (!st || !st.s.length) return 0;
  const married = filing === 'mfj';
  const idx = married ? 1 : 0;
  const brackets = married ? st.m : st.s;
  const deductions = (st.sdCredit ? 0 : st.sd[idx]) + (st.peCredit ? 0 : st.pe[idx]);
  let tax = stateBracketTax(Math.max(0, wages - deductions), brackets);
  if (st.peCredit) tax -= st.pe[idx];
  if (st.sdCredit) tax -= st.sd[idx];
  return Math.max(0, tax);
}

export function calcPaycheck({ gross, filing, state, k401Pct = 0 }: PayInput): PayResult {
  const g = Math.max(0, gross);
  const k401 = g * Math.min(100, Math.max(0, k401Pct)) / 100;
  const wagesAfter401k = g - k401; // 401(k)는 소득세는 줄이지만 FICA는 줄이지 않음
  const fed = federalTax(Math.max(0, wagesAfter401k - FEDERAL[filing].std), filing);
  const socialSecurity = Math.min(g, FICA.ssWageBase) * FICA.ssRate;
  const medicare = g * FICA.medicareRate + Math.max(0, g - FICA.addlMedicareThreshold[filing]) * FICA.addlMedicareRate;
  const st = stateTax(wagesAfter401k, filing, state);
  const totalTax = fed.tax + socialSecurity + medicare + st;
  return {
    gross: g, k401, federal: fed.tax, socialSecurity, medicare, state: st,
    net: g - k401 - totalTax, totalTax,
    effectiveRate: g ? totalTax / g : 0, marginalFederal: fed.marginal,
  };
}

export const PERIODS = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12, annual: 1 } as const;
export type Period = keyof typeof PERIODS;
