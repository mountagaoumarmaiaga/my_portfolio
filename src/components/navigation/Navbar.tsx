"use client";

import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";
import LangToggle from "./LangToggle";
import MobileMenu from "./MobileMenu";
import SocialIcons from "./SocialIcons";
import { navSections, site } from "@/data/site";
import { useCopy } from "@/hooks/useCopy";
import { scrollToSection } from "@/lib/scroll";

/**
 * A floating pill rather than a full-width bar, with the primary action carried
 * on a curved panel that bleeds into the right-hand corner.
 *
 * The curve is an SVG stretched to the panel with `preserveAspectRatio="none"`,
 * so it keeps its shape at every width without a media query, and the pill's own
 * `overflow-hidden` trims it to the rounded corner.
 */
export default function Navbar() {
  const { lang, c } = useCopy();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tracks the section currently crossing the upper third of the viewport.
  useEffect(() => {
    const targets = navSections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -62% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 md:top-4">
      {/* The sheet is a child of this header and carries z-40, so without a
          higher z-index of its own the pill — and the close button inside it —
          is painted over and swallowed by the overlay the moment it opens. */}
      <div className="shell relative z-50">
        <div
          className={`pointer-events-auto relative flex h-16 items-center overflow-hidden rounded-[28px] border pl-3 transition-colors duration-500 ease-editorial md:pl-4 ${
            scrolled
              ? "border-hairline-strong bg-[rgba(8,10,14,0.88)] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl"
              : "border-hairline bg-[rgba(8,10,14,0.64)] backdrop-blur-lg"
          }`}
        >
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("hero");
            }}
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${site.name} — ${c.nav.backToTop}`}
          >
            <BrandMark className="h-9 w-9 shrink-0 transition-transform duration-500 ease-editorial group-hover:scale-105" />

            <span className="flex flex-col leading-tight">
              <span className="text-[13px] font-medium tracking-tight">
                Mountaga
                <span className="hidden text-ink-faint xl:inline"> Oumar Maiga</span>
              </span>
              <span className="hidden whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.1em] text-ink-ghost xl:block">
                {c.nav.tagline}
              </span>
            </span>
          </a>

          <span className="mx-4 hidden h-7 w-px shrink-0 bg-hairline lg:block" aria-hidden="true" />

          <nav aria-label={c.nav.sections} className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(section.id);
                    }}
                    aria-current={active === section.id ? "true" : undefined}
                    className={`relative block whitespace-nowrap rounded-sm px-2.5 py-2 text-[13px] transition-colors duration-300 ${
                      active === section.id ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {section.label[lang]}
                    <span
                      className={`absolute inset-x-2.5 bottom-0.5 h-[2px] origin-left rounded-full bg-mali-green transition-transform duration-300 ease-editorial ${
                        active === section.id ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 pl-3">
            <SocialIcons className="hidden xl:flex" compact withResume />

            <LangToggle className="hidden sm:flex" />

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? c.nav.closeMenu : c.nav.openMenu}
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-300 ease-editorial lg:hidden ${
                menuOpen
                  ? "border-mali-green/40 bg-mali-green/[0.12]"
                  : "border-hairline-strong hover:border-ink-ghost"
              }`}
            >
              {/* Both bars are absolutely positioned so that, open, they sit on
                  the same centre line and rotate about it — an exact cross.
                  Offsetting them with a flex gap only ever approximates one. */}
              <span className="relative block h-[18px] w-[18px]" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-[1.5px] rounded-full bg-ink transition-all duration-300 ease-editorial ${
                    menuOpen ? "top-[8px] w-[18px] rotate-45" : "top-[5px] w-[18px]"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] rounded-full bg-ink transition-all duration-300 ease-editorial ${
                    menuOpen ? "top-[8px] w-[18px] -rotate-45" : "top-[11px] w-[11px]"
                  }`}
                />
              </span>
            </button>

            {/* The call to action rides a curve into the corner of the pill. */}
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("contact");
              }}
              className="group/cta relative flex h-16 shrink-0 items-center gap-2.5 self-stretch pl-9 pr-2 text-void sm:pl-12 sm:pr-3"
            >
              <svg
                className="absolute inset-0 -z-10 h-full w-full"
                viewBox="0 0 200 64"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="nav-cta" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0B8A44" />
                    <stop offset="100%" stopColor="#14B45C" />
                  </linearGradient>
                </defs>
                <path d="M200 0H74C46 0 60 64 26 64H200Z" fill="url(#nav-cta)" />
              </svg>

              <span className="hidden text-[13px] font-medium md:inline">{c.nav.cta}</span>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-void/85 text-mali-greenSoft transition-transform duration-500 ease-editorial group-hover/cta:translate-x-0.5">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeSection={active} />
    </header>
  );
}
