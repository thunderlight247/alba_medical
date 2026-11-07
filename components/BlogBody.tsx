import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

const components = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="mt-10 text-2xl font-bold tracking-tight text-slate-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-900">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mt-4 text-[15px] leading-relaxed text-slate-700 sm:text-base">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="mt-6 rounded-2xl border-l-4 border-teal-600 bg-teal-50 px-5 py-4 text-slate-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-slate-900">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target={String(value?.href ?? "").startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="font-semibold text-teal-700 underline decoration-teal-300 underline-offset-2 hover:text-teal-900"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="mt-8">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <Image
            src={urlFor(value).width(1600).url()}
            alt={value?.alt || ""}
            fill
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
          />
        </div>
        {value?.alt ? <figcaption className="mt-2 text-xs text-slate-500">{value.alt}</figcaption> : null}
      </figure>
    ),
  },
};

export default function BlogBody({ body }: { body: unknown[] }) {
  return <PortableText value={body as any} components={components as any} />;
}
