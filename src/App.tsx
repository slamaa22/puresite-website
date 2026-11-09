import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './App.css';
import './WindischLiquidGlass.css';

// Critical Above-the-Fold Components (bundled immediately for instant FCP/LCP)
import { LiquidGlassBackdrop } from './components/LiquidGlassBackdrop';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import type { PricingModule } from './types/pricing';
import { MODULES_DATA } from './data/modulesData';
import { useScrollReveal, useAnimatedNumber } from './hooks/useMotion';
import { useProjectConfig } from './hooks/useProjectConfig';
import { initAnalytics, trackEvent } from './utils/analytics';
import { Layers, ArrowUpRight } from 'lucide-react';

// Below-the-Fold Sections (Code-split to keep initial JS payload ultra-lean)
const WorkIndex = React.lazy(() =>
  import('./components/WorkIndex').then(m => ({ default: m.WorkIndex }))
);
const WhyPureSite = React.lazy(() =>
  import('./components/WhyPureSite').then(m => ({ default: m.WhyPureSite }))
);
const PricingCalculator = React.lazy(() =>
  import('./components/PricingCalculator').then(m => ({ default: m.PricingCalculator }))
);
const AboutUs = React.lazy(() =>
  import('./components/AboutUs').then(m => ({ default: m.AboutUs }))
);
const ProcessSection = React.lazy(() =>
  import('./components/ProcessSection').then(m => ({ default: m.ProcessSection }))
);
const SeoArticlesSection = React.lazy(() =>
  import('./components/SeoArticlesSection').then(m => ({ default: m.SeoArticlesSection }))
);
const FAQSection = React.lazy(() =>
  import('./components/FAQSection').then(m => ({ default: m.FAQSection }))
);

// Interactive Dialogs (loaded on demand)
const ModuleDemoModal = React.lazy(() =>
  import('./components/demos/ModuleDemoModal').then(m => ({ default: m.ModuleDemoModal }))
);
const InquiryModal = React.lazy(() =>
  import('./components/InquiryModal').then(m => ({ default: m.InquiryModal }))
);
const LegalModal = React.lazy(() =>
  import('./components/LegalModal').then(m => ({ default: m.LegalModal }))
);

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('puresite-theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  const [activeDemoModule, setActiveDemoModule] = useState<PricingModule | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'impressum' | 'datenschutz'>('impressum');
  const [showFloatingConfigPill, setShowFloatingConfigPill] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState<string>('all');

  // Global scroll-reveal choreography
  useScrollReveal();

  // Unified live project configuration across Demos, Catalogue, Configurator & Inquiry PDF
  const {
    selectedConfig,
    useTax,
    setUseTax,
    activePreset,
    setPreset,
    toggleModule,
    enableModules,
    upgradeBasePackage,
    removeModule,
    updateQuantity,
    setModuleQuantity,
    handleUpdateZusatzseiten,
    applyAdvisorRecommendation,
    calculation,
    potential,
    selectedItemsStructured,
    selectedDetails,
    getShareableUrl
  } = useProjectConfig();

  const animatedFloatingPrice = useAnimatedNumber(calculation.oneTimeGross);

  // Sync theme with document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('puresite-theme', theme);
  }, [theme]);

  // Lock background page scroll while any modal dialog is open
  const isAnyModalOpen = Boolean(activeDemoModule || isInquiryOpen || isLegalOpen);
  useEffect(() => {
    if (!isAnyModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isAnyModalOpen]);

  // Idle background preloading for zero-lag scrolling
  useEffect(() => {
    const idlePreload = () => {
      import('./components/WorkIndex');
      import('./components/WhyPureSite');
      import('./components/PricingCalculator');
      import('./components/ProcessSection');
      import('./components/AboutUs');
      import('./components/FAQSection');
    };

    if ('requestIdleCallback' in window) {
      (
        window as unknown as { requestIdleCallback: (cb: () => void) => void }
      ).requestIdleCallback(idlePreload);
    } else {
      setTimeout(idlePreload, 250);
    }
  }, []);

  // Show floating jump-to-configurator pill on Desktop & Mobile when outside #hero and #preise
  useEffect(() => {
    let rafId = 0;

    const checkFloatingVisibility = () => {
      const scrollY = window.scrollY;
      if (scrollY < 500) {
        setShowFloatingConfigPill(false);
        return;
      }
      const pricingEl = document.getElementById('preise');
      if (pricingEl) {
        const rect = pricingEl.getBoundingClientRect();
        const isPricingInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 180;
        setShowFloatingConfigPill(!isPricingInView);
      } else {
        setShowFloatingConfigPill(true);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkFloatingVisibility);
    };

    checkFloatingVisibility();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Initialize cookieless open-source analytics (Umami) & jump to #preise if opened via #konfig=
  useEffect(() => {
    initAnalytics();
    if (window.location.hash.startsWith('#konfig=')) {
      trackEvent('shared_config_opened');
      const timer = setTimeout(() => {
        const el = document.getElementById('preise');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 450);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenDemo = (mod: PricingModule) => {
    trackEvent('demo_opened', { code: mod.code, name: mod.name });
    setActiveDemoModule(mod);
  };

  const handleOpenInquiry = (source: string) => {
    trackEvent('inquiry_modal_opened', {
      source,
      totalGross: calculation.oneTimeGross,
      itemCount: calculation.itemCount
    });
    setIsInquiryOpen(true);
  };

  const handleRequestQuote = () => {
    handleOpenInquiry('configurator');
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
    const el = document.getElementById('demos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const firstInteractive =
        MODULES_DATA.find(m => m.code === 'F-01') || MODULES_DATA[0];
      setActiveDemoModule(firstInteractive);
    }
  };

  return (
    <div className="app-root wit-liquid-app">
      {/* Ambient Spatial Liquid Glass Aurora & Optical Refraction Layer */}
      <LiquidGlassBackdrop />

      {/* Windisch-Layout Floating Liquid Glass Header */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenContact={() => handleOpenInquiry('navbar')}
        onOpenLegal={handleOpenLegal}
        configuredCount={calculation.itemCount}
        onSelectCatalogCategory={setCatalogCategory}
      />

      {/* Main Page Choreography (Windisch IT Section Rhythm + PureSite Engine) */}
      <main id="main">
        {/* 1. Centered Atmospheric Hero + 3-Column Situations ("Wobei brauchen Sie Unterstützung?") */}
        <Hero
          onScrollToPricing={scrollToPricing}
          onExploreDemos={handleExploreDemos}
        />

        {/* Below-the-fold sections loaded smoothly with React.Suspense */}
        <React.Suspense
          fallback={<div className="wit-wrap" style={{ minHeight: '300px' }} />}
        >
          {/* 2. Windisch-Layout Service List + 18 Interactive Live-Demos */}
          <WorkIndex
            onOpenDemo={handleOpenDemo}
            onScrollToPricing={scrollToPricing}
            selectedConfig={selectedConfig}
            onToggleModule={toggleModule}
            activeCategoryFilter={catalogCategory}
            onCategoryFilterChange={setCatalogCategory}
          />

          {/* 3. Schematic Architecture Preview + Live Speed-Lab + TCO Calculator */}
          <WhyPureSite onScrollToPricing={scrollToPricing} />

          {/* 4. Flagship Consultative Modular Festpreis-Konfigurator */}
          <PricingCalculator
            selectedConfig={selectedConfig}
            useTax={useTax}
            setUseTax={setUseTax}
            activePreset={activePreset}
            setPreset={setPreset}
            toggleModule={toggleModule}
            enableModules={enableModules}
            upgradeBasePackage={upgradeBasePackage}
            removeModule={removeModule}
            updateQuantity={updateQuantity}
            setModuleQuantity={setModuleQuantity}
            handleUpdateZusatzseiten={handleUpdateZusatzseiten}
            applyAdvisorRecommendation={applyAdvisorRecommendation}
            calculation={calculation}
            potential={potential}
            selectedItemsStructured={selectedItemsStructured}
            selectedDetails={selectedDetails}
            getShareableUrl={getShareableUrl}
            onOpenDemo={handleOpenDemo}
            onRequestQuote={handleRequestQuote}
            onToggleTheme={toggleTheme}
          />

          {/* 5. 4-Column Collaboration Process ("Direkter Draht. Alle Schritte.") */}
          <ProcessSection onOpenContact={() => handleOpenInquiry('process')} />

          {/* 6. Asymmetric Founders Section (Maximilian Schlacher & Loreno Zanaboni) */}
          <AboutUs onOpenContact={() => handleOpenInquiry('about')} />

          {/* 7. Local SEO Ratgeber & Knowledge Hub (Website kaufen Graz, Website Agentur Graz, etc.) */}
          <SeoArticlesSection onOpenInquiry={() => handleOpenInquiry('seo_articles')} />

          {/* 8. Asymmetric Sticky FAQ + Full-Width Closing Contact Band */}
          <FAQSection onOpenContact={() => handleOpenInquiry('faq')} />
        </React.Suspense>
      </main>

      {/* 8. Windisch-Layout 3-Column Studio Footer */}
      <Footer
        theme={theme}
        onOpenLegal={handleOpenLegal}
        onOpenContact={() => handleOpenInquiry('footer')}
      />

      {/* Floating High-Density Smoked Liquid Glass Configurator Pill (Portaled above all stacking contexts) */}
      {showFloatingConfigPill &&
        !isInquiryOpen &&
        !activeDemoModule &&
        !isLegalOpen &&
        createPortal(
          <button
            type="button"
            className="floating-config-pill lg-floating-pill"
            onClick={scrollToPricing}
            title="Zu Ihrer aktuellen Konfiguration springen"
          >
            <span className="floating-pill-dot" aria-hidden="true" />
            <Layers size={14} className="text-signal" />
            <span className="floating-pill-meta">
              Zum Kalkulator ·{' '}
              <strong>{animatedFloatingPrice.toLocaleString('de-AT')} €</strong>
            </span>
            <ArrowUpRight size={14} className="floating-pill-arrow" />
          </button>,
          document.body
        )}

      {/* Lazy Modals loaded on-demand (Portaled to document.body above sticky header & docks) */}
      <React.Suspense fallback={null}>
        {activeDemoModule &&
          createPortal(
            <ModuleDemoModal
              module={activeDemoModule}
              onClose={() => setActiveDemoModule(null)}
              isSelected={!!selectedConfig[activeDemoModule.code]?.selected}
              currentTheme={theme}
              onToggleTheme={toggleTheme}
              onSelectModule={code => {
                toggleModule(code);
              }}
            />,
            document.body
          )}

        {isInquiryOpen &&
          createPortal(
            <InquiryModal
              isOpen={isInquiryOpen}
              onClose={() => setIsInquiryOpen(false)}
              calculation={calculation}
              selectedDetails={selectedDetails}
              structuredItems={selectedItemsStructured}
              useTax={useTax}
            />,
            document.body
          )}

        {isLegalOpen &&
          createPortal(
            <LegalModal
              isOpen={isLegalOpen}
              onClose={() => setIsLegalOpen(false)}
              initialTab={legalTab}
            />,
            document.body
          )}
      </React.Suspense>
    </div>
  );
}
