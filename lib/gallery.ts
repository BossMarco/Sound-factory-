export type GalleryItem = {
  alt: string;
  caption: string;
  poster?: string;
  src: string;
  type: "image" | "video";
};

export const galleryItems: GalleryItem[] = [
  {
    type: "image",
    src: "/venue-uplighting.jpeg",
    alt: "Reception tables and floral arrangements lit with purple uplighting",
    caption: "Venue uplighting",
  },
  {
    type: "image",
    src: "/wedding-sparklers.jpeg",
    alt: "Newlyweds dancing beneath indoor sparkler effects on a black-and-white dance floor",
    caption: "Sparkler first dance",
  },
  {
    type: "image",
    src: "/special-fx-celebration.jpg",
    alt: "Couple celebrating beneath falling confetti and special effects",
    caption: "Special FX",
  },
  {
    type: "image",
    src: "/mirrored-dance-floor.jpeg",
    alt: "Couple standing on a mirrored dance floor during an outdoor celebration",
    caption: "Mirrored dance floor",
  },
  {
    type: "image",
    src: "/custom-led-display.jpeg",
    alt: "Custom LED display and lighting setup above a dance floor",
    caption: "Custom LED display",
  },
  {
    type: "image",
    src: "/concert-production.jpg",
    alt: "Outdoor concert stage with purple lighting and a large LED screen",
    caption: "Concert production",
  },
  {
    type: "image",
    src: "/wedding-confetti.jpg",
    alt: "Newlyweds surrounded by confetti during a reception celebration",
    caption: "Wedding confetti moment",
  },
  {
    type: "image",
    src: "/special-fx-wedding-confetti.jpg",
    alt: "Bride and groom surrounded by falling confetti during a reception",
    caption: "Wedding special FX",
  },
  {
    type: "image",
    src: "/special-fx-quinceanera.jpg",
    alt: "Quinceañera lifted above a fog-covered dance floor beneath falling confetti",
    caption: "Quinceañera special FX",
  },
  {
    type: "image",
    src: "/cheer-stage.jpg",
    alt: "Cheer event stage prepared with LED screens and purple lighting",
    caption: "Cheer stage production",
  },
  {
    type: "image",
    src: "/event-ambience.jpg",
    alt: "Guests gathering on a blue-lit dance floor at a reception",
    caption: "Dance-floor ambience",
  },
  {
    type: "video",
    src: "/concert-production.mp4",
    poster: "/concert-production.jpg",
    alt: "Video of an outdoor concert stage with purple lighting and LED visuals",
    caption: "Concert production in motion",
  },
  {
    type: "video",
    src: "/wedding-confetti.mp4",
    poster: "/wedding-confetti.jpg",
    alt: "Video of newlyweds celebrating beneath falling confetti",
    caption: "Wedding celebration in motion",
  },
  {
    type: "video",
    src: "/cheer-stage.mp4",
    poster: "/cheer-stage.jpg",
    alt: "Video of a cheer event stage with LED screens and performance lighting",
    caption: "Cheer stage in motion",
  },
  {
    type: "video",
    src: "/event-ambience.mp4",
    poster: "/event-ambience.jpg",
    alt: "Video of guests dancing at a blue-lit reception",
    caption: "Dance-floor energy in motion",
  },
];
