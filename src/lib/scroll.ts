"use client";

import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

/** Space the floating header occupies, so anchors do not land under it. */
const HEADER_OFFSET = 96;

/**
 * Scrolls to a section through Lenis when it is running, and falls back to the
 * platform otherwise — reduced-motion visitors never get a Lenis instance.
 */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (instance) {
    instance.scrollTo(target, { offset: -HEADER_OFFSET, duration: 1.1 });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}
