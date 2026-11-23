import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  HelpCircle,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { SERVICES_DATA, getServiceBySlug } from "@/lib/services";
import { SITE, SITE_URL, whatsappLink } from "@/lib/site";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: "Service Not Found" };

  const canonicalUrl = `${SITE_URL}/services/${service.slug}`;

  return {
    title: `${service.shortTitle} in Bolgatanga | Alba Medical Diagnostic Centre`,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: SITE.name,
      locale: "en_GH",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default function ServicePage({ params }: PageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const bookingMsg = `Hello Alba Medical, I would like to inquire about booking: ${service.shortTitle}.\nMy Name: \nPreferred Date: `;
  const whatsappUrl = whatsappLink(bookingMsg);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/services/${service.slug}#webpage`,
        url: `${SITE_URL}/services/${service.slug}`,
        name: service.title,
        description: service.metaDescription,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: {
          "@type": "MedicalProcedure",
          name: service.shortTitle,
          description: service.overview,
          procedureType: "Diagnostic",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: service.shortTitle, item: `${SITE_URL}/services/${service.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
        {/* Navigation bar */}
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition hover:text-teal-700"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/services"
                className="hidden text-xs font-semibold text-slate-600 transition hover:text-teal-700 sm:inline"
              >
                All Services
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                <MessageCircle className="h-3.5 w-3.5" /> Book on WhatsApp
              </a>
            </div>
          </div>
        </header>

        {/* Hero Header */}
        <div className="border-b border-slate-200 bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 py-12 text-white sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-4 text-xs font-medium text-teal-300">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li>/</li>
                <li><Link href="/services" className="hover:underline">Services</Link></li>
                <li>/</li>
                <li className="text-white font-semibold">{service.shortTitle}</li>
              </ol>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300 ring-1 ring-inset ring-teal-400/30">
              <Stethoscope className="h-3.5 w-3.5" /> {service.badge}
            </span>

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-4xl text-white">
              {service.title}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {service.overview}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" /> Book This Service on WhatsApp
              </a>
              <a
                href={`tel:${SITE.phonePrimary.tel}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
              >
                <Phone className="h-4 w-4 text-teal-400" /> Call {SITE.phonePrimary.display}
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left 2 Cols: Details */}
            <div className="space-y-10 lg:col-span-2">
              {/* Indications */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 sm:text-xl">
                  <Activity className="h-5 w-5 text-teal-600" /> When to Get This Investigation
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
                  {service.indications.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* What We Examine */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 sm:text-xl">
                  <FileText className="h-5 w-5 text-teal-600" /> What We Test & Examine
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
                  {service.whatWeExamine.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Patient Preparation */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 sm:text-xl">
                  <ShieldCheck className="h-5 w-5 text-teal-600" /> How to Prepare for Your Test
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
                  {service.preparation.map((prep, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-50 text-[10px] font-bold text-teal-700">
                        {i + 1}
                      </div>
                      <span>{prep}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* FAQs */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 sm:text-xl">
                  <HelpCircle className="h-5 w-5 text-teal-600" /> Frequently Asked Questions
                </h2>
                <div className="mt-5 space-y-4">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                      <h3 className="font-semibold text-slate-900 text-sm">{faq.question}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Col: Quick Clinical Info Card */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900">Service Highlights</h3>
                
                <div className="mt-5 space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-teal-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Result Turnaround</p>
                      <p className="text-slate-600 mt-0.5">{service.turnaroundTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="mt-0.5 h-4 w-4 text-teal-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Payment & Insurance</p>
                      <p className="text-slate-600 mt-0.5">{service.paymentNotice}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-teal-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">Accreditation</p>
                      <p className="text-slate-600 mt-0.5">HeFRA Licensed · NHIS Accredited Centre</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-xs text-slate-500 mb-3">
                    Need advice on pricing or preparing for this test? Chat directly with our front desk:
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    <MessageCircle className="h-4 w-4" /> Message on WhatsApp
                  </a>
                </div>
              </div>

              {/* Other Services Navigation Box */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 text-sm">Other Diagnostic Services</h3>
                <ul className="mt-3 divide-y divide-slate-100 text-xs">
                  {SERVICES_DATA.filter((s) => s.slug !== service.slug).map((s) => (
                    <li key={s.slug} className="py-2.5">
                      <Link
                        href={`/services/${s.slug}`}
                        className="font-medium text-slate-700 hover:text-teal-700 flex items-center justify-between"
                      >
                        <span>{s.shortTitle}</span>
                        <span className="text-slate-400">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
