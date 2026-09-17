"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function VisitPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate brief network delay for smooth UX
    await new Promise((res) => setTimeout(res, 600));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <ScrollReveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">{t("The Visitor's Companion", "ಯಾತ್ರಿಕರ ಮಾರ್ಗದರ್ಶಿ")}</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">
              {t("Come and take a darshan.", "ಬಂದು ದರ್ಶನ ಪಡೆಯಿರಿ.")}
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
              {t(
                "Rampura is small, but easy to reach. The temple opens at first light.",
                "ರಾಂಪುರ ಚಿಕ್ಕದಾದರೂ ತಲುಪಲು ಸುಲಭ. ದೇವಸ್ಥಾನವು ಮುಂಜಾವಿನ ಮೊದಲ ಬೆಳಕಿಗೆ ತೆರೆಯುತ್ತದೆ."
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Map + details */}
      <section className="bg-bg">
        <div className="wrap py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <div className="aspect-[4/3] w-full overflow-hidden border border-line bg-surface" style={{ borderRadius: "var(--radius-md)" }}>
              <iframe
                title="Rampura Kubera Anjaneyaswamy temple location"
                src="https://maps.google.com/maps?q=12.4381665,76.6725361&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=12.4381665,76.6725361"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 inline-block">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t("Get Directions", "ದಾರಿ ಪಡೆಯಿರಿ")}</span>
              </a>
              <a
                href="https://maps.app.goo.gl/99MbtNqZjRXX6s2n8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                {t("Open in Google Maps", "Google ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ")}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} className="space-y-8">
            <div>
              <div className="eyebrow">{t("Address", "ವಿಳಾಸ")}</div>
              <p className="text-base text-ink/90 mt-2">{t("Rampura village, Srirangapatna Taluk", "ರಾಂಪುರ ಗ್ರಾಮ, ಶ್ರೀರಂಗಪಟ್ಟಣ ತಾಲ್ಲೂಕು")}</p>
              <p className="text-base text-ink/90">{t("Mandya District, Karnataka – 571427", "ಮಂಡ್ಯ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ – 571427")}</p>
            </div>

            <div>
              <div className="eyebrow">{t("Hours", "ಸಮಯ")}</div>
              <ul className="mt-2 text-base space-y-1">
                <li className="flex justify-between gap-6 text-ink/90">
                  <span>{t("Suprabhata & Abhisheka", "ಸುಪ್ರಭಾತ ಮತ್ತು ಅಭಿಷೇಕ")}</span>
                  <span className="text-muted">{t("5:30 – 7:00 AM", "ಬೆಳಿಗ್ಗೆ 5:30 – 7:00")}</span>
                </li>
                <li className="flex justify-between gap-6 text-ink/90">
                  <span>{t("Morning Darshan", "ಬೆಳಗಿನ ದರ್ಶನ")}</span>
                  <span className="text-muted">{t("7:00 – 11:30 AM", "ಬೆಳಿಗ್ಗೆ 7:00 – 11:30")}</span>
                </li>
                <li className="flex justify-between gap-6 text-ink/90">
                  <span>{t("Madhyahnika", "ಮಧ್ಯಾಹ್ನಿಕ")}</span>
                  <span className="text-muted">{t("12:00 – 12:30 PM", "ಮಧ್ಯಾಹ್ನ 12:00 – 12:30")}</span>
                </li>
                <li className="flex justify-between gap-6 text-ink/90">
                  <span>{t("Afternoon Rest", "ಮಧ್ಯಾಹ್ನದ ವಿಶ್ರಾಂತಿ")}</span>
                  <span className="text-muted">{t("12:30 – 4:30 PM", "ಮಧ್ಯಾಹ್ನ 12:30 – ಸಂಜೆ 4:30")}</span>
                </li>
                <li className="flex justify-between gap-6 text-ink/90">
                  <span>{t("Evening Deeparadhana", "ಸಂಜೆ ದೀಪಾರಾಧನೆ")}</span>
                  <span className="text-muted">{t("6:00 – 8:30 PM", "ಸಂಜೆ 6:00 – ರಾತ್ರಿ 8:30")}</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="eyebrow">{t("Temple office", "ದೇವಸ್ಥಾನ ಕಚೇರಿ")}</div>
              <p className="text-base text-ink/90 mt-2">
                {t(
                  "Available 7:00 AM – 11:00 AM for seva sankalpa & enquiries.",
                  "ಸೇವಾ ಸಂಕಲ್ಪ ಮತ್ತು ವಿಚಾರಣೆಗಳಿಗೆ ಬೆಳಿಗ್ಗೆ 7:00 – 11:00 ರವರೆಗೆ ಲಭ್ಯ."
                )}
              </p>
              <p className="text-base text-ink/90 mt-1">
                <Link href="/sevas" className="link">
                  {t("See all sevas & parihara →", "ಎಲ್ಲಾ ಸೇವೆ ಮತ್ತು ಪರಿಹಾರಗಳನ್ನು ನೋಡಿ →")}
                </Link>
              </p>
            </div>

            <div>
              <div className="eyebrow">{t("Contact persons", "ಸಂಪರ್ಕ ವ್ಯಕ್ತಿಗಳು")}</div>
              <p className="text-sm text-muted mt-2">
                {t(
                  "For any questions on the sevas or pariharas: anyone may call these numbers, anytime.",
                  "ಸೇವೆ ಅಥವಾ ಪರಿಹಾರಗಳ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ, ಯಾವಾಗ ಬೇಕಾದರೂ ಈ ಸಂಖ್ಯೆಗಳಿಗೆ ಕರೆ ಮಾಡಬಹುದು."
                )}
              </p>
              <ul className="mt-3 text-base space-y-1.5">
                <li className="flex justify-between gap-6 flex-wrap text-ink/90">
                  <span>{t("Abhishek Bhattar · Purohit", "ಅಭಿಷೇಕ್ ಭಟ್ಟರ್ · ಪುರೋಹಿತರು")}</span>
                  <a href="tel:+919901883375" className="link numeral" style={{ textDecoration: "none" }}>
                    +91 99018 83375
                  </a>
                </li>
                <li className="flex justify-between gap-6 flex-wrap text-ink/90">
                  <span>{t("Kiran Kashyap · Purohit", "ಕಿರಣ್ ಕಶ್ಯಪ್ · ಪುರೋಹಿತರು")}</span>
                  <a href="tel:+918310395780" className="link numeral" style={{ textDecoration: "none" }}>
                    +91 83103 95780
                  </a>
                </li>
                <li className="flex justify-between gap-6 flex-wrap text-ink/90">
                  <span>{t("Gururaju · Devasthanam", "ಗುರುರಾಜು · ದೇವಸ್ಥಾನ")}</span>
                  <a href="tel:+919620636465" className="link numeral" style={{ textDecoration: "none" }}>
                    +91 96206 36465
                  </a>
                </li>
                <li className="flex justify-between gap-6 flex-wrap text-ink/90">
                  <span>{t("Mahadev · Devasthanam", "ಮಹದೇವ್ · ದೇವಸ್ಥಾನ")}</span>
                  <a
                    href="tel:+919164891591"
                    className="link numeral"
                    style={{ textDecoration: "none" }}
                  >
                    +91 91648 91591
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="eyebrow">{t("Write to us", "ನಮಗೆ ಬರೆಯಿರಿ")}</div>
              <p
                className="text-base text-ink/90 mt-2"
                dangerouslySetInnerHTML={{
                  __html: t(
                    '<a href="mailto:info@rampura.in" class="link">info@rampura.in</a>, or use the form below.',
                    '<a href="mailto:info@rampura.in" class="link">info@rampura.in</a>, ಅಥವಾ ಕೆಳಗಿನ ನಮೂನೆಯನ್ನು ಬಳಸಿ.'
                  ),
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-surface border-t border-line">
        <div className="wrap flex items-center justify-center gap-4 py-4">
          <span className="rule-faint"></span>
          <span className="eyebrow">{t("Getting here", "ತಲುಪುವ ದಾರಿ")}</span>
          <span className="rule-faint"></span>
        </div>
      </div>

      {/* Getting here cards */}
      <section className="bg-surface border-b border-line">
        <div className="wrap py-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
          <ScrollReveal className="bg-bg p-8">
            <svg className="w-6 h-6 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17h14M5 17a2 2 0 0 1-2-2v-3l2-5h14l2 5v3a2 2 0 0 1-2 2M5 17v2M19 17v2" />
              <circle cx="7.5" cy="14.5" r="1" />
              <circle cx="16.5" cy="14.5" r="1" />
            </svg>
            <h3 className="display text-2xl mt-1">{t("By road", "ರಸ್ತೆಯ ಮೂಲಕ")}</h3>
            <div className="rule-faint mt-4 mb-4"></div>
            <p className="text-sm text-ink/90 leading-relaxed">
              {t(
                "22 km from Mysuru (40 min) and 8 km from Srirangapatna (15 min). Free parking on temple grounds.",
                "ಮೈಸೂರಿನಿಂದ 22 ಕಿ.ಮೀ (40 ನಿಮಿಷ) ಮತ್ತು ಶ್ರೀರಂಗಪಟ್ಟಣದಿಂದ 8 ಕಿ.ಮೀ (15 ನಿಮಿಷ). ದೇವಸ್ಥಾನದ ಆವರಣದಲ್ಲಿ ಉಚಿತ ವಾಹನ ನಿಲುಗಡೆ."
              )}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80} className="bg-bg p-8">
            <svg className="w-6 h-6 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="3" width="14" height="13" rx="2" />
              <path d="M5 11h14M9 16l-2 4M15 16l2 4" />
              <circle cx="8.5" cy="13.5" r=".5" />
              <circle cx="15.5" cy="13.5" r=".5" />
            </svg>
            <h3 className="display text-2xl mt-1">{t("By rail", "ರೈಲಿನ ಮೂಲಕ")}</h3>
            <div className="rule-faint mt-4 mb-4"></div>
            <p className="text-sm text-ink/90 leading-relaxed">
              {t(
                "Nearest stations: Srirangapatna (8 km) and Mysuru Junction (22 km). Both connect to Bangalore.",
                "ಹತ್ತಿರದ ನಿಲ್ದಾಣಗಳು: ಶ್ರೀರಂಗಪಟ್ಟಣ (8 ಕಿ.ಮೀ) ಮತ್ತು ಮೈಸೂರು ಜಂಕ್ಷನ್ (22 ಕಿ.ಮೀ). ಎರಡೂ ಬೆಂಗಳೂರಿಗೆ ಸಂಪರ್ಕ ಹೊಂದಿವೆ."
              )}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={160} className="bg-bg p-8">
            <svg className="w-6 h-6 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.5 13.5 3 12l1-2 6.5.5L15 4.5a1.5 1.5 0 0 1 2.5 1.5L14.5 11l5 .5-1 6-3-2.5-2.5 3-1 .5z" />
            </svg>
            <h3 className="display text-2xl mt-1">{t("By air", "ವಿಮಾನದ ಮೂಲಕ")}</h3>
            <div className="rule-faint mt-4 mb-4"></div>
            <p className="text-sm text-ink/90 leading-relaxed">
              {t(
                "Mysuru airport (15 km) for short hops; Bengaluru international (160 km) for long-haul.",
                "ಸಮೀಪದ ಪ್ರಯಾಣಕ್ಕೆ ಮೈಸೂರು ವಿಮಾನ ನಿಲ್ದಾಣ (15 ಕಿ.ಮೀ); ದೂರದ ಪ್ರಯಾಣಕ್ಕೆ ಬೆಂಗಳೂರು ಅಂತಾರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ (160 ಕಿ.ಮೀ)."
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-bg">
        <div className="wrap py-24 max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="eyebrow">{t("Send the temple a message", "ದೇವಸ್ಥಾನಕ್ಕೆ ಸಂದೇಶ ಕಳುಹಿಸಿ")}</div>
            <h2 className="display text-3xl sm:text-5xl mt-5">
              {t("Questions about seva or sankalpa?", "ಸೇವೆ ಅಥವಾ ಸಂಕಲ್ಪದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ?")}
            </h2>
            <div className="rule mt-7"></div>
            <p className="mt-5 mb-8 text-ink/90 leading-relaxed">
              <span
                dangerouslySetInnerHTML={{
                  __html: t(
                    'We read every note. Volunteers respond within a day or two. Planning a sankalpa? <a href="/sevas" class="link">See all sevas &amp; parihara →</a>',
                    'ನಾವು ಪ್ರತಿ ಸಂದೇಶವನ್ನೂ ಓದುತ್ತೇವೆ. ಸ್ವಯಂಸೇವಕರು ಒಂದು-ಎರಡು ದಿನಗಳಲ್ಲಿ ಉತ್ತರಿಸುತ್ತಾರೆ. ಸಂಕಲ್ಪ ಯೋಜಿಸುತ್ತಿದ್ದೀರಾ? <a href="/sevas" class="link">ಎಲ್ಲಾ ಸೇವೆ ಮತ್ತು ಪರಿಹಾರಗಳನ್ನು ನೋಡಿ →</a>'
                  ),
                }}
              />
            </p>
          </ScrollReveal>

          {submitted ? (
            <ScrollReveal className="border border-line bg-bg p-8 sm:p-10 text-center">
              <div className="eyebrow">{t("Message sent", "ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ")}</div>
              <h3 className="display text-2xl sm:text-3xl mt-3">
                {t("Your message has reached us.", "ನಿಮ್ಮ ಸಂದೇಶ ನಮಗೆ ತಲುಪಿದೆ.")}
              </h3>
              <div className="rule mx-auto mt-5"></div>
              <p className="mt-5 text-muted max-w-md mx-auto">
                {t(
                  "A volunteer from the temple will respond shortly. Namaskara.",
                  "ದೇವಸ್ಥಾನದ ಸ್ವಯಂಸೇವಕರು ಶೀಘ್ರದಲ್ಲೇ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತಾರೆ. ನಮಸ್ಕಾರ."
                )}
              </p>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={120}>
              <form onSubmit={handleSubmit} className="border border-line bg-bg p-8 sm:p-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="eyebrow block mb-2">{t("Name", "ಹೆಸರು")}</span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="field"
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow block mb-2">{t("Email", "ಇಮೇಲ್")}</span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="field"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="eyebrow block mb-2">
                    {t("Subject", "ವಿಷಯ")} <span className="text-muted normal-case tracking-normal">({t("optional", "ಐಚ್ಛಿಕ")})</span>
                  </span>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="eyebrow block mb-2">{t("Message", "ಸಂದೇಶ")}</span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="field"
                  />
                </label>
                <div className="flex items-center gap-4 flex-wrap">
                  <button type="submit" disabled={submitting} className="btn btn-primary">
                    {submitting ? t("Sending...", "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...") : t("Send message", "ಸಂದೇಶ ಕಳುಹಿಸಿ")}
                  </button>
                </div>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
