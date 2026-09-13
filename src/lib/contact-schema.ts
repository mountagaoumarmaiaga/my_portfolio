import { z } from "zod";

/**
 * Shared by the form and the API route so the two can never disagree.
 *
 * Messages are keys, not sentences: the server has no business deciding which
 * language the visitor reads, so it names the problem and the client says it.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(120, "nameLong"),
  email: z.string().trim().min(1, "email").email("emailInvalid"),
  company: z.string().trim().max(160, "companyLong").optional().or(z.literal("")),
  message: z.string().trim().min(10, "message").max(4000, "messageLong"),
  /**
   * Honeypot. It has to VALIDATE, not reject: a bot that gets a 422 learns the
   * field is a trap, and a rejection here would surface an error on a field no
   * real visitor can even see. The route accepts and drops it instead.
   */
  website: z.string().max(300).optional(),
  /** Which language the visitor was reading, so the reply matches. */
  lang: z.enum(["fr", "en"]).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Keys into the `errors` block of the copy dictionary. */
export type ContactErrorKey =
  | "name"
  | "nameLong"
  | "email"
  | "emailInvalid"
  | "companyLong"
  | "message"
  | "messageLong"
  | "generic"
  | "tooMany"
  | "malformed"
  | "fields"
  | "notSent";

export type ContactFieldErrors = Partial<Record<keyof ContactInput, ContactErrorKey>>;

export function validateContact(input: ContactInput): ContactFieldErrors {
  const result = contactSchema.safeParse(input);
  if (result.success) return {};

  const errors: ContactFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ContactInput;
    if (field && !errors[field]) errors[field] = issue.message as ContactErrorKey;
  }

  return errors;
}
