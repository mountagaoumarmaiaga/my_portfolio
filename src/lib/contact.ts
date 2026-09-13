"use client";

import type { ContactErrorKey, ContactInput } from "./contact-schema";

export type SendResult = { ok: true } | { ok: false; error: ContactErrorKey };

const GENERIC_ERROR: ContactErrorKey = "generic";

/**
 * Sends through the server route first — that is where a real provider key
 * belongs. If no provider is configured there, falls back to EmailJS, which is
 * public-key by design and safe in the browser. Either way, nothing secret ships
 * to the client.
 */
export async function sendContactMessage(input: ContactInput): Promise<SendResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (response.ok) return { ok: true };

    const body = (await response.json().catch(() => null)) as
      | { error?: ContactErrorKey; configured?: boolean }
      | null;

    if (body?.configured === false) return sendViaEmailJs(input);

    return { ok: false, error: body?.error ?? GENERIC_ERROR };
  } catch {
    return sendViaEmailJs(input);
  }
}

async function sendViaEmailJs(input: ContactInput): Promise<SendResult> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    // Imported lazily so the SDK never lands in the initial bundle.
    const emailjs = (await import("@emailjs/browser")).default;

    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: input.name,
        from_email: input.email,
        company: input.company || "—",
        message: input.message,
        reply_to: input.email,
      },
      publicKey,
    );

    return { ok: true };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}
