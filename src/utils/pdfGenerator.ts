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

// Intelligent pagination of items so tables never overflow A4
function chunkItemsForPages(items: PdfOfferItem[]): PdfOfferItem[][] {
  if (items.length <= 5) {
    return [items];
  }

  const pages: PdfOfferItem[][] = [];
  // Page 1 gets first 5 items
  pages.push(items.slice(0, 5));
  let remaining = items.slice(5);

  while (remaining.length > 0) {
    // If remaining items fit comfortably on final page with totals (up to 5 items)
    if (remaining.length <= 5) {
      pages.push(remaining);
      break;
    } else {
      // Intermediate page without totals can fit up to 7 items
      pages.push(remaining.slice(0, 7));
      remaining = remaining.slice(7);
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

    // Create full-bleed A4 container (800px x 1131px at exact 1:1.4142 A4 aspect ratio)
    const container = document.createElement('div');
    container.id = `puresite-pdf-page-${pageNum}`;
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px';
    container.style.height = '1131px';
    container.style.boxSizing = 'border-box';
    container.style.margin = '0';
    container.style.padding = '36px 42px';
    container.style.backgroundColor = '#07090e';
    container.style.color = '#f1f5f9';
    container.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    container.style.zIndex = '-9999';
    container.style.overflow = 'hidden';

    container.innerHTML = `
      <div style="height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(0, 242, 254, 0.28); border-radius: 16px; padding: 28px 32px; background: linear-gradient(145deg, #090d16 0%, #0c1220 50%, #07090e 100%); position: relative;">
        
        <!-- Header & Main Content -->
        <div>
          <!-- Cyan to Violet Brand Glow Strip -->
          <div style="height: 3px; width: 100%; background: linear-gradient(90deg, #00f2fe 0%, #4facfe 50%, #8b5cf6 100%); border-radius: 3px; margin-bottom: 20px;"></div>

          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${isFirstPage ? '18px' : '14px'};">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
                <img src="${logoBase64}" alt="PureSite" style="width: 100%; height: 100%; object-fit: contain;" />
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">PureSite</span>
                  <span style="font-size: 9.5px; font-weight: 800; letter-spacing: 0.5px; background: rgba(0, 242, 254, 0.12); color: #00f2fe; padding: 3px 8px; border-radius: 12px; border: 1px solid rgba(0, 242, 254, 0.35);">
                    ${isFirstPage ? 'VERBINDLICHES FESTPREIS-ANGEBOT' : `ANGEBOT ${quoteId} (SEITE ${pageNum})`}
                  </span>
                </div>
                <div style="font-size: 10px; color: #94a3b8; letter-spacing: 0.5px; text-transform: uppercase;">Webdesign & High-End Softwareentwicklung</div>
                <div style="font-size: 10px; color: #00f2fe; margin-top: 1px;">puresite.at • maximilian.schlacher@outlook.com</div>
              </div>
            </div>

            <div style="text-align: right; font-size: 10.5px; color: #94a3b8; line-height: 1.45;">
              <div style="font-size: 13px; font-weight: 800; color: #f8fafc; font-family: monospace;">${quoteId}</div>
              <div>Datum: <strong style="color: #e2e8f0;">${todayStr}</strong></div>
              <div>Festpreis-Garantie: <strong style="color: #00f2fe;">Gültig bis ${validUntilStr}</strong></div>
              <div style="color: #64748b; font-size: 9.5px;">Seite ${pageNum} von ${totalPages}</div>
            </div>
          </div>

          ${isFirstPage ? `
            <!-- Client & Subject Banner (Page 1 Only) -->
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 11px 16px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 9.5px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Projekt-Angebot für:</div>
                <div style="font-size: 13.5px; font-weight: 700; color: #f8fafc;">${clientCompany || clientName || 'Individuelles Unternehmens-Webprojekt'}</div>
                ${clientName && clientCompany ? `<div style="font-size: 10.5px; color: #94a3b8;">z. H. ${clientName}</div>` : ''}
              </div>
              <div style="text-align: right;">
                <span style="font-size: 10.5px; font-weight: 700; color: #00f2fe; background: rgba(0, 242, 254, 0.08); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(0, 242, 254, 0.25);">
                  ${calculation.itemCount} Bausteine modular definiert
                </span>
              </div>
            </div>
          ` : `
            <!-- Continuation Header Bar on Later Pages -->
            <div style="background: rgba(0, 242, 254, 0.03); border: 1px solid rgba(0, 242, 254, 0.12); border-radius: 8px; padding: 7px 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; font-size: 10px;">
              <span style="color: #94a3b8;">Fortsetzung der Angebotspositionen für <strong>${clientCompany || clientName || 'Webprojekt'}</strong></span>
              <span style="color: #00f2fe; font-family: monospace;">Positionen ${startIndex + 1} bis ${runningItemIndex} von ${items.length}</span>
            </div>
          `}

          <!-- Modules Table for this Page -->
          <div style="margin-bottom: 14px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 10.5px; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid rgba(0, 242, 254, 0.25); color: #94a3b8; font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.5px;">
                  <th style="padding: 6px 6px; width: 35px;">Pos.</th>
                  <th style="padding: 6px 10px;">Leistungsbaustein / Spezifikation</th>
                  <th style="padding: 6px 10px;">Verrechnung</th>
                  <th style="padding: 6px 10px; text-align: right; width: 95px;">Festpreis</th>
                </tr>
              </thead>
              <tbody>
                ${pageItems.map((item, idx) => `
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td style="padding: 8px 6px; color: #64748b; font-family: monospace;">${String(startIndex + idx + 1).padStart(2, '0')}</td>
                    <td style="padding: 8px 10px;">
                      <div style="font-weight: 700; color: #f1f5f9; font-size: 11px;">${item.name}${item.qtyLabel}</div>
                      <div style="font-size: 9px; color: #94a3b8; margin-top: 2px; line-height: 1.35;">${item.description}</div>
                    </td>
                    <td style="padding: 8px 10px; color: #cbd5e1; font-size: 9.5px; white-space: nowrap;">${item.billingType}</td>
                    <td style="padding: 8px 10px; text-align: right; font-weight: 700; color: #00f2fe; font-family: monospace; font-size: 11px; white-space: nowrap;">${item.priceFormatted}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          ${!isLastPage ? `
            <!-- Continuation hint for next page -->
            <div style="text-align: center; padding: 18px 0; color: #00f2fe; font-size: 10.5px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span>Fortsetzung der Positionen und Gesamtkalkulation auf Seite ${pageNum + 1} ➔</span>
            </div>
          ` : ''}

          ${isLastPage ? `
            <!-- Totals & Milestones Grid (Final Page Only) -->
            <div style="display: grid; grid-template-columns: 1.05fr 1fr; gap: 14px; margin-top: 10px; margin-bottom: 14px;">
              <!-- Payment Terms -->
              <div style="background: rgba(0, 242, 254, 0.03); border: 1px solid rgba(0, 242, 254, 0.15); border-radius: 10px; padding: 11px 14px;">
                <div style="font-size: 10.5px; font-weight: 700; color: #00f2fe; margin-bottom: 5px; display: flex; align-items: center; gap: 6px;">
                  <span>🛡️</span> Transparenter 50 / 50 Zahlungsplan
                </div>
                <div style="font-size: 9.5px; color: #cbd5e1; line-height: 1.4; margin-bottom: 6px;">
                  Faire Meilensteine ohne Risiko für den Auftraggeber:
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; padding: 3px 0; border-bottom: 1px dashed rgba(255,255,255,0.08);">
                  <span style="color: #94a3b8;">1. Anzahlung bei Start (50%):</span>
                  <strong style="color: #f8fafc; font-family: monospace;">${calculation.downPayment50.toLocaleString('de-AT')} €</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; padding: 3px 0;">
                  <span style="color: #94a3b8;">2. Endzahlung bei Livegang (50%):</span>
                  <strong style="color: #f8fafc; font-family: monospace;">${calculation.finalPayment50.toLocaleString('de-AT')} €</strong>
                </div>
              </div>

              <!-- Price Calculation Box -->
              <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 11px 14px; display: flex; flex-direction: column; justify-content: center;">
                <div style="display: flex; justify-content: space-between; font-size: 10.5px; color: #94a3b8; margin-bottom: 2px;">
                  <span>Projektpreis (Netto):</span>
                  <strong style="color: #f1f5f9; font-family: monospace;">${calculation.oneTimeNet.toLocaleString('de-AT')} €</strong>
                </div>

                ${useTax ? `
                  <div style="display: flex; justify-content: space-between; font-size: 10.5px; color: #94a3b8; margin-bottom: 3px;">
                    <span>+ 20% Umsatzsteuer:</span>
                    <strong style="color: #f1f5f9; font-family: monospace;">${(calculation.oneTimeGross - calculation.oneTimeNet).toLocaleString('de-AT')} €</strong>
                  </div>
                ` : `
                  <div style="font-size: 8.5px; color: #64748b; font-style: italic; margin-bottom: 3px;">
                    USt.-frei gem. § 6 Abs. 1 Z 27 UStG (Kleinunternehmer)
                  </div>
                `}

                <div style="height: 1px; background: rgba(0, 242, 254, 0.25); margin: 4px 0;"></div>

                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                  <span style="font-size: 11.5px; font-weight: 800; color: #f8fafc;">Gesamtbetrag (Fixpreis):</span>
                  <span style="font-size: 16px; font-weight: 900; color: #00f2fe; font-family: monospace;">${calculation.oneTimeGross.toLocaleString('de-AT')} €</span>
                </div>

                ${calculation.mrrNet > 0 ? `
                  <div style="display: flex; justify-content: space-between; font-size: 10px; color: #00f2fe; margin-top: 2px;">
                    <span>Laufendes Hosting & Wartung:</span>
                    <strong style="font-family: monospace;">${calculation.mrrNet} € / Monat</strong>
                  </div>
                ` : ''}

                ${calculation.savingsTotal > 0 ? `
                  <div style="font-size: 8.5px; color: #10b981; margin-top: 3px; text-align: right;">
                    💰 Ersparnis ggü. üblichen Agentur-Stundensätzen: ca. ${calculation.savingsTotal.toLocaleString('de-AT')} €
                  </div>
                ` : ''}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Bottom Terms & Footer Section -->
        <div>
          ${isLastPage ? `
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 10px; margin-bottom: 12px;">
              <div style="font-size: 9px; color: #94a3b8; line-height: 1.4;">
                ✨ <strong>PureSite Qualitäts- & Festpreisgarantie:</strong> 100% moderner, sauberer Code, keine versteckten Kosten und garantierte Fertigstellung. Die oben aufgeführten Positionen sind verbindliche Festpreise für den definierten Leistungsumfang.
              </div>
            </div>

            <!-- Acceptance & Signature Block -->
            <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 6px; border-top: 1px dashed rgba(255,255,255,0.12); margin-bottom: 8px;">
              <div>
                <div style="font-size: 9px; color: #94a3b8; font-weight: 600;">Auftragserteilung & Freigabe:</div>
                <div style="margin-top: 24px; border-top: 1px solid #475569; width: 220px; font-size: 8px; color: #64748b;">
                  Datum, Firmenstempel & Unterschrift Auftraggeber
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 9px; color: #00f2fe; font-weight: 700;">PureSite Webdesign & Softwareentwicklung</div>
                <div style="margin-top: 24px; border-top: 1px solid #00f2fe; width: 220px; font-size: 8px; color: #94a3b8;">
                  Maximilian Schlacher & Loreno Zanaboni • Steiermark, Österreich
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Page Bottom Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 8px; font-size: 8.5px; color: #64748b;">
            <span>PureSite Webdesign & Softwareentwicklung • puresite.at</span>
            <span style="color: #94a3b8; font-weight: 600;">Seite ${pageNum} von ${totalPages}</span>
            <span>Steiermark, Österreich</span>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(container);

    try {
      if (pageIdx > 0) {
        pdf.addPage('a4', 'portrait');
      }

      // Fill entire A4 canvas with deep dark background (#07090e)
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
