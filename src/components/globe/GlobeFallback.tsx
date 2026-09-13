"use client";

import { useMemo } from "react";
import { BAMAKO } from "@/lib/globe-config";
import { DEG2RAD } from "@/lib/coordinates";
import { WORLD_GRID, worldDots } from "@/data/worldDots";

const SIZE = 420;
const R = SIZE / 2 - 12;

/**
 * The no-WebGL path: the same planet, same coordinates, no GPU. Land cells are
 * orthographically projected around Bamako, so the continents and the marker are
 * in exactly the places the 3D scene would have put them.
 */
export default function GlobeFallback({ className }: { className?: string }) {
  const dots = useMemo(() => {
    const lat0 = BAMAKO.lat * DEG2RAD;
    const lon0 = BAMAKO.lon * DEG2RAD;
    const sinLat0 = Math.sin(lat0);
    const cosLat0 = Math.cos(lat0);

    return worldDots.flatMap(({ x, y }) => {
      const lon = (((x + 0.5) / WORLD_GRID.width) * 360 - 180) * DEG2RAD;
      const lat = (90 - ((y + 0.5) / WORLD_GRID.height) * 180) * DEG2RAD;
      const dLon = lon - lon0;

      // Anything with a negative cosine of the angular distance is round the back.
      const cosc = sinLat0 * Math.sin(lat) + cosLat0 * Math.cos(lat) * Math.cos(dLon);
      if (cosc <= 0.02) return [];

      return [
        {
          cx: SIZE / 2 + R * Math.cos(lat) * Math.sin(dLon),
          cy: SIZE / 2 - R * (cosLat0 * Math.sin(lat) - sinLat0 * Math.cos(lat) * Math.cos(dLon)),
          /** Fades land towards the limb, which reads as curvature. */
          o: 0.18 + cosc * 0.62,
        },
      ];
    });
  }, []);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      role="img"
      aria-label="Map of the Earth centred on Bamako, Mali"
    >
      <defs>
        <radialGradient id="fallback-ocean" cx="38%" cy="32%" r="78%">
          <stop offset="0%" stopColor="#12233f" />
          <stop offset="62%" stopColor="#0a1424" />
          <stop offset="100%" stopColor="#05070c" />
        </radialGradient>
        <radialGradient id="fallback-halo" cx="50%" cy="50%" r="50%">
          <stop offset="72%" stopColor="rgba(134,188,255,0)" />
          <stop offset="92%" stopColor="rgba(134,188,255,0.30)" />
          <stop offset="100%" stopColor="rgba(134,188,255,0)" />
        </radialGradient>
      </defs>

      <circle cx={SIZE / 2} cy={SIZE / 2} r={R + 14} fill="url(#fallback-halo)" />
      <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="url(#fallback-ocean)" />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
        fill="none"
        stroke="rgba(134,188,255,0.28)"
        strokeWidth="1"
      />

      <g fill="#5c7da8">
        {dots.map((dot, i) => (
          <circle key={i} cx={dot.cx} cy={dot.cy} r={1.25} opacity={dot.o} />
        ))}
      </g>

      {/* Bamako sits at the centre by construction — it is the projection origin. */}
      <circle cx={SIZE / 2} cy={SIZE / 2} r={16} fill="rgba(20,180,92,0.14)" />
      <circle cx={SIZE / 2} cy={SIZE / 2} r={7} fill="none" stroke="#14b45c" strokeWidth="1" opacity="0.7" />
      <circle cx={SIZE / 2} cy={SIZE / 2} r={3} fill="#4ade80" />
    </svg>
  );
}
