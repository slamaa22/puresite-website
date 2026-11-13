import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface FooterProps {
  theme?: 'dark' | 'light';
  onOpenLegal: (tab: 'impressum' | 'datenschutz') => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  theme = 'dark',
  onOpenLegal,
  onOpenContact
}) => {
  const [copiedMail, setCopiedMail] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyMail = async () => {
    try {
      await navigator.clipboard.writeText('maximilian.schlacher@outlook.com');
      setCopiedMail(true);
      setTimeout(() => setCopiedMail(false), 2200);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <footer className="ps-site-footer">
      <div className="ps-wrap ps-footer-grid" data-reveal>
        {/* Col 1: Brand & Tagline (PureSite Editorial Footer Rhythm) */}
        <div className="ps-footer-brand">
          <a
            href="#hero"
            className="ps-brand"
            onClick={e => {
              e.preventDefault();
              scrollToTop();
            }}
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
                  width={34}
                  height={34}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <span className="ps-brand-text">
              pure<span className="ps-brand-light">site</span>
            </span>
          </a>
          <p>
            Webdesign &amp; Webentwicklung für Graz, die Steiermark &amp; ganz Österreich.
            <br />
            Websites, die im Alltag neue Kunden gewinnen.
          </p>
        </div>

        {/* Col 2: Services & Modules */}
        <div>
          <p className="ps-overline">Leistungen &amp; Module</p>
          <ul>
            <li>
              <button type="button" onClick={() => scrollToSection('preise')}>
                Festpreis-Kalkulator (ab 1.000 €)
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('demos')}>
                18 interaktive Live-Demos
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('warum-wir')}>
                Speed-Lab &amp; Kostenvergleich
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('prozess')}>
                Zusammenarbeit &amp; 50/50 Zahlung
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('preise')}>
                Dedicated Hosting (inkl. 1h–3h Support)
              </button>
            </li>
            <li>
              <button type="button" onClick={() => scrollToSection('ratgeber')}>
                Ratgeber: Website kaufen &amp; Agentur Graz
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Direct Contact */}
        <div>
          <p className="ps-overline">Kontakt</p>
          <ul>
            <li className="ps-footer-mail-row">
              <a href="mailto:maximilian.schlacher@outlook.com">maximilian.schlacher@outlook.com</a>
              <button
                type="button"
                className="footer-copy-mail-btn"
                onClick={handleCopyMail}
                title="E-Mail-Adresse kopieren"
                aria-label="E-Mail-Adresse kopieren"
              >
                {copiedMail ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </li>
            <li className="ps-footer-phone-row">
              <a href="tel:+436766500468" style={{ color: 'inherit', textDecoration: 'none' }}>
                +43 676 6500468
              </a>
            </li>
            <li>
              <button type="button" onClick={onOpenContact}>
                Kostenlose Erstberatung anfragen ↗
              </button>
            </li>
            <li className="ps-footer-address">
              Maximilian Schlacher &amp; Loreno Zanaboni
              <br />
              Am Leopoldsgrund 19, 8055 Graz
            </li>
          </ul>
        </div>
      </div>

      <div className="ps-wrap ps-footer-bottom">
        <small>© 2026 PureSite Software Studio · Webdesign Graz &amp; Steiermark · Am Leopoldsgrund 19, 8055 Graz</small>
        <div>
          <button type="button" onClick={() => onOpenLegal('impressum')}>
            Impressum
          </button>
          <button type="button" onClick={() => onOpenLegal('datenschutz')}>
            Datenschutz
          </button>
        </div>
        <button type="button" className="ps-footer-top-link" onClick={scrollToTop}>
          Nach oben ↑
        </button>
      </div>
    </footer>
  );
};
