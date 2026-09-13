"use client";

import { useEffect, useRef } from "react";
import GlobeAnchor from "@/components/globe/GlobeAnchor";
import SectionTitle from "@/components/ui/SectionTitle";
import { journey } from "@/data/journey";
import { useCopy } from "@/hooks/useCopy";
import { gsap, registerGsap } from "@/lib/animations";

export default function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const { lang, c } = useCopy();

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    registerGsap();
    const ctx = gsap.context(() => {
      // The mobile spine draws itself as you read down the timeline.
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 72%", end: "bottom 82%", scrub: 0.4 },
          },
        );
      }

      list.querySelectorAll<HTMLElement>("[data-milestone]").forEach((item) => {
        const parts = item.querySelectorAll("[data-milestone-part]");

        gsap.fromTo(
          parts,
          { opacity: 0, x: item.dataset.side === "right" ? -20 : 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            // Date, then title, then the rest — the order you would read them in.
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 86%", once: true },
          },
        );
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionTitle
          index={c.journey.index}
          eyebrow={c.journey.eyebrow}
          title={
            <>
              {c.journey.titleLine1}
              <br />
              {c.journey.titleLine2}
              <span className="text-mali-gold">.</span>
            </>
          }
          description={c.journey.description}
          className="max-w-xl"
        />

        {/* On large screens the milestones sit either side of the globe, which is
            centred behind this block; below that they fall back to a spine. */}
        <ol
          ref={listRef}
          className="relative mt-16 pl-8 md:pl-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-[clamp(4rem,18vw,24rem)] lg:gap-y-12 lg:pl-0"
        >
          <span
            className="absolute bottom-2 left-[3px] top-2 w-px bg-hairline lg:hidden"
            aria-hidden="true"
          />
          <span
            ref={lineRef}
            className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-gradient-to-b from-mali-green via-mali-green/50 to-transparent lg:hidden"
            aria-hidden="true"
          />

          {journey.map((item, index) => {
            const onLeft = index % 2 === 0;
            const highlights = item.highlights[lang];

            return (
              <li
                key={item.id}
                data-milestone
                data-side={onLeft ? "left" : "right"}
                className={`relative pb-14 last:pb-0 lg:pb-0 ${onLeft ? "" : "lg:mt-24"}`}
              >
                {/* Mobile spine node */}
                <span
                  className="absolute -left-8 top-[7px] h-[7px] w-[7px] rounded-full border border-mali-green/60 bg-void md:-left-12 lg:hidden"
                  aria-hidden="true"
                />

                {/* Desktop tether, pointing in towards the planet */}
                <span
                  className={`absolute top-10 hidden h-px w-[clamp(1.5rem,5vw,5rem)] lg:block ${
                    onLeft
                      ? "left-full bg-gradient-to-r from-hairline-strong to-mali-green/50"
                      : "right-full bg-gradient-to-l from-hairline-strong to-mali-green/50"
                  }`}
                  aria-hidden="true"
                >
                  <GlobeAnchor
                    sectionId="journey"
                    side={onLeft ? "right" : "left"}
                    className={`absolute top-1/2 -translate-y-1/2 ${onLeft ? "right-0" : "left-0"}`}
                  />
                </span>

                <div className="rounded-lg lg:border lg:border-hairline lg:bg-[rgba(7,9,12,0.86)] lg:p-6 lg:backdrop-blur-sm">
                  <div className="flex flex-wrap items-center gap-3" data-milestone-part>
                    <span className="font-mono text-[11px] tracking-label text-mali-green">
                      {item.period[lang]}
                    </span>
                    <span className="h-px w-6 bg-hairline-strong" aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-label text-ink-ghost">
                      {item.kind === "work" ? c.journey.work : c.journey.education}
                    </span>
                  </div>

                  <h3
                    className="mt-3 text-balance text-xl font-medium tracking-tight md:text-2xl lg:text-xl"
                    data-milestone-part
                  >
                    {item.title[lang]}
                  </h3>

                  <p className="mt-1.5 text-[13px] text-ink-faint" data-milestone-part>
                    {item.organisation} · {item.location}
                  </p>

                  <p
                    className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-ink-muted"
                    data-milestone-part
                  >
                    {item.description[lang]}
                  </p>

                  {/* The actual work, not just the job title. */}
                  {highlights.length > 0 && (
                    <ul
                      className="mt-5 flex flex-col gap-2.5 border-t border-hairline-soft pt-5"
                      data-milestone-part
                    >
                      {highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span
                            className="mt-[9px] h-px w-3 shrink-0 bg-mali-green/60"
                            aria-hidden="true"
                          />
                          <span className="text-pretty text-[13px] leading-relaxed text-ink-muted">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
