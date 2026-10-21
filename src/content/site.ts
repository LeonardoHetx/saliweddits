/**
 * MOCK — toda a copy deste diretório é provisória e será trocada pela copy
 * final. Os componentes só leem daqui: trocar texto não mexe em seção.
 */
export const SITE = {
  name: "Sali Weddits",
  /** Wordmark: parte em serifa + parte em script, como o "Lucia" da referência. */
  wordmark: { serif: "SALI", script: "weddits" },
  email: "hello@saliweddits.com",
  instagram: { handle: "@saliweddits", href: "https://instagram.com/" },
  vimeo: { label: "Vimeo", href: "https://vimeo.com/" },
  whatsapp: { label: "WhatsApp", href: "https://wa.me/" },
} as const;

/** Menu: as quatro "páginas" são seções da mesma página, por âncora. */
export const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Our Work", href: "#our-work" },
  { label: "Our Story", href: "#our-story" },
  { label: "Contact", href: "#contact" },
] as const;

/** Destino de todos os CTAs: o formulário do edit test. */
export const CTA_HREF = "#edit-test";
export const HEADER_CTA = "Free edit test";
