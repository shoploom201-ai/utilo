import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, existsSync } from 'node:fs';

// 블로그 글이 하나도 없는 언어의 /xx/blog/ 목록은 noindex 이므로 사이트맵에서도 뺍니다.
const blogDir = './src/content/blog';
const blogLangs = new Set(
  existsSync(blogDir)
    ? readdirSync(blogDir, { withFileTypes: true }).filter((d) => d.isDirectory()).flatMap((d) => readdirSync(`${blogDir}/${d.name}`).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')))
    : [],
);

// 사이트 주소. 나중에 개인 도메인을 연결하면 여기를 바꾸세요. canonical·hreflang·sitemap 주소가 모두 이 값을 씁니다.
export default defineConfig({
  site: 'https://kitwise.uk',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => { const m = page.match(/\/([a-z-]+)\/blog\/$/); return !m || blogLangs.has(m[1]); } })],
  // hls.js(라디오 HLS 재생, 약 570KB)는 버튼을 누를 때만 따로 받는 파일이라 크기 경고 기준을 올림
  vite: { build: { chunkSizeWarningLimit: 700 } },
});
