import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { hmacSha256Hex, timingSafeEqualHex } from "@/lib/util";
import { formatVidyaSevaSummary } from "@/lib/vidya-seva";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      booking_ref,
    } = body;

    const supa = db();
    const hasSecret = Boolean(process.env.RAZORPAY_KEY_SECRET);

    if (hasSecret && razorpay_order_id && razorpay_signature) {
      const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expected = hmacSha256Hex(process.env.RAZORPAY_KEY_SECRET || "", payload);

      if (!timingSafeEqualHex(expected, razorpay_signature)) {
        console.error("[VidyaSeva Verify Error]: Signature mismatch for order", razorpay_order_id);
        return NextResponse.json({ error: "bad_signature", message: "Payment verification failed" }, { status: 400 });
      }
    }

    // Lookup record
    let query = supa.from("vidya_sevas").select("*");
    if (razorpay_order_id) {
      query = query.eq("razorpay_order_id", razorpay_order_id);
    } else if (booking_ref) {
      query = query.eq("booking_ref", booking_ref);
    } else {
      return NextResponse.json({ error: "bad_request", message: "Order reference is required" }, { status: 400 });
    }

    const { data: record, error: findErr } = await query.single();
    if (findErr || !record) {
      console.error("[VidyaSeva Verify]: Record not found", findErr);
      return NextResponse.json({ error: "not_found", message: "Offering record not found" }, { status: 404 });
    }

    // Transition to paid if pending
    if (record.status === "pending") {
      const { data: updated, error: updateErr } = await supa
        .from("vidya_sevas")
        .update({
          status: "paid",
          razorpay_payment_id: razorpay_payment_id || "direct_payment",
          paid_at: new Date().toISOString(),
        })
        .eq("id", record.id)
        .select()
        .single();

      if (updateErr) {
        console.error("[VidyaSeva Verify update error]:", updateErr);
      }
    }

    return NextResponse.json({
      verified: true,
      booking_ref: record.booking_ref,
      devotee_name: record.devotee_name,
      amount_rupees: record.total_amount_paise / 100,
      payment_id: razorpay_payment_id || record.razorpay_payment_id || "Verified",
      summary: formatVidyaSevaSummary(record.items, record.lang === "kn"),
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
  } catch (err) {
    console.error("[VidyaSeva Verify Server Error]:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
