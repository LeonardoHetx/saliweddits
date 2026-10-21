import { useState, type FormEvent } from "react";
import { CONTACT_DIRECT, EDIT_TEST } from "@/content/closing";
import { SITE } from "@/content/site";
import { Container } from "@/ui/Container";
import { cx } from "@/ui/cx";
import { Reveal } from "@/ui/Reveal";

const FIELD =
  "w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-base font-light text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none focus:ring-0";

/**
 * O edit test: oferta de risco zero para um serviço de confiança. A coluna da
 * esquerda explica o que acontece depois do envio; a da direita é o form.
 * MOCK — o envio só troca para a tela de obrigado; falta ligar a um destino
 * (e-mail, webhook ou planilha).
 */
export function EditTest() {
  const [sent, setSent] = useState(false);
  const f = EDIT_TEST.fields;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="edit-test" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-24">
          <Reveal>
            <h2 className="display text-[2rem] sm:text-[2.75rem]">{EDIT_TEST.title}</h2>
            <p className="script text-[1.8rem] text-ink-soft sm:text-[2.2rem]">{EDIT_TEST.script}</p>
            <p className="mt-6 leading-relaxed text-ink-soft sm:text-lg">{EDIT_TEST.description}</p>
            <ol className="mt-10 space-y-5 border-t hairline pt-8">
              {EDIT_TEST.steps.map((step, i) => (
                <li key={step} className="flex items-baseline gap-4">
                  <span className="script w-8 text-3xl text-ink-mute">0{i + 1}</span>
                  <span className="label">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-t hairline pt-8 text-sm leading-relaxed text-ink-soft">
              {CONTACT_DIRECT}{" "}
              <a href={`mailto:${SITE.email}`} className="text-ink underline underline-offset-4 hover:opacity-60">
                {SITE.email}
              </a>
            </p>
          </Reveal>

          <Reveal delay={150}>
            {sent ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center border hairline p-10 text-center" role="status">
                <p className="display text-3xl">{EDIT_TEST.success.title}</p>
                <p className="script mt-1 text-3xl text-ink-soft">see you soon</p>
                <p className="mt-6 max-w-sm text-ink-soft">{EDIT_TEST.success.text}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
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

                <Field label={f.message} className="sm:col-span-2">
                  <textarea name="message" rows={3} className={cx(FIELD, "resize-none")} />
                </Field>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-ink-mute">{EDIT_TEST.privacy}</p>
                  <button
                    type="submit"
                    className="label min-h-12 border border-ink bg-ink px-9 py-3 text-paper transition-colors hover:bg-transparent hover:text-ink"
                  >
                    {EDIT_TEST.submit}
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

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
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
