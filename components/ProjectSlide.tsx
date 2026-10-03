"use client";

import { useRef } from "react";
import { type Project, site } from "@/lib/data";
import { renderMetric } from "./WorkCard";
import CaseCursor from "./CaseCursor";

/**
 * One project in the homepage theater: the image fills the card edge to edge
 * and everything else is set inside it, tags and meta along the top, title
 * and proof line along the bottom. Shape (corner radius, clipping) belongs
 * to the parent, which animates it. The vertical list on /work keeps
 * WorkCard.
 */
export default function ProjectSlide({
  p,
  index,
  onFocus,
}: {
  p: Project;
  /** Position in the sequence, printed as 01, 02, ... */
  index: number;
  onFocus?: () => void;
}) {
  const [first, ...rest] = p.title.split(" ");
  // A locked (NDA) project has no public page, so the card asks for access
  // instead: an email to me, subject already filled in.
  const href = p.locked
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Access to the ${p.title} case study`)}`
    : `/work/${p.slug}`;
  const image = p.locked ? p.lockedImage : p.image;
  const action = p.locked ? "Request access" : "Read case study";

  const frameRef = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={frameRef}
      href={href}
      onFocus={onFocus}
      className="group relative block h-full w-full overflow-hidden bg-surface"
    >
      {image && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={image}
          alt={p.locked ? "" : `${p.title}: ${p.category}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
        />
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

      {/* ===== Top row: tags, then category and year ===== */}
      {/* Starts below the fixed nav: the card passes under it at full bleed. */}
      <div className="absolute inset-x-5 top-20 flex items-start justify-between gap-6 md:inset-x-12 md:top-24">
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
              <dt className="text-sm text-white/55">{m.k}</dt>
              <dd className="text-base font-medium tabular-nums text-white">
                {m.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <CaseCursor targetRef={frameRef} label={action} />

      {/* ===== Caption ===== */}
      <div className="absolute inset-x-5 bottom-6 flex items-end justify-between gap-6 md:inset-x-12 md:bottom-12">
        <div className="min-w-0 max-w-2xl">
          <p className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white/70">
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
          <p className="mt-4 line-clamp-4 max-w-2xl border-t border-white/20 pt-4 text-base leading-relaxed md:text-lg text-white/75 md:mt-5 md:line-clamp-2">
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
      className={`rounded-full border border-white/15 bg-background/50 px-3.5 py-1.5 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md ${className}`}
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
