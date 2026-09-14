"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import HeroShowcase from "./HeroShowcase";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { useCopy } from "@/hooks/useCopy";
import { gsap, registerGsap } from "@/lib/animations";
import { useGlobeState } from "@/lib/globe-director";
import { site, siteCopy } from "@/data/site";

/**
 * The hero owns the copy only. The globe behind it belongs to the whole page —
 * see `GlobeLayer` — which is why scrolling away reframes it rather than
 * leaving it behind.
 *
 * The name is the headline. The role and the location are read from `site` and
 * `siteCopy` rather than restated in the hero dictionary, so the page can only
 * ever state them one way.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const { lang, c } = useCopy();
  const { phase, ready } = useGlobeState();

  // Hide the copy before first paint so it cannot flash in ahead of the globe.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    registerGsap();
    gsap.set(root.querySelectorAll("[data-hero-line]"), { yPercent: 112 });
    gsap.set(root.querySelectorAll("[data-hero-fade]"), { opacity: 0, y: 16 });
  }, []);

  useEffect(() => {
    if (!ready) return;

    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(root.querySelectorAll("[data-hero-line]"), { yPercent: 0 });
      gsap.set(root.querySelectorAll("[data-hero-fade]"), { opacity: 1, y: 0 });
      return;
    }

    const eyebrow = root.querySelector("[data-hero-eyebrow]");
    const lines = root.querySelectorAll("[data-hero-line]");
    const rest = root.querySelectorAll("[data-hero-fade]:not([data-hero-eyebrow])");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.7 })
      .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.11, ease: "power4.out" }, "-=0.36")
      .to(rest, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.58");

    return () => {
      tl.kill();
    };
  }, [ready]);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative isolate flex min-h-screen w-full flex-col overflow-hidden [min-height:100svh]"
    >
      {/* Keeps the copy legible wherever the planet happens to sit behind it. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(5,6,8,0)_0%,rgba(5,6,8,0.62)_30%,rgba(5,6,8,0.93)_46%,rgba(5,6,8,0.97)_100%)] md:bg-[radial-gradient(78%_100%_at_0%_50%,rgba(5,6,8,0.94)_0%,rgba(5,6,8,0.6)_46%,rgba(5,6,8,0)_76%)]"
        aria-hidden="true"
      />

      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-12 pt-[26vh] md:justify-center md:pb-28 md:pt-[var(--nav-h)]">
        <div className="grid items-center gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-x-[clamp(2.5rem,5vw,5rem)]">
          <div>
            <p className="eyebrow" data-hero-fade data-hero-eyebrow>
              {siteCopy.role[lang]}
            </p>

            {/* One masked wrapper per line so it can slide up on its own. The
                clamp is sized so the name never wraps — a wrapped line would
                slide as one block and the effect would fall apart. */}
            <h1 className="display mt-6 text-[clamp(1.6rem,4.1vw,3rem)] leading-[1.04]">
              <span className="-mb-[0.16em] block overflow-hidden pb-[0.16em]">
                <span className="block whitespace-nowrap" data-hero-line>
                  {site.name}
                  <span className="text-mali-green">.</span>
                </span>
              </span>
            </h1>

            <p
              className="mt-6 max-w-[34rem] text-pretty text-[15.5px] leading-relaxed text-ink-muted md:text-[16.5px]"
              data-hero-fade
            >
              {c.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3" data-hero-fade>
              <ButtonLink href="#work" size="lg">
                {c.hero.primaryCta}
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary" size="lg">
                {c.hero.secondaryCta}
              </ButtonLink>
            </div>

            {/* Where he is, how he works and how far he reaches — one line,
                said once. It used to be split between here and the subtitle. */}
            <p
              className="mt-7 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase leading-relaxed tracking-label text-ink-faint md:mt-8"
              data-hero-fade
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-mali-green/60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mali-green" />
              </span>
              {c.hero.meta}
            </p>
          </div>

          <HeroShowcase className="hidden lg:block" />
        </div>
      </div>

      <div
        className="shell pointer-events-none relative z-10 flex items-end justify-between pb-6 md:pb-8"
        data-hero-fade
      >
        <div className="flex items-center gap-4">
          <span className="relative block h-7 w-px overflow-hidden bg-hairline md:h-10" aria-hidden="true">
            <span className="absolute inset-0 block bg-gradient-to-b from-mali-green to-transparent motion-safe:animate-scroll-line" />
          </span>
          <span className="eyebrow">{c.hero.scroll}</span>
        </div>

        <span className="hidden font-mono text-[10px] uppercase tracking-label text-ink-ghost md:block">
          {phase === "IDLE"
            ? lang === "fr"
              ? "12,6392° N · 8,0029° O"
              : "12.6392° N · 8.0029° W"
            : c.hero.establishing}
        </span>
      </div>
    </section>
  );
}
