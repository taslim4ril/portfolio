import { posts, socials } from "@/lib/data";
import Reveal from "./Reveal";
import ArticleCard from "./ArticleCard";
import ScrambleHeading from "./ScrambleHeading";

/** Frame shapes per article, matched to each cover's own proportions
    (5:4 and 3:2, then a wide slot for the next), so the set reads as an
    uneven, offset composition rather than identical tiles. */
const ASPECTS = ["5 / 4", "3 / 2", "16 / 10"];

/** A three-step stagger on desktop: wide on the left, narrow and lower on
    the right, then wide again set in from the left. */
const LAYOUT = [
  "md:col-span-7",
  "md:col-span-5 md:mt-48",
  "md:col-span-6 md:col-start-2",
];

const medium = socials.find((s) => s.label === "Medium")?.href;

export default function Writing() {
  return (
    // Side gutters match the Selected Projects cards so everything lines up.
    <section
      id="articles"
      className="border-t border-border px-6 py-24 md:px-[100px] md:py-32"
    >
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <ScrambleHeading
            lead="Latest"
            bold="Articles"
            className="heading text-4xl leading-none text-white sm:text-5xl md:text-6xl"
          >
            <sup className="ml-2 align-super text-base font-normal text-muted">
              ({posts.length})
            </sup>
          </ScrambleHeading>
          {medium && (
            <a
              href={medium}
              target="_blank"
              rel="noopener noreferrer"
              className="group/m inline-flex items-center gap-2 self-start text-base text-white/80 transition-colors hover:text-white md:self-auto"
            >
              <span className="link-sweep">More on Medium</span>
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                fill="none"
                className="h-3.5 w-3.5 -rotate-45 transition-[translate] duration-300 group-hover/m:-translate-y-0.5 group-hover/m:translate-x-0.5"
              >
                <path
                  d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </Reveal>

      {/* Asymmetric on desktop: the first article takes the wider column,
          the second sits lower in the narrower one. One column on phones. */}
      <div className="mt-14 grid grid-cols-1 gap-y-16 md:mt-20 md:grid-cols-12 md:gap-x-10">
        {posts.map((post, i) => (
          <ArticleCard
            key={post.title}
            post={post}
            aspect={ASPECTS[i % ASPECTS.length]}
            delay={i * 0.12}
            className={LAYOUT[i % LAYOUT.length]}
          />
        ))}
      </div>
    </section>
  );
}
