import React, { useState, useMemo } from 'react';
import { MODULES_DATA } from '../data/modulesData';
import type { PricingModule, SelectedConfig, ProjectCalculation } from '../types/pricing';
import { 
  Check, Plus, Play, 
  CheckCircle2, Shield, ArrowRight, ArrowLeft, Download, 
  Edit3, Trash2, Clock, Zap, Award, Layers
} from 'lucide-react';

interface PricingCalculatorProps {
  onOpenDemo: (module: PricingModule) => void;
  onRequestQuote: (calculation: ProjectCalculation, selectedDetails: string[]) => void;
}

type PresetKey = 'starter' | 'business' | 'scale' | 'custom';

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
    subtitle: 'Das Grundgerüst deiner Website. Wähle die passende Seitenanzahl und Architektur für deinen Betrieb.'
  },
  {
    id: 2,
    category: 'frontend',
    shortLabel: '2. Frontend',
    categoryName: 'Frontend-Features',
    nextStepName: 'Backend & Tools',
    title: 'Schritt 2 von 5: Interaktive Frontend-Features',
    subtitle: 'Begeistere deine Besucher mit Rechnern, flüssigen Animationen oder einem Theme-Switcher.'
  },
  {
    id: 3,
    category: 'tech',
    shortLabel: '3. Backend',
    categoryName: 'Backend-Features',
    nextStepName: 'Content & SEO',
    title: 'Schritt 3 von 5: Backend, CMS & Automatisierung',
    subtitle: 'Automatisiere Abläufe mit Online-Terminbuchung, Headless CMS oder Bewerber-Funnels.'
  },
  {
    id: 4,
    category: 'content',
    shortLabel: '4. Content',
    categoryName: 'Content & SEO',
    nextStepName: 'Hosting & Wartung',
    title: 'Schritt 4 von 5: Texterstellung & Suchmaschinen',
    subtitle: 'Professionelle Verkaufstexte und gezielte Google-Optimierung für mehr qualifizierte Kundenanfragen.'
  },
  {
    id: 5,
    category: 'hosting',
    shortLabel: '5. Hosting',
    categoryName: 'Wartungspaket',
    nextStepName: 'Gesamtkalkulation',
    title: 'Schritt 5 von 5: High-Speed Hosting & Zuruf-Service',
    subtitle: 'DSGVO-konformes NVMe-Hosting in Österreich, SSL-Zertifikate und persönlicher Support.'
  },
  {
    id: 6,
    category: 'summary',
    shortLabel: '6. Übersicht',
    categoryName: 'Gesamtkalkulation',
    nextStepName: '',
    title: 'Deine verbindliche Festpreis-Kalkulation',
    subtitle: '100% transparent. Lade dein PDF-Angebot herunter oder sichere dir ein unverbindliches Erstgespräch.'
  }
];

const PRESET_CONFIGS: Record<'starter' | 'business' | 'scale', Record<string, number>> = {
  starter: {
    'B-01': 1,
    'F-04': 1,
    'M-01': 1
  },
  business: {
    'B-02': 1,
    'F-01': 1,
    'T-03': 1,
    'C-03': 1,
    'M-02': 1
  },
  scale: {
    'B-03': 1,
    'F-01': 1,
    'F-02': 1,
    'T-01': 1,
    'T-04': 1,
    'M-02': 1
  }
};

const createConfigFromPreset = (preset: Record<string, number>): SelectedConfig => {
  const cfg: SelectedConfig = {};
  Object.entries(preset).forEach(([code, qty]) => {
    cfg[code] = { selected: true, quantity: qty };
  });
  return cfg;
};

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  onOpenDemo,
  onRequestQuote
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>(() => {
    return createConfigFromPreset(PRESET_CONFIGS.business);
  });
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [useTax, setUseTax] = useState<boolean>(false); // 0% Kleinunternehmer vs 20% Regelbesteuerung
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Toggle selection
  const toggleModule = (code: string) => {
    setIsCustomMode(false);
    setSelectedConfig(prev => {
      // Base packages (B-01, B-02, B-03) are radio-like and mandatory
      // One base package (Solo, Startup, or Corporate) is ALWAYS selected
      if (code === 'B-01' || code === 'B-02' || code === 'B-03') {
        return {
          ...prev,
          'B-01': { selected: code === 'B-01', quantity: 1 },
          'B-02': { selected: code === 'B-02', quantity: 1 },
          'B-03': { selected: code === 'B-03', quantity: 1 }
        };
      }

      const current = prev[code];
      const isSelected = current ? current.selected : false;

      return {
        ...prev,
        [code]: {
          selected: !isSelected,
          quantity: current?.quantity && current.quantity > 0 ? current.quantity : 1
        }
      };
    });
  };

  // Remove module
  const removeModule = (code: string) => {
    // Cannot delete the base package or Zusatzseiten from generic remove (managed in Step 1)
    if (code === 'B-01' || code === 'B-02' || code === 'B-03' || code === 'B-04') {
      return;
    }
    setIsCustomMode(false);
    setSelectedConfig(prev => ({
      ...prev,
      [code]: { selected: false, quantity: 1 }
    }));
  };

  // Update quantity
  const updateQuantity = (code: string, delta: number) => {
    setIsCustomMode(false);
    setSelectedConfig(prev => {
      const current = prev[code] || { selected: true, quantity: 1 };
      const newQty = Math.max(1, (current.quantity || 1) + delta);
      return {
        ...prev,
        [code]: {
          selected: true,
          quantity: newQty
        }
      };
    });
  };

  // Presets
  const setPreset = (type: PresetKey) => {
    if (type === 'custom') {
      setIsCustomMode(true);
      return;
    }
    setIsCustomMode(false);
    setSelectedConfig(createConfigFromPreset(PRESET_CONFIGS[type]));
  };

  // Determine active preset
  const activePreset = useMemo<PresetKey>(() => {
    if (isCustomMode) return 'custom';

    const selectedEntries = Object.entries(selectedConfig).filter(
      ([_, val]) => val && val.selected && (val.quantity || 1) > 0
    );

    for (const [presetKey, presetMap] of Object.entries(PRESET_CONFIGS) as ['starter' | 'business' | 'scale', Record<string, number>][]) {
      const presetKeys = Object.keys(presetMap);
      if (selectedEntries.length !== presetKeys.length) continue;

      const allMatch = selectedEntries.every(([code, val]) => {
        return presetMap[code] === (val.quantity || 1);
      });

      if (allMatch) return presetKey;
    }

    return 'custom';
  }, [selectedConfig, isCustomMode]);

  // Current Step Config
  const currentStep = WIZARD_STEPS[currentStepIndex];

  // Modules belonging to current step category
  const currentStepModules = useMemo(() => {
    if (currentStep.category === 'summary') return [];
    if (currentStep.category === 'basis') {
      // Step 1: Exactly the 3 main Base Packages (Standard / Business / Premium)
      return MODULES_DATA.filter(m => m.code === 'B-01' || m.code === 'B-02' || m.code === 'B-03');
    }
    return MODULES_DATA.filter(m => m.category === currentStep.category);
  }, [currentStep.category]);

  // Number of selected modules in current step
  const countInCurrentStep = useMemo(() => {
    if (currentStep.category === 'summary') return 0;
    return currentStepModules.filter(
      m => selectedConfig[m.code]?.selected
    ).length;
  }, [currentStep.category, currentStepModules, selectedConfig]);

  // Calculations
  const calculation = useMemo<ProjectCalculation>(() => {
    let oneTimeNet = 0;
    let mrrNet = 0;
    let totalMarketValue = 0;
    let totalHours = 0;
    let itemCount = 0;

    MODULES_DATA.forEach(mod => {
      const cfg = selectedConfig[mod.code];
      if (cfg && cfg.selected) {
        const qty = cfg.quantity || 1;
        itemCount += 1;
        totalHours += mod.estimatedHours * qty;

        if (mod.billingType === 'Monatlich') {
          mrrNet += mod.fixedPrice * qty;
          totalMarketValue += mod.maxPrice * qty;
        } else {
          oneTimeNet += mod.fixedPrice * qty;
          totalMarketValue += mod.maxPrice * qty;
        }
      }
    });

    const taxMultiplier = useTax ? 1.2 : 1.0;
    const oneTimeGross = Math.round(oneTimeNet * taxMultiplier);
    const savingsTotal = Math.max(0, totalMarketValue - (oneTimeNet + mrrNet));
    const downPayment50 = Math.round(oneTimeGross * 0.5);
    const finalPayment50 = oneTimeGross - downPayment50;

    return {
      oneTimeNet,
      oneTimeGross,
      mrrNet,
      totalMarketValue,
      savingsTotal,
      totalHours: Math.round(totalHours * 10) / 10,
      downPayment50,
      finalPayment50,
      taxRate: useTax ? 20 : 0,
      itemCount
    };
  }, [selectedConfig, useTax]);

  // Selected structured items
  const selectedItemsStructured = useMemo(() => {
    const list: { 
      code: string; 
      category: string; 
      name: string; 
      qtyLabel: string; 
      priceFormatted: string; 
      fullText: string; 
      isMonthly: boolean;
      amount: number;
    }[] = [];

    MODULES_DATA.forEach(m => {
      const cfg = selectedConfig[m.code];
      if (cfg && cfg.selected) {
        const qty = cfg.quantity || 1;
        const qtyLabel = (m.code === 'B-04' || m.code === 'C-01' || m.code === 'F-03') ? ` (${qty}x)` : '';
        const priceFormatted = (m.billingType === 'Monatlich' ? `${m.fixedPrice * qty} €/mtl.` : `${m.fixedPrice * qty} €`);
        const noticeSuffix = m.externalNotice ? ` (Hinweis: ${m.externalNotice})` : '';
        list.push({
          code: m.code,
          category: m.category,
          name: m.name,
          qtyLabel,
          priceFormatted,
          fullText: `${m.name}${qtyLabel} — ${priceFormatted}${noticeSuffix}`,
          isMonthly: m.billingType === 'Monatlich',
          amount: m.fixedPrice * qty
        });
      }
    });
    return list;
  }, [selectedConfig]);

  // Selected details array for inquiries and copy
  const selectedDetails = useMemo(() => {
    return selectedItemsStructured.map(i => i.fullText);
  }, [selectedItemsStructured]);

  // Dynamic Next Button Text (Clean text without duplicate arrow)
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

  // Smooth scroll to top of configurator on mobile step change
  const scrollToConfiguratorTop = () => {
    const el = document.getElementById('pricing');
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 65;
      if (window.pageYOffset > topOffset) {
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }
  };

  // Navigation handlers
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

  // Helper count per category for stepper tabs
  const getCategoryCount = (cat: string) => {
    if (cat === 'summary') return calculation.itemCount;
    return MODULES_DATA.filter(m => m.category === cat && selectedConfig[m.code]?.selected).length;
  };

  // Active Zusatzseiten quantity & quick-update handler
  const zusatzConfig = selectedConfig['B-04'];
  const zusatzQty = (zusatzConfig && zusatzConfig.selected) ? (zusatzConfig.quantity || 1) : 0;

  const handleUpdateZusatzseiten = (delta: number) => {
    setIsCustomMode(false);
    setSelectedConfig(prev => {
      const current = prev['B-04'];
      const currentQty = (current && current.selected) ? (current.quantity || 1) : 0;
      const newQty = currentQty + delta;

      if (newQty <= 0) {
        return {
          ...prev,
          'B-04': { selected: false, quantity: 1 }
        };
      } else {
        return {
          ...prev,
          'B-04': { selected: true, quantity: newQty }
        };
      }
    });
  };

  // Download offer as branded PDF
  const handleDownloadPdfOffer = async () => {
    if (calculation.itemCount === 0 || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const itemsForPdf = MODULES_DATA
        .filter(m => selectedConfig[m.code]?.selected)
        .map(m => {
          const qty = selectedConfig[m.code]?.quantity || 1;
          const qtyLabel = (m.code === 'B-04' || m.code === 'C-01' || m.code === 'F-03') ? ` (${qty}x)` : '';
          const priceFormatted = (m.billingType === 'Monatlich' ? `${m.fixedPrice * qty} €/mtl.` : `${m.fixedPrice * qty} €`);
          return {
            code: m.code,
            name: m.name,
            categoryLabel: m.categoryLabel,
            description: m.description,
            qtyLabel,
            priceFormatted,
            billingType: m.billingType,
            amount: m.fixedPrice * qty
          };
        });

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

  return (
    <section id="preise" className="band section-shell fullpage-wizard-section pricing-section" aria-labelledby="calculator-title">
      <div className="section-head">
        <h2 id="calculator-title">Festpreis-Kalkulator</h2>
        <span className="section-head-meta">Schritt {currentStepIndex + 1} von 6 · 100% verbindlich online</span>
      </div>

      <div className="fullpage-wizard-container">
        
        {/* Top Header Deck: Title & Presets */}
        <div className="wizard-full-header">
          <div className="header-left-title">
            <p className="services-lead" style={{ margin: 0 }}>
              Wähle links deine Bausteine. Rechts siehst du in Echtzeit deine verbindliche Festpreis-Kalkulation.
            </p>
          </div>

          <div className="wizard-presets-deck">
            <span className="preset-deck-label">Preset:</span>
            <div className="preset-pill-group">
              <button 
                type="button" 
                className={`preset-pill-item ${activePreset === 'starter' ? 'active' : ''}`}
                onClick={() => setPreset('starter')}
              >
                Solo-Starter
              </button>
              <button 
                type="button" 
                className={`preset-pill-item ${activePreset === 'business' ? 'active' : ''}`}
                onClick={() => setPreset('business')}
              >
                B2B Business
              </button>
              <button 
                type="button" 
                className={`preset-pill-item ${activePreset === 'scale' ? 'active' : ''}`}
                onClick={() => setPreset('scale')}
              >
                Corporate
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

        {/* 2-COLUMN SPLIT WORKSPACE: Left = Selection / Right = Live Summary */}
        <div className="wizard-split-workspace">
          
          {/* LEFT COLUMN: The Interactive Selection Stage */}
          <div className="wizard-selection-panel glass-panel">
            
            {/* Desktop Stepper Bar (Grid) */}
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
                    <span className="stepper-tab-text">{step.shortLabel.replace(/^[0-9]+\.\s*/, '')}</span>
                    {step.category !== 'summary' && count > 0 && (
                      <span className="stepper-tab-count">{count}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Stepper - 6 connected nodes fitting 100% on phone screens */}
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
                      aria-label={`Schritt ${step.id}: ${step.categoryName}`}
                    >
                      <span className="mobile-pill-circle">
                        {isPast ? <Check size={11} /> : step.id}
                      </span>
                      <span className="mobile-pill-name">{step.shortLabel.replace(/^[0-9]+\.\s*/, '')}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Step Intro Header */}
            <div className="wizard-step-intro-bar">
              <div className="step-intro-text">
                <span className="step-meta-badge">Kategorie {currentStepIndex + 1} von 5</span>
                <h3 className="step-main-title">{currentStep.title}</h3>
                <p className="step-main-subtitle">{currentStep.subtitle}</p>
              </div>
            </div>

            {/* Step 1-5: Generous Module Cards */}
            {currentStepIndex < 5 && (
              <div className="wizard-cards-grid">
                {currentStepModules.map(mod => {
                  const isSelected = !!selectedConfig[mod.code]?.selected;
                  const quantity = selectedConfig[mod.code]?.quantity || 1;
                  const isCountable = mod.code === 'B-04' || mod.code === 'C-01' || mod.code === 'F-03';

                  return (
                    <div 
                      key={mod.code} 
                      className={`selection-card glass-panel ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleModule(mod.code)}
                    >
                      {/* Card Top: Badges & Price Tag */}
                      <div className="card-header-row">
                        <div className="card-badge-container">
                          {mod.isPopular && <span className="badge-tag popular">⭐ Bestseller</span>}
                          {mod.badge && !mod.isPopular && <span className="badge-tag custom">{mod.badge}</span>}
                          {!mod.badge && !mod.isPopular && (
                            <span className="badge-tag cat">{mod.categoryLabel.replace(/^[0-9]+\.\s*/, '')}</span>
                          )}
                        </div>

                        <div className="card-price-container">
                          <div className="card-price-main">
                            <strong className="price-bold">{mod.fixedPrice} €</strong>
                            <span className="price-unit-text">
                              {mod.billingType === 'Monatlich' ? ' /mtl.' : 
                               mod.billingType === 'Pro Seite' ? ' /Seite' : 
                               mod.billingType === 'Pro Sprache' ? ' /Sprache' : ''}
                            </span>
                          </div>
                          {mod.maxPrice > mod.fixedPrice && (
                            <span className="price-market-strike">
                              statt ~{mod.maxPrice} €
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Body: Title, Description & Highlights */}
                      <h4 className="card-heading">{mod.name}</h4>
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

                      {/* External notice if present */}
                      {mod.externalNotice && (
                        <div className="card-notice-box">
                          <span>💡 Hinweis: {mod.externalNotice}</span>
                        </div>
                      )}

                      {/* Countable Stepper */}
                      {isCountable && isSelected && (
                        <div className="card-stepper-box" onClick={(e) => e.stopPropagation()}>
                          <span className="stepper-title">
                            {mod.code === 'B-04' ? 'Zusatzseiten:' : mod.code === 'C-01' ? 'Texteinheiten:' : 'Sprachen:'}
                          </span>
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
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            onOpenDemo(mod); 
                          }}
                          title="Interaktive Live-Demo im Browser testen"
                        >
                          <Play size={12} className="play-icon" />
                          <span>Live-Demo ansehen</span>
                        </button>

                        <button 
                          type="button"
                          className={`btn-select-indicator ${isSelected ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleModule(mod.code);
                          }}
                        >
                          {isSelected ? (
                            <>
                              <CheckCircle2 size={14} />
                              <span>Ausgewählt</span>
                            </>
                          ) : (
                            <>
                              <Plus size={14} />
                              <span>{mod.category === 'basis' ? 'Paket wählen' : 'Auswählen'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 1: Dedicated Zusatzseiten Addon Box directly under the 3 Base Packages */}
            {currentStepIndex === 0 && (
              <div className="step1-zusatz-box glass-panel">
                <div className="zusatz-box-header">
                  <div className="zusatz-box-title-row">
                    <span className="zusatz-icon">📄</span>
                    <div className="zusatz-text-block">
                      <strong className="zusatz-title">Zusätzliche Unterseiten zubuchen?</strong>
                      <p className="zusatz-desc">
                        Erweitere dein gewähltes Basispaket um beliebig viele Unterseiten (+100 € Fixpreis pro Seite) im passenden Design.
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
                        +{zusatzQty} {zusatzQty === 1 ? 'Seite' : 'Seiten'} (+{(zusatzQty * 100).toLocaleString('de-AT')} €)
                      </span>
                    ) : (
                      <span className="zusatz-empty-hint">Keine Zusatzseiten</span>
                    )}
                  </div>
                </div>
              </div>
            )}


            {/* Step 6: Final Review Stage */}
            {currentStepIndex === 5 && (
              <div className="wizard-final-review-panel">
                <div className="review-welcome-box">
                  <div className="welcome-icon-box">
                    <Award size={28} className="text-cyan" />
                  </div>
                  <div className="welcome-text-box">
                    <h4>Perfekt! Deine Website-Konfiguration steht bereit.</h4>
                    <p>
                      Rechts findest du alle ausgewählten Positionen im Detail. Nach deiner unverbindlichen Anfrage besprechen wir offene Detailfragen in einem kurzen Video-Call und starten direkt mit der Umsetzung.
                    </p>
                  </div>
                </div>

                <div className="review-perks-grid">
                  <div className="perk-card glass-panel">
                    <Clock size={20} className="text-cyan" />
                    <h5>Schnelle Umsetzung</h5>
                    <p>In der Regel 2 bis 3 Wochen von der Freigabe bis zum finalen Livegang.</p>
                  </div>

                  <div className="perk-card glass-panel">
                    <Shield size={20} className="text-cyan" />
                    <h5>100% Festpreis-Garantie</h5>
                    <p>Keine versteckten Gebühren. 50% Anzahlung erst bei Start, 50% erst nach Freigabe.</p>
                  </div>

                  <div className="perk-card glass-panel">
                    <Zap size={20} className="text-cyan" />
                    <h5>Lighthouse 95+ Score</h5>
                    <p>Maximaler PageSpeed für Top-Rankings auf Google und blitzschnelle Ladezeiten.</p>
                  </div>

                  <div className="perk-card glass-panel">
                    <Layers size={20} className="text-cyan" />
                    <h5>Volle Eigentumsrechte</h5>
                    <p>Der Quellcode und alle Inhalte gehören zu 100% dir. Keine Abhängigkeiten.</p>
                  </div>
                </div>
              </div>
            )}

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
                  <span className="footer-hint">Schritt 1: Website-Fundament wählen</span>
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

          {/* RIGHT COLUMN: Live Configuration & Price Sidebar ("Was bisher konfiguriert wurde") */}
          <div className={`wizard-summary-column ${currentStepIndex < 5 ? 'mobile-hidden' : ''}`}>
            <div className="summary-sidebar-card glass-panel">
              
              {/* Sidebar Header */}
              <div className="sidebar-header">
                <div className="sidebar-title-wrap">
                  <h3 className="sidebar-heading">Deine Konfiguration</h3>
                  <span className="sidebar-count-badge">
                    {calculation.itemCount} Positionen
                  </span>
                </div>
                <div className="live-status-pill">
                  <span className="live-dot"></span>
                  <span>Echtzeit-Kalkulation</span>
                </div>
              </div>

              {/* What has been configured so far (Grouped by Category) */}
              <div className="sidebar-configured-list">
                {WIZARD_STEPS.slice(0, 5).map((step, idx) => {
                  const stepItems = selectedItemsStructured.filter(item => item.category === step.category);
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
                          <span>Noch keine Module ausgewählt</span>
                        </div>
                      ) : (
                        <div className="category-items-container">
                          {stepItems.map(item => (
                            <div key={item.code} className="configured-item-row">
                              <div className="item-info">
                                <span className="item-name">{item.name}{item.qtyLabel}</span>
                              </div>
                              <div className="item-price-wrap">
                                <span className="item-price">{item.priceFormatted}</span>
                                {item.code !== 'B-01' && item.code !== 'B-02' && item.code !== 'B-03' && item.code !== 'B-04' && (
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

                      {/* Quick-Add button in Sidebar if no Zusatzseite is selected yet */}
                      {step.category === 'basis' && zusatzQty === 0 && (
                        <div className="sidebar-add-zusatz-row">
                          <button 
                            type="button" 
                            className="btn-add-zusatz-mini"
                            onClick={() => handleUpdateZusatzseiten(1)}
                            title="Zusatzseite für 100 € hinzufügen"
                          >
                            <Plus size={11} />
                            <span>+ Zusatzseite hinzufügen (+100 €)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tax Toggle (Kleinunternehmer vs Regelbesteuerung) */}
              <div className="sidebar-tax-block">
                <div className="tax-label-row">
                  <span className="tax-head">Umsatzsteuer:</span>
                  <span className="tax-sub">{useTax ? '20% Regelbesteuerung' : '0% Kleinunternehmer'}</span>
                </div>
                <div className="tax-toggle-pill">
                  <button 
                    type="button"
                    className={`tax-btn ${!useTax ? 'active' : ''}`}
                    onClick={() => setUseTax(false)}
                  >
                    0% USt-frei (Kleinunternehmer)
                  </button>
                  <button 
                    type="button"
                    className={`tax-btn ${useTax ? 'active' : ''}`}
                    onClick={() => setUseTax(true)}
                  >
                    20% Regelbesteuerung
                  </button>
                </div>
              </div>

              {/* Price Calculations Box */}
              <div className="sidebar-pricing-box">
                <div className="pricing-calc-row">
                  <span>Zwischensumme Netto:</span>
                  <strong className="calc-amount">{calculation.oneTimeNet.toLocaleString('de-AT')} €</strong>
                </div>

                <div className="pricing-calc-row">
                  <span>USt. ({calculation.taxRate}%):</span>
                  <span>{useTax ? `${Math.round(calculation.oneTimeNet * 0.2).toLocaleString('de-AT')} €` : '0 € (gem. § 6 Abs. 1 Z 27)'}</span>
                </div>

                <div className="pricing-calc-row total-highlight">
                  <span className="total-label">Verbindlicher Festpreis:</span>
                  <strong className="total-number gradient-text">
                    {calculation.oneTimeGross.toLocaleString('de-AT')} €
                  </strong>
                </div>

                {calculation.mrrNet > 0 && (
                  <div className="pricing-calc-row mrr-line">
                    <span>Laufende Wartung:</span>
                    <strong className="text-purple">{calculation.mrrNet.toLocaleString('de-AT')} €/mtl.</strong>
                  </div>
                )}
              </div>

              {/* 50/50 Payment Guarantee */}
              <div className="sidebar-security-badge">
                <Shield size={15} className="text-cyan shield-icon" />
                <div className="security-text">
                  <strong>50/50 Meilenstein-Garantie:</strong>
                  <span>{calculation.downPayment50.toLocaleString('de-AT')} € Anzahlung bei Start · {calculation.finalPayment50.toLocaleString('de-AT')} € erst nach Freigabe & Livegang</span>
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
                  <span>Projekt jetzt unverbindlich anfragen</span>
                  <ArrowRight size={17} />
                </button>

                <button 
                  type="button"
                  className="btn-sidebar-pdf"
                  onClick={handleDownloadPdfOffer}
                  disabled={isGeneratingPdf || calculation.itemCount === 0}
                >
                  <Download size={15} className={isGeneratingPdf ? 'spin-icon' : ''} />
                  <span>{isGeneratingPdf ? 'Erstelle PDF-Angebot...' : 'Angebot als PDF herunterladen'}</span>
                </button>
              </div>

              {/* Guarantee Footer */}
              <div className="sidebar-guarantee-footer">
                <span>✓ 100% transparenter Festpreis ohne Überraschungen</span>
              </div>

            </div>
          </div>

        </div>

        {/* Mobile Sticky Action Dock (Always visible on mobile viewports for effortless navigation) */}
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
              title="Konfiguration ansehen"
            >
              <div className="mobile-dock-price-left">
                <span className="mobile-dock-label">Gesamt:</span>
                <strong className="mobile-dock-sum">{calculation.oneTimeGross.toLocaleString('de-AT')} €</strong>
              </div>
              <span className="mobile-dock-details-hint">Details ↑</span>
            </div>
          </div>

          <div className="mobile-dock-right">
            <button 
              type="button"
              className={`btn-mobile-dock-next ${countInCurrentStep === 0 && currentStepIndex > 0 ? 'skip-mode' : ''}`}
              onClick={handleNextStep}
            >
              <span>{nextButtonText}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Mobile Summary Drawer Sheet (Opens when user taps price on mobile) */}
        {showMobileSummary && (
          <div className="mobile-sheet-backdrop" onClick={() => setShowMobileSummary(false)}>
            <div className="mobile-sheet-content glass-panel" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-sheet-header">
                <div className="sheet-title-wrap">
                  <Layers size={18} className="text-cyan" />
                  <h4>Ihre Konfiguration ({calculation.itemCount} Positionen)</h4>
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
                        <span className="sheet-item-name">{item.name}{item.qtyLabel}</span>
                      </div>
                      <div className="sheet-item-price-wrap">
                        <span className="sheet-item-price">{item.priceFormatted}</span>
                        {item.code !== 'B-01' && item.code !== 'B-02' && item.code !== 'B-03' && item.code !== 'B-04' && (
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
                  {calculation.mrrNet > 0 && (
                    <div className="sheet-mrr-row">
                      <span>Laufende Wartung:</span>
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
                  <span>Fertig & weiter konfigurieren</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
