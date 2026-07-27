"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/data";

const NAME = "Taslim";

// Timeline (ms)
const SPLIT_AT = 1350; // when the panels start splitting apart
const DONE_AT = 2350; // when the overlay unmounts

const panelEase = [0.83, 0, 0.17, 1] as const; // easeInOutQuint — snappy split
const riseEase = [0.22, 1, 0.36, 1] as const;

// Module-level so it survives client-side navigation but resets on a real
// document load. It's only set to true once the intro finishes, so it plays on
// first load / refresh, yet is skipped when navigating back to home from
// another page (the home page remounts, but this module is not re-evaluated).
let introHasPlayed = false;

export default function Intro() {
  const [phase, setPhase] = useState<"in" | "out">("in");
  // If the intro already ran this session, start "done" so it never flashes.
  const [done, setDone] = useState(introHasPlayed);

  useEffect(() => {
    // Skip when: already played in this document, the no-flash gate decided to
    // skip (same-origin referrer — see layout.tsx), or reduced-motion. The
    // overlay is already CSS-hidden in those cases, so this just unmounts it
    // and leaves the scroll unlocked.
    const gateSkip = (window as { __introSkip?: boolean }).__introSkip === true;
    if (
      introHasPlayed ||
      gateSkip ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      introHasPlayed = true;
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("out"), SPLIT_AT);
    const t2 = setTimeout(() => {
      introHasPlayed = true;
      setDone(true);
      document.body.style.overflow = "";
    }, DONE_AT);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className="intro-overlay pointer-events-none fixed inset-0 z-[100]">
      {/* Top panel — carries the name, slides up on exit */}
      <motion.div
        className="absolute inset-x-0 top-0 flex h-1/2 items-end justify-center overflow-hidden bg-accent"
        initial={{ y: 0 }}
        animate={{ y: phase === "out" ? "-101%" : 0 }}
        transition={{ duration: 0.9, ease: panelEase }}
      >
        <motion.h2
          className="heading flex items-start pb-1.5 text-5xl font-bold text-accent-ink sm:text-6xl md:text-7xl"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
          }}
        >
          {NAME.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { y: 32, opacity: 0 },
                show: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.5, ease: riseEase },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            className="ml-1.5 mt-1 text-lg sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.4 }}
          >
            &reg;
          </motion.span>
        </motion.h2>
      </motion.div>

      {/* Bottom panel — carries the role, slides down on exit */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex h-1/2 items-start justify-center overflow-hidden bg-accent"
        initial={{ y: 0 }}
        animate={{ y: phase === "out" ? "101%" : 0 }}
        transition={{ duration: 0.9, ease: panelEase }}
      >
        <motion.p
          className="pt-3.5 text-xs font-semibold uppercase tracking-[0.35em] text-accent-ink/70 sm:text-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {site.role}
        </motion.p>
      </motion.div>
    </div>
  );
}
