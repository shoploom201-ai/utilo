import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 사이트 주소. 나중에 개인 도메인을 연결하면 여기를 바꾸세요. canonical·hreflang·sitemap 주소가 모두 이 값을 씁니다.
export default defineConfig({
  site: 'https://utilo-5mq.pages.dev',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // hls.js(라디오 HLS 재생, 약 570KB)는 버튼을 누를 때만 따로 받는 파일이라 크기 경고 기준을 올림
  vite: { build: { chunkSizeWarningLimit: 700 } },
});
