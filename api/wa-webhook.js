import { db } from "./_lib/db.js";
import { query, readRawBody, sendJson, sendErr, hmacSha256Hex, timingSafeEqualHex } from "./_lib/util.js";

const STATUS_RANK = { queued: 0, sent: 1, delivered: 2, read: 3, failed: 4 };

// Meta webhook: GET is the subscription handshake, POST carries message
// delivery statuses which we mirror onto wa_messages.
export default async function handler(req, res) {
  if (req.method === "GET") {
    const q = query(req);
    if (
      q.get("hub.mode") === "subscribe" &&
      q.get("hub.verify_token") === process.env.WA_VERIFY_TOKEN
    ) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      return res.end(q.get("hub.challenge") || "");
    }
    return sendErr(res, "forbidden", 403);
  }

  if (req.method !== "POST") return sendErr(res, "method_not_allowed", 405);

  const raw = await readRawBody(req);
  const header = req.headers["x-hub-signature-256"] || "";
  const expected = "sha256=" + hmacSha256Hex(process.env.WA_APP_SECRET, raw);
  if (!timingSafeEqualHex(expected, header)) return sendErr(res, "bad_signature", 401);

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return sendErr(res, "bad_request");
  }

  const supa = db();
  for (const entry of body.entry || []) {
    for (const change of entry.changes || []) {
      for (const s of change.value?.statuses || []) {
        if (!s.id || STATUS_RANK[s.status] === undefined) continue;
        const { data: row } = await supa
          .from("wa_messages")
          .select("id, status")
          .eq("wa_message_id", s.id)
          .single();
        if (!row) continue;
        // Only move forward (sent -> delivered -> read); failed always records.
        if (s.status !== "failed" && STATUS_RANK[s.status] <= STATUS_RANK[row.status]) continue;
        await supa
          .from("wa_messages")
          .update({
            status: s.status,
            error: s.errors?.[0]?.title || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", row.id);
      }
    }
  }

  sendJson(res, { ok: true });
}
