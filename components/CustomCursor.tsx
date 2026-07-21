"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// A small accent dot that trails the pointer with a spring lag.
// The native cursor stays visible; this is a decorative layer on top.
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.7 });

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  // Some elements (e.g. work cards) supply their own cursor affordance, so
  // this one hides entirely rather than stacking two cursors.
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    // Only on precise pointers that aren't reduced-motion.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setSuppressed(!!target?.closest?.("[data-cursor-hide]"));
      const el = target?.closest?.("a, button, [data-cursor]");
      setHovering(!!el);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        animate={{
          width: hovering ? 44 : 12,
          height: hovering ? 44 : 12,
          opacity: suppressed ? 0 : hovering ? 0.35 : 1,
          scale: suppressed ? 0.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </motion.div>
  );
}
