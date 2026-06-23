import React, { useState } from "react";
import axios from "axios";
import { MapPin, Car, Train, Plane, Clock, Mail, Phone, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { BilingualHeading, SectionDivider } from "@/components/BilingualHeading";
import { LotusMedallion } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";
import { TIMINGS, TEMPLE_MAP_URL, TEMPLE_MAP_EMBED } from "@/lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
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
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || null,
        message: form.message.trim(),
      });
      setDone(true);
      toast.success("Message sent. Namaskara.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string" ? detail : "Could not send. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div
        data-testid="contact-success"
        className="border border-border bg-jasmine/60 rounded-sm p-8 text-center"
      >
        <CheckCircle2 className="w-9 h-9 text-vermillion mx-auto" />
        <h3 className="font-serif-display text-2xl text-temple-ink mt-3">
          Your message has reached us.
        </h3>
        <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto">
          A volunteer from the temple will respond shortly.
        </p>
        <button
          type="button"
          data-testid="contact-reset-btn"
          onClick={() => setDone(false)}
          className="mt-6 text-vermillion text-sm uppercase tracking-wider"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      data-testid="contact-form"
      className="border border-border bg-card rounded-sm p-6 sm:p-8 space-y-5"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Name
          </span>
          <input
            type="text"
            required
            value={form.name}
            onChange={onChange("name")}
            data-testid="contact-name-input"
            className="w-full bg-background border border-input rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-vermillion focus:ring-1 focus:ring-vermillion/40"
          />
        </label>
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Email
          </span>
          <input
            type="email"
            required
            value={form.email}
            onChange={onChange("email")}
            data-testid="contact-email-input"
            className="w-full bg-background border border-input rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-vermillion focus:ring-1 focus:ring-vermillion/40"
          />
        </label>
      </div>
      <label className="block">
        <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Subject <span className="normal-case tracking-normal">(optional)</span>
        </span>
        <input
          type="text"
          value={form.subject}
          onChange={onChange("subject")}
          data-testid="contact-subject-input"
          className="w-full bg-background border border-input rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-vermillion focus:ring-1 focus:ring-vermillion/40"
        />
      </label>
      <label className="block">
        <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Message
        </span>
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={onChange("message")}
          data-testid="contact-message-input"
          className="w-full bg-background border border-input rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-vermillion focus:ring-1 focus:ring-vermillion/40"
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        data-testid="contact-submit-btn"
        className="inline-flex items-center gap-2 rounded-full bg-ink text-jasmine px-7 py-3 text-sm font-medium hover:bg-vermillion transition-colors disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export default function Visit() {
  return (
    <div data-testid="page-visit">
      <section className="relative bg-deep text-jasmine py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center">
          <div className="spin-slow"><LotusMedallion className="w-[600px] h-[600px]" color="hsl(38, 95%, 62%)" /></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div className="font-serif-sc text-marigold text-xs tracking-[0.4em] uppercase">Plan your visit</div>
          <div className="font-kannada text-marigold/80 text-base mt-4">ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ</div>
          <h1 className="display-hero text-jasmine text-6xl sm:text-7xl lg:text-8xl mt-5 leading-[0.92]">
            Come and take
            <br />
            <em className="text-marigold">a darshan.</em>
          </h1>
          <p className="mt-7 font-serif-display italic text-jasmine/75 text-lg max-w-2xl mx-auto leading-relaxed">
            “Rampura is small, but easy to reach. The temple opens at first light and the path
            from the road to the sanctum is short and shaded.”
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Reveal>
          <div className="aspect-[4/3] w-full rounded-sm overflow-hidden border border-border bg-muted">
            <iframe
              title="Rampura temple location"
              data-testid="visit-map-frame"
              src={TEMPLE_MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
          <a
            href={TEMPLE_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="visit-google-maps-link"
            className="mt-4 inline-flex items-center gap-2 text-vermillion hover:text-temple-ink text-sm uppercase tracking-wider"
          >
            <MapPin className="w-4 h-4" /> Open in Google Maps
          </a>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-vermillion mt-1" />
              <div>
                <h3 className="font-serif-display text-xl text-temple-ink">
                  Address
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sri Anjaneya Swamy Temple, Rampura village, near Srirangapatna,
                  Mandya District, Karnataka — 571438
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-vermillion mt-1" />
              <div>
                <h3 className="font-serif-display text-xl text-temple-ink">
                  Hours
                </h3>
                <ul className="mt-1 text-sm space-y-1">
                  {TIMINGS.map((t) => (
                    <li
                      key={t.label}
                      className="flex justify-between gap-6 text-muted-foreground"
                    >
                      <span>{t.label}</span>
                      <span>{t.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-vermillion mt-1" />
              <div>
                <h3 className="font-serif-display text-xl text-temple-ink">
                  Reach the temple office
                </h3>
                <p className="text-sm text-muted-foreground">
                  Available 7:00 AM – 11:00 AM for seva sankalpa & enquiries.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-vermillion mt-1" />
              <div>
                <h3 className="font-serif-display text-xl text-temple-ink">
                  Write to us
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use the message form below — we read every note.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SectionDivider label="ತಲುಪುವ ದಾರಿ" />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Car,
            kn: "ರಸ್ತೆ ಮೂಲಕ",
            title: "By road",
            text: "22 km from Mysore (40 min) and 8 km from Srirangapatna (15 min). Free parking on temple grounds.",
          },
          {
            icon: Train,
            kn: "ರೈಲು ಮೂಲಕ",
            title: "By rail",
            text: "Nearest railway stations: Srirangapatna (8 km) and Mysuru Junction (22 km). Both connect to Bangalore and beyond.",
          },
          {
            icon: Plane,
            kn: "ವಿಮಾನದಲ್ಲಿ",
            title: "By air",
            text: "Mysuru airport (15 km) for short hops; Bengaluru Kempegowda International (160 km) for long-haul.",
          },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 80}>
            <div className="border border-border bg-sandstone/40 rounded-sm p-6 h-full">
              <c.icon className="w-6 h-6 text-vermillion" />
              <div className="font-kannada text-vermillion/80 text-xs mt-3">
                {c.kn}
              </div>
              <h3 className="font-serif-display text-xl text-temple-ink mt-1">
                {c.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {c.text}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      <SectionDivider label="ಸಂದೇಶ" />

      <section className="max-w-3xl mx-auto px-5 sm:px-8 pb-24">
        <Reveal>
          <BilingualHeading
            kannada="ಸಂಪರ್ಕಿಸಿ"
            english="Send the temple a message"
            size="md"
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="text-muted-foreground mt-4 mb-8 leading-relaxed">
            Questions about seva, sankalpa, or directions — write to us here.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <ContactForm />
        </Reveal>
      </section>
    </div>
  );
}
