"use client";

import { LANGS, setLang, useLang } from "@/lib/i18n";
import { dictionary } from "@/data/copy";

/**
 * FR / EN. French is the default because that is the language this was written
 * in; the English exists because the work is aimed past the border.
 *
 * The inactive side is deliberately not whispered — a control nobody can read
 * is a control nobody uses.
 */
export default function LangToggle({ className }: { className?: string }) {
  const lang = useLang();

  return (
    <div
      className={`flex items-center gap-0.5 rounded-sm border border-hairline-strong p-0.5 ${className ?? ""}`}
      role="group"
      aria-label={dictionary[lang].nav.langLabel}
    >
      {LANGS.map((code) => {
        const selected = code === lang;

        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={selected}
            lang={code}
            className={`rounded-[4px] px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-label transition-colors duration-300 ${
              selected
                ? "bg-mali-green text-void"
                : "text-ink-muted hover:bg-white/[0.06] hover:text-ink"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
