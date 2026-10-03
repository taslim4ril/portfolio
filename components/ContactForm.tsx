"use client";

import { useId, useState, type FormEvent } from "react";
import { site } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";
type Fields = { name: string; company: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", company: "", email: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Add your name so I know who to reply to.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "That email doesn't look right.";
  if (f.message.trim().length < 10)
    e.message = "A sentence or two is enough, but say a little more.";
  return e;
}

/** The message written out as an email, for the mail-app fallback. */
function mailtoFor(f: Fields) {
  const subject = `Hello from ${f.name.trim()}${f.company.trim() ? `, ${f.company.trim()}` : ""}`;
  const body = `${f.message.trim()}\n\n${f.name.trim()}${f.company.trim() ? `\n${f.company.trim()}` : ""}\n${f.email.trim()}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Contact form: name, optional company, email and message. Validates inline
 * as fields are left and on submit, posts to /api/contact, and if sending
 * isn't set up on the server it opens the visitor's mail app with the
 * message already written, so nothing typed is ever lost.
 */
export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof Fields) => (v: string) => {
    const next = { ...fields, [k]: v };
    setFields(next);
    // Once a field has been left, keep its message in step with typing so
    // an error clears the moment it's fixed.
    if (touched[k]) setErrors(validate(next));
  };
  const leave = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(fields));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    const honeypot = (
      e.currentTarget.elements.namedItem("website") as HTMLInputElement | null
    )?.value;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website: honeypot }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (res.status === 503 && data.configured === false) {
        window.location.href = mailtoFor(fields);
        setStatus("mailto");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div className="flex min-h-[28rem] flex-col items-start justify-center" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink">
          <svg aria-hidden viewBox="0 0 16 16" fill="none" className="h-6 w-6">
            <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="heading mt-8 text-3xl font-bold text-white md:text-4xl">
          {status === "sent" ? "Message sent." : "Almost there."}
        </h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
          {status === "sent"
            ? `Thanks, ${fields.name.trim().split(" ")[0]}. I read every message and will reply to ${fields.email.trim()}.`
            : "Your mail app should have opened with the message ready. Press send there and it comes straight to me."}
        </p>
        {status === "mailto" && (
          <a
            href={mailtoFor(fields)}
            className="mt-6 text-base text-white underline underline-offset-4 hover:text-accent"
          >
            Didn&apos;t open? Try again
          </a>
        )}
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY);
            setErrors({});
            setTouched({});
            setStatus("idle");
          }}
          className="mt-10 text-sm uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
        >
          Write another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          value={fields.name}
          onChange={set("name")}
          onBlur={leave("name")}
          error={touched.name ? errors.name : undefined}
          placeholder="Your name"
          autoComplete="name"
        />
        <Field
          id="company"
          label="Company"
          optional
          value={fields.company}
          onChange={set("company")}
          placeholder="Where you work"
          autoComplete="organization"
        />
      </div>
      <Field
        id="email"
        label="Email"
        type="email"
        value={fields.email}
        onChange={set("email")}
        onBlur={leave("email")}
        error={touched.email ? errors.email : undefined}
        placeholder="you@company.com"
        autoComplete="email"
        helper="Only used to reply to you."
      />
      <Field
        id="message"
        label="Message"
        multiline
        value={fields.message}
        onChange={set("message")}
        onBlur={leave("message")}
        error={touched.message ? errors.message : undefined}
        placeholder="Hi Taslim, I'm working on..."
      />

      {/* Honeypot: hidden from people and screen readers, tempting to bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && (
        <p role="alert" className="rounded-2xl border border-red-400/30 bg-red-400/10 px-5 py-4 text-sm leading-relaxed text-red-200">
          That didn&apos;t send. Your message is still here, so try again, or{" "}
          <a href={mailtoFor(fields)} className="underline underline-offset-4 hover:text-white">
            send it from your mail app
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group relative isolate mt-2 inline-flex h-[3.625rem] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-accent text-sm font-medium uppercase tracking-[0.2em] text-accent-ink transition-[color,transform] duration-300 hover:text-accent active:scale-[0.99] disabled:cursor-progress disabled:opacity-80 disabled:hover:text-accent-ink"
      >
        {/* Same fill sweep as the site's solid buttons. */}
        <span
          aria-hidden
          className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-disabled:scale-x-0"
        />
        {sending ? "Sending" : "Send message"}
        {sending ? (
          <span className="flex gap-1" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-current"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </span>
        ) : (
          <svg aria-hidden viewBox="0 0 16 16" fill="none" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
            <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = "text",
  autoComplete,
  helper,
  optional,
  multiline,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  helper?: string;
  optional?: boolean;
  multiline?: boolean;
}) {
  const uid = useId();
  const inputId = `contact-${id}`;
  const noteId = `${uid}-note`;
  const cls = `w-full rounded-2xl border bg-background/60 px-5 py-4 text-base text-white placeholder:text-white/50 transition-[border-color,box-shadow] duration-200 focus:outline-none focus-visible:outline-none ${
    error
      ? "border-red-400/70 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.15)]"
      : "border-white/15 hover:border-white/25 focus:border-accent focus:shadow-[0_0_0_4px_rgba(251,146,60,0.15)]"
  }`;
  const shared = {
    id: inputId,
    name: id,
    value,
    placeholder,
    autoComplete,
    required: !optional,
    "aria-invalid": Boolean(error),
    "aria-describedby": error || helper ? noteId : undefined,
    onBlur,
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="flex items-baseline gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
        {label}
        {optional && (
          <span className="text-xs normal-case tracking-normal text-white/45">
            optional
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          rows={5}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} min-h-[9rem] resize-y leading-relaxed`}
        />
      ) : (
        <input
          {...shared}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
      {(error || helper) && (
        <p id={noteId} className={`text-sm ${error ? "text-red-300" : "text-white/50"}`}>
          {error ?? helper}
        </p>
      )}
    </div>
  );
}
