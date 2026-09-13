import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "green" | "gold";

const tones: Record<Tone, string> = {
  neutral: "border-hairline bg-white/[0.03] text-ink-muted",
  green: "border-mali-green/25 bg-mali-green/10 text-mali-greenSoft",
  gold: "border-mali-gold/25 bg-mali-gold/10 text-mali-goldSoft",
};

export default function Badge({
  children,
  tone = "neutral",
  className,
  dot = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-label",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1 w-1 shrink-0 rounded-full",
            tone === "gold" ? "bg-mali-gold" : tone === "green" ? "bg-mali-green" : "bg-ink-faint",
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
