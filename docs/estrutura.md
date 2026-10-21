# Sali Weddits — estrutura da página

Página única, em inglês, para **filmmakers e estúdios** (B2B, como a
raweddings.co): quem compra é quem filma, não o casal. O menu (Home · Our
Work · Our Story · Contact) são âncoras na mesma página.

A conversão é o formulário de contato (`#contact`): todo CTA leva para lá.
O form já qualifica o filmmaker — volume de casamentos e formatos que precisa.

## Ordem e por quê

| # | Seção | Âncora | O que diz | Copy |
|---|---|---|---|---|
| 1 | Hero | `#top` | Para quem é, o que é, a promessa. Vídeo de fundo: recorte de 18 s do reel (`public/video/`, 16:9 e 9:16). CTA único: contato | mock |
| 2 | Our Work | `#our-work` | Os 4 formatos (What We Edit) sobre os próprios filmes: cada painel é um filme real e abre o player | **final** (exceto o botão) |
| 3 | How We Work Together | `#process` | 5 passos, para tirar o medo de terceirizar | mock |
| 4 | Our Story | `#our-story` | O estúdio e a Aline | **final** |
| 5 | Contact | `#contact` | Convite + formulário | mock |

A lógica: **o quê → o trabalho → como → quem → contato**. Superfícies
alternam (noite, papel, linho) para nunca repetir duas iguais seguidas.

## Onde mexer

- Copy: `src/content/*.ts` — um arquivo por seção; os componentes só leem daí.
- Our Work: `src/content/work.ts` (texto + `youtubeId` de cada formato). Os
  pôsteres em `public/work/` são frames 1080p dos filmes, recortados em 4:5
  com o casal no centro (o painel estreito do desktop corta o meio deles).
- Fotos de mock: `public/mock/` (picsum.photos / acervo Unsplash) — trocar
  pelas reais.

## Pendências

- Copy final de Hero, How We Work Together e Contact.
- Prazos e rodadas do How We Work Together (14 dias, 2 rodadas): mock.
- Filme de documentário (`youtubeId` + pôster) para o 4º painel do Our Work.
- Foto da Aline (`FOUNDER.image`) e da história (`STORY.image`).
- Formulário: hoje só mostra a tela de obrigado — falta ligar a um destino.
- E-mail real (`src/content/site.ts`); o Instagram já é o oficial.
