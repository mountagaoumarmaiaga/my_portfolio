"use client";

import type { GlobeStop } from "@/lib/globe-director";
import { useLang } from "@/lib/i18n";

interface GlobeHudProps {
  stop: GlobeStop;
  visible: boolean;
  isMobile: boolean;
}

/**
 * A caption pinned over the globe that names whatever the current section has
 * asked it to show. Without it the globe merely moves; with it, the movement is
 * legible — the page and the planet are visibly talking about the same thing.
 */
export default function GlobeHud({ stop, visible, isMobile }: GlobeHudProps) {
  const lang = useLang();

  // The frustum slides by `offsetX` of the viewport, so the planet's centre sits
  // at this fraction of the width. The caption tracks it.
  const left = `${(0.5 - stop.offsetX) * 100}%`;

  return (
    <div
      className={`pointer-events-none fixed z-20 -translate-x-1/2 transition-[left,opacity] duration-[1700ms] ease-editorial ${
        visible ? "opacity-100" : "opacity-0"
      } ${isMobile ? "top-[13vh]" : "top-[17vh]"}`}
      style={{ left }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-1.5 rounded-md border border-hairline bg-void/55 px-3.5 py-2 backdrop-blur-md">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-mali-greenSoft">
          <span className="h-1 w-1 rounded-full bg-mali-green" />
          {stop.caption[lang]}
        </p>
        <p className="font-mono text-[9px] uppercase tracking-label text-ink-faint">{stop.detail[lang]}</p>
      </div>
    </div>
  );
}
