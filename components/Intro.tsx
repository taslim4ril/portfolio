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

export default function Intro() {
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Respect reduced-motion: skip the intro entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("out"), SPLIT_AT);
    const t2 = setTimeout(() => {
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
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {/* Top panel — carries the name, slides up on exit */}
      <motion.div
        className="absolute inset-x-0 top-0 flex h-1/2 items-end justify-center overflow-hidden bg-accent"
        initial={{ y: 0 }}
        animate={{ y: phase === "out" ? "-101%" : 0 }}
        transition={{ duration: 0.9, ease: panelEase }}
      >
        <motion.h2
          className="display flex items-start pb-1.5 text-5xl font-semibold text-accent-ink sm:text-6xl md:text-7xl"
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
          className="pt-3.5 text-xs uppercase tracking-[0.35em] text-accent-ink/70 sm:text-sm"
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
