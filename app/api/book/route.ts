import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { normalizePhone, cleanField } from "@/lib/util";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });

    // Honeypot check
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const name = cleanField(body.name, 120);
    const phone = normalizePhone(body.phone || "");
    if (!name || !phone) return NextResponse.json({ error: "bad_request" }, { status: 400 });
    if (typeof body.pooja_date_id !== "string" || !/^[0-9a-f-]{36}$/.test(body.pooja_date_id)) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    const supa = db();
    const { data, error } = await supa.rpc("create_booking", {
      p_pooja_date_id: body.pooja_date_id,
      p_name: name,
      p_phone: phone,
      p_email: cleanField(body.email, 160),
      p_gotra: cleanField(body.gotra, 80),
      p_nakshatra: cleanField(body.nakshatra, 80),
      p_rashi: cleanField(body.rashi, 80),
      p_family_names: cleanField(body.family_names, 500),
      p_note: cleanField(body.note, 500),
      p_lang: body.lang === "kn" ? "kn" : "en",
    });

    if (error) {
      const code = ["date_closed", "sold_out", "already_booked", "too_many"].find((c) =>
        (error.message || "").includes(c)
      );
      return code
        ? NextResponse.json({ error: code }, { status: 409 })
        : NextResponse.json({ error: "server_error" }, { status: 500 });
    }

    let orderId = data.resumed ? data.razorpay_order_id : null;
    const hasRazorpay = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

    if (hasRazorpay && !orderId) {
      const auth = Buffer.from(
        `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
      ).toString("base64");

      try {
        const r = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: data.amount_paise,
            currency: "INR",
            receipt: data.booking_ref,
            notes: {
              booking_ref: data.booking_ref,
              pooja: data.pooja_name_en,
              date: data.event_date,
              devotee_name: name,
              phone: phone,
            },
          }),
        });
        const order = await r.json();
        if (!r.ok || !order.id) throw new Error("order_failed");
        orderId = order.id;
      } catch {
        await supa
          .from("bookings")
          .update({ status: "expired" })
          .eq("id", data.booking_id)
          .eq("status", "pending");
        return NextResponse.json({ error: "payment_unavailable" }, { status: 502 });
      }

      await supa.rpc("attach_order", { p_booking_id: data.booking_id, p_order_id: orderId });
    }

    return NextResponse.json({
      order_id: orderId,
      has_gateway: hasRazorpay,
      amount_paise: data.amount_paise,
      key_id: process.env.RAZORPAY_KEY_ID || null,
      booking_ref: data.booking_ref,
      pooja_name_en: data.pooja_name_en,
      pooja_name_kn: data.pooja_name_kn,
      event_date: data.event_date,
      prefill: { name, contact: phone },
    });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
