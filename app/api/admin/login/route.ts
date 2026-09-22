import { NextResponse } from "next/server";
import { timingSafeEqualHex, hmacSha256Hex, createAdminToken } from "@/lib/util";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const password = typeof body?.password === "string" ? body.password : "";

    const masterPassword = process.env.ADMIN_PASSWORD;
    if (!masterPassword) {
      return NextResponse.json(
        { error: "admin_password_not_configured" },
        { status: 500 }
      );
    }

    // Compare hashes using timingSafeEqual to avoid timing side-channels
    const hashProvided = hmacSha256Hex("rampura-salt", password);
    const hashExpected = hmacSha256Hex("rampura-salt", masterPassword);

    if (!timingSafeEqualHex(hashProvided, hashExpected)) {
      return NextResponse.json({ error: "invalid_password" }, { status: 401 });
    }

    const token = createAdminToken();

    return NextResponse.json({
      ok: true,
      token,
      email: "admin@srikshetrarampura.in",
    });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
