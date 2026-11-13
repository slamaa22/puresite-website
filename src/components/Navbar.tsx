import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  theme?: 'dark' | 'light';
  onOpenContact: () => void;
  onOpenLegal: (tab: 'impressum' | 'datenschutz') => void;
  configuredCount?: number;
  onSelectCatalogCategory?: (catId: string) => void;
}

const SECTION_IDS = ['demos', 'warum-wir', 'preise', 'prozess', 'ueber-uns', 'ratgeber', 'faq'] as const;

const SERVICE_MENU_ITEMS = [
  {
    id: 'basis',
    label: 'Basis-Websites & Corporate Design',
    sub: 'Ab 1.000 € Festpreis'
  },
  {
    id: 'frontend',
    label: 'Interaktive Rechner & 60fps UI',
    sub: 'Live-Kalkulatoren & Motion'
  },
  {
    id: 'tech',
    label: 'Admin-Dashboard & Terminbuchung',
    sub: 'Eigenes CMS & Bewerber-Funnel'
  },
  {
    id: 'content',
    label: 'Copywriting, Google Maps & SEO',
    sub: 'Regionale Sichtbarkeit'
  },
  {
    id: 'hosting',
    label: 'Dedicated Hosting & Zuruf-Support',
    sub: 'Inkl. 1h bis 3h Änderungen/Monat'
  }
];

export const Navbar: React.FC<NavbarProps> = ({
  theme = 'light',
  onOpenLegal,
  configuredCount = 0,
  onSelectCatalogCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const servicesDropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  // Zero-rerender GPU scroll progress laser bar
  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const el = progressBarRef.current;
      if (!el) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      el.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Active section spy via IntersectionObserver
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-26% 0px -55% 0px',
        threshold: 0
      }
    );

    const attachSections = () => {
      SECTION_IDS.forEach(id => {
        const node = document.getElementById(id);
        if (node) io.observe(node);
      });
    };

    attachSections();
    const timer = setTimeout(attachSections, 650);

    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (
        servicesDropdownRef.current &&
        e.target instanceof Node &&
        !servicesDropdownRef.current.contains(e.target)
      ) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catId: string) => {
    if (onSelectCatalogCategory) {
      onSelectCatalogCategory(catId);
    }
    scrollTo('demos');
  };

  const handleServicesEnter = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setServicesOpen(true);
    }
  };

  const handleServicesLeave = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 160);
  };

  return (
    <header className="site-header ps-glass-header">
      <div className="ps-header-inner ps-wrap">
        {/* PureSite Brand Lockup */}
        <a
          href="#hero"
          className="ps-brand"
          onClick={e => {
            e.preventDefault();
            scrollTo('hero');
          }}
          aria-label="PureSite — Startseite"
        >
          <div className="brand-logo-icon" aria-hidden="true">
            <picture>
              <source
                srcSet={
                  theme === 'light'
                    ? '/assets/puresite-logo-dark-stroke-nav.webp'
                    : '/assets/puresite-logo-nav.webp'
                }
                type="image/webp"
              />
              <img
                src={
                  theme === 'light'
                    ? '/assets/puresite-logo-dark-stroke.png'
                    : '/assets/puresite-logo.png'
                }
                alt="PureSite Logo"
                className="brand-logo-img"
                width={38}
                height={38}
                fetchPriority="high"
                decoding="async"
                onError={e => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/puresite-logo.png';
                }}
              />
            </picture>
          </div>
          <span className="ps-brand-text">
            pure<span className="ps-brand-light">site</span>
            <small className="ps-brand-subtitle">SOFTWARE STUDIO</small>
          </span>
        </a>

        {/* Desktop Navigation (PureSite Header + Liquid Glass Dropdown) */}
        <nav className="ps-desktop-nav" aria-label="Hauptnavigation">
          <div
            ref={servicesDropdownRef}
            className="ps-nav-services"
            data-open={servicesOpen}
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            <div className="ps-nav-services-heading">
              <button
                type="button"
                className={`ps-nav-link ${activeSection === 'demos' ? 'is-active' : ''}`}
                onClick={() => scrollTo('demos')}
              >
                Leistungen &amp; Demos
              </button>
              <button
                type="button"
                className="ps-services-toggle"
                aria-label={servicesOpen ? 'Leistungen schließen' : 'Leistungen öffnen'}
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen(prev => !prev)}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>

            <div className="ps-services-dropdown" aria-hidden={!servicesOpen}>
              <div className="ps-services-dropdown-panel lg-glass-popover">
                <ul>
                  {SERVICE_MENU_ITEMS.map(item => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="ps-dropdown-item"
                        onClick={() => handleSelectCategory(item.id)}
                      >
                        <span className="ps-dropdown-copy">
                          <strong>{item.label}</strong>
                          <small>{item.sub}</small>
                        </span>
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M4 12h16M13 5l7 7-7 7" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="ps-services-overview"
                  onClick={() => handleSelectCategory('all')}
                >
                  <span>Alle 18 Module &amp; Live-Demos ansehen</span>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12h16M13 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`ps-nav-link ${activeSection === 'warum-wir' ? 'is-active' : ''}`}
            onClick={() => scrollTo('warum-wir')}
          >
            Praxis &amp; Technik
          </button>

          <button
            type="button"
            className={`ps-nav-link ${activeSection === 'preise' ? 'is-active' : ''}`}
            onClick={() => scrollTo('preise')}
          >
            Festpreis-Rechner
          </button>

          <button
            type="button"
            className={`ps-nav-link ${activeSection === 'prozess' ? 'is-active' : ''}`}
            onClick={() => scrollTo('prozess')}
          >
            Zusammenarbeit
          </button>

          <button
            type="button"
            className={`ps-nav-link ${activeSection === 'ueber-uns' ? 'is-active' : ''}`}
            onClick={() => scrollTo('ueber-uns')}
          >
            Über uns
          </button>

          <button
            type="button"
            className={`ps-nav-link ${activeSection === 'ratgeber' ? 'is-active' : ''}`}
            onClick={() => scrollTo('ratgeber')}
          >
            Ratgeber
          </button>
        </nav>

        {/* Right Controls */}
        <div className="ps-header-controls">
          <button
            type="button"
            className="ps-btn ps-btn-small ps-header-cta"
            onClick={() => scrollTo('preise')}
          >
            <span>
              Kalkulator
              {configuredCount > 0 && (
                <em className="ps-cta-badge" title={`${configuredCount} Module gewählt`}>
                  {configuredCount}
                </em>
              )}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
          </button>

          <button
            type="button"
            className="ps-icon-button ps-menu-toggle"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Sub-pixel Refractive Scroll Progress Laser */}
      <div className="scroll-laser-track" aria-hidden="true">
        <div ref={progressBarRef} className="scroll-laser-fill" />
      </div>

      {/* PureSite Mobile Navigation Drawer in Frosted Liquid Glass */}
      {mobileMenuOpen && (
        <nav className="ps-mobile-nav lg-glass-popover" aria-label="Mobile Navigation">
          <button
            type="button"
            className="ps-mobile-main-link"
            onClick={() => scrollTo('demos')}
          >
            <span>Leistungen &amp; 18 Live-Demos</span>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
          </button>

          <ul className="ps-mobile-sublinks">
            {SERVICE_MENU_ITEMS.map(item => (
              <li key={item.id}>
                <button type="button" onClick={() => handleSelectCategory(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="ps-mobile-main-link"
            onClick={() => scrollTo('warum-wir')}
          >
            <span>Praxis, Speed-Lab &amp; Vergleich</span>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
          </button>

          <button
            type="button"
            className="ps-mobile-main-link"
            onClick={() => scrollTo('preise')}
          >
            <span>Festpreis-Kalkulator ({configuredCount} aktiv)</span>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
          </button>

          <button
            type="button"
            className="ps-mobile-main-link"
            onClick={() => scrollTo('prozess')}
          >
            <span>Zusammenarbeit &amp; Ablauf</span>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
          </button>

          <button
            type="button"
            className="ps-mobile-main-link"
            onClick={() => scrollTo('ueber-uns')}
          >
            <span>Über uns (Maximilian &amp; Loreno)</span>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
          </button>

          <button
            type="button"
            className="ps-mobile-main-link"
            onClick={() => scrollTo('faq')}
          >
            <span>Häufige Fragen</span>
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
          </button>

          <div className="ps-mobile-legal-row">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLegal('impressum');
              }}
            >
              Impressum
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLegal('datenschutz');
              }}
            >
              Datenschutz
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
