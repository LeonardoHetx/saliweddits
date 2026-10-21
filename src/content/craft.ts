/** CRAFT — o que entra num corte. Mostra o ofício (antes/depois de cor). */
export const CRAFT = {
  title: "What goes into every cut",
  script: "the details nobody notices — until they're missing",
  compare: {
    image: "/mock/craft.jpg",
    before: "Log / ungraded",
    after: "Graded",
    hint: "Drag to compare",
  },
  items: [
    {
      title: "Story & structure",
      text: "We read the whole day before cutting — vows, letters, speeches — and build the film around the line that makes it theirs.",
    },
    {
      title: "Sound design",
      text: "Room tone, breaths, wind cleaned from the vows, music cut on the beat. The part your couples feel but never name.",
    },
    {
      title: "Color grading",
      text: "Your LUTs, your skin tones, matched across every camera. Consistent from the first look to the sparkler exit.",
    },
    {
      title: "Pacing & music",
      text: "Licensed tracks from your library, edited so the film breathes — slow where it matters, never dragging.",
    },
  ],
  tools: ["DaVinci Resolve", "Premiere Pro", "Final Cut Pro", "Frame.io"],
} as const;
