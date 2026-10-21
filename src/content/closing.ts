/** CONTACT — faixa de CTA (abre a seção) + o formulário do edit test. */
export const CTA_BAND = {
  title: "Let's edit",
  script: "your next season",
  button: "Request a free edit test",
  image: "/mock/cta.jpg",
} as const;

export const EDIT_TEST = {
  title: "The Edit Test",
  script: "one film, on us",
  description:
    "Send us one wedding you've already delivered. We'll cut a 60-second teaser in your style — free — so you can compare it side by side with your own.",
  steps: ["Fill the form", "We reply within 24h with an upload link", "Your teaser in 5 days"],
  fields: {
    name: "Your name",
    studio: "Studio / company",
    email: "Email",
    portfolio: "Instagram or Vimeo link",
    volume: "Weddings per season",
    volumeOptions: ["Up to 10", "11–25", "26–50", "50+"],
    needs: "What do you need edited?",
    needsOptions: ["Teasers & social edits", "Highlight films", "Feature films", "Documentary edits"],
    message: "Anything we should know? (optional)",
  },
  submit: "Send my request",
  success: {
    title: "Thank you",
    text: "We'll reply within 24 hours with your upload link.",
  },
  privacy: "No spam. We only use your details to reply to this request.",
} as const;

export const STRIP = {
  label: "Follow the cuts",
  images: [
    "/mock/strip-01.jpg",
    "/mock/strip-02.jpg",
    "/mock/strip-03.jpg",
    "/mock/strip-04.jpg",
    "/mock/strip-05.jpg",
    "/mock/strip-06.jpg",
    "/mock/strip-07.jpg",
    "/mock/strip-08.jpg",
    "/mock/strip-09.jpg",
    "/mock/strip-10.jpg",
  ],
} as const;

export const FOOTER = {
  tagline: "Wedding film editing for filmmakers & studios.",
  origin: "Made in Brazil. Editing love stories everywhere.",
} as const;

/** Linha de contato direto, embaixo da explicação do edit test. */
export const CONTACT_DIRECT = "Prefer to talk first? Write to us — we reply within 24 hours, Monday to Friday.";
