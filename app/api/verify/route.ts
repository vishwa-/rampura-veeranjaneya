import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { hmacSha256Hex, timingSafeEqualHex } from "@/lib/util";
import { sendTemplate, loadBookingForWa } from "@/lib/wa";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    const expected = hmacSha256Hex(
      process.env.RAZORPAY_KEY_SECRET || "",
      `${razorpay_order_id}|${razorpay_payment_id}`
    );

    if (!timingSafeEqualHex(expected, razorpay_signature)) {
      return NextResponse.json({ error: "bad_signature" }, { status: 400 });
    }

    const { data, error } = await db().rpc("mark_paid", {
      p_order_id: razorpay_order_id,
      p_payment_id: razorpay_payment_id,
    });

    if (error || !data?.found) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const booking = data.booking;
    let waSent = false;
    if (data.transitioned) {
      try {
        const forWa = await loadBookingForWa(booking.id);
        if (forWa) {
          const r = await sendTemplate(forWa, "confirmation");
          waSent = r.sent;
        }
      } catch {
        // WhatsApp failure does not block paid status
      }
    }

    return NextResponse.json({
      status: "paid",
      booking_ref: booking.booking_ref,
      wa_sent: waSent,
    });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
