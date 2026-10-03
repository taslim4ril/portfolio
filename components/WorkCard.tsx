"use client";

import { useRef } from "react";
import { type Project, site } from "@/lib/data";
import CaseCursor from "./CaseCursor";

export default function WorkCard({
  p,
  href,
  className = "h-[76vh] min-h-[500px]",
  rise = true,
}: {
  p: Project;
  /** Where the card points. Defaults to the project's case-study page. */
  href?: string;
  /** Sizing. The default suits a vertical list; the homepage rail sets its own. */
  className?: string;
  /** The CSS scale-in tied to vertical scroll. Off where the parent drives
      the scale itself (the horizontal rail), since both would set transform. */
  rise?: boolean;
}) {
  const [first, ...rest] = p.title.split(" ");
  // A locked (NDA) project has no public page, so the card asks for access
  // instead: an email to me, subject already filled in.
  const target = p.locked
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Access to the ${p.title} case study`)}`
    : (href ?? `/work/${p.slug}`);
  const image = p.locked ? p.lockedImage : p.image;
  const cardRef = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={cardRef}
      href={target}
      className={`${rise ? "card-rise " : ""}group relative block overflow-hidden rounded-[2.5rem] bg-surface ${className}`}
    >
      {/* Image. Optional: a project can exist before its shots do, and a
          broken image icon reads worse than an honest empty frame. */}
      {image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={image}
          alt={p.locked ? "" : `${p.title}: ${p.category}`}
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
          <span className="text-sm uppercase tracking-widest">
            Image placeholder
          </span>
        </div>
      )}
      {/* Legibility scrims */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/85" />

      {/* Tag pills */}
      <div className="absolute left-6 top-6 flex flex-col items-start gap-2 md:left-10 md:top-10">
        {p.locked && (
          <span className="rounded-full border border-accent/50 bg-black/60 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur-sm">
            Under NDA
          </span>
        )}
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-sm text-white/85 backdrop-blur-sm"
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
            <div className="text-base font-medium text-white">{m.v}</div>
            <div className="text-sm text-white/50">{m.k}</div>
          </div>
        ))}
      </div>

      <CaseCursor
        targetRef={cardRef}
        label={p.locked ? "Request access" : "Read case study"}
      />

      {/* Title block */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">
          {p.subtitle}
        </p>
        <h3 className="heading mt-3 text-4xl font-medium leading-none text-white sm:text-5xl md:text-6xl">
          {first} <span className="text-white/45">{rest.join(" ")}</span>
        </h3>
        {p.locked ? (
          <div className="mt-5 max-w-lg border-t border-white/20 pt-4">
            <p className="text-base leading-relaxed text-white/75">
              This work is under NDA. The full case study is available on
              request.
            </p>
          </div>
        ) : p.metric && (
          /* The proof line. Sits under the title behind a hairline so it
             reads as evidence for the name above it rather than more
             description, and it is capped in width so it never runs under
             the meta list on the opposite corner. */
          <div className="mt-5 max-w-lg border-t border-white/20 pt-4">
            <p className="flex items-start gap-2.5 text-base leading-relaxed text-white/70 md:text-lg">
              <span aria-hidden className="mt-[0.3rem] text-[0.6rem] text-accent">
                ✦
              </span>
              <span>
                {/* Figures are picked out in the accent so the claim is
                    scannable before it is read. The spans are marked in the
                    copy with [brackets] rather than sniffed out by a regex:
                    a figure carries a different number of words each time
                    (7-tool, 3 core journeys, 20 hours), and guessing at that
                    gets it wrong somewhere every time. */}
                {renderMetric(p.metric)}
              </span>
            </p>
          </div>
        )}
      </div>
    </a>
  );
}

/** A metric line with its [bracketed] figures picked out in the accent.
    Odd indices of the split are the captured groups, i.e. the bracketed
    spans; even indices are the plain text between them. */
export function renderMetric(metric: string) {
  return metric.split(/\[([^\]]+)\]/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-medium text-accent">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
