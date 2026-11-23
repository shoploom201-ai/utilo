// 일본 회사원(협회켄포·후생연금·고용보험 가입, 독신·부양가족 없음)의 연간 실수령액 추정.
import {
  PREFECTURES, CARE_RATE, CHILD_RATE, PENSION_RATE, EMPLOYMENT_RATE, HEALTH_GRADES, PENSION_MIN, PENSION_MAX,
  BONUS_HEALTH_CAP_YEAR, BONUS_PENSION_CAP_EACH, INCOME_TAX, RECONSTRUCTION, salaryDeduction, basicDeductionIncomeTax,
  basicDeductionResident, RESIDENT_RATE, RESIDENT_PER_CAPITA, RESIDENT_EXEMPT_INCOME,
} from '../data/jp-tax-2026';

export interface JpInput {
  monthly: number; // 월급(額面, 통근수당 포함)
  bonus: number; // 연간 상여 합계 (2회 지급 가정)
  pref: number; // PREFECTURES 인덱스
  care: boolean; // 40〜64세 (介護保険)
}

const floorTo = (n: number, unit: number) => Math.floor(n / unit) * unit;

export const healthGrade = (m: number) => HEALTH_GRADES.find(([lt]) => m < lt)![1];
export const pensionGrade = (m: number) => Math.min(PENSION_MAX, Math.max(PENSION_MIN, healthGrade(m)));

export function incomeTax(taxable: number) {
  const [, rate, minus] = INCOME_TAX.find(([max]) => taxable <= max)!;
  return floorTo(Math.max(0, taxable * rate - minus) * RECONSTRUCTION, 100);
}

export function calcJp({ monthly, bonus, pref, care }: JpInput) {
  const m = Math.max(0, monthly);
  const b = Math.max(0, bonus);
  const hRate = (PREFECTURES[pref].rate + (care ? CARE_RATE : 0) + CHILD_RATE) / 100 / 2;
  const pRate = PENSION_RATE / 100 / 2;
  const eRate = EMPLOYMENT_RATE / 100;

  // 월급분
  const healthM = m > 0 ? Math.round(healthGrade(m) * hRate) : 0;
  const pensionM = m > 0 ? Math.round(pensionGrade(m) * pRate) : 0;
  const employmentM = Math.round(m * eRate);

  // 상여분 (연 2회, 標準賞与額은 1,000엔 미만 버림)
  const each = floorTo(b / 2, 1000);
  const healthB = Math.round(Math.min(each * 2, BONUS_HEALTH_CAP_YEAR) * hRate);
  const pensionB = Math.round(Math.min(each, BONUS_PENSION_CAP_EACH) * pRate) * 2;
  const employmentB = Math.round(b * eRate);

  const health = healthM * 12 + healthB;
  const pension = pensionM * 12 + pensionB;
  const employment = employmentM * 12 + employmentB;
  const social = health + pension + employment;

  const gross = m * 12 + b;
  const salaryIncome = Math.max(0, gross - salaryDeduction(gross));

  const taxableIT = Math.max(0, floorTo(salaryIncome - social - basicDeductionIncomeTax(salaryIncome), 1000));
  const itax = incomeTax(taxableIT);

  let rtax = 0;
  if (salaryIncome > RESIDENT_EXEMPT_INCOME) {
    const taxableR = Math.max(0, floorTo(salaryIncome - social - basicDeductionResident(salaryIncome), 1000));
    // 調整控除 (독신: 인적공제 차이 5만엔)
    const adj = salaryIncome > 25000000 ? 0 : taxableR <= 2000000 ? Math.min(50000, taxableR) * 0.05 : Math.max(2500, (50000 - (taxableR - 2000000)) * 0.05);
    rtax = floorTo(Math.max(0, taxableR * RESIDENT_RATE - adj), 100) + RESIDENT_PER_CAPITA;
  }

  const net = gross - social - itax - rtax;
  const monthlyNet = m - healthM - pensionM - employmentM - itax / 12 - rtax / 12;
  return { gross, health, pension, employment, social, incomeTax: itax, residentTax: rtax, net, monthlyNet, healthM, pensionM, employmentM, salaryIncome, taxableIT };
}
