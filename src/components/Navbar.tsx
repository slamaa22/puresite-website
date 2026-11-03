import React, { useState, useEffect } from 'react';
import { Terminal, ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenContact: () => void;
  onOpenTerminal: () => void;
  onOpenLegal: (tab: 'impressum' | 'datenschutz') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenContact,
  onOpenTerminal,
  onOpenLegal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeShort, setTimeShort] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeShort(
        now.toLocaleTimeString('de-AT', {
          timeZone: 'Europe/Vienna',
          hour: '2-digit',
          minute: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

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
          <span className="brand-prompt" aria-hidden="true">$</span>
          <span className="brand-title">PureSite</span>
          <span className="brand-tag">AT</span>
        </a>

        {/* Desktop Navigation Links with 1px border cells */}
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
          {/* Terminal Shortcut Button */}
          <button 
            type="button" 
            className="header-terminal-btn" 
            onClick={onOpenTerminal}
            title="Terminal öffnen (Taste ~)"
            aria-label="Terminal öffnen"
          >
            <Terminal size={14} />
            <span className="key-hint">~</span>
          </button>

          {/* Clock Header Item */}
          <div className="header-clock" title="Lokalzeit Steiermark">
            <span className="clock-pulse-dot"></span>
            <span className="tabular-time">{timeShort}</span>
            <span className="clock-region">Graz</span>
          </div>

          {/* Theme Toggle Button with swatch */}
          <button 
            className="theme-toggle" 
            type="button" 
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Zu hellem Papier wechseln' : 'Zu dunklem Modus wechseln'}
            title="Design wechseln"
          >
            <span className="theme-toggle-swatch" aria-hidden="true"></span>
            <span className="theme-toggle-label">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
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
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="site-mobile-drawer">
          <button className="mobile-drawer-link" onClick={() => scrollTo('preise')}>
            <span className="nav-num">01</span> Modul-Kalkulator
          </button>
          <button className="mobile-drawer-link" onClick={() => scrollTo('demos')}>
            <span className="nav-num">02</span> 18 Live-Demos
          </button>
          <button className="mobile-drawer-link" onClick={() => scrollTo('warum-wir')}>
            <span className="nav-num">03</span> Vergleich (Kein WordPress)
          </button>
          <button className="mobile-drawer-link" onClick={() => scrollTo('ueber-uns')}>
            <span className="nav-num">04</span> Über uns (HTL Kaindorf)
          </button>
          <button className="mobile-drawer-link" onClick={() => scrollTo('prozess')}>
            <span className="nav-num">05</span> Projekt-Ablauf
          </button>
          <button className="mobile-drawer-link" onClick={() => scrollTo('faq')}>
            <span className="nav-num">06</span> Häufige Fragen
          </button>
          
          <div className="mobile-drawer-actions">
            <button className="button primary w-100" onClick={() => { setMobileMenuOpen(false); scrollTo('preise'); }}>
              Website jetzt konfigurieren →
            </button>
            <button className="button secondary w-100 mt-2" onClick={() => { setMobileMenuOpen(false); onOpenTerminal(); }}>
              <Terminal size={14} /> Terminal öffnen (~)</button>
            <button className="mobile-legal-btn" onClick={() => { setMobileMenuOpen(false); onOpenLegal('impressum'); }}>
              Impressum & Datenschutz
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
