"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { projects as allProjects, type Project } from "@/lib/data";
import ProjectSlide from "./ProjectSlide";
import { MaskTitle } from "./WorkHero";
import { isLowPower } from "@/lib/device";

/* The choreography runs on its own clock, `t`, rather than raw scroll
   progress, so each beat can be written as a start time and a length:

     0.00-0.08  a beat: the title reads as giant letters cut out of the page,
                the first project showing through them
     0.08-0.90  the camera dives into the L until its stem fills the screen,
                landing inside the first project at full bleed
     0.92-1.30  the first card settles back to its resting inset
     1.30 ...   each later card rises over the one before, which recedes
                and dims; one every 0.85

   Beats run back to back with no dead scroll between them, and one unit of
   `t` is SCREENS_PER_UNIT screens of scrolling. Three projects take about
   three screens end to end: slow enough to watch each beat, short of the
   five it once took, which read as a chore. */
const DIVE_START = 0.08;
const DIVE_END = 0.9;
const SETTLE_START = 0.92;
const SETTLE_END = 1.3;
const FIRST_RISE = 1.3;
const STEP = 0.85;
const RISE = 0.75;
const SCREENS_PER_UNIT = 1.05;

const REST = 0.9; // resting scale of the active card
const RECEDE = 0.82; // scale a covered card drops to
const DIMMED = 0.45; // strength of the shade over a covered card
const RADIUS = 28; // resting corner radius, px

const LINES = ["SELECTED", "PROJECTS"] as const;
/** The letter the camera dives into: the L in SELECTED, whose stem is the
    tallest solid stroke in the title. */
const DIVE_LINE = 0;
const DIVE_CHAR = 2;

const PHONE = "(max-width: 767px)";
const subscribePhone = (onChange: () => void) => {
  const mq = window.matchMedia(PHONE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

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
 * Selected projects as a pinned theater. The section holds the screen on a
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
  const isPhone = useSyncExternalStore(
    subscribePhone,
    () => window.matchMedia(PHONE).matches,
    () => false,
  );
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

  // Phones skip the pinned sequence: the cut-out title shows, then the
  // projects scroll up as a plain list. Same with reduced motion.
  if (reduce || isPhone) {
    return (
      <div className="px-6 pt-20 md:px-[100px] md:pt-32">
        <h2 className="sr-only">Selected projects</h2>
        <div aria-hidden>
          <MaskTitle lines={["SELECTED", "PROJECTS"]} />
        </div>
        <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-white/10 pt-5">
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            {blurb}
          </p>
          <p className="shrink-0 text-sm uppercase tracking-[0.2em] text-white/60">
            <span className="tabular-nums text-accent">
              {String(allProjects.length).padStart(2, "0")}
            </span>{" "}
            projects
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-5 md:gap-6">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className="h-[72svh] min-h-[460px] overflow-hidden rounded-[28px] md:h-[80svh]"
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
      // The scroll the sequence needs, plus the screen it pins in.
      style={{ height: `${(1 + length * SCREENS_PER_UNIT) * 100}svh` }}
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
  /** Where the project count sits: just past the end of the second line. */
  countX: number;
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
      // letters too thin to see the project through, but never so large
      // that the longest line plus the count after it overruns the gutters.
      const probe = document.createElement("canvas").getContext("2d");
      let perPx = 4.6; // line width per px of font size, until measured
      if (probe) {
        // Resolved from a rendered heading: the CSS variable itself nests
        // another var(), which canvas can't parse.
        const heading = document.querySelector(".heading, .font-heading");
        const family = heading
          ? getComputedStyle(heading).fontFamily
          : "sans-serif";
        probe.font = `700 100px ${family}`;
        perPx =
          Math.max(...LINES.map((l) => probe.measureText(l).width)) / 100 -
          0.03 * 7;
      }
      const room = (w - 2 * 24 - 2 * 44) / perPx; // gutters, count either side
      const size = Math.min(
        Math.max(w * (w < 768 ? 0.2 : 0.15), 40),
        208,
        room,
      );
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
        countX: g?.countX ?? w / 2 + size * 2.2,
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
        // The second line is centred, so its right edge is half its
        // width past the middle. Letter-spacing tightens each gap but the
        // last, which canvas doesn't apply.
        const second = LINES[1];
        const secondW =
          ctx.measureText(second).width - size * 0.03 * (second.length - 1);
        const countX = w / 2 + secondW / 2 + size * 0.06;
        setGeo({ w, h, size, baselines, origin, maxScale, countX });
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
  const maskOpacity = useTransform(t, [DIVE_END - 0.12, DIVE_END], [1, 0]);
  const extrasOpacity = useTransform(t, [0, DIVE_START + 0.15], [1, 0]);
  // Fully transparent layers still cost a composite each frame; once a
  // layer has faded out, take it out of rendering altogether.
  const maskVisibility = useTransform(maskOpacity, (o) =>
    o <= 0.001 ? "hidden" : "visible",
  );
  const extrasVisibility = useTransform(extrasOpacity, (o) =>
    o <= 0.001 ? "hidden" : "visible",
  );

  // Redrawing the masked title on every frame keeps its edges sharp, and a
  // desktop does it easily. A phone or modest laptop can't, so there the
  // layer is cached as a bitmap (will-change) and re-cached only each time
  // the zoom grows by another 1.6x. Between re-caches the bitmap is
  // enlarged by at most that much: close to sharp, at a fraction of the
  // work.
  const overlayRef = useRef<HTMLDivElement>(null);
  const lowPower = useRef(false);
  const bucket = useRef(0);
  useEffect(() => {
    lowPower.current = isLowPower();
    if (lowPower.current && overlayRef.current) {
      overlayRef.current.style.willChange = "transform";
    }
  }, [geo]);
  useMotionValueEvent(scale, "change", (v) => {
    const el = overlayRef.current;
    if (!lowPower.current || !el) return;
    const next = Math.floor(Math.log(v) / Math.log(1.6));
    if (next === bucket.current) return;
    bucket.current = next;
    // Dropping the hint for one frame makes the browser redraw the layer
    // at its current scale; restoring it caches that redraw.
    el.style.willChange = "auto";
    requestAnimationFrame(() => {
      el.style.willChange = "transform";
    });
  });

  return (
    <div
      ref={frameRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      {geo && (
        // No will-change by default, on purpose. With it, the browser
        // rasterises the title once and stretches that bitmap, so the
        // letter edges went soft deep into the dive. Without it, each
        // scroll-driven frame is drawn at its real scale and the edges stay
        // sharp. Low-power devices get a stepped cache instead; see above.
        <motion.div
          ref={overlayRef}
          className="absolute inset-0"
          style={{
            x: panX,
            y: panY,
            scale,
            opacity: maskOpacity,
            visibility: maskVisibility,
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
        <motion.div
          style={{ opacity: extrasOpacity, visibility: extrasVisibility }}
        >
          <span
            className="absolute text-lg text-muted md:text-2xl"
            style={{
              left: geo.countX,
              top: geo.baselines[1] - geo.size * 0.72,
            }}
          >
            ({allProjects.length})
          </span>
          <p
            className="absolute left-1/2 w-[min(30rem,calc(100%-3rem))] -translate-x-1/2 text-center text-base leading-relaxed text-muted md:text-lg"
            style={{ top: geo.baselines[1] + geo.size * 0.35 }}
          >
            {blurb}
          </p>
        </motion.div>
      )}

      {/* The real heading, for assistive tech and search; the SVG is
          decorative. */}
      <h2 className="sr-only">Selected projects</h2>
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
  // A covered card darkens under a shade rather than fading. Fading made
  // it see-through, so once the next card was covered too, the one beneath
  // both showed through it before the following card arrived.
  const shade = useTransform(t, [recedeFrom, recedeTo], [0, DIMMED], {
    ease: outCubic,
  });
  // Gone entirely once the card after next starts rising: by then the card
  // directly above covers it at the same size, so nothing is lost, and it
  // can no longer peek out from behind anything.
  const buriedAt = index + 2 < count ? riseAt(index + 2) : 1e3;
  const opacity = useTransform(t, [buriedAt, buriedAt + 0.01], [1, 0]);
  const visibility = useTransform(opacity, (o) =>
    o <= 0.001 ? "hidden" : "visible",
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
    [SETTLE_START, SETTLE_END],
    first ? [0, RADIUS] : [RADIUS, RADIUS],
    { ease: inOutCubic },
  );

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden will-change-transform"
      style={{
        scale,
        opacity,
        visibility,
        y,
        borderRadius: radius,
        zIndex: index + 1,
      }}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-background"
        style={{ opacity: shade }}
      />
    </motion.div>
  );
}
