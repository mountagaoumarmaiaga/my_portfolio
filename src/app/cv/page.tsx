import type { Metadata } from "next";
import CvDocument from "@/components/cv/CvDocument";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "CV",
  description: `CV de ${site.name} — Développeur Fullstack et Data Scientist à Bamako, Mali. Expérience, formation, projets et compétences techniques.`,
  alternates: { canonical: "/cv" },
  openGraph: {
    type: "profile",
    url: `${site.url}/cv`,
    title: `CV — ${site.name}`,
    description: `Développeur Fullstack et Data Scientist basé à Bamako, Mali.`,
  },
};

export default function CvPage() {
  return (
    <>
      {/*
        Print rules live here rather than in globals.css: they only ever apply
        to this route, and A4 with 14mm margins is what a recruiter's printer
        and every "Save as PDF" dialog default to.

        `body` carries the site's near-black background, which would otherwise
        be painted behind the page when background graphics are enabled.
      */}
      <style>{`
        @page { size: A4; margin: 14mm; }
        @media print {
          html, body { background: #fff !important; }
          a { color: inherit; }
        }
      `}</style>

      <main id="main">
        <CvDocument />
      </main>
    </>
  );
}
