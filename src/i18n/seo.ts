// 언어별 검색 최적화 설정.
// slug  : 주소에 들어갈 그 나라 검색어 (예: /ko/부가세-계산기/). 색인된 뒤에는 바꾸지 말 것 — 바꾸면 public/_redirects 에 이동 규칙 추가.
// title : 검색 결과에 보이는 제목. 그 언어 사람들이 실제로 치는 검색어를 맨 앞에 두고, 클릭하고 싶게 만드는 설명을 뒤에.
// 새 도구를 추가하면 4개 언어 모두 여기에 넣어야 합니다 (빠지면 npm run check 에서 오류).
import type { Locale } from './index';
import type { ToolId } from '../tools';

type ToolSeo = Record<ToolId, { slug: string; title: string }>;

export const toolSeo: Record<Locale, ToolSeo> = {
  ko: {
    'saas-cost': { slug: 'saas-구독-비용-계산기', title: 'AI·SaaS 구독 비용 계산기 - 소프트웨어 구독료 절약·연간 결제 비교' },
    'self-employed-tax': { slug: '미국-프리랜서-세금-계산기', title: '미국 프리랜서 세금 계산기 2026 - 1099 자영업세·분기 예정 납부액' },
    'debt-payoff': { slug: '빚-상환-계산기', title: '빚 상환 계산기 - 신용카드 빚 눈덩이 vs 고금리 우선 상환 비교' },
    mortgage: { slug: '미국-모기지-계산기', title: '미국 모기지 계산기 - 월 납입금·재산세·PMI 포함 주택담보대출 계산' },
    'us-paycheck': { slug: '미국-연봉-실수령액-계산기', title: '미국 연봉 실수령액 계산기 2026 - 주별 세금·월급 자동 계산' },
    metronome: { slug: '메트로놈', title: '메트로놈 온라인 무료 - BPM 박자기 (탭 템포·박자·셋잇단)' },
    tuner: { slug: '기타-튜너', title: '기타 튜너 온라인 - 마이크로 기타·우쿨렐레·베이스 조율 무료' },
    sudoku: { slug: '스도쿠', title: '스도쿠 무료 - 매일 새로운 오늘의 스도쿠 (쉬움·보통·어려움)' },
    'typing-practice': { slug: '타자-연습', title: '타자 연습 - 한글·영문 타자 속도 측정 무료 (타수·정확도)' },
    'focus-timer': { slug: '뽀모도로-타이머', title: '뽀모도로 타이머 - 공부 집중 타이머 + 백색소음·빗소리 무료' },
    'vat-calculator': { slug: '부가세-계산기', title: '부가세 계산기 - 공급가액·부가세 포함 금액 자동 계산' },
    'loan-calculator': { slug: '대출-이자-계산기', title: '대출 이자 계산기 - 원리금균등·원금균등 월 상환액 계산' },
    'compound-interest-calculator': { slug: '복리-계산기', title: '복리 계산기 - 적금·적립식 투자 만기 금액 계산' },
    'image-compressor': { slug: '이미지-용량-줄이기', title: '이미지 용량 줄이기 - 사진 압축·WebP 변환 무료' },
    'image-to-pdf': { slug: '이미지-pdf-변환', title: '이미지 PDF 변환 - JPG·PNG 사진을 PDF로 합치기 무료' },
  },
  ja: {
    'saas-cost': { slug: 'saas-サブスク-費用計算', title: 'AI・SaaSサブスク費用計算｜ソフトウェア費の見直し・年払い比較' },
    'self-employed-tax': { slug: 'アメリカ-フリーランス-税金計算', title: 'アメリカのフリーランス税金計算 2026｜1099の自営業税と四半期予定納税' },
    'debt-payoff': { slug: '借金返済シミュレーション', title: '借金返済シミュレーション｜スノーボール方式とアバランチ方式を比較' },
    mortgage: { slug: 'アメリカ-住宅ローン計算', title: 'アメリカの住宅ローン計算（モーゲージ）｜固定資産税・保険・PMI込みの月々返済' },
    'us-paycheck': { slug: 'アメリカ-給与-手取り計算', title: 'アメリカの給与 手取り計算 2026｜州税・連邦税を自動計算' },
    metronome: { slug: 'メトロノーム', title: 'メトロノーム（無料・オンライン）｜BPM・拍子・タップテンポ対応' },
    tuner: { slug: 'ギターチューナー', title: 'ギターチューナー（無料）｜マイクでギター・ウクレレ・ベースをチューニング' },
    sudoku: { slug: '数独', title: '数独（ナンプレ）無料｜毎日更新の今日の問題・初級〜上級' },
    'typing-practice': { slug: 'タイピング練習', title: 'タイピング練習｜ローマ字入力で日本語・英語の短文を無料で練習' },
    'focus-timer': { slug: 'ポモドーロタイマー', title: 'ポモドーロタイマー｜勉強・作業用の集中タイマー＋ホワイトノイズ（無料）' },
    'vat-calculator': { slug: '消費税計算', title: '消費税計算ツール｜税込・税抜を自動計算（10%・8%対応）' },
    'loan-calculator': { slug: 'ローン返済シミュレーション', title: 'ローン返済シミュレーション｜毎月の返済額と総利息を計算' },
    'compound-interest-calculator': { slug: '複利計算', title: '複利計算ツール｜積立投資の将来額をシミュレーション' },
    'image-compressor': { slug: '画像圧縮', title: '画像圧縮ツール｜写真の容量を小さく・WebP変換（無料）' },
    'image-to-pdf': { slug: '画像pdf変換', title: '画像をPDFに変換｜JPG・PNGを1つのPDFにまとめる（無料）' },
  },
  es: {
    'saas-cost': { slug: 'calculadora-costos-saas', title: 'Calculadora de costos SaaS e IA: ahorra en suscripciones de software' },
    'self-employed-tax': { slug: 'calculadora-impuestos-autonomo-usa', title: 'Calculadora de impuestos para autónomos en EE. UU. 2026 (1099)' },
    'debt-payoff': { slug: 'calculadora-pago-deudas', title: 'Calculadora para pagar deudas: bola de nieve vs avalancha' },
    mortgage: { slug: 'calculadora-hipoteca-usa', title: 'Calculadora de hipoteca en EE. UU.: pago mensual con impuestos, seguro y PMI' },
    'us-paycheck': { slug: 'calculadora-salario-neto-usa', title: 'Calculadora de salario neto en EE. UU. 2026: sueldo después de impuestos' },
    metronome: { slug: 'metronomo-online', title: 'Metrónomo online gratis: BPM, compás y tap tempo' },
    tuner: { slug: 'afinador-de-guitarra', title: 'Afinador de guitarra online con micrófono: guitarra, ukelele y bajo' },
    sudoku: { slug: 'sudoku-online', title: 'Sudoku online gratis: sudoku diario fácil, medio y difícil' },
    'typing-practice': { slug: 'test-de-mecanografia', title: 'Test de mecanografía online gratis: mide tus palabras por minuto' },
    'focus-timer': { slug: 'temporizador-pomodoro', title: 'Temporizador Pomodoro online con ruido blanco para estudiar' },
    'vat-calculator': { slug: 'calculadora-iva', title: 'Calculadora de IVA: sumar y quitar IVA online gratis' },
    'loan-calculator': { slug: 'calculadora-prestamos', title: 'Calculadora de préstamos: cuota mensual y tabla de amortización' },
    'compound-interest-calculator': { slug: 'calculadora-interes-compuesto', title: 'Calculadora de interés compuesto con aportaciones mensuales' },
    'image-compressor': { slug: 'comprimir-imagenes', title: 'Comprimir imágenes online gratis: reducir el peso de fotos' },
    'image-to-pdf': { slug: 'convertir-imagenes-a-pdf', title: 'Convertir imágenes a PDF gratis: JPG y PNG a PDF' },
  },
  en: {
    'saas-cost': { slug: 'saas-cost-calculator', title: 'SaaS Cost Calculator – Software & AI Subscription Spend and Savings' },
    'self-employed-tax': { slug: 'self-employment-tax-calculator', title: 'Self-Employment Tax Calculator 2026 – 1099 Taxes & Quarterly Payments' },
    'debt-payoff': { slug: 'debt-payoff-calculator', title: 'Debt Payoff Calculator – Snowball vs Avalanche Credit Card Payoff' },
    mortgage: { slug: 'mortgage-calculator', title: 'Mortgage Calculator with Taxes, Insurance & PMI – Monthly Payment' },
    'us-paycheck': { slug: 'paycheck-calculator', title: 'Paycheck Calculator 2026 – Take-Home Pay After Taxes, All 50 States' },
    metronome: { slug: 'metronome', title: 'Online Metronome – Free BPM Metronome with Tap Tempo' },
    tuner: { slug: 'guitar-tuner', title: 'Online Guitar Tuner – Tune Guitar, Ukulele & Bass with Your Mic' },
    sudoku: { slug: 'daily-sudoku', title: 'Daily Sudoku – Free Online Sudoku Puzzles, Easy to Hard' },
    'typing-practice': { slug: 'typing-test', title: 'Typing Test – Check Your WPM and Accuracy Free' },
    'focus-timer': { slug: 'pomodoro-timer', title: 'Pomodoro Timer Online with White Noise – Free Focus Timer' },
    'vat-calculator': { slug: 'vat-calculator', title: 'VAT Calculator – Add or Remove VAT Online' },
    'loan-calculator': { slug: 'loan-calculator', title: 'Loan Calculator – Monthly Payment & Amortization Schedule' },
    'compound-interest-calculator': { slug: 'compound-interest-calculator', title: 'Compound Interest Calculator with Monthly Contributions' },
    'image-compressor': { slug: 'image-compressor', title: 'Image Compressor – Reduce Image File Size Online Free' },
    'image-to-pdf': { slug: 'image-to-pdf', title: 'Image to PDF Converter – Combine JPG & PNG into One PDF' },
  },
};

/**
 * 외국어 듣기 라디오 페이지: [화면 언어][배울 언어].
 * "그 언어를 배우는 사람"이 자기 말로 검색하는 문구를 노립니다 (예: 일본인 → 韓国語 リスニング).
 */
export const radioSeo: Record<Locale, Partial<Record<Locale, { slug: string; title: string }>>> = {
  ko: {
    ja: { slug: '일본어-라디오', title: '일본어 듣기 공부 - 일본 라디오 실시간 무료 듣기' },
    es: { slug: '스페인어-라디오', title: '스페인어 듣기 공부 - 스페인·중남미 라디오 실시간 듣기' },
    en: { slug: '영어-라디오', title: '영어 듣기 공부 - 미국·영국·호주 라디오 실시간 무료 듣기' },
  },
  ja: {
    ko: { slug: '韓国語-ラジオ', title: '韓国語リスニング｜韓国のラジオを無料で聴いて学ぶ' },
    es: { slug: 'スペイン語-ラジオ', title: 'スペイン語リスニング｜スペイン・中南米のラジオを無料で聴く' },
    en: { slug: '英語-ラジオ', title: '英語リスニング｜アメリカ・イギリスのラジオを無料で聴く' },
  },
  es: {
    ko: { slug: 'radio-coreana', title: 'Radio coreana en vivo: aprende coreano escuchando' },
    ja: { slug: 'radio-japonesa', title: 'Radio japonesa en vivo: aprende japonés escuchando' },
    en: { slug: 'radio-en-ingles', title: 'Radio en inglés en vivo: mejora tu comprensión auditiva' },
  },
  en: {
    ko: { slug: 'korean-radio', title: 'Korean Radio Live – Learn Korean by Listening' },
    ja: { slug: 'japanese-radio', title: 'Japanese Radio Live – Learn Japanese by Listening' },
    es: { slug: 'spanish-radio', title: 'Spanish Radio Live – Learn Spanish by Listening (Spain & Latin America)' },
  },
};

/** 화면 언어(lang)에서 배울 수 있는 언어 목록과 주소 */
export const radioTargets = (lang: Locale) =>
  (Object.keys(radioSeo[lang]) as Locale[]).map((target) => ({ target, ...radioSeo[lang][target]! }));
export const radioPath = (lang: Locale, target: Locale) => `/${lang}/${radioSeo[lang][target]!.slug}/`;

/** 검색엔진에 알려 줄 각 언어의 지역 표기 (og:locale) */
export const ogLocale: Record<Locale, string> = { ko: 'ko_KR', ja: 'ja_JP', es: 'es_ES', en: 'en_US' };
