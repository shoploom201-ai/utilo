// 자동차 증상·경고등 진단 데이터 (언어와 무관한 구조). 문구는 각 언어 사전의 tools['car-diagnosis'] 에 있음.
// 일반적인 정비 지식 기반 안내이며 차종별 부품·수리비는 넣지 않음 (검증 가능한 자료가 없음).
// diy   : 1 = 누구나 (점검·보충), 2 = 공구와 경험 필요, 3 = 정비소
// urgency: 0 = 정상일 수 있음, 1 = 시간 날 때 점검, 2 = 며칠 안에 점검, 3 = 운행 중지·즉시 점검

export const CAUSES = {
  battery: { diy: 1, urgency: 2 },
  terminals: { diy: 1, urgency: 2 },
  starter: { diy: 3, urgency: 2 },
  alternator: { diy: 3, urgency: 3 },
  'fuel-pump': { diy: 3, urgency: 2 },
  ignition: { diy: 2, urgency: 2 },
  'gas-cap': { diy: 1, urgency: 1 },
  'o2-sensor': { diy: 2, urgency: 1 },
  catalytic: { diy: 3, urgency: 2 },
  'oil-low': { diy: 1, urgency: 3 },
  'oil-pump': { diy: 3, urgency: 3 },
  'oil-leak': { diy: 3, urgency: 2 },
  'oil-burning': { diy: 3, urgency: 2 },
  'coolant-low': { diy: 1, urgency: 3 },
  'coolant-leak': { diy: 2, urgency: 3 },
  thermostat: { diy: 2, urgency: 3 },
  'water-pump': { diy: 3, urgency: 3 },
  'radiator-fan': { diy: 2, urgency: 3 },
  'head-gasket': { diy: 3, urgency: 3 },
  'brake-pads': { diy: 2, urgency: 2 },
  'brake-discs': { diy: 2, urgency: 2 },
  'brake-fluid': { diy: 1, urgency: 3 },
  'parking-brake': { diy: 1, urgency: 0 },
  'tire-pressure': { diy: 1, urgency: 2 },
  'wheel-balance': { diy: 3, urgency: 1 },
  alignment: { diy: 3, urgency: 1 },
  suspension: { diy: 3, urgency: 2 },
  belt: { diy: 2, urgency: 2 },
  'abs-sensor': { diy: 2, urgency: 1 },
  'airbag-system': { diy: 3, urgency: 2 },
  'eps-system': { diy: 3, urgency: 2 },
  'glow-plugs': { diy: 2, urgency: 1 },
  'dpf-regen': { diy: 1, urgency: 1 },
  'air-filter': { diy: 1, urgency: 1 },
  injectors: { diy: 3, urgency: 2 },
  'transmission-fluid': { diy: 3, urgency: 2 },
  'ac-refrigerant': { diy: 3, urgency: 1 },
  'ac-compressor': { diy: 3, urgency: 1 },
  'cabin-filter': { diy: 1, urgency: 1 },
  condensation: { diy: 1, urgency: 0 },
} as const;
export type CauseId = keyof typeof CAUSES;

/** 증상 → 원인 후보 (가능성이 높은 순) */
export const SYMPTOMS = {
  'no-crank': ['battery', 'terminals', 'starter'],
  'cranks-no-start': ['battery', 'fuel-pump', 'ignition'],
  'rough-idle': ['ignition', 'air-filter', 'injectors'],
  overheating: ['coolant-low', 'thermostat', 'radiator-fan', 'water-pump', 'head-gasket'],
  'brake-squeal': ['brake-pads', 'brake-discs'],
  'brake-grind': ['brake-pads', 'brake-discs'],
  'brake-pulse': ['brake-discs'],
  'soft-pedal': ['brake-fluid', 'brake-pads'],
  vibration: ['wheel-balance', 'tire-pressure', 'suspension'],
  pulls: ['tire-pressure', 'alignment', 'suspension'],
  clunk: ['suspension'],
  'belt-squeal': ['belt'],
  'white-smoke': ['condensation', 'head-gasket', 'coolant-leak'],
  'blue-smoke': ['oil-burning'],
  'black-smoke': ['air-filter', 'injectors'],
  'leak-green': ['coolant-leak', 'water-pump'],
  'leak-brown': ['oil-leak'],
  'leak-red': ['transmission-fluid'],
  'leak-clear': ['condensation'],
  'ac-warm': ['ac-refrigerant', 'cabin-filter', 'ac-compressor'],
} as const satisfies Record<string, readonly CauseId[]>;
export type SymptomId = keyof typeof SYMPTOMS;

/** 증상 묶음 (화면에서 그룹으로 보여 줌) */
export const SYMPTOM_GROUPS: { id: 'start' | 'brake' | 'ride' | 'smoke' | 'leak' | 'comfort'; items: SymptomId[] }[] = [
  { id: 'start', items: ['no-crank', 'cranks-no-start', 'rough-idle', 'overheating'] },
  { id: 'brake', items: ['brake-squeal', 'brake-grind', 'brake-pulse', 'soft-pedal'] },
  { id: 'ride', items: ['vibration', 'pulls', 'clunk', 'belt-squeal'] },
  { id: 'smoke', items: ['white-smoke', 'blue-smoke', 'black-smoke'] },
  { id: 'leak', items: ['leak-green', 'leak-brown', 'leak-red', 'leak-clear'] },
  { id: 'comfort', items: ['ac-warm'] },
];

// 경고등 아이콘: 24×24 선 그림 (currentColor). 실제 계기판 기호를 단순화한 모양.
const ICON = {
  engine: '<path d="M3 10v4h2v2h3l2 2h7v-3h2v2h2V9h-2v2h-2V8h-4V6h3V5H9v1h3v2H8l-2 2H3z"/>',
  oil: '<path d="M2 11h4l2-2h6l7-2-6 7H6l-1-2H2z"/><path d="M20 12c0 1-1 2-1 2s-1-1-1-2 1-2 1-2 1 1 1 2z"/>',
  battery: '<rect x="3" y="7" width="18" height="12" rx="1"/><path d="M6 7V5h3v2M15 7V5h3v2M6 13h3M15 13h3M16.5 11.5v3"/>',
  coolant: '<path d="M12 3v11"/><circle cx="12" cy="16.5" r="2.5"/><path d="M12 6h3M12 9h3M3 20c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/>',
  brake: '<circle cx="12" cy="12" r="6"/><path d="M12 9v3.5M12 14.8v.2"/><path d="M5 6a9 9 0 0 0 0 12M19 6a9 9 0 0 1 0 12"/>',
  abs: '<circle cx="12" cy="12" r="6.5"/><path d="M4.5 6a9 9 0 0 0 0 12M19.5 6a9 9 0 0 1 0 12"/><text x="12" y="14.2" font-size="5.5" text-anchor="middle" stroke="none" fill="currentColor" font-weight="700">ABS</text>',
  airbag: '<circle cx="8" cy="5" r="2"/><path d="M8 8v6l3 4M8 11h3"/><circle cx="17" cy="12" r="4"/>',
  tpms: '<path d="M6 6c-2 2-2 10 0 12h12c2-2 2-10 0-12z"/><path d="M12 9v4M12 15v.2M6 20h12"/>',
  eps: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M5 12h5M14 12h5M12 14v5"/><path d="M20.5 6v4M20.5 12v.2"/>',
  esc: '<path d="M5 12l2-4h10l2 4v3H5z"/><circle cx="8" cy="15.5" r="1.3"/><circle cx="16" cy="15.5" r="1.3"/><path d="M6 20c1-1 2-1 3 0M15 20c1-1 2-1 3 0"/>',
  glow: '<path d="M4 9c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 2 1.5 2.5 1M4 15c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 2 1.5 2.5 1"/>',
  dpf: '<rect x="4" y="7" width="16" height="10" rx="2"/><path d="M2 12h2M20 12h2"/><circle cx="9" cy="11" r=".6"/><circle cx="12" cy="13" r=".6"/><circle cx="15" cy="11" r=".6"/>',
} as const;

/** 경고등: 색(빨강 = 즉시 정차·점검, 주황 = 곧 점검) 과 원인 후보 */
export const LIGHTS = {
  engine: { color: 'amber', causes: ['gas-cap', 'ignition', 'o2-sensor', 'catalytic'] },
  oil: { color: 'red', causes: ['oil-low', 'oil-pump', 'oil-leak'] },
  battery: { color: 'red', causes: ['alternator', 'belt', 'battery'] },
  coolant: { color: 'red', causes: ['coolant-low', 'thermostat', 'radiator-fan', 'water-pump'] },
  brake: { color: 'red', causes: ['parking-brake', 'brake-fluid', 'brake-pads'] },
  abs: { color: 'amber', causes: ['abs-sensor'] },
  airbag: { color: 'red', causes: ['airbag-system'] },
  tpms: { color: 'amber', causes: ['tire-pressure'] },
  eps: { color: 'amber', causes: ['eps-system', 'battery'] },
  esc: { color: 'amber', causes: ['abs-sensor', 'tire-pressure'] },
  glow: { color: 'amber', causes: ['glow-plugs', 'battery'] },
  dpf: { color: 'amber', causes: ['dpf-regen'] },
} as const satisfies Record<keyof typeof ICON, { color: 'red' | 'amber'; causes: readonly CauseId[] }>;
export type LightId = keyof typeof LIGHTS;

export const lightIcon = (id: LightId) =>
  `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[id]}</svg>`;
