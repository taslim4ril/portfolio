"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import { isLowPower } from "@/lib/device";

/** Every project's cover, the NDA one blurred, in list order. */
const IMAGES = projects
  .map((p) => (p.locked ? p.lockedImage : p.image))
  .filter((src): src is string => Boolean(src));

/** Text is laid out at this size in SVG units, then the viewBox is fitted
    to it, so the title scales to whatever width it is given. */
const UNITS = 1000;
/** One trip through the image strip. Slow enough to read as drift. */
const LOOP_S = 70;

/**
 * The /work page header: ALL PROJECTS set in the homepage's cut-out style, with
 * the projects drifting past behind the letters. It plays in once on load
 * (the letters wipe up as the images settle from a zoom), then eases back
 * and fades as the page scrolls into the cards. No pinning, no extra
 * scroll: the first card is already on screen beneath it.
 */
export default function WorkHero({
  count,
  blurb,
}: {
  count: number;
  blurb: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <header ref={ref} className="mb-14 md:mb-20">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-base text-muted transition-colors hover:text-white"
      >
        <span aria-hidden>←</span> Back home
      </Link>

      <h1 className="sr-only">All projects</h1>
      <motion.div
        aria-hidden
        className="origin-top-left"
        style={{ scale, y, opacity }}
      >
        {/* One line where there is width for it; stacked on phones, where a
            single line would leave the letters too thin to see through. */}
        <MaskTitle lines={["ALL PROJECTS"]} className="hidden md:block" />
        <MaskTitle lines={["ALL", "PROJECTS"]} className="md:hidden" />
      </motion.div>

      <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 md:mt-10 md:flex-row md:items-baseline">
        <p className="max-w-md text-lg leading-relaxed text-muted">{blurb}</p>
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">
          <span className="tabular-nums text-accent">
            {String(count).padStart(2, "0")}
          </span>{" "}
          case studies
        </p>
      </div>
    </header>
  );
}

type Box = { x: number; y: number; w: number; h: number };

/** A title cut out of the page with the project covers drifting behind the
    letters. Also used, without the dive, for Selected Projects on phones. */
export function MaskTitle({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const id = useRef(`work-mask-${lines.length}`).current;
  const svgRef = useRef<SVGSVGElement>(null);

  // The drift repaints the masked title every frame. Run it only while the
  // title is on screen, and not at all on low-power devices, where a still
  // strip of covers looks nearly as good for none of the cost.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const strip = svg.querySelector<SVGGElement>(".work-title-strip");
    if (!strip) return;
    if (isLowPower()) {
      strip.style.animationPlayState = "paused";
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      strip.style.animationPlayState = entry.isIntersecting
        ? "running"
        : "paused";
    });
    io.observe(svg);
    return () => io.disconnect();
  }, []);
  const textRefs = useRef<(SVGTextElement | null)[]>([]);
  const lead = UNITS * 0.86;
  // A placeholder box until the real one is measured; the title is
  // invisible until then, so the swap never shows.
  const [box, setBox] = useState<Box | null>(null);

  // Fit the viewBox to the ink: the widest line for width, and from the
  // top of the capitals to the last baseline for height, so there is no
  // empty band where a descender would sit (the title is all capitals).
  useLayoutEffect(() => {
    let cancelled = false;
    const measure = async () => {
      await document.fonts.ready;
      if (cancelled) return;
      const texts = textRefs.current.filter(Boolean) as SVGTextElement[];
      if (!texts.length) return;
      const boxes = texts.map((t) => t.getBBox());
      // Hidden (display: none) at this breakpoint: nothing to measure yet.
      if (boxes.every((b) => b.width === 0)) return;

      const canvas = document.createElement("canvas").getContext("2d");
      if (!canvas) return;
      canvas.font = `700 ${UNITS}px ${getComputedStyle(texts[0]).fontFamily}`;
      const ascent = canvas.measureText(lines[0]).actualBoundingBoxAscent;

      const left = Math.min(...boxes.map((b) => b.x));
      const right = Math.max(...boxes.map((b) => b.x + b.width));
      const top = UNITS - ascent;
      const bottom = UNITS + lead * (lines.length - 1);
      const pad = UNITS * 0.02;
      setBox({
        x: left - pad,
        y: top - pad,
        w: right - left + pad * 2,
        h: bottom - top + pad * 2,
      });
    };
    measure();
    // The copy for the other breakpoint is display: none and measures as
    // nothing, so try again when the window crosses over.
    window.addEventListener("resize", measure);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
  }, [lines, lead]);

  const vb = box ?? { x: 0, y: 0, w: UNITS * 6, h: UNITS };
  // Strip geometry: covers the title's height, each cover at 3:2, repeated
  // enough times that one loop's travel never shows an edge.
  const tileW = vb.h * 1.5;
  const setW = tileW * IMAGES.length;
  const copies = Math.ceil(vb.w / setW) + 1;

  const text = (fill: string, stroke?: string, withRef = false) =>
    lines.map((line, i) => (
      <text
        key={line}
        ref={
          withRef
            ? (el) => {
                textRefs.current[i] = el;
              }
            : undefined
        }
        x={0}
        y={UNITS + lead * i}
        fill={fill}
        stroke={stroke}
        strokeWidth={stroke ? 1 : undefined}
        vectorEffect={stroke ? "non-scaling-stroke" : undefined}
        className="font-heading"
        style={{ fontSize: UNITS, fontWeight: 700, letterSpacing: "-0.03em" }}
      >
        {line}
      </text>
    ));

  return (
    <div className={className}>
      <svg
        ref={svgRef}
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        className={`block w-full ${box ? "work-title-in" : "opacity-0"}`}
      >
        <defs>
          {/* Region set explicitly: the default is measured from the
              origin, not the fitted viewBox, and cut off the letters' feet. */}
          <mask
            id={id}
            maskUnits="userSpaceOnUse"
            x={vb.x}
            y={vb.y}
            width={vb.w}
            height={vb.h}
          >
            {text("white")}
          </mask>
        </defs>
        <rect
          x={vb.x}
          y={vb.y}
          width={vb.w}
          height={vb.h}
          className="fill-surface"
          mask={`url(#${id})`}
        />
        <g mask={`url(#${id})`}>
          <g className="work-title-zoom" style={{ transformOrigin: "center" }}>
            <g
              className="work-title-strip"
              style={
                {
                  "--strip": `${-setW}px`,
                  animationDuration: `${LOOP_S}s`,
                } as React.CSSProperties
              }
            >
              {Array.from({ length: copies * IMAGES.length }, (_, k) => (
                <image
                  key={k}
                  href={IMAGES[k % IMAGES.length]}
                  x={vb.x + k * tileW}
                  y={vb.y}
                  width={tileW}
                  height={vb.h}
                  preserveAspectRatio="xMidYMid slice"
                />
              ))}
            </g>
          </g>
        </g>
        {/* A hairline round each letter, so the cut-outs keep their shape
            where a cover is dark. Also the element measured for layout. */}
        {text("none", "rgba(236,234,222,0.3)", true)}
      </svg>
    </div>
  );
}
