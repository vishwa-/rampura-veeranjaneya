"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const PRESET_AMOUNTS = [101, 251, 501, 1001, 2501, 5001];

interface DonationSectionProps {
  embedded?: boolean;
}

export const DonationSection: React.FC<DonationSectionProps> = ({ embedded = false }) => {
  const { isKn, t } = useLanguage();

  const [selectedPreset, setSelectedPreset] = useState<number | null>(501);
  const [customAmount, setCustomAmount] = useState<string>("501");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gotra, setGotra] = useState("");
  const [pan, setPan] = useState("");
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
  } | null>(null);

  const handlePresetClick = (amt: number) => {
    setSelectedPreset(amt);
    setCustomAmount(amt.toString());
  };

  const handleCustomAmountChange = (val: string) => {
    const cleaned = val.replace(/[^\d]/g, "");
    setCustomAmount(cleaned);
    const num = parseInt(cleaned, 10);
    if (!isNaN(num) && PRESET_AMOUNTS.includes(num)) {
      setSelectedPreset(num);
    } else {
      setSelectedPreset(null);
    }
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

    const amtNum = parseInt(customAmount, 10);
    if (isNaN(amtNum) || amtNum < 10) {
      setStatusMsg(t("Please enter a donation amount of at least ₹10.", "ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ₹10 ಕಾಣಿಕೆ ಮೊತ್ತ ನಮೂದಿಸಿ."));
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
    setStatusMsg(t("Preparing your donation payment…", "ಕಾಣಿಕೆ ಪಾವತಿ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ…"));
    setIsError(false);

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          phone: "+91" + digits,
          email: email.trim() || undefined,
          gotra: gotra.trim() || undefined,
          pan: pan.trim() || undefined,
          note: note.trim() || undefined,
          amount: amtNum,
          lang: isKn ? "kn" : "en",
          website: websiteHoneypot,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.message || t("Could not create donation order. Please try again.", "ಕಾಣಿಕೆ ಆರ್ಡರ್ ಸೃಷ್ಟಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ."));
      }

      if (!data.has_gateway || !data.order_id) {
        // Direct / Offline mode fallback
        setReceipt({
          ref: data.donation_ref,
          amount: amtNum,
          donor: trimmedName,
          paymentId: "Direct",
          date: new Date().toLocaleDateString("en-IN"),
        });
        setSubmitting(false);
        return;
      }

      // Open Razorpay Checkout
      await loadRazorpay();
      const rzp = new window.Razorpay({
        key: data.key_id,
        order_id: data.order_id,
        amount: data.amount_paise,
        currency: "INR",
        name: "Sri Kshetra Rampura",
        description: "Seva Kanike / E-Hundi · " + data.donation_ref,
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
        handler: async (resp: any) => {
          setStatusMsg(t("Verifying your payment…", "ನಿಮ್ಮ ಪಾವತಿಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…"));
          try {
            const vRes = await fetch("/api/donate/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_signature: resp.razorpay_signature,
              }),
            });
            const vData = await vRes.json();
            if (vRes.ok && vData.status === "paid") {
              setReceipt({
                ref: vData.donation_ref,
                amount: vData.amount_rupees,
                donor: vData.donor_name || trimmedName,
                paymentId: vData.razorpay_payment_id || resp.razorpay_payment_id,
                date: new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              });
              setStatusMsg("");
            } else {
              // Webhook fallback acknowledgment
              setReceipt({
                ref: data.donation_ref,
                amount: amtNum,
                donor: trimmedName,
                paymentId: resp.razorpay_payment_id,
                date: new Date().toLocaleDateString("en-IN"),
              });
              setStatusMsg("");
            }
          } catch {
            setReceipt({
              ref: data.donation_ref,
              amount: amtNum,
              donor: trimmedName,
              paymentId: resp.razorpay_payment_id,
              date: new Date().toLocaleDateString("en-IN"),
            });
          } finally {
            setSubmitting(false);
          }
        },
      });

      rzp.open();
    } catch (err: any) {
      console.error("[Donation Error]:", err);
      setStatusMsg(err.message || t("An unexpected error occurred. Please try again.", "ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ."));
      setIsError(true);
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setReceipt(null);
    setName("");
    setPhone("");
    setEmail("");
    setGotra("");
    setPan("");
    setNote("");
    setCustomAmount("501");
    setSelectedPreset(501);
    setStatusMsg("");
    setIsError(false);
  };

  return (
    <section id="donate" className={`${embedded ? "" : "py-20 sm:py-28 bg-[#1A1714] text-white border-t border-[#2E2822]"} relative overflow-hidden`}>
      {/* Subtle Background Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(196,77,18,0.12) 0%, rgba(26,23,20,0) 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="wrap max-w-4xl mx-auto relative z-10 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(217,119,6,0.35)] bg-[rgba(217,119,6,0.08)] mb-3">
            <span className="text-xs uppercase tracking-widest font-medium text-[var(--brass-300)]">
              {t("E-Hundi · Seva Kanike", "ಇ-ಹುಂಡಿ · ಸೇವಾ ಕಾಣಿಕೆ")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-cream tracking-tight">
            {t("Offer your Kanike to Sri Swamy", "ಶ್ರೀ ಸ್ವಾಮಿಗೆ ಭಕ್ತಿಯ ಕಾಣಿಕೆ ಸಮರ್ಪಿಸಿ")}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t(
              "Your voluntary contribution supports the daily abhishekas, sanctum maintenance, and holy development of Sri Kshetra Rampura. Pay securely through UPI, Card, or NetBanking.",
              "ನಿಮ್ಮ ಭಕ್ತಿಯ ಕಾಣಿಕೆಯು ಶ್ರೀ ಕ್ಷೇತ್ರ ರಾಂಪುರದ ನಿತ್ಯ ಪೂಜೆ, ಅಭಿಷೇಕ, ಗರ್ಭಗುಡಿ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಧಾರ್ಮಿಕ ಸೇವೆಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ. UPI ಅಥವಾ ಕಾರ್ಡ್ ಮೂಲಕ ಸುರಕ್ಷಿತವಾಗಿ ಸಮರ್ಪಿಸಿ."
            )}
          </p>
        </div>

        {/* Content Box */}
        <div
          className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-6 sm:p-10 shadow-2xl"
          style={{ background: "rgba(25, 22, 19, 0.88)", backdropFilter: "blur(12px)" }}
        >
          {receipt ? (
            /* Confirmation & Receipt Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[rgba(124,29,36,0.2)] border border-[#7C1D24] mx-auto flex items-center justify-center text-[#E5A93C] text-2xl mb-4">
                ✓
              </div>
              <span className="text-xs tracking-widest uppercase font-semibold text-[var(--brass-300)]">
                {t("Kanike Received", "ಕಾಣಿಕೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ")}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mt-1">
                {t("Dhanyavadagalu", "ಧನ್ಯವಾದಗಳು")}
              </h3>
              <p className="text-gray-300 text-sm mt-2 max-w-md mx-auto">
                {t(
                  "May Lord Kubera Anjaneya Swamy bestow health, prosperity, and peace upon you and your family.",
                  "ಶ್ರೀ ಕುಬೇರ ಆಂಜನೇಯ ಸ್ವಾಮಿಯು ನಿಮಗೂ ನಿಮ್ಮ ಪರಿವಾರಕ್ಕೂ ಆಯುರಾರೋಗ್ಯ, ಐಶ್ವರ್ಯ ಮತ್ತು ಶಾಂತಿ ಕರುಣಿಸಲಿ."
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
                <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.08)] pb-2.5">
                  <span className="text-xs text-gray-400">{t("Amount Offered", "ಸಮರ್ಪಿಸಿದ ಮೊತ್ತ")}</span>
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
                  {t("Offer Another Kanike", "ಮತ್ತೊಂದು ಕಾಣಿಕೆ ಸಮರ್ಪಿಸಿ")}
                </button>
              </div>
            </div>
          ) : (
            /* Donation Entry Form */
            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Amount Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[var(--brass-300)] mb-3">
                  {t("Select or Enter Kanike Amount", "ಕಾಣಿಕೆ ಮೊತ್ತವನ್ನು ಆರಿಸಿ ಅಥವಾ ನಮೂದಿಸಿ")}
                </label>

                {/* Preset Chips */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-4">
                  {PRESET_AMOUNTS.map((amt) => {
                    const active = selectedPreset === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handlePresetClick(amt)}
                        className={`py-2.5 px-3 rounded-xl text-center text-sm font-semibold transition border ${
                          active
                            ? "bg-[#7C1D24] text-white border-[#E5A93C] shadow-md shadow-[#7C1D24]/30"
                            : "bg-[rgba(255,255,255,0.04)] text-gray-200 border-[rgba(255,255,255,0.1)] hover:border-[rgba(217,119,6,0.5)] hover:bg-[rgba(255,255,255,0.08)]"
                        }`}
                      >
                        ₹{amt.toLocaleString("en-IN")}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Box */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-medium text-[var(--brass-300)]">
                    ₹
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder={t("Enter custom amount (min ₹10)", "ಕಸ್ಟಮ್ ಮೊತ್ತ ನಮೂದಿಸಿ (ಕನಿಷ್ಠ ₹10)")}
                    className="w-full bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.15)] rounded-xl py-3 pl-10 pr-4 text-xl font-semibold text-white placeholder-gray-500 focus:outline-none focus:border-[#E5A93C] transition"
                  />
                </div>
              </div>

              {/* Devotee Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      maxLength={10}
                      className="w-full bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] rounded-r-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brass-300)] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-1.5">
                    {t("Email (Optional)", "ಇಮೇಲ್ (ಐಚ್ಛಿಕ)")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ramesh@example.com"
                    className="w-full bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brass-300)] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-1.5">
                    {t("Gotra / Sankalpa (Optional)", "ಗೋತ್ರ / ಸಂಕಲ್ಪ (ಐಚ್ಛಿಕ)")}
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
                  <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-1.5">
                    {t("PAN Number (Optional, for 80G receipt)", "ಪ್ಯಾನ್ ಸಂಖ್ಯೆ (ಐಚ್ಛಿಕ, ರಸೀದಿಗೆ)")}
                  </label>
                  <input
                    type="text"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    className="w-full uppercase font-mono bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brass-300)] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-gray-400 mb-1.5">
                    {t("Prayer or Note (Optional)", "ಪ್ರಾರ್ಥನೆ ಅಥವಾ ಟಿಪ್ಪಣಿ (ಐಚ್ಛಿಕ)")}
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t("Any special prayer or message", "ವಿಶೇಷ ಪ್ರಾರ್ಥನೆ ಅಥವಾ ಸಂದೇಶ")}
                    className="w-full bg-[rgba(0,0,0,0.35)] border border-[rgba(255,255,255,0.12)] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brass-300)] transition"
                  />
                </div>
              </div>

              {/* Status & Error Message */}
              {statusMsg && (
                <div
                  className={`p-3.5 rounded-lg text-sm ${
                    isError
                      ? "bg-red-950/60 border border-red-800 text-red-200"
                      : "bg-amber-950/50 border border-amber-700/60 text-amber-200"
                  }`}
                >
                  {statusMsg}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-xl font-medium tracking-wide text-base bg-[#7C1D24] hover:bg-[#92242B] active:bg-[#68171E] text-white shadow-xl shadow-[#7C1D24]/30 border border-[#A1343C] transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>{t("Processing…", "ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ…")}</span>
                  ) : (
                    <>
                      <span>
                        {isKn
                          ? `₹${customAmount || "0"} ಕಾಣಿಕೆ ಸಮರ್ಪಿಸಿ →`
                          : `Offer Kanike of ₹${customAmount || "0"} →`}
                      </span>
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  🔒 {t("100% Secure payments via Razorpay · Official Devasthanam Account", "100% ಸುರಕ್ಷಿತ ಪಾವತಿ · ದೇವಸ್ಥಾನದ ಅಧಿಕೃತ ಖಾತೆ")}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
