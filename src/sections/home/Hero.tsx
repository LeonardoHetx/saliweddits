import { useRef, useState } from "react";
import { HERO } from "@/content/hero";
import { CTA_HREF } from "@/content/site";
import { useHeroIntro } from "@/lib/motion";
import { ButtonLink } from "@/ui/Button";
import { PlayIcon } from "@/ui/icons";
import { BackgroundVideo } from "@/ui/BackgroundVideo";
import { VideoModal } from "@/ui/VideoModal";

/**
 * Para quem é (eyebrow), o que é (título) e a promessa (descrição), sobre o
 * reel de portfólio rodando ao fundo. Dois caminhos: o edit test (conversão) e o showreel (prova).
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [reelOpen, setReelOpen] = useState(false);
  useHeroIntro(root);

  return (
    <section ref={root} id="top" className="grain relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-night text-paper lg:min-h-[calc(100svh-9.5rem)]">
      <div data-hero-bg className="absolute inset-0 -z-10">
        <BackgroundVideo poster={HERO.image} youtubeId={HERO.video.youtubeId} mp4={HERO.video.mp4} />
        <div className="absolute inset-0 bg-night/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-night/30" />
        {/* Base mais fechada: esconde legenda queimada no rodapé do reel. */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-night to-transparent" />
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
        <div data-hero-line className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <ButtonLink href={CTA_HREF} tone="light">
            {HERO.primaryCta}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setReelOpen(true)}
            className="label group inline-flex min-h-11 items-center gap-3 text-paper/90 hover:text-paper"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-paper/60 transition-colors group-hover:bg-paper group-hover:text-ink">
              <PlayIcon className="ml-0.5 h-3.5 w-3.5" />
            </span>
            {HERO.secondaryCta}
          </button>
        </div>
      </div>

      <VideoModal open={reelOpen} onClose={() => setReelOpen(false)} title="Showreel" poster={HERO.image} youtubeId={HERO.showreelYoutubeId} />
    </section>
  );
}
