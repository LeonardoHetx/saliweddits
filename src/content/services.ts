/**
 * WHAT WE EDIT — copy FINAL do cliente (21/10/2026). Sem preço por decisão
 * da copy: o valor se conversa no edit test.
 */
export const SERVICES = {
  title: "What We Edit",
  subtitle: "From the smallest moments to the full story, we've got your edits covered.",
  items: [
    {
      name: "Teasers & Social Edits",
      text: "Short, engaging edits designed to capture attention and leave a lasting impression. Perfect for wedding sneak peeks, Instagram Reels, and shareable moments that build excitement for the full film.",
      length: "Typically 15–90 seconds",
      image: "/films/bkI0jecEkZE.jpg",
    },
    {
      name: "Highlight Films",
      text: "A beautifully crafted recap of the wedding day, bringing together the best moments, meaningful audio, and music to tell a story that feels authentic, emotional, and true to each couple.",
      length: "Typically 3–7 minutes",
      image: "/films/_mWVsNkK_MI.jpg",
    },
    {
      name: "Feature Films",
      text: "A longer, more immersive wedding film that gives the story room to unfold. Blending cinematic storytelling with extended moments from the ceremony, vows, speeches, and celebration.",
      length: "Typically 8–20 minutes",
      image: "/films/zCPldltdRjA.jpg",
    },
    {
      name: "Documentary Edits",
      text: "A clean, chronological edit that preserves the wedding day's most important events as they happened. From full ceremonies and speeches to first dances and special traditions, with seamless multicamera editing and polished audio.",
      length: "Full ceremony, speeches & formal events",
      /** MOCK — trocar por um frame de documentário real. */
      image: "/mock/film-02.jpg",
    },
  ],
  cta: "Start with a free edit test",
} as const;
