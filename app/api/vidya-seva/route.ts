import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { db } from "@/lib/supabase";
import { normalizePhone, cleanField, istDate } from "@/lib/util";
import { calcVidyaSevaTotalPaise, formatVidyaSevaSummary } from "@/lib/vidya-seva";
import { VidyaSevaItemSelection } from "@/lib/types";

export const dynamic = "force-dynamic";

function generateVidyaSevaRef(): string {
  const dateStr = istDate().replace(/-/g, "");
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `VS-${dateStr}-${rand}`;
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
      return NextResponse.json(
        { error: "bad_request", message: "Name and valid 10-digit WhatsApp phone number are required" },
        { status: 400 }
      );
    }

    // Clean item quantities
    const rawItems = body.items || {};
    const items: VidyaSevaItemSelection = {
      combo: Math.max(0, Math.floor(Number(rawItems.combo) || 0)),
      book: Math.max(0, Math.floor(Number(rawItems.book) || 0)),
      pencil: Math.max(0, Math.floor(Number(rawItems.pencil) || 0)),
      pen: Math.max(0, Math.floor(Number(rawItems.pen) || 0)),
    };

    const totalAmountPaise = calcVidyaSevaTotalPaise(items);

    if (totalAmountPaise < 1500) {
      return NextResponse.json(
        { error: "invalid_items", message: "Please select at least one item to offer for Vidhya Seva." },
        { status: 400 }
      );
    }

    const email = cleanField(body.email, 160);
    const gotra = cleanField(body.gotra, 80);
    const nakshatra = cleanField(body.nakshatra, 80);
    const rashi = cleanField(body.rashi, 80);
    const note = cleanField(body.note, 500);
    const lang = body.lang === "en" ? "en" : "kn";

    const bookingRef = generateVidyaSevaRef();
    const supa = db();

    // Insert pending record into database
    const { data: record, error: dbError } = await supa
      .from("vidya_sevas")
      .insert({
        booking_ref: bookingRef,
        devotee_name: name,
        phone,
        email,
        gotra,
        nakshatra,
        rashi,
        note,
        lang,
        items,
        total_amount_paise: totalAmountPaise,
        status: "pending",
      })
      .select()
      .single();

    if (dbError || !record) {
      console.error("[VidyaSeva DB insert error]:", dbError);
      return NextResponse.json({ error: "server_error", message: "Could not record offering. Please try again." }, { status: 500 });
    }

    const hasRazorpay = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
    let orderId: string | null = null;

    if (hasRazorpay) {
      const auth = Buffer.from(
        `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
      ).toString("base64");

      const itemsSummary = formatVidyaSevaSummary(items);

      try {
        const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmountPaise,
            currency: "INR",
            receipt: bookingRef,
            notes: {
              booking_ref: bookingRef,
              type: "Vidhya Seva",
              devotee_name: name,
              phone,
              items: itemsSummary,
              gotra: gotra || "N/A",
            },
          }),
        });

        const order = await rzpRes.json();
        if (!rzpRes.ok || !order.id) {
          throw new Error(order.error?.description || "Order creation failed");
        }
        orderId = order.id;

        // Attach order ID to record
        await supa
          .from("vidya_sevas")
          .update({ razorpay_order_id: orderId })
          .eq("id", record.id);
      } catch (err) {
        console.error("[Razorpay Order Creation Failed for Vidya Seva]:", err);
        await supa
          .from("vidya_sevas")
          .update({ status: "cancelled" })
          .eq("id", record.id);
        return NextResponse.json({ error: "payment_unavailable", message: "Payment service is currently unavailable. Please try again shortly." }, { status: 502 });
      }
    }

    return NextResponse.json({
      order_id: orderId,
      has_gateway: hasRazorpay,
      amount_paise: totalAmountPaise,
      amount_rupees: totalAmountPaise / 100,
      key_id: process.env.RAZORPAY_KEY_ID || null,
      booking_ref: bookingRef,
      devotee_name: name,
      items,
      summary: formatVidyaSevaSummary(items, lang === "kn"),
      prefill: {
        name,
        contact: phone,
        email: email || undefined,
      },
    });
  } catch (err) {
    console.error("[VidyaSeva POST error]:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
