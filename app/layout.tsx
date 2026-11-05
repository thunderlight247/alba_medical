import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Alba Medical Diagnostic Centre | Laboratory, Ultrasound & ECG in Bolgatanga",
  description:
    "HEFRA licensed and NHIS accredited diagnostic centre on Commercial Street, Bolgatanga. Laboratory tests, color Doppler ultrasound and ECG. Book on WhatsApp.",
};

export const viewport: Viewport = { themeColor: "#020617", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="font-sans">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
