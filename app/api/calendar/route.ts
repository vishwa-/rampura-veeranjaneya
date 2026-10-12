import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { istDate, isValidDateStr } from "@/lib/util";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") || istDate();
  const to = searchParams.get("to") || istDate(45);

  if (!isValidDateStr(from) || !isValidDateStr(to)) {
    return NextResponse.json({ error: "bad_range" }, { status: 400 });
  }

  if ((Date.parse(to) - Date.parse(from)) / 86400000 > 366) {
    return NextResponse.json({ error: "bad_range" }, { status: 400 });
  }

  const supa = db();
  const { data: dates, error } = await supa
    .from("pooja_dates")
    .select("id, pooja_id, event_date, status")
    .gte("event_date", from)
    .lte("event_date", to)
    .neq("status", "closed")
    .order("event_date")
    .limit(5000);

  if (error) {
    console.error("Calendar pooja_dates error:", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const { data: poojas, error: pErr } = await supa
    .from("poojas")
    .select("id, slug, name_en, name_kn, desc_en, desc_kn, amount_paise, capacity")
    .eq("active", true);

  if (pErr) {
    console.error("Calendar poojas error:", pErr);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const dateIds = (dates || []).map((d) => d.id);
  const holds: Record<string, number> = {};

  if (dateIds.length) {
    const nowIso = new Date().toISOString();
    // Chunk dateIds in batches of 100 to avoid HTTP 414 URI Too Long limits on Supabase PostgREST
    const CHUNK_SIZE = 100;
    const chunks: string[][] = [];
    for (let i = 0; i < dateIds.length; i += CHUNK_SIZE) {
      chunks.push(dateIds.slice(i, i + CHUNK_SIZE));
    }

    const chunkResults = await Promise.all(
      chunks.map((chunk) =>
        supa
          .from("bookings")
          .select("pooja_date_id, status, expires_at")
          .in("pooja_date_id", chunk)
          .or(`status.eq.paid,and(status.eq.pending,expires_at.gt.${nowIso})`)
      )
    );

    for (const res of chunkResults) {
      if (res.error) {
        console.error("Calendar bookings hold check error:", res.error);
        return NextResponse.json({ error: "server_error" }, { status: 500 });
      }
      for (const r of res.data || []) {
        holds[r.pooja_date_id] = (holds[r.pooja_date_id] || 0) + 1;
      }
    }
  }

  const poojaById = Object.fromEntries((poojas || []).map((p) => [p.id, p]));
  const out = (dates || [])
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

  return NextResponse.json(
    { poojas, dates: out },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    }
  );
}
