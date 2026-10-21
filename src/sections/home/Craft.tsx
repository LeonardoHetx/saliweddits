import { CRAFT } from "@/content/craft";
import { CompareSlider } from "@/ui/CompareSlider";
import { Container } from "@/ui/Container";
import { Reveal } from "@/ui/Reveal";
import { SectionTitle } from "@/ui/SectionTitle";

/**
 * O ofício, mostrado e não só dito: o antes/depois de cor prova o grading;
 * a lista cobre o que não dá para mostrar numa foto (história, som, ritmo).
 */
export function Craft() {
  return (
    <section id="craft" className="bg-night py-20 text-paper sm:py-28 lg:py-36">
      <Container>
        <SectionTitle title={CRAFT.title} script={CRAFT.script} tone="light" />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <Reveal>
            <CompareSlider {...CRAFT.compare} />
          </Reveal>

          <ol className="divide-y divide-night-line border-y border-night-line">
            {CRAFT.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 100} className="grid grid-cols-[3rem_1fr] gap-x-4 py-6">
                <span className="script text-3xl text-paper/50">0{i + 1}</span>
                <div>
                  <h3 className="display text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {CRAFT.tools.map((tool) => (
            <span key={tool} className="label text-paper/50">
              {tool}
            </span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
