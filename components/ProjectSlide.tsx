"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { type Project, site } from "@/lib/data";
import { renderMetric } from "./WorkCard";

const spring = { stiffness: 350, damping: 32, mass: 0.6 };

/**
 * One project on the homepage rail: the image fills the frame edge to edge
 * and everything else is set inside it, tags and meta along the top, title
 * and proof line along the bottom. The vertical list on /work keeps WorkCard.
 */
export default function ProjectSlide({
  p,
  index,
  drift,
}: {
  p: Project;
  /** Position on the rail, printed as 01, 02, ... */
  index: number;
  /** Sideways offset for the image inside its frame, in percent. The rail
      drives it from the card's position so the picture moves a little
      slower than the frame around it. */
  drift: MotionValue<string>;
}) {
  const [first, ...rest] = p.title.split(" ");
  // A locked (NDA) project has no public page, so the card asks for access
  // instead: an email to me, subject already filled in.
  const href = p.locked
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Access to the ${p.title} case study`)}`
    : `/work/${p.slug}`;
  const image = p.locked ? p.lockedImage : p.image;
  const action = p.locked ? "Request access" : "Read case study";

  // Cursor-follow pill over the image. Motion values only, so following the
  // pointer never re-renders the card.
  const frameRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const followX = useSpring(x, spring);
  const followY = useSpring(y, spring);
  const follow = (e: React.MouseEvent) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <a
      ref={frameRef}
      href={href}
      onMouseMove={follow}
      onMouseEnter={follow}
      className="group relative block h-full overflow-hidden rounded-[1.75rem] bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.99] md:rounded-[2.25rem]"
    >
      {image && (
        // Oversized by the drift range so the sideways travel never shows
        // an edge.
        <motion.div
          className="absolute inset-y-0 -left-[6%] -right-[6%]"
          style={{ x: drift }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={p.locked ? "" : `${p.title}: ${p.category}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
          />
        </motion.div>
      )}

      {/* Legibility scrims, tinted to the page rather than pure black: a
          short one under the top row and a deep one under the caption, with
          the middle of the photo left clear. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-background/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-background via-background/75 to-transparent md:h-[62%] md:from-background/95 md:via-background/55"
      />

      {/* Edge light: a hairline and a top highlight drawn above the photo,
          so the frame reads as a physical surface rather than a crop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      />

      {/* ===== Top row: tags, then category and year ===== */}
      <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-6 md:inset-x-10 md:top-10">
        <div className="flex flex-wrap gap-2">
          {p.locked && (
            <Pill className="border-accent/40 text-accent">Under NDA</Pill>
          )}
          {p.tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
        <dl className="hidden w-44 shrink-0 md:block">
          {[
            { k: "Category", v: p.category },
            { k: "Year", v: p.year },
          ].map((m) => (
            <div
              key={m.k}
              className="flex flex-col-reverse border-b border-white/15 py-3 first:pt-0 last:border-b-0"
            >
              <dt className="text-xs text-white/55">{m.k}</dt>
              <dd className="text-sm font-medium tabular-nums text-white">
                {m.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Pointer-only, decorative: the whole card is already the link. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 hidden md:block"
        style={{ x: followX, y: followY }}
      >
        <div className="flex -translate-x-1/2 -translate-y-1/2 scale-90 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-background/60 px-5 py-2.5 text-sm font-medium text-white opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-[opacity,transform] duration-300 ease-out group-hover:scale-100 group-hover:opacity-100">
          {action}
          <Arrow className="h-3.5 w-3.5" />
        </div>
      </motion.div>

      {/* ===== Caption ===== */}
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-6 md:inset-x-10 md:bottom-10">
        <div className="min-w-0 max-w-2xl">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/70">
            <span className="tabular-nums text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span aria-hidden className="h-px w-6 bg-white/30" />
            <span className="truncate">{p.subtitle}</span>
          </p>
          <h3 className="heading mt-3 text-4xl font-medium leading-none text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {first} <span className="text-white/45">{rest.join(" ")}</span>
          </h3>
          {/* The proof line, behind a hairline so it reads as evidence for
              the name above it rather than more description. */}
          <p className="mt-4 line-clamp-4 max-w-xl border-t border-white/20 pt-4 text-sm leading-relaxed text-white/75 md:mt-5 md:line-clamp-2">
            {p.locked
              ? "Under NDA. The full case study is available on request."
              : p.metric && renderMetric(p.metric)}
          </p>
        </div>

        {/* The visible affordance for touch, where the cursor pill never
            shows. Fills with the accent on hover. */}
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-background/40 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink md:h-16 md:w-16">
          <Arrow className="h-4 w-4 md:h-5 md:w-5" />
          <span className="sr-only">{action}</span>
        </span>
      </div>
    </a>
  );
}

function Pill({
  children,
  className = "text-white/85",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`rounded-full border border-white/15 bg-background/50 px-3.5 py-1.5 text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md ${className}`}
    >
      {children}
    </span>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
