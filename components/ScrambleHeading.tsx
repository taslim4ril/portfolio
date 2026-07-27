"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Scramble from "./Scramble";

/**
 * The site's two-tone section header, decoded on arrival. Both halves share
 * one trigger so they resolve together rather than racing.
 *
 * Fires once, matching `Reveal`'s `once: true`: a header that re-scrambles
 * every time it crosses the viewport turns into noise on the way back up.
 */
export default function ScrambleHeading({
  lead,
  bold,
  as: Tag = "h2",
  className,
  children,
}: {
  lead: string;
  bold: string;
  as?: "h1" | "h2";
  className?: string;
  /** Trailing content that shouldn't scramble, e.g. the `(5)` count. */
  children?: ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setTrigger((t) => t + 1);
        io.disconnect();
      },
      { threshold: 0.6 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      <Scramble
        text={lead}
        trigger={trigger}
        className="font-normal text-white/90"
      />{" "}
      <Scramble text={bold} trigger={trigger} className="font-bold" />
      {children}
    </Tag>
  );
}
