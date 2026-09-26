"use client";

import React, { useState, useEffect, useCallback, useId } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { Pooja, PoojaDate } from "@/lib/types";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const RASHIS: [string, string][] = [
  ["Mesha", "ಮೇಷ"], ["Vrishabha", "ವೃಷಭ"], ["Mithuna", "ಮಿಥುನ"], ["Karka", "ಕರ್ಕ"],
  ["Simha", "ಸಿಂಹ"], ["Kanya", "ಕನ್ಯಾ"], ["Tula", "ತುಲಾ"], ["Vrischika", "ವೃಶ್ಚಿಕ"],
  ["Dhanu", "ಧನು"], ["Makara", "ಮಕರ"], ["Kumbha", "ಕುಂಭ"], ["Meena", "ಮೀನ"],
];

const NAKSHATRAS_LIST: [string, string][] = [
  ["Ashwini", "ಅಶ್ವಿನಿ"], ["Bharani", "ಭರಣಿ"], ["Krittika", "ಕೃತ್ತಿಕಾ"], ["Rohini", "ರೋಹಿಣಿ"],
  ["Mrigashira", "ಮೃಗಶಿರ"], ["Ardra", "ಆರ್ದ್ರಾ"], ["Punarvasu", "ಪುನರ್ವಸು"], ["Pushya", "ಪುಷ್ಯ"],
  ["Ashlesha", "ಆಶ್ಲೇಷಾ"], ["Magha", "ಮಘಾ"], ["Purva Phalguni", "ಪೂರ್ವ ಫಲ್ಗುಣಿ"], ["Uttara Phalguni", "ಉತ್ತರ ಫಲ್ಗುಣಿ"],
  ["Hasta", "ಹಸ್ತ"], ["Chitra", "ಚಿತ್ರಾ"], ["Swati", "ಸ್ವಾತಿ"], ["Vishakha", "ವಿಶಾಖಾ"],
  ["Anuradha", "ಅನುರಾಧಾ"], ["Jyeshtha", "ಜ್ಯೇಷ್ಠಾ"], ["Mula", "ಮೂಲಾ"], ["Purva Ashadha", "ಪೂರ್ವಾಷಾಢಾ"],
  ["Uttara Ashadha", "ಉತ್ತರಾಷಾಢಾ"], ["Shravana", "ಶ್ರವಣ"], ["Dhanishta", "ಧನಿಷ್ಠಾ"], ["Shatabhisha", "ಶತಭಿಷಾ"],
  ["Purva Bhadrapada", "ಪೂರ್ವ ಭಾದ್ರಪದ"], ["Uttara Bhadrapada", "ಉತ್ತರ ಭಾದ್ರಪದ"], ["Revati", "ರೇವತಿ"],
];

interface BookingFlowProps {
  selectedPoojaId?: string | null;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ selectedPoojaId }) => {
  const { isKn, t } = useLanguage();
  const nakshatraDatalistId = useId();

  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [poojaById, setPoojaById] = useState<Record<string, Pooja>>({});
  const [dates, setDates] = useState<PoojaDate[]>([]);
  const [selPooja, setSelPooja] = useState<string | null>(selectedPoojaId || null);
  const [visibleDatesCount, setVisibleDatesCount] = useState<number>(30);
  const [selection, setSelection] = useState<{ dateRow: PoojaDate; pooja: Pooja } | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Form State
  const [formStep, setFormStep] = useState<"choose" | "form" | "done">("choose");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gotra: "",
    nakshatra: "",
    rashi: "",
    family_names: "",
    note: "",
    website: "",
  });
  const [formStatusMsg, setFormStatusMsg] = useState("");
  const [isFormError, setIsFormError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    ref: string;
    waSent: boolean;
    verifyFailed?: boolean;
  } | null>(null);

  const rupees = (paise: number) => "₹" + (paise / 100).toLocaleString("en-IN");

  const istStr = (days = 0) => {
    return new Date(Date.now() + 5.5 * 3600e3 + days * 86400000).toISOString().slice(0, 10);
  };

  const parts = (dateStr: string) => {
    const p = dateStr.split("-").map(Number);
    return { y: p[0], m: p[1], d: p[2], dow: new Date(Date.UTC(p[0], p[1] - 1, p[2])).getUTCDay() };
  };

  const fmtDate = useCallback(
    (dateStr: string) => {
      const p = parts(dateStr);
      const monthsEN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const monthsKN = ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಏಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟೆಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್"];
      const daysEN = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      const daysKN = ["ಭಾನುವಾರ","ಸೋಮವಾರ","ಮಂಗಳವಾರ","ಬುಧವಾರ","ಗುರುವಾರ","ಶುಕ್ರವಾರ","ಶನಿವಾರ"];
      return isKn
        ? `${daysKN[p.dow]}, ${p.d} ${monthsKN[p.m - 1]} ${p.y}`
        : `${daysEN[p.dow]}, ${p.d} ${monthsEN[p.m - 1]} ${p.y}`;
    },
    [isKn]
  );

  const fmtShort = useCallback(
    (dateStr: string) => {
      const p = parts(dateStr);
      const monthsEN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const monthsKN = ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಏಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟೆಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್"];
      const daysEN = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const daysKN = ["ಭಾನು","ಸೋಮ","ಮಂಗಳ","ಬುಧ","ಗುರು","ಶುಕ್ರ","ಶನಿ"];
      const month = isKn ? monthsKN[p.m - 1] : monthsEN[p.m - 1];
      const day = isKn ? daysKN[p.dow] : daysEN[p.dow];
      return `${day}, ${p.d} ${month}`;
    },
    [isKn]
  );

  const loadAll = useCallback(() => {
    fetch(`/api/calendar?from=${istStr()}&to=${istStr(365)}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setLoadError(false);
        setLoaded(true);
        setPoojas(data.poojas);
        const map: Record<string, Pooja> = {};
        data.poojas.forEach((p: Pooja) => {
          map[p.id] = p;
        });
        setPoojaById(map);
        const sorted = data.dates.slice().sort((a: PoojaDate, b: PoojaDate) => (a.event_date < b.event_date ? -1 : 1));
        setDates(sorted);
      })
      .catch(() => {
        setLoadError(true);
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    if (selectedPoojaId) {
      setSelPooja(selectedPoojaId);
      setVisibleDatesCount(30);
    }
  }, [selectedPoojaId]);

  useEffect(() => {
    if (loaded && poojas.length > 0 && !selPooja) {
      setSelPooja(selectedPoojaId || poojas[0].id);
      setVisibleDatesCount(30);
    }
  }, [loaded, poojas, selPooja, selectedPoojaId]);

  const bookable = (d: PoojaDate) => d.status === "open" && (d.remaining == null || d.remaining > 0);
  const datesFor = (poojaId: string) => dates.filter((d) => d.pooja_id === poojaId);
  const nextAvailable = (poojaId: string) => datesFor(poojaId).find(bookable) || null;

  const startBooking = (dateRow: PoojaDate, pooja: Pooja) => {
    setSelection({ dateRow, pooja });
    setOrder(null);
    setFormStep("form");
    setFormStatusMsg("");
  };

  const loadRazorpay = (): Promise<void> => {
    if (typeof window !== "undefined" && window.Razorpay) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve();
      s.onerror = () => reject();
      document.head.appendChild(s);
    });
  };

  const openCheckout = (ordData: any) => {
    try {
      sessionStorage.setItem("rmp_order", ordData.order_id);
    } catch {}

    loadRazorpay()
      .then(() => {
        const rzp = new window.Razorpay({
          key: ordData.key_id,
          order_id: ordData.order_id,
          amount: ordData.amount_paise,
          currency: "INR",
          name: "Sri Kshetra Rampura",
          description: (isKn ? ordData.pooja_name_kn : ordData.pooja_name_en) + " · " + ordData.event_date,
          prefill: ordData.prefill,
          theme: { color: "#EE5A2A" },
          handler: (resp: any) => onPaid(resp, ordData),
          modal: {
            ondismiss: () => {
              setFormStatusMsg(t("Payment was not completed. Your slot is held for 30 minutes.", "ಪಾವತಿ ಪೂರ್ಣಗೊಂಡಿಲ್ಲ. ನಿಮ್ಮ ಸ್ಥಳ 30 ನಿಮಿಷ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ."));
              setIsFormError(true);
            },
          },
        });
        rzp.open();
      })
      .catch(() => {
        setFormStatusMsg(t("The payment service is unavailable right now. Please try again in a few minutes.", "ಪಾವತಿ ಸೇವೆ ಸದ್ಯ ಲಭ್ಯವಿಲ್ಲ. ಕೆಲವು ನಿಮಿಷಗಳ ನಂತರ ಪ್ರಯತ್ನಿಸಿ."));
        setIsFormError(true);
      });
  };

  const onPaid = (resp: any, ordData: any) => {
    fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resp),
    })
      .then((res) => res.json().then((b) => ({ ok: res.ok, body: b })))
      .then((r) => {
        if (r.ok && r.body.status === "paid") {
          showDone(r.body.booking_ref, r.body.wa_sent);
        } else {
          showDone(ordData.booking_ref, false, true);
        }
      })
      .catch(() => showDone(ordData.booking_ref, false, true));
  };

  const showDone = (ref: string, waSent: boolean, verifyFailed = false) => {
    try {
      sessionStorage.removeItem("rmp_order");
    } catch {}
    setConfirmationData({ ref, waSent, verifyFailed });
    setFormStep("done");
  };

  const handleFormSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!selection) return;

    const name = formData.name.trim();
    let digits = formData.phone.replace(/[^\d]/g, "");
    if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
    if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);

    if (!name || !/^[6-9]\d{9}$/.test(digits)) {
      setFormStatusMsg(t("Please enter your name and a valid 10-digit WhatsApp number.", "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಸರಿಯಾದ 10-ಅಂಕಿಯ ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ."));
      setIsFormError(true);
      return;
    }

    setIsSubmitting(true);
    setFormStatusMsg(t("Reserving your slot…", "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗುತ್ತಿದೆ…"));
    setIsFormError(false);

    fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pooja_date_id: selection.dateRow.id,
        name,
        phone: "+91" + digits,
        email: formData.email.trim(),
        gotra: formData.gotra.trim(),
        nakshatra: formData.nakshatra.trim(),
        rashi: formData.rashi,
        family_names: formData.family_names.trim(),
        note: formData.note.trim(),
        lang: isKn ? "kn" : "en",
        website: formData.website,
      }),
    })
      .then((res) => res.json().then((b) => ({ ok: res.ok, body: b })))
      .then((r) => {
        setIsSubmitting(false);
        if (!r.ok) {
          const code = r.body && r.body.error;
          const msgMap: Record<string, string> = {
            sold_out: t("Sorry, this date just filled up. Please choose another date.", "ಕ್ಷಮಿಸಿ, ಈ ದಿನಾಂಕ ಈಗಷ್ಟೇ ಭರ್ತಿಯಾಯಿತು. ಬೇರೆ ದಿನಾಂಕ ಆರಿಸಿ."),
            already_booked: t("This WhatsApp number already has a booking for this date.", "ಈ ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಸಂಖ್ಯೆಗೆ ಈ ದಿನಾಂಕಕ್ಕೆ ಈಗಾಗಲೇ ಬುಕಿಂಗ್ ಇದೆ."),
            too_many: t("Too many pending bookings from this number. Please try again later.", "ಈ ಸಂಖ್ಯೆಯಿಂದ ಹಲವು ಬಾಕಿ ಬುಕಿಂಗ್‌ಗಳಿವೆ. ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ."),
            date_closed: t("This date is no longer open for booking.", "ಈ ದಿನಾಂಕ ಬುಕಿಂಗ್‌ಗೆ ಲಭ್ಯವಿಲ್ಲ."),
            payment_unavailable: t("The payment service is unavailable right now. Please try again in a few minutes.", "ಪಾವತಿ ಸೇವೆ ಸದ್ಯ ಲಭ್ಯವಿಲ್ಲ. ಕೆಲವು ನಿಮಿಷಗಳ ನಂತರ ಪ್ರಯತ್ನಿಸಿ."),
            server_error: t("Something went wrong. Please try again, or call the temple office.", "ಏನೋ ತಪ್ಪಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ ದೇವಸ್ಥಾನದ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ."),
          };
          setFormStatusMsg(msgMap[code] || msgMap.server_error);
          setIsFormError(true);
          if (code === "sold_out" || code === "date_closed") loadAll();
          return;
        }
        setOrder(r.body);
        setFormStatusMsg("");
        if (r.body.has_gateway && r.body.order_id) {
          openCheckout(r.body);
        } else {
          // Staging / temple office confirmation without live payment modal
          showDone(r.body.booking_ref, false);
        }
      })
      .catch(() => {
        setIsSubmitting(false);
        setFormStatusMsg(t("Something went wrong. Please try again, or call the temple office.", "ಏನೋ ತಪ್ಪಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ ದೇವಸ್ಥಾನದ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ."));
        setIsFormError(true);
      });
  };

  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2">
        {/* Step 1: Choose Pooja & Date */}
        {formStep === "choose" && (
          <div id="bkPanelChoose">
            <div className="mb-4 flex items-center gap-3">
              <span className="eyebrow">
                {t("Step 1 · Choose a pooja & date", "ಹಂತ 1 · ಪೂಜೆ ಮತ್ತು ದಿನಾಂಕ ಆರಿಸಿ")}
              </span>
              <span className="bk-count">
                {loaded && !loadError && (isKn ? `${poojas.length} ಪೂಜೆಗಳು ಲಭ್ಯ` : `${poojas.length} poojas open`)}
              </span>
            </div>

            {/* Poojas List */}
            <div className="space-y-4">
              {!loaded && (
                <p className="text-sm text-muted">
                  {t("Loading poojas…", "ಪೂಜೆಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ…")}
                </p>
              )}

              {loadError && (
                <p className="bk-err">
                  {t(
                    "Online booking is temporarily unavailable. Please call the temple office: +91 96206 36465.",
                    "ಆನ್‌ಲೈನ್ ಬುಕಿಂಗ್ ಸದ್ಯಕ್ಕೆ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ದೇವಸ್ಥಾನದ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ: +91 96206 36465."
                  )}
                </p>
              )}

              {loaded &&
                poojas.map((p) => {
                  const selected = selPooja === p.id;
                  const compact = selPooja && !selected;
                  const next = nextAvailable(p.id);

                  if (compact) {
                    return (
                      <article
                        key={p.id}
                        className="bk-pcard compact"
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelPooja(p.id)}
                      >
                        <h3 className="display text-lg">{isKn ? p.name_kn : p.name_en}</h3>
                        <span className="numeral text-lg text-accent shrink-0">{rupees(p.amount_paise)}</span>
                      </article>
                    );
                  }

                  return (
                    <article
                      key={p.id}
                      className={`bk-pcard ${selected ? "sel" : ""}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelPooja(p.id)}
                    >
                      <div className="bk-prow1">
                        <h3 className="display text-xl sm:text-2xl">{isKn ? p.name_kn : p.name_en}</h3>
                        <div className="numeral text-2xl text-accent shrink-0">{rupees(p.amount_paise)}</div>
                      </div>

                      {(isKn ? p.desc_kn : p.desc_en) && (!selected || poojas.length === 1) && (
                        <p className="bk-pdesc text-sm text-muted mt-1 leading-relaxed">
                          {isKn ? p.desc_kn : p.desc_en}
                        </p>
                      )}

                      <div className="bk-prow3">
                        <span className="bk-pnext">
                          {next ? (
                            <>
                              <b>{t("Next", "ಮುಂದೆ")}</b>
                              <span>{fmtShort(next.event_date)}</span>
                              {p.capacity === 1 && (
                                <span className="bk-badge ok">
                                  {t("1 family/day", "ದಿನಕ್ಕೆ 1 ಕುಟುಂಬ")}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="bk-badge full">
                              {t("No dates open right now", "ಸದ್ಯ ದಿನಾಂಕಗಳು ಲಭ್ಯವಿಲ್ಲ")}
                            </span>
                          )}
                        </span>
                        {(next || selected) && (
                          <button type="button" className="bk-pbook">
                            {selected ? t("Selected ✓", "ಆಯ್ಕೆಯಾಗಿದೆ ✓") : t("Book →", "ಬುಕ್ →")}
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
            </div>

            {/* Dates List */}
            {selPooja && !loadError && (
              <div className="mt-10">
                <div className="eyebrow mb-4">{t("Choose a date", "ದಿನಾಂಕ ಆರಿಸಿ")}</div>
                {datesFor(selPooja).length === 0 ? (
                  <div className="bk-summary" style={{ borderRadius: "var(--radius-md)" }}>
                    <p className="text-sm text-ink/90 leading-relaxed">
                      {t(
                        "No dates are open for this pooja right now. To arrange it, call the temple office:",
                        "ಈ ಪೂಜೆಗೆ ಸದ್ಯ ದಿನಾಂಕಗಳು ತೆರೆದಿಲ್ಲ. ಏರ್ಪಡಿಸಲು ದೇವಸ್ಥಾನದ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ:"
                      )}
                    </p>
                    <a href="tel:+919620636465" className="btn btn-primary mt-4">
                      Gururaju · +91 96206 36465
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {datesFor(selPooja).slice(0, visibleDatesCount).map((d) => {
                      const ok = bookable(d);
                      const p = parts(d.event_date);
                      const pooja = poojaById[selPooja];

                      return (
                        <button
                          key={d.id}
                          type="button"
                          className="bk-drow"
                          disabled={!ok}
                          onClick={() => ok && startBooking(d, pooja)}
                        >
                          <span className="bk-drow-date">
                            <span className="numeral bk-drow-num">{p.d}</span>
                            <span>
                              <span className="block">
                                {isKn
                                  ? ["ಭಾನುವಾರ","ಸೋಮವಾರ","ಮಂಗಳವಾರ","ಬುಧವಾರ","ಗುರುವಾರ","ಶುಕ್ರವಾರ","ಶನಿವಾರ"][p.dow]
                                  : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][p.dow]}
                              </span>
                              <span className="block text-sm text-muted">
                                {isKn
                                  ? ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಏಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟೆಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್"][p.m - 1]
                                  : ["January","February","March","April","May","June","July","August","September","October","November","December"][p.m - 1]}{" "}
                                {p.y}
                              </span>
                            </span>
                          </span>

                          <span className="flex items-center gap-3">
                            {d.status === "cancelled" ? (
                              <span className="bk-badge cancel">{t("Cancelled", "ರದ್ದಾಗಿದೆ")}</span>
                            ) : !ok ? (
                              <span className="bk-badge full">{t("Booked out", "ಬುಕ್ ಆಗಿದೆ")}</span>
                            ) : pooja?.capacity === 1 ? (
                              <span className="bk-badge ok">{t("One family per day", "ದಿನಕ್ಕೆ ಒಂದು ಕುಟುಂಬ")}</span>
                            ) : d.remaining != null ? (
                              <span className="bk-badge ok">
                                {isKn ? `${d.remaining} ಉಳಿದಿದೆ` : `${d.remaining} left`}
                              </span>
                            ) : (
                              <span className="bk-badge ok">{t("Available", "ಲಭ್ಯವಿದೆ")}</span>
                            )}
                            {ok && <span className="text-accent">→</span>}
                          </span>
                        </button>
                      );
                    })}

                    {datesFor(selPooja).length > visibleDatesCount && (
                      <div className="text-center pt-3">
                        <button
                          type="button"
                          className="btn btn-secondary text-sm"
                          onClick={() => setVisibleDatesCount((prev) => prev + 30)}
                        >
                          {t(
                            `Show next upcoming dates (${datesFor(selPooja).length - visibleDatesCount} more) ↓`,
                            `ಮುಂದಿನ ದಿನಾಂಕಗಳನ್ನು ತೋರಿಸಿ (${datesFor(selPooja).length - visibleDatesCount} ಉಳಿದಿದೆ) ↓`
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-sm text-muted mt-4">
                  {t(
                    "More dates are added by the temple office from time to time.",
                    "ದೇವಸ್ಥಾನದ ಕಚೇರಿಯು ಆಗಾಗ ಹೊಸ ದಿನಾಂಕಗಳನ್ನು ಸೇರಿಸುತ್ತದೆ."
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Form */}
        {formStep === "form" && selection && (
          <div id="bkPanelForm">
            <div className="eyebrow mb-4">{t("Step 2 · Sankalpa details", "ಹಂತ 2 · ಸಂಕಲ್ಪದ ವಿವರಗಳು")}</div>

            <div className="bk-summary" style={{ borderRadius: "var(--radius-md)" }}>
              <div className="display text-2xl">
                {isKn ? selection.pooja.name_kn : selection.pooja.name_en}
              </div>
              <div className="mt-2 text-sm text-muted">{fmtDate(selection.dateRow.event_date)}</div>
              <div className="mt-2">
                <span className="eyebrow">{t("Contribution", "ಕಾಣಿಕೆ")}</span>
                <span className="numeral text-3xl text-accent block mt-1">
                  {rupees(selection.pooja.amount_paise)}
                </span>
              </div>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleFormSubmit} noValidate>
              <input
                type="text"
                name="website"
                style={{ display: "none" }}
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="eyebrow">{t("Name *", "ಹೆಸರು *")}</span>
                  <input
                    className="field mt-2"
                    name="name"
                    type="text"
                    required
                    maxLength={120}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">{t("WhatsApp number *", "ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಸಂಖ್ಯೆ *")}</span>
                  <input
                    className="field mt-2"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    required
                    placeholder="10-digit mobile"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </label>
              </div>

              <label className="block">
                <span className="eyebrow">{t("Email (optional)", "ಇಮೇಲ್ (ಐಚ್ಛಿಕ)")}</span>
                <input
                  className="field mt-2"
                  name="email"
                  type="email"
                  maxLength={160}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <label className="block">
                  <span className="eyebrow">{t("Gotra", "ಗೋತ್ರ")}</span>
                  <input
                    className="field mt-2"
                    name="gotra"
                    type="text"
                    maxLength={80}
                    value={formData.gotra}
                    onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">{t("Nakshatra", "ನಕ್ಷತ್ರ")}</span>
                  <input
                    className="field mt-2"
                    name="nakshatra"
                    list={nakshatraDatalistId}
                    maxLength={80}
                    value={formData.nakshatra}
                    onChange={(e) => setFormData({ ...formData, nakshatra: e.target.value })}
                  />
                  <datalist id={nakshatraDatalistId}>
                    {NAKSHATRAS_LIST.map((n, i) => (
                      <option key={i} value={n[isKn ? 1 : 0]} />
                    ))}
                  </datalist>
                </label>
                <label className="block">
                  <span className="eyebrow">{t("Rashi", "ರಾಶಿ")}</span>
                  <select
                    className="field mt-2"
                    name="rashi"
                    value={formData.rashi}
                    onChange={(e) => setFormData({ ...formData, rashi: e.target.value })}
                  >
                    <option value="">—</option>
                    {RASHIS.map((r, i) => (
                      <option key={i} value={r[0]}>
                        {r[isKn ? 1 : 0]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="eyebrow">
                  {t("Family members to include in sankalpa", "ಸಂಕಲ್ಪದಲ್ಲಿ ಸೇರಿಸಬೇಕಾದ ಕುಟುಂಬ ಸದಸ್ಯರು")}
                </span>
                <input
                  className="field mt-2"
                  name="family_names"
                  type="text"
                  maxLength={500}
                  placeholder={t("e.g. Ramesh, Sunitha, Vinay", "ಉದಾ: ರಮೇಶ್, ಸುನೀತಾ, ವಿನಯ್")}
                  value={formData.family_names}
                  onChange={(e) => setFormData({ ...formData, family_names: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="eyebrow">
                  {t("Note for the priests (optional)", "ಅರ್ಚಕರಿಗೆ ಸಂದೇಶ (ಐಚ್ಛಿಕ)")}
                </span>
                <textarea
                  className="field mt-2"
                  name="note"
                  rows={2}
                  maxLength={500}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </label>

              <div className="pt-2 flex items-center gap-4 flex-wrap">
                <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                  {t("Proceed to payment →", "ಪಾವತಿಗೆ ಮುಂದುವರಿಯಿರಿ →")}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setFormStep("choose")}
                >
                  {t("← Change date", "← ದಿನಾಂಕ ಬದಲಿಸಿ")}
                </button>
              </div>

              {formStatusMsg && (
                <div className={`mt-3 ${isFormError ? "bk-err" : "text-muted text-sm"}`}>
                  {formStatusMsg}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Step 3: Done Confirmation */}
        {formStep === "done" && confirmationData && (
          <div id="bkPanelDone">
            <div
              className="border border-line bg-surface p-8 sm:p-10 text-center"
              style={{ borderRadius: "var(--radius-md)" }}
            >
              <div className="eyebrow">
                {confirmationData.verifyFailed ? "" : t("Booking confirmed", "ಬುಕಿಂಗ್ ದೃಢವಾಯಿತು")}
              </div>

              {confirmationData.verifyFailed ? (
                <>
                  <p className="bk-err mt-3 leading-relaxed">
                    {t(
                      "Your payment was received, but we could not confirm it automatically. Please call the temple office and mention your payment.",
                      "ನಿಮ್ಮ ಪಾವತಿ ತಲುಪಿದೆ, ಆದರೆ ಸ್ವಯಂಚಾಲಿತ ದೃಢೀಕರಣ ಆಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ದೇವಸ್ಥಾನದ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ."
                    )}
                  </p>
                  {confirmationData.ref && <div className="bk-ref mt-4">{confirmationData.ref}</div>}
                </>
              ) : (
                <>
                  <p className="mt-3 text-ink/90 leading-relaxed">
                    {t(
                      "Namaskara 🙏 Your seva is booked. Please keep this reference:",
                      "ನಮಸ್ಕಾರ 🙏 ನಿಮ್ಮ ಸೇವೆ ಬುಕ್ ಆಗಿದೆ. ಈ ಸಂಖ್ಯೆಯನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ:"
                    )}
                  </p>
                  <div className="bk-ref mt-4">{confirmationData.ref}</div>

                  {selection && (
                    <p className="mt-3 text-muted text-sm">
                      {(isKn ? selection.pooja.name_kn : selection.pooja.name_en) +
                        " · " +
                        fmtDate(selection.dateRow.event_date)}
                    </p>
                  )}

                  <p className={`mt-5 text-sm ${confirmationData.waSent ? "text-ink/90" : "text-muted"}`}>
                    {confirmationData.waSent
                      ? t(
                          "A confirmation has been sent to your WhatsApp number.",
                          "ನಿಮ್ಮ ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಸಂಖ್ಯೆಗೆ ದೃಢೀಕರಣ ಕಳುಹಿಸಲಾಗಿದೆ."
                        )
                      : t(
                          "Your WhatsApp confirmation is on its way. For help, call Gururaju: +91 96206 36465.",
                          "ನಿಮ್ಮ ವಾಟ್ಸ್‌ಆ್ಯಪ್ ದೃಢೀಕರಣ ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತದೆ. ಸಹಾಯಕ್ಕೆ ಗುರುರಾಜು ಅವರಿಗೆ ಕರೆ ಮಾಡಿ: +91 96206 36465."
                        )}
                  </p>
                </>
              )}

              <button
                type="button"
                className="btn btn-secondary mt-7"
                onClick={() => {
                  setFormStep("choose");
                  setSelection(null);
                  setOrder(null);
                  setConfirmationData(null);
                  setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    gotra: "",
                    nakshatra: "",
                    rashi: "",
                    family_names: "",
                    note: "",
                    website: "",
                  });
                  loadAll();
                }}
              >
                {t("Book another pooja", "ಇನ್ನೊಂದು ಪೂಜೆ ಬುಕ್ ಮಾಡಿ")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
