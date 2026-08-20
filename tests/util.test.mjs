import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizePhone,
  cleanField,
  istDate,
  hmacSha256Hex,
  timingSafeEqualHex,
  isValidDateStr,
  formatDate,
  formatRupees,
} from "../api/_lib/util.js";

test("normalizePhone accepts Indian mobiles in common formats", () => {
  assert.equal(normalizePhone("9845012345"), "+919845012345");
  assert.equal(normalizePhone("98450 12345"), "+919845012345");
  assert.equal(normalizePhone("+91 98450-12345"), "+919845012345");
  assert.equal(normalizePhone("919845012345"), "+919845012345");
  assert.equal(normalizePhone("09845012345"), "+919845012345");
});

test("normalizePhone rejects invalid numbers", () => {
  assert.equal(normalizePhone("12345"), null);
  assert.equal(normalizePhone("5845012345"), null); // starts with 5
  assert.equal(normalizePhone("98450123456"), null); // 11 digits
  assert.equal(normalizePhone(""), null);
  assert.equal(normalizePhone(12345), null);
});

test("cleanField trims, caps length, and nulls empties", () => {
  assert.equal(cleanField("  hello  ", 10), "hello");
  assert.equal(cleanField("x".repeat(20), 5), "xxxxx");
  assert.equal(cleanField("   ", 10), null);
  assert.equal(cleanField(undefined, 10), null);
});

test("istDate returns YYYY-MM-DD and tomorrow is one day ahead", () => {
  const today = istDate();
  const tomorrow = istDate(1);
  assert.match(today, /^\d{4}-\d{2}-\d{2}$/);
  const diff = (Date.parse(tomorrow) - Date.parse(today)) / 86400000;
  assert.equal(diff, 1);
});

test("Razorpay-style signature verification round-trips", () => {
  const secret = "test_secret";
  const payload = "order_abc|pay_xyz";
  const sig = hmacSha256Hex(secret, payload);
  assert.equal(timingSafeEqualHex(sig, hmacSha256Hex(secret, payload)), true);
  assert.equal(timingSafeEqualHex(sig, hmacSha256Hex("wrong", payload)), false);
  assert.equal(timingSafeEqualHex(sig, "short"), false);
  assert.equal(timingSafeEqualHex(undefined, sig), false);
});

test("isValidDateStr", () => {
  assert.equal(isValidDateStr("2026-08-29"), true);
  assert.equal(isValidDateStr("2026-8-29"), false);
  assert.equal(isValidDateStr("not-a-date"), false);
  assert.equal(isValidDateStr(20260829), false);
});

test("formatDate renders both languages with correct weekday", () => {
  assert.equal(formatDate("2026-08-29", "en"), "Saturday, 29 August 2026");
  assert.equal(formatDate("2026-08-29", "kn"), "ಶನಿವಾರ, 29 ಆಗಸ್ಟ್ 2026");
});

test("formatRupees uses Indian digit grouping", () => {
  assert.equal(formatRupees(350000), "3,500");
  assert.equal(formatRupees(12345678), "1,23,456.78");
});
