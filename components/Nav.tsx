"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { projects } from "@/lib/data";
import Logo from "./Logo";
import Button, { BUTTON_HEIGHT } from "./Button";

const links = [
  // "#top" rather than "/": on the home page `to()` leaves it as a hash so
  // Lenis smooth-scrolls up, and anywhere else it becomes "/#top", which
  // navigates home. One entry covers both.
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work", count: projects.length },
  { label: "About", href: "#about" },
  { label: "Articles", href: "#articles" },
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

  // A 1px marker 24px down the document: once it leaves the viewport the
  // page has scrolled. An observer fires twice per crossing instead of on
  // every scroll frame.
  const sentinel = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <span
      ref={sentinel}
      aria-hidden
      className="pointer-events-none absolute left-0 top-6 h-px w-px"
    />
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Side gutters match the Selected Projects cards so everything lines up. */}
      <div className="relative flex items-center justify-between px-6 py-5 md:px-[100px]">
        {/* Logo */}
        <a
          href={to("#top")}
          aria-label="Taslim Abdulkadir - home"
          className="transition-transform duration-300 hover:scale-105"
        >
          <Logo className="h-10 w-10 md:h-11 md:w-11" />
        </a>

        {/* Centered pill nav */}
        <nav
          className={`absolute left-1/2 top-1/2 hidden ${BUTTON_HEIGHT} -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-white/10 px-1.5 transition-colors md:flex ${
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
                <sup className="text-[10px] text-white/60">({l.count})</sup>
              )}
            </a>
          ))}
        </nav>

        {/* CTA */}
        {/* The wrapper owns the responsive visibility. `hidden` on the button
            itself collides with the display utility in its own base classes,
            and lost, so it stayed visible on mobile. */}
        <span className="hidden md:block">
          <Button href={to("#contact")} size="sm" icon="✦">
            Let&apos;s connect
          </Button>
        </span>

        {/* Mobile toggle */}
        {/* 44px square so it is a comfortable thumb target; the bars
            stay 24px wide inside it. */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2.5 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="mx-6 rounded-2xl border border-white/10 bg-black/90 px-6 py-5 backdrop-blur-xl md:hidden">
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
                  <sup className="ml-0.5 text-[10px] text-white/60">({l.count})</sup>
                )}
              </a>
            ))}
            <Button
              href={to("#contact")}
              onClick={() => setOpen(false)}
              variant="solid"
              size="sm"
              className="mt-2 w-full"
            >
              Let&apos;s connect
            </Button>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
