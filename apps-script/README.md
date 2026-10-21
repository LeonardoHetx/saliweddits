# Leads → Google Sheets

O formulário do site envia cada lead para um **web app do Google Apps
Script** ligado à planilha; o script grava uma linha por envio. Sem servidor
e sem chave no site.

## Instalar (uma vez)

1. Abra a planilha → **Extensões → Apps Script**.
2. Apague o que estiver no editor, cole o conteúdo de [`Code.gs`](Code.gs) e
   salve.
3. **Implantar → Nova implantação** → tipo **App da Web**:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
4. Autorize o acesso à planilha quando o Google pedir.
5. Copie a **URL do app da Web** (termina em `/exec`) e coloque em
   `LEADS_URL`, em [`src/lib/leads.ts`](../src/lib/leads.ts).

Os leads vão para a **primeira aba**. No primeiro envio o script põe o
cabeçalho na linha 1 — se já houver algo ali, ele entra acima, sem apagar
nada: Recebido em · Nome · Estúdio · E-mail · Portfólio · Casamentos por
temporada · Formatos · Mensagem · Página.

A planilha **não precisa ser pública** — o script grava com a sua conta.
Deixe-a privada: ela guarda nome e e-mail de quem preencheu o formulário.

## Mudou o `Code.gs`?

**Implantar → Gerenciar implantações → editar (lápis) → Versão: Nova
versão → Implantar.** Assim a URL continua a mesma; uma "Nova implantação"
geraria outra URL.

## Testar sem o site

```bash
curl -L -H "Content-Type: text/plain" \
  -d '{"name":"Teste","email":"teste@exemplo.com","page":"curl"}' \
  "COLE_A_URL_AQUI"
```

Resposta esperada: `{"ok":true}` e uma linha nova na planilha.
