import { projects } from "@/lib/data";
import Reveal from "./Reveal";
import WorkRail from "./WorkRail";
import ScrambleHeading from "./ScrambleHeading";

// The homepage teases the first few; the rest live on /work.
const FEATURED_COUNT = 3;

export default function Projects() {
  const featured = projects.slice(0, FEATURED_COUNT);

  return (
    // The rail pins this section and turns vertical scroll into sideways
    // movement; see WorkRail. Vertical padding sits outside the pin so the
    // section still breathes against its neighbours.
    <section id="work" className="py-12 md:py-16">
      <WorkRail
        projects={featured}
        header={
          <Reveal>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
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
                Banking, SaaS, and AI-assisted planning, each told as the
                problem underneath the brief.
              </p>
            </div>
          </Reveal>
        }
        allHref="/work"
      />
    </section>
  );
}
