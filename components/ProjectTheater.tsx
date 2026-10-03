"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { projects as allProjects, type Project } from "@/lib/data";
import ProjectSlide from "./ProjectSlide";

/* The choreography runs on its own clock, `t`, rather than raw scroll
   progress, so each beat can be written as a start time and a length:

     0.00-0.50  the title splits, "Selected" off left and "Work" off right
     0.10-1.15  the first card fades in and zooms from a small preview to
                full bleed
     1.25-1.95  it settles back to its resting inset, corners rounding
     2.10 ...   each later card rises over the one before, which recedes
                and dims; one every 1.25

   One unit of `t` is one screen of scrolling, so the pin lasts as long as
   the sequence does. */
const REST = 0.9; // resting scale of the active card
const RECEDE = 0.82; // scale a covered card drops to
const DIMMED = 0.55; // opacity of a covered card
const RADIUS = 28; // resting corner radius, px
const FIRST_RISE = 2.1;
const STEP = 1.25;
const RISE = 1.1;

const riseAt = (i: number) => FIRST_RISE + STEP * (i - 1);
const lengthFor = (count: number) =>
  count > 1 ? riseAt(count - 1) + RISE : 1.95;

// The curves GSAP calls power1/power2: quadratic and cubic.
const linear = (x: number) => x;
const outQuad = (x: number) => 1 - (1 - x) ** 2;
const inCubic = (x: number) => x ** 3;
const outCubic = (x: number) => 1 - (1 - x) ** 3;
const inOutCubic = (x: number) =>
  x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2;

/**
 * Selected work as a pinned theater. The section holds the screen while a
 * giant title parts to let the first project zoom up to full screen, then
 * each project after it stacks up over the last.
 *
 * Plain sticky positioning over a tall section, driven by framer-motion's
 * scroll progress. Lenis drives native scroll, so it needs no wiring here.
 * With reduced motion, the projects are a simple vertical list instead.
 */
export default function ProjectTheater({
  projects,
  blurb,
}: {
  projects: Project[];
  /** One line under the title. */
  blurb: string;
}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const length = lengthFor(projects.length);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const t = useTransform(scrollYProgress, [0, 1], [0, length]);

  const leftX = useTransform(t, [0, 0.5], ["-10%", "-165%"], { ease: inCubic });
  const rightX = useTransform(t, [0, 0.5], ["10%", "165%"], { ease: inCubic });
  const titleOpacity = useTransform(t, [0, 0.5], [1, 0], { ease: inCubic });
  const blurbOpacity = useTransform(t, [0, 0.2], [1, 0]);

  // Focus lands on a card that may still be waiting below the screen.
  // Scroll the page to the moment that card is at rest instead.
  const focusCard = (i: number) => {
    const section = sectionRef.current;
    if (!section || reduce) return;
    const at = i === 0 ? 1.95 : riseAt(i) + RISE;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (at / length) * travel, behavior: "instant" });
  };

  if (reduce) {
    return (
      <div className="px-6 md:px-[100px]">
        <Title blurb={blurb} />
        <div className="mt-12 flex flex-col gap-6">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className="h-[80svh] min-h-[480px] overflow-hidden rounded-[28px]"
            >
              <ProjectSlide p={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      // One screen of scroll per unit of `t`, plus the screen it pins in.
      style={{ height: `${(1 + length) * 100}svh` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          {projects.map((p, i) => (
            <Card key={p.slug} t={t} index={i} count={projects.length}>
              <ProjectSlide p={p} index={i} onFocus={() => focusCard(i)} />
            </Card>
          ))}
        </div>

        {/* Above the cards, so the words fly out over the first one as it
            grows. Never takes the pointer, so the card stays clickable. */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6">
          <Title
            blurb={blurb}
            leftX={leftX}
            rightX={rightX}
            opacity={titleOpacity}
            blurbOpacity={blurbOpacity}
          />
        </div>
      </div>
    </div>
  );
}

function Title({
  blurb,
  leftX,
  rightX,
  opacity,
  blurbOpacity,
}: {
  blurb: string;
  leftX?: MotionValue<string>;
  rightX?: MotionValue<string>;
  opacity?: MotionValue<number>;
  blurbOpacity?: MotionValue<number>;
}) {
  // Sized like the hero's "Product Designer", same cream-then-accent pair,
  // so the two biggest moments on the page read as one voice.
  const size = { fontSize: "clamp(3.25rem, 15vw, 13rem)" };
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="heading flex flex-col font-bold uppercase leading-[0.84] tracking-[-0.03em]">
        <motion.span
          className="block text-[#eceade]"
          style={{ ...size, x: leftX, opacity }}
        >
          Selected
        </motion.span>
        <motion.span
          className="block text-accent"
          style={{ ...size, x: rightX, opacity }}
        >
          Work
          <sup className="ml-3 align-super text-base font-normal tracking-normal text-muted md:text-xl">
            ({allProjects.length})
          </sup>
        </motion.span>
      </h2>
      <motion.p
        className="mt-8 max-w-sm text-sm leading-relaxed text-muted"
        style={{ opacity: blurbOpacity }}
      >
        {blurb}
      </motion.p>
    </div>
  );
}

/**
 * One card's part in the sequence. The first zooms up out of the title;
 * every later one waits just below the screen and rises over its
 * predecessor. Each recedes once the next one covers it.
 */
function Card({
  t,
  index,
  count,
  children,
}: {
  t: MotionValue<number>;
  index: number;
  count: number;
  children: React.ReactNode;
}) {
  const first = index === 0;
  const coveredAt = index + 1 < count ? riseAt(index + 1) : Infinity;
  const covered = Number.isFinite(coveredAt);
  // Keyframe times must keep increasing, so a card that is never covered
  // holds its resting values out past the end of the sequence.
  const recedeFrom = covered ? coveredAt : 1e3;
  const recedeTo = covered ? coveredAt + RISE : 1e3 + 1;

  const scale = useTransform(
    t,
    first
      ? [0.15, 1.15, 1.25, 1.95, recedeFrom, recedeTo]
      : [recedeFrom, recedeTo],
    first
      ? [0.26, 1, 1, REST, REST, RECEDE]
      : [REST, RECEDE],
    {
      ease: first
        ? [outCubic, linear, inOutCubic, linear, outCubic]
        : [outCubic],
    },
  );
  const opacity = useTransform(
    t,
    first ? [0.1, 0.45, recedeFrom, recedeTo] : [recedeFrom, recedeTo],
    first ? [0, 1, 1, DIMMED] : [1, DIMMED],
    { ease: first ? [outQuad, linear, outCubic] : [outCubic] },
  );
  const y = useTransform(
    t,
    first ? [0, 1] : [riseAt(index), riseAt(index) + RISE],
    first ? ["0%", "0%"] : ["108%", "0%"],
    { ease: outCubic },
  );
  // Square at full bleed, rounding as it settles. Later cards arrive
  // already at rest, so they are round from the start.
  const radius = useTransform(
    t,
    [1.25, 1.95],
    first ? [0, RADIUS] : [RADIUS, RADIUS],
    { ease: inOutCubic },
  );

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden will-change-transform"
      style={{ scale, opacity, y, borderRadius: radius, zIndex: index + 1 }}
    >
      {children}
    </motion.div>
  );
}
