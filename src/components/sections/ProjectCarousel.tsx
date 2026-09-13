"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, type PanInfo } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { statusTone, type Project } from "@/data/projects";
import { useCopy } from "@/hooks/useCopy";
import { useIsMobile, useReducedMotion } from "@/hooks/useEnvironment";

const EASE = [0.16, 1, 0.3, 1] as const;

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M10 3 5 8l5 5" : "m6 3 5 5-5 5"} />
    </svg>
  );
}

/**
 * A depth carousel: the current project is front and centre, its neighbours are
 * turned away into the distance.
 *
 * The neighbours are pushed well out, faded hard and blurred — at anything
 * closer they read as a double image of the card you are trying to read, which
 * is worse than having no hint of them at all.
 */
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const { lang, c } = useCopy();

  const total = projects.length;
  const clamped = Math.min(active, Math.max(0, total - 1));
  const firstId = projects[0]?.id;
  const deck = useRef(firstId);

  // A filter change swaps the whole deck underneath us.
  useEffect(() => {
    if (deck.current === firstId) return;
    deck.current = firstId;
    setActive(0);
  }, [firstId]);

  const go = useCallback((next: number) => setActive(((next % total) + total) % total), [total]);

  const onDragEnd = (_event: unknown, info: PanInfo) => {
    // Velocity counts as much as distance: a short flick should still turn it.
    const power = info.offset.x + info.velocity.x * 0.2;
    if (power < -90) go(clamped + 1);
    else if (power > 90) go(clamped - 1);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(clamped + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(clamped - 1);
    }
  };

  if (!total) {
    return (
      <p className="mt-12 rounded-lg border border-hairline bg-void/70 p-8 text-sm text-ink-muted">
        {c.work.empty}
      </p>
    );
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={c.work.carouselLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="mt-12 rounded-lg"
    >
      {/* Jump straight to a project instead of clicking through to it. */}
      <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {projects.map((project, index) => {
          const selected = index === clamped;

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => go(index)}
              aria-current={selected ? "true" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-sm border px-3 py-1.5 text-[12px] transition-colors duration-300 ${
                selected
                  ? "border-mali-green/40 bg-mali-green/10 text-ink"
                  : "border-hairline text-ink-faint hover:border-hairline-strong hover:text-ink"
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full ${
                  statusTone[project.status] === "green"
                    ? "bg-mali-green"
                    : statusTone[project.status] === "gold"
                      ? "bg-mali-gold"
                      : "bg-ink-ghost"
                }`}
                aria-hidden="true"
              />
              {project.title}
            </button>
          );
        })}
      </div>

      {/* The off-centre cards are translated well past the track, so the track has
          to clip them — otherwise they stretch the document sideways. */}
      <div className="relative -mx-6 mt-8 overflow-hidden px-6 md:-mx-10 md:px-10">
        <div
          className="relative h-[640px] w-full md:h-[600px] lg:h-[520px]"
          style={{ perspective: "1800px" }}
        >
          {projects.map((project, index) => {
            const offset = index - clamped;
            const depth = Math.abs(offset);
            const isActive = depth === 0;
            const isNeighbour = depth === 1;

            return (
              <div
                key={project.id}
                className={`absolute inset-0 flex justify-center ${
                  isActive || isNeighbour ? "" : "pointer-events-none"
                }`}
                style={{ zIndex: 20 - depth, transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="relative h-full w-[min(92vw,1020px)]"
                  animate={{
                    x: `${offset * (isMobile ? 104 : 62)}%`,
                    z: isMobile ? 0 : -depth * 280,
                    rotateY: isMobile || reducedMotion ? 0 : offset * 26,
                    scale: 1 - depth * (isMobile ? 0.05 : 0.14),
                    opacity: isActive ? 1 : isNeighbour ? 0.18 : 0,
                    filter: isActive ? "blur(0px)" : "blur(5px)",
                  }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.75, ease: EASE }}
                  drag={isActive && !reducedMotion ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.14}
                  onDragEnd={isActive ? onDragEnd : undefined}
                >
                  {/* Non-current slides are taken out of the accessibility tree and
                      the tab order; the pills below are the accessible way across. */}
                  <div
                    className={`h-full ${isActive ? "cursor-grab active:cursor-grabbing" : ""}`}
                    aria-hidden={!isActive}
                    inert={!isActive}
                  >
                    <ProjectCard
                      project={project}
                      isActive={isActive}
                      eager={depth <= 1}
                      position={index + 1}
                      total={total}
                    />
                  </div>

                  {isNeighbour && (
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden="true"
                      onClick={() => go(index)}
                      className="absolute inset-0 cursor-pointer rounded-lg"
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(clamped - 1)}
            aria-label={c.work.previous}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-hairline-strong text-ink-muted transition-colors duration-300 hover:border-white/30 hover:text-ink"
          >
            <Chevron direction="left" />
          </button>

          <p className="font-mono text-[11px] tabular-nums tracking-label text-ink-faint">
            {String(clamped + 1).padStart(2, "0")}
            <span className="text-ink-ghost"> / {String(total).padStart(2, "0")}</span>
          </p>

          <button
            type="button"
            onClick={() => go(clamped + 1)}
            aria-label={c.work.next}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-hairline-strong text-ink-muted transition-colors duration-300 hover:border-white/30 hover:text-ink"
          >
            <Chevron direction="right" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => go(index)}
              aria-label={`${c.work.show} ${project.title}`}
              aria-current={index === clamped ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-500 ease-editorial ${
                index === clamped ? "w-6 bg-mali-green" : "w-1.5 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>

        <p className="font-mono text-[10px] uppercase tracking-label text-ink-ghost">
          {c.work.hint}
        </p>
      </div>

      <p className="sr-only" aria-live="polite" lang={lang}>
        {c.work.projectOf} {clamped + 1} {c.work.slideOf} {total}: {projects[clamped]?.title}
      </p>
    </div>
  );
}
