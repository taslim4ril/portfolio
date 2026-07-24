import { services } from "@/lib/data";
import Reveal from "./Reveal";

// Dimensional, gradient-filled icons — one per service, in reference order.
const icons = [
  /* 01 — Isometric cubes */
  <svg key="a" viewBox="0 0 96 96" fill="none" className="h-full w-full">
    <defs>
      <linearGradient id="bi-top-l" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#d0d0d0" />
      </linearGradient>
      <linearGradient id="bi-left-l" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a8a8a8" />
        <stop offset="100%" stopColor="#6e6e6e" />
      </linearGradient>
      <linearGradient id="bi-right-l" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8a8a8a" />
        <stop offset="100%" stopColor="#4a4a4a" />
      </linearGradient>
      <linearGradient id="bi-top-d" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a4a4a" />
        <stop offset="100%" stopColor="#333333" />
      </linearGradient>
      <linearGradient id="bi-left-d" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2e2e2e" />
        <stop offset="100%" stopColor="#171717" />
      </linearGradient>
      <linearGradient id="bi-right-d" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#242424" />
        <stop offset="100%" stopColor="#101010" />
      </linearGradient>
    </defs>
    {/* Four cubes in a tight isometric diamond; the back one is highlighted.
        Each cube: w=14, top half-height=7, body=14. Drawn back-to-front so
        the near cubes correctly occlude the ones behind them. */}
    {/* back cube — highlighted */}
    <path d="M48 27 62 34 48 41 34 34Z" fill="url(#bi-top-l)" />
    <path d="M34 34 48 41 48 55 34 48Z" fill="url(#bi-left-l)" />
    <path d="M62 34 48 41 48 55 62 48Z" fill="url(#bi-right-l)" />
    {/* left cube */}
    <path d="M31 35.5 45 42.5 31 49.5 17 42.5Z" fill="url(#bi-top-d)" />
    <path d="M17 42.5 31 49.5 31 63.5 17 56.5Z" fill="url(#bi-left-d)" />
    <path d="M45 42.5 31 49.5 31 63.5 45 56.5Z" fill="url(#bi-right-d)" />
    {/* right cube */}
    <path d="M65 35.5 79 42.5 65 49.5 51 42.5Z" fill="url(#bi-top-d)" />
    <path d="M51 42.5 65 49.5 65 63.5 51 56.5Z" fill="url(#bi-left-d)" />
    <path d="M79 42.5 65 49.5 65 63.5 79 56.5Z" fill="url(#bi-right-d)" />
    {/* front cube */}
    <path d="M48 44 62 51 48 58 34 51Z" fill="url(#bi-top-d)" />
    <path d="M34 51 48 58 48 72 34 65Z" fill="url(#bi-left-d)" />
    <path d="M62 51 48 58 48 72 62 65Z" fill="url(#bi-right-d)" />
  </svg>,

  /* 02 — Image panel with diamond badge */
  <svg key="b" viewBox="0 0 96 96" fill="none" className="h-full w-full">
    <defs>
      <linearGradient id="ux-panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3d3d3d" />
        <stop offset="100%" stopColor="#141414" />
      </linearGradient>
      <linearGradient id="ux-shape" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#9e9e9e" />
        <stop offset="100%" stopColor="#4c4c4c" />
      </linearGradient>
      <linearGradient id="ux-badge" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#525252" />
        <stop offset="100%" stopColor="#1b1b1b" />
      </linearGradient>
      <linearGradient id="ux-diamond" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#b4b4b4" />
      </linearGradient>
      <clipPath id="ux-clip">
        <rect x="14" y="26" width="56" height="50" rx="10" />
      </clipPath>
    </defs>
    <rect
      x="14"
      y="26"
      width="56"
      height="50"
      rx="10"
      fill="url(#ux-panel)"
      stroke="rgba(255,255,255,0.14)"
      strokeWidth="1.2"
    />
    <g clipPath="url(#ux-clip)">
      <circle cx="31" cy="45" r="5.4" fill="url(#ux-shape)" />
      <path d="M12 78 34 52 46 64 54 56 74 78Z" fill="url(#ux-shape)" />
    </g>
    <circle
      cx="71"
      cy="30"
      r="15"
      fill="url(#ux-badge)"
      stroke="rgba(255,255,255,0.2)"
      strokeWidth="1.2"
    />
    <path d="M71 21 80 30 71 39 62 30Z" fill="url(#ux-diamond)" />
  </svg>,

  /* 03 — Browser window with molecular lattice */
  <svg key="c" viewBox="0 0 96 96" fill="none" className="h-full w-full">
    <defs>
      <linearGradient id="wd-win" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3d3d3d" />
        <stop offset="100%" stopColor="#131313" />
      </linearGradient>
      <linearGradient id="wd-node" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#9a9a9a" />
      </linearGradient>
    </defs>
    <rect
      x="13"
      y="22"
      width="70"
      height="54"
      rx="10"
      fill="url(#wd-win)"
      stroke="rgba(255,255,255,0.14)"
      strokeWidth="1.2"
    />
    <circle cx="25" cy="32" r="2.7" fill="#9a9a9a" />
    <circle cx="34" cy="32" r="2.7" fill="#5c5c5c" />
    {/* lattice */}
    <g stroke="rgba(255,255,255,0.3)" strokeWidth="1.3">
      <path d="M48 45 59.3 51.5 59.3 64.5 48 71 36.7 64.5 36.7 51.5Z" />
      <path d="M48 58 48 45M48 58 59.3 51.5M48 58 59.3 64.5M48 58 48 71M48 58 36.7 64.5M48 58 36.7 51.5" />
    </g>
    <circle cx="48" cy="58" r="3" fill="url(#wd-node)" />
    <circle cx="48" cy="45" r="2.7" fill="url(#wd-node)" />
    <circle cx="59.3" cy="51.5" r="2.7" fill="url(#wd-node)" />
    <circle cx="59.3" cy="64.5" r="2.7" fill="url(#wd-node)" />
    <circle cx="48" cy="71" r="2.7" fill="url(#wd-node)" />
    <circle cx="36.7" cy="64.5" r="2.7" fill="url(#wd-node)" />
    <circle cx="36.7" cy="51.5" r="2.7" fill="url(#wd-node)" />
  </svg>,

  /* 04 — Bar chart on a plinth */
  <svg key="d" viewBox="0 0 96 96" fill="none" className="h-full w-full">
    <defs>
      <linearGradient id="dm-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5e5e5e" />
        <stop offset="100%" stopColor="#1e1e1e" />
      </linearGradient>
      <linearGradient id="dm-light" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#8c8c8c" />
      </linearGradient>
      <linearGradient id="dm-base" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3a3a3a" />
        <stop offset="50%" stopColor="#8a8a8a" />
        <stop offset="100%" stopColor="#333333" />
      </linearGradient>
    </defs>
    <rect x="25" y="45" width="14" height="27" rx="3.5" fill="url(#dm-dark)" />
    <rect x="42" y="23" width="14" height="49" rx="3.5" fill="url(#dm-light)" />
    <rect x="59" y="56" width="14" height="16" rx="3.5" fill="url(#dm-dark)" />
    <rect x="18" y="73" width="62" height="5" rx="2.5" fill="url(#dm-base)" />
  </svg>,
];

export default function WhatIDo() {
  return (
    // The pin/cover effect only runs at lg+, where the 4-column grid fits in a
    // viewport. Below that the grid stacks and is far taller than the screen,
    // so a fixed-height centred box would spill out of both ends and bleed
    // over the hero. On small screens this is just a normal section.
    <section
      id="services"
      className="pin-track relative bg-background lg:min-h-[300vh]"
    >
      {/* NOTE: no `overflow-hidden` here — it would become the nearest scroll
          container and freeze the cards' view() entrance timelines. */}
      <div className="flex px-6 py-24 md:px-[132px] md:py-32 lg:sticky lg:top-0 lg:h-dvh lg:items-center">
        {/* Inner wrapper carries the scroll-driven zoom (keeps transforms off
            the sticky element itself, which would break pinning). */}
        <div className="pin-zoom w-full">
        {/* Heading + intro */}
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <h2 className="heading text-4xl leading-none text-white sm:text-5xl md:text-6xl">
              <span className="font-normal text-white/90">What</span>{" "}
              <span className="font-bold">I Do</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
              I craft digital experiences from idea to launch, blending
              research, design, and no-code engineering to build products that
              perform.
            </p>
          </div>
        </Reveal>

        {/* Service grid with dividers. The outer wrapper owns the view
            timeline the cards animate against (see .cards-track). */}
        <div className="cards-track mt-14">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              /* Staggered left-to-right via a per-card range on its own
                 view() timeline (all four share the same scroll position). */
              style={{
                animationRange: `entry ${6 + i * 7}% entry ${58 + i * 7}%`,
              }}
              className="card-in group relative flex min-h-[27rem] flex-col items-center justify-between border-border p-10 text-center transition-colors duration-300 hover:bg-white/[0.03] sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 [&:not(:nth-last-child(-n+1))]:border-b sm:[&:not(:nth-last-child(-n+2))]:border-b lg:border-b-0"
            >
              {/* Dotted texture on hover */}
              <span className="dot-grid pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative h-32 w-32 opacity-90 transition-all duration-500 ease-out group-hover:scale-[1.06] group-hover:opacity-100 lg:h-40 lg:w-40 xl:h-48 xl:w-48">
                {icons[i % icons.length]}
              </div>

              <div className="relative mt-10">
                <span className="text-xs text-muted">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-medium text-white">
                  {s.title}
                </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
