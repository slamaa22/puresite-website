import React, { useState } from 'react';
import { ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenContact: () => void;
  onOpenLegal: (tab: 'impressum' | 'datenschutz') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenContact,
  onOpenLegal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="site-header-bar">
        {/* Brand */}
        <a 
          href="#hero" 
          className="brand" 
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
          aria-label="PureSite Home"
        >
          <div className="brand-logo-icon" aria-hidden="true">
            <picture>
              <source 
                srcSet={theme === 'light' ? '/assets/puresite-logo-dark-stroke-nav.webp' : '/assets/puresite-logo-nav.webp'} 
                type="image/webp" 
              />
              <img 
                src={theme === 'light' ? '/assets/puresite-logo-dark-stroke.png' : '/assets/puresite-logo.png'} 
                alt="PureSite Logo" 
                className="brand-logo-img" 
                width={32} 
                height={32}
                fetchPriority="high"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/puresite-logo.png';
                }}
              />
            </picture>
          </div>
          <span className="brand-title">PureSite</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="site-nav" aria-label="Hauptnavigation">
          <button className="nav-item-btn" onClick={() => scrollTo('preise')}>
            <span className="nav-num">01</span> Kalkulator
          </button>
          <button className="nav-item-btn" onClick={() => scrollTo('demos')}>
            <span className="nav-num">02</span> Live-Demos
          </button>
          <button className="nav-item-btn" onClick={() => scrollTo('warum-wir')}>
            <span className="nav-num">03</span> Vergleich
          </button>
          <button className="nav-item-btn" onClick={() => scrollTo('ueber-uns')}>
            <span className="nav-num">04</span> Über uns
          </button>
          <button className="nav-item-btn" onClick={() => scrollTo('prozess')}>
            <span className="nav-num">05</span> Ablauf
          </button>
          <button className="nav-item-btn" onClick={() => scrollTo('faq')}>
            <span className="nav-num">06</span> FAQ
          </button>
        </nav>

        <span className="header-spacer" aria-hidden="true"></span>

        {/* Header Utils */}
        <div className="header-utils">

          {/* Theme Toggle Button */}
          <button 
            className="theme-toggle" 
            type="button" 
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Light Design: Zu hellem Design wechseln' : 'Dark Design: Zu dunklem Design wechseln'}
            title={theme === 'dark' ? 'Helles Design aktivieren' : 'Dunkles Design aktivieren'}
          >
            {theme === 'dark' ? (
              <>
                <Sun size={14} className="theme-icon" />
                <span className="theme-toggle-label">Light</span>
              </>
            ) : (
              <>
                <Moon size={14} className="theme-icon" />
                <span className="theme-toggle-label">Dark</span>
              </>
            )}
          </button>

          {/* Direct CTA */}
          <button className="header-cta-btn" onClick={() => scrollTo('preise')}>
            <span>Konfigurieren</span>
            <ArrowRight size={13} />
          </button>

          {/* Mobile hamburger */}
          <button 
            className="mobile-hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="site-mobile-drawer">
          <button className="mobile-drawer-link" onClick={() => scrollTo('preise')}>
            <span className="nav-num">01</span> Modul-Kalkulator (Festpreis)
          </button>
          <button className="mobile-drawer-link" onClick={() => scrollTo('demos')}>
            <span className="nav-num">02</span> 18 Live-Demos testen
          </button>
          <button className="mobile-drawer-link" onClick={() => scrollTo('speed-lab')}>
            <span className="nav-num">03</span> Speed-Lab & Benchmarks
          </button>
          <button className="mobile-drawer-link" onClick={() => scrollTo('warum-wir')}>
            <span className="nav-num">04</span> Vergleich (Kein WordPress)
          </button>
          <button className="mobile-drawer-link" onClick={() => scrollTo('ueber-uns')}>
            <span className="nav-num">05</span> Über uns (Ingenieurswesen)
          </button>
          <button className="mobile-drawer-link" onClick={() => scrollTo('prozess')}>
            <span className="nav-num">06</span> Projekt-Ablauf
          </button>
          <button className="mobile-drawer-link" onClick={() => scrollTo('faq')}>
            <span className="nav-num">07</span> Häufige Fragen
          </button>
          
          <div className="mobile-drawer-actions">
            <button className="button primary w-100" onClick={() => { setMobileMenuOpen(false); scrollTo('preise'); }}>
              Website jetzt konfigurieren →
            </button>
            <button className="button secondary w-100 mt-2" onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}>
              Direkte Anfrage senden
            </button>
            <button className="mobile-legal-btn" onClick={() => { setMobileMenuOpen(false); onOpenLegal('impressum'); }}>
              Impressum & Datenschutz (DSGVO)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
