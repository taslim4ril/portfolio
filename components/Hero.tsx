"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site, services, roles } from "@/lib/data";
import Marquee from "./Marquee";
import DustField from "./DustField";
import Scramble, { SCRAMBLE_MS } from "./Scramble";

/** How long a finished role sits still before the next swap begins. */
const HOLD = 5200;

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
  const sectionRef = useRef<HTMLElement>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [heroOnScreen, setHeroOnScreen] = useState(true);

  // Each tick re-renders the hero and kicks off a fresh scramble. Left
  // ungated it keeps doing that from the footer, so the rotator only runs
  // while the hero is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setHeroOnScreen(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!heroOnScreen) return;
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      HOLD + SCRAMBLE_MS,
    );
    return () => clearInterval(id);
  }, [heroOnScreen]);

  // Last word drops to the gradient line, everything before it stays on the
  // cream line above, mirroring the two-line headline this replaced.
  const words = roles[roleIndex].split(" ");
  const roleTail = words[words.length - 1];
  const roleLead = words.slice(0, -1).join(" ");

  // Drives the portrait as the hero scrolls away: 0 while the hero is parked
  // at the top, 1 once it has fully scrolled past. Reverses on the way back up.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.55]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.75], [0.8, 0]);
  const portraitFilter = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(22px)"],
  );
  // Dust rides the same scroll-out, a touch slower so it outlives the photo.
  const dustOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      /* Locked to the viewport from md up, where the two-column layout fits.
         Below that everything stacks into a single column and pinning the
         height only squeezes it, so mobile takes the viewport as a floor and
         grows past it when the content needs the room. */
      className="relative flex min-h-dvh flex-col overflow-hidden bg-black md:h-dvh"
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
        {/* Scroll-linked: pushes into the face while blurring and fading out,
            so the portrait dissolves instead of sliding away. Anchored at the
            mask's centre (50% 40%) so the zoom stays on the face.
            The y offset nudges the portrait down the frame; the radial mask
            travels with it, so no hard top edge is exposed. Percentages here
            resolve against the element's own height, which is the full
            section, so 6% reads as 6dvh. */}
        <motion.img
          src="/images/portrait-hero.jpg"
          alt=""
          className="absolute left-1/2 top-0 h-full object-cover object-top contrast-[1.12] mix-blend-screen"
          style={{
            x: "-50%",
            y: "6%",
            scale: portraitScale,
            opacity: portraitOpacity,
            filter: portraitFilter,
            transformOrigin: "50% 40%",
            willChange: "transform, filter, opacity",
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

      {/* Dust sits above the portrait and its scrim but below the copy, so
          motes float in front of the photo without touching legibility. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ opacity: dustOpacity }}
      >
        <DustField />
      </motion.div>

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
      {/* Top padding clears the fixed nav on mobile, where the stack starts at
          the top of the section instead of being pushed down by spare height. */}
      <div className="relative z-10 flex w-full flex-1 flex-col justify-end px-6 pb-10 pt-28 md:px-[100px] md:pt-0">
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
            {/* Sits above the rotating role so the name stays put while the
                headline cycles. Kept off the cqi scale the h1 uses, which is
                sized for ~10 characters and would overflow on 17. */}
            <p className="font-heading mt-3 text-2xl font-medium tracking-[-0.01em] text-white md:text-3xl">
              {site.name}
            </p>
            <h1 className="heading mt-4 font-bold uppercase leading-[0.86] tracking-[-0.02em]">
              <Scramble
                text={roleLead}
                trigger={roleIndex}
                className="block text-[#eceades]"
                style={{ fontSize: "clamp(2.5rem, 16cqi, 10rem)" }}
              />
              <Scramble
                text={roleTail}
                trigger={roleIndex}
                className="block bg-gradient-to-r from-accent via-accent to-[#7d9e24] bg-clip-text text-transparent"
                style={{ fontSize: "clamp(2.5rem, 16cqi, 10rem)" }}
              />
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
              Let&apos;s connect
              {/* Heavy square-capped arrow: shaft on the diagonal, head drawn
                  as the corner it lands in. Sized to sit level with the cap
                  height of the label rather than as an inline glyph. */}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                className="h-11 w-11 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 md:h-12 md:w-12"
              >
                <path
                  d="M6.5 6.5 17.5 17.5M17.5 9v8.5H9"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </a>

            {/* The wide gap is deliberate on desktop, where it drops the bio to
                the baseline of the name column. Stacked, it's just a hole. */}
            <p className="mt-10 max-w-sm text-base leading-relaxed text-white/55 md:mt-32">
              {site.role} with 5+ years of experience across SaaS, fintech, and
              agritech, turning complex problems into clear, human-centered
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
