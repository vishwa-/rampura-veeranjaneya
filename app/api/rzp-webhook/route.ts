import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { hmacSha256Hex, timingSafeEqualHex } from "@/lib/util";
import { sendTemplate, loadBookingForWa } from "@/lib/wa";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("[Razorpay Webhook Error] RAZORPAY_WEBHOOK_SECRET is not configured in environment variables.");
      return NextResponse.json({ error: "webhook_not_configured" }, { status: 500 });
    }

    const raw = await request.text();
    const signature = request.headers.get("x-razorpay-signature") || "";
    const expected = hmacSha256Hex(webhookSecret, raw);

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

    // Handle payment.captured or order.paid
    if (event.event === "payment.captured" || event.event === "order.paid") {
      const payment = event.payload?.payment?.entity;
      const order = event.payload?.order?.entity;
      const orderId = payment?.order_id || order?.id;
      const paymentId = payment?.id;

      if (orderId) {
        const { data, error } = await supa.rpc("mark_paid", {
          p_order_id: orderId,
          p_payment_id: paymentId || "webhook_captured",
        });

        if (error) {
          console.error("[Razorpay Webhook mark_paid error]:", error);
        }

        if (data?.transitioned) {
          try {
            const forWa = await loadBookingForWa(data.booking.id);
            if (forWa) await sendTemplate(forWa, "confirmation");
          } catch (waErr) {
            console.error("[Razorpay Webhook WA confirmation error]:", waErr);
          }
        } else if (!data?.found) {
          // If not found in bookings, check if this order belongs to a donation
          const { error: donErr } = await supa
            .from("donations")
            .update({
              status: "paid",
              razorpay_payment_id: paymentId || "webhook_captured",
              paid_at: new Date().toISOString(),
            })
            .eq("razorpay_order_id", orderId)
            .eq("status", "pending");

          if (donErr) {
            console.error("[Razorpay Webhook donation mark_paid error]:", donErr);
          }
        }
      }
    } else if (event.event === "refund.processed") {
      const refund = event.payload?.refund?.entity;
      if (refund?.payment_id) {
        await supa.rpc("mark_refunded", { p_payment_id: refund.payment_id });
        await supa
          .from("donations")
          .update({ status: "refunded" })
          .eq("razorpay_payment_id", refund.payment_id);
      }
    } else if (event.event === "payment.failed") {
      const payment = event.payload?.payment?.entity;
      console.warn(`[Razorpay Payment Failed]: order=${payment?.order_id}, reason=${payment?.error_description}`);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
