import { projects } from "@/lib/data";
import Reveal from "./Reveal";
import WorkCard from "./WorkCard";
import ScrambleHeading from "./ScrambleHeading";
import Button, { CircleIcon } from "./Button";

// The homepage teases the first few; the rest live on /work.
const FEATURED_COUNT = 3;

export default function Projects() {
  const featured = projects.slice(0, FEATURED_COUNT);

  return (
    // Generous side gutters (~5x the previous), still wider than the page grid.
    <section id="work" className="px-6 py-24 md:px-[100px] md:py-32">
      {/* Heading aligned with the card edges */}
      <Reveal>
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <ScrambleHeading
            lead="Selected"
            bold="Work"
            className="heading text-4xl leading-none text-white sm:text-5xl md:text-6xl"
          >
            <sup className="ml-2 align-super text-base font-normal text-muted">
              ({projects.length})
            </sup>
          </ScrambleHeading>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            A mix of client assignments and personal explorations across SaaS,
            fintech, agritech, and mobile.
          </p>
        </div>
      </Reveal>

      {/* Cards scroll through in normal flow — no pinning or stacking. */}
      <div className="flex flex-col gap-[4.5px]">
        {featured.map((p) => (
          <WorkCard key={p.slug} p={p} />
        ))}
      </div>

      {/* See all */}
      <Reveal delay={0.1}>
        <div className="mt-16 flex justify-center">
          <Button href="/work" size="lg" icon={<CircleIcon>→</CircleIcon>}>
            See all projects
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
