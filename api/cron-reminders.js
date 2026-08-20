import { db } from "./_lib/db.js";
import { json, errJson, istDate } from "./_lib/util.js";
import { sendTemplate } from "./_lib/wa.js";

// Daily cron (evening IST): sends the reminder template to every paid
// booking whose pooja is tomorrow and has no reminder yet.
export default async function handler(request) {
  const auth = request.headers.get("authorization") || "";
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return errJson("unauthorized", 401);

  const tomorrow = istDate(1);
  const supa = db();

  const { data: rows, error } = await supa
    .from("bookings")
    .select(
      "id, booking_ref, devotee_name, phone, lang, amount_paise, status, " +
        "pooja_dates!inner(event_date, status), poojas(name_en, name_kn)"
    )
    .eq("status", "paid")
    .eq("pooja_dates.event_date", tomorrow)
    .neq("pooja_dates.status", "cancelled");
  if (error) return errJson("server_error", 500);

  let sent = 0;
  let skipped = 0;
  let failed = 0;
  for (const b of rows || []) {
    const r = await sendTemplate(
      {
        id: b.id,
        booking_ref: b.booking_ref,
        devotee_name: b.devotee_name,
        phone: b.phone,
        lang: b.lang,
        amount_paise: b.amount_paise,
        event_date: b.pooja_dates.event_date,
        pooja_name_en: b.poojas.name_en,
        pooja_name_kn: b.poojas.name_kn,
      },
      "reminder"
    );
    if (r.duplicate) skipped++;
    else if (r.sent) sent++;
    else failed++;
  }

  return json({ date: tomorrow, sent, skipped, failed });
}
