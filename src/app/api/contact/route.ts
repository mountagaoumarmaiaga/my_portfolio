import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { acknowledgementEmail, enquiryEmail, type EmailContent } from "@/lib/emails";
import { site } from "@/data/site";

export const runtime = "nodejs";

/**
 * Errors are returned as keys into the copy dictionary — the server does not
 * decide which language the visitor reads.
 *
 * Naive per-instance throttle. Enough to blunt a script; a serious deployment
 * behind multiple instances should move this to a shared store.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 4;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 500) hits.clear();

  return recent.length > MAX_PER_WINDOW;
}

interface SendOptions {
  apiKey: string;
  from: string;
  to: string;
  replyTo?: string;
  email: EmailContent;
}

async function send({ apiKey, from, to, replyTo, email }: SendOptions) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject: email.subject,
      html: email.html,
      // Clients that strip HTML, and spam filters, both read this instead.
      text: email.text,
    }),
  });

  if (!response.ok) {
    // Never surface the provider's body — it can name the key's scope.
    throw new Error(`resend ${response.status}`);
  }
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "malformed" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "fields", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot filled in: accept silently so the bot learns nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "tooMany" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No provider wired up yet: say so explicitly so the client can fall back to
  // EmailJS rather than telling the visitor the message was sent.
  if (!apiKey) {
    return NextResponse.json({ ok: false, configured: false }, { status: 501 });
  }

  // Resend allows `onboarding@resend.dev` before a domain is verified, so the
  // form works from the first key without any DNS being set up.
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const lang = parsed.data.lang === "en" ? "en" : "fr";

  try {
    // The one that matters. Reply-To is the sender, so hitting Reply in the
    // inbox answers the person rather than the robot.
    await send({
      apiKey,
      from,
      to,
      replyTo: parsed.data.email,
      email: enquiryEmail(parsed.data),
    });
  } catch (error) {
    console.error("contact: enquiry email failed", error);
    return NextResponse.json({ ok: false, error: "notSent" }, { status: 502 });
  }

  // Best effort only. Until a domain is verified, Resend will refuse to send to
  // anyone but the account owner, and a bounced courtesy note is no reason to
  // tell the visitor their message failed — it did not.
  try {
    await send({
      apiKey,
      from,
      to: parsed.data.email,
      replyTo: to,
      email: acknowledgementEmail(parsed.data, lang),
    });
  } catch (error) {
    console.warn("contact: acknowledgement not delivered", error);
  }

  return NextResponse.json({ ok: true });
}
