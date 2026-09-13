"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks the pointer on `window` rather than on the canvas, so the globe can
 * keep `pointer-events: none` and never intercept a scroll or a click on the
 * hero copy sitting on top of it.
 */
export function usePointerParallax(enabled = true) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, [enabled]);

  return pointer;
}
