import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postsQuery } from "@/sanity/lib/queries";
import type { PostSummary } from "@/sanity/lib/types";
import { formatDate } from "@/lib/format";
import { WHATSAPP_URL } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Health articles",
  description:
    "Plain-language guides on laboratory tests, color Doppler ultrasound and ECG from Alba Medical Diagnostic Centre, Bolgatanga.",
  alternates: { canonical: "/blog" },
};

async function getPosts(): Promise<PostSummary[]> {
  if (!isSanityConfigured) return [];
  try {
    return await client.fetch<PostSummary[]>(postsQuery);
  } catch {
    return [];
  }
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div>
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Articles</p>
        <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Notes from our laboratory and scan rooms
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Short, practical explanations of the tests and scans we run, written to help you prepare for a visit and
          understand what your request is for.
        </p>
      </header>

      {posts.length === 0 ? (
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
          <h2 className="text-xl font-bold text-slate-900">Articles are on the way</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
            We are preparing the first guides on laboratory tests, ultrasound scans and ECG. In the meantime, message
            us on WhatsApp with any question about your test or scan.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
          </a>
        </section>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-teal-300 hover:shadow-md"
              >
                {post.mainImage?.asset ? (
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <Image
                      src={urlFor(post.mainImage).width(1200).height(675).url()}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 340px, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-700">
                    {[formatDate(post.publishedAt), post.categories?.join(", ")].filter(Boolean).join(" · ")}
                  </p>
                  <h2 className="mt-2 text-lg font-bold tracking-tight text-slate-900">{post.title}</h2>
                  {post.excerpt ? (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                  ) : (
                    <div className="flex-1" />
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
                    Read the article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
