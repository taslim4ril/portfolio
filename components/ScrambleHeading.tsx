"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Scramble from "./Scramble";
import HeadingMark from "./HeadingMark";

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
  mark = true,
}: {
  lead: string;
  bold: string;
  as?: "h1" | "h2";
  className?: string;
  /** Trailing content that shouldn't scramble, e.g. the `(5)` count. */
  children?: ReactNode;
  /** Set false for a heading the spinning mark would crowd. */
  mark?: boolean;
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
    /* `flex w-fit`, not `inline-flex`: a heading has to start its own line,
       or the "Back home" link above it on /work and /about ends up sitting
       beside it. `w-fit` keeps it shrink-to-fit so parents that centre or
       bottom-align it still can. The words stay in one span so they wrap as
       normal text and the mark sits beside the block, not the last line.
       The gap clears 28px so the mark's hover ring, which overflows its own
       frame by that much, does not land on top of the words. */
    <Tag
      ref={ref}
      className={`flex w-fit flex-wrap items-center gap-x-8 gap-y-2 ${className ?? ""}`}
    >
      <span>
        <Scramble
          text={lead}
          trigger={trigger}
          className="font-normal text-white/90"
        />{" "}
        <Scramble text={bold} trigger={trigger} className="font-bold" />
        {children}
      </span>
      {mark && <HeadingMark />}
    </Tag>
  );
}
