/** HERO — quem é, para quem é e a promessa, antes de qualquer rolagem. */
export const HERO = {
  eyebrow: "Wedding film editing · for filmmakers & studios",
  title: "Every wedding holds a story",
  script: "we cut it like it's ours",
  description:
    "You capture the moments. We bring the story together — in your style, under your brand, on your deadline.",
  primaryCta: "Request a free edit test",
  secondaryCta: "Watch the showreel",
  /** Pôster: aparece na hora (LCP) e fica por baixo até o vídeo começar. */
  image: "/films/_mWVsNkK_MI.jpg",
  /**
   * Fundo em vídeo. Hoje vem do YouTube (reel de portfólio da Aline). Para
   * produção, o ideal é um recorte próprio em MP4 (10–20 s, sem som): basta
   * preencher `mp4` e ele passa na frente do YouTube.
   */
  video: { youtubeId: "_mWVsNkK_MI", mp4: "" },
  /** O botão "Watch the showreel" abre o mesmo reel, com som. */
  showreelYoutubeId: "_mWVsNkK_MI",
} as const;
