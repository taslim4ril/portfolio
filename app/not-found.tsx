import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DustField from "@/components/DustField";
import SectionBadge from "@/components/SectionBadge";
import ScrambleHeading from "@/components/ScrambleHeading";
import Button, { CircleIcon } from "@/components/Button";
import { site } from "@/lib/data";

/**
 * The site's 404, carried over from the old Framer portfolio: same "lost in
 * space" line, rebuilt in this site's type and motion.
 *
 * The root `not-found` catches two things: any URL that matches no route, and
 * any `notFound()` thrown inside a segment. `/work/[slug]` throws it for
 * projects whose case study isn't written yet, so those land here too.
 */
export default function NotFound() {
  return (
    <>
      <Nav />
      {/* Column, not a fixed height: the copy block takes the viewport and the
          footer sits under it rather than overlapping. */}
      <main className="relative flex min-h-dvh flex-col bg-background">
        {/* Backdrop. Absolute and clipped in its own layer so `overflow-hidden`
            never lands on `main`, where it would turn the page into a scroll
            container. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Same watermark treatment as About: Acorn, barely there. */}
          <span className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 select-none font-heading text-[46vw] leading-none text-white/[0.035] md:text-[30vw]">
            404
          </span>
          {/* Dust sits in front of the watermark, as it does over the hero
              portrait. It also makes "lost in space" literal. */}
          <DustField />
        </div>

        <section className="relative flex flex-1 flex-col items-center justify-center px-6 py-32 text-center md:px-[100px]">
          <SectionBadge>Error 404</SectionBadge>

          <ScrambleHeading
            as="h1"
            lead="Oops,"
            bold="let's bring you back"
            className="heading mt-10 max-w-3xl text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl"
          />

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/65">
            It&apos;s 404. The page you&apos;re looking for got lost in space.
          </p>

          {/* Stacked on mobile at a matched width, so the two pills don't sit
              ragged under a centred heading. Same `w-full` pattern the mobile
              nav menu uses. */}
          <div className="mt-11 flex w-full max-w-xs flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Button
              href="/"
              variant="solid"
              size="lg"
              icon={<CircleIcon>→</CircleIcon>}
              className="w-full sm:w-auto"
            >
              Homepage
            </Button>
            <Button
              href="/work"
              size="lg"
              icon={<CircleIcon>→</CircleIcon>}
              className="w-full sm:w-auto"
            >
              All work
            </Button>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-white"
          >
            Or just say hello
          </a>
        </section>

        <Footer />
      </main>
    </>
  );
}
