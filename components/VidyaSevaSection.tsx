"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { VIDYA_SEVA_CATALOG, calcVidyaSevaTotalPaise, formatVidyaSevaSummary } from "@/lib/vidya-seva";
import { VidyaSevaItemSelection } from "@/lib/types";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

interface VidyaSevaSectionProps {
  embedded?: boolean;
}

export const VidyaSevaSection: React.FC<VidyaSevaSectionProps> = ({ embedded = false }) => {
  const { isKn, t } = useLanguage();

  const [items, setItems] = useState<VidyaSevaItemSelection>({
    combo: 1,
    book: 0,
    pen: 0,
    pencil: 0,
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gotra, setGotra] = useState("");
  const [nakshatra, setNakshatra] = useState("");
  const [rashi, setRashi] = useState("");
  const [note, setNote] = useState("");
  const [websiteHoneypot, setWebsiteHoneypot] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [isError, setIsError] = useState(false);

  // Success Confirmation State
  const [receipt, setReceipt] = useState<{
    ref: string;
    amount: number;
    donor: string;
    paymentId: string;
    date: string;
    summary: string;
  } | null>(null);

  const totalPaise = calcVidyaSevaTotalPaise(items);
  const totalRupees = totalPaise / 100;

  const updateQuantity = (key: keyof VidyaSevaItemSelection, delta: number) => {
    setItems((prev) => {
      const current = prev[key] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [key]: next };
    });
  };

  const setDirectQuantity = (key: keyof VidyaSevaItemSelection, val: string) => {
    const cleaned = val.replace(/[^\d]/g, "");
    const num = cleaned === "" ? 0 : Math.max(0, parseInt(cleaned, 10));
    setItems((prev) => ({ ...prev, [key]: num }));
  };

  const addPresetCombo = (count: number) => {
    setItems((prev) => ({
      ...prev,
      combo: (prev.combo || 0) + count,
    }));
  };

  const resetForm = () => {
    setReceipt(null);
    setItems({ combo: 1, book: 0, pen: 0, pencil: 0 });
    setName("");
    setPhone("");
    setEmail("");
    setGotra("");
    setNakshatra("");
    setRashi("");
    setNote("");
    setStatusMsg("");
    setIsError(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (totalRupees < 15) {
      setStatusMsg(t("Please select at least one item for Vidhya Seva.", "ದಯವಿಟ್ಟು ವಿದ್ಯಾ ಸೇವೆಗೆ ಕನಿಷ್ಠ ಒಂದು ವಸ್ತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ."));
      setIsError(true);
      return;
    }

    const trimmedName = name.trim();
    let digits = phone.replace(/[^\d]/g, "");
    if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
    if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);

    if (!trimmedName || !/^[6-9]\d{9}$/.test(digits)) {
      setStatusMsg(t("Please enter your name and a valid 10-digit WhatsApp number.", "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಸರಿಯಾದ 10-ಅಂಕಿಯ ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ."));
      setIsError(true);
      return;
    }

    setSubmitting(true);
    setStatusMsg(t("Preparing your Vidhya Seva offering…", "ವಿದ್ಯಾ ಸೇವಾ ಕಾಣಿಕೆ ಪಾವತಿ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ…"));
    setIsError(false);

    try {
      const res = await fetch("/api/vidya-seva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          phone: "+91" + digits,
          email: email.trim() || undefined,
          gotra: gotra.trim() || undefined,
          nakshatra: nakshatra.trim() || undefined,
          rashi: rashi.trim() || undefined,
          note: note.trim() || undefined,
          items,
          lang: isKn ? "kn" : "en",
          website: websiteHoneypot,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.message || t("Could not create Vidhya Seva order. Please try again.", "ವಿದ್ಯಾ ಸೇವಾ ಆರ್ಡರ್ ಸೃಷ್ಟಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ."));
      }

      if (!data.has_gateway || !data.order_id) {
        // Direct / Offline mode fallback
        setReceipt({
          ref: data.booking_ref,
          amount: totalRupees,
          donor: trimmedName,
          paymentId: "Direct",
          date: new Date().toLocaleDateString("en-IN"),
          summary: data.summary || formatVidyaSevaSummary(items, isKn),
        });
        setSubmitting(false);
        return;
      }

      // Open Razorpay Checkout Modal
      await loadRazorpay();
      const rzp = new window.Razorpay({
        key: data.key_id,
        order_id: data.order_id,
        amount: data.amount_paise,
        currency: "INR",
        name: "Sri Kshetra Rampura",
        description: "Vidhya Seva · " + data.booking_ref,
        image: "/assets/brand/vaishnava-tilak.png",
        prefill: data.prefill,
        theme: { color: "#7C1D24" },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            setStatusMsg(t("Payment was not completed. You can try again whenever you wish.", "ಪಾವತಿ ಪೂರ್ಣಗೊಂಡಿಲ್ಲ. ನೀವು ಯಾವಾಗ ಬೇಕಾದರೂ ಪುನಃ ಪ್ರಯತ್ನಿಸಬಹುದು."));
            setIsError(true);
          },
        },
        handler: async (response: any) => {
          setStatusMsg(t("Verifying your offering…", "ಪಾವತಿಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…"));
          try {
            const vRes = await fetch("/api/vidya-seva/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                booking_ref: data.booking_ref,
              }),
            });

            const vData = await vRes.json();
            setReceipt({
              ref: data.booking_ref,
              amount: totalRupees,
              donor: trimmedName,
              paymentId: response.razorpay_payment_id || "Verified",
              date: vData.date || new Date().toLocaleDateString("en-IN"),
              summary: vData.summary || data.summary || formatVidyaSevaSummary(items, isKn),
            });
            setSubmitting(false);
          } catch {
            // Even if client verification fails, webhook catches it
            setReceipt({
              ref: data.booking_ref,
              amount: totalRupees,
              donor: trimmedName,
              paymentId: response.razorpay_payment_id || "Captured",
              date: new Date().toLocaleDateString("en-IN"),
              summary: data.summary || formatVidyaSevaSummary(items, isKn),
            });
            setSubmitting(false);
          }
        },
      });

      rzp.open();
    } catch (err: any) {
      console.error("[VidyaSeva Submit Error]:", err);
      setStatusMsg(err.message || t("Something went wrong. Please try again.", "ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ."));
      setIsError(true);
      setSubmitting(false);
    }
  };

  return (
    <section id="vidya-seva" className={`${embedded ? "" : "py-20 sm:py-28 bg-[#181412] text-white border-t border-[#2E2822]"} relative overflow-hidden`}>
      {/* Background radial accent glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(229,169,60,0.06) 0%, rgba(124,29,36,0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="wrap relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--brass-300)]/30 bg-[var(--brass-300)]/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs tracking-widest uppercase font-semibold text-[var(--brass-300)]">
              {t("Sri Vidya Hayagreeva", "ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ ಸನ್ನಿಧಿ")}
            </span>
          </div>

          <h2 className="display text-3xl sm:text-5xl text-white font-medium">
            {t("Vidhya Seva", "ವಿದ್ಯಾ ಸೇವೆ")}
          </h2>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[var(--brass-300)] to-transparent mx-auto mt-4 mb-5" />

          <p className="text-gray-300 text-base sm:text-lg font-serif leading-relaxed">
            {t(
              "Sponsor student study kits and stationery for children and rural school learners at Sri Kshetra Rampura. Choose individual items or full kits with pouches.",
              "ಶ್ರೀ ಕ್ಷೇತ್ರ ರಾಂಪುರದ ಗ್ರಾಮೀಣ ಶಾಲಾ ಮಕ್ಕಳಿಗೆ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪುಸ್ತಕ, ಪೆನ್ನು, ಪೆನ್ಸಿಲ್ ಅಥವಾ ಸಂಪೂರ್ಣ ವಿದ್ಯಾ ಕಿಟ್‌ಗಳನ್ನು ಪ್ರಾಯೋಜಿಸಿ."
            )}
          </p>
        </div>

        {/* Content Box */}
        <div
          className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-6 sm:p-10 shadow-2xl"
          style={{ background: "rgba(25, 22, 19, 0.92)", backdropFilter: "blur(14px)" }}
        >
          {receipt ? (
            /* Receipt Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[rgba(124,29,36,0.25)] border border-[#7C1D24] mx-auto flex items-center justify-center text-[#E5A93C] text-2xl mb-4">
                ✓
              </div>
              <span className="text-xs tracking-widest uppercase font-semibold text-[var(--brass-300)]">
                {t("Vidhya Seva Offering Received", "ವಿದ್ಯಾ ಸೇವಾ ಕಾಣಿಕೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ")}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mt-1">
                {t("Dhanyavadagalu", "ಧನ್ಯವಾದಗಳು")}
              </h3>
              <p className="text-gray-300 text-sm mt-2 max-w-md mx-auto">
                {t(
                  "May Lord Sri Vidya Hayagreeva bless you and your family with divine wisdom, intellect, and academic excellence.",
                  "ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ ಸ್ವಾಮಿಯು ನಿಮಗೂ ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೂ ಜ್ಞಾನ, ವಿದ್ಯಾಭಿವೃದ್ಧಿ ಮತ್ತು ಸಕಲ ಯಶಸ್ಸನ್ನು ಕರುಣಿಸಲಿ."
                )}
              </p>

              {/* Receipt Card */}
              <div
                className="mt-6 max-w-md mx-auto rounded-xl p-5 border border-[rgba(255,255,255,0.1)] text-left space-y-3"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.08)] pb-2.5">
                  <span className="text-xs text-gray-400">{t("Receipt No", "ರಸೀದಿ ಸಂಖ್ಯೆ")}</span>
                  <span className="font-mono text-sm font-semibold text-[var(--brass-300)]">{receipt.ref}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.08)] pb-2.5">
                  <span className="text-xs text-gray-400">{t("Devotee Name", "ಭಕ್ತರ ಹೆಸರು")}</span>
                  <span className="text-sm text-white font-medium">{receipt.donor}</span>
                </div>
                <div className="flex justify-between items-start border-b border-[rgba(255,255,255,0.08)] pb-2.5">
                  <span className="text-xs text-gray-400 pt-0.5">{t("Items Offered", "ಸಮರ್ಪಿಸಿದ ವಸ್ತುಗಳು")}</span>
                  <span className="text-xs text-right text-gray-200 font-medium max-w-[65%]">{receipt.summary}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.08)] pb-2.5">
                  <span className="text-xs text-gray-400">{t("Amount Offered", "ಸಮರ್ಪಿಸಿದ ಒಟ್ಟು ಮೊತ್ತ")}</span>
                  <span className="text-lg font-bold text-white">₹{receipt.amount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.08)] pb-2.5">
                  <span className="text-xs text-gray-400">{t("Payment ID", "ಪಾವತಿ ಸಂಖ್ಯೆ")}</span>
                  <span className="font-mono text-xs text-gray-300">{receipt.paymentId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{t("Date & Time", "ದಿನಾಂಕ & ಸಮಯ")}</span>
                  <span className="text-xs text-gray-300">{receipt.date}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider font-medium rounded-lg border border-[rgba(255,255,255,0.2)] text-gray-200 hover:bg-[rgba(255,255,255,0.05)] transition"
                >
                  {t("Print Receipt", "ರಸೀದಿ ಮುದ್ರಿಸಿ")}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-lg bg-[#7C1D24] text-white hover:bg-[#90242B] transition"
                >
                  {t("Offer Another Seva", "ಮತ್ತೊಂದು ಸೇವೆ ಸಲ್ಲಿಸಿ")}
                </button>
              </div>
            </div>
          ) : (
            /* Form Screen */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Honey pot */}
              <input
                type="text"
                name="website"
                value={websiteHoneypot}
                onChange={(e) => setWebsiteHoneypot(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* 1. Item Selection Grid */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[var(--brass-300)]">
                    {t("1. Select Vidhya Seva Items & Quantities", "1. ವಿದ್ಯಾ ಸೇವಾ ವಸ್ತುಗಳು ಮತ್ತು ಪ್ರಮಾಣ ಆಯ್ಕೆಮಾಡಿ")}
                  </label>
                  <span className="text-xs text-gray-400">
                    {t("Combine combo or individual items", "ಕಾಂಬೋ ಅಥವಾ ಪ್ರತ್ಯೇಕ ವಸ್ತುಗಳನ್ನು ಸೇರಿಸಬಹುದು")}
                  </span>
                </div>

                {/* Featured Combo Card */}
                <div className="p-4 sm:p-5 rounded-xl border-2 border-[var(--brass-300)]/40 bg-gradient-to-r from-[rgba(124,29,36,0.35)] via-[rgba(124,29,36,0.15)] to-[rgba(255,255,255,0.03)] mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#E5A93C] text-black">
                          {t("Best Offering", "ಜನಪ್ರಿಯ ಆಯ್ಕೆ")}
                        </span>
                        <h4 className="text-lg font-semibold text-white">
                          {isKn ? VIDYA_SEVA_CATALOG.combo.name_kn : VIDYA_SEVA_CATALOG.combo.name_en}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-300 mt-1 max-w-lg leading-relaxed">
                        {isKn ? VIDYA_SEVA_CATALOG.combo.desc_kn : VIDYA_SEVA_CATALOG.combo.desc_en}
                      </p>
                      <div className="text-sm font-bold text-[#E5A93C] mt-2">
                        ₹{VIDYA_SEVA_CATALOG.combo.price_rupees}{" "}
                        <span className="text-xs font-normal text-gray-400">/ {t("kit", "ಕಿಟ್")}</span>
                      </div>
                    </div>

                    {/* Quantity Controller */}
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <button
                        type="button"
                        onClick={() => updateQuantity("combo", -1)}
                        className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] text-white text-lg font-bold flex items-center justify-center border border-[rgba(255,255,255,0.15)] transition"
                        aria-label="Decrease combo quantity"
                      >
                        –
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={items.combo}
                        onChange={(e) => setDirectQuantity("combo", e.target.value)}
                        className="w-14 h-9 bg-black/40 border border-[rgba(255,255,255,0.2)] rounded-lg text-center font-bold text-base text-white focus:outline-none focus:border-[#E5A93C]"
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity("combo", 1)}
                        className="w-9 h-9 rounded-lg bg-[#7C1D24] hover:bg-[#90242B] text-white text-lg font-bold flex items-center justify-center border border-[#E5A93C]/50 transition"
                        aria-label="Increase combo quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Quick Preset Buttons for Combo */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider">{t("Quick add:", "ತ್ವರಿತ ಸೇರ್ಪಡೆ:")}</span>
                    {[1, 5, 10, 25].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => addPresetCombo(cnt)}
                        className="text-xs px-2.5 py-1 rounded bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.1)] text-gray-200 transition"
                      >
                        +{cnt} {cnt === 1 ? t("Kit", "ಕಿಟ್") : t("Kits", "ಕಿಟ್‌ಗಳು")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Individual Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {(["book", "pen", "pencil"] as const).map((key) => {
                    const cat = VIDYA_SEVA_CATALOG[key];
                    const qty = items[key] || 0;
                    return (
                      <div
                        key={key}
                        className={`p-4 rounded-xl border transition ${
                          qty > 0
                            ? "border-[rgba(229,169,60,0.4)] bg-[rgba(124,29,36,0.15)]"
                            : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-white text-base">
                              {isKn ? cat.name_kn : cat.name_en}
                            </h5>
                            <div className="text-sm font-semibold text-[#E5A93C] mt-1">
                              ₹{cat.price_rupees}{" "}
                              <span className="text-xs font-normal text-gray-400">/ {t("item", "ವಸ್ತು")}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-gray-400 mt-2 line-clamp-2">
                          {isKn ? cat.desc_kn : cat.desc_en}
                        </p>

                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[rgba(255,255,255,0.06)]">
                          <span className="text-xs text-gray-400">{t("Quantity", "ಪ್ರಮಾಣ")}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(key, -1)}
                              className="w-7 h-7 rounded bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] text-white text-sm font-bold flex items-center justify-center border border-[rgba(255,255,255,0.1)] transition"
                            >
                              –
                            </button>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={qty}
                              onChange={(e) => setDirectQuantity(key, e.target.value)}
                              className="w-10 h-7 bg-black/40 border border-[rgba(255,255,255,0.2)] rounded text-center text-xs font-semibold text-white focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => updateQuantity(key, 1)}
                              className="w-7 h-7 rounded bg-[#7C1D24] hover:bg-[#90242B] text-white text-sm font-bold flex items-center justify-center border border-[#E5A93C]/40 transition"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Live Total Readout Bar */}
                <div className="mt-4 p-4 rounded-xl bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.12)] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 block">{t("Offering Summary", "ಆಯ್ಕೆಯ ಸಾರಾಂಶ")}</span>
                    <span className="text-sm font-medium text-white">
                      {totalRupees > 0
                        ? formatVidyaSevaSummary(items, isKn)
                        : t("No items selected yet", "ಯಾವುದೇ ವಸ್ತು ಆಯ್ಕೆಮಾಡಿಲ್ಲ")}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs uppercase tracking-wider text-gray-400 block">{t("Total Offering", "ಒಟ್ಟು ಮೊತ್ತ")}</span>
                    <span className="text-2xl font-bold text-[#E5A93C] numeral">
                      ₹{totalRupees.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Devotee Details */}
              <div className="pt-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--brass-300)] mb-3">
                  {t("2. Devotee / Sankalpa Details", "2. ಭಕ್ತರ ಹಾಗೂ ಸಂಕಲ್ಪದ ವಿವರ")}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-gray-300 mb-1.5">
                      {t("Devotee Name *", "ಭಕ್ತರ ಹೆಸರು *")}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("e.g. Ramesh Sharma", "ಉದಾ: ರಮೇಶ್")}
                      className="w-full bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brass-300)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-gray-300 mb-1.5">
                      {t("WhatsApp / Mobile Number *", "ವಾಟ್ಸ್‌ಆ್ಯಪ್ / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *")}
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] text-gray-400 text-xs font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] rounded-r-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brass-300)] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-gray-300 mb-1.5">
                      {t("Gotra", "ಗೋತ್ರ")} <span className="text-gray-500 normal-case">({t("optional", "ಐಚ್ಛಿಕ")})</span>
                    </label>
                    <input
                      type="text"
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      placeholder={t("e.g. Kashyapa", "ಉದಾ: ಕಶ್ಯಪ")}
                      className="w-full bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brass-300)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-gray-300 mb-1.5">
                      {t("Email Address", "ಇಮೇಲ್ ವಿಳಾಸ")} <span className="text-gray-500 normal-case">({t("optional", "ಐಚ್ಛಿಕ")})</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="devotee@example.com"
                      className="w-full bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brass-300)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-gray-300 mb-1.5">
                      {t("Janma Nakshatra", "ಜನ್ಮ ನಕ್ಷತ್ರ")} <span className="text-gray-500 normal-case">({t("optional", "ಐಚ್ಛಿಕ")})</span>
                    </label>
                    <input
                      type="text"
                      value={nakshatra}
                      onChange={(e) => setNakshatra(e.target.value)}
                      placeholder={t("e.g. Rohini", "ಉದಾ: ರೋಹಿಣಿ")}
                      className="w-full bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brass-300)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-gray-300 mb-1.5">
                      {t("Rashi", "ರಾಶಿ")} <span className="text-gray-500 normal-case">({t("optional", "ಐಚ್ಛಿಕ")})</span>
                    </label>
                    <input
                      type="text"
                      value={rashi}
                      onChange={(e) => setRashi(e.target.value)}
                      placeholder={t("e.g. Vrishabha", "ಉದಾ: ವೃಷಭ")}
                      className="w-full bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brass-300)] transition"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-wider font-medium text-gray-300 mb-1.5">
                    {t("Prayer / Sankalpa Note", "ಪ್ರಾರ್ಥನೆ / ಸಂಕಲ್ಪದ ಟಿಪ್ಪಣಿ")}{" "}
                    <span className="text-gray-500 normal-case">({t("optional", "ಐಚ್ಛಿಕ")})</span>
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t("e.g. Dedicated for child's academic success in exams…", "ಉದಾ: ಮಕ್ಕಳ ವಿದ್ಯಾಭ್ಯಾಸ ಮತ್ತು ಪರೀಕ್ಷಾ ಯಶಸ್ಸಿಗಾಗಿ…")}
                    className="w-full bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brass-300)] transition"
                  />
                </div>
              </div>

              {/* Status Notice */}
              {statusMsg && (
                <div
                  className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium ${
                    isError
                      ? "bg-red-950/60 border border-red-800 text-red-200"
                      : "bg-[#7C1D24]/40 border border-[#E5A93C]/40 text-[#E5A93C]"
                  }`}
                >
                  {statusMsg}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || totalRupees < 15}
                  className="w-full py-4 rounded-xl font-display font-semibold text-base sm:text-lg tracking-wide uppercase transition shadow-lg flex items-center justify-center gap-2 bg-[#7C1D24] hover:bg-[#94222B] text-white border border-[#E5A93C]/40 shadow-[#7C1D24]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span>{t("Processing…", "ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ…")}</span>
                  ) : (
                    <>
                      <span>
                        {t("Offer Vidhya Seva", "ವಿದ್ಯಾ ಸೇವೆ ಸಮರ್ಪಿಸಿ")} &middot; ₹{totalRupees.toLocaleString("en-IN")}
                      </span>
                      <span>→</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-gray-400 mt-3 flex items-center justify-center gap-1.5">
                  <span>🔒</span>
                  <span>
                    {t(
                      "Secure online payment via Razorpay. UPI, Cards & NetBanking accepted.",
                      "Razorpay ಮೂಲಕ ಸುರಕ್ಷಿತ ಪಾವತಿ. UPI, ಕಾರ್ಡ್‌ಗಳು ಮತ್ತು ನೆಟ್‌ಬ್ಯಾಂಕಿಂಗ್ ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ."
                    )}
                  </span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
