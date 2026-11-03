import React, { useState } from 'react';
import type { ProjectCalculation } from '../types/pricing';
import { MODULES_DATA } from '../data/modulesData';
import { generatePureSitePdf } from '../utils/pdfGenerator';
import { X, Send, CheckCircle2, Shield, FileText, Mail, Loader2, Download, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculation: ProjectCalculation | null;
  selectedDetails: string[];
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  calculation,
  selectedDetails
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timeline, setTimeline] = useState('Innerhalb von 2-3 Wochen');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!isOpen) return null;

  const mailtoBody = encodeURIComponent(
    `Hallo Maximilian (PureSite Team),\n\n` +
    `ich interessiere mich für folgendes Website-Projekt:\n\n` +
    `----------------------------------------\n` +
    `KONTAKTDATEN:\n` +
    `• Name: ${name}\n` +
    `• Firma: ${company || 'Privat / Keine Angabe'}\n` +
    `• E-Mail: ${email}\n` +
    `• Telefon: ${phone || 'Keine Angabe'}\n` +
    `• Gewünschter Start: ${timeline}\n\n` +
    `----------------------------------------\n` +
    `AUSGEWÄHLTE MODULE (${selectedDetails.length}):\n` +
    selectedDetails.map(d => `• ${d}`).join('\n') + `\n\n` +
    `----------------------------------------\n` +
    `FESTPREIS-KALKULATION:\n` +
    `• Projektpreis Netto: ${calculation ? calculation.oneTimeNet.toLocaleString('de-AT') : '0'} €\n` +
    `• Gesamtbetrag Fixpreis: ${calculation ? calculation.oneTimeGross.toLocaleString('de-AT') : '0'} €\n` +
    `• Meilenstein 1 (50% bei Start): ${calculation ? calculation.downPayment50.toLocaleString('de-AT') : '0'} €\n` +
    `• Meilenstein 2 (50% bei Livegang): ${calculation ? calculation.finalPayment50.toLocaleString('de-AT') : '0'} €\n` +
    (calculation && calculation.mrrNet > 0 ? `• Laufendes Hosting & Wartung: ${calculation.mrrNet} € / Monat\n` : '') +
    `\n----------------------------------------\n` +
    `ZUSÄTZLICHE WÜNSCHE:\n` +
    `${notes || 'Keine zusätzlichen Wünsche'}\n\n` +
    `Beste Grüße,\n${name}`
  );

  // CC to the user's email address ensures they get their own copy immediately!
  const mailtoUrl = `mailto:maximilian.schlacher@outlook.com?cc=${encodeURIComponent(email)}&subject=${encodeURIComponent(`PureSite Angebot: ${company ? `${company} (${name})` : name}`)}&body=${mailtoBody}`;

  const whatsappText = encodeURIComponent(
    `Hallo PureSite Team! Ich interessiere mich für eine Website:\n` +
    `Name: ${name}\n` +
    (company ? `Firma: ${company}\n` : '') +
    `E-Mail: ${email}\n` +
    `Projektpreis: ${calculation?.oneTimeGross.toLocaleString('de-AT')} €\n` +
    `Module: ${selectedDetails.slice(0, 3).join(', ')}...`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      _subject: `Neues PureSite Angebot: ${company ? `${company} (${name})` : name}`,
      _replyto: email,
      name: name,
      firma: company || 'Keine Angabe',
      email: email,
      telefon: phone || 'Keine Angabe',
      projektstart: timeline,
      nachricht: notes || 'Keine zusätzlichen Wünsche',
      module: selectedDetails.join(' | '),
      preis_netto: calculation ? `${calculation.oneTimeNet.toLocaleString('de-AT')} €` : '',
      gesamtpreis: calculation ? `${calculation.oneTimeGross.toLocaleString('de-AT')} €` : '',
      anzahlung_50: calculation ? `${calculation.downPayment50.toLocaleString('de-AT')} €` : '',
      endzahlung_50: calculation ? `${calculation.finalPayment50.toLocaleString('de-AT')} €` : '',
      monatliche_wartung: calculation && calculation.mrrNet > 0 ? `${calculation.mrrNet} €/Monat` : 'Keine'
    };

    // 1. Post to ShipMyForm endpoint
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      await fetch('https://shipmyform.com/to/maximilian.schlacher@outlook.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
    } catch (err) {
      console.warn('ShipMyForm submission notice:', err);
    }

    // 2. Open user's email client with CC so both parties receive an instant copy
    try {
      window.location.href = mailtoUrl;
    } catch {
      // Handled via button on success screen
    }

    setIsSubmitting(false);
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDownloadPdf = async () => {
    if (!calculation || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const itemsForPdf = MODULES_DATA
        .filter(m => selectedDetails.some(d => d.includes(m.name) || d.includes(m.code)))
        .map(m => {
          return {
            code: m.code,
            name: m.name,
            categoryLabel: m.categoryLabel,
            description: m.description,
            qtyLabel: '',
            priceFormatted: m.billingType === 'Monatlich' ? `${m.fixedPrice} €/mtl.` : `${m.fixedPrice} €`,
            billingType: m.billingType,
            amount: m.fixedPrice
          };
        });

      const finalItems = itemsForPdf.length > 0 ? itemsForPdf : selectedDetails.map((d, i) => ({
        code: `M-0${i + 1}`,
        name: d,
        categoryLabel: 'Gewähltes Modul',
        description: 'Im Festpreis-Paket enthalten',
        qtyLabel: '',
        priceFormatted: 'Inklusive',
        billingType: 'Einmalig',
        amount: 0
      }));

      await generatePureSitePdf({
        calculation,
        items: finalItems,
        useTax: true,
        clientName: name || undefined,
        clientCompany: company || undefined
      });
    } catch (err) {
      console.warn('PDF download error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="inquiry-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="demo-modal-header">
          <div className="demo-header-left">
            <span className="demo-code-badge">Anfrage</span>
            <div>
              <div className="demo-category-tag">PureSite Angebotsservice</div>
              <h2 className="demo-modal-title">Unverbindliches Angebot anfordern</h2>
            </div>
          </div>
          <button className="demo-close-btn" onClick={onClose} aria-label="Schließen">
            <X size={20} />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="inquiry-form-body">
            {/* Overview Box */}
            {calculation && calculation.itemCount > 0 && (
              <div className="inquiry-summary-preview">
                <div className="preview-header">
                  <FileText size={16} className="text-cyan" />
                  <strong>Deine konfigurierte Auswahl ({calculation.itemCount} Bausteine):</strong>
                </div>
                <div className="preview-chips">
                  {selectedDetails.map((d, i) => (
                    <span key={i} className="preview-chip">{d}</span>
                  ))}
                </div>
                <div className="preview-totals-row">
                  <span>Einmalig (Netto): <strong>{calculation.oneTimeNet.toLocaleString('de-AT')} €</strong></span>
                  {calculation.mrrNet > 0 && <span>Wartung: <strong>{calculation.mrrNet} €/mtl.</strong></span>}
                </div>
              </div>
            )}

            <div className="form-grid-two">
              <div className="form-group">
                <label>Dein Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="z.B. Markus Huber" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="demo-input"
                />
              </div>

              <div className="form-group">
                <label>Firma / Unternehmen</label>
                <input 
                  type="text" 
                  placeholder="z.B. Huber Holzbau GmbH" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="demo-input"
                />
              </div>
            </div>

            <div className="form-grid-two">
              <div className="form-group">
                <label>E-Mail-Adresse (für dein Angebot) *</label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@unternehmen.at" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="demo-input"
                />
              </div>

              <div className="form-group">
                <label>Telefonnummer (für Rückfragen)</label>
                <input 
                  type="tel" 
                  placeholder="+43 664 ..." 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="demo-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Gewünschter Projektstart</label>
              <select 
                value={timeline} 
                onChange={(e) => setTimeline(e.target.value)}
                className="demo-input"
              >
                <option value="So schnell wie möglich">So schnell wie möglich</option>
                <option value="Innerhalb von 2-3 Wochen">Innerhalb von 2-3 Wochen</option>
                <option value="In den nächsten 1-2 Monaten">In den nächsten 1-2 Monaten</option>
                <option value="Nur Richtpreis-Orientierung">Aktuell nur Orientierung & Fragen</option>
              </select>
            </div>

            <div className="form-group">
              <label>Zusätzliche Wünsche oder bestehende Domain (optional)</label>
              <textarea 
                rows={3}
                placeholder="Gibt es bereits ein Firmenlogo, Texte oder eine bestehende Website?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="demo-input"
              ></textarea>
            </div>

            <div className="inquiry-guarantee-strip">
              <Shield size={16} className="text-emerald" />
              <span>100% kostenlos & unverbindlich. Angebot wird sofort für dich vorbereitet.</span>
            </div>

            <div className="modal-actions-right">
              <button type="button" className="btn-secondary-sm" onClick={onClose} disabled={isSubmitting}>
                Abbrechen
              </button>
              <button type="submit" className="btn-primary-sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="spin-icon" /> Wird vorbereitet...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Angebot anfordern
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="inquiry-success-stage">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} className="text-cyan" />
            </div>
            <h3>Vielen Dank, {name || 'lieber Interessent'}!</h3>
            <p>
              Deine Projekt-Konfiguration für <strong>{company || 'dein Vorhaben'}</strong> ({calculation ? `${calculation.oneTimeGross.toLocaleString('de-AT')} €` : ''}) liegt bereit.
            </p>

            <div className="success-highlights" style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: 'var(--pure-mint)', flexShrink: 0 }} />
                <span><strong>E-Mail-Kopie:</strong> Sende dir selbst & Maximilian eine direkte Kopie.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={16} style={{ color: 'var(--pure-mint)', flexShrink: 0 }} />
                <span><strong>Sofort-Download:</strong> Lade dein verbindliches Festpreis-PDF sofort herunter.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={16} style={{ color: 'var(--pure-mint)', flexShrink: 0 }} />
                <span><strong>Persönlich:</strong> Wir prüfen deine Modulauswahl und melden uns binnen 24h.</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', maxWidth: '440px', marginTop: '0.8rem' }}>
              <button 
                type="button"
                className="button primary"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Download size={16} className={isGeneratingPdf ? 'spin-anim' : ''} />
                <span>{isGeneratingPdf ? 'Erstelle PDF...' : 'Angebot jetzt als PDF herunterladen'}</span>
              </button>

              <a 
                href={mailtoUrl} 
                className="button secondary"
                style={{ textDecoration: 'none', width: '100%', justifyContent: 'center' }}
              >
                <Mail size={16} />
                <span>In E-Mail-App öffnen (Kopie an mich & Maximilian)</span>
              </a>

              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="button secondary"
                style={{ textDecoration: 'none', width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
              >
                <MessageSquare size={15} />
                <span>Per WhatsApp anfragen</span>
              </a>
            </div>

            <button 
              type="button" 
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem', marginTop: '0.5rem', textDecoration: 'underline' }}
            >
              Fenster schließen & zurück zur Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
