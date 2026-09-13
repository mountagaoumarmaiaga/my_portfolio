"use client";

import { useEffect, useMemo } from "react";
import { AdditiveBlending, BackSide, Color, ShaderMaterial, Vector3 } from "three";

const vertexShader = /* glsl */ `
  varying vec3 vViewNormal;
  varying vec3 vLocalNormal;

  void main() {
    vViewNormal = normalize(normalMatrix * normal);
    vLocalNormal = normalize(normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Drawn on the back faces of a shell a little larger than the planet: the planet
 * writes depth first, so everything but a rim around the silhouette is clipped
 * away. The sun term brightens the daylit limb the way forward scattering does.
 */
const fragmentShader = /* glsl */ `
  uniform vec3 uDayColor;
  uniform vec3 uDuskColor;
  uniform vec3 uSunDirection;
  uniform float uIntensity;
  uniform float uFalloff;

  varying vec3 vViewNormal;
  varying vec3 vLocalNormal;

  void main() {
    float rim = pow(clamp(0.58 - dot(vViewNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.6), uFalloff);

    float sun = dot(normalize(vLocalNormal), normalize(uSunDirection));
    float daylight = smoothstep(-0.38, 0.42, sun);
    float grazing = pow(clamp(1.0 - abs(sun), 0.0, 1.0), 3.0);

    vec3 tint = mix(uDuskColor, uDayColor, daylight);
    float strength = rim * uIntensity * (0.10 + daylight * 0.92 + grazing * 0.30);

    gl_FragColor = vec4(tint, clamp(strength, 0.0, 1.0));
  }
`;

interface AtmosphereProps {
  radius: number;
  /** Sun direction in the globe group's local frame. Mutated by GlobeCamera. */
  sunDirection: Vector3;
  intensity?: number;
}

export default function Atmosphere({ radius, sunDirection, intensity = 0.9 }: AtmosphereProps) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uDayColor: { value: new Color("#86bcff") },
          uDuskColor: { value: new Color("#274a86") },
          uSunDirection: { value: sunDirection },
          uIntensity: { value: intensity },
          uFalloff: { value: 3.0 },
        },
        transparent: true,
        depthWrite: false,
        side: BackSide,
        blending: AdditiveBlending,
      }),
    [intensity, sunDirection],
  );

  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh material={material} renderOrder={3}>
      <sphereGeometry args={[radius * 1.14, 64, 64]} />
    </mesh>
  );
}
