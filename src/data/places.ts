import { haversineKm, type GeoPoint } from "@/lib/coordinates";
import { BAMAKO } from "@/lib/globe-config";
import type { I18n } from "@/lib/i18n";

export interface Destination extends GeoPoint {
  id: string;
  /** City names stay as they are; only the country is translated. */
  label: string;
  region: I18n;
}

/**
 * The other end of every connection line, on the globe and in the section that
 * lists them. Two African neighbours first, then the wider world — the order the
 * arcs are drawn in.
 */
export const destinations: Destination[] = [
  { id: "dakar", label: "Dakar", region: { fr: "Sénégal", en: "Senegal" }, lat: 14.7167, lon: -17.4677 },
  { id: "nairobi", label: "Nairobi", region: { fr: "Kenya", en: "Kenya" }, lat: -1.2921, lon: 36.8219 },
  { id: "paris", label: "Paris", region: { fr: "France", en: "France" }, lat: 48.8566, lon: 2.3522 },
  {
    id: "new-york",
    label: "New York",
    region: { fr: "États-Unis", en: "United States" },
    lat: 40.7128,
    lon: -74.006,
  },
  {
    id: "dubai",
    label: "Dubaï",
    region: { fr: "Émirats arabes unis", en: "UAE" },
    lat: 25.2048,
    lon: 55.2708,
  },
  {
    id: "singapore",
    label: "Singapour",
    region: { fr: "Singapour", en: "Singapore" },
    lat: 1.3521,
    lon: 103.8198,
  },
];

export const destinationsWithDistance = destinations.map((destination) => ({
  ...destination,
  km: Math.round(haversineKm(BAMAKO, destination)),
}));
