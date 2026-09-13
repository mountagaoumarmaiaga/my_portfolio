"use client";

import ContactForm from "./ContactForm";
import FadeUp from "@/components/animations/FadeUp";
import Stagger from "@/components/animations/Stagger";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { site, siteCopy, socialLinks } from "@/data/site";
import { useCopy } from "@/hooks/useCopy";

export default function Contact() {
  const { lang, c } = useCopy();

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <FadeUp className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-label text-mali-green">
                {c.contact.index}
              </span>
              <span className="h-px w-8 bg-hairline-strong" aria-hidden="true" />
              <span className="eyebrow">{c.contact.eyebrow}</span>
            </FadeUp>

            <FadeUp as="h2" className="display mt-8 text-[clamp(2.2rem,5.6vw,4.1rem)]" y={32}>
              {c.contact.titleLine1}
              <br />
              {c.contact.titleLine2}
              <span className="text-mali-green">.</span>
            </FadeUp>

            <FadeUp
              as="p"
              className="mt-7 max-w-md text-pretty text-[15px] leading-relaxed text-ink-muted"
              delay={0.08}
            >
              {c.contact.subtitle}
            </FadeUp>

            <FadeUp className="mt-9 flex flex-wrap items-center gap-3" delay={0.14}>
              <ButtonLink href={"mailto:" + site.email} size="lg">
                {c.contact.primaryCta}
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href={site.github} variant="secondary" size="lg" external>
                {c.contact.secondaryCta}
              </ButtonLink>
            </FadeUp>

            <Stagger
              as="dl"
              className="mt-14 flex flex-col gap-px overflow-hidden rounded-lg border border-hairline bg-hairline"
              y={14}
            >
              <div data-animate className="flex items-baseline justify-between gap-6 bg-void p-4">
                <dt className="eyebrow">{c.contact.email}</dt>
                <dd>
                  <a
                    href={"mailto:" + site.email}
                    className="text-[13px] text-ink transition-colors hover:text-mali-greenSoft"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div data-animate className="flex items-baseline justify-between gap-6 bg-void p-4">
                <dt className="eyebrow">{c.contact.basedIn}</dt>
                <dd className="text-[13px] text-ink">{site.location}</dd>
              </div>
              <div data-animate className="flex items-baseline justify-between gap-6 bg-void p-4">
                <dt className="eyebrow">{c.contact.status}</dt>
                <dd className="flex items-center gap-2 text-[13px] text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-mali-green" aria-hidden="true" />
                  {siteCopy.availability[lang]}
                </dd>
              </div>
            </Stagger>

            <FadeUp className="mt-8 flex flex-wrap gap-x-6 gap-y-2" delay={0.1}>
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  aria-label={link.a11yLabel[lang]}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="font-mono text-[11px] uppercase tracking-label text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <FadeUp delay={0.06}>
              <ContactForm />
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
