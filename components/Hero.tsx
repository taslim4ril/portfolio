"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/data";
import Marquee from "./Marquee";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-[#0d0d0e]"
    >
      {/* ===== Background image placeholder (swap for your own later) ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]">
        {/* Landscape silhouette stand-in */}
        <svg
          className="absolute bottom-0 h-full w-full"
          viewBox="0 0 1440 620"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="hero-bg-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d0d0e" />
              <stop offset="45%" stopColor="#141416" />
              <stop offset="100%" stopColor="#1c1c1f" />
            </linearGradient>
          </defs>
          <rect width="1440" height="620" fill="url(#hero-bg-fade)" />
          <path
            d="M0 470 L220 360 L430 430 L650 320 L880 420 L1080 340 L1300 430 L1440 380 L1440 620 L0 620 Z"
            fill="#202023"
          />
          <path
            d="M0 540 L260 450 L520 520 L760 430 L1010 520 L1240 450 L1440 510 L1440 620 L0 620 Z"
            fill="#2a2a2e"
          />
        </svg>
        {/* Fade the top of the image into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0e] via-transparent to-transparent" />
      </div>

      {/* ===== Foreground content ===== */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6">
        <div className="grid gap-10 pt-36 md:grid-cols-2 md:pt-44 lg:grid-cols-[460px_1fr]">
          {/* Photo card placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            <div
              data-cursor
              className="group relative aspect-[2/1] w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#232326] to-[#141416]"
            >
              {/* Placeholder body */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-white/40">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="9" r="1.6" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-[11px] uppercase tracking-widest">Your photo</span>
              </div>
              {/* Chrome overlay to echo the reference style */}
              <span className="absolute left-3 top-3 text-[10px] font-medium uppercase tracking-widest text-white/60">
                {site.location}
              </span>
              <span className="absolute right-3 top-3 text-right text-[9px] leading-tight text-white/50">
                09:00 WAT
                <br />
                Available
              </span>
            </div>
          </motion.div>

          {/* About text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="flex items-start gap-4 md:justify-end"
          >
            <span className="mt-3 shrink-0 text-sm text-white/45">(About me)</span>
            <h1
              className="display max-w-[46rem] font-medium leading-[1.08] text-white"
              style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.7rem)" }}
            >
              I&apos;m {site.name},{" "}
              <span className="text-white/60">
                a {site.role} based in {site.location}.
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Bottom meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
          className="mt-auto flex items-center justify-between gap-4 pb-6 pt-16"
        >
          <span className="text-xs tracking-widest text-white/50">/ 2026 /</span>
          <span className="hidden items-center gap-2 text-xs tracking-widest text-white/50 sm:flex">
            Scroll down
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </span>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-white/10"
          >
            Start a project
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-[10px] transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </motion.div>
      </div>

      {/* ===== Scrolling text (your existing marquee) ===== */}
      <Marquee />
    </section>
  );
}
