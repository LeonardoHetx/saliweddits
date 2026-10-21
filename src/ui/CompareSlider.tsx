import { useState } from "react";

/**
 * Antes/depois de cor. Um <input type="range"> invisível cobre a imagem: dá
 * arraste, toque e teclado de graça, e o leitor de tela entende o controle.
 */
export function CompareSlider({
  image,
  before,
  after,
  hint,
}: {
  image: string;
  before: string;
  after: string;
  hint: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[16/10] select-none overflow-hidden bg-night-soft">
      <img src={image} alt="" loading="lazy" className="graded-look absolute inset-0 h-full w-full object-cover" />
      <img
        src={image}
        alt=""
        loading="lazy"
        className="log-look absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <div className="pointer-events-none absolute inset-y-0 w-px bg-paper/80" style={{ left: `${pos}%` }}>
        <span className="label absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-paper/80 bg-night/40 text-[0.6rem] text-paper backdrop-blur-sm">
          ⟷
        </span>
      </div>
      <span className="label pointer-events-none absolute left-4 top-4 text-paper/90">{before}</span>
      <span className="label pointer-events-none absolute right-4 top-4 text-paper/90">{after}</span>
      <span className="label pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-paper/70">{hint}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${before} versus ${after}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
