import { posts } from "@/lib/data";
import Reveal from "./Reveal";

export default function Writing() {
  return (
    <section id="writing" className="border-t border-border px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Writing
          </p>
          <h2 className="display text-4xl font-semibold md:text-5xl">
            Thoughts on design & craft
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 py-8 transition-colors hover:bg-surface/40 md:flex-row md:items-center md:justify-between md:gap-10 md:px-4"
              >
                <div className="max-w-2xl">
                  <div className="mb-2 text-sm text-muted">{post.date}</div>
                  <h3 className="display text-2xl font-medium transition-colors group-hover:text-accent md:text-3xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-muted">{post.excerpt}</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-lg transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
