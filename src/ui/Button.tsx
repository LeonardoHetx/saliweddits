import type { ReactNode } from "react";
import { cx } from "./cx";

type Tone = "ink" | "light" | "solid";

const TONES: Record<Tone, string> = {
  ink: "border-olive/70 text-olive hover:bg-olive hover:text-paper",
  light: "border-paper/70 text-paper hover:bg-paper hover:text-olive",
  solid: "border-olive bg-olive text-paper hover:bg-transparent hover:text-olive",
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
