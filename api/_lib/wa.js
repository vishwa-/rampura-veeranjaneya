import { db } from "./db.js";
import { formatDate, formatRupees } from "./util.js";

const GRAPH = "https://graph.facebook.com/v20.0";

// Sends one approved template message via the WhatsApp Cloud API and records
// it in wa_messages. Idempotent per (booking, kind): if a row already exists
// and force is false, it does nothing (used by webhook vs verify races);
// force=true re-sends and updates the existing row (admin resend).
export async function sendTemplate(booking, kind, { force = false } = {}) {
  const supa = db();

  const { error: insErr } = await supa
    .from("wa_messages")
    .insert({ booking_id: booking.id, kind });
  const alreadyExists = insErr && insErr.code === "23505";
  if (insErr && !alreadyExists) return { sent: false, error: insErr.message };
  if (alreadyExists && !force) return { sent: false, error: null, duplicate: true };

  const lang = booking.lang === "kn" ? "kn" : "en";
  const templateName = kind === "confirmation" ? "booking_confirmation" : "pooja_reminder";
  const poojaName = lang === "kn" ? booking.pooja_name_kn : booking.pooja_name_en;
  const params = [
    booking.devotee_name,
    poojaName,
    formatDate(booking.event_date, lang),
    booking.booking_ref,
  ];
  if (kind === "confirmation") params.push(formatRupees(booking.amount_paise));

  let waId = null;
  let status = "sent";
  let errText = null;
  try {
    const res = await fetch(`${GRAPH}/${process.env.WA_PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WA_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: booking.phone.replace("+", ""),
        type: "template",
        template: {
          name: templateName,
          language: { code: lang },
          components: [
            {
              type: "body",
              parameters: params.map((text) => ({ type: "text", text: String(text) })),
            },
          ],
        },
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (res.ok && body.messages && body.messages[0]) {
      waId = body.messages[0].id;
    } else {
      status = "failed";
      errText = body.error ? `${body.error.code}: ${body.error.message}` : `HTTP ${res.status}`;
    }
  } catch (e) {
    status = "failed";
    errText = e.message;
  }

  await supa
    .from("wa_messages")
    .update({ wa_message_id: waId, status, error: errText, updated_at: new Date().toISOString() })
    .eq("booking_id", booking.id)
    .eq("kind", kind);

  return { sent: status === "sent", error: errText };
}

// Loads a booking joined with its pooja names and date, shaped for sendTemplate.
export async function loadBookingForWa(bookingId) {
  const supa = db();
  const { data, error } = await supa
    .from("bookings")
    .select(
      "id, booking_ref, devotee_name, phone, lang, amount_paise, pooja_dates(event_date), poojas(name_en, name_kn)"
    )
    .eq("id", bookingId)
    .single();
  if (error || !data) return null;
  return {
    id: data.id,
    booking_ref: data.booking_ref,
    devotee_name: data.devotee_name,
    phone: data.phone,
    lang: data.lang,
    amount_paise: data.amount_paise,
    event_date: data.pooja_dates.event_date,
    pooja_name_en: data.poojas.name_en,
    pooja_name_kn: data.poojas.name_kn,
  };
}
