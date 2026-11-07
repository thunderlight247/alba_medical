import type { MetadataRoute } from "next";

/** Same resolution order as the layout metadata: explicit env var, then the Vercel production URL. */
const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");

export default function sitemap(): MetadataRoute.Sitemap {
  if (!base) return [];
  return [{ url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
