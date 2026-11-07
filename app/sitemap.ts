import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { postSitemapQuery } from "@/sanity/lib/queries";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  if (!isSanityConfigured) return routes;

  try {
    const posts = await client.fetch<{ slug: string; publishedAt?: string }[]>(postSitemapQuery);
    return [
      ...routes,
      ...posts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    return routes;
  }
}
