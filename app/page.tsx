"use client";

import { useState, type FormEvent } from "react";
import { motion, MotionConfig, type Variants } from "framer-motion";
import Image from "next/image";
import {
  Activity, BadgeCheck, ClipboardList, Clock, CreditCard, Dna, FlaskConical, HeartPulse, Info, MapPin,
  Menu, MessageCircle, Microscope, Navigation, ParkingCircle, Phone, Plus, ShieldCheck, Smartphone, Star,
  Stethoscope, TestTubes, Waves, X, type LucideIcon,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";
import ImageBlock from "@/components/ImageBlock";
import { useOpenStatus } from "@/components/useOpenStatus";
import { HOURS_ROWS, IMAGES, LAB_TESTS, SITE, WHATSAPP_URL, whatsappLink } from "@/lib/site";

/* ---------- motion orchestration ---------- */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 18, mass: 0.8 } },
};
const inView = { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } } as const;

/* ---------- shared bits ---------- */
function WhatsAppButton({ className = "", label = "Book via WhatsApp" }: { className?: string; label?: string }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/25 transition hover:bg-emerald-800 active:scale-[0.98] ${className}`}
    >
      <MessageCircle className="h-5 w-5" /> {label}
    </a>
  );
}

function SectionHeading({ title, text }: { title: string; text: string }) {
  return (
    <motion.div variants={item} className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-slate-600">{text}</p>
    </motion.div>
  );
}

/* ---------- navigation ---------- */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Tests", href: "#tests" },
  { label: "NHIS", href: "#nhis" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-900/5 bg-white/90 backdrop-blur-xl">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <a href="#home" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2.5 py-1">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white shadow-sm ring-1 ring-inset ring-white/15">
            <BrandMark className="h-[22px] w-[22px]" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-extrabold tracking-tight text-slate-900">Alba Medical</span>
            <span className="block truncate text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Diagnostic Centre</span>
          </span>
        </a>
        <ul className="hidden items-center gap-0.5 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-teal-50 hover:text-teal-800">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hidden shrink-0 items-center gap-1.5 rounded-full bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800 lg:inline-flex">
          <MessageCircle className="h-4 w-4" /> Book
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="max-h-[calc(100dvh-9rem)] overflow-y-auto overscroll-contain border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-800">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
            <MessageCircle className="h-4 w-4" /> Book via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  const status = useOpenStatus();
  return (
    <section id="home" className="relative isolate overflow-hidden bg-gradient-to-b from-white via-teal-50/60 to-slate-50">
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <radialGradient id="m1" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#2dd4bf" stopOpacity=".55" /><stop offset="1" stopColor="#2dd4bf" stopOpacity="0" /></radialGradient>
          <radialGradient id="m2" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#38bdf8" stopOpacity=".45" /><stop offset="1" stopColor="#38bdf8" stopOpacity="0" /></radialGradient>
          <radialGradient id="m3" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#34d399" stopOpacity=".4" /><stop offset="1" stopColor="#34d399" stopOpacity="0" /></radialGradient>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#0f766e" strokeOpacity=".07" /></pattern>
          <mask id="fade"><radialGradient id="fm" cx="50%" cy="40%" r="60%"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#000" /></radialGradient><rect width="1200" height="800" fill="url(#fm)" /></mask>
        </defs>
        <rect width="1200" height="800" fill="url(#grid)" mask="url(#fade)" />
        <motion.circle cx="300" cy="220" r="320" fill="url(#m1)" animate={{ cx: [300, 380, 300], cy: [220, 280, 220] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
        <motion.circle cx="900" cy="260" r="300" fill="url(#m2)" animate={{ cx: [900, 820, 900], cy: [260, 200, 260] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
        <motion.circle cx="620" cy="620" r="280" fill="url(#m3)" animate={{ cx: [620, 700, 620] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
      </svg>

      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-16 pt-24 text-center sm:px-6 sm:pb-24 sm:pt-36">
        <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-teal-800 backdrop-blur">
          <BadgeCheck className="h-4 w-4" /> HEFRA licensed and NHIS accredited
        </motion.div>
        <motion.h1 variants={item} className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-slate-900 min-[420px]:text-4xl sm:text-6xl sm:leading-[1.05]">
          Accurate diagnostics for Bolgatanga and beyond
        </motion.h1>
        <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
          Laboratory tests, color Doppler ultrasound and ECG on Commercial Street. We do not only serve Bolga: our coverage spans the whole Upper East Region and parts of the Northern Region.
        </motion.p>
        <motion.div variants={item} className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row">
          <WhatsAppButton className="w-full sm:w-auto" />
          <a href={`tel:${SITE.phonePrimary.tel}`} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-teal-500 hover:text-teal-700 sm:w-auto">
            <Phone className="h-4 w-4" /> Call {SITE.phonePrimary.display}
          </a>
        </motion.div>
        <motion.ul variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs font-medium sm:text-sm">
          <li className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3.5 py-1.5 text-slate-700 backdrop-blur">
            <CreditCard className="h-4 w-4 shrink-0 text-emerald-700" />
            Pay with your <strong className="font-semibold text-emerald-800">NHIS card</strong>, cash or MoMo
          </li>
          <li className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-3.5 py-1.5 text-slate-700 backdrop-blur">
            <Stethoscope className="h-4 w-4 shrink-0 text-teal-700" />
            Clinician requests and walk-in (self-request) clients
          </li>
        </motion.ul>
        <motion.p variants={item} className="mt-6 flex min-h-6 items-center gap-2 text-sm text-slate-600" aria-live="polite">
          {status && (
            <>
              <span className={`h-2.5 w-2.5 rounded-full ${status.open ? "bg-emerald-500" : "bg-slate-400"}`} />
              {status.label}
            </>
          )}
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ---------- trust bento ---------- */
function Trust() {
  const tile = "relative overflow-hidden rounded-3xl border p-6 sm:p-7";
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20">
      <motion.div {...inView} variants={container}>
        <SectionHeading title="A licensed facility you can verify" text="Regulated by both HeFRA and NHIS, insured and run by a laboratory scientist who has spent more than three decades in the field." />
        <div className="grid gap-4 sm:auto-rows-[minmax(11rem,auto)] sm:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={item} className={`${tile} border-teal-900 bg-gradient-to-br from-teal-700 to-teal-900 text-white sm:col-span-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-center`}>
            <ShieldCheck className="h-10 w-10 text-teal-200" strokeWidth={1.5} />
            <h3 className="mt-6 text-2xl font-bold">HEFRA licensed</h3>
            <p className="mt-3 max-w-sm text-teal-100">Licensed by the Health Facilities Regulatory Agency of Ghana, so our premises, equipment and practice are held to national standards.</p>
            <span className="mt-6 inline-flex w-fit items-center rounded-2xl bg-white px-3 py-2 shadow-sm">
              <Image src={IMAGES.hefra} alt="Health Facilities Regulatory Agency (HeFRA) logo" width={200} height={72} className="h-10 w-auto" />
            </span>
            <svg className="absolute -bottom-10 -right-10 h-56 w-56 text-white/10" viewBox="0 0 100 100" aria-hidden><circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          </motion.div>
          <motion.div variants={item} className={`${tile} border-slate-200 bg-white`}>
            <span className="inline-flex items-center rounded-xl border border-slate-100 bg-white px-2 py-1.5 shadow-sm">
              <Image src={IMAGES.nhis} alt="National Health Insurance Scheme (NHIS) logo" width={147} height={69} className="h-11 w-auto" />
            </span>
            <h3 className="mt-4 text-xl font-bold text-slate-900">NHIS accredited</h3>
            <p className="mt-2 text-sm text-slate-600">Pay with your <strong className="font-semibold text-slate-900">NHIS card</strong>. Bring it to every visit.</p>
          </motion.div>
          <motion.div variants={item} className={`${tile} border-slate-200 bg-white`}>
            <div className="flex gap-0.5" role="img" aria-label="4.3 out of 5 stars">
              {[0, 1, 2, 3].map((i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
              <span className="relative inline-block h-5 w-5 shrink-0">
                <Star className="h-5 w-5 text-amber-400/40" />
                <span className="absolute inset-y-0 left-0 w-[30%] overflow-hidden">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </span>
              </span>
            </div>
            <a href={SITE.mapLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-fit flex-col rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600">
              <span className="text-3xl font-bold text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-[6px] transition hover:decoration-teal-600">4.3</span>
              <span className="mt-2 text-sm text-slate-600">Google rating from patients</span>
            </a>
          </motion.div>
          <motion.div variants={item} className={`${tile} border-slate-200 bg-white sm:col-span-2`}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div>
                <p className="text-6xl font-extrabold tracking-tight text-teal-700">35+</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">Years of laboratory practice</h3>
                <p className="mt-2 text-sm text-slate-600">Directed by a retired Chief Medical Laboratory Scientist.</p>
              </div>
              <div className="relative mx-auto h-40 w-28 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:mx-0 sm:h-52 sm:w-36">
                <Image src={IMAGES.award} alt="GAMLS Special Award recognizing long service in medical laboratory science" fill sizes="(min-width: 640px) 144px, 112px" className="object-contain" />
              </div>
            </div>
          </motion.div>
          <motion.div variants={item} className={`${tile} border-sky-200 bg-gradient-to-r from-sky-50 to-teal-50 sm:col-span-2 lg:col-span-4`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Smartphone className="h-9 w-9 shrink-0 text-sky-700" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Pay with your NHIS card, cash or MoMo</h3>
                <p className="mt-1 text-sm text-slate-600">Your NHIS card is the simplest way to pay. Bring it along and we will confirm what it covers before anything is done. Bring it during each visit. Cash and Mobile Money (MoMo) are accepted when NHIS is inactive or for self-request (walk-in) clients.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- services ---------- */
type Service = { title: string; text: string; Icon: LucideIcon; Detail: LucideIcon; src?: string; alt?: string; points: string[] };
const SERVICES: Service[] = [
  { title: "Laboratory tests", text: "Samples accepted include blood, urine, stool, high vaginal swab and other body fluids, handled by trained laboratory scientists.", Icon: FlaskConical, Detail: FlaskConical, src: IMAGES.lab, alt: "Laboratory scientist examining a sample under a microscope", points: [] },
  { title: "Color Doppler ultrasound", text: "Ultrasound scans for a range of diagnostic needs.", Icon: Waves, Detail: Waves, src: IMAGES.ultrasound, alt: "Sonographer scanning a pregnant patient's abdomen", points: ["Abdominal and abdominal-pelvic scan", "Obstetric (OBS) scan", "Pelvic scan", "Prostate scan", "Breast scan (each)", "Small part: thyroid, knee, swelling", "Doppler studies"] },
  { title: "ECG heart monitoring", text: "Resting ECG readings to check heart rhythm and support your doctor's decisions.", Icon: HeartPulse, Detail: Activity, src: IMAGES.ecg, alt: "ECG electrodes attached to a patient's chest", points: ["Resting 12-lead ECG", "Quick, painless test", "Report for your doctor"] },
];

function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <motion.div {...inView} variants={container} className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading title="What we test and scan" text="Three core services under one roof, with results you can take straight to your doctor." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <motion.article key={s.title} variants={item} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/70 p-4 backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-400/0 via-teal-400/0 to-sky-400/0 opacity-0 transition duration-500 group-hover:from-teal-400/15 group-hover:to-sky-400/20 group-hover:opacity-100" />
              <ImageBlock src={s.src} alt={s.alt} Icon={s.Detail} />
              <div className="relative p-3 pt-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-white/60 bg-white/70 text-teal-700 shadow-sm backdrop-blur"><s.Icon className="h-5 w-5" /></div>
                <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                {s.points.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {s.points.map((p) => (<li key={p} className="flex items-start gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{p}</li>))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- laboratory menu ---------- */
const LAB_ICONS: LucideIcon[] = [Microscope, TestTubes, ClipboardList, Dna];

function LabTests() {
  return (
    <section id="tests" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
      <motion.div {...inView} variants={container} className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          title="The full laboratory menu"
          text="Our laboratory menu, grouped by discipline. Ask at reception or on WhatsApp for the current price of any test."
        />
        <div className="grid gap-4 lg:grid-cols-3 lg:items-start">
          {LAB_TESTS.map((group, i) => {
            const Icon = LAB_ICONS[i] ?? FlaskConical;
            return (
              <motion.article
                key={group.group}
                variants={item}
                className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${i === 3 ? "lg:col-span-3" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="min-w-0 text-lg font-bold text-slate-900">{group.group}</h3>
                  <span className="ml-auto shrink-0 whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    {group.tests.length} tests
                  </span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.tests.map((t) => (
                    <li key={t} className="max-w-full rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium leading-snug text-slate-700">
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
        <motion.div variants={item} className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-teal-200 bg-gradient-to-r from-teal-50 to-sky-50 p-6 sm:flex-row">
          <p className="text-sm leading-relaxed text-slate-700">
            <span className="font-semibold text-slate-900">Pay with your NHIS card, cash or MoMo.</span> Ask us for the current price of any test on WhatsApp.
          </p>
          <WhatsAppButton className="w-full shrink-0 sm:w-auto" label="Ask about a test" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- payment, NHIS conditions and preparation ---------- */
const REQUEST_ITEMS = [
  "Name of the health facility generating the request",
  "Full name of the client",
  "Date of birth",
  "Gender",
  "Client registration number at the health facility",
  "NHIS number, with the NHIS status active",
  "Provisional diagnosis or summary of clinical findings",
  "List of laboratory tests or the type of scan to be done",
  "Name of the clinician making the request",
  "Signature of the clinician",
  "Stamp of the health facility",
];

const FASTING_ITEMS = ["FBS, urine sugar and HbA1C", "Lipid profile", "Abdominal and Abdomino-Pelvic scans"];

function Payment() {
  return (
    <section id="nhis" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <motion.div {...inView} variants={container} className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div variants={item} className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-800">
            <CreditCard className="h-4 w-4" /> Payment
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Conditions that qualify one to pay with NHIS card
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Pay with your <strong className="font-semibold text-emerald-800">NHIS card</strong>, cash or MoMo. For NHIS to cover a lab test or scan, the request should carry all of the details below.
          </p>
        </motion.div>

        <motion.div variants={item} className="mb-6 flex items-start gap-3 rounded-3xl border border-amber-300 bg-amber-50 p-5 shadow-sm sm:mb-8 sm:items-center sm:p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800">
            <Info className="h-5 w-5" />
          </span>
          <p className="text-sm leading-relaxed text-amber-950 sm:text-base">
            <strong className="font-semibold">NHIS covers all our services if the request is properly completed.</strong> It does not cover the external referral tests.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <motion.article variants={item} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm sm:p-7">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <ClipboardList className="h-5 w-5 shrink-0 text-teal-700" /> A lab or scan request should include
            </h3>
            <ol className="mt-5 space-y-2.5">
              {REQUEST_ITEMS.map((text, i) => (
                <li key={text} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-50 text-[11px] font-bold text-teal-800">{i + 1}</span>
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ol>
          </motion.article>
          <motion.article variants={item} className="rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50 to-sky-50 p-5 shadow-sm sm:p-7">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Clock className="h-5 w-5 shrink-0 text-teal-700" /> Client preparation for some procedures
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              If you are coming for any of the procedures below, <strong className="font-semibold text-slate-900">fast overnight</strong> and come to Alba Medical early, preferably before 10:00 AM.
            </p>
            <ul className="mt-4 space-y-2">
              {FASTING_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-medium text-slate-800">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{item}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl bg-white/70 p-4 text-sm leading-relaxed text-slate-700">
              Abdominal scans can be done at any other time of the day, as long as your stomach is not full of food.
            </p>
          </motion.article>
        </div>

        <motion.div variants={item} className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-teal-200 bg-gradient-to-r from-teal-50 to-sky-50 p-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm leading-relaxed text-slate-700">
            <span className="font-semibold text-slate-900">Clinician referrals and walk-in (self-request) clients are both welcome</span> for all our services. Not sure what your NHIS card covers? Ask us before you come in.
          </p>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <WhatsAppButton label="Ask about NHIS cover" className="w-full sm:w-auto" />
            <a href={`tel:${SITE.phonePrimary.tel}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-teal-500 hover:text-teal-700">
              <Phone className="h-4 w-4" /> Call
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- quick WhatsApp request ---------- */
function QuickRequest() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const lines = [
      `Hello ${SITE.name}, I would like to book an appointment.`,
      value("name") && `Name: ${value("name")}`,
      value("phone") && `Phone: ${value("phone")}`,
      value("service") && `Service: ${value("service")}`,
      value("when") && `Preferred day and time: ${value("when")}`,
      value("notes") && `Notes: ${value("notes")}`,
    ].filter(Boolean);
    const url = whatsappLink(lines.join("\n"));
    const opened = window.open(url, "_blank");
    if (!opened) window.location.href = url;
  };

  const field =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500";

  return (
    <motion.div variants={item} className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <h3 className="text-xl font-bold text-slate-900">Send a quick request</h3>
      <p className="mt-1 text-sm text-slate-600">Fill this in and it opens WhatsApp with your details ready to send.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Full name</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone number</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0XX XXX XXXX" className={field} />
        </div>
        <div>
          <label htmlFor="service" className={label}>Service</label>
          <select id="service" name="service" defaultValue="Laboratory tests" className={field}>
            <option>Laboratory tests</option>
            <option>Color Doppler ultrasound</option>
            <option>ECG heart monitoring</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="when" className={label}>Preferred day and time</label>
          <input id="when" name="when" placeholder="e.g. Monday morning" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className={label}>Anything else</label>
          <textarea id="notes" name="notes" rows={3} placeholder="Test or scan you need, or a question" className={`${field} resize-none`} />
        </div>
        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">Your message goes straight to our WhatsApp line.</p>
          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/25 transition hover:bg-emerald-800 active:scale-[0.98] sm:w-auto">
            <MessageCircle className="h-5 w-5" /> Send on WhatsApp
          </button>
        </div>
      </form>
    </motion.div>
  );
}

/* ---------- frequently asked questions ---------- */
const FAQ_ITEMS = [
  {
    q: "Do I need a clinician's request to be seen?",
    a: "No. Clinician referrals and walk-in (self-request) clients are both welcome for all our services. If you want to use your NHIS card, the request has to come from a health facility and be properly completed.",
  },
  {
    q: "What must the request include for NHIS to pay?",
    a: "The facility name, your full name, date of birth, gender, client registration number, NHIS number with active status, the provisional diagnosis, the tests or scan requested, and the clinician's name, signature and facility stamp.",
  },
  {
    q: "Does NHIS cover every test?",
    a: "NHIS covers all our services when the request is properly completed. It does not cover the external referral tests.",
  },
  {
    q: "How do I prepare for a fasting test?",
    a: "Fast overnight and come early, preferably before 10:00 AM, for FBS, urine sugar, HbA1C, lipid profile or an abdominal or abdomino-pelvic scan. Abdominal scans can also be done later in the day, as long as your stomach is not full of food.",
  },
  {
    q: "When are you open?",
    a: "Monday to Friday, 8:00 AM to 5:00 PM. Saturday, 8:00 AM to 3:00 PM. Closed on Sunday.",
  },
  {
    q: "Where exactly are you, and is there parking?",
    a: `Commercial Street, Bolgatanga, ${SITE.landmark.replace("Next to ", "next to ")}. Plus Code ${SITE.plusCode}, Ghana Post GPS ${SITE.digitalAddress}. There is a parking lot on site.`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
      <motion.div {...inView} variants={container} className="mx-auto max-w-3xl px-5 sm:px-6">
        <SectionHeading title="Questions we get every day" text="Short answers before you come in. If yours is not here, message us on WhatsApp." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="space-y-3">
          {FAQ_ITEMS.map((f) => (
            <motion.details key={f.q} variants={item} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md text-sm font-semibold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:text-base [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="h-4 w-4 shrink-0 text-teal-700 transition group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- map and geography ---------- */
function Location() {
  const access: { Icon: LucideIcon; label: string }[] = [
    { Icon: ParkingCircle, label: "Parking lot on site" },
    { Icon: BadgeCheck, label: "Neat restrooms" },
  ];
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20">
      <motion.div {...inView} variants={container}>
        <SectionHeading title="Find us on Commercial Street" text={`${SITE.landmark}, in the center of Bolgatanga.`} />
        <div className="grid items-stretch gap-6 lg:grid-cols-5">
          <motion.div variants={item} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal-600 lg:col-span-3">
            <div className="aspect-video w-full lg:h-full lg:min-h-[22rem]">
              <iframe title={`Map showing ${SITE.name}`} src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" allowFullScreen />
            </div>
          </motion.div>
          <motion.div variants={item} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 lg:col-span-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-teal-700" />
              <div>
                <p className="font-semibold text-slate-900">{SITE.address}</p>
                <p className="mt-1 text-sm text-slate-600">Plus Code: <span className="font-mono font-semibold text-slate-800">{SITE.plusCode}</span></p>
                <p className="mt-1 text-sm text-slate-600">Ghana Post GPS: <span className="font-mono font-semibold text-slate-800">{SITE.digitalAddress}</span></p>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              {[SITE.phonePrimary, SITE.phoneSecondary].map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:border-teal-500 hover:text-teal-700">
                  <Phone className="h-4 w-4 text-teal-700" /> {p.display}
                </a>
              ))}
            </div>
            <ul className="mt-5 space-y-3">
              {access.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3 rounded-2xl bg-teal-50 px-4 py-3 text-sm font-medium text-teal-900"><Icon className="h-5 w-5" />{label}</li>
              ))}
            </ul>
            <a href={SITE.mapLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700 lg:mt-auto">
              <Navigation className="h-4 w-4" /> Get directions
            </a>
          </motion.div>
        </div>
        <QuickRequest />
      </motion.div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const status = useOpenStatus();
  return (
    <footer className="bg-slate-950 pb-28 pt-16 text-slate-300 md:pb-14">
      <motion.div {...inView} variants={container} className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 md:grid-cols-3">
        <motion.div variants={item}>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-700 text-white ring-1 ring-inset ring-white/15">
              <BrandMark className="h-7 w-7" />
            </span>
            <h3 className="text-lg font-bold text-white">{SITE.name}</h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">HEFRA licensed and NHIS accredited. Pay with your NHIS card, cash or MoMo.</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-xl bg-white px-2.5 py-2">
              <Image src={IMAGES.hefra} alt="Health Facilities Regulatory Agency (HeFRA) logo" width={200} height={72} className="h-7 w-auto" />
            </span>
            <span className="inline-flex items-center rounded-xl bg-white px-2.5 py-2">
              <Image src={IMAGES.nhis} alt="National Health Insurance Scheme (NHIS) logo" width={147} height={69} className="h-7 w-auto" />
            </span>
          </div>
          <WhatsAppButton className="mt-6" />
        </motion.div>

        <motion.div variants={item}>
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-white"><Clock className="h-4 w-4 text-teal-400" /> Opening hours</h3>
          <ul className="space-y-3 text-sm">
            {HOURS_ROWS.map((r) => {
              const today = status ? r.dayIdx.includes(status.day) : false;
              return (
                <li key={r.days} className={`rounded-xl border px-4 py-3 ${today ? "border-teal-500/60 bg-teal-500/10" : "border-slate-800"}`}>
                  <p className="font-medium text-slate-100">{r.days}</p>
                  <p className={r.time === "Closed" ? "text-slate-400" : "text-teal-300"}>{r.time}</p>
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div variants={item} className="space-y-6 text-sm">
          <div>
            <h3 className="mb-3 font-semibold text-white">Call us</h3>
            <div className="space-y-2">
              {[SITE.phonePrimary, SITE.phoneSecondary].map((p, i) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-3 rounded-xl border border-slate-800 px-4 py-3 transition hover:border-teal-500 hover:text-white">
                  <Phone className="h-4 w-4 text-teal-400" />
                  <span>{p.display}</span>
                  <span className="ml-auto text-xs text-slate-400">{i === 0 ? "Primary line" : "Secondary desk"}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-white">Location</h3>
            <a href={SITE.mapLink} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-slate-800 px-4 py-3 transition hover:border-teal-500 hover:text-white">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-400" /> {SITE.address}</span>
              <span className="mt-1 block pl-6 text-xs text-slate-400">{SITE.landmark}, in the center of Bolgatanga.</span>
              <span className="mt-1 block pl-6 font-mono text-xs text-slate-400">Plus Code {SITE.plusCode}</span>
              <span className="mt-1 block pl-6 font-mono text-xs text-slate-400">Ghana Post GPS {SITE.digitalAddress}</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-1 px-5 text-xs text-slate-400 sm:px-6">
        <p>© {new Date().getFullYear()} {SITE.name}, Bolgatanga, Ghana.</p>
        <p>
          Photos:{" "}
          <a className="underline decoration-slate-600 underline-offset-2 transition hover:text-slate-200" href="https://commons.wikimedia.org/wiki/File:Laborantin_au_Microscope_%C3%A0_Laquintinie_Cameroun_30.jpg" target="_blank" rel="noopener noreferrer">Happi Raphael</a>{" "}
          and{" "}
          <a className="underline decoration-slate-600 underline-offset-2 transition hover:text-slate-200" href="https://commons.wikimedia.org/wiki/File:IMG-20200120-WA0028.jpg" target="_blank" rel="noopener noreferrer">Mimiessien</a>, CC BY-SA 4.0, via Wikimedia Commons.
        </p>
      </div>
    </footer>
  );
}

/* ---------- mobile sticky action bar ---------- */
function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-slate-800 bg-slate-950/90 p-3 backdrop-blur md:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <a href={`tel:${SITE.phonePrimary.tel}`} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-700 py-3 text-sm font-semibold text-white"><Phone className="h-4 w-4" /> Call</a>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex flex-[2] items-center justify-center gap-2 rounded-full bg-emerald-700 py-3 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" /> Book via WhatsApp</a>
    </div>
  );
}

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Trust />
        <Services />
        <LabTests />
        <Payment />
        <Faq />
        <Location />
      </main>
      <Footer />
      <MobileBar />
    </MotionConfig>
  );
}
