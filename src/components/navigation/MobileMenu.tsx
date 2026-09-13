"use client";

import { useEffect } from "react";
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

export default function MobileMenu({ open, onClose, activeSection }: MobileMenuProps) {
  const { lang } = useCopy();

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

  return (
    /* The header is `pointer-events-none` so clicks pass through the space
       around the floating pill; anything it contains has to opt back in. */
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-40 bg-void/97 backdrop-blur-xl transition-opacity duration-300 ease-editorial lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      hidden={!open}
    >
      {/* The body is locked while this is open, so the sheet itself has to
          scroll — on a short screen the last row would otherwise be stranded
          below the fold with no way to reach it. */}
      <nav className="shell flex h-full flex-col justify-between gap-10 overflow-y-auto overscroll-contain pb-12 pt-[calc(var(--nav-h)+24px)]">
        <ul className="flex flex-col gap-1">
          {navSections.map((section, index) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => go(section.id)}
                aria-current={activeSection === section.id ? "true" : undefined}
                className="group flex w-full items-baseline gap-4 border-b border-hairline py-4 text-left"
              >
                <span className="font-mono text-[10px] text-mali-green">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`display text-3xl transition-colors ${
                    activeSection === section.id ? "text-mali-green" : "text-ink"
                  }`}
                >
                  {section.label[lang]}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5">
          <LangToggle className="self-start" />

          <div className="-mx-2 border-t border-hairline pt-4">
            <SocialIcons withLabels withResume />
          </div>

          <p className="font-mono text-[10px] uppercase tracking-label text-ink-ghost">
            {siteCopy.role[lang]} · {site.location}
          </p>
        </div>
      </nav>
    </div>
  );
}
