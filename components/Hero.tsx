"use client";

import { motion } from "framer-motion";
import { site, services } from "@/lib/data";
import Marquee from "./Marquee";

const ease = [0.22, 1, 0.36, 1] as const;

// Small marks for the services list on the right rail.
const serviceIcons = [
  <svg key="a" viewBox="0 0 24 24" fill="none" className="h-full w-full">
    <circle cx="12" cy="12" r="3.2" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <path d="M5 5l2.8 2.8M16.2 16.2 19 19M19 5l-2.8 2.8M7.8 16.2 5 19" />
    </g>
  </svg>,
  <svg key="b" viewBox="0 0 24 24" fill="none" className="h-full w-full">
    <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 3v18M3 12h18" />
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" opacity="0.5" />
    </g>
  </svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" className="h-full w-full">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M12 3a9 9 0 0 1 0 18 5 5 0 0 1 0-10 4 4 0 0 0 0-8Z"
      fill="currentColor"
    />
  </svg>,
];

export default function Hero() {
  const [first, ...restName] = site.name.split(" ");

  return (
    <section
      id="top"
      className="relative flex h-dvh flex-col overflow-hidden bg-black"
    >
      {/* ===== Portrait ===== */}
      <div aria-hidden className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* The photo's dark surround is dissolved rather than covered:
            `screen` blending makes its near-black pixels read as the page's
            own black (no lifted-rectangle edge), and the radial mask fades
            the frame's boundary out entirely. Note there's deliberately no
            brightness filter — lifting the blacks is exactly what made the
            photo's rectangle visible against the page. */}
        <img
          src="/images/portrait-hero.jpg"
          alt=""
          className="absolute left-1/2 top-0 h-full -translate-x-1/2 object-cover object-top contrast-[1.12] mix-blend-screen"
          style={{
            maskImage:
              "radial-gradient(ellipse 62% 72% at 50% 40%, #000 52%, transparent 86%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 62% 72% at 50% 40%, #000 52%, transparent 86%)",
          }}
        />
        {/* Bottom scrim only — kept for text legibility. Taller on small
            screens, where the text block starts higher over the face. */}
        <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-black via-black/90 to-transparent md:h-[45%] md:via-black/85" />
      </div>

      {/* ===== Left rail — keep scrolling ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.7 }}
        className="absolute left-5 top-[32%] z-20 hidden items-center gap-4 lg:flex lg:flex-col"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-white/45 [writing-mode:vertical-rl]">
          Keep scrolling
        </span>
        <motion.span
          aria-hidden
          className="text-white/45"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>

      {/* ===== Content ===== */}
      <div className="relative z-10 flex w-full flex-1 flex-col justify-end px-6 pb-10 md:px-[100px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          {/* --- Name block --- */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            /* flex-1 gives the block whatever the rail leaves over, and the
               container query lets the name size itself to that column (cqi
               units) instead of the viewport — critical because glyphs that
               overflow a bg-clip-text box get no background and turn
               invisible. */
            className="min-w-0 flex-1 [container-type:inline-size]"
          >
            <p className="text-xs tracking-[0.2em] text-white/55 md:text-sm">
              Discover My Creative Journey
            </p>
            <h1 className="heading mt-4 font-bold uppercase leading-[0.86] tracking-[-0.02em]">
              <span
                className="block text-[#eceades]"
                style={{ fontSize: "clamp(2.5rem, 16cqi, 10rem)" }}
              >
                {first}
              </span>
              <span
                className="block bg-gradient-to-r from-accent via-accent to-[#7d9e24] bg-clip-text text-transparent"
                style={{ fontSize: "clamp(2.5rem, 16cqi, 10rem)" }}
              >
                {restName.join(" ")}
              </span>
            </h1>
          </motion.div>

          {/* --- Right rail: services, CTA, bio --- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.35 }}
            className="w-full shrink-0 lg:w-[26rem]"
          >
            {/* Rule above the list mirrors the one under it, so the services
                sit in a bounded band. */}
            <ul className="space-y-5 border-t border-white/15 pt-6">
              {services.slice(0, 3).map((s, i) => (
                <li key={s.title} className="flex items-center gap-4">
                  <span className="h-6 w-6 shrink-0 text-white/70">
                    {serviceIcons[i % serviceIcons.length]}
                  </span>
                  <span className="text-lg text-white/90 md:text-xl">
                    {s.title}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="group mt-8 flex items-center justify-between border-t border-white/15 pt-6 text-base font-medium uppercase tracking-[0.15em] text-accent transition-colors hover:text-white md:text-lg"
            >
              Talk to me
              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                ↘
              </span>
            </a>

            <p className="mt-32 max-w-sm text-base leading-relaxed text-white/55">
              {site.role} with 5+ years of experience across SaaS, fintech, and
              agritech — turning complex problems into clear, human-centered
              digital experiences.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ===== Scrolling text ===== */}
      <Marquee />
    </section>
  );
}
