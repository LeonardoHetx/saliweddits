/** INTRO — a dor do filmmaker e a promessa em três pilares. */
export const INTRO = {
  kicker: "The season doesn't wait",
  statement:
    "You shot the vows, the toasts, the last dance. Now forty hours of footage sit on a drive — and next Saturday is already booked.",
  script: "let us carry the edit",
  body:
    "Sali Weddits is a Brazil-based studio that edits only weddings, since 2020. We learn how you see a day — your pacing, your color, your music — and deliver films that feel like you cut them yourself.",
  image: "/mock/intro.jpg",
  pillars: [
    {
      title: "Your style, matched",
      text: "We study your past films before touching a frame. The first cut already looks like yours.",
    },
    {
      title: "Under your brand",
      text: "White-label from the first file to the final export. Your couples only ever see your name.",
    },
    {
      title: "Always on schedule",
      text: "First cut in 14 days, agreed in writing. You plan your season around dates that hold.",
    },
  ],
  stats: [
    { value: "2020", label: "editing since" },
    { value: "320+", label: "films delivered" },
    { value: "6", label: "countries" },
    { value: "14 days", label: "to first cut" },
  ],
} as const;
