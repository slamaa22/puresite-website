import React, { useState } from 'react';
import type { ProjectCalculation } from '../types/pricing';
import { X, Send, CheckCircle2, Shield, FileText, Mail, Loader2 } from 'lucide-react';
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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      _subject: `Neues PureSite Angebot angefragt: ${company ? `${company} (${name})` : name}`,
      _captcha: 'false',
      _template: 'table',
      Name: name,
      Firma: company || 'Keine Angabe',
      Email: email,
      Telefon: phone || 'Keine Angabe',
      Projektstart: timeline,
      Zusaetzliche_Wuensche: notes || 'Keine',
      Ausgewaehlte_Module: selectedDetails.join(' | '),
      Einmalig_Netto: calculation ? `${calculation.oneTimeNet.toLocaleString('de-AT')} €` : '',
      Projekt_Gesamtbetrag: calculation ? `${calculation.oneTimeGross.toLocaleString('de-AT')} €` : '',
      Anzahlung_Start_50: calculation ? `${calculation.downPayment50.toLocaleString('de-AT')} €` : '',
      Endzahlung_Livegang_50: calculation ? `${calculation.finalPayment50.toLocaleString('de-AT')} €` : '',
      Monatliche_Wartung: calculation && calculation.mrrNet > 0 ? `${calculation.mrrNet} €/Monat` : 'Keine'
    };

    try {
      await fetch('https://formsubmit.co/ajax/maximilian.schlacher@outlook.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('FormSubmit AJAX notice:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const mailtoBody = encodeURIComponent(
    `Hallo PureSite Team (Maximilian),\n\nich interessiere mich für folgendes Website-Projekt:\n\n` +
    `Name: ${name}\n` +
    `Firma: ${company || '-'}\n` +
    `E-Mail: ${email}\n` +
    `Telefon: ${phone || '-'}\n` +
    `Gewünschter Start: ${timeline}\n\n` +
    `Ausgewählte Module:\n${selectedDetails.map(d => `• ${d}`).join('\n')}\n\n` +
    `Projektpreis: ${calculation?.oneTimeGross.toLocaleString('de-AT')} €\n` +
    `Zusätzliche Wünsche: ${notes || '-'}\n\n` +
    `Beste Grüße,\n${name}`
  );
  const mailtoUrl = `mailto:maximilian.schlacher@outlook.com?subject=${encodeURIComponent(`PureSite Angebot: ${company || name}`)}&body=${mailtoBody}`;

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
                <label>E-Mail-Adresse *</label>
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
                <label>Telefonnummer (für WhatsApp/Rückruf)</label>
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
              <span>100% kostenlos & unverbindlich. Wir melden uns binnen 24 Stunden persönlich.</span>
            </div>

            <div className="modal-actions-right">
              <button type="button" className="btn-secondary-sm" onClick={onClose} disabled={isSubmitting}>
                Abbrechen
              </button>
              <button type="submit" className="btn-primary-sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="spin-icon" /> Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Anfrage jetzt absenden
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
              Deine Projekt-Konfiguration für <strong>{company || 'dein Vorhaben'}</strong> wurde direkt an unser PureSite Team übermittelt.
            </p>
            <div className="success-highlights">
              <div>✉️ <strong>E-Mail gesendet an:</strong> maximilian.schlacher@outlook.com</div>
              <div>⚡ Wir prüfen deine Modulauswahl auf Machbarkeit & Synergien.</div>
              <div>📞 Wir melden uns binnen maximal 24 Stunden mit einem detaillierten Fahrplan.</div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <a 
                href={mailtoUrl} 
                className="btn-secondary-sm"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
              >
                <Mail size={15} />
                <span>Kopie in eigener Mail-App öffnen</span>
              </a>
              <button className="btn-primary-sm" onClick={onClose}>
                Zurück zur Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
