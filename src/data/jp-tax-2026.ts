// 일본 급여 실수령액(手取り) 계산용 2026년(令和8年) 수치. 매년 3~4월(보험료율)·12월(세제 개정)에 다시 확인할 것.
// 출처(2026-11-23 확인):
//  - 協会けんぽ 都道府県別 健康保険料率 令和8年3月分〜: keiri-tools.com, goukaku-navi.jp 두 곳 47개 값 일치 (공식 PDF는 텍스트 확인 불가)
//  - 介護保険料率 1.62% / 子ども・子育て支援金率 0.23%(令和8年4月分〜): 위 두 곳
//  - 雇用保険 一般の事業 労働者負担 0.5%: 厚生労働省 各労働局 令和8年度 料率表
//  - 厚生年金 18.3%, 標準報酬月額 상한 65万円 (68万円 인상은 2027年9月〜)
//  - 所得税 令和8年分: 給与所得控除 최저 74万円, 基礎控除 104万円(合計所得 489万円 이하) 등
//  - 住民税: 基礎控除 43万円, 所得割 10%, 均等割 5,000円(森林環境税 1,000円 포함, 시정촌마다 다를 수 있음)
export const JP_YEAR = 2026;
export const JP_REVIEWED = '2026-11';

/** 협회켄포 건강보험료율 (노사 합계 %), 都道府県 코드 순서 */
export const PREFECTURES: { ja: string; en: string; rate: number }[] = [
  { ja: '北海道', en: 'Hokkaido', rate: 10.28 }, { ja: '青森', en: 'Aomori', rate: 9.85 }, { ja: '岩手', en: 'Iwate', rate: 9.51 },
  { ja: '宮城', en: 'Miyagi', rate: 10.1 }, { ja: '秋田', en: 'Akita', rate: 10.01 }, { ja: '山形', en: 'Yamagata', rate: 9.75 },
  { ja: '福島', en: 'Fukushima', rate: 9.5 }, { ja: '茨城', en: 'Ibaraki', rate: 9.52 }, { ja: '栃木', en: 'Tochigi', rate: 9.82 },
  { ja: '群馬', en: 'Gunma', rate: 9.68 }, { ja: '埼玉', en: 'Saitama', rate: 9.67 }, { ja: '千葉', en: 'Chiba', rate: 9.73 },
  { ja: '東京', en: 'Tokyo', rate: 9.85 }, { ja: '神奈川', en: 'Kanagawa', rate: 9.92 }, { ja: '新潟', en: 'Niigata', rate: 9.21 },
  { ja: '富山', en: 'Toyama', rate: 9.59 }, { ja: '石川', en: 'Ishikawa', rate: 9.7 }, { ja: '福井', en: 'Fukui', rate: 9.71 },
  { ja: '山梨', en: 'Yamanashi', rate: 9.55 }, { ja: '長野', en: 'Nagano', rate: 9.63 }, { ja: '岐阜', en: 'Gifu', rate: 9.8 },
  { ja: '静岡', en: 'Shizuoka', rate: 9.61 }, { ja: '愛知', en: 'Aichi', rate: 9.93 }, { ja: '三重', en: 'Mie', rate: 9.77 },
  { ja: '滋賀', en: 'Shiga', rate: 9.88 }, { ja: '京都', en: 'Kyoto', rate: 9.89 }, { ja: '大阪', en: 'Osaka', rate: 10.13 },
  { ja: '兵庫', en: 'Hyogo', rate: 10.12 }, { ja: '奈良', en: 'Nara', rate: 9.91 }, { ja: '和歌山', en: 'Wakayama', rate: 10.06 },
  { ja: '鳥取', en: 'Tottori', rate: 9.86 }, { ja: '島根', en: 'Shimane', rate: 9.94 }, { ja: '岡山', en: 'Okayama', rate: 10.05 },
  { ja: '広島', en: 'Hiroshima', rate: 9.78 }, { ja: '山口', en: 'Yamaguchi', rate: 10.15 }, { ja: '徳島', en: 'Tokushima', rate: 10.24 },
  { ja: '香川', en: 'Kagawa', rate: 10.02 }, { ja: '愛媛', en: 'Ehime', rate: 9.98 }, { ja: '高知', en: 'Kochi', rate: 10.05 },
  { ja: '福岡', en: 'Fukuoka', rate: 10.11 }, { ja: '佐賀', en: 'Saga', rate: 10.55 }, { ja: '長崎', en: 'Nagasaki', rate: 10.06 },
  { ja: '熊本', en: 'Kumamoto', rate: 10.08 }, { ja: '大分', en: 'Oita', rate: 10.08 }, { ja: '宮崎', en: 'Miyazaki', rate: 9.77 },
  { ja: '鹿児島', en: 'Kagoshima', rate: 10.13 }, { ja: '沖縄', en: 'Okinawa', rate: 9.44 },
];
export const DEFAULT_PREF = 12; // 東京

export const CARE_RATE = 1.62; // 介護保険 (40〜64歳, 노사 합계 %)
export const CHILD_RATE = 0.23; // 子ども・子育て支援金 (노사 합계 %)
export const PENSION_RATE = 18.3; // 厚生年金 (노사 합계 %)
export const EMPLOYMENT_RATE = 0.5; // 雇用保険 労働者負担 %

/** 健康保険 標準報酬月額 등급: [이 금액 미만이면, 표준보수월액] (마지막은 상한 139万円) */
export const HEALTH_GRADES: [number, number][] = [
  [63000, 58000], [73000, 68000], [83000, 78000], [93000, 88000], [101000, 98000], [107000, 104000], [114000, 110000],
  [122000, 118000], [130000, 126000], [138000, 134000], [146000, 142000], [155000, 150000], [165000, 160000], [175000, 170000],
  [185000, 180000], [195000, 190000], [210000, 200000], [230000, 220000], [250000, 240000], [270000, 260000], [290000, 280000],
  [310000, 300000], [330000, 320000], [350000, 340000], [370000, 360000], [395000, 380000], [425000, 410000], [455000, 440000],
  [485000, 470000], [515000, 500000], [545000, 530000], [575000, 560000], [605000, 590000], [635000, 620000], [665000, 650000],
  [695000, 680000], [730000, 710000], [770000, 750000], [810000, 790000], [855000, 830000], [905000, 880000], [955000, 930000],
  [1005000, 980000], [1055000, 1030000], [1115000, 1090000], [1175000, 1150000], [1235000, 1210000], [1295000, 1270000],
  [1355000, 1330000], [Infinity, 1390000],
];
export const PENSION_MIN = 88000;
export const PENSION_MAX = 650000;
export const BONUS_HEALTH_CAP_YEAR = 5730000; // 標準賞与額 연간 상한 (健康保険)
export const BONUS_PENSION_CAP_EACH = 1500000; // 標準賞与額 1회 상한 (厚生年金)

/** 所得税 速算表: [과세소득 상한, 세율, 공제액] */
export const INCOME_TAX: [number, number, number][] = [
  [1949000, 0.05, 0], [3299000, 0.1, 97500], [6949000, 0.2, 427500], [8999000, 0.23, 636000],
  [17999000, 0.33, 1536000], [39999000, 0.4, 2796000], [Infinity, 0.45, 4796000],
];
export const RECONSTRUCTION = 1.021; // 復興特別所得税

/** 令和8年分 給与所得控除 */
export const salaryDeduction = (g: number) =>
  g <= 2200000 ? Math.min(g, 740000) : g <= 3600000 ? g * 0.3 + 80000 : g <= 6600000 ? g * 0.2 + 440000 : g <= 8500000 ? g * 0.1 + 1100000 : 1950000;

/** 令和8年分 所得税の基礎控除 (합계소득 기준) */
export const basicDeductionIncomeTax = (income: number) =>
  income <= 4890000 ? 1040000 : income <= 6550000 ? 670000 : income <= 23500000 ? 620000 : income <= 24000000 ? 480000 : income <= 24500000 ? 320000 : income <= 25000000 ? 160000 : 0;

/** 住民税の基礎控除 */
export const basicDeductionResident = (income: number) =>
  income <= 24000000 ? 430000 : income <= 24500000 ? 290000 : income <= 25000000 ? 150000 : 0;

export const RESIDENT_RATE = 0.1; // 所得割 (도도부현 4% + 시정촌 6%)
export const RESIDENT_PER_CAPITA = 5000; // 均等割 + 森林環境税
export const RESIDENT_EXEMPT_INCOME = 450000; // 단신 비과세 기준(합계소득, 1급지)
