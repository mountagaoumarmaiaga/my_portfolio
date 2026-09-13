"use client";

import { useEffect, useMemo, useState } from "react";
import ProjectCarousel from "./ProjectCarousel";
import ProjectFilter from "./ProjectFilter";
import FadeUp from "@/components/animations/FadeUp";
import SectionTitle from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/Button";
import { projectFilters, projects, type ProjectFilterId } from "@/data/projects";
import { site } from "@/data/site";
import { useCopy } from "@/hooks/useCopy";
import { ScrollTrigger } from "@/lib/animations";

export default function FeaturedProjects() {
  const [active, setActive] = useState<ProjectFilterId>("all");
  const { c } = useCopy();

  const counts = useMemo(() => {
    const result = {} as Record<ProjectFilterId, number>;

    for (const id of projectFilters) {
      result[id] =
        id === "all" ? projects.length : projects.filter((project) => project.category === id).length;
    }

    return result;
  }, []);

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((project) => project.category === active)),
    [active],
  );

  // The carousel is a fixed height, but the pill row above it can rewrap, so
  // anything measured below has to be told where the page ends now.
  useEffect(() => {
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 420);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <section id="work" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            index={c.work.index}
            eyebrow={c.work.eyebrow}
            title={
              <>
                {c.work.titleLine1}
                <br />
                {c.work.titleLine2}
                <span className="text-mali-green">.</span>
              </>
            }
            className="md:max-w-xl"
          />

          <FadeUp delay={0.1}>
            <ProjectFilter active={active} onChange={setActive} counts={counts} />
          </FadeUp>
        </div>

        <ProjectCarousel projects={visible} />

        <FadeUp className="mt-14">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2 text-[13px] text-ink-muted transition-colors hover:text-ink"
          >
            {c.work.githubLink}
            <ArrowRight />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
