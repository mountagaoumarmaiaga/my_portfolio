"use client";

import { useEffect } from "react";
import { initLang } from "@/lib/i18n";

/**
 * Restores a stored language choice on mount. Nothing renders: the server and
 * the first paint are always French, and this only moves off it if the visitor
 * asked to, or their browser is set to English.
 */
export default function LangInit() {
  useEffect(() => {
    initLang();
  }, []);

  return null;
}
