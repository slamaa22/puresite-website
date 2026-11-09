import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
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

            {/* Footer actions */}
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

      {/* Portaled Reader Modal (sits above navbar & floating pills, opaque in both Light & Dark Mode) */}
      {activeArticle &&
        createPortal(
          <div
            className="demo-modal-overlay"
            onClick={() => setActiveArticle(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="seo-reader-title"
          >
            <div
              className="legal-modal-container glass-panel modal-enter-anim"
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '860px',
                width: 'min(860px, 94vw)',
                maxHeight: '88vh'
              }}
            >
              {/* Fixed Modal Header */}
              <div className="demo-modal-header">
                <div className="demo-header-left">
                  <span className="demo-code-badge">{activeArticle.category}</span>
                  <div>
                    <div className="demo-category-tag">
                      {activeArticle.readTime} · Aktualisiert: November 2026
                    </div>
                    <h2 id="seo-reader-title" className="demo-modal-title">
                      {activeArticle.title}
                    </h2>
                  </div>
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

              {/* Scrollable Modal Body */}
              <div className="legal-modal-body" style={{ padding: '1.65rem' }}>
                {/* Key Takeaways Box */}
                <div
                  style={{
                    background: 'var(--wit-soft-tint)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: '16px',
                    padding: '1.25rem 1.4rem',
                    marginBottom: '1.85rem'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      color: 'var(--wit-accent)',
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
                          style={{ color: 'var(--wit-accent)', flexShrink: 0, marginTop: '3px' }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Article Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  {activeArticle.sections.map((sec, idx) => (
                    <div key={idx}>
                      <h3
                        style={{
                          fontSize: '1.16rem',
                          fontWeight: 800,
                          color: 'var(--text-pure)',
                          marginBottom: '0.65rem',
                          lineHeight: 1.35
                        }}
                      >
                        {sec.heading}
                      </h3>
                      {sec.paragraphs.map((p, pIdx) => (
                        <p
                          key={pIdx}
                          style={{
                            fontSize: '0.95rem',
                            lineHeight: 1.68,
                            color: 'var(--text-secondary)',
                            marginBottom: '0.8rem'
                          }}
                        >
                          {p}
                        </p>
                      ))}

                      {sec.bullets && sec.bullets.length > 0 && (
                        <ul
                          style={{
                            paddingLeft: '1.2rem',
                            margin: '0.65rem 0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.45rem'
                          }}
                        >
                          {sec.bullets.map((b, bIdx) => (
                            <li
                              key={bIdx}
                              style={{
                                fontSize: '0.92rem',
                                lineHeight: 1.58,
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
                            marginTop: '0.95rem',
                            padding: '1.05rem 1.2rem',
                            borderRadius: '14px',
                            background: 'var(--bg-tertiary)',
                            borderLeft: '3px solid var(--wit-accent)'
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
                      marginTop: '2rem',
                      paddingTop: '1.6rem',
                      borderTop: '1px solid var(--border-subtle)'
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1.12rem',
                        fontWeight: 800,
                        color: 'var(--text-pure)',
                        marginBottom: '0.95rem'
                      }}
                    >
                      Häufige Fragen zum Thema
                    </h3>
                    <div style={{ display: 'grid', gap: '0.8rem' }}>
                      {activeArticle.faq.map((f, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '1rem 1.15rem',
                            borderRadius: '12px',
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-subtle)'
                          }}
                        >
                          <strong
                            style={{
                              display: 'block',
                              fontSize: '0.93rem',
                              color: 'var(--text-pure)',
                              marginBottom: '0.35rem'
                            }}
                          >
                            {f.question}
                          </strong>
                          <p
                            style={{
                              fontSize: '0.88rem',
                              lineHeight: 1.58,
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
                    marginTop: '2rem',
                    padding: '1.45rem',
                    borderRadius: '18px',
                    background: 'var(--wit-soft-tint)',
                    border: '1px solid var(--border-medium)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.95rem'
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: 'var(--text-pure)',
                        margin: '0 0 0.3rem 0'
                      }}
                    >
                      {activeArticle.ctaTitle}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.89rem',
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
          </div>,
          document.body
        )}
    </section>
  );
};
