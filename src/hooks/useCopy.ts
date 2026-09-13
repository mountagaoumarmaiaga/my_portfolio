"use client";

import { dictionary, type Copy } from "@/data/copy";
import { useLang, type Lang } from "@/lib/i18n";

/** The active language and every string in it. */
export function useCopy(): { lang: Lang; c: Copy } {
  const lang = useLang();
  return { lang, c: dictionary[lang] };
}
