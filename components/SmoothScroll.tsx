"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum smooth-scrolling via Lenis.
 * - Single rAF loop; Lenis drives native scroll (so `position: sticky`,
 *   scroll-driven CSS animations and IntersectionObserver all keep working).
 * - Disabled entirely for prefers-reduced-motion.
 * - Intercepts in-page anchor links so nav jumps ease instead of snapping.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // easeOutExpo — quick start, long soft settle
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
