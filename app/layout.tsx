import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { TrafficTracker } from "./traffic-tracker";
import { ContactActions } from "./contact-actions";
import { JsonLd, businessSchema } from "../lib/seo";
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
import "./apollo-clone.css";
import "./social-links.css";
import "./social-icons.css";
import "./hero-social.css";
import "./contact-actions.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.soundfactoryrgv.com"),
  title: { default: "Wedding & Quinceañera DJ in McAllen, Brownsville & the RGV | Sound Factory", template: "%s | Sound Factory Productions" },
  description: "Bilingual wedding & quinceañera DJ, MC, sound, lighting, and LED production for McAllen, Brownsville, Harlingen, Edinburg, and the whole Rio Grande Valley. Call or text (956) 543-3188.",
  keywords: ["DJ McAllen", "DJ Brownsville", "wedding DJ Brownsville", "wedding DJ McAllen", "quinceañera DJ", "Rio Grande Valley DJ", "RGV DJ"],
  icons: { icon: "/icon.png", apple: "/icon.png" },
  openGraph: { type: "website", locale: "en_US", siteName: "Sound Factory Productions", images: [{ url: "/factory-rgv-social.jpg", width: 1200, height: 630, alt: "Factory RGV event production logo" }] },
  twitter: { card: "summary_large_image", images: ["/factory-rgv-social.jpg"] },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><JsonLd data={businessSchema()} />{children}<ContactActions /><TrafficTracker /><Analytics /></body></html>;
}
