import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BlogBody from "@/components/BlogBody";
import { SITE, SITE_URL, WHATSAPP_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postQuery } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/types";

export const revalidate = 60;

type Props = { params: { slug: string } };

async function getPost(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<Post | null>(postQuery, { slug });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Article not found" };

  const images = post.mainImage?.asset
    ? [{ url: urlFor(post.mainImage).width(1200).height(630).url(), width: 1200, height: 630, alt: post.title }]
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: post.mainImage?.asset ? [urlFor(post.mainImage).width(1200).height(630).url()] : undefined,
    author: { "@type": post.author?.name ? "Person" : "Organization", name: post.author?.name || SITE.name },
    publisher: { "@type": "MedicalClinic", name: SITE.name, url: SITE_URL },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition hover:text-teal-900"
      >
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>

      <header className="mt-6">
        {[formatDate(post.publishedAt), post.categories?.join(", ")].filter(Boolean).length > 0 ? (
          <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-700">
            {[formatDate(post.publishedAt), post.categories?.join(", ")].filter(Boolean).join(" · ")}
          </p>
        ) : null}
        <h1 className="mt-3 text-balance text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[2.6rem]">
          {post.title}
        </h1>
        {post.excerpt ? <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{post.excerpt}</p> : null}
        {post.author?.name ? (
          <p className="mt-4 text-sm text-slate-500">
            By <span className="font-semibold text-slate-700">{post.author.name}</span>
          </p>
        ) : null}
      </header>

      {post.mainImage?.asset ? (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
          <Image
            src={urlFor(post.mainImage).width(1600).url()}
            alt={post.mainImage?.alt || post.title}
            fill
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {post.body?.length ? <BlogBody body={post.body} /> : null}

      <aside className="mt-12 rounded-3xl border border-teal-200 bg-gradient-to-r from-teal-50 to-sky-50 p-6">
        <h2 className="text-lg font-bold text-slate-900">Need a test or scan?</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Alba Medical Diagnostic Centre is on Commercial Street, Bolgatanga. Laboratory tests, color Doppler
          ultrasound and ECG. Pay with your NHIS card, cash or MoMo.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Book via WhatsApp
          </a>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-teal-500 hover:text-teal-700"
          >
            Visit the main site
          </Link>
        </div>
      </aside>
    </article>
  );
}
