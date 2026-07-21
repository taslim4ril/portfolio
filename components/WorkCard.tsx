"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { type Project } from "@/lib/data";

export default function WorkCard({
  p,
  href = "#contact",
}: {
  p: Project;
  /** Where the card points. Pass an absolute path from non-home pages. */
  href?: string;
}) {
  const [first, ...rest] = p.title.split(" ");
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hovering, setHovering] = useState(false);

  // Cursor-follow button: position is driven by real mouse coordinates
  // relative to the card, smoothed with a spring so it trails slightly
  // rather than snapping — same spring pattern as the global custom cursor.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <a
      ref={cardRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        setHovering(true);
        handleMouseMove(e);
      }}
      onMouseLeave={() => setHovering(false)}
      /* Suppresses the global accent cursor — this card supplies its own
         cursor-following button instead, so showing both would double up. */
      data-cursor-hide
      className="card-rise group relative block h-[76vh] min-h-[500px] overflow-hidden rounded-[2.5rem] bg-surface"
    >
      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.image}
        alt={`${p.title} — ${p.category}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
      {/* Legibility scrims */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/85" />

      {/* Tag pills */}
      <div className="absolute left-6 top-6 flex flex-col items-start gap-2 md:left-10 md:top-10">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs text-white/85 backdrop-blur-sm"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Meta list */}
      <div className="absolute right-6 top-6 hidden w-44 md:right-10 md:top-10 md:block">
        {[
          { k: "Category", v: p.category },
          { k: "Year", v: p.year },
        ].map((m) => (
          <div key={m.k} className="border-b border-white/15 py-3 last:border-b-0">
            <div className="text-sm font-medium text-white">{m.v}</div>
            <div className="text-xs text-white/50">{m.k}</div>
          </div>
        ))}
      </div>

      {/* Cursor-follow "Read case study" button — desktop only (fine
          pointers), purely decorative, so it never blocks the card's own
          click target. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        style={{ x: springX, y: springY }}
      >
        <div
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-black/40 px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 ease-out"
          style={{
            opacity: hovering ? 1 : 0,
            transform: `translate(-50%, -50%) scale(${hovering ? 1 : 0.9})`,
          }}
        >
          Read case study
          <span className="text-base">↗</span>
        </div>
      </motion.div>

      {/* Title block */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
        <p className="text-sm text-white/70">{p.subtitle}</p>
        <h3 className="heading mt-2 text-4xl font-medium leading-none text-white sm:text-5xl md:text-6xl">
          {first} <span className="text-white/45">{rest.join(" ")}</span>
        </h3>
      </div>
    </a>
  );
}
