/**
 * OUR WORK — copy FINAL do cliente (What We Edit, 21/10/2026), exceto o `cta`
 * (mock). Cada formato aparece sobre o filme real daquele formato, do canal
 * da Aline no YouTube.
 */
export type WorkFormat = {
  name: string;
  text: string;
  length: string;
  /** Pôster do painel (thumbnail do filme). */
  image: string;
  /** Filme no YouTube. Sem ele, o painel não abre player. */
  youtubeId?: string;
};

export const OUR_WORK: {
  title: string;
  subtitle: string;
  formats: readonly WorkFormat[];
  cta: string;
} = {
  title: "Our Work",
  subtitle: "From the smallest moments to the full story, we've got your edits covered.",
  formats: [
    {
      name: "Teasers & Social Edits",
      text: "Short, engaging edits designed to capture attention and leave a lasting impression. Perfect for wedding sneak peeks, Instagram Reels, and shareable moments that build excitement for the full film.",
      length: "Typically 15–90 seconds",
      image: "/films/bkI0jecEkZE.jpg",
      youtubeId: "bkI0jecEkZE",
    },
    {
      name: "Highlight Films",
      text: "A beautifully crafted recap of the wedding day, bringing together the best moments, meaningful audio, and music to tell a story that feels authentic, emotional, and true to each couple.",
      length: "Typically 3–7 minutes",
      image: "/films/_mWVsNkK_MI.jpg",
      youtubeId: "_mWVsNkK_MI",
    },
    {
      name: "Feature Films",
      text: "A longer, more immersive wedding film that gives the story room to unfold. Blending cinematic storytelling with extended moments from the ceremony, vows, speeches, and celebration.",
      length: "Typically 8–20 minutes",
      image: "/films/zCPldltdRjA.jpg",
      youtubeId: "zCPldltdRjA",
    },
    {
      name: "Documentary Edits",
      text: "A clean, chronological edit that preserves the wedding day's most important events as they happened. From full ceremonies and speeches to first dances and special traditions, with seamless multicamera editing and polished audio.",
      length: "Full ceremony, speeches & formal events",
      /** MOCK — sem filme ainda: trocar pela thumbnail e pôr o youtubeId. */
      image: "/mock/film-02.jpg",
    },
  ],
  cta: "Let's talk about your edits",
};
