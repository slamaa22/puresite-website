import React, { useState, useEffect } from 'react';
import { SEO_ARTICLES, type SeoArticle } from '../data/seoArticlesData';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  X,
  Calculator,
  Send,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface SeoArticlesSectionProps {
  onOpenInquiry: () => void;
}

export const SeoArticlesSection: React.FC<SeoArticlesSectionProps> = ({ onOpenInquiry }) => {
  const [activeArticle, setActiveArticle] = useState<SeoArticle | null>(null);

  useEffect(() => {
    if (!activeArticle) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeArticle]);

  const scrollToCalculator = () => {
    setActiveArticle(null);
    const el = document.getElementById('preise');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenArticle = (article: SeoArticle) => {
    setActiveArticle(article);
    trackEvent('seo_article_opened', {
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
              border: '1px solid rgba(255, 255, 255, 0.09)',
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
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    background: 'rgba(88, 252, 165, 0.12)',
                    color: 'var(--pure-mint)',
                    border: '1px solid rgba(88, 252, 165, 0.25)'
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

              {/* Heading linked to standalone crawlable URL + click handler */}
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
                  onClick={e => {
                    e.preventDefault();
                    handleOpenArticle(article);
                  }}
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
                      style={{ color: 'var(--pure-mint)', flexShrink: 0, marginTop: '2px' }}
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
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                flexWrap: 'wrap'
              }}
            >
              <button
                type="button"
                className="btn-primary-sm"
                onClick={() => handleOpenArticle(article)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer'
                }}
              >
                <span>Kompletten Artikel lesen</span>
                <ArrowUpRight size={15} />
              </button>

              <a
                href={article.url}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none'
                }}
                title={article.title}
              >
                <span>Direktlink</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal for Full SEO Article */}
      {activeArticle && (
        <div
          className="demo-modal-overlay"
          onClick={() => setActiveArticle(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="seo-reader-title"
        >
          <div
            className="glass-panel modal-enter-anim"
            onClick={e => e.stopPropagation()}
            style={{
              width: 'min(880px, 94vw)',
              maxHeight: '88vh',
              overflowY: 'auto',
              borderRadius: '24px',
              padding: 'clamp(1.25rem, 3.5vw, 2.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              position: 'relative'
            }}
          >
            {/* Sticky Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '1.5rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    flexWrap: 'wrap',
                    marginBottom: '0.6rem'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                      background: 'rgba(88, 252, 165, 0.14)',
                      color: 'var(--pure-mint)'
                    }}
                  >
                    {activeArticle.category}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {activeArticle.readTime} · Aktualisiert: November 2026
                  </span>
                </div>
                <h2
                  id="seo-reader-title"
                  style={{
                    fontSize: 'clamp(1.3rem, 2.6vw, 1.85rem)',
                    lineHeight: 1.28,
                    fontWeight: 800,
                    color: 'var(--text-pure)',
                    margin: 0
                  }}
                >
                  {activeArticle.title}
                </h2>
              </div>

              <button
                type="button"
                className="demo-close-btn"
                onClick={() => setActiveArticle(null)}
                aria-label="Artikel schließen"
              >
                <X size={20} />
              </button>
            </div>

            {/* Key Takeaways Box */}
            <div
              style={{
                background: 'rgba(88, 252, 165, 0.06)',
                border: '1px solid rgba(88, 252, 165, 0.22)',
                borderRadius: '16px',
                padding: '1.25rem 1.4rem',
                marginBottom: '2rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  color: 'var(--pure-mint)',
                  marginBottom: '0.75rem'
                }}
              >
                <Sparkles size={16} />
                <span>Das Wichtigste in Kürze</span>
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gap: '0.5rem'
                }}
              >
                {activeArticle.keyTakeaways.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.55rem',
                      fontSize: '0.9rem',
                      color: 'var(--text-pure)',
                      lineHeight: 1.5
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      style={{ color: 'var(--pure-mint)', flexShrink: 0, marginTop: '3px' }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.85rem' }}>
              {activeArticle.sections.map((sec, idx) => (
                <div key={idx}>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: 'var(--text-pure)',
                      marginBottom: '0.75rem',
                      lineHeight: 1.35
                    }}
                  >
                    {sec.heading}
                  </h3>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      style={{
                        fontSize: '0.96rem',
                        lineHeight: 1.7,
                        color: 'var(--text-secondary)',
                        marginBottom: '0.85rem'
                      }}
                    >
                      {p}
                    </p>
                  ))}

                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul
                      style={{
                        paddingLeft: '1.2rem',
                        margin: '0.75rem 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}
                    >
                      {sec.bullets.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          style={{
                            fontSize: '0.93rem',
                            lineHeight: 1.6,
                            color: 'var(--text-pure)'
                          }}
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.highlightBox && (
                    <div
                      style={{
                        marginTop: '1rem',
                        padding: '1.1rem 1.25rem',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderLeft: '3px solid var(--pure-mint)'
                      }}
                    >
                      <strong
                        style={{
                          display: 'block',
                          fontSize: '0.92rem',
                          color: 'var(--text-pure)',
                          marginBottom: '0.3rem'
                        }}
                      >
                        {sec.highlightBox.title}
                      </strong>
                      <span
                        style={{
                          fontSize: '0.88rem',
                          lineHeight: 1.55,
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {sec.highlightBox.text}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Article-specific FAQ */}
            {activeArticle.faq.length > 0 && (
              <div
                style={{
                  marginTop: '2.25rem',
                  paddingTop: '1.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--text-pure)',
                    marginBottom: '1rem'
                  }}
                >
                  Häufige Fragen zum Thema
                </h3>
                <div style={{ display: 'grid', gap: '0.9rem' }}>
                  {activeArticle.faq.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '1rem 1.15rem',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.07)'
                      }}
                    >
                      <strong
                        style={{
                          display: 'block',
                          fontSize: '0.94rem',
                          color: 'var(--text-pure)',
                          marginBottom: '0.4rem'
                        }}
                      >
                        {f.question}
                      </strong>
                      <p
                        style={{
                          fontSize: '0.88rem',
                          lineHeight: 1.6,
                          color: 'var(--text-secondary)',
                          margin: 0
                        }}
                      >
                        {f.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conversion CTA Footer inside Modal */}
            <div
              style={{
                marginTop: '2.25rem',
                padding: '1.5rem',
                borderRadius: '18px',
                background:
                  'linear-gradient(135deg, rgba(88, 252, 165, 0.12), rgba(56, 189, 248, 0.08))',
                border: '1px solid rgba(88, 252, 165, 0.28)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: '1.12rem',
                    fontWeight: 800,
                    color: 'var(--text-pure)',
                    margin: '0 0 0.35rem 0'
                  }}
                >
                  {activeArticle.ctaTitle}
                </h4>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.5
                  }}
                >
                  {activeArticle.ctaSub}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="btn-primary-sm"
                  onClick={scrollToCalculator}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer'
                  }}
                >
                  <Calculator size={16} />
                  <span>Jetzt im Festpreis-Rechner kalkulieren</span>
                </button>

                <button
                  type="button"
                  className="btn-secondary-sm"
                  onClick={() => {
                    setActiveArticle(null);
                    onOpenInquiry();
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer'
                  }}
                >
                  <Send size={15} />
                  <span>Unverbindliches Angebot anfordern</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
