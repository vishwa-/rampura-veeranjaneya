// Local dev server for UI work only: serves the static site and MOCKS the
// /api endpoints with canned data so book.html can be exercised without
// Supabase or Razorpay. Never deployed; production /api is real.
//
//   node scripts/dev-server.mjs [port]

import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.argv[2]) || 8799;
const ROOT = new URL("..", import.meta.url).pathname;
const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".mp4": "video/mp4", ".json": "application/json", ".xml": "text/xml",
  ".txt": "text/plain",
};

function istDate(days = 0) {
  return new Date(Date.now() + 5.5 * 3600e3 + days * 86400000).toISOString().slice(0, 10);
}

const POOJAS = [
  {
    id: "p1", slug: "shravana-shanivara",
    name_en: "Shravana Shanivara Vishesha Pooja", name_kn: "ಶ್ರಾವಣ ಶನಿವಾರ ವಿಶೇಷ ಪೂಜೆ",
    desc_en: "Vishesha pooja and alankara in your family's name.",
    desc_kn: "ನಿಮ್ಮ ಕುಟುಂಬದ ಹೆಸರಿನಲ್ಲಿ ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ಅಲಂಕಾರ.",
    amount_paise: 350000, capacity: 1,
  },
  {
    id: "p2", slug: "nitya-archana",
    name_en: "Nitya Archana", name_kn: "ನಿತ್ಯ ಅರ್ಚನೆ",
    desc_en: "Archana to Sri Kubera Anjaneya Swamy in your name.",
    desc_kn: "ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಶ್ರೀ ಕುಬೇರ ಆಂಜನೇಯ ಸ್ವಾಮಿಗೆ ಅರ್ಚನೆ.",
    amount_paise: 50000, capacity: null,
  },
];

// A few upcoming dates: some exclusive (sold/free), one cancelled.
const DATES = [
  { id: "d1", pooja_id: "p1", event_date: istDate(2), status: "open", remaining: 1 },
  { id: "d2", pooja_id: "p1", event_date: istDate(9), status: "open", remaining: 0 },
  { id: "d3", pooja_id: "p1", event_date: istDate(16), status: "cancelled", remaining: 1 },
  { id: "d4", pooja_id: "p2", event_date: istDate(1), status: "open", remaining: null },
  { id: "d5", pooja_id: "p2", event_date: istDate(2), status: "open", remaining: null },
  { id: "d6", pooja_id: "p2", event_date: istDate(4), status: "open", remaining: null },
];

function sendJson(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === "/api/calendar") {
    const from = url.searchParams.get("from"), to = url.searchParams.get("to");
    return sendJson(res, {
      poojas: POOJAS,
      dates: DATES.filter((d) => d.event_date >= from && d.event_date <= to),
    });
  }
  if (url.pathname === "/api/book" && req.method === "POST") {
    let body = "";
    for await (const c of req) body += c;
    const b = JSON.parse(body);
    if (b.pooja_date_id === "d2") return sendJson(res, { error: "sold_out" }, 409);
    const pooja = POOJAS.find((p) => p.id === (DATES.find((d) => d.id === b.pooja_date_id) || {}).pooja_id);
    const date = DATES.find((d) => d.id === b.pooja_date_id);
    return sendJson(res, {
      order_id: "order_MOCK123", amount_paise: pooja.amount_paise,
      key_id: "rzp_test_mock", booking_ref: "RMP-20260820-TEST",
      pooja_name_en: pooja.name_en, pooja_name_kn: pooja.name_kn,
      event_date: date.event_date, prefill: { name: b.name, contact: b.phone },
    });
  }
  if (url.pathname === "/api/booking-status") {
    return sendJson(res, {
      status: "paid", booking_ref: "RMP-20260820-TEST",
      event_date: istDate(2), pooja_name_en: POOJAS[0].name_en, pooja_name_kn: POOJAS[0].name_kn,
    });
  }
  if (url.pathname.startsWith("/api/")) return sendJson(res, { error: "not_mocked" }, 404);

  let path = normalize(url.pathname).replace(/^\/+/, "") || "index.html";
  if (path.endsWith("/")) path += "index.html";
  try {
    const file = await readFile(join(ROOT, path));
    res.writeHead(200, { "Content-Type": MIME[extname(path)] || "application/octet-stream" });
    res.end(file);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`mock dev server on http://localhost:${PORT}`);
});
