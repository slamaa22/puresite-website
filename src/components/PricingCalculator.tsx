import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MODULES_DATA } from '../data/modulesData';
import type {
  PricingModule,
  SelectedConfig,
  ProjectCalculation,
  ProjectPotential
} from '../types/pricing';
import type {
  PresetKey,
  AdvisorGoal,
  AdvisorScope,
  AdvisorCare,
  StructuredSelectedItem
} from '../hooks/useProjectConfig';
import { useAnimatedNumber, handleSpotlightMove } from '../hooks/useMotion';
import {
  Check,
  Plus,
  Play,
  CheckCircle2,
  Shield,
  ArrowRight,
  ArrowLeft,
  Download,
  Edit3,
  Trash2,
  Clock,
  Zap,
  Award,
  Layers,
  Sparkles,
  Compass,
  Link2,
  TrendingUp,
  SunMoon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PricingCalculatorProps {
  selectedConfig: SelectedConfig;
  useTax: boolean;
  setUseTax: (val: boolean) => void;
  activePreset: PresetKey;
  setPreset: (preset: PresetKey) => void;
  toggleModule: (code: string) => void;
  enableModules: (items: Record<string, number>) => void;
  upgradeBasePackage: (target: 'B-02' | 'B-03', remainingExtraPages?: number) => void;
  removeModule: (code: string) => void;
  updateQuantity: (code: string, delta: number) => void;
  setModuleQuantity: (code: string, exactQty: number) => void;
  handleUpdateZusatzseiten: (delta: number) => void;
  applyAdvisorRecommendation: (
    goal: AdvisorGoal,
    scope: AdvisorScope,
    care: AdvisorCare
  ) => string[];
  calculation: ProjectCalculation;
  potential: ProjectPotential;
  selectedItemsStructured: StructuredSelectedItem[];
  selectedDetails: string[];
  getShareableUrl: () => string;
  onOpenDemo: (module: PricingModule) => void;
  onRequestQuote: (calculation: ProjectCalculation, selectedDetails: string[]) => void;
  onToggleTheme?: () => void;
}

interface WizardStepConfig {
  id: number;
  category: 'basis' | 'frontend' | 'tech' | 'content' | 'hosting' | 'summary';
  shortLabel: string;
  categoryName: string;
  nextStepName: string;
  title: string;
  subtitle: string;
}

const WIZARD_STEPS: WizardStepConfig[] = [
  {
    id: 1,
    category: 'basis',
    shortLabel: '1. Basis',
    categoryName: 'Basis-Paket',
    nextStepName: 'Frontend-Features',
    title: 'Schritt 1 von 5: Wähle dein Website-Fundament',
    subtitle:
      'Das architektonische Grundgerüst deiner Website. Wähle die passende Seitenstruktur für dein Vorhaben.'
  },
  {
    id: 2,
    category: 'frontend',
    shortLabel: '2. Frontend',
    categoryName: 'Frontend-Features',
    nextStepName: 'Backend & Tools',
    title: 'Schritt 2 von 5: Interaktive Frontend-Erlebnisse',
    subtitle:
      'Verwandle Besucher in aktive Interessenten – mit Live-Rechnern, 60-FPS Scrollytelling oder Theme-Switchern.'
  },
  {
    id: 3,
    category: 'tech',
    shortLabel: '3. Backend',
    categoryName: 'Backend-Features',
    nextStepName: 'Content & SEO',
    title: 'Schritt 3 von 5: Eigenes Cockpit, Kalender & Recruiting',
    subtitle:
      'Spare wertvolle Zeit im Alltag durch automatisierte Terminbuchung, eigenes Admin-CMS oder 60s-Bewerber-Funnels.'
  },
  {
    id: 4,
    category: 'content',
    shortLabel: '4. Content',
    categoryName: 'Content & SEO',
    nextStepName: 'Hosting & Wartung',
    title: 'Schritt 4 von 5: Verkaufsstarke Texte & Google-Sichtbarkeit',
    subtitle:
      'Regionale Top-Platzierung auf Google Maps, datenschutzkonforme Erfolgsanalyse und schlüsselfertige Texte.'
  },
  {
    id: 5,
    category: 'hosting',
    shortLabel: '5. Hosting',
    categoryName: 'Wartungspaket',
    nextStepName: 'Gesamtkalkulation',
    title: 'Schritt 5 von 5: Dedicated Hosting & Zuruf-Service',
    subtitle:
      'Dedizierte High-Performance-Server in der EU, tägliche Backups sowie 1 Stunde (Basis) bzw. 3 Stunden (Pro) Entwickler-Änderungen pro Monat inklusive.'
  },
  {
    id: 6,
    category: 'summary',
    shortLabel: '6. Übersicht',
    categoryName: 'Gesamtkalkulation',
    nextStepName: '',
    title: 'Deine verbindliche Festpreis-Architektur',
    subtitle:
      '100% transparent & ohne Überraschungen. Lade dein offizielles PDF-Angebot herunter oder starte unverbindlich.'
  }
];

const BLUEPRINT_SLOTS: { code: string; label: string }[] = [
  { code: 'F-01', label: 'Live-Rechner' },
  { code: 'F-02', label: '60fps Motion' },
  { code: 'T-01', label: 'Admin-CMS' },
  { code: 'T-03', label: 'Terminbuchung' },
  { code: 'T-04', label: 'Recruiting' },
  { code: 'C-02', label: 'Google Maps' },
  { code: 'C-03', label: 'Analytics' },
  { code: 'M-02', label: 'Zuruf-Support' }
];

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
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
  getShareableUrl,
  onOpenDemo,
  onRequestQuote,
  onToggleTheme
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Consultative 3-Click Project Compass state
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [advisorGoal, setAdvisorGoal] = useState<AdvisorGoal>('leads');
  const [advisorScope, setAdvisorScope] = useState<AdvisorScope>('medium');
  const [advisorCare, setAdvisorCare] = useState<AdvisorCare>('concierge');
  const [advisorAppliedReasons, setAdvisorAppliedReasons] = useState<string[] | null>(null);

  // Share link copy state
  const [copiedLink, setCopiedLink] = useState(false);
  const [isInConfiguratorSection, setIsInConfiguratorSection] = useState(false);

  // Only show the mobile sticky wizard dock while #preise is actively in view
  useEffect(() => {
    let rafId = 0;
    const updateInView = () => {
      const el = document.getElementById('preise');
      if (!el) {
        setIsInConfiguratorSection(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      setIsInConfiguratorSection(rect.top < window.innerHeight * 0.8 && rect.bottom > 180);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateInView);
    };
    updateInView();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Smooth animated numbers for live price display
  const animatedGross = useAnimatedNumber(calculation.oneTimeGross);
  const animatedNet = useAnimatedNumber(calculation.oneTimeNet);
  const animatedSavings = useAnimatedNumber(calculation.savingsTotal);
  const animatedDown50 = useAnimatedNumber(calculation.downPayment50);
  const animatedFinal50 = useAnimatedNumber(calculation.finalPayment50);
  const animatedOverallScore = useAnimatedNumber(potential.overall);

  const currentStep = WIZARD_STEPS[currentStepIndex];

  const currentStepModules = useMemo(() => {
    if (currentStep.category === 'summary') return [];
    if (currentStep.category === 'basis') {
      return MODULES_DATA.filter(
        m => m.code === 'B-01' || m.code === 'B-02' || m.code === 'B-03'
      );
    }
    return MODULES_DATA.filter(m => m.category === currentStep.category);
  }, [currentStep.category]);

  const countInCurrentStep = useMemo(() => {
    if (currentStep.category === 'summary') return 0;
    return currentStepModules.filter(m => selectedConfig[m.code]?.selected).length;
  }, [currentStep.category, currentStepModules, selectedConfig]);

  const zusatzConfig = selectedConfig['B-04'];
  const zusatzQty = zusatzConfig && zusatzConfig.selected ? zusatzConfig.quantity || 1 : 0;

  // Estimated total page count for smart copywriting sync & blueprint display
  const estimatedPageCount = useMemo(() => {
    const basePages = selectedConfig['B-03']?.selected
      ? 8
      : selectedConfig['B-02']?.selected
        ? 5
        : 1;
    return basePages + zusatzQty;
  }, [selectedConfig, zusatzQty]);

  const activeBaseLabel = useMemo(() => {
    if (selectedConfig['B-03']?.selected) return 'Corporate Web (bis 11 Seiten + UI-Kit)';
    if (selectedConfig['B-02']?.selected) return 'Business Multi-Page (bis 5 Seiten)';
    return 'Digitaler Start (One-Pager)';
  }, [selectedConfig]);

  const deliveryEstimate = useMemo(() => {
    if (calculation.totalHours <= 18) return 'ca. 5–8 Werktage';
    if (calculation.totalHours <= 36) return 'ca. 2–3 Wochen';
    return 'ca. 3–4 Wochen';
  }, [calculation.totalHours]);

  // Smart, non-pushy contextual recommendations for Step 6 Final Check (max 2)
  const complementarySuggestions = useMemo(() => {
    const suggestions: { mod: PricingModule; reason: string }[] = [];

    const findMod = (c: string) => MODULES_DATA.find(m => m.code === c);

    if (!selectedConfig['C-02']?.selected) {
      const m = findMod('C-02');
      if (m) {
        suggestions.push({
          mod: m,
          reason: 'Sorgt dafür, dass dein Betrieb bei lokalen Suchanfragen auf Google Maps direkt oben erscheint.'
        });
      }
    }

    if (!selectedConfig['F-01']?.selected && !selectedConfig['T-03']?.selected) {
      const m = findMod('T-03');
      if (m) {
        suggestions.push({
          mod: m,
          reason: 'Verwandelt Website-Besucher direkt in gebuchte Erstgespräche – ohne Telefon-Pingpong.'
        });
      }
    } else if (selectedConfig['F-01']?.selected && !selectedConfig['T-03']?.selected) {
      const m = findMod('T-03');
      if (m) {
        suggestions.push({
          mod: m,
          reason: 'Ideale Ergänzung zu deinem Preisrechner: Interessenten buchen im Anschluss sofort ihren Termin.'
        });
      }
    }

    if (suggestions.length < 2 && !selectedConfig['C-03']?.selected) {
      const m = findMod('C-03');
      if (m) {
        suggestions.push({
          mod: m,
          reason: 'Zeigt dir exakt, welche Seiten Anfragen bringen – 100% DSGVO-konform ohne Cookie-Banner.'
        });
      }
    }

    if (
      suggestions.length < 2 &&
      !selectedConfig['M-01']?.selected &&
      !selectedConfig['M-02']?.selected
    ) {
      const m = findMod('M-02');
      if (m) {
        suggestions.push({
          mod: m,
          reason: 'Dedicated Hosting inkl. täglicher Backups & 3h Änderungen/Monat per WhatsApp.'
        });
      }
    }

    return suggestions.slice(0, 2);
  }, [selectedConfig]);

  const nextButtonText = useMemo(() => {
    if (currentStepIndex === 5) {
      return 'Projekt jetzt unverbindlich anfragen';
    }

    const step = WIZARD_STEPS[currentStepIndex];

    if (currentStepIndex === 0) {
      if (countInCurrentStep === 0) {
        return 'Bitte wähle ein Basispaket';
      }
      return `Weiter zu ${step.nextStepName}`;
    }

    if (countInCurrentStep === 0) {
      if (currentStepIndex === 4) {
        return `Ohne ${step.categoryName} zur Gesamtkalkulation`;
      }
      return `Ohne ${step.categoryName} fortfahren`;
    }

    if (currentStepIndex === 4) {
      return 'Weiter zur Gesamtkalkulation';
    }

    return `Weiter zu ${step.nextStepName}`;
  }, [currentStepIndex, countInCurrentStep]);

  const scrollToConfiguratorTop = () => {
    const el = document.getElementById('preise');
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 68;
      if (window.scrollY > topOffset) {
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex === 0 && countInCurrentStep === 0) {
      return;
    }
    if (currentStepIndex === 5) {
      onRequestQuote(calculation, selectedDetails);
      return;
    }
    setCurrentStepIndex(prev => Math.min(WIZARD_STEPS.length - 1, prev + 1));
    scrollToConfiguratorTop();
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      scrollToConfiguratorTop();
    }
  };

  const handleGoToStep = (stepIdx: number) => {
    setCurrentStepIndex(stepIdx);
    scrollToConfiguratorTop();
  };

  const getCategoryCount = (cat: string) => {
    if (cat === 'summary') return calculation.itemCount;
    return MODULES_DATA.filter(m => m.category === cat && selectedConfig[m.code]?.selected)
      .length;
  };

  const handleApplyAdvisor = () => {
    const reasons = applyAdvisorRecommendation(advisorGoal, advisorScope, advisorCare);
    setAdvisorAppliedReasons(reasons);
    setAdvisorOpen(false);
    setCurrentStepIndex(0);
  };

  const handleCopyShareLink = async () => {
    const url = getShareableUrl();
    try {
      await navigator.clipboard.writeText(url);
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState(null, '', url);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2600);
    } catch {
      // Fallback
      window.location.hash = url.split('#')[1] || '';
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2600);
    }
  };

  const handleDownloadPdfOffer = async () => {
    if (calculation.itemCount === 0 || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const itemsForPdf = selectedItemsStructured.map(i => ({
        code: i.code,
        name: i.name,
        categoryLabel: i.categoryLabel,
        description: i.description,
        qtyLabel: i.qtyLabel,
        priceFormatted: i.priceFormatted,
        billingType: i.billingType,
        amount: i.amount
      }));

      const [{ generatePureSitePdf }, { default: confetti }] = await Promise.all([
        import('../utils/pdfGenerator'),
        import('canvas-confetti')
      ]);

      await generatePureSitePdf({
        calculation,
        items: itemsForPdf,
        useTax
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.85 }
      });
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Smart Math Upgrade checks for Step 1 (B-04 = 80 € per extra page)
  const b01UpgradeDiff = 1500 - (1000 + zusatzQty * 80);
  const showB01SmartUpgrade = selectedConfig['B-01']?.selected && zusatzQty >= 4;
  const b02UpgradeDiff = 2000 - (1500 + zusatzQty * 80);
  const showB02SmartUpgrade = selectedConfig['B-02']?.selected && zusatzQty >= 5;

  const bothLocalSeoSelected =
    !!selectedConfig['C-02']?.selected && !!selectedConfig['C-03']?.selected;

  return (
    <section
      id="preise"
      className="band section-shell fullpage-wizard-section pricing-section"
      aria-labelledby="calculator-title"
    >
      <div className="section-head" data-reveal>
        <h2 id="calculator-title">Interaktiver Projekt- & Festpreis-Konfigurator</h2>
        <span className="section-head-meta">
          Schritt {currentStepIndex + 1} von 6 · 100% verbindlicher Fixpreis
        </span>
      </div>

      <div className="fullpage-wizard-container">
        {/* Top Header Deck: Lead, Guided Compass Trigger & Goal Presets */}
        <div className="wizard-full-header" data-reveal>
          <div className="header-left-title">
            <p className="services-lead" style={{ margin: 0 }}>
              Stelle deine Wunsch-Architektur modular zusammen oder nutze unseren{' '}
              <button
                type="button"
                className="inline-compass-link"
                onClick={() => setAdvisorOpen(prev => !prev)}
              >
                <Compass size={14} />
                <span>Projekt-Kompass (3 Klicks)</span>
                {advisorOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
              . Rechts siehst du live Wirkung & Fixpreis.
            </p>
          </div>

          <div className="wizard-presets-deck">
            <span className="preset-deck-label">Ziel-Profil:</span>
            <div className="preset-pill-group">
              <button
                type="button"
                className={`preset-pill-item ${activePreset === 'starter' ? 'active' : ''}`}
                onClick={() => {
                  setAdvisorAppliedReasons(null);
                  setPreset('starter');
                }}
              >
                Visitenkarte
              </button>
              <button
                type="button"
                className={`preset-pill-item ${activePreset === 'business' ? 'active' : ''}`}
                onClick={() => {
                  setAdvisorAppliedReasons(null);
                  setPreset('business');
                }}
              >
                ⭐ Kunden-Magnet
              </button>
              <button
                type="button"
                className={`preset-pill-item ${activePreset === 'scale' ? 'active' : ''}`}
                onClick={() => {
                  setAdvisorAppliedReasons(null);
                  setPreset('scale');
                }}
              >
                Marktführer
              </button>
              <button
                type="button"
                className={`preset-pill-item ${activePreset === 'custom' ? 'active' : ''}`}
                onClick={() => setPreset('custom')}
              >
                Individuell
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible 3-Question Consultative Project Compass */}
        {advisorOpen && (
          <div className="advisor-compass-panel glass-panel">
            <div className="advisor-compass-head">
              <div className="advisor-head-left">
                <span className="advisor-badge">
                  <Compass size={13} /> Digitaler Projekt-Berater
                </span>
                <h3>Welche Architektur bringt deinem Betrieb den größten Hebel?</h3>
              </div>
              <button
                type="button"
                className="advisor-close-btn"
                onClick={() => setAdvisorOpen(false)}
                aria-label="Projekt-Berater schließen"
              >
                ✕
              </button>
            </div>

            <div className="advisor-questions-grid">
              {/* Q1 */}
              <div className="advisor-q-block">
                <span className="advisor-q-num">01 · Primäres Ziel</span>
                <strong>Was soll die Website vor allem erreichen?</strong>
                <div className="advisor-options-stack">
                  {(
                    [
                      { id: 'leads', label: 'Mehr Kundenanfragen & Aufträge' },
                      { id: 'recruiting', label: 'Mitarbeiter & Lehrlinge gewinnen' },
                      { id: 'brand', label: 'Premium-Markenauftritt & Referenzen' },
                      { id: 'lean', label: 'Kompakter, seriöser Schnellstart' }
                    ] as const
                  ).map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`advisor-opt-btn ${advisorGoal === opt.id ? 'active' : ''}`}
                      onClick={() => setAdvisorGoal(opt.id)}
                    >
                      <span className="advisor-opt-dot" />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q2 */}
              <div className="advisor-q-block">
                <span className="advisor-q-num">02 · Angebots-Umfang</span>
                <strong>Wie viele Leistungen / Bereiche zeigt ihr?</strong>
                <div className="advisor-options-stack">
                  {(
                    [
                      { id: 'compact', label: 'Kompakt (1–3 Kernleistungen)' },
                      { id: 'medium', label: 'Wachsend (4–6 Leistungen / Seiten)' },
                      { id: 'extensive', label: 'Umfassend (7+ Seiten / Standorte)' }
                    ] as const
                  ).map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`advisor-opt-btn ${advisorScope === opt.id ? 'active' : ''}`}
                      onClick={() => setAdvisorScope(opt.id)}
                    >
                      <span className="advisor-opt-dot" />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q3 */}
              <div className="advisor-q-block">
                <span className="advisor-q-num">03 · Texte & Pflege</span>
                <strong>Wie möchtet ihr Inhalte & Änderungen lösen?</strong>
                <div className="advisor-options-stack">
                  {(
                    [
                      { id: 'concierge', label: 'Einfach per WhatsApp/Zuruf erledigen lassen' },
                      { id: 'self_cms', label: 'Selbst im eigenen Admin-Cockpit pflegen' },
                      { id: 'done_for_you', label: 'Schlüsselfertig inkl. Verkaufstexten' }
                    ] as const
                  ).map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`advisor-opt-btn ${advisorCare === opt.id ? 'active' : ''}`}
                      onClick={() => setAdvisorCare(opt.id)}
                    >
                      <span className="advisor-opt-dot" />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="advisor-compass-footer">
              <span className="advisor-footer-note">
                100% unverbindlicher Vorschlag – jedes Modul bleibt einzeln zu- und abwählbar.
              </span>
              <button
                type="button"
                className="button primary sm-button"
                onClick={handleApplyAdvisor}
              >
                <Sparkles size={14} />
                <span>Passende Empfehlung zusammenstellen</span>
              </button>
            </div>
          </div>
        )}

        {/* Feedback Banner after Advisor Recommendation */}
        {advisorAppliedReasons && (
          <div className="advisor-applied-banner">
            <div className="advisor-applied-left">
              <Sparkles size={16} className="text-signal" />
              <div>
                <strong>Empfohlene Architektur geladen:</strong>{' '}
                <span>{advisorAppliedReasons.join(' · ')}</span>
              </div>
            </div>
            <button
              type="button"
              className="advisor-dismiss-btn"
              onClick={() => setAdvisorAppliedReasons(null)}
              aria-label="Hinweis ausblenden"
            >
              Ausblenden
            </button>
          </div>
        )}

        {/* 2-COLUMN SPLIT WORKSPACE */}
        <div className="wizard-split-workspace">
          {/* LEFT COLUMN: The Interactive Selection Stage */}
          <div className="wizard-selection-panel glass-panel">
            {/* Desktop Stepper Bar */}
            <div className="wizard-stepper-bar desktop-stepper">
              {WIZARD_STEPS.map((step, idx) => {
                const isActive = currentStepIndex === idx;
                const isPast = currentStepIndex > idx;
                const count = getCategoryCount(step.category);

                return (
                  <button
                    key={step.id}
                    type="button"
                    className={`stepper-tab-btn ${isActive ? 'active' : ''} ${isPast ? 'completed' : ''}`}
                    onClick={() => handleGoToStep(idx)}
                  >
                    <span className="stepper-tab-number">
                      {isPast ? <Check size={12} /> : step.id}
                    </span>
                    <span className="stepper-tab-text">
                      {step.shortLabel.replace(/^[0-9]+\.\s*/, '')}
                    </span>
                    {step.category !== 'summary' && count > 0 && (
                      <span className="stepper-tab-count">{count}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Stepper */}
            <div className="wizard-stepper-mobile">
              <div className="mobile-stepper-grid">
                {WIZARD_STEPS.map((step, idx) => {
                  const isActive = currentStepIndex === idx;
                  const isPast = currentStepIndex > idx;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      className={`mobile-step-pill ${isActive ? 'active' : ''} ${isPast ? 'completed' : ''}`}
                      onClick={() => handleGoToStep(idx)}
                      title={`Schritt ${step.id}: ${step.categoryName}`}
                    >
                      <span className="mobile-pill-circle">
                        {isPast ? <Check size={11} /> : step.id}
                      </span>
                      <span className="mobile-pill-name">
                        {step.shortLabel.replace(/^[0-9]+\.\s*/, '')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Animated Stage Wrapper keyed by Step */}
            <div key={currentStepIndex} className="wizard-step-stage-anim">
              {/* Active Step Intro Header */}
              <div className="wizard-step-intro-bar">
                <div className="step-intro-text">
                  <span className="step-meta-badge">
                    {currentStepIndex < 5
                      ? `Baustein-Ebene ${currentStepIndex + 1} von 5`
                      : 'Architektur-Zusammenfassung'}
                  </span>
                  <h3 className="step-main-title">{currentStep.title}</h3>
                  <p className="step-main-subtitle">{currentStep.subtitle}</p>
                </div>
              </div>

              {/* Step 4 Smart Bundle Helper: Local Visibility & Privacy Analytics Duo */}
              {currentStepIndex === 3 && !bothLocalSeoSelected && (
                <div className="synergy-smart-bar">
                  <div className="synergy-bar-info">
                    <span className="synergy-pill">📍 Regionaler Sichtbarkeits-Hebel</span>
                    <p>
                      <strong>Google Business Maps-Setup (C-02)</strong> +{' '}
                      <strong>Cookieloses DSGVO-Analytics (C-03)</strong> ergänzen sich nahtlos:
                      Gefunden werden &amp; messen, was funktioniert – zusammen für einmalig{' '}
                      <strong>80 € Fixpreis</strong>.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="synergy-action-btn"
                    onClick={() => enableModules({ 'C-02': 1, 'C-03': 1 })}
                  >
                    <Plus size={13} />
                    <span>Beide aktivieren (+80 €)</span>
                  </button>
                </div>
              )}

              {/* Step 3 Contextual Synergy Hint */}
              {currentStepIndex === 2 &&
                selectedConfig['T-02']?.selected &&
                !selectedConfig['T-01']?.selected && (
                  <div className="synergy-smart-bar">
                    <div className="synergy-bar-info">
                      <span className="synergy-pill">🔗 Architektur-Synergie</span>
                      <p>
                        Du hast das <strong>Portfolio- &amp; News-System (T-02)</strong> gewählt. Mit
                        dem <strong>PureSite Admin-Dashboard (T-01)</strong> veröffentlichst du neue
                        Referenzen später selbst in Sekunden – ohne laufende CMS-Gebühren.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="synergy-action-btn"
                      onClick={() => enableModules({ 'T-01': 1 })}
                    >
                      <Plus size={13} />
                      <span>Admin-Cockpit ergänzen (+350 €)</span>
                    </button>
                  </div>
                )}

              {currentStepIndex === 2 &&
                !selectedConfig['T-02']?.selected &&
                selectedConfig['F-01']?.selected &&
                !selectedConfig['T-03']?.selected && (
                  <div className="synergy-smart-bar">
                    <div className="synergy-bar-info">
                      <span className="synergy-pill">🔗 Conversion-Kombination</span>
                      <p>
                        Passt ideal zu deinem <strong>Preisrechner (F-01)</strong>: Mit der{' '}
                        <strong>Online-Terminbuchung (T-03)</strong> können vorqualifizierte
                        Interessenten direkt nach der Kalkulation ihren Wunschtermin buchen.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="synergy-action-btn"
                      onClick={() => enableModules({ 'T-03': 1 })}
                    >
                      <Plus size={13} />
                      <span>Terminbuchung ergänzen (+180 €)</span>
                    </button>
                  </div>
                )}

              {/* Step 1-5: Module Cards */}
              {currentStepIndex < 5 && (
                <div className="wizard-cards-grid">
                  {currentStepModules.map(mod => {
                    const isSelected = !!selectedConfig[mod.code]?.selected;
                    const quantity = selectedConfig[mod.code]?.quantity || 1;
                    const isCountable =
                      mod.code === 'B-04' || mod.code === 'C-01' || mod.code === 'F-03';
                    const halfMilestone =
                      mod.billingType !== 'Monatlich' && mod.fixedPrice >= 100
                        ? Math.round((mod.fixedPrice * quantity) / 2)
                        : null;

                    return (
                      <div
                        key={mod.code}
                        className={`selection-card spotlight-surface glass-panel ${isSelected ? 'selected' : ''}`}
                        onMouseMove={handleSpotlightMove}
                        onClick={() => toggleModule(mod.code)}
                      >
                        {/* Card Top: Badges & Price Tag */}
                        <div className="card-header-row">
                          <div className="card-badge-container">
                            {mod.isPopular && (
                              <span className="badge-tag popular">⭐ Meistgewählt</span>
                            )}
                            {mod.badge && !mod.isPopular && (
                              <span className="badge-tag custom">{mod.badge}</span>
                            )}
                            {!mod.badge && !mod.isPopular && (
                              <span className="badge-tag cat">
                                {mod.categoryLabel.replace(/^[0-9]+\.\s*/, '')}
                              </span>
                            )}
                            {mod.code === 'M-02' && selectedConfig['M-01']?.selected && (
                              <span className="badge-tag upgrade-diff">
                                Nur +14 €/mtl. für 3h statt 1h
                              </span>
                            )}
                          </div>

                          <div className="card-price-container">
                            <div className="card-price-main">
                              <strong className="price-bold">{mod.fixedPrice} €</strong>
                              <span className="price-unit-text">
                                {mod.billingType === 'Monatlich'
                                  ? ' /mtl.'
                                  : mod.billingType === 'Pro Seite'
                                    ? ' /Seite'
                                    : mod.billingType === 'Pro Sprache'
                                      ? ' /Sprache'
                                      : ''}
                              </span>
                            </div>
                            {mod.maxPrice > mod.fixedPrice && (
                              <span className="price-market-strike">
                                Agentur üblich ~{mod.maxPrice} €
                              </span>
                            )}
                            {halfMilestone !== null && (
                              <span className="price-milestone-micro">
                                {halfMilestone} € bei Start (50/50)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Body: Title, Impact Tag & Description */}
                        <h4 className="card-heading">{mod.name}</h4>

                        {mod.impactTag && (
                          <div className="card-impact-pill">
                            <TrendingUp size={12} />
                            <span>{mod.impactTag}</span>
                          </div>
                        )}

                        <p className="card-paragraph">{mod.description}</p>

                        {/* Scope Highlights list */}
                        {mod.scopeHighlights && mod.scopeHighlights.length > 0 && (
                          <ul className="card-highlights-list">
                            {mod.scopeHighlights.slice(0, 3).map((item, i) => (
                              <li key={i}>
                                <Check size={13} className="highlight-icon text-cyan" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {mod.socialProof && (
                          <div className="card-social-proof">
                            <span>✦ {mod.socialProof}</span>
                          </div>
                        )}

                        {/* External notice if present */}
                        {mod.externalNotice && (
                          <div className="card-notice-box">
                            <span>💡 Hinweis: {mod.externalNotice}</span>
                          </div>
                        )}

                        {/* Live Theme Switcher Micro-Trigger on F-04 */}
                        {mod.code === 'F-04' && onToggleTheme && (
                          <div
                            className="card-inline-try-row"
                            onClick={e => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className="btn-inline-theme-try"
                              onClick={onToggleTheme}
                            >
                              <SunMoon size={13} />
                              <span>Farbschema dieser Website jetzt live umschalten</span>
                            </button>
                          </div>
                        )}

                        {/* Countable Stepper */}
                        {isCountable && isSelected && (
                          <div
                            className="card-stepper-box"
                            onClick={e => e.stopPropagation()}
                          >
                            <div className="stepper-left-col">
                              <span className="stepper-title">
                                {mod.code === 'B-04'
                                  ? 'Zusatzseiten:'
                                  : mod.code === 'C-01'
                                    ? 'Texteinheiten (Seiten):'
                                    : 'Zusätzliche Sprachen:'}
                              </span>
                              {mod.code === 'C-01' && quantity !== estimatedPageCount && (
                                <button
                                  type="button"
                                  className="btn-sync-pages"
                                  onClick={() => setModuleQuantity('C-01', estimatedPageCount)}
                                >
                                  Auf Seitenanzahl abstimmen ({estimatedPageCount}×)
                                </button>
                              )}
                            </div>
                            <div className="stepper-btn-group">
                              <button
                                type="button"
                                onClick={() => updateQuantity(mod.code, -1)}
                                aria-label="Verringern"
                              >
                                -
                              </button>
                              <span className="stepper-number">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(mod.code, 1)}
                                aria-label="Erhöhen"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Card Bottom: Demo Link & Select Button */}
                        <div className="card-actions-row">
                          <button
                            type="button"
                            className="btn-demo-link"
                            onClick={e => {
                              e.stopPropagation();
                              onOpenDemo(mod);
                            }}
                            title="Interaktive Live-Demo im Browser testen"
                          >
                            <Play size={12} className="play-icon" />
                            <span>Live-Demo testen</span>
                          </button>

                          <button
                            type="button"
                            className={`btn-select-indicator ${isSelected ? 'active' : ''}`}
                            onClick={e => {
                              e.stopPropagation();
                              toggleModule(mod.code);
                            }}
                          >
                            {isSelected ? (
                              <>
                                <CheckCircle2 size={14} />
                                <span>Aktiviert</span>
                              </>
                            ) : (
                              <>
                                <Plus size={14} />
                                <span>
                                  {mod.category === 'basis' ? 'Fundament wählen' : 'Hinzufügen'}
                                </span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Step 1: Dedicated Zusatzseiten Addon Box + Smart Math Upgrade Advisor */}
              {currentStepIndex === 0 && (
                <>
                  <div className="step1-zusatz-box glass-panel">
                    <div className="zusatz-box-header">
                      <div className="zusatz-box-title-row">
                        <span className="zusatz-icon">📄</span>
                        <div className="zusatz-text-block">
                          <strong className="zusatz-title">
                            Zusätzliche Unterseiten einplanen?
                          </strong>
                          <p className="zusatz-desc">
                            Erweitere dein Fundament flexibel um weitere Leistungs- oder
                            Standortseiten (+80 € Fixpreis pro Seite).
                          </p>
                        </div>
                      </div>
                      <div className="zusatz-box-stepper">
                        <div className="stepper-btn-group">
                          <button
                            type="button"
                            onClick={() => handleUpdateZusatzseiten(-1)}
                            disabled={zusatzQty === 0}
                            aria-label="Zusatzseite abziehen"
                            title="Eine Zusatzseite weniger"
                          >
                            -
                          </button>
                          <span className="stepper-number">{zusatzQty}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateZusatzseiten(1)}
                            aria-label="Zusatzseite hinzufügen"
                            title="Eine Zusatzseite mehr"
                          >
                            +
                          </button>
                        </div>
                        {zusatzQty > 0 ? (
                          <span className="zusatz-sum-badge">
                            +{zusatzQty} {zusatzQty === 1 ? 'Seite' : 'Seiten'} (+
                            {(zusatzQty * 80).toLocaleString('de-AT')} €)
                          </span>
                        ) : (
                          <span className="zusatz-empty-hint">Keine Zusatzseiten</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {showB01SmartUpgrade && (
                    <div className="synergy-smart-bar upgrade-math-bar">
                      <div className="synergy-bar-info">
                        <span className="synergy-pill">💡 Rechnerischer Preis-Vorteil</span>
                        <p>
                          One-Pager + {zusatzQty} Zusatzseiten entsprechen aktuell{' '}
                          <strong>{(1000 + zusatzQty * 80).toLocaleString('de-AT')} €</strong>.{' '}
                          {b01UpgradeDiff > 0
                            ? `Für nur +${b01UpgradeDiff} € Differenz`
                            : 'Zum gleichen bzw. günstigeren Preis'}{' '}
                          erhältst du die vollwertige{' '}
                          <strong>Business Website (B-02, 1.500 €)</strong> inkl. bis zu 4
                          Unterseiten, Multi-Page-Navigation &amp; flüssigen Seitenübergängen.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="synergy-action-btn"
                        onClick={() =>
                          upgradeBasePackage('B-02', Math.max(0, zusatzQty - 4))
                        }
                      >
                        <Sparkles size={13} />
                        <span>Auf Business-Paket upgraden</span>
                      </button>
                    </div>
                  )}

                  {showB02SmartUpgrade && (
                    <div className="synergy-smart-bar upgrade-math-bar">
                      <div className="synergy-bar-info">
                        <span className="synergy-pill">💡 Corporate Preis-Vorteil</span>
                        <p>
                          Business-Paket + {zusatzQty} Zusatzseiten liegen bei{' '}
                          <strong>{(1500 + zusatzQty * 80).toLocaleString('de-AT')} €</strong>.{' '}
                          {b02UpgradeDiff > 0
                            ? `Für nur +${b02UpgradeDiff} € Differenz`
                            : 'Sogar günstiger'}{' '}
                          bekommst du <strong>Premium Corporate Web (B-03, 2.000 €)</strong> inkl.
                          bis zu 10 Unterseiten &amp; eigenem Design-System (UI-Kit).
                        </p>
                      </div>
                      <button
                        type="button"
                        className="synergy-action-btn"
                        onClick={() =>
                          upgradeBasePackage('B-03', Math.max(0, zusatzQty - 6))
                        }
                      >
                        <Sparkles size={13} />
                        <span>Auf Corporate Web wechseln</span>
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Step 6: Final Review & Potential Stage */}
              {currentStepIndex === 5 && (
                <div className="wizard-final-review-panel">
                  <div className="review-welcome-box">
                    <div className="welcome-icon-box">
                      <Award size={28} className="text-cyan" />
                    </div>
                    <div className="welcome-text-box">
                      <h4>Stark! Deine individuelle PureSite-Architektur steht.</h4>
                      <p>
                        Geschätzte Umsetzungsdauer: <strong>{deliveryEstimate}</strong> (ca.{' '}
                        {calculation.totalHours} Engineering-Stunden). Du gehst keinerlei Risiko ein:
                        Nach deiner Anfrage klären wir Details persönlich – die Preisgarantie gilt
                        für 30 Tage.
                      </p>
                    </div>
                  </div>

                  {/* Complementary Final Polish Options (Transparent & Optional) */}
                  {complementarySuggestions.length > 0 && (
                    <div className="review-complementary-block">
                      <div className="review-comp-head">
                        <span>Optionale Abrundung passend zu deiner Auswahl</span>
                        <span className="review-comp-sub">1-Klick Ergänzung · jederzeit abwählbar</span>
                      </div>
                      <div className="review-comp-grid">
                        {complementarySuggestions.map(({ mod, reason }) => (
                          <div key={mod.code} className="review-comp-card">
                            <div className="review-comp-top">
                              <strong>{mod.name}</strong>
                              <span className="review-comp-price">
                                +{mod.fixedPrice} €{mod.billingType === 'Monatlich' ? '/mtl.' : ''}
                              </span>
                            </div>
                            <p>{reason}</p>
                            <button
                              type="button"
                              className="review-comp-add-btn"
                              onClick={() => toggleModule(mod.code)}
                            >
                              <Plus size={13} />
                              <span>Zur Konfiguration hinzufügen</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="review-perks-grid">
                    <div className="perk-card glass-panel">
                      <Clock size={20} className="text-cyan" />
                      <h5>Umsetzung in {deliveryEstimate}</h5>
                      <p>Klare Zeitpläne ohne endlose Agentur-Warteschleifen bis zum Livegang.</p>
                    </div>

                    <div className="perk-card glass-panel">
                      <Shield size={20} className="text-cyan" />
                      <h5>50/50 Meilenstein-Schutz</h5>
                      <p>
                        {calculation.downPayment50.toLocaleString('de-AT')} € bei Start,{' '}
                        {calculation.finalPayment50.toLocaleString('de-AT')} € erst nach deiner
                        Abnahme.
                      </p>
                    </div>

                    <div className="perk-card glass-panel">
                      <Zap size={20} className="text-cyan" />
                      <h5>Lighthouse 98–100 Garantie</h5>
                      <p>Messbare Spitzen-Ladezeit unter 0,4s für Top-Platzierungen auf Google.</p>
                    </div>

                    <div className="perk-card glass-panel">
                      <Layers size={20} className="text-cyan" />
                      <h5>100% Quellcode-Eigentum</h5>
                      <p>
                        Nach Fertigstellung gehören Design, Texte und Code vollständig deinem
                        Betrieb.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step Footer Navigation */}
            <div className="wizard-panel-footer">
              <div className="footer-left">
                {currentStepIndex > 0 ? (
                  <button
                    type="button"
                    className="btn-wizard-prev"
                    onClick={handlePrevStep}
                  >
                    <ArrowLeft size={15} />
                    <span>Zurück</span>
                  </button>
                ) : (
                  <span className="footer-hint">
                    Fundament: {activeBaseLabel}
                  </span>
                )}
              </div>

              <div className="footer-right">
                <button
                  type="button"
                  className={`btn-wizard-forward ${countInCurrentStep === 0 && currentStepIndex > 0 ? 'skip-mode' : ''}`}
                  onClick={handleNextStep}
                >
                  <span>{nextButtonText}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Blueprint, Potential Meter & Price Cockpit */}
          <div className={`wizard-summary-column ${currentStepIndex < 5 ? 'mobile-hidden' : ''}`}>
            <div className="summary-sidebar-card glass-panel">
              {/* Sidebar Header */}
              <div className="sidebar-header">
                <div className="sidebar-title-wrap">
                  <h3 className="sidebar-heading">Live-Architektur</h3>
                  <span className="sidebar-count-badge">
                    {calculation.itemCount} Bausteine
                  </span>
                </div>
                <div className="live-status-pill">
                  <span className="live-dot"></span>
                  <span>Fixpreis aktiv</span>
                </div>
              </div>

              {/* Interactive Live Website Blueprint & Impact Meter */}
              <div className="blueprint-cockpit-box">
                <div className="blueprint-browser-chrome">
                  <div className="blueprint-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="blueprint-url">dein-betrieb.at</span>
                  <div className="blueprint-chrome-badges">
                    {selectedConfig['F-03']?.selected && (
                      <span className="bp-mini-tag">
                        DE/EN{selectedConfig['F-03'].quantity > 1 ? '+' : ''}
                      </span>
                    )}
                    {selectedConfig['F-04']?.selected && (
                      <span className="bp-mini-tag">◐ Theme</span>
                    )}
                    {selectedConfig['T-01']?.selected && (
                      <span className="bp-mini-tag">/admin</span>
                    )}
                  </div>
                </div>

                <div className="blueprint-body">
                  <div className="blueprint-base-row">
                    <span className="bp-base-title">{activeBaseLabel}</span>
                    {zusatzQty > 0 && (
                      <span className="bp-extra-pages">+{zusatzQty} Zusatzs.</span>
                    )}
                  </div>

                  {/* Capability Matrix Slots */}
                  <div className="blueprint-slots-grid">
                    {BLUEPRINT_SLOTS.map(slot => {
                      const active = !!selectedConfig[slot.code]?.selected;
                      return (
                        <button
                          key={slot.code}
                          type="button"
                          className={`bp-slot-chip ${active ? 'is-active' : 'is-idle'}`}
                          onClick={() => toggleModule(slot.code)}
                          title={
                            active
                              ? `${slot.label} ist aktiv (Klick zum Entfernen)`
                              : `${slot.label} direkt aktivieren`
                          }
                        >
                          <span className="bp-slot-dot" />
                          <span>{slot.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* 4D Project Potential Meter */}
                  <div className="potential-meter-block">
                    <div className="potential-head-row">
                      <span>Projekt-Wirkungsgrad</span>
                      <strong>{animatedOverallScore}/100</strong>
                    </div>
                    <div className="potential-bars-grid">
                      <div className="pot-bar-item">
                        <div className="pot-bar-label">
                          <span>Google &amp; SEO</span>
                          <span>{potential.seo}%</span>
                        </div>
                        <div className="pot-bar-track">
                          <div
                            className="pot-bar-fill"
                            style={{ width: `${potential.seo}%` }}
                          />
                        </div>
                      </div>
                      <div className="pot-bar-item">
                        <div className="pot-bar-label">
                          <span>Anfragen-Hebel</span>
                          <span>{potential.conversion}%</span>
                        </div>
                        <div className="pot-bar-track">
                          <div
                            className="pot-bar-fill"
                            style={{ width: `${potential.conversion}%` }}
                          />
                        </div>
                      </div>
                      <div className="pot-bar-item">
                        <div className="pot-bar-label">
                          <span>Marken-Design</span>
                          <span>{potential.brand}%</span>
                        </div>
                        <div className="pot-bar-track">
                          <div
                            className="pot-bar-fill"
                            style={{ width: `${potential.brand}%` }}
                          />
                        </div>
                      </div>
                      <div className="pot-bar-item">
                        <div className="pot-bar-label">
                          <span>Zeitersparnis</span>
                          <span>{potential.autonomy}%</span>
                        </div>
                        <div className="pot-bar-track">
                          <div
                            className="pot-bar-fill"
                            style={{ width: `${potential.autonomy}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configured Modules Grouped by Category */}
              <div className="sidebar-configured-list">
                {WIZARD_STEPS.slice(0, 5).map((step, idx) => {
                  const stepItems = selectedItemsStructured.filter(
                    item => item.category === step.category
                  );
                  const isCurrent = currentStepIndex === idx;

                  return (
                    <div
                      key={step.id}
                      className={`sidebar-category-group ${isCurrent ? 'active-step-group' : ''}`}
                    >
                      <div className="category-group-header">
                        <div className="category-label-wrap">
                          <span className="category-marker"></span>
                          <span className="category-title">{step.categoryName}</span>
                        </div>
                        <button
                          type="button"
                          className="btn-edit-category"
                          onClick={() => handleGoToStep(idx)}
                          title={`${step.categoryName} anpassen`}
                        >
                          <Edit3 size={12} />
                          <span>Anpassen</span>
                        </button>
                      </div>

                      {stepItems.length === 0 ? (
                        <div className="category-empty-line">
                          <span>Optional · keine Auswahl</span>
                        </div>
                      ) : (
                        <div className="category-items-container">
                          {stepItems.map(item => (
                            <div key={item.code} className="configured-item-row">
                              <div className="item-info">
                                <span className="item-name">
                                  {item.name}
                                  {item.qtyLabel}
                                </span>
                              </div>
                              <div className="item-price-wrap">
                                <span className="item-price">{item.priceFormatted}</span>
                                {item.code !== 'B-01' &&
                                  item.code !== 'B-02' &&
                                  item.code !== 'B-03' && (
                                    <button
                                      type="button"
                                      className="btn-remove-item"
                                      onClick={() => removeModule(item.code)}
                                      title="Position entfernen"
                                      aria-label={`${item.name} entfernen`}
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.category === 'basis' && zusatzQty === 0 && (
                        <div className="sidebar-add-zusatz-row">
                          <button
                            type="button"
                            className="btn-add-zusatz-mini"
                            onClick={() => handleUpdateZusatzseiten(1)}
                            title="Zusatzseite für 80 € hinzufügen"
                          >
                            <Plus size={11} />
                            <span>Zusatzseite hinzufügen (+80 €)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tax Toggle */}
              <div className="sidebar-tax-block">
                <div className="tax-label-row">
                  <span className="tax-head">Umsatzsteuer:</span>
                  <span className="tax-sub">
                    {useTax ? '20% Regelbesteuerung' : '0% Kleinunternehmer'}
                  </span>
                </div>
                <div className="tax-toggle-pill">
                  <button
                    type="button"
                    className={`tax-btn ${!useTax ? 'active' : ''}`}
                    onClick={() => setUseTax(false)}
                  >
                    0% USt-frei
                  </button>
                  <button
                    type="button"
                    className={`tax-btn ${useTax ? 'active' : ''}`}
                    onClick={() => setUseTax(true)}
                  >
                    +20% USt.
                  </button>
                </div>
              </div>

              {/* Price Calculations Box with Smooth Rolling Numbers */}
              <div className="sidebar-pricing-box">
                <div className="pricing-calc-row">
                  <span>Projektpreis Netto:</span>
                  <strong className="calc-amount">
                    {animatedNet.toLocaleString('de-AT')} €
                  </strong>
                </div>

                <div className="pricing-calc-row">
                  <span>USt. ({calculation.taxRate}%):</span>
                  <span>
                    {useTax
                      ? `${Math.round(calculation.oneTimeNet * 0.2).toLocaleString('de-AT')} €`
                      : '0 € (gem. § 6 Abs. 1 Z 27)'}
                  </span>
                </div>

                <div className="pricing-calc-row total-highlight">
                  <span className="total-label">Verbindlicher Festpreis:</span>
                  <strong className="total-number gradient-text">
                    {animatedGross.toLocaleString('de-AT')} €
                  </strong>
                </div>

                {calculation.mrrNet > 0 && (
                  <div className="pricing-calc-row mrr-line">
                    <span>Hosting &amp; Betreuung:</span>
                    <strong className="text-purple">
                      {calculation.mrrNet.toLocaleString('de-AT')} €/mtl.
                    </strong>
                  </div>
                )}

                {calculation.savingsTotal > 0 && (
                  <div className="sidebar-savings-pill">
                    <span>
                      Preisvorteil ggü. klassischer Agentur (~
                      {calculation.totalMarketValue.toLocaleString('de-AT')} €):
                    </span>
                    <strong>−{animatedSavings.toLocaleString('de-AT')} €</strong>
                  </div>
                )}
              </div>

              {/* 50/50 Payment Guarantee */}
              <div className="sidebar-security-badge">
                <Shield size={15} className="text-cyan shield-icon" />
                <div className="security-text">
                  <strong>50/50 Meilenstein-Garantie:</strong>
                  <span>
                    {animatedDown50.toLocaleString('de-AT')} € bei Projektstart ·{' '}
                    {animatedFinal50.toLocaleString('de-AT')} € erst nach Abnahme &amp; Livegang
                  </span>
                </div>
              </div>

              {/* Sidebar Action CTAs */}
              <div className="sidebar-cta-group">
                <button
                  type="button"
                  className="btn-sidebar-submit"
                  onClick={() => onRequestQuote(calculation, selectedDetails)}
                  disabled={calculation.itemCount === 0}
                >
                  <span>Projekt unverbindlich anfragen</span>
                  <ArrowRight size={17} />
                </button>

                <div className="sidebar-secondary-actions">
                  <button
                    type="button"
                    className="btn-sidebar-pdf"
                    onClick={handleDownloadPdfOffer}
                    disabled={isGeneratingPdf || calculation.itemCount === 0}
                  >
                    <Download size={14} className={isGeneratingPdf ? 'spin-icon' : ''} />
                    <span>{isGeneratingPdf ? 'Erstelle PDF...' : 'PDF-Angebot'}</span>
                  </button>

                  <button
                    type="button"
                    className="btn-sidebar-share"
                    onClick={handleCopyShareLink}
                    title="Direktlink zu deiner aktuellen Konfiguration kopieren"
                  >
                    {copiedLink ? <Check size={14} /> : <Link2 size={14} />}
                    <span>{copiedLink ? 'Link kopiert!' : 'Link teilen'}</span>
                  </button>
                </div>
              </div>

              {/* Guarantee Footer */}
              <div className="sidebar-guarantee-footer">
                <span>
                  ✓ Umsetzungszeit {deliveryEstimate} · 100% Fixpreis ohne Nachverrechnung
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Action Dock & Drawer (portaled to document.body so no section z-index traps them) */}
        {isInConfiguratorSection &&
          createPortal(
            <div className="wizard-mobile-dock glass-panel">
              <div className="mobile-dock-left">
                {currentStepIndex > 0 && (
                  <button
                    type="button"
                    className="btn-mobile-dock-back"
                    onClick={handlePrevStep}
                    aria-label="Vorheriger Schritt"
                    title="Zurück"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
                <div
                  className="mobile-dock-price"
                  onClick={() => setShowMobileSummary(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') setShowMobileSummary(true);
                  }}
                  title="Konfiguration ansehen"
                >
                  <div className="mobile-dock-price-left">
                    <span className="mobile-dock-label">
                      Fixpreis ({potential.overall}% Wirkung):
                    </span>
                    <strong className="mobile-dock-sum">
                      {animatedGross.toLocaleString('de-AT')} €
                    </strong>
                  </div>
                  <span className="mobile-dock-details-hint">Details ↑</span>
                </div>
              </div>

              <div className="mobile-dock-right">
                <button
                  type="button"
                  className={`btn-mobile-dock-next ${countInCurrentStep === 0 && currentStepIndex > 0 && currentStepIndex < 5 ? 'skip-mode' : ''}`}
                  onClick={handleNextStep}
                >
                  <span>{nextButtonText}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>,
            document.body
          )}

        {/* Mobile Summary Drawer Sheet */}
        {showMobileSummary &&
          createPortal(
            <div className="mobile-sheet-backdrop" onClick={() => setShowMobileSummary(false)}>
              <div
                className="mobile-sheet-content glass-panel"
                onClick={e => e.stopPropagation()}
              >
                <div className="mobile-sheet-header">
                  <div className="sheet-title-wrap">
                    <Layers size={18} className="text-cyan" />
                    <h4>Deine Konfiguration ({calculation.itemCount} Positionen)</h4>
                  </div>
                  <button
                    type="button"
                    className="btn-close-sheet"
                    onClick={() => setShowMobileSummary(false)}
                    aria-label="Schließen"
                  >
                    ✕
                  </button>
                </div>

                <div className="mobile-sheet-body">
                  <div className="sheet-items-list">
                    {selectedItemsStructured.map(item => (
                      <div key={item.code} className="sheet-item-row">
                        <div className="sheet-item-info">
                          <span className="sheet-item-name">
                            {item.name}
                            {item.qtyLabel}
                          </span>
                        </div>
                        <div className="sheet-item-price-wrap">
                          <span className="sheet-item-price">{item.priceFormatted}</span>
                          {item.code !== 'B-01' &&
                            item.code !== 'B-02' &&
                            item.code !== 'B-03' && (
                              <button
                                type="button"
                                className="btn-remove-item"
                                onClick={() => removeModule(item.code)}
                                title="Entfernen"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="sheet-total-box">
                    <div className="sheet-total-row">
                      <span>Verbindlicher Festpreis:</span>
                      <strong className="sheet-total-price gradient-text">
                        {calculation.oneTimeGross.toLocaleString('de-AT')} €
                      </strong>
                    </div>
                    <div className="sheet-mrr-row">
                      <span>50% bei Projektstart:</span>
                      <strong>{calculation.downPayment50.toLocaleString('de-AT')} €</strong>
                    </div>
                    {calculation.mrrNet > 0 && (
                      <div className="sheet-mrr-row">
                        <span>Laufende Betreuung:</span>
                        <strong>+{calculation.mrrNet.toLocaleString('de-AT')} €/mtl.</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mobile-sheet-footer">
                  <button
                    type="button"
                    className="btn-sheet-close-action"
                    onClick={() => setShowMobileSummary(false)}
                  >
                    <span>Fertig &amp; weiter konfigurieren</span>
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </section>
  );
};
