import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatusBar } from './components/StatusBar';
import { WorkIndex } from './components/WorkIndex';
import { WhyPureSite } from './components/WhyPureSite';
import { PricingCalculator } from './components/PricingCalculator';
import { AboutUs } from './components/AboutUs';
import { ProcessSection } from './components/ProcessSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { TerminalDrawer } from './components/TerminalDrawer';
import type { PricingModule, ProjectCalculation } from './types/pricing';
import { MODULES_DATA } from './data/modulesData';

const ModuleDemoModal = React.lazy(() => import('./components/demos/ModuleDemoModal').then(m => ({ default: m.ModuleDemoModal })));
const InquiryModal = React.lazy(() => import('./components/InquiryModal').then(m => ({ default: m.InquiryModal })));
const LegalModal = React.lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('puresite-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [activeDemoModule, setActiveDemoModule] = useState<PricingModule | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [calculation, setCalculation] = useState<ProjectCalculation | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);
  
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'impressum' | 'datenschutz'>('impressum');

  // Sync theme with document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('puresite-theme', theme);
  }, [theme]);

  // Global keyboard shortcut: Press '~' or '`' to toggle retro terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.key === '~' || e.key === '`' || (e.key === 't' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenDemo = (mod: PricingModule) => {
    setActiveDemoModule(mod);
  };

  const handleRequestQuote = (calc: ProjectCalculation, details: string[]) => {
    setCalculation(calc);
    setSelectedDetails(details);
    setIsInquiryOpen(true);
  };

  const handleOpenLegal = (tab: 'impressum' | 'datenschutz') => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  const scrollToPricing = () => {
    const el = document.getElementById('preise');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWhy = () => {
    const el = document.getElementById('warum-wir');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('ueber-uns');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreDemos = () => {
    const el = document.getElementById('demos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const firstInteractive = MODULES_DATA.find(m => m.code === 'F-01') || MODULES_DATA[0];
      setActiveDemoModule(firstInteractive);
    }
  };

  return (
    <div className="app-root">
      {/* Navigation */}
      <Navbar 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenContact={() => setIsInquiryOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenLegal={handleOpenLegal}
      />

      {/* Main Page Sections */}
      <main>
        <Hero 
          onScrollToPricing={scrollToPricing}
          onExploreDemos={handleExploreDemos}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Live Status Telemetry Bar */}
        <StatusBar 
          onScrollToPricing={scrollToPricing}
          onScrollToWhy={scrollToWhy}
          onScrollToAbout={scrollToAbout}
        />

        {/* 18 Live-Modules Catalogue Index (Johannes Grof Work Index Style) */}
        <WorkIndex 
          onOpenDemo={handleOpenDemo}
          onScrollToPricing={scrollToPricing}
        />

        {/* Why PureSite / Comparison */}
        <WhyPureSite />

        {/* Fullpage Interactive Modular Pricing Calculator */}
        <PricingCalculator 
          onOpenDemo={handleOpenDemo}
          onRequestQuote={handleRequestQuote}
        />

        {/* About Us (HTL Kaindorf Founders) */}
        <AboutUs />

        {/* Project Process Steps */}
        <ProcessSection />

        {/* FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenLegal={handleOpenLegal}
        onOpenContact={() => setIsInquiryOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Interactive Retro Terminal Drawer */}
      <TerminalDrawer 
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onScrollToPricing={scrollToPricing}
        onOpenContact={() => setIsInquiryOpen(true)}
      />

      {/* Lazy Modals loaded on-demand */}
      <React.Suspense fallback={null}>
        {activeDemoModule && (
          <ModuleDemoModal 
            module={activeDemoModule}
            onClose={() => setActiveDemoModule(null)}
            isSelected={false}
            onSelectModule={() => {
              setActiveDemoModule(null);
              scrollToPricing();
            }}
          />
        )}

        {isInquiryOpen && (
          <InquiryModal 
            isOpen={isInquiryOpen}
            onClose={() => setIsInquiryOpen(false)}
            calculation={calculation}
            selectedDetails={selectedDetails}
          />
        )}

        {isLegalOpen && (
          <LegalModal 
            isOpen={isLegalOpen}
            initialTab={legalTab}
            onClose={() => setIsLegalOpen(false)}
          />
        )}
      </React.Suspense>
    </div>
  );
}

export default App;

