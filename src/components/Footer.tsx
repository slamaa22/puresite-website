import React, { useState } from 'react';
import { Terminal, Copy, Check, ArrowUp, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (tab: 'impressum' | 'datenschutz') => void;
  onOpenContact: () => void;
  onOpenTerminal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenLegal, 
  onOpenContact,
  onOpenTerminal 
}) => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText('curl -sL puresite.at/angebot');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="site-footer">
      <div className="section-shell footer-shell">
        <div className="footer-main-grid">
          {/* Brand Info & Mission */}
          <div className="footer-about-col">
            <a href="#hero" className="footer-mark" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
              <span className="brand-prompt">$</span>
              <span>PureSite</span>
            </a>
            <p className="footer-bio">
              Handgeschriebene, hochperformante Websites für Betriebe aus der Steiermark und ganz Österreich. Keine WordPress-Baukästen, keine versteckten Kosten.
            </p>
            <div className="footer-place">
              46°59'N 15°26'E · HTL Kaindorf Alumni · Graz & Steiermark
            </div>

            {/* Terminal Curl Box (Signature Johannes Grof) */}
            <div className="footer-terminal-box">
              <div className="curl-row">
                <code><span>$</span> curl -sL puresite.at/angebot</code>
                <button 
                  className="curl-copy-btn" 
                  onClick={handleCopyCurl} 
                  title="Befehl kopieren"
                  aria-label="Curl Befehl kopieren"
                >
                  {copied ? <Check size={13} className="text-signal-green" /> : <Copy size={13} />}
                </button>
              </div>
              {onOpenTerminal && (
                <button className="footer-term-open-btn" onClick={onOpenTerminal}>
                  <Terminal size={12} />
                  <span>Terminal öffnen (Taste ~)</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav-col">
            <h5 className="footer-col-title">Navigation</h5>
            <ul className="footer-links-list">
              <li><button onClick={() => scrollToSection('hero')}>Startseite</button></li>
              <li><button onClick={() => scrollToSection('preise')}>Modul-Kalkulator</button></li>
              <li><button onClick={() => scrollToSection('demos')}>18 Live-Demos</button></li>
              <li><button onClick={() => scrollToSection('warum-wir')}>Warum PureSite?</button></li>
              <li><button onClick={() => scrollToSection('ueber-uns')}>Über uns</button></li>
              <li><button onClick={() => scrollToSection('prozess')}>Ablauf</button></li>
              <li><button onClick={() => scrollToSection('faq')}>Häufige Fragen</button></li>
            </ul>
          </div>

          {/* Module Categories */}
          <div className="footer-nav-col">
            <h5 className="footer-col-title">Module</h5>
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
            <h5 className="footer-col-title">Kontakt</h5>
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

        {/* Bottom Bar with Heartbeat and Back to Top */}
        <div className="footer-bottom-bar">
          <div className="footer-love-text">
            Handcrafted with <Heart size={13} className="footer-heart-icon" /> by Maximilian Schlacher & Loreno Zanaboni in der Steiermark, Österreich.
          </div>
          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Nach oben springen">
            <span>Zurück nach oben</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
