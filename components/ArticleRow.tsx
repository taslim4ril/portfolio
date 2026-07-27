"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { posts } from "@/lib/data";

type Post = (typeof posts)[number];

export default function ArticleRow({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const [hovering, setHovering] = useState(false);

  // Cursor-follow preview card. Softer than the Selected Work spring on
  // purpose: these rows sit close together, so a snappier follow reads as
  // twitchy when the pointer crosses several of them.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 30, mass: 0.8 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <a
      ref={rowRef}
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        setHovering(true);
        handleMouseMove(e);
      }}
      onMouseLeave={() => setHovering(false)}
      /* Suppresses the global accent cursor — this row supplies its own
         cursor-following preview instead, same convention as WorkCard. */
      data-cursor-hide
      className="group relative flex flex-col gap-3 py-14 transition-colors duration-500 ease-out hover:bg-surface/40 md:flex-row md:items-center md:justify-between md:gap-10 md:px-6 md:py-20"
    >
      <div className="max-w-2xl">
        <div className="mb-2 flex items-center gap-3 text-sm text-muted">
          <span className="text-xs text-white/40">
            /{String(index + 1).padStart(2, "0")}
          </span>
          {post.date}
        </div>
        <h3 className="heading text-2xl font-bold transition-colors duration-500 ease-out group-hover:text-accent md:text-3xl">
          {post.title}
        </h3>
        <p className="mt-2 text-muted">{post.excerpt}</p>
      </div>

      {/* Explicit property list rather than `transition-all`, which would also
          animate layout properties and defeat the point. */}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-lg transition-[background-color,border-color,color,transform] duration-500 ease-out group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
        ↗
      </span>

      {/* Cursor-follow preview — image only appears here, on hover, never
          inline in the row. Desktop only (fine pointers), purely decorative,
          so it never blocks the row's own click target. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        style={{ x: springX, y: springY }}
      >
        {/* Only opacity and transform animate, so the fade stays on the
            compositor. `will-change` is set solely while hovering: left on
            permanently it would hold a layer for every row on the page. */}
        <div
          className="w-96 overflow-hidden rounded-3xl border border-border bg-surface/95 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] backdrop-blur-md transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: hovering ? 1 : 0,
            transform: `translate(-50%, -50%) scale(${hovering ? 1 : 0.94})`,
            willChange: hovering ? "opacity, transform" : "auto",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt=""
            className="h-56 w-full object-cover"
          />
          <div className="p-6">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              {post.date}
            </span>
            <h4 className="heading mt-2 text-xl font-bold leading-snug text-white">
              {post.title}
            </h4>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">
              {post.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-accent">
              Read article
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 text-[10px]">
                ↗
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </a>
  );
}
