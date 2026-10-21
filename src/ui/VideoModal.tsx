import { useEffect, useRef } from "react";
import { CloseIcon } from "./icons";

/**
 * Player em <dialog>. Com `youtubeId`, embute o YouTube; sem ele (mock), mostra o
 * pôster com um aviso — o layout já fica pronto para o vídeo real.
 */
export function VideoModal({
  open,
  onClose,
  title,
  poster,
  youtubeId,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  poster: string;
  youtubeId?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto w-[min(92vw,80rem)] bg-transparent p-0 text-paper"
      aria-label={title}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="label text-paper/80">{title}</p>
        <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center text-paper" aria-label="Close">
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="relative aspect-video bg-night">
        {open && youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
            <p className="label absolute inset-0 grid place-items-center text-paper">Film embed coming soon</p>
          </>
        )}
      </div>
    </dialog>
  );
}
