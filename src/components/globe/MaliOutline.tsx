"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { Vector3 } from "three";
import gsap from "gsap";
import { latLonToVector3 } from "@/lib/coordinates";
import { MALI } from "@/lib/globe-config";
import { maliBorder } from "@/data/mali-border";

interface MaliOutlineProps {
  radius: number;
  /** Drawn only when the camera is close enough for a country to mean anything. */
  visible: boolean;
  reducedMotion: boolean;
  compact?: boolean;
}

/**
 * Mali's border, welded to the globe.
 *
 * The satellite texture has no borders in it — it shows the Sahel, not a
 * country. This draws the actual national outline on the surface, so "Mali" is
 * legible at any zoom instead of depending on how far a 2048px texture can be
 * stretched.
 */
export default function MaliOutline({ radius, visible, reducedMotion, compact }: MaliOutlineProps) {
  const groupRef = useRef<{ visible: boolean } | null>(null);
  const reveal = useRef({ value: reducedMotion && visible ? 1 : 0 });
  const glowRef = useRef<{ material: { opacity: number } } | null>(null);
  const lineRef = useRef<{ material: { opacity: number } } | null>(null);

  const points = useMemo(() => {
    // Lifted just clear of the surface so the line is not swallowed by it.
    const lift = radius * 1.0025;
    const ring = maliBorder.map(({ lat, lon }) => latLonToVector3(lat, lon, lift));

    // Close the loop explicitly; the source ring already repeats its first point
    // in most cases, but not every dataset does.
    const first = ring[0];
    const last = ring[ring.length - 1];
    if (first && last && first.distanceTo(last) > 1e-6) ring.push(first.clone());

    return ring;
  }, [radius]);

  const labelPosition = useMemo(
    () => latLonToVector3(MALI.lat, MALI.lon, radius * 1.02, new Vector3()),
    [radius],
  );

  useEffect(() => {
    if (reducedMotion) {
      reveal.current.value = visible ? 1 : 0;
      return;
    }

    const tween = gsap.to(reveal.current, {
      value: visible ? 1 : 0,
      duration: visible ? 1.1 : 0.5,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
    };
  }, [visible, reducedMotion]);

  useFrame(() => {
    const value = reveal.current.value;
    if (glowRef.current) glowRef.current.material.opacity = value * 0.22;
    if (lineRef.current) lineRef.current.material.opacity = value * 0.92;
    if (groupRef.current) groupRef.current.visible = value > 0.005;
  });

  return (
    <group ref={groupRef as never} visible={false}>
      {/* A wide, soft pass under a crisp one — a glow without a post-process. */}
      <Line
        ref={glowRef as never}
        points={points}
        color="#14b45c"
        lineWidth={6}
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
      />
      <Line
        ref={lineRef as never}
        points={points}
        color="#6ff0a6"
        lineWidth={1.6}
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
      />

      {visible && (
        <Html
          position={labelPosition}
          center
          zIndexRange={[6, 0]}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <span
            className={`font-mono uppercase tracking-[0.34em] text-mali-greenSoft/80 ${
              compact ? "text-[10px]" : "text-[12px]"
            }`}
          >
            Mali
          </span>
        </Html>
      )}
    </group>
  );
}
