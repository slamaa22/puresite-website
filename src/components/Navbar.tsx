import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ArrowRight, Code2 } from 'lucide-react';

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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#hero" className="navbar-brand" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          <div className="brand-logo-icon">
            <img src="/assets/puresite-logo.png" alt="PureSite Logo" className="brand-logo-img" />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-name">Pure<span className="gradient-text">Site</span></span>
            <span className="brand-sub">Webdesign & Software</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav">
          <button className="nav-link" onClick={() => scrollTo('preise')}>
            Preise & Demos
          </button>
          <button className="nav-link" onClick={() => scrollTo('warum-wir')}>
            Warum PureSite?
          </button>
          <button className="nav-link" onClick={() => scrollTo('ueber-uns')}>
            Über uns
          </button>
          <button className="nav-link" onClick={() => scrollTo('prozess')}>
            Ablauf
          </button>
          <button className="nav-link" onClick={() => scrollTo('faq')}>
            FAQ
          </button>
        </nav>

        {/* Right Action buttons */}
        <div className="navbar-actions">
          {/* Theme Switcher Button */}
          <button 
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Theme wechseln"
            title={theme === 'dark' ? 'Zu Light Mode wechseln' : 'Zu Dark Mode wechseln'}
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber" /> : <Moon size={18} />}
          </button>

          {/* Primary CTA */}
          <button className="btn-navbar-cta" onClick={() => scrollTo('preise')}>
            <span>Konfigurator</span>
            <ArrowRight size={15} />
          </button>

          {/* Mobile hamburger */}
          <button 
            className="mobile-hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer glass-panel">
          <button className="mobile-nav-link" onClick={() => scrollTo('preise')}>
            Preise & Demos
          </button>
          <button className="mobile-nav-link" onClick={() => scrollTo('warum-wir')}>
            Warum PureSite?
          </button>
          <button className="mobile-nav-link" onClick={() => scrollTo('ueber-uns')}>
            Über uns
          </button>
          <button className="mobile-nav-link" onClick={() => scrollTo('prozess')}>
            Projekt-Ablauf
          </button>
          <button className="mobile-nav-link" onClick={() => scrollTo('faq')}>
            Häufige Fragen (FAQ)
          </button>
          <button className="mobile-nav-link" onClick={() => { setMobileMenuOpen(false); onOpenLegal('impressum'); }}>
            Impressum & Datenschutz
          </button>
          <button className="btn-primary-sm w-100 mt-2" onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}>
            Jetzt Projekt unverbindlich anfragen
          </button>
        </div>
      )}
    </header>
  );
};
