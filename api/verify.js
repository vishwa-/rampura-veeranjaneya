import { db } from "./_lib/db.js";
import { json, errJson, hmacSha256Hex, timingSafeEqualHex } from "./_lib/util.js";
import { sendTemplate, loadBookingForWa } from "./_lib/wa.js";

// Called by the Razorpay Checkout success handler. Verifies the payment
// signature and flips the booking to paid; the webhook is the backstop.
export default async function handler(request) {
  if (request.method !== "POST") return errJson("method_not_allowed", 405);

  let body;
  try {
    body = await request.json();
  } catch {
    return errJson("bad_request");
  }
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return errJson("bad_request");
  }

  const expected = hmacSha256Hex(
    process.env.RAZORPAY_KEY_SECRET,
    `${razorpay_order_id}|${razorpay_payment_id}`
  );
  if (!timingSafeEqualHex(expected, razorpay_signature)) {
    return errJson("bad_signature", 400);
  }

  const { data, error } = await db().rpc("mark_paid", {
    p_order_id: razorpay_order_id,
    p_payment_id: razorpay_payment_id,
  });
  if (error || !data?.found) return errJson("not_found", 404);

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
      // A WhatsApp failure must never fail a paid booking.
    }
  }

  return json({
    status: "paid",
    booking_ref: booking.booking_ref,
    wa_sent: waSent,
  });
}
