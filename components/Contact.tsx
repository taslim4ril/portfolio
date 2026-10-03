import { site } from "@/lib/data";
import ContactForm from "./ContactForm";
import SectionBadge from "./SectionBadge";

// First half stays white, second half gets the accent colour (same treatment
// as "Abdulkadir" in the hero).
const WHITE = "Working on something hard?";
const ACCENT = "Let's talk it through.";

// Fades the pixel field out toward the edges so it reads as a soft pool of
// light rather than a hard-edged tile.
const FIELD_MASK =
  "radial-gradient(closest-side at 50% 45%, black 15%, rgba(0,0,0,0.55) 45%, transparent 78%)";

export default function Contact() {
  const whiteWords = WHITE.split(" ");
  const accentWords = ACCENT.split(" ");
  const total = whiteWords.length + accentWords.length;

  // Per-word reveal window, staggered across the block's pass through view.
  const range = (i: number) => {
    const start = 10 + (i / total) * 55;
    return `cover ${start.toFixed(1)}% cover ${(start + 16).toFixed(1)}%`;
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-6 pb-16 pt-28 md:px-[100px] md:pb-20 md:pt-32"
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
      {/* Pitch on the left, form on the right, across the full width and
          centred in the screen; stacked on smaller screens. */}
      <div className="relative grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="flex flex-col lg:col-span-5">
          <SectionBadge className="self-start">Contact</SectionBadge>

          <p
            className="word-track heading mt-8 font-bold leading-[1.1] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.25rem, 5vw, 5.25rem)" }}
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
            {/* Solid-accent half: plain static colour, no scroll-reveal,
                unlike the white half before it. */}
            <span className="text-accent">{ACCENT}</span>
          </p>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted md:text-xl">
            Tell me about a role, a project or a quick question. A short note
            on what you are building is plenty, and I will get back to you.
          </p>

          <p className="mt-10 text-base text-muted">
            Prefer email?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {site.email}
            </a>
          </p>
        </div>

        <div className="relative flex flex-col rounded-[1.75rem] border border-white/10 bg-surface/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8 md:p-10 lg:col-span-7 lg:p-12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
