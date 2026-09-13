import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * One page, so one entry. The anchored sections are not separate URLs and
 * listing them as such would only teach a crawler to expect pages that do not
 * exist. The CV is listed because it is a real, separately addressable document.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/cv`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
