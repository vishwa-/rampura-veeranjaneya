import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { hmacSha256Hex, timingSafeEqualHex } from "@/lib/util";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      console.error("[Razorpay Donation Verify Error] RAZORPAY_KEY_SECRET is not configured in environment variables.");
      return NextResponse.json({ error: "gateway_not_configured" }, { status: 500 });
    }

    const expected = hmacSha256Hex(
      keySecret,
      `${razorpay_order_id}|${razorpay_payment_id}`
    );

    if (!timingSafeEqualHex(expected, razorpay_signature)) {
      return NextResponse.json({ error: "bad_signature" }, { status: 400 });
    }

    const supa = db();
    // Update pending donation to paid
    const { data: updatedDonation, error } = await supa
      .from("donations")
      .update({
        status: "paid",
        razorpay_payment_id: razorpay_payment_id,
        paid_at: new Date().toISOString(),
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .eq("status", "pending")
      .select()
      .maybeSingle();

    if (error) {
      console.error("[Donation Verify DB Error]:", error);
      return NextResponse.json({ error: "server_error" }, { status: 500 });
    }

    let finalDonation = updatedDonation;
    if (!finalDonation) {
      // It might have already been marked paid by the webhook
      const { data: existing, error: fetchErr } = await supa
        .from("donations")
        .select()
        .eq("razorpay_order_id", razorpay_order_id)
        .maybeSingle();

      if (fetchErr || !existing) {
        return NextResponse.json({ error: "not_found" }, { status: 404 });
      }
      finalDonation = existing;
    }

    return NextResponse.json({
      status: "paid",
      donation_ref: finalDonation.donation_ref,
      donor_name: finalDonation.donor_name,
      amount_rupees: finalDonation.amount_paise / 100,
      paid_at: finalDonation.paid_at || finalDonation.created_at,
      razorpay_payment_id: finalDonation.razorpay_payment_id || razorpay_payment_id,
    });
  } catch (e) {
    console.error("[API Donate Verify Exception]:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
