import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Admin | Sound Factory Productions" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
