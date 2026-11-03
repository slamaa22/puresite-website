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
import { ModuleDemoModal } from './components/demos/ModuleDemoModal';
import { InquiryModal } from './components/InquiryModal';
import { LegalModal } from './components/LegalModal';
import type { PricingModule, ProjectCalculation } from './types/pricing';
import { MODULES_DATA } from './data/modulesData';

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

      {/* Interactive Feature Demo Modal */}
      <ModuleDemoModal 
        module={activeDemoModule}
        onClose={() => setActiveDemoModule(null)}
        isSelected={false}
        onSelectModule={(code) => {
          setActiveDemoModule(null);
          scrollToPricing();
        }}
      />

      {/* Inquiry / Quote Funnel Modal */}
      <InquiryModal 
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        calculation={calculation}
        selectedDetails={selectedDetails}
      />

      {/* Impressum & Datenschutz Modal */}
      <LegalModal 
        isOpen={isLegalOpen}
        initialTab={legalTab}
        onClose={() => setIsLegalOpen(false)}
      />
    </div>
  );
}

export default App;
