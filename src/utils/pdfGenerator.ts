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
  useTax?: boolean;
  clientName?: string;
  clientCompany?: string;
  theme?: 'light' | 'dark';
}

// Convert image URL to base64 Data URL for robust html2canvas embedding
async function getLogoDataUrl(): Promise<string> {
  const logoPath = '/assets/puresite-logo.png';
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

// Standard document pagination:
// Up to 11 items fit comfortably on a single complete page with studio header, totals & signatures.
// For larger projects (>11 items), Page 1 fills naturally, leaving the remaining items for Page 2+.
function chunkItemsForPages(items: PdfOfferItem[]): PdfOfferItem[][] {
  if (items.length <= 11) {
    return [items];
  }

  const pages: PdfOfferItem[][] = [];
  const finalPageItemCount = Math.min(6, Math.max(3, items.length % 9 || 4));
  const page1Count = Math.min(11, items.length - finalPageItemCount);
  pages.push(items.slice(0, page1Count));
  let remaining = items.slice(page1Count);

  while (remaining.length > 0) {
    if (remaining.length <= 6) {
      pages.push(remaining);
      break;
    } else {
      pages.push(remaining.slice(0, 10));
      remaining = remaining.slice(10);
    }
  }

  return pages;
}

export async function generatePureSitePdf(options: PdfOfferOptions): Promise<void> {
  const { calculation, items, clientName, clientCompany } = options;

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
    container.style.padding = '20px 24px';
    container.style.backgroundColor = '#f7faf8';
    container.style.color = '#091410';
    container.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    container.style.zIndex = '-9999';
    container.style.overflow = 'hidden';

    container.innerHTML = `
      <div style="height: 100%; box-sizing: border-box; display: flex; flex-direction: column; border: 1px solid #d5e3dc; border-radius: 14px; padding: 16px 20px; background: #ffffff; position: relative; box-shadow: 0 2px 12px rgba(7, 18, 14, 0.04);">
        
        <!-- Studio Header Banner (Obsidian Forest x Mint Editorial) -->
        <div style="background: linear-gradient(135deg, #07120e 0%, #0d211a 100%); border-radius: 10px; padding: 13px 16px; margin-bottom: ${isFirstPage ? '10px' : '8px'}; position: relative; overflow: hidden; border: 1px solid #16362a;">
          <!-- Top Mint Precision Accent Line -->
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #58fca5 0%, #10b981 55%, #07120e 100%);"></div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(88, 252, 165, 0.25); border-radius: 9px; padding: 6px;">
                <img src="${logoBase64}" alt="PureSite" style="width: 100%; height: 100%; object-fit: contain;" />
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 9px;">
                  <span style="font-size: 21px; font-weight: 800; font-family: 'Manrope', 'Inter', sans-serif; letter-spacing: -0.03em; color: #ffffff; line-height: 1;">
                    pure<span style="color: #58fca5;">site</span>
                  </span>
                  <span style="font-size: 7.5px; font-family: 'JetBrains Mono', monospace; font-weight: 700; letter-spacing: 0.14em; background: rgba(88, 252, 165, 0.12); color: #58fca5; padding: 2.5px 7px; border-radius: 4px; border: 1px solid rgba(88, 252, 165, 0.3); text-transform: uppercase;">
                    SOFTWARE STUDIO
                  </span>
                  <span style="font-size: 7.5px; font-family: 'JetBrains Mono', monospace; font-weight: 600; letter-spacing: 0.06em; background: rgba(255, 255, 255, 0.07); color: #d1fae5; padding: 2.5px 7px; border-radius: 4px; text-transform: uppercase;">
                    ${isFirstPage ? 'FESTPREIS-ANGEBOT' : `SEITE ${pageNum}/${totalPages}`}
                  </span>
                </div>
                <div style="font-size: 8.5px; color: #9ab3a8; letter-spacing: 0.03em; margin-top: 4px; font-weight: 500;">
                  High-Performance Webdesign & Individuelle Softwareentwicklung · Graz, Österreich
                </div>
                <div style="font-size: 8px; color: #58fca5; font-family: 'JetBrains Mono', monospace; margin-top: 2px; letter-spacing: 0.01em;">
                  Am Leopoldsgrund 19, 8055 Graz · +43 676 6500468 · maximilian.schlacher@outlook.com
                </div>
              </div>
            </div>

            <div style="text-align: right; font-size: 8.5px; color: #b5cbc0; line-height: 1.42; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 6px 11px;">
              <div style="font-size: 11px; font-weight: 700; color: #ffffff; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.03em;">${quoteId}</div>
              <div style="margin-top: 1px;">Ausgestellt: <strong style="color: #ffffff;">${todayStr}</strong></div>
              <div>Gültig bis: <strong style="color: #58fca5;">${validUntilStr}</strong></div>
              <div style="color: #7d998c; font-size: 7.5px;">Seite ${pageNum} von ${totalPages}</div>
            </div>
          </div>
        </div>

        ${isFirstPage ? `
          <!-- Client & Architecture Summary Bar (Page 1 Only) -->
          <div style="background: #f4f8f6; border: 1px solid #d5e3dc; border-radius: 9px; padding: 8px 13px; margin-bottom: 9px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 7px; color: #4d6b5d; text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; font-family: 'JetBrains Mono', monospace;">Projekt-Spezifikation & Auftraggeber</div>
              <div style="font-size: 13px; font-weight: 800; color: #07120e; margin-top: 1px; font-family: 'Manrope', 'Inter', sans-serif; letter-spacing: -0.01em;">
                ${clientCompany || clientName || 'Individuelles Digital- & Webprojekt'}
              </div>
              ${clientName && clientCompany ? `<div style="font-size: 8.5px; color: #3d594c; margin-top: 1px;">Ansprechpartner: <strong>${clientName}</strong></div>` : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 8px; font-weight: 600; color: #095238; background: #e6f5ed; padding: 3.5px 9px; border-radius: 20px; border: 1px solid #b5dfca; font-family: 'JetBrains Mono', monospace;">
                ${calculation.itemCount} Leistungsbausteine
              </span>
              <span style="font-size: 8px; font-weight: 600; color: #07120e; background: #ffffff; padding: 3.5px 9px; border-radius: 20px; border: 1px solid #cbdcd3; font-family: 'JetBrains Mono', monospace;">
                ca. ${calculation.totalHours} Std. Engineering
              </span>
            </div>
          </div>
        ` : `
          <!-- Continuation Header Bar on Later Pages -->
          <div style="background: #f4f8f6; border: 1px solid #d5e3dc; border-radius: 8px; padding: 6px 12px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 8.5px;">
            <span style="color: #3d594c;">Fortsetzung der Leistungsbausteine für: <strong style="color: #07120e;">${clientCompany || clientName || 'Digital- & Webprojekt'}</strong></span>
            <span style="color: #095238; font-family: 'JetBrains Mono', monospace; font-weight: 600;">Positionen ${startIndex + 1} bis ${runningItemIndex} von ${items.length}</span>
          </div>
        `}

        <!-- Modules Table -->
        <div style="margin-bottom: 8px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 9px; text-align: left; border: 1px solid #d5e3dc; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #091712; color: #e6f2ec; font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.07em; font-family: 'JetBrains Mono', monospace;">
                <th style="padding: 6px 6px; width: 32px; text-align: center; color: #58fca5;">Pos.</th>
                <th style="padding: 6px 8px;">Leistungsbaustein & Technische Spezifikation</th>
                <th style="padding: 6px 8px; width: 96px; text-align: center;">Kategorie</th>
                <th style="padding: 6px 8px; width: 82px; text-align: center;">Abrechnung</th>
                <th style="padding: 6px 10px; text-align: right; width: 90px; color: #58fca5;">Festpreis</th>
              </tr>
            </thead>
            <tbody>
              ${pageItems.map((item, idx) => {
                const isEven = idx % 2 === 1;
                const rowBg = isEven ? 'background: #f8fbf9;' : 'background: #ffffff;';
                return `
                  <tr style="border-bottom: 1px solid #e3ede8; ${rowBg}">
                    <td style="padding: 5px 6px; color: #527062; font-family: 'JetBrains Mono', monospace; font-size: 8px; text-align: center; font-weight: 600;">
                      ${String(startIndex + idx + 1).padStart(2, '0')}
                    </td>
                    <td style="padding: 5px 8px;">
                      <div style="font-weight: 700; color: #07120e; font-size: 9.5px; font-family: 'Manrope', 'Inter', sans-serif; display: inline-flex; align-items: center; gap: 5px; flex-wrap: wrap;">
                        <span>${item.name}</span>
                        ${item.code ? `
                          <span style="font-family: 'JetBrains Mono', monospace; font-size: 7px; font-weight: 600; color: #095238; background: #e6f5ed; border: 1px solid #b5dfca; border-radius: 3px; padding: 1px 4px; white-space: nowrap; display: inline-block;">
                            ${item.code}
                          </span>
                        ` : ''}
                        ${item.qtyLabel ? `
                          <span style="font-size: 7px; font-weight: 700; color: #07120e; background: #eef5f1; border: 1px solid #cbdcd3; border-radius: 3px; padding: 1px 4px; white-space: nowrap; display: inline-block;">
                            ${item.qtyLabel.trim()}
                          </span>
                        ` : ''}
                      </div>
                      <div style="font-size: 7.8px; color: #466155; margin-top: 1px; line-height: 1.28;">
                        ${item.description}
                      </div>
                    </td>
                    <td style="padding: 5px 8px; text-align: center;">
                      <span style="font-size: 7px; font-weight: 600; color: #3d594c; background: #eef5f1; border: 1px solid #d5e3dc; border-radius: 4px; padding: 1.5px 5px; text-transform: uppercase; letter-spacing: 0.03em; white-space: nowrap;">
                        ${item.categoryLabel}
                      </span>
                    </td>
                    <td style="padding: 5px 8px; text-align: center;">
                      <span style="font-size: 7.8px; color: ${item.billingType === 'Monatlich' ? '#095238' : '#2c4238'}; font-weight: 600; white-space: nowrap;">
                        ${item.billingType}
                      </span>
                    </td>
                    <td style="padding: 5px 10px; text-align: right; font-weight: 700; color: #07120e; font-family: 'JetBrains Mono', monospace; font-size: 9.5px; white-space: nowrap;">
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
          <div style="margin-top: 8px; background: #f4f8f6; border: 1px dashed #b5dfca; border-radius: 8px; padding: 8px 14px; text-align: center; color: #095238; font-size: 8.5px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span>Fortsetzung der Leistungsbausteine sowie Gesamtkalkulation & Zahlungsplan auf Seite ${pageNum + 1} von ${totalPages} →</span>
          </div>
        ` : ''}

        ${isLastPage ? `
          <!-- Totals & Milestones Grid (Final Page Only) -->
          <div style="display: grid; grid-template-columns: 1fr 1.08fr; gap: 10px; margin-top: 2px; margin-bottom: 7px;">
            <!-- Left Box: 50/50 Milestones -->
            <div style="background: #f4f8f6; border: 1px solid #d5e3dc; border-radius: 9px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-size: 9px; font-weight: 800; color: #07120e; font-family: 'Manrope', 'Inter', sans-serif; margin-bottom: 2px; display: flex; align-items: center; gap: 6px; text-transform: uppercase; letter-spacing: 0.03em;">
                  <span style="display: inline-flex; width: 14px; height: 14px; border-radius: 4px; background: #095238; color: #58fca5; align-items: center; justify-content: center; font-size: 8px; font-family: 'JetBrains Mono', monospace;">50</span>
                  <span>50 / 50 Meilenstein-Zahlungsplan</span>
                </div>
                <div style="font-size: 7.8px; color: #466155; line-height: 1.3; margin-bottom: 6px;">
                  Faire, projektgebundene Abrechnung ohne Vorab-Risiko für den Auftraggeber:
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px; background: #ffffff; border: 1px solid #dfeae4; border-radius: 6px; padding: 6px 9px;">
                <div style="display: flex; justify-content: space-between; font-size: 8.5px; padding-bottom: 3px; border-bottom: 1px dashed #d5e3dc;">
                  <span style="color: #3d594c;">1. Anzahlung bei Projektstart (50%):</span>
                  <strong style="color: #07120e; font-family: 'JetBrains Mono', monospace;">${calculation.downPayment50.toLocaleString('de-AT')} €</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 8.5px;">
                  <span style="color: #3d594c;">2. Endzahlung bei Livegang & Abnahme (50%):</span>
                  <strong style="color: #07120e; font-family: 'JetBrains Mono', monospace;">${calculation.finalPayment50.toLocaleString('de-AT')} €</strong>
                </div>
              </div>
            </div>

            <!-- Right Box: Studio Fixed-Price Summary -->
            <div style="background: linear-gradient(135deg, #07120e 0%, #0d211a 100%); border: 1px solid #16362a; border-radius: 9px; padding: 10px 14px; display: flex; flex-direction: column; justify-content: center; color: #ffffff;">
              <div style="display: flex; justify-content: space-between; font-size: 8.5px; color: #b5cbc0; margin-bottom: 2px;">
                <span>Projektpreis (Einmalige Entwicklung):</span>
                <strong style="color: #ffffff; font-family: 'JetBrains Mono', monospace;">${calculation.oneTimeNet.toLocaleString('de-AT')} €</strong>
              </div>

              <div style="display: flex; justify-content: space-between; font-size: 7.5px; color: #8da89b; margin-bottom: 3px;">
                <span>Umsatzsteuer (Kleinunternehmer gem. § 6 Abs. 1 Z 27 UStG):</span>
                <span style="font-family: 'JetBrains Mono', monospace; color: #b5cbc0;">0 € (USt.-frei)</span>
              </div>

              <div style="height: 1px; background: rgba(88, 252, 165, 0.28); margin: 3px 0 4px 0;"></div>

              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-size: 10px; font-weight: 800; color: #ffffff; font-family: 'Manrope', 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 0.03em;">Verbindlicher Festpreis:</span>
                <span style="font-size: 15px; font-weight: 800; color: #58fca5; font-family: 'JetBrains Mono', monospace;">${calculation.oneTimeGross.toLocaleString('de-AT')} €</span>
              </div>

              ${calculation.mrrNet > 0 ? `
                <div style="display: flex; justify-content: space-between; font-size: 8px; color: #d1fae5; margin-top: 3px; padding-top: 3px; border-top: 1px dashed rgba(255, 255, 255, 0.14); font-family: 'JetBrains Mono', monospace;">
                  <span>Laufendes Hosting & Betreuung:</span>
                  <strong style="color: #58fca5;">${calculation.mrrNet.toLocaleString('de-AT')} € / Monat</strong>
                </div>
              ` : ''}

              ${calculation.savingsTotal > 0 ? `
                <div style="font-size: 7.2px; color: #9ab3a8; margin-top: 2px; text-align: right;">
                  Kalkulierter Preisvorteil ggü. Agenturmarkt: <strong style="color: #58fca5;">ca. ${calculation.savingsTotal.toLocaleString('de-AT')} €</strong>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Quality Guarantee & Legal Notice Banner -->
          <div style="background: #f8fbf9; border: 1px solid #d5e3dc; border-radius: 7px; padding: 6px 10px; margin-bottom: 6px;">
            <div style="font-size: 7.3px; color: #3d594c; line-height: 1.35;">
              <strong style="color: #07120e;">Verbindliche Festpreisgarantie & Urheberrecht:</strong> Alle angeführten Beträge sind garantierte Fixpreise für den oben definierten Leistungsumfang ohne versteckte Zusatzkosten (umsatzsteuerbefreit gemäß § 6 Abs. 1 Z 27 UStG). Nach vollständiger Begleichung der Endzahlung gehen sämtliche Nutzungs- und Quellcode-Rechte zu 100 % an den Auftraggeber über. Dieses Angebot ist 30 Tage ab Ausstellungsdatum gültig.
            </div>
          </div>

          <!-- Acceptance & Signature Block -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 5px; border-top: 1px dashed #cbdcd3; margin-bottom: 4px;">
            <div>
              <div style="font-size: 7.2px; color: #4d6b5d; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Auftragserteilung & Freigabe</div>
              <div style="margin-top: 20px; border-top: 1px solid #8da89b; width: 220px; font-size: 7px; color: #4d6b5d; padding-top: 2px;">
                Ort, Datum & Unterschrift Auftraggeber
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 7.2px; color: #095238; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">PureSite Software Studio · Graz</div>
              <div style="margin-top: 20px; border-top: 1px solid #095238; width: 245px; font-size: 7px; color: #3d594c; padding-top: 2px;">
                Maximilian Schlacher & Loreno Zanaboni · 8055 Graz
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Page Bottom Bar (Always pinned to bottom edge via margin-top: auto) -->
        <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #dfeae4; padding-top: 5px; font-size: 7.2px; color: #527062; font-family: 'JetBrains Mono', monospace;">
          <span>PureSite Software Studio · Am Leopoldsgrund 19, 8055 Graz</span>
          <span style="color: #07120e; font-weight: 700;">Seite ${pageNum} von ${totalPages}</span>
          <span>+43 676 6500468 · puresite.at</span>
        </div>

      </div>
    `;

    document.body.appendChild(container);

    try {
      if (pageIdx > 0) {
        pdf.addPage('a4', 'portrait');
      }

      // Fill full bleed canvas with crisp pearl-sage paper background
      pdf.setFillColor(247, 250, 248);
      pdf.rect(0, 0, 210, 297, 'F');

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f7faf8',
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
