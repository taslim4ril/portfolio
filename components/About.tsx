import { site, stats } from "@/lib/data";
import Reveal from "./Reveal";

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
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[18vw] italic leading-none text-white/[0.035] md:text-[13vw]">
              {site.name.split(" ")[0].toLowerCase()}
            </span>
          </span>

          {/* Badge */}
          <span className="relative inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-white/80">
            <span className="text-accent">✦</span> About
          </span>

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

          <a
            href="/about"
            className="group relative mt-14 inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-accent hover:text-accent"
          >
            Read more about me
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* Stats live outside the track so their height can't skew its geometry
          and shift every animation-range above. */}
      <div className="px-6 pb-24 md:px-[132px] md:pb-32">
        <div className="grid gap-14 sm:grid-cols-3 sm:gap-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <div className="border-t border-border pb-8 pt-4 text-sm text-muted">
                  {s.label}
                </div>
                <div className="heading text-[7.5rem] font-bold leading-none tracking-[-0.04em] text-white/90 md:text-[9rem]">
                  {s.value}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
