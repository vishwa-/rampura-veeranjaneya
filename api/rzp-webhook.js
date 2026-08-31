import { db } from "./_lib/db.js";
import { readRawBody, sendJson, sendErr, hmacSha256Hex, timingSafeEqualHex } from "./_lib/util.js";
import { sendTemplate, loadBookingForWa } from "./_lib/wa.js";

// Razorpay webhook: the source of truth for payment state.
// Signature is computed over the raw body; events are deduplicated by id.
export default async function handler(req, res) {
  if (req.method !== "POST") return sendErr(res, "method_not_allowed", 405);

  const raw = await readRawBody(req);
  const signature = req.headers["x-razorpay-signature"] || "";
  const expected = hmacSha256Hex(process.env.RAZORPAY_WEBHOOK_SECRET, raw);
  if (!timingSafeEqualHex(expected, signature)) return sendErr(res, "bad_signature", 400);

  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return sendErr(res, "bad_request");
  }

  const supa = db();
  const eventId = req.headers["x-razorpay-event-id"];
  if (eventId) {
    const { error } = await supa.from("webhook_events").insert({ event_id: eventId });
    if (error && error.code === "23505") return sendJson(res, { ok: true, duplicate: true });
    if (error) return sendErr(res, "server_error", 500);
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
          // Message failure never fails the webhook.
        }
      }
    }
  } else if (event.event === "refund.processed") {
    const refund = event.payload?.refund?.entity;
    if (refund?.payment_id) {
      await supa.rpc("mark_refunded", { p_payment_id: refund.payment_id });
    }
  }

  sendJson(res, { ok: true });
}
