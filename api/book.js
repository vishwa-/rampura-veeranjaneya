import { db } from "./_lib/db.js";
import { json, errJson, normalizePhone, cleanField } from "./_lib/util.js";

// Creates a pending booking (30-minute hold) and a Razorpay order.
// The amount always comes from the database, never from the client.
export default async function handler(request) {
  if (request.method !== "POST") return errJson("method_not_allowed", 405);

  let body;
  try {
    body = await request.json();
  } catch {
    return errJson("bad_request");
  }

  // Honeypot: bots that fill the hidden field get a fake success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ ok: true });
  }

  const name = cleanField(body.name, 120);
  const phone = normalizePhone(body.phone || "");
  if (!name || !phone) return errJson("bad_request");
  if (typeof body.pooja_date_id !== "string" || !/^[0-9a-f-]{36}$/.test(body.pooja_date_id)) {
    return errJson("bad_request");
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
    return code ? errJson(code, 409) : errJson("server_error", 500);
  }

  // Resumed booking that already has an order: reuse it.
  let orderId = data.resumed ? data.razorpay_order_id : null;

  if (!orderId) {
    const auth = Buffer.from(
      `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
    ).toString("base64");
    try {
      const res = await fetch("https://api.razorpay.com/v1/orders", {
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
          },
        }),
      });
      const order = await res.json();
      if (!res.ok || !order.id) throw new Error("order_failed");
      orderId = order.id;
    } catch {
      // Release the hold so the slot is not stuck behind a gateway outage.
      await supa
        .from("bookings")
        .update({ status: "expired" })
        .eq("id", data.booking_id)
        .eq("status", "pending");
      return errJson("payment_unavailable", 502);
    }
    await supa.rpc("attach_order", { p_booking_id: data.booking_id, p_order_id: orderId });
  }

  return json({
    order_id: orderId,
    amount_paise: data.amount_paise,
    key_id: process.env.RAZORPAY_KEY_ID,
    booking_ref: data.booking_ref,
    pooja_name_en: data.pooja_name_en,
    pooja_name_kn: data.pooja_name_kn,
    event_date: data.event_date,
    prefill: { name, contact: phone },
  });
}
