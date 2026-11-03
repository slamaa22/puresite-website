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
}

// Convert image URL to base64 Data URL for robust html2canvas embedding
async function getLogoDataUrl(): Promise<string> {
  try {
    const res = await fetch('/assets/puresite-logo.png');
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('Could not load logo as data URL:', e);
    return '/assets/puresite-logo.png';
  }
}

// Balanced pagination: up to 6 items fit perfectly on a single comprehensive page.
// For larger selections, splits evenly without leaving awkward 1-item orphan pages.
function chunkItemsForPages(items: PdfOfferItem[]): PdfOfferItem[][] {
  if (items.length <= 6) {
    return [items];
  }

  const pages: PdfOfferItem[][] = [];
  const page1Count = Math.min(6, Math.ceil(items.length / 2));
  pages.push(items.slice(0, page1Count));
  let remaining = items.slice(page1Count);

  while (remaining.length > 0) {
    if (remaining.length <= 6) {
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
  const { calculation, items, useTax, clientName, clientCompany } = options;

  const quoteId = `PS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const todayStr = new Date().toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const validUntilStr = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const logoBase64 = await getLogoDataUrl();

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
    container.style.padding = '28px 32px';
    container.style.backgroundColor = '#07090e';
    container.style.color = '#f1f5f9';
    container.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    container.style.zIndex = '-9999';
    container.style.overflow = 'hidden';

    container.innerHTML = `
      <div style="height: 100%; box-sizing: border-box; display: flex; flex-direction: column; border: 1px solid rgba(0, 242, 254, 0.28); border-radius: 14px; padding: 22px 26px; background: linear-gradient(145deg, #090d16 0%, #0c1220 50%, #07090e 100%); position: relative;">
        
        <!-- Header Strip -->
        <div style="height: 3px; width: 100%; background: linear-gradient(90deg, #00f2fe 0%, #4facfe 50%, #8b5cf6 100%); border-radius: 3px; margin-bottom: 16px;"></div>

        <!-- Document Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isFirstPage ? '14px' : '12px'};">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <img src="${logoBase64}" alt="PureSite" style="width: 100%; height: 100%; object-fit: contain;" />
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 22px; font-weight: 900; letter-spacing: -0.5px; background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">PureSite</span>
                <span style="font-size: 9px; font-weight: 800; letter-spacing: 0.5px; background: rgba(0, 242, 254, 0.12); color: #00f2fe; padding: 3px 8px; border-radius: 12px; border: 1px solid rgba(0, 242, 254, 0.35);">
                  ${isFirstPage ? 'PROJEKT- & FESTPREISÜBERSICHT' : `ANGEBOT ${quoteId} (SEITE ${pageNum})`}
                </span>
              </div>
              <div style="font-size: 9.5px; color: #94a3b8; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 1px;">Webdesign & High-End Softwareentwicklung</div>
              <div style="font-size: 9.5px; color: #00f2fe; margin-top: 1px;">puresite.at • maximilian.schlacher@outlook.com</div>
            </div>
          </div>

          <div style="text-align: right; font-size: 10px; color: #94a3b8; line-height: 1.45;">
            <div style="font-size: 12.5px; font-weight: 800; color: #f8fafc; font-family: monospace;">${quoteId}</div>
            <div>Datum: <strong style="color: #e2e8f0;">${todayStr}</strong></div>
            <div>Gültigkeitsdauer: <strong style="color: #00f2fe;">30 Tage (bis ${validUntilStr})</strong></div>
            <div style="color: #64748b; font-size: 9px;">Seite ${pageNum} von ${totalPages}</div>
          </div>
        </div>

        ${isFirstPage ? `
          <!-- Client & Subject Banner (Page 1 Only) -->
          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 10px 14px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 8.5px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Projekt- & Angebotsübersicht für:</div>
              <div style="font-size: 13px; font-weight: 700; color: #f8fafc; margin-top: 1px;">${clientCompany || clientName || 'Individuelles Unternehmens-Webprojekt'}</div>
              ${clientName && clientCompany ? `<div style="font-size: 9.5px; color: #94a3b8; margin-top: 1px;">z. H. ${clientName}</div>` : ''}
            </div>
            <div style="text-align: right;">
              <span style="font-size: 9.5px; font-weight: 700; color: #00f2fe; background: rgba(0, 242, 254, 0.08); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(0, 242, 254, 0.25);">
                ${calculation.itemCount} Leistungsbausteine ausgewählt
              </span>
            </div>
          </div>
        ` : `
          <!-- Continuation Header Bar on Later Pages -->
          <div style="background: rgba(0, 242, 254, 0.03); border: 1px solid rgba(0, 242, 254, 0.12); border-radius: 8px; padding: 7px 12px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 9.5px;">
            <span style="color: #94a3b8;">Fortsetzung der Positionen für: <strong>${clientCompany || clientName || 'Webprojekt'}</strong></span>
            <span style="color: #00f2fe; font-family: monospace;">Positionen ${startIndex + 1} bis ${runningItemIndex} von ${items.length}</span>
          </div>
        `}

        <!-- Modules Table -->
        <div style="margin-bottom: 10px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 10px; text-align: left;">
            <thead>
              <tr style="border-bottom: 1.5px solid rgba(0, 242, 254, 0.35); color: #94a3b8; font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px;">
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
                const rowBg = isEven ? 'background: rgba(255, 255, 255, 0.015);' : '';
                return `
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); ${rowBg}">
                    <td style="padding: 7px 6px; color: #64748b; font-family: monospace; font-size: 9.5px; text-align: center;">
                      ${String(startIndex + idx + 1).padStart(2, '0')}
                    </td>
                    <td style="padding: 7px 10px;">
                      <div style="font-weight: 700; color: #f1f5f9; font-size: 11px; display: flex; align-items: center; gap: 6px;">
                        <span>${item.name}</span>
                        ${item.qtyLabel ? `
                          <span style="font-size: 8.5px; font-weight: 700; color: #00f2fe; background: rgba(0, 242, 254, 0.12); border: 1px solid rgba(0, 242, 254, 0.3); border-radius: 4px; padding: 1px 5px;">
                            ${item.qtyLabel.trim()}
                          </span>
                        ` : ''}
                      </div>
                      <div style="font-size: 8.8px; color: #94a3b8; margin-top: 2px; line-height: 1.35;">
                        ${item.description}
                      </div>
                    </td>
                    <td style="padding: 7px 10px; text-align: center;">
                      <span style="font-size: 8px; color: #94a3b8; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; padding: 2px 6px; text-transform: uppercase; letter-spacing: 0.3px; white-space: nowrap;">
                        ${item.categoryLabel}
                      </span>
                    </td>
                    <td style="padding: 7px 10px; text-align: center;">
                      <span style="font-size: 8.5px; color: ${item.billingType === 'Monatlich' ? '#38bdf8' : '#cbd5e1'}; font-weight: 500; white-space: nowrap;">
                        ${item.billingType}
                      </span>
                    </td>
                    <td style="padding: 7px 10px; text-align: right; font-weight: 700; color: #00f2fe; font-family: monospace; font-size: 11px; white-space: nowrap;">
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
          <div style="text-align: center; padding: 14px 0; color: #00f2fe; font-size: 10px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span>Fortsetzung der Positionen und Gesamtkalkulation auf Seite ${pageNum + 1} ➔</span>
          </div>
        ` : ''}

        ${isLastPage ? `
          <!-- Totals & Milestones Grid (Final Page Only) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 8px; margin-bottom: 10px;">
            <!-- Left Box: 50/50 Milestones -->
            <div style="background: rgba(0, 242, 254, 0.03); border: 1px solid rgba(0, 242, 254, 0.15); border-radius: 10px; padding: 11px 14px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-size: 10.5px; font-weight: 700; color: #00f2fe; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                  <span>🛡️</span> 50 / 50 Meilenstein-Zahlungsplan
                </div>
                <div style="font-size: 8.8px; color: #94a3b8; line-height: 1.35; margin-bottom: 8px;">
                  Faire Aufteilung ohne Vorab-Risiko für den Auftraggeber:
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 5px;">
                <div style="display: flex; justify-content: space-between; font-size: 9.8px; padding-bottom: 4px; border-bottom: 1px dashed rgba(255,255,255,0.08);">
                  <span style="color: #94a3b8;">1. Anzahlung bei Projektstart (50%):</span>
                  <strong style="color: #f8fafc; font-family: monospace;">${calculation.downPayment50.toLocaleString('de-AT')} €</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 9.8px;">
                  <span style="color: #94a3b8;">2. Endzahlung bei Livegang (50%):</span>
                  <strong style="color: #f8fafc; font-family: monospace;">${calculation.finalPayment50.toLocaleString('de-AT')} €</strong>
                </div>
              </div>
            </div>

            <!-- Right Box: Price Calculation -->
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 11px 14px; display: flex; flex-direction: column; justify-content: center;">
              <div style="display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; margin-bottom: 2px;">
                <span>Projektpreis (Netto):</span>
                <strong style="color: #f1f5f9; font-family: monospace;">${calculation.oneTimeNet.toLocaleString('de-AT')} €</strong>
              </div>

              ${useTax ? `
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; margin-bottom: 3px;">
                  <span>+ 20% Umsatzsteuer:</span>
                  <strong style="color: #f1f5f9; font-family: monospace;">${(calculation.oneTimeGross - calculation.oneTimeNet).toLocaleString('de-AT')} €</strong>
                </div>
              ` : `
                <div style="font-size: 8px; color: #64748b; font-style: italic; margin-bottom: 3px;">
                  USt.-frei gem. § 6 Abs. 1 Z 27 UStG (Kleinunternehmer)
                </div>
              `}

              <div style="height: 1px; background: rgba(0, 242, 254, 0.25); margin: 4px 0;"></div>

              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <span style="font-size: 11px; font-weight: 800; color: #f8fafc;">Gesamtbetrag (Fixpreis):</span>
                <span style="font-size: 16px; font-weight: 900; color: #00f2fe; font-family: monospace;">${calculation.oneTimeGross.toLocaleString('de-AT')} €</span>
              </div>

              ${calculation.mrrNet > 0 ? `
                <div style="display: flex; justify-content: space-between; font-size: 9.5px; color: #00f2fe; margin-top: 3px;">
                  <span>Laufendes Hosting & Wartung:</span>
                  <strong style="font-family: monospace;">${calculation.mrrNet.toLocaleString('de-AT')} € / Monat</strong>
                </div>
              ` : ''}

              ${calculation.savingsTotal > 0 ? `
                <div style="font-size: 8px; color: #10b981; margin-top: 3px; text-align: right;">
                  💰 Ersparnis ggü. üblichen Agenturpreisen: ca. ${calculation.savingsTotal.toLocaleString('de-AT')} €
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Quality Guarantee & Disclaimer Banner -->
          <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px; padding: 8px 12px; margin-bottom: 10px;">
            <div style="font-size: 8.5px; color: #94a3b8; line-height: 1.45;">
              📋 <strong>Projekt- & Festpreisübersicht:</strong> Dieses Dokument dient als transparente Übersicht und Kostenschätzung auf Basis der gewählten Leistungsmodule. Alle genannten Preise sind garantierte Festpreise für den definierten Leistungsumfang ohne versteckte Zusatzkosten. Gültig für 30 Tage ab Ausstellungsdatum.
            </div>
          </div>

          <!-- Acceptance & Signature Block -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 8px; border-top: 1px dashed rgba(255, 255, 255, 0.1); margin-bottom: 8px;">
            <div>
              <div style="font-size: 8.5px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px;">Auftragserteilung & Freigabe:</div>
              <div style="margin-top: 28px; border-top: 1px solid #475569; width: 220px; font-size: 8px; color: #64748b; padding-top: 3px;">
                Datum, Firmenstempel & Unterschrift Auftraggeber
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 8.5px; color: #00f2fe; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;">PureSite Webdesign & Softwareentwicklung</div>
              <div style="margin-top: 28px; border-top: 1px solid #00f2fe; width: 230px; font-size: 8px; color: #94a3b8; padding-top: 3px;">
                Maximilian Schlacher & Loreno Zanaboni • Steiermark
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Page Bottom Bar (Always pinned to bottom edge via margin-top: auto) -->
        <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 8px; font-size: 8.5px; color: #64748b;">
          <span>PureSite Webdesign & Softwareentwicklung • puresite.at</span>
          <span style="color: #94a3b8; font-weight: 600;">Seite ${pageNum} von ${totalPages}</span>
          <span>Steiermark, Österreich</span>
        </div>

      </div>
    `;

    document.body.appendChild(container);

    try {
      if (pageIdx > 0) {
        pdf.addPage('a4', 'portrait');
      }

      // Fill full bleed canvas with deep dark background (#07090e)
      pdf.setFillColor(7, 9, 14);
      pdf.rect(0, 0, 210, 297, 'F');

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#07090e',
        logging: false,
        windowWidth: 800,
        windowHeight: 1131
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.96);
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    } finally {
      document.body.removeChild(container);
    }
  }

  pdf.save(`PureSite_Festpreis_Angebot_${quoteId}.pdf`);
}
