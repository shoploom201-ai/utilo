// 빚 상환 시뮬레이션: 매달 이자가 붙고, 모든 빚에 최소 상환액을 낸 뒤 남는 돈을 한 빚에 몰아서 갚음.
// 눈덩이(snowball) = 잔액이 작은 빚부터 / 눈사태(avalanche) = 연이율이 높은 빚부터.
// 한 빚을 다 갚으면 그 최소 상환액도 다음 빚으로 넘어감 (월 예산을 그대로 유지하므로 자동).

export interface Debt { name: string; balance: number; apr: number; min: number }
export type Strategy = 'snowball' | 'avalanche';

export interface PayoffResult {
  ok: boolean;
  reason?: 'budget-below-minimums' | 'never-pays-off';
  months: number;
  totalInterest: number;
  totalPaid: number;
  order: { name: string; month: number }[]; // 다 갚은 순서와 달
}

const MAX_MONTHS = 1200; // 100년 넘으면 사실상 못 갚는 것으로 봄

export function simulate(debts: Debt[], budget: number, strategy: Strategy): PayoffResult {
  const list = debts
    .filter((d) => d.balance > 0)
    .map((d) => ({ ...d, bal: d.balance, rate: Math.max(0, d.apr) / 100 / 12, done: 0 }));
  const empty = { months: 0, totalInterest: 0, totalPaid: 0, order: [] as PayoffResult['order'] };
  if (!list.length) return { ok: true, ...empty };
  const minSum = list.reduce((s, d) => s + Math.min(d.min, d.bal), 0);
  if (budget + 1e-9 < minSum) return { ok: false, reason: 'budget-below-minimums', ...empty };

  // 우선순위는 처음 상태로 고정 (일반적인 눈덩이·눈사태 방식)
  const priority = [...list].sort((a, b) =>
    strategy === 'snowball' ? a.balance - b.balance || b.apr - a.apr : b.apr - a.apr || a.balance - b.balance,
  );
  let totalInterest = 0, totalPaid = 0, month = 0;
  const order: PayoffResult['order'] = [];
  while (list.some((d) => d.bal > 0.005)) {
    if (++month > MAX_MONTHS) return { ok: false, reason: 'never-pays-off', months: month, totalInterest, totalPaid, order };
    for (const d of list) {
      if (d.bal <= 0.005) continue;
      const interest = d.bal * d.rate;
      d.bal += interest;
      totalInterest += interest;
    }
    let money = budget;
    // 1) 모든 빚에 최소 상환액
    for (const d of list) {
      if (d.bal <= 0.005) continue;
      const pay = Math.min(d.min, d.bal, money);
      d.bal -= pay;
      money -= pay;
      totalPaid += pay;
    }
    // 2) 남은 돈은 우선순위대로
    for (const d of priority) {
      if (money <= 0) break;
      if (d.bal <= 0.005) continue;
      const pay = Math.min(d.bal, money);
      d.bal -= pay;
      money -= pay;
      totalPaid += pay;
    }
    for (const d of list) {
      if (d.bal <= 0.005 && !d.done) {
        d.done = month;
        d.bal = 0;
        order.push({ name: d.name, month });
      }
    }
  }
  return { ok: true, months: month, totalInterest, totalPaid, order };
}

/** 최소 상환액만 낼 때 (비교용): 예산 = 최소 상환액 합계 */
export const minimumOnly = (debts: Debt[]) =>
  simulate(debts, debts.filter((d) => d.balance > 0).reduce((s, d) => s + Math.min(d.min, d.balance), 0), 'avalanche');
