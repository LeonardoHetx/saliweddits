import { cx } from "./cx";
import { Reveal } from "./Reveal";

/** Título em didone caixa alta (oliva) + linha em script (marrom) logo abaixo. */
export function SectionTitle({
  title,
  script,
  align = "center",
  tone = "ink",
  as: Tag = "h2",
  className,
}: {
  title: string;
  script?: string;
  align?: "center" | "left";
  tone?: "ink" | "light";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Reveal className={cx(align === "center" ? "text-center" : "text-left", tone === "light" && "text-paper", className)}>
      <Tag className={cx("display text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem]", tone === "ink" && "text-olive")}>{title}</Tag>
      {script && (
        <p className={cx("script mt-1 text-[1.6rem] sm:text-[2rem]", tone === "light" ? "text-paper/80" : "text-umber")}>
          {script}
        </p>
      )}
    </Reveal>
  );
}
