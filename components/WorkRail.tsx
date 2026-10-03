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
import type { Project } from "@/lib/data";
import WorkCard from "./WorkCard";

/** Where a card starts as it slides in from the right. Same value the
    vertical list's `cardRise` keyframes start from, so the two read alike. */
const START_SCALE = 0.88;

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
  end,
}: {
  projects: Project[];
  /** Stays put above the rail while the cards move. */
  header: ReactNode;
  /** The last stop on the rail, after the final card. */
  end: ReactNode;
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
        className="sticky top-0 flex h-dvh flex-col overflow-hidden pb-10 pt-24 md:pb-12 md:pt-28"
      >
        <div className="px-6 md:px-[100px]">{header}</div>

        <div className="relative mt-8 flex min-h-0 flex-1 items-center md:mt-10">
          <motion.div
            ref={trackRef}
            className="flex h-full max-h-[46rem] w-max items-stretch gap-4 px-6 md:gap-6 md:px-[100px]"
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
                <WorkCard p={p} rise={false} className="h-full w-full" />
              </RailCard>
            ))}
            <div className="flex w-[70vw] shrink-0 items-center justify-center md:w-[28vw]">
              {end}
            </div>
          </motion.div>
        </div>

        {/* Where you are on the rail. Same timeline as the cards, so the
            bar can't drift from them. */}
        <div className="mt-6 flex items-center gap-4 px-6 text-xs tabular-nums text-white/60 md:mt-8 md:px-[100px]">
          <span>
            {String(step + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
          <div className="relative h-[3px] w-40 overflow-hidden rounded-full bg-white/15 md:w-56">
            <motion.span
              className="absolute inset-0 origin-left rounded-full bg-accent"
              style={{ scaleX: progress }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One stop on the rail. Grows from START_SCALE to full size as it slides in
 * from the right edge, the sideways version of the vertical list's rise.
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
  children: ReactNode;
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

  return (
    <motion.div
      ref={ref}
      onFocus={onFocus}
      className="h-full w-[85vw] shrink-0 md:w-[68vw] lg:w-[62vw]"
      style={{ scale }}
    >
      {children}
    </motion.div>
  );
}
