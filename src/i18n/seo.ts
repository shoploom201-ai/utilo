// 언어별 검색 최적화 설정.
// slug  : 주소에 들어갈 그 나라 검색어 (예: /ko/부가세-계산기/). 색인된 뒤에는 바꾸지 말 것 — 바꾸면 public/_redirects 에 이동 규칙 추가.
// title : 검색 결과에 보이는 제목. 그 언어 사람들이 실제로 치는 검색어를 맨 앞에 두고, 클릭하고 싶게 만드는 설명을 뒤에.
// 새 도구를 추가하면 4개 언어 모두 여기에 넣어야 합니다 (빠지면 npm run check 에서 오류).
import type { Locale } from './index';
import type { ToolId } from '../tools';

type ToolSeo = Record<ToolId, { slug: string; title: string }>;

export const toolSeo: Record<Locale, ToolSeo> = {
  ko: {
    'vat-calculator': { slug: '부가세-계산기', title: '부가세 계산기 - 공급가액·부가세 포함 금액 자동 계산' },
    'loan-calculator': { slug: '대출-이자-계산기', title: '대출 이자 계산기 - 원리금균등·원금균등 월 상환액 계산' },
    'compound-interest-calculator': { slug: '복리-계산기', title: '복리 계산기 - 적금·적립식 투자 만기 금액 계산' },
    'image-compressor': { slug: '이미지-용량-줄이기', title: '이미지 용량 줄이기 - 사진 압축·WebP 변환 무료' },
    'image-to-pdf': { slug: '이미지-pdf-변환', title: '이미지 PDF 변환 - JPG·PNG 사진을 PDF로 합치기 무료' },
  },
  ja: {
    'vat-calculator': { slug: '消費税計算', title: '消費税計算ツール｜税込・税抜を自動計算（10%・8%対応）' },
    'loan-calculator': { slug: 'ローン返済シミュレーション', title: 'ローン返済シミュレーション｜毎月の返済額と総利息を計算' },
    'compound-interest-calculator': { slug: '複利計算', title: '複利計算ツール｜積立投資の将来額をシミュレーション' },
    'image-compressor': { slug: '画像圧縮', title: '画像圧縮ツール｜写真の容量を小さく・WebP変換（無料）' },
    'image-to-pdf': { slug: '画像pdf変換', title: '画像をPDFに変換｜JPG・PNGを1つのPDFにまとめる（無料）' },
  },
  es: {
    'vat-calculator': { slug: 'calculadora-iva', title: 'Calculadora de IVA: sumar y quitar IVA online gratis' },
    'loan-calculator': { slug: 'calculadora-prestamos', title: 'Calculadora de préstamos: cuota mensual y tabla de amortización' },
    'compound-interest-calculator': { slug: 'calculadora-interes-compuesto', title: 'Calculadora de interés compuesto con aportaciones mensuales' },
    'image-compressor': { slug: 'comprimir-imagenes', title: 'Comprimir imágenes online gratis: reducir el peso de fotos' },
    'image-to-pdf': { slug: 'convertir-imagenes-a-pdf', title: 'Convertir imágenes a PDF gratis: JPG y PNG a PDF' },
  },
  en: {
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
