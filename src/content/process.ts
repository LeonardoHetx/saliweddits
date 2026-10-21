/** PROCESS — mock, exceto o passo 4 (copy final). Mostra que terceirizar é simples e previsível. */
export const PROCESS = {
  title: "How we work together",
  script: "five steps, no surprises",
  steps: [
    {
      title: "Send the footage",
      text: "Share a Drive, Dropbox or Frame.io link. We confirm every card arrived and nothing is missing.",
    },
    {
      title: "Style brief",
      text: "Your references, LUTs, music preferences and must-have moments.",
    },
    {
      title: "First cut",
      text: "Delivered in 14 days on a private review link, with time-coded comments open.",
    },
    {
      // copy FINAL do cliente (21/10/2026)
      title: "Review & Refine",
      text: "Your feedback matters! Every project includes three rounds of revisions to make sure the final film feels just right.",
    },
    {
      title: "Final delivery",
      text: "Exports in every format you need, with your logo — ready to send to your couple.",
    },
  ],
} as const;
