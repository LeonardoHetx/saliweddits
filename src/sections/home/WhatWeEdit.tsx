import { SERVICES } from "@/content/services";
import { CTA_HREF } from "@/content/site";
import { ButtonLink } from "@/ui/Button";
import { Container } from "@/ui/Container";
import { Photo } from "@/ui/Photo";
import { Reveal } from "@/ui/Reveal";
import { SectionTitle } from "@/ui/SectionTitle";

/**
 * Os quatro formatos, do mais curto ao mais longo. Vem logo depois do
 * tríptico: o filmmaker acabou de ver teaser, highlight e feature, e aqui
 * entende o que é cada um — e que o documentário também está coberto.
 */
export function WhatWeEdit() {
  return (
    <section id="what-we-edit" className="bg-linen py-20 sm:py-28 lg:py-36">
      <Container>
        <SectionTitle title={SERVICES.title} />
        <Reveal as="p" className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-ink-soft sm:text-lg">
          {SERVICES.subtitle}
        </Reveal>

        <ol className="mt-14 grid gap-px bg-ink/20 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {SERVICES.items.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 110} className="flex flex-col bg-linen p-6 lg:p-7">
              <div className="aspect-video overflow-hidden">
                <Photo src={item.image} className="transition-transform duration-[1.6s] ease-out hover:scale-[1.04]" />
              </div>
              <span className="script mt-6 text-3xl text-ink-mute">0{i + 1}</span>
              <h3 className="display mt-1 text-xl">{item.name}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              <p className="label mt-6 border-t hairline pt-4 text-ink">{item.length}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12 flex justify-center">
          <ButtonLink href={CTA_HREF}>{SERVICES.cta}</ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
