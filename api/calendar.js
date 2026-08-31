import { db } from "./_lib/db.js";
import { query, sendJson, sendErr, istDate, isValidDateStr } from "./_lib/util.js";

// Public month data for the booking calendar. No PII.
export default async function handler(req, res) {
  const q = query(req);
  const from = q.get("from") || istDate();
  const to = q.get("to") || istDate(45);
  if (!isValidDateStr(from) || !isValidDateStr(to)) return sendErr(res, "bad_range");
  if ((Date.parse(to) - Date.parse(from)) / 86400000 > 92) return sendErr(res, "bad_range");

  const supa = db();
  const { data: dates, error } = await supa
    .from("pooja_dates")
    .select("id, pooja_id, event_date, status")
    .gte("event_date", from)
    .lte("event_date", to)
    .neq("status", "closed")
    .order("event_date");
  if (error) return sendErr(res, "server_error", 500);

  const { data: poojas, error: pErr } = await supa
    .from("poojas")
    .select("id, slug, name_en, name_kn, desc_en, desc_kn, amount_paise, capacity")
    .eq("active", true);
  if (pErr) return sendErr(res, "server_error", 500);

  // Live holds per date (paid + unexpired pending), to compute remaining.
  const dateIds = dates.map((d) => d.id);
  const holds = {};
  if (dateIds.length) {
    const nowIso = new Date().toISOString();
    const { data: rows, error: bErr } = await supa
      .from("bookings")
      .select("pooja_date_id, status, expires_at")
      .in("pooja_date_id", dateIds)
      .or(`status.eq.paid,and(status.eq.pending,expires_at.gt.${nowIso})`);
    if (bErr) return sendErr(res, "server_error", 500);
    for (const r of rows) holds[r.pooja_date_id] = (holds[r.pooja_date_id] || 0) + 1;
  }

  const poojaById = Object.fromEntries(poojas.map((p) => [p.id, p]));
  const out = dates
    .filter((d) => poojaById[d.pooja_id])
    .map((d) => {
      const cap = poojaById[d.pooja_id].capacity;
      return {
        id: d.id,
        pooja_id: d.pooja_id,
        event_date: d.event_date,
        status: d.status,
        remaining: cap == null ? null : Math.max(0, cap - (holds[d.id] || 0)),
      };
    });

  sendJson(
    res,
    { poojas, dates: out },
    200,
    { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
  );
}
