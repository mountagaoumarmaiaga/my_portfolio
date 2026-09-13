import type { I18n } from "@/lib/i18n";

export const site = {
  name: "Mountaga Oumar Maiga",
  location: "Bamako, Mali",
  locationShort: "Bamako",
  email: "mountagaoumarmaiga@gmail.com",
  /** Any formatting is fine — the link strips everything but the digits. */
  whatsapp: "+223 70 56 46 40" as string,
  github: "https://github.com/mountagaoumarmaiaga",
  linkedin: "https://linkedin.com/in/mountaga-oumar-maiga-182745251",
  /**
   * The CV route, not the old PDF. That file was three flat images exported
   * from Canva — no text layer, so an applicant tracking system read nothing
   * out of it. `/cv` is real text and prints to a PDF a parser can read.
   */
  cv: "/cv",
  /**
   * The production origin. Everything canonical derives from it — metadataBase,
   * OpenGraph, JSON-LD, the sitemap, robots.txt and the confirmation email — so
   * this is the single line to change if the Vercel project is ever renamed.
   */
  url: "https://portfoliomountaga.vercel.app",
} as const;

export const siteCopy: Record<"role" | "availability" | "workMode", I18n> = {
  role: {
    fr: "Développeur Fullstack · Data Scientist",
    en: "Fullstack Developer · Data Scientist",
  },
  availability: { fr: "Ouvert aux opportunités", en: "Open to opportunities" },
  workMode: { fr: "Remote · Hybride · Sur site", en: "Remote · Hybrid · On-site" },
};

/** From the CV. Level is stated plainly rather than as a bar. */
export const languages: Array<{ name: I18n; level: I18n }> = [
  { name: { fr: "Français", en: "French" }, level: { fr: "Langue maternelle", en: "Native" } },
  { name: { fr: "Anglais", en: "English" }, level: { fr: "Professionnel (B1/B2)", en: "Professional (B1/B2)" } },
  { name: { fr: "Bambara", en: "Bambara" }, level: { fr: "Langue maternelle", en: "Native" } },
  { name: { fr: "Khassonké", en: "Khassonke" }, level: { fr: "Langue maternelle", en: "Native" } },
];

/** What Mountaga is aiming for, in his own words. */
export const objectives: I18n = {
  fr: "Aller chercher de nouvelles opportunités, de nouveaux projets et de nouvelles expériences.",
  en: "To take on new opportunities, new projects and new experience.",
};

export interface SocialLink {
  id: "github" | "linkedin" | "whatsapp" | "email";
  label: string;
  /** Spoken out by screen readers in place of the bare platform name. */
  a11yLabel: I18n;
  href: string;
  external: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    a11yLabel: {
      fr: `Profil GitHub de ${site.name} (nouvel onglet)`,
      en: `GitHub profile of ${site.name} (opens in a new tab)`,
    },
    href: site.github,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    a11yLabel: {
      fr: `Profil LinkedIn de ${site.name} (nouvel onglet)`,
      en: `LinkedIn profile of ${site.name} (opens in a new tab)`,
    },
    href: site.linkedin,
    external: true,
  },
  ...(site.whatsapp
    ? ([
        {
          id: "whatsapp",
          label: "WhatsApp",
          a11yLabel: {
            fr: `Écrire à ${site.name} sur WhatsApp (nouvel onglet)`,
            en: `Message ${site.name} on WhatsApp (opens in a new tab)`,
          },
          href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`,
          external: true,
        },
      ] as SocialLink[])
    : []),
  {
    id: "email",
    label: "Email",
    a11yLabel: {
      fr: `Envoyer un email à ${site.email}`,
      en: `Send an email to ${site.email}`,
    },
    href: `mailto:${site.email}`,
    external: false,
  },
];

export const navSections = [
  { id: "work", label: { fr: "Projets", en: "Work" } },
  { id: "journey", label: { fr: "Parcours", en: "Journey" } },
  { id: "skills", label: { fr: "Expertise", en: "Skills" } },
  { id: "services", label: { fr: "Services", en: "Services" } },
  { id: "about", label: { fr: "À propos", en: "About" } },
  { id: "contact", label: { fr: "Contact", en: "Contact" } },
] as const satisfies ReadonlyArray<{ id: string; label: I18n }>;
