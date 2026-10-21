# Sali Weddits — estrutura da página

Página única, em inglês, para **filmmakers e estúdios** (B2B, como a
raweddings.co): quem compra é quem filma, não o casal. O menu (Home · Our
Work · Our Story · Contact) são âncoras na mesma página.

A conversão é o **edit test**: o filmmaker manda um casamento já entregue e
recebe um teaser grátis no estilo dele. Todo CTA leva para `#edit-test`.

## Ordem e por quê

| # | Seção | Âncora | O que diz | Copy |
|---|---|---|---|---|
| 1 | Hero | `#top` | Para quem é, o que é, a promessa. Vídeo de fundo (reel). CTA: edit test + showreel | mock |
| 2 | Intro | — | A dor ("40 horas de material num HD e sábado já tem casamento"), 3 pilares (seu estilo · sua marca · no prazo) e números | mock |
| 3 | Our Work | `#our-work` | Prova visual cedo: tríptico com os 3 filmes reais + "More films" por formato | filmes reais + abas mock |
| 4 | What We Edit | `#what-we-edit` | Os 4 formatos, do teaser ao documentário | **final** |
| 5 | Craft | `#craft` | O ofício: antes/depois de cor + história, som, cor, ritmo | mock |
| 6 | Process | `#process` | 5 passos, para tirar o medo de terceirizar | mock |
| 7 | Testimonials | — | Prova social de outros filmmakers | mock |
| 8 | Our Story | `#our-story` | O estúdio e a Aline: as pessoas depois da prova | **final** |
| 9 | FAQ | `#faq` | Objeções de quem nunca terceirizou | mock |
| 10 | Contact | `#contact` | Faixa "Let's edit your next season" + formulário do edit test | mock |
| — | Faixa de fotos + rodapé | — | Instagram, navegação, contato | mock |

A lógica: **o quê → dor → prova → oferta → como → quem → dúvidas → ação**.
Superfícies alternam (noite, linho, papel, sálvia) para nunca repetir duas
iguais seguidas.

## Onde mexer

- Copy: `src/content/*.ts` — um arquivo por seção; os componentes só leem daí.
- Filmes: `src/content/films.ts` (`youtubeId` + thumbnail em `public/films/`).
- Fotos de mock: `public/mock/` (picsum.photos / acervo Unsplash) — trocar
  pelas reais.

## Pendências

- Copy final de Hero, Intro, Craft, Process, Testimonials, FAQ e Contact.
- Números da Intro (320+ filmes, 6 países, 14 dias) e prazos do Process: mock.
- Depoimentos reais (nome, estúdio, foto).
- Foto da Aline (`FOUNDER.image`) e frame de documentário (`SERVICES`).
- Vídeo do hero: hoje é YouTube; o ideal é um recorte MP4 de 10–20 s
  (`HERO.video.mp4`), sem a marca nem as legendas automáticas do YouTube.
- Formulário: hoje só mostra a tela de obrigado — falta ligar a um destino.
- Contatos reais: e-mail, Instagram, Vimeo, WhatsApp (`src/content/site.ts`).
