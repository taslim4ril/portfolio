import { site, socials } from "@/lib/data";

export default function Footer() {
  return (
    // Side gutters match the Selected Work cards so everything lines up.
    <footer className="px-6 pb-10 md:px-[100px]">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        {/* Left: location + availability */}
        <div>
          <div className="inline-block rounded-lg border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted">
            {site.location}
          </div>

          <div className="mt-2 flex items-stretch overflow-hidden rounded-lg border border-border text-xs uppercase tracking-[0.2em] text-muted">
            <span className="flex items-center border-r border-border px-3 py-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
              </svg>
            </span>
            <span className="px-3 py-2">Working globally</span>
            <span className="flex items-center border-l border-border px-2 py-2 [writing-mode:vertical-rl]">
              NGA
            </span>
          </div>

          {/* A free proof point: the site is the work, so say who built it
              and leave the source one click away. */}
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted/70">
            This site is Next.js, built and deployed by me.{" "}
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Source on GitHub
            </a>
          </p>

          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted/70">
            © {new Date().getFullYear()} {site.name.split(" ")[0]}, all
            rights reserved.
          </p>
        </div>

        {/* Right: social links + email */}
        <div>
          {/* Same letterspaced caps as the hero's small type. The uppercase
              is CSS only, so the mailto address itself is untouched. */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-xs uppercase tracking-[0.2em] md:text-sm">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 block text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground md:text-sm"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
