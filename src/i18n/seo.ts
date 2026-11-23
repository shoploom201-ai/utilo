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

/** 검색엔진에 알려 줄 각 언어의 지역 표기 (og:locale) */
export const ogLocale: Record<Locale, string> = { ko: 'ko_KR', ja: 'ja_JP', es: 'es_ES', en: 'en_US' };
