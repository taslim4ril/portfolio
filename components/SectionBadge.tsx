import type { ReactNode } from "react";

/** The small "✦ Label" pill that titles a section. Shared so the sections
 *  that use it stay identical. */
export default function SectionBadge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-white/80 ${className}`}
    >
      <span className="text-accent">✦</span> {children}
    </span>
  );
}
