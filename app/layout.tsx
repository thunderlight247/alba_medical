import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE } from "@/lib/site";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

/**
 * Absolute URL for share cards, canonicals and the sitemap.
 * Uses NEXT_PUBLIC_SITE_URL when set, otherwise the production URL Vercel exposes at build time.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");

const title = "Alba Medical Diagnostic Centre | Laboratory, Ultrasound & ECG in Bolgatanga";
const description =
  "HEFRA licensed and NHIS accredited diagnostic centre on Commercial Street, Bolgatanga. Laboratory tests, color Doppler ultrasound and ECG. Pay with your NHIS card, cash or MoMo.";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title,
  description,
  applicationName: SITE.name,
  keywords: [
    "medical laboratory Bolgatanga",
    "diagnostic centre Upper East Region",
    "ultrasound scan Bolgatanga",
    "ECG Bolgatanga",
    "NHIS laboratory tests",
    "Alba Medical Diagnostic Centre",
  ],
  authors: [{ name: SITE.name }],
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_GH",
    title,
    description,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Alba Medical Diagnostic Centre — laboratory, color Doppler ultrasound and ECG in Bolgatanga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = { themeColor: "#020617", width: "device-width", initialScale: 1 };

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: SITE.name,
  description:
    "Diagnostic centre in Bolgatanga offering laboratory tests, color Doppler ultrasound and ECG for clinician-referred and walk-in clients. HEFRA licensed and NHIS accredited.",
  telephone: SITE.phonePrimary.display,
  hasMap: SITE.mapLink,
  address: {
    "@type": "PostalAddress",
    streetAddress: "AC 181 Commercial Street",
    addressLocality: "Bolgatanga",
    addressRegion: "Upper East Region",
    addressCountry: "GH",
  },
  identifier: [
    { "@type": "PropertyValue", propertyID: "GhanaPostGPS", value: SITE.digitalAddress },
    { "@type": "PropertyValue", propertyID: "PlusCode", value: SITE.plusCode },
  ],
  areaServed: ["Bolgatanga", "Upper East Region", "Northern Region"],
  paymentAccepted: "NHIS card, cash, Mobile Money",
  currenciesAccepted: "GHS",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "15:00" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
