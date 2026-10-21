import { FOOTER } from "@/content/closing";
import { NAV_LINKS, SITE } from "@/content/site";
import { Container } from "@/ui/Container";
import { Wordmark } from "@/ui/Wordmark";

/** Três colunas com divisórias finas, como o rodapé da referência. */
export function Footer() {
  const connect = [
    { label: SITE.email, href: `mailto:${SITE.email}` },
    { label: `Instagram ${SITE.instagram.handle}`, href: SITE.instagram.href },
  ];

  return (
    <footer className="border-t hairline bg-paper">
      <div className="grid border-b hairline md:grid-cols-3">
        <div className="border-b hairline px-5 py-12 text-center md:border-b-0 md:border-r">
          <p className="script text-3xl">Navigate</p>
          <ul className="mt-5 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="label hover:opacity-60">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 border-b hairline px-5 py-12 text-center md:border-b-0 md:border-r">
          <Wordmark />
          <p className="max-w-[16rem] text-sm text-ink-soft">{FOOTER.tagline}</p>
        </div>
        <div className="px-5 py-12 text-center">
          <p className="script text-3xl">Connect</p>
          <ul className="mt-5 space-y-2.5">
            {connect.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="label hover:opacity-60" target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Container className="flex flex-col items-center justify-between gap-2 py-6 text-center sm:flex-row">
        <p className="label text-ink-mute">© {new Date().getFullYear()} {SITE.name}</p>
        <p className="label text-ink-mute">{FOOTER.origin}</p>
      </Container>
    </footer>
  );
}
