import { useRef } from "react";
import { INTRO } from "@/content/intro";
import { useParallax } from "@/lib/motion";
import { Container } from "@/ui/Container";
import { Photo } from "@/ui/Photo";
import { Reveal } from "@/ui/Reveal";

/**
 * A dor antes da solução: o filmmaker se reconhece na primeira frase, e só
 * então vêm os três pilares e os números.
 */
export function Intro() {
  const img = useRef<HTMLDivElement>(null);
  useParallax(img, 10);

  return (
    <section className="bg-linen py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden lg:max-w-none">
            <div ref={img} className="absolute -inset-y-[8%] inset-x-0">
              <Photo src={INTRO.image} mono />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="label text-ink-soft">{INTRO.kicker}</p>
              <p className="mt-6 font-display text-[1.65rem] leading-[1.3] sm:text-[2.1rem]">{INTRO.statement}</p>
              <p className="script mt-3 text-[2rem] text-ink-soft sm:text-[2.5rem]">{INTRO.script}</p>
              <p className="mt-6 max-w-xl leading-relaxed text-ink-soft">{INTRO.body}</p>
            </Reveal>

            <ol className="mt-12 grid gap-8 border-t hairline pt-10 sm:grid-cols-3 sm:gap-6">
              {INTRO.pillars.map((pillar, i) => (
                <Reveal as="li" key={pillar.title} delay={i * 120}>
                  <span className="script text-3xl text-ink-mute">0{i + 1}</span>
                  <h3 className="display mt-2 text-lg">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pillar.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 border-y hairline lg:grid-cols-4">
          {INTRO.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 100}
              className="flex flex-col border-ink/20 px-4 py-8 text-center [&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
            >
              <dt className="label order-2 mt-2 text-ink-soft">{stat.label}</dt>
              <dd className="display order-1 text-3xl sm:text-4xl">{stat.value}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
