"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { site, socials } from "@/lib/data";
import Logo from "./Logo";

const ease = [0.16, 1, 0.3, 1] as const;
/** The space between first and last name, in em. */
const GAP_EM = 0.3;

/* ---- Lagos clock: a small live detail that says "a real person, here". --- */
const lagosTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
});
const subscribeClock = (tick: () => void) => {
  const id = setInterval(tick, 15_000);
  return () => clearInterval(id);
};

/**
 * The site footer: a cream sheet lifted off the dark page, with the name
 * set across its full width. Columns for role, menu, social and contact,
 * a click-to-copy email, a live Lagos clock, and a bottom bar with the
 * build credit, availability and a way back to the top.
 */
export default function Footer() {
  const pathname = usePathname();
  // Same-page anchors stay hashes on the home page, so smooth scrolling
  // picks them up; elsewhere they lead home first.
  const to = (hash: string) => (pathname === "/" ? hash : `/${hash}`);
  const year = new Date().getFullYear();

  const menu = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Articles", href: to("#articles") },
    { label: "Contact", href: to("#contact") },
  ];

  return (
    <footer className="px-3 pb-3 pt-10 md:px-4 md:pb-4 md:pt-16">
      {/* Black like the page, set apart by a hairline edge and a faint top
          highlight rather than a change of colour. */}
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-background px-6 pb-6 pt-12 text-[#eceade] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:rounded-[2.5rem] md:px-[84px] md:pb-8 md:pt-20">
        {/* ===== Columns ===== */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-x-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label={`${site.name}, home`}>
              <Logo className="h-12 w-12 md:h-14 md:w-14" />
            </Link>
          </div>

          <Column label="Role" className="col-span-2 md:col-span-3">
            <p className="footer-big">Product designer</p>
            <p className="footer-big">Design engineer</p>
            <p className="mt-3 text-sm text-white/60">
              {site.location}
            </p>
          </Column>

          <Column label="Menu" className="md:col-span-2">
            <ul className="flex flex-col">
              {menu.map((m) => (
                <li key={m.label}>
                  <Link href={m.href} className="footer-link footer-big">
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column label="Social" className="md:col-span-2">
            <ul className="flex flex-col">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link footer-big group/s inline-flex items-center gap-1.5"
                  >
                    {s.label}
                    <Arrow className="h-3.5 w-3.5 -rotate-45 opacity-50 transition-[opacity,translate] duration-300 group-hover/s:-translate-y-0.5 group-hover/s:translate-x-0.5 group-hover/s:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </Column>

          <Column label="Get in touch" className="col-span-2 md:col-span-4">
            <CopyEmail />
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Or open it in your mail app
            </a>
            <LagosClock />
          </Column>
        </div>

        {/* ===== The name ===== */}
        <BigName text={site.name} />

        {/* ===== Bottom bar ===== */}
        <div className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.2em] text-white/60 md:mt-6 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name} ·{" "}
            <a
              href={site.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-white"
            >
              Designed and built by me in Next.js
            </a>
          </p>
          <div className="flex items-center justify-between gap-6 md:justify-end">
            <p className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for select projects
            </p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

function Column({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">
        {label}
      </p>
      {children}
    </div>
  );
}

/** Copies the address and says so. Clipboard first, because that is what
    most people want from an email in a footer; the mailto sits below. */
function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={copy}
        className="footer-big group/c inline-flex max-w-full items-center gap-2.5 text-left !text-lg md:!text-xl"
        aria-label={`Copy ${site.email}`}
      >
        <span className="truncate border-b border-white/30 transition-colors group-hover/c:border-accent">
          {site.email}
        </span>
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors group-hover/c:border-accent group-hover/c:bg-accent group-hover/c:text-accent-ink">
          {copied ? <Tick /> : <CopyIcon />}
        </span>
      </button>
      <p
        aria-live="polite"
        className="mt-1.5 text-xs uppercase tracking-[0.2em] text-white/50"
      >
        {copied ? (
          <span className="text-accent">Copied to clipboard</span>
        ) : (
          "Click to copy"
        )}
      </p>
    </div>
  );
}

function LagosClock() {
  const time = useSyncExternalStore(
    subscribeClock,
    () => lagosTime.format(new Date()),
    () => "",
  );
  return (
    <p className="mt-6 text-sm text-white/60">
      {time ? (
        <>
          It is <span className="tabular-nums text-white">{time}</span>{" "}
          in Lagos right now
        </>
      ) : (
        "Based in Lagos, GMT+1"
      )}
    </p>
  );
}

function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group/t flex items-center gap-2.5 uppercase tracking-[0.2em] transition-colors hover:text-white"
    >
      Back to top
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors group-hover/t:border-accent group-hover/t:bg-accent group-hover/t:text-accent-ink">
        <Arrow className="h-3.5 w-3.5 -rotate-90 transition-[translate] duration-300 group-hover/t:-translate-y-0.5" />
      </span>
    </button>
  );
}

/**
 * The name, sized to the exact width of the sheet. One line on wide
 * screens, two on phones. Letters rise into place in a wave as the footer
 * comes into view, and each one lifts a touch under the pointer.
 */
function BigName({ text }: { text: string }) {
  const lines = text.toUpperCase().split(" ");
  return (
    <div aria-hidden className="mt-16 select-none md:mt-24">
      <FitLines lines={[lines.join(" ")]} className="hidden md:block" />
      <FitLines lines={lines} className="md:hidden" />
      <span className="sr-only">{text}</span>
    </div>
  );
}

function FitLines({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Font size as a share of the box width. A close estimate renders first,
  // then the real one is measured once the heading font is in.
  const [ratio, setRatio] = useState(lines.length > 1 ? 0.19 : 0.1);

  // Fitted from the rendered letters themselves rather than predicted:
  // a prediction made before the heading font arrives is made with the
  // fallback font, and the line then overran once Acorn loaded. Re-fits
  // when fonts finish loading and when the box changes size (including
  // the moment this copy appears at its breakpoint).
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let lastWidth = -1;
    const fit = () => {
      const rows = Array.from(el.children) as HTMLElement[];
      if (!rows.length || el.clientWidth === 0) return;
      const fontSize = parseFloat(getComputedStyle(rows[0]).fontSize);
      const natural = Math.max(
        ...rows.map((row) =>
          Array.from(row.children).reduce(
            // Fractional widths: whole-pixel offsetWidth rounded differently
            // at each size and kept the fit from ever settling.
            (sum, c) => sum + c.getBoundingClientRect().width,
            0,
          ),
        ),
      );
      if (!fontSize || !natural) return;
      // Width per px of font, then the size that fills the box with a hair
      // of slack so rounding never clips the last letter.
      const perPx = natural / fontSize;
      const next = 0.985 / perPx;
      // Ignore changes too small to see, so a re-fit can never feed itself.
      setRatio((prev) => (Math.abs(next - prev) / prev < 0.004 ? prev : next));
    };
    document.fonts.ready.then(fit);
    document.fonts.addEventListener("loadingdone", fit);
    // Width only: re-fitting changes the text height, and reacting to that
    // made the name re-fit itself in a loop, which showed as a shimmer.
    const ro = new ResizeObserver(() => {
      if (el.clientWidth === lastWidth) return;
      lastWidth = el.clientWidth;
      fit();
    });
    ro.observe(el);
    return () => {
      document.fonts.removeEventListener("loadingdone", fit);
      ro.disconnect();
    };
  }, []);

  let n = 0; // running letter index, for the stagger across lines
  return (
    <div
      ref={box}
      className={`font-heading font-bold uppercase leading-[0.8] tracking-[-0.045em] [container-type:inline-size] ${className ?? ""}`}
    >
      {lines.map((line) => (
        <motion.div
          key={line}
          className="flex overflow-hidden pb-[0.06em] pt-[0.04em]"
          style={{ fontSize: `${ratio * 100}cqi` } as CSSProperties}
          initial={reduce ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
        >
          {line.split("").map((ch, i) => {
            const k = n++;
            return ch === " " ? (
              <span
                key={i}
                className="shrink-0"
                style={{ width: `${GAP_EM}em` }}
              />
            ) : (
              <motion.span
                key={i}
                className="inline-block shrink-0"
                variants={{
                  hidden: { y: "105%" },
                  shown: {
                    y: "0%",
                    transition: { duration: 1, ease, delay: k * 0.035 },
                  },
                }}
                whileHover={{
                  y: "-7%",
                  color: "var(--accent)",
                  transition: { type: "spring", stiffness: 400, damping: 18 },
                }}
              >
                {ch}
              </motion.span>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
      <rect x="5" y="5" width="8.5" height="8.5" rx="1.75" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 10.5V3.75C3 3.34 3.34 3 3.75 3h6.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function Tick() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
