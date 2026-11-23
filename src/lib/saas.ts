// 소프트웨어·AI 구독 비용 계산. price 는 "월간 결제 기준 정가"(1인당 또는 고정).
// 연간 결제를 고르면 할인율만큼 싸진 금액을 월 단위로 환산해서 계산합니다.

export interface Sub {
  name: string;
  price: number; // 월 정가
  perUser: boolean; // true = 1인당 가격
  users: number;
  billing: 'monthly' | 'annual';
  annualDiscount: number; // 연간 결제 할인율 (%)
  keep: boolean; // false = 해지 후보
}

const base = (s: Sub) => Math.max(0, s.price) * (s.perUser ? Math.max(0, s.users) : 1);
const disc = (s: Sub) => Math.min(100, Math.max(0, s.annualDiscount)) / 100;

/** 이 구독의 현재 월 비용 */
export const monthlyCost = (s: Sub) => base(s) * (s.billing === 'annual' ? 1 - disc(s) : 1);

/** 월간 결제 중인 구독을 연간 결제로 바꾸면 1년에 아끼는 돈 */
export const annualSwitchSaving = (s: Sub) => (s.billing === 'monthly' ? base(s) * disc(s) * 12 : 0);

export function summarize(subs: Sub[], teamSize: number) {
  const rows = subs.map((s) => ({ ...s, monthly: monthlyCost(s), yearly: monthlyCost(s) * 12, switchSaving: annualSwitchSaving(s) }));
  const kept = rows.filter((r) => r.keep);
  const monthly = rows.reduce((a, r) => a + r.monthly, 0);
  const keptMonthly = kept.reduce((a, r) => a + r.monthly, 0);
  const cancelSaving = (monthly - keptMonthly) * 12;
  const switchSaving = kept.reduce((a, r) => a + r.switchSaving, 0);
  const afterYearly = keptMonthly * 12 - switchSaving;
  return {
    rows: rows.sort((a, b) => b.yearly - a.yearly),
    monthly,
    yearly: monthly * 12,
    perPerson: teamSize > 0 ? (monthly * 12) / teamSize : 0,
    cancelSaving, // 해지 후보를 정리하면 1년 절약
    switchSaving, // 남길 구독을 연간 결제로 바꾸면 1년 절약
    afterYearly, // 두 가지를 모두 했을 때 연 비용
    totalSaving: monthly * 12 - afterYearly,
  };
}
