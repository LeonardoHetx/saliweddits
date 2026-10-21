import type { CSSProperties, ElementType, ReactNode } from "react";

/** Marca o bloco para entrar ao rolar (ver `lib/reveal.ts` e `index.css`). */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag data-reveal="" className={className} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
