"use client";

import { useEffect } from "react";
import { GLOBE_STOPS, setGlobeStop } from "@/lib/globe-director";

/** Throttle for the scroll handler, in ms. Fast enough to feel immediate. */
const INTERVAL = 90;

/**
 * Binds every section to its globe framing.
 *
 * Nothing visual of its own — it is the wiring that lets a section claim the
 * globe on the way past, in either scroll direction, without any section needing
 * to know the globe exists.
 *
 * It measures on a throttled scroll event rather than using ScrollTrigger or an
 * IntersectionObserver, because both of those are delivered inside the browser's
 * rendering step. This runs off the event and a timer, so the globe still follows
 * the reader in the cases where frames are being withheld — a backgrounded tab
 * being restored, a deep link landing mid-page — and it re-measures from live
 * rects, so a section changing height underneath it fixes itself.
 */
export default function SectionGlobeSync() {
  useEffect(() => {
    const sections = GLOBE_STOPS.map((stop) => document.getElementById(stop.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );

    if (!sections.length) return;

    let scheduled = 0;

    const pick = () => {
      scheduled = 0;

      const middle = window.innerHeight / 2;
      let winner: string | null = null;
      let closest = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect();

        // Whatever covers the middle of the viewport wins outright; in the gaps
        // between sections, the nearest edge takes it so there is never a moment
        // with no stop selected.
        const distance =
          top <= middle && bottom >= middle
            ? 0
            : Math.min(Math.abs(top - middle), Math.abs(bottom - middle));

        if (distance < closest) {
          closest = distance;
          winner = section.id;
        }
      }

      if (winner) setGlobeStop(winner);
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = window.setTimeout(pick, INTERVAL);
    };

    pick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.clearTimeout(scheduled);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
