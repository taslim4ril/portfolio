import { site } from "@/lib/data";

// First half stays white, second half gets the lime gradient (same treatment
// as "Abdulkadir" in the hero).
const WHITE = "Got something exciting in mind?";
const GREEN = "Let's design it together!";

// Fades the pixel field out toward the edges so it reads as a soft pool of
// light rather than a hard-edged tile.
const FIELD_MASK =
  "radial-gradient(closest-side at 50% 45%, black 15%, rgba(0,0,0,0.55) 45%, transparent 78%)";

export default function Contact() {
  const whiteWords = WHITE.split(" ");
  const greenWords = GREEN.split(" ");
  const total = whiteWords.length + greenWords.length;

  // Per-word reveal window, staggered across the block's pass through view.
  const range = (i: number) => {
    const start = 10 + (i / total) * 55;
    return `cover ${start.toFixed(1)}% cover ${(start + 16).toFixed(1)}%`;
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-32"
    >
      {/* ===== Pulsing pixel field ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Drifting wrapper makes different regions brighten over time */}
        <div
          className="pixel-drift absolute inset-0"
          style={{ maskImage: FIELD_MASK, WebkitMaskImage: FIELD_MASK }}
        >
          <div className="pixel-field pixel-field-a absolute inset-0" />
          <div className="pixel-field pixel-field-b absolute inset-0" />
          <div className="pixel-field pixel-field-c absolute inset-0" />
        </div>

        {/* Soft ambient glow sitting under the type */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(46% 42% at 50% 45%, rgba(255,255,255,0.06), transparent 72%)",
          }}
        />
      </div>

      {/* ===== Content ===== */}
      <div className="relative mx-auto w-full max-w-5xl text-center">
        <p className="mb-10 text-xs uppercase tracking-[0.35em] text-muted">
          Contact
        </p>

        <p
          className="word-track heading mx-auto max-w-4xl font-bold leading-[1.15] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(2.1rem, 5.4vw, 4.4rem)" }}
        >
          {whiteWords.map((word, i) => (
            <span
              key={`w-${i}`}
              className="word-reveal"
              style={{ animationRange: range(i) }}
            >
              {word}{" "}
            </span>
          ))}
          {/* Solid-accent half - plain static color, no scroll-reveal or any
              other effect, unlike the white half above it. */}
          <span className="text-accent">{GREEN}</span>
        </p>

        <div className="mt-14 flex justify-center">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.03] px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/40 hover:bg-white/10"
          >
            Start the project
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-[10px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
