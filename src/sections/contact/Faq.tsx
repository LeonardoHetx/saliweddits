import { FAQ } from "@/content/faq";
import { Container } from "@/ui/Container";
import { PlusIcon } from "@/ui/icons";
import { Reveal } from "@/ui/Reveal";
import { SectionTitle } from "@/ui/SectionTitle";

/** As objeções de quem nunca terceirizou edição, em <details> nativo. */
export function Faq() {
  return (
    <section id="faq" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[4fr_8fr] lg:gap-20">
          <SectionTitle title={FAQ.title} script={FAQ.script} align="left" className="lg:sticky lg:top-28 lg:self-start" />
          <Reveal className="border-t hairline">
            {FAQ.items.map((item) => (
              <details key={item.question} className="group border-b hairline">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg sm:text-xl">{item.question}</span>
                  <PlusIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="max-w-2xl pb-7 leading-relaxed text-ink-soft">{item.answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
