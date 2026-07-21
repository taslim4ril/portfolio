// "TA" monogram — black mark in a white circular badge, traced as SVG from
// the supplied logo so it stays crisp at any size and needs no image request.
export default function Logo({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white ${className}`}
    >
      <svg
        viewBox="0 0 250 260"
        className="h-[58%] w-[58%] translate-y-[2%]"
        aria-hidden
      >
        <g fill="#141414">
          {/* T bar + stem */}
          <rect x="20" y="18" width="116" height="44" />
          <rect x="55" y="62" width="41" height="180" />
          {/* A with triangular counter (evenodd punches the hole) */}
          <path
            fillRule="evenodd"
            d="M139 82 L163 82 L235 242 L96 242 Z M150 150 L181 216 L119 216 Z"
          />
        </g>
      </svg>
    </span>
  );
}
