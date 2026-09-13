import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import LangInit from "@/components/LangInit";
import SkipLink from "@/components/navigation/SkipLink";
import { site } from "@/data/site";
import { DEFAULT_LANG } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * Metadata is French because French is what the page serves by default — it is
 * what a crawler and a link preview will see. The English translation lives
 * behind the in-page toggle, which search engines do not follow.
 */
const title = "Mountaga Oumar Maiga — Développeur Fullstack & Data Scientist";
const description =
  "Développeur Fullstack et Data Scientist basé à Bamako, au Mali. Je construis des produits web modernes, des applications et des solutions data.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s — Mountaga Oumar Maiga",
  },
  description,
  keywords: [
    "Développeur Fullstack",
    "Développeur Web",
    "Data Scientist",
    "Développeur React",
    "Développeur Next.js",
    "Développeur Laravel",
    "Développeur Python",
    "Bamako",
    "Mali",
    "Fullstack Developer",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
};

/** Helps search engines connect the site to a person rather than a company. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Développeur Fullstack & Data Scientist",
  url: site.url,
  email: "mailto:" + site.email,
  knowsLanguage: ["fr", "en", "bm"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bamako",
    addressCountry: "ML",
  },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={DEFAULT_LANG} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-void font-sans antialiased">
        <LangInit />
        <SkipLink />

        <SmoothScroll>{children}</SmoothScroll>

        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input is interpolated here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        {/*
          Vercel Web Analytics and Speed Insights, loaded as plain scripts rather
          than through @vercel/analytics: that package carries an optional Remix
          peer which pins React 18 and will not resolve against React 19. The
          package's only advantage is tracking client-side route changes, and
          this site has no client-side routing, so nothing is lost.

          These paths are served by Vercel itself and 404 anywhere else, hence
          the production gate. Both are cookieless, so no consent banner is owed.

          They stay inert until Web Analytics and Speed Insights are switched on
          for the project in the Vercel dashboard.
        */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
            <Script src="/_vercel/speed-insights/script.js" strategy="afterInteractive" />
          </>
        )}
      </body>
    </html>
  );
}
