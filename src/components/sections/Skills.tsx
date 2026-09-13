"use client";

import { useId, useMemo, useState } from "react";
import GlobeAnchor from "@/components/globe/GlobeAnchor";
import Stagger from "@/components/animations/Stagger";
import FadeUp from "@/components/animations/FadeUp";
import SectionTitle from "@/components/ui/SectionTitle";
import { disciplines, skillGroups, technologies, type SkillGroup, type Tech } from "@/data/skills";
import { projects } from "@/data/projects";
import { buildingSince } from "@/data/journey";
import { useCopy } from "@/hooks/useCopy";
import type { Copy } from "@/data/copy";
import type { Lang } from "@/lib/i18n";

/** Which shipped projects a technology actually appears in. Derived, not typed out. */
function projectsUsing(tech: Tech) {
  if (!tech.matches.length) return [];

  return projects.filter((project) =>
    project.stack.some((entry) => tech.matches.some((match) => entry.includes(match))),
  );
}

/**
 * Five dots, not a progress bar. The text alternative carries the same meaning
 * for anyone who cannot see the difference between a filled and an empty dot.
 */
function LevelDots({ level, label }: { level: number; label?: string }) {
  return (
    <span
      className="flex shrink-0 items-center gap-[3px]"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": "true" })}
    >
      {[1, 2, 3, 4, 5].map((step) => (
        <span
          key={step}
          className={`h-[5px] w-[5px] rounded-full ${step <= level ? "bg-mali-green" : "bg-white/12"}`}
        />
      ))}
    </span>
  );
}

/**
 * One technology, as a row rather than a card. Thirty-eight bordered boxes read
 * as a wall; thirty-eight ruled lines read as an index, which is what this is.
 */
function TechRow({ tech, lang, c }: { tech: Tech; lang: Lang; c: Copy }) {
  const used = projectsUsing(tech);

  return (
    <li className="group border-b border-hairline-soft py-3 last:border-b-0">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[14px] text-ink">{tech.name}</p>
        <LevelDots level={tech.level} label={c.skills.levels[tech.level]} />
      </div>

      <p className="mt-1 text-pretty text-[12px] leading-relaxed text-ink-faint">
        {tech.use[lang]}
      </p>

      {used.length > 0 && (
        <p className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-label text-ink-ghost">
            {c.skills.usedOn}
          </span>
          {used.map((project) => (
            <span
              key={project.id}
              className="rounded-sm border border-mali-gold/20 bg-mali-gold/[0.07] px-1.5 py-0.5 font-mono text-[9px] text-mali-goldSoft"
            >
              {project.title}
            </span>
          ))}
        </p>
      )}
    </li>
  );
}

export default function Skills() {
  const [group, setGroup] = useState<SkillGroup | "all">("all");
  const [query, setQuery] = useState("");
  const searchId = useId();
  const { lang, c } = useCopy();

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return technologies.filter((tech) => {
      if (group !== "all" && tech.group !== group) return false;
      if (!needle) return true;

      return (
        tech.name.toLowerCase().includes(needle) ||
        c.skills.groups[tech.group].toLowerCase().includes(needle) ||
        tech.use[lang].toLowerCase().includes(needle)
      );
    });
  }, [group, query, lang, c]);

  // Every number here is counted from the data, so none of them can go stale.
  const stats = useMemo(
    () => [
      { value: String(technologies.length), label: c.skills.stats.technologies },
      { value: String(projects.length), label: c.skills.stats.projects },
      { value: String(skillGroups.length), label: c.skills.stats.areas },
      { value: String(buildingSince), label: c.skills.stats.since },
    ],
    [c],
  );

  return (
    <section id="skills" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionTitle
          index={c.skills.index}
          eyebrow={c.skills.eyebrow}
          title={
            <>
              {c.skills.titleLine1}
              <br />
              {c.skills.titleLine2}
              <span className="text-mali-green">.</span>
            </>
          }
          description={c.skills.description}
          className="max-w-2xl"
        />

        <Stagger
          as="dl"
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline lg:grid-cols-4"
          y={16}
        >
          {stats.map((stat) => (
            <div key={stat.label} data-animate className="bg-void px-5 py-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="display text-[clamp(1.6rem,3.4vw,2.4rem)] text-mali-greenSoft">
                {stat.value}
              </dd>
              <p className="mt-2 font-mono text-[9px] uppercase leading-tight tracking-label text-ink-ghost">
                {stat.label}
              </p>
            </div>
          ))}
        </Stagger>

        <FadeUp className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label={c.skills.filterLabel} className="flex flex-wrap gap-1.5">
            {(["all", ...skillGroups] as const).map((id) => {
              const selected = group === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setGroup(id)}
                  aria-pressed={selected}
                  className={`rounded-sm border px-3 py-1.5 text-[12px] transition-colors duration-300 ${
                    selected
                      ? "border-mali-green/40 bg-mali-green/10 text-ink"
                      : "border-hairline text-ink-faint hover:border-hairline-strong hover:text-ink"
                  }`}
                >
                  {id === "all" ? c.skills.all : c.skills.groups[id]}
                </button>
              );
            })}
          </div>

          <div className="relative lg:w-72">
            <label htmlFor={searchId} className="sr-only">
              {c.skills.searchLabel}
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={c.skills.searchPlaceholder}
              className="w-full rounded-sm border border-hairline bg-white/[0.02] px-3.5 py-2 text-[13px] text-ink placeholder:text-ink-ghost focus:border-mali-green focus:outline-none"
            />
          </div>
        </FadeUp>

        {/* What the dots mean, said once, instead of relying on a tooltip. */}
        <FadeUp className="mt-5 flex flex-wrap items-center gap-3 text-ink-ghost" delay={0.06}>
          <LevelDots level={1} />
          <span className="font-mono text-[9px] uppercase tracking-label">{c.skills.levels[1]}</span>
          <span className="h-px w-6 bg-hairline-strong" aria-hidden="true" />
          <LevelDots level={5} />
          <span className="font-mono text-[9px] uppercase tracking-label">{c.skills.levels[5]}</span>
        </FadeUp>

        {/* Two disciplines either side of the planet, each wired to it. */}
        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start lg:gap-x-[clamp(3rem,12vw,14rem)]">
          {disciplines.map((discipline, index) => {
            const items = filtered.filter((tech) => tech.discipline === discipline.id);
            const onLeft = index === 0;
            const areas = skillGroups.filter((area) =>
              items.some((tech) => tech.group === area),
            );

            return (
              <div key={discipline.id} className={onLeft ? "" : "lg:mt-20"}>
                {/* Sticky so the discipline — and the line it draws to the globe —
                    stays with you the whole way down its column. */}
                <div className="relative z-10 flex items-start justify-between gap-4 border-b border-hairline bg-void/85 pb-4 pt-4 backdrop-blur-sm lg:sticky lg:top-[calc(var(--nav-h)+4px)]">
                  <div>
                    <h3 className="display text-xl">{discipline.title[lang]}</h3>
                    <p className="mt-1.5 text-[12px] text-ink-faint">{discipline.caption[lang]}</p>
                  </div>

                  <span className="flex items-center gap-2 pt-1">
                    <span className="font-mono text-[10px] tracking-label text-ink-ghost">
                      {String(items.length).padStart(2, "0")}
                    </span>
                    <GlobeAnchor sectionId="skills" side={onLeft ? "right" : "left"} />
                  </span>
                </div>

                {areas.length ? (
                  <div className="flex flex-col gap-8 pt-7">
                    {areas.map((area) => {
                      const rows = items.filter((tech) => tech.group === area);

                      return (
                        <section key={area} aria-label={c.skills.groups[area]}>
                          <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2">
                            <h4 className="eyebrow">{c.skills.groups[area]}</h4>
                            <span className="font-mono text-[10px] tracking-label text-ink-ghost">
                              {String(rows.length).padStart(2, "0")}
                            </span>
                          </div>

                          <ul className="mt-1">
                            {rows.map((tech) => (
                              <TechRow key={tech.id} tech={tech} lang={lang} c={c} />
                            ))}
                          </ul>
                        </section>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-8 rounded-lg border border-hairline bg-void/60 p-5 text-[13px] text-ink-muted">
                    {c.skills.empty}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
