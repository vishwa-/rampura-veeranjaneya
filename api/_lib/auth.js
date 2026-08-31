import { db } from "./db.js";

// Verifies the Supabase access token from the Authorization header and
// checks the email against the ADMIN_EMAILS allowlist.
// Returns { email } on success, or a status code on failure.
export async function requireAdmin(req) {
  const header = req.headers["authorization"] || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return { status: 401 };

  const { data, error } = await db().auth.getUser(token);
  if (error || !data?.user?.email) return { status: 401 };

  const allowed = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const email = data.user.email.toLowerCase();
  if (!allowed.includes(email)) return { status: 403 };

  return { email };
}
