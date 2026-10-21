import { useEffect, useRef, useState } from "react";
import { cx } from "./cx";

export type VideoSource = { mp4: string; poster: string };

/** Abaixo disso, a versão vertical (recorte 9:16) — nítida em tela de celular. */
const MOBILE_QUERY = "(max-width: 767px)";

/**
 * Vídeo de fundo, mudo e em loop, por cima de um pôster.
 *
 * O pôster é um <picture> (desktop 16:9 / mobile 9:16): pinta na hora e é o
 * LCP. O vídeo só entra depois da hidratação, na versão do tamanho da tela,
 * e aparece com fade quando começa a tocar. Com "reduzir movimento" ou
 * economia de dados, fica só o pôster.
 */
export function BackgroundVideo({
  desktop,
  mobile,
  className,
}: {
  desktop: VideoSource;
  mobile: VideoSource;
  className?: string;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced || saveData) return;
    setSrc(window.matchMedia(MOBILE_QUERY).matches ? mobile.mp4 : desktop.mp4);
  }, [desktop.mp4, mobile.mp4]);

  // iOS só faz autoplay de vídeo mudo, e o React aplica `muted` como
  // propriedade depois de criar o elemento — então garante e dá o play aqui.
  useEffect(() => {
    const el = video.current;
    if (!el || !src) return;
    el.muted = true;
    el.play().catch(() => {
      /* autoplay bloqueado: fica o pôster */
    });
  }, [src]);

  return (
    <div className={cx("absolute inset-0 overflow-hidden", className)}>
      <picture>
        <source media={MOBILE_QUERY} srcSet={mobile.poster} />
        <img src={desktop.poster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      </picture>

      {src && (
        <video
          ref={video}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          onPlaying={() => setPlaying(true)}
          className={cx(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            playing ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
