"use client";

import Image from "next/image";
import { ArrowRight } from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { statusTone, type Project } from "@/data/projects";
import { fill } from "@/data/copy";
import { useCopy } from "@/hooks/useCopy";

interface ProjectCardProps {
  project: Project;
  /** Only the front card of the carousel is interactive and readable. */
  isActive: boolean;
  /** The front card and its neighbours fetch straight away; the rest wait. */
  eager: boolean;
  position: number;
  total: number;
}

/**
 * One slide of the carousel: the argument on the left, the thing itself on the
 * right. The metrics sit between them because they get read before the prose.
 *
 * The background is all but opaque on purpose — at anything less, the cards
 * parked behind it show through and the reader is looking at three projects at
 * once.
 */
export default function ProjectCard({
  project,
  isActive,
  eager,
  position,
  total,
}: ProjectCardProps) {
  const { lang, c } = useCopy();
  const { demo, github } = project.links;

  return (
    <article
      className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-hairline bg-[rgba(7,9,12,0.975)] backdrop-blur-xl lg:flex-row"
      aria-roledescription="slide"
      aria-label={`${position} ${c.work.slideOf} ${total}: ${project.title}`}
    >
      <div className="flex flex-1 flex-col gap-5 p-6 md:p-8 lg:w-[46%] lg:flex-none">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-label text-mali-green">
            {project.kicker[lang]}
          </p>
          <span className="flex items-center gap-3">
            <Badge tone={statusTone[project.status]} dot>
              {c.work.statuses[project.status]}
            </Badge>
            <span className="font-mono text-[10px] tracking-label text-ink-ghost">
              {project.year[lang]}
            </span>
          </span>
        </div>

        <div>
          <h3 className="display text-[clamp(1.5rem,3vw,2.1rem)]">{project.title}</h3>
          <p className="mt-2.5 text-pretty text-sm leading-relaxed text-ink-muted">
            {project.summary[lang]}
          </p>
        </div>

        <p className="hidden text-pretty text-[13px] leading-relaxed text-ink-faint md:block">
          {project.detail[lang]}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <Badge tone={project.category === "hybrid" ? "gold" : "neutral"} dot>
            {c.work.categories[project.category]}
          </Badge>
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-sm border border-hairline px-2 py-1 font-mono text-[10px] text-ink-faint"
            >
              {tech}
            </span>
          ))}
        </div>

        <dl className="mt-auto grid grid-cols-3 gap-px overflow-hidden rounded-md border border-hairline bg-hairline">
          {project.metrics.map((metric) => (
            <div key={metric.label[lang]} className="bg-void/80 px-3 py-3">
              <dt className="sr-only">{metric.label[lang]}</dt>
              <dd className="text-balance text-[15px] font-medium leading-tight text-mali-goldSoft">
                {metric.value[lang]}
              </dd>
              <p className="mt-1.5 font-mono text-[9px] uppercase leading-tight tracking-label text-ink-ghost">
                {metric.label[lang]}
              </p>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-5">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? undefined : -1}
              className="group/btn inline-flex items-center gap-2 text-[13px] text-ink transition-colors hover:text-mali-greenSoft"
              aria-label={fill(c.work.viewProjectA11y, project.title)}
            >
              {c.work.viewProject}
              <ArrowRight />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? undefined : -1}
              className="group/btn inline-flex items-center gap-2 text-[13px] text-ink-muted transition-colors hover:text-ink"
              aria-label={fill(c.work.sourceA11y, project.title)}
            >
              GitHub
              <ArrowRight />
            </a>
          )}
          {!demo && !github && (
            <span className="font-mono text-[10px] uppercase tracking-label text-ink-ghost">
              {c.work.privateWork}
            </span>
          )}
        </div>
      </div>

      {/* The product itself, framed like the window it actually runs in. */}
      <div className="relative min-h-[180px] flex-1 border-t border-hairline p-4 lg:border-l lg:border-t-0 lg:p-6">
        <div className="flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-void/70">
          <div className="flex items-center gap-2 border-b border-hairline px-3 py-2">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
            </span>
            <span className="truncate font-mono text-[9px] uppercase tracking-label text-ink-ghost">
              {project.index} · {project.title}
            </span>
          </div>

          <div className="relative flex-1 overflow-hidden">
            {project.image ? (
              <>
                <Image
                  src={project.image}
                  alt={project.imageAlt?.[lang] ?? project.title}
                  fill
                  sizes="(max-width: 1024px) 92vw, 520px"
                  loading={eager ? "eager" : "lazy"}
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </>
            ) : (
              /* No screenshot yet. A drawn frame is honest; another project's
                 image would not be. */
              <div
                className="absolute inset-0 flex flex-col justify-end gap-3 bg-[radial-gradient(120%_90%_at_20%_0%,rgba(20,180,92,0.10)_0%,rgba(5,6,8,0)_60%)] p-5"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <p className="display relative text-[clamp(1.3rem,2.4vw,1.9rem)] text-ink-faint">
                  {project.title}
                </p>
                <p className="relative font-mono text-[10px] uppercase tracking-label text-ink-ghost">
                  {project.stack.slice(0, 3).join(" · ")}
                </p>
              </div>
            )}
          </div>

          <p className="flex gap-3 border-t border-hairline px-3 py-3 text-[12px] leading-relaxed text-ink">
            <span className="mt-[6px] h-px w-4 shrink-0 bg-mali-gold" aria-hidden="true" />
            <span>
              <span className="sr-only">{c.work.result} </span>
              {project.result[lang]}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
