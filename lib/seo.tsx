export const SITE = "https://www.soundfactoryrgv.com";
export const BUSINESS = {
  name: "Sound Factory Productions",
  phone: "+1-956-543-3188",
  phoneDisplay: "(956) 543-3188",
  phoneHref: "tel:+19565433188",
  email: "soundfactoryrgv@hotmail.com",
  city: "McAllen",
  region: "TX",
  serviceAreas: ["McAllen", "Edinburg", "Mission", "Weslaco", "Pharr", "Harlingen", "Brownsville", "South Padre Island"],
  sameAs: ["https://www.instagram.com/factoryrgv", "https://www.facebook.com/share/1DN2VJrcCH/"],
};

export type Faq = { q: string; a: string };

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["EntertainmentBusiness", "LocalBusiness"],
    "@id": `${SITE}/#business`,
    name: BUSINESS.name,
    alternateName: "Sound Factory RGV",
    url: SITE,
    image: `${SITE}/factory-rgv-social.jpg`,
    logo: `${SITE}/icon.png`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: { "@type": "PostalAddress", addressLocality: BUSINESS.city, addressRegion: BUSINESS.region, addressCountry: "US" },
    areaServed: [...BUSINESS.serviceAreas.map((name) => ({ "@type": "City", name: `${name}, TX` })), { "@type": "AdministrativeArea", name: "Rio Grande Valley, TX" }],
    knowsLanguage: ["en", "es"],
    sameAs: BUSINESS.sameAs,
    makesOffer: ["Wedding DJ", "Quinceañera DJ", "Corporate event DJ", "Private event DJ", "Concert production", "Event lighting and LED screens"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function cityFaqs(city: string, nearby: string): Faq[] {
  return [
    { q: `Do you provide DJ services in ${city}, TX?`, a: `Yes. Sound Factory Productions provides DJ, MC, sound, lighting, and LED production for weddings, quinceañeras, corporate events, and private parties in ${city} and nearby ${nearby}.` },
    { q: `Do you offer a bilingual (English and Spanish) MC in ${city}?`, a: `Yes. Our DJ and MC can run your announcements, introductions, and timeline in English, Spanish, or both, so every generation of your family stays part of the night.` },
    { q: `How much does a DJ cost in ${city}?`, a: `Pricing depends on your date, hours, venue, and add-ons. Our Signature package includes 6 hours of DJ and MC, professional audio and lighting, an LED screen, and architectural lighting; Deluxe adds an LED banner, special effects, custom props, and event staff. Call or text ${BUSINESS.phoneDisplay} or use the package builder for a quote.` },
    { q: `How far in advance should I book a DJ in ${city}?`, a: `Spring and fall weekends in the Rio Grande Valley fill up early, so we recommend reaching out 6 to 12 months ahead for weddings and quinceañeras. Shorter-notice dates are sometimes available — just ask.` },
    { q: `Do you bring lighting and LED screens?`, a: `Yes. Beyond music, we bring professional sound, dance-floor and architectural lighting, and LED screens for slideshows, names, and visuals, all set up and run by our crew.` },
    { q: `Can you DJ both the ceremony and the reception?`, a: `Yes. We can provide ceremony audio with wireless microphones for vows and readings, then transition straight into cocktail hour and reception.` },
    { q: `What types of events do you DJ in ${city}?`, a: `Weddings, quinceañeras, cheerleading and school events, birthdays and private parties, corporate events, and concerts or public events.` },
  ];
}
