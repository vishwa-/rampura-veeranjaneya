import { NextResponse } from "next/server";
import { timingSafeEqualHex, hmacSha256Hex, createAdminToken } from "@/lib/util";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const password = typeof body?.password === "string" ? body.password : "";

    // Master password from env, with fallbacks if env is missing
    const masterPassword =
      process.env.ADMIN_PASSWORD ||
      process.env.CRON_SECRET ||
      "rampura@2026";

    // Timing-safe verification
    const hashProvided = hmacSha256Hex("rampura-salt", password.trim());
    const hashExpected = hmacSha256Hex("rampura-salt", masterPassword.trim());

    if (!timingSafeEqualHex(hashProvided, hashExpected)) {
      return NextResponse.json({ error: "invalid_password" }, { status: 401 });
    }

    const token = createAdminToken();

    return NextResponse.json({
      ok: true,
      token,
      email: "srikshetrarampura@gmail.com",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "server_error", message: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
