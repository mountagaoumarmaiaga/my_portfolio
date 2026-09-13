"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  Quaternion,
  ShaderMaterial,
  Vector3,
} from "three";
import gsap from "gsap";
import { latLonToVector3 } from "@/lib/coordinates";
import { BAMAKO } from "@/lib/globe-config";

const UP = new Vector3(0, 1, 0);

const beamVertex = /* glsl */ `
  varying vec2 vBeamUv;
  void main() {
    vBeamUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const beamFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vBeamUv;

  void main() {
    // Bright where it meets the ground, gone before the top — a shaft of light,
    // not a cylinder.
    float falloff = pow(1.0 - vBeamUv.y, 2.2);
    float edge = smoothstep(0.0, 0.22, vBeamUv.y);
    gl_FragColor = vec4(uColor, falloff * edge * uOpacity);
  }
`;

interface BamakoPinProps {
  radius: number;
  /** Plays the landing animation once. Kept false until the camera arrives. */
  active: boolean;
  /** Skips the landing animation and shows the marker outright. */
  instant?: boolean;
  compact?: boolean;
}

/**
 * A marker welded to the globe at Bamako's real coordinates — it rotates with
 * the Earth because it is a child of it, not an overlay floating in screen space.
 */
export default function BamakoPin({ radius, active, instant = false, compact = false }: BamakoPinProps) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const ringRefs = useRef<Array<Mesh | null>>([]);
  const state = useRef({ enter: instant ? 1 : 0, burst: instant ? 0.45 : 1 });
  const [labelVisible, setLabelVisible] = useState(instant);

  const { position, quaternion, beamMaterial } = useMemo(() => {
    const surface = latLonToVector3(BAMAKO.lat, BAMAKO.lon, radius);
    const normal = surface.clone().normalize();

    return {
      position: surface,
      quaternion: new Quaternion().setFromUnitVectors(UP, normal),
      beamMaterial: new ShaderMaterial({
        vertexShader: beamVertex,
        fragmentShader: beamFragment,
        uniforms: {
          uColor: { value: new Color("#14b45c") },
          uOpacity: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        blending: AdditiveBlending,
      }),
    };
  }, [radius]);

  useEffect(() => () => beamMaterial.dispose(), [beamMaterial]);

  useEffect(() => {
    if (!active || instant) return;

    const tl = gsap.timeline();
    tl.to(state.current, { enter: 1, duration: 0.85, ease: "back.out(2.1)" })
      // Three strong pulses on arrival, then a heartbeat you only notice if you look.
      .to(state.current, { burst: 0.45, duration: 2.6, delay: 2.2, ease: "power2.out" });

    const label = gsap.delayedCall(0.45, () => setLabelVisible(true));

    return () => {
      tl.kill();
      label.kill();
    };
  }, [active, instant]);

  useFrame((frame) => {
    const group = groupRef.current;
    if (!group) return;

    const { enter, burst } = state.current;
    group.scale.setScalar(enter);
    group.visible = enter > 0.001;

    const t = frame.clock.elapsedTime;

    if (coreRef.current) {
      const core = coreRef.current.material as MeshBasicMaterial;
      core.opacity = enter * (0.72 + 0.28 * Math.sin(t * 2.4));
    }

    beamMaterial.uniforms.uOpacity.value = enter * (0.34 + burst * 0.42);

    ringRefs.current.forEach((ring, i) => {
      if (!ring) return;
      const cycle = (t * 0.42 + i / ringRefs.current.length) % 1;
      const scale = 0.35 + cycle * (1.6 + burst * 1.5);
      ring.scale.set(scale, scale, scale);
      (ring.material as MeshBasicMaterial).opacity = enter * (1 - cycle) * (0.18 + burst * 0.5);
    });

    // The label is DOM, so it cannot be depth-tested. Hide it when the marker
    // swings round the far side instead of letting it bleed through the planet.
    if (labelVisible) {
      const worldNormal = group.getWorldPosition(new Vector3()).normalize();
      const toCamera = frame.camera.position.clone().normalize();
      group.userData.facing = worldNormal.dot(toCamera);
    }
  });

  return (
    <group ref={groupRef} position={position} quaternion={quaternion} scale={0}>
      {/* Surface point */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[radius * 0.0105, 16, 16]} />
        <meshBasicMaterial color="#4ade80" transparent toneMapped={false} />
      </mesh>

      {/* Halo that sells the point as a light source rather than a dot */}
      <mesh>
        <sphereGeometry args={[radius * 0.026, 16, 16]} />
        <meshBasicMaterial
          color="#14b45c"
          transparent
          opacity={0.22}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Vertical beam */}
      <mesh material={beamMaterial} position={[0, radius * 0.075, 0]}>
        <cylinderGeometry args={[radius * 0.0055, radius * 0.0105, radius * 0.15, 12, 1, true]} />
      </mesh>

      {/* Pulse rings, flat against the surface */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(node) => {
            ringRefs.current[i] = node;
          }}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[radius * 0.019, radius * 0.023, 48]} />
          <meshBasicMaterial
            color="#14b45c"
            transparent
            opacity={0}
            side={DoubleSide}
            depthWrite={false}
            blending={AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      ))}

      {labelVisible && (
        <Html
          position={[0, radius * 0.175, 0]}
          center
          zIndexRange={[8, 0]}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div
            className={`flex items-center gap-2 whitespace-nowrap rounded-md border border-mali-green/25 bg-void/70 px-2.5 py-1 font-mono uppercase tracking-label text-mali-greenSoft backdrop-blur-md ${
              compact ? "text-[9px]" : "text-[10px]"
            }`}
          >
            <span className="inline-block h-1 w-1 rounded-full bg-mali-green" aria-hidden="true" />
            Bamako
          </div>
        </Html>
      )}
    </group>
  );
}
