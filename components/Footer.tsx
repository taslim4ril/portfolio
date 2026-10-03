import { site, socials } from "@/lib/data";

export default function Footer() {
  return (
    // Side gutters match the Selected Work cards so everything lines up.
    <footer className="px-6 pb-10 md:px-[100px]">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        {/* Left: location + availability */}
        <div>
          {/* One plain line. The globe badge and the rotated country code
              were decoration; where you are and whether you are free is the
              information. */}
          <p className="text-sm uppercase tracking-[0.2em] text-muted">
            {site.location} · Working with teams anywhere
          </p>

          {/* A free proof point: the site is the work, so say who built it
              and leave the source one click away. */}
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted">
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

          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted">
            © {new Date().getFullYear()} {site.name.split(" ")[0]}, all
            rights reserved.
          </p>
        </div>

        {/* Right: social links + email */}
        <div>
          {/* Same letterspaced caps as the hero's small type. The uppercase
              is CSS only, so the mailto address itself is untouched. */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-sm uppercase tracking-[0.2em] md:text-base">
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
            className="mt-5 block text-sm uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground md:text-base"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
