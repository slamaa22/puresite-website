import articlesJson from './seoArticles.json';

export type SeoClusterKey =
  | 'kaufberatung'
  | 'branchen'
  | 'regional-seo'
  | 'technik-dsgvo';

export interface SeoArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  highlightBox?: {
    title: string;
    text: string;
  };
}

export interface SeoArticle {
  id: string;
  slug: string;
  url: string;
  cluster: SeoClusterKey;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  keyTakeaways: string[];
  sections: SeoArticleSection[];
  faq: {
    question: string;
    answer: string;
  }[];
  ctaTitle: string;
  ctaSub: string;
}

export const SEO_CLUSTERS: { key: 'all' | SeoClusterKey; label: string }[] = [
  { key: 'all', label: 'Alle Guides' },
  { key: 'kaufberatung', label: 'Kaufberatung & Preise' },
  { key: 'branchen', label: 'Branchen-Guides' },
  { key: 'regional-seo', label: 'Graz & Local SEO' },
  { key: 'technik-dsgvo', label: 'Technik & DSGVO' }
];

export const SEO_ARTICLES: SeoArticle[] = articlesJson as SeoArticle[];
