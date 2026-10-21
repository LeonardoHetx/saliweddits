import { cx } from "./cx";

/** Foto que preenche o pai (`object-cover`). O pai define proporção e tamanho. */
export function Photo({
  src,
  alt = "",
  mono = false,
  priority = false,
  className,
}: {
  src: string;
  alt?: string;
  mono?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={cx("h-full w-full object-cover", mono && "grayscale", className)}
    />
  );
}
