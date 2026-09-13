"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, REVEAL_HOOKS, ScrollTrigger } from "@/lib/animations";
import { setLenis } from "@/lib/scroll";

/**
 * Reveals anything that is on screen but still hidden.
 *
 * Animated elements start at opacity 0, so a ScrollTrigger that never fires —
 * stale measurements after late-loading images, a tab restored mid-page, a
 * throttled frame loop in a background tab — would leave a section permanently
 * blank. Content losing its entrance animation is a far better failure than
 * content the visitor never sees.
 */
function revealStranded() {
  const viewportHeight = window.innerHeight;

  document.querySelectorAll<HTMLElement>(REVEAL_HOOKS).forEach((element) => {
    if (getComputedStyle(element).opacity !== "0") return;

    const rect = element.getBoundingClientRect();
    const onScreen = rect.top < viewportHeight && rect.bottom > 0;
    if (onScreen) gsap.set(element, { opacity: 1, x: 0, y: 0, clearProps: "transform" });
  });
}

/**
 * Lenis drives the page, GSAP's ticker drives Lenis, and ScrollTrigger updates
 * off Lenis' scroll event. One clock, so pinned and scrubbed animations cannot
 * drift out of step with the smoothed scroll position.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();
    document.documentElement.classList.add("gsap-ready");

    const refresh = () => ScrollTrigger.refresh();
    const sweeps = [
      window.setTimeout(revealStranded, 2600),
      window.setTimeout(revealStranded, 6000),
    ];

    // And again whenever scrolling settles, so a section further down the page
    // cannot be stranded either.
    let settle = 0;
    const onNativeScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(revealStranded, 1200);
    };
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    // Images and webfonts change layout after hydration; triggers measured
    // before that point are pointing at the wrong offsets.
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      refresh();

      return () => {
        sweeps.forEach(window.clearTimeout);
        window.clearTimeout(settle);
        window.removeEventListener("scroll", onNativeScroll);
        window.removeEventListener("load", refresh);
        document.documentElement.classList.remove("gsap-ready");
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch beats an emulated one every time.
      syncTouch: false,
    });

    setLenis(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    refresh();

    return () => {
      sweeps.forEach(window.clearTimeout);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenis(null);
      document.documentElement.classList.remove("gsap-ready");
    };
  }, []);

  return <>{children}</>;
}
