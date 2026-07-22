const SHEET_NAME = 'Solicitacoes';
const TIMEZONE = 'Asia/Tokyo';
const MAX_SITUACAO = 600;
const LOCK_TIMEOUT_MS = 8000;
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX = 30;
const PUBLIC_ERROR_MESSAGE = 'Nao foi possivel processar a solicitacao agora. Tente novamente mais tarde.';

const ALLOWED_SERVICOS = [
  'Renovação do período de permanência',
  'Passaporte brasileiro',
  'Kakutei Shinkoku e organização fiscal',
  'Shaken e serviços automotivos',
  'Agendamentos e navegação digital',
  'Organização de documentos',
  'Prefeitura e vida cotidiana',
  'Não sei / preciso de orientação geral'
];

const ALLOWED_TIPOS_AJUDA = [
  'Entender o procedimento',
  'Encontrar a fonte correta',
  'Organizar documentos',
  'Fazer agendamento',
  'Navegar em sistema digital',
  'Solicitar orçamento',
  'Encaminhamento profissional'
];

const ALLOWED_CANAIS = [
  'E-mail',
  'WhatsApp',
  'Instagram',
  'Facebook',
  'Outro'
];

const HEADERS = [
  'protocolo',
  'submission_id',
  'data_hora_jst',
  'status_atendimento',
  'status_notificacao',
  'data_contato',
  'data_agendamento_jr',
  'data_agendamento_oficial',
  'observacoes_internas',
  'nome',
  'servico',
  'provincia',
  'cidade',
  'prazo',
  'tipo_ajuda',
  'situacao',
  'canal',
  'contato',
  'consentimento',
  'origem',
  'user_agent'
];

function doGet() {
  return jsonResponse({
    ok: true,
    service: 'JR Consultoria Intake',
    status: 'ready'
  });
}

function doPost(e) {
  try {
    if (isRateLimited_()) return publicError_('JR-RATE-LIMIT');

    const payload = parsePayload_(e);
    if (cleanText_(payload.website, 120)) {
      console.warn('Honeypot preenchido.');
      return publicError_('JR-SPAM');
    }

    const data = sanitizePayload_(payload);
    validatePayload_(data);

    const props = PropertiesService.getScriptProperties();
    const sheetId = props.getProperty('SHEET_ID');
    const notificationEmail = props.getProperty('NOTIFICATION_EMAIL');
    if (!sheetId || !notificationEmail) {
      console.error('Propriedades obrigatorias ausentes.');
      return publicError_('JR-CONFIG');
    }

    const record = saveSubmission_(sheetId, data);
    if (record.duplicate) {
      return jsonResponse({ ok: true, protocolo: record.protocol, duplicate: true });
    }

    const notificationStatus = sendNotificationSafely_(notificationEmail, record.protocol, record.dateJst, data);
    updateNotificationStatusSafely_(sheetId, data.submission_id, notificationStatus);

    return jsonResponse({
      ok: true,
      protocolo: record.protocol,
      status_notificacao: notificationStatus
    });
  } catch (err) {
    console.error('Erro operacional JR Consultoria:', err && err.stack ? err.stack : err);
    return publicError_('JR-OPS');
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Corpo ausente.');
  }
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    throw new Error('JSON invalido.');
  }
}

function sanitizePayload_(payload) {
  return {
    submission_id: cleanText_(payload.submission_id, 80),
    nome: cleanText_(payload.nome, 120),
    servico: cleanText_(payload.servico, 120),
    provincia: cleanText_(payload.provincia, 80),
    cidade: cleanText_(payload.cidade, 80),
    prazo: cleanText_(payload.prazo, 120),
    tipo_ajuda: cleanText_(payload.tipo_ajuda, 120),
    situacao: cleanText_(payload.situacao, MAX_SITUACAO),
    canal: cleanText_(payload.canal, 80),
    contato: cleanText_(payload.contato, 160),
    consentimento: payload.consentimento === true || payload.consentimento === 'true' || payload.consentimento === 'sim',
    origem: cleanText_(payload.origem, 240),
    user_agent: cleanText_(payload.user_agent, 240)
  };
}

function validatePayload_(data) {
  const required = ['submission_id', 'nome', 'servico', 'provincia', 'tipo_ajuda', 'situacao', 'canal', 'contato'];
  required.forEach(function (field) {
    if (!data[field]) throw new Error('Campo obrigatorio ausente: ' + field);
  });
  if (!/^[A-Za-z0-9_-]{16,80}$/.test(data.submission_id)) throw new Error('submission_id invalido.');
  if (!data.consentimento) throw new Error('Consentimento obrigatorio ausente.');
  if (data.situacao.length > MAX_SITUACAO) throw new Error('Situacao acima do limite.');
  if (ALLOWED_SERVICOS.indexOf(data.servico) === -1) throw new Error('Servico invalido.');
  if (ALLOWED_TIPOS_AJUDA.indexOf(data.tipo_ajuda) === -1) throw new Error('Tipo de ajuda invalido.');
  if (ALLOWED_CANAIS.indexOf(data.canal) === -1) throw new Error('Canal invalido.');
}

function cleanText_(value, limit) {
  return String(value || '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, limit);
}

function sheetText_(value) {
  const text = cleanText_(value, 1000);
  return /^[\s]*[=+\-@]/.test(text) ? "'" + text : text;
}

function saveSubmission_(sheetId, data) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(LOCK_TIMEOUT_MS)) {
    console.error('Lock indisponivel para gravacao.');
    throw new Error('Lock indisponivel.');
  }

  try {
    const sheet = getOrCreateSheet_(sheetId);
    const existing = findSubmission_(sheet, data.submission_id);
    if (existing) {
      return { protocol: existing.protocol, duplicate: true };
    }

    const protocol = createUniqueProtocol_(sheet);
    const now = new Date();
    const dateJst = Utilities.formatDate(now, TIMEZONE, 'yyyy-MM-dd HH:mm:ss');

    sheet.appendRow([
      protocol,
      sheetText_(data.submission_id),
      dateJst,
      'Novo',
      'pendente',
      '',
      '',
      '',
      '',
      sheetText_(data.nome),
      sheetText_(data.servico),
      sheetText_(data.provincia),
      sheetText_(data.cidade),
      sheetText_(data.prazo),
      sheetText_(data.tipo_ajuda),
      sheetText_(data.situacao),
      sheetText_(data.canal),
      sheetText_(data.contato),
      data.consentimento ? 'sim' : 'nao',
      sheetText_(data.origem),
      sheetText_(data.user_agent)
    ]);

    return { protocol: protocol, dateJst: dateJst, duplicate: false };
  } finally {
    lock.releaseLock();
  }
}

function findSubmission_(sheet, submissionId) {
  const rowCount = sheet.getLastRow();
  if (rowCount < 2) return null;
  const data = sheet.getRange(2, 1, rowCount - 1, HEADERS.length).getValues();
  const submissionCol = HEADERS.indexOf('submission_id');
  const protocolCol = HEADERS.indexOf('protocolo');
  for (let i = 0; i < data.length; i += 1) {
    if (String(data[i][submissionCol] || '').replace(/^'/, '') === submissionId) {
      return { protocol: data[i][protocolCol] };
    }
  }
  return null;
}

function createUniqueProtocol_(sheet) {
  const rowCount = sheet.getLastRow();
  const existing = rowCount < 2
    ? []
    : sheet.getRange(2, 1, rowCount - 1, 1).getValues().map(function (row) { return row[0]; });

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const protocol = createProtocol_();
    if (existing.indexOf(protocol) === -1) return protocol;
  }
  throw new Error('Nao foi possivel gerar protocolo unico.');
}

function createProtocol_() {
  const date = Utilities.formatDate(new Date(), TIMEZONE, 'yyyyMMdd');
  const suffix = Math.floor(Math.random() * 65536).toString(16).toUpperCase().padStart(4, '0');
  return 'JR-' + date + '-' + suffix;
}

function getOrCreateSheet_(sheetId) {
  const spreadsheet = SpreadsheetApp.openById(sheetId);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const current = range.getValues()[0];
  const needsHeader = HEADERS.some(function (header, index) {
    return current[index] !== header;
  });
  if (needsHeader) {
    range.setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendNotificationSafely_(email, protocol, dateJst, data) {
  try {
    notifyOwner_(email, protocol, dateJst, data);
    return 'enviado';
  } catch (err) {
    console.error('Falha de notificacao por e-mail:', err && err.stack ? err.stack : err);
    return 'falhou';
  }
}

function updateNotificationStatusSafely_(sheetId, submissionId, status) {
  const lock = LockService.getScriptLock();
  try {
    if (!lock.tryLock(LOCK_TIMEOUT_MS)) {
      console.error('Lock indisponivel para atualizar status_notificacao.');
      return;
    }
    const sheet = getOrCreateSheet_(sheetId);
    const row = findSubmissionRow_(sheet, submissionId);
    if (!row) return;
    sheet.getRange(row, HEADERS.indexOf('status_notificacao') + 1).setValue(status);
  } catch (err) {
    console.error('Falha ao atualizar status_notificacao:', err && err.stack ? err.stack : err);
  } finally {
    try {
      lock.releaseLock();
    } catch (err) {
      console.warn('Lock ja liberado ou indisponivel.');
    }
  }
}

function findSubmissionRow_(sheet, submissionId) {
  const rowCount = sheet.getLastRow();
  if (rowCount < 2) return 0;
  const submissionCol = HEADERS.indexOf('submission_id');
  const values = sheet.getRange(2, submissionCol + 1, rowCount - 1, 1).getValues();
  for (let i = 0; i < values.length; i += 1) {
    if (String(values[i][0] || '').replace(/^'/, '') === submissionId) return i + 2;
  }
  return 0;
}

function isRateLimited_() {
  const cache = CacheService.getScriptCache();
  const key = 'jr_consultoria_rate_' + Utilities.formatDate(new Date(), TIMEZONE, 'yyyyMMddHHmm');
  const current = Number(cache.get(key) || 0);
  if (current >= RATE_LIMIT_MAX) {
    console.warn('Rate limit global atingido.');
    return true;
  }
  cache.put(key, String(current + 1), RATE_LIMIT_WINDOW_SECONDS);
  return false;
}

function notifyOwner_(email, protocol, dateJst, data) {
  const subject = '[Japao Relativo] Nova solicitacao de consultoria ' + protocol;
  const body = [
    'Nova solicitacao recebida pelo formulario do JR Apoio no Japao.',
    '',
    'Protocolo: ' + protocol,
    'Data/hora JST: ' + dateJst,
    'Status do atendimento: Novo',
    '',
    'Nome: ' + data.nome,
    'Servico: ' + data.servico,
    'Provincia: ' + data.provincia,
    'Cidade: ' + (data.cidade || '(nao informado)'),
    'Prazo: ' + (data.prazo || '(nao informado)'),
    'Tipo de ajuda: ' + data.tipo_ajuda,
    'Canal: ' + data.canal,
    'Contato: ' + data.contato,
    '',
    'Situacao resumida:',
    data.situacao,
    '',
    'Origem: ' + data.origem,
    '',
    'Controle sugerido na planilha: Novo -> Contato realizado -> Aguardando cliente -> Agendado -> Concluido.',
    'Nao envie mensagem automatica pelo WhatsApp. Responda manualmente pelo canal escolhido pelo cliente.',
    'Agendamento consular oficial deve ocorrer somente no sistema oficial, apos validacao do Consulado, pelo proprio interessado.',
    '',
    'Nao responda documentos sensiveis por este fluxo. Se o caso exigir analise juridica, migratoria, contabil ou tributaria, encaminhe para profissional habilitado.'
  ].join('\n');

  GmailApp.sendEmail(email, subject, body, {
    name: 'Japao Relativo'
  });
}

function publicError_(code) {
  return jsonResponse({
    ok: false,
    error: PUBLIC_ERROR_MESSAGE,
    code: code || 'JR-ERROR'
  });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
