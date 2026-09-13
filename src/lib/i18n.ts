"use client";

import { useSyncExternalStore } from "react";

export type Lang = "fr" | "en";

/** A single piece of copy in both languages. */
export type I18n = Record<Lang, string>;

/** A list of strings in both languages — bullet points, tags, and the like. */
export type I18nList = Record<Lang, string[]>;

export const LANGS: Lang[] = ["fr", "en"];

/** French is the default: this is a portfolio written from Bamako, first. */
export const DEFAULT_LANG: Lang = "fr";

const STORAGE_KEY = "portfolio-lang";

function isLang(value: unknown): value is Lang {
  return value === "fr" || value === "en";
}

let snapshot: Lang = DEFAULT_LANG;
const serverSnapshot: Lang = DEFAULT_LANG;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function setLang(next: Lang) {
  if (snapshot === next) return;
  snapshot = next;

  // Assistive tech and the browser's own translation both read this.
  document.documentElement.lang = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // A blocked storage API is not a reason to refuse to switch language.
  }

  emit();
}

/**
 * Restores a previous choice, then falls back to the browser's own preference.
 * Called once on mount — before that, and on the server, the default stands, so
 * the markup crawlers and first paint see is French.
 */
export function initLang() {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    stored = null;
  }

  if (isLang(stored)) {
    setLang(stored);
    return;
  }

  if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("en")) {
    setLang("en");
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLang(): Lang {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => serverSnapshot,
  );
}

/** Picks the active language out of a localised value. */
export function pick<T>(value: Record<Lang, T>, lang: Lang): T {
  return value[lang];
}
