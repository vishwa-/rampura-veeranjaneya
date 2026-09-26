import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { db } from "@/lib/supabase";
import { normalizePhone, cleanField, istDate } from "@/lib/util";

export const dynamic = "force-dynamic";

function generateDonationRef(): string {
  const dateStr = istDate().replace(/-/g, "");
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `DON-${dateStr}-${rand}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });

    // Honeypot spam check
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const name = cleanField(body.name, 120);
    const phone = normalizePhone(body.phone || "");
    if (!name || !phone) {
      return NextResponse.json({ error: "bad_request", message: "Name and valid phone number are required" }, { status: 400 });
    }

    // Amount validation: accept amount_rupees or amount_paise, must be integer >= 10 Rupees
    let amountPaise = 0;
    if (typeof body.amount_paise === "number" && Number.isInteger(body.amount_paise)) {
      amountPaise = body.amount_paise;
    } else if (typeof body.amount === "number" || typeof body.amount === "string") {
      const parsed = Math.floor(Number(body.amount));
      if (!Number.isNaN(parsed)) {
        amountPaise = parsed * 100;
      }
    }

    // Minimum donation ₹10 (1000 paise)
    if (!amountPaise || amountPaise < 1000) {
      return NextResponse.json(
        { error: "invalid_amount", message: "Minimum donation amount is ₹10" },
        { status: 400 }
      );
    }

    const email = cleanField(body.email, 160);
    const pan = cleanField(body.pan, 10)?.toUpperCase() || null;
    const gotra = cleanField(body.gotra, 80);
    const nakshatra = cleanField(body.nakshatra, 80);
    const rashi = cleanField(body.rashi, 80);
    const note = cleanField(body.note, 500);
    const lang = body.lang === "en" ? "en" : "kn";

    const donationRef = generateDonationRef();
    const supa = db();

    // Insert pending donation record into database
    const { data: donation, error: dbError } = await supa
      .from("donations")
      .insert({
        donation_ref: donationRef,
        donor_name: name,
        phone,
        email,
        pan,
        gotra,
        nakshatra,
        rashi,
        note,
        lang,
        amount_paise: amountPaise,
        status: "pending",
      })
      .select()
      .single();

    if (dbError || !donation) {
      console.error("[Donation DB insert error]:", dbError);
      return NextResponse.json({ error: "server_error" }, { status: 500 });
    }

    const hasRazorpay = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
    let orderId: string | null = null;

    if (hasRazorpay) {
      const auth = Buffer.from(
        `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
      ).toString("base64");

      try {
        const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amountPaise,
            currency: "INR",
            receipt: donationRef,
            notes: {
              donation_ref: donationRef,
              type: "kanike_donation",
              donor_name: name,
              phone,
              pan: pan || "N/A",
              gotra: gotra || "N/A",
            },
          }),
        });

        const order = await rzpRes.json();
        if (!rzpRes.ok || !order.id) {
          throw new Error(order.error?.description || "Order creation failed");
        }
        orderId = order.id;

        // Attach order ID to donation
        await supa
          .from("donations")
          .update({ razorpay_order_id: orderId })
          .eq("id", donation.id);
      } catch (err) {
        console.error("[Razorpay Order Creation Failed for Donation]:", err);
        await supa
          .from("donations")
          .update({ status: "cancelled" })
          .eq("id", donation.id);
        return NextResponse.json({ error: "payment_unavailable" }, { status: 502 });
      }
    }

    return NextResponse.json({
      order_id: orderId,
      has_gateway: hasRazorpay,
      amount_paise: amountPaise,
      amount_rupees: amountPaise / 100,
      key_id: process.env.RAZORPAY_KEY_ID || null,
      donation_ref: donationRef,
      donor_name: name,
      prefill: {
        name,
        contact: phone,
        email: email || undefined,
      },
    });
  } catch (e) {
    console.error("[API Donate Exception]:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
