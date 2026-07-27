import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkCard from "@/components/WorkCard";
import Reveal from "@/components/Reveal";
import ScrambleHeading from "@/components/ScrambleHeading";
import { projects, site } from "@/lib/data";

export const metadata: Metadata = {
  title: `Work | ${site.name}`,
  description: `Selected product and UI/UX design projects by ${site.name}.`,
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="relative bg-background">
        <section className="px-6 pb-24 pt-36 md:px-[100px] md:pb-32 md:pt-44">
          <Reveal>
            <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <a
                  href="/"
                  className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
                >
                  <span aria-hidden>←</span> Back home
                </a>
                <ScrambleHeading
                  as="h1"
                  lead="All"
                  bold="Work"
                  className="heading text-4xl leading-none text-white sm:text-5xl md:text-6xl"
                >
                  <sup className="ml-2 align-super text-base font-normal text-muted">
                    ({projects.length})
                  </sup>
                </ScrambleHeading>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Every project in one place; client assignments and personal
                explorations across SaaS, fintech, agritech, and mobile.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-[4.5px]">
            {projects.map((p) => (
              <WorkCard key={p.slug} p={p} />
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
