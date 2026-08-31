import crypto from "node:crypto";

// Plain Node (req, res) helpers. The project sets NODEJS_HELPERS=0 so the
// request stream is untouched (raw bodies are needed for webhook HMACs).

export function query(req) {
  return new URL(req.url, "http://internal").searchParams;
}

export function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

export async function readJson(req) {
  try {
    return JSON.parse(await readRawBody(req));
  } catch {
    return null;
  }
}

export function sendJson(res, data, status = 200, headers = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.end(JSON.stringify(data));
}

export function sendErr(res, code, status = 400) {
  sendJson(res, { error: code }, status);
}

// Accepts "98450 12345", "+91 9845012345", "09845012345" etc.
// Returns E.164 "+919845012345" or null.
export function normalizePhone(raw) {
  if (typeof raw !== "string") return null;
  let digits = raw.replace(/[^\d]/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (!/^[6-9]\d{9}$/.test(digits)) return null;
  return "+91" + digits;
}

// Trims a string field to a max length; empty becomes null.
export function cleanField(value, max) {
  if (typeof value !== "string") return null;
  const t = value.trim().slice(0, max);
  return t.length ? t : null;
}

const IST_OFFSET_MS = 5.5 * 3600 * 1000;

export function istDate(daysFromToday = 0) {
  return new Date(Date.now() + IST_OFFSET_MS + daysFromToday * 86400000)
    .toISOString()
    .slice(0, 10);
}

export function hmacSha256Hex(secret, payload) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function timingSafeEqualHex(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function isValidDateStr(s) {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
}

// "2026-08-29" -> "Saturday, 29 August 2026" / "ಶನಿವಾರ, 29 ಆಗಸ್ಟ್ 2026"
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_KN = ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಏಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟೆಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್"];
const DAYS_EN = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const DAYS_KN = ["ಭಾನುವಾರ","ಸೋಮವಾರ","ಮಂಗಳವಾರ","ಬುಧವಾರ","ಗುರುವಾರ","ಶುಕ್ರವಾರ","ಶನಿವಾರ"];

export function formatDate(dateStr, lang = "en") {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return lang === "kn"
    ? `${DAYS_KN[dow]}, ${d} ${MONTHS_KN[m - 1]} ${y}`
    : `${DAYS_EN[dow]}, ${d} ${MONTHS_EN[m - 1]} ${y}`;
}

export function formatRupees(paise) {
  return (paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 2 });
}
