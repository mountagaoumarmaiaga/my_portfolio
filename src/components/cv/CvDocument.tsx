"use client";

import { journey } from "@/data/journey";
import { projects } from "@/data/projects";
import { disciplines, skillGroups, technologies } from "@/data/skills";
import { languages, site, siteCopy } from "@/data/site";
import { useCopy } from "@/hooks/useCopy";
import type { I18n } from "@/lib/i18n";

/**
 * The CV as a document, not a picture of one.
 *
 * The previous CV.pdf was three flat images exported from Canva: no font
 * objects, no text layer, no link annotations. An applicant tracking system
 * extracts nothing from that, so a recruiter's pipeline sees an empty
 * candidate. Nobody could copy the email address either.
 *
 * This renders the same information as real text, from the same data the site
 * reads, so the two can never drift apart. Printing it to PDF produces a file
 * a parser can actually read.
 *
 * Deliberately one column: multi-column layouts confuse text extraction, which
 * reads across the page and interleaves the columns.
 */

const t = {
  print: { fr: "Imprimer / Enregistrer en PDF", en: "Print / Save as PDF" },
  backToSite: { fr: "Retour au portfolio", en: "Back to the portfolio" },
  profile: { fr: "Profil", en: "Profile" },
  experience: { fr: "Expérience professionnelle", en: "Professional experience" },
  education: { fr: "Formation", en: "Education" },
  projectsTitle: { fr: "Projets sélectionnés", en: "Selected projects" },
  skills: { fr: "Compétences techniques", en: "Technical skills" },
  languagesTitle: { fr: "Langues", en: "Languages" },
  strengths: { fr: "Points forts", en: "Strengths" },
  stack: { fr: "Stack", en: "Stack" },
  hint: {
    fr: "Astuce : dans la boîte d'impression, choisissez « Enregistrer au format PDF », marges par défaut, et cochez « Graphiques d'arrière-plan ».",
    en: "Tip: in the print dialog choose “Save as PDF”, default margins, and tick “Background graphics”.",
  },
} satisfies Record<string, I18n>;

/** Section heading plus the rule under it, used for every block. */
function Heading({ children }: { children: string }) {
  return (
    <h2 className="mb-3 border-b border-neutral-300 pb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-900">
      {children}
    </h2>
  );
}

export default function CvDocument() {
  const { lang, c } = useCopy();

  const work = journey.filter((item) => item.kind === "work");
  const education = journey.filter((item) => item.kind === "education");

  // Phone and email as plain, selectable, copyable text — the whole point.
  const contact = [
    site.email,
    site.whatsapp,
    site.location,
    site.github.replace(/^https?:\/\//, ""),
    site.linkedin.replace(/^https?:\/\//, ""),
  ];

  return (
    <div className="min-h-screen bg-neutral-200 py-10 print:bg-white print:py-0">
      {/* Screen-only controls. `print:hidden` keeps them off the page. */}
      <div className="mx-auto mb-6 flex max-w-[21cm] flex-wrap items-center gap-3 px-4 print:hidden">
        <a
          href="/"
          className="rounded-md border border-neutral-400 px-4 py-2 text-[13px] text-neutral-700 transition-colors hover:bg-white"
        >
          ← {t.backToSite[lang]}
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md bg-neutral-900 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-neutral-700"
        >
          {t.print[lang]}
        </button>
        <p className="text-[12px] text-neutral-600">{t.hint[lang]}</p>
      </div>

      <article className="mx-auto max-w-[21cm] bg-white px-[1.6cm] py-[1.4cm] text-[11.5px] leading-relaxed text-neutral-800 shadow-lg print:max-w-none print:px-0 print:py-0 print:shadow-none">
        <header className="mb-6 border-b-2 border-neutral-900 pb-4">
          <h1 className="text-[26px] font-bold leading-tight text-neutral-900">{site.name}</h1>
          <p className="mt-1 text-[13px] text-neutral-700">{siteCopy.role[lang]}</p>

          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-700">
            {contact.map((entry, index) => (
              <span key={entry}>
                {index > 0 && <span className="mr-3 text-neutral-400">·</span>}
                {entry}
              </span>
            ))}
          </p>
        </header>

        <section className="mb-5">
          <Heading>{t.profile[lang]}</Heading>
          <p className="text-pretty">{c.profile.statement}</p>

          <p className="mt-2 text-pretty">{c.profile.summary}</p>

          <p className="mt-3 font-semibold text-neutral-900">{t.strengths[lang]}</p>
          <ul className="mt-1 list-disc pl-5">
            {c.profile.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </section>

        <section className="mb-5">
          <Heading>{t.experience[lang]}</Heading>

          {work.map((item) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[13px] font-bold text-neutral-900">{item.title[lang]}</h3>
                <span className="text-[11px] font-medium text-neutral-600">{item.period[lang]}</span>
              </div>
              <p className="text-[11.5px] italic text-neutral-700">
                {item.organisation} — {item.location}
              </p>
              <p className="mt-1 text-pretty">{item.description[lang]}</p>

              {item.highlights[lang].length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {item.highlights[lang].map((highlight) => (
                    <li key={highlight} className="text-pretty">
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="mb-5 break-inside-avoid">
          <Heading>{t.education[lang]}</Heading>

          {education.map((item) => (
            <div key={item.id} className="mb-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[12.5px] font-bold text-neutral-900">{item.title[lang]}</h3>
                <span className="text-[11px] font-medium text-neutral-600">{item.period[lang]}</span>
              </div>
              <p className="text-[11.5px] italic text-neutral-700">
                {item.organisation} — {item.location}
              </p>
              <p className="mt-0.5 text-pretty">{item.description[lang]}</p>
            </div>
          ))}
        </section>

        <section className="mb-5">
          <Heading>{t.projectsTitle[lang]}</Heading>

          {projects.map((project) => {
            const url = project.links.demo ?? project.links.github;

            return (
              <div key={project.id} className="mb-3 break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-[12.5px] font-bold text-neutral-900">
                    {project.title}
                    <span className="ml-2 text-[11px] font-normal italic text-neutral-600">
                      {project.kicker[lang]}
                    </span>
                  </h3>
                  <span className="text-[11px] font-medium text-neutral-600">
                    {project.year[lang]}
                  </span>
                </div>

                <p className="text-pretty">{project.summary[lang]}</p>
                <p className="text-pretty text-neutral-700">{project.result[lang]}</p>

                <p className="mt-0.5 text-[10.5px] text-neutral-600">
                  <span className="font-semibold">{t.stack[lang]} :</span> {project.stack.join(" · ")}
                  {url && (
                    <>
                      {" — "}
                      {/* Printed as text so the URL survives on paper too. */}
                      <a href={url} className="underline">
                        {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                    </>
                  )}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mb-5 break-inside-avoid">
          <Heading>{t.skills[lang]}</Heading>

          {disciplines.map((discipline) => {
            const areas = skillGroups
              .map((area) => ({
                area,
                names: technologies
                  .filter((tech) => tech.discipline === discipline.id && tech.group === area)
                  .map((tech) => tech.name),
              }))
              .filter((entry) => entry.names.length > 0);

            if (!areas.length) return null;

            return (
              <div key={discipline.id} className="mb-2">
                <p className="text-[12px] font-bold text-neutral-900">{discipline.title[lang]}</p>
                {areas.map(({ area, names }) => (
                  <p key={area} className="text-pretty">
                    <span className="font-semibold">{c.skills.groups[area]} :</span>{" "}
                    {names.join(", ")}
                  </p>
                ))}
              </div>
            );
          })}
        </section>

        <section className="break-inside-avoid">
          <Heading>{t.languagesTitle[lang]}</Heading>
          <p>
            {languages
              .map((language) => `${language.name[lang]} (${language.level[lang]})`)
              .join(" · ")}
          </p>
        </section>
      </article>
    </div>
  );
}
