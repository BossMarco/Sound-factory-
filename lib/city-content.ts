export type CityContent = { title: string; description: string; h1: string; intro: string; sections: { h: string; p: string[] }[] };

export const cityContent: Record<string, CityContent> = {
  brownsville: {
    title: "DJ in Brownsville, TX | Weddings & Quinceañeras",
    description: "Looking for a DJ in Brownsville, TX? Sound Factory Productions brings bilingual DJ & MC, pro sound, lighting, and LED screens to weddings, quinceañeras, and events in Brownsville and Cameron County.",
    h1: "DJ in Brownsville, TX for weddings, quinceañeras & events",
    intro: "Sound Factory Productions is a Rio Grande Valley DJ and event production team serving Brownsville, Los Fresnos, Port Isabel, South Padre Island, and all of Cameron County. We bring the music, a bilingual MC, professional sound, lighting, and LED visuals — one crew handling the whole night.",
    sections: [
      { h: "A Brownsville DJ who reads the room in two languages.", p: [
        "Brownsville celebrations are family celebrations. Grandparents want the cumbias and boleros, cousins want reggaetón and hip-hop, and the couple wants the songs that tell their story. Our DJs build a music plan that moves through all of it without losing the dance floor.",
        "Our MC can run introductions, toasts, the first dance, and the rest of your timeline in English, Spanish, or both, so no one at your table misses a moment.",
      ] },
      { h: "Wedding DJ service in Brownsville.", p: [
        "From the ceremony processional to the last song, we coordinate your timeline with your planner and venue. We can provide ceremony audio with wireless microphones for vows and readings, cocktail-hour music, a grand entrance, first dance, parent dances, toasts, and a packed reception.",
        "Whether your reception is in a Brownsville ballroom or event center, a ranch venue outside town, or a beachfront celebration on South Padre Island, we scale the sound and lighting to the room.",
      ] },
      { h: "Quinceañera DJ service in Brownsville.", p: [
        "A quinceañera has its own rhythm: the grand entrance, the vals, the father-daughter dance, the surprise dance, and the party after. We plan the music and cues for each moment, run the surprise-dance audio, and light the room in your colors so the photos and the night both look incredible.",
      ] },
      { h: "Lighting, LED screens, and full event production.", p: [
        "We bring more than speakers. Dance-floor and architectural uplighting, LED screens for slideshows and names, and professional audio sized to your venue turn any Brownsville hall into the room you pictured. Our Signature package includes 6 hours of DJ and MC, professional audio and lighting, an LED screen, and architectural lighting; Deluxe adds an LED banner, special effects, custom props, and event staff.",
      ] },
      { h: "Corporate, school, and private events in Cameron County.", p: [
        "We also DJ company parties, galas, school dances, cheerleading events, birthdays, reunions, and public events across Brownsville and the Lower Valley — with the same planning, punctual setup, and clean production.",
      ] },
      { h: "Serving Brownsville and the Lower Rio Grande Valley.", p: [
        "We regularly travel for events in Brownsville, Los Fresnos, Port Isabel, South Padre Island, San Benito, and Harlingen, as well as the rest of the Valley from McAllen to Weslaco. Tell us your date and venue and we'll confirm availability.",
      ] },
    ],
  },
  mcallen: {
    title: "DJ in McAllen, TX | Wedding & Quinceañera DJ",
    description: "McAllen wedding and quinceañera DJ. Sound Factory Productions provides bilingual DJ & MC, pro sound, lighting, and LED screens for weddings, quinceañeras, and events in McAllen, Edinburg, Mission, and Pharr.",
    h1: "Wedding & quinceañera DJ in McAllen, TX",
    intro: "McAllen is home base for Sound Factory Productions. We provide DJ entertainment, a bilingual MC, professional sound, lighting, and LED production for weddings, quinceañeras, corporate events, and private celebrations across McAllen, Edinburg, Mission, Pharr, and the rest of Hidalgo County.",
    sections: [
      { h: "A McAllen wedding DJ built around your day.", p: [
        "Your wedding should sound like you. We build a music plan from your must-play and do-not-play lists, then shape it around the ceremony, cocktail hour, grand entrance, first dance, toasts, and reception so the energy builds at the right moments.",
        "We coordinate with your planner, venue, photographer, and videographer so every cue lands — and we provide ceremony audio with wireless microphones for vows and readings.",
      ] },
      { h: "Bilingual DJ and MC for Valley families.", p: [
        "Valley celebrations bring together several generations and two languages. Our MC handles introductions and announcements in English and Spanish, and our DJs move easily between cumbia, norteño, Tejano, Latin pop, reggaetón, hip-hop, country, and the throwbacks everyone knows.",
      ] },
      { h: "Quinceañera DJ in McAllen.", p: [
        "From the grand entrance and vals to the surprise dance and the party, we plan every quinceañera moment with the family. We run the surprise-dance audio, light the room in your colors, and keep the celebration moving all night.",
      ] },
      { h: "Sound, lighting, and LED production.", p: [
        "We bring professional audio sized to your venue, dance-floor and architectural lighting, and LED screens for slideshows, names, and visuals. Our Signature package includes 6 hours of DJ and MC, professional audio and lighting, an LED screen, and architectural lighting; Deluxe adds an LED banner, special effects, custom props, and event staff.",
      ] },
      { h: "Corporate events, concerts, and private parties.", p: [
        "Beyond weddings and quinceañeras, we produce company parties, galas, conferences, school and cheerleading events, birthdays, and public events and concerts in McAllen and the Rio Grande Valley.",
      ] },
      { h: "How booking a McAllen DJ works.", p: [
        "Start by calling or texting us, or use the package builder with your date, venue, and guest count. We confirm availability, recommend a package, and send your agreement. A few weeks before the event we meet to finalize your timeline, special songs, announcements, and any lighting or LED details, then we arrive early to set up and sound-check before guests walk in.",
      ] },
      { h: "Serving McAllen and the whole Valley.", p: [
        "From McAllen we serve Edinburg, Mission, Pharr, San Juan, Weslaco, Harlingen, and Brownsville, and we travel across Texas for the right event. Call or text to check your date.",
      ] },
    ],
  },
};
