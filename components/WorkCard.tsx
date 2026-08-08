"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { type Project } from "@/lib/data";

export default function WorkCard({
  p,
  href,
}: {
  p: Project;
  /** Where the card points. Defaults to the project's case-study page. */
  href?: string;
}) {
  const [first, ...rest] = p.title.split(" ");
  const target = href ?? `/work/${p.slug}`;
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
      href={target}
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
      {/* Image. Optional: a project can exist before its shots do, and a
          broken image icon reads worse than an honest empty frame. */}
      {p.image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={p.image}
          alt={`${p.title}: ${p.category}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-surface-2 text-white/25">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="9" r="1.6" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="text-[11px] uppercase tracking-widest">
            Image placeholder
          </span>
        </div>
      )}
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
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">
          {p.subtitle}
        </p>
        <h3 className="heading mt-3 text-4xl font-medium leading-none text-white sm:text-5xl md:text-6xl">
          {first} <span className="text-white/45">{rest.join(" ")}</span>
        </h3>
        {p.metric && (
          /* The proof line. Sits under the title behind a hairline so it
             reads as evidence for the name above it rather than more
             description, and it is capped in width so it never runs under
             the meta list on the opposite corner. */
          <div className="mt-5 max-w-lg border-t border-white/20 pt-4">
            <p className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
              <span aria-hidden className="mt-[0.3rem] text-[0.6rem] text-accent">
                ✦
              </span>
              <span>
                {/* Figures are picked out in the accent so the claim is
                    scannable before it is read. */}
                {p.metric.split(/(\d[\d,.%-]*)/g).map((part, i) =>
                  /^\d/.test(part) ? (
                    <strong key={i} className="font-medium text-accent">
                      {part}
                    </strong>
                  ) : (
                    part
                  ),
                )}
              </span>
            </p>
          </div>
        )}
      </div>
    </a>
  );
}
