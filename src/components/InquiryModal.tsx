import React, { useState } from 'react';
import type { ProjectCalculation } from '../types/pricing';
import type { StructuredSelectedItem } from '../hooks/useProjectConfig';
import { MODULES_DATA } from '../data/modulesData';
import { trackEvent } from '../utils/analytics';
import {
  X,
  Send,
  CheckCircle2,
  Shield,
  FileText,
  Mail,
  Loader2,
  Download,
  MessageSquare
} from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculation: ProjectCalculation | null;
  selectedDetails: string[];
  structuredItems?: StructuredSelectedItem[];
  useTax?: boolean;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  calculation,
  selectedDetails,
  structuredItems,
  useTax
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

  const effectiveUseTax = useTax ?? (calculation ? calculation.taxRate > 0 : false);

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
      selectedDetails.map(d => `• ${d}`).join('\n') +
      `\n\n` +
      `----------------------------------------\n` +
      `FESTPREIS-KALKULATION:\n` +
      `• Projektpreis Netto: ${calculation ? calculation.oneTimeNet.toLocaleString('de-AT') : '0'} €\n` +
      `• Gesamtbetrag Fixpreis: ${calculation ? calculation.oneTimeGross.toLocaleString('de-AT') : '0'} €\n` +
      `• Meilenstein 1 (50% bei Start): ${calculation ? calculation.downPayment50.toLocaleString('de-AT') : '0'} €\n` +
      `• Meilenstein 2 (50% bei Livegang): ${calculation ? calculation.finalPayment50.toLocaleString('de-AT') : '0'} €\n` +
      (calculation && calculation.mrrNet > 0
        ? `• Laufendes Hosting & Wartung: ${calculation.mrrNet} € / Monat\n`
        : '') +
      `\n----------------------------------------\n` +
      `ZUSÄTZLICHE WÜNSCHE:\n` +
      `${notes || 'Keine zusätzlichen Wünsche'}\n\n` +
      `Beste Grüße,\n${name}`
  );

  const mailtoUrl = `mailto:maximilian.schlacher@outlook.com?cc=${encodeURIComponent(email)}&subject=${encodeURIComponent(`PureSite Angebot: ${company ? `${company} (${name})` : name}`)}&body=${mailtoBody}`;

  const whatsappText = encodeURIComponent(
    `Hallo PureSite Team! Ich interessiere mich für eine Website:\n` +
      `Name: ${name}\n` +
      (company ? `Firma: ${company}\n` : '') +
      `E-Mail: ${email}\n` +
      `Projektpreis: ${calculation?.oneTimeGross.toLocaleString('de-AT')} €\n` +
      `Module: ${selectedDetails.slice(0, 3).join(', ')}...`
  );
  const whatsappUrl = `https://wa.me/436766500468?text=${whatsappText}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: Record<string, string> = {
      _gotcha: '',
      _subject: `Neues PureSite Angebot: ${company ? `${company} (${name})` : name}`,
      name: name,
      email: email,
      company: company || 'Keine Angabe',
      phone: phone || 'Keine Angabe',
      timeline: timeline,
      message: notes || 'Keine zusätzlichen Wünsche',
      module: selectedDetails.join(' | '),
      preis_netto: calculation ? `${calculation.oneTimeNet.toLocaleString('de-AT')} €` : '',
      gesamtpreis: calculation ? `${calculation.oneTimeGross.toLocaleString('de-AT')} €` : '',
      anzahlung_50: calculation ? `${calculation.downPayment50.toLocaleString('de-AT')} €` : '',
      endzahlung_50: calculation ? `${calculation.finalPayment50.toLocaleString('de-AT')} €` : '',
      monatliche_wartung:
        calculation && calculation.mrrNet > 0 ? `${calculation.mrrNet} €/Monat` : 'Keine'
    };

    const buildFormData = () => {
      const fd = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        fd.append(key, value);
      });
      return fd;
    };

    const customEndpoint =
      (import.meta.env.VITE_SHIPMYFORM_ENDPOINT as string | undefined) ||
      'https://shipmyform.com/f/frm_ANVyMRKN6yaTy7wWSmnd';
    const instantEndpoint = 'https://shipmyform.com/to/maximilian.schlacher@outlook.com';

    const postToShipMyForm = async (url: string) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: buildFormData(),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        return res.ok;
      } catch {
        clearTimeout(timeoutId);
        return false;
      }
    };

    try {
      let delivered = await postToShipMyForm(customEndpoint);
      if (!delivered) {
        delivered = await postToShipMyForm(instantEndpoint);
      }
    } catch (err) {
      console.warn('ShipMyForm submission notice:', err);
    }

    try {
      const existing = JSON.parse(localStorage.getItem('puresite_inquiries') || '[]');
      existing.push({
        id: `REQ-${Date.now()}`,
        date: new Date().toISOString(),
        payload
      });
      localStorage.setItem('puresite_inquiries', JSON.stringify(existing));
    } catch {
      // ignore localStorage quota errors
    }

    setIsSubmitting(false);
    setSubmitted(true);
    trackEvent('inquiry_submitted', {
      totalGross: calculation?.oneTimeGross ?? 0,
      itemCount: calculation?.itemCount ?? 0,
      timeline
    });
    try {
      const { default: confetti } = await import('canvas-confetti');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore confetti errors
    }
  };

  const handleDownloadPdf = async () => {
    if (!calculation || isGeneratingPdf) return;
    trackEvent('pdf_quote_downloaded', {
      source: 'inquiry_modal',
      totalGross: calculation.oneTimeGross,
      itemCount: calculation.itemCount
    });
    setIsGeneratingPdf(true);
    try {
      const exactPdfItems =
        structuredItems && structuredItems.length > 0
          ? structuredItems.map(i => ({
              code: i.code,
              name: i.name,
              categoryLabel: i.categoryLabel,
              description: i.description,
              qtyLabel: i.qtyLabel,
              priceFormatted: i.priceFormatted,
              billingType: i.billingType,
              amount: i.amount
            }))
          : MODULES_DATA.filter(m =>
              selectedDetails.some(d => d.includes(m.name) || d.includes(m.code))
            ).map(m => ({
              code: m.code,
              name: m.name,
              categoryLabel: m.categoryLabel,
              description: m.description,
              qtyLabel: '',
              priceFormatted:
                m.billingType === 'Monatlich' ? `${m.fixedPrice} €/mtl.` : `${m.fixedPrice} €`,
              billingType: m.billingType,
              amount: m.fixedPrice
            }));

      const finalItems =
        exactPdfItems.length > 0
          ? exactPdfItems
          : selectedDetails.map((d, i) => ({
              code: `M-0${i + 1}`,
              name: d,
              categoryLabel: 'Gewähltes Modul',
              description: 'Im Festpreis-Paket enthalten',
              qtyLabel: '',
              priceFormatted: 'Inklusive',
              billingType: 'Einmalig',
              amount: 0
            }));

      const [{ generatePureSitePdf }] = await Promise.all([import('../utils/pdfGenerator')]);

      await generatePureSitePdf({
        calculation,
        items: finalItems,
        useTax: effectiveUseTax,
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
      <div
        className="inquiry-modal-container glass-panel modal-enter-anim"
        onClick={e => e.stopPropagation()}
      >
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
                  <FileText size={16} style={{ color: 'var(--pure-mint)' }} />
                  <strong>
                    Deine konfigurierte Auswahl ({calculation.itemCount} Bausteine):
                  </strong>
                </div>
                <div className="preview-chips">
                  {selectedDetails.map((d, i) => (
                    <span key={i} className="preview-chip">
                      {d.split(' (Hinweis:')[0]}
                    </span>
                  ))}
                </div>
                <div className="preview-totals-row">
                  <span>
                    Fixpreis ({effectiveUseTax ? 'inkl. 20% USt.' : '0% USt.'}):{' '}
                    <strong>{calculation.oneTimeGross.toLocaleString('de-AT')} €</strong>
                  </span>
                  <span>
                    Start-Anzahlung (50%):{' '}
                    <strong>{calculation.downPayment50.toLocaleString('de-AT')} €</strong>
                  </span>
                  {calculation.mrrNet > 0 && (
                    <span>
                      Betreuung: <strong>{calculation.mrrNet} €/mtl.</strong>
                    </span>
                  )}
                </div>
              </div>
            )}

            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px' }}
              aria-hidden="true"
            />

            <div className="form-grid-two">
              <div className="form-group">
                <label>Dein Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="z.B. Markus Huber"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="demo-input"
                />
              </div>

              <div className="form-group">
                <label>Firma / Unternehmen</label>
                <input
                  type="text"
                  name="company"
                  placeholder="z.B. Huber Holzbau GmbH"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="demo-input"
                />
              </div>
            </div>

            <div className="form-grid-two">
              <div className="form-group">
                <label>E-Mail-Adresse (für dein Angebot) *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@unternehmen.at"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="demo-input"
                />
              </div>

              <div className="form-group">
                <label>Telefonnummer (für Rückfragen)</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+43 664 ..."
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="demo-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Gewünschter Projektstart</label>
              <select
                name="timeline"
                value={timeline}
                onChange={e => setTimeline(e.target.value)}
                className="demo-input"
              >
                <option value="So schnell wie möglich">So schnell wie möglich</option>
                <option value="Innerhalb von 2-3 Wochen">Innerhalb von 2-3 Wochen</option>
                <option value="In den nächsten 1-2 Monaten">In den nächsten 1-2 Monaten</option>
                <option value="Nur Richtpreis-Orientierung">
                  Aktuell nur Orientierung &amp; Fragen
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Zusätzliche Wünsche oder bestehende Domain (optional)</label>
              <textarea
                name="message"
                rows={3}
                placeholder="Gibt es bereits ein Firmenlogo, Texte oder eine bestehende Website?"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="demo-input"
              ></textarea>
            </div>

            <div className="inquiry-guarantee-strip">
              <Shield size={16} className="text-emerald" />
              <span>
                100% kostenlos &amp; unverbindlich. 30 Tage Festpreisgarantie auf deine Auswahl.
              </span>
            </div>

            <div className="modal-actions-right">
              <button
                type="button"
                className="btn-secondary-sm"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Abbrechen
              </button>
              <button type="submit" className="btn-primary-sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="spin-icon" /> Wird übermittelt...
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
            <div
              className="success-icon-wrap"
              style={{
                background: 'rgba(88, 252, 165, 0.1)',
                border: '1px solid rgba(88, 252, 165, 0.3)',
                borderRadius: '50%',
                padding: '12px'
              }}
            >
              <CheckCircle2 size={44} style={{ color: 'var(--pure-mint)' }} />
            </div>
            <h3
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--text-pure)',
                margin: 0
              }}
            >
              Vielen Dank, {name || 'lieber Interessent'}!
            </h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.92rem',
                margin: 0,
                lineHeight: 1.5
              }}
            >
              Deine Anfrage für <strong>{company || 'dein Projekt'}</strong> (
              {calculation ? `${calculation.oneTimeGross.toLocaleString('de-AT')} €` : ''}) wurde
              registriert und an <strong>maximilian.schlacher@outlook.com</strong> übermittelt.
            </p>

            <div
              className="success-highlights"
              style={{ width: '100%', maxWidth: '480px', margin: '0.5rem auto' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={16} style={{ color: 'var(--pure-mint)', flexShrink: 0 }} />
                <span>
                  <strong>Sofort-Download:</strong> Lade dein personalisiertes Festpreis-PDF direkt
                  herunter.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={16} style={{ color: 'var(--pure-mint)', flexShrink: 0 }} />
                <span>
                  <strong>Festpreisgarantie:</strong> Die kalkulierten Bausteine sind 30 Tage lang
                  verbindlich fixiert.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: 'var(--pure-mint)', flexShrink: 0 }} />
                <span>
                  <strong>Persönlich:</strong> Maximilian prüft deine Anforderungen und meldet sich
                  innerhalb von 24h.
                </span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                width: '100%',
                maxWidth: '440px',
                marginTop: '0.4rem'
              }}
            >
              <button
                type="button"
                className="button primary"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Download size={16} className={isGeneratingPdf ? 'spin-anim' : ''} />
                <span>
                  {isGeneratingPdf
                    ? 'Erstelle personalisiertes PDF...'
                    : 'Angebot jetzt als PDF herunterladen'}
                </span>
              </button>

              <a
                href={mailtoUrl}
                className="button secondary"
                style={{
                  textDecoration: 'none',
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '0.85rem'
                }}
              >
                <Mail size={15} />
                <span>Optional: In eigener E-Mail-App öffnen</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button secondary"
                onClick={() =>
                  trackEvent('whatsapp_cta_clicked', {
                    totalGross: calculation?.oneTimeGross ?? 0
                  })
                }
                style={{
                  textDecoration: 'none',
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '0.85rem'
                }}
              >
                <MessageSquare size={15} />
                <span>Per WhatsApp kontaktieren</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                marginTop: '0.35rem',
                textDecoration: 'underline'
              }}
            >
              Schließen &amp; zurück zur Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
