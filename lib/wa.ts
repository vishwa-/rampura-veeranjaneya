import { db } from "./supabase";
import { formatDate, formatRupees } from "./util";

const GRAPH = "https://graph.facebook.com/v20.0";

export interface BookingForWa {
  id: string;
  booking_ref: string;
  devotee_name: string;
  phone: string;
  lang: string;
  amount_paise: number;
  event_date: string;
  pooja_name_en: string;
  pooja_name_kn: string;
}

export async function sendTemplate(
  booking: BookingForWa,
  kind: "confirmation" | "reminder",
  { force = false } = {}
): Promise<{ sent: boolean; error: string | null; duplicate?: boolean }> {
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
  const params: Array<string | number> = [
    booking.devotee_name,
    poojaName,
    formatDate(booking.event_date, lang),
    booking.booking_ref,
  ];
  if (kind === "confirmation") params.push(formatRupees(booking.amount_paise));

  let waId: string | null = null;
  let status = "sent";
  let errText: string | null = null;
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
    const body = await res.json().catch(() => ({})) as { messages?: Array<{ id: string }>; error?: { code: number; message: string } };
    if (res.ok && body.messages && body.messages[0]) {
      waId = body.messages[0].id;
    } else {
      status = "failed";
      errText = body.error ? `${body.error.code}: ${body.error.message}` : `HTTP ${res.status}`;
    }
  } catch (e: any) {
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

export async function loadBookingForWa(bookingId: string): Promise<BookingForWa | null> {
  const supa = db();
  const { data, error } = await supa
    .from("bookings")
    .select(
      "id, booking_ref, devotee_name, phone, lang, amount_paise, pooja_dates(event_date), poojas(name_en, name_kn)"
    )
    .eq("id", bookingId)
    .single();
  if (error || !data) return null;
  const pd = data.pooja_dates as any;
  const p = data.poojas as any;
  return {
    id: data.id,
    booking_ref: data.booking_ref,
    devotee_name: data.devotee_name,
    phone: data.phone,
    lang: data.lang,
    amount_paise: data.amount_paise,
    event_date: Array.isArray(pd) ? pd[0]?.event_date : pd?.event_date,
    pooja_name_en: Array.isArray(p) ? p[0]?.name_en : p?.name_en,
    pooja_name_kn: Array.isArray(p) ? p[0]?.name_kn : p?.name_kn,
  };
}
