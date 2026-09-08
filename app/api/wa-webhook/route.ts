import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { hmacSha256Hex, timingSafeEqualHex } from "@/lib/util";

const STATUS_RANK: Record<string, number> = { queued: 0, sent: 1, delivered: 2, read: 3, failed: 4 };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const verifyToken = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && verifyToken === process.env.WA_VERIFY_TOKEN) {
    return new NextResponse(challenge || "", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json({ error: "forbidden" }, { status: 403 });
}

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    const header = request.headers.get("x-hub-signature-256") || "";
    const expected = "sha256=" + hmacSha256Hex(process.env.WA_APP_SECRET || "", raw);

    if (!timingSafeEqualHex(expected, header)) {
      return NextResponse.json({ error: "bad_signature" }, { status: 401 });
    }

    let body: any;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    const supa = db();
    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        for (const s of change.value?.statuses || []) {
          if (!s.id || STATUS_RANK[s.status] === undefined) continue;
          const { data: row } = await supa
            .from("wa_messages")
            .select("id, status")
            .eq("wa_message_id", s.id)
            .single();

          if (!row) continue;

          if (s.status !== "failed" && STATUS_RANK[s.status] <= STATUS_RANK[row.status]) {
            continue;
          }

          await supa
            .from("wa_messages")
            .update({
              status: s.status,
              error: s.errors?.[0]?.title || null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", row.id);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
