import { STRIP } from "@/content/closing";
import { SITE } from "@/content/site";

/** Faixa de fotos acima do rodapé (o feed da referência), rolando devagar. */
export function PhotoStrip() {
  const images = [...STRIP.images, ...STRIP.images];
  return (
    <section aria-label={STRIP.label} className="relative overflow-hidden border-y-[6px] border-paper bg-paper">
      <div className="marquee flex w-max gap-1.5">
        {images.map((src, i) => (
          <div key={i} className="h-40 w-32 shrink-0 overflow-hidden sm:h-52 sm:w-44">
            <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover grayscale-[40%]" />
          </div>
        ))}
      </div>
      <a
        href={SITE.instagram.href}
        target="_blank"
        rel="noreferrer"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-6 py-3 text-center shadow-sm"
      >
        <span className="script block text-2xl">{STRIP.label}</span>
        <span className="label text-ink-soft">{SITE.instagram.handle}</span>
      </a>
    </section>
  );
}
