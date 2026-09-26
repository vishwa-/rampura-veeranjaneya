"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getBrowserSupabase } from "@/lib/supabase";
import { Pooja, Booking } from "@/lib/types";

const rupees = (paise: number) => "₹" + (paise / 100).toLocaleString("en-IN");

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const AdminDashboard: React.FC = () => {
  const supa = getBrowserSupabase();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Auth State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  // Navigation Tab
  const [activeTab, setActiveTab] = useState<"bookings" | "dates" | "poojas">("bookings");

  // Poojas State
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [poojaForm, setPoojaForm] = useState({
    id: "",
    name_en: "",
    name_kn: "",
    desc_en: "",
    desc_kn: "",
    slug: "",
    rupees: "",
    capacity: "",
    active: true,
  });
  const [poojaStatus, setPoojaStatus] = useState("");

  // Dates State & Generator
  const [datesList, setDatesList] = useState<any[]>([]);
  const [genPooja, setGenPooja] = useState("");
  const [schedulePattern, setSchedulePattern] = useState<"everyday" | "weekdays" | "single">("everyday");
  const [durationPreset, setDurationPreset] = useState<"1m" | "3m" | "6m" | "1y" | "custom">("1y");
  const [genFrom, setGenFrom] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  });
  const [genTo, setGenTo] = useState("");
  const [genDays, setGenDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [genDatesPreview, setGenDatesPreview] = useState<string[]>([]);
  const [genStatus, setGenStatus] = useState("");
  const [showAllPreview, setShowAllPreview] = useState(false);
  const [isAddingDates, setIsAddingDates] = useState(false);
  const [filterDatesPooja, setFilterDatesPooja] = useState("");

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterPooja, setFilterPooja] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Dialog Modal State
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    description: string;
    details?: string[];
    onConfirm: () => void;
  } | null>(null);

  const [passwordInput, setPasswordInput] = useState("");
  const [adminToken, setAdminToken] = useState<string | null>(null);

  const apiCall = useCallback(
    async (action: string, { method = "GET", body, raw = false }: { method?: string; body?: any; raw?: boolean } = {}) => {
      let token = adminToken;
      if (!token && typeof window !== "undefined") {
        token = localStorage.getItem("rmp_admin_token");
      }
      if (!token) {
        const { data } = await supa.auth.getSession();
        token = data?.session?.access_token || null;
      }

      const res = await fetch(`/api/admin?action=${action}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(body ? { "Content-Type": "application/json" } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (res.status === 401 || res.status === 403) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("rmp_admin_token");
        }
        await supa.auth.signOut();
        setAdminToken(null);
        setSession(null);
        throw new Error("unauthorized");
      }

      if (raw) return res;
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "server_error");
      return json;
    },
    [supa, adminToken]
  );

  const loadPoojas = useCallback(async () => {
    try {
      const res = await apiCall("poojas.list");
      setPoojas(res.poojas || []);
      if (res.poojas?.length && !genPooja) {
        setGenPooja(res.poojas[0].id);
      }
    } catch {
      // Handled in apiCall
    }
  }, [apiCall, genPooja]);

  const loadDates = useCallback(async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const res = await apiCall(`dates.list&from=${today}`);
      setDatesList(res.dates || []);
    } catch {
      // Handled
    }
  }, [apiCall]);

  const loadBookings = useCallback(async () => {
    try {
      const queryParams = [];
      if (filterFrom) queryParams.push(`from=${filterFrom}`);
      if (filterTo) queryParams.push(`to=${filterTo}`);
      if (filterPooja) queryParams.push(`pooja_id=${filterPooja}`);
      if (filterStatus) queryParams.push(`status=${filterStatus}`);
      const qs = queryParams.length ? `&${queryParams.join("&")}` : "";

      const res = await apiCall(`bookings.list${qs}`);
      setBookings(res.bookings || []);
    } catch {
      // Handled
    }
  }, [apiCall, filterFrom, filterTo, filterPooja, filterStatus]);

  useEffect(() => {
    // Check master password token
    try {
      const savedToken = localStorage.getItem("rmp_admin_token");
      if (savedToken) {
        setAdminToken(savedToken);
        setSession({ user: { email: "admin@srikshetrarampura.in" } });
        setLoading(false);
        return;
      }
    } catch {}

    supa.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: authListener } = supa.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });

    return () => authListener.subscription.unsubscribe();
  }, [supa]);

  useEffect(() => {
    if (session) {
      loadPoojas();
      loadDates();
      loadBookings();
    }
  }, [session, loadPoojas, loadDates, loadBookings]);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        if (data.error === "invalid_password") {
          setLoginStatus("Incorrect password. Please try again.");
        } else if (data.message) {
          setLoginStatus(`Login error: ${data.message}`);
        } else {
          setLoginStatus("Sign-in failed. Please check ADMIN_PASSWORD in environment.");
        }
        return;
      }
      localStorage.setItem("rmp_admin_token", data.token);
      setAdminToken(data.token);
      setSession({ user: { email: data.email } });
      setPasswordInput("");
    } catch {
      setLoginStatus("Connection failed. Please check internet connection.");
    }
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem("rmp_admin_token");
    } catch {}
    setAdminToken(null);
    await supa.auth.signOut();
    setSession(null);
  };

  // Pooja Save
  const handlePoojaSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPoojaStatus("Saving…");
    try {
      await apiCall("poojas.save", {
        method: "POST",
        body: {
          id: poojaForm.id || undefined,
          name_en: poojaForm.name_en,
          name_kn: poojaForm.name_kn,
          desc_en: poojaForm.desc_en,
          desc_kn: poojaForm.desc_kn,
          slug: poojaForm.slug,
          amount_paise: Math.round(Number(poojaForm.rupees) * 100),
          capacity: poojaForm.capacity === "" ? null : Number(poojaForm.capacity),
          active: poojaForm.active,
        },
      });
      setPoojaStatus("Saved.");
      loadPoojas();
      handlePoojaReset();
    } catch (err: any) {
      setPoojaStatus("Save failed: " + err.message);
    }
  };

  const handlePoojaReset = () => {
    setPoojaForm({
      id: "",
      name_en: "",
      name_kn: "",
      desc_en: "",
      desc_kn: "",
      slug: "",
      rupees: "",
      capacity: "",
      active: true,
    });
  };

  const handlePoojaEdit = (p: Pooja) => {
    setPoojaForm({
      id: p.id,
      name_en: p.name_en,
      name_kn: p.name_kn,
      desc_en: p.desc_en || "",
      desc_kn: p.desc_kn || "",
      slug: p.slug,
      rupees: String(p.amount_paise / 100),
      capacity: p.capacity != null ? String(p.capacity) : "",
      active: p.active,
    });
  };

  // Dates Generator Helpers
  const getTodayStr = useCallback(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }, []);

  const addDaysStr = useCallback((startDateStr: string, days: number) => {
    const base = startDateStr || getTodayStr();
    const [y, m, d] = base.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  }, [getTodayStr]);

  const expandDates = useCallback(() => {
    const from = genFrom || getTodayStr();
    if (schedulePattern === "single") {
      return [from];
    }

    let to = "";
    if (durationPreset === "1m") to = addDaysStr(from, 30);
    else if (durationPreset === "3m") to = addDaysStr(from, 90);
    else if (durationPreset === "6m") to = addDaysStr(from, 180);
    else if (durationPreset === "1y") to = addDaysStr(from, 365);
    else to = genTo || addDaysStr(from, 30);

    const activeDays = schedulePattern === "everyday" ? [0, 1, 2, 3, 4, 5, 6] : genDays;
    if (!activeDays.length) return [];

    const out: string[] = [];
    const [sy, sm, sd] = from.split("-").map(Number);
    const [ey, em, ed] = to.split("-").map(Number);
    const curr = new Date(Date.UTC(sy, sm - 1, sd));
    const end = new Date(Date.UTC(ey, em - 1, ed));

    while (curr <= end && out.length < 500) {
      if (activeDays.includes(curr.getUTCDay())) {
        out.push(curr.toISOString().slice(0, 10));
      }
      curr.setUTCDate(curr.getUTCDate() + 1);
    }
    return out;
  }, [genFrom, schedulePattern, durationPreset, genTo, genDays, addDaysStr, getTodayStr]);

  useEffect(() => {
    if (activeTab === "dates") {
      const dates = expandDates();
      setGenDatesPreview(dates);
    }
  }, [activeTab, expandDates]);

  const handleGenPreview = () => {
    const dates = expandDates();
    setGenDatesPreview(dates);
    setGenStatus(dates.length ? `${dates.length} date(s) ready` : "No dates match selection.");
  };

  const handleGenCreate = async () => {
    if (!genPooja) {
      setGenStatus("Please select a pooja first.");
      return;
    }
    const dates = genDatesPreview.length ? genDatesPreview : expandDates();
    if (!dates.length) {
      setGenStatus("No dates selected. Please choose days of the week or a duration.");
      return;
    }

    setIsAddingDates(true);
    setGenStatus(`Adding ${dates.length} date(s)…`);
    try {
      await apiCall("dates.create", {
        method: "POST",
        body: { pooja_id: genPooja, dates },
      });
      const poojaName = poojas.find((p) => p.id === genPooja)?.name_en || "Pooja";
      setGenStatus(`✓ Successfully added ${dates.length} dates for ${poojaName}! Existing dates were kept.`);
      loadDates();
    } catch (err: any) {
      setGenStatus("Failed: " + err.message);
    } finally {
      setIsAddingDates(false);
    }
  };

  const setDateStatus = async (d: any, status: string) => {
    if (status === "cancelled") {
      setDialogContent({
        title: "Cancel this pooja date?",
        description: `${d.poojas?.name_en} on ${d.event_date}. Paid devotees must be called and refunded from the Razorpay dashboard.`,
        onConfirm: async () => {
          setDialogContent(null);
          await performSetDateStatus(d, status);
        },
      });
      return;
    }
    await performSetDateStatus(d, status);
  };

  const performSetDateStatus = async (d: any, status: string) => {
    const res = await apiCall("dates.setStatus", {
      method: "POST",
      body: { date_id: d.id, status },
    });
    if (res.affected && res.affected.length) {
      setDialogContent({
        title: `${res.affected.length} paid booking(s) affected`,
        description: "Call each devotee, then refund from the Razorpay dashboard (the site updates automatically).",
        details: res.affected.map((b: any) => `${b.booking_ref} · ${b.devotee_name} · ${rupees(b.amount_paise)} · ${b.phone}`),
        onConfirm: () => setDialogContent(null),
      });
    }
    loadDates();
  };

  // Export CSV
  const handleExportCsv = async () => {
    const queryParams = [];
    if (filterFrom) queryParams.push(`from=${filterFrom}`);
    if (filterTo) queryParams.push(`to=${filterTo}`);
    if (filterPooja) queryParams.push(`pooja_id=${filterPooja}`);
    if (filterStatus) queryParams.push(`status=${filterStatus}`);
    const qs = queryParams.length ? `&${queryParams.join("&")}` : "";

    const res = await apiCall(`bookings.csv${qs}`, { raw: true });
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "bookings.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // WhatsApp Resend
  const handleResendWa = async (bookingId: string, btnEl: HTMLButtonElement) => {
    btnEl.disabled = true;
    btnEl.textContent = "Sending…";
    try {
      const res = await apiCall("wa.resend", { method: "POST", body: { booking_id: bookingId } });
      btnEl.textContent = res.sent ? "Sent ✓" : "Failed";
    } catch {
      btnEl.textContent = "Failed";
    }
  };

  if (loading) {
    return <main className="wrap py-12"><p className="text-muted">Loading administrative console…</p></main>;
  }

  return (
    <main className="wrap" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="eyebrow">Temple office</div>
          <h1 className="display text-3xl sm:text-4xl mt-2">Pooja bookings</h1>
        </div>
        <div id="adWho" className="ad-note">
          {session?.user?.email}
        </div>
      </div>

      {/* Login Screen (Dark Modal matching reference) */}
      {!session && (
        <section id="adLogin" className="mt-12 flex justify-center items-center">
          <div
            className="w-full max-w-md p-8 sm:p-10 text-center"
            style={{
              background: "#1E1E1E",
              borderRadius: "20px",
              boxShadow: "0 24px 60px -15px rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: "1.75rem",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                margin: "0 0 0.45rem",
              }}
            >
              Admin Login
            </h2>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.95rem",
                color: "#9CA3AF",
                marginBottom: "2rem",
              }}
            >
              Enter your password to continue
            </p>

            <form onSubmit={handlePasswordLogin} className="space-y-5 text-left">
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  autoFocus
                  autoComplete="current-password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    border: "1.5px solid #D97706",
                    borderRadius: "10px",
                    padding: "0.95rem 1.15rem",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#F59E0B";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245, 158, 11, 0.25)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#D97706";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#EAB308",
                  color: "#18181B",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  padding: "0.9rem",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s, transform 0.1s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FACC15")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#EAB308")}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.99)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Login
              </button>

              {loginStatus && (
                <div
                  className="text-sm text-center pt-2"
                  style={{ color: "#EF4444", fontWeight: 500 }}
                >
                  {loginStatus}
                </div>
              )}
            </form>
          </div>
        </section>
      )}

      {/* Admin App */}
      {session && (
        <section id="adApp" className="mt-10">
          <div className="ad-tabs">
            <button
              type="button"
              className={`ad-tab ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => setActiveTab("bookings")}
            >
              Bookings
            </button>
            <button
              type="button"
              className={`ad-tab ${activeTab === "dates" ? "active" : ""}`}
              onClick={() => setActiveTab("dates")}
            >
              Calendar dates
            </button>
            <button
              type="button"
              className={`ad-tab ${activeTab === "poojas" ? "active" : ""}`}
              onClick={() => setActiveTab("poojas")}
            >
              Poojas
            </button>
            <button
              type="button"
              id="adSignOut"
              className="ad-tab"
              style={{ marginLeft: "auto" }}
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div id="adTabBookings" className="mt-8">
              <div className="flex items-end gap-4 flex-wrap">
                <label className="block">
                  <span className="eyebrow">From</span>
                  <input
                    className="field mt-2"
                    type="date"
                    value={filterFrom}
                    onChange={(e) => setFilterFrom(e.target.value)}
                    style={{ maxWidth: 170 }}
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">To</span>
                  <input
                    className="field mt-2"
                    type="date"
                    value={filterTo}
                    onChange={(e) => setFilterTo(e.target.value)}
                    style={{ maxWidth: 170 }}
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">Pooja</span>
                  <select
                    className="field mt-2"
                    value={filterPooja}
                    onChange={(e) => setFilterPooja(e.target.value)}
                    style={{ maxWidth: 240 }}
                  >
                    <option value="">All</option>
                    {poojas.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name_en}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="eyebrow">Status</span>
                  <select
                    className="field mt-2"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ maxWidth: 160 }}
                  >
                    <option value="">All</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="refunded">Refunded</option>
                    <option value="expired">Expired</option>
                  </select>
                </label>
                <button type="button" onClick={loadBookings} className="btn btn-primary">
                  Apply
                </button>
                <button type="button" onClick={handleExportCsv} className="btn btn-secondary">
                  Export CSV
                </button>
              </div>

              <div className="mt-6 overflow-x-auto border border-line" style={{ borderRadius: "var(--radius-md)" }}>
                <table className="ad-table" id="adBookingsTable">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Pooja</th>
                      <th>Ref</th>
                      <th>Devotee</th>
                      <th>Phone</th>
                      <th>Sankalpa</th>
                      <th>₹</th>
                      <th>Status</th>
                      <th>WhatsApp</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td className="numeral">{b.pooja_dates?.event_date}</td>
                        <td>{b.poojas?.name_en}</td>
                        <td className="numeral">
                          <span className="font-semibold">{b.booking_ref}</span>
                          {b.razorpay_payment_id && (
                            <div className="text-[11px] text-accent tracking-normal font-mono opacity-80 mt-0.5" title={`Razorpay Payment ID: ${b.razorpay_payment_id}`}>
                              {b.razorpay_payment_id}
                            </div>
                          )}
                        </td>
                        <td>{b.devotee_name}</td>
                        <td>
                          <a className="text-accent" href={`tel:${b.phone}`}>
                            {b.phone}
                          </a>
                        </td>
                        <td className="ad-note">
                          {[b.gotra, b.nakshatra, b.rashi, b.family_names].filter(Boolean).join(" · ")}
                        </td>
                        <td className="numeral">{rupees(b.amount_paise)}</td>
                        <td>
                          <span className={`ad-pill ${b.status}`}>{b.status}</span>
                          {b.needs_review && <span className="ad-pill review">review</span>}
                        </td>
                        <td>
                          {["confirmation", "reminder"].map((kind) => {
                            const m = b.wa_messages?.find((x) => x.kind === kind);
                            if (!m) return null;
                            return (
                              <div key={kind} className={`ad-wa ${m.status}`} title={m.error || undefined}>
                                {kind}: {m.status}
                              </div>
                            );
                          })}
                        </td>
                        <td>
                          {b.status === "paid" && (
                            <button
                              type="button"
                              className="btn btn-ghost"
                              onClick={(e) => handleResendWa(b.id, e.currentTarget)}
                            >
                              Resend WA
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {bookings.length === 0 && <p className="ad-note mt-4">No bookings for this filter.</p>}
            </div>
          )}

          {/* Dates Tab */}
          {activeTab === "dates" && (() => {
            const filteredDates = filterDatesPooja
              ? datesList.filter((d) => d.pooja_id === filterDatesPooja)
              : datesList;
            const selectedPoojaObj = poojas.find((p) => p.id === genPooja);

            return (
              <div id="adTabDates" className="mt-8 space-y-8">
                {/* Add Dates Card */}
                <div className="border border-line bg-surface p-6 sm:p-8" style={{ borderRadius: "var(--radius-md)" }}>
                  <div>
                    <div className="eyebrow text-accent">Pooja Calendar Management</div>
                    <h2 className="display text-2xl mt-1">Schedule & Add Dates</h2>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      Easily schedule open dates for poojas. Select daily throughout the year, choose recurring weekdays (like Mon, Wed, Fri), or set single dates with zero manual date calculation.
                    </p>
                  </div>

                  <div className="rule-faint my-5"></div>

                  <div className="space-y-6">
                    {/* 1. Pooja Select */}
                    <div>
                      <label className="block">
                        <span className="eyebrow text-xs">1. Select Pooja</span>
                        <select
                          className="field mt-1.5 font-medium"
                          value={genPooja}
                          onChange={(e) => setGenPooja(e.target.value)}
                          style={{ maxWidth: 420 }}
                        >
                          {poojas.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name_en} {p.name_kn ? `· ${p.name_kn}` : ""} ({rupees(p.amount_paise)})
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    {/* 2. Frequency / Recurrence */}
                    <div>
                      <span className="eyebrow text-xs block mb-2">2. Schedule Frequency</span>
                      <div className="flex gap-2.5 flex-wrap">
                        <button
                          type="button"
                          className={`ad-freq-btn ${schedulePattern === "everyday" ? "active" : ""}`}
                          onClick={() => {
                            setSchedulePattern("everyday");
                            setGenDays([0, 1, 2, 3, 4, 5, 6]);
                          }}
                        >
                          ⚡ Every Day (Daily)
                        </button>
                        <button
                          type="button"
                          className={`ad-freq-btn ${schedulePattern === "weekdays" ? "active" : ""}`}
                          onClick={() => {
                            setSchedulePattern("weekdays");
                            if (!genDays.length) setGenDays([1, 2, 3, 4, 5]);
                          }}
                        >
                          📅 Specific Days of the Week
                        </button>
                        <button
                          type="button"
                          className={`ad-freq-btn ${schedulePattern === "single" ? "active" : ""}`}
                          onClick={() => {
                            setSchedulePattern("single");
                          }}
                        >
                          📌 Single Specific Date
                        </button>
                      </div>

                      {/* If Specific Days of the Week */}
                      {schedulePattern === "weekdays" && (
                        <div className="mt-4 p-4 border border-line bg-bg rounded-lg space-y-3">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-xs font-semibold uppercase text-accent tracking-wider">
                              Choose Weekdays:
                            </span>
                            <div className="flex gap-1.5 flex-wrap">
                              <button
                                type="button"
                                className="ad-chip-btn"
                                onClick={() => setGenDays([0, 1, 2, 3, 4, 5, 6])}
                              >
                                All 7 Days
                              </button>
                              <button
                                type="button"
                                className="ad-chip-btn"
                                onClick={() => setGenDays([1, 2, 3, 4, 5])}
                              >
                                Weekdays (Mon–Fri)
                              </button>
                              <button
                                type="button"
                                className="ad-chip-btn"
                                onClick={() => setGenDays([0, 6])}
                              >
                                Weekends (Sat–Sun)
                              </button>
                              <button
                                type="button"
                                className="ad-chip-btn"
                                onClick={() => setGenDays([1, 3, 5])}
                              >
                                Mon, Wed, Fri
                              </button>
                              <button
                                type="button"
                                className="ad-chip-btn"
                                onClick={() => setGenDays([2, 6])}
                              >
                                Tue & Sat
                              </button>
                              <button
                                type="button"
                                className="ad-chip-btn"
                                onClick={() => setGenDays([6])}
                              >
                                Saturdays only
                              </button>
                              <button
                                type="button"
                                className="ad-chip-btn"
                                onClick={() => setGenDays([])}
                              >
                                Clear
                              </button>
                            </div>
                          </div>

                          <div className="ad-days pt-1">
                            {DOW.map((d, idx) => {
                              const selected = genDays.includes(idx);
                              return (
                                <label
                                  key={idx}
                                  className={selected ? "on" : ""}
                                  onClick={() => {
                                    setGenDays(
                                      selected ? genDays.filter((i) => i !== idx) : [...genDays, idx]
                                    );
                                  }}
                                >
                                  {selected ? `✓ ${d}` : d}
                                </label>
                              );
                            })}
                          </div>
                          <p className="ad-note">
                            Active days:{" "}
                            <b>
                              {genDays.length
                                ? genDays
                                    .slice()
                                    .sort((a, b) => a - b)
                                    .map((i) => DOW[i])
                                    .join(", ")
                                : "None selected (click above to select days)"}
                            </b>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 3. Timeframe / Duration */}
                    <div>
                      <span className="eyebrow text-xs block mb-2">3. Timeframe & Duration</span>

                      <div className="flex items-start gap-6 flex-wrap">
                        <label className="block">
                          <span className="text-xs text-muted block mb-1">Starting From:</span>
                          <div className="flex items-center gap-2">
                            <input
                              className="field"
                              type="date"
                              value={genFrom}
                              onChange={(e) => setGenFrom(e.target.value)}
                              style={{ maxWidth: 170 }}
                            />
                            <button
                              type="button"
                              className="ad-chip-btn"
                              onClick={() => setGenFrom(getTodayStr())}
                            >
                              Today
                            </button>
                          </div>
                        </label>

                        {schedulePattern !== "single" && (
                          <div>
                            <span className="text-xs text-muted block mb-1">Repeat Duration:</span>
                            <div className="flex gap-2 flex-wrap">
                              <button
                                type="button"
                                className={`ad-freq-btn text-xs py-2 px-3 ${durationPreset === "1m" ? "active" : ""}`}
                                onClick={() => setDurationPreset("1m")}
                              >
                                1 Month (30d)
                              </button>
                              <button
                                type="button"
                                className={`ad-freq-btn text-xs py-2 px-3 ${durationPreset === "3m" ? "active" : ""}`}
                                onClick={() => setDurationPreset("3m")}
                              >
                                3 Months (90d)
                              </button>
                              <button
                                type="button"
                                className={`ad-freq-btn text-xs py-2 px-3 ${durationPreset === "6m" ? "active" : ""}`}
                                onClick={() => setDurationPreset("6m")}
                              >
                                6 Months (180d)
                              </button>
                              <button
                                type="button"
                                className={`ad-freq-btn text-xs py-2 px-3 ${durationPreset === "1y" ? "active" : ""}`}
                                onClick={() => setDurationPreset("1y")}
                              >
                                ⭐ 1 Full Year (365 days)
                              </button>
                              <button
                                type="button"
                                className={`ad-freq-btn text-xs py-2 px-3 ${durationPreset === "custom" ? "active" : ""}`}
                                onClick={() => setDurationPreset("custom")}
                              >
                                Custom End Date
                              </button>
                            </div>
                          </div>
                        )}

                        {schedulePattern !== "single" && durationPreset === "custom" && (
                          <label className="block">
                            <span className="text-xs text-muted block mb-1">Until Date:</span>
                            <input
                              className="field"
                              type="date"
                              value={genTo}
                              onChange={(e) => setGenTo(e.target.value)}
                              style={{ maxWidth: 170 }}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* 4. Live Schedule Summary & Add */}
                    <div className="ad-summary-box">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="space-y-1">
                          <div className="font-semibold text-ink text-sm sm:text-base">
                            {selectedPoojaObj?.name_en || "Pooja"} &middot;{" "}
                            <span className="text-accent font-bold">
                              {schedulePattern === "everyday"
                                ? "Every Day (Daily)"
                                : schedulePattern === "single"
                                ? "Single Date"
                                : `Every ${genDays.slice().sort((a, b) => a - b).map((i) => DOW[i]).join(", ")}`}
                            </span>
                          </div>
                          <p className="text-xs text-ink/80">
                            {schedulePattern === "single" ? (
                              <>Scheduled for: <b>{genFrom}</b></>
                            ) : (
                              <>
                                Repeating from <b>{genFrom}</b> until{" "}
                                <b>
                                  {durationPreset === "1m"
                                    ? addDaysStr(genFrom, 30)
                                    : durationPreset === "3m"
                                    ? addDaysStr(genFrom, 90)
                                    : durationPreset === "6m"
                                    ? addDaysStr(genFrom, 180)
                                    : durationPreset === "1y"
                                    ? addDaysStr(genFrom, 365)
                                    : genTo || addDaysStr(genFrom, 30)}
                                </b>{" "}
                                &middot; <span className="font-bold text-accent">{genDatesPreview.length} dates</span> ready
                              </>
                            )}
                          </p>
                          <p className="text-xs text-muted">
                            Existing dates and bookings in this range will be safely preserved without duplication.
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={handleGenPreview}
                            className="btn btn-secondary text-xs"
                          >
                            Refresh Preview
                          </button>
                          <button
                            type="button"
                            onClick={handleGenCreate}
                            className="btn btn-primary text-sm font-semibold"
                            disabled={isAddingDates || !genDatesPreview.length || !genPooja}
                          >
                            {isAddingDates
                              ? "Adding dates…"
                              : `Add ${genDatesPreview.length} dates to calendar →`}
                          </button>
                        </div>
                      </div>

                      {genStatus && (
                        <div className={`mt-3 text-xs font-semibold ${genStatus.startsWith("✓") ? "text-emerald-700" : genStatus.startsWith("Failed") ? "text-danger-500" : "text-muted"}`}>
                          {genStatus}
                        </div>
                      )}

                      {/* Dates Preview Pills */}
                      {genDatesPreview.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-line/60">
                          <div className="flex items-center justify-between text-xs text-muted mb-2">
                            <span>Sample preview ({genDatesPreview.length} total dates):</span>
                            {genDatesPreview.length > 12 && (
                              <button
                                type="button"
                                className="text-accent underline cursor-pointer"
                                onClick={() => setShowAllPreview(!showAllPreview)}
                              >
                                {showAllPreview ? "Show fewer" : `Show all ${genDatesPreview.length} dates`}
                              </button>
                            )}
                          </div>
                          <div className="flex gap-1.5 flex-wrap max-h-36 overflow-y-auto">
                            {(showAllPreview ? genDatesPreview : genDatesPreview.slice(0, 12)).map((d, i) => (
                              <span key={i} className="ad-pill">
                                {d}
                              </span>
                            ))}
                            {!showAllPreview && genDatesPreview.length > 12 && (
                              <span className="ad-pill" style={{ opacity: 0.7 }}>
                                +{genDatesPreview.length - 12} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Calendar Dates Table */}
                <div>
                  <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                    <div className="flex items-center gap-3">
                      <span className="eyebrow">Filter by Pooja:</span>
                      <select
                        className="field"
                        value={filterDatesPooja}
                        onChange={(e) => setFilterDatesPooja(e.target.value)}
                        style={{ maxWidth: 260, padding: "5px 10px", fontSize: 13 }}
                      >
                        <option value="">All Poojas ({datesList.length})</option>
                        {poojas.map((p) => {
                          const count = datesList.filter((d) => d.pooja_id === p.id).length;
                          return (
                            <option key={p.id} value={p.id}>
                              {p.name_en} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <span className="ad-note">
                      Showing {filteredDates.length} of {datesList.length} dates
                    </span>
                  </div>

                  <div className="overflow-x-auto border border-line" style={{ borderRadius: "var(--radius-md)" }}>
                    <table className="ad-table" id="adDatesTable">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Pooja</th>
                          <th>Status</th>
                          <th>Paid</th>
                          <th>Pending</th>
                          <th>Capacity</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDates.map((d) => (
                          <tr key={d.id}>
                            <td className="numeral font-medium">{d.event_date}</td>
                            <td>{d.poojas?.name_en}</td>
                            <td>
                              <span className={`ad-pill ${d.status}`}>{d.status}</span>
                            </td>
                            <td>{d.counts?.paid || 0}</td>
                            <td>{d.counts?.pending || 0}</td>
                            <td>{d.poojas?.capacity == null ? "∞" : d.poojas?.capacity}</td>
                            <td>
                              {d.status === "open" && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={() => setDateStatus(d, "closed")}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-ghost"
                                    style={{ color: "var(--danger-500)" }}
                                    onClick={() => setDateStatus(d, "cancelled")}
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                              {d.status === "closed" && (
                                <button
                                  type="button"
                                  className="btn btn-ghost"
                                  onClick={() => setDateStatus(d, "open")}
                                >
                                  Reopen
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredDates.length === 0 && (
                    <p className="ad-note mt-4 text-center py-6">
                      No dates found for this filter. Use the scheduler above to add dates!
                    </p>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Poojas Tab */}
          {activeTab === "poojas" && (
            <div id="adTabPoojas" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div
                  className="overflow-x-auto border border-line"
                  style={{ borderRadius: "var(--radius-md)", alignSelf: "start" }}
                >
                  <table className="ad-table" id="adPoojasTable">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>₹</th>
                        <th>Capacity</th>
                        <th>Active</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {poojas.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div>{p.name_en}</div>
                            <div className="ad-note font-kn">{p.name_kn}</div>
                            <div className="ad-note">{p.slug}</div>
                          </td>
                          <td className="numeral">{rupees(p.amount_paise)}</td>
                          <td>{p.capacity == null ? "Unlimited" : p.capacity}</td>
                          <td>{p.active ? "Yes" : "No"}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-ghost"
                              onClick={() => handlePoojaEdit(p)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <form
                  className="border border-line bg-surface p-6 space-y-4"
                  style={{ borderRadius: "var(--radius-md)" }}
                  onSubmit={handlePoojaSave}
                >
                  <div className="eyebrow">{poojaForm.id ? "Edit pooja" : "New pooja"}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="eyebrow">Name (English)</span>
                      <input
                        className="field mt-2"
                        required
                        maxLength={160}
                        value={poojaForm.name_en}
                        onChange={(e) => setPoojaForm({ ...poojaForm, name_en: e.target.value })}
                      />
                    </label>
                    <label className="block">
                      <span className="eyebrow">Name (Kannada)</span>
                      <input
                        className="field mt-2 font-kn"
                        required
                        maxLength={160}
                        value={poojaForm.name_kn}
                        onChange={(e) => setPoojaForm({ ...poojaForm, name_kn: e.target.value })}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="eyebrow">Description (English)</span>
                    <textarea
                      className="field mt-2"
                      rows={2}
                      maxLength={600}
                      value={poojaForm.desc_en}
                      onChange={(e) => setPoojaForm({ ...poojaForm, desc_en: e.target.value })}
                    />
                  </label>

                  <label className="block">
                    <span className="eyebrow">Description (Kannada)</span>
                    <textarea
                      className="field mt-2 font-kn"
                      rows={2}
                      maxLength={600}
                      value={poojaForm.desc_kn}
                      onChange={(e) => setPoojaForm({ ...poojaForm, desc_kn: e.target.value })}
                    />
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-end">
                    <label className="block">
                      <span className="eyebrow">Slug</span>
                      <input
                        className="field mt-2"
                        required
                        maxLength={60}
                        placeholder="shravana-shanivara"
                        value={poojaForm.slug}
                        onChange={(e) => setPoojaForm({ ...poojaForm, slug: e.target.value })}
                      />
                    </label>
                    <label className="block">
                      <span className="eyebrow">Price (₹)</span>
                      <input
                        className="field mt-2"
                        type="number"
                        min="1"
                        step="1"
                        required
                        value={poojaForm.rupees}
                        onChange={(e) => setPoojaForm({ ...poojaForm, rupees: e.target.value })}
                      />
                    </label>
                    <label className="block">
                      <span className="eyebrow">Capacity</span>
                      <input
                        className="field mt-2"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="blank = unlimited"
                        value={poojaForm.capacity}
                        onChange={(e) => setPoojaForm({ ...poojaForm, capacity: e.target.value })}
                      />
                    </label>
                    <label className="block" style={{ display: "flex", alignItems: "center", gap: ".5rem", paddingBottom: ".6rem" }}>
                      <input
                        type="checkbox"
                        checked={poojaForm.active}
                        onChange={(e) => setPoojaForm({ ...poojaForm, active: e.target.checked })}
                      />
                      <span className="eyebrow" style={{ margin: 0 }}>
                        Active
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                    <button type="button" onClick={handlePoojaReset} className="btn btn-ghost">
                      Clear
                    </button>
                  </div>
                  {poojaStatus && <div className="ad-note">{poojaStatus}</div>}
                </form>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Confirmation Dialog */}
      {dialogContent && (
        <dialog
          open
          style={{
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            maxWidth: 480,
            display: "block",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "var(--surface-raised)",
            boxShadow: "var(--shadow-lg)",
            zIndex: 100,
          }}
        >
          <div className="eyebrow">{dialogContent.title}</div>
          <p className="mt-3 text-sm">{dialogContent.description}</p>
          {dialogContent.details && (
            <div className="mt-2 space-y-1">
              {dialogContent.details.map((det, i) => (
                <p key={i} className="text-sm font-semibold text-accent">
                  {det}
                </p>
              ))}
            </div>
          )}
          <div className="mt-5 flex gap-3 justify-end">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setDialogContent(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={dialogContent.onConfirm}
            >
              Confirm
            </button>
          </div>
        </dialog>
      )}
    </main>
  );
};
