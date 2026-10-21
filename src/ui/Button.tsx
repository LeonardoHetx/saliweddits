import type { ReactNode } from "react";
import { cx } from "./cx";

type Tone = "ink" | "light" | "solid";

const TONES: Record<Tone, string> = {
  ink: "border-ink/70 text-ink hover:bg-ink hover:text-paper",
  light: "border-paper/70 text-paper hover:bg-paper hover:text-ink",
  solid: "border-ink bg-ink text-paper hover:bg-transparent hover:text-ink",
};

/** Botão retangular fino, como o "INQUIRE" da referência — nada de pílula. */
export function ButtonLink({
  href,
  children,
  tone = "ink",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cx(
        "label inline-flex min-h-11 items-center justify-center border px-7 py-3 transition-colors duration-300",
        TONES[tone],
        className
      )}
    >
      {children}
    </a>
  );
}
