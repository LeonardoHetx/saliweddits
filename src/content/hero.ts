/** HERO — quem é, para quem é e a promessa, antes de qualquer rolagem. */
export const HERO = {
  eyebrow: "Wedding film editing · for filmmakers & studios",
  title: "Every wedding holds a story",
  script: "we cut it like it's ours",
  description:
    "You capture the moments. We bring the story together — in your style, under your brand, on your deadline.",
  primaryCta: "Request a free edit test",
  secondaryCta: "Watch the showreel",
  /**
   * Fundo em vídeo: recorte de 18 s (3:07–3:25) do reel de portfólio da Aline,
   * mudo. Duas versões — 16:9 para desktop e recorte 9:16 para celular — cada
   * uma com o pôster no primeiro frame.
   */
  video: {
    desktop: { mp4: "/video/hero-1280.mp4", poster: "/video/hero-1280.jpg" },
    mobile: { mp4: "/video/hero-540x960.mp4", poster: "/video/hero-540x960.jpg" },
  },
  /** O botão "Watch the showreel" abre o reel inteiro, com som (YouTube). */
  showreelYoutubeId: "_mWVsNkK_MI",
} as const;
