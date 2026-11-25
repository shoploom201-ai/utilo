// 블로그 공통 함수와 화면 문구
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

export type Post = CollectionEntry<'blog'>;

export const topicOf = (p: Post) => p.id.split('/')[0];
export const langOf = (p: Post) => p.id.split('/')[1] as Locale;
export const postPath = (p: Post) => `/${langOf(p)}/blog/${p.data.slug}/`;

/** 게시된 모든 글 (최신순). draft: true 인 글은 빠집니다. */
export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function postsFor(lang: Locale) {
  return (await allPosts()).filter((p) => langOf(p) === lang);
}

/** 같은 주제의 다른 언어 글 주소 (hreflang·언어 메뉴용) */
export function translationPaths(post: Post, posts: Post[]) {
  const topic = topicOf(post);
  return Object.fromEntries(posts.filter((p) => topicOf(p) === topic).map((p) => [langOf(p), postPath(p)])) as Partial<Record<Locale, string>>;
}

/** 읽는 시간(분). 한중일은 글자 수, 그 외는 단어 수 기준 */
export function readingMinutes(body: string, lang: Locale) {
  const text = body.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/[#>*_`|\-]/g, ' ');
  const cjk = lang === 'ko' || lang === 'ja' || lang === 'zh-hant';
  const n = cjk ? text.replace(/\s/g, '').length : text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(n / (cjk ? 500 : 220)));
}

export const formatDate = (d: Date, lang: Locale) =>
  new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(d);

type BlogUi = {
  nav: string;
  title: string;
  intro: string;
  empty: string;
  minRead: string;
  updated: string;
  toc: string;
  more: string;
  back: string;
  latest: string;
  all: string;
};

export const blogUi: Record<Locale, BlogUi> = {
  en: { nav: 'Blog', title: 'Blog', intro: 'Practical guides and stories, written to be easy to read.', empty: 'The first posts are on their way.', minRead: '{n} min read', updated: 'Updated', toc: 'On this page', more: 'More posts', back: 'All posts', latest: 'Latest from the blog', all: 'See all posts' },
  ko: { nav: '블로그', title: '블로그', intro: '알아두면 쓸모 있는 정보를 읽기 쉽게 정리했습니다.', empty: '첫 글을 준비하고 있습니다.', minRead: '{n}분 읽기', updated: '수정', toc: '목차', more: '다른 글', back: '전체 글', latest: '블로그 최신 글', all: '전체 글 보기' },
  ja: { nav: 'ブログ', title: 'ブログ', intro: '役に立つ情報を、読みやすくまとめました。', empty: '最初の記事を準備中です。', minRead: '{n}分で読めます', updated: '更新', toc: '目次', more: 'ほかの記事', back: '記事一覧', latest: 'ブログの新着記事', all: '記事一覧を見る' },
  es: { nav: 'Blog', title: 'Blog', intro: 'Guías prácticas e historias, escritas para leerse con facilidad.', empty: 'Los primeros artículos llegarán pronto.', minRead: '{n} min de lectura', updated: 'Actualizado', toc: 'En esta página', more: 'Más artículos', back: 'Todos los artículos', latest: 'Lo último del blog', all: 'Ver todos los artículos' },
  de: { nav: 'Blog', title: 'Blog', intro: 'Praktische Ratgeber und Geschichten – leicht zu lesen.', empty: 'Die ersten Beiträge folgen in Kürze.', minRead: '{n} Min. Lesezeit', updated: 'Aktualisiert', toc: 'Inhalt', more: 'Weitere Beiträge', back: 'Alle Beiträge', latest: 'Neu im Blog', all: 'Alle Beiträge ansehen' },
  fr: { nav: 'Blog', title: 'Blog', intro: 'Guides pratiques et récits, écrits pour être faciles à lire.', empty: 'Les premiers articles arrivent bientôt.', minRead: '{n} min de lecture', updated: 'Mis à jour', toc: 'Sommaire', more: 'Autres articles', back: 'Tous les articles', latest: 'Derniers articles du blog', all: 'Voir tous les articles' },
  'zh-hant': { nav: '部落格', title: '部落格', intro: '實用資訊與故事，整理得清楚好讀。', empty: '第一篇文章即將推出。', minRead: '閱讀約 {n} 分鐘', updated: '更新', toc: '目錄', more: '更多文章', back: '所有文章', latest: '部落格最新文章', all: '查看所有文章' },
  hi: { nav: 'ब्लॉग', title: 'ब्लॉग', intro: 'काम की जानकारी और कहानियाँ, आसान भाषा में।', empty: 'पहले लेख जल्द आ रहे हैं।', minRead: '{n} मिनट पढ़ें', updated: 'अपडेट', toc: 'इस लेख में', more: 'और लेख', back: 'सभी लेख', latest: 'ब्लॉग के नए लेख', all: 'सभी लेख देखें' },
};
