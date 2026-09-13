"use client";

import { navSections, site, siteCopy, socialLinks } from "@/data/site";
import { useCopy } from "@/hooks/useCopy";
import { scrollToSection } from "@/lib/scroll";

export default function Footer() {
  const { lang, c } = useCopy();
  const year = new Date().getFullYear();

  return (
    <footer className="hairline-t relative z-10 bg-void">
      <div className="shell flex flex-col gap-12 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[15px] font-medium tracking-tight">{site.name}</p>
            <p className="mt-1.5 text-[13px] text-ink-muted">{siteCopy.role[lang]}</p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-ink-faint">
              <span className="h-1 w-1 rounded-full bg-mali-green" aria-hidden="true" />
              {site.location}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label={c.nav.sections}>
              <p className="eyebrow">{c.nav.sections}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {navSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={"#" + section.id}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection(section.id);
                      }}
                      className="text-[13px] text-ink-muted transition-colors hover:text-ink"
                    >
                      {section.label[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="eyebrow">{c.nav.elsewhere}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-label={link.a11yLabel[lang]}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-[13px] text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={site.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-ink-muted transition-colors hover:text-ink"
                  >
                    {c.nav.resume}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-label text-ink-ghost">
            © {year} {site.name}. {c.footer.rights}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-label text-ink-ghost">
            {lang === "fr" ? "12,6392° N · 8,0029° O — Bamako" : "12.6392° N · 8.0029° W — Bamako"}
          </p>
        </div>
      </div>
    </footer>
  );
}
