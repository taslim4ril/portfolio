import type { ReactNode } from "react";

/**
 * The site's one button. Every call to action uses this, so shape, border,
 * and hover behaviour stay identical everywhere.
 *
 * Hover fills the pill from the left and the trailing icon steps forward.
 * The fill is a transform on its own layer rather than an animated
 * background, so it stays on the compositor. No hooks here on purpose:
 * it's pure CSS hover, so it renders on the server like the sections it
 * sits in.
 */

type Variant = "outline" | "solid";
type Size = "sm" | "md" | "lg";

/** Horizontal only. Height is fixed on the base so a button carrying a
 *  circled icon can't end up taller than one with a bare glyph, which is
 *  exactly what padding-driven sizing did. */
const SIZES: Record<Size, string> = {
  sm: "gap-2 px-5",
  md: "gap-3 px-6",
  lg: "gap-3 px-8",
};

/** Matches the section CTAs, which set the reference height for the site. */
export const BUTTON_HEIGHT = "h-[3.625rem]";

const VARIANTS: Record<Variant, { base: string; fill: string }> = {
  outline: {
    base: "border border-white/20 bg-white/[0.03] text-white backdrop-blur-sm hover:border-accent hover:text-accent-ink",
    fill: "bg-accent",
  },
  // Already accent, so the fill inverts instead: the dark sweeps in and the
  // label flips to accent. Same motion, mirrored.
  solid: {
    base: "border border-accent bg-accent text-accent-ink hover:text-accent",
    fill: "bg-accent-ink",
  },
};

/** The circled arrow the section-level buttons carry. `border-current` so it
 *  tracks the label colour through the hover flip instead of being restyled. */
export function CircleIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current/40 text-[10px]">
      {children}
    </span>
  );
}

export default function Button({
  children,
  href,
  variant = "outline",
  size = "md",
  icon,
  external = false,
  onClick,
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  /** Trailing glyph. Steps forward on hover. */
  icon?: ReactNode;
  external?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const v = VARIANTS[variant];

  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : null)}
      onClick={onClick}
      /* `isolate` keeps the fill's negative z-index inside the button. */
      className={`group relative isolate inline-flex ${BUTTON_HEIGHT} items-center justify-center overflow-hidden whitespace-nowrap rounded-full text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-500 ease-out ${SIZES[size]} ${v.base} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${v.fill}`}
      />
      {children}
      {icon && (
        <span
          aria-hidden
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        >
          {icon}
        </span>
      )}
    </a>
  );
}
