import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { requireAdmin, cleanField, isValidDateStr, formatRupees } from "@/lib/util";
import { sendTemplate, loadBookingForWa } from "@/lib/wa";

async function handleAdminRequest(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin.email) {
    return NextResponse.json(
      { error: admin.errorStatus === 403 ? "forbidden" : "unauthorized" },
      { status: admin.errorStatus || 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") || "";
  const supa = db();

  try {
    // 1. poojas.list (GET)
    if (action === "poojas.list" && request.method === "GET") {
      const { data, error } = await supa.from("poojas").select("*").order("created_at");
      if (error) throw error;
      return NextResponse.json({ poojas: data });
    }

    // 2. poojas.save (POST)
    if (action === "poojas.save" && request.method === "POST") {
      const b = await request.json().catch(() => null);
      if (!b) return NextResponse.json({ error: "bad_request" }, { status: 400 });

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
        return NextResponse.json({ error: "bad_request" }, { status: 400 });
      }
      if (row.capacity != null && (!Number.isInteger(row.capacity) || row.capacity < 1)) {
        return NextResponse.json({ error: "bad_request" }, { status: 400 });
      }

      const op = b.id
        ? supa.from("poojas").update(row).eq("id", b.id).select().single()
        : supa.from("poojas").insert(row).select().single();

      const { data, error } = await op;
      if (error) throw error;
      return NextResponse.json({ pooja: data });
    }

    // 3. dates.list (GET)
    if (action.startsWith("dates.list") && request.method === "GET") {
      const from = searchParams.get("from") || "1970-01-01";
      const { data: dates, error } = await supa
        .from("pooja_dates")
        .select("id, pooja_id, event_date, status, poojas(name_en, slug, capacity)")
        .gte("event_date", from)
        .order("event_date");

      if (error) throw error;

      const ids = (dates || []).map((d) => d.id);
      const counts: Record<string, { paid: number; pending: number }> = {};

      if (ids.length) {
        const nowIso = new Date().toISOString();
        const { data: rows, error: bErr } = await supa
          .from("bookings")
          .select("pooja_date_id, status, expires_at")
          .in("pooja_date_id", ids);

        if (bErr) throw bErr;

        for (const r of rows || []) {
          const c = (counts[r.pooja_date_id] ||= { paid: 0, pending: 0 });
          if (r.status === "paid") c.paid++;
          else if (r.status === "pending" && r.expires_at > nowIso) c.pending++;
        }
      }

      return NextResponse.json({
        dates: (dates || []).map((d) => ({
          ...d,
          counts: counts[d.id] || { paid: 0, pending: 0 },
        })),
      });
    }

    // 4. dates.create (POST)
    if (action === "dates.create" && request.method === "POST") {
      const b = await request.json().catch(() => null);
      if (!b || typeof b.pooja_id !== "string" || !Array.isArray(b.dates) || !b.dates.length) {
        return NextResponse.json({ error: "bad_request" }, { status: 400 });
      }

      const dates = b.dates.filter(isValidDateStr).slice(0, 120);
      if (!dates.length) return NextResponse.json({ error: "bad_request" }, { status: 400 });

      const { error } = await supa
        .from("pooja_dates")
        .upsert(
          dates.map((event_date: string) => ({ pooja_id: b.pooja_id, event_date })),
          { onConflict: "pooja_id,event_date", ignoreDuplicates: true }
        );

      if (error) throw error;
      return NextResponse.json({ ok: true, count: dates.length });
    }

    // 5. dates.setStatus (POST)
    if (action === "dates.setStatus" && request.method === "POST") {
      const b = await request.json().catch(() => null);
      if (!b || !["open", "closed", "cancelled"].includes(b.status)) {
        return NextResponse.json({ error: "bad_request" }, { status: 400 });
      }

      const { error } = await supa
        .from("pooja_dates")
        .update({ status: b.status })
        .eq("id", b.date_id);

      if (error) throw error;

      let affected: any[] = [];
      if (b.status === "cancelled") {
        const { data } = await supa
          .from("bookings")
          .select("booking_ref, devotee_name, phone, amount_paise")
          .eq("pooja_date_id", b.date_id)
          .eq("status", "paid");
        affected = data || [];
      }

      return NextResponse.json({ ok: true, affected });
    }

    // 6. bookings.list or bookings.csv (GET)
    if ((action.startsWith("bookings.list") || action.startsWith("bookings.csv")) && request.method === "GET") {
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

      const from = searchParams.get("from");
      const to = searchParams.get("to");
      const pooja = searchParams.get("pooja_id");
      const status = searchParams.get("status");

      if (from && isValidDateStr(from)) sel = sel.gte("pooja_dates.event_date", from);
      if (to && isValidDateStr(to)) sel = sel.lte("pooja_dates.event_date", to);
      if (pooja) sel = sel.eq("pooja_id", pooja);
      if (status) sel = sel.eq("status", status);

      const { data, error } = await sel;
      if (error) throw error;

      if (action.startsWith("bookings.list")) {
        return NextResponse.json({ bookings: data });
      }

      const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      const header = [
        "event_date", "pooja", "booking_ref", "name", "phone", "email", "gotra",
        "nakshatra", "rashi", "family_names", "note", "amount_rupees", "status",
        "wa_confirmation", "wa_reminder", "booked_at",
      ];
      const lines = [header.join(",")];
      for (const b of (data || []) as any[]) {
        const pd = b.pooja_dates as any;
        const p = b.poojas as any;
        const waMsgs = (b.wa_messages || []) as any[];
        const wa = (kind: string) => waMsgs.find((m: any) => m.kind === kind)?.status || "";

        lines.push(
          [
            Array.isArray(pd) ? pd[0]?.event_date : pd?.event_date,
            Array.isArray(p) ? p[0]?.name_en : p?.name_en,
            b.booking_ref,
            b.devotee_name,
            b.phone,
            b.email,
            b.gotra,
            b.nakshatra,
            b.rashi,
            b.family_names,
            b.note,
            formatRupees(b.amount_paise),
            b.status,
            wa("confirmation"),
            wa("reminder"),
            b.created_at,
          ].map(esc).join(",")
        );
      }

      return new NextResponse("\uFEFF" + lines.join("\r\n"), {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="bookings.csv"',
        },
      });
    }

    // 7. wa.resend (POST)
    if (action === "wa.resend" && request.method === "POST") {
      const b = await request.json().catch(() => null);
      if (!b) return NextResponse.json({ error: "bad_request" }, { status: 400 });

      const forWa = await loadBookingForWa(b.booking_id);
      if (!forWa) return NextResponse.json({ error: "not_found" }, { status: 404 });

      const kind = b.kind === "reminder" ? "reminder" : "confirmation";
      const r = await sendTemplate(forWa, kind, { force: true });
      return NextResponse.json({ sent: r.sent, error: r.error });
    }

    return NextResponse.json({ error: "unknown_action" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return handleAdminRequest(request);
}

export async function POST(request: Request) {
  return handleAdminRequest(request);
}
