import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Generated rather than kept as a static public/robots.txt, so the sitemap URL
 * can never drift from `site.url` — which is exactly what happened when the
 * project was renamed and a hardcoded origin was left behind.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
