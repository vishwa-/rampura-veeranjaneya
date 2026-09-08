import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("order_id") || "";

  if (!/^order_[A-Za-z0-9]+$/.test(orderId)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { data, error } = await db()
    .from("bookings")
    .select("status, booking_ref, pooja_dates(event_date), poojas(name_en, name_kn)")
    .eq("razorpay_order_id", orderId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const pd = data.pooja_dates as any;
  const p = data.poojas as any;

  return NextResponse.json({
    status: data.status,
    booking_ref: data.booking_ref,
    event_date: Array.isArray(pd) ? pd[0]?.event_date : pd?.event_date,
    pooja_name_en: Array.isArray(p) ? p[0]?.name_en : p?.name_en,
    pooja_name_kn: Array.isArray(p) ? p[0]?.name_kn : p?.name_kn,
  });
}
