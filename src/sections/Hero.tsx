import { useRef } from "react";
import { HERO } from "@/content/hero";
import { CTA_HREF } from "@/content/site";
import { useHeroIntro } from "@/lib/motion";
import { ButtonLink } from "@/ui/Button";
import { BackgroundVideo } from "@/ui/BackgroundVideo";

/**
 * Para quem é (eyebrow), o que é (título) e a promessa (descrição), sobre o
 * recorte do reel de portfólio rodando ao fundo, e um único CTA: o contato.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  useHeroIntro(root);

  return (
    <section ref={root} id="top" className="grain relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-night text-paper lg:min-h-[calc(100svh-9.5rem)]">
      <div data-hero-bg className="absolute inset-0 -z-10">
        <BackgroundVideo desktop={HERO.video.desktop} mobile={HERO.video.mobile} />
        <div className="absolute inset-0 bg-night/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-night/30" />
      </div>

      <div className="mx-auto w-full max-w-page px-5 pb-14 pt-32 text-center sm:px-8 sm:pb-20 lg:px-12">
        <p data-hero-line className="label mx-auto max-w-xs text-balance text-paper/80 sm:max-w-none">
          {HERO.eyebrow}
        </p>
        <h1 data-hero-line className="display mx-auto mt-6 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-[5.25rem]">
          {HERO.title}
        </h1>
        <p data-hero-line className="script mt-1 text-[2.1rem] text-paper/90 sm:text-5xl">
          {HERO.script}
        </p>
        <p data-hero-line className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
          {HERO.description}
        </p>
        <div data-hero-line className="mt-10 flex justify-center">
          <ButtonLink href={CTA_HREF} tone="light">
            {HERO.primaryCta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
