import { SITE } from "@/content/site";
import { cx } from "./cx";

/** "SALI" em didone + "weddits" em script cruzando por baixo — como o "Lucia". */
export function Wordmark({ size = "lg", className }: { size?: "sm" | "lg"; className?: string }) {
  return (
    <a href="/" aria-label={`${SITE.name} — home`} className={cx("relative inline-flex items-end leading-none", className)}>
      <span className={cx("display tracking-[0.18em]", size === "lg" ? "text-[2.1rem] sm:text-[2.6rem]" : "text-xl")}>
        {SITE.wordmark.serif}
      </span>
      <span
        className={cx(
          "script -ml-1 translate-y-[0.32em] opacity-80",
          size === "lg" ? "text-[1.7rem] sm:text-[2rem]" : "text-lg"
        )}
      >
        {SITE.wordmark.script}
      </span>
    </a>
  );
}
