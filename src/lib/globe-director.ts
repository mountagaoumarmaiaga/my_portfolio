"use client";

import { useSyncExternalStore } from "react";
import { BAMAKO, type CameraPhase } from "./globe-config";
import type { I18n } from "./i18n";

/**
 * One framing of the globe, claimed by one section.
 *
 * The globe is a single persistent object behind the whole page; sections do not
 * own a copy of it, they take turns pointing it somewhere. That is what makes the
 * page read as one continuous place rather than a hero followed by documents.
 */
export interface GlobeStop {
  /** Must match the `id` of the section that claims it. */
  id: string;
  lat: number;
  lon: number;
  /** Camera distance in Earth radii, before the aspect-ratio fit. */
  distance: number;
  /** Frustum slide as a fraction of the viewport. Negative x pushes the globe right. */
  offsetX: number;
  offsetY: number;
  /** 0 = full presence, 1 = pushed right back behind the content. */
  dim: number;
  /** Degrees per second of slow longitude travel while this stop is held. */
  lonDrift: number;
  /** Whether the connection arcs out of Bamako are drawn. */
  arcs: boolean;
  /** Heads-up caption, so the globe always says what it is showing. */
  caption: I18n;
  detail: I18n;
}

const HOME = { lat: BAMAKO.lat, lon: BAMAKO.lon };

/**
 * Scroll order matters here: each entry is bound to its section by id.
 * Text-heavy sections push the globe further away and further out of the way;
 * the two sections that are *about* place — the journey and the reach — bring it
 * back to the centre.
 */
export const GLOBE_STOPS: GlobeStop[] = [
  {
    id: "hero",
    ...HOME,
    distance: 2.5,
    offsetX: -0.17,
    offsetY: 0,
    dim: 0,
    lonDrift: 0,
    arcs: false,
    caption: { fr: "Bamako, Mali", en: "Bamako, Mali" },
    detail: { fr: "12,6392° N · 8,0029° O", en: "12.6392° N · 8.0029° W" },
  },
  {
    id: "profile",
    ...HOME,
    distance: 3.6,
    offsetX: -0.32,
    offsetY: 0,
    dim: 0.58,
    lonDrift: 0,
    arcs: false,
    caption: { fr: "Port d'attache", en: "Home base" },
    detail: { fr: "Là où le travail se fait", en: "Where the work gets made" },
  },
  {
    id: "work",
    ...HOME,
    distance: 4.4,
    offsetX: -0.44,
    offsetY: 0,
    dim: 0.78,
    lonDrift: 0,
    arcs: false,
    caption: { fr: "Livré d'ici", en: "Shipped from here" },
    detail: { fr: "9 projets · depuis 2022", en: "9 projects · since 2022" },
  },
  {
    id: "journey",
    ...HOME,
    distance: 2.3,
    offsetX: 0,
    offsetY: 0,
    dim: 0.52,
    lonDrift: 0,
    arcs: false,
    caption: { fr: "Bamako, Mali", en: "Bamako, Mali" },
    detail: { fr: "2019 — aujourd'hui", en: "2019 — today" },
  },
  {
    id: "skills",
    ...HOME,
    distance: 2.9,
    offsetX: 0,
    offsetY: 0,
    dim: 0.72,
    lonDrift: 0,
    arcs: false,
    caption: { fr: "Boîte à outils", en: "Toolkit" },
    detail: { fr: "Fullstack · Data Science", en: "Fullstack · Data Science" },
  },
  {
    id: "services",
    ...HOME,
    distance: 4.5,
    offsetX: -0.42,
    offsetY: 0,
    dim: 0.8,
    lonDrift: 0,
    arcs: false,
    caption: { fr: "De l'idée à la production", en: "Idea to production" },
    detail: { fr: "Quatre portes d'entrée", en: "Four ways in" },
  },
  {
    id: "about",
    ...HOME,
    distance: 2.8,
    offsetX: -0.3,
    offsetY: 0,
    dim: 0.44,
    lonDrift: 0,
    arcs: false,
    caption: { fr: "Bamako, Mali", en: "Bamako, Mali" },
    detail: { fr: "Remote · Hybride · Sur site", en: "Remote · Hybrid · On-site" },
  },
  {
    id: "global",
    lat: 20,
    lon: BAMAKO.lon,
    distance: 6.9,
    offsetX: 0,
    offsetY: 0,
    dim: 0.22,
    // Slow enough to read as a planet turning, fast enough that every arc gets
    // its moment while the section is on screen.
    lonDrift: 3.2,
    arcs: true,
    caption: { fr: "Bamako → le monde", en: "Bamako → the world" },
    detail: { fr: "6 liaisons · 4 continents", en: "6 links · 4 continents" },
  },
  {
    id: "contact",
    ...HOME,
    distance: 3.4,
    offsetX: -0.42,
    offsetY: 0,
    dim: 0.72,
    lonDrift: 0,
    arcs: false,
    caption: { fr: "Bamako, Mali", en: "Bamako, Mali" },
    detail: { fr: "Ouvert aux opportunités", en: "Open to opportunities" },
  },
];

const STOPS_BY_ID = new Map(GLOBE_STOPS.map((stop) => [stop.id, stop]));

export const getStop = (id: string): GlobeStop => STOPS_BY_ID.get(id) ?? GLOBE_STOPS[0];

/**
 * Narrow screens have no room beside the globe, so the frustum slides vertically
 * instead of horizontally and everything sits further back.
 */
export function forViewport(stop: GlobeStop, isMobile: boolean): GlobeStop {
  if (!isMobile) return stop;

  return {
    ...stop,
    offsetX: 0,
    offsetY: stop.id === "hero" ? 0.19 : 0.06,
    dim: stop.id === "hero" ? stop.dim : Math.min(0.88, stop.dim + 0.12),
  };
}

interface GlobeSnapshot {
  stopId: string;
  phase: CameraPhase;
  /** True once the scene is on screen — or once we know it never will be. */
  ready: boolean;
}

/**
 * A module-level store rather than context: the globe layer, the hero copy and
 * the scroll bindings are siblings in the tree, and none of them should have to
 * own the others to talk about which stop is active.
 */
let snapshot: GlobeSnapshot = { stopId: "hero", phase: "INITIAL", ready: false };
const serverSnapshot: GlobeSnapshot = snapshot;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function setGlobeStop(id: string) {
  if (snapshot.stopId === id || !STOPS_BY_ID.has(id)) return;
  snapshot = { ...snapshot, stopId: id };
  emit();
}

export function setGlobePhase(phase: CameraPhase) {
  if (snapshot.phase === phase) return;
  snapshot = { ...snapshot, phase };
  emit();
}

/** Releases the hero copy, whether the globe loaded or was never possible. */
export function setGlobeReady() {
  if (snapshot.ready) return;
  snapshot = { ...snapshot, ready: true };
  emit();
}

/**
 * Elements that want a drawn line to the globe register here, keyed by the
 * section that owns them. `GlobeTether` reads them back on scroll; nothing is
 * stored but live DOM nodes, so a card that re-renders or unmounts cleans up.
 */
const anchors = new Map<string, Set<HTMLElement>>();

export function registerGlobeAnchor(sectionId: string, element: HTMLElement) {
  const set = anchors.get(sectionId) ?? new Set<HTMLElement>();
  set.add(element);
  anchors.set(sectionId, set);

  return () => {
    set.delete(element);
    if (!set.size) anchors.delete(sectionId);
  };
}

export function anchorsFor(sectionId: string): HTMLElement[] {
  return [...(anchors.get(sectionId) ?? [])];
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useGlobeState(): GlobeSnapshot {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => serverSnapshot,
  );
}
