/**
 * Envio do formulário de contato para a planilha de leads, via o web app do
 * Google Apps Script (apps-script/Code.gs). A URL não é segredo: o navegador
 * de quem preenche o form precisa dela de qualquer jeito.
 */
const LEADS_URL: string = import.meta.env.VITE_LEADS_URL || "";

export class LeadError extends Error {}

export async function sendLead(form: HTMLFormElement): Promise<void> {
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
    page: window.location.href,
  };

  if (!LEADS_URL) {
    // Sem planilha configurada: no `vite dev` simula o envio para a página
    // continuar navegável; no build de produção, falha — nunca perde lead calado.
    if (import.meta.env.DEV) {
      console.warn("[leads] VITE_LEADS_URL vazia — envio simulado:", lead);
      return;
    }
    throw new LeadError("VITE_LEADS_URL is not set");
  }

  // Corpo em texto puro (sem Content-Type JSON): vira uma requisição "simples",
  // sem preflight de CORS, que o Apps Script não responde.
  const res = await fetch(LEADS_URL, {
    method: "POST",
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(15000),
  });
  const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!res.ok || !body?.ok) throw new LeadError(body?.error ?? `HTTP ${res.status}`);
}
