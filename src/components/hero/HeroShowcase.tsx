"use client";

import Image from "next/image";
import { projects } from "@/data/projects";
import { useCopy } from "@/hooks/useCopy";

/**
 * One shipped product, framed as a browser window, sitting in front of the
 * planet. The globe says where he works; this says what comes out of it.
 *
 * NextGenStock rather than any of the other eight: it is the only one that is
 * live, priced and open for sign-up, so it is the only screenshot that doubles
 * as proof rather than illustration.
 */
const SHOWCASE_ID = "nextgenstock";

export default function HeroShowcase({ className = "" }: { className?: string }) {
  const { lang, c } = useCopy();
  const project = projects.find((entry) => entry.id === SHOWCASE_ID);

  if (!project?.image) return null;

  const href = project.links.demo ?? project.links.github;
  const host = href?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? "";

  const frame = (
    <>
      {/* Browser chrome. The address is the real one, so the shot cannot be
          mistaken for a mockup. */}
      <div className="flex items-center gap-2.5 border-b border-hairline bg-white/[0.02] px-3.5 py-2.5">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
        </span>

        {host && (
          <span className="min-w-0 flex-1 truncate rounded-sm bg-white/[0.03] px-2.5 py-1 text-center font-mono text-[9.5px] text-ink-ghost">
            {host}
          </span>
        )}
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt?.[lang] ?? project.title}
          fill
          sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 45vw, 90vw"
          className="object-cover object-top transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.02]"
          priority
        />
      </div>
    </>
  );

  return (
    <div className={`relative ${className}`}>
      {/* Lifts the card off the planet without drawing a hard edge. */}
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(60%_50%_at_50%_45%,rgba(20,180,92,0.12),rgba(5,6,8,0)_72%)]"
        aria-hidden="true"
      />

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-xl border border-hairline-strong bg-[rgba(7,9,12,0.96)] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-sm transition-colors duration-500 ease-editorial hover:border-mali-green/35"
      >
        {frame}
      </a>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="flex items-center gap-1.5 rounded-full border border-mali-green/25 bg-mali-green/10 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-mali-green" aria-hidden="true" />
          <span className="font-mono text-[9px] uppercase tracking-label text-mali-greenSoft">
            {c.hero.showcaseLabel}
          </span>
        </span>

        <p className="text-[13px] text-ink">{project.title}</p>
        <p className="text-[12px] text-ink-faint">{project.kicker[lang]}</p>
      </div>
    </div>
  );
}
