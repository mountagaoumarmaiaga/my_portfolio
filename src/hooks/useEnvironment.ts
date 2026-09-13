"use client";

import { useEffect, useState } from "react";

/**
 * Matches a media query, SSR-safe (false until mounted on the client).
 *
 * It listens on `resize` as well as on the query itself: a `change` event can be
 * missed when it fires while the document is not being rendered, and the result
 * of that is a layout stuck on the wrong breakpoint until something else forces
 * a re-render. Re-reading `matches` on resize costs nothing and closes the gap.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const sync = () => setMatches(mql.matches);

    sync();
    mql.addEventListener("change", sync);
    window.addEventListener("resize", sync, { passive: true });

    return () => {
      mql.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, [query]);

  return matches;
}

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** True once we know the client can actually render the scene. */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setSupported(
        Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl"))),
      );
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
