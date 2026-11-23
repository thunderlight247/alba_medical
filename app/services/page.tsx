import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, Phone, Stethoscope } from "lucide-react";
import { SERVICES_DATA } from "@/lib/services";
import { SITE, SITE_URL, WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clinical Diagnostic Services in Bolgatanga | Alba Medical Diagnostic Centre",
  description:
    "Explore our full range of HeFRA-licensed and NHIS-accredited diagnostic services in Bolgatanga: Color Doppler ultrasound, 12-lead ECG, laboratory tests, and specialized health panels.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "Clinical Diagnostic Services in Bolgatanga | Alba Medical",
    description:
      "Color Doppler ultrasound, 12-lead ECG, laboratory tests, and screening panels in Bolgatanga.",
    url: `${SITE_URL}/services`,
    siteName: SITE.name,
    locale: "en_GH",
    type: "website",
  },
};

export default function ServicesIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition hover:text-teal-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Book on WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-slate-200 bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300 ring-1 ring-inset ring-teal-400/30">
            <Stethoscope className="h-3.5 w-3.5" /> HeFRA Licensed · NHIS Accredited
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
            Diagnostic Services in Bolgatanga
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            High-precision medical investigations, color Doppler ultrasound imaging, 12-lead ECG, and comprehensive laboratory panels with doctor-ready reports.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES_DATA.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-500/60 hover:shadow-md"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                  {service.badge}
                </span>
                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  <Link href={`/services/${service.slug}`} className="hover:text-teal-700">
                    {service.shortTitle}
                  </Link>
                </h2>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {service.overview}
                </p>

                <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                  {service.whatWeExamine.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {service.turnaroundTime.includes("immediately") ? "Immediate Report" : "Same-Day Results"}
                </span>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900"
                >
                  View details & preparation <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
