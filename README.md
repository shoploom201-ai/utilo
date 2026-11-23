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
2. **8개 언어 모두** 문구 추가: `en.ts`·`ko.ts`·`ja.ts`·`es.ts`(필수) + `de.ts`·`fr.ts`·`zh-hant.ts`·`hi.ts`
   - 번역만 하지 말고 그 나라 검색어·관습(통화, 기본값, 용어)에 맞출 것
3. `src/i18n/seo.ts` 에 **8개 언어 모두** `slug`(그 언어 검색어) 와 `title`(검색 결과 제목) 추가
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

## AdSense (광고 자리는 이미 만들어져 있음)
승인 후 `src/site.ts` 의 `adsense` 만 채우면 됩니다. 비어 있으면 광고 코드가 전혀 나오지 않습니다.
1. `client` = 게시자 ID (`ca-pub-…`)
2. AdSense에서 "디스플레이 광고" 단위 3개를 만들고 각 ID를 `slots` 에 입력
   - `afterTool` ① 도구 아래 / `inContent` ② 사용법과 FAQ 사이·홈 중간 / `beforeRelated` ③ "다른 도구" 위
3. AdSense 자동 광고에서 **앵커 광고(모바일 하단)** 만 켜기 — 나머지 자동 배치는 끄기 (도구 버튼 옆 광고 방지)
4. AdSense > 개인정보 보호 및 메시지에서 **EU·영국용 동의(GDPR) 메시지** 켜기 (스페인 방문자 때문에 필요)
- `/ads.txt` 는 게시자 ID로 자동 생성됩니다
- 광고는 도구 화면 안·버튼 옆, 개인정보·문의·404 페이지에는 넣지 않습니다 (실수 클릭 = 계정 정지 위험)
- 광고 컴포넌트 속성 이름은 `position` (※ `slot` 은 Astro 예약어라 쓰면 광고가 사라짐)
