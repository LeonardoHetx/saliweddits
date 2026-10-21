import { useEffect, useRef, useState } from "react";
import { cx } from "./cx";

/**
 * Vídeo de fundo, mudo e em loop, por cima de um pôster.
 *
 * - `mp4` (recorte próprio) tem prioridade: leve, sem marca, começa rápido.
 * - Sem ele, usa o YouTube em modo "fundo": sem controles, mudo, recortado
 *   para cobrir a área. Só aparece alguns segundos depois de o player avisar
 *   que começou a tocar (API de postMessage): é o tempo de o YouTube recolher
 *   título e controles que ele mostra na largada.
 *
 * O vídeo só entra depois da hidratação e é pulado com "reduzir movimento"
 * ou economia de dados — nesses casos fica o pôster.
 */
/** Quanto o YouTube leva para esconder título e controles depois de dar play. */
const YT_CHROME_MS = 3500;

export function BackgroundVideo({
  poster,
  youtubeId,
  mp4,
  className,
}: {
  poster: string;
  youtubeId?: string;
  mp4?: string;
  className?: string;
}) {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!reduced && !saveData) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || mp4 || !youtubeId) return;
    let reveal: number | undefined;
    const onMessage = (e: MessageEvent) => {
      if (!String(e.origin).includes("youtube")) return;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.info?.playerState === 1) reveal ??= window.setTimeout(() => setPlaying(true), YT_CHROME_MS);
      } catch {
        /* mensagens de outros scripts */
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(reveal);
    };
  }, [enabled, mp4, youtubeId]);

  // Pede ao player para mandar eventos de estado (playerState 1 = tocando).
  const listen = () =>
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: youtubeId ?? "",
    controls: "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    disablekb: "1",
    iv_load_policy: "3",
    cc_load_policy: "0",
    enablejsapi: "1",
  });

  return (
    <div className={cx("absolute inset-0 overflow-hidden", className)}>
      <img src={poster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />

      {enabled && mp4 && (
        <video
          src={mp4}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          onPlaying={() => setPlaying(true)}
          className={cx("absolute inset-0 h-full w-full object-cover transition-opacity duration-1000", playing ? "opacity-100" : "opacity-0")}
        />
      )}

      {enabled && !mp4 && youtubeId && (
        <iframe
          ref={frame}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`}
          title="Background video"
          aria-hidden
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          onLoad={listen}
          className={cx(
            // Cobre a área como object-cover: 16:9 que nunca fica menor que o pai.
            "pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 scale-[1.15] border-0 transition-opacity duration-1000",
            playing ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
