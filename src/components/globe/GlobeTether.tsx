"use client";

import { useEffect, useRef } from "react";
import { anchorsFor, forViewport, getStop, useGlobeState } from "@/lib/globe-director";
import { apparentRadiusPx } from "@/lib/globe-config";

/** Enough for the longest section; anything past this simply is not drawn. */
const MAX_LINES = 10;
const INTERVAL = 90;

/**
 * Draws the relationship rather than implying it: curved lines from the cards a
 * section has anchored to the edge of the planet behind them, redrawn as the
 * page scrolls so they stay attached.
 *
 * Lives in the fixed globe layer, so every coordinate is already viewport space
 * and no transform has to be unwound.
 */
export default function GlobeTether({ isMobile }: { isMobile: boolean }) {
  const { stopId, phase, ready } = useGlobeState();
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const dotRefs = useRef<Array<SVGCircleElement | null>>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Too little width to run a line across, and the globe sits behind the copy
    // rather than beside it.
    if (isMobile || phase !== "IDLE" || !ready) {
      pathRefs.current.forEach((path) => path && (path.style.opacity = "0"));
      dotRefs.current.forEach((dot) => dot && (dot.style.opacity = "0"));
      return;
    }

    let scheduled = 0;

    const draw = () => {
      scheduled = 0;

      const width = window.innerWidth;
      const height = window.innerHeight;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      const stop = forViewport(getStop(stopId), isMobile);
      const cx = (0.5 - stop.offsetX) * width;
      const cy = (0.5 - stop.offsetY) * height;
      const radius = apparentRadiusPx(stop.distance, width, height, isMobile);

      const anchors = anchorsFor(stopId).slice(0, MAX_LINES);

      for (let i = 0; i < MAX_LINES; i++) {
        const path = pathRefs.current[i];
        const dot = dotRefs.current[i];
        const anchor = anchors[i];
        if (!path || !dot) continue;

        if (!anchor) {
          path.style.opacity = "0";
          dot.style.opacity = "0";
          continue;
        }

        const rect = anchor.getBoundingClientRect();
        const ax = rect.left + rect.width / 2;
        const ay = rect.top + rect.height / 2;

        const dx = cx - ax;
        const dy = cy - ay;
        const length = Math.hypot(dx, dy);

        // Off screen, or sitting on the marker already: nothing useful to draw.
        const offScreen = ay < -40 || ay > height + 40;
        if (offScreen || length < 64) {
          path.style.opacity = "0";
          dot.style.opacity = "0";
          continue;
        }

        // Every line lands on Bamako, which the camera keeps at the centre of
        // the disc — that is the relationship being drawn. When the planet is
        // small the line stops at its rim instead of striking out across empty
        // space; when it fills the screen, it runs over the surface to the pin.
        const inset = Math.min(radius, length - 34, 30);
        const ex = ax + (dx / length) * (length - inset);
        const ey = ay + (dy / length) * (length - inset);

        // Bow the line perpendicular to itself so several of them fan out
        // instead of collapsing into one straight bundle.
        const bow = Math.min(64, length * 0.14) * (i % 2 === 0 ? 1 : -1);
        const qx = (ax + ex) / 2 - (dy / length) * bow;
        const qy = (ay + ey) / 2 + (dx / length) * bow;

        path.setAttribute("d", `M${ax.toFixed(1)},${ay.toFixed(1)} Q${qx.toFixed(1)},${qy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`);
        path.style.opacity = "1";

        dot.setAttribute("cx", ex.toFixed(1));
        dot.setAttribute("cy", ey.toFixed(1));
        dot.style.opacity = "1";
      }
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = window.setTimeout(draw, INTERVAL);
    };

    // Anchors mount with their section, which can be a beat after this effect.
    const settle = window.setTimeout(draw, 260);
    draw();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.clearTimeout(scheduled);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [stopId, phase, ready, isMobile]);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tether-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(20,180,92,0.06)" />
          <stop offset="55%" stopColor="rgba(20,180,92,0.34)" />
          <stop offset="100%" stopColor="rgba(59,212,127,0.7)" />
        </linearGradient>
      </defs>

      {Array.from({ length: MAX_LINES }, (_, index) => (
        <g key={index}>
          <path
            ref={(node) => {
              pathRefs.current[index] = node;
            }}
            fill="none"
            stroke="url(#tether-stroke)"
            strokeWidth="1"
            opacity="0"
            style={{
              transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: `${index * 70}ms`,
            }}
          />
          <circle
            ref={(node) => {
              dotRefs.current[index] = node;
            }}
            r="2.5"
            fill="#3BD47F"
            opacity="0"
            style={{
              transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: `${index * 70 + 220}ms`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}
