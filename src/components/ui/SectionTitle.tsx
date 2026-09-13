import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  /** Two-digit section marker, e.g. "03". Paired with a label, never alone. */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col gap-6", align === "center" && "items-center text-center", className)}>
      <div className="flex items-center gap-3" data-animate>
        {index && <span className="font-mono text-[10px] tracking-label text-mali-green">{index}</span>}
        <span className="h-px w-8 bg-hairline-strong" aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
      </div>

      <h2
        className={cn(
          "display text-balance text-[clamp(2.1rem,5.2vw,3.9rem)]",
          align === "center" && "mx-auto max-w-3xl",
        )}
        data-animate
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "max-w-xl text-pretty text-[15px] leading-relaxed text-ink-muted",
            align === "center" && "mx-auto",
          )}
          data-animate
        >
          {description}
        </p>
      )}
    </div>
  );
}
