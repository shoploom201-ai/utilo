// /ads.txt — AdSense 가 "이 사이트의 광고를 팔 권한이 누구에게 있는지" 확인하는 파일.
// src/site.ts 에 게시자 ID(ca-pub-…)를 넣으면 자동으로 올바른 내용이 만들어집니다.
import type { APIRoute } from 'astro';
import { SITE } from '../site';

export const GET: APIRoute = () => {
  const pub = SITE.adsense.client.replace(/^ca-/, '');
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : '# AdSense 승인 후 src/site.ts 에 게시자 ID를 넣으면 이 파일이 자동으로 채워집니다.\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
