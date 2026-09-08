"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function EventsPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <ScrollReveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">{t("Events & Notices", "ಉತ್ಸವಗಳು ಮತ್ತು ಪ್ರಕಟಣೆಗಳು")}</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">{t("The temple year, unfolding.", "ತೆರೆದುಕೊಳ್ಳುತ್ತಿರುವ ದೇವಸ್ಥಾನದ ವರ್ಷ.")}</h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
              {t(
                "Small ceremonies and a few large ones: the year of a temple newly consecrated at the three-day Jeernoddhara Maha Kumbhabhishekam of July 2026.",
                "ಕೆಲವು ಸಣ್ಣ ಸಮಾರಂಭಗಳು ಮತ್ತು ಕೆಲವು ದೊಡ್ಡ ಸಮಾರಂಭಗಳು: ಜುಲೈ 2026ರ ಮೂರು ದಿನಗಳ ಜೀರ್ಣೋದ್ಧಾರ ಮಹಾ ಕುಂಭಾಭಿಷೇಕದೊಂದಿಗೆ ಹೊಸದಾಗಿ ಪ್ರತಿಷ್ಠಿತವಾದ ದೇವಸ್ಥಾನದ ವರ್ಷ."
              )}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Events + Sidebar */}
      <section className="bg-bg">
        <div className="wrap py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="eyebrow mb-2">{t("Upcoming", "ಮುಂಬರುವ")}</div>

            {/* Shravana Shanivara */}
            <ScrollReveal className="grid grid-cols-12 gap-5 py-8 border-b border-line">
              <div className="col-span-3 sm:col-span-2">
                <div className="eyebrow">{t("Aug", "ಆಗಸ್ಟ್")}</div>
                <div className="numeral text-5xl mt-1 leading-none">
                  15<span className="text-2xl text-muted">–</span>
                </div>
              </div>
              <div className="col-span-9 sm:col-span-10">
                <h3 className="display text-2xl sm:text-3xl mt-1">{t("Shravana Shanivara", "ಶ್ರಾವಣ ಶನಿವಾರ")}</h3>
                <p className="mt-1 text-muted">{t("Vishesha pooja & alankara, every Saturday of Shravana", "ಶ್ರಾವಣದ ಪ್ರತಿ ಶನಿವಾರ ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ಅಲಂಕಾರ")}</p>
                <div className="rule-faint mt-3 mb-3"></div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                  <span>{t("August 15 – September 5, 2026", "ಆಗಸ್ಟ್ 15 – ಸೆಪ್ಟೆಂಬರ್ 5, 2026")}</span>
                  <span>·</span>
                  <span>{t("Four Saturdays", "ನಾಲ್ಕು ಶನಿವಾರಗಳು")}</span>
                </div>
                <p className="mt-3 text-ink/90 leading-relaxed">
                  {t(
                    "Through the month of Shravana, each Saturday brings a vishesha pooja and alankara for the Swamys. All devotees are welcome.",
                    "ಶ್ರಾವಣ ಮಾಸದುದ್ದಕ್ಕೂ, ಪ್ರತಿ ಶನಿವಾರ ಸ್ವಾಮಿಗಳಿಗೆ ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ಅಲಂಕಾರ ನಡೆಯುತ್ತದೆ. ಎಲ್ಲಾ ಭಕ್ತರಿಗೂ ಸ್ವಾಗತ."
                  )}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  <li className="flex gap-3">
                    <span className="numeral text-ink shrink-0" style={{ minWidth: "5.4rem" }}>{t("Aug 15", "ಆಗಸ್ಟ್ 15")}</span>
                    <span>{t("1st Saturday · Vishesha pooja & alankara", "ಮೊದಲ ಶನಿವಾರ · ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ಅಲಂಕಾರ")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="numeral text-ink shrink-0" style={{ minWidth: "5.4rem" }}>{t("Aug 22", "ಆಗಸ್ಟ್ 22")}</span>
                    <span>{t("2nd Saturday · Vishesha pooja & alankara", "ಎರಡನೇ ಶನಿವಾರ · ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ಅಲಂಕಾರ")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="numeral text-ink shrink-0" style={{ minWidth: "5.4rem" }}>{t("Aug 29", "ಆಗಸ್ಟ್ 29")}</span>
                    <span>{t("3rd Saturday · Vishesha pooja & alankara", "ಮೂರನೇ ಶನಿವಾರ · ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ಅಲಂಕಾರ")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="numeral text-ink shrink-0" style={{ minWidth: "5.4rem" }}>{t("Sep 5", "ಸೆಪ್ಟೆಂಬರ್ 5")}</span>
                    <span>{t("4th Saturday · Vishesha pooja & alankara", "ನಾಲ್ಕನೇ ಶನಿವಾರ · ವಿಶೇಷ ಪೂಜೆ ಮತ್ತು ಅಲಂಕಾರ")}</span>
                  </li>
                </ul>
                <p className="mt-4">
                  <Link href="/sevas?pooja=shravana-shanivara#book" className="btn btn-primary">
                    {t("Book this pooja →", "ಈ ಪೂಜೆಯನ್ನು ಬುಕ್ ಮಾಡಿ →")}
                  </Link>
                </p>
              </div>
            </ScrollReveal>

            {/* Sharad Navaratri */}
            <ScrollReveal className="grid grid-cols-12 gap-5 py-8 border-b border-line">
              <div className="col-span-3 sm:col-span-2">
                <div className="eyebrow">{t("Oct", "ಅಕ್ಟೋಬರ್")}</div>
                <div className="numeral text-5xl mt-1">10</div>
              </div>
              <div className="col-span-9 sm:col-span-10">
                <h3 className="display text-2xl sm:text-3xl mt-1">{t("Sharad Navaratri", "ಶರನ್ನವರಾತ್ರಿ")}</h3>
                <div className="rule-faint mt-3 mb-3"></div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                  <span>{t("October 10 – 18, 2026", "ಅಕ್ಟೋಬರ್ 10 – 18, 2026")}</span>
                  <span>·</span>
                  <span>{t("Nightly 6:30 PM", "ಪ್ರತಿ ರಾತ್ರಿ ಸಂಜೆ 6:30")}</span>
                </div>
                <p className="mt-3 text-ink/90 leading-relaxed" dangerouslySetInnerHTML={{
                  __html: t(
                    'Nine evenings of alankara, classical music kacheris, and Vidya Hayagreeva archana for students sitting for exams. <a href="/sevas#aksharabhyasam" class="link">Aksharabhyasam</a> for young children is offered on Vijayadashami.',
                    'ಒಂಬತ್ತು ಸಂಜೆಗಳ ಅಲಂಕಾರ, ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತ ಕಚೇರಿಗಳು, ಮತ್ತು ಪರೀಕ್ಷೆ ಬರೆಯುವ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ವಿದ್ಯಾ ಹಯಗ್ರೀವ ಅರ್ಚನೆ. ವಿಜಯದಶಮಿಯಂದು ಚಿಕ್ಕ ಮಕ್ಕಳಿಗೆ <a href="/sevas#aksharabhyasam" class="link">ಅಕ್ಷರಾಭ್ಯಾಸ</a> ನಡೆಸಲಾಗುತ್ತದೆ.'
                  )
                }} />
              </div>
            </ScrollReveal>

            <div className="eyebrow mt-12 mb-2" style={{ color: "var(--text-muted)" }}>
              {t("Past observances", "ಗತ ಆಚರಣೆಗಳು")}
            </div>

            {/* Hayagreeva Jayanthi */}
            <ScrollReveal className="grid grid-cols-12 gap-5 py-8 border-b border-line opacity-60">
              <div className="col-span-3 sm:col-span-2">
                <div className="eyebrow" style={{ color: "var(--text-muted)" }}>{t("Aug", "ಆಗಸ್ಟ್")}</div>
                <div className="numeral text-5xl mt-1 text-muted">27</div>
              </div>
              <div className="col-span-9 sm:col-span-10">
                <h3 className="display text-2xl sm:text-3xl mt-1">
                  {t("Hayagreeva Jayanthi ", "ಹಯಗ್ರೀವ ಜಯಂತಿ ")}
                  <span className="ml-2 align-middle inline-block text-[10px] tracking-[0.2em] uppercase border border-line text-muted px-2 py-1" style={{ borderRadius: "var(--radius-pill)" }}>
                    {t("Past", "ಗತ")}
                  </span>
                </h3>
                <div className="rule-faint mt-3 mb-3"></div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                  <span>{t("Thursday, August 27, 2026", "ಗುರುವಾರ, ಆಗಸ್ಟ್ 27, 2026")}</span>
                  <span>·</span>
                  <span>{t("Abhisheka · Homa · Samoohika Aksharabhyasa", "ಅಭಿಷೇಕ · ಹೋಮ · ಸಾಮೂಹಿಕ ಅಕ್ಷರಾಭ್ಯಾಸ")}</span>
                </div>
                <p className="mt-3 text-muted leading-relaxed" dangerouslySetInnerHTML={{
                  __html: t(
                    'The first Hayagreeva Jayanthi since the prathisthapana of Sri Vidya Hayagreeva Swamy: abhisheka and homa for the Swamy, and a samoohika <a href="/sevas#aksharabhyasam" class="link">Aksharabhyasa</a> where children write their first letters in the presence of the Lord of learning.',
                    'ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ ಸ್ವಾಮಿಯ ಪ್ರತಿಷ್ಠಾಪನೆಯ ನಂತರದ ಮೊದಲ ಹಯಗ್ರೀವ ಜಯಂತಿ: ಸ್ವಾಮಿಗೆ ಅಭಿಷೇಕ ಮತ್ತು ಹೋಮ, ಜೊತೆಗೆ ವಿದ್ಯೆಯ ಒಡೆಯನ ಸನ್ನಿಧಿಯಲ್ಲಿ ಮಕ್ಕಳು ಮೊದಲ ಅಕ್ಷರಗಳನ್ನು ಬರೆಯುವ ಸಾಮೂಹಿಕ <a href="/sevas#aksharabhyasam" class="link">ಅಕ್ಷರಾಭ್ಯಾಸ</a>.'
                  )
                }} />
              </div>
            </ScrollReveal>

            {/* Kumbhabhishekam Record */}
            <ScrollReveal className="py-8 border-b border-line bg-surface -mx-4 px-4 sm:-mx-6 sm:px-6" id="kumbhabhishekam" style={{ scrollMarginTop: "7rem" }}>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-3 sm:col-span-2">
                  <div className="eyebrow">{t("Jul", "ಜುಲೈ")}</div>
                  <div className="numeral text-5xl mt-1 leading-none">
                    3<span className="text-2xl text-muted">–5</span>
                  </div>
                </div>
                <div className="col-span-9 sm:col-span-10">
                  <h3 className="display text-2xl sm:text-3xl mt-1">
                    {t("Jeernoddhara Maha Kumbhabhishekam ", "ಜೀರ್ಣೋದ್ಧಾರ ಮಹಾ ಕುಂಭಾಭಿಷೇಕ ")}
                    <span className="ml-2 align-middle inline-block text-[10px] tracking-[0.2em] uppercase border border-accent text-accent px-2 py-1" style={{ borderRadius: "var(--radius-pill)" }}>
                      {t("Sampoorna", "ಸಂಪೂರ್ಣ")}
                    </span>
                  </h3>
                  <p className="mt-1 text-muted">{t("and the Prathisthapana of Sri Vidya Hayagreeva Swamy", "ಮತ್ತು ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವ ಸ್ವಾಮಿಯ ಪ್ರತಿಷ್ಠಾಪನೆ")}</p>
                  <div className="rule-faint mt-3 mb-3"></div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                    <span>{t("Friday – Sunday · July 3 – 5, 2026", "ಶುಕ್ರವಾರ – ಭಾನುವಾರ · ಜುಲೈ 3 – 5, 2026")}</span>
                    <span>·</span>
                    <span>{t("Rampura", "ರಾಂಪುರ")}</span>
                  </div>
                  <p className="mt-3 text-ink/90 leading-relaxed" dangerouslySetInnerHTML={{
                    __html: t(
                      'The three-day consecration of the reborn Sri Anjaneya Swamy Devasthanam and the installation of Sri Vidya Hayagreeva, performed under the guidance of Pancharatra Agama Praveena Vidwan <span class="text-ink">Sri B.R. Gopal Bhattar</span>, organized by the <span class="text-ink">Devatha family</span>. <span class="text-ink">Maha Annadana</span> followed the ceremonies, and the evening rathotsava carried the Swamy through the village.',
                      'ಪುನರುಜ್ಜೀವಿತಗೊಂಡ ಶ್ರೀ ಆಂಜನೇಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನದ ಮೂರು ದಿನಗಳ ಪ್ರತಿಷ್ಠಾಪನೆ ಮತ್ತು ಶ್ರೀ ವಿದ್ಯಾ ಹಯಗ್ರೀವರ ಸ್ಥಾಪನೆ, ಪಾಂಚರಾತ್ರ ಆಗಮ ಪ್ರವೀಣ ವಿದ್ವಾನ್ <span class="text-ink">ಶ್ರೀ ಬಿ.ಆರ್. ಗೋಪಾಲ ಭಟ್ಟರ್</span> ಅವರ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ನೆರವೇರಿತು; <span class="text-ink">ದೇವತಾ ಕುಟುಂಬ</span>ದಿಂದ ಆಯೋಜಿತ. ಸಮಾರಂಭಗಳ ನಂತರ <span class="text-ink">ಮಹಾ ಅನ್ನದಾನ</span> ನಡೆಯಿತು, ಮತ್ತು ಸಂಜೆಯ ರಥೋತ್ಸವವು ಸ್ವಾಮಿಯನ್ನು ಗ್ರಾಮದಾದ್ಯಂತ ಕೊಂಡೊಯ್ದಿತು.'
                    )
                  }} />
                </div>
              </div>

              {/* Consecration Schedule Grid */}
              <div className="eyebrow mt-8">{t("The programme, as it was performed", "ನೆರವೇರಿದ ಕಾರ್ಯಕ್ರಮ")}</div>
              <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-px bg-line border border-line">
                <div className="bg-bg p-6">
                  <div className="flex items-baseline justify-between">
                    <h4 className="display text-xl">{t("Friday", "ಶುಕ್ರವಾರ")}</h4>
                    <span className="numeral text-3xl text-accent">3</span>
                  </div>
                  <div className="rule-faint mt-3 mb-4"></div>
                  <div className="eyebrow">{t("7:00 AM – 12 Noon", "ಬೆಳಿಗ್ಗೆ 7:00 – ಮಧ್ಯಾಹ್ನ 12")}</div>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {t(
                      "Grama Pradakshina, poojas & Yagashala Pravesha, Homas, Vishvaksena Aradhana, Bhagwath Vasudeva Punyahavachana, Panchagavya Aradhana Snapana, Gruha & Mruthrika Snapana, Jaladivasa, Maha Mangalarthi, Theertha Prasada.",
                      "ಗ್ರಾಮ ಪ್ರದಕ್ಷಿಣ, ಪೂಜೆಗಳು ಮತ್ತು ಯಾಗಶಾಲಾ ಪ್ರವೇಶ, ಹೋಮಗಳು, ವಿಷ್ವಕ್ಸೇನ ಆರಾಧನ, ಭಗವತ್ ವಾಸುದೇವ ಪುಣ್ಯಾಹವಾಚನ, ಪಂಚಗವ್ಯ ಆರಾಧನ ಸ್ನಪನ, ಗೃಹ ಮತ್ತು ಮೃತ್ತಿಕಾ ಸ್ನಪನ, ಜಲಾಧಿವಾಸ, ಮಹಾ ಮಂಗಳಾರತಿ, ತೀರ್ಥ ಪ್ರಸಾದ."
                    )}
                  </p>
                </div>
                <div className="bg-bg p-6">
                  <div className="flex items-baseline justify-between">
                    <h4 className="display text-xl">{t("Saturday", "ಶನಿವಾರ")}</h4>
                    <span className="numeral text-3xl text-accent">4</span>
                  </div>
                  <div className="rule-faint mt-3 mb-4"></div>
                  <div className="eyebrow">{t("7:00 AM – 1:30 PM", "ಬೆಳಿಗ್ಗೆ 7:00 – ಮಧ್ಯಾಹ್ನ 1:30")}</div>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {t(
                      "Vishvaksena Aradhane, Punyahavachana, Devatha Ahavana, Yagashala Pravesha, Dwararadhana, Soma Kumbaradhana, Kalasaradhana, Panchasuktha Parayana, Navahnika Poorvaka Agni Prathishta, Nitya, Murthy & Rama Tharaka Homa, Paanchasuktha Havana, Sakruth Purnahuthi.",
                      "ವಿಷ್ವಕ್ಸೇನ ಆರಾಧನೆ, ಪುಣ್ಯಾಹವಾಚನ, ದೇವತಾ ಆಹ್ವಾನ, ಯಾಗಶಾಲಾ ಪ್ರವೇಶ, ದ್ವಾರಾರಾಧನ, ಸೋಮ ಕುಂಭಾರಾಧನ, ಕಲಶಾರಾಧನ, ಪಂಚಸೂಕ್ತ ಪಾರಾಯಣ, ನವಾಹ್ನಿಕ ಪೂರ್ವಕ ಅಗ್ನಿ ಪ್ರತಿಷ್ಠ, ನಿತ್ಯ, ಮೂರ್ತಿ ಮತ್ತು ರಾಮ ತಾರಕ ಹೋಮ, ಪಾಂಚಸೂಕ್ತ ಹವನ, ಸಕೃತ್ ಪೂರ್ಣಾಹುತಿ."
                    )}
                  </p>
                </div>
                <div className="bg-bg p-6">
                  <div className="flex items-baseline justify-between">
                    <h4 className="display text-xl">{t("Sunday", "ಭಾನುವಾರ")}</h4>
                    <span className="numeral text-3xl text-accent">5</span>
                  </div>
                  <div className="rule-faint mt-3 mb-4"></div>
                  <div className="eyebrow">{t("4:30 – 11:30 AM · the consecration", "ಬೆಳಿಗ್ಗೆ 4:30 – 11:30 · ಪ್ರತಿಷ್ಠಾಪನೆ")}</div>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    <li className="flex gap-3"><span className="numeral text-ink shrink-0" style={{ minWidth: "3.4rem" }}>6:15</span><span>{t("Kumbodvasana", "ಕುಂಭೋದ್ವಾಸನ")}</span></li>
                    <li className="flex gap-3"><span className="numeral text-ink shrink-0" style={{ minWidth: "3.4rem" }}>7:00</span><span>{t("Vimana Gopura Kumbhabhisheka", "ವಿಮಾನ ಗೋಪುರ ಕುಂಭಾಭಿಷೇಕ")}</span></li>
                    <li className="flex gap-3"><span className="numeral text-ink shrink-0" style={{ minWidth: "3.4rem" }}>7:45</span><span>{t("Prana Prathishte · both Swamys", "ಪ್ರಾಣ ಪ್ರತಿಷ್ಠೆ · ಇಬ್ಬರೂ ಸ್ವಾಮಿಗಳಿಗೆ")}</span></li>
                    <li className="flex gap-3"><span className="numeral text-ink shrink-0" style={{ minWidth: "3.4rem" }}>9:30</span><span>{t("Panchamrutha Abhisheka", "ಪಂಚಾಮೃತ ಅಭಿಷೇಕ")}</span></li>
                    <li className="flex gap-3"><span className="numeral text-ink shrink-0" style={{ minWidth: "3.4rem" }}>11:30</span><span>{t("Thirupavada, Doopa Deepa, Mantra Pushpa, Mahanivedhana", "ತಿರುಪಾವಡ, ಧೂಪ ದೀಪ, ಮಂತ್ರ ಪುಷ್ಪ, ಮಹಾನಿವೇದನ")}</span></li>
                    <li className="flex gap-3"><span className="numeral text-ink shrink-0" style={{ minWidth: "3.4rem" }}>12:00</span><span>{t("Maha Mangalarathi, Shathumarai, Rashtra Ashirvadha, then Anna Dhana", "ಮಹಾ ಮಂಗಳಾರತಿ, ಶಠುಮರೈ, ರಾಷ್ಟ್ರ ಆಶೀರ್ವಾದ, ನಂತರ ಅನ್ನದಾನ")}</span></li>
                    <li className="flex gap-3"><span className="numeral text-ink shrink-0" style={{ minWidth: "3.4rem" }}>6:30p</span><span>{t("Rathothsavam through the village", "ಗ್ರಾಮದಾದ್ಯಂತ ರಥೋತ್ಸವ")}</span></li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <ScrollReveal className="border border-line bg-surface p-7">
              <h3 className="display text-2xl mt-1">{t("Daily Timings", "ದೈನಂದಿನ ಸಮಯ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-line pb-2">
                  <span className="text-ink">{t("Suprabhata & Abhisheka", "ಸುಪ್ರಭಾತ ಮತ್ತು ಅಭಿಷೇಕ")}</span>
                  <span className="text-muted">{t("5:30 – 7:00 AM", "ಬೆಳಿಗ್ಗೆ 5:30 – 7:00")}</span>
                </li>
                <li className="flex justify-between border-b border-line pb-2">
                  <span className="text-ink">{t("Morning Darshan", "ಬೆಳಗಿನ ದರ್ಶನ")}</span>
                  <span className="text-muted">{t("7:00 – 11:30 AM", "ಬೆಳಿಗ್ಗೆ 7:00 – 11:30")}</span>
                </li>
                <li className="flex justify-between border-b border-line pb-2">
                  <span className="text-ink">{t("Madhyahnika", "ಮಧ್ಯಾಹ್ನಿಕ")}</span>
                  <span className="text-muted">{t("12:00 – 12:30 PM", "ಮಧ್ಯಾಹ್ನ 12:00 – 12:30")}</span>
                </li>
                <li className="flex justify-between border-b border-line pb-2">
                  <span className="text-ink">{t("Afternoon Rest", "ಮಧ್ಯಾಹ್ನದ ವಿಶ್ರಾಂತಿ")}</span>
                  <span className="text-muted">{t("12:30 – 4:30 PM", "ಮಧ್ಯಾಹ್ನ 12:30 – ಸಂಜೆ 4:30")}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-ink">{t("Evening Deeparadhana", "ಸಂಜೆಯ ದೀಪಾರಾಧನೆ")}</span>
                  <span className="text-muted">{t("6:00 – 8:30 PM", "ಸಂಜೆ 6:00 – ರಾತ್ರಿ 8:30")}</span>
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={80} className="border border-line bg-surface p-7">
              <h3 className="display text-2xl mt-1">{t("Year-round sevas", "ವರ್ಷವಿಡೀ ಸೇವೆಗಳು")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-ink/90 leading-relaxed" dangerouslySetInnerHTML={{
                __html: t(
                  'Beyond the festival days, <a href="/sevas#nakshatra" class="link">nakshatra parihara</a> and the life-samskaras are performed through the year. See the <a href="/sevas" class="link">full list of sevas</a>.',
                  'ಹಬ್ಬದ ದಿನಗಳ ಆಚೆಗೂ, <a href="/sevas#nakshatra" class="link">ನಕ್ಷತ್ರ ಪರಿಹಾರ</a> ಮತ್ತು ಜೀವನದ ಸಂಸ್ಕಾರಗಳನ್ನು ವರ್ಷವಿಡೀ ನಡೆಸಲಾಗುತ್ತದೆ. <a href="/sevas" class="link">ಸೇವೆಗಳ ಪೂರ್ಣ ಪಟ್ಟಿ</a> ನೋಡಿ.'
                )
              }} />
            </ScrollReveal>

            <ScrollReveal delay={120} className="border border-line bg-surface p-7">
              <h3 className="display text-2xl mt-1">{t("All are welcome", "ಎಲ್ಲರಿಗೂ ಸ್ವಾಗತ")}</h3>
              <div className="rule-faint mt-4 mb-4"></div>
              <p className="text-sm text-ink/90 leading-relaxed">
                {t(
                  "There is no registration and no entrance fee: the entire Rampura gramastharu and all devotees are welcome, every day. On festival days, annadana follows the ceremonies.",
                  "ಯಾವುದೇ ನೋಂದಣಿ ಅಥವಾ ಪ್ರವೇಶ ಶುಲ್ಕವಿಲ್ಲ: ರಾಂಪುರದ ಸಮಸ್ತ ಗ್ರಾಮಸ್ಥರು ಮತ್ತು ಎಲ್ಲಾ ಭಕ್ತರಿಗೆ, ಪ್ರತಿದಿನವೂ ಸ್ವಾಗತ. ಹಬ್ಬದ ದಿನಗಳಲ್ಲಿ ಸಮಾರಂಭಗಳ ನಂತರ ಅನ್ನದಾನ ನಡೆಯುತ್ತದೆ."
                )}
              </p>
            </ScrollReveal>
          </aside>
        </div>
      </section>

      {/* Open Invitation */}
      <section className="bg-surface border-b border-line">
        <div className="wrap py-24 max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="eyebrow">{t("An open invitation", "ಮುಕ್ತ ಆಹ್ವಾನ")}</div>
            <h2
              className="display text-3xl sm:text-5xl mt-5"
              dangerouslySetInnerHTML={{
                __html: t('Everyone is <em class="italic font-normal text-accent">welcome.</em>', 'ಎಲ್ಲರಿಗೂ <em class="italic font-normal text-accent">ಸ್ವಾಗತ.</em>')
              }}
            />
            <div className="rule mx-auto mt-7"></div>
            <p className="mt-7 text-ink/90 leading-relaxed">
              {t(
                "There is no registration and no entrance fee. The temple is open every day: mornings for abhisheka, evenings for the deeparadhana. Beyond the festival days, sevas and parihara are performed through the year.",
                "ಯಾವುದೇ ನೋಂದಣಿ ಅಥವಾ ಪ್ರವೇಶ ಶುಲ್ಕವಿಲ್ಲ. ದೇವಸ್ಥಾನವು ಪ್ರತಿದಿನ ತೆರೆದಿರುತ್ತದೆ: ಅಭಿಷೇಕಕ್ಕೆ ಬೆಳಿಗ್ಗೆ, ದೀಪಾರಾಧನೆಗೆ ಸಂಜೆ. ಹಬ್ಬದ ದಿನಗಳ ಆಚೆಗೂ, ಸೇವೆ ಮತ್ತು ಪರಿಹಾರಗಳು ವರ್ಷವಿಡೀ ನಡೆಯುತ್ತವೆ."
              )}
            </p>
            <div className="flex gap-3 justify-center flex-wrap mt-8">
              <Link href="/visit" className="btn btn-primary">{t("Plan your visit", "ನಿಮ್ಮ ಭೇಟಿಯನ್ನು ಯೋಜಿಸಿ")}</Link>
              <Link href="/sevas" className="btn btn-secondary">{t("Sevas & Parihara", "ಸೇವೆ ಮತ್ತು ಪರಿಹಾರ")}</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
