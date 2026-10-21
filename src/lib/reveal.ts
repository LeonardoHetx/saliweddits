/**
 * Liga o `[data-reveal]`: adiciona `.is-in` quando o bloco entra na tela.
 * Um MutationObserver cobre blocos que o React desenha depois (troca de aba).
 * Chamado depois da hidratação: antes dela, a classe nova seria divergência
 * entre o HTML do servidor e o do cliente.
 */
let started = false;

export function initReveal(): void {
  if (started) return;
  started = true;

  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  const watch = (root: ParentNode) =>
    root.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));

  watch(document);
  new MutationObserver(() => watch(document)).observe(document.body, { childList: true, subtree: true });
}
