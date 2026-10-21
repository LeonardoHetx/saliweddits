import { useState } from "react";
import { FILM_CATEGORIES, OUR_WORK, WORK_TRIPTYCH } from "@/content/films";
import { FilmCard } from "@/sections/films/FilmCard";
import { Container } from "@/ui/Container";
import { cx } from "@/ui/cx";
import { Reveal } from "@/ui/Reveal";
import { SectionTitle } from "@/ui/SectionTitle";

/**
 * OUR WORK — o portfólio é o produto, então vem logo depois da promessa.
 * Abre com o tríptico da referência (os três filmes reais, o do meio mais
 * largo) e segue em "More films", por formato, com as categorias em script
 * numerado ("01 Weddings & Elopements…") como no "PORTFOLIO" da referência.
 */
export function OurWork() {
  const [left, middle, right] = WORK_TRIPTYCH;
  const [active, setActive] = useState(FILM_CATEGORIES[0].id);
  const category = FILM_CATEGORIES.find((c) => c.id === active) ?? FILM_CATEGORIES[0];

  return (
    <section id="our-work" className="bg-paper pb-20 pt-20 sm:pb-28 sm:pt-28">
      <Container>
        <SectionTitle title={OUR_WORK.title} script={OUR_WORK.script} />
      </Container>

      <Reveal className="mt-12 grid gap-1.5 md:h-[72vh] md:max-h-[44rem] md:grid-cols-[1fr_1.35fr_1fr]">
        <FilmCard film={left} frame="fill" caption="overlay" className="aspect-[4/5] md:aspect-auto" />
        <FilmCard film={middle} frame="fill" caption="overlay" className="aspect-[4/5] md:aspect-auto" />
        <FilmCard film={right} frame="fill" caption="overlay" className="aspect-[4/5] md:aspect-auto" />
      </Reveal>

      <Container className="mt-20 sm:mt-28">
        <Reveal className="text-center">
          <h3 className="display text-2xl sm:text-3xl">{OUR_WORK.moreTitle}</h3>
          <div role="tablist" aria-label="Film formats" className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-1">
            {FILM_CATEGORIES.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={c.id === active}
                aria-controls="film-panel"
                onClick={() => setActive(c.id)}
                className={cx(
                  "script min-h-11 text-[1.6rem] transition-opacity sm:text-[1.9rem]",
                  c.id === active ? "opacity-100" : "opacity-40 hover:opacity-75"
                )}
              >
                <span className="mr-1 text-[0.7em]">0{i + 1}</span> {c.label}
              </button>
            ))}
          </div>
          <p className="label mt-3 text-ink-mute">{OUR_WORK.note}</p>
        </Reveal>

        <div id="film-panel" role="tabpanel" aria-labelledby={`tab-${category.id}`} className="mt-12">
          {category.format === "landscape" ? (
            <div key={category.id} className="grid gap-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
              {category.films.map((film, i) => (
                <Reveal key={film.couple} delay={i * 90}>
                  <FilmCard film={film} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div
              key={category.id}
              className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5"
            >
              {category.films.map((film, i) => (
                <Reveal key={film.couple} delay={i * 90} className="w-[68vw] shrink-0 snap-center sm:w-auto">
                  <FilmCard film={film} frame="portrait" />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
