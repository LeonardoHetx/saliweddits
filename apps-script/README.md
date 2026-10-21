# Leads → Google Sheets (+ WhatsApp)

```
formulário ──POST /api/lead──▶ nginx do site ──▶ Apps Script ──▶ planilha
                               (5/min por IP)    (Code.gs)      └─▶ WhatsApp
```

O navegador só fala com o próprio site. O nginx limita por IP e repassa ao
**web app do Google Apps Script** ligado à planilha; a URL do script fica só
na env `LEADS_URL` do container — nunca no bundle, então não dá para pular o
limite mandando direto para o Google.

## Proteções contra spam

| Onde | O quê |
|---|---|
| nginx | 5 envios/min por IP (rajada de 3), corpo até 16 KB, só POST |
| script | campo-isca escondido (`website`) preenchido → descarta |
| script | enviado menos de 3 s depois de abrir a página → descarta |
| script | teto geral de 30 leads/hora |
| script | mesmo e-mail em menos de 10 min → não grava de novo |
| script | texto que começa com `=`, `+`, `-`, `@` vira texto (sem fórmula) |

Descartes respondem "ok" de propósito: o bot não aprende o que o denunciou.

## Instalar (uma vez)

Faça tudo numa **janela anônima**, logado só na conta dona da planilha.

1. Planilha → **Extensões → Apps Script**. Cole o [`Code.gs`](Code.gs) e salve.
2. No seletor de função, escolha `doGet` → **Executar** → autorize
   (Revisar permissões → Avançado → Acessar projeto → Permitir).
3. **Implantar → Nova implantação → App da Web**: Executar como **Eu**,
   Quem pode acessar **Qualquer pessoa**.
4. A URL do app da Web (termina em `/exec`) vai na env **`LEADS_URL`** do
   container do site (`docker run -e LEADS_URL=…`). Para testar localmente,
   ponha em `.env.local` (ver `.env.example`).

Conferir: a URL `/exec` aberta numa janela anônima sem login mostra
`{"ok":true,"service":"sali-leads"}`.

## Aviso no WhatsApp (opcional)

O script avisa a cada lead gravado. Usa o que estiver configurado nas
**Propriedades do script** (engrenagem → Propriedades do script); sem nada
configurado, o aviso fica desligado. Se o aviso falhar, o lead continua salvo.

### WhatsApp oficial — Meta Cloud API

1. **App:** [developers.facebook.com](https://developers.facebook.com) → Meus
   apps → Criar app → caso de uso **WhatsApp** (ligue a um portfólio
   empresarial; pode criar um na hora).
2. **Número de teste e destinatário:** no app, **WhatsApp → Configuração da
   API**. Anote o **ID do número de telefone** (Phone number ID). Em "Para",
   adicione o seu WhatsApp e confirme com o código que chega nele.
3. **Modelo de mensagem:** no **WhatsApp Manager → Modelos de mensagem →
   Criar**: categoria **Utilidade**, nome `novo_lead`, idioma **Português
   (BR)**, corpo:

   ```
   Novo lead no site da Sali 🎬
   Nome: {{1}}
   Estúdio: {{2}}
   E-mail: {{3}}
   Formatos: {{4}}
   Casamentos por temporada: {{5}}
   ```

   Preencha os exemplos das variáveis e envie para análise. Espere ficar
   **Ativo** (minutos a algumas horas).
4. **Token permanente:** [business.facebook.com/settings](https://business.facebook.com/settings)
   → Usuários → **Usuários do sistema** → Adicionar (função Admin) →
   **Atribuir ativos**: o app (controle total) e a conta do WhatsApp →
   **Gerar token**: escolha o app, validade **Nunca**, permissões
   `whatsapp_business_messaging` e `whatsapp_business_management`.
   O token aparece uma vez só.
5. **Propriedades do script:**
   - `WA_TOKEN` — o token permanente
   - `WA_PHONE_NUMBER_ID` — o ID do número de teste (passo 2)
   - `WA_TO` — seu WhatsApp, só dígitos com DDI e DDD (ex.: `5548999999999`)
   - opcionais: `WA_TEMPLATE` (padrão `novo_lead`), `WA_TEMPLATE_LANG`
     (padrão `pt_BR`), `WA_API_VERSION` (padrão `v23.0`)
6. **Teste:** função `testWhatsApp` → **Executar** → autorize o acesso
   externo. Chega a mensagem; se não, a resposta da Meta aparece no
   **Registro de execução**.
7. Publique uma **nova versão** (abaixo).

O número de teste só manda para os números verificados no passo 2 (até 5) —
para avisar você (ou a Aline), basta. O token, o ID e o número ficam nas
Propriedades do script, nunca no código.

### CallMeBot (alternativa gratuita, com vagas limitadas)

Siga [callmebot.com/blog/free-api-whatsapp-messages](https://www.callmebot.com/blog/free-api-whatsapp-messages/)
para receber a apikey e cadastre `WHATSAPP_PHONE` e `CALLMEBOT_APIKEY`. Se
`WA_TOKEN` existir, a Meta tem preferência.

## Mudou o `Code.gs`?

**Implantar → Gerenciar implantações → editar (lápis) → Versão: Nova
versão → Implantar.** Assim a URL continua a mesma.

## Problemas conhecidos

- **403 "Acesso negado" mesmo com "Qualquer pessoa":** rode `doGet` no
  editor para autorizar e crie uma **Nova implantação** já com "Qualquer
  pessoa" — editar a antiga não bastou aqui.
- **"Não foi possível abrir o arquivo":** mais de uma conta Google logada no
  navegador. Use a janela anônima só com a conta dona.
