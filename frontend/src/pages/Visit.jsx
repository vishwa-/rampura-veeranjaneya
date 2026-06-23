import React, { useState } from "react";
import axios from "axios";
import { MapPin, Car, Train, Plane, Clock, Mail, Phone, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Masthead, OrnamentDivider } from "@/components/Ornaments";
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
      <div data-testid="contact-success" className="border border-crimson bg-paper-aged p-10 text-center">
        <CheckCircle2 className="w-9 h-9 text-crimson mx-auto" />
        <h3 className="font-display text-3xl text-ink mt-4">Your message has reached us.</h3>
        <div className="rule-crimson mt-5 w-16 mx-auto" />
        <p className="text-ink/85 mt-5 max-w-md mx-auto font-body">A volunteer from the temple will respond shortly.</p>
        <button type="button" data-testid="contact-reset-btn" onClick={() => setDone(false)} className="mt-6 text-crimson text-label">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} data-testid="contact-form" className="border border-ink-muted/30 bg-paper p-8 sm:p-10 space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="block">
          <span className="text-label text-crimson block mb-2">Name</span>
          <input type="text" required value={form.name} onChange={onChange("name")} data-testid="contact-name-input" className="input-paper" />
        </label>
        <label className="block">
          <span className="text-label text-crimson block mb-2">Email</span>
          <input type="email" required value={form.email} onChange={onChange("email")} data-testid="contact-email-input" className="input-paper" />
        </label>
      </div>
      <label className="block">
        <span className="text-label text-crimson block mb-2">Subject <span className="text-ink-muted/70 lowercase tracking-normal">(optional)</span></span>
        <input type="text" value={form.subject} onChange={onChange("subject")} data-testid="contact-subject-input" className="input-paper" />
      </label>
      <label className="block">
        <span className="text-label text-crimson block mb-2">Message</span>
        <textarea rows={5} required value={form.message} onChange={onChange("message")} data-testid="contact-message-input" className="input-paper" />
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
      <section className="relative bg-paper border-b border-ink-muted/20">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 pt-10 sm:pt-16 pb-16">
          <Masthead date="Planning a darshan" edition="The Visitor's Companion" label="Chapter VII" />
          <Reveal delay={120}>
            <div className="text-center mt-12 max-w-4xl mx-auto">
              <div className="font-kannada text-crimson text-base mt-4">ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ</div>
              <h1 className="text-masthead text-ink mt-4">
                Come and take <em className="italic text-crimson">a darshan.</em>
              </h1>
              <p className="mt-6 font-display italic text-ink-muted text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                “Rampura is small, but easy to reach. The temple opens at first light.”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Reveal>
            <div className="aspect-[4/3] w-full overflow-hidden border border-ink-muted/30 bg-paper-aged">
              <iframe
                title="Rampura temple location"
                data-testid="visit-map-frame"
                src={TEMPLE_MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <a href={TEMPLE_MAP_URL} target="_blank" rel="noopener noreferrer" data-testid="visit-google-maps-link" className="mt-5 inline-flex items-center gap-2 text-crimson text-label">
              <MapPin className="w-4 h-4" /> Open in Google Maps
            </a>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-crimson mt-1" />
                <div>
                  <h3 className="font-display text-2xl text-ink">Address</h3>
                  <p className="text-base text-ink/90 mt-1 font-body">{TEMPLE_ADDRESS.line1}</p>
                  <p className="text-base text-ink/90 font-body">{TEMPLE_ADDRESS.line2}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-crimson mt-1" />
                <div className="w-full">
                  <h3 className="font-display text-2xl text-ink">Hours</h3>
                  <ul className="mt-2 text-base space-y-1 font-body">
                    {TIMINGS.map((t) => (
                      <li key={t.label} className="flex justify-between gap-6 text-ink/90">
                        <span>{t.label}</span>
                        <span className="text-ink-muted">{t.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-crimson mt-1" />
                <div>
                  <h3 className="font-display text-2xl text-ink">Temple office</h3>
                  <p className="text-base text-ink/90 font-body">Available 7:00 AM – 11:00 AM for seva sankalpa & enquiries.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-crimson mt-1" />
                <div>
                  <h3 className="font-display text-2xl text-ink">Write to us</h3>
                  <p className="text-base text-ink/90 font-body">
                    <a href={`mailto:${TEMPLE_ADDRESS.email}`} className="underline underline-offset-4 hover:text-crimson">{TEMPLE_ADDRESS.email}</a> — or use the form below.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <OrnamentDivider label="Getting here" kn="ತಲುಪುವ ದಾರಿ" theme="light" />

      <section className="bg-paper-aged border-y border-ink-muted/20 py-16">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Car, kn: "ರಸ್ತೆ", title: "By road", text: "22 km from Mysuru (40 min) and 8 km from Srirangapatna (15 min). Free parking on temple grounds." },
            { icon: Train, kn: "ರೈಲು", title: "By rail", text: "Nearest stations: Srirangapatna (8 km) and Mysuru Junction (22 km). Both connect to Bangalore." },
            { icon: Plane, kn: "ವಿಮಾನ", title: "By air", text: "Mysuru airport (15 km) for short hops; Bengaluru international (160 km) for long-haul." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="border border-ink-muted/30 bg-paper p-8 h-full">
                <c.icon className="w-6 h-6 text-crimson" />
                <div className="font-kannada text-crimson text-xs mt-3">{c.kn}</div>
                <h3 className="font-display text-2xl text-ink mt-1">{c.title}</h3>
                <div className="rule-thin mt-4 mb-4 w-10" />
                <p className="text-sm text-ink/90 leading-relaxed font-body">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <OrnamentDivider label="Send a message" kn="ಸಂದೇಶ" theme="light" />

      <section className="bg-paper pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="text-label text-crimson">Send the temple a message</div>
            <h2 className="text-display-h1 text-ink mt-5">Questions about seva or sankalpa?</h2>
            <div className="rule-crimson mt-7 w-16" />
            <p className="text-ink/85 mt-5 mb-8 leading-relaxed font-body">
              We read every note. Volunteers respond within a day or two.
            </p>
          </Reveal>
          <Reveal delay={120}><ContactForm /></Reveal>
        </div>
      </section>
    </div>
  );
}
