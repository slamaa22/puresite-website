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

export const SeoArticlesSection: React.FC<SeoArticlesSectionProps> = () => {
  const [activeCluster, setActiveCluster] = useState<'all' | SeoClusterKey>('all');

  const handleArticleClick = (article: SeoArticle) => {
    trackEvent('seo_article_clicked', {
      slug: article.slug,
      title: article.shortTitle
    });
  };

  const clusterCounts = useMemo(() => {
    const counts: Record<string, number> = { all: SEO_ARTICLES.length };
    for (const art of SEO_ARTICLES) {
      counts[art.cluster] = (counts[art.cluster] || 0) + 1;
    }
    return counts;
  }, []);

  const visibleArticles = useMemo(() => {
    if (activeCluster === 'all') return SEO_ARTICLES;
    return SEO_ARTICLES.filter(a => a.cluster === activeCluster);
  }, [activeCluster]);

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
          Transparente Entscheidungshilfen für KMU, Handwerk, Praxen und Dienstleister in Graz &amp;
          der Steiermark: Alles über Festpreise, <strong>Förderungen (KMU.DIGITAL / SFG)</strong>,{' '}
          <strong>Google Maps Ranking</strong>, DSGVO ohne Cookie-Banner und moderne{' '}
          <strong>WordPress-Alternativen</strong>.
        </p>
      </div>

      {/* Category Filter Pills */}
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
        {SEO_CLUSTERS.map(cluster => {
          const isActive = activeCluster === cluster.key;
          return (
            <button
              key={cluster.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCluster(cluster.key)}
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
              <span>{cluster.label}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  opacity: isActive ? 0.9 : 0.7
                }}
              >
                ({clusterCounts[cluster.key] || 0})
              </span>
            </button>
          );
        })}
      </div>

      {/* Balanced 3-Column SEO Articles Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '1.25rem',
          marginTop: '1.75rem'
        }}
      >
        {visibleArticles.map(article => (
          <article
            key={article.id}
            className="glass-panel"
            style={{
              padding: '1.45rem',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              border: '1px solid var(--border-subtle)',
              transition: 'transform 0.25s ease, border-color 0.25s ease'
            }}
          >
            <div>
              {/* Meta bar */}
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
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '0.25rem 0.65rem',
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
                    fontSize: '0.76rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <Clock size={12} />
                  {article.readTime}
                </span>
              </div>

              {/* Heading linked directly to standalone subpage */}
              <h3
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.32,
                  fontWeight: 800,
                  marginBottom: '0.6rem',
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

              {/* Excerpt */}
              <p
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.55,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.85rem'
                }}
              >
                {article.excerpt}
              </p>

              {/* Top 2 Key Takeaways */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 0.75rem 0',
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
                      fontSize: '0.81rem',
                      color: 'var(--text-pure)',
                      lineHeight: 1.4
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

              {/* Top Keyword Pills */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.35rem',
                  marginTop: '0.45rem'
                }}
              >
                {article.keywords.slice(0, 3).map(kw => (
                  <span
                    key={kw}
                    style={{
                      fontSize: '0.69rem',
                      padding: '0.18rem 0.5rem',
                      borderRadius: '6px',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Link Action Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.65rem',
                paddingTop: '0.85rem',
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
                <span>Artikel lesen</span>
                <ArrowUpRight size={14} />
              </a>

              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Praxis-Guide
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
            Alle {SEO_ARTICLES.length} Praxis-Ratgeber im Wissens-Hub
          </strong>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Besuche unsere zentrale Themen-Übersicht für Webdesign, Preise, Förderungen &amp; Local SEO in Graz.
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
          <span>Zum Ratgeber-Hub (/ratgeber/)</span>
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
};
