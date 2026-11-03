import React, { useState, useMemo } from 'react';
import { MODULES_DATA } from '../data/modulesData';
import type { PricingModule, SelectedConfig, ProjectCalculation } from '../types/pricing';
import { 
  Check, Plus, Minus, Sparkles, Play, 
  CheckCircle2, Shield, ArrowRight, ArrowLeft, Download, 
  FileText, ShieldCheck, ChevronRight, Edit3, Sparkle
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
    subtitle: 'Das Grundgerüst deiner neuen Website. Wähle die passende Seitenanzahl und Architektur für deinen Betrieb.'
  },
  {
    id: 2,
    category: 'frontend',
    shortLabel: '2. Frontend',
    categoryName: 'Frontend-Features',
    nextStepName: 'Backend & Tools',
    title: 'Schritt 2 von 5: Interaktive Frontend-Features',
    subtitle: 'Begeistere deine Besucher mit interaktiven Rechnern, flüssigen Animationen oder einem Theme-Switcher.'
  },
  {
    id: 3,
    category: 'tech',
    shortLabel: '3. Backend',
    categoryName: 'Backend-Features',
    nextStepName: 'Content & SEO',
    title: 'Schritt 3 von 5: Backend, CMS & Automatisierung',
    subtitle: 'Automatisiere deine Abläufe mit Online-Terminbuchung, Headless CMS oder modernen Bewerber-Funnels.'
  },
  {
    id: 4,
    category: 'content',
    shortLabel: '4. Content',
    categoryName: 'Content & SEO',
    nextStepName: 'Hosting & Wartung',
    title: 'Schritt 4 von 5: Texterstellung & Suchmaschinen',
    subtitle: 'Professionelle Verkaufstexte und gezielte Google-Optimierung für spürbar mehr Kundenanfragen.'
  },
  {
    id: 5,
    category: 'hosting',
    shortLabel: '5. Hosting',
    categoryName: 'Wartungspaket',
    nextStepName: 'Gesamtkalkulation',
    title: 'Schritt 5 von 5: High-Speed Hosting & Zuruf-Service',
    subtitle: 'DSGVO-konformes NVMe-Hosting in Österreich, SSL-Zertifikate und persönlicher Support per WhatsApp & Mail.'
  },
  {
    id: 6,
    category: 'summary',
    shortLabel: '6. Angebot',
    categoryName: 'Gesamtkalkulation',
    nextStepName: '',
    title: 'Deine maßgeschneiderte Festpreis-Kalkulation',
    subtitle: '100% transparent. Lade dein verbindliches Festpreis-PDF herunter oder sichere dir direkt ein unverbindliches Erstgespräch.'
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

  // Smooth scroll to top of calculator container
  const scrollToCalculator = () => {
    const el = document.getElementById('preise');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Toggle selection
  const toggleModule = (code: string) => {
    setIsCustomMode(false);
    setSelectedConfig(prev => {
      const current = prev[code];
      const isSelected = current ? current.selected : false;

      // If choosing a basis packet, mutually exclusive logic for primary basis packet (B-01, B-02, B-03)
      let next = { ...prev };
      if (!isSelected && (code === 'B-01' || code === 'B-02' || code === 'B-03')) {
        next['B-01'] = { selected: false, quantity: 1 };
        next['B-02'] = { selected: false, quantity: 1 };
        next['B-03'] = { selected: false, quantity: 1 };
      }

      next[code] = {
        selected: !isSelected,
        quantity: current?.quantity && current.quantity > 0 ? current.quantity : 1
      };
      return next;
    });
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

  // Determine which preset is currently active (or custom)
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
    return MODULES_DATA.filter(m => m.category === currentStep.category);
  }, [currentStep.category]);

  // Number of selected modules in current step
  const countInCurrentStep = useMemo(() => {
    if (currentStep.category === 'summary') return 0;
    return MODULES_DATA.filter(
      m => m.category === currentStep.category && selectedConfig[m.code]?.selected
    ).length;
  }, [currentStep.category, selectedConfig]);

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
    const list: { code: string; category: string; name: string; qtyLabel: string; priceFormatted: string; fullText: string; isMonthly: boolean }[] = [];
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
          isMonthly: m.billingType === 'Monatlich'
        });
      }
    });
    return list;
  }, [selectedConfig]);

  // Selected details array for inquiries and copy
  const selectedDetails = useMemo(() => {
    return selectedItemsStructured.map(i => i.fullText);
  }, [selectedItemsStructured]);

  // Dynamic Next Button Text
  const nextButtonText = useMemo(() => {
    if (currentStepIndex === 5) {
      return 'Jetzt Projekt unverbindlich anfragen';
    }

    const step = WIZARD_STEPS[currentStepIndex];

    if (currentStepIndex === 0) {
      // Base package step (Step 1)
      if (countInCurrentStep === 0) {
        return 'Bitte wähle ein Basispaket';
      }
      return `Weiter zu ${step.nextStepName} →`;
    }

    if (countInCurrentStep === 0) {
      if (currentStepIndex === 4) {
        return `Ohne ${step.categoryName} zur Gesamtkalkulation →`;
      }
      return `Ohne ${step.categoryName} fortfahren →`;
    }

    if (currentStepIndex === 4) {
      return 'Weiter zur Gesamtkalkulation →';
    }

    return `Weiter zu ${step.nextStepName} →`;
  }, [currentStepIndex, countInCurrentStep]);

  // Navigation handlers
  const handleNextStep = () => {
    if (currentStepIndex === 0 && countInCurrentStep === 0) {
      return; // Must select base package
    }
    if (currentStepIndex === 5) {
      onRequestQuote(calculation, selectedDetails);
      return;
    }
    setCurrentStepIndex(prev => Math.min(WIZARD_STEPS.length - 1, prev + 1));
    scrollToCalculator();
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      scrollToCalculator();
    }
  };

  const handleGoToStep = (stepIdx: number) => {
    setCurrentStepIndex(stepIdx);
    scrollToCalculator();
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
    <section id="preise" className="pricing-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-head text-center">
          <div className="badge-pill">
            <Sparkles size={14} /> Geführter Fixpreis-Konfigurator
          </div>
          <h2 className="section-title">
            Schritt für Schritt zu deiner <span className="gradient-text">Wunsch-Website</span>.
          </h2>
          <p className="section-subtitle">
            Wähle dein Fundament und ergänze nur die Features, die für deinen Betrieb echten Mehrwert bringen. 100% verbindlicher Fixpreis – ohne versteckte Agentur-Aufschläge.
          </p>

          {/* Quick Presets */}
          <div className="presets-bar">
            <span className="preset-label">Oder wähle eine Start-Kombination:</span>
            <button 
              type="button"
              className={`preset-pill ${activePreset === 'starter' ? 'active' : ''}`} 
              onClick={() => setPreset('starter')}
            >
              <span>🚀 Solo-Starter</span> <small className="preset-sub">(One-Pager)</small>
            </button>
            <button 
              type="button"
              className={`preset-pill ${activePreset === 'business' ? 'active' : ''}`} 
              onClick={() => setPreset('business')}
            >
              <span>💼 B2B Business</span> <small className="preset-sub">(Mehrseitig + Rechner)</small>
            </button>
            <button 
              type="button"
              className={`preset-pill ${activePreset === 'scale' ? 'active' : ''}`} 
              onClick={() => setPreset('scale')}
            >
              <span>👑 Corporate</span> <small className="preset-sub">(Design + CMS)</small>
            </button>
            <button 
              type="button"
              className={`preset-pill ${activePreset === 'custom' ? 'active' : ''}`} 
              onClick={() => setPreset('custom')}
            >
              <span>⚡ Benutzerdefiniert</span> <small className="preset-sub">(Individuell)</small>
            </button>
          </div>
        </div>

        {/* Step-by-Step Progress Stepper Navigation Bar */}
        <div className="wizard-stepper-wrap glass-panel">
          <div className="wizard-stepper-strip">
            {WIZARD_STEPS.map((step, idx) => {
              const isActive = currentStepIndex === idx;
              const isPast = currentStepIndex > idx;
              
              // Count how many modules are chosen in this step
              const stepCount = step.category === 'summary' 
                ? calculation.itemCount 
                : MODULES_DATA.filter(m => m.category === step.category && selectedConfig[m.code]?.selected).length;

              return (
                <button
                  key={step.id}
                  type="button"
                  className={`wizard-step-node ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                  onClick={() => handleGoToStep(idx)}
                >
                  <div className="step-circle">
                    {isPast ? <Check size={14} /> : step.id}
                  </div>
                  <div className="step-node-text">
                    <span className="step-node-label">{step.shortLabel}</span>
                    {step.category !== 'summary' && stepCount > 0 && (
                      <span className="step-node-count">{stepCount} gewählt</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wizard Main Content Area */}
        <div className="wizard-stage">
          {/* Step Header */}
          <div className="wizard-step-header">
            <div className="wizard-step-title-wrap">
              <span className="wizard-step-badge">
                Schritt {currentStep.id} von 5 {currentStep.id === 6 && '· Fertig'}
              </span>
              <h3 className="wizard-step-title">{currentStep.title}</h3>
              <p className="wizard-step-subtitle">{currentStep.subtitle}</p>
            </div>

            {/* Quick tax toggle on desktop if in summary */}
            {currentStepIndex === 5 && (
              <div className="wizard-summary-tax-toggle">
                <div className="tax-toggle-group">
                  <button 
                    type="button"
                    className={`tax-toggle-btn ${!useTax ? 'active' : ''}`}
                    onClick={() => setUseTax(false)}
                    title="Kleinunternehmerregelung gem. § 6 Abs. 1 Z 27 UStG"
                  >
                    <span className="tax-btn-full">0% (Kleinunternehmer)</span>
                    <span className="tax-btn-short">0% USt-frei</span>
                  </button>
                  <button 
                    type="button"
                    className={`tax-toggle-btn ${useTax ? 'active' : ''}`}
                    onClick={() => setUseTax(true)}
                  >
                    <span className="tax-btn-full">20% Regelbesteuerung</span>
                    <span className="tax-btn-short">20% USt.</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 1-5: Modular Cards for Current Category */}
          {currentStepIndex < 5 && (
            <div className="modules-cards-grid wizard-modules-grid">
              {currentStepModules.map(mod => {
                const isSelected = !!selectedConfig[mod.code]?.selected;
                const quantity = selectedConfig[mod.code]?.quantity || 1;
                const isCountable = mod.code === 'B-04' || mod.code === 'C-01' || mod.code === 'F-03';

                return (
                  <div 
                    key={mod.code} 
                    className={`module-card glass-panel ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="module-card-top">
                      <div className="module-header-tags">
                        <span className="module-category-tag">{mod.categoryLabel}</span>
                        {mod.badge && <span className="module-badge-tag">{mod.badge}</span>}
                        {mod.isPopular && <span className="module-badge-popular">⭐ Bestseller</span>}
                      </div>
                      
                      <div className="module-price-block">
                        <div className="module-price-main">
                          {mod.fixedPrice} €
                          <span className="module-price-unit">
                            {mod.billingType === 'Pro Seite' ? ' / Seite' : 
                             mod.billingType === 'Pro Sprache' ? ' / Sprache' :
                             mod.billingType === 'Monatlich' ? ' / mtl.' : ' Fixpreis'}
                          </span>
                        </div>
                        <div className="module-market-compare">
                          Marktpreis: <span className="strikethrough">{mod.maxPrice} €</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="module-title">{mod.name}</h3>
                    <p className="module-description">{mod.description}</p>

                    {/* Scope checkmarks */}
                    <ul className="module-scope-list">
                      {mod.scopeHighlights.slice(0, 3).map((item, idx) => (
                        <li key={idx}>
                          <Check size={14} className="check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Quantity controls if countable */}
                    {isCountable && isSelected && (
                      <div className="quantity-counter-row">
                        <span className="qty-label">
                          {mod.code === 'B-04' ? 'Zusatzseiten Anzahl:' : 
                           mod.code === 'C-01' ? 'Texterstellung Seiten:' : 'Zusätzliche Sprachen:'}
                        </span>
                        <div className="stepper-controls">
                          <button 
                            type="button" 
                            className="stepper-btn" 
                            onClick={() => updateQuantity(mod.code, -1)}
                            aria-label="Anzahl verringern"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="stepper-val">{quantity}</span>
                          <button 
                            type="button" 
                            className="stepper-btn" 
                            onClick={() => updateQuantity(mod.code, 1)}
                            aria-label="Anzahl erhöhen"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Actions: Live Demo + Select Module */}
                    <div className="module-card-footer">
                      <button 
                        type="button"
                        className="btn-demo-trigger"
                        onClick={() => onOpenDemo(mod)}
                        title="Live Demo ausprobieren"
                      >
                        <Play size={14} className="play-icon" />
                        <span>Live-Demo</span>
                      </button>

                      <button 
                        type="button"
                        className={`btn-select-module ${isSelected ? 'active' : ''}`}
                        onClick={() => toggleModule(mod.code)}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 size={16} /> Gewählt
                          </>
                        ) : (
                          <>
                            <Plus size={16} /> Auswählen
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 6: Full Transparent Project Summary */}
          {currentStepIndex === 5 && (
            <div className="wizard-summary-layout">
              {/* Left Column: Grouped selected modules with direct Edit links */}
              <div className="wizard-summary-breakdown glass-panel">
                <div className="summary-breakdown-head">
                  <h4>Gewählte Bausteine nach Kategorien</h4>
                  <p>Du kannst jederzeit zu jedem Schritt zurückkehren und Änderungen vornehmen.</p>
                </div>

                <div className="summary-steps-review-list">
                  {WIZARD_STEPS.slice(0, 5).map((step, idx) => {
                    const stepItems = selectedItemsStructured.filter(item => item.category === step.category);

                    return (
                      <div key={step.id} className="summary-step-group">
                        <div className="summary-step-group-header">
                          <div className="summary-step-group-title">
                            <span className="step-dot"></span>
                            <strong>{step.shortLabel.replace(/^[0-9]+\.\s*/, '')}</strong>
                          </div>
                          <button 
                            type="button" 
                            className="btn-edit-step" 
                            onClick={() => handleGoToStep(idx)}
                          >
                            <Edit3 size={13} />
                            <span>Bearbeiten</span>
                          </button>
                        </div>

                        {stepItems.length === 0 ? (
                          <div className="summary-step-empty-note">
                            Keine Zusatzmodule gewählt (Grundausstattung)
                          </div>
                        ) : (
                          <div className="summary-step-items">
                            {stepItems.map(item => (
                              <div key={item.code} className="summary-step-item-row">
                                <span className="item-name">
                                  {item.name}{item.qtyLabel}
                                </span>
                                <span className={`item-price ${item.isMonthly ? 'text-purple' : 'text-cyan'}`}>
                                  {item.priceFormatted}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Pricing Totals, Payment milestones & CTAs */}
              <div className="wizard-summary-sidebar">
                <div className="summary-sticky-card glass-panel">
                  <div className="summary-card-header">
                    <div className="summary-title-wrap">
                      <h4>Verbindliches Festpreisangebot</h4>
                      <span className="summary-count-badge">{calculation.itemCount} Positionen</span>
                    </div>
                  </div>

                  {/* Price Calculations */}
                  <div className="summary-price-calculations">
                    <div className="calc-row">
                      <span>Einmalige Entwicklung (Netto):</span>
                      <strong className="calc-val">{calculation.oneTimeNet.toLocaleString('de-AT')} €</strong>
                    </div>

                    <div className="calc-row">
                      <span>Umsatzsteuer ({calculation.taxRate}%):</span>
                      <span className="calc-val">
                        {useTax ? `${Math.round(calculation.oneTimeNet * 0.2).toLocaleString('de-AT')} €` : '0 € (USt-befreit)'}
                      </span>
                    </div>

                    <div className="calc-row highlight-total">
                      <span>Gesamtpreis (Fixpreis):</span>
                      <strong className="calc-total-val gradient-text">
                        {calculation.oneTimeGross.toLocaleString('de-AT')} €
                      </strong>
                    </div>

                    {calculation.mrrNet > 0 && (
                      <div className="calc-row mrr-row">
                        <span>Laufende Kosten (Hosting/Wartung):</span>
                        <strong className="calc-mrr-val text-purple">
                          {calculation.mrrNet.toLocaleString('de-AT')} € / mtl.
                        </strong>
                      </div>
                    )}
                  </div>

                  {/* Payment Milestones (50 / 50) */}
                  <div className="payment-milestone-box">
                    <div className="milestone-title">
                      <Shield size={14} />
                      <span>Transparente 50/50 Zahlungsgarantie:</span>
                    </div>
                    <div className="milestone-steps">
                      <div className="milestone-step">
                        <span className="step-label">1. Start-Anzahlung (50%):</span>
                        <strong className="step-amount">{calculation.downPayment50.toLocaleString('de-AT')} €</strong>
                      </div>
                      <div className="milestone-step">
                        <span className="step-label">2. Nach Freigabe & Live (50%):</span>
                        <strong className="step-amount">{calculation.finalPayment50.toLocaleString('de-AT')} €</strong>
                      </div>
                    </div>
                  </div>

                  {/* Estimated Hours & Savings badge */}
                  <div className="summary-meta-badges">
                    <div className="meta-badge">
                      <span>Kalkulierter Entwicklungsaufwand:</span>
                      <strong>ca. {calculation.totalHours} Stunden</strong>
                    </div>
                    {calculation.savingsTotal > 0 && (
                      <div className="meta-badge savings-badge">
                        <span>Ersparnis vs. Großagenturen:</span>
                        <strong className="text-emerald">Ø {calculation.savingsTotal.toLocaleString('de-AT')} € gespart</strong>
                      </div>
                    )}
                  </div>

                  {/* CTAs in Summary */}
                  <div className="wizard-final-ctas">
                    <button 
                      type="button"
                      className="btn-quote-submit"
                      onClick={() => onRequestQuote(calculation, selectedDetails)}
                    >
                      <span>Jetzt unverbindlich anfragen</span>
                      <ArrowRight size={18} />
                    </button>

                    <button 
                      type="button"
                      className="btn-download-pdf-offer"
                      onClick={handleDownloadPdfOffer}
                      disabled={isGeneratingPdf || calculation.itemCount === 0}
                    >
                      <Download size={16} className={isGeneratingPdf ? 'spin-icon' : ''} />
                      <span>
                        {isGeneratingPdf ? 'PDF wird erstellt...' : 'Angebot als PDF herunterladen'}
                      </span>
                    </button>
                  </div>

                  <p className="summary-guarantee-note">
                    🔒 Verbindliches Angebot mit 30 Tagen Preisgarantie. Keine versteckten Kosten.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Bottom Navigation Bar (Steps 1 to 5) */}
        {currentStepIndex < 5 && (
          <div className="wizard-bottom-bar glass-panel">
            <div className="wizard-bar-container">
              {/* Back Button */}
              <div className="wizard-bar-left">
                {currentStepIndex > 0 ? (
                  <button 
                    type="button" 
                    className="btn-wizard-back" 
                    onClick={handlePrevStep}
                  >
                    <ArrowLeft size={16} />
                    <span>Zurück</span>
                  </button>
                ) : (
                  <span className="wizard-bar-hint">Schritt 1: Basis-Website</span>
                )}
              </div>

              {/* Center Live Price Badge */}
              <div className="wizard-bar-center">
                <div className="wizard-live-price-pill">
                  <span className="live-price-label">Zwischensumme:</span>
                  <strong className="live-price-val text-cyan">
                    {calculation.oneTimeGross.toLocaleString('de-AT')} €
                  </strong>
                  {calculation.mrrNet > 0 && (
                    <span className="live-mrr-val text-purple">
                      + {calculation.mrrNet} €/mtl.
                    </span>
                  )}
                  <span className="live-count-chip">
                    {calculation.itemCount} Positionen
                  </span>
                </div>
              </div>

              {/* Dynamic Next Button */}
              <div className="wizard-bar-right">
                <button 
                  type="button"
                  className={`btn-wizard-next ${countInCurrentStep === 0 && currentStepIndex > 0 ? 'skip-mode' : ''}`}
                  onClick={handleNextStep}
                >
                  <span>{nextButtonText}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
