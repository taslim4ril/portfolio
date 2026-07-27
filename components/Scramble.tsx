"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/* Narrow glyphs only, and deliberately so. The headline is sized in `cqi`,
   so its font scales with the container and the width ratio holds at every
   viewport: ten wide letters (WWWWWWWWWW) render ~1.7x the container and
   would paint over the services rail mid-swap. The line can't be clipped
   either, since `leading-[0.86]` is tighter than the glyphs and would shave
   their tops. Capping the alphabet keeps even the worst random draw inside
   the box, and these are the same letters the reference flickers. */
const CHARS = "IJLTFERS";
/** How long a swap takes end to end. Exported so the caller can time its
    cycle against it rather than hard-coding a second copy of the number. */
export const SCRAMBLE_MS = 1600;
/** Gap between reshuffles. Slower than a frame, so the flicker reads as
    discrete glyphs rather than a blur. */
const TICK = 45;

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

/**
 * Swaps one string for another by flickering random letters and locking them
 * in left to right, the way a decoder settles. The rendered length eases
 * between the old and new word, so a long word collapsing into a short one
 * loses its tail gradually instead of snapping.
 */
export default function Scramble({
  text,
  trigger,
  className,
  style,
}: {
  text: string;
  /** Bumping this replays the scramble even when `text` is unchanged. Three
      of the four roles end in "designer", so keying off the string alone
      would leave the gradient line frozen through most swaps. */
  trigger: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [display, setDisplay] = useState(text);
  // Tracks what's on screen so a swap can start from it, including when one
  // interrupts another mid-flight.
  const shown = useRef(text);
  const mounted = useRef(false);

  useEffect(() => {
    // Nothing to animate from on the first pass; the initial text is already
    // rendered, which also keeps the server and client markup identical.
    if (!mounted.current) {
      mounted.current = true;
      shown.current = text;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shown.current = text;
      setDisplay(text);
      return;
    }

    const from = shown.current;
    const start = performance.now();

    const id = setInterval(() => {
      const p = Math.min((performance.now() - start) / SCRAMBLE_MS, 1);

      if (p >= 1) {
        clearInterval(id);
        shown.current = text;
        setDisplay(text);
        return;
      }

      const len = Math.round(from.length + (text.length - from.length) * p);
      const locked = Math.min(Math.floor(p * len), text.length);

      let out = text.slice(0, locked);
      for (let i = locked; i < len; i++) out += randomChar();

      shown.current = out;
      setDisplay(out);
    }, TICK);

    return () => clearInterval(id);
  }, [trigger, text]);

  return (
    <span className={className} style={style}>
      {display}
    </span>
  );
}
