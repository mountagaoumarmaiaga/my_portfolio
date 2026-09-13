"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, useProgress } from "@react-three/drei";
import Globe from "./Globe";
import { CAMERA, QUALITY } from "@/lib/globe-config";
import { usePointerParallax } from "@/hooks/usePointerParallax";

interface GlobeSceneProps {
  isMobile: boolean;
  reducedMotion: boolean;
  /** Reports three's own loading manager upwards, for the loading screen. */
  onProgress?: (progress: number, active: boolean) => void;
}

/**
 * Canvas host. Loaded through `next/dynamic` with `ssr: false`, so three.js and
 * the textures never touch the server bundle or the first paint.
 *
 * It stays mounted for the whole page — the globe is the thread every section
 * hangs off, so it is never torn down and rebuilt on the way past.
 */
export default function GlobeScene({ isMobile, reducedMotion, onProgress }: GlobeSceneProps) {
  const [awake, setAwake] = useState(true);
  const pointerRef = usePointerParallax(!isMobile && !reducedMotion);
  const quality = isMobile ? QUALITY.mobile : QUALITY.desktop;
  const { progress, active } = useProgress();

  useEffect(() => {
    onProgress?.(progress, active);
  }, [progress, active, onProgress]);

  // A hidden tab should not be paying for a planet.
  useEffect(() => {
    const onVisibility = () => setAwake(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);

    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Canvas
      dpr={quality.dpr}
      frameloop={awake ? "always" : "demand"}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      camera={{
        fov: CAMERA.fov,
        near: CAMERA.near,
        far: CAMERA.far,
        position: [0, 0, CAMERA.initial.distance],
      }}
      style={{ pointerEvents: "none", touchAction: "none" }}
    >
      <Suspense fallback={null}>
        <Globe isMobile={isMobile} reducedMotion={reducedMotion} pointerRef={pointerRef} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
