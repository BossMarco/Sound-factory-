import type { Metadata } from "next";
import { Footer, Header } from "../components";
import { PackageBuilder } from "../package-builder";

export const metadata: Metadata = {
  title: "Contact & Book a DJ in McAllen & the RGV",
  description: "Contact Sound Factory Productions to book a wedding, quinceañera, or event DJ in McAllen, Brownsville, Edinburg, and the Rio Grande Valley. Call or text (956) 543-3188.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <p className="eyebrow">CONTACT · BOOK YOUR DATE</p>
          <h1>Contact Sound Factory Productions</h1>
          <p>Bilingual DJ, MC, sound, lighting, and LED production for weddings, quinceañeras, and events across McAllen, Brownsville, Edinburg, Harlingen, Mission, Pharr, and the whole Rio Grande Valley.</p>
          <p>
            <a className="button" href="tel:+19565433188">Call or text (956) 543-3188</a>{" "}
            <a className="button" href="mailto:soundfactoryrgv@hotmail.com?subject=Event%20Inquiry%20for%20Sound%20Factory%20Productions">Email soundfactoryrgv@hotmail.com</a>
          </p>
        </section>
        <PackageBuilder />
      </main>
      <Footer />
    </>
  );
}
