import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 사이트 주소. 나중에 개인 도메인을 연결하면 여기를 바꾸세요. canonical·hreflang·sitemap 주소가 모두 이 값을 씁니다.
export default defineConfig({
  site: 'https://utilo.pages.dev',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
