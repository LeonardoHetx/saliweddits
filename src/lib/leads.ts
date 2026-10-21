/**
 * Envio do formulário de contato. O navegador só fala com o próprio site:
 * POST /api/lead, que o nginx limita por IP e repassa ao Apps Script da
 * planilha (nginx.conf). A URL do script nunca entra no bundle.
 */
const LEADS_ENDPOINT = "/api/lead";

/** Motivo da falha, para o form escolher a mensagem. */
export class LeadError extends Error {
  constructor(readonly reason: "rate_limited" | "failed", detail: string) {
    super(detail);
  }
}

/** `startedAt`: quando o form apareceu na tela — o script descarta envio rápido demais (bot). */
export async function sendLead(form: HTMLFormElement, startedAt: number): Promise<void> {
  const data = new FormData(form);
  const lead = {
    name: data.get("name"),
    studio: data.get("studio"),
    email: data.get("email"),
    portfolio: data.get("portfolio"),
    volume: data.get("volume"),
    needs: data.getAll("needs"),
    message: data.get("message"),
    website: data.get("website"),
    elapsed: Date.now() - startedAt,
    page: window.location.href,
  };

  // `npm run dev` sem LEADS_URL não tem /api/lead: simula para a página
  // continuar navegável. O build de produção sempre envia de verdade.
  if (import.meta.env.DEV && !__LEADS_DEV_PROXY__) {
    console.warn("[leads] LEADS_URL vazia no dev — envio simulado:", lead);
    return;
  }

  const res = await fetch(LEADS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(15000),
  });
  if (res.status === 429) throw new LeadError("rate_limited", "HTTP 429");

  const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (body?.error === "rate_limited") throw new LeadError("rate_limited", "script hourly cap");
  if (!res.ok || !body?.ok) throw new LeadError("failed", body?.error ?? `HTTP ${res.status}`);
}
