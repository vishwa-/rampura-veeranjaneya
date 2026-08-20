// Capacity race test: fires N concurrent bookings at one pooja date.
// Exactly `capacity` of them should succeed; the rest must get sold_out.
//
//   node scripts/race-test.mjs https://<preview-url> <pooja_date_id> [n]
//
// Cleanup: the created holds expire on their own after 30 minutes.

const [base, dateId, nArg] = process.argv.slice(2);
if (!base || !dateId) {
  console.error("usage: node scripts/race-test.mjs <base-url> <pooja_date_id> [n]");
  process.exit(1);
}
const n = Number(nArg) || 10;

const results = await Promise.all(
  Array.from({ length: n }, (_, i) =>
    fetch(`${base}/api/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pooja_date_id: dateId,
        name: `Race Tester ${i}`,
        phone: `98${String(45000000 + i)}`, // distinct phones
        lang: "en",
        website: "",
      }),
    })
      .then(async (r) => ({ status: r.status, body: await r.json() }))
      .catch((e) => ({ status: 0, body: { error: e.message } }))
  )
);

const ok = results.filter((r) => r.status === 200).length;
const soldOut = results.filter((r) => r.body.error === "sold_out").length;
const other = results.filter((r) => r.status !== 200 && r.body.error !== "sold_out");
console.log(`${n} concurrent requests -> ${ok} succeeded, ${soldOut} sold_out`);
if (other.length) console.log("other responses:", other);
