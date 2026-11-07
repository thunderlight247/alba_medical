import type { Metadata, Viewport } from "next";
import StudioGate from "@/components/StudioGate";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Article Studio | Alba Medical Diagnostic Centre",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1 };

export default function StudioPage() {
  return <StudioGate />;
}
