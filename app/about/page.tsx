import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { about, experience, testimonials, site } from "@/lib/data";

export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description: about.tagline,
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="relative bg-background">
        {/* ===== Intro ===== */}
        <section className="px-6 pb-16 pt-36 md:px-[100px] md:pt-44">
          <Reveal>
            <a
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
            >
              <span aria-hidden>←</span> Back home
            </a>
            <h1 className="heading text-4xl leading-none text-white sm:text-5xl md:text-6xl">
              <span className="font-normal text-white/90">About</span>{" "}
              <span className="font-bold">Me</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
              {about.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {/* gap-px over a border-coloured background paints the dividers,
                so the cells stay flush without doubling up borders. */}
            <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {about.facts.map((f) => (
                <div key={f.label} className="bg-background px-6 py-7">
                  <dt className="text-sm text-muted">{f.label}</dt>
                  <dd className="mt-2 text-xl font-medium text-white">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ===== Bio ===== */}
        <section className="px-6 py-16 md:px-[100px]">
          <div className="max-w-3xl space-y-7">
            {about.bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-xl leading-relaxed text-white/75 md:text-2xl">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== Experience ===== */}
        <section className="px-6 py-16 md:px-[100px]">
          <Reveal>
            <h2 className="heading text-3xl leading-none text-white sm:text-4xl md:text-5xl">
              <span className="font-normal text-white/90">Work</span>{" "}
              <span className="font-bold">Experience</span>
            </h2>
          </Reveal>

          <div className="mt-12 border-t border-border">
            {experience.map((role) => (
              <Reveal key={`${role.company}-${role.period}`}>
                <article className="grid gap-6 border-b border-border py-10 md:grid-cols-[15rem_1fr] md:gap-12">
                  <div>
                    <div className="text-sm text-muted">{role.period}</div>
                    <div className="mt-2 text-lg font-medium text-white">
                      {role.company}
                    </div>
                    <div className="mt-1 text-sm text-accent">{role.title}</div>
                  </div>
                  <ul className="space-y-4">
                    {role.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex gap-3 leading-relaxed text-white/65"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== Testimonials ===== */}
        <section className="px-6 py-16 pb-28 md:px-[100px]">
          <Reveal>
            <h2 className="heading text-3xl leading-none text-white sm:text-4xl md:text-5xl">
              <span className="font-normal text-white/90">Kind</span>{" "}
              <span className="font-bold">Words</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-8">
                  <span aria-hidden className="text-3xl leading-none text-accent">
                    &ldquo;
                  </span>
                  <blockquote className="mt-4 flex-1 leading-relaxed text-white/75">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 border-t border-border pt-5">
                    <div className="font-medium text-white">{t.name}</div>
                    <div className="mt-1 text-sm text-muted">{t.company}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
