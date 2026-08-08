import type { CaseBlock, Project } from "@/lib/data";
import Reveal from "./Reveal";
import Button, { CircleIcon } from "./Button";

/* ---------- block renderers ---------- */

/* No spinning mark here on purpose. A case study runs eight or nine of these
   headings down one page, and that many turning starbursts fights the read. */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="heading text-3xl font-bold leading-[1.05] text-white md:text-[2.6rem]">
      {children}
    </h2>
  );
}

function Paragraphs({ body, muted = true }: { body: string[]; muted?: boolean }) {
  return (
    <>
      {body.map((p, i) => (
        <p
          key={i}
          className={`text-lg leading-relaxed md:text-xl ${
            muted ? "text-white/65" : "text-white/90"
          }`}
        >
          {p}
        </p>
      ))}
    </>
  );
}

function Figure({
  src,
  caption,
  impact,
}: {
  src?: string;
  caption?: string;
  impact?: string;
}) {
  return (
    <Reveal>
      <figure className="mx-auto max-w-5xl">
        {/* A real image sets its own height. These artifacts range from a
            4:3 phone pair to a 3.9:1 process strip, and cropping them all to
            16:9 would cut the ends off the wide ones. The placeholder keeps
            the fixed frame, since it has no aspect of its own. */}
        {src ? (
          <div className="overflow-hidden rounded-3xl border border-border bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* No `loading="lazy"` here: with h-auto and no width/height
                attributes an unloaded image is zero-height, so it never
                reaches the viewport and never loads. */}
            <img src={src} alt={caption ?? ""} className="block h-auto w-full" />
          </div>
        ) : (
          <div className="relative flex aspect-[16/9] flex-col items-center justify-center gap-2.5 overflow-hidden rounded-3xl border border-border bg-surface text-white/30">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="9" r="1.6" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-[11px] uppercase tracking-widest">
              Image placeholder
            </span>
          </div>
        )}
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-muted">
            {caption}
          </figcaption>
        )}
        {/* Kept out of the figcaption so existing captions render unchanged.
            Narrower than the frame above it, so the note reads as commentary
            on the screen rather than a second label. */}
        {impact && (
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-white/45">
            {impact}
          </p>
        )}
      </figure>
    </Reveal>
  );
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case "prose":
      return (
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-6">
            {block.heading && <Heading>{block.heading}</Heading>}
            <div className="space-y-5">
              <Paragraphs body={block.body} />
            </div>
            {block.link && (
              <Button
                href={block.link.href}
                size="md"
                icon={<CircleIcon>→</CircleIcon>}
              >
                {block.link.label}
              </Button>
            )}
          </div>
        </Reveal>
      );

    case "list":
      return (
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-6">
            {block.heading && <Heading>{block.heading}</Heading>}
            {block.intro && (
              <div className="space-y-5">
                <Paragraphs body={block.intro} />
              </div>
            )}
            <ul className="space-y-3.5">
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-lg text-white/80 md:text-xl">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            {block.outro && (
              <div className="space-y-5 pt-1">
                <Paragraphs body={block.outro} />
              </div>
            )}
          </div>
        </Reveal>
      );

    case "grid":
      return (
        <div className="mx-auto max-w-5xl space-y-10">
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-6">
              {block.heading && <Heading>{block.heading}</Heading>}
              {block.intro && (
                <div className="space-y-5">
                  <Paragraphs body={block.intro} />
                </div>
              )}
            </div>
          </Reveal>
          <div
            className={`grid gap-5 sm:grid-cols-2 ${
              block.columns === 3 ? "lg:grid-cols-3" : ""
            }`}
          >
            {block.items.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-surface/60 p-7">
                  {/* Fixed 56px circle. Logos arrive as squares, circles and
                      transparent PNGs with wildly different padding, so the
                      frame owns the size and `object-contain` keeps each mark
                      whole inside it rather than cropping to fill. */}
                  {item.logo && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.logo}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="mb-5 h-14 w-14 shrink-0 rounded-full bg-white object-contain"
                    />
                  )}
                  <h3 className="text-xl font-medium text-white">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          {block.outro && (
            <Reveal>
              <div className="mx-auto max-w-3xl space-y-5">
                <Paragraphs body={block.outro} />
              </div>
            </Reveal>
          )}
        </div>
      );

    case "features":
      return (
        <div className="mx-auto max-w-5xl space-y-12">
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-6">
              {block.heading && <Heading>{block.heading}</Heading>}
              {block.intro && (
                <div className="space-y-5">
                  <Paragraphs body={block.intro} />
                </div>
              )}
            </div>
          </Reveal>
          <div className="space-y-5">
            {block.items.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="grid gap-6 rounded-3xl border border-border bg-surface/60 p-8 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-10">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl font-medium text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-white/60">
                      {item.desc}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-accent/10 px-6 py-5 md:min-w-[13rem]">
                    <div className="text-[11px] uppercase tracking-widest text-accent/80">
                      Result
                    </div>
                    <div className="mt-1 text-lg font-medium text-accent">
                      {item.result}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      );

    case "compare":
      return (
        <div className="mx-auto max-w-5xl space-y-12">
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-6">
              {block.heading && <Heading>{block.heading}</Heading>}
              {block.intro && (
                <div className="space-y-5">
                  <Paragraphs body={block.intro} />
                </div>
              )}
            </div>
          </Reveal>
          <div className="space-y-14">
            {block.items.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <figure>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {(
                      [
                        ["Before", item.beforeSrc],
                        ["After", item.afterSrc],
                      ] as const
                    ).map(([side, src]) => (
                      <div key={side}>
                        <div className="mb-2.5 text-[11px] uppercase tracking-widest text-muted">
                          {side}
                        </div>
                        {src ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={src}
                            alt={`${item.label}, ${side.toLowerCase()}`}
                            loading="lazy"
                            className="block h-auto w-full rounded-2xl border border-border bg-surface"
                          />
                        ) : (
                          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-surface text-white/25">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="9" r="1.6" />
                              <path d="M21 15l-5-5L5 21" />
                            </svg>
                            <span className="text-[10px] uppercase tracking-widest">
                              {side} placeholder
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Description sits under the pair, not between the frames,
                      so the two are compared before they're explained. */}
                  <figcaption className="mx-auto mt-6 max-w-3xl">
                    <span className="block text-sm font-medium text-white">
                      {item.label}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-white/55">
                      {item.caption}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      );

    case "decisions":
      return (
        <div className="mx-auto max-w-5xl space-y-12">
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-6">
              {block.heading && <Heading>{block.heading}</Heading>}
              {block.intro && (
                <div className="space-y-5">
                  <Paragraphs body={block.intro} />
                </div>
              )}
            </div>
          </Reveal>
          <div className="space-y-5">
            {block.items.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="rounded-3xl border border-border bg-surface/60 p-8 md:p-10">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-medium text-white">
                      {item.title}
                    </h3>
                  </div>
                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="text-[11px] uppercase tracking-widest text-muted">
                        The problem
                      </dt>
                      <dd className="mt-1.5 max-w-2xl leading-relaxed text-white/60">
                        {item.problem}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-widest text-accent/80">
                        The decision
                      </dt>
                      <dd className="mt-1.5 max-w-2xl leading-relaxed text-white/90">
                        {item.decision}
                      </dd>
                    </div>
                    {item.note && (
                      <div className="border-t border-border pt-5">
                        <dt className="text-[11px] uppercase tracking-widest text-muted">
                          {item.note.label}
                        </dt>
                        <dd className="mt-1.5 max-w-2xl leading-relaxed text-white/60">
                          {item.note.body}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      );

    case "impact":
      return (
        <div className="mx-auto max-w-5xl space-y-10">
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-6">
              {block.heading && <Heading>{block.heading}</Heading>}
              {block.intro && (
                <div className="space-y-5">
                  <Paragraphs body={block.intro} />
                </div>
              )}
            </div>
          </Reveal>
          {/* The source tag sits above the numbers, not in a footnote under
              them. A reader should know what kind of evidence this is before
              they read the first figure, not after. */}
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.07] px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                <span aria-hidden>✦</span> {block.source}
              </span>
            </div>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
            {block.metrics.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div>
                  <div className="heading text-[4.5rem] font-bold leading-none tracking-[-0.03em] text-accent md:text-[6rem]">
                    {m.value}
                  </div>
                  <div className="mt-3 text-base text-white/60">{m.label}</div>
                  {m.baseline && (
                    <div className="mt-2 text-sm leading-relaxed text-white/40">
                      {m.baseline}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          {block.body && (
            <Reveal>
              <div className="mx-auto max-w-3xl space-y-5">
                <Paragraphs body={block.body} />
              </div>
            </Reveal>
          )}
        </div>
      );

    case "quote":
      return (
        <Reveal>
          <div className="mx-auto max-w-4xl space-y-8 border-t border-border pt-16 text-center">
            {block.heading && (
              <div className="text-sm uppercase tracking-[0.3em] text-accent">
                {block.heading}
              </div>
            )}
            <p className="heading text-3xl font-bold leading-[1.15] text-white md:text-5xl">
              {block.body[0]}
            </p>
            {block.body.slice(1).map((p, i) => (
              <p key={i} className="mx-auto max-w-2xl text-lg leading-relaxed text-white/60">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      );

    case "figure":
      return (
        <Figure src={block.src} caption={block.caption} impact={block.impact} />
      );
  }
}

/* ---------- page ---------- */

export default function CaseStudy({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const cs = project.caseStudy!;

  return (
    <article>
      {/* ===== Hero ===== */}
      <header className="px-6 pt-32 md:px-[100px] md:pt-44">
        <Reveal>
          <a
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
          >
            <span aria-hidden>←</span> All work
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="rounded-full border border-border px-3 py-1">
              {project.category}
            </span>
            {project.tags.map((t) => (
              <span key={t}>· {t}</span>
            ))}
            <span>· {project.year}</span>
          </div>

          <h1 className="heading mt-6 max-w-4xl text-5xl font-bold leading-[0.95] text-white sm:text-6xl md:text-7xl">
            {cs.title ?? project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70 md:text-2xl">
            {cs.tagline}
          </p>
        </Reveal>

        {/* Cover */}
        <Reveal delay={0.1}>
          <div className="relative mt-14 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[2rem] border border-border bg-surface md:mt-16">
            {project.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2.5 text-white/25">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="9" r="1.6" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-[11px] uppercase tracking-widest">
                  Cover image placeholder
                </span>
              </div>
            )}
          </div>
        </Reveal>

        {/* Meta */}
        <Reveal delay={0.15}>
          <dl className="mt-12 grid grid-cols-2 gap-8 border-y border-border py-10 md:grid-cols-4">
            {cs.meta.map((m) => (
              <div key={m.label}>
                <dt className="text-xs uppercase tracking-widest text-muted">
                  {m.label}
                </dt>
                <dd className="mt-2 text-base text-white/90">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {/* ===== Body ===== */}
      <div className="space-y-20 px-6 py-20 md:space-y-28 md:px-[100px] md:py-28">
        {cs.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {/* ===== Next project ===== */}
      <a
        href={`/work/${next.slug}`}
        className="group block border-t border-border px-6 py-20 transition-colors hover:bg-surface/40 md:px-[100px] md:py-28"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-sm uppercase tracking-[0.25em] text-muted">
            Next project
          </div>
          <div className="mt-4 flex items-center justify-between gap-6">
            <h2 className="heading text-4xl font-bold text-white transition-colors group-hover:text-accent sm:text-5xl md:text-6xl">
              {next.title}
            </h2>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border text-lg transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
              →
            </span>
          </div>
          <p className="mt-3 text-white/50">{next.subtitle}</p>
        </div>
      </a>
    </article>
  );
}
