"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { projects as allProjects, type Project } from "@/lib/data";
import ProjectSlide from "./ProjectSlide";

/** Where a card starts as it slides in from the right. Same value the
    vertical list's `cardRise` keyframes start from, so the two read alike. */
const START_SCALE = 0.88;
/** How far, in percent, an image slides inside its frame across the trip
    from the right edge to the left. ProjectSlide oversizes the image by 6%
    a side, so this has to stay under that. */
const DRIFT = 5;

type Layout = {
  /** How far the track travels sideways, which is also how much extra
      vertical scroll the section needs. */
  distance: number;
  viewport: number;
  /** Each card's left edge and width inside the track, at rest. */
  cards: { left: number; width: number }[];
};

/**
 * Selected work as a horizontal rail. The section pins to the viewport and
 * vertical scrolling slides the cards sideways, so the page keeps one scroll
 * direction for the reader while the work moves across it.
 *
 * It is ordinary sticky positioning over a tall section, translated with a
 * motion value. Lenis drives native scroll, so nothing here needs to know
 * about it.
 */
export default function WorkRail({
  projects,
  header,
  allHref,
}: {
  projects: Project[];
  /** Stays put above the rail while the cards move. */
  header: ReactNode;
  /** Where the slim tile after the last card goes: the full list. */
  allHref: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [layout, setLayout] = useState<Layout>({
    distance: 0,
    viewport: 0,
    cards: [],
  });
  const [step, setStep] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!track || !frame) return;

    const measure = () => {
      const viewport = frame.clientWidth;
      setLayout({
        distance: Math.max(0, track.scrollWidth - viewport),
        viewport,
        cards: cardRefs.current.map((el) => ({
          left: el?.offsetLeft ?? 0,
          width: el?.offsetWidth ?? 1,
        })),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(frame);
    return () => ro.disconnect();
  }, [projects.length]);

  // 0 when the section's top meets the viewport's top, 1 when its bottom
  // does: exactly the span the frame is pinned for.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (p) => -p * layout.distance);

  // Counter in the header: whichever card's centre is nearest the middle.
  useMotionValueEvent(x, "change", (v) => {
    const mid = layout.viewport / 2 - v;
    let nearest = 0;
    layout.cards.forEach((c, i) => {
      const d = Math.abs(c.left + c.width / 2 - mid);
      const best = layout.cards[nearest];
      if (d < Math.abs(best.left + best.width / 2 - mid)) nearest = i;
    });
    setStep(nearest);
  });

  // Keyboard users tab through cards that may be off to the right. Left to
  // the browser, focus would scroll the clipped frame sideways and knock the
  // rail out of step with the page, so instead the frame is put back and the
  // page scrolls to the point where that card is in view.
  const onFocus = (i: number) => {
    const frame = frameRef.current;
    const section = sectionRef.current;
    const card = layout.cards[i];
    if (!frame || !section || !card) return;
    frame.scrollLeft = 0;
    const gutter = layout.cards[0]?.left ?? 0;
    const shift = Math.min(Math.max(card.left - gutter, 0), layout.distance);
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + shift, behavior: "instant" });
  };

  const projectCount = allProjects.length;
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={sectionRef}
      className="relative"
      // Pinned for exactly the sideways distance, so one pixel scrolled
      // down is one pixel moved across.
      style={{ height: `calc(100dvh + ${layout.distance}px)` }}
    >
      <div
        ref={frameRef}
        className="sticky top-0 flex h-dvh flex-col overflow-hidden pb-6 pt-24 md:pb-8 md:pt-28"
      >
        <div className="flex items-end justify-between gap-6 px-6 md:px-[100px]">
          <div className="min-w-0 flex-1">{header}</div>
          {/* Where you are on the rail. Same timeline as the cards, so the
              bar can't drift from them. */}
          <div className="hidden shrink-0 items-center gap-4 pb-1 text-xs tabular-nums text-white/60 md:flex">
            <span>
              <span className="text-white">
                {String(step + 1).padStart(2, "0")}
              </span>{" "}
              / {String(projects.length).padStart(2, "0")}
            </span>
            <div className="relative h-[3px] w-32 overflow-hidden rounded-full bg-white/15 lg:w-44">
              <motion.span
                className="absolute inset-0 origin-left rounded-full bg-accent"
                style={{ scaleX: progress }}
              />
            </div>
          </div>
        </div>

        <div className="relative mt-5 flex min-h-0 flex-1 items-center md:mt-6">
          <motion.div
            ref={trackRef}
            className="flex h-full max-h-[56rem] w-max items-stretch gap-4 pl-6 md:gap-6 md:pl-[100px]"
            style={{ x }}
          >
            {projects.map((p, i) => (
              <RailCard
                key={p.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                x={x}
                layout={layout}
                index={i}
                onFocus={() => onFocus(i)}
              >
                {(drift) => <ProjectSlide p={p} index={i} drift={drift} />}
              </RailCard>
            ))}
            {/* The last stop is exactly as wide as the slice of next card
                that shows beside every other one (frame minus gutter, card
                and gap), so the rail ends with the final project fully in
                view and this in the slot where the next would peek. */}
            <Link
              href={allHref}
              className="group/all mr-2 flex w-10 shrink-0 flex-col items-center justify-between rounded-full border border-white/15 py-4 text-white/70 transition-colors duration-300 hover:border-accent hover:text-accent md:mr-6 md:w-[calc(8vw-1.5rem)] md:rounded-[2.25rem] md:py-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] transition-colors duration-300 group-hover/all:bg-accent group-hover/all:text-accent-ink md:h-12 md:w-12">
                <svg aria-hidden viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="whitespace-nowrap text-xs uppercase tracking-[0.25em] [writing-mode:vertical-rl] md:text-sm">
                See all {projectCount} projects
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Phones get the bar under the rail instead, full width, since the
            header has no room beside the title. */}
        <div className="mx-6 mt-5 h-[3px] overflow-hidden rounded-full bg-white/15 md:hidden">
          <motion.span
            className="block h-full origin-left rounded-full bg-accent"
            style={{ scaleX: progress }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * One stop on the rail. Grows from START_SCALE to full size as it slides in
 * from the right edge, the sideways version of the vertical list's rise,
 * and hands its child a drift value for the image inside.
 *
 * Sized to nearly fill the frame: the page gutter on the left, then the card,
 * then a slice of the next one showing at the right edge as a cue that the
 * rail carries on. Scaling from the left edge keeps that slice visible; from
 * the centre, the shrink would pull the next card's edge off screen.
 */
function RailCard({
  ref,
  x,
  layout,
  index,
  onFocus,
  children,
}: {
  ref: (el: HTMLDivElement | null) => void;
  x: MotionValue<number>;
  layout: Layout;
  index: number;
  onFocus: () => void;
  children: (drift: MotionValue<string>) => ReactNode;
}) {
  const reduce = useReducedMotion();
  const scale = useTransform(x, (v) => {
    const card = layout.cards[index];
    if (reduce || !card || !layout.viewport) return 1;
    // 0 while the card's left edge is still past the right of the frame,
    // 1 once its whole width has come into view.
    const entered = (layout.viewport - (card.left + v)) / card.width;
    const t = Math.min(Math.max(entered, 0), 1);
    return START_SCALE + (1 - START_SCALE) * t;
  });
  // -1 with the card's centre at the frame's left edge, 1 at its right.
  // The image moves against that, so it lags the frame it sits in.
  const drift = useTransform(x, (v) => {
    const card = layout.cards[index];
    if (reduce || !card || !layout.viewport) return "0%";
    const centre = card.left + v + card.width / 2;
    const offset = (centre - layout.viewport / 2) / (layout.viewport / 2);
    return `${(-Math.min(Math.max(offset, -1), 1) * DRIFT).toFixed(2)}%`;
  });

  return (
    <motion.div
      ref={ref}
      onFocus={onFocus}
      className="h-full w-[calc(100vw-5.5rem)] shrink-0 md:w-[calc(92vw-100px-1.5rem)]"
      style={{ scale, originX: 0 }}
    >
      {children(drift)}
    </motion.div>
  );
}
