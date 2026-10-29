import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header, Inquiry } from "../app/components";
import { locations } from "../app/locations/data";
import { BUSINESS, JsonLd, faqSchema, type Faq } from "./seo";

export const serviceCities = ["brownsville", "mcallen"] as const;
type Kind = "wedding" | "quinceanera";

const copy = {
  wedding: {
    label: "Wedding DJ", path: "wedding-dj", serviceHref: "/services/wedding-dj",
    title: (c: string) => `Wedding DJ in ${c}, TX | Bilingual DJ & MC | Sound Factory`,
    desc: (c: string) => `Wedding DJ in ${c}, TX. Bilingual DJ & MC, ceremony audio, pro sound, uplighting, and LED screens for ${c} weddings. Call or text ${BUSINESS.phoneDisplay}.`,
    sections: (c: string, near: string) => [
      { h: `Your ${c} wedding, start to last dance.`, p: [`We plan the music for every part of your ${c} wedding — processional, ceremony, cocktail hour, grand entrance, first dance, parent dances, toasts, cake cutting, bouquet toss, and a reception dance floor that stays full.`, `Before the day, we meet to build your timeline and your must-play and do-not-play lists, and we coordinate cues with your planner, venue, photographer, and videographer.`] },
      { h: "Ceremony audio and a bilingual MC.", p: [`We can provide ceremony audio with wireless microphones for vows, readings, and your officiant, then move straight into cocktail hour. Our MC handles introductions and announcements in English, Spanish, or both — so every side of the family feels included.`] },
      { h: "Lighting and LED that match your colors.", p: [`Dance-floor lighting, architectural uplighting in your wedding colors, and LED screens for slideshows and your names transform the room. Our Signature package includes 6 hours of DJ and MC, professional audio and lighting, an LED screen, and architectural lighting; Deluxe adds an LED banner, special effects, custom props, and event staff.`] },
      { h: `Serving ${c} and nearby venues.`, p: [`We DJ weddings in ${c} and ${near}. Ballroom, event center, ranch, church hall, or beach — we size the sound and lighting to your venue.`] },
    ],
    faqs: (c: string): Faq[] => [
      { q: `How much does a wedding DJ cost in ${c}?`, a: `It depends on your date, hours, venue, and add-ons. Our Signature package covers 6 hours of DJ and MC, professional audio and lighting, an LED screen, and architectural lighting. Call or text ${BUSINESS.phoneDisplay} or use the package builder for a quote.` },
      { q: "Do you provide ceremony and reception audio?", a: "Yes — wireless microphones and ceremony sound for vows and readings, plus the full reception system." },
      { q: "Can the MC speak English and Spanish?", a: "Yes. Our MC can run your whole timeline bilingually." },
      { q: "Will you play our requests?", a: "Yes. We build the night from your must-play and do-not-play lists and read the room to keep the dance floor full." },
      { q: `How early should we book a ${c} wedding DJ?`, a: "Six to twelve months ahead is ideal for spring and fall weekends in the Valley." },
      { q: "Do you bring uplighting and LED screens?", a: "Yes, uplighting, dance-floor lighting, and LED screens are part of our production packages." },
    ],
  },
  quinceanera: {
    label: "Quinceañera DJ", path: "quinceanera-dj", serviceHref: "/services/quinceanera-dj",
    title: (c: string) => `Quinceañera DJ in ${c}, TX | DJ, MC & Lighting | Sound Factory`,
    desc: (c: string) => `Quinceañera DJ in ${c}, TX. Bilingual DJ & MC, vals and surprise-dance audio, lighting, and LED screens for ${c} quinceañeras. Call or text ${BUSINESS.phoneDisplay}.`,
    sections: (c: string, near: string) => [
      { h: `A ${c} quinceañera, planned moment by moment.`, p: [`We plan the music and cues for the grand entrance, the vals, the father-daughter dance, the surprise dance, the cake, and the party — working with the family and the court so every moment lands.`] },
      { h: "Surprise dance, vals, and a bilingual MC.", p: [`Send us your vals and surprise-dance mixes and we'll run them cleanly on the night. Our MC keeps the program moving in English and Spanish for every generation at the party.`] },
      { h: "Lighting and LED in her colors.", p: [`Uplighting matched to her theme, dance-floor lighting, and LED screens for her name and slideshow make the photos and the party unforgettable. Our Signature and Deluxe packages include professional audio, lighting, and LED; Deluxe adds an LED banner, special effects, custom props, and event staff.`] },
      { h: `Serving ${c} and nearby.`, p: [`We DJ quinceañeras in ${c} and ${near}.`] },
    ],
    faqs: (c: string): Faq[] => [
      { q: `How much does a quinceañera DJ cost in ${c}?`, a: `Pricing depends on hours, venue, and add-ons. Call or text ${BUSINESS.phoneDisplay} or use the package builder for a quote.` },
      { q: "Can you play our surprise dance and vals mixes?", a: "Yes — send them ahead and we'll cue them exactly when you're ready." },
      { q: "Do you have a bilingual MC?", a: "Yes, our MC runs the program in English and Spanish." },
      { q: "Do you bring lighting in our theme colors?", a: "Yes, uplighting and dance-floor lighting can be matched to her colors." },
      { q: "How early should we book?", a: "Six to twelve months ahead is recommended, especially for spring and fall weekends." },
      { q: "Do you also handle the party after the program?", a: "Yes — we take it from the grand entrance through the last song of the night." },
    ],
  },
};

export function cityServiceParams() { return serviceCities.map((city) => ({ city })); }

export function cityServiceMetadata(kind: Kind, city: string): Metadata {
  const place = locations[city]; const k = copy[kind];
  if (!place || !(serviceCities as readonly string[]).includes(city)) return {};
  return { title: { absolute: k.title(place.name) }, description: k.desc(place.name), alternates: { canonical: `/${k.path}/${city}` } };
}

export function CityServicePage({ kind, city }: { kind: Kind; city: string }) {
  const place = locations[city]; const k = copy[kind];
  if (!place || !(serviceCities as readonly string[]).includes(city)) notFound();
  const faqs = k.faqs(place.name);
  return <><Header /><main><JsonLd data={faqSchema(faqs)} /><section className="page-hero"><p className="eyebrow">{k.label.toUpperCase()} · {place.name.toUpperCase()}, TX</p><h1>{k.label} in {place.name}, TX</h1><p>Bilingual DJ and MC, professional sound, lighting, and LED production for {kind === "wedding" ? "weddings" : "quinceañeras"} in {place.name} and {place.nearby}.</p><p><a className="button" href={BUSINESS.phoneHref}>Call or text {BUSINESS.phoneDisplay}</a></p></section>{k.sections(place.name, place.nearby).map((s) => <section className="content" key={s.h}><div><h2>{s.h}</h2></div><div>{s.p.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}</div></section>)}<section className="content"><div><p className="eyebrow">FAQ</p><h2>{k.label} questions.</h2></div><div>{faqs.map((f) => <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>)}</div></section><section className="content"><div><h2>Keep exploring.</h2></div><div><ul><li><Link className="text-link" href={`/locations/${city}`}>All DJ services in {place.name} →</Link></li><li><Link className="text-link" href={k.serviceHref}>{k.label} services across the RGV →</Link></li><li><Link className="text-link" href="/#build-package">Build your package →</Link></li></ul></div></section><Inquiry title={`Planning a ${kind === "wedding" ? "wedding" : "quinceañera"} in ${place.name}? Let’s connect.`} /></main><Footer /></>;
}
