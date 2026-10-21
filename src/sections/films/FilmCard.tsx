import { useState } from "react";
import type { Film } from "@/content/films";
import { cx } from "@/ui/cx";
import { PlayIcon } from "@/ui/icons";
import { Photo } from "@/ui/Photo";
import { VideoModal } from "@/ui/VideoModal";

/**
 * Pôster clicável que abre o filme. `frame` controla a proporção:
 * "landscape" 16:9, "portrait" 9:16, "fill" ocupa a altura do pai (tríptico).
 */
export function FilmCard({
  film,
  frame = "landscape",
  caption = "below",
  className,
}: {
  film: Film;
  frame?: "landscape" | "portrait" | "fill";
  caption?: "below" | "overlay";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const title = `${film.couple} — ${film.place}`;

  return (
    <figure className={cx("group", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play ${film.kind.toLowerCase()}: ${title}`}
        className={cx(
          "relative block w-full overflow-hidden bg-night",
          frame === "landscape" && "aspect-video",
          frame === "portrait" && "aspect-[9/16]",
          frame === "fill" && "h-full"
        )}
      >
        <Photo src={film.image} className="transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]" />
        <span className="absolute inset-0 bg-night/10 transition-colors duration-500 group-hover:bg-night/30" />
        <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-paper/70 text-paper opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
          <PlayIcon className="ml-0.5 h-5 w-5" />
        </span>
        {caption === "overlay" && (
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-transparent p-5 pt-16 text-left text-paper">
            <span className="script block text-[1.75rem] leading-none">{film.couple}</span>
            <span className="label mt-2 block text-paper/80">
              {film.place} · {film.duration}
            </span>
          </span>
        )}
      </button>
      {caption === "below" && (
        <figcaption className="mt-4 flex items-baseline justify-between gap-4">
          <span className="script text-[1.75rem] leading-none">{film.couple}</span>
          <span className="label shrink-0 text-ink-soft">
            {film.kind} · {film.duration}
          </span>
        </figcaption>
      )}
      {caption === "below" && <p className="label mt-1.5 text-ink-mute">{film.place}</p>}
      <VideoModal open={open} onClose={() => setOpen(false)} title={title} poster={film.image} youtubeId={film.youtubeId} />
    </figure>
  );
}
