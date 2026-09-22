import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supa = db();
    const { data: poojas, error } = await supa
      .from("poojas")
      .select("id, slug, name_en, name_kn, desc_en, desc_kn, amount_paise, capacity, active, created_at")
      .eq("active", true)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: "server_error" }, { status: 500 });
    }

    return NextResponse.json(
      { poojas: poojas || [] },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
