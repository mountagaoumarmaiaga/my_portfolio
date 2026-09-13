"use client";

import Stagger from "@/components/animations/Stagger";
import SectionTitle from "@/components/ui/SectionTitle";
import { destinationsWithDistance } from "@/data/places";
import { useCopy } from "@/hooks/useCopy";

/**
 * The one section that asks the globe to pull back and show the whole planet.
 * The arcs are drawn on the globe itself — see `GlobeArcs` — so these cards are
 * the legend for something the reader is already looking at, not a second map.
 */
export default function GlobalSection() {
  const { lang, c } = useCopy();

  return (
    <section id="global" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionTitle
          index={c.global.index}
          eyebrow={c.global.eyebrow}
          title={
            <>
              {c.global.titleLine1}
              <br />
              {c.global.titleLine2}
              <span className="text-mali-green">.</span>
            </>
          }
          description={c.global.description}
          className="max-w-2xl"
        />

        <Stagger
          as="ul"
          className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-24 lg:items-start lg:gap-x-[clamp(4rem,20vw,26rem)] lg:gap-y-6"
          y={18}
        >
          {destinationsWithDistance.map((destination, index) => {
            const onLeft = index % 2 === 0;

            return (
              <li
                key={destination.id}
                data-animate
                className={`relative rounded-lg border border-hairline bg-[rgba(7,9,12,0.82)] p-5 backdrop-blur-sm ${
                  onLeft ? "" : "lg:mt-10"
                }`}
              >
                {/* Tether pointing in at the planet this line actually lands on. */}
                <span
                  className={`absolute top-8 hidden h-px w-[clamp(1.5rem,6vw,6rem)] lg:block ${
                    onLeft
                      ? "left-full bg-gradient-to-r from-hairline-strong to-mali-gold/50"
                      : "right-full bg-gradient-to-l from-hairline-strong to-mali-gold/50"
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={`absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-mali-gold/70 ${
                      onLeft ? "right-0" : "left-0"
                    }`}
                  />
                </span>

                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[15px] text-ink">{destination.label}</p>
                  <p className="font-mono text-[10px] tracking-label text-mali-gold">
                    {destination.km.toLocaleString(lang === "fr" ? "fr-FR" : "en-US")} km
                  </p>
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-ink-ghost">
                  {destination.region[lang]}
                </p>
              </li>
            );
          })}
        </Stagger>

        <Stagger
          as="ol"
          className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-3"
          y={16}
        >
          {c.global.rings.map((ring, index) => (
            <li key={ring.label} data-animate className="flex items-baseline gap-3 bg-void p-5">
              <span className="font-mono text-[10px] tracking-label text-mali-green">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block text-[14px] text-ink">{ring.label}</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-label text-ink-ghost">
                  {ring.detail}
                </span>
              </span>
            </li>
          ))}
        </Stagger>

        <p className="mt-10 max-w-xl text-pretty text-[13px] leading-relaxed text-ink-faint">
          {c.global.note}
        </p>
      </div>
    </section>
  );
}
