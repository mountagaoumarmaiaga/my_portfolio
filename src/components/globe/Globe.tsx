"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { type DirectionalLight, type Group, Quaternion, Vector3 } from "three";
import Atmosphere from "./Atmosphere";
import BamakoPin from "./BamakoPin";
import Earth from "./Earth";
import GlobeArcs from "./GlobeArcs";
import GlobeCamera from "./GlobeCamera";
import MaliOutline from "./MaliOutline";
import Stars from "./Stars";
import { DEG2RAD } from "@/lib/coordinates";
import { AXIAL_TILT, EARTH_RADIUS, QUALITY, TEXTURES } from "@/lib/globe-config";
import { getStop, useGlobeState } from "@/lib/globe-director";

const Z_AXIS = new Vector3(0, 0, 1);

/** Keeps the key light pinned to the tweened sun position, inside the globe's frame. */
function SunLight({ sunDirection }: { sunDirection: Vector3 }) {
  const ref = useRef<DirectionalLight>(null);

  useFrame(() => {
    ref.current?.position.copy(sunDirection).multiplyScalar(12);
  });

  return <directionalLight ref={ref} intensity={2.7} color="#fff4e2" />;
}

interface GlobeProps {
  isMobile: boolean;
  reducedMotion: boolean;
  pointerRef: RefObject<{ x: number; y: number }>;
}

export default function Globe({ isMobile, reducedMotion, pointerRef }: GlobeProps) {
  const spinGroup = useRef<Group>(null);
  const { stopId, phase } = useGlobeState();
  const quality = isMobile ? QUALITY.mobile : QUALITY.desktop;
  const textures = isMobile ? TEXTURES.mobile : TEXTURES.desktop;

  /** Shared, mutated once per frame by GlobeCamera; read by both shaders. */
  const sunDirection = useMemo(() => new Vector3(1, 0, 0), []);
  const tilt = useMemo(() => new Quaternion().setFromAxisAngle(Z_AXIS, -AXIAL_TILT * DEG2RAD), []);

  const stop = getStop(stopId);
  const landed = phase === "IDLE";
  const showArcs = landed && stop.arcs;
  // Far enough out and a country is a smudge; the outline would be noise.
  const showMali = landed && stop.distance < 4.2;

  // Everything under the tilt group inherits the axial tilt, including the camera
  // path — which is why the poles can lean without the targeting drifting.
  return (
    <>
      <Stars count={quality.stars} />

      {/* Barely-there fill so the night side reads as a planet, not a hole. */}
      <ambientLight intensity={0.05} />
      <hemisphereLight args={["#22406e", "#04060a", 0.2]} />

      <group quaternion={tilt}>
        <group ref={spinGroup}>
          <SunLight sunDirection={sunDirection} />

          <Earth
            radius={EARTH_RADIUS}
            segments={quality.segments}
            textures={textures}
            sunDirection={sunDirection}
            withClouds={quality.clouds}
          />

          <Atmosphere radius={EARTH_RADIUS} sunDirection={sunDirection} />

          <GlobeArcs radius={EARTH_RADIUS} active={showArcs} reducedMotion={reducedMotion} />

          <MaliOutline
            radius={EARTH_RADIUS}
            visible={showMali}
            reducedMotion={reducedMotion}
            compact={isMobile}
          />

          <BamakoPin
            radius={EARTH_RADIUS}
            active={landed}
            instant={reducedMotion}
            compact={isMobile}
          />
        </group>
      </group>

      <GlobeCamera
        groupRef={spinGroup}
        tilt={tilt}
        sunDirection={sunDirection}
        pointerRef={pointerRef}
        reducedMotion={reducedMotion}
        parallax={quality.parallax && !reducedMotion}
        isMobile={isMobile}
      />
    </>
  );
}
