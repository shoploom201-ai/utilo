# 블로그 글 쓰는 법

글 하나 = 폴더 하나. 같은 폴더 안의 언어 파일끼리 자동으로 번역본으로 연결됩니다.

```
src/content/blog/
  kyoto-autumn-leaves/        ← 주제 키 (영문 소문자-하이픈)
    images/                   ← 사진 (jpg/png/webp, 빌드 때 WebP·적정 크기로 자동 변환)
      cover.jpg
      tofukuji.jpg
    ko.md  en.md  ja.md  es.md  de.md  fr.md  zh-hant.md  hi.md
```

## frontmatter

```yaml
---
slug: 교토-단풍-명소            # 주소: /ko/blog/교토-단풍-명소/  (그 언어 검색어로)
title: 교토 단풍 명소 7곳 — 2026년 절정 시기와 붐비지 않는 시간
description: 검색 결과에 보일 요약 (한중일 80자, 영문 155자 안팎)
date: 2026-11-25
updated: 2026-12-01               # 선택
cover: ./images/cover.jpg
coverAlt: 붉은 단풍에 둘러싸인 도후쿠지 통천교
coverCredit: "사진: 작가명 / Wikimedia Commons, CC BY-SA 4.0"
tags: [여행, 일본]
draft: false                      # true 면 게시되지 않음
---
```

## 본문 규칙 (가독성)

- 문단은 2~4문장. 첫 문단에서 이 글이 무엇을 알려 주는지 바로 말하기.
- `##` 소제목 3개 이상이면 목차가 자동으로 생깁니다. `###` 은 소제목 안의 작은 항목.
- 사진 + 캡션(출처)은 붙여서 두 줄로:

  ```md
  ![사진 설명](./images/tofukuji.jpg)
  *사진: 작가명 / Wikimedia Commons, CC BY-SA 4.0*
  ```
- 팁·주의는 `> 💡 **팁** …` / `> ⚠️ **주의** …` (상자로 표시됨)
- 비교·가격은 표, 순서는 번호 목록, 핵심 한 구절은 **굵게** (형광펜으로 표시됨).
- 사진은 직접 찍었거나 재사용이 허락된 것(Wikimedia Commons, Unsplash, Pexels 등)만, 출처를 꼭 적기.
