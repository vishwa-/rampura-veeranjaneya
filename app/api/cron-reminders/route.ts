import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { istDate } from "@/lib/util";
import { sendTemplate } from "@/lib/wa";

async function handleCron(request: Request) {
  const auth = request.headers.get("authorization") || "";
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const tomorrow = istDate(1);
  const supa = db();

  const { data: rows, error } = await supa
    .from("bookings")
    .select(
      "id, booking_ref, devotee_name, phone, lang, amount_paise, status, " +
        "pooja_dates!inner(event_date, status), poojas(name_en, name_kn)"
    )
    .eq("status", "paid")
    .eq("pooja_dates.event_date", tomorrow)
    .neq("pooja_dates.status", "cancelled");

  if (error) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const b of (rows || []) as any[]) {
    const pd = b.pooja_dates as any;
    const p = b.poojas as any;

    const r = await sendTemplate(
      {
        id: b.id,
        booking_ref: b.booking_ref,
        devotee_name: b.devotee_name,
        phone: b.phone,
        lang: b.lang,
        amount_paise: b.amount_paise,
        event_date: Array.isArray(pd) ? pd[0]?.event_date : pd?.event_date,
        pooja_name_en: Array.isArray(p) ? p[0]?.name_en : p?.name_en,
        pooja_name_kn: Array.isArray(p) ? p[0]?.name_kn : p?.name_kn,
      },
      "reminder"
    );

    if (r.duplicate) skipped++;
    else if (r.sent) sent++;
    else failed++;
  }

  return NextResponse.json({ date: tomorrow, sent, skipped, failed });
}

export async function GET(request: Request) {
  return handleCron(request);
}

export async function POST(request: Request) {
  return handleCron(request);
}
