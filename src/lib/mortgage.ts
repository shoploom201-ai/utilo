// 모기지(주택담보대출) 월 납입금 계산. 미국식: 원금+이자(P&I) + 재산세 + 주택보험 + PMI + HOA.
// PMI: 계약금 20% 미만일 때 붙고, 잔액이 집값의 78%가 되면 자동 해지 (미국 Homeowners Protection Act 기준).

export interface MortgageInput {
  price: number; // 집값
  down: number; // 계약금 (금액)
  rate: number; // 연 금리 (%)
  years: number; // 대출 기간
  taxRate?: number; // 재산세 (집값 대비 연 %)
  insurance?: number; // 주택보험 (연 금액)
  pmiRate?: number; // PMI (대출금 대비 연 %)
  hoa?: number; // HOA (월 금액)
}

export interface YearRow { year: number; principal: number; interest: number; balance: number }

export interface MortgageResult {
  loan: number;
  pi: number; // 월 원금+이자
  tax: number; // 월 재산세
  insurance: number; // 월 보험
  pmi: number; // 첫 달 PMI (0 이면 없음)
  hoa: number;
  monthly: number; // 첫 달 총 납입금
  totalInterest: number;
  totalPmi: number;
  pmiMonths: number; // PMI 를 내는 개월 수
  months: number;
  years: YearRow[];
}

export function monthlyPI(loan: number, ratePct: number, months: number) {
  if (loan <= 0 || months <= 0) return 0;
  const r = ratePct / 100 / 12;
  return r === 0 ? loan / months : (loan * r) / (1 - Math.pow(1 + r, -months));
}

export function calcMortgage(i: MortgageInput): MortgageResult {
  const price = Math.max(0, i.price);
  const down = Math.min(price, Math.max(0, i.down));
  const loan = price - down;
  const months = Math.round(Math.max(1, i.years) * 12);
  const r = Math.max(0, i.rate) / 100 / 12;
  const pi = monthlyPI(loan, i.rate, months);
  const tax = (price * (i.taxRate ?? 0)) / 100 / 12;
  const insurance = (i.insurance ?? 0) / 12;
  const hoa = i.hoa ?? 0;
  const needsPmi = price > 0 && down / price < 0.2 && (i.pmiRate ?? 0) > 0;
  const pmiMonthly = needsPmi ? (loan * (i.pmiRate ?? 0)) / 100 / 12 : 0;

  let balance = loan, totalInterest = 0, totalPmi = 0, pmiMonths = 0;
  const years: YearRow[] = [];
  let yp = 0, yi = 0;
  for (let m = 1; m <= months; m++) {
    if (needsPmi && balance > price * 0.78) {
      totalPmi += pmiMonthly;
      pmiMonths++;
    }
    const interest = balance * r;
    const principal = m === months ? balance : Math.min(balance, pi - interest);
    balance = Math.max(0, balance - principal);
    totalInterest += interest;
    yp += principal;
    yi += interest;
    if (m % 12 === 0 || m === months) {
      years.push({ year: Math.ceil(m / 12), principal: yp, interest: yi, balance });
      yp = yi = 0;
    }
  }
  return { loan, pi, tax, insurance, pmi: pmiMonthly, hoa, monthly: pi + tax + insurance + pmiMonthly + hoa, totalInterest, totalPmi, pmiMonths, months, years };
}
