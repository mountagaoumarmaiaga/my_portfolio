"use client";

import { useCopy } from "@/hooks/useCopy";

export default function SkipLink() {
  const { c } = useCopy();

  return (
    <a
      href="#profile"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-sm focus:bg-mali-green focus:px-4 focus:py-2 focus:text-sm focus:text-void"
    >
      {c.nav.skipToContent}
    </a>
  );
}
