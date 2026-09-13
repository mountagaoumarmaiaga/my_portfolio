"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { type Group, MathUtils, type PerspectiveCamera, type Quaternion, Vector3 } from "three";
import gsap from "gsap";
import { latLonToVector3 } from "@/lib/coordinates";
import {
  BAMAKO,
  CAMERA,
  fitScaleFor,
  MALI,
  SPIN,
  SUN_END,
  SUN_START,
  TIMELINE,
} from "@/lib/globe-config";
import { forViewport, getStop, setGlobePhase, useGlobeState } from "@/lib/globe-director";
import { damp } from "@/lib/utils";

const UP = new Vector3(0, 1, 0);
const ORIGIN = new Vector3(0, 0, 0);

/** How long the globe takes to travel from one section's framing to the next. */
const STOP_DURATION = 1.7;

/**
 * Wall-clock deadline for the opening flight. The timeline runs on GSAP's ticker,
 * which is a frame loop, and a frame loop can be withheld. Nothing downstream —
 * the marker, the caption, the lines to each section — should be able to wait
 * forever on it, so past this point we land the camera and carry on.
 */
const FLIGHT_DEADLINE_MS = 12_000;

/** Picks the turn of `target` nearest `reference`, so the globe never unwinds. */
function nearestLongitude(target: number, reference: number) {
  return target + Math.round((reference - target) / 360) * 360;
}

/** Mutable camera state, expressed in the globe's own frame. */
interface GlobeView {
  lat: number;
  lon: number;
  distance: number;
  /** Frustum slide, as a fraction of the viewport. Negative x pushes right. */
  offsetX: number;
  offsetY: number;
  spin: number;
  spinSpeed: number;
  /** 0 while the globe turns under a parked camera, 1 once it is locked on. */
  follow: number;
  sunLat: number;
  sunLon: number;
  /** Ramps the ambient drift and pointer parallax in after arrival. */
  ambient: number;
  /** Longitude travelled under a stop that asks for slow rotation. */
  drift: number;
}

interface GlobeCameraProps {
  /** The spinning group the camera tracks; this component owns its rotation. */
  groupRef: RefObject<Group | null>;
  /** Axial tilt of the whole rig, applied to the camera so framing survives it. */
  tilt: Quaternion;
  /** Written every frame, read by the Earth and Atmosphere shaders. */
  sunDirection: Vector3;
  /** Normalised pointer (-1..1), tracked on window so the canvas can stay inert. */
  pointerRef: RefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  parallax: boolean;
  isMobile: boolean;
}

/**
 * Drives the cinematic — SPACE → rotation → Mali → Bamako → idle — and then
 * hands the camera over to whichever section currently owns the globe.
 *
 * The camera lives in the globe's own frame — `(lat, lon, distance)` — which is
 * what makes the targeting exact: whatever `(lat, lon)` the camera sits above is
 * precisely the point at the centre of the frame, however far the Earth has
 * spun. Longitude is handled by the globe's Y rotation, latitude by the camera's
 * elevation, and the two never fight.
 */
export default function GlobeCamera({
  groupRef,
  tilt,
  sunDirection,
  pointerRef,
  reducedMotion,
  parallax,
  isMobile,
}: GlobeCameraProps) {
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  const { stopId, phase } = useGlobeState();

  const home = useMemo(() => forViewport(getStop("hero"), isMobile), [isMobile]);
  const stop = useMemo(() => forViewport(getStop(stopId), isMobile), [stopId, isMobile]);

  const view = useRef<GlobeView>({
    lat: CAMERA.initial.lat,
    lon: CAMERA.initial.lon,
    distance: CAMERA.initial.distance,
    offsetX: home.offsetX,
    offsetY: home.offsetY,
    spin: 0,
    spinSpeed: 0,
    follow: 0,
    sunLat: SUN_START.lat,
    sunLon: SUN_START.lon,
    ambient: 0,
    drift: 0,
  });

  const driftRate = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const scratch = useMemo(() => new Vector3(), []);

  const fitScale = useThree((state) => fitScaleFor(state.size.width, state.size.height, isMobile));

  useEffect(() => {
    return () => {
      camera.clearViewOffset();
      camera.updateProjectionMatrix();
    };
  }, [camera]);

  // The opening flight. Mount-only: the cinematic must never replay.
  useEffect(() => {
    const v = view.current;

    if (reducedMotion) {
      // No flight. Bamako is already centred, lit, and marked.
      v.lat = BAMAKO.lat;
      v.lon = BAMAKO.lon;
      v.distance = CAMERA.bamako.distance;
      v.follow = 1;
      v.spinSpeed = 0;
      v.sunLat = SUN_END.lat;
      v.sunLon = SUN_END.lon;
      v.ambient = 0;
      setGlobePhase("IDLE");
      return;
    }

    setGlobePhase("ROTATING");
    v.spinSpeed = SPIN.intro;

    const { introHold, zoomToMali, zoomToBamako } = TIMELINE;
    const maliAt = introHold;
    const bamakoAt = introHold + zoomToMali;
    const arrivalAt = bamakoAt + zoomToBamako;

    const tl = gsap.timeline();

    // One continuous terminator sweep across the whole sequence. Because the sun
    // is parented to the Earth, this — not the spin — is what reads as daybreak.
    tl.to(
      v,
      { sunLat: SUN_END.lat, sunLon: SUN_END.lon, duration: arrivalAt, ease: "power1.inOut" },
      0,
    );

    tl.call(
      () => {
        setGlobePhase("ZOOMING_TO_MALI");
        // Re-express the parked camera inside the globe's rotating frame. Same
        // world position, new coordinates — so the lock-on has no seam.
        v.lon -= MathUtils.radToDeg(v.spin);
        v.follow = 1;
      },
      undefined,
      maliAt,
    );

    tl.to(
      v,
      {
        lat: MALI.lat,
        lon: () => nearestLongitude(MALI.lon, v.lon),
        distance: CAMERA.mali.distance,
        duration: zoomToMali,
        ease: "power3.inOut",
      },
      maliAt,
    );
    tl.to(v, { spinSpeed: SPIN.intro * 0.22, duration: zoomToMali, ease: "power2.out" }, maliAt);

    tl.call(() => setGlobePhase("ZOOMING_TO_BAMAKO"), undefined, bamakoAt);
    tl.to(
      v,
      {
        lat: BAMAKO.lat,
        lon: () => nearestLongitude(BAMAKO.lon, v.lon),
        distance: CAMERA.bamako.distance,
        duration: zoomToBamako,
        ease: "power2.inOut",
      },
      bamakoAt,
    );
    // The globe comes to a full stop for the landing. That pause is the arrival.
    tl.to(v, { spinSpeed: 0, duration: zoomToBamako * 0.75, ease: "power2.out" }, bamakoAt);

    tl.call(() => setGlobePhase("IDLE"), undefined, arrivalAt);
    tl.to(
      v,
      { spinSpeed: SPIN.idle, ambient: 1, duration: 2.6, ease: "power2.inOut" },
      arrivalAt + 0.55,
    );

    const deadline = window.setTimeout(() => {
      if (tl.progress() >= 1) return;

      tl.kill();
      v.lat = BAMAKO.lat;
      v.lon = nearestLongitude(BAMAKO.lon, v.lon);
      v.distance = CAMERA.bamako.distance;
      v.follow = 1;
      v.spinSpeed = SPIN.idle;
      v.sunLat = SUN_END.lat;
      v.sunLon = SUN_END.lon;
      v.ambient = 1;
      setGlobePhase("IDLE");
    }, FLIGHT_DEADLINE_MS);

    return () => {
      window.clearTimeout(deadline);
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hand-off: once the flight has landed, the section on screen owns the framing.
  useEffect(() => {
    if (phase !== "IDLE") return;

    const v = view.current;
    // Fold any accumulated drift into the real longitude so the next move starts
    // from where the eye actually is rather than from where the tween left off.
    v.lon += v.drift;
    v.drift = 0;
    driftRate.current = reducedMotion ? 0 : stop.lonDrift;

    const tween = gsap.to(v, {
      lat: stop.lat,
      lon: nearestLongitude(stop.lon, v.lon),
      distance: stop.distance,
      offsetX: stop.offsetX,
      offsetY: stop.offsetY,
      duration: reducedMotion ? 0 : STOP_DURATION,
      ease: "power2.inOut",
      overwrite: "auto",
    });

    return () => {
      tween.kill();
    };
  }, [stop, phase, reducedMotion]);

  useFrame((state, delta) => {
    const v = view.current;
    const dt = Math.min(delta, 0.05);

    v.spin += v.spinSpeed * dt;
    v.drift += driftRate.current * dt;
    if (groupRef.current) groupRef.current.rotation.y = v.spin;

    latLonToVector3(v.sunLat, v.sunLon, 1, sunDirection);

    const targetX = parallax ? pointerRef.current.x : 0;
    const targetY = parallax ? pointerRef.current.y : 0;
    pointer.current.x = damp(pointer.current.x, targetX, 2.6, dt);
    pointer.current.y = damp(pointer.current.y, targetY, 2.6, dt);

    // Ambient life once the flight is over: a wide, slow orbit around the target
    // plus a little pointer lean. Small enough that the marker never leaves centre.
    const t = state.clock.elapsedTime;
    const lat = v.lat + v.ambient * (Math.sin(t * 0.061) * 1.5 - pointer.current.y * 2.8);
    const lon = v.lon + v.drift + v.ambient * (Math.sin(t * 0.083) * 2.6 + pointer.current.x * 3.4);
    const distance = (v.distance + v.ambient * Math.sin(t * 0.05) * 0.05) * fitScale;

    latLonToVector3(lat, lon, distance, scratch);
    if (v.follow > 0) scratch.applyAxisAngle(UP, v.spin * v.follow);
    scratch.applyQuaternion(tilt);

    state.camera.position.copy(scratch);
    state.camera.lookAt(ORIGIN);

    // Slide the frustum so the globe sits beside the copy rather than under it.
    // Driven per frame because each section animates it to a different place.
    const perspective = state.camera as PerspectiveCamera;
    const { width, height } = state.size;
    perspective.setViewOffset(width, height, v.offsetX * width, v.offsetY * height, width, height);
    perspective.updateProjectionMatrix();
  });

  return null;
}
