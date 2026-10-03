"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { posts } from "@/lib/data";

type Post = (typeof posts)[number];

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * One article: the cover in a rounded frame, then the date, title and
 * excerpt beneath it on the page. The cover wipes up into its frame the
 * first time it scrolls into view, settling from a slight zoom, and the
 * text follows a beat later. Hover underlines the title, eases the cover
 * in and fills the arrow with the accent, the same arrow the project cards
 * use.
 */
export default function ArticleCard({
  post,
  aspect,
  delay = 0,
  className = "",
}: {
  post: Post;
  /** Frame shape, matched to the cover so nothing important is cropped. */
  aspect: string;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const Wrapper = post.placeholder ? motion.div : motion.a;
  const linkProps = post.placeholder
    ? {}
    : { href: post.href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Wrapper
      {...linkProps}
      className={`${post.placeholder ? "" : "group "}block ${className}`}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div
        className="relative overflow-hidden rounded-[1.75rem] bg-surface"
        style={{ aspectRatio: aspect }}
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          shown: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 1.1, ease, delay },
          },
        }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { scale: 1.15 },
            shown: { scale: 1, transition: { duration: 1.6, ease, delay } },
          }}
        >
          {post.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={post.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          ) : (
            // No cover yet: a quiet dot field with a warm glow, so the empty
            // frame reads as deliberate rather than broken.
            <div className="dot-grid h-full w-full bg-[radial-gradient(ellipse_at_30%_20%,rgba(251,146,60,0.22),transparent_65%)]" />
          )}
        </motion.div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/10"
        />
      </motion.div>
      <motion.div
        className="mt-6 flex items-start justify-between gap-6 md:mt-7"
        variants={{
          hidden: { opacity: 0, y: 18 },
          shown: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease, delay: delay + 0.25 },
          },
        }}
      >
        <div className="min-w-0">
          <p className="text-sm text-muted">
            {post.placeholder ? post.date : `${post.date} · Medium`}
          </p>
          <h3 className="heading mt-3 text-2xl font-bold leading-[1.15] text-white md:text-[2rem]">
            <span className="link-sweep">{post.title}</span>
          </h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
            {post.excerpt}
          </p>
        </div>
        {!post.placeholder && (
          <span
            aria-hidden
            className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-[background-color,border-color,color,rotate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink md:h-14 md:w-14"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4 md:h-5 md:w-5"
            >
              <path
                d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </motion.div>
    </Wrapper>
  );
}
