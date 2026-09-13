import type { ContactInput } from "./contact-schema";
import type { Lang } from "./i18n";
import { site } from "@/data/site";

/**
 * Email templates.
 *
 * Written the way email actually renders, not the way a page does: tables for
 * layout, every style inline, no flexbox, no grid, no external images, and a
 * plain-text alternative for every message — clients that strip HTML, screen
 * readers, and spam filters all read that instead.
 */

const BG = "#050608";
const PANEL = "#0c0f15";
const HAIRLINE = "#1d222c";
const INK = "#f4f5f7";
const MUTED = "#b0b3b8";
const FAINT = "#8b8e94";
const GREEN = "#14b45c";

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

/** Escapes anything a stranger typed before it goes anywhere near an HTML string. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keeps the visitor's line breaks without letting their markup through. */
function paragraphs(value: string): string {
  return escapeHtml(value)
    .split(/\n{2,}/)
    .map(
      (block) =>
        `<p style="margin:0 0 14px;color:${INK};font-size:15px;line-height:1.65;">${block.replace(/\n/g, "<br />")}</p>`,
    )
    .join("");
}

/**
 * The shell every message sits in. `preheader` is the line inboxes show beside
 * the subject; left empty it would leak whatever text came first.
 */
function layout({
  title,
  preheader,
  body,
  footnote,
}: {
  title: string;
  preheader: string;
  body: string;
  footnote: string;
}): string {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="dark light" />
<meta name="supported-color-schemes" content="dark light" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BG};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BG};">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${PANEL};border:1px solid ${HAIRLINE};border-radius:14px;overflow:hidden;">

          <!-- A rule rather than a logo: no image to block, no alt text to miss. -->
          <tr><td style="height:3px;background:${GREEN};font-size:0;line-height:0;">&nbsp;</td></tr>

          <tr>
            <td style="padding:26px 30px 0;">
              <p style="margin:0;font-family:${MONO};font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:${FAINT};">
                ${escapeHtml(site.name)}
              </p>
              <p style="margin:5px 0 0;font-family:${MONO};font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:${FAINT};">
                Bamako, Mali &middot; 12,6392&deg; N 8,0029&deg; O
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 30px 0;">
              <h1 style="margin:0;font-family:${FONT};font-size:24px;line-height:1.25;font-weight:600;letter-spacing:-.01em;color:${INK};">
                ${escapeHtml(title)}
              </h1>
            </td>
          </tr>

          <tr><td style="padding:20px 30px 0;font-family:${FONT};">${body}</td></tr>

          <tr>
            <td style="padding:26px 30px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="height:1px;background:${HAIRLINE};font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>
              <p style="margin:16px 0 0;font-family:${MONO};font-size:10px;line-height:1.7;letter-spacing:.08em;text-transform:uppercase;color:${FAINT};">
                ${footnote}
              </p>
            </td>
          </tr>
        </table>

        <p style="margin:18px 0 0;font-family:${MONO};font-size:10px;letter-spacing:.1em;color:#5f6369;">
          ${escapeHtml(site.url.replace(/^https?:\/\//, ""))}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** One label/value row of the detail table. */
function detailRow(label: string, value: string, isLink = false): string {
  const rendered = isLink
    ? `<a href="mailto:${escapeHtml(value)}" style="color:${GREEN};text-decoration:none;">${escapeHtml(value)}</a>`
    : escapeHtml(value);

  return `<tr>
    <td style="padding:9px 0;border-bottom:1px solid ${HAIRLINE};font-family:${MONO};font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${FAINT};white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:9px 0 9px 20px;border-bottom:1px solid ${HAIRLINE};font-family:${FONT};font-size:14px;color:${INK};text-align:right;">${rendered}</td>
  </tr>`;
}

/**
 * What lands in Mountaga's inbox. `replyTo` is set to the sender on the send
 * itself, so hitting Reply answers the person rather than the robot.
 */
export function enquiryEmail(input: ContactInput): EmailContent {
  const company = input.company?.trim();

  const body = `
    <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:${MUTED};">
      Nouveau message envoy&eacute; depuis le formulaire du portfolio.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;">
      ${detailRow("Nom", input.name)}
      ${detailRow("Email", input.email, true)}
      ${company ? detailRow("Entreprise", company) : ""}
    </table>

    <p style="margin:0 0 10px;font-family:${MONO};font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${FAINT};">Message</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:18px 20px;background:${BG};border:1px solid ${HAIRLINE};border-radius:10px;">
          ${paragraphs(input.message)}
        </td>
      </tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 0;">
      <tr>
        <td style="border-radius:8px;background:${GREEN};">
          <a href="mailto:${escapeHtml(input.email)}?subject=${encodeURIComponent("Re: votre message")}"
             style="display:inline-block;padding:12px 22px;font-family:${FONT};font-size:14px;font-weight:600;color:${BG};text-decoration:none;">
            R&eacute;pondre &agrave; ${escapeHtml(input.name)}
          </a>
        </td>
      </tr>
    </table>`;

  const text = [
    `Nouveau message depuis le portfolio`,
    ``,
    `Nom      : ${input.name}`,
    `Email    : ${input.email}`,
    company ? `Entreprise : ${company}` : null,
    ``,
    `Message :`,
    input.message,
    ``,
    `—`,
    `Répondez directement à cet email pour joindre ${input.name}.`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return {
    subject: `Portfolio — ${input.name}${company ? ` (${company})` : ""}`,
    html: layout({
      title: `Message de ${input.name}`,
      preheader: input.message.slice(0, 110),
      body,
      footnote: "R&eacute;pondez directement &agrave; cet email &mdash; il part vers l'exp&eacute;diteur.",
    }),
    text,
  };
}

/** The courtesy note back to whoever wrote in, in the language they used. */
export function acknowledgementEmail(input: ContactInput, lang: Lang): EmailContent {
  const fr = lang === "fr";

  const body = `
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${INK};">
      ${fr ? `Bonjour ${escapeHtml(input.name)},` : `Hi ${escapeHtml(input.name)},`}
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${MUTED};">
      ${
        fr
          ? "Merci pour votre message — il est bien arriv&eacute;. Je lis chaque message moi-m&ecirc;me et je r&eacute;ponds en moins de 24 heures."
          : "Thank you for your message — it arrived safely. I read every message myself and reply within 24 hours."
      }
    </p>

    <p style="margin:24px 0 10px;font-family:${MONO};font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${FAINT};">
      ${fr ? "Votre message" : "Your message"}
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:18px 20px;background:${BG};border:1px solid ${HAIRLINE};border-radius:10px;">
          ${paragraphs(input.message)}
        </td>
      </tr>
    </table>

    <p style="margin:22px 0 0;font-size:14px;line-height:1.65;color:${MUTED};">
      ${
        fr
          ? "En attendant, mes projets et mon parcours sont sur le portfolio."
          : "In the meantime, my work and background are on the portfolio."
      }
      <a href="${escapeHtml(site.url)}" style="color:${GREEN};text-decoration:none;">${escapeHtml(site.url.replace(/^https?:\/\//, ""))}</a>
    </p>

    <p style="margin:22px 0 0;font-size:15px;line-height:1.65;color:${INK};">
      ${fr ? "&Agrave; bient&ocirc;t," : "Talk soon,"}<br />
      <strong style="font-weight:600;">${escapeHtml(site.name)}</strong>
    </p>`;

  const text = [
    fr ? `Bonjour ${input.name},` : `Hi ${input.name},`,
    ``,
    fr
      ? `Merci pour votre message — il est bien arrivé. Je lis chaque message moi-même et je réponds en moins de 24 heures.`
      : `Thank you for your message — it arrived safely. I read every message myself and reply within 24 hours.`,
    ``,
    fr ? `Votre message :` : `Your message:`,
    input.message,
    ``,
    site.url,
    ``,
    fr ? `À bientôt,` : `Talk soon,`,
    site.name,
  ].join("\n");

  return {
    subject: fr
      ? "Merci — votre message est bien arrivé"
      : "Thank you — your message came through",
    html: layout({
      title: fr ? "Message bien re&ccedil;u" : "Message received",
      preheader: fr
        ? "Merci — je reviens vers vous en moins de 24 heures."
        : "Thank you — I will get back to you within 24 hours.",
      body,
      footnote: fr
        ? "Message automatique &mdash; vous pouvez y r&eacute;pondre, il m'arrivera."
        : "Automatic message &mdash; you can reply to it, it reaches me.",
    }),
    text,
  };
}
