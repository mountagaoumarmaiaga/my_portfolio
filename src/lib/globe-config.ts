import type { GeoPoint } from "./coordinates";

/** Radius of the Earth mesh in scene units. Everything else is expressed in these. */
export const EARTH_RADIUS = 1;

export const BAMAKO: GeoPoint = { lat: 12.6392, lon: -8.0029, label: "Bamako, Mali" };
export const MALI: GeoPoint = { lat: 17.0, lon: -4.0, label: "Mali" };

/**
 * The sun is parented to the Earth rather than the world, so daylight is tied to
 * geography and Bamako can never drift into night while somebody reads the page.
 * Its longitude is tweened across the intro instead: the terminator sweeps west,
 * which is what actually sells "the planet is turning", and it lands at an angle
 * that models West Africa with a visible terminator on the eastern limb.
 */
export const SUN_START: GeoPoint = { lat: 10, lon: 20 };
export const SUN_END: GeoPoint = { lat: 12, lon: -38 };

export const CAMERA = {
  fov: 38,
  near: 0.1,
  far: 120,
  /**
   * Distances are tuned against a 38 degree vertical field of view. 5.9 shows
   * the whole planet from space; 2.5 puts Mali across roughly 38% of the
   * viewport height, which is close enough to read the country rather than the
   * continent. `fitScale` widens all three on narrow viewports.
   */
  initial: { lat: 9, lon: 55, distance: 5.9 },
  mali: { distance: 3.7 },
  bamako: { distance: 2.5 },
} as const;

export const TIMELINE = {
  /** Free rotation before the camera commits to a target. */
  introHold: 2.5,
  zoomToMali: 2.5,
  zoomToBamako: 1.9,
} as const;

export const SPIN = {
  intro: 0.115,
  idle: 0.014,
} as const;

export const TEXTURES = {
  desktop: {
    day: "/textures/earth/earth_day_2048.jpg",
    night: "/textures/earth/earth_night_2048.png",
    normal: "/textures/earth/earth_normal_2048.jpg",
    specular: "/textures/earth/earth_specular_2048.jpg",
    clouds: "/textures/earth/earth_clouds_1024.png",
  },
  mobile: {
    day: "/textures/earth/earth_day_1024.jpg",
    night: "/textures/earth/earth_night_1024.jpg",
    normal: "/textures/earth/earth_normal_1024.jpg",
    specular: "/textures/earth/earth_specular_1024.jpg",
    clouds: "/textures/earth/earth_clouds_512.png",
  },
} as const;

export const QUALITY = {
  desktop: { stars: 4200, segments: 96, dpr: [1, 2] as [number, number], clouds: true, parallax: true },
  mobile: { stars: 1400, segments: 64, dpr: [1, 1.5] as [number, number], clouds: true, parallax: false },
} as const;

/** Real axial tilt, applied to the whole rig so the poles are not dead vertical. */
export const AXIAL_TILT = 23.44;

/** Fraction of the tightest half-angle of the frustum the globe should fill. */
const FIT = 0.55;
const REFERENCE_ASPECT = 1.6;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Narrow viewports need the camera further out or the globe spills sideways.
 * Shared so the camera and anything drawing lines to the globe agree on where
 * the planet actually is.
 */
export function fitScaleFor(width: number, height: number, isMobile: boolean): number {
  const aspect = width / Math.max(height, 1);
  const halfV = (CAMERA.fov / 2) * (Math.PI / 180);
  const limit = Math.min(halfV, Math.atan(Math.tan(halfV) * aspect));
  const reference = Math.min(halfV, Math.atan(Math.tan(halfV) * REFERENCE_ASPECT));
  const scale = Math.sin(FIT * reference) / Math.sin(FIT * Math.max(limit, 0.02));

  return clamp(scale * (isMobile ? 1.5 : 1), 1, 3.6);
}

/** How big the globe appears on screen, in pixels, at a given stop distance. */
export function apparentRadiusPx(
  distance: number,
  width: number,
  height: number,
  isMobile: boolean,
): number {
  const effective = distance * fitScaleFor(width, height, isMobile);
  if (effective <= EARTH_RADIUS) return height;

  const halfV = (CAMERA.fov / 2) * (Math.PI / 180);
  const angular = Math.asin(EARTH_RADIUS / effective);

  return (height / 2) * (Math.tan(angular) / Math.tan(halfV));
}

export type CameraPhase =
  | "INITIAL"
  | "ROTATING"
  | "ZOOMING_TO_MALI"
  | "ZOOMING_TO_BAMAKO"
  | "IDLE";
