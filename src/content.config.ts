// 블로그 글 모음.
// 글 하나 = 폴더 하나: src/content/blog/<주제-키>/<언어>.md  (예: kyoto-autumn/ko.md, kyoto-autumn/en.md …)
// 사진은 같은 폴더의 images/ 에 두고 글에서 ![설명](./images/파일.jpg) 로 넣으면 빌드할 때 자동으로 WebP·적정 크기로 바뀝니다.
// 같은 폴더의 글끼리 서로 다른 언어 버전으로 연결됩니다 (hreflang·언어 메뉴).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({
    pattern: '*/*.md',
    base: './src/content/blog',
    // id = "<주제-키>/<언어>" (frontmatter 의 slug 가 id 로 쓰이지 않게)
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      /** 주소 끝부분 (그 언어 검색어로). 예: "교토-단풍-명소" → /ko/blog/교토-단풍-명소/ */
      slug: z.string().regex(/^[^\s/?#]+$/),
      title: z.string(),
      /** 검색 결과 설명 (한중일 80자·영문 155자 안팎) */
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      cover: image(),
      coverAlt: z.string(),
      /** 사진 출처·라이선스. 예: "Photo: 홍길동 / Wikimedia Commons, CC BY-SA 4.0" */
      coverCredit: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
