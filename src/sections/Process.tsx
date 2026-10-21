import { PROCESS } from "@/content/process";
import { Container } from "@/ui/Container";
import { Reveal } from "@/ui/Reveal";
import { SectionTitle } from "@/ui/SectionTitle";

/**
 * HOW WE WORK TOGETHER — tira o medo de terceirizar: cinco passos curtos, com
 * prazo no meio. É a faixa oliva da página (a cor de "seções" da marca).
 */
export function Process() {
  return (
    <section id="process" className="bg-olive py-20 text-paper sm:py-28">
      <Container>
        <SectionTitle title={PROCESS.title} script={PROCESS.script} tone="light" />

        <ol className="mt-14 grid border-t border-paper/20 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
          {PROCESS.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 110}
              className="border-b border-paper/20 py-8 sm:px-6 sm:max-lg:odd:border-r lg:border-b-0 lg:px-6 lg:py-10 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:last-child)]:border-r"
            >
              <span className="script text-4xl text-paper/55">0{i + 1}</span>
              <h3 className="display mt-3 text-lg">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
