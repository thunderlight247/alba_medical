import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

/** Absolute URL for share cards, canonicals and the sitemap. Set NEXT_PUBLIC_SITE_URL to override. */
const siteUrl = SITE_URL;

/** Paste the Google Search Console token into NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION. */
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

/** Google Tag Manager Container ID */
const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-K7MW6F65";

/** Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX) */
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();

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
    "hepatitis B test Bolgatanga",
    "pregnancy ultrasound Bolgatanga",
  ],
  authors: [{ name: SITE.name }],
  alternates: { canonical: "/" },
  verification: googleVerification ? { google: googleVerification } : undefined,
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = { themeColor: "#020617", width: "device-width", initialScale: 1 };

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "MedicalBusiness", "DiagnosticLab"],
  "@id": `${siteUrl}/#clinic`,
  name: SITE.name,
  alternateName: SITE.altName,
  url: siteUrl,
  image: `${siteUrl}/images/og-cover.jpg`,
  logo: `${siteUrl}/icon.svg`,
  description:
    "HeFRA-licensed and NHIS-accredited medical diagnostic centre on Commercial Street, Bolgatanga. Clinical laboratory testing, high-resolution color Doppler ultrasound, and resting 12-lead ECG.",
  telephone: SITE.phonePrimary.display,
  hasMap: SITE.mapLink,
  priceRange: "$$",
  currenciesAccepted: "GHS",
  paymentAccepted: "NHIS card, cash, Mobile Money",
  medicalSpecialty: [
    "MedicalLaboratory",
    "DiagnosticRadiology",
    "Cardiovascular",
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.7866,
    longitude: -0.8528,
  },
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
  areaServed: [
    { "@type": "AdministrativeArea", name: "Bolgatanga" },
    { "@type": "AdministrativeArea", name: "Upper East Region" },
    { "@type": "AdministrativeArea", name: "Northern Region" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Diagnostic Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Color Doppler Ultrasound Scan", url: `${siteUrl}/services/ultrasound-scan` } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Obstetric & Pregnancy Ultrasound", url: `${siteUrl}/services/pregnancy-ultrasound` } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "12-Lead Resting ECG Heart Monitoring", url: `${siteUrl}/services/ecg-test` } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Clinical Medical Laboratory Tests", url: `${siteUrl}/services/medical-laboratory-tests` } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Hepatitis B Screening & Profile", url: `${siteUrl}/services/hepatitis-b-screening` } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Malaria Microscopy & Typhoid Testing", url: `${siteUrl}/services/malaria-and-typhoid-test` } },
      { "@type": "Offer", itemOffered: { "@type": "MedicalProcedure", name: "Kidney Function & Diabetes Screening", url: `${siteUrl}/services/kidney-and-diabetes-screening` } },
    ],
  },
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
      <head>
        {gtmId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
