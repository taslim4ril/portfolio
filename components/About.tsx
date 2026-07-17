import { site, services } from "@/lib/data";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="border-t border-border px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr] md:gap-20">
          <div>
            <Reveal>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                About
              </p>
              <h2 className="display text-3xl font-semibold leading-tight md:text-5xl">
                I believe the best products stay{" "}
                <span className="text-accent">simple</span> — even when the
                problems are hard.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg text-muted">{site.philosophy}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-xl text-muted">
                Based in {site.location}, I partner with founders and teams to
                take ideas from first sketch to launch — and I keep the user at
                the center the whole way through.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-foreground/30">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-display text-sm text-accent">
                      0{i + 1}
                    </span>
                    <h3 className="text-lg font-medium">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
