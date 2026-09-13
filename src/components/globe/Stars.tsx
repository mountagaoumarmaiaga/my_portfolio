"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  type Points as ThreePoints,
  ShaderMaterial,
} from "three";

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aBrightness;
  attribute float aPhase;
  attribute vec3 aTint;

  uniform float uTime;
  uniform float uPixelRatio;

  varying float vBrightness;
  varying vec3 vTint;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Slow, shallow twinkle. Real stars scintillate; huge pulsing looks like a toy.
    float twinkle = 0.82 + 0.18 * sin(uTime * 0.7 + aPhase);

    gl_PointSize = aSize * uPixelRatio * twinkle * (220.0 / -mvPosition.z);
    vBrightness = aBrightness * twinkle;
    vTint = aTint;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vBrightness;
  varying vec3 vTint;

  void main() {
    // Soft round point: a hard square would read as dust on the lens.
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.08, d);
    if (alpha <= 0.001) discard;

    gl_FragColor = vec4(vTint, alpha * vBrightness);
  }
`;

interface StarsProps {
  count: number;
  innerRadius?: number;
  outerRadius?: number;
}

/** A deep-space backdrop: many small stars, a handful of slightly brighter ones. */
export default function Stars({ count, innerRadius = 26, outerRadius = 58 }: StarsProps) {
  const pointsRef = useRef<ThreePoints>(null);
  const pixelRatio = useThree((state) => state.gl.getPixelRatio());

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const tints = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const brightness = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Uniform direction on a sphere, then a random shell depth for parallax.
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius);

      positions[i * 3] = radius * s * Math.cos(theta);
      positions[i * 3 + 1] = radius * u;
      positions[i * 3 + 2] = radius * s * Math.sin(theta);

      // Mostly faint; a long tail of rare bright ones.
      const rank = Math.pow(Math.random(), 3.4);
      sizes[i] = 0.55 + rank * 2.1;
      brightness[i] = 0.16 + rank * 0.84;
      phases[i] = Math.random() * Math.PI * 2;

      // Colour temperature: cool blue-white through to faint amber.
      const warmth = Math.random();
      tints[i * 3] = 0.78 + warmth * 0.22;
      tints[i * 3 + 1] = 0.82 + (1 - Math.abs(warmth - 0.5) * 2) * 0.16;
      tints[i * 3 + 2] = 1.0 - warmth * 0.24;
    }

    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geo.setAttribute("aTint", new Float32BufferAttribute(tints, 3));
    geo.setAttribute("aSize", new Float32BufferAttribute(sizes, 1));
    geo.setAttribute("aBrightness", new Float32BufferAttribute(brightness, 1));
    geo.setAttribute("aPhase", new Float32BufferAttribute(phases, 1));

    const mat = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
      },
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [count, innerRadius, outerRadius, pixelRatio]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}
