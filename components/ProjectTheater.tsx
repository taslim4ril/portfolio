"use client";

import { useLayoutEffect, useRef, useState } from "react";
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

     0.00-0.25  hold: the title reads as giant letters cut out of the page,
                the first project showing through them
     0.25-1.60  the camera dives into the L until its stem fills the screen,
                landing inside the first project at full bleed
     1.70-2.40  the first card settles back to its resting inset
     2.60 ...   each later card rises over the one before, which recedes
                and dims; one every 1.25

   One unit of `t` is one screen of scrolling, so the pin lasts as long as
   the sequence does. */
const DIVE_START = 0.25;
const DIVE_END = 1.6;
const SETTLE_START = 1.7;
const SETTLE_END = 2.4;
const FIRST_RISE = 2.6;
const STEP = 1.25;
const RISE = 1.1;

const REST = 0.9; // resting scale of the active card
const RECEDE = 0.82; // scale a covered card drops to
const DIMMED = 0.55; // opacity of a covered card
const RADIUS = 28; // resting corner radius, px

const LINES = ["SELECTED", "WORK"] as const;
/** The letter the camera dives into: the L in SELECTED, whose stem is the
    tallest solid stroke in the title. */
const DIVE_LINE = 0;
const DIVE_CHAR = 2;

const riseAt = (i: number) => FIRST_RISE + STEP * (i - 1);
const lengthFor = (count: number) =>
  count > 1 ? riseAt(count - 1) + RISE : SETTLE_END;

const linear = (x: number) => x;
const outCubic = (x: number) => 1 - (1 - x) ** 3;
const inOutCubic = (x: number) =>
  x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2;
const inOutQuad = (x: number) =>
  x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;

/**
 * Selected work as a pinned theater. The section holds the screen on a
 * giant title cut out of the page, with the first project visible only
 * through the letters. Scrolling dives into one letter until the project
 * fills the screen; it settles, and each project after it stacks up over
 * the last.
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

  // Focus lands on a card that may still be waiting below the screen.
  // Scroll the page to the moment that card is at rest instead.
  const focusCard = (i: number) => {
    const section = sectionRef.current;
    if (!section || reduce) return;
    const at = i === 0 ? SETTLE_END : riseAt(i) + RISE;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (at / length) * travel, behavior: "instant" });
  };

  if (reduce) {
    return (
      <div className="px-6 pt-24 md:px-[100px] md:pt-32">
        <h2 className="heading text-center font-bold uppercase leading-[0.84] tracking-[-0.03em]">
          <span className="block text-[#eceade]" style={{ fontSize: "clamp(3.25rem, 15vw, 13rem)" }}>
            Selected
          </span>
          <span className="block text-accent" style={{ fontSize: "clamp(3.25rem, 15vw, 13rem)" }}>
            Work
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-sm text-center text-sm leading-relaxed text-muted">
          {blurb}
        </p>
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
        {/* `isolate` keeps the cards' z-indexes inside this layer, so the
            title mask after it always paints on top. */}
        <div className="absolute inset-0 isolate">
          {projects.map((p, i) => (
            <Card key={p.slug} t={t} index={i} count={projects.length}>
              <ProjectSlide p={p} index={i} onFocus={() => focusCard(i)} />
            </Card>
          ))}
        </div>

        <TitleMask t={t} blurb={blurb} />
      </div>
    </div>
  );
}

type Geometry = {
  w: number;
  h: number;
  /** Font size and the two baselines, in px. */
  size: number;
  baselines: [number, number];
  /** The point the dive zooms into: the middle of the L's stem. */
  origin: { x: number; y: number };
  /** Scale at which the stem covers the whole screen. */
  maxScale: number;
};

/**
 * The page colour with the title punched out of it, laid over the first
 * card. Scaling it up around a point inside a letter's stem is the dive:
 * the stem grows until it is wider than the screen, and the card behind is
 * all that is left.
 */
function TitleMask({
  t,
  blurb,
}: {
  t: MotionValue<number>;
  blurb: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);

  // Layout is measured, not guessed: the SVG needs real pixel baselines,
  // and the dive needs the exact column of the L's stem, which depends on
  // the font. The stem is found by drawing the letter to a canvas and
  // reading back one row of pixels.
  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let cancelled = false;

    const measure = async () => {
      await document.fonts.ready;
      if (cancelled) return;
      const w = frame.clientWidth;
      const h = frame.clientHeight;
      // Larger share of the width on phones, where 15vw leaves the
      // letters too thin to see the project through.
      const size = Math.min(Math.max(w * (w < 768 ? 0.2 : 0.15), 52), 208);
      const lead = size * 0.84;
      const first = h / 2 - lead * 0.15;
      const baselines: [number, number] = [first, first + lead];
      // Provisional geometry so the text renders and can be measured.
      setGeo((g) => ({
        w,
        h,
        size,
        baselines,
        origin: g?.origin ?? { x: w / 2, y: h / 2 },
        maxScale: g?.maxScale ?? 60,
      }));

      requestAnimationFrame(() => {
        const text = textRef.current;
        if (!text || cancelled) return;
        const family = getComputedStyle(text).fontFamily;
        const box = text.getExtentOfChar(DIVE_CHAR);

        const canvas = document.createElement("canvas");
        const pad = Math.ceil(size);
        canvas.width = pad * 2;
        canvas.height = pad * 2;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.font = `700 ${size}px ${family}`;
        ctx.fillStyle = "#000";
        const letter = LINES[DIVE_LINE][DIVE_CHAR];
        ctx.fillText(letter, 0, pad);
        const ascent = ctx.measureText(letter).actualBoundingBoxAscent;
        const row = Math.round(pad - ascent * 0.45);
        const pixels = ctx.getImageData(0, row, canvas.width, 1).data;

        // First solid run on that row is the stem.
        let start = -1;
        let end = -1;
        for (let x = 0; x < canvas.width; x++) {
          const solid = pixels[x * 4 + 3] > 200;
          if (solid && start < 0) start = x;
          if (!solid && start >= 0) {
            end = x;
            break;
          }
        }
        if (start < 0 || end < 0) return;

        const origin = {
          x: box.x + (start + end) / 2,
          y: baselines[DIVE_LINE] - ascent * 0.45,
        };
        // The camera pans the stem to the centre as it dives, so it only
        // has to grow until half its width reaches a corner from there.
        const reach = Math.hypot(w / 2, h / 2);
        const maxScale = (reach / ((end - start) / 2)) * 1.15;
        setGeo({ w, h, size, baselines, origin, maxScale });
      });
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(frame);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, []);

  const maxScale = geo?.maxScale ?? 60;
  const dive = useTransform(t, (v) =>
    Math.min(Math.max((v - DIVE_START) / (DIVE_END - DIVE_START), 0), 1),
  );
  // Interpolated in log space, so the dive feels like constant forward
  // speed rather than crawling at the start and teleporting at the end.
  const scale = useTransform(dive, (p) =>
    Math.exp(Math.log(maxScale) * inOutQuad(p) ** 1.6),
  );
  // The pan: brings the stem from wherever it sits in the word to the
  // middle of the screen, front-loaded so it is centred before the zoom
  // gets fast.
  const panX = useTransform(dive, (p) =>
    geo ? (geo.w / 2 - geo.origin.x) * outCubic(p) : 0,
  );
  const panY = useTransform(dive, (p) =>
    geo ? (geo.h / 2 - geo.origin.y) * outCubic(p) : 0,
  );
  // A safety net: if the stem ever misses the screen centre, the mask
  // still clears before the card is meant to be seen whole.
  const maskOpacity = useTransform(t, [DIVE_END - 0.2, DIVE_END], [1, 0]);
  const extrasOpacity = useTransform(t, [0, DIVE_START + 0.2], [1, 0]);

  return (
    <div
      ref={frameRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      {geo && (
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            x: panX,
            y: panY,
            scale,
            opacity: maskOpacity,
            transformOrigin: `${geo.origin.x}px ${geo.origin.y}px`,
          }}
        >
          {/* The page-colour sheet runs well past every edge, so panning
              it toward the letter never uncovers the card behind. */}
          <svg width={geo.w} height={geo.h} className="block overflow-visible">
            <defs>
              <mask
                id="work-title-mask"
                maskUnits="userSpaceOnUse"
                x={-geo.w}
                y={-geo.h}
                width={geo.w * 3}
                height={geo.h * 3}
              >
                <rect
                  x={-geo.w}
                  y={-geo.h}
                  width={geo.w * 3}
                  height={geo.h * 3}
                  fill="white"
                />
                <Lines geo={geo} fill="black" />
              </mask>
            </defs>
            <rect
              x={-geo.w}
              y={-geo.h}
              width={geo.w * 3}
              height={geo.h * 3}
              style={{ fill: "var(--background)" }}
              mask="url(#work-title-mask)"
            />
            {/* A hairline round each letter, so the cut-outs keep their
                shape where the photo behind them is dark. */}
            <Lines
              geo={geo}
              textRef={textRef}
              fill="none"
              stroke="rgba(236,234,222,0.35)"
            />
          </svg>
        </motion.div>
      )}

      {/* Count and blurb sit outside the mask and leave as the dive starts. */}
      {geo && (
        <motion.div style={{ opacity: extrasOpacity }}>
          <span
            className="absolute text-base text-muted md:text-xl"
            style={{
              left: geo.w / 2 + geo.size * 1.32,
              top: geo.baselines[1] - geo.size * 0.72,
            }}
          >
            ({allProjects.length})
          </span>
          <p
            className="absolute left-1/2 w-[min(24rem,calc(100%-3rem))] -translate-x-1/2 text-center text-sm leading-relaxed text-muted"
            style={{ top: geo.baselines[1] + geo.size * 0.35 }}
          >
            {blurb}
          </p>
        </motion.div>
      )}

      {/* The real heading, for assistive tech and search; the SVG is
          decorative. */}
      <h2 className="sr-only">Selected work</h2>
    </div>
  );
}

function Lines({
  geo,
  textRef,
  fill,
  stroke,
}: {
  geo: Geometry;
  textRef?: React.Ref<SVGTextElement>;
  fill: string;
  stroke?: string;
}) {
  return (
    <>
      {LINES.map((line, i) => (
        <text
          key={line}
          ref={i === DIVE_LINE ? textRef : undefined}
          x={geo.w / 2}
          y={geo.baselines[i]}
          textAnchor="middle"
          fill={fill}
          stroke={stroke}
          strokeWidth={stroke ? 1 : undefined}
          vectorEffect={stroke ? "non-scaling-stroke" : undefined}
          className="font-heading"
          style={{
            fontSize: geo.size,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          {line}
        </text>
      ))}
    </>
  );
}

/**
 * One card's part in the sequence. The first sits at full bleed behind the
 * title and eases back once the dive lands; every later one waits just
 * below the screen and rises over its predecessor. Each recedes once the
 * next one covers it.
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

  // The first card drifts in from slightly oversized while the dive plays,
  // so the photo is moving toward you too.
  const scale = useTransform(
    t,
    first
      ? [DIVE_START, DIVE_END, SETTLE_START, SETTLE_END, recedeFrom, recedeTo]
      : [recedeFrom, recedeTo],
    first ? [1.12, 1, 1, REST, REST, RECEDE] : [REST, RECEDE],
    {
      ease: first
        ? [outCubic, linear, inOutCubic, linear, outCubic]
        : [outCubic],
    },
  );
  const opacity = useTransform(t, [recedeFrom, recedeTo], [1, DIMMED], {
    ease: outCubic,
  });
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
    [SETTLE_START, SETTLE_END],
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
