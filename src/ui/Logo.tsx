import { SITE } from "@/content/site";
import { cx } from "./cx";

/**
 * A logo oficial, recortada do arquivo da cliente com fundo transparente
 * (public/brand/). "full" = Sali + Wedding Film Editing + ornamento;
 * "mark" = só o "Sali", para alturas pequenas onde a tagline não se lê.
 * A altura vem por `className`; a largura acompanha a proporção.
 */
export function Logo({ variant = "full", className }: { variant?: "full" | "mark"; className?: string }) {
  const src = variant === "full" ? "/brand/logo.png" : "/brand/wordmark.png";
  const [w, h] = variant === "full" ? [780, 620] : [780, 368];

  return (
    <a href="#top" aria-label={`${SITE.name} — back to top`} className={cx("inline-block", className)}>
      <img src={src} alt={`${SITE.name} — Wedding Film Editing`} width={w} height={h} className="h-full w-auto" />
    </a>
  );
}
