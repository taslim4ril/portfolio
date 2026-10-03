import { site } from "@/lib/data";

/**
 * Contact form endpoint. Sends the message to the site owner through
 * Resend (https://resend.com) when RESEND_API_KEY is set in the deployment's
 * environment. Without it, answers 503 with `configured: false`, and the
 * form falls back to opening the visitor's mail app with the message
 * written out, so nothing is lost either way.
 */

type Payload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown; // honeypot: real people never see or fill it
};

const text = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // A filled honeypot is a bot. Answer as if it worked and drop it.
  if (text(body.website, 200)) return Response.json({ ok: true });

  const name = text(body.name, 120);
  const company = text(body.company, 120);
  const email = text(body.email, 200);
  const message = text(body.message, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Name, a valid email and a message are required." },
      { status: 422 },
    );
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return Response.json({ configured: false }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Resend's shared sender works without a verified domain. Swap for an
      // address on your own domain once one is verified there.
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [site.email],
      reply_to: email,
      subject: `New message from ${name}${company ? `, ${company}` : ""}`,
      text: [
        `Name: ${name}`,
        ...(company ? [`Company: ${company}`] : []),
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "Could not send right now." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
