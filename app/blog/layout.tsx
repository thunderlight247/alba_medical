import Link from "next/link";
import { MessageCircle } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { SITE, WHATSAPP_URL } from "@/lib/site";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-900/5 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-2 px-4 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 py-1">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white shadow-sm ring-1 ring-inset ring-white/15">
              <BrandMark className="h-[22px] w-[22px]" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-extrabold tracking-tight text-slate-900">Alba Medical</span>
              <span className="block truncate text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Diagnostic Centre
              </span>
            </span>
          </Link>
          <nav aria-label="Article" className="flex items-center gap-0.5 text-sm font-semibold text-slate-600">
            <Link href="/" className="rounded-full px-3 py-2 transition hover:bg-teal-50 hover:text-teal-800">
              Home
            </Link>
            <Link href="/blog" className="rounded-full px-3 py-2 transition hover:bg-teal-50 hover:text-teal-800">
              Articles
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hidden items-center gap-1.5 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" /> Book
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pt-14">{children}</main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {SITE.name}, Bolgatanga, Ghana.
          </p>
          <p>{SITE.address}</p>
        </div>
      </footer>
    </div>
  );
}
