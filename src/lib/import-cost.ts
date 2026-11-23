// 수입 원가(landed cost)와 판매가 계산. 금액은 모두 수입하는 나라 통화 기준.

/** 부피 무게(kg) = 가로×세로×높이(cm) ÷ 계수 (특송 보통 5000, 일부 6000) */
export const volumetricKg = (l: number, w: number, h: number, divisor: number) => (divisor > 0 ? (l * w * h) / divisor : 0);

/** 청구 무게: 실제 무게와 부피 무게 중 큰 값, 0.5kg 단위 올림 */
export const chargeableKg = (actual: number, volumetric: number) => Math.ceil(Math.max(actual, volumetric, 0) * 2) / 2;

export interface ImportInput {
  qty: number; // 수량
  unitPrice: number; // 개당 매입가
  boxes: number; // 상자 수
  boxKg: number; // 상자 1개 실제 무게
  l: number; w: number; h: number; // 상자 1개 크기(cm)
  divisor: number; // 부피 무게 계수
  ratePerKg: number; // kg당 운임
  baseFee: number; // 기본 운임(건당)
  insurancePct: number; // 보험료 (물품가의 %)
  dutyPct: number; // 관세율 %
  basis: 'CIF' | 'FOB';
  vatPct: number; // 수입 부가세율 %
  vatReclaim: boolean; // 사업자 매입세액 공제(환급) 가능 → 원가에서 제외
  otherCosts: number; // 통관 수수료·국내 배송 등
  marginPct: number; // 목표 마진 % (판매가 대비)
  salesVatPct: number; // 소비자가에 붙일 부가세율 % (0이면 붙이지 않음)
}

export function calcImport(i: ImportInput) {
  const qty = Math.max(1, Math.floor(i.qty) || 1);
  const goods = Math.max(0, i.unitPrice) * qty;
  const boxes = Math.max(0, i.boxes);
  const volPerBox = volumetricKg(i.l, i.w, i.h, i.divisor);
  const chargeablePerBox = chargeableKg(i.boxKg, volPerBox);
  const chargeable = chargeablePerBox * boxes;
  const shipping = boxes > 0 ? Math.max(0, i.baseFee) + chargeable * Math.max(0, i.ratePerKg) : 0;
  const insurance = (goods * Math.max(0, i.insurancePct)) / 100;

  const customsValue = i.basis === 'CIF' ? goods + shipping + insurance : goods;
  const duty = (customsValue * Math.max(0, i.dutyPct)) / 100;
  const vatBase = goods + shipping + insurance + duty;
  const vat = (vatBase * Math.max(0, i.vatPct)) / 100;
  const other = Math.max(0, i.otherCosts);

  const totalPaid = goods + shipping + insurance + duty + vat + other; // 실제로 나가는 돈
  const landed = totalPaid - (i.vatReclaim ? vat : 0); // 원가 (공제 가능한 부가세 제외)
  const unitCost = landed / qty;
  const margin = Math.min(95, Math.max(0, i.marginPct)) / 100;
  const priceExVat = unitCost / (1 - margin);
  const priceIncVat = priceExVat * (1 + Math.max(0, i.salesVatPct) / 100);
  const profitPerUnit = priceExVat - unitCost;
  const markupPct = unitCost > 0 ? (priceExVat / unitCost - 1) * 100 : 0;

  return {
    qty, goods, volPerBox, chargeablePerBox, chargeable, shipping, insurance, customsValue, duty, vatBase, vat, other,
    totalPaid, landed, unitCost, priceExVat, priceIncVat, profitPerUnit, markupPct,
  };
}
