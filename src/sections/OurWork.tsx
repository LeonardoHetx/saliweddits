import { useState } from "react";
import { OUR_WORK, type WorkFormat } from "@/content/work";
import { CTA_HREF } from "@/content/site";
import { ButtonLink } from "@/ui/Button";
import { Container } from "@/ui/Container";
import { cx } from "@/ui/cx";
import { PlayIcon } from "@/ui/icons";
import { Photo } from "@/ui/Photo";
import { Reveal } from "@/ui/Reveal";
import { SectionTitle } from "@/ui/SectionTitle";
import { VideoModal } from "@/ui/VideoModal";

/**
 * OUR WORK — os formatos sobre os próprios filmes: cada painel é um filme
 * real e o texto diz o que é aquele formato. Painéis de ponta a ponta, como
 * o tríptico da referência.
 */
export function OurWork() {
  return (
    <section id="our-work" className="bg-paper py-20 sm:py-28">
      <Container>
        <SectionTitle title={OUR_WORK.title} />
        <Reveal as="p" className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-ink-soft sm:text-lg">
          {OUR_WORK.subtitle}
        </Reveal>
      </Container>

      <Reveal as="ol" className="mt-12 grid gap-1.5 sm:grid-cols-2 xl:grid-cols-4">
        {OUR_WORK.formats.map((format, i) => (
          <li key={format.name}>
            <FormatPanel format={format} index={i} />
          </li>
        ))}
      </Reveal>

      <Reveal className="mt-12 flex justify-center">
        <ButtonLink href={CTA_HREF}>{OUR_WORK.cta}</ButtonLink>
      </Reveal>
    </section>
  );
}

/** Pôster do filme com o texto do formato por cima; abre o player se houver filme. */
function FormatPanel({ format, index }: { format: WorkFormat; index: number }) {
  const [open, setOpen] = useState(false);
  const playable = Boolean(format.youtubeId);

  const body = (
    <>
      <Photo src={format.image} className="transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]" />
      <span className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/10" />
      {playable && (
        <span className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-paper/70 text-paper transition-colors group-hover:bg-paper group-hover:text-ink">
          <PlayIcon className="ml-0.5 h-4 w-4" />
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 flex flex-col p-6 text-left text-paper sm:p-7">
        <span className="script text-3xl text-paper/70">0{index + 1}</span>
        <span className="display mt-1 text-xl sm:text-2xl">{format.name}</span>
        <span className="mt-3 text-sm leading-relaxed text-paper/85">{format.text}</span>
        <span className="label mt-5 border-t border-paper/30 pt-4 text-paper">{format.length}</span>
      </span>
    </>
  );

  const frame = "group relative block aspect-[4/5] w-full overflow-hidden bg-night xl:aspect-auto xl:h-[44rem]";

  if (!playable) return <div className={frame}>{body}</div>;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={`Play ${format.name.toLowerCase()} sample`} className={cx(frame)}>
        {body}
      </button>
      <VideoModal open={open} onClose={() => setOpen(false)} title={format.name} poster={format.image} youtubeId={format.youtubeId} />
    </>
  );
}
