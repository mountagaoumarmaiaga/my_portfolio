"use client";

import { useEffect } from "react";
import Image from "next/image";
import LangToggle from "./LangToggle";
import SocialIcons from "./SocialIcons";
import { navSections, site, siteCopy } from "@/data/site";
import { useCopy } from "@/hooks/useCopy";
import { scrollToSection } from "@/lib/scroll";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeSection: string;
}

/** Slides each row in behind the one above it, so the sheet arrives rather than appears. */
function rowStyle(index: number, open: boolean) {
  return {
    transitionDelay: open ? `${90 + index * 45}ms` : "0ms",
  };
}

export default function MobileMenu({ open, onClose, activeSection }: MobileMenuProps) {
  const { lang, c } = useCopy();

  // Escape closes, and the page behind must not scroll while the sheet is up.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  const go = (id: string) => {
    onClose();
    // Let the sheet start closing before the scroll begins.
    window.setTimeout(() => scrollToSection(id), 120);
  };

  const enter = "transition-all duration-500 ease-editorial";
  const shown = open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0";

  return (
    /* The header is `pointer-events-none` so clicks pass through the space
       around the floating pill; anything it contains has to opt back in. */
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-40 bg-void/[0.98] backdrop-blur-2xl transition-opacity duration-300 ease-editorial lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      hidden={!open}
    >
      {/* The body is locked while this is open, so the sheet itself has to
          scroll — on a short screen the last row would otherwise be stranded
          below the fold with no way to reach it. */}
      <nav className="shell flex h-full flex-col overflow-y-auto overscroll-contain pb-10 pt-[calc(var(--nav-h)+20px)]">
        {/* Who this belongs to. A list of six words in the dark could be anyone's. */}
        <div
          className={`border-b border-hairline pb-6 ${enter} ${shown}`}
          style={rowStyle(0, open)}
        >
          <div className="flex items-center gap-3.5">
            <Image
              src={site.photo}
              alt=""
              width={104}
              height={104}
              sizes="52px"
              className="h-[52px] w-[52px] shrink-0 rounded-full object-cover ring-1 ring-hairline-strong"
            />

            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-medium leading-snug text-ink">{site.name}</p>
              <p className="mt-1 text-[11.5px] leading-snug text-ink-faint">
                {siteCopy.role[lang]}
              </p>
            </div>
          </div>

          {/* On its own line: at 375px this badge beside the name squeezed both
              the name and the role into ellipses. */}
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-mali-green/25 bg-mali-green/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-mali-green" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-label text-mali-greenSoft">
              {siteCopy.availability[lang]}
            </span>
          </span>
        </div>

        <ul className="flex flex-col pt-2">
          {navSections.map((section, index) => {
            const current = activeSection === section.id;

            return (
              <li key={section.id} className={`${enter} ${shown}`} style={rowStyle(index + 1, open)}>
                <button
                  type="button"
                  onClick={() => go(section.id)}
                  aria-current={current ? "true" : undefined}
                  className="group flex w-full items-center gap-4 border-b border-hairline-soft py-[18px] text-left"
                >
                  <span
                    className={`font-mono text-[10px] tabular-nums transition-colors duration-300 ${
                      current ? "text-mali-green" : "text-ink-ghost"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`display flex-1 text-[27px] leading-none transition-colors duration-300 ${
                      current ? "text-mali-green" : "text-ink"
                    }`}
                  >
                    {section.label[lang]}
                  </span>

                  {/* Marks where you are, and where the tap will take you. */}
                  <svg
                    viewBox="0 0 16 16"
                    className={`h-4 w-4 shrink-0 transition-all duration-300 ease-editorial ${
                      current
                        ? "translate-x-0 text-mali-green opacity-100"
                        : "-translate-x-1 text-ink-ghost opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Pushed to the bottom on a tall screen, but never overlapping the list
            on a short one — `mt-auto` yields as soon as the content needs room. */}
        <div
          className={`mt-auto flex flex-col gap-4 pt-8 ${enter} ${shown}`}
          style={rowStyle(navSections.length + 1, open)}
        >
          <div className="flex items-center justify-between gap-3 border-t border-hairline pt-5">
            <SocialIcons />
            <LangToggle />
          </div>

          <a
            href={site.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 rounded-lg border border-hairline bg-white/[0.02] px-4 py-3.5 transition-colors duration-300 hover:border-hairline-strong"
          >
            <span className="text-[14px] text-ink">{c.nav.resume}</span>
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 shrink-0 text-ink-faint"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M2.5 13.5h11" />
            </svg>
          </a>

          <p className="font-mono text-[10px] uppercase leading-relaxed tracking-label text-ink-ghost">
            {site.location} · {siteCopy.workMode[lang]}
          </p>
        </div>
      </nav>
    </div>
  );
}
