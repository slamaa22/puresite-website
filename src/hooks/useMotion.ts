import { useEffect, useRef, useState } from 'react';
import type React from 'react';

/**
 * Observes all `[data-reveal]` elements in the document (including lazy-loaded React.Suspense chunks)
 * and adds `.is-revealed` when they enter the viewport.
 * Honors `prefers-reduced-motion: reduce`.
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: '0px 0px -6% 0px',
        threshold: 0.08
      }
    );

    const observeAllNew = (root: ParentNode = document) => {
      root.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(el => {
        io.observe(el);
      });
    };

    observeAllNew();

    const mo = new MutationObserver(mutations => {
      for (const m of mutations) {
        m.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            if (node.hasAttribute('data-reveal') && !node.classList.contains('is-revealed')) {
              io.observe(node);
            }
            observeAllNew(node);
          }
        });
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

/**
 * Smoothly interpolates numeric transitions (e.g. live calculator totals, telemetry scores)
 * using requestAnimationFrame with cubic-out easing.
 */
export function useAnimatedNumber(target: number, durationMs = 360): number {
  const [display, setDisplay] = useState<number>(target);
  const currentRef = useRef<number>(target);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || currentRef.current === target) {
      currentRef.current = target;
      const id = requestAnimationFrame(() => setDisplay(target));
      return () => cancelAnimationFrame(id);
    }

    const startVal = currentRef.current;
    const diff = target - startVal;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(startVal + diff * eased);
      currentRef.current = next;
      setDisplay(next);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        currentRef.current = target;
        setDisplay(target);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, durationMs]);

  return display;
}

/**
 * Zero-rerender pointer spotlight handler.
 * Updates `--spot-x` and `--spot-y` CSS custom properties directly on the card element.
 */
export function handleSpotlightMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  el.style.setProperty('--spot-x', `${x}px`);
  el.style.setProperty('--spot-y', `${y}px`);
}
