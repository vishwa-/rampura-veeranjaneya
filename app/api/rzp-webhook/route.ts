import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { hmacSha256Hex, timingSafeEqualHex } from "@/lib/util";
import { sendTemplate, loadBookingForWa } from "@/lib/wa";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    const signature = request.headers.get("x-razorpay-signature") || "";
    const expected = hmacSha256Hex(process.env.RAZORPAY_WEBHOOK_SECRET || "", raw);

    if (!timingSafeEqualHex(expected, signature)) {
      return NextResponse.json({ error: "bad_signature" }, { status: 400 });
    }

    let event: any;
    try {
      event = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    const supa = db();
    const eventId = request.headers.get("x-razorpay-event-id");
    if (eventId) {
      const { error } = await supa.from("webhook_events").insert({ event_id: eventId });
      if (error && error.code === "23505") {
        return NextResponse.json({ ok: true, duplicate: true });
      }
      if (error) {
        return NextResponse.json({ error: "server_error" }, { status: 500 });
      }
    }

    if (event.event === "payment.captured") {
      const payment = event.payload?.payment?.entity;
      if (payment?.order_id) {
        const { data } = await supa.rpc("mark_paid", {
          p_order_id: payment.order_id,
          p_payment_id: payment.id,
        });
        if (data?.transitioned) {
          try {
            const forWa = await loadBookingForWa(data.booking.id);
            if (forWa) await sendTemplate(forWa, "confirmation");
          } catch {
            // Non-blocking
          }
        }
      }
    } else if (event.event === "refund.processed") {
      const refund = event.payload?.refund?.entity;
      if (refund?.payment_id) {
        await supa.rpc("mark_refunded", { p_payment_id: refund.payment_id });
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
