import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { TrafficTracker } from "./traffic-tracker";
import "./globals.css";
import "./home-overrides.css";
import "./builder.css";
import "./palette.css";
import "./theme-refresh.css";
import "./mobile-nav.css";
import "./admin.css";
import "./video-reel.css";
import "./service-media.css";
import "./taste-pass.css";
import "@treeui/react/style.css";
import "./location-grid.css";
import "./texas-travel.css";
import "./apollo-home.css";
import "./social-links.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://soundfactoryproductions.com"),
  title: { default: "Sound Factory Productions | McAllen DJ", template: "%s | Sound Factory Productions" },
  description: "Sound Factory Productions is a DJ in McAllen, Texas serving celebrations and events across the Rio Grande Valley.",
  keywords: ["DJ McAllen", "Rio Grande Valley DJ", "event DJ", "wedding DJ McAllen"],
  icons: { icon: "/icon.png", apple: "/icon.png" },
  openGraph: { type: "website", locale: "en_US", siteName: "Sound Factory Productions", images: [{ url: "/factory-rgv-social.jpg", width: 1200, height: 630, alt: "Factory RGV event production logo" }] },
  twitter: { card: "summary_large_image", images: ["/factory-rgv-social.jpg"] },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<TrafficTracker /><Analytics /></body></html>;
}
