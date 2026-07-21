"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site, projects } from "@/lib/data";
import Logo from "./Logo";

const links = [
  { label: "Work", href: "#work", count: projects.length },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On the home page keep bare hashes so Lenis can smooth-scroll them.
  // Elsewhere prefix with "/" so they navigate home and then jump.
  const to = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Side gutters match the Selected Work cards so everything lines up. */}
      <div className="relative flex items-center justify-between px-6 py-5 md:px-[100px]">
        {/* Logo */}
        <a
          href={to("#top")}
          aria-label="Taslim Abdulkadir — home"
          className="transition-transform duration-300 hover:scale-105"
        >
          <Logo className="h-10 w-10 md:h-11 md:w-11" />
        </a>

        {/* Centered pill nav */}
        <nav
          className={`absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-white/10 p-1.5 transition-colors md:flex ${
            scrolled ? "bg-black/70 backdrop-blur-xl" : "bg-white/5 backdrop-blur-md"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={to(l.href)}
              className="group flex items-center gap-1 rounded-full px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
              {l.count != null && (
                <sup className="text-[10px] text-white/40">({l.count})</sup>
              )}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={`mailto:${site.email}`}
          className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15 md:inline-flex"
        >
          Let&apos;s talk
          <span className="text-accent">✦</span>
        </a>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mx-6 rounded-2xl border border-white/10 bg-black/90 px-6 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={to(l.href)}
                onClick={() => setOpen(false)}
                className="text-base text-white/80 transition-colors hover:text-white"
              >
                {l.label}
                {l.count != null && (
                  <sup className="ml-0.5 text-[10px] text-white/40">({l.count})</sup>
                )}
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-medium text-accent-ink"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
