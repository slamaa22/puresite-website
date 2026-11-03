import React from 'react';
import { Code2, ArrowUp, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (tab: 'impressum' | 'datenschutz') => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top-grid">
          {/* Brand info */}
          <div className="footer-col brand-col">
            <div className="navbar-brand">
              <div className="brand-logo-icon">
                <img src="/assets/puresite-logo.png" alt="PureSite Logo" className="brand-logo-img" />
              </div>
              <div className="brand-text-wrap">
                <span className="brand-name">Pure<span className="gradient-text">Site</span></span>
                <span className="brand-sub">Webdesign & Software</span>
              </div>
            </div>
            <p className="footer-desc">
              Wir bauen modulare, rasend schnelle Websites für moderne Betriebe. 100% Code-Qualität, keine leeren Agentur-Versprechen.
            </p>
            <div className="footer-austria-badge">
              <span>🇦🇹</span>
              <span>Webdesign & Softwareentwicklung aus der Steiermark</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h5 className="footer-heading">Navigation</h5>
            <ul className="footer-nav-list">
              <li><button onClick={() => scrollToSection('hero')}>Startseite</button></li>
              <li><button onClick={() => scrollToSection('preise')}>Modul-Preisliste & Demos</button></li>
              <li><button onClick={() => scrollToSection('warum-wir')}>Warum PureSite?</button></li>
              <li><button onClick={() => scrollToSection('ueber-uns')}>Über uns</button></li>
              <li><button onClick={() => scrollToSection('prozess')}>Projekt-Ablauf</button></li>
              <li><button onClick={() => scrollToSection('faq')}>Häufige Fragen (FAQ)</button></li>
            </ul>
          </div>

          {/* Module Categories */}
          <div className="footer-col">
            <h5 className="footer-heading">Modul-Katalog</h5>
            <ul className="footer-nav-list">
              <li><button onClick={() => scrollToSection('preise')}>1. Basis-Pakete (One-Pager & Business)</button></li>
              <li><button onClick={() => scrollToSection('preise')}>2. Frontend (Rechner & Animationen)</button></li>
              <li><button onClick={() => scrollToSection('preise')}>3. Backend (Headless CMS & Funnel)</button></li>
              <li><button onClick={() => scrollToSection('preise')}>4. Content (Copywriting & SEO)</button></li>
              <li><button onClick={() => scrollToSection('preise')}>5. Wartung (NVMe-Hosting & Pro Support)</button></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="footer-col">
            <h5 className="footer-heading">Kontakt & Rechtliches</h5>
            <div className="footer-contact-items">
              <div className="contact-item">
                <Mail size={16} className="text-cyan" />
                <a href="mailto:office@puresite.at">office@puresite.at</a>
              </div>
              <div className="contact-item">
                <MapPin size={16} className="text-cyan" />
                <span>Kaindorf, Steiermark, Österreich</span>
              </div>
            </div>

            <div className="footer-legal-links mt-3">
              <button onClick={() => onOpenLegal('impressum')}>Impressum</button>
              <span className="dot-sep">·</span>
              <button onClick={() => onOpenLegal('datenschutz')}>Datenschutz (DSGVO)</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {new Date().getFullYear()} PureSite – Alle Rechte vorbehalten. Handcrafted with modern React & TypeScript.
          </div>
          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Nach oben scrollen">
            <span>Nach oben</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
