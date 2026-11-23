// 미국 프리랜서(1099) 세금 2026: 자영업세 + 연방 소득세(QBI 공제 포함) + 주 소득세 + 분기 예정 납부액.
// 단순화: 직원·사업용 자산이 없는 일반 프리랜서 기준(QBI 는 기준 금액 초과 시 0까지 선형 감소),
// 건강보험료·은퇴 적립 공제와 세액공제는 반영하지 않음.
import { FEDERAL, FICA, QBI, type Filing } from '../data/us-tax-2026';
import { stateTax } from './paycheck';

export interface SeInput {
  income: number; // 1099 수입 (매출)
  expenses: number; // 사업 경비
  filing: Filing;
  state: string;
  wages?: number; // 다른 직장의 W-2 급여 (부업인 경우)
}

export interface SeResult {
  profit: number;
  seTax: number;
  halfSe: number;
  qbiDeduction: number;
  taxable: number;
  federal: number;
  state: number;
  totalTax: number; // 자영업 수입 때문에 추가로 내는 세금 (W-2 만 있을 때 대비)
  net: number; // 세후 순수익 = 순이익 − 추가 세금
  quarterly: number; // 분기별 예정 납부액
  setAsidePct: number; // 수입 대비 따로 떼어 둘 비율
  qbiLimited: boolean; // 기준 금액을 넘어 QBI 공제가 줄었는지
}

function federalIncomeTax(taxable: number, filing: Filing) {
  let tax = 0, lower = 0;
  for (const [upper, rate] of FEDERAL[filing].brackets) {
    if (taxable > lower) tax += (Math.min(taxable, upper) - lower) * rate;
    lower = upper;
  }
  return tax;
}

/** 한 해 전체 세금 (자영업세·연방·주) */
function incomeTaxes(profit: number, wages: number, filing: Filing, state: string) {
  const nse = Math.max(0, profit) * 0.9235;
  const ssRoom = Math.max(0, FICA.ssWageBase - wages);
  const ss = Math.min(nse, ssRoom) * FICA.ssRate * 2;
  const medicare = nse * FICA.medicareRate * 2;
  const thr = FICA.addlMedicareThreshold[filing];
  const addl = Math.max(0, nse - Math.max(0, thr - wages)) * FICA.addlMedicareRate;
  const seTax = nse >= 400 ? ss + medicare + addl : 0; // 순자영업소득 400달러 미만은 자영업세 없음
  const halfSe = nse >= 400 ? (ss + medicare) / 2 : 0; // 추가 메디케어세는 공제 대상 아님

  const agi = wages + Math.max(0, profit) - halfSe;
  const beforeQbi = Math.max(0, agi - FEDERAL[filing].std);
  const qbiIncome = Math.max(0, profit - halfSe);
  let qbi = Math.min(QBI.rate * qbiIncome, QBI.rate * beforeQbi);
  const over = beforeQbi - QBI.threshold[filing];
  const qbiLimited = over > 0;
  if (over > 0) qbi *= Math.max(0, 1 - over / QBI.phaseIn[filing]);
  if (qbiIncome >= QBI.minQbiForMinimum) qbi = Math.max(qbi, Math.min(QBI.minDeduction, beforeQbi));
  const taxable = Math.max(0, beforeQbi - qbi);
  return { seTax, halfSe, qbi, taxable, federal: federalIncomeTax(taxable, filing), state: stateTax(agi, filing, state), qbiLimited };
}

export function calcSelfEmployed({ income, expenses, filing, state, wages = 0 }: SeInput): SeResult {
  const profit = Math.max(0, income - expenses);
  const w = Math.max(0, wages);
  const all = incomeTaxes(profit, w, filing, state);
  const wageOnly = incomeTaxes(0, w, filing, state); // 직장 급여분은 회사가 원천징수한다고 봄
  const extraFederal = all.federal - wageOnly.federal;
  const extraState = all.state - wageOnly.state;
  const totalTax = all.seTax + extraFederal + extraState;
  return {
    profit, seTax: all.seTax, halfSe: all.halfSe, qbiDeduction: all.qbi, taxable: all.taxable,
    federal: extraFederal, state: extraState, totalTax,
    net: profit - totalTax, quarterly: totalTax / 4,
    setAsidePct: income > 0 ? totalTax / income : 0, qbiLimited: all.qbiLimited,
  };
}

/** 2026 과세연도 분기 예정 납부 기한 (주말이면 다음 평일로 미뤄질 수 있음) */
export const QUARTERLY_DUE_2026 = ['2026-04-15', '2026-06-15', '2026-09-15', '2027-01-15'];
