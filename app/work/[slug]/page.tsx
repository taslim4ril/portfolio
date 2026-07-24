import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudy from "@/components/CaseStudy";
import { projects, site } from "@/lib/data";

type Params = { params: Promise<{ slug: string }> };

// Prerender a static page for every project slug.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = project.caseStudy?.title ?? project.title;
  return {
    title: `${title} — ${site.name}`,
    description: project.caseStudy?.tagline ?? project.description,
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Nav />
      <main className="relative bg-background">
        {project.caseStudy ? (
          <CaseStudy project={project} next={next} />
        ) : (
          /* Case study not written yet — graceful placeholder so links work. */
          <section className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-32 text-center md:px-[100px]">
            <span className="text-sm uppercase tracking-[0.25em] text-muted">
              {project.category}
            </span>
            <h1 className="heading mt-6 text-5xl font-bold text-white md:text-6xl">
              {project.title}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
              {project.description}
            </p>
            <p className="mt-8 text-sm text-muted">
              The full case study is coming soon.
            </p>
            <a
              href="/work"
              className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <span aria-hidden>←</span> Back to all work
            </a>
          </section>
        )}
        <Footer />
      </main>
    </>
  );
}
