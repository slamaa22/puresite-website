import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { ProjectCalculation } from '../types/pricing';

export interface PdfOfferItem {
  code: string;
  name: string;
  categoryLabel: string;
  description: string;
  qtyLabel: string;
  priceFormatted: string;
  billingType: string;
  amount: number;
}

export interface PdfOfferOptions {
  calculation: ProjectCalculation;
  items: PdfOfferItem[];
  useTax: boolean;
  clientName?: string;
  clientCompany?: string;
  theme?: 'light' | 'dark'; // Defaults to 'light' (White Mode)
}

// Convert image URL to base64 Data URL for robust html2canvas embedding
async function getLogoDataUrl(theme: 'light' | 'dark' = 'light'): Promise<string> {
  const logoPath = theme === 'light' 
    ? '/assets/puresite-logo-dark-stroke.png' 
    : '/assets/puresite-logo.png';
  try {
    const res = await fetch(logoPath);
    if (!res.ok) throw new Error('Logo fetch failed');
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('Could not load logo as data URL:', e);
    return logoPath;
  }
}

// Standard document pagination: Page 1 is filled first (normal invoice flow).
// Up to 7 items fit on a single complete page with totals.
// For multi-page offers, Page 1 takes up to 8 items, leaving the remaining items (3-5 items) for Page 2 alongside totals & signatures.
function chunkItemsForPages(items: PdfOfferItem[]): PdfOfferItem[][] {
  if (items.length <= 7) {
    return [items];
  }

  const pages: PdfOfferItem[][] = [];
  
  // Page 1 fills first (takes up to 8 items, leaving at least 3 items for the final page)
  const page1Count = Math.min(8, Math.max(5, items.length - 3));
  pages.push(items.slice(0, page1Count));
  let remaining = items.slice(page1Count);

  while (remaining.length > 0) {
    // Final page accommodates up to 5 items comfortably with totals, payment plan & signatures
    if (remaining.length <= 5) {
      pages.push(remaining);
      break;
    } else {
      pages.push(remaining.slice(0, 8));
      remaining = remaining.slice(8);
    }
  }

  return pages;
}

export async function generatePureSitePdf(options: PdfOfferOptions): Promise<void> {
  const { calculation, items, useTax, clientName, clientCompany, theme = 'light' } = options;

  const quoteId = `PS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const todayStr = new Date().toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const validUntilStr = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const logoBase64 = await getLogoDataUrl(theme);

  const itemChunks = chunkItemsForPages(items);
  const totalPages = itemChunks.length;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  let runningItemIndex = 0;

  for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
    const pageNum = pageIdx + 1;
    const isFirstPage = pageNum === 1;
    const isLastPage = pageNum === totalPages;
    const pageItems = itemChunks[pageIdx];

    const startIndex = runningItemIndex;
    runningItemIndex += pageItems.length;

    // Full-bleed A4 container (800px x 1131px at 1:1.4142 ratio)
    const container = document.createElement('div');
    container.id = `puresite-pdf-page-${pageNum}`;
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px';
    container.style.height = '1131px';
    container.style.boxSizing = 'border-box';
    container.style.margin = '0';
    container.style.padding = '26px 30px';
    container.style.backgroundColor = '#ffffff';
    container.style.color = '#0f172a';
    container.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    container.style.zIndex = '-9999';
    container.style.overflow = 'hidden';

    container.innerHTML = `
      <div style="height: 100%; box-sizing: border-box; display: flex; flex-direction: column; border: 1px solid #e2e8f0; border-radius: 12px; padding: 22px 26px; background: #ffffff; position: relative;">
        
        <!-- Header Precision Hairline Strip -->
        <div style="height: 3px; width: 100%; background: linear-gradient(90deg, #10b981 0%, #059669 40%, #0f172a 100%); border-radius: 3px; margin-bottom: 16px;"></div>

        <!-- Document Header: Brand & Document Meta -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: ${isFirstPage ? '14px' : '12px'};">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 6px;">
              <img src="${logoBase64}" alt="PureSite" style="width: 100%; height: 100%; object-fit: contain;" />
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 22px; font-weight: 800; font-family: 'Outfit', sans-serif; letter-spacing: -0.02em; color: #0f172a;">
                  PureSite<span style="color: #059669;">.</span>
                </span>
                <span style="font-size: 8.5px; font-family: 'JetBrains Mono', monospace; font-weight: 600; letter-spacing: 0.04em; background: #ecfdf5; color: #047857; padding: 3px 8px; border-radius: 4px; border: 1px solid #a7f3d0; text-transform: uppercase;">
                  ${isFirstPage ? 'FESTPREIS-ANGEBOT' : `ANGEBOT ${quoteId} (SEITE ${pageNum})`}
                </span>
              </div>
              <div style="font-size: 9px; color: #64748b; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 1px; font-weight: 500;">
                Webdesign & High-Performance Softwareentwicklung
              </div>
              <div style="font-size: 9px; color: #059669; font-family: 'JetBrains Mono', monospace; margin-top: 2px;">
                puresite.at • maximilian.schlacher@outlook.com
              </div>
            </div>
          </div>

          <div style="text-align: right; font-size: 9.5px; color: #64748b; line-height: 1.45; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 14px;">
            <div style="font-size: 12.5px; font-weight: 700; color: #0f172a; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.02em;">${quoteId}</div>
            <div style="margin-top: 2px;">Datum: <strong style="color: #1e293b;">${todayStr}</strong></div>
            <div>Gültig bis: <strong style="color: #047857;">${validUntilStr}</strong></div>
            <div style="color: #94a3b8; font-size: 8.5px; margin-top: 1px;">Seite ${pageNum} von ${totalPages}</div>
          </div>
        </div>

        ${isFirstPage ? `
          <!-- Client & Subject Banner (Page 1 Only) -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 11px 14px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 8px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em;">Projekt & Auftraggeber</div>
              <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 2px; font-family: 'Outfit', sans-serif;">
                ${clientCompany || clientName || 'Individuelles Unternehmens-Webprojekt'}
              </div>
              ${clientName && clientCompany ? `<div style="font-size: 9.5px; color: #475569; margin-top: 1px;">z. H. ${clientName}</div>` : ''}
            </div>
            <div style="text-align: right;">
              <span style="font-size: 9px; font-weight: 600; color: #047857; background: #ecfdf5; padding: 4px 10px; border-radius: 20px; border: 1px solid #a7f3d0; font-family: 'JetBrains Mono', monospace;">
                ${calculation.itemCount} Bausteine konfiguriert
              </span>
            </div>
          </div>
        ` : `
          <!-- Continuation Header Bar on Later Pages -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 12px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 9px;">
            <span style="color: #475569;">Fortsetzung der Positionen für: <strong style="color: #0f172a;">${clientCompany || clientName || 'Webprojekt'}</strong></span>
            <span style="color: #047857; font-family: 'JetBrains Mono', monospace;">Positionen ${startIndex + 1} bis ${runningItemIndex} von ${items.length}</span>
          </div>
        `}

        <!-- Modules Table -->
        <div style="margin-bottom: 10px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 9.5px; text-align: left;">
            <thead>
              <tr style="background: #f1f5f9; border-bottom: 2px solid #0f172a; color: #334155; font-size: 8.5px; text-transform: uppercase; letter-spacing: 0.06em;">
                <th style="padding: 7px 6px; width: 34px; text-align: center;">Pos.</th>
                <th style="padding: 7px 10px;">Leistungsbaustein & Spezifikation</th>
                <th style="padding: 7px 10px; width: 105px; text-align: center;">Kategorie</th>
                <th style="padding: 7px 10px; width: 85px; text-align: center;">Abrechnung</th>
                <th style="padding: 7px 10px; text-align: right; width: 95px;">Festpreis</th>
              </tr>
            </thead>
            <tbody>
              ${pageItems.map((item, idx) => {
                const isEven = idx % 2 === 1;
                const rowBg = isEven ? 'background: #f8fafc;' : 'background: #ffffff;';
                return `
                  <tr style="border-bottom: 1px solid #e2e8f0; ${rowBg}">
                    <td style="padding: 7px 6px; color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 9px; text-align: center;">
                      ${String(startIndex + idx + 1).padStart(2, '0')}
                    </td>
                    <td style="padding: 7px 10px;">
                      <div style="font-weight: 600; color: #0f172a; font-size: 10.5px; display: flex; align-items: center; gap: 6px;">
                        <span>${item.name}</span>
                        ${item.code ? `
                          <span style="font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #047857; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 3px; padding: 1px 4px;">
                            ${item.code}
                          </span>
                        ` : ''}
                        ${item.qtyLabel ? `
                          <span style="font-size: 8px; font-weight: 600; color: #047857; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 3px; padding: 1px 4px;">
                            ${item.qtyLabel.trim()}
                          </span>
                        ` : ''}
                      </div>
                      <div style="font-size: 8.5px; color: #475569; margin-top: 2px; line-height: 1.35;">
                        ${item.description}
                      </div>
                    </td>
                    <td style="padding: 7px 10px; text-align: center;">
                      <span style="font-size: 8px; color: #475569; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 4px; padding: 2px 6px; text-transform: uppercase; letter-spacing: 0.03em; white-space: nowrap;">
                        ${item.categoryLabel}
                      </span>
                    </td>
                    <td style="padding: 7px 10px; text-align: center;">
                      <span style="font-size: 8.5px; color: ${item.billingType === 'Monatlich' ? '#047857' : '#334155'}; font-weight: 600; white-space: nowrap;">
                        ${item.billingType}
                      </span>
                    </td>
                    <td style="padding: 7px 10px; text-align: right; font-weight: 700; color: #0f172a; font-family: 'JetBrains Mono', monospace; font-size: 10.5px; white-space: nowrap;">
                      ${item.priceFormatted}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        ${!isLastPage ? `
          <!-- Continuation hint for next page -->
          <div style="margin-top: 14px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 10px 16px; text-align: center; color: #047857; font-size: 9px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span>Fortsetzung der Positionen sowie Gesamtkalkulation & Zahlungsplan auf Seite ${pageNum + 1} von ${totalPages} ➔</span>
          </div>
        ` : ''}

        ${isLastPage ? `
          <!-- Totals & Milestones Grid (Final Page Only) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 6px; margin-bottom: 10px;">
            <!-- Left Box: 50/50 Milestones -->
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 11px 13px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-size: 10px; font-weight: 700; color: #15803d; margin-bottom: 3px; display: flex; align-items: center; gap: 6px;">
                  <span>🛡️</span> 50 / 50 Meilenstein-Zahlungsplan
                </div>
                <div style="font-size: 8.5px; color: #166534; line-height: 1.35; margin-bottom: 8px;">
                  Transparente Abrechnung ohne Vorab-Risiko für den Auftraggeber:
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 5px;">
                <div style="display: flex; justify-content: space-between; font-size: 9.5px; padding-bottom: 4px; border-bottom: 1px dashed #bbf7d0;">
                  <span style="color: #4b5563;">1. Anzahlung bei Start (50%):</span>
                  <strong style="color: #0f172a; font-family: 'JetBrains Mono', monospace;">${calculation.downPayment50.toLocaleString('de-AT')} €</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 9.5px;">
                  <span style="color: #4b5563;">2. Endzahlung bei Livegang & Abnahme (50%):</span>
                  <strong style="color: #0f172a; font-family: 'JetBrains Mono', monospace;">${calculation.finalPayment50.toLocaleString('de-AT')} €</strong>
                </div>
              </div>
            </div>

            <!-- Right Box: Price Calculation -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 11px 13px; display: flex; flex-direction: column; justify-content: center;">
              <div style="display: flex; justify-content: space-between; font-size: 9.5px; color: #475569; margin-bottom: 2px;">
                <span>Projektpreis (Netto):</span>
                <strong style="color: #0f172a; font-family: 'JetBrains Mono', monospace;">${calculation.oneTimeNet.toLocaleString('de-AT')} €</strong>
              </div>

              ${useTax ? `
                <div style="display: flex; justify-content: space-between; font-size: 9.5px; color: #475569; margin-bottom: 3px;">
                  <span>+ 20% Umsatzsteuer:</span>
                  <strong style="color: #0f172a; font-family: 'JetBrains Mono', monospace;">${(calculation.oneTimeGross - calculation.oneTimeNet).toLocaleString('de-AT')} €</strong>
                </div>
              ` : `
                <div style="font-size: 8px; color: #64748b; font-style: italic; margin-bottom: 3px;">
                  USt.-frei gem. § 6 Abs. 1 Z 27 UStG (Kleinunternehmer)
                </div>
              `}

              <div style="height: 1.5px; background: #0f172a; margin: 4px 0;"></div>

              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <span style="font-size: 11px; font-weight: 700; color: #0f172a;">Gesamtbetrag (Fixpreis):</span>
                <span style="font-size: 16.5px; font-weight: 800; color: #0f172a; font-family: 'JetBrains Mono', monospace;">${calculation.oneTimeGross.toLocaleString('de-AT')} €</span>
              </div>

              ${calculation.mrrNet > 0 ? `
                <div style="display: flex; justify-content: space-between; font-size: 9px; color: #047857; margin-top: 3px; font-family: 'JetBrains Mono', monospace;">
                  <span>Laufendes Hosting & Wartung:</span>
                  <strong>${calculation.mrrNet.toLocaleString('de-AT')} € / Monat</strong>
                </div>
              ` : ''}

              ${calculation.savingsTotal > 0 ? `
                <div style="font-size: 8px; color: #16a34a; margin-top: 2px; text-align: right; font-weight: 600;">
                  💰 Ersparnis ggü. üblichen Agenturpreisen: ca. ${calculation.savingsTotal.toLocaleString('de-AT')} €
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Quality Guarantee & Disclaimer Banner -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 7px 11px; margin-bottom: 8px;">
            <div style="font-size: 8px; color: #475569; line-height: 1.4;">
              📋 <strong>Verbindliche Festpreisgarantie:</strong> Dieses Dokument ist eine offizielle Projekt- und Festpreiskalkulation. Alle genannten Beträge sind garantierte Fixpreise für den definierten Leistungsumfang ohne versteckte Zusatzkosten. Volle Nutzungs- und Quellcode-Rechte gehen nach Begleichung der Endzahlung an den Auftraggeber über. Gültig für 30 Tage ab Ausstellungsdatum.
            </div>
          </div>

          <!-- Acceptance & Signature Block -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 8px; border-top: 1px dashed #cbd5e1; margin-bottom: 6px;">
            <div>
              <div style="font-size: 8px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Auftragserteilung & Freigabe:</div>
              <div style="margin-top: 26px; border-top: 1px solid #94a3b8; width: 220px; font-size: 7.5px; color: #64748b; padding-top: 3px;">
                Datum, Firmenstempel & Unterschrift Auftraggeber
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 8px; color: #047857; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">PureSite Webdesign & Softwareentwicklung</div>
              <div style="margin-top: 26px; border-top: 1px solid #047857; width: 230px; font-size: 7.5px; color: #475569; padding-top: 3px;">
                Maximilian Schlacher & Loreno Zanaboni • Steiermark
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Page Bottom Bar (Always pinned to bottom edge via margin-top: auto) -->
        <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 7px; font-size: 8px; color: #64748b;">
          <span>PureSite Webdesign & Softwareentwicklung • puresite.at</span>
          <span style="color: #1e293b; font-weight: 600;">Seite ${pageNum} von ${totalPages}</span>
          <span>Steiermark, Österreich • 100% Festpreis</span>
        </div>

      </div>
    `;

    document.body.appendChild(container);

    try {
      if (pageIdx > 0) {
        pdf.addPage('a4', 'portrait');
      }

      // Fill full bleed canvas with crisp white background
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, 210, 297, 'F');

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 800,
        windowHeight: 1131
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    } finally {
      document.body.removeChild(container);
    }
  }

  pdf.save(`PureSite_Festpreis_Angebot_${quoteId}.pdf`);
}
