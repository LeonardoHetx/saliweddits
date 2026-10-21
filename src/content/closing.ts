/** CONTACT — título + formulário. MOCK. */
export const CONTACT = {
  title: "Contact",
} as const;

export const INQUIRY = {
  description:
    "Tell us about your studio and the films you need edited, and we'll get back to you to talk about how we can work together.",
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
  submit: "Send inquiry",
  sending: "Sending…",
  error: "Something went wrong and your message wasn't sent. Please try again, or write to us at",
  rateLimited: "Too many attempts in a short time. Please wait a minute and try again, or write to us at",
  success: {
    title: "Thank you",
    script: "talk soon",
    text: "We've got your message and will get back to you soon.",
  },
} as const;

export const FOOTER = {
  tagline: "Wedding film editing for filmmakers & studios.",
  origin: "Made in Brazil. Editing love stories everywhere.",
} as const;

/** Linha de contato direto, embaixo da explicação do formulário. */
export const CONTACT_DIRECT = "Prefer email? Write to us at";
