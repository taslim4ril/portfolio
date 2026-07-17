import { projects } from "@/lib/data";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="work" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Selected work
              </p>
              <h2 className="display max-w-xl text-4xl font-semibold md:text-5xl">
                Case studies I&apos;m proud of
              </h2>
            </div>
            <p className="max-w-xs text-muted">
              A mix of client assignments and personal explorations across SaaS,
              fintech, and mobile.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.06}
              className={p.accent ? "md:col-span-2" : undefined}
            >
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-foreground/30">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(600px circle at var(--x,50%) 0%, rgba(200,255,61,0.06), transparent 40%)",
                  }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                      <span className="rounded-full border border-border px-3 py-1">
                        {p.category}
                      </span>
                      <span>{p.tag}</span>
                      <span>· {p.year}</span>
                    </div>
                    <h3 className="display text-3xl font-semibold md:text-4xl">
                      {p.title}
                    </h3>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-lg transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                    ↗
                  </span>
                </div>

                <p className="relative mt-6 max-w-lg text-muted">{p.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
