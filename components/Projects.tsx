import { projects, type Project } from "@/lib/data";
import Reveal from "./Reveal";

function WorkCard({
  p,
  index,
  ratio,
}: {
  p: Project;
  index: number;
  ratio: string;
}) {
  return (
    <a href="#contact" className="group block">
      <div className={`relative overflow-hidden rounded-[20px] bg-[#e0e0dd] ${ratio}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={`${p.title} — ${p.category}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#141414] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          ↗
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="text-sm text-[#9a9a97]">
            {String(index).padStart(2, "0")}.
          </span>
          <span className="text-base font-medium text-[#141414] md:text-lg">
            {p.title}
          </span>
        </div>
        <span className="text-sm text-[#9a9a97]">{p.year}</span>
      </div>
    </a>
  );
}

export default function Projects() {
  const big = projects.slice(0, 2);
  const small = projects.slice(2, 5);

  return (
    <section id="work" className="bg-[#ededeb] px-6 py-24 text-[#141414] md:py-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="relative mb-14 md:mb-20">
          <div className="mb-8 flex items-center gap-2 text-sm font-medium text-[#141414] md:absolute md:left-0 md:top-2 md:mb-0">
            <span className="h-1.5 w-1.5 rounded-full bg-[#141414]" />
            Project showcase
          </div>

          <h2
            className="text-center font-bold leading-[0.9] tracking-tight text-[#141414]"
            style={{ fontSize: "clamp(2.75rem, 8.5vw, 7.5rem)" }}
          >
            Selected Work.
            <sup className="ml-1 align-super text-[0.2em] font-medium text-[#6a6a67]">
              ({projects.length})
            </sup>
          </h2>

          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <p className="max-w-sm text-sm leading-relaxed text-[#5a5a57] md:ml-[24%]">
              I&apos;ve helped teams across industries turn complex problems into
              clear, human-centered products. Here are some recent projects.
            </p>
            <span className="text-sm text-[#9a9a97]">
              01—0{projects.length}&reg;
            </span>
          </div>
        </div>

        {/* Row 1 — two large cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {big.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <WorkCard p={p} index={i + 1} ratio="aspect-[16/10]" />
            </Reveal>
          ))}
        </div>

        {/* Row 2 — three portrait cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {small.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <WorkCard p={p} index={i + 3} ratio="aspect-[4/5]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
