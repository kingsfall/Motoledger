const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = Number(process.env.PORT || 4180);
const SESSION_SECRET = process.env.SESSION_SECRET || "motoledger-dev-session-secret-change-me";
const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(__dirname, "data");
const DB_PATH = path.join(DATA_DIR, "motoledger-db.json");
const PUBLIC_FILES = new Set(["/", "/index.html", "/app.js", "/styles.css"]);
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

ensureDatabase();

const server = http.createServer(async (request, response) => {
  try {
    if (request.url.startsWith("/api/")) {
      await handleApi(request, response);
      return;
    }
    serveStatic(request, response);
  } catch (error) {
    sendJson(response, error.status || 500, {
      error: error.error || "SERVER_ERROR",
      message: error.status ? error.message : "Something went wrong."
    });
  }
});

server.listen(PORT, () => {
  console.log(`Motoledger backend running at http://localhost:${PORT}`);
});

async function handleApi(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const route = `${request.method} ${url.pathname}`;

  if (route === "GET /api/health") {
    sendJson(response, 200, { ok: true, app: "Motoledger", mode: "local-backend" });
    return;
  }

  if (route === "POST /api/auth/register") {
    const body = await readJsonBody(request);
    const result = registerUser(body);
    setSessionCookie(response, result.sessionToken);
    const db = readDb();
    sendJson(response, 201, { user: publicUser(result.user), state: result.user.state || null, resources: getUserResources(db, result.user.id) });
    return;
  }

  if (route === "POST /api/auth/login") {
    const body = await readJsonBody(request);
    const result = loginUser(body);
    setSessionCookie(response, result.sessionToken);
    const db = readDb();
    syncStateToStructuredResources(db, result.user.id, result.user.state);
    writeDb(db);
    sendJson(response, 200, { user: publicUser(result.user), state: result.user.state || null, resources: getUserResources(db, result.user.id) });
    return;
  }

  if (route === "POST /api/auth/logout") {
    clearSessionCookie(response);
    sendJson(response, 200, { ok: true });
    return;
  }

  if (route === "GET /api/auth/me") {
    const user = requireUser(request);
    const db = readDb();
    syncStateToStructuredResources(db, user.id, user.state);
    writeDb(db);
    sendJson(response, 200, { user: publicUser(user), state: user.state || null, resources: getUserResources(db, user.id) });
    return;
  }

  if (route === "PATCH /api/users/me") {
    const user = requireUser(request);
    const body = await readJsonBody(request);
    const db = readDb();
    const existing = db.users.find((item) => item.id === user.id);
    existing.name = cleanText(body.name) || existing.name;
    existing.updatedAt = new Date().toISOString();
    writeDb(db);
    sendJson(response, 200, { user: publicUser(existing) });
    return;
  }

  if (route === "GET /api/users/me/state") {
    const user = requireUser(request);
    sendJson(response, 200, { state: user.state || null });
    return;
  }

  if (route === "PUT /api/users/me/state") {
    const user = requireUser(request);
    const body = await readJsonBody(request, { limitBytes: 5_000_000 });
    const db = readDb();
    const existing = db.users.find((item) => item.id === user.id);
    existing.state = body.state || null;
    existing.updatedAt = new Date().toISOString();
    syncStateToStructuredResources(db, existing.id, existing.state);
    writeDb(db);
    sendJson(response, 200, { ok: true, updatedAt: existing.updatedAt, resources: getUserResources(db, existing.id) });
    return;
  }

  const motorcycleCollectionMatch = url.pathname.match(/^\/api\/motorcycles\/?$/);
  if (motorcycleCollectionMatch) {
    const user = requireUser(request);
    if (request.method === "GET") {
      const db = readDb();
      sendJson(response, 200, { motorcycles: listUserMotorcycles(db, user.id) });
      return;
    }
    if (request.method === "POST") {
      const body = await readJsonBody(request, { limitBytes: 1_000_000 });
      const db = readDb();
      const motorcycle = createMotorcycle(db, user.id, body.motorcycle || body);
      writeDb(db);
      sendJson(response, 201, { motorcycle });
      return;
    }
  }

  const motorcycleItemMatch = url.pathname.match(/^\/api\/motorcycles\/([^/]+)\/?$/);
  if (motorcycleItemMatch) {
    const user = requireUser(request);
    const motorcycleId = decodeURIComponent(motorcycleItemMatch[1]);
    if (request.method === "GET") {
      const db = readDb();
      const motorcycle = requireMotorcycle(db, user.id, motorcycleId);
      sendJson(response, 200, { motorcycle });
      return;
    }
    if (request.method === "PATCH") {
      const body = await readJsonBody(request, { limitBytes: 1_000_000 });
      const db = readDb();
      const motorcycle = updateMotorcycle(db, user.id, motorcycleId, body.motorcycle || body);
      writeDb(db);
      sendJson(response, 200, { motorcycle });
      return;
    }
    if (request.method === "DELETE") {
      const db = readDb();
      deleteMotorcycle(db, user.id, motorcycleId);
      writeDb(db);
      sendJson(response, 200, { ok: true });
      return;
    }
  }

  const recordCollectionMatch = url.pathname.match(/^\/api\/motorcycles\/([^/]+)\/log-records\/?$/);
  if (recordCollectionMatch) {
    const user = requireUser(request);
    const motorcycleId = decodeURIComponent(recordCollectionMatch[1]);
    if (request.method === "GET") {
      const db = readDb();
      requireMotorcycle(db, user.id, motorcycleId);
      sendJson(response, 200, { records: listMotorcycleLogRecords(db, motorcycleId) });
      return;
    }
    if (request.method === "POST") {
      const body = await readJsonBody(request, { limitBytes: 5_000_000 });
      const db = readDb();
      requireMotorcycle(db, user.id, motorcycleId);
      const record = createLogRecord(db, user.id, motorcycleId, body.record || body);
      writeDb(db);
      sendJson(response, 201, { record });
      return;
    }
  }

  const recordItemMatch = url.pathname.match(/^\/api\/motorcycles\/([^/]+)\/log-records\/([^/]+)\/?$/);
  if (recordItemMatch) {
    const user = requireUser(request);
    const motorcycleId = decodeURIComponent(recordItemMatch[1]);
    const recordId = decodeURIComponent(recordItemMatch[2]);
    if (request.method === "GET") {
      const db = readDb();
      requireMotorcycle(db, user.id, motorcycleId);
      const record = requireLogRecord(db, user.id, motorcycleId, recordId);
      sendJson(response, 200, { record });
      return;
    }
    if (request.method === "PATCH") {
      const body = await readJsonBody(request, { limitBytes: 5_000_000 });
      const db = readDb();
      requireMotorcycle(db, user.id, motorcycleId);
      const record = updateLogRecord(db, user.id, motorcycleId, recordId, body.record || body);
      writeDb(db);
      sendJson(response, 200, { record });
      return;
    }
    if (request.method === "DELETE") {
      const db = readDb();
      requireMotorcycle(db, user.id, motorcycleId);
      deleteLogRecord(db, user.id, motorcycleId, recordId);
      writeDb(db);
      sendJson(response, 200, { ok: true });
      return;
    }
  }

  sendJson(response, 404, { error: "NOT_FOUND", message: "Unknown API route." });
}

function registerUser(body) {
  const name = cleanText(body.name);
  const email = normalizeEmail(body.email);
  const password = String(body.password || body.passcode || "");

  if (!name || !email || password.length < 8) {
    throwHttp(400, "VALIDATION_ERROR", "Name, email, and a password of at least 8 characters are required.");
  }

  const db = readDb();
  if (db.users.some((user) => user.email === email)) {
    throwHttp(409, "EMAIL_EXISTS", "A rider profile already exists for this email.");
  }

  const now = new Date().toISOString();
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashPassword(password),
    state: body.state || null,
    createdAt: now,
    updatedAt: now
  };
  db.users.push(user);
  syncStateToStructuredResources(db, user.id, user.state);
  writeDb(db);
  return { user, sessionToken: createSessionToken(user) };
}

function loginUser(body) {
  const email = normalizeEmail(body.email);
  const password = String(body.password || body.passcode || "");
  const user = readDb().users.find((item) => item.email === email);

  if (!user || !verifyPassword(password, user.password)) {
    throwHttp(401, "INVALID_CREDENTIALS", "Email or password was not recognized.");
  }

  return { user, sessionToken: createSessionToken(user) };
}

function requireUser(request) {
  const token = readCookies(request).ml_session;
  const payload = verifySessionToken(token);
  if (!payload) throwHttp(401, "UNAUTHENTICATED", "Sign in is required.");

  const user = readDb().users.find((item) => item.id === payload.sub);
  if (!user) throwHttp(401, "UNAUTHENTICATED", "Session user was not found.");
  return user;
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const hash = crypto.pbkdf2Sync(password, salt, 210000, 32, "sha256").toString("base64url");
  return `pbkdf2_sha256$210000$${salt}$${hash}`;
}

function verifyPassword(password, stored) {
  const [scheme, iterations, salt, expected] = String(stored || "").split("$");
  if (scheme !== "pbkdf2_sha256" || !iterations || !salt || !expected) return false;
  const actual = crypto.pbkdf2Sync(password, salt, Number(iterations), 32, "sha256").toString("base64url");
  return timingSafeEqual(actual, expected);
}

function createSessionToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 14
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

function verifySessionToken(token) {
  if (!token || !token.includes(".")) return null;
  const [encoded, signature] = token.split(".");
  if (!timingSafeEqual(sign(encoded), signature)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (!payload.sub || Number(payload.exp || 0) < Date.now()) return null;
    return payload;
  } catch (error) {
    return null;
  }
}

function sign(value) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("base64url");
}

function timingSafeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function setSessionCookie(response, token) {
  response.setHeader("Set-Cookie", `ml_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 14}`);
}

function clearSessionCookie(response) {
  response.setHeader("Set-Cookie", "ml_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0");
}

function readCookies(request) {
  return String(request.headers.cookie || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, part) => {
      const index = part.indexOf("=");
      if (index === -1) return cookies;
      cookies[part.slice(0, index)] = decodeURIComponent(part.slice(index + 1));
      return cookies;
    }, {});
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

function createMotorcycle(db, userId, payload) {
  const now = new Date().toISOString();
  const motorcycle = normalizeMotorcycle(payload, {
    id: crypto.randomUUID(),
    userId,
    createdAt: now,
    updatedAt: now
  });
  validateMotorcycle(motorcycle);
  db.motorcycles.push(motorcycle);

  const user = db.users.find((item) => item.id === userId);
  if (user && !user.defaultMotorcycleId) user.defaultMotorcycleId = motorcycle.id;
  if (user) user.updatedAt = now;
  return motorcycle;
}

function updateMotorcycle(db, userId, motorcycleId, payload) {
  const existing = requireMotorcycle(db, userId, motorcycleId);
  const motorcycle = normalizeMotorcycle(payload, existing);
  validateMotorcycle(motorcycle);
  Object.assign(existing, motorcycle, { updatedAt: new Date().toISOString() });

  const user = db.users.find((item) => item.id === userId);
  if (user) user.updatedAt = existing.updatedAt;
  return existing;
}

function deleteMotorcycle(db, userId, motorcycleId) {
  requireMotorcycle(db, userId, motorcycleId);
  db.motorcycles = db.motorcycles.filter((item) => !(item.userId === userId && item.id === motorcycleId));
  db.logRecords = db.logRecords.filter((item) => !(item.userId === userId && item.motorcycleId === motorcycleId));

  const user = db.users.find((item) => item.id === userId);
  if (user?.defaultMotorcycleId === motorcycleId) {
    user.defaultMotorcycleId = db.motorcycles.find((item) => item.userId === userId)?.id || "";
  }
  if (user) user.updatedAt = new Date().toISOString();
}

function listUserMotorcycles(db, userId) {
  return db.motorcycles
    .filter((item) => item.userId === userId)
    .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
}

function requireMotorcycle(db, userId, motorcycleId) {
  const motorcycle = db.motorcycles.find((item) => item.userId === userId && item.id === motorcycleId);
  if (!motorcycle) throwHttp(404, "MOTORCYCLE_NOT_FOUND", "Motorcycle was not found.");
  return motorcycle;
}

function normalizeMotorcycle(payload = {}, existing = {}) {
  const now = new Date().toISOString();
  const source = payload || {};
  return {
    id: existing.id || cleanText(source.id) || crypto.randomUUID(),
    userId: existing.userId,
    nickname: textField(source, "nickname", existing.nickname),
    make: textField(source, "make", existing.make),
    model: textField(source, "model", existing.model),
    generationId: textField(source, "generationId", existing.generationId),
    year: textField(source, "year", existing.year),
    plate: textField(source, "plate", existing.plate),
    vin: textField(source, "vin", existing.vin),
    acquiredDate: textField(source, "acquiredDate", existing.acquiredDate),
    baselineMileage: numberField(source, "baselineMileage", existing.baselineMileage),
    currentMileage: numberField(source, "currentMileage", existing.currentMileage),
    monthlyMileage: numberField(source, "monthlyMileage", existing.monthlyMileage),
    currency: textField(source, "currency", existing.currency || "USD").toUpperCase(),
    roadTaxRenewalDate: textField(source, "roadTaxRenewalDate", existing.roadTaxRenewalDate),
    insuranceRenewalDate: textField(source, "insuranceRenewalDate", existing.insuranceRenewalDate),
    coeRenewalDate: textField(source, "coeRenewalDate", existing.coeRenewalDate),
    photoDataUrl: textField(source, "photoDataUrl", existing.photoDataUrl),
    photoName: textField(source, "photoName", existing.photoName),
    manualNotes: textField(source, "manualNotes", existing.manualNotes),
    createdAt: existing.createdAt || now,
    updatedAt: now
  };
}

function validateMotorcycle(motorcycle) {
  if (!motorcycle.make || !motorcycle.model) {
    throwHttp(400, "VALIDATION_ERROR", "Motorcycle make and model are required.");
  }
}

function createLogRecord(db, userId, motorcycleId, payload) {
  const record = normalizeLogRecord(payload, {
    id: cleanText(payload?.id) || crypto.randomUUID(),
    userId,
    motorcycleId,
    createdAt: new Date().toISOString()
  });
  validateLogRecord(record);
  db.logRecords.push(record);
  touchMotorcycle(db, userId, motorcycleId);
  return record;
}

function updateLogRecord(db, userId, motorcycleId, recordId, payload) {
  const existing = requireLogRecord(db, userId, motorcycleId, recordId);
  const record = normalizeLogRecord(payload, existing);
  validateLogRecord(record);
  Object.assign(existing, record, { updatedAt: new Date().toISOString() });
  touchMotorcycle(db, userId, motorcycleId);
  return existing;
}

function deleteLogRecord(db, userId, motorcycleId, recordId) {
  requireLogRecord(db, userId, motorcycleId, recordId);
  db.logRecords = db.logRecords.filter((item) => !(item.userId === userId && item.motorcycleId === motorcycleId && item.id === recordId));
  touchMotorcycle(db, userId, motorcycleId);
}

function listMotorcycleLogRecords(db, motorcycleId) {
  return db.logRecords
    .filter((item) => item.motorcycleId === motorcycleId)
    .sort((a, b) => {
      const mileageDiff = Number(b.mileage || 0) - Number(a.mileage || 0);
      if (mileageDiff !== 0) return mileageDiff;
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
}

function requireLogRecord(db, userId, motorcycleId, recordId) {
  const record = db.logRecords.find((item) => item.userId === userId && item.motorcycleId === motorcycleId && item.id === recordId);
  if (!record) throwHttp(404, "LOG_RECORD_NOT_FOUND", "Accessory/service record was not found.");
  return record;
}

function normalizeLogRecord(payload = {}, existing = {}) {
  const now = new Date().toISOString();
  const source = payload || {};
  const taskItems = sanitizeLineItems(hasField(source, "taskItems") ? source.taskItems : existing.taskItems);
  const tasks = arrayField(source, "tasks", existing.tasks || taskItems.map((item) => item.name));

  return {
    id: existing.id || cleanText(source.id) || crypto.randomUUID(),
    userId: existing.userId,
    motorcycleId: existing.motorcycleId,
    date: textField(source, "date", existing.date || now.slice(0, 10)),
    mileage: numberField(source, "mileage", existing.mileage),
    mileageSource: textField(source, "mileageSource", existing.mileageSource || "manual"),
    workshop: textField(source, "workshop", existing.workshop || "Workshop not recorded"),
    tasks: tasks.length ? tasks : taskItems.map((item) => item.name),
    taskItems,
    itemized: booleanField(source, "itemized", existing.itemized),
    itemizedTotal: numberField(source, "itemizedTotal", existing.itemizedTotal),
    invoiceTotal: numberField(source, "invoiceTotal", existing.invoiceTotal),
    cost: numberField(source, "cost", existing.cost),
    attachments: sanitizeAttachments(hasField(source, "attachments") ? source.attachments : existing.attachments),
    notes: textField(source, "notes", existing.notes),
    createdAt: existing.createdAt || now,
    updatedAt: now
  };
}

function validateLogRecord(record) {
  if (!record.date) throwHttp(400, "VALIDATION_ERROR", "Record date is required.");
  if (!record.taskItems.length && !record.tasks.length) {
    throwHttp(400, "VALIDATION_ERROR", "At least one line item is required.");
  }
}

function sanitizeLineItems(items) {
  if (!Array.isArray(items)) return [];
  const allowedTypes = new Set(["service-action", "accessory", "custom", "template", "legacy"]);
  return items
    .map((item) => ({
      name: cleanText(item?.name || "Service item"),
      type: allowedTypes.has(item?.type) ? item.type : "custom",
      maintenanceTask: cleanText(item?.maintenanceTask),
      category: cleanText(item?.category),
      remark: cleanText(item?.remark),
      cost: Number(item?.cost || 0)
    }))
    .filter((item) => item.name);
}

function sanitizeAttachments(attachments) {
  if (!attachments || typeof attachments !== "object") return {};
  return {
    receipt: sanitizeAttachment(attachments.receipt),
    dashboard: sanitizeAttachment(attachments.dashboard)
  };
}

function sanitizeAttachment(attachment) {
  if (!attachment || typeof attachment !== "object") return null;
  return {
    label: cleanText(attachment.label),
    fileName: cleanText(attachment.fileName),
    dataUrl: cleanText(attachment.dataUrl),
    mileage: Number(attachment.mileage || 0)
  };
}

function syncStateToStructuredResources(db, userId, state) {
  if (!state?.bike) return;

  const user = db.users.find((item) => item.id === userId);
  const motorcyclePayload = { ...state.bike, manualNotes: state.manualNotes || "" };
  let motorcycle = user?.defaultMotorcycleId
    ? db.motorcycles.find((item) => item.userId === userId && item.id === user.defaultMotorcycleId)
    : null;

  if (!motorcycle) {
    motorcycle = db.motorcycles.find((item) => item.userId === userId) || null;
  }

  if (!motorcycle) {
    motorcycle = createMotorcycle(db, userId, motorcyclePayload);
  } else {
    Object.assign(motorcycle, normalizeMotorcycle(motorcyclePayload, motorcycle));
    if (user && !user.defaultMotorcycleId) user.defaultMotorcycleId = motorcycle.id;
  }

  const incomingRecords = Array.isArray(state.serviceRecords) ? state.serviceRecords : [];
  const incomingIds = new Set();
  incomingRecords.forEach((record) => {
    const id = cleanText(record.id) || crypto.randomUUID();
    incomingIds.add(id);
    const existing = db.logRecords.find((item) => item.userId === userId && item.motorcycleId === motorcycle.id && item.id === id);
    const normalized = normalizeLogRecord({ ...record, id }, existing || {
      id,
      userId,
      motorcycleId: motorcycle.id,
      createdAt: new Date().toISOString()
    });
    validateLogRecord(normalized);
    if (existing) Object.assign(existing, normalized);
    else db.logRecords.push(normalized);
  });

  db.logRecords = db.logRecords.filter((record) => {
    if (record.userId !== userId || record.motorcycleId !== motorcycle.id) return true;
    return incomingIds.has(record.id);
  });

  if (user) user.updatedAt = new Date().toISOString();
}

function getUserResources(db, userId) {
  const motorcycles = listUserMotorcycles(db, userId);
  return {
    motorcycles,
    logRecords: db.logRecords.filter((item) => item.userId === userId)
  };
}

function touchMotorcycle(db, userId, motorcycleId) {
  const now = new Date().toISOString();
  const motorcycle = db.motorcycles.find((item) => item.userId === userId && item.id === motorcycleId);
  if (motorcycle) motorcycle.updatedAt = now;
  const user = db.users.find((item) => item.id === userId);
  if (user) user.updatedAt = now;
}

function hasField(source, key) {
  return Object.prototype.hasOwnProperty.call(source || {}, key);
}

function textField(source, key, fallback = "") {
  return hasField(source, key) ? cleanText(source[key]) : cleanText(fallback);
}

function numberField(source, key, fallback = 0) {
  return hasField(source, key) ? Number(source[key] || 0) : Number(fallback || 0);
}

function booleanField(source, key, fallback = false) {
  return hasField(source, key) ? Boolean(source[key]) : Boolean(fallback);
}

function arrayField(source, key, fallback = []) {
  const value = hasField(source, key) ? source[key] : fallback;
  return Array.isArray(value) ? value.map(cleanText).filter(Boolean) : [];
}

function readJsonBody(request, options = {}) {
  const limitBytes = options.limitBytes || 1_000_000;
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > limitBytes) {
        reject(httpError(413, "PAYLOAD_TOO_LARGE", "Request body is too large."));
        request.destroy();
      }
    });
    request.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(httpError(400, "INVALID_JSON", "Request body must be valid JSON."));
      }
    });
    request.on("error", reject);
  });
}

function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  if (!PUBLIC_FILES.has(url.pathname) && !PUBLIC_FILES.has(pathname)) {
    sendText(response, 404, "Not found");
    return;
  }

  const filePath = path.join(__dirname, pathname);
  const ext = path.extname(filePath);
  response.writeHead(200, {
    "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  fs.createReadStream(filePath).pipe(response);
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function sendText(response, status, text) {
  response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(text);
}

function httpError(status, error, message) {
  const exception = new Error(message);
  exception.status = status;
  exception.error = error;
  return exception;
}

function throwHttp(status, error, message) {
  throw httpError(status, error, message);
}

function cleanText(value) {
  return String(value || "").trim();
}

function normalizeEmail(value) {
  return cleanText(value).toLowerCase();
}

function ensureDatabase() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    writeDb(emptyDb());
    return;
  }

  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  let changed = false;
  if (!Array.isArray(db.users)) {
    db.users = [];
    changed = true;
  }
  if (!Array.isArray(db.motorcycles)) {
    db.motorcycles = [];
    changed = true;
  }
  if (!Array.isArray(db.logRecords)) {
    db.logRecords = [];
    changed = true;
  }
  if (changed) writeDb(db);
}

function readDb() {
  ensureDatabase();
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, `${JSON.stringify(db, null, 2)}\n`);
}

function emptyDb() {
  return {
    users: [],
    motorcycles: [],
    logRecords: []
  };
}

process.on("uncaughtException", (error) => {
  if (error.status) return;
  console.error(error);
});
