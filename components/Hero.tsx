"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/data";
import Marquee from "./Marquee";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    // Pinned: the Selected Work section scrolls up and over this.
    <section
      id="top"
      className="sticky top-0 z-0 h-dvh overflow-hidden bg-[#0d0d0e]"
    >
      {/* Inner wrapper carries the scroll-driven recede (keeps transforms off
          the sticky element itself, which would break pinning). */}
      <div className="hero-recede relative flex h-full flex-col">
      {/* ===== Background image ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />
        {/* Fade the top of the image into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0e] via-[#0d0d0e]/40 to-transparent" />
      </div>

      {/* ===== Foreground content ===== */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6">
        <div className="grid gap-10 pt-36 md:grid-cols-2 md:pt-44 lg:grid-cols-[460px_1fr]">
          {/* Portrait card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            <div
              data-cursor
              className="group relative aspect-[2/1] w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#141416]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/portrait.jpg"
                alt={`${site.name} — ${site.role}`}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {/* Slight scrim so the overlay labels stay legible */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
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
              className="display max-w-[46rem] font-semibold leading-[1.08] text-white"
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
      </div>
    </section>
  );
}
