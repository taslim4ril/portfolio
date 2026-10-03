import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkCard from "@/components/WorkCard";
import WorkHero from "@/components/WorkHero";
import { projects, site } from "@/lib/data";

export const metadata: Metadata = {
  title: `Work | ${site.name}`,
  description: `Selected product and UI/UX design projects by ${site.name}.`,
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="relative bg-background">
        <section className="px-6 pb-24 pt-36 md:px-[100px] md:pb-32 md:pt-44">
          <WorkHero
            count={projects.length}
            blurb="Five case studies across banking, SaaS, and AI-assisted planning."
          />

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
