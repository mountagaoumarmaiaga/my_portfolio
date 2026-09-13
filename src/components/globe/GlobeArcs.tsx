"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  type Mesh,
  type MeshBasicMaterial,
  QuadraticBezierCurve3,
} from "three";
import gsap from "gsap";
import { latLonToVector3 } from "@/lib/coordinates";
import { destinations } from "@/data/places";
import { BAMAKO } from "@/lib/globe-config";

const SEGMENTS = 88;

interface GlobeArcsProps {
  radius: number;
  /** Drawn only while a section that is about reach has claimed the globe. */
  active: boolean;
  reducedMotion: boolean;
}

/**
 * Connection lines out of Bamako, welded to the globe so they turn with it.
 *
 * Each arc is a quadratic curve lifted off the surface in proportion to how far
 * it travels — a short hop to Dakar stays low, Singapore arcs high over the
 * horizon. They draw themselves in sequence, then a light runs along each one.
 */
export default function GlobeArcs({ radius, active, reducedMotion }: GlobeArcsProps) {
  const travellers = useRef<Array<Mesh | null>>([]);
  const endpoints = useRef<Array<Mesh | null>>([]);
  const progress = useRef(destinations.map(() => 0));
  const reveal = useRef({ value: 0 });

  const arcs = useMemo(() => {
    const start = latLonToVector3(BAMAKO.lat, BAMAKO.lon, radius);

    return destinations.map((destination) => {
      const end = latLonToVector3(destination.lat, destination.lon, radius);
      const angle = start.angleTo(end);

      // Lift the control point off the chord: the further the hop, the higher
      // the arc, which is what keeps a long one from cutting through the planet.
      const lift = radius * (0.1 + angle * 0.22);
      const mid = start.clone().add(end).normalize().multiplyScalar(radius + lift);
      const curve = new QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(SEGMENTS);

      const geometry = new BufferGeometry();
      geometry.setAttribute(
        "position",
        new Float32BufferAttribute(points.flatMap((point) => [point.x, point.y, point.z]), 3),
      );
      geometry.setDrawRange(0, 0);

      const material = new LineBasicMaterial({
        color: new Color("#2fd07a"),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: AdditiveBlending,
      });

      return { ...destination, curve, geometry, line: new Line(geometry, material), material, end };
    });
  }, [radius]);

  useEffect(
    () => () => {
      arcs.forEach((arc) => {
        arc.geometry.dispose();
        arc.material.dispose();
      });
    },
    [arcs],
  );

  useEffect(() => {
    if (reducedMotion) {
      reveal.current.value = active ? 1 : 0;
      progress.current = destinations.map(() => (active ? 1 : 0));
      return;
    }

    const tweens = [
      gsap.to(reveal.current, {
        value: active ? 1 : 0,
        duration: active ? 0.8 : 0.5,
        ease: "power2.out",
      }),
      ...progress.current.map((_, index) =>
        gsap.to(progress.current, {
          [index]: active ? 1 : 0,
          duration: active ? 1.5 : 0.4,
          delay: active ? index * 0.16 : 0,
          ease: active ? "power2.inOut" : "power1.in",
        }),
      ),
    ];

    return () => tweens.forEach((tween) => tween.kill());
  }, [active, reducedMotion]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    arcs.forEach((arc, index) => {
      const drawn = progress.current[index];
      arc.geometry.setDrawRange(0, Math.max(0, Math.ceil(drawn * (SEGMENTS + 1))));
      arc.material.opacity = reveal.current.value * 0.55;

      const traveller = travellers.current[index];
      if (traveller) {
        // A light that runs the arc once it exists, offset per arc so they do
        // not pulse in lockstep.
        const along = ((t * 0.22 + index * 0.17) % 1) * drawn;
        arc.curve.getPointAt(Math.min(0.999, Math.max(0.001, along)), traveller.position);
        traveller.visible = drawn > 0.04;
        (traveller.material as MeshBasicMaterial).opacity = reveal.current.value * drawn;
      }

      const endpoint = endpoints.current[index];
      if (endpoint) {
        const landed = Math.max(0, (drawn - 0.82) / 0.18);
        endpoint.scale.setScalar(landed);
        endpoint.visible = landed > 0.01;
        (endpoint.material as MeshBasicMaterial).opacity = reveal.current.value * landed;
      }
    });
  });

  return (
    <group>
      {arcs.map((arc, index) => (
        <group key={arc.id}>
          <primitive object={arc.line} />

          <mesh
            ref={(node: Mesh | null) => {
              travellers.current[index] = node;
            }}
            visible={false}
          >
            <sphereGeometry args={[radius * 0.008, 10, 10]} />
            <meshBasicMaterial
              color="#9bffc9"
              transparent
              depthWrite={false}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </mesh>

          <mesh
            ref={(node: Mesh | null) => {
              endpoints.current[index] = node;
            }}
            position={arc.end}
            visible={false}
          >
            <sphereGeometry args={[radius * 0.009, 12, 12]} />
            <meshBasicMaterial
              color="#ffc61a"
              transparent
              depthWrite={false}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
