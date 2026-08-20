import { db } from "./_lib/db.js";
import { json, errJson } from "./_lib/util.js";

// Recovery endpoint for clients that dropped before /api/verify returned.
// Order ids are unguessable; only non-sensitive fields are returned.
export default async function handler(request) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("order_id") || "";
  if (!/^order_[A-Za-z0-9]+$/.test(orderId)) return errJson("bad_request");

  const { data, error } = await db()
    .from("bookings")
    .select("status, booking_ref, pooja_dates(event_date), poojas(name_en, name_kn)")
    .eq("razorpay_order_id", orderId)
    .single();
  if (error || !data) return errJson("not_found", 404);

  return json({
    status: data.status,
    booking_ref: data.booking_ref,
    event_date: data.pooja_dates.event_date,
    pooja_name_en: data.poojas.name_en,
    pooja_name_kn: data.poojas.name_kn,
  });
}
