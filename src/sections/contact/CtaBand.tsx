import { useRef } from "react";
import { CTA_BAND } from "@/content/closing";
import { CTA_HREF } from "@/content/site";
import { useParallax } from "@/lib/motion";
import { ButtonLink } from "@/ui/Button";
import { Photo } from "@/ui/Photo";
import { Reveal } from "@/ui/Reveal";

/** "LET'S CAPTURE your love story" da referência: foto P&B e o convite para o form logo abaixo. */
export function CtaBand() {
  const bg = useRef<HTMLDivElement>(null);
  useParallax(bg, 14);

  return (
    <section className="grain relative isolate overflow-hidden bg-night">
      <div ref={bg} className="absolute -inset-y-[10%] inset-x-0 -z-10">
        <Photo src={CTA_BAND.image} mono className="opacity-60" />
      </div>
      <Reveal className="flex min-h-[26rem] flex-col items-center justify-center px-5 py-24 text-center text-paper sm:min-h-[32rem]">
        <h2 className="display text-[2.5rem] sm:text-6xl">{CTA_BAND.title}</h2>
        <p className="script -mt-1 text-[2rem] text-paper/90 sm:text-[2.75rem]">{CTA_BAND.script}</p>
        <ButtonLink href={CTA_HREF} tone="light" className="mt-8">
          {CTA_BAND.button}
        </ButtonLink>
      </Reveal>
    </section>
  );
}
