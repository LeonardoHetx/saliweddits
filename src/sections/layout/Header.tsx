import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/content/site";
import { Container } from "@/ui/Container";
import { cx } from "@/ui/cx";
import { CloseIcon } from "@/ui/icons";
import { Wordmark } from "@/ui/Wordmark";

type NavHref = (typeof NAV_LINKS)[number]["href"];

/** Qual seção do menu está na tela agora (scrollspy). */
function useActiveSection(): NavHref {
  const [active, setActive] = useState<NavHref>("#top");

  useEffect(() => {
    const targets = NAV_LINKS.map((l) => document.querySelector<HTMLElement>(l.href)).filter(
      (el): el is HTMLElement => el !== null
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}` as NavHref);
        }
      },
      // Faixa fina no meio da tela: a seção que a cruza é a "atual".
      { rootMargin: "-45% 0px -50% 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return active;
}

/**
 * Desktop: wordmark centralizado e a régua de navegação com divisórias, como
 * na referência; ao rolar, uma barra compacta desce do topo.
 * Mobile: barra compacta fixa desde o início + menu em tela cheia.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 180);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      {/* Desktop: topo editorial */}
      <header className="hidden bg-paper lg:block">
        <div className="flex justify-center pb-6 pt-8">
          <Wordmark />
        </div>
        <nav aria-label="Main" className="border-y hairline">
          <ul className="flex justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-l hairline last:border-r">
                <a
                  href={link.href}
                  aria-current={link.href === active ? "true" : undefined}
                  className={cx("label block px-9 py-3 transition-colors hover:bg-ink/5", link.href === active && "bg-ink/[0.06]")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Barra compacta: fixa no mobile, desce ao rolar no desktop */}
      <div
        className={cx(
          "fixed inset-x-0 top-0 z-40 border-b hairline bg-paper/90 backdrop-blur-md transition-transform duration-500",
          scrolled ? "translate-y-0" : "lg:-translate-y-full"
        )}
      >
        <Container className="flex h-16 items-center justify-between">
          <Wordmark size="sm" />
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={link.href === active ? "true" : undefined}
                  className={cx("label transition-opacity hover:opacity-60", link.href === active && "underline underline-offset-8")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="label -mr-3 min-h-11 px-3 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </Container>
      </div>
      {/* Espaço da barra fixa no mobile */}
      <div className="h-16 lg:hidden" aria-hidden />

      <div
        id="mobile-menu"
        className={cx(
          "fixed inset-0 z-50 flex flex-col bg-night text-paper transition-opacity duration-500 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <Container className="flex h-16 items-center justify-end">
          <button
            type="button"
            className="-mr-3 grid h-11 w-11 place-items-center"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            tabIndex={menuOpen ? 0 : -1}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </Container>
        <nav aria-label="Mobile" className="flex flex-1 flex-col items-center justify-center gap-7">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} tabIndex={menuOpen ? 0 : -1} className="display text-4xl" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
