"use client";

import { useEffect, useRef } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { services } from "@/data/services";
import { useCopy } from "@/hooks/useCopy";
import { gsap, registerGsap } from "@/lib/animations";

/**
 * A rail rather than a grid of boxes. The section is called "from idea to
 * production", so the four stages sit on a line that draws itself in that
 * order — horizontally once there is room, down the left edge before that.
 */
export default function Services() {
  const { lang, c } = useCopy();
  const listRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    registerGsap();
    const ctx = gsap.context(() => {
      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 80%", end: "top 40%", scrub: 0.4 },
          },
        );
      }

      list.querySelectorAll<HTMLElement>("[data-stage]").forEach((stage, index) => {
        gsap.fromTo(
          stage,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: stage, start: "top 88%", once: true },
          },
        );
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionTitle
          index={c.services.index}
          eyebrow={c.services.eyebrow}
          title={
            <>
              {c.services.titleLine1}
              <br />
              {c.services.titleLine2}
              <span className="text-mali-gold">.</span>
            </>
          }
          description={c.services.description}
          className="max-w-xl"
        />

        <ol
          ref={listRef}
          className="relative mt-16 grid grid-cols-1 gap-10 pl-12 sm:grid-cols-2 sm:pl-0 lg:mt-20 lg:grid-cols-4 lg:gap-6"
        >
          {/* The rail: vertical while the stages stack, horizontal once they
              sit side by side and the line can actually lead somewhere. */}
          <span
            className="absolute bottom-4 left-4 top-4 w-px bg-hairline sm:hidden"
            aria-hidden="true"
          />
          <span
            className="absolute left-0 right-0 top-[15px] hidden h-px bg-hairline lg:block"
            aria-hidden="true"
          />
          <span
            ref={railRef}
            className="absolute left-0 right-0 top-[15px] hidden h-px origin-left bg-gradient-to-r from-mali-green via-mali-green/60 to-transparent lg:block"
            aria-hidden="true"
          />

          {services.map((service) => (
            <li key={service.index} data-stage className="relative">
              <div className="flex items-center gap-4 lg:block">
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline-strong bg-void font-mono text-[10px] tracking-label text-mali-green max-sm:absolute max-sm:-left-12 max-sm:top-0">
                  {service.index}
                </span>

                <h3 className="text-balance text-lg font-medium tracking-tight lg:mt-6 lg:text-xl">
                  {service.title[lang]}
                </h3>
              </div>

              <p className="mt-3 text-pretty text-[13px] leading-relaxed text-ink-muted">
                {service.description[lang]}
              </p>

              <ul className="mt-5 flex flex-col gap-2 border-t border-hairline-soft pt-5">
                {service.deliverables[lang].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-[7px] h-px w-2.5 shrink-0 bg-mali-gold/70" aria-hidden="true" />
                    <span className="text-[12px] leading-relaxed text-ink-faint">{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
