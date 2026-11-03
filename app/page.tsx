"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import {
  Accessibility, Activity, BadgeCheck, DoorOpen, FlaskConical, HeartPulse, MapPin,
  MessageCircle, Navigation, ParkingCircle, Phone, ShieldCheck, Smartphone, Star,
  Waves, Clock, type LucideIcon,
} from "lucide-react";
import ImageBlock from "@/components/ImageBlock";
import { useOpenStatus } from "@/components/useOpenStatus";
import { HOURS_ROWS, IMAGES, SITE, WHATSAPP_URL } from "@/lib/site";

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
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 active:scale-[0.98] ${className}`}
    >
      <MessageCircle className="h-5 w-5" /> {label}
    </a>
  );
}

function SectionHeading({ title, text }: { title: string; text: string }) {
  return (
    <motion.div variants={item} className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-slate-600">{text}</p>
    </motion.div>
  );
}

/* ---------- hero ---------- */
function Hero() {
  const status = useOpenStatus();
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-teal-50/60 to-slate-50">
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

      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-24 text-center sm:pt-32">
        <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-teal-800 backdrop-blur">
          <BadgeCheck className="h-4 w-4" /> HEFRA licensed and NHIS accredited
        </motion.div>
        <motion.h1 variants={item} className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Accurate diagnostics for Bolgatanga, led by 30 years of laboratory science
        </motion.h1>
        <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Laboratory tests, color Doppler ultrasound and ECG at {SITE.name}, on Melcom Road. Pay with Mobile Money or your NHIS card.
        </motion.p>
        <motion.div variants={item} className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <WhatsAppButton className="w-full sm:w-auto" />
          <a href={`tel:${SITE.phonePrimary.tel}`} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-teal-500 hover:text-teal-700 sm:w-auto">
            <Phone className="h-4 w-4" /> Call {SITE.phonePrimary.display}
          </a>
        </motion.div>
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
  const tile = "relative overflow-hidden rounded-3xl border p-7";
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div {...inView} variants={container}>
        <SectionHeading title="A licensed facility you can verify" text="Regulated, insured and run by a laboratory scientist who has spent three decades in the field." />
        <div className="grid auto-rows-[minmax(11rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={item} className={`${tile} border-teal-900 bg-gradient-to-br from-teal-700 to-teal-900 text-white sm:col-span-2 lg:row-span-2`}>
            <ShieldCheck className="h-10 w-10 text-teal-200" strokeWidth={1.5} />
            <h3 className="mt-6 text-2xl font-bold">HEFRA licensed</h3>
            <p className="mt-3 max-w-sm text-teal-100">Licensed by the Health Institutions and Facilities Regulatory Agency of Ghana, so our premises, equipment and practice are held to national standards.</p>
            <svg className="absolute -bottom-10 -right-10 h-56 w-56 text-white/10" viewBox="0 0 100 100" aria-hidden><circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          </motion.div>
          <motion.div variants={item} className={`${tile} border-slate-200 bg-white`}>
            <BadgeCheck className="h-8 w-8 text-emerald-600" strokeWidth={1.6} />
            <h3 className="mt-5 text-xl font-bold text-slate-900">NHIS accredited</h3>
            <p className="mt-2 text-sm text-slate-600">Bring your National Health Insurance card.</p>
          </motion.div>
          <motion.div variants={item} className={`${tile} border-slate-200 bg-white`}>
            <div className="flex gap-0.5" aria-label="4.3 out of 5 stars">
              {[0, 1, 2, 3].map((i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
              <Star className="h-5 w-5 text-amber-400" style={{ clipPath: "inset(0 70% 0 0)", fill: "#fbbf24" }} />
            </div>
            <h3 className="mt-5 text-3xl font-bold text-slate-900">4.3</h3>
            <p className="mt-1 text-sm text-slate-600">Google rating from patients</p>
          </motion.div>
          <motion.div variants={item} className={`${tile} border-slate-200 bg-white sm:col-span-2`}>
            <p className="text-6xl font-extrabold tracking-tight text-teal-700">30+</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">Years of laboratory practice</h3>
            <p className="mt-2 text-sm text-slate-600">Directed by a retired Chief Medical Laboratory Scientist.</p>
          </motion.div>
          <motion.div variants={item} className={`${tile} border-sky-200 bg-gradient-to-r from-sky-50 to-teal-50 sm:col-span-2 lg:col-span-4`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Smartphone className="h-9 w-9 shrink-0 text-sky-700" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Pay the way you already do</h3>
                <p className="mt-1 text-sm text-slate-600">We accept Mobile Money (MoMo) and mobile NFC payments, along with NHIS cover.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- services ---------- */
type Service = { title: string; text: string; Icon: LucideIcon; Detail: LucideIcon; src: string; alt: string; points: string[] };
const SERVICES: Service[] = [
  { title: "Laboratory tests", text: "Blood, urine and routine screening, handled by trained laboratory scientists.", Icon: FlaskConical, Detail: FlaskConical, src: IMAGES.lab, alt: "African laboratory scientist working at a bench", points: ["Full blood count and malaria tests", "Blood sugar and urine analysis", "Clear printed results"] },
  { title: "Color Doppler ultrasound", text: "Sonography with blood-flow imaging for pregnancy, abdominal and vascular scans.", Icon: Waves, Detail: Waves, src: IMAGES.ultrasound, alt: "Sonographer performing an ultrasound scan in an African clinic", points: ["Pregnancy and abdominal scans", "Blood-flow assessment", "Same-visit reporting"] },
  { title: "ECG heart monitoring", text: "Resting ECG readings to check heart rhythm and support your doctor's decisions.", Icon: HeartPulse, Detail: Activity, src: IMAGES.ecg, alt: "ECG monitor showing a heart rhythm in a clinic", points: ["Resting 12-lead ECG", "Quick, painless test", "Report for your doctor"] },
];

function Services() {
  return (
    <section className="bg-white py-20">
      <motion.div {...inView} variants={container} className="mx-auto max-w-6xl px-6">
        <SectionHeading title="What we test and scan" text="Three core services under one roof, with results you can take straight to your doctor." />
        <div className="grid gap-6 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <motion.article key={s.title} variants={item} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/70 p-4 backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-400/0 via-teal-400/0 to-sky-400/0 opacity-0 transition duration-500 group-hover:from-teal-400/15 group-hover:to-sky-400/20 group-hover:opacity-100" />
              <ImageBlock src={s.src} alt={s.alt} Icon={s.Detail} />
              <div className="relative p-3 pt-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-white/60 bg-white/70 text-teal-700 shadow-sm backdrop-blur"><s.Icon className="h-5 w-5" /></div>
                <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {s.points.map((p) => (<li key={p} className="flex items-start gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{p}</li>))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- map and geography ---------- */
function Location() {
  const access: { Icon: LucideIcon; label: string }[] = [
    { Icon: DoorOpen, label: "Wheelchair-accessible entrance" },
    { Icon: ParkingCircle, label: "Parking lot on site" },
    { Icon: Accessibility, label: "Wheelchair-accessible restroom" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div {...inView} variants={container}>
        <SectionHeading title="Find us on Melcom Road" text={`${SITE.landmark}, in the centre of Bolgatanga.`} />
        <div className="grid items-stretch gap-6 lg:grid-cols-5">
          <motion.div variants={item} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm lg:col-span-3">
            <div className="aspect-video w-full lg:h-full lg:min-h-[22rem]">
              <iframe title={`Map showing ${SITE.name}`} src={SITE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" allowFullScreen />
            </div>
          </motion.div>
          <motion.div variants={item} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 lg:col-span-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-teal-700" />
              <div>
                <p className="font-semibold text-slate-900">{SITE.address}</p>
                <p className="mt-1 text-sm text-slate-600">Plus Code: <span className="font-mono font-semibold text-slate-800">{SITE.plusCode}</span></p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {access.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3 rounded-2xl bg-teal-50 px-4 py-3 text-sm font-medium text-teal-900"><Icon className="h-5 w-5" />{label}</li>
              ))}
            </ul>
            <a href={SITE.mapLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700 lg:mt-auto">
              <Navigation className="h-4 w-4" /> Get directions
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const status = useOpenStatus();
  return (
    <footer className="bg-slate-950 pb-28 pt-16 text-slate-300 md:pb-14">
      <motion.div {...inView} variants={container} className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
        <motion.div variants={item}>
          <h3 className="text-lg font-bold text-white">{SITE.name}</h3>
          <p className="mt-1 text-sm text-slate-400">Also listed as {SITE.altName}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">HEFRA licensed. NHIS accredited. Mobile Money and NFC payments accepted.</p>
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
                  <p className={r.time === "Closed" ? "text-slate-500" : "text-teal-300"}>{r.time}</p>
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
                  <span className="ml-auto text-xs text-slate-500">{i === 0 ? "Primary line" : "Secondary desk"}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-white">Location</h3>
            <a href={SITE.mapLink} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-slate-800 px-4 py-3 transition hover:border-teal-500 hover:text-white">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-400" /> {SITE.address}</span>
              <span className="mt-1 block pl-6 font-mono text-xs text-slate-400">Plus Code {SITE.plusCode}</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
      <p className="mx-auto mt-12 max-w-6xl px-6 text-xs text-slate-500">© {new Date().getFullYear()} {SITE.name}, Bolgatanga, Ghana.</p>
    </footer>
  );
}

/* ---------- mobile sticky action bar ---------- */
function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-slate-800 bg-slate-950/90 p-3 backdrop-blur md:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <a href={`tel:${SITE.phonePrimary.tel}`} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-700 py-3 text-sm font-semibold text-white"><Phone className="h-4 w-4" /> Call</a>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex flex-[2] items-center justify-center gap-2 rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" /> Book via WhatsApp</a>
    </div>
  );
}

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Hero />
        <Trust />
        <Services />
        <Location />
      </main>
      <Footer />
      <MobileBar />
    </MotionConfig>
  );
}
