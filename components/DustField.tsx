"use client";

import { useEffect, useRef } from "react";

const COUNT = 150;
/** Furthest a speck shifts when the cursor travels from centre to edge. */
const PARALLAX = 26;

type Speck = {
  /** Position as a 0–1 fraction of the canvas, so resizes never strand one. */
  x: number;
  y: number;
  r: number;
  alpha: number;
  /** How strongly this speck answers the cursor. Fakes depth. */
  depth: number;
  vx: number;
  vy: number;
  phase: number;
};

/**
 * Slow-drifting dust motes on a canvas. They rise on their own and shift
 * against the cursor, so the layer reads as depth in front of the portrait
 * rather than as a moving background.
 */
export default function DustField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;

    const specks: Speck[] = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.4,
      alpha: 0.08 + Math.random() * 0.3,
      depth: 0.25 + Math.random() * 0.75,
      vx: (Math.random() - 0.5) * 0.006,
      vy: -0.004 - Math.random() * 0.008,
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Cursor is tracked as a target and eased separately, so the field trails
    // the pointer instead of snapping to it.
    let targetX = 0;
    let targetY = 0;
    let easedX = 0;
    let easedY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      easedX += (targetX - easedX) * 0.045;
      easedY += (targetY - easedY) * 0.045;

      ctx.clearRect(0, 0, width, height);

      for (const s of specks) {
        if (!reduced) {
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          // Re-enter from the opposite edge once a speck drifts clear.
          if (s.y < -0.02) s.y = 1.02;
          if (s.x < -0.02) s.x = 1.02;
          if (s.x > 1.02) s.x = -0.02;
        }

        const px = s.x * width - easedX * PARALLAX * s.depth;
        const py = s.y * height - easedY * PARALLAX * s.depth;
        const twinkle = 0.75 + 0.25 * Math.sin(now * 0.0009 + s.phase);

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 252, 240, ${s.alpha * twinkle})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
