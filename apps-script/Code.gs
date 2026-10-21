/**
 * Leads do site da Sali Weddits → esta planilha (+ aviso no WhatsApp).
 *
 * O site faz POST /api/lead; o nginx limita por IP e repassa para cá. Cada
 * envio válido vira uma linha na primeira aba; o cabeçalho é criado no
 * primeiro envio (acima do que já houver, sem apagar nada).
 * Instalação e configuração: apps-script/README.md.
 */

/** Colunas, na ordem em que são gravadas. `key` é o nome do campo no site. */
const COLUMNS = [
  { key: "name", header: "Nome" },
  { key: "studio", header: "Estúdio" },
  { key: "email", header: "E-mail" },
  { key: "portfolio", header: "Portfólio" },
  { key: "volume", header: "Casamentos por temporada" },
  { key: "needs", header: "Formatos" },
  { key: "message", header: "Mensagem" },
  { key: "page", header: "Página" },
];

/** Corta texto colado em excesso — ninguém escreve 2 mil caracteres num lead. */
const MAX_LENGTH = 2000;

/** Menos que isso entre abrir a página e enviar não é gente preenchendo. */
const MIN_FILL_MS = 3000;

/** Teto geral, além do limite por IP do nginx: muito acima do normal. */
const MAX_LEADS_PER_HOUR = 30;

/** Mesmo e-mail de novo dentro desta janela não grava outra linha. */
const REPEAT_WINDOW_S = 600;

/** Abrir a URL /exec no navegador: confirma que a implantação está no ar. */
function doGet() {
  return json({ ok: true, service: "sali-leads" });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Armadilhas de bot: respondem "ok" e descartam calado, para o bot não
    // aprender o que o denunciou.
    if (data.website) return json({ ok: true }); // campo escondido preenchido
    if (!(Number(data.elapsed) >= MIN_FILL_MS)) return json({ ok: true }); // rápido demais, ou sem a marca do form

    if (!data.name || !data.email) return json({ ok: false, error: "missing_fields" });

    // Dois envios ao mesmo tempo não podem gravar na mesma linha nem furar o teto.
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const cache = CacheService.getScriptCache();
      const hourKey = "count:" + Math.floor(Date.now() / 3600000);
      const count = Number(cache.get(hourKey) || 0);
      if (count >= MAX_LEADS_PER_HOUR) return json({ ok: false, error: "rate_limited" });

      const emailKey = "email:" + String(data.email).trim().toLowerCase().slice(0, 200);
      if (cache.get(emailKey)) return json({ ok: true }); // repetido: já está na planilha

      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      ensureHeader(sheet);
      sheet.appendRow([new Date()].concat(COLUMNS.map((c) => clean(data[c.key]))));

      cache.put(hourKey, String(count + 1), 3600);
      cache.put(emailKey, "1", REPEAT_WINDOW_S);
    } finally {
      lock.releaseLock();
    }

    // Fora do lock: o aviso não pode segurar outros envios, e se falhar o
    // lead já está salvo.
    notifyWhatsApp(data);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/**
 * Aviso de lead no WhatsApp. Liga sozinho conforme as Propriedades do script
 * (README); sem nenhuma configurada, não faz nada:
 * - WhatsApp oficial (Meta Cloud API): WA_TOKEN, WA_PHONE_NUMBER_ID, WA_TO
 * - CallMeBot: WHATSAPP_PHONE, CALLMEBOT_APIKEY
 * Nunca lança: se o aviso falhar, o lead já está salvo na planilha.
 */
function notifyWhatsApp(data) {
  const props = PropertiesService.getScriptProperties();
  try {
    if (props.getProperty("WA_TOKEN")) return sendMetaTemplate(props, data);
    if (props.getProperty("CALLMEBOT_APIKEY")) return sendCallMeBot(props, data);
  } catch (err) {
    console.error("WhatsApp: " + err);
  }
  return null;
}

/** Texto de um campo do lead, num formato que o modelo da Meta aceita. */
function field(value) {
  const text = Array.isArray(value) ? value.join(", ") : String(value == null ? "" : value);
  // Parâmetro de modelo não aceita quebra de linha, tab nem 4+ espaços seguidos, nem vazio.
  const flat = text.replace(/[\r\n\t]+/g, " ").replace(/ {2,}/g, " ").trim().slice(0, 200);
  return flat || "—";
}

/**
 * WhatsApp oficial: manda o modelo aprovado (padrão "novo_lead", pt_BR) com
 * 5 variáveis — {{1}} nome, {{2}} estúdio, {{3}} e-mail, {{4}} formatos,
 * {{5}} casamentos por temporada.
 */
function sendMetaTemplate(props, data) {
  const version = props.getProperty("WA_API_VERSION") || "v23.0";
  const url = "https://graph.facebook.com/" + version + "/" + props.getProperty("WA_PHONE_NUMBER_ID") + "/messages";
  const values = [data.name, data.studio, data.email, data.needs, data.volume];
  const res = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + props.getProperty("WA_TOKEN") },
    muteHttpExceptions: true,
    payload: JSON.stringify({
      messaging_product: "whatsapp",
      to: props.getProperty("WA_TO"),
      type: "template",
      template: {
        name: props.getProperty("WA_TEMPLATE") || "novo_lead",
        language: { code: props.getProperty("WA_TEMPLATE_LANG") || "pt_BR" },
        components: [{ type: "body", parameters: values.map((v) => ({ type: "text", text: field(v) })) }],
      },
    }),
  });
  if (res.getResponseCode() >= 300) console.error("WhatsApp Meta " + res.getResponseCode() + ": " + res.getContentText());
  return res.getResponseCode() + " " + res.getContentText();
}

/** CallMeBot: texto livre para o próprio número (serviço gratuito, com vagas limitadas). */
function sendCallMeBot(props, data) {
  const text = [
    "Novo lead no site — Sali",
    "Nome: " + field(data.name),
    "Estúdio: " + field(data.studio),
    "E-mail: " + field(data.email),
    "Formatos: " + field(data.needs),
    "Casamentos/temporada: " + field(data.volume),
  ].join("\n");
  const res = UrlFetchApp.fetch(
    "https://api.callmebot.com/whatsapp.php?phone=" +
      encodeURIComponent(props.getProperty("WHATSAPP_PHONE")) +
      "&text=" +
      encodeURIComponent(text) +
      "&apikey=" +
      encodeURIComponent(props.getProperty("CALLMEBOT_APIKEY")),
    { muteHttpExceptions: true }
  );
  return res.getResponseCode() + " " + res.getContentText();
}

/**
 * Rode no editor (Executar) para testar o aviso e autorizar o acesso externo.
 * A resposta do WhatsApp aparece no "Registro de execução".
 */
function testWhatsApp() {
  const result = notifyWhatsApp({
    name: "Teste",
    studio: "Teste Studio",
    email: "teste@example.com",
    needs: ["Highlight films", "Feature films"],
    volume: "11–25",
  });
  console.log(result || "Nenhum aviso configurado nas Propriedades do script.");
}

/**
 * Põe o cabeçalho na linha 1 uma única vez. Se a aba já tiver algo que não é
 * o nosso cabeçalho, ele entra ACIMA — nada do que já existe é apagado.
 */
function ensureHeader(sheet) {
  const props = PropertiesService.getDocumentProperties();
  if (props.getProperty("headerReady")) return;

  const header = ["Recebido em"].concat(COLUMNS.map((c) => c.header));
  const hasOurs = sheet.getLastRow() > 0 && sheet.getRange(1, 1).getValue() === header[0];
  if (!hasOurs) {
    if (sheet.getLastRow() > 0) sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  props.setProperty("headerReady", "1");
}

/** Lista vira "a, b"; texto que começa como fórmula (=, +, -, @) é gravado como texto. */
function clean(value) {
  const text = Array.isArray(value) ? value.join(", ") : String(value == null ? "" : value);
  const cut = text.slice(0, MAX_LENGTH);
  return /^[=+\-@]/.test(cut) ? "'" + cut : cut;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
