import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Papéis quentes da referência (Lucia/Showit): nada de branco puro nem
        // cinza neutro — tudo puxado para o bege.
        paper: "#F2F0EA",
        // Cores da marca (Aline, 21/10/2026).
        // Oliva: títulos, detalhes e seções.
        olive: {
          DEFAULT: "#454B38",
          deep: "#3A3F2F",
        },
        // Marrom: elementos vintage e tipografia (cursiva, assinatura, rótulos).
        umber: "#80583F",
        linen: "#E8E6DC",
        ink: {
          DEFAULT: "#24231F",
          soft: "#55534B",
          mute: "#8A877C",
        },
        // Superfície escura das seções de cinema (hero, ofício, fechamento).
        night: {
          DEFAULT: "#1B1A17",
          soft: "#2A2925",
          line: "#3A3934",
        },
      },
      fontFamily: {
        display: ['"Bodoni Moda"', "Didot", "Georgia", "serif"],
        // Cursiva legível (Petit Formal Script), hospedada no projeto — ver
        // @font-face em index.css.
        script: ['"Sali Script"', "cursive"],
        sans: ["Jost", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      letterSpacing: {
        label: "0.22em",
      },
      maxWidth: {
        page: "80rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
