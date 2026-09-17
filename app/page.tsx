"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";
import { NakshatraWheel } from "@/components/NakshatraWheel";

export default function HomePage() {
  const { t } = useLanguage();
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const hideAfter = Date.parse("2026-09-06T00:00:00+05:30");
    if (!isNaN(hideAfter) && Date.now() >= hideAfter) {
      setShowAnnouncement(false);
    }
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      {showAnnouncement && (
        <Link
          href="/events"
          className="block bg-dark"
          style={{ textDecoration: "none" }}
        >
          <div
            className="wrap flex items-center justify-center gap-x-4 gap-y-1 flex-wrap text-center"
            style={{ padding: "11px clamp(1rem,5vw,4rem)" }}
          >
            <span className="font-kn" style={{ color: "var(--brass-300)", fontSize: 13 }}>
              {t("Shravana at Rampura", "ರಾಂಪುರದಲ್ಲಿ ಶ್ರಾವಣ")}
            </span>
            <span style={{ color: "var(--border-on-dark)" }}>·</span>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "var(--cream-50)" }}>
              {t(
                "Vishesha pooja every Saturday · Hayagreeva Jayanthi Aug 27 · Mandalabhisheka Aug 29–30",
                "ಪ್ರತಿ ಶನಿವಾರ ವಿಶೇಷ ಪೂಜೆ · ಹಯಗ್ರೀವ ಜಯಂತಿ ಆಗಸ್ಟ್ 27 · ಮಂಡಲಾಭಿಷೇಕ ಆಗಸ್ಟ್ 29–30"
              )}
            </span>
            <span style={{ color: "var(--border-on-dark)" }}>·</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent-primary)" }}>
              {t("All events →", "ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು →")}
            </span>
          </div>
        </Link>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh", display: "flex", alignItems: "flex-end" }}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "50% 36%" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/img/hero-poster.jpg"
          aria-label="Lord Anjaneya in meditation"
        >
          <source src="/assets/video/hero.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom,rgba(20,18,15,0.16) 0%,rgba(20,18,15,0) 24%,rgba(20,18,15,0) 50%,rgba(20,18,15,0.55) 74%,rgba(20,18,15,0.92) 100%)",
          }}
        ></div>

        <ScrollReveal
          className="absolute"
          style={{
            top: "clamp(22px,5vh,52px)",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 2,
            fontFamily: "var(--font-ui)",
            fontSize: ".875rem",
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            color: "var(--brass-300)",
            textShadow: "0 1px 8px rgba(0,0,0,.5)",
          }}
        >
          {t("Sri Kshetra Rampura", "ಶ್ರೀ ಕ್ಷೇತ್ರ ರಾಂಪುರ")}
        </ScrollReveal>

        <div className="relative wrap text-center" style={{ zIndex: 2, paddingBottom: "clamp(14px,2.5vh,28px)" }}>
          <ScrollReveal delay={80}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(2.8rem,8vw,5.5rem)",
                lineHeight: 1.02,
                letterSpacing: ".01em",
                color: "var(--cream-50)",
                textShadow: "0 2px 24px rgba(0,0,0,.45)",
              }}
              dangerouslySetInnerHTML={{
                __html: t("Sri Kubera<br />Anjaneya Swamy", "ಶ್ರೀ ಕುಬೇರ<br />ಆಂಜನೇಯ ಸ್ವಾಮಿ"),
              }}
            />
          </ScrollReveal>

          <ScrollReveal delay={140} className="flex justify-center" style={{ margin: "12px 0" }}>
            <span className="ornate">
              <i></i>
            </span>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.2rem,3vw,1.6rem)",
                fontStyle: "italic",
                lineHeight: 1.4,
                color: "var(--text-on-dark-dim)",
                maxWidth: "40ch",
                margin: "0 auto 24px",
              }}
            >
              {t(
                "“Swift as the wind, still as the river; here Anjaneya abides.”",
                "“ಗಾಳಿಯಂತೆ ವೇಗ, ನದಿಯಂತೆ ಪ್ರಶಾಂತ; ಇಲ್ಲಿ ಆಂಜನೇಯ ನೆಲೆಸಿದ್ದಾನೆ.”"
              )}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200} className="flex gap-3 justify-center flex-wrap">
            <Link href="/sevas#book" className="btn btn-light btn-lg">
              {t("Book a Pooja", "ಪೂಜೆ ಬುಕ್ ಮಾಡಿ")}
            </Link>
            <Link href="/visit" className="btn btn-ghost-dark btn-lg">
              {t("Plan a Visit", "ಭೇಟಿ ಯೋಜಿಸಿ")}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Hero Status Strip */}
      <section className="bg-dark text-dark-text border-b border-dark-line">
        <div className="wrap flex justify-center flex-wrap" style={{ gap: "clamp(20px,6vw,72px)", padding: "20px clamp(1.25rem,5vw,4rem)" }}>
          <div className="text-center">
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--brass-300)" }}>
              {t("Open now", "ಈಗ ತೆರೆದಿದೆ")}
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--cream-50)", marginTop: 3 }}>
              {t("Sanctum · 5:30 AM – 12:30 PM", "ಗರ್ಭಗುಡಿ · ಬೆ. 5:30 – ಮ. 12:30")}
            </div>
          </div>
          <div className="text-center">
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--brass-300)" }}>
              {t("Evening aarti", "ಸಂಜೆ ಆರತಿ")}
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--cream-50)", marginTop: 3 }}>
              {t("Deeparadhana · 6:00 PM", "ದೀಪಾರಾಧನೆ · ಸಂ. 6:00")}
            </div>
          </div>
          <div className="text-center">
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--brass-300)" }}>
              {t("On the Cauvery", "ಕಾವೇರಿ ತೀರದಲ್ಲಿ")}
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--cream-50)", marginTop: 3 }}>
              12.42°N · 76.68°E
            </div>
          </div>
        </div>
      </section>

      {/* Online Booking Evergreen Promo */}
      <section className="bg-dark text-dark-text border-t border-dark-line">
        <div className="wrap py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <ScrollReveal className="lg:col-span-7">
            <span className="eyebrow" style={{ color: "var(--brass-300)" }}>
              {t("Online booking", "ಆನ್‌ಲೈನ್ ಬುಕಿಂಗ್")}
            </span>
            <h2
              className="display text-white text-3xl sm:text-5xl mt-4"
              dangerouslySetInnerHTML={{
                __html: t(
                  'Book a pooja, <em class="italic font-normal">from anywhere.</em>',
                  'ಎಲ್ಲಿಂದಲಾದರೂ, ಪೂಜೆ <em class="italic font-normal">ಬುಕ್ ಮಾಡಿ.</em>'
                ),
              }}
            />
            <p className="mt-5 text-dark-muted leading-[1.8] max-w-xl">
              {t(
                "Choose a pooja and an open date, share your sankalpa details, and pay securely by UPI or card. Your confirmation and a reminder arrive on WhatsApp.",
                "ಪೂಜೆ ಮತ್ತು ತೆರೆದ ದಿನಾಂಕವನ್ನು ಆರಿಸಿ, ಸಂಕಲ್ಪದ ವಿವರ ತಿಳಿಸಿ, UPI ಅಥವಾ ಕಾರ್ಡ್ ಮೂಲಕ ಸುರಕ್ಷಿತವಾಗಿ ಪಾವತಿಸಿ. ದೃಢೀಕರಣ ಮತ್ತು ಜ್ಞಾಪನೆ ನಿಮ್ಮ ವಾಟ್ಸ್‌ಆ್ಯಪ್‌ಗೆ ಬರುತ್ತದೆ."
              )}
            </p>
            <div className="flex gap-3 flex-wrap mt-8">
              <Link href="/sevas#book" className="btn btn-light">
                {t("Book a Pooja →", "ಪೂಜೆ ಬುಕ್ ಮಾಡಿ →")}
              </Link>
              <Link href="/sevas#office" className="btn btn-ghost-dark">
                {t("Sevas at the office", "ಕಚೇರಿಯಲ್ಲಿ ಸೇವೆಗಳು")}
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120} className="lg:col-span-5">
            <div style={{ border: "1px solid var(--border-on-dark)", borderRadius: "var(--radius-lg)", padding: "clamp(1.5rem,3vw,2.25rem)", background: "rgba(255,255,255,0.03)" }}>
              <div className="eyebrow" style={{ color: "var(--brass-300)" }}>
                {t("How it works", "ಇದು ಹೇಗೆ ನಡೆಯುತ್ತದೆ")}
              </div>
              <ul className="space-y-3 text-sm mt-4" style={{ color: "var(--text-on-dark-dim)" }}>
                <li className="flex gap-3">
                  <span className="numeral" style={{ color: "var(--brass-300)" }}>1</span>
                  <span>{t("Pick a pooja and an open date.", "ಪೂಜೆ ಮತ್ತು ತೆರೆದ ದಿನಾಂಕ ಆರಿಸಿ.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="numeral" style={{ color: "var(--brass-300)" }}>2</span>
                  <span>{t("Share the names, gotra, nakshatra and rashi.", "ಸಂಕಲ್ಪಕ್ಕೆ ಹೆಸರು, ಗೋತ್ರ, ನಕ್ಷತ್ರ, ರಾಶಿ ತಿಳಿಸಿ.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="numeral" style={{ color: "var(--brass-300)" }}>3</span>
                  <span>{t("Pay securely; confirmation on WhatsApp.", "ಸುರಕ್ಷಿತವಾಗಿ ಪಾವತಿಸಿ; ದೃಢೀಕರಣ ವಾಟ್ಸ್‌ಆ್ಯಪ್‌ನಲ್ಲಿ.")}</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Consecration */}
      <section className="inv-section border-b border-line" id="consecration">
        <div className="wrap" style={{ paddingTop: "clamp(2.5rem,6vw,5rem)", paddingBottom: "clamp(2.5rem,6vw,5rem)" }}>
          <ScrollReveal className="inv-frame">
            <svg className="inv-corner tl" width="46" height="46" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 23 C5 12 12 5 23 5" />
              <path d="M5 31 C5 15 15 5 31 5" />
              <path d="M13 5 C19 8 22 13 22 20" />
              <path d="M5 13 C8 19 13 22 20 22" />
              <circle cx="11" cy="11" r="2" fill="currentColor" stroke="none" />
            </svg>
            <svg className="inv-corner tr" width="46" height="46" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 23 C5 12 12 5 23 5" />
              <path d="M5 31 C5 15 15 5 31 5" />
              <path d="M13 5 C19 8 22 13 22 20" />
              <path d="M5 13 C8 19 13 22 20 22" />
              <circle cx="11" cy="11" r="2" fill="currentColor" stroke="none" />
            </svg>

            <svg className="inv-toran l" viewBox="0 0 180 80" fill="none" aria-hidden="true">
              <path d="M2 11 C55 31 130 31 178 13" stroke="#B89238" strokeWidth="2" />
              <g fill="#5d7d33">
                <path d="M22 15 C15 25 15 37 22 47 C29 37 29 25 22 15Z" />
                <path d="M48 21 C40 32 40 46 48 57 C56 46 56 32 48 21Z" />
                <path d="M74 25 C65 37 65 52 74 64 C83 52 83 37 74 25Z" />
                <path d="M100 25 C91 37 91 52 100 64 C109 52 109 37 100 25Z" />
                <path d="M126 21 C118 32 118 46 126 57 C134 46 134 32 126 21Z" />
                <path d="M152 15 C145 25 145 37 152 47 C159 37 159 25 152 15Z" />
              </g>
              <g stroke="#415d23" strokeWidth="1" opacity=".55">
                <path d="M22 19V43" /><path d="M48 25V53" /><path d="M74 30V60" />
                <path d="M100 30V60" /><path d="M126 25V53" /><path d="M152 19V43" />
              </g>
            </svg>
            <svg className="inv-toran r" viewBox="0 0 180 80" fill="none" aria-hidden="true">
              <path d="M2 11 C55 31 130 31 178 13" stroke="#B89238" strokeWidth="2" />
              <g fill="#5d7d33">
                <path d="M22 15 C15 25 15 37 22 47 C29 37 29 25 22 15Z" />
                <path d="M48 21 C40 32 40 46 48 57 C56 46 56 32 48 21Z" />
                <path d="M74 25 C65 37 65 52 74 64 C83 52 83 37 74 25Z" />
                <path d="M100 25 C91 37 91 52 100 64 C109 52 109 37 100 25Z" />
                <path d="M126 21 C118 32 118 46 126 57 C134 46 134 32 126 21Z" />
                <path d="M152 15 C145 25 145 37 152 47 C159 37 159 25 152 15Z" />
              </g>
              <g stroke="#415d23" strokeWidth="1" opacity=".55">
                <path d="M22 19V43" /><path d="M48 25V53" /><path d="M74 30V60" />
                <path d="M100 30V60" /><path d="M126 25V53" /><path d="M152 19V43" />
              </g>
            </svg>

            <div className="inv-inner">
              <div className="inv-om">
                <span className="inv-orn"></span>
                <span>
                  <span className="font-deva inv-gold" style={{ fontSize: "1.25rem", verticalAlign: "-2px" }}>
                    ॐ
                  </span>{" "}
                  <span className="inv-maroon" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.05rem,2.6vw,1.35rem)", letterSpacing: ".02em" }}>
                    {t("Sri Rama Jayam", "ಶ್ರೀ ರಾಮ ಜಯಂ")}
                  </span>
                </span>
                <span className="inv-orn r"></span>
              </div>

              <div className="font-kn inv-sloka" style={{ marginTop: "1.25rem" }}>
                <div>ಮನೋಜವಂ ಮಾರುತ ತುಲ್ಯ ವೇಗಂ ।</div>
                <div>ಜಿತೇಂದ್ರಿಯಂ ಬುದ್ಧಿ ಮತಾಂವರಿಷ್ಠಂ ॥</div>
                <div>ವಾತಾತ್ಮಜಂ ವಾನರ ಯೂಥಮುಖ್ಯಂ ।</div>
                <div>ಶ್ರೀರಾಮದೂತಂ ಶಿರಸಾ ನಮಾಮಿ ॥</div>
              </div>

              <p style={{ marginTop: "1.5rem", color: "#5b5045", fontFamily: "var(--font-serif)", fontSize: "clamp(.95rem,2vw,1.05rem)", lineHeight: 1.6, maxWidth: "48ch", marginLeft: "auto", marginRight: "auto" }}>
                {t(
                  "In the presence of the entire Rampura gramastharu and devotees from far and near, on July 3 – 5, 2026, this temple witnessed the",
                  "ಸಮಸ್ತ ರಾಂಪುರ ಗ್ರಾಮಸ್ಥರು ಮತ್ತು ದೂರದೂರದಿಂದ ಬಂದ ಭಕ್ತರ ಸಮ್ಮುಖದಲ್ಲಿ, ಜುಲೈ 3 – 5, 2026 ರಂದು ಈ ದೇವಸ್ಥಾನದಲ್ಲಿ ನೆರವೇರಿತು:"
                )}
              </p>

              <h2 className="inv-title inv-maroon" style={{ marginTop: "1.9rem" }}>
                {t("Jeernoddhara Maha Kumbhabhishekam", "ಜೀರ್ಣೋದ್ಧಾರ ಮಹಾ ಕುಂಭಾಭಿಷೇಕ")}
              </h2>
              <div className="inv-label" style={{ marginTop: ".85rem" }}>{t("of", "ಇದರ")}</div>
              <div className="inv-name inv-maroon" style={{ marginTop: ".3rem" }}>
                {t("Sri Anjaneya Swamy Devasthanam", "ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ")}
              </div>
              <div className="inv-label" style={{ marginTop: ".75rem" }}>{t("and", "ಮತ್ತು")}</div>
              <div className="inv-name inv-maroon" style={{ marginTop: ".3rem" }}>
                {t("Prathisthapana of Sri Vidya Hayagreeva Swamy", "ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ ಸ್ವಾಮಿ ಪ್ರತಿಷ್ಠಾಪನೆ")}
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <span className="inv-chip">
                  {t(
                    "Rampura Village, Srirangapatna Taluk · Mandya District – 571427, Karnataka",
                    "ರಾಂಪುರ ಗ್ರಾಮ, ಶ್ರೀರಂಗಪಟ್ಟಣ ತಾಲ್ಲೂಕು · ಮಂಡ್ಯ ಜಿಲ್ಲೆ – 571427, ಕರ್ನಾಟಕ"
                  )}
                </span>
              </div>

              <div className="inv-divider" style={{ marginTop: "1.9rem" }}>
                <i></i>
                <span className="inv-gold" style={{ fontSize: ".78rem" }}>❖</span>
                <i></i>
              </div>

              <div className="inv-label" style={{ marginTop: "1.5rem", color: "#9a8a55" }}>
                {t("Sampoorna", "ಸಂಪೂರ್ಣ")}
              </div>
              <p style={{ marginTop: ".65rem", color: "#5E1419", fontFamily: "var(--font-serif)", fontSize: "clamp(1rem,2.4vw,1.2rem)", lineHeight: 1.7, maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
                {t(
                  "The kalashas were poured, the prana prathishte of both Swamys was performed, and the rathotsava circled the village. The temple now stands consecrated.",
                  "ಕಲಶಾಭಿಷೇಕ ನೆರವೇರಿತು, ಇಬ್ಬರೂ ಸ್ವಾಮಿಗಳ ಪ್ರಾಣ ಪ್ರತಿಷ್ಠೆ ಸಂಪನ್ನವಾಯಿತು, ರಥೋತ್ಸವವು ಗ್ರಾಮವನ್ನು ಸುತ್ತಿತು. ದೇವಸ್ಥಾನವು ಈಗ ಪ್ರತಿಷ್ಠಿತವಾಗಿ ನಿಂತಿದೆ."
                )}
              </p>

              <div className="inv-cols" style={{ marginTop: "2.1rem", textAlign: "center" }}>
                <div>
                  <div className="inv-label">{t("Under the guidance of", "ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ")}</div>
                  <div className="inv-divider" style={{ margin: ".5rem 0" }}>
                    <i style={{ width: 34 }}></i>
                    <span className="inv-gold" style={{ fontSize: ".58rem" }}>✦</span>
                    <i style={{ width: 34 }}></i>
                  </div>
                  <div className="inv-credit">{t("Pancharatra Agama Praveena Vidwan", "ಪಾಂಚರಾತ್ರ ಆಗಮ ಪ್ರವೀಣ ವಿದ್ವಾನ್")}</div>
                  <div className="inv-name inv-maroon" style={{ marginTop: ".15rem" }}>
                    {t("Sri B.R. Gopal Bhattar", "ಶ್ರೀ ಬಿ.ಆರ್. ಗೋಪಾಲ ಭಟ್ಟರ್")}
                  </div>
                  <div className="inv-credit" style={{ fontSize: ".85rem", color: "#6b6052" }}>
                    {t("Bengaluru", "ಬೆಂಗಳೂರು")}
                  </div>
                </div>
                <div className="inv-colsep" aria-hidden="true"></div>
                <div>
                  <div className="inv-label">{t("Organized by", "ಆಯೋಜಕರು")}</div>
                  <div className="inv-divider" style={{ margin: ".5rem 0" }}>
                    <i style={{ width: 34 }}></i>
                    <span className="inv-gold" style={{ fontSize: ".58rem" }}>✦</span>
                    <i style={{ width: 34 }}></i>
                  </div>
                  <div className="inv-name inv-maroon">{t("Devatha Family", "ದೇವತಾ ಕುಟುಂಬ")}</div>
                  <div className="inv-credit" style={{ marginTop: ".15rem" }}>
                    {t("Smt. D.K. Sathyavathi & Sri D.R. Krishna Prasad", "ಶ್ರೀಮತಿ ಡಿ.ಕೆ. ಸತ್ಯವತಿ ಮತ್ತು ಶ್ರೀ ಡಿ.ಆರ್. ಕೃಷ್ಣ ಪ್ರಸಾದ್")}
                  </div>
                </div>
              </div>

              <p className="inv-request" style={{ marginTop: "1.9rem", maxWidth: "46ch", marginLeft: "auto", marginRight: "auto", fontSize: "clamp(.95rem,2vw,1.08rem)", lineHeight: 1.6 }}>
                {t(
                  "We offer our gratitude to every hand and every heart that made the three days possible.",
                  "ಈ ಮೂರು ದಿನಗಳನ್ನು ಸಾಧ್ಯವಾಗಿಸಿದ ಪ್ರತಿಯೊಂದು ಕೈ ಮತ್ತು ಪ್ರತಿಯೊಂದು ಹೃದಯಕ್ಕೂ ನಾವು ಕೃತಜ್ಞತೆ ಸಲ್ಲಿಸುತ್ತೇವೆ."
                )}
              </p>

              <div className="flex gap-3 justify-center flex-wrap" style={{ marginTop: "1.9rem" }}>
                <Link href="/events#kumbhabhishekam" className="btn btn-lg inv-btn-m">
                  {t("The programme, as performed", "ನೆರವೇರಿದ ಪೂರ್ಣ ಕಾರ್ಯಕ್ರಮ")}
                </Link>
                <a href="mailto:info@rampura.in?subject=Kumbhabhishekam%20photographs" className="btn btn-lg inv-btn-g">
                  {t("Share your photographs", "ನಿಮ್ಮ ಛಾಯಾಚಿತ್ರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ")}
                </a>
              </div>

              <p className="inv-regards" style={{ marginTop: "1.9rem" }} dangerouslySetInnerHTML={{
                __html: t(
                  'With respectful regards · <span class="inv-maroon" style="font-weight:600">Devatha Family</span><br />D.R. Krishna Prasad · D.K. Sathyavathi · D.K. Pranav · M.I Srisha · D.P. Takshvi · D.K. Ramitha',
                  'ಗೌರವಪೂರ್ವಕ ನಮನಗಳೊಂದಿಗೆ · <span class="inv-maroon" style="font-weight:600">ದೇವತಾ ಕುಟುಂಬ</span><br />ಡಿ.ಆರ್. ಕೃಷ್ಣ ಪ್ರಸಾದ್ · ಡಿ.ಕೆ. ಸತ್ಯವತಿ · ಡಿ.ಕೆ. ಪ್ರಣವ್ · ಎಂ.ಐ ಶ್ರೀಶ · ಡಿ.ಪಿ. ತಕ್ಷ್ವಿ · ಡಿ.ಕೆ. ರಮಿತಾ'
                )
              }} />

              <svg className="inv-diya l" viewBox="0 0 48 46" fill="none" aria-hidden="true">
                <path d="M24 4 C29 13 28 19 24 23 C20 19 19 13 24 4Z" fill="#E8923A" />
                <path d="M24 10 C26.5 15 26 18.5 24 21 C22 18.5 21.5 15 24 10Z" fill="#F7CE6A" />
                <path d="M7 30 C10 41 38 41 41 30 C41 30 34 35 24 35 C14 35 7 30 7 30Z" fill="#9a6326" />
                <ellipse cx="24" cy="30" rx="17.5" ry="5" fill="#caa24c" />
                <ellipse cx="24" cy="29.5" rx="12.5" ry="3" fill="#7a4e22" />
              </svg>
              <svg className="inv-diya r" viewBox="0 0 48 46" fill="none" aria-hidden="true">
                <path d="M24 4 C29 13 28 19 24 23 C20 19 19 13 24 4Z" fill="#E8923A" />
                <path d="M24 10 C26.5 15 26 18.5 24 21 C22 18.5 21.5 15 24 10Z" fill="#F7CE6A" />
                <path d="M7 30 C10 41 38 41 41 30 C41 30 34 35 24 35 C14 35 7 30 7 30Z" fill="#9a6326" />
                <ellipse cx="24" cy="30" rx="17.5" ry="5" fill="#caa24c" />
                <ellipse cx="24" cy="29.5" rx="12.5" ry="3" fill="#7a4e22" />
              </svg>
            </div>

            <div className="inv-band">
              {t("With gratitude to the entire Rampura Gramastharu and all devotees", "ಸಮಸ್ತ ರಾಂಪುರ ಗ್ರಾಮಸ್ಥರು ಮತ್ತು ಎಲ್ಲಾ ಭಕ್ತರಿಗೆ ಕೃತಜ್ಞತೆಗಳು")}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Temple Reborn */}
      <section className="bg-bg border-b border-line">
        <div className="wrap py-24 sm:py-32">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow">{t("A Village Reborn", "ಪುನರುಜ್ಜೀವಿತ ಗ್ರಾಮ · ಜೀರ್ಣೋದ್ಧಾರ")}</div>
            <h2
              className="display text-4xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t(
                  'After a year of renewal,<br />the temple <em class="italic font-normal text-accent">rises again.</em>',
                  'ಒಂದು ವರ್ಷದ ನವೀಕರಣದ ನಂತರ,<br />ದೇವಸ್ಥಾನ <em class="italic font-normal text-accent">ಮತ್ತೆ ಎದ್ದು ನಿಂತಿದೆ.</em>'
                ),
              }}
            />
            <p className="mt-6 text-muted leading-relaxed">
              {t(
                "Renewed over a year and consecrated at the Maha Kumbhabhishekam of July 2026: a new shikhara raised in the curvilinear Kalinga manner, a layered southern vimana, and a granite mandapam standing on twenty-seven pillars.",
                "ಒಂದು ವರ್ಷದ ನವೀಕರಣ, ಜುಲೈ 2026ರ ಮಹಾ ಕುಂಭಾಭಿಷೇಕದಲ್ಲಿ ಪ್ರತಿಷ್ಠಿತ: ವಕ್ರರೇಖೆಯ ಕಳಿಂಗ ಶೈಲಿಯಲ್ಲಿ ಎದ್ದ ಹೊಸ ಶಿಖರ, ಪದರಪದರದ ದಕ್ಷಿಣ ವಿಮಾನ, ಮತ್ತು ಇಪ್ಪತ್ತೇಳು ಸ್ತಂಭಗಳ ಮೇಲೆ ನಿಂತ ಗ್ರಾನೈಟ್ ಮಂಟಪ."
              )}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <ScrollReveal>
              <figure>
                <img
                  src="/assets/img/reconstruction/recon-shikhara.jpg"
                  alt="The new curvilinear shikhara, raised in the Kalinga style"
                  className="w-full aspect-[3/4] object-cover border border-line"
                  loading="lazy"
                />
                <figcaption className="mt-3 eyebrow">{t("The shikhara", "ಶಿಖರ")}</figcaption>
              </figure>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <figure>
                <img
                  src="/assets/img/reconstruction/recon-vimana.jpg"
                  alt="The layered southern vimana over the sanctum"
                  className="w-full aspect-[3/4] object-cover border border-line"
                  loading="lazy"
                />
                <figcaption className="mt-3 eyebrow">{t("The vimana", "ವಿಮಾನ")}</figcaption>
              </figure>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <figure>
                <img
                  src="/assets/img/reconstruction/recon-mandapam-front.jpg"
                  alt="The granite mandapam on its carved pillars"
                  className="w-full aspect-[3/4] object-cover border border-line"
                  loading="lazy"
                />
                <figcaption className="mt-3 eyebrow">{t("The mandapam", "ಮಂಟಪ")}</figcaption>
              </figure>
            </ScrollReveal>
          </div>
          <ScrollReveal className="text-center mt-10">
            <Link href="/temple" className="btn btn-secondary">
              {t("The temple & its architecture →", "ದೇವಸ್ಥಾನ ಮತ್ತು ಅದರ ವಾಸ್ತುಶಿಲ್ಪ →")}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* The 27 Nakshatra Pillars */}
      <section className="bg-bg border-b border-line" id="pillars">
        <div className="wrap py-24 sm:py-32">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow">{t("The 27 Nakshatra Pillars", "27 ನಕ್ಷತ್ರ ಸ್ತಂಭಗಳು")}</div>
            <h2
              className="display text-4xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t(
                  'Find your star <em class="italic font-normal text-accent">among the pillars.</em>',
                  'ಸ್ತಂಭಗಳ ನಡುವೆ <em class="italic font-normal text-accent">ನಿಮ್ಮ ನಕ್ಷತ್ರವನ್ನು ಹುಡುಕಿ.</em>'
                ),
              }}
            />
            <p className="mt-6 text-muted leading-relaxed">
              {t(
                "The mandapam stands on twenty-seven pillars, one for each nakshatra of the lunar zodiac. Find your birth-star; at its pillar, the priests perform Nakshatra Dosha Parihara.",
                "ಮಂಟಪವು ಇಪ್ಪತ್ತೇಳು ಸ್ತಂಭಗಳ ಮೇಲೆ ನಿಂತಿದೆ, ಚಂದ್ರ ರಾಶಿಚಕ್ರದ ಪ್ರತಿ ನಕ್ಷತ್ರಕ್ಕೆ ಒಂದರಂತೆ. ನಿಮ್ಮ ಜನ್ಮ ನಕ್ಷತ್ರವನ್ನು ಹುಡುಕಿ; ಅದರ ಸ್ತಂಭದ ಬಳಿ, ಅರ್ಚಕರು ನಕ್ಷತ್ರ ದೋಷ ಪರಿಹಾರವನ್ನು ಮಾಡುತ್ತಾರೆ."
              )}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <NakshatraWheel />
          </ScrollReveal>
        </div>
      </section>

      {/* Sevas & Parihara */}
      <section className="bg-surface border-b border-line">
        <div className="wrap py-24 sm:py-32">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="eyebrow">{t("Sevas & Parihara", "ಸೇವೆ ಮತ್ತು ಪರಿಹಾರ")}</div>
            <h2
              className="display text-4xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t(
                  'What the renewed temple <em class="italic font-normal text-accent">can perform.</em>',
                  'ನವೀಕೃತ ದೇವಸ್ಥಾನ <em class="italic font-normal text-accent">ಏನನ್ನು ನೆರವೇರಿಸಬಲ್ಲದು.</em>'
                ),
              }}
            />
            <p className="mt-6 text-muted leading-relaxed">
              {t(
                "Twenty-seven pillars, one for each nakshatra; a mandapam for the twelve rasis; the giver of learning; and resident Veda pandits for the great life-samskaras.",
                "ಇಪ್ಪತ್ತೇಳು ಸ್ತಂಭಗಳು, ಪ್ರತಿ ನಕ್ಷತ್ರಕ್ಕೆ ಒಂದರಂತೆ; ಹನ್ನೆರಡು ರಾಶಿಗಳಿಗೆ ಒಂದು ಮಂಟಪ; ವಿದ್ಯಾದಾತ; ಮತ್ತು ಮಹಾ ಜೀವನ-ಸಂಸ್ಕಾರಗಳಿಗೆ ಸ್ಥಾನಿಕ ವೇದ ಪಂಡಿತರು."
              )}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            <Link href="/sevas#nakshatra" className="bg-surface p-7" style={{ textDecoration: "none" }}>
              <h3 className="display text-xl">{t("Nakshatra Dosha Parihara", "ನಕ್ಷತ್ರ ದೋಷ ಪರಿಹಾರ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed">{t("At the pillar of your birth-star, for relief from nakshatra afflictions.", "ನಿಮ್ಮ ಜನ್ಮ ನಕ್ಷತ್ರದ ಸ್ತಂಭದ ಬಳಿ, ನಕ್ಷತ್ರ ದೋಷಗಳಿಂದ ಮುಕ್ತಿಗಾಗಿ.")}</p>
            </Link>
            <Link href="/sevas#rasi" className="bg-surface p-7" style={{ textDecoration: "none" }}>
              <h3 className="display text-xl">{t("Rasi Dosha Parihara", "ರಾಶಿ ದೋಷ ಪರಿಹಾರ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed">{t("In the Rasi mandapam, for the afflictions of your zodiac sign.", "ರಾಶಿ ಮಂಟಪದಲ್ಲಿ, ನಿಮ್ಮ ರಾಶಿಯ ದೋಷಗಳಿಗಾಗಿ.")}</p>
            </Link>
            <Link href="/sevas#aksharabhyasam" className="bg-surface p-7" style={{ textDecoration: "none" }}>
              <h3 className="display text-xl">{t("Aksharabyasa", "ಅಕ್ಷರಾಭ್ಯಾಸ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed">{t("Aksharabyasa before Sri Vidya Hayagreeva, giver of learning.", "ವಿದ್ಯಾದಾತ ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವನ ಸನ್ನಿಧಿಯಲ್ಲಿ, ಅಕ್ಷರಾಭ್ಯಾಸ.")}</p>
            </Link>
            <Link href="/sevas#shashtipoorthi" className="bg-surface p-7" style={{ textDecoration: "none" }}>
              <h3 className="display text-xl">{t("Shashtipoorthi", "ಷಷ್ಟ್ಯಬ್ದಿ ಶಾಂತಿ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed">{t("The 60th-year shanti, performed by the temple's resident Veda pandits.", "60ನೇ ವರ್ಷದ ಶಾಂತಿ, ದೇವಸ್ಥಾನದ ಸ್ಥಾನಿಕ ವೇದ ಪಂಡಿತರಿಂದ ನೆರವೇರಿಸಲ್ಪಡುತ್ತದೆ.")}</p>
            </Link>
            <Link href="/sevas#bheemaratha" className="bg-surface p-7" style={{ textDecoration: "none" }}>
              <h3 className="display text-xl">{t("Bheemaratha Shanthi", "ಭೀಮರಥ ಶಾಂತಿ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed">{t("The 70th-year shanti and a blessing for long life.", "70ನೇ ವರ್ಷದ ಶಾಂತಿ ಮತ್ತು ದೀರ್ಘಾಯುಷ್ಯದ ಆಶೀರ್ವಾದ.")}</p>
            </Link>
            <Link href="/sevas#sahasrakalasha" className="bg-surface p-7" style={{ textDecoration: "none" }}>
              <h3 className="display text-xl">{t("Sahasra Kalasha Darshana", "ಸಹಸ್ರ ಕಲಶ ದರ್ಶನ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed">{t("The grand abhisheka poured from a thousand kalashas.", "ಸಾವಿರ ಕಲಶಗಳಿಂದ ಸುರಿಯಲ್ಪಡುವ ಭವ್ಯ ಅಭಿಷೇಕ.")}</p>
            </Link>
          </div>

          <ScrollReveal className="text-center mt-10">
            <Link href="/sevas" className="btn btn-secondary">
              {t("All sevas & how to arrange them →", "ಎಲ್ಲಾ ಸೇವೆಗಳು ಮತ್ತು ಅವುಗಳ ಸಂಕಲ್ಪ ಹೇಗೆ →")}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Hanuman Stotra */}
      <section className="bg-surface border-b border-line">
        <div className="wrap py-20 sm:py-24 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="eyebrow">{t("Hanuman Stotra", "ಹನುಮ ಸ್ತೋತ್ರ")}</div>
            <div className="mt-8 space-y-2 font-kn text-ink text-xl sm:text-2xl leading-[1.9]">
              <div>ಮನೋಜವಂ ಮಾರುತ ತುಲ್ಯ ವೇಗಂ ।</div>
              <div>ಜಿತೇಂದ್ರಿಯಂ ಬುದ್ಧಿ ಮತಾಂವರಿಷ್ಠಂ ॥</div>
              <div>ವಾತಾತ್ಮಜಂ ವಾನರ ಯೂಥಮುಖ್ಯಂ ।</div>
              <div>ಶ್ರೀರಾಮದೂತಂ ಶಿರಸಾ ನಮಾಮಿ ॥</div>
            </div>
            <p className="mt-8 text-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {t(
                "Swift as the mind, equal in speed to the wind, master of the senses, foremost among the wise: son of the wind-god, chief of the vanara host, the messenger of Sri Rama; to him I bow my head.",
                "ಮನಸ್ಸಿನಂತೆ ವೇಗ, ಗಾಳಿಯ ವೇಗಕ್ಕೆ ಸಮಾನ, ಇಂದ್ರಿಯಗಳ ಒಡೆಯ, ಜ್ಞಾನಿಗಳಲ್ಲಿ ಶ್ರೇಷ್ಠ: ವಾಯುಪುತ್ರ, ವಾನರ ಸೈನ್ಯದ ನಾಯಕ, ಶ್ರೀ ರಾಮನ ದೂತ; ಅವನಿಗೆ ನಾನು ಶಿರಸಾ ನಮಿಸುತ್ತೇನೆ."
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Puranic Record */}
      <section className="bg-bg border-t border-line">
        <div className="wrap py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <ScrollReveal className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="eyebrow">{t("The Puranic Record", "ಪೌರಾಣಿಕ ದಾಖಲೆ")}</div>
            <h2
              className="display text-4xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('One of the<br /><span class="numeral text-6xl sm:text-7xl text-accent">1,008.</span>', 'ಆ <span class="numeral text-6xl sm:text-7xl text-accent">1,008</span>ರಲ್ಲಿ ಒಂದು.'),
              }}
            />
            <div className="rule mt-7"></div>
          </ScrollReveal>
          <div className="lg:col-span-7 space-y-6 text-[15px] sm:text-base leading-[1.8] text-ink/90">
            <ScrollReveal className="mb-2">
              <figure>
                <img
                  src="/assets/img/deity/anjaneya-before-after.jpg"
                  alt="The deity · before and after the June 2026 renovation"
                  className="w-full"
                  style={{ border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-md)" }}
                  loading="lazy"
                />
                <figcaption className="mt-3 eyebrow">
                  {t("The deity · before & after the renovation", "ಮೂರ್ತಿ · ನವೀಕರಣದ ಮೊದಲು ಮತ್ತು ನಂತರ")}
                </figcaption>
              </figure>
            </ScrollReveal>
            <ScrollReveal>
              <p
                dangerouslySetInnerHTML={{
                  __html: t(
                    'The deity at Rampura is an ancient mūrti, traditionally said to have been consecrated by <span class="font-medium text-ink">Sri Vyasaraja</span>, the great Madhva saint of the Vijayanagara age.',
                    'ರಾಂಪುರದ ಮೂರ್ತಿ ಒಂದು ಪುರಾತನ ಮೂರ್ತಿ, ಸಂಪ್ರದಾಯದ ಪ್ರಕಾರ ವಿಜಯನಗರ ಯುಗದ ಮಹಾ ಮಾಧ್ವ ಸಂತ <span class="font-medium text-ink">ಶ್ರೀ ವ್ಯಾಸರಾಜರು</span> ಪ್ರತಿಷ್ಠಾಪಿಸಿದರು ಎಂದು ಹೇಳಲಾಗುತ್ತದೆ.'
                  ),
                }}
              />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p
                dangerouslySetInnerHTML={{
                  __html: t(
                    'During the forest exile, Sri Ramachandra is said to have passed through this region by way of Chunchanakatte, and to have beheld the Kālapurusha resting here. Long after, Sri Vyasaraja consecrated <span class="numeral text-2xl align-middle">1,008</span> idols of Hanuman across the land. They stand to this day, scattered across India, and this kshetra is one among them.',
                    'ವನವಾಸದ ಸಮಯದಲ್ಲಿ, ಶ್ರೀ ರಾಮಚಂದ್ರನು ಚುಂಚನಕಟ್ಟೆಯ ಮಾರ್ಗವಾಗಿ ಈ ಪ್ರದೇಶದ ಮೂಲಕ ಸಾಗಿ, ಇಲ್ಲಿ ವಿಶ್ರಮಿಸುತ್ತಿದ್ದ ಕಾಲಪುರುಷನನ್ನು ಕಂಡನೆಂದು ಹೇಳಲಾಗುತ್ತದೆ. ಬಹುಕಾಲದ ನಂತರ, ಶ್ರೀ ವ್ಯಾಸರಾಜರು ನಾಡಿನಾದ್ಯಂತ <span class="numeral text-2xl align-middle">1,008</span> ಹನುಮ ಮೂರ್ತಿಗಳನ್ನು ಪ್ರತಿಷ್ಠಾಪಿಸಿದರು. ಅವು ಇಂದಿಗೂ ಭಾರತದಾದ್ಯಂತ ಹರಡಿ ನಿಂತಿವೆ, ಮತ್ತು ಈ ಕ್ಷೇತ್ರ ಅವುಗಳಲ್ಲಿ ಒಂದು.'
                  ),
                }}
              />
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p
                dangerouslySetInnerHTML={{
                  __html: t(
                    'A second tradition tells that the prāna-pratishthā was performed by <span class="font-medium text-ink">Sri Gautama Maharshi</span>, one of the Sapta-Rishis, in the Pāncharātra Āgama way. The little bell at the tip of Anjaneya\'s tail is, they say, the sign that Gautama once walked here.',
                    'ಎರಡನೆಯ ಸಂಪ್ರದಾಯವು, ಪ್ರಾಣ-ಪ್ರತಿಷ್ಠೆಯನ್ನು ಸಪ್ತ-ಋಷಿಗಳಲ್ಲಿ ಒಬ್ಬರಾದ <span class="font-medium text-ink">ಶ್ರೀ ಗೌತಮ ಮಹರ್ಷಿ</span>ಯವರು ಪಾಂಚರಾತ್ರ ಆಗಮ ಪದ್ಧತಿಯಲ್ಲಿ ನೆರವೇರಿಸಿದರೆಂದು ಹೇಳುತ್ತದೆ. ಆಂಜನೇಯನ ಬಾಲದ ತುದಿಯಲ್ಲಿರುವ ಪುಟ್ಟ ಗಂಟೆಯು, ಗೌತಮರು ಒಮ್ಮೆ ಇಲ್ಲಿ ನಡೆದಾಡಿದ ಸಂಕೇತವೆಂದು ಹೇಳುತ್ತಾರೆ.'
                  ),
                }}
              />
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p
                dangerouslySetInnerHTML={{
                  __html: t(
                    'And the Puranas whisper that near this very kshetra, Ahalya was released from her long stone-curse, touched by Rama\'s foot, returning to herself after centuries of silence.',
                    'ಮತ್ತು ಪುರಾಣಗಳು ಹೇಳುವಂತೆ, ಈ ಕ್ಷೇತ್ರದ ಸಮೀಪದಲ್ಲಿಯೇ ಅಹಲ್ಯೆಯು ತನ್ನ ದೀರ್ಘ ಶಿಲಾ-ಶಾಪದಿಂದ ಮುಕ್ತಳಾದಳು, ರಾಮನ ಪಾದಸ್ಪರ್ಶದಿಂದ, ಶತಮಾನಗಳ ಮೌನದ ನಂತರ ಮತ್ತೆ ತನ್ನ ರೂಪಕ್ಕೆ ಮರಳಿದಳು.'
                  ),
                }}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Two Anjaneyas */}
      <section className="bg-surface border-y border-line">
        <div className="wrap py-24 sm:py-32">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="eyebrow">{t("The Two Anjaneyas", "ಎರಡು ಆಂಜನೇಯರು")}</div>
            <h2 className="display text-4xl sm:text-5xl mt-5">{t("Both turned North.", "ಎರಡೂ ಉತ್ತರಾಭಿಮುಖ.")}</h2>
            <p className="mt-6 text-muted leading-relaxed">
              {t(
                "Sri Vyasaraja set down not one, but two idols at Rampura. Both face the north, both hold the gesture of fearlessness; each has a small bell at the tail.",
                "ಶ್ರೀ ವ್ಯಾಸರಾಜರು ರಾಂಪುರದಲ್ಲಿ ಒಂದಲ್ಲ, ಎರಡು ಮೂರ್ತಿಗಳನ್ನು ಸ್ಥಾಪಿಸಿದರು. ಎರಡೂ ಉತ್ತರಕ್ಕೆ ಮುಖ ಮಾಡಿವೆ, ಎರಡೂ ಅಭಯ ಮುದ್ರೆಯನ್ನು ಧರಿಸಿವೆ; ಪ್ರತಿಯೊಂದರ ಬಾಲದಲ್ಲೂ ಒಂದು ಪುಟ್ಟ ಗಂಟೆ ಇದೆ."
              )}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
            <ScrollReveal className="bg-bg p-10">
              <div className="flex items-baseline justify-between mb-2">
                <div className="eyebrow">{t("The Great Anjaneya", "ದೊಡ್ಡ ಆಂಜನೇಯ")}</div>
                <div className="eyebrow">{t("~ 9 feet", "~ 9 ಅಡಿ")}</div>
              </div>
              <div className="rule-faint my-5"></div>
              <h3 className="display text-2xl sm:text-3xl">{t("Dodda Anjaneya", "ದೊಡ್ಡ ಆಂಜನೇಯ")}</h3>
              <p className="mt-5 text-ink/90 leading-[1.8]">
                {t(
                  "The Great Anjaneya: towering, north-facing, His right hand raised in abhaya mudra. A small bell hangs at the tip of his tail, a quiet sign of the sages who once worshipped here.",
                  "ದೊಡ್ಡ ಆಂಜನೇಯ: ಎತ್ತರವಾದ, ಉತ್ತರಾಭಿಮುಖ, ಬಲಗೈ ಅಭಯ ಮುದ್ರೆಯಲ್ಲಿ ಎತ್ತಿರುವ. ಆತನ ಬಾಲದ ತುದಿಯಲ್ಲಿ ಒಂದು ಪುಟ್ಟ ಗಂಟೆ ತೂಗುತ್ತದೆ, ಒಮ್ಮೆ ಇಲ್ಲಿ ಪೂಜಿಸಿದ ಋಷಿಗಳ ಮೌನ ಸಂಕೇತ."
                )}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100} className="bg-bg p-10">
              <div className="flex items-baseline justify-between mb-2">
                <div className="eyebrow">{t("The Child Anjaneya", "ಬಾಲಾಂಜನೇಯ")}</div>
                <div className="eyebrow">{t("~ 6 feet", "~ 6 ಅಡಿ")}</div>
              </div>
              <div className="rule-faint my-5"></div>
              <h3 className="display text-2xl sm:text-3xl">{t("Balanjaneya", "ಬಾಲಾಂಜನೇಯ")}</h3>
              <p className="mt-5 text-ink/90 leading-[1.8]">
                {t(
                  "The Child Anjaneya: pointing to the rashi chakra, warding off the afflictions of the Sun and the nine planets. At his feet lies the sleeping Kālapurusha himself.",
                  "ಬಾಲಾಂಜನೇಯ: ರಾಶಿ ಚಕ್ರದತ್ತ ತೋರಿಸುತ್ತಾ, ಸೂರ್ಯ ಮತ್ತು ನವಗ್ರಹಗಳ ದೋಷಗಳನ್ನು ನಿವಾರಿಸುತ್ತಾನೆ. ಆತನ ಪಾದದ ಬಳಿ ನಿದ್ರಿಸುತ್ತಿರುವ ಕಾಲಪುರುಷನೇ ಮಲಗಿದ್ದಾನೆ."
                )}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Cardinal Kshetras */}
      <section className="bg-bg">
        <div className="wrap py-24 sm:py-32">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="eyebrow">{t("A Sacred Geography", "ಪವಿತ್ರ ಭೂಗೋಳ")}</div>
            <h2 className="display text-4xl sm:text-5xl mt-5">{t("Held by Four Kshetras.", "ನಾಲ್ಕು ಕ್ಷೇತ್ರಗಳಿಂದ ಆವೃತ.")}</h2>
            <p className="mt-6 text-muted leading-relaxed">
              {t(
                "Rampura sits on the bank of the Cauvery, held on each of its four directions, by an ancient shrine.",
                "ರಾಂಪುರವು ಕಾವೇರಿಯ ತೀರದಲ್ಲಿದೆ, ಅದರ ನಾಲ್ಕೂ ದಿಕ್ಕುಗಳಲ್ಲಿ ಒಂದೊಂದು ಪುರಾತನ ದೇವಾಲಯದಿಂದ ಆವೃತವಾಗಿದೆ."
              )}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            <ScrollReveal className="bg-bg p-8">
              <div className="eyebrow">{t("East", "ಪೂರ್ವ")}</div>
              <h3 className="display text-xl mt-4">{t("Sri Ranganatha", "ಶ್ರೀ ರಂಗನಾಥ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed">{t("Srirangapatna: the sacred island shrine of Sri Ranganatha.", "ಶ್ರೀರಂಗಪಟ್ಟಣ: ಶ್ರೀ ರಂಗನಾಥನ ಪವಿತ್ರ ದ್ವೀಪ ದೇವಾಲಯ.")}</p>
            </ScrollReveal>
            <ScrollReveal delay={80} className="bg-bg p-8">
              <div className="eyebrow">{t("West", "ಪಶ್ಚಿಮ")}</div>
              <h3 className="display text-xl mt-4">{t("Chamundeshwari", "ಚಾಮುಂಡೇಶ್ವರಿ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed">{t("The Mysuru hill that dispels every fear.", "ಎಲ್ಲಾ ಭಯವನ್ನು ಹೋಗಲಾಡಿಸುವ ಮೈಸೂರಿನ ಬೆಟ್ಟ.")}</p>
            </ScrollReveal>
            <ScrollReveal delay={160} className="bg-bg p-8">
              <div className="eyebrow">{t("South", "ದಕ್ಷಿಣ")}</div>
              <h3 className="display text-xl mt-4">{t("Gunjalakshmi Narasimha", "ಗುಂಜಲಕ್ಷ್ಮೀ ನರಸಿಂಹ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed">{t("T. Narasipura: at the Tirumakudalu confluence of three rivers.", "ಟಿ. ನರಸೀಪುರ: ಮೂರು ನದಿಗಳ ತಿರುಮಕೂಡಲು ಸಂಗಮದಲ್ಲಿ.")}</p>
            </ScrollReveal>
            <ScrollReveal delay={240} className="bg-bg p-8">
              <div className="eyebrow">{t("North", "ಉತ್ತರ")}</div>
              <h3 className="display text-xl mt-4">{t("Bhu-Varaha", "ಭೂ ವರಾಹ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-muted leading-relaxed">{t("The earth-restoring boar incarnation of Vishnu.", "ಭೂಮಿಯನ್ನು ಪುನಃ ಸ್ಥಾಪಿಸಿದ ವಿಷ್ಣುವಿನ ವರಾಹ ಅವತಾರ.")}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Believed Graces */}
      <section className="bg-surface border-y border-line">
        <div className="wrap py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <ScrollReveal className="lg:sticky lg:top-28 self-start">
            <div className="eyebrow">{t("Believed Graces", "ನಂಬಿಕೆಯ ಅನುಗ್ರಹಗಳು")}</div>
            <h2 className="display text-4xl sm:text-5xl mt-5">{t("What devotees ask for.", "ಭಕ್ತರು ಏನನ್ನು ಬೇಡುತ್ತಾರೆ.")}</h2>
            <div className="rule mt-7"></div>
            <p className="mt-7 text-muted leading-relaxed">
              {t(
                "For generations, the Swamy at Rampura has been said to grant these particular blessings. The abhisheka tirtha, especially, is held to relieve children of the doshas of Saturn and the Navagrahas.",
                "ತಲೆಮಾರುಗಳಿಂದ, ರಾಂಪುರದ ಸ್ವಾಮಿಯು ಈ ವಿಶೇಷ ಅನುಗ್ರಹಗಳನ್ನು ನೀಡುತ್ತಾನೆಂದು ಹೇಳಲಾಗುತ್ತದೆ. ವಿಶೇಷವಾಗಿ ಅಭಿಷೇಕ ತೀರ್ಥವು ಮಕ್ಕಳನ್ನು ಶನಿ ಮತ್ತು ನವಗ್ರಹಗಳ ದೋಷಗಳಿಂದ ಮುಕ್ತಗೊಳಿಸುತ್ತದೆ ಎಂದು ನಂಬಲಾಗಿದೆ."
              )}
            </p>
          </ScrollReveal>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
            <ScrollReveal className="bg-bg p-7">
              <span className="numeral text-2xl text-muted">N°1</span>
              <h3 className="display text-xl mt-2">{t("Good progeny", "ಸತ್ಸಂತಾನ")}</h3>
              <p className="text-sm text-muted mt-4 leading-relaxed">{t("For couples praying for healthy, virtuous children.", "ಆರೋಗ್ಯವಂತ, ಸದ್ಗುಣಸಂಪನ್ನ ಮಕ್ಕಳಿಗಾಗಿ ಪ್ರಾರ್ಥಿಸುವ ದಂಪತಿಗಳಿಗಾಗಿ.")}</p>
            </ScrollReveal>
            <ScrollReveal delay={60} className="bg-bg p-7">
              <span className="numeral text-2xl text-muted">N°2</span>
              <h3 className="display text-xl mt-2">{t("Employment", "ಉದ್ಯೋಗ")}</h3>
              <p className="text-sm text-muted mt-4 leading-relaxed">{t("For obstacles in career and livelihood to be removed.", "ವೃತ್ತಿ ಮತ್ತು ಜೀವನೋಪಾಯದ ಅಡೆತಡೆಗಳು ನಿವಾರಣೆಯಾಗಲು.")}</p>
            </ScrollReveal>
            <ScrollReveal delay={120} className="bg-bg p-7">
              <span className="numeral text-2xl text-muted">N°3</span>
              <h3 className="display text-xl mt-2">{t("Marriage fortune", "ವಿವಾಹ ಭಾಗ್ಯ")}</h3>
              <p className="text-sm text-muted mt-4 leading-relaxed">{t("For delays and difficulties in marriage to be resolved.", "ವಿವಾಹದಲ್ಲಿನ ವಿಳಂಬ ಮತ್ತು ತೊಂದರೆಗಳು ಬಗೆಹರಿಯಲು.")}</p>
            </ScrollReveal>
            <ScrollReveal delay={180} className="bg-bg p-7">
              <span className="numeral text-2xl text-muted">N°4</span>
              <h3 className="display text-xl mt-2">{t("Childhood ailments", "ಬಾಲರೋಗ ನಿವಾರಣೆ")}</h3>
              <p className="text-sm text-muted mt-4 leading-relaxed">{t("The abhisheka tirtha is held to cure childhood diseases.", "ಅಭಿಷೇಕ ತೀರ್ಥವು ಬಾಲ್ಯದ ರೋಗಗಳನ್ನು ಗುಣಪಡಿಸುತ್ತದೆ ಎಂದು ನಂಬಲಾಗಿದೆ.")}</p>
            </ScrollReveal>
            <ScrollReveal delay={240} className="bg-bg p-7">
              <span className="numeral text-2xl text-muted">N°5</span>
              <h3 className="display text-xl mt-2">{t("Navagraha dosha", "ಗ್ರಹ ದೋಷ")}</h3>
              <p className="text-sm text-muted mt-4 leading-relaxed" dangerouslySetInnerHTML={{
                __html: t('Relief from the afflictions of Saturn and the nine planets. <a href="/sevas#nakshatra" class="link">Nakshatra Dosha Parihara →</a>', 'ಶನಿ ಮತ್ತು ನವಗ್ರಹಗಳ ದೋಷಗಳಿಂದ ಮುಕ್ತಿ. <a href="/sevas#nakshatra" class="link">ನಕ್ಷತ್ರ ದೋಷ ಪರಿಹಾರ →</a>')
              }} />
            </ScrollReveal>
            <ScrollReveal delay={300} className="bg-bg p-7">
              <span className="numeral text-2xl text-muted">N°6</span>
              <h3 className="display text-xl mt-2">{t("Against untimely death", "ಅಪಮೃತ್ಯು ನಿವಾರಣೆ")}</h3>
              <p className="text-sm text-muted mt-4 leading-relaxed" dangerouslySetInnerHTML={{
                __html: t('Because the Kālapurusha lies at the Swamy\'s feet. <a href="/sevas#bheemaratha" class="link">Bheemaratha Shanthi →</a>', 'ಸ್ವಾಮಿಯ ಪಾದದ ಬಳಿ ಕಾಲಪುರುಷನು ಮಲಗಿರುವ ಕಾರಣ. <a href="/sevas#bheemaratha" class="link">ಭೀಮರಥ ಶಾಂತಿ →</a>')
              }} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Shrine Banner */}
      <section className="bg-dark text-dark-text relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
          <img
            src="/assets/img/deity/hayagreeva-adorned-front.jpg"
            alt="Sri Vidya Hayagreeva, adorned"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(1.08)", objectPosition: "50% 30%" }}
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg,#1A1714 0%,rgba(26,23,20,0.55) 34%,rgba(26,23,20,0) 66%)" }}
          ></div>
          <div className="absolute inset-0 lg:hidden" style={{ background: "rgba(26,23,20,0.42)" }}></div>
        </div>
        <div className="wrap relative py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <div className="eyebrow text-dark-muted">{t("A New Shrine", "ಒಂದು ಹೊಸ ಗುಡಿ")}</div>
            <div className="text-dark-muted text-sm mt-3">{t("Sri Vidya Hayagreeva", "ವಿದ್ಯಾ ಹಯಗ್ರೀವ")}</div>
            <h2
              className="display text-white text-4xl sm:text-5xl mt-3"
              dangerouslySetInnerHTML={{
                __html: t(
                  "Carved by the same hands<br />that shaped Ram Lalla.",
                  "ರಾಮ್ ಲಲ್ಲಾನನ್ನು ರೂಪಿಸಿದ<br />ಅದೇ ಕೈಗಳಿಂದ ಕೆತ್ತಲ್ಪಟ್ಟ."
                ),
              }}
            />
            <p
              className="mt-6 text-dark-muted leading-[1.8] max-w-xl"
              dangerouslySetInnerHTML={{
                __html: t(
                  'Beside the historic Doddaanjaneya garbhagudi, a new sanctum rises for Sri Vidya Hayagreeva, the horse-faced form of Vishnu, deity of learning. The idol has been carved from black Krishna shila by the celebrated sculptor <span class="text-white font-medium">Adithya yogiraj</span>, whose Ram Lalla vigraha now stands at Ayodhya.',
                  'ಐತಿಹಾಸಿಕ ದೊಡ್ಡಾಂಜನೇಯ ಗರ್ಭಗುಡಿಯ ಪಕ್ಕದಲ್ಲಿ, ವಿದ್ಯಾದಾತ, ವಿಷ್ಣುವಿನ ಅಶ್ವಮುಖ ರೂಪವಾದ ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವನಿಗಾಗಿ ಒಂದು ಹೊಸ ಗರ್ಭಗುಡಿ ಎದ್ದು ನಿಲ್ಲುತ್ತಿದೆ. ಈ ಮೂರ್ತಿಯನ್ನು ಪ್ರಸಿದ್ಧ ಶಿಲ್ಪಿ <span class="text-white font-medium">ಆದಿತ್ಯ ಯೋಗಿರಾಜ್</span> ಅವರು ಕಪ್ಪು ಕೃಷ್ಣ ಶಿಲೆಯಿಂದ ಕೆತ್ತಿದ್ದಾರೆ, ಅವರ ರಾಮ್ ಲಲ್ಲಾ ವಿಗ್ರಹವು ಈಗ ಅಯೋಧ್ಯೆಯಲ್ಲಿ ನೆಲೆಸಿದೆ.'
                ),
              }}
            />
            <Link href="/hayagreeva" className="btn btn-light mt-9">
              {t("The shrine's story →", "ಗುಡಿಯ ಕಥೆ →")}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Visit Teaser */}
      <section className="bg-bg">
        <div className="wrap py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="eyebrow">{t("Plan your visit", "ನಿಮ್ಮ ಭೇಟಿಯನ್ನು ಯೋಜಿಸಿ")}</div>
            <h2 className="display text-4xl sm:text-5xl mt-5">{t("Take a Darshan.", "ದರ್ಶನ ಪಡೆಯಿರಿ.")}</h2>
            <p className="mt-6 text-ink/90 leading-[1.8] max-w-md">
              {t(
                "The temple opens at first light. Mornings are best for abhisheka, evenings for the deeparadhana. Children are welcome. Footwear, as always, stays behind.",
                "ದೇವಸ್ಥಾನವು ಮುಂಜಾವಿನ ಮೊದಲ ಬೆಳಕಿಗೆ ತೆರೆಯುತ್ತದೆ. ಅಭಿಷೇಕಕ್ಕೆ ಬೆಳಿಗ್ಗೆ ಉತ್ತಮ, ದೀಪಾರಾಧನೆಗೆ ಸಂಜೆ. ಮಕ್ಕಳಿಗೆ ಸ್ವಾಗತ. ಪಾದರಕ್ಷೆಗಳು, ಎಂದಿನಂತೆ, ಹೊರಗೇ ಉಳಿಯುತ್ತವೆ."
              )}
            </p>
            <Link href="/visit" className="btn btn-secondary mt-8">
              {t("Directions & timings →", "ದಾರಿ ಮತ್ತು ಸಮಯಗಳು →")}
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <figure>
              <img
                src="/assets/img/heritage/old-porch.jpg"
                alt="The village shrine porch"
                className="w-full aspect-[4/5] object-cover border border-line"
                loading="lazy"
              />
            </figure>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
