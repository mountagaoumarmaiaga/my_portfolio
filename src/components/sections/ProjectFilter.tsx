"use client";

import { motion } from "framer-motion";
import { projectFilters, type ProjectFilterId } from "@/data/projects";
import { useCopy } from "@/hooks/useCopy";

interface ProjectFilterProps {
  active: ProjectFilterId;
  onChange: (id: ProjectFilterId) => void;
  counts: Record<ProjectFilterId, number>;
}

export default function ProjectFilter({ active, onChange, counts }: ProjectFilterProps) {
  const { c } = useCopy();

  return (
    <div role="group" aria-label={c.work.eyebrow} className="flex flex-wrap gap-1.5">
      {projectFilters.map((id) => {
        const selected = active === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={selected}
            className={`relative inline-flex items-center gap-2 rounded-sm px-3.5 py-2 text-[13px] transition-colors duration-300 ${
              selected ? "text-void" : "text-ink-muted hover:text-ink"
            }`}
          >
            {selected && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 rounded-sm bg-mali-green"
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
                aria-hidden="true"
              />
            )}
            <span className="relative">{c.work.filters[id]}</span>
            <span className={`relative font-mono text-[10px] ${selected ? "text-void/60" : "text-ink-ghost"}`}>
              {counts[id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
