import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ScrambleHeading from "@/components/ScrambleHeading";
import Button, { CircleIcon } from "@/components/Button";
import SectionBadge from "@/components/SectionBadge";
import {
  disclosure,
  emptyStates,
  states,
  transitions,
  type StatusTone,
} from "@/lib/status-system";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: `Transaction status system | ${site.name}`,
  description:
    "Every state a transfer can be in, what moves it between them, and the gap between what the system knows and what a customer is allowed to be told.",
};

/** One dot per tone. Colour is never the only signal: each state carries its
 *  name in text beside it, so this reads the same to anyone. */
const TONE: Record<StatusTone, string> = {
  neutral: "bg-white/40",
  progress: "bg-accent",
  good: "bg-emerald-400",
  warn: "bg-amber-400",
  bad: "bg-rose-400",
};

function Section({
  lead,
  bold,
  children,
  intro,
}: {
  lead: string;
  bold: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 py-16 md:px-[100px] md:py-24">
      <Reveal>
        <ScrambleHeading
          lead={lead}
          bold={bold}
          className="heading text-3xl leading-none text-white sm:text-4xl md:text-5xl"
        />
      </Reveal>
      {intro && (
        <Reveal delay={0.05}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65">
            {intro}
          </p>
        </Reveal>
      )}
      <div className="mt-14">{children}</div>
    </section>
  );
}

export default function TransactionStatusPage() {
  const byId = Object.fromEntries(states.map((s) => [s.id, s]));
  const terminal = states.filter((s) => s.terminal).length;

  return (
    <>
      <Nav />
      <main className="relative bg-background">
        {/* ===== Intro ===== */}
        <section className="px-6 pb-8 pt-36 md:px-[100px] md:pt-44">
          <Reveal>
            <a
              href="/work/ibank"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
            >
              <span aria-hidden>←</span> Back to the i-Bank case study
            </a>
            <SectionBadge className="mb-6 block w-fit">
              Design system artifact
            </SectionBadge>
            <ScrambleHeading
              as="h1"
              lead="Transaction"
              bold="status"
              className="heading text-4xl leading-none text-white sm:text-5xl md:text-6xl"
            />
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65">
              The i-Bank case study argues that status is not a detail, it is
              the product. This is the thing that argument turns into.
            </p>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/65">
              Not one component with three variants. {states.length}{" "}
              states, most of them invisible on a happy path and every one of
              them eventually somebody&apos;s Tuesday.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {[
                { k: "States", v: String(states.length) },
                { k: "Transitions", v: String(transitions.length) },
                { k: "Terminal states", v: String(terminal) },
              ].map((f) => (
                <div key={f.k} className="bg-background px-6 py-7">
                  <dt className="text-sm text-muted">{f.k}</dt>
                  <dd className="heading mt-2 text-4xl font-bold text-accent">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* ===== 1. The states ===== */}
        <Section
          lead="The"
          bold="states"
          intro="Every state, the copy the customer actually sees in it, and what puts them there. The copy is the design here. A status screen is mostly a writing problem wearing a UI."
        >
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-2">
            {states.map((s) => (
              <Reveal key={s.id}>
                <article className="flex h-full flex-col bg-background p-7 md:p-9">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={`h-2 w-2 shrink-0 rounded-full ${TONE[s.tone]}`}
                    />
                    <h3 className="text-base font-medium text-white">
                      {s.name}
                    </h3>
                    {s.terminal && (
                      <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.15em] text-white/45">
                        Terminal
                      </span>
                    )}
                  </div>

                  {/* The component as the customer meets it. */}
                  <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full ${TONE[s.tone]}`}
                      />
                      <div>
                        <p className="text-[0.95rem] font-medium text-white">
                          {s.copy}
                        </p>
                        {s.detail && (
                          <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                            {s.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 text-[0.7rem] uppercase tracking-[0.18em] text-accent/80">
                    Trigger
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {s.trigger}
                  </p>

                  {s.note && (
                    <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed text-white/50">
                      {s.note}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ===== 2. Transitions ===== */}
        <Section
          lead="The"
          bold="transitions"
          intro="Which states can reach which, and what moves them. The row worth looking at is the last one: a reversal can arrive hours after a customer has been told the transfer completed, which is why Settled is not drawn as a finished state anywhere in the product."
        >
          {/* Wide content, so it scrolls inside its own container rather than
              pushing the page sideways. */}
          <div className="overflow-x-auto rounded-3xl border border-border">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-surface">
                  {["From", "On", "To"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-[0.7rem] uppercase tracking-[0.18em] text-white/45"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transitions.map((t, i) => (
                  <tr key={i} className="border-b border-border last:border-b-0">
                    <td className="px-6 py-4 align-top">
                      <span className="inline-flex items-center gap-2.5 text-sm text-white/85">
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full ${TONE[byId[t.from].tone]}`}
                        />
                        {byId[t.from].name}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-top text-sm text-white/50">
                      {t.on}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <span className="inline-flex items-center gap-2.5 text-sm text-white/85">
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full ${TONE[byId[t.to].tone]}`}
                        />
                        {byId[t.to].name}
                        {byId[t.to].terminal && (
                          <span className="text-[0.65rem] uppercase tracking-[0.15em] text-white/35">
                            terminal
                          </span>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ===== 3. Disclosure ===== */}
        <Section
          lead="What the customer"
          bold="is allowed to see"
          intro="The system knows more than it may say. Every row here is a place where the truth and the message come apart, and the reason is a compliance one before it is a design one. Arguing about that is not the job. Writing the honest version of what is left is."
        >
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border">
            {disclosure.map((d, i) => (
              <Reveal key={i}>
                <div className="grid gap-6 bg-background p-7 md:grid-cols-2 md:gap-10 md:p-9">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/40">
                      System state
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {d.system}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.18em] text-accent/80">
                      Surfaced to the customer
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white">
                      {d.surfaced}
                    </p>
                    <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-white/50">
                      {d.why}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ===== 4. Copy table ===== */}
        <Section
          lead="The"
          bold="copy table"
          intro="Every message in one place, which is the only way to catch the product contradicting itself. Reading them in a column is how you notice that four states were all saying processing."
        >
          <div className="overflow-x-auto rounded-3xl border border-border">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-surface">
                  {["State", "Message", "Second line"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-[0.7rem] uppercase tracking-[0.18em] text-white/45"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {states.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-b-0">
                    <td className="px-6 py-4 align-top text-sm text-white/60">
                      {s.name}
                    </td>
                    <td className="px-6 py-4 align-top text-sm font-medium text-white">
                      {s.copy}
                    </td>
                    <td className="px-6 py-4 align-top text-sm leading-relaxed text-white/55">
                      {s.detail ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Reveal>
            <h3 className="heading mt-16 text-2xl font-bold text-white md:text-3xl">
              And the empty states
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/60">
              Included because they belong to the same system. An empty state is
              a status message about your data rather than your money, and it
              fails the same way when nobody writes it on purpose.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {emptyStates.map((e) => (
              <Reveal key={e.screen}>
                <div className="h-full bg-background p-7">
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/40">
                    {e.screen}
                  </p>
                  <p className="mt-4 text-[0.95rem] font-medium text-white">
                    {e.copy}
                  </p>
                  <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-white/50">
                    {e.why}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ===== Out ===== */}
        <section className="px-6 pb-28 md:px-[100px]">
          <Reveal>
            <div className="border-t border-border pt-14">
              <p className="max-w-3xl text-lg leading-relaxed text-white/65">
                Most of this is invisible. A customer who only ever sends money
                on a Tuesday afternoon to a bank that is up will meet four of
                these {states.length} states and think the product is simple.
                That is the point. The other eight are what it costs to make it
                look that way.
              </p>
              <Button
                href="/work/ibank"
                size="lg"
                icon={<CircleIcon>→</CircleIcon>}
                className="mt-10"
              >
                Back to the case study
              </Button>
            </div>
          </Reveal>
        </section>

        <Footer />
      </main>
    </>
  );
}
