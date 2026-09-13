import { ImageResponse } from "next/og";
import { BAMAKO } from "@/lib/globe-config";
import { DEG2RAD } from "@/lib/coordinates";
import { WORLD_GRID, worldDots } from "@/data/worldDots";

export const alt = "Mountaga Oumar Maiga — Développeur Fullstack & Data Scientist, Bamako, Mali";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GLOBE = 300;
const R = GLOBE / 2;

/**
 * The share card draws the same planet the hero does — land cells projected
 * orthographically around Bamako — so the link preview and the site agree.
 */
export default function OpenGraphImage() {
  const lat0 = BAMAKO.lat * DEG2RAD;
  const lon0 = BAMAKO.lon * DEG2RAD;
  const sinLat0 = Math.sin(lat0);
  const cosLat0 = Math.cos(lat0);

  const dots = worldDots.flatMap(({ x, y }) => {
    const lon = (((x + 0.5) / WORLD_GRID.width) * 360 - 180) * DEG2RAD;
    const lat = (90 - ((y + 0.5) / WORLD_GRID.height) * 180) * DEG2RAD;
    const dLon = lon - lon0;
    const cosc = sinLat0 * Math.sin(lat) + cosLat0 * Math.cos(lat) * Math.cos(dLon);

    if (cosc <= 0.03) return [];

    return [
      {
        cx: R + R * 0.94 * Math.cos(lat) * Math.sin(dLon),
        cy: R - R * 0.94 * (cosLat0 * Math.sin(lat) - sinLat0 * Math.cos(lat) * Math.cos(dLon)),
        o: 0.2 + cosc * 0.6,
      },
    ];
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#050608",
          padding: "72px 80px",
          color: "#F4F5F7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 660 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ width: 8, height: 8, borderRadius: 99, background: "#14B45C" }} />
            <div style={{ fontSize: 20, letterSpacing: 3, color: "rgba(244,245,247,0.5)" }}>
              DÉVELOPPEUR FULLSTACK · DATA SCIENTIST
            </div>
          </div>

          <div style={{ fontSize: 68, lineHeight: 1.05, letterSpacing: -2, display: "flex", flexDirection: "column" }}>
            <span>Je construis pour le monde,</span>
            <span>
              depuis Bamako<span style={{ color: "#14B45C" }}>.</span>
            </span>
          </div>

          <div style={{ marginTop: 36, fontSize: 26, color: "rgba(244,245,247,0.56)" }}>
            Mountaga Oumar Maiga — Bamako, Mali
          </div>
        </div>

        <svg width={GLOBE} height={GLOBE} viewBox={`0 0 ${GLOBE} ${GLOBE}`}>
          <circle cx={R} cy={R} r={R - 2} fill="#0A1424" />
          <circle cx={R} cy={R} r={R - 2} fill="none" stroke="rgba(134,188,255,0.3)" strokeWidth="1.5" />
          {dots.map((dot, index) => (
            <circle key={index} cx={dot.cx} cy={dot.cy} r={1.6} fill="#5C7DA8" opacity={dot.o} />
          ))}
          <circle cx={R} cy={R} r={14} fill="rgba(20,180,92,0.18)" />
          <circle cx={R} cy={R} r={4} fill="#4ADE80" />
        </svg>
      </div>
    ),
    size,
  );
}
