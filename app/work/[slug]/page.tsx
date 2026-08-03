import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudy from "@/components/CaseStudy";
import { projects, site } from "@/lib/data";

type Params = { params: Promise<{ slug: string }> };

// Prerender a static page for every project that actually has a case study.
// The rest have nothing to render, so they fall through to the 404 below and
// there's nothing worth building ahead of time.
export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = projects.find((p) => p.slug === slug)?.caseStudy;
  if (!study) return {};
  return {
    title: `${study.title} | ${site.name}`,
    description: study.tagline,
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;

  // Walk only the projects that have a case study, so "next project" can't
  // hand the reader on to a slug that now 404s.
  const written = projects.filter((p) => p.caseStudy);
  const index = written.findIndex((p) => p.slug === slug);

  // Unknown slug, or a project whose case study isn't written yet. Both are
  // "there is no page here", so both get the 404 rather than a stub that
  // promises content.
  if (index === -1) notFound();

  const project = written[index];
  const next = written[(index + 1) % written.length];

  return (
    <>
      <Nav />
      <main className="relative bg-background">
        <CaseStudy project={project} next={next} />
        <Footer />
      </main>
    </>
  );
}
