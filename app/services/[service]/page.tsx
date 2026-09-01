import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header, Inquiry } from "../../components";

type ServiceMedia = {
  eyebrow: string;
  title: string;
  description: string;
  video: string;
  poster: string;
  alt: string;
  caption: string;
  orientation: "landscape" | "portrait";
};

type Service = {
  name: string;
  title: string;
  description: string;
  points: string[];
  media?: ServiceMedia;
};

const services: Record<string, Service> = {
  "wedding-dj": {
    name: "Wedding DJ",
    title: "Wedding DJ services in McAllen & the Rio Grande Valley",
    description:
      "Your wedding deserves a soundtrack that fits every part of the day, from the welcoming atmosphere to the dance floor celebration.",
    points: [
      "A music plan shaped around your celebration",
      "Thoughtful support for key moments and transitions",
      "Service throughout McAllen and the Rio Grande Valley",
    ],
    media: {
      eyebrow: "WEDDINGS IN MOTION",
      title: "A finish worth remembering.",
      description:
        "Music, lighting, and a room full of people sharing the moment. Every detail is planned around the energy you want your guests to feel.",
      video: "/wedding-confetti.mp4",
      poster: "/wedding-confetti.jpg",
      alt: "Newlyweds surrounded by confetti during a Sound Factory wedding celebration",
      caption: "The big finish.",
      orientation: "portrait",
    },
  },
  "quinceanera-dj": {
    name: "Quinceañera DJ",
    title: "Quinceañera DJ services for the Rio Grande Valley",
    description:
      "Celebrate this once-in-a-lifetime milestone with music that brings generations together and keeps the energy moving.",
    points: [
      "Music for traditional and modern moments",
      "A party atmosphere tailored to your family",
      "Available across the Rio Grande Valley",
    ],
  },
  "cheerleading-event-dj": {
    name: "Cheerleading Event DJ",
    title: "Cheerleading competition DJ & event production in McAllen & the Rio Grande Valley",
    description:
      "High-energy DJ support, clear sound, and visual production for cheer showcases, competitions, award ceremonies, and team celebrations.",
    points: [
      "Music and walk-on energy shaped for your event schedule",
      "Professional sound support for gyms, venues, and large team gatherings",
      "Lighting, LED displays, and MC support available for a complete production",
    ],
    media: {
      eyebrow: "CHEER PRODUCTION",
      title: "A stage that is ready when your teams are.",
      description:
        "Clear sound, programmed lighting, LED visuals, and reliable cueing support a competition experience that feels organized from the first walk-on to the final award.",
      video: "/cheer-stage.mp4",
      poster: "/cheer-stage.jpg",
      alt: "Cheer competition stage prepared with Sound Factory lighting and video production",
      caption: "Show-ready production.",
      orientation: "landscape",
    },
  },
  "private-event-dj": {
    name: "Private Event DJ",
    title: "Private event DJ services in McAllen, TX",
    description:
      "Birthdays, anniversaries, reunions, graduation parties, and celebrations deserve music that makes every guest want to stay a little longer.",
    points: [
      "A flexible soundtrack built around your guests and occasion",
      "Production options for intimate gatherings or a full celebration",
      "McAllen and Valley-wide service",
    ],
    media: {
      eyebrow: "PRIVATE CELEBRATIONS",
      title: "The kind of energy guests carry home.",
      description:
        "From your first song to your last call, the room stays connected through music, lighting, and a pace built around your people.",
      video: "/event-ambience.mp4",
      poster: "/event-ambience.jpg",
      alt: "Guests enjoying a Sound Factory dance floor with blue event lighting",
      caption: "Dance-floor energy.",
      orientation: "landscape",
    },
  },
  "corporate-event-dj": {
    name: "Corporate event DJ & production",
    title: "Corporate event DJ & production in the Rio Grande Valley",
    description:
      "Give your company party, employee appreciation event, brand activation, or holiday celebration a polished sound and production experience.",
    points: [
      "Professional planning aligned with the venue and event timeline",
      "Music, MC support, lighting, and LED display options",
      "Service for corporate gatherings throughout the Rio Grande Valley",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(services).map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const item = services[service];
  return item ? { title: item.title, description: item.description } : {};
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const item = services[service];

  if (!item) notFound();

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <p className="eyebrow">SOUND FACTORY PRODUCTIONS</p>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </section>
        <section className="content">
          <div>
            <p className="eyebrow">THE EXPERIENCE</p>
            <h2>Music built around your occasion.</h2>
          </div>
          <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
        </section>
        {item.media && (
          <section className={`service-media service-media--${item.media.orientation}`}>
            <div className="service-media__inner">
              <div className="service-media__copy">
                <p className="eyebrow">{item.media.eyebrow}</p>
                <h2>{item.media.title}</h2>
                <p>{item.media.description}</p>
              </div>
              <figure>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={item.media.poster}
                  aria-label={item.media.alt}
                >
                  <source src={item.media.video} type="video/mp4" />
                </video>
                <figcaption>{item.media.caption}</figcaption>
              </figure>
            </div>
          </section>
        )}
        <Inquiry title={`Planning a ${item.name.toLowerCase()}? Let’s connect.`} />
      </main>
      <Footer />
    </>
  );
}
