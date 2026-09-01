import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { TrafficTracker } from "./traffic-tracker";
import "./globals.css";
import "./home-overrides.css";
import "./builder.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://soundfactoryproductions.com"),
  title: { default: "Sound Factory Productions | McAllen DJ", template: "%s | Sound Factory Productions" },
  description: "Sound Factory Productions is a DJ in McAllen, Texas serving celebrations and events across the Rio Grande Valley.",
  keywords: ["DJ McAllen", "Rio Grande Valley DJ", "event DJ", "wedding DJ McAllen"],
  openGraph: { type: "website", locale: "en_US", siteName: "Sound Factory Productions" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<TrafficTracker /><Analytics /></body></html>;
}
