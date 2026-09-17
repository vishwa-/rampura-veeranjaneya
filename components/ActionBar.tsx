"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ContactPerson } from "@/lib/types";

const CONTACTS: (ContactPerson & { wa?: string })[] = [
  { name: "Abhishek Bhattar", kn: "ಅಭಿಷೇಕ್ ಭಟ್ಟರ್", role: "Purohit", roleKn: "ಪುರೋಹಿತರು", tel: "+919901883375", display: "+91 99018 83375", wa: "919901883375" },
  { name: "Kiran Kashyap", kn: "ಕಿರಣ್ ಕಶ್ಯಪ್", role: "Purohit", roleKn: "ಪುರೋಹಿತರು", tel: "+918310395780", display: "+91 83103 95780", wa: "918310395780" },
  { name: "Gururaju", kn: "ಗುರುರಾಜು", role: "Devasthanam", roleKn: "ದೇವಸ್ಥಾನ", tel: "+919620636465", display: "+91 96206 36465", wa: "919620636465" },
  { name: "Mahadev", kn: "ಮಹದೇವ್", role: "Devasthanam", roleKn: "ದೇವಸ್ಥಾನ", tel: "+919164891591", display: "+91 91648 91591", wa: "919164891591" },
];

const SITE = {
  mapDir: "https://www.google.com/maps/dir/?api=1&destination=12.4381665,76.6725361",
  mainWa: "https://wa.me/919164891591?text=" + encodeURIComponent("Namaskara, I would like to enquire about seva booking and darshan at Sri Kshetra Rampura."),
};

export const ActionBar: React.FC = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <nav className="action-bar" aria-label="Quick actions">
        <button type="button" onClick={() => setOpen(!open)} aria-haspopup="dialog" aria-expanded={open}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          <span>{t("Call", "ಕರೆ ಮಾಡಿ")}</span>
        </button>
        <Link href="/sevas#book" className="ab-primary">
          <span className="ab-fab">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3c2 3 3 5 3 7a3 3 0 0 1-6 0c0-2 1-4 3-7Z" />
              <path d="M5 17c2 2.5 12 2.5 14 0" />
              <path d="M7 20.5c1.7 1.4 8.3 1.4 10 0" />
            </svg>
          </span>
          <span>{t("Book a Pooja", "ಪೂಜೆ ಬುಕ್ ಮಾಡಿ")}</span>
        </Link>
        <a href={SITE.mainWa} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span>{t("WhatsApp", "ವಾಟ್ಸ್‌ಆ್ಯಪ್")}</span>
        </a>
        <a href={SITE.mapDir} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{t("Directions", "ದಾರಿ")}</span>
        </a>
      </nav>

      {/* Call Bottom Sheet Modal */}
      <div className={`call-sheet ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Call the Devasthanam">
        <div className="cs-veil" onClick={() => setOpen(false)}></div>
        <div className="cs-panel">
          <div className="cs-grip" aria-hidden="true"></div>
          <div className="eyebrow">{t("Call the Devasthanam", "ದೇವಸ್ಥಾನಕ್ಕೆ ಕರೆ ಮಾಡಿ")}</div>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: ".9rem", color: "var(--text-muted)", margin: ".4rem 0 .8rem", lineHeight: 1.55, textWrap: "pretty" }}>
            {t("For seva & parihara questions, anytime.", "ಸೇವೆ ಅಥವಾ ಪರಿಹಾರಗಳ ಪ್ರಶ್ನೆಗಳಿಗೆ, ಯಾವಾಗ ಬೇಕಾದರೂ.")}
          </p>
          {CONTACTS.map((c, idx) => (
            <div key={idx} className="cs-row">
              <a href={`tel:${c.tel}`} style={{ textDecoration: "none", flex: 1 }}>
                <span className="cs-name">{t(c.name, c.kn)}</span>
                <span className="cs-role">{t(c.role, c.roleKn)}</span>
                <span className="cs-num tabular-nums">{c.display}</span>
              </a>
              {c.wa && (
                <a
                  href={`https://wa.me/${c.wa}?text=${encodeURIComponent(t("Namaskara, I would like to enquire about sevas at Sri Kshetra Rampura.", "ನಮಸ್ಕಾರ, ಶ್ರೀ ಕ್ಷೇತ್ರ ರಾಂಪುರದಲ್ಲಿ ಸೇವೆಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಬೇಕಿತ್ತು."))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: ".4rem .8rem", fontSize: ".76rem" }}
                  aria-label={`WhatsApp ${c.name}`}
                >
                  WhatsApp
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
