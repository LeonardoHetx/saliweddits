/**
 * Leads do site da Sali Weddits → esta planilha.
 *
 * O formulário do site faz um POST com o lead em JSON; cada envio vira uma
 * linha na primeira aba. O cabeçalho é criado no primeiro envio (acima do que
 * já houver na aba, sem apagar nada). Instalação: apps-script/README.md.
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

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Campo escondido: gente não vê, bot preenche. Responde ok e descarta.
    if (data.website) return json({ ok: true });
    if (!data.name || !data.email) return json({ ok: false, error: "missing_fields" });

    // Dois envios ao mesmo tempo não podem gravar na mesma linha.
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      ensureHeader(sheet);
      sheet.appendRow([new Date()].concat(COLUMNS.map((c) => clean(data[c.key]))));
    } finally {
      lock.releaseLock();
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
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
