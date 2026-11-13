import React, { useState, useMemo } from 'react';
import {
  SEO_ARTICLES,
  SEO_CLUSTERS,
  type SeoArticle,
  type SeoClusterKey
} from '../data/seoArticlesData';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface SeoArticlesSectionProps {
  onOpenInquiry?: () => void;
}

const FEATURED_SLUGS = [
  'website-kaufen-graz',
  'website-agentur-graz',
  'website-fuer-handwerker-steiermark',
  'google-maps-ranking-verbessern-graz'
];

export const SeoArticlesSection: React.FC<SeoArticlesSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<'featured' | SeoClusterKey>('featured');

  const handleArticleClick = (article: SeoArticle) => {
    trackEvent('seo_article_clicked', {
      slug: article.slug,
      title: article.shortTitle
    });
  };

  const clusterCounts = useMemo(() => {
    const counts: Record<string, number> = { featured: FEATURED_SLUGS.length };
    for (const art of SEO_ARTICLES) {
      counts[art.cluster] = (counts[art.cluster] || 0) + 1;
    }
    return counts;
  }, []);

  const visibleArticles = useMemo(() => {
    if (activeTab === 'featured') {
      return SEO_ARTICLES.filter(a => FEATURED_SLUGS.includes(a.slug));
    }
    return SEO_ARTICLES.filter(a => a.cluster === activeTab);
  }, [activeTab]);

  const filterTabs: { key: 'featured' | SeoClusterKey; label: string }[] = [
    { key: 'featured', label: 'Empfohlen' },
    ...SEO_CLUSTERS.filter(c => c.key !== 'all').map(c => ({
      key: c.key as SeoClusterKey,
      label: c.label
    }))
  ];

  return (
    <section
      id="ratgeber"
      className="wit-section wit-wrap"
      aria-labelledby="ratgeber-heading"
      style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
    >
      <div className="wit-section-head" data-reveal>
        <p className="wit-overline">
          Ratgeber &amp; Praxiswissen ({SEO_ARTICLES.length} Guides) · Graz &amp; Steiermark
        </p>
        <h2 id="ratgeber-heading">
          Website kaufen, Branchen-Guides &amp; Local SEO für steirische Betriebe.
        </h2>
        <p className="wit-lead">
          Ausgewählte Entscheidungshilfen direkt auf einen Blick: Alle weiteren Themen zu{' '}
          <strong>Förderungen</strong>, <strong>Preisen</strong>, <strong>DSGVO</strong> und{' '}
          <strong>Google Maps Ranking</strong> findest du gesammelt in unserem Ratgeber-Hub.
        </p>
      </div>

      {/* Category Filter Pills (keeps homepage compact: max 2-4 cards visible) */}
      <div
        role="tablist"
        aria-label="Ratgeber nach Themen filtern"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.55rem',
          marginTop: '1.5rem'
        }}
      >
        {filterTabs.map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '999px',
                border: isActive
                  ? '1px solid var(--wit-accent)'
                  : '1px solid var(--border-subtle)',
                background: isActive ? 'var(--wit-accent)' : 'var(--bg-card)',
                color: isActive ? 'var(--wit-accent-ink)' : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  opacity: isActive ? 0.9 : 0.7
                }}
              >
                ({clusterCounts[tab.key] || 0})
              </span>
            </button>
          );
        })}
      </div>

      {/* Clean 2x2 Editorial Grid (never overloaded) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: '1.35rem',
          marginTop: '1.75rem'
        }}
      >
        {visibleArticles.map(article => (
          <article
            key={article.id}
            className="glass-panel"
            style={{
              padding: '1.6rem',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.1rem',
              border: '1px solid var(--border-subtle)',
              transition: 'transform 0.25s ease, border-color 0.25s ease'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  marginBottom: '0.75rem'
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '0.28rem 0.68rem',
                    borderRadius: '999px',
                    background: 'var(--wit-soft-tint)',
                    color: 'var(--wit-accent)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <BookOpen size={12} />
                  {article.category}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <Clock size={12} />
                  {article.readTime}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.16rem',
                  lineHeight: 1.34,
                  fontWeight: 800,
                  marginBottom: '0.65rem',
                  color: 'var(--text-pure)'
                }}
              >
                <a
                  href={article.url}
                  onClick={() => handleArticleClick(article)}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {article.title}
                </a>
              </h3>

              <p
                style={{
                  fontSize: '0.91rem',
                  lineHeight: 1.58,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.9rem'
                }}
              >
                {article.excerpt}
              </p>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 0.85rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}
              >
                {article.keyTakeaways.slice(0, 2).map((point, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.45rem',
                      fontSize: '0.83rem',
                      color: 'var(--text-pure)',
                      lineHeight: 1.42
                    }}
                  >
                    <CheckCircle2
                      size={14}
                      style={{ color: 'var(--wit-accent)', flexShrink: 0, marginTop: '2px' }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.65rem',
                paddingTop: '0.9rem',
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap'
              }}
            >
              <a
                href={article.url}
                onClick={() => handleArticleClick(article)}
                className="btn-primary-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>Kompletten Artikel lesen</span>
                <ArrowUpRight size={14} />
              </a>

              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                {article.keywords[0]}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Hub Overview Banner */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1.25rem 1.5rem',
          borderRadius: '18px',
          background: 'var(--wit-soft-tint)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap'
        }}
      >
        <div>
          <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--text-pure)' }}>
            Alle {SEO_ARTICLES.length} Praxis-Ratgeber im Wissens-Hub entdecken
          </strong>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Inklusive Guides zu Handwerk, Ärzten, KMU.DIGITAL-Förderungen, DSGVO ohne Cookies &amp; Graz-Umgebung.
          </span>
        </div>
        <a
          href="/ratgeber/"
          className="btn-secondary-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            textDecoration: 'none'
          }}
        >
          <span>Alle {SEO_ARTICLES.length} Ratgeber ansehen</span>
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
};
