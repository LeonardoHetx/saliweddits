/**
 * MOCK — toda a copy deste diretório é provisória e será trocada pela copy
 * final. Os componentes só leem daqui: trocar texto não mexe em seção.
 */
export const SITE = {
  name: "Sali Weddits",
  /** Wordmark: parte em serifa + parte em script, como o "Lucia" da referência. */
  wordmark: { serif: "SALI", script: "weddits" },
  email: "hello@saliweddits.com",
  instagram: { handle: "@sali.weddingfilms", href: "https://www.instagram.com/sali.weddingfilms/" },
} as const;

/** Menu: as quatro "páginas" são seções da mesma página, por âncora. */
export const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Our Work", href: "#our-work" },
  { label: "Our Story", href: "#our-story" },
  { label: "Contact", href: "#contact" },
] as const;

/** Destino de todos os CTAs: a seção de contato. */
export const CTA_HREF = "#contact";
