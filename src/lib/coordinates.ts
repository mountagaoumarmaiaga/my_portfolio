import { Vector3 } from "three";

export interface GeoPoint {
  /** Degrees, positive north. */
  lat: number;
  /** Degrees, positive east. */
  lon: number;
  label?: string;
}

export const DEG2RAD = Math.PI / 180;

/**
 * Converts geographic coordinates to a point on a sphere, using the exact
 * convention of `THREE.SphereGeometry` so that a point lands on the pixel of an
 * equirectangular texture that actually depicts it.
 *
 * With `phiStart = 0`, three.js builds vertices as
 *   x = -r·sin(theta)·cos(phi), y = r·cos(theta), z = r·sin(theta)·sin(phi)
 * with `u = phi / 2π` mapped to texture-x and `1 - v` to texture-y, which gives
 *   theta = (90 - lat)°  (polar angle)   phi = (lon + 180)°  (azimuth)
 */
export function latLonToVector3(lat: number, lon: number, radius = 1, target = new Vector3()): Vector3 {
  const theta = (90 - lat) * DEG2RAD;
  const phi = (lon + 180) * DEG2RAD;

  return target.set(
    -radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.cos(theta),
    radius * Math.sin(theta) * Math.sin(phi),
  );
}

/** Inverse of {@link latLonToVector3} — useful to read a camera position back as a place. */
export function vector3ToLatLon(v: Vector3): GeoPoint {
  const r = v.length();
  if (r === 0) return { lat: 0, lon: 0 };

  const lat = 90 - Math.acos(v.y / r) / DEG2RAD;
  // Mirror of the forward transform: atan2(z, -x) recovers phi.
  const lon = Math.atan2(v.z, -v.x) / DEG2RAD - 180;

  return { lat, lon: normalizeLongitude(lon) };
}

/** Wraps any longitude into (-180, 180]. */
export function normalizeLongitude(lon: number): number {
  let l = ((lon + 180) % 360 + 360) % 360 - 180;
  if (l === -180) l = 180;
  return l;
}

/**
 * The Y rotation that brings a meridian to face the camera parked on +Z.
 *
 * A point's world azimuth (`atan2(x, z)`) is `π/2 + lon`, and rotating the
 * globe by `s` adds `s` to it — so `-(π/2 + lon)` centres that longitude.
 */
export function spinToFaceLongitude(lon: number): number {
  return -(Math.PI / 2 + lon * DEG2RAD);
}

/**
 * Rotates a spin value into the turn closest to `reference`, keeping the globe
 * from unwinding several revolutions to reach an equivalent angle.
 */
export function nearestSpin(target: number, reference: number): number {
  const turns = Math.round((reference - target) / (Math.PI * 2));
  return target + turns * Math.PI * 2;
}

/** Great-circle distance in kilometres — used by the connection map. */
export function haversineKm(a: GeoPoint, b: GeoPoint): number {
  const R = 6371;
  const dLat = (b.lat - a.lat) * DEG2RAD;
  const dLon = (b.lon - a.lon) * DEG2RAD;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * DEG2RAD) * Math.cos(b.lat * DEG2RAD) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Equirectangular projection into a 0..width / 0..height box (SVG maps). */
export function geoToEquirectangular(point: GeoPoint, width: number, height: number) {
  return {
    x: ((point.lon + 180) / 360) * width,
    y: ((90 - point.lat) / 180) * height,
  };
}
