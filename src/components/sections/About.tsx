"use client";

import FadeUp from "@/components/animations/FadeUp";
import SectionTitle from "@/components/ui/SectionTitle";
import Stagger from "@/components/animations/Stagger";
import { ArrowRight } from "@/components/ui/Button";
import { languages, site, siteCopy } from "@/data/site";
import { useCopy } from "@/hooks/useCopy";

/**
 * No portrait here on purpose: the globe behind this section is the picture, and
 * it is the one that says something about the work.
 */
export default function About() {
  const { lang, c } = useCopy();

  const facts = [
    { label: c.about.facts.location, value: site.location },
    { label: c.about.facts.availability, value: siteCopy.availability[lang] },
    { label: c.about.facts.workMode, value: siteCopy.workMode[lang] },
    {
      label: c.about.facts.coordinates,
      value: lang === "fr" ? "12,6392° N · 8,0029° O" : "12.6392° N · 8.0029° W",
    },
  ];

  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionTitle
          index={c.about.index}
          eyebrow={c.about.eyebrow}
          title={
            <>
              {c.about.titleLine1}
              <br />
              {c.about.titleLine2}
              <span className="text-mali-green">.</span>
            </>
          }
          className="max-w-3xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Stagger
            className="flex max-w-xl flex-col gap-5 text-pretty text-[15px] leading-relaxed text-ink-muted lg:col-span-7"
            y={20}
          >
            {c.about.paragraphs.map((paragraph) => (
              <p key={paragraph} data-animate>
                {paragraph}
              </p>
            ))}

            <FadeUp className="mt-2">
              <a
                href="#contact"
                className="group/btn inline-flex items-center gap-2 text-[13px] text-ink transition-colors hover:text-mali-greenSoft"
              >
                {c.about.cta}
                <ArrowRight />
              </a>
            </FadeUp>
          </Stagger>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <Stagger
              as="dl"
              className="flex flex-col gap-px overflow-hidden rounded-lg border border-hairline bg-hairline"
              y={16}
            >
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  data-animate
                  className="flex items-baseline justify-between gap-6 bg-void px-5 py-4"
                >
                  <dt className="eyebrow">{fact.label}</dt>
                  <dd className="text-right text-[14px] text-ink">{fact.value}</dd>
                </div>
              ))}
            </Stagger>

            <FadeUp>
              <p className="eyebrow">{c.about.facts.languages}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {languages.map((language) => (
                  <li
                    key={language.name.en}
                    className="flex items-baseline justify-between gap-4 border-b border-hairline-soft pb-2.5 last:border-b-0"
                  >
                    <span className="text-[14px] text-ink">{language.name[lang]}</span>
                    <span className="font-mono text-[10px] uppercase tracking-label text-ink-ghost">
                      {language.level[lang]}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
