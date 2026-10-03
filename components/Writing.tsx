import { posts } from "@/lib/data";
import Reveal from "./Reveal";
import ArticleRow from "./ArticleRow";
import ScrambleHeading from "./ScrambleHeading";

export default function Writing() {
  return (
    // Side gutters match the Selected Projects cards so everything lines up.
    <section
      id="articles"
      className="border-t border-border px-6 py-24 md:px-[100px] md:py-32"
    >
      <div>
        <Reveal>
          <div>
            <ScrambleHeading
              lead="Latest"
              bold="Articles"
              className="heading text-4xl leading-none text-white sm:text-5xl md:text-6xl"
            >
              <sup className="ml-2 align-super text-base font-normal text-muted">
                ({posts.length})
              </sup>
            </ScrambleHeading>
          </div>
        </Reveal>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08}>
              <ArticleRow post={post} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
