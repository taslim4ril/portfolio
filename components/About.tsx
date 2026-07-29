import { site } from "@/lib/data";
import Button from "./Button";
import SectionBadge from "./SectionBadge";

const COPY =
  "I help ambitious brands and startups build digital products that stand out and scale. I believe in working smart, building fast, and designing with purpose.";

export default function About() {
  const words = COPY.split(" ");

  return (
    <section id="about" className="relative bg-background">
      {/* The tall track owns the timeline and scrolls normally; only the block
          inside it is sticky. A timeline declared on the sticky element would
          freeze the moment it pins, so progress has to come from the parent.
          The extra height is the whole point: it stretches the word reveal out
          over ~2 screens of scrolling so the sentence lands at reading pace. */}
      <div className="word-track relative min-h-[220vh]">
        {/* NOTE: no `overflow-hidden` on this chain - it would become the
            nearest scroll container and freeze the reveal. The watermark is
            clipped in its own layer below instead. */}
        <div className="sticky top-0 flex h-dvh flex-col items-center justify-center px-6 md:px-[132px]">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {/* Set in Acorn, lowercase. No `italic` here: Acorn ships no
                italic face, so the browser would synthesise a faux oblique. */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[34vw] leading-none text-white/[0.035] md:text-[24vw]">
              {site.name.split(" ")[0].toLowerCase()}
            </span>
          </span>

          {/* Badge */}
          <SectionBadge className="relative">About</SectionBadge>

          {/* Scroll-revealed copy, set in Acorn. Uses the `font-heading`
              utility rather than `.heading`, which also forces a 0.95
              line-height built for one-line headers, not a wrapped paragraph. */}
          <p className="font-heading relative mx-auto mt-12 max-w-4xl text-center text-2xl leading-[1.35] text-foreground sm:text-3xl md:text-[2.6rem]">
            {words.map((word, i) => {
              // A 220vh track puts the pinned window at cover 31%-69%, so the
              // stagger is kept inside that band: every word brightens while
              // the block is actually held on screen, and the finished
              // sentence gets a beat of stillness before it releases.
              const start = 34 + (i / words.length) * 26;
              return (
                <span
                  key={i}
                  className="word-reveal"
                  style={{
                    animationRange: `cover ${start.toFixed(1)}% cover ${(
                      start + 7
                    ).toFixed(1)}%`,
                  }}
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>

          {/* Reveal progress. Driven by the same timeline as the words rather
              than its own, so the bar and the text stay locked together. */}
          <div
            aria-hidden
            className="about-progress relative mt-10 h-[3px] w-40 overflow-hidden rounded-full bg-white/15 md:w-56"
          >
            <span className="about-progress-fill block h-full w-full rounded-full bg-accent" />
          </div>

          <Button href="/about" icon="→" className="relative mt-10">
            Read more about me
          </Button>
        </div>
      </div>
    </section>
  );
}
