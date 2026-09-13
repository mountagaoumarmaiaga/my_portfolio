"use client";

import { useEffect, useRef } from "react";
import { registerGlobeAnchor } from "@/lib/globe-director";

/**
 * Marks a point that should be visibly wired to the globe.
 *
 * It renders a small node where it sits and registers itself with the director;
 * `GlobeTether` draws the line. Purely decorative, so it stays out of the
 * accessibility tree — the relationship it draws is also stated in the copy.
 */
export default function GlobeAnchor({
  sectionId,
  className,
  side = "right",
}: {
  sectionId: string;
  className?: string;
  side?: "left" | "right";
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return registerGlobeAnchor(sectionId, ref.current);
  }, [sectionId]);

  return (
    <span
      ref={ref}
      data-anchor-side={side}
      aria-hidden="true"
      className={`pointer-events-none inline-block h-[5px] w-[5px] rounded-full bg-mali-green/70 ${className ?? ""}`}
    />
  );
}
