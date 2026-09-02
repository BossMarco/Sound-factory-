import Link from "next/link";
import Image from "next/image";
import { Footer, Header, Inquiry } from "./components";
import { PackageBuilder } from "./package-builder";
import { ApolloHomeMotion } from "./apollo-home-motion";

const services = [
  { name: "Wedding DJs", description: "A full dance floor and a soundtrack that follows every part of the celebration.", slug: "wedding-dj", image: "/wedding-sparklers.jpeg" },
  { name: "Quinceañera DJs", description: "Music, lighting, and show moments made for a once-in-a-lifetime night.", slug: "quinceanera-dj", image: "/custom-led-display.jpeg" },
  { name: "Cheerleading Events", description: "High-energy sound and show-ready production for teams, showcases, and competitions.", slug: "cheerleading-event-dj", image: "/cheer-stage.jpg" },
  { name: "Private Events", description: "Birthdays, anniversaries, and celebrations with a room built around your people.", slug: "private-event-dj", image: "/event-ambience.jpg" },
  { name: "Corporate Events", description: "Professional entertainment and production for gatherings with something to say.", slug: "corporate-event-dj", image: "/venue-uplighting.jpeg" },
  { name: "Concerts & Public Events", description: "Sound, lighting, LED visuals, and show dynamics for a live crowd.", slug: "concert-production", image: "/concert-production.jpg" }
];

const capabilities = ["DJ + MC", "Lighting design", "LED screens", "Cold sparklers", "Custom dance floors", "Photo booths"];
const cities = ["McAllen", "Edinburg", "Mission", "Weslaco", "Pharr", "Harlingen", "Brownsville"];

export default function Home() {
  return <>
    <Header />
    <main className="apollo-home">
      <ApolloHomeMotion />
      <section className="apollo-hero">
        <video className="apollo-hero__video" muted loop playsInline preload="metadata" poster="/concert-production.jpg" aria-label="Sound Factory concert production in motion">
          <source src="/concert-production.mp4" type="video/mp4" />
        </video>
        <div className="apollo-hero__shade" />
        <div className="apollo-hero__copy" data-apollo-hero-copy>
          <p className="apollo-kicker">McAllen, Texas</p>
          <h1>Make the room move.</h1>
          <p>DJ entertainment and elevated production for celebrations, showcases, and live events across the Rio Grande Valley.</p>
          <a className="apollo-button" href="#build-package">Check your date</a>
        </div>
        <p className="apollo-hero__side">Sound Factory Productions</p>
      </section>

      <section className="apollo-capabilities" aria-label="Event production specialties">
        {capabilities.map((capability) => <span key={capability}>{capability}</span>)}
      </section>

      <section className="apollo-intro" data-apollo-reveal>
        <p className="apollo-kicker">The full experience</p>
        <h2>Not just music.<br />A whole atmosphere.</h2>
        <p>From the first entrance to the final song, Sound Factory shapes the visual and musical energy that makes an event feel complete.</p>
      </section>

      <section className="apollo-feature" data-apollo-reveal>
        <figure className="apollo-feature__primary">
          <Image src="/wedding-confetti.jpg" alt="Wedding celebration with confetti and a packed dance floor" fill sizes="(max-width: 720px) 100vw, 68vw" />
        </figure>
        <div className="apollo-feature__copy">
          <p className="apollo-kicker">For the big moments</p>
          <h2>A soundtrack with a point of view.</h2>
          <p>The right song lands differently when lighting, timing, and the crowd are all working together.</p>
          <Link className="apollo-text-link" href="/gallery">See the gallery <span aria-hidden="true">↗</span></Link>
        </div>
        <figure className="apollo-feature__secondary">
          <Image src="/venue-uplighting.jpeg" alt="Event venue transformed with uplighting" fill sizes="(max-width: 720px) 80vw, 27vw" />
        </figure>
      </section>

      <section className="apollo-services" id="services" data-apollo-reveal>
        <div className="apollo-services__heading">
          <p className="apollo-kicker">What we build</p>
          <h2>Every kind of celebration, dialed all the way in.</h2>
        </div>
        <div className="apollo-services__grid">
          {services.map((service, index) => <Link className="apollo-service" href={`/services/${service.slug}`} key={service.slug}>
            <Image src={service.image} alt="" fill sizes="(max-width: 720px) 100vw, 50vw" />
            <span className="apollo-service__shade" />
            <span className="apollo-service__number">0{index + 1}</span>
            <span className="apollo-service__body"><strong>{service.name}</strong><span>{service.description}</span><b>Explore</b></span>
          </Link>)}
        </div>
      </section>

      <section className="apollo-statement" data-apollo-reveal>
        <div>
          <p className="apollo-kicker">A production-first approach</p>
          <h2>More than a playlist. More than a setup.</h2>
        </div>
        <p>Sound, lighting, screens, effects, and thoughtful pacing make the room feel different. We bring the pieces together around the people and the occasion.</p>
      </section>

      <section className="apollo-showcase" data-apollo-reveal>
        <figure className="apollo-showcase__tall"><Image src="/mirrored-dance-floor.jpeg" alt="Couple dancing on a mirrored event dance floor" fill sizes="(max-width: 720px) 100vw, 46vw" /></figure>
        <div className="apollo-showcase__center"><p className="apollo-kicker">Designed to be remembered</p><h2>The room is part of the story.</h2><Link className="apollo-button apollo-button--light" href="#build-package">Build your package</Link></div>
        <figure className="apollo-showcase__short"><Image src="/photo-booth.jpeg" alt="Photo booth experience at a Sound Factory event" fill sizes="(max-width: 720px) 80vw, 30vw" /></figure>
      </section>

      <section className="apollo-social" data-apollo-reveal aria-labelledby="instagram-heading">
        <figure className="apollo-social__image">
          <Image src="/event-ambience.jpg" alt="Sound Factory lighting and production at a live event" fill sizes="(max-width: 720px) 100vw, 48vw" />
        </figure>
        <div className="apollo-social__copy">
          <p className="apollo-kicker">Behind the scenes</p>
          <h2 id="instagram-heading">Follow the nights we make.</h2>
          <p>See recent events, lighting transformations, packed dance floors, and the work that goes into every Sound Factory production.</p>
          <div className="apollo-social__links" aria-label="Sound Factory social media">
            <a className="apollo-social__link" href="https://www.instagram.com/factoryrgv?igsi=MTh0bTlvdWNwMzVvdg==" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span><span className="apollo-social__handle">@factoryrgv</span></a>
            <a className="apollo-social__link" href="https://www.facebook.com/share/1DN2VJrcCH/?mibextid=wwXIfr" target="_blank" rel="noreferrer">Facebook <span aria-hidden="true">↗</span><span className="apollo-social__handle">Sound Factory Productions</span></a>
          </div>
        </div>
      </section>

      <section className="apollo-locations" data-apollo-reveal>
        <p className="apollo-kicker">Rio Grande Valley home base</p>
        <h2>Your DJ, wherever the party is.</h2>
        <div>{cities.map((city) => <Link href={`/locations/${city.toLowerCase()}`} key={city}>{city}</Link>)}<Link href="/locations/texas">Texas travel</Link></div>
      </section>

      <PackageBuilder />
      <Inquiry />
    </main>
    <Footer />
  </>;
}
