import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service · Sri Kshetra Rampura",
  description: "Terms and conditions governing online pooja bookings and visits to Sri Kshetra Rampura.",
};

export default function TermsPage() {
  return (
    <div className="bg-bg text-ink min-h-screen">
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">Devasthanam Guidelines</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">
              Terms of Service
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed font-serif">
              Guidelines and terms governing participation in temple sevas, sankalpa offerings, and pilgrimage to Sri Kshetra Rampura.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="wrap py-16 sm:py-20 max-w-4xl">
        <div className="space-y-8 bg-surface p-8 sm:p-12 border border-line" style={{ borderRadius: "var(--radius-md)" }}>
          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">1. Nature of Religious Sevas</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              All poojas, archanas, abhishekas, and pariharas listed on this website are voluntary religious rituals conducted by authorized Veda pandits under the aegis of the <strong>Devatha Rampura Anjaneyaswamy Trust</strong>. Dakshina offerings contributed for sevas are utilized strictly towards temple maintenance, priest remuneration, nitya annadana, and dharmic religious activities.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">2. Online Bookings &amp; Sankalpa Scheduling</h2>
            <div className="rule-faint my-3"></div>
            <ul className="list-disc pl-6 space-y-2 text-ink/90 font-serif text-sm">
              <li>Devotees must provide accurate sankalpa details (Name, Gotra, Nakshatra, Rashi) to enable precise recitation during the archana.</li>
              <li>While every effort is made to conduct the seva strictly on the chosen calendar date, unforeseen religious observances (such as solar/lunar eclipses or special temple rituals) may necessitate rescheduling the seva to the next auspicious date, with prior intimation to the devotee.</li>
              <li>Booking reference tokens (e.g. <code>RMP-YYYYMMDD-XXXXXX</code>) must be preserved and presented upon arrival at the temple office.</li>
            </ul>
          </div>

          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">3. Temple Sanctum Decorum</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              Visitors to the kshetra are kindly requested to honor the sanctity of the temple premises:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-ink/90 font-serif text-sm">
              <li>Traditional, respectful attire is appreciated inside the sanctum and mandapams.</li>
              <li>Photography and video recording inside the inner garbha griha are strictly prohibited to maintain ritual sanctity.</li>
              <li>Free footwear storage and orderly queue arrangements must be respected at all times.</li>
            </ul>
          </div>

          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">4. Modifications &amp; Inquiries</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              The Trust reserves the right to amend these guidelines as needed to comply with temple customs and statutory requirements. For inquiries regarding bookings and timings, devotees may reach out to:
            </p>
            <p className="mt-2 text-sm text-ink/90 font-serif">
              <strong>Devatha Rampura Anjaneyaswamy Trust</strong><br />
              Email: info@rampura.in | Phone: +91 91648 91591 (Mahadev)<br />
              Rampura Village, Srirangapatna Taluk, Mandya – 571427
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
