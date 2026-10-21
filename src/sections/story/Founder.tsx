import { FOUNDER } from "@/content/story";
import { Container } from "@/ui/Container";
import { Photo } from "@/ui/Photo";
import { Reveal } from "@/ui/Reveal";

/** "Meet the founder": rosto, voz em primeira pessoa e assinatura. */
export function Founder() {
  return (
    <section id="founder" className="bg-sage py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
          <Reveal className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden border-[6px] border-paper/50 lg:max-w-none">
            <Photo src={FOUNDER.image} mono alt={`${FOUNDER.name}, ${FOUNDER.role}`} />
          </Reveal>
          <Reveal delay={150}>
            <p className="label text-ink-soft">{FOUNDER.kicker}</p>
            <h2 className="script mt-4 text-[3rem] leading-none sm:text-[4rem]">{FOUNDER.greeting}</h2>
            <div className="mt-8 space-y-5 leading-relaxed text-ink-soft sm:text-lg">
              {FOUNDER.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="display mt-10 border-t hairline pt-6 text-base sm:text-lg">{FOUNDER.signoff}</p>
            <p className="script mt-4 text-4xl">{FOUNDER.name}</p>
            <p className="label text-ink-mute">{FOUNDER.role}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
