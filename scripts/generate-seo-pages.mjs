import fs from 'node:fs';
import path from 'node:path';

const ARTICLES_PATH = path.resolve(process.cwd(), 'src', 'data', 'seoArticles.json');
const ARTICLES = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'));

const CLUSTERS = [
  { key: 'all', label: 'Alle Guides' },
  { key: 'kaufberatung', label: 'Kaufberatung & Preise' },
  { key: 'branchen', label: 'Branchen-Guides' },
  { key: 'regional-seo', label: 'Graz & Local SEO' },
  { key: 'technik-dsgvo', label: 'Technik & DSGVO' }
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const SHARED_STYLES = `
  :root {
    --font-heading: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-sans: 'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    --bg-canvas: #0b1113;
    --bg-panel: rgba(18, 28, 32, 0.72);
    --bg-card: rgba(22, 35, 40, 0.64);
    --bg-card-solid: #111c20;
    --bg-tertiary: rgba(255, 255, 255, 0.04);

    --pure-mint: #58fca5;
    --ps-accent: #58fca5;
    --ps-accent-ink: #06130e;
    --ps-soft-tint: rgba(88, 252, 165, 0.095);
    --ps-soft-border: rgba(88, 252, 165, 0.28);

    --text-pure: #eef4f1;
    --text-secondary: #b5c6c0;
    --text-muted: #849993;

    --border-subtle: rgba(255, 255, 255, 0.10);
    --border-medium: rgba(255, 255, 255, 0.17);

    --header-bg:
      radial-gradient(120% 180% at 14% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 56%),
      radial-gradient(95% 160% at 88% 100%, rgba(88, 252, 165, 0.065) 0%, transparent 62%),
      linear-gradient(145deg, #152328 0%, #0e171b 58%, #101e1e 100%);
    --card-surface:
      linear-gradient(145deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.018) 58%, rgba(88, 252, 165, 0.025) 100%),
      rgba(15, 24, 28, 0.72);
    --specular-rim:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.18),
      inset 1px 0 0 0 rgba(255, 255, 255, 0.06);
    --card-shadow: 0 22px 50px -16px rgba(0, 0, 0, 0.52), 0 4px 16px rgba(0, 0, 0, 0.24);
    --grid-line: rgba(147, 210, 191, 0.055);
  }

  [data-theme="light"] {
    --bg-canvas: #f5f7f4;
    --bg-panel: rgba(255, 255, 255, 0.85);
    --bg-card: rgba(255, 255, 255, 0.82);
    --bg-card-solid: #ffffff;
    --bg-tertiary: rgba(23, 107, 97, 0.055);

    --pure-mint: #146c60;
    --ps-accent: #176b61;
    --ps-accent-ink: #ffffff;
    --ps-soft-tint: rgba(23, 107, 97, 0.085);
    --ps-soft-border: rgba(23, 107, 97, 0.25);

    --text-pure: #182628;
    --text-secondary: #435458;
    --text-muted: #66777b;

    --border-subtle: rgba(24, 48, 45, 0.095);
    --border-medium: rgba(24, 48, 45, 0.16);

    --header-bg:
      radial-gradient(120% 180% at 14% 0%, rgba(255, 255, 255, 0.98) 0%, transparent 58%),
      radial-gradient(95% 160% at 88% 100%, rgba(23, 107, 97, 0.055) 0%, transparent 62%),
      linear-gradient(145deg, #fcfffe 0%, #f4f9f6 100%);
    --card-surface:
      linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.78) 60%, rgba(233, 245, 239, 0.82) 100%);
    --specular-rim:
      inset 0 1.5px 0 0 rgba(255, 255, 255, 0.95),
      inset 0 -1px 0 0 rgba(23, 107, 97, 0.06);
    --card-shadow: 0 20px 44px -16px rgba(18, 44, 39, 0.11), 0 4px 14px rgba(18, 44, 39, 0.05);
    --grid-line: rgba(23, 107, 97, 0.055);
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: var(--font-sans);
    background-color: var(--bg-canvas);
    color: var(--text-pure);
    line-height: 1.68;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .ambient-backdrop {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(circle at 16% 12%, var(--ps-soft-tint), transparent 42%),
      radial-gradient(circle at 84% 18%, rgba(94, 234, 212, 0.07), transparent 46%),
      radial-gradient(circle at 50% 85%, var(--ps-soft-tint), transparent 50%);
  }
  .ambient-grid {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 85% 70% at 50% 25%, #000 35%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 85% 70% at 50% 25%, #000 35%, transparent 100%);
  }

  .page-shell { position: relative; z-index: 1; }

  .ps-glass-header {
    position: sticky;
    top: 12px;
    z-index: 1000;
    width: min(1240px, calc(100% - 28px));
    margin: 12px auto 0;
    border-radius: 9999px;
    background: var(--header-bg);
    backdrop-filter: blur(28px) saturate(195%);
    -webkit-backdrop-filter: blur(28px) saturate(195%);
    border: 1px solid var(--border-medium);
    box-shadow: var(--specular-rim), var(--card-shadow);
  }
  .ps-header-inner {
    height: 68px;
    padding-inline: clamp(14px, 2vw, 26px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: nowrap;
  }
  .ps-brand {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    color: var(--text-pure);
    text-decoration: none !important;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .ps-brand img {
    width: 36px;
    height: 36px;
    border-radius: 9px;
    object-fit: contain;
  }
  .ps-brand-text {
    font-family: var(--font-heading);
    font-size: 1.28rem;
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: 1;
    color: var(--text-pure);
  }
  .ps-brand-light { font-weight: 400; color: var(--ps-accent); }
  .ps-brand-subtitle {
    display: block;
    margin-top: 3px;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.19em;
    color: var(--text-muted);
  }
  .ps-desktop-nav {
    display: flex;
    align-items: center;
    gap: clamp(4px, 0.9vw, 14px);
    margin-left: auto;
    margin-right: 6px;
    white-space: nowrap;
    flex-wrap: nowrap;
  }
  .ps-nav-link {
    padding: 7px 11px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-decoration: none !important;
    transition: all 0.18s ease;
    white-space: nowrap;
  }
  .ps-nav-link:hover,
  .ps-nav-link.is-active {
    color: var(--ps-accent);
    background: var(--ps-soft-tint);
  }
  .ps-header-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .ps-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 16px;
    border-radius: 999px;
    background: var(--ps-accent);
    color: var(--ps-accent-ink) !important;
    font-weight: 700;
    font-size: 0.85rem;
    text-decoration: none !important;
    box-shadow: 0 8px 20px -6px rgba(23, 107, 97, 0.32);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    white-space: nowrap;
  }
  .ps-cta-btn:hover { transform: translateY(-1px); }

  .ps-wrap {
    width: min(1200px, calc(100% - 32px));
    margin: 0 auto;
  }

  .article-hero {
    margin-top: 2.25rem;
    padding: clamp(1.75rem, 3.5vw, 3rem);
    border-radius: 28px;
    background: var(--card-surface);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--border-medium);
    box-shadow: var(--specular-rim), var(--card-shadow);
    position: relative;
    overflow: hidden;
  }
  .breadcrumb-bar {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    font-size: 0.82rem;
    color: var(--text-muted);
    margin-bottom: 1.15rem;
    padding: 5px 12px;
    border-radius: 999px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
  }
  .breadcrumb-bar a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 600;
  }
  .breadcrumb-bar a:hover { color: var(--ps-accent); }

  .meta-pills {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .badge-accent {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 13px;
    border-radius: 999px;
    background: var(--ps-soft-tint);
    border: 1px solid var(--ps-soft-border);
    color: var(--ps-accent);
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }
  .badge-muted {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 999px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    font-size: 0.78rem;
    font-weight: 600;
  }

  .article-hero h1 {
    font-family: var(--font-heading);
    font-size: clamp(1.85rem, 3.6vw, 2.85rem);
    font-weight: 800;
    line-height: 1.16;
    letter-spacing: -0.032em;
    color: var(--text-pure);
    margin: 0 0 1.15rem 0;
    max-width: 28ch;
  }
  .article-lead {
    font-size: clamp(1.02rem, 1.35vw, 1.16rem);
    line-height: 1.65;
    color: var(--text-secondary);
    margin: 0 0 1.75rem 0;
    max-width: 72ch;
  }

  .metrics-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-subtle);
  }
  .metric-box {
    padding: 12px 14px;
    border-radius: 16px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
  }
  .metric-box strong {
    display: block;
    font-family: var(--font-heading);
    font-size: 1.12rem;
    font-weight: 800;
    color: var(--ps-accent);
    line-height: 1.2;
  }
  .metric-box span { font-size: 0.78rem; color: var(--text-muted); }

  .editorial-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 2rem;
    margin-top: 2rem;
    align-items: start;
  }

  .takeaways-card {
    padding: 1.65rem 1.85rem;
    border-radius: 24px;
    background: var(--ps-soft-tint);
    border: 1px solid var(--ps-soft-border);
    box-shadow: var(--specular-rim);
    margin-bottom: 1.75rem;
  }
  .takeaways-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-heading);
    font-size: 1.02rem;
    font-weight: 800;
    color: var(--ps-accent);
    margin-bottom: 1rem;
  }
  .check-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.7rem;
  }
  .check-list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.95rem;
    color: var(--text-pure);
    line-height: 1.55;
  }
  .check-icon {
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background: var(--ps-soft-tint);
    border: 1px solid var(--ps-soft-border);
    color: var(--ps-accent);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .chapter-card {
    padding: clamp(1.5rem, 2.8vw, 2.2rem);
    border-radius: 24px;
    background: var(--card-surface);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border: 1px solid var(--border-subtle);
    box-shadow: var(--specular-rim), var(--card-shadow);
    margin-bottom: 1.5rem;
    scroll-margin-top: 96px;
  }
  .chapter-num {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--ps-accent);
    background: var(--ps-soft-tint);
    border: 1px solid var(--ps-soft-border);
    padding: 3px 10px;
    border-radius: 999px;
    margin-bottom: 0.75rem;
  }
  .chapter-card h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.25rem, 2vw, 1.52rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.3;
    color: var(--text-pure);
    margin: 0 0 0.9rem 0;
  }
  .chapter-card p {
    font-size: 0.98rem;
    line-height: 1.72;
    color: var(--text-secondary);
    margin: 0 0 1rem 0;
  }
  .chapter-card p:last-child { margin-bottom: 0; }

  .highlight-callout {
    margin-top: 1.25rem;
    padding: 1.2rem 1.35rem;
    border-radius: 16px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
    border-left: 4px solid var(--ps-accent);
  }
  .highlight-callout strong {
    display: block;
    font-size: 0.95rem;
    color: var(--text-pure);
    margin-bottom: 0.3rem;
  }
  .highlight-callout span {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .faq-section {
    margin-top: 2.25rem;
    scroll-margin-top: 96px;
  }
  .faq-section-title {
    font-family: var(--font-heading);
    font-size: 1.45rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
  }
  details.faq-item {
    border-radius: 18px;
    background: var(--card-surface);
    border: 1px solid var(--border-subtle);
    box-shadow: var(--specular-rim);
    margin-bottom: 0.85rem;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }
  details.faq-item[open] { border-color: var(--ps-soft-border); }
  details.faq-item summary {
    list-style: none;
    cursor: pointer;
    padding: 1.15rem 1.35rem;
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-pure);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  details.faq-item summary::-webkit-details-marker { display: none; }
  .faq-toggle-pill {
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
    color: var(--ps-accent);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  details.faq-item[open] .faq-toggle-pill {
    transform: rotate(45deg);
    background: var(--ps-soft-tint);
  }
  .faq-answer {
    padding: 0 1.35rem 1.25rem 1.35rem;
    color: var(--text-secondary);
    font-size: 0.94rem;
    line-height: 1.65;
    border-top: 1px solid var(--border-subtle);
    padding-top: 0.95rem;
  }

  .sticky-sidebar {
    position: sticky;
    top: 96px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .sidebar-card {
    padding: 1.45rem;
    border-radius: 22px;
    background: var(--card-surface);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border: 1px solid var(--border-medium);
    box-shadow: var(--specular-rim), var(--card-shadow);
  }
  .sidebar-overline {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ps-accent);
    margin: 0 0 0.75rem 0;
  }
  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }
  .toc-link {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 7px 10px;
    border-radius: 10px;
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-decoration: none !important;
    transition: all 0.18s ease;
    line-height: 1.38;
  }
  .toc-link:hover {
    background: var(--ps-soft-tint);
    color: var(--ps-accent);
  }
  .toc-num {
    font-family: var(--font-mono);
    font-size: 0.74rem;
    color: var(--ps-accent);
    margin-top: 1px;
  }

  .price-highlight-box {
    margin: 0.85rem 0 1rem;
    padding: 0.95rem 1.1rem;
    border-radius: 14px;
    background: var(--ps-soft-tint);
    border: 1px solid var(--ps-soft-border);
  }
  .price-highlight-box strong {
    display: block;
    font-family: var(--font-heading);
    font-size: 1.55rem;
    font-weight: 800;
    color: var(--text-pure);
    line-height: 1.15;
  }
  .price-highlight-box span { font-size: 0.78rem; color: var(--text-secondary); }

  .conversion-banner {
    margin-top: 2.25rem;
    padding: clamp(1.75rem, 3.5vw, 2.6rem);
    border-radius: 26px;
    background:
      radial-gradient(120% 180% at 10% 0%, var(--ps-soft-tint) 0%, transparent 60%),
      var(--card-surface);
    border: 1px solid var(--ps-soft-border);
    box-shadow: var(--specular-rim), var(--card-shadow);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .conversion-banner h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.35rem, 2.4vw, 1.85rem);
    font-weight: 800;
    margin: 0;
  }
  .conversion-banner p {
    color: var(--text-secondary);
    margin: 0;
    font-size: 1rem;
    max-width: 64ch;
  }

  .related-section {
    margin-top: 3rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--border-subtle);
  }
  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
    margin-top: 1.25rem;
  }
  .related-card {
    padding: 1.45rem;
    border-radius: 22px;
    background: var(--card-surface);
    border: 1px solid var(--border-subtle);
    box-shadow: var(--specular-rim), var(--card-shadow);
    color: var(--text-pure);
    text-decoration: none !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .related-card:hover {
    transform: translateY(-3px);
    border-color: var(--ps-soft-border);
  }

  .all-guides-pills {
    margin-top: 1.75rem;
    padding: 1.25rem;
    border-radius: 18px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
  }
  .all-guides-pills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
  .guide-chip-link {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 5px 11px;
    border-radius: 999px;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.15s ease;
  }
  .guide-chip-link:hover,
  .guide-chip-link.is-current {
    border-color: var(--ps-soft-border);
    color: var(--ps-accent);
    background: var(--ps-soft-tint);
  }

  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: 1.75rem;
  }
  .filter-btn {
    padding: 7px 15px;
    border-radius: 999px;
    border: 1px solid var(--border-medium);
    background: var(--card-surface);
    color: var(--text-secondary);
    font-family: var(--font-sans);
    font-size: 0.84rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.16s ease;
  }
  .filter-btn.is-active,
  .filter-btn:hover {
    background: var(--ps-accent);
    color: var(--ps-accent-ink);
    border-color: var(--ps-accent);
  }

  .ps-site-footer {
    margin-top: 4.5rem;
    padding: 3.5rem 0 2.5rem;
    border-top: 1px solid var(--border-subtle);
    background: var(--bg-panel);
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr 1fr 1fr;
    gap: 2rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid var(--border-subtle);
  }
  .footer-col h4 {
    font-family: var(--font-mono);
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--ps-accent);
    margin: 0 0 1rem 0;
  }
  .footer-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .footer-col a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.86rem;
    transition: color 0.18s ease;
  }
  .footer-col a:hover { color: var(--ps-accent); }
  .footer-bottom {
    padding-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    font-size: 0.82rem;
    color: var(--text-muted);
  }

  @media (max-width: 1024px) {
    .ps-desktop-nav { display: none; }
    .editorial-grid { grid-template-columns: 1fr; }
    .sticky-sidebar { position: static; }
    .metrics-strip { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 1.75rem; }
  }
  @media (max-width: 560px) {
    .metrics-strip { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
  }
`;

const THEME_INIT_SCRIPT = `
  (function() {
    try {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('puresite-theme', 'light');
    } catch (e) {}
  })();
`;

function renderHeaderHtml() {
  return `
  <header class="ps-glass-header">
    <div class="ps-header-inner">
      <a href="https://puresite.at/" class="ps-brand" aria-label="PureSite — Startseite">
        <img src="/assets/puresite-logo-dark-stroke.png" alt="PureSite Logo" width="36" height="36" />
        <span class="ps-brand-text">
          pure<span class="ps-brand-light">site</span>
          <small class="ps-brand-subtitle">SOFTWARE STUDIO</small>
        </span>
      </a>

      <nav class="ps-desktop-nav" aria-label="Hauptnavigation">
        <a href="https://puresite.at/#demos" class="ps-nav-link">Leistungen &amp; Demos</a>
        <a href="https://puresite.at/#warum-wir" class="ps-nav-link">Praxis &amp; Technik</a>
        <a href="https://puresite.at/#preise" class="ps-nav-link">Festpreis-Rechner</a>
        <a href="https://puresite.at/#prozess" class="ps-nav-link">Zusammenarbeit</a>
        <a href="https://puresite.at/#ueber-uns" class="ps-nav-link">Über uns</a>
        <a href="/ratgeber/" class="ps-nav-link is-active">Ratgeber</a>
      </nav>

      <div class="ps-header-controls">
        <a href="https://puresite.at/#preise" class="ps-cta-btn">
          <span>Kalkulator</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg>
        </a>
      </div>
    </div>
  </header>`;
}

function renderFooterHtml() {
  const half = Math.ceil(ARTICLES.length / 2);
  const colOne = ARTICLES.slice(0, half);
  const colTwo = ARTICLES.slice(half);

  return `
  <footer class="ps-site-footer">
    <div class="ps-wrap">
      <div class="footer-grid">
        <div class="footer-col">
          <a href="https://puresite.at/" class="ps-brand" style="margin-bottom:0.85rem;">
            <img src="/assets/puresite-logo-dark-stroke.png" alt="PureSite Logo" width="32" height="32" />
            <span class="ps-brand-text">pure<span class="ps-brand-light">site</span></span>
          </a>
          <p style="color:var(--text-secondary); font-size:0.88rem; margin:0.6rem 0 0; max-width:34ch;">
            Webdesign &amp; Softwareentwicklung für Graz, die Steiermark &amp; ganz Österreich. Maßgeschneiderte Websites zum garantierten Festpreis.
          </p>
        </div>

        <div class="footer-col">
          <h4>Ratgeber Teil 1</h4>
          <ul>
            ${colOne.map(a => `<li><a href="${a.url}">${escapeHtml(a.shortTitle)}</a></li>`).join('\n            ')}
          </ul>
        </div>

        <div class="footer-col">
          <h4>Ratgeber Teil 2</h4>
          <ul>
            ${colTwo.map(a => `<li><a href="${a.url}">${escapeHtml(a.shortTitle)}</a></li>`).join('\n            ')}
          </ul>
        </div>

        <div class="footer-col">
          <h4>Direktkontakt Graz</h4>
          <ul>
            <li><a href="mailto:maximilian.schlacher@outlook.com">maximilian.schlacher@outlook.com</a></li>
            <li><a href="tel:+436766500468">+43 676 6500468</a></li>
            <li><a href="https://puresite.at/#preise">Festpreis-Kalkulator (ab 1.000 €) ↗</a></li>
            <li><a href="/ratgeber/">Alle ${ARTICLES.length} Ratgeber anzeigen →</a></li>
            <li style="color:var(--text-muted); font-size:0.82rem; margin-top:0.35rem;">
              Maximilian Schlacher &amp; Loreno Zanaboni<br/>Am Leopoldsgrund 19, 8055 Graz
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 PureSite Software Studio · Webdesign Graz &amp; Steiermark · Am Leopoldsgrund 19, 8055 Graz</span>
        <a href="https://puresite.at/" style="color:var(--ps-accent); text-decoration:none; font-weight:700;">← Zurück zur Hauptseite puresite.at</a>
      </div>
    </div>
  </footer>`;
}

function getRelatedArticles(article) {
  const others = ARTICLES.filter(a => a.slug !== article.slug);
  const sameCluster = others.filter(a => a.cluster === article.cluster);
  const diffCluster = others.filter(a => a.cluster !== article.cluster);
  return [...sameCluster, ...diffCluster].slice(0, 3);
}

function renderArticleHtml(article) {
  const canonicalUrl = `https://puresite.at${article.url}`;
  const relatedArticles = getRelatedArticles(article);

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: article.title,
        description: article.metaDescription,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: 'de-AT',
        keywords: article.keywords.join(', '),
        image: 'https://puresite.at/assets/og-image.jpg',
        author: [
          { '@type': 'Person', name: 'Maximilian Schlacher' },
          { '@type': 'Person', name: 'Loreno Zanaboni' }
        ],
        publisher: {
          '@type': 'Organization',
          name: 'PureSite Software Studio',
          url: 'https://puresite.at/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://puresite.at/assets/puresite-logo-dark-stroke.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Startseite (Webdesign Graz)',
            item: 'https://puresite.at/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Ratgeber',
            item: 'https://puresite.at/ratgeber/'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.shortTitle,
            item: canonicalUrl
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: article.faq.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      }
    ]
  });

  return `<!doctype html>
<html lang="de-AT" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(article.metaTitle)}</title>
  <meta name="description" content="${escapeHtml(article.metaDescription)}" />
  <meta name="keywords" content="${escapeHtml(article.keywords.join(', '))}" />
  <meta name="author" content="PureSite — Maximilian Schlacher &amp; Loreno Zanaboni" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <meta name="geo.region" content="AT-6" />
  <meta name="geo.placename" content="Graz, Steiermark" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="de_AT" />
  <meta property="og:site_name" content="PureSite Software Studio Graz" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${escapeHtml(article.metaTitle)}" />
  <meta property="og:description" content="${escapeHtml(article.metaDescription)}" />
  <meta property="og:image" content="https://puresite.at/assets/og-image.jpg" />
  <meta property="article:published_time" content="${article.publishedAt}" />
  <meta property="article:modified_time" content="${article.updatedAt}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Manrope:wght@600;700;800&display=swap" />
  <script>${THEME_INIT_SCRIPT}</script>
  <script type="application/ld+json">${schemaJson}</script>
  <style>${SHARED_STYLES}</style>
</head>
<body>
  <div class="ambient-backdrop" aria-hidden="true"></div>
  <div class="ambient-grid" aria-hidden="true"></div>

  <div class="page-shell">
    ${renderHeaderHtml()}

    <main class="ps-wrap">
      <section class="article-hero">
        <nav class="breadcrumb-bar" aria-label="Breadcrumb">
          <a href="https://puresite.at/">PureSite Graz</a>
          <span>›</span>
          <a href="/ratgeber/">Ratgeber</a>
          <span>›</span>
          <span style="color:var(--text-pure);">${escapeHtml(article.shortTitle)}</span>
        </nav>

        <div class="meta-pills">
          <span class="badge-accent">${escapeHtml(article.category)}</span>
          <span class="badge-muted">⏱ ${escapeHtml(article.readTime)}</span>
          <span class="badge-muted">📍 Graz &amp; Steiermark (Stand: Nov. 2026)</span>
        </div>

        <h1>${escapeHtml(article.title)}</h1>
        <p class="article-lead">${escapeHtml(article.excerpt)}</p>

        <div class="metrics-strip">
          <div class="metric-box">
            <strong>ab 1.000 €</strong>
            <span>Garantierter Festpreis</span>
          </div>
          <div class="metric-box">
            <strong>&lt; 0,4 Sek.</strong>
            <span>Echte Ladezeit (Handcode)</span>
          </div>
          <div class="metric-box">
            <strong>98–100</strong>
            <span>Google PageSpeed Score</span>
          </div>
          <div class="metric-box">
            <strong>50% / 50%</strong>
            <span>Sichere Zahlung nach Abnahme</span>
          </div>
        </div>
      </section>

      <div class="editorial-grid">
        <article>
          <div class="takeaways-card">
            <div class="takeaways-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span>Das Wichtigste auf einen Blick</span>
            </div>
            <ul class="check-list">
              ${article.keyTakeaways
                .map(
                  t => `
              <li>
                <span class="check-icon">✓</span>
                <span>${escapeHtml(t)}</span>
              </li>`
                )
                .join('')}
            </ul>
          </div>

          ${article.sections
            .map(
              (sec, idx) => `
          <section id="kapitel-${idx + 1}" class="chapter-card">
            <span class="chapter-num">KAPITEL 0${idx + 1}</span>
            <h2>${escapeHtml(sec.heading)}</h2>
            ${sec.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('\n            ')}
            ${
              sec.bullets
                ? `<ul class="check-list" style="margin-top:1.1rem;">\n              ${sec.bullets
                    .map(
                      b => `<li><span class="check-icon">✓</span><span>${escapeHtml(b)}</span></li>`
                    )
                    .join('\n              ')}\n            </ul>`
                : ''
            }
            ${
              sec.highlightBox
                ? `<div class="highlight-callout"><strong>${escapeHtml(sec.highlightBox.title)}</strong><span>${escapeHtml(sec.highlightBox.text)}</span></div>`
                : ''
            }
          </section>`
            )
            .join('\n')}

          <section id="faq" class="faq-section">
            <h2 class="faq-section-title">Häufig gestellte Fragen zum Thema</h2>
            ${article.faq
              .map(
                (f, i) => `
            <details class="faq-item" ${i === 0 ? 'open' : ''}>
              <summary>
                <span>${escapeHtml(f.question)}</span>
                <span class="faq-toggle-pill">+</span>
              </summary>
              <div class="faq-answer">${escapeHtml(f.answer)}</div>
            </details>`
              )
              .join('\n')}
          </section>

          <div class="conversion-banner">
            <div>
              <span class="badge-accent" style="margin-bottom:0.65rem;">100 % unverbindlich · 8055 Graz</span>
              <h2>${escapeHtml(article.ctaTitle)}</h2>
            </div>
            <p>${escapeHtml(article.ctaSub)}</p>
            <div style="display:flex; gap:0.85rem; flex-wrap:wrap; align-items:center;">
              <a href="https://puresite.at/#preise" class="ps-cta-btn" style="padding:12px 22px; font-size:0.94rem;">
                <span>Jetzt im Festpreis-Rechner kalkulieren</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg>
              </a>
              <a href="https://puresite.at/#demos" class="ps-nav-link" style="border:1px solid var(--border-medium); padding:11px 18px; color:var(--text-pure);">
                18 interaktive Live-Demos testen →
              </a>
              <a href="tel:+436766500468" class="ps-nav-link" style="border:1px solid var(--border-subtle); padding:11px 18px;">
                📞 +43 676 6500468
              </a>
            </div>
          </div>
        </article>

        <aside class="sticky-sidebar" aria-label="Inhaltsverzeichnis &amp; Direktkalkulator">
          <div class="sidebar-card">
            <p class="sidebar-overline">Inhaltsverzeichnis</p>
            <ul class="toc-list">
              ${article.sections
                .map(
                  (sec, idx) => `
              <li>
                <a href="#kapitel-${idx + 1}" class="toc-link">
                  <span class="toc-num">0${idx + 1}</span>
                  <span>${escapeHtml(sec.heading)}</span>
                </a>
              </li>`
                )
                .join('')}
              <li>
                <a href="#faq" class="toc-link">
                  <span class="toc-num">FAQ</span>
                  <span>Häufige Fragen &amp; Antworten</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="sidebar-card">
            <p class="sidebar-overline">Sofort-Orientierung</p>
            <h3 style="font-family:var(--font-heading); font-size:1.15rem; margin:0 0 0.4rem;">Website zum Festpreis konfigurieren</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin:0;">
              Stelle dir deine Wunsch-Module in 60 Sekunden zusammen — mit sofortigem PDF-Angebot.
            </p>
            <div class="price-highlight-box">
              <strong>ab 1.000 €</strong>
              <span>Fixpreis · 30 Tage Preisgarantie</span>
            </div>
            <ul class="check-list" style="margin-bottom:1.15rem; gap:0.45rem;">
              <li style="font-size:0.82rem;"><span class="check-icon" style="width:17px;height:17px;font-size:0.7rem;">✓</span><span>Keine versteckten Agentur-Stundensätze</span></li>
              <li style="font-size:0.82rem;"><span class="check-icon" style="width:17px;height:17px;font-size:0.7rem;">✓</span><span>50 % bei Start · 50 % erst bei Livegang</span></li>
              <li style="font-size:0.82rem;"><span class="check-icon" style="width:17px;height:17px;font-size:0.7rem;">✓</span><span>Direkt in Graz (Maximilian &amp; Loreno)</span></li>
            </ul>
            <a href="https://puresite.at/#preise" class="ps-cta-btn" style="width:100%; justify-content:center; padding:11px 16px;">
              <span>Zum Online-Kalkulator</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg>
            </a>
          </div>
        </aside>
      </div>

      <section class="related-section">
        <span class="badge-accent" style="margin-bottom:0.5rem;">Passende Themen-Guides</span>
        <h2 style="font-family:var(--font-heading); font-size:1.6rem; margin:0;">Weitere Praxis-Artikel für Grazer &amp; steirische Betriebe</h2>
        <div class="related-grid">
          ${relatedArticles
            .map(
              oa => `
          <a href="${oa.url}" class="related-card">
            <div>
              <span class="badge-accent" style="font-size:0.68rem; padding:3px 10px; margin-bottom:0.65rem;">${escapeHtml(oa.category)}</span>
              <h3 style="font-family:var(--font-heading); font-size:1.12rem; margin:0 0 0.5rem; line-height:1.35;">${escapeHtml(oa.title)}</h3>
              <p style="font-size:0.86rem; color:var(--text-secondary); margin:0;">${escapeHtml(oa.excerpt.slice(0, 140))}...</p>
            </div>
            <span style="color:var(--ps-accent); font-weight:700; font-size:0.86rem;">Artikel lesen (${escapeHtml(oa.readTime)}) →</span>
          </a>`
            )
            .join('\n')}
        </div>

        <div class="all-guides-pills">
          <strong style="font-size:0.88rem; color:var(--text-pure);">Alle ${ARTICLES.length} Praxis-Ratgeber im Direktzugriff:</strong>
          <div class="all-guides-pills-list">
            ${ARTICLES.map(
              a =>
                `<a href="${a.url}" class="guide-chip-link ${
                  a.slug === article.slug ? 'is-current' : ''
                }">${escapeHtml(a.shortTitle)}</a>`
            ).join('\n            ')}
          </div>
        </div>
      </section>
    </main>

    ${renderFooterHtml()}
  </div>
</body>
</html>`;
}

function renderHubHtml() {
  const canonicalUrl = 'https://puresite.at/ratgeber/';
  const hubSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl}#collection`,
    name: 'PureSite Webdesign & Local SEO Ratgeber Graz & Steiermark',
    description:
      'Alle Praxis-Guides für Unternehmen in Graz & der Steiermark: Website kaufen, Preise, Branchen-Tipps, Förderungen, DSGVO & Google Maps Ranking.',
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: ARTICLES.map((a, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `https://puresite.at${a.url}`,
        name: a.title
      }))
    }
  });

  return `<!doctype html>
<html lang="de-AT" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Webdesign Ratgeber Graz &amp; Steiermark (${ARTICLES.length} Guides): Website kaufen, Preise &amp; Local SEO | PureSite</title>
  <meta name="description" content="${ARTICLES.length} Praxis-Ratgeber für Unternehmen in Graz &amp; Steiermark: Website kaufen, Webdesign-Kosten, Förderung (KMU.DIGITAL/SFG), Handwerker &amp; Ärzte Guides, DSGVO &amp; Google Maps SEO." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Manrope:wght@600;700;800&display=swap" />
  <script>${THEME_INIT_SCRIPT}</script>
  <script type="application/ld+json">${hubSchema}</script>
  <style>${SHARED_STYLES}</style>
</head>
<body>
  <div class="ambient-backdrop" aria-hidden="true"></div>
  <div class="ambient-grid" aria-hidden="true"></div>

  <div class="page-shell">
    ${renderHeaderHtml()}

    <main class="ps-wrap">
      <section class="article-hero">
        <nav class="breadcrumb-bar" aria-label="Breadcrumb">
          <a href="https://puresite.at/">PureSite Graz</a>
          <span>›</span>
          <span style="color:var(--text-pure);">Ratgeber &amp; Wissen</span>
        </nav>

        <div class="meta-pills">
          <span class="badge-accent">Praxis-Ratgeber 2026</span>
          <span class="badge-muted">📍 Für KMU &amp; Betriebe in Graz &amp; Steiermark</span>
        </div>

        <h1>Website kaufen, Förderungen, Branchen-Tipps &amp; Local SEO in Graz</h1>
        <p class="article-lead">
          Transparente Entscheidungshilfen ohne Agentur-Blabla: Erfahre in ${ARTICLES.length} ausführlichen Guides, worauf es beim Kauf einer Website in Graz ankommt, welche Förderungen es in der Steiermark gibt und wie moderner Handcode dein Google-Ranking steigert.
        </p>

        <div class="metrics-strip">
          <div class="metric-box">
            <strong>${ARTICLES.length} Guides</strong>
            <span>Praxiswissen für KMU</span>
          </div>
          <div class="metric-box">
            <strong>ab 1.000 €</strong>
            <span>Garantierter Festpreis</span>
          </div>
          <div class="metric-box">
            <strong>&lt; 0,4 Sek.</strong>
            <span>Ladezeit ohne WordPress</span>
          </div>
          <div class="metric-box">
            <strong>8055 Graz</strong>
            <span>Persönlich vor Ort</span>
          </div>
        </div>
      </section>

      <div class="filter-bar" role="tablist" aria-label="Themenbereiche filtern">
        ${CLUSTERS.map((c, idx) => {
          const count =
            c.key === 'all'
              ? ARTICLES.length
              : ARTICLES.filter(a => a.cluster === c.key).length;
          return `<button type="button" class="filter-btn ${idx === 0 ? 'is-active' : ''}" data-filter="${c.key}">${escapeHtml(c.label)} (${count})</button>`;
        }).join('\n        ')}
      </div>

      <div id="articles-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap:1.35rem; margin-top:1.75rem;">
        ${ARTICLES.map(
          (a, i) => `
        <article class="chapter-card" data-cluster="${a.cluster}" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between; gap:1.1rem;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.65rem; flex-wrap:wrap; margin-bottom:0.75rem;">
              <span class="chapter-num" style="margin:0;">GUIDE ${String(i + 1).padStart(2, '0')} · ${escapeHtml(a.category.toUpperCase())}</span>
              <span style="font-size:0.78rem; color:var(--text-muted);">⏱ ${escapeHtml(a.readTime)}</span>
            </div>
            <h2 style="font-size:1.18rem; margin:0 0 0.65rem;">
              <a href="${a.url}" style="color:inherit; text-decoration:none;">${escapeHtml(a.title)}</a>
            </h2>
            <p style="font-size:0.9rem;">${escapeHtml(a.excerpt)}</p>
            <ul class="check-list" style="margin-top:0.85rem;">
              ${a.keyTakeaways
                .slice(0, 2)
                .map(t => `<li style="font-size:0.83rem;"><span class="check-icon">✓</span><span>${escapeHtml(t)}</span></li>`)
                .join('')}
            </ul>
          </div>
          <div style="padding-top:0.9rem; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <a href="${a.url}" class="ps-cta-btn">
              <span>Artikel lesen</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg>
            </a>
            <span style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(a.keywords[0])}</span>
          </div>
        </article>`
        ).join('\n')}
      </div>

      <div class="conversion-banner">
        <div>
          <span class="badge-accent" style="margin-bottom:0.65rem;">Festpreis-Kalkulator</span>
          <h2>Berechne deine neue Website in 60 Sekunden online</h2>
        </div>
        <p>Stelle dir deine benötigten Module transparent zusammen, sieh sofort deinen verbindlichen Festpreis und lade dir dein Angebot direkt als PDF herunter.</p>
        <div>
          <a href="https://puresite.at/#preise" class="ps-cta-btn" style="padding:12px 22px; font-size:0.94rem;">
            <span>Direkt zum Festpreis-Rechner (ab 1.000 €)</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg>
          </a>
        </div>
      </div>
    </main>

    ${renderFooterHtml()}
  </div>
  <script>
    (function() {
      var btns = document.querySelectorAll('.filter-btn');
      var cards = document.querySelectorAll('#articles-grid article');
      btns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var filter = btn.getAttribute('data-filter');
          btns.forEach(function(b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          cards.forEach(function(card) {
            if (filter === 'all' || card.getAttribute('data-cluster') === filter) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    })();
  </script>
</body>
</html>`;
}

function renderSitemapXml() {
  const today = '2026-11-13';
  const articleUrls = ARTICLES.map(
    a => `  <url>
    <loc>https://puresite.at${a.url}</loc>
    <lastmod>${a.updatedAt || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://puresite.at/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://puresite.at/assets/og-image.jpg</image:loc>
      <image:title>PureSite — High-Performance Webentwicklung &amp; Webdesign Graz</image:title>
      <image:caption>Maßgeschneiderte Websites mit Festpreis ab 1.000 € in Graz und der Steiermark</image:caption>
    </image:image>
    <image:image>
      <image:loc>https://puresite.at/assets/puresite-logo-dark-stroke.png</image:loc>
      <image:title>PureSite Software Studio Logo</image:title>
      <image:caption>Offizielles Logo von PureSite Software Studio</image:caption>
    </image:image>
  </url>
  <url>
    <loc>https://puresite.at/ratgeber/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${articleUrls}
</urlset>
`;
}

const rootDir = path.resolve(process.cwd(), 'public', 'ratgeber');
fs.mkdirSync(rootDir, { recursive: true });
fs.writeFileSync(path.join(rootDir, 'index.html'), renderHubHtml(), 'utf8');

for (const art of ARTICLES) {
  const dir = path.join(rootDir, art.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderArticleHtml(art), 'utf8');
}

const sitemapPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, renderSitemapXml(), 'utf8');

console.log(`Successfully generated ${ARTICLES.length} SEO subpages + hub + sitemap.xml!`);
