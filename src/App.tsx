import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyPureSite } from './components/WhyPureSite';
import { PricingCalculator } from './components/PricingCalculator';
import { AboutUs } from './components/AboutUs';
import { ProcessSection } from './components/ProcessSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
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
  const [calculation, setCalculation] = useState<ProjectCalculation | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);
  
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'impressum' | 'datenschutz'>('impressum');

  // Sync theme with document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('puresite-theme', theme);
  }, [theme]);

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

  const handleExploreDemos = () => {
    // Open the first flagship demo: F-01 or B-01
    const firstInteractive = MODULES_DATA.find(m => m.code === 'F-01') || MODULES_DATA[0];
    setActiveDemoModule(firstInteractive);
  };

  return (
    <div className="app-root">
      {/* Navigation */}
      <Navbar 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenContact={() => setIsInquiryOpen(true)}
        onOpenLegal={handleOpenLegal}
      />

      {/* Main Page Sections */}
      <main>
        <Hero 
          onScrollToPricing={scrollToPricing}
          onExploreDemos={handleExploreDemos}
        />

        <WhyPureSite />

        <PricingCalculator 
          onOpenDemo={handleOpenDemo}
          onRequestQuote={handleRequestQuote}
        />

        <AboutUs />

        <ProcessSection />

        <FAQSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenLegal={handleOpenLegal}
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
