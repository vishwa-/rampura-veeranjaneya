import React, { useState } from "react";
import axios from "axios";
import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Medallion, OrnamentDivider } from "@/components/Ornaments";
import { EVENTS, TIMINGS } from "@/lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function formatDay(iso) {
  try {
    const d = new Date(iso);
    return { day: d.toLocaleDateString("en-IN", { day: "2-digit" }), mon: d.toLocaleDateString("en-IN", { month: "short" }) };
  } catch {
    return { day: "—", mon: "" };
  }
}

function RsvpForm({ events }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", attendees: 1,
    event_id: events[0]?.id ?? "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.event_id) {
      toast.error("Please fill name, phone and event.");
      return;
    }
    setSubmitting(true);
    try {
      const selected = events.find((ev) => ev.id === form.event_id);
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        attendees: Number(form.attendees) || 1,
        event_id: form.event_id,
        event_title: selected?.title ?? form.event_id,
        message: form.message.trim() || null,
      };
      if (form.email.trim()) payload.email = form.email.trim();
      await axios.post(`${API}/events/register`, payload);
      setSubmitted(true);
      toast.success("Registration received. We will be in touch.");
      setForm({ name: "", email: "", phone: "", attendees: 1, event_id: events[0]?.id ?? "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Could not send your registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div data-testid="rsvp-success" className="border border-copper/40 bg-canvas-deep-surface p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-copper mx-auto" />
        <h3 className="font-display text-2xl text-cream mt-3">Namaskara — your sankalpa is noted.</h3>
        <p className="text-cream/80 mt-2 text-sm max-w-md mx-auto">
          A volunteer from the temple will reach out before the day with arrival instructions.
        </p>
        <button type="button" data-testid="rsvp-reset-btn" onClick={() => setSubmitted(false)} className="mt-6 text-copper text-eyebrow">
          Register another devotee
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} data-testid="rsvp-form" className="border border-warm bg-canvas-deep-surface p-6 sm:p-8 space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-eyebrow text-copper block mb-2">Name</span>
          <input type="text" required value={form.name} onChange={onChange("name")} data-testid="rsvp-name-input" className="input-temple" placeholder="Your full name" />
        </label>
        <label className="block">
          <span className="text-eyebrow text-copper block mb-2">Phone</span>
          <input type="tel" required value={form.phone} onChange={onChange("phone")} data-testid="rsvp-phone-input" className="input-temple" placeholder="+91 9XXXXXXXXX" />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-eyebrow text-copper block mb-2">Email <span className="text-cream/60">(optional)</span></span>
          <input type="email" value={form.email} onChange={onChange("email")} data-testid="rsvp-email-input" className="input-temple" placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="text-eyebrow text-copper block mb-2">No. of devotees</span>
          <input type="number" min={1} max={50} value={form.attendees} onChange={onChange("attendees")} data-testid="rsvp-attendees-input" className="input-temple" />
        </label>
      </div>
      <label className="block">
        <span className="text-eyebrow text-copper block mb-2">Event</span>
        <select value={form.event_id} onChange={onChange("event_id")} data-testid="rsvp-event-select" className="input-temple">
          {events.map((e) => (<option key={e.id} value={e.id}>{e.title} — {e.dateLabel}</option>))}
        </select>
      </label>
      <label className="block">
        <span className="text-eyebrow text-copper block mb-2">A note <span className="text-cream/60">(optional)</span></span>
        <textarea rows={3} value={form.message} onChange={onChange("message")} data-testid="rsvp-message-input" className="input-temple" placeholder="Sankalpa, seva preference, accessibility needs…" />
      </label>
      <button type="submit" disabled={submitting} data-testid="rsvp-submit-btn" className="btn btn-primary disabled:opacity-60">
        {submitting ? "Sending…" : "Register devotee(s)"}
      </button>
    </form>
  );
}

export default function Events() {
  return (
    <div data-testid="page-events">
      <section className="relative bg-canvas-deep py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center">
          <div className="spin-slow"><Medallion className="w-[600px] h-[600px]" color="hsl(20 51% 55%)" /></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div className="text-eyebrow text-copper">Events & Live Updates</div>
          <div className="font-kannada text-copper text-base mt-4">ಉತ್ಸವಗಳು</div>
          <h1 className="text-display-hero text-cream mt-5">
            The temple year, <em className="italic text-copper">unfolding.</em>
          </h1>
          <p className="mt-7 font-display italic text-cream/90 text-lg max-w-2xl mx-auto leading-relaxed">
            “Small ceremonies and a few large ones — beginning with the praana pratishtha of the new Vidya Hayagreeva shrine.”
          </p>
        </div>
      </section>

      <section className="bg-canvas-deep">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-2" data-testid="events-list">
            {EVENTS.map((e, i) => {
              const { day, mon } = formatDay(e.date);
              return (
                <Reveal key={e.id} delay={i * 80}>
                  <article data-testid={`event-card-${e.id}`} className={`grid grid-cols-12 gap-5 py-7 border-b border-warm ${e.featured ? "bg-copper/10 -mx-4 px-4 sm:-mx-6 sm:px-6" : ""}`}>
                    <div className="col-span-3 sm:col-span-2">
                      <div className="text-eyebrow text-copper">{mon}</div>
                      <div className="font-display text-5xl text-cream leading-none mt-1">{day}</div>
                    </div>
                    <div className="col-span-9 sm:col-span-10">
                      <div className="font-kannada text-copper text-sm">{e.titleKn}</div>
                      <h3 className="font-display text-2xl sm:text-3xl text-cream mt-1">
                        {e.title}
                        {e.featured ? <span className="ml-3 align-middle inline-block text-[10px] tracking-[0.25em] uppercase bg-copper text-canvas-deep px-2 py-1">Featured</span> : null}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-cream/85">
                        <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-copper" />{e.dateLabel}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-copper" />{e.time}</span>
                      </div>
                      <p className="mt-3 text-cream/85 leading-relaxed">{e.description}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <aside className="space-y-8" data-testid="events-sidebar">
            <Reveal>
              <div className="border border-warm bg-canvas-deep-surface p-6">
                <div className="font-kannada text-copper text-sm">ದೈನಂದಿನ ಸಮಯ</div>
                <h3 className="font-display text-2xl text-cream mt-1">Daily Timings</h3>
                <ul className="mt-4 space-y-3">
                  {TIMINGS.map((t) => (
                    <li key={t.label} className="flex justify-between text-sm border-b border-warm pb-2 last:border-0 last:pb-0">
                      <span className="text-cream/95">{t.label}</span>
                      <span className="text-cream/75">{t.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="border border-warm bg-canvas-deep-surface p-6">
                <div className="font-kannada text-copper text-sm">ಸಂದೇಶ</div>
                <h3 className="font-display text-2xl text-cream mt-1">A note on RSVPs</h3>
                <p className="mt-3 text-sm text-cream/85 leading-relaxed">
                  Registrations help the trust plan annadana and seating. There is no entrance fee, and walk-ins are welcome.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <OrnamentDivider label="Devotee Registration" kn="ಪ್ರವೇಶ ನೋಂದಣಿ" theme="dark" />

      <section className="bg-canvas-deep pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8" id="rsvp">
          <Reveal>
            <div className="text-eyebrow text-copper">Register for an event</div>
            <h2 className="text-display-h2 text-cream mt-4">Tell us when you are coming.</h2>
            <p className="text-cream/85 mt-4 mb-8 leading-relaxed">
              Tell us when you are coming and how many devotees are with you. We will note the sankalpa and reach out before the day.
            </p>
          </Reveal>
          <Reveal delay={120}><RsvpForm events={EVENTS} /></Reveal>
        </div>
      </section>
    </div>
  );
}
