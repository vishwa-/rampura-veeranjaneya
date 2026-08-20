/* Admin panel for pooja bookings. English-only, root-level page, noindex.
   Auth: Supabase email/password; every API call re-verifies the JWT
   server-side against the ADMIN_EMAILS allowlist.
   All devotee-supplied text is rendered with textContent (never innerHTML). */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Public identifiers (not secrets): fill in after creating the Supabase project.
const SUPABASE_URL = "REPLACE_WITH_SUPABASE_URL";
const SUPABASE_ANON_KEY = "REPLACE_WITH_SUPABASE_ANON_KEY";

const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const $ = (id) => document.getElementById(id);

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
const rupees = (paise) => "₹" + (paise / 100).toLocaleString("en-IN");

async function api(action, { method = "GET", body, raw = false } = {}) {
  const { data } = await supa.auth.getSession();
  const token = data?.session?.access_token;
  // `action` may carry extra query params ("bookings.list&from=..."); all
  // values are URL-safe (dates, uuids, enum strings), so no encoding needed.
  const res = await fetch(`/api/admin?action=${action}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401 || res.status === 403) {
    await supa.auth.signOut();
    location.reload();
    throw new Error("unauthorized");
  }
  if (raw) return res;
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "server_error");
  return json;
}

/* ---------- auth ---------- */

$("adLoginForm").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const f = ev.target.elements;
  $("adLoginStatus").textContent = "";
  const { error } = await supa.auth.signInWithPassword({
    email: f.email.value.trim(),
    password: f.password.value,
  });
  if (error) {
    $("adLoginStatus").textContent = "Sign-in failed: " + error.message;
    return;
  }
  boot();
});

$("adSignOut").addEventListener("click", async () => {
  await supa.auth.signOut();
  location.reload();
});

/* ---------- tabs ---------- */

document.querySelectorAll(".ad-tab[data-tab]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".ad-tab[data-tab]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    ["Bookings", "Dates", "Poojas"].forEach((t) =>
      $("adTab" + t).classList.toggle("ad-hidden", btn.dataset.tab !== t.toLowerCase())
    );
  });
});

/* ---------- poojas ---------- */

let poojas = [];

async function loadPoojas() {
  ({ poojas } = await api("poojas.list"));
  const tbody = $("adPoojasTable").querySelector("tbody");
  tbody.textContent = "";
  for (const p of poojas) {
    const tr = document.createElement("tr");
    const nameTd = el("td");
    nameTd.appendChild(el("div", null, p.name_en));
    nameTd.appendChild(el("div", "ad-note font-kn", p.name_kn));
    nameTd.appendChild(el("div", "ad-note", p.slug));
    tr.appendChild(nameTd);
    tr.appendChild(el("td", "numeral", rupees(p.amount_paise)));
    tr.appendChild(el("td", null, p.capacity == null ? "Unlimited" : String(p.capacity)));
    tr.appendChild(el("td", null, p.active ? "Yes" : "No"));
    const editTd = el("td");
    const edit = el("button", "btn btn-ghost", "Edit");
    edit.type = "button";
    edit.onclick = () => fillPoojaForm(p);
    editTd.appendChild(edit);
    tr.appendChild(editTd);
    tbody.appendChild(tr);
  }
  for (const sel of [$("adFilterPooja"), $("adGenPooja")]) {
    const current = sel.value;
    sel.textContent = "";
    if (sel.id === "adFilterPooja") sel.appendChild(new Option("All", ""));
    for (const p of poojas) sel.appendChild(new Option(p.name_en, p.id));
    if (current) sel.value = current;
  }
}

function fillPoojaForm(p) {
  const f = $("adPoojaForm").elements;
  $("adPoojaFormTitle").textContent = "Edit pooja";
  f.id.value = p.id;
  f.name_en.value = p.name_en;
  f.name_kn.value = p.name_kn;
  f.desc_en.value = p.desc_en || "";
  f.desc_kn.value = p.desc_kn || "";
  f.slug.value = p.slug;
  f.rupees.value = p.amount_paise / 100;
  f.capacity.value = p.capacity ?? "";
  f.active.checked = p.active;
}

$("adPoojaReset").addEventListener("click", () => {
  $("adPoojaForm").reset();
  $("adPoojaForm").elements.id.value = "";
  $("adPoojaFormTitle").textContent = "New pooja";
});

$("adPoojaForm").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const f = ev.target.elements;
  $("adPoojaStatus").textContent = "Saving…";
  try {
    await api("poojas.save", {
      method: "POST",
      body: {
        id: f.id.value || undefined,
        name_en: f.name_en.value,
        name_kn: f.name_kn.value,
        desc_en: f.desc_en.value,
        desc_kn: f.desc_kn.value,
        slug: f.slug.value,
        amount_paise: Math.round(Number(f.rupees.value) * 100),
        capacity: f.capacity.value === "" ? null : Number(f.capacity.value),
        active: f.active.checked,
      },
    });
    $("adPoojaStatus").textContent = "Saved.";
    await loadPoojas();
  } catch (e) {
    $("adPoojaStatus").textContent = "Save failed: " + e.message;
  }
});

/* ---------- dates ---------- */

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let genDates = [];

function buildDayToggles() {
  const wrap = $("adGenDays");
  DOW.forEach((d, i) => {
    const label = el("label", null, d);
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = i;
    label.prepend(input);
    label.addEventListener("click", (ev) => {
      ev.preventDefault();
      input.checked = !input.checked;
      label.classList.toggle("on", input.checked);
    });
    wrap.appendChild(label);
  });
}

function expandDates() {
  const from = $("adGenFrom").value;
  const to = $("adGenTo").value || from;
  if (!from) return [];
  const days = [...$("adGenDays").querySelectorAll("input:checked")].map((i) => +i.value);
  if (!days.length) return [from];
  const out = [];
  const d = new Date(from + "T00:00:00Z");
  const end = new Date(to + "T00:00:00Z");
  while (d <= end && out.length < 120) {
    if (days.includes(d.getUTCDay())) out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

$("adGenPreview").addEventListener("click", () => {
  genDates = expandDates();
  const chips = $("adGenChips");
  chips.textContent = "";
  genDates.forEach((d) => chips.appendChild(el("span", "ad-pill", d)));
  $("adGenStatus").textContent = genDates.length ? `${genDates.length} date(s)` : "Pick a From date.";
  $("adGenCreate").disabled = !genDates.length || !$("adGenPooja").value;
});

$("adGenCreate").addEventListener("click", async () => {
  $("adGenStatus").textContent = "Adding…";
  try {
    await api("dates.create", {
      method: "POST",
      body: { pooja_id: $("adGenPooja").value, dates: genDates },
    });
    $("adGenStatus").textContent = "Added (existing dates skipped).";
    $("adGenChips").textContent = "";
    $("adGenCreate").disabled = true;
    await loadDates();
  } catch (e) {
    $("adGenStatus").textContent = "Failed: " + e.message;
  }
});

function confirmDialog(nodes) {
  return new Promise((resolve) => {
    const dlg = $("adDialog");
    const body = $("adDialogBody");
    body.textContent = "";
    nodes.forEach((n) => body.appendChild(n));
    dlg.showModal();
    $("adDialogOk").onclick = () => { dlg.close(); resolve(true); };
    $("adDialogCancel").onclick = () => { dlg.close(); resolve(false); };
  });
}

async function loadDates() {
  const today = new Date().toISOString().slice(0, 10);
  const { dates } = await api(`dates.list&from=${today}`);
  const tbody = $("adDatesTable").querySelector("tbody");
  tbody.textContent = "";
  for (const d of dates) {
    const tr = document.createElement("tr");
    tr.appendChild(el("td", "numeral", d.event_date));
    tr.appendChild(el("td", null, d.poojas.name_en));
    tr.appendChild(el("td")).appendChild(el("span", "ad-pill " + d.status, d.status));
    tr.appendChild(el("td", null, String(d.counts.paid)));
    tr.appendChild(el("td", null, String(d.counts.pending)));
    tr.appendChild(el("td", null, d.poojas.capacity == null ? "∞" : String(d.poojas.capacity)));
    const actions = el("td");
    if (d.status === "open") {
      const close = el("button", "btn btn-ghost", "Close");
      close.type = "button";
      close.onclick = () => setDateStatus(d, "closed");
      actions.appendChild(close);
      const cancel = el("button", "btn btn-ghost", "Cancel");
      cancel.type = "button";
      cancel.style.color = "var(--danger-500)";
      cancel.onclick = () => setDateStatus(d, "cancelled");
      actions.appendChild(cancel);
    } else if (d.status === "closed") {
      const open = el("button", "btn btn-ghost", "Reopen");
      open.type = "button";
      open.onclick = () => setDateStatus(d, "open");
      actions.appendChild(open);
    }
    tr.appendChild(actions);
    tbody.appendChild(tr);
  }
}

async function setDateStatus(d, status) {
  if (status === "cancelled") {
    const ok = await confirmDialog([
      el("div", "eyebrow", "Cancel this pooja date?"),
      el("p", "mt-3 text-sm", `${d.poojas.name_en} on ${d.event_date}. Paid devotees must be called and refunded from the Razorpay dashboard.`),
    ]);
    if (!ok) return;
  }
  const { affected } = await api("dates.setStatus", {
    method: "POST",
    body: { date_id: d.id, status },
  });
  if (affected && affected.length) {
    const nodes = [
      el("div", "eyebrow", `${affected.length} paid booking(s) affected`),
      el("p", "mt-2 ad-note", "Call each devotee, then refund from the Razorpay dashboard (the site updates automatically)."),
    ];
    for (const b of affected) {
      const row = el("p", "mt-2 text-sm");
      row.appendChild(el("span", null, `${b.booking_ref} · ${b.devotee_name} · ${rupees(b.amount_paise)} · `));
      const a = el("a", "text-accent", b.phone);
      a.href = "tel:" + b.phone;
      row.appendChild(a);
      nodes.push(row);
    }
    await confirmDialog(nodes);
  }
  await loadDates();
}

/* ---------- bookings ---------- */

function bookingFilters() {
  const q = [];
  if ($("adFrom").value) q.push("from=" + $("adFrom").value);
  if ($("adTo").value) q.push("to=" + $("adTo").value);
  if ($("adFilterPooja").value) q.push("pooja_id=" + $("adFilterPooja").value);
  if ($("adFilterStatus").value) q.push("status=" + $("adFilterStatus").value);
  return q.length ? "&" + q.join("&") : "";
}

async function loadBookings() {
  const { bookings } = await api("bookings.list" + bookingFilters());
  const tbody = $("adBookingsTable").querySelector("tbody");
  tbody.textContent = "";
  $("adBookingsEmpty").classList.toggle("ad-hidden", bookings.length > 0);
  for (const b of bookings) {
    const tr = document.createElement("tr");
    tr.appendChild(el("td", "numeral", b.pooja_dates.event_date));
    tr.appendChild(el("td", null, b.poojas.name_en));
    tr.appendChild(el("td", "numeral", b.booking_ref));
    tr.appendChild(el("td", null, b.devotee_name));
    const phoneTd = el("td");
    const tel = el("a", "text-accent", b.phone);
    tel.href = "tel:" + b.phone;
    phoneTd.appendChild(tel);
    tr.appendChild(phoneTd);
    const sank = el("td", "ad-note");
    sank.textContent = [b.gotra, b.nakshatra, b.rashi, b.family_names]
      .filter(Boolean)
      .join(" · ");
    tr.appendChild(sank);
    tr.appendChild(el("td", "numeral", rupees(b.amount_paise)));
    const statusTd = el("td");
    statusTd.appendChild(el("span", "ad-pill " + b.status, b.status));
    if (b.needs_review) statusTd.appendChild(el("span", "ad-pill review", "review"));
    tr.appendChild(statusTd);
    const waTd = el("td");
    for (const kind of ["confirmation", "reminder"]) {
      const m = b.wa_messages.find((x) => x.kind === kind);
      if (m) {
        const line = el("div", "ad-wa " + m.status, `${kind}: ${m.status}`);
        if (m.error) line.title = m.error;
        waTd.appendChild(line);
      }
    }
    tr.appendChild(waTd);
    const act = el("td");
    if (b.status === "paid") {
      const resend = el("button", "btn btn-ghost", "Resend WA");
      resend.type = "button";
      resend.onclick = async () => {
        resend.disabled = true;
        resend.textContent = "Sending…";
        try {
          const r = await api("wa.resend", { method: "POST", body: { booking_id: b.id } });
          resend.textContent = r.sent ? "Sent ✓" : "Failed";
        } catch {
          resend.textContent = "Failed";
        }
      };
      act.appendChild(resend);
    }
    tr.appendChild(act);
    tbody.appendChild(tr);
  }
}

$("adApply").addEventListener("click", loadBookings);

$("adCsv").addEventListener("click", async () => {
  const res = await api("bookings.csv" + bookingFilters(), { raw: true });
  const blob = await res.blob();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "bookings.csv";
  a.click();
  URL.revokeObjectURL(a.href);
});

/* ---------- boot ---------- */

async function boot() {
  const { data } = await supa.auth.getSession();
  if (!data?.session) return;
  try {
    await loadPoojas();
  } catch {
    return; // api() reloads on 401/403
  }
  $("adWho").textContent = data.session.user.email;
  $("adLogin").classList.add("ad-hidden");
  $("adApp").classList.remove("ad-hidden");
  buildDayToggles();
  await Promise.all([loadBookings(), loadDates()]);
}

boot();
