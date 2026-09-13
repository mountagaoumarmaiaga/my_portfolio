import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = "Mountaga Oumar Maiga — Développeur Fullstack & Data Scientist, Bamako, Mali";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card is the face, not the planet.
 *
 * Read off disk and inlined rather than fetched: this route is prerendered at
 * build time, where there is no server to fetch a public/ URL from.
 *
 * The portrait was shot on pure black, which is within a hair of the site's own
 * background, so it can bleed off the right edge with only a soft gradient over
 * its left side and no seam shows.
 */
const photo = readFileSync(join(process.cwd(), "public", "photo.jpeg"));
const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

/** 988x1280 inside 500x630 covers at 0.506, so barely 18px is cropped. */
const PHOTO_W = 500;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#050608",
          color: "#F4F5F7",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={photoSrc}
          width={PHOTO_W}
          height={size.height}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: PHOTO_W,
            height: size.height,
            objectFit: "cover",
          }}
        />

        {/* Feathers the portrait into the background instead of cutting it. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: PHOTO_W + 120,
            height: size.height,
            background:
              "linear-gradient(to right, #050608 0%, rgba(5,6,8,0.92) 22%, rgba(5,6,8,0.35) 52%, rgba(5,6,8,0) 78%)",
          }}
        />

        {/* The Malian green, as a rule rather than a logo. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 6,
            height: size.height,
            background: "linear-gradient(to bottom, #14B45C 0%, #0B8A44 60%, rgba(11,138,68,0) 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            width: 700,
            height: "100%",
            padding: "0 0 0 86px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
            <div style={{ width: 9, height: 9, borderRadius: 99, background: "#14B45C" }} />
            <div style={{ fontSize: 19, letterSpacing: 3, color: "rgba(244,245,247,0.52)" }}>
              DÉVELOPPEUR FULLSTACK · DATA SCIENTIST
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 74, lineHeight: 1.04, letterSpacing: -2.4 }}>
            Mountaga Oumar Maiga
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              lineHeight: 1.3,
              color: "rgba(244,245,247,0.7)",
            }}
          >
            Je construis pour le monde, depuis Bamako
            <span style={{ color: "#14B45C" }}>.</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 44,
              fontSize: 21,
              color: "rgba(244,245,247,0.42)",
            }}
          >
            <span>Bamako, Mali</span>
            <span style={{ color: "rgba(244,245,247,0.22)" }}>·</span>
            <span>{site.url.replace(/^https?:\/\//, "")}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
