import { db } from "./_lib/db.js";
import { requireAdmin } from "./_lib/auth.js";
import { query, readJson, sendJson, sendErr, cleanField, isValidDateStr, formatRupees } from "./_lib/util.js";
import { sendTemplate, loadBookingForWa } from "./_lib/wa.js";

// Single consolidated admin API, routed on ?action=.
// Every request re-verifies the Supabase JWT and the email allowlist.
export default async function handler(req, res) {
  const admin = await requireAdmin(req);
  if (!admin.email) {
    return sendErr(res, admin.status === 403 ? "forbidden" : "unauthorized", admin.status);
  }

  const q = query(req);
  const action = q.get("action") || "";
  const supa = db();

  try {
    if (action === "poojas.list" && req.method === "GET") {
      const { data, error } = await supa.from("poojas").select("*").order("created_at");
      if (error) throw error;
      return sendJson(res, { poojas: data });
    }

    if (action === "poojas.save" && req.method === "POST") {
      const b = await readJson(req);
      if (!b) return sendErr(res, "bad_request");
      const row = {
        slug: cleanField(b.slug, 60)?.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        name_en: cleanField(b.name_en, 160),
        name_kn: cleanField(b.name_kn, 160),
        desc_en: cleanField(b.desc_en, 600),
        desc_kn: cleanField(b.desc_kn, 600),
        amount_paise: Number.isInteger(b.amount_paise) && b.amount_paise > 0 ? b.amount_paise : null,
        capacity: b.capacity == null || b.capacity === "" ? null : Number(b.capacity),
        active: b.active !== false,
      };
      if (!row.slug || !row.name_en || !row.name_kn || !row.amount_paise) {
        return sendErr(res, "bad_request");
      }
      if (row.capacity != null && (!Number.isInteger(row.capacity) || row.capacity < 1)) {
        return sendErr(res, "bad_request");
      }
      const op = b.id
        ? supa.from("poojas").update(row).eq("id", b.id).select().single()
        : supa.from("poojas").insert(row).select().single();
      const { data, error } = await op;
      if (error) throw error;
      return sendJson(res, { pooja: data });
    }

    if (action === "dates.list" && req.method === "GET") {
      const { data: dates, error } = await supa
        .from("pooja_dates")
        .select("id, pooja_id, event_date, status, poojas(name_en, slug, capacity)")
        .gte("event_date", q.get("from") || "1970-01-01")
        .order("event_date");
      if (error) throw error;
      const ids = dates.map((d) => d.id);
      const counts = {};
      if (ids.length) {
        const nowIso = new Date().toISOString();
        const { data: rows, error: bErr } = await supa
          .from("bookings")
          .select("pooja_date_id, status, expires_at")
          .in("pooja_date_id", ids);
        if (bErr) throw bErr;
        for (const r of rows) {
          const c = (counts[r.pooja_date_id] ||= { paid: 0, pending: 0 });
          if (r.status === "paid") c.paid++;
          else if (r.status === "pending" && r.expires_at > nowIso) c.pending++;
        }
      }
      return sendJson(res, {
        dates: dates.map((d) => ({ ...d, counts: counts[d.id] || { paid: 0, pending: 0 } })),
      });
    }

    if (action === "dates.create" && req.method === "POST") {
      const b = await readJson(req);
      if (!b || typeof b.pooja_id !== "string" || !Array.isArray(b.dates) || !b.dates.length) {
        return sendErr(res, "bad_request");
      }
      const dates = b.dates.filter(isValidDateStr).slice(0, 120);
      if (!dates.length) return sendErr(res, "bad_request");
      const { error } = await supa
        .from("pooja_dates")
        .upsert(
          dates.map((event_date) => ({ pooja_id: b.pooja_id, event_date })),
          { onConflict: "pooja_id,event_date", ignoreDuplicates: true }
        );
      if (error) throw error;
      return sendJson(res, { ok: true, count: dates.length });
    }

    if (action === "dates.setStatus" && req.method === "POST") {
      const b = await readJson(req);
      if (!b || !["open", "closed", "cancelled"].includes(b.status)) {
        return sendErr(res, "bad_request");
      }
      const { error } = await supa
        .from("pooja_dates")
        .update({ status: b.status })
        .eq("id", b.date_id);
      if (error) throw error;
      let affected = [];
      if (b.status === "cancelled") {
        const { data } = await supa
          .from("bookings")
          .select("booking_ref, devotee_name, phone, amount_paise")
          .eq("pooja_date_id", b.date_id)
          .eq("status", "paid");
        affected = data || [];
      }
      return sendJson(res, { ok: true, affected });
    }

    if ((action === "bookings.list" || action === "bookings.csv") && req.method === "GET") {
      let sel = supa
        .from("bookings")
        .select(
          "id, booking_ref, devotee_name, phone, email, gotra, nakshatra, rashi, " +
            "family_names, note, lang, amount_paise, status, needs_review, created_at, " +
            "pooja_dates!inner(event_date), poojas(name_en, slug), " +
            "wa_messages(kind, status, error)"
        )
        .order("created_at", { ascending: false })
        .limit(1000);
      const from = q.get("from");
      const to = q.get("to");
      const pooja = q.get("pooja_id");
      const status = q.get("status");
      if (from && isValidDateStr(from)) sel = sel.gte("pooja_dates.event_date", from);
      if (to && isValidDateStr(to)) sel = sel.lte("pooja_dates.event_date", to);
      if (pooja) sel = sel.eq("pooja_id", pooja);
      if (status) sel = sel.eq("status", status);
      const { data, error } = await sel;
      if (error) throw error;

      if (action === "bookings.list") return sendJson(res, { bookings: data });

      const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      const header = [
        "event_date", "pooja", "booking_ref", "name", "phone", "email", "gotra",
        "nakshatra", "rashi", "family_names", "note", "amount_rupees", "status",
        "wa_confirmation", "wa_reminder", "booked_at",
      ];
      const lines = [header.join(",")];
      for (const b of data) {
        const wa = (kind) => b.wa_messages.find((m) => m.kind === kind)?.status || "";
        lines.push(
          [
            b.pooja_dates.event_date, b.poojas.name_en, b.booking_ref, b.devotee_name,
            b.phone, b.email, b.gotra, b.nakshatra, b.rashi, b.family_names, b.note,
            formatRupees(b.amount_paise), b.status, wa("confirmation"), wa("reminder"),
            b.created_at,
          ].map(esc).join(",")
        );
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", 'attachment; filename="bookings.csv"');
      // BOM so Kannada text opens correctly in Excel/Numbers.
      return res.end("﻿" + lines.join("\r\n"));
    }

    if (action === "wa.resend" && req.method === "POST") {
      const b = await readJson(req);
      if (!b) return sendErr(res, "bad_request");
      const forWa = await loadBookingForWa(b.booking_id);
      if (!forWa) return sendErr(res, "not_found", 404);
      const kind = b.kind === "reminder" ? "reminder" : "confirmation";
      const r = await sendTemplate(forWa, kind, { force: true });
      return sendJson(res, { sent: r.sent, error: r.error });
    }

    return sendErr(res, "unknown_action", 404);
  } catch {
    return sendErr(res, "server_error", 500);
  }
}
