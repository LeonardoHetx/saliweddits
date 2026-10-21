import { useState } from "react";
import { TESTIMONIALS } from "@/content/testimonials";
import { Container } from "@/ui/Container";
import { ArrowIcon } from "@/ui/icons";
import { Reveal } from "@/ui/Reveal";

/** Bloco sálvia da referência: contador, citação em script, foto vertical. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const item = TESTIMONIALS[index];
  const go = (step: number) => setIndex((i) => (i + step + total) % total);

  return (
    <section aria-label="What filmmakers say" className="bg-sage py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal className="grid items-center gap-12 lg:grid-cols-[1fr_22rem] lg:gap-24">
          <div aria-live="polite">
            <p className="label text-ink-soft">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <div key={index} className="animate-[fadeIn_.8s_ease]">
              <blockquote>
                <p className="script mt-6 text-[2.4rem] leading-[1.15] sm:text-5xl">“{item.quote}”</p>
                <p className="mt-8 max-w-xl leading-relaxed text-ink-soft">{item.text}</p>
              </blockquote>
              <p className="label mt-8">{item.name}</p>
              <p className="label mt-1 text-ink-mute">{item.studio}</p>
            </div>
            <div className="mt-8 flex gap-2">
              <button type="button" onClick={() => go(-1)} className="grid h-11 w-14 place-items-center hover:opacity-60" aria-label="Previous testimonial">
                <ArrowIcon dir="left" className="h-3 w-8" />
              </button>
              <button type="button" onClick={() => go(1)} className="grid h-11 w-14 place-items-center hover:opacity-60" aria-label="Next testimonial">
                <ArrowIcon className="h-3 w-8" />
              </button>
            </div>
          </div>
          <div className="mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden border-[6px] border-paper/40 lg:max-w-none">
            <img key={item.image} src={item.image} alt="" loading="lazy" className="h-full w-full animate-[fadeIn_.8s_ease] object-cover grayscale" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
