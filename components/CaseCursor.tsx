"use client";

import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/** Tight enough to sit on the pointer, with just enough give to feel
    carried rather than glued. */
const follow = { stiffness: 1100, damping: 60, mass: 0.3 };
const SIZE = 132; // px
const RING_R = 51; // radius the label runs along

const subscribeNoop = () => () => {};

/**
 * The badge that trails the pointer over a project card: an accent disc
 * with the label running round its rim in a slow spin, and an arrow in a
 * dark core. It springs open over its card and leans into the direction of
 * travel.
 *
 * It is portalled to <body> and positioned from the pointer's screen
 * coordinates, not inside the card. Inside, it inherited the card's own
 * transforms (the homepage cards rest at 90% scale, which threw every
 * offset off) and only moved on mousemove, so scrolling dragged it along
 * with the card. Out here it is always exactly at the pointer, and whether
 * it shows is re-checked on scroll as well as on movement, against
 * whatever is actually under the pointer, so a card scrolling out from
 * under a still mouse drops it.
 *
 * Mouse only and decorative: the card itself is the link.
 */
export default function CaseCursor({
  targetRef,
  label,
}: {
  /** The card this badge belongs to. */
  targetRef: RefObject<HTMLElement | null>;
  label: string;
}) {
  const id = useId();
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const badgeRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(-400);
  const py = useMotionValue(-400);
  const sx = useSpring(px, follow);
  const sy = useSpring(py, follow);

  // Lean: horizontal speed becomes a few degrees of tilt, sprung so it
  // settles back upright when the pointer stops.
  const vx = useVelocity(px);
  const lean = useSpring(
    useTransform(vx, [-2500, 0, 2500], [-12, 0, 12], { clamp: true }),
    { stiffness: 220, damping: 22 },
  );

  useEffect(() => {
    let cx = -1;
    let cy = -1;
    let on = false;

    const show = (next: boolean) => {
      if (next === on) return;
      on = next;
      // Appearing: start at the pointer rather than springing in from
      // wherever the badge was last hidden.
      if (next) {
        sx.jump(cx);
        sy.jump(cy);
      }
      badgeRef.current?.toggleAttribute("data-on", next);
    };
    const check = () => {
      const card = targetRef.current;
      if (!card || cx < 0) return show(false);
      const under = document.elementFromPoint(cx, cy);
      show(!!under && card.contains(under));
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return show(false);
      cx = e.clientX;
      cy = e.clientY;
      px.set(cx);
      py.set(cy);
      check();
    };
    const leave = () => show(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", check, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", check);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [targetRef, px, py, sx, sy]);

  if (!isClient) return null;

  // Twice round, so the ring has no visible seam where it starts.
  const ring = `${label} • ${label} • `.toUpperCase();
  const circumference = 2 * Math.PI * RING_R;

  return createPortal(
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2"
        style={{ rotate: lean }}
      >
        <div
          ref={badgeRef}
          className="group/badge relative scale-0 opacity-0 transition-[scale,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] data-[on]:scale-100 data-[on]:opacity-100"
          style={{ width: SIZE, height: SIZE }}
        >
          {/* Disc, with a hairline inner ring the label sits just outside. */}
          <div className="absolute inset-0 rounded-full bg-accent shadow-[0_24px_48px_-16px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.35)]" />
          <div className="absolute inset-[32px] rounded-full border border-accent-ink/20" />

          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 animate-[case-cursor-spin_12s_linear_infinite] motion-reduce:animate-none"
          >
            <defs>
              <path
                id={id}
                d={`M ${SIZE / 2},${SIZE / 2} m -${RING_R},0 a ${RING_R},${RING_R} 0 1,1 ${RING_R * 2},0 a ${RING_R},${RING_R} 0 1,1 -${RING_R * 2},0`}
              />
            </defs>
            <text
              className="fill-accent-ink font-semibold"
              style={{ fontSize: 11.5, letterSpacing: "0.14em" }}
            >
              <textPath
                href={`#${id}`}
                textLength={circumference}
                lengthAdjust="spacing"
              >
                {ring}
              </textPath>
            </text>
          </svg>

          {/* Core: the arrow turns from flat to diagonal as the badge opens,
              pointing out of the card toward the case study. */}
          <div className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-ink text-accent">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-[18px] w-[18px] transition-[rotate] delay-100 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[on]/badge:-rotate-45"
            >
              <path
                d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
