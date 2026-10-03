"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/data";
import DustField from "./DustField";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Drives the portrait as the hero scrolls away: 0 while the hero is parked
  // at the top, 1 once it has fully scrolled past. Reverses on the way back up.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.55]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.75], [0.8, 0]);
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
          src="/images/portrait-hero.webp"
          alt=""
          className="absolute left-1/2 top-0 h-full object-cover object-top contrast-[1.12] mix-blend-screen"
          style={{
            x: "-50%",
            y: "6%",
            scale: portraitScale,
            opacity: portraitOpacity,
            transformOrigin: "50% 40%",
            willChange: "transform, opacity",
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
            <h1 className="heading font-bold uppercase leading-[0.86] tracking-[-0.02em]">
              {/* The name reads first, in sentence case, off the cqi scale
                  the title uses (that scale is sized for ~10 characters). */}
              <span className="mb-4 block font-heading text-2xl font-medium normal-case tracking-[-0.01em] text-white md:text-3xl">
                {site.name}
                <span className="sr-only">, </span>
              </span>
              <span
                className="block text-[#eceade]"
                style={{ fontSize: "clamp(2.5rem, 16cqi, 10rem)" }}
              >
                Product
              </span>
              {/* Flat accent: a gradient on the biggest type on the page was
                  the one place the palette stopped being a single colour. */}
              <span
                className="block text-accent"
                style={{ fontSize: "clamp(2.5rem, 16cqi, 10rem)" }}
              >
                Designer
              </span>
            </h1>
          </motion.div>

          {/* --- Right rail: bio, then the CTA under it --- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.35 }}
            className="w-full shrink-0 lg:w-[26rem]"
          >
            {/* The wide top margin is deliberate on desktop, where it drops the
                rail to the baseline of the name column. Stacked, it's a hole,
                so it only applies from lg up. */}
            <p className="max-w-sm border-t border-white/15 pt-6 text-lg leading-relaxed text-white/55 lg:mt-24">
              {site.subhead}
            </p>

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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
