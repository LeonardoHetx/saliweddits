import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CONTACT, CONTACT_DIRECT, INQUIRY } from "@/content/closing";
import { SITE } from "@/content/site";
import { LeadError, sendLead } from "@/lib/leads";
import { Container } from "@/ui/Container";
import { SectionTitle } from "@/ui/SectionTitle";
import { cx } from "@/ui/cx";
import { Reveal } from "@/ui/Reveal";

const FIELD =
  "w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-base font-light text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none focus:ring-0";

/**
 * CONTACT — o título da seção e o formulário: à esquerda o convite e o e-mail
 * direto, à direita o form — que já qualifica o filmmaker (volume e formatos
 * que ele precisa).
 * O envio vai para a planilha de leads (`lib/leads.ts`); se falhar, o form
 * continua preenchido e oferece o e-mail como saída.
 */
export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "rate_limited">("idle");
  const f = INQUIRY.fields;
  // Quando o form apareceu: vai junto no envio para o script descartar bot
  // (envio rápido demais para um humano ter preenchido).
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await sendLead(e.currentTarget, startedAt.current);
      setStatus("sent");
    } catch (err) {
      console.error("[leads]", err);
      setStatus(err instanceof LeadError && err.reason === "rate_limited" ? "rate_limited" : "error");
    }
  }

  return (
    <section id="contact" className="bg-linen py-20 sm:py-28">
      <Container>
        <SectionTitle title={CONTACT.title} />
        <div className="mt-14 grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-24">
          <Reveal>
            <p className="font-display text-[1.6rem] leading-[1.35] sm:text-[2rem]">{INQUIRY.description}</p>
            <p className="mt-10 border-t hairline pt-8 text-sm leading-relaxed text-ink-soft">
              {CONTACT_DIRECT}{" "}
              <a href={`mailto:${SITE.email}`} className="text-ink underline underline-offset-4 hover:opacity-60">
                {SITE.email}
              </a>
            </p>
          </Reveal>

          <Reveal delay={150}>
            {status === "sent" ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center border hairline p-10 text-center" role="status">
                <p className="display text-3xl">{INQUIRY.success.title}</p>
                <p className="script mt-1 text-3xl text-ink-soft">{INQUIRY.success.script}</p>
                <p className="mt-6 max-w-sm text-ink-soft">{INQUIRY.success.text}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="relative grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <Field label={f.name}>
                  <input name="name" required autoComplete="name" className={FIELD} />
                </Field>
                <Field label={f.studio}>
                  <input name="studio" required autoComplete="organization" className={FIELD} />
                </Field>
                <Field label={f.email}>
                  <input name="email" type="email" required autoComplete="email" className={FIELD} />
                </Field>
                <Field label={f.portfolio}>
                  <input name="portfolio" type="url" placeholder="https://" className={FIELD} />
                </Field>

                <fieldset className="sm:col-span-2">
                  <legend className="label text-ink-soft">{f.volume}</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {f.volumeOptions.map((opt) => (
                      <Chip key={opt} type="radio" name="volume" value={opt} />
                    ))}
                  </div>
                </fieldset>

                <fieldset className="sm:col-span-2">
                  <legend className="label text-ink-soft">{f.needs}</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {f.needsOptions.map((opt) => (
                      <Chip key={opt} type="checkbox" name="needs" value={opt} />
                    ))}
                  </div>
                </fieldset>

                {/* Isca para bots: escondida de quem enxerga e de leitor de tela. */}
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-px w-px opacity-0" />

                <Field label={f.message} className="sm:col-span-2">
                  <textarea name="message" rows={3} className={cx(FIELD, "resize-none")} />
                </Field>

                {(status === "error" || status === "rate_limited") && (
                  <p role="alert" className="text-sm leading-relaxed text-ink sm:col-span-2">
                    {status === "rate_limited" ? INQUIRY.rateLimited : INQUIRY.error}{" "}
                    <a href={`mailto:${SITE.email}`} className="underline underline-offset-4 hover:opacity-60">
                      {SITE.email}
                    </a>
                    .
                  </p>
                )}

                <div className="flex sm:col-span-2 sm:justify-end">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="label min-h-12 border border-ink bg-ink px-9 py-3 text-paper transition-colors hover:bg-transparent hover:text-ink disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-ink disabled:hover:text-paper"
                  >
                    {status === "sending" ? INQUIRY.sending : INQUIRY.submit}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={cx("block", className)}>
      <span className="label text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

function Chip({ type, name, value }: { type: "radio" | "checkbox"; name: string; value: string }) {
  return (
    <label className="cursor-pointer">
      <input type={type} name={name} value={value} className="peer sr-only" />
      <span className="label inline-flex min-h-10 items-center border border-ink/30 px-4 py-2 transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2">
        {value}
      </span>
    </label>
  );
}
