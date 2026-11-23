# Kitwise — 다국어 무료 도구 사이트

Astro 정적 사이트. 언어: en / ko / ja / es. 모든 도구는 브라우저 안에서만 동작합니다(서버 비용 거의 0).
배포: GitHub `main` 에 올리면 Cloudflare Pages 가 자동 배포 → https://utilo-5mq.pages.dev

## 명령어
- `npm run dev` — 개발 서버
- `npm run check` — 타입·번역·SEO 설정 누락 검사 (언어 하나라도 빠지면 오류)
- `npm run build` — `dist/` 에 배포용 파일 생성

## 언어별 SEO 구조
- 주소는 각 언어의 검색어로 만듭니다: `/ko/부가세-계산기/`, `/ja/消費税計算/`, `/es/calculadora-iva/`
- 검색 결과 제목도 언어마다 따로: `src/i18n/seo.ts` 의 `title`
- 모든 페이지에 hreflang(언어별 같은 페이지 연결), canonical, og:locale, 구조화 데이터(JSON-LD) 자동 포함
- 루트(`/`)는 언어 선택 페이지(x-default). 자동 언어 이동은 하지 않음(검색엔진 권장 사항)
- **색인된 주소(slug)는 바꾸지 말 것.** 꼭 바꿔야 하면 `public/_redirects` 에 301 이동 규칙 추가

## 새 도구 추가 순서 (자동화도 이 순서를 따르게 할 것)
1. `src/tools.ts` 에 `{ id, category }` 한 줄 추가
2. `src/i18n/en.ts` 의 `tools` 에 문구 추가 → `ko.ts`, `ja.ts`, `es.ts` 에도 같은 키로 추가
3. `src/i18n/seo.ts` 에 4개 언어의 `slug`(그 언어 검색어) 와 `title`(검색 결과 제목) 추가
4. `src/widgets/<이름>.astro` 에 도구 화면 작성 (기존 `VatCalculator.astro` 참고)
5. `src/pages/[lang]/[tool].astro` 의 `widgets` 목록에 연결
6. `npm run check` 와 `npm run build` 통과 + 브라우저에서 실제 동작 확인 후 배포

## 외국어 듣기 라디오
- 페이지: 화면 언어 × 배울 언어 (예: `/ja/韓国語-ラジオ/` = 일본인을 위한 한국어 라디오). 주소·제목은 `src/i18n/seo.ts` 의 `radioSeo`
- 방송 목록: `node scripts/fetch-radio.mjs` 로 갱신 → `src/data/radio.json` 커밋. **한 달에 한 번** 실행 권장
- 방송사가 외부 재생을 막아 둔 곳은 스크립트의 `UNPLAYABLE` 목록에 추가 (브라우저에서 직접 재생해 보고 판단)
- 듣기 기록·즐겨찾기는 방문자 브라우저(localStorage)에만 저장

## 새 언어 추가
`src/i18n/xx.ts` 를 만들고(`Dict` 타입) `src/i18n/index.ts` 의 `dictionaries` 에 등록, `src/i18n/seo.ts` 에 그 언어의 slug·title·og:locale 추가.

## 배포 전 확인
- `astro.config.mjs` 의 `site` = 실제 주소 (개인 도메인을 연결하면 바꿀 것)
- `src/data/vat-rates.ts` 세율은 분기마다 공식 자료로 재확인

## AdSense
승인 후 `src/layouts/Base.astro` 의 `<head>` 주석 자리에 광고 스크립트를 넣고, `public/ads.txt` 를 추가합니다.
