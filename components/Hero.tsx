"use client";

import { motion } from "framer-motion";
import { site, stats } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-36 pb-20 md:pt-44 md:pb-28">
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(200,255,61,0.12), transparent)" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl"
      >
        <motion.div variants={item} className="mb-8 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <span className="text-sm text-muted">
            Available for work · {site.location}
          </span>
        </motion.div>

        <h1 className="display max-w-5xl text-5xl font-semibold sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <motion.span variants={item} className="block">
            Bridging the gap
          </motion.span>
          <motion.span variants={item} className="block">
            between{" "}
            <span className="text-accent">technology</span>
          </motion.span>
          <motion.span variants={item} className="block">
            & human interaction
          </motion.span>
        </h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-lg text-muted md:text-xl"
        >
          {site.subhead}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            View my work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-surface"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="display text-3xl font-semibold md:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
