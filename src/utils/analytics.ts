/**
 * PureSite Cookieless Open-Source Analytics (Umami — MIT License)
 * - 100% DSGVO / TKG 2021 compliant without cookie banners (zero cookies, zero fingerprinting)
 * - Works with self-hosted Umami (e.g. 1-click Coolify service) or Umami Cloud EU (free tier)
 * - Supports both Vite build-time env vars and Coolify Docker runtime env vars (/env-config.json)
 * - Owner opt-out: append `?notrack=1` once to exclude your own browser (`?track=1` to re-enable)
 */

declare global {
  interface Window {
    umami?: {
      track: (
        eventName?: string | Record<string, unknown>,
        eventData?: Record<string, string | number | boolean>
      ) => void;
    };
  }
}

const UMAMI_OPT_OUT_KEY = 'umami.disabled';
const DEFAULT_SCRIPT_URL = 'https://cloud.umami.is/script.js';
let initialized = false;

function injectUmamiScript(websiteId: string, scriptUrl: string): void {
  const cleanId = websiteId.trim();
  if (!cleanId) return;

  const cleanUrl = scriptUrl.trim() || DEFAULT_SCRIPT_URL;
  if (document.querySelector(`script[data-website-id="${cleanId}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.defer = true;
  script.src = cleanUrl;
  script.setAttribute('data-website-id', cleanId);
  script.setAttribute('data-auto-track', 'true');
  document.head.appendChild(script);
}

export function initAnalytics(): void {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  // Allow founders/team to exclude their own visits via ?notrack=1 (or re-enable via ?track=1)
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('notrack') === '1') {
      localStorage.setItem(UMAMI_OPT_OUT_KEY, '1');
    } else if (params.get('track') === '1') {
      localStorage.removeItem(UMAMI_OPT_OUT_KEY);
    }

    if (localStorage.getItem(UMAMI_OPT_OUT_KEY) === '1') {
      return;
    }
  } catch {
    // Ignore storage access errors in strict privacy modes
  }

  const buildWebsiteId = (import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined)?.trim();
  const buildScriptUrl =
    (import.meta.env.VITE_UMAMI_SCRIPT_URL as string | undefined)?.trim() || DEFAULT_SCRIPT_URL;

  if (buildWebsiteId) {
    injectUmamiScript(buildWebsiteId, buildScriptUrl);
    return;
  }

  // Fallback for Coolify / Docker runtime environment variables without rebuild
  if (import.meta.env.PROD) {
    fetch('/env-config.json', { cache: 'no-store' })
      .then(res => (res.ok ? res.json() : null))
      .then((cfg: { umamiWebsiteId?: string; umamiScriptUrl?: string } | null) => {
        if (cfg?.umamiWebsiteId) {
          injectUmamiScript(cfg.umamiWebsiteId, cfg.umamiScriptUrl || DEFAULT_SCRIPT_URL);
        }
      })
      .catch(() => {
        // Silently ignore if hosted on a static CDN without runtime env-config.json
      });
  }
}

export function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;
  try {
    if (localStorage.getItem(UMAMI_OPT_OUT_KEY) === '1') return;
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(eventName, eventData);
    }
  } catch {
    // Never let analytics interfere with UX
  }
}
