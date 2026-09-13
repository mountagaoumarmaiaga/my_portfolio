"use client";

import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ArrowRight } from "@/components/ui/Button";
import { useCopy } from "@/hooks/useCopy";
import { sendContactMessage } from "@/lib/contact";
import {
  validateContact,
  type ContactErrorKey,
  type ContactFieldErrors,
  type ContactInput,
} from "@/lib/contact-schema";

type Status = "idle" | "sending" | "success" | "error";

const EMPTY: ContactInput = { name: "", email: "", company: "", message: "", website: "" };

const fieldClass =
  "w-full rounded-sm border border-hairline bg-white/[0.02] px-3.5 py-3 text-[14px] text-ink " +
  "placeholder:text-ink-ghost transition-colors duration-300 hover:border-hairline-strong " +
  "focus:border-mali-green focus:outline-none aria-[invalid=true]:border-red-400/60";

export default function ContactForm() {
  const uid = useId();
  const { lang, c } = useCopy();
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<ContactErrorKey | null>(null);

  const fieldId = (field: keyof ContactInput) => uid + "-" + field;
  const errorId = (field: keyof ContactInput) =>
    errors[field] ? uid + "-" + field + "-error" : undefined;

  const update =
    (field: keyof ContactInput) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      // Clear the error as soon as the visitor starts fixing it.
      if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    const invalid = Object.keys(nextErrors)[0] as keyof ContactInput | undefined;
    if (invalid) {
      // Move focus to the first problem so a keyboard user is not left hunting.
      document.getElementById(fieldId(invalid))?.focus();
      return;
    }

    setStatus("sending");
    const result = await sendContactMessage({ ...values, lang });

    if (result.ok) {
      setStatus("success");
      setValues(EMPTY);
      return;
    }

    setStatus("error");
    setFormError(result.error);
  };

  if (status === "success") {
    return (
      <div className="surface flex flex-col items-start gap-4 p-8" role="status" aria-live="polite">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-mali-green/30 bg-mali-green/10">
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 text-mali-green"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="m3 8.5 3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <div>
          <p className="text-lg font-medium">{c.contact.form.successTitle}</p>
          <p className="mt-1.5 text-sm text-ink-muted">{c.contact.form.successBody}</p>
        </div>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="group/btn inline-flex items-center gap-2 text-[13px] text-ink-muted transition-colors hover:text-ink"
        >
          {c.contact.form.sendAnother}
          <ArrowRight />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="surface flex flex-col gap-5 p-6 md:p-8">
      {/* Honeypot: visually gone and hidden from assistive tech, so only bots fill it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={fieldId("website")}>{c.contact.form.website}</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update("website")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          id={fieldId("name")}
          label={c.contact.form.name}
          required
          requiredNote={c.contact.form.required}
          error={errors.name && c.errors[errors.name]}
          errorId={errorId("name")}
        >
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            placeholder={c.contact.form.namePlaceholder}
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errorId("name")}
            required
          />
        </Field>

        <Field
          id={fieldId("email")}
          label={c.contact.form.email}
          required
          requiredNote={c.contact.form.required}
          error={errors.email && c.errors[errors.email]}
          errorId={errorId("email")}
        >
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            placeholder={c.contact.form.emailPlaceholder}
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errorId("email")}
            required
          />
        </Field>
      </div>

      <Field
        id={fieldId("company")}
        label={c.contact.form.company}
        optional={c.contact.form.optional}
        error={errors.company && c.errors[errors.company]}
        errorId={errorId("company")}
      >
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          autoComplete="organization"
          className={fieldClass}
          placeholder={c.contact.form.companyPlaceholder}
          value={values.company}
          onChange={update("company")}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errorId("company")}
        />
      </Field>

      <Field
        id={fieldId("message")}
        label={c.contact.form.message}
        required
        requiredNote={c.contact.form.required}
        error={errors.message && c.errors[errors.message]}
        errorId={errorId("message")}
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          className={fieldClass + " resize-y"}
          placeholder={c.contact.form.messagePlaceholder}
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errorId("message")}
          required
        />
      </Field>

      {formError && (
        <p
          className="rounded-sm border border-red-400/30 bg-red-400/[0.06] px-3.5 py-3 text-[13px] text-red-300"
          role="alert"
        >
          {c.errors[formError]}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group/btn inline-flex h-12 items-center justify-center gap-2.5 rounded-md bg-mali-green px-6 text-sm font-medium text-void transition-colors duration-300 ease-editorial hover:bg-mali-greenSoft disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "sending" ? c.contact.form.sending : c.contact.form.submit}
          {status === "sending" ? (
            <span
              className="h-3.5 w-3.5 animate-spin rounded-full border border-void/30 border-t-void"
              aria-hidden="true"
            />
          ) : (
            <ArrowRight />
          )}
        </button>

        <p className="text-[12px] text-ink-ghost">{c.contact.form.requiredNote}</p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  children,
  error,
  errorId,
  required = false,
  requiredNote,
  optional,
}: {
  id: string;
  label: string;
  children: ReactNode;
  error?: string;
  errorId?: string;
  required?: boolean;
  requiredNote?: string;
  optional?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow flex items-center gap-1.5">
        {label}
        {required && (
          <>
            <span className="text-mali-green" aria-hidden="true">
              *
            </span>
            <span className="sr-only">{requiredNote}</span>
          </>
        )}
        {optional && <span className="text-ink-ghost">{optional}</span>}
      </label>

      {children}

      {error && (
        <p id={errorId} role="alert" className="text-[12px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
