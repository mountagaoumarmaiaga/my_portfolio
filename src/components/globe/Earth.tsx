"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  Color,
  type Mesh,
  MeshStandardMaterial,
  NoColorSpace,
  RepeatWrapping,
  SRGBColorSpace,
  type Texture,
  Vector2,
  Vector3,
} from "three";

interface EarthProps {
  radius: number;
  segments: number;
  textures: { day: string; night: string; normal: string; specular: string; clouds: string };
  /** Sun direction in the globe group's local frame. Mutated by GlobeCamera. */
  sunDirection: Vector3;
  withClouds: boolean;
}

/**
 * Realistic Earth: an albedo/normal-mapped standard material extended with two
 * things `MeshStandardMaterial` cannot express on its own — city lights that
 * only burn on the unlit hemisphere, and oceans that are glossy while land is
 * matte (the specular map is inverted relative to roughness).
 */
export default function Earth({ radius, segments, textures, sunDirection, withClouds }: EarthProps) {
  const cloudsRef = useRef<Mesh>(null);

  const [dayMap, nightMap, normalMap, specularMap, cloudsMap] = useTexture([
    textures.day,
    textures.night,
    textures.normal,
    textures.specular,
    textures.clouds,
  ]) as Texture[];

  useEffect(() => {
    for (const [texture, colorSpace] of [
      [dayMap, SRGBColorSpace],
      [nightMap, SRGBColorSpace],
      [cloudsMap, SRGBColorSpace],
      [normalMap, NoColorSpace],
      [specularMap, NoColorSpace],
    ] as const) {
      texture.colorSpace = colorSpace;
      texture.anisotropy = 8;
      texture.wrapS = RepeatWrapping;
      texture.needsUpdate = true;
    }
  }, [dayMap, nightMap, normalMap, specularMap, cloudsMap]);

  const material = useMemo(() => {
    const mat = new MeshStandardMaterial({
      map: dayMap,
      normalMap,
      normalScale: new Vector2(0.8, 0.8),
      emissiveMap: nightMap,
      emissive: new Color("#ffb765"),
      emissiveIntensity: 1.9,
      metalness: 0.0,
      roughness: 0.9,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uSunDirection = { value: sunDirection };
      shader.uniforms.uOceanMap = { value: specularMap };

      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vLocalNormal;")
        .replace(
          "#include <begin_vertex>",
          "#include <begin_vertex>\n  vLocalNormal = normalize(objectNormal);",
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
           varying vec3 vLocalNormal;
           uniform vec3 uSunDirection;
           uniform sampler2D uOceanMap;`,
        )
        // The specular map is white on water. Water is smooth, land is not.
        .replace(
          "#include <roughnessmap_fragment>",
          `#include <roughnessmap_fragment>
           float ocean = texture2D(uOceanMap, vMapUv).g;
           roughnessFactor = mix(0.95, 0.32, ocean);`,
        )
        // City lights fade in only where the sun has already set.
        .replace(
          "#include <emissivemap_fragment>",
          `#include <emissivemap_fragment>
           float sunAngle = dot(normalize(vLocalNormal), normalize(uSunDirection));
           totalEmissiveRadiance *= smoothstep(0.10, -0.24, sunAngle);`,
        );
    };

    // Without this, three caches one program for every material sharing these defines.
    mat.customProgramCacheKey = () => "earth-day-night-v1";

    return mat;
  }, [dayMap, nightMap, normalMap, specularMap, sunDirection]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, delta) => {
    // Clouds drift a little faster than the ground — the only motion that stays
    // visible once the camera locks onto Bamako.
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.0075;
  });

  return (
    <group>
      <mesh material={material} renderOrder={1}>
        <sphereGeometry args={[radius, segments, segments / 2]} />
      </mesh>

      {withClouds && (
        <mesh ref={cloudsRef} renderOrder={1}>
          <sphereGeometry args={[radius * 1.006, segments / 2, segments / 4]} />
          <meshStandardMaterial
            map={cloudsMap}
            transparent
            opacity={0.62}
            depthWrite={false}
            roughness={1}
            metalness={0}
          />
        </mesh>
      )}
    </group>
  );
}
