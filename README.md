# Utilo — 다국어 무료 도구 사이트

Astro 정적 사이트. 언어: en / ko / ja / es. 모든 도구는 브라우저 안에서만 동작합니다(서버 비용 거의 0).

## 명령어
- `npm run dev` — 개발 서버 (http://localhost:4321)
- `npm run check` — 타입·번역 누락 검사 (언어 파일에 키가 빠지면 여기서 오류)
- `npm run build` — `dist/` 에 배포용 파일 생성

## 새 도구 추가 순서 (자동화도 이 순서를 따르게 할 것)
1. `src/tools.ts` 에 `{ slug, category }` 한 줄 추가
2. `src/i18n/en.ts` 의 `tools` 에 문구 추가 → `ko.ts`, `ja.ts`, `es.ts` 에도 같은 키로 추가
3. `src/pages/[lang]/<slug>.astro` 작성 (기존 `vat-calculator.astro` 참고)
4. `npm run check` 와 `npm run build` 통과 + 브라우저에서 실제 동작 확인 후 배포

## 새 언어 추가
`src/i18n/xx.ts` 를 만들고(`Dict` 타입) `src/i18n/index.ts` 의 `dictionaries` 에 등록하면 모든 페이지가 생깁니다.

## 배포 전 꼭 바꿀 것
- `astro.config.mjs` 의 `site` → 실제 도메인
- `src/site.ts` 의 사이트 이름과 연락처 이메일
- `src/data/vat-rates.ts` 세율을 각국 공식 자료로 다시 확인

## AdSense
승인 후 `src/layouts/Base.astro` 의 `<head>` 주석 자리에 광고 스크립트를 넣고, `public/ads.txt` 를 추가합니다.
