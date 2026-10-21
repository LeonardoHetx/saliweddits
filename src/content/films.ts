/** FILMS — o portfólio é o produto. Vem cedo, logo depois da promessa. */
export type Film = {
  couple: string;
  place: string;
  kind: string;
  duration: string;
  image: string;
  /** ID do vídeo no YouTube. Sem ele (mock), o modal mostra só o pôster. */
  youtubeId?: string;
};

export type FilmCategory = {
  id: string;
  label: string;
  title: string;
  /** "landscape" = 16:9 (filmes) · "portrait" = 9:16 (reels). */
  format: "landscape" | "portrait";
  films: Film[];
};

/** Filmes REAIS do canal da Aline (YouTube) — vão no tríptico do Our Work. */
export const REAL_FILMS = {
  portfolio: {
    couple: "Portfolio Reel",
    place: "Sali Weddits",
    kind: "Highlight",
    duration: "4:35",
    image: "/films/_mWVsNkK_MI.jpg",
    youtubeId: "_mWVsNkK_MI",
  },
  feature: {
    couple: "Cindy & Angus",
    place: "Feature film · sample",
    kind: "Feature",
    duration: "9:52",
    image: "/films/zCPldltdRjA.jpg",
    youtubeId: "zCPldltdRjA",
  },
  teaser: {
    couple: "Cindy & Angus",
    place: "Teaser",
    kind: "Teaser",
    duration: "1:32",
    image: "/films/bkI0jecEkZE.jpg",
    youtubeId: "bkI0jecEkZE",
  },
} satisfies Record<string, Film>;

export const OUR_WORK = {
  title: "Our Work",
  script: "a few of our favorites",
  moreTitle: "More films",
  note: "Edited by us, filmed by our partners. Shared with their permission.",
} as const;

/** "More films": abas por formato. MOCK até chegarem mais links do YouTube. */
export const FILM_CATEGORIES: FilmCategory[] = [
  {
    id: "highlights",
    label: "Highlights",
    title: "Highlight Films",
    format: "landscape",
    films: [
      { couple: "Marina & Theo", place: "Big Sur, California", kind: "Highlight", duration: "5:12", image: "/mock/film-01.jpg" },
      { couple: "Ana & Lucas", place: "Serra Gaúcha, Brazil", kind: "Highlight", duration: "4:05", image: "/mock/film-03.jpg" },
      { couple: "Iris & Sam", place: "Tuscany, Italy", kind: "Highlight", duration: "6:02", image: "/mock/film-06.jpg" },
    ],
  },
  {
    id: "features",
    label: "Feature Films",
    title: "Feature Films",
    format: "landscape",
    films: [
      { couple: "Clara & Ben", place: "Lake Como, Italy", kind: "Feature", duration: "14:40", image: "/mock/film-02.jpg" },
      { couple: "June & Oliver", place: "Isle of Skye, Scotland", kind: "Feature", duration: "12:18", image: "/mock/film-04.jpg" },
      { couple: "Lia & Noah", place: "Montana", kind: "Feature", duration: "16:30", image: "/mock/film-01.jpg" },
    ],
  },
  {
    id: "teasers",
    label: "Teasers",
    title: "Teasers & Social Edits",
    format: "landscape",
    films: [
      { couple: "Sofia & Mateo", place: "Joshua Tree, California", kind: "Teaser", duration: "1:20", image: "/mock/film-05.jpg" },
      { couple: "Nora & Elliot", place: "Cape Cod, Massachusetts", kind: "Teaser", duration: "1:30", image: "/mock/film-06.jpg" },
      { couple: "Eva & Jonah", place: "Lisbon, Portugal", kind: "Teaser", duration: "0:58", image: "/mock/film-03.jpg" },
    ],
  },
  {
    id: "reels",
    label: "Reels",
    title: "Reels & Social Cuts",
    format: "portrait",
    films: [
      { couple: "Iris & Sam", place: "Tuscany", kind: "Reel", duration: "0:45", image: "/mock/reel-01.jpg" },
      { couple: "Lia & Noah", place: "Montana", kind: "Reel", duration: "0:30", image: "/mock/reel-02.jpg" },
      { couple: "Eva & Jonah", place: "Lisbon", kind: "Reel", duration: "0:52", image: "/mock/reel-03.jpg" },
      { couple: "Maya & Leo", place: "Trancoso", kind: "Reel", duration: "0:38", image: "/mock/reel-04.jpg" },
      { couple: "Rosa & Finn", place: "Oregon Coast", kind: "Reel", duration: "0:41", image: "/mock/reel-05.jpg" },
    ],
  },
];

/** Tríptico do Our Work: teaser · highlight (no meio, o mais largo) · feature. */
export const WORK_TRIPTYCH: [Film, Film, Film] = [REAL_FILMS.teaser, REAL_FILMS.portfolio, REAL_FILMS.feature];
