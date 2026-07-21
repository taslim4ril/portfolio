import { services } from "@/lib/data";

export default function Marquee() {
  const words = [
    "Product Design",
    "UI Design",
    "UX Research",
    "Design Systems",
    "No-code",
    "Prototyping",
  ];
  void services;
  const items = [...words, ...words];

  return (
    <div className="relative flex overflow-hidden border-y border-border bg-surface py-5">
      <div className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap pr-8">
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="heading text-2xl font-medium text-foreground/80 md:text-3xl">
              {w}
            </span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
