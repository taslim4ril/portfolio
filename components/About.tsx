import { site, stats } from "@/lib/data";
import Reveal from "./Reveal";

const COPY =
  "I help ambitious brands and startups build digital products that stand out and scale. I believe in working smart, building fast, and designing with purpose.";

export default function About() {
  const words = COPY.split(" ");

  return (
    // Slightly inset from the Selected Work cards.
    <section id="about" className="px-6 pb-24 md:px-[132px] md:pb-32">
      {/* NOTE: no `overflow-hidden` here - it would become the nearest scroll
          container and freeze the word-reveal ViewTimeline. The watermark is
          clipped in its own layer below instead. */}
      <div className="rounded-[2.5rem] bg-surface/60 px-6 py-20 md:px-12 md:py-28">
        {/* Badge */}
        <Reveal>
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-white/80">
              <span className="text-accent">✦</span> About
            </span>
          </div>
        </Reveal>

        {/* Watermark + scroll-revealed copy */}
        <div className="relative mt-12">
          {/* Watermark, clipped in its own layer so it can't create a scroll
              container around the animated copy. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[18vw] italic leading-none text-white/[0.035] md:text-[13vw]">
              {site.name.split(" ")[0].toLowerCase()}
            </span>
          </span>

          <p className="word-track relative mx-auto max-w-3xl text-center text-2xl leading-[1.35] text-foreground sm:text-3xl md:text-[2.35rem]">
            {words.map((word, i) => {
              // Stagger each word across the block's pass through the viewport.
              const start = 12 + (i / words.length) * 52;
              return (
                <span
                  key={i}
                  className="word-reveal"
                  style={{
                    animationRange: `cover ${start.toFixed(1)}% cover ${(
                      start + 16
                    ).toFixed(1)}%`,
                  }}
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>

        {/* Stats */}
        {/* Spread edge to edge, each column centred under its own rule */}
        <div className="mt-24 grid gap-14 sm:grid-cols-3 sm:gap-10">
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
