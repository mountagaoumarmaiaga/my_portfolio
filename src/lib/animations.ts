"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
  return gsap;
}

/**
 * Every attribute a scroll animation hides an element behind. The safety sweep
 * in `SmoothScroll` reads this, so a new hook is covered the moment it is added
 * here — the failure it guards against is a section that never becomes visible.
 *
 * `data-hero-line` is deliberately absent: the hero reveals off its own `ready`
 * flag, not off scroll position, and it has its own guard.
 */
export const REVEAL_HOOKS = "[data-animate], [data-stage], [data-milestone-part], [data-hero-fade]";

export const EASE = {
  out: "power3.out",
  inOut: "power3.inOut",
  cinematic: "power2.inOut",
} as const;

export const DURATION = {
  fast: 0.5,
  base: 0.9,
  slow: 1.25,
} as const;

export interface RevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}

/**
 * Scroll-reveals one or more elements. Elements carry `data-animate`, which CSS
 * hides only after `gsap-ready` lands on <html> — so a JS failure can never
 * leave the page invisible.
 */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  { y = 28, x = 0, scale, duration = DURATION.base, delay = 0, stagger = 0.08, start = "top 82%", once = true }: RevealOptions = {},
) {
  const g = registerGsap();
  const elements = gsap.utils.toArray<HTMLElement>(targets as gsap.DOMTarget);
  if (!elements.length) return;

  // Reduced motion keeps the CSS `opacity: 1 !important` rule in charge; there
  // is no point building triggers whose output would be overridden anyway.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  return g.fromTo(
    elements,
    { opacity: 0, y, x, scale: scale ?? 1 },
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: EASE.out,
      scrollTrigger: { trigger: elements[0], start, once, toggleActions: "play none none none" },
    },
  );
}

/** Makes everything visible immediately — the reduced-motion path. */
export function revealInstantly(root: HTMLElement | null) {
  if (!root) return;
  gsap.set(root.querySelectorAll("[data-animate]"), { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform" });
}

export { gsap, ScrollTrigger };
