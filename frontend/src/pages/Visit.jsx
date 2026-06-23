import React, { useState } from "react";
import axios from "axios";
import { MapPin, Car, Train, Plane, Clock, Mail, Phone, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Medallion, OrnamentDivider } from "@/components/Ornaments";
import { TIMINGS, TEMPLE_MAP_URL, TEMPLE_MAP_EMBED, TEMPLE_ADDRESS } from "@/lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, {
        name: form.name.trim(), email: form.email.trim(),
        subject: form.subject.trim() || null, message: form.message.trim(),
      });
      setDone(true);
      toast.success("Message sent. Namaskara.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Could not send. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div data-testid="contact-success" className="border border-copper/40 bg-canvas-deep-surface p-8 text-center">
        <CheckCircle2 className="w-9 h-9 text-copper mx-auto" />
        <h3 className="font-display text-2xl text-cream mt-3">Your message has reached us.</h3>
        <p className="text-cream/80 mt-2 text-sm max-w-md mx-auto">A volunteer from the temple will respond shortly.</p>
        <button type="button" data-testid="contact-reset-btn" onClick={() => setDone(false)} className="mt-6 text-copper text-eyebrow">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} data-testid="contact-form" className="border border-warm bg-canvas-deep-surface p-6 sm:p-8 space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-eyebrow text-copper block mb-2">Name</span>
          <input type="text" required value={form.name} onChange={onChange("name")} data-testid="contact-name-input" className="input-temple" />
        </label>
        <label className="block">
          <span className="text-eyebrow text-copper block mb-2">Email</span>
          <input type="email" required value={form.email} onChange={onChange("email")} data-testid="contact-email-input" className="input-temple" />
        </label>
      </div>
      <label className="block">
        <span className="text-eyebrow text-copper block mb-2">Subject <span className="text-cream/60">(optional)</span></span>
        <input type="text" value={form.subject} onChange={onChange("subject")} data-testid="contact-subject-input" className="input-temple" />
      </label>
      <label className="block">
        <span className="text-eyebrow text-copper block mb-2">Message</span>
        <textarea rows={5} required value={form.message} onChange={onChange("message")} data-testid="contact-message-input" className="input-temple" />
      </label>
      <button type="submit" disabled={submitting} data-testid="contact-submit-btn" className="btn btn-primary disabled:opacity-60">
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export default function Visit() {
  return (
    <div data-testid="page-visit">
      <section className="relative bg-canvas-deep py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center">
          <div className="spin-slow"><Medallion className="w-[600px] h-[600px]" color="hsl(20 51% 55%)" /></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div className="text-eyebrow text-copper">Plan your visit</div>
          <div className="font-kannada text-copper text-base mt-4">ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ</div>
          <h1 className="text-display-hero text-cream mt-5">
            Come and take <em className="italic text-copper">a darshan.</em>
          </h1>
          <p className="mt-7 font-display italic text-cream/90 text-lg max-w-2xl mx-auto leading-relaxed">
            “Rampura is small, but easy to reach. The temple opens at first light.”
          </p>
        </div>
      </section>

      <section className="bg-canvas-deep">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Reveal>
            <div className="aspect-[4/3] w-full overflow-hidden border border-warm bg-canvas-deep-surface">
              <iframe
                title="Rampura temple location"
                data-testid="visit-map-frame"
                src={TEMPLE_MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <a href={TEMPLE_MAP_URL} target="_blank" rel="noopener noreferrer" data-testid="visit-google-maps-link" className="mt-5 inline-flex items-center gap-2 text-copper text-eyebrow">
              <MapPin className="w-4 h-4" /> Open in Google Maps
            </a>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-copper mt-1" />
                <div>
                  <h3 className="font-display text-xl text-cream">Address</h3>
                  <p className="text-sm text-cream/85 mt-1">{TEMPLE_ADDRESS.line1}</p>
                  <p className="text-sm text-cream/85">{TEMPLE_ADDRESS.line2}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-copper mt-1" />
                <div className="w-full">
                  <h3 className="font-display text-xl text-cream">Hours</h3>
                  <ul className="mt-2 text-sm space-y-1">
                    {TIMINGS.map((t) => (
                      <li key={t.label} className="flex justify-between gap-6 text-cream/85">
                        <span>{t.label}</span>
                        <span className="text-cream/70">{t.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-copper mt-1" />
                <div>
                  <h3 className="font-display text-xl text-cream">Temple office</h3>
                  <p className="text-sm text-cream/85">Available 7:00 AM – 11:00 AM for seva sankalpa & enquiries.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-copper mt-1" />
                <div>
                  <h3 className="font-display text-xl text-cream">Write to us</h3>
                  <p className="text-sm text-cream/85">
                    <a href={`mailto:${TEMPLE_ADDRESS.email}`} className="underline underline-offset-4 hover:text-copper">{TEMPLE_ADDRESS.email}</a> — or use the form below.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <OrnamentDivider label="Getting here" kn="ತಲುಪುವ ದಾರಿ" theme="dark" />

      <section className="bg-canvas-deep">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
          {[
            { icon: Car, kn: "ರಸ್ತೆ", title: "By road", text: "22 km from Mysuru (40 min) and 8 km from Srirangapatna (15 min). Free parking on temple grounds." },
            { icon: Train, kn: "ರೈಲು", title: "By rail", text: "Nearest stations: Srirangapatna (8 km) and Mysuru Junction (22 km). Both connect to Bangalore." },
            { icon: Plane, kn: "ವಿಮಾನ", title: "By air", text: "Mysuru airport (15 km) for short hops; Bengaluru international (160 km) for long-haul." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="border border-warm bg-canvas-deep-surface p-7 h-full">
                <c.icon className="w-6 h-6 text-copper" />
                <div className="font-kannada text-copper text-xs mt-3">{c.kn}</div>
                <h3 className="font-display text-xl text-cream mt-1">{c.title}</h3>
                <p className="text-sm text-cream/85 mt-3 leading-relaxed">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <OrnamentDivider label="Send a message" kn="ಸಂದೇಶ" theme="dark" />

      <section className="bg-canvas-deep pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="text-eyebrow text-copper">Send the temple a message</div>
            <h2 className="text-display-h2 text-cream mt-4">Questions about seva or sankalpa?</h2>
            <p className="text-cream/85 mt-4 mb-8 leading-relaxed">
              We read every note. Volunteers respond within a day or two.
            </p>
          </Reveal>
          <Reveal delay={120}><ContactForm /></Reveal>
        </div>
      </section>
    </div>
  );
}
