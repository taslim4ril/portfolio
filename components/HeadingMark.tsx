/**
 * The spinning starburst that sits beside every section heading.
 *
 * It turns at a steady pace and never changes shape or size. Hovering it
 * flips the burst from accent to white and forms a ring of type around the
 * outside of its frame, which is why the ring SVG deliberately overflows the
 * 60px box rather than shrinking the burst to make room.
 *
 * No hooks on purpose: the spin is a CSS animation and the swap is a CSS
 * hover, so this renders on the server alongside the headings it decorates.
 */

const RAYS = 12;

/** One tapered spoke: a point at `outer`, widening to `halfWidth` at `inner`.
 *  Twelve of them plus a small core disc reads as a burst rather than a star. */
function burstPath(outer: number, inner: number, halfWidth: number) {
  const cx = 50;
  const cy = 50;
  const parts: string[] = [];

  for (let i = 0; i < RAYS; i++) {
    const a = (i * 2 * Math.PI) / RAYS;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    // Rotate the upright spoke (tip at -outer on y) into position.
    const pt = (x: number, y: number) =>
      `${(cx + x * cos - y * sin).toFixed(2)},${(cy + x * sin + y * cos).toFixed(2)}`;

    parts.push(
      `M${pt(0, -outer)}L${pt(halfWidth, -inner)}L${pt(-halfWidth, -inner)}Z`,
    );
  }

  return parts.join("");
}

const BURST = burstPath(47, 8, 5);

/** Shared by every instance. The ring is identical everywhere, so the
 *  duplicate id resolves to the first one and renders the same either way. */
const RING_ID = "heading-mark-ring";
/** Centred in the 116 viewBox, at a radius that clears the 60px burst. */
const RING_PATH = "M58,58 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0";

export const MARK_LABEL = "DESIGNED IN LAGOS ✦ BUILT TO WORK ✦";

/** Colour swap shared by every part of the burst, so the core and the spokes
 *  never flip out of step with each other. */
const SWAP = "fill-accent transition-colors duration-300 ease-out group-hover/mark:fill-white";

export default function HeadingMark({
  label = MARK_LABEL,
  className = "",
}: {
  /** Type around the rim on hover. Kept short: the ring is only 276 units. */
  label?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`group/mark relative inline-block h-[3.75rem] w-[3.75rem] shrink-0 align-middle ${className}`}
    >
      <span className="heading-mark-spin absolute inset-0 block">
        {/* Ring of type, drawn outside the frame. `-inset-7` pushes it 28px
            past the burst on every side; pointer-events stay off so the
            hover target is still just the 60px mark. */}
        <svg
          viewBox="0 0 116 116"
          className="pointer-events-none absolute -inset-7 opacity-0 transition-opacity duration-300 ease-out group-hover/mark:opacity-100"
        >
          <defs>
            <path id={RING_ID} d={RING_PATH} fill="none" />
          </defs>
          <text
            className="fill-white"
            fontSize="10.5"
            fontWeight="600"
            letterSpacing="2"
          >
            <textPath href={`#${RING_ID}`} startOffset="0">
              {label}
            </textPath>
          </text>
        </svg>

        {/* The burst itself. Same shape, same size, hovered or not. */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle cx="50" cy="50" r="9" className={SWAP} />
          <path d={BURST} className={SWAP} />
        </svg>
      </span>
    </span>
  );
}
