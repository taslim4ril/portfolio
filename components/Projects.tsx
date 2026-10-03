import { projects } from "@/lib/data";
import ProjectTheater from "./ProjectTheater";
import Button, { CircleIcon } from "./Button";

// The homepage teases the first few; the rest live on /work.
const FEATURED_COUNT = 3;

export default function Projects() {
  const featured = projects.slice(0, FEATURED_COUNT);

  return (
    // The theater pins this section and plays the projects in on scroll;
    // see ProjectTheater.
    <section id="work" className="bg-background pb-24 md:pb-32">
      <ProjectTheater
        projects={featured}
        blurb="Products I have designed across banking, SaaS and AI."
      />

      <div className="mt-10 flex justify-center px-6 md:mt-12">
        <Button href="/work" size="lg" icon={<CircleIcon>→</CircleIcon>}>
          See all {projects.length} projects
        </Button>
      </div>
    </section>
  );
}
