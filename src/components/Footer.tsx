import React from 'react';
import { ArrowUp, Mail, MapPin, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (tab: 'impressum' | 'datenschutz') => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenLegal, 
  onOpenContact
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="section-shell footer-shell">
        <div className="footer-main-grid">
          {/* Brand Info & Mission */}
          <div className="footer-about-col">
            <a href="#hero" className="footer-mark" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
              <div className="brand-logo-icon" aria-hidden="true">
                <picture>
                  <source srcSet="/assets/puresite-logo-nav.webp" type="image/webp" />
                  <img 
                    src="/assets/puresite-logo.png" 
                    alt="PureSite Logo" 
                    className="brand-logo-img" 
                    width={28} 
                    height={28} 
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <span className="brand-title">PureSite</span>
            </a>
            <p className="footer-bio">
              Handgeschriebene, hochperformante Websites für Betriebe aus der Steiermark und ganz Österreich. Keine WordPress-Baukästen, keine versteckten Kosten.
            </p>
            <div className="footer-place">
              46°59'N 15°26'E · Steiermark, Österreich · NVMe Hosting
            </div>

            <div className="footer-action-box">
              <button className="button primary sm-button" onClick={onOpenContact}>
                <Sparkles size={14} />
                <span>Projekt direkt anfragen</span>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav-col">
            <h3 className="footer-col-title">Navigation</h3>
            <ul className="footer-links-list">
              <li><button onClick={() => scrollToSection('hero')}>Startseite</button></li>
              <li><button onClick={() => scrollToSection('preise')}>Modul-Kalkulator</button></li>
              <li><button onClick={() => scrollToSection('demos')}>18 Live-Demos</button></li>
              <li><button onClick={() => scrollToSection('speed-lab')}>Speed-Lab</button></li>
              <li><button onClick={() => scrollToSection('warum-wir')}>Warum PureSite?</button></li>
              <li><button onClick={() => scrollToSection('ueber-uns')}>Über uns</button></li>
              <li><button onClick={() => scrollToSection('prozess')}>Ablauf</button></li>
              <li><button onClick={() => scrollToSection('faq')}>Häufige Fragen</button></li>
            </ul>
          </div>

          {/* Module Categories */}
          <div className="footer-nav-col">
            <h3 className="footer-col-title">Module</h3>
            <ul className="footer-links-list">
              <li><button onClick={() => scrollToSection('preise')}>Basis-Pakete (B-01 bis B-03)</button></li>
              <li><button onClick={() => scrollToSection('preise')}>Interaktive Rechner (F-01)</button></li>
              <li><button onClick={() => scrollToSection('preise')}>Design-Switcher (F-04)</button></li>
              <li><button onClick={() => scrollToSection('preise')}>Online-Terminbuchung (T-03)</button></li>
              <li><button onClick={() => scrollToSection('preise')}>Headless CMS (T-01)</button></li>
              <li><button onClick={() => scrollToSection('preise')}>NVMe-Hosting Österreich (M-01)</button></li>
            </ul>
          </div>

          {/* Contact & Direct Line */}
          <div className="footer-nav-col">
            <h3 className="footer-col-title">Kontakt</h3>
            <div className="footer-contact-details">
              <div className="contact-line">
                <Mail size={14} className="text-signal" />
                <a href="mailto:office@puresite.at">office@puresite.at</a>
              </div>
              <div className="contact-line">
                <MapPin size={14} className="text-signal" />
                <span>Kaindorf / Graz, Steiermark</span>
              </div>
            </div>

            <div className="footer-legal-bar">
              <button onClick={() => onOpenLegal('impressum')}>Impressum</button>
              <span className="dot-sep">·</span>
              <button onClick={() => onOpenLegal('datenschutz')}>Datenschutz (DSGVO)</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-love-text">
            Handcrafted with <Heart size={13} className="footer-heart-icon" /> by Maximilian Schlacher & Loreno Zanaboni in der Steiermark, Österreich.
          </div>
          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Zurück nach oben">
            <span>Zurück nach oben</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
