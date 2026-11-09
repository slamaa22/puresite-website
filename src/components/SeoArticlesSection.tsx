import React from 'react';
import { SEO_ARTICLES, type SeoArticle } from '../data/seoArticlesData';
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
  const handleArticleClick = (article: SeoArticle) => {
    trackEvent('seo_article_clicked', {
      slug: article.slug,
      title: article.shortTitle
    });
  };

  return (
    <section
      id="ratgeber"
      className="wit-section wit-wrap"
      aria-labelledby="ratgeber-heading"
      style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
    >
      <div className="wit-section-head" data-reveal>
        <p className="wit-overline">Ratgeber &amp; Entscheidungshilfe · Graz &amp; Steiermark</p>
        <h2 id="ratgeber-heading">
          Website kaufen oder Agentur in Graz beauftragen? Unser Praxis-Ratgeber 2026.
        </h2>
        <p className="wit-lead">
          Transparente Antworten für steirische Betriebe: Worauf du achten musst, wenn du in Graz
          eine <strong>Website kaufen</strong> möchtest, wie sich eine klassische{' '}
          <strong>Website Agentur in Graz</strong> von einem modernen Software Studio unterscheidet
          und was eine professionelle Homepage 2026 wirklich kostet.
        </p>
      </div>

      {/* 4 SEO Pillar Articles Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: '1.5rem',
          marginTop: '2.25rem'
        }}
      >
        {SEO_ARTICLES.map(article => (
          <article
            key={article.id}
            className="glass-panel"
            style={{
              padding: '1.75rem',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
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
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  marginBottom: '0.85rem'
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    background: 'var(--wit-soft-tint)',
                    color: 'var(--wit-accent)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <BookOpen size={13} />
                  {article.category}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <Clock size={13} />
                  {article.readTime}
                </span>
              </div>

              {/* Heading linked directly to standalone subpage */}
              <h3
                style={{
                  fontSize: '1.22rem',
                  lineHeight: 1.35,
                  fontWeight: 800,
                  marginBottom: '0.75rem',
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
                  fontSize: '0.94rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  marginBottom: '1rem'
                }}
              >
                {article.excerpt}
              </p>

              {/* Key Takeaways Preview */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 1rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem'
                }}
              >
                {article.keyTakeaways.slice(0, 3).map((point, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-pure)',
                      lineHeight: 1.45
                    }}
                  >
                    <CheckCircle2
                      size={15}
                      style={{ color: 'var(--wit-accent)', flexShrink: 0, marginTop: '2px' }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Keyword Pills */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginTop: '0.5rem'
                }}
              >
                {article.keywords.slice(0, 4).map(kw => (
                  <span
                    key={kw}
                    style={{
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.55rem',
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
                gap: '0.75rem',
                paddingTop: '1rem',
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
                  gap: '0.45rem',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>Kompletten Artikel lesen</span>
                <ArrowUpRight size={15} />
              </a>

              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Direkter Ratgeber-Guide
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
            Alle Themen im Überblick
          </strong>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Besuche unsere Wissens-Zentrale für Webdesign &amp; Programmierung in Graz.
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
          <span>Alle Ratgeber anzeigen</span>
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
};
