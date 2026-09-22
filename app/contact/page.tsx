import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us · Sri Kshetra Rampura",
  description: "Contact Devatha Rampura Anjaneyaswamy Trust for seva bookings, darshan timings, and visiting guidance.",
};

const CONTACTS = [
  { name: "Abhishek Bhattar", role: "Temple Purohit", tel: "+919901883375", display: "+91 99018 83375" },
  { name: "Kiran Kashyap", role: "Temple Purohit", tel: "+918310395780", display: "+91 83103 95780" },
  { name: "Gururaju", role: "Devasthanam Coordinator", tel: "+919620636465", display: "+91 96206 36465" },
  { name: "Mahadev", role: "Devasthanam Office", tel: "+919164891591", display: "+91 91648 91591" },
];

export default function ContactPage() {
  return (
    <div className="bg-bg text-ink min-h-screen">
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">Get in Touch</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">
              Contact the Devasthanam
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed font-serif">
              Whether you are planning your pilgrimage, inquiring about special sankalpa sevas, or seeking guidance for nakshatra parihara, the temple coordinators are here to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="wrap py-16 sm:py-20 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Temple Office Address */}
          <div className="bg-surface p-8 sm:p-10 border border-line flex flex-col justify-between" style={{ borderRadius: "var(--radius-md)" }}>
            <div>
              <div className="eyebrow text-accent">Location &amp; Office</div>
              <h2 className="display text-2xl sm:text-3xl mt-2">Devatha Rampura Anjaneyaswamy Trust</h2>
              <div className="rule-faint my-4"></div>
              <div className="space-y-4 text-ink/90 font-serif leading-relaxed">
                <p>
                  <strong>Address:</strong><br />
                  Rampura Village, Srirangapatna Taluk,<br />
                  Mandya District, Karnataka – 571427, India
                </p>
                <p>
                  <strong>Sanctum Hours:</strong><br />
                  Open all days: 5:30 AM – 8:30 PM<br />
                  Seva Sankalpa Registration: 7:00 AM – 11:00 AM
                </p>
                <p>
                  <strong>Email:</strong><br />
                  <a href="mailto:info@rampura.in" className="text-accent underline">info@rampura.in</a>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line flex gap-3 flex-wrap">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=12.4381665,76.6725361"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Get Directions on Maps →
              </a>
              <Link href="/visit" className="btn btn-secondary">
                Visitor’s Guide
              </Link>
            </div>
          </div>

          {/* Key Coordinators & Purohits */}
          <div className="bg-surface p-8 sm:p-10 border border-line" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="eyebrow text-accent">Priests &amp; Coordinators</div>
            <h2 className="display text-2xl sm:text-3xl mt-2">Direct Phone Contacts</h2>
            <div className="rule-faint my-4"></div>
            <p className="text-muted text-sm mb-6">
              Devotees can reach out directly for queries regarding ritual dates, gotra sankalpa, and prasadam arrangements.
            </p>

            <div className="space-y-4">
              {CONTACTS.map((c, i) => (
                <div key={i} className="p-4 bg-bg border border-line flex items-center justify-between gap-4" style={{ borderRadius: "var(--radius-sm)" }}>
                  <div>
                    <div className="font-semibold text-ink text-base">{c.name}</div>
                    <div className="text-xs uppercase tracking-wider text-muted mt-0.5">{c.role}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${c.tel}`}
                      className="numeral font-bold text-accent text-sm tabular-nums hover:underline"
                    >
                      {c.display}
                    </a>
                    <a
                      href={`https://wa.me/${c.tel.replace("+", "")}?text=${encodeURIComponent("Namaskara, I am inquiring regarding Sri Kshetra Rampura seva bookings.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary py-1 px-2.5 text-xs"
                      aria-label={`WhatsApp ${c.name}`}
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
