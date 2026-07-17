import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          {site.name} · {site.role}
        </div>
        <div>© {new Date().getFullYear()} — Designed & built in {site.location}</div>
      </div>
    </footer>
  );
}
