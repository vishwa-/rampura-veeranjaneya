import React, { useState } from "react";
import axios from "axios";
import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Masthead, OrnamentDivider } from "@/components/Ornaments";
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
      <div data-testid="rsvp-success" className="border border-crimson bg-paper-aged p-10 text-center">
        <CheckCircle2 className="w-10 h-10 text-crimson mx-auto" />
        <h3 className="font-display text-3xl text-ink mt-4">Namaskara — your sankalpa is noted.</h3>
        <div className="rule-crimson mt-5 w-16 mx-auto" />
        <p className="text-ink/85 mt-5 max-w-md mx-auto font-body">
          A volunteer from the temple will reach out before the day with arrival instructions.
        </p>
        <button type="button" data-testid="rsvp-reset-btn" onClick={() => setSubmitted(false)} className="mt-6 text-crimson text-label">
          Register another devotee
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} data-testid="rsvp-form" className="border border-ink-muted/30 bg-paper p-8 sm:p-10 space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="block">
          <span className="text-label text-crimson block mb-2">Name</span>
          <input type="text" required value={form.name} onChange={onChange("name")} data-testid="rsvp-name-input" className="input-paper" placeholder="Your full name" />
        </label>
        <label className="block">
          <span className="text-label text-crimson block mb-2">Phone</span>
          <input type="tel" required value={form.phone} onChange={onChange("phone")} data-testid="rsvp-phone-input" className="input-paper" placeholder="+91 9XXXXXXXXX" />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="block">
          <span className="text-label text-crimson block mb-2">Email <span className="text-ink-muted/70 lowercase tracking-normal">(optional)</span></span>
          <input type="email" value={form.email} onChange={onChange("email")} data-testid="rsvp-email-input" className="input-paper" placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="text-label text-crimson block mb-2">No. of devotees</span>
          <input type="number" min={1} max={50} value={form.attendees} onChange={onChange("attendees")} data-testid="rsvp-attendees-input" className="input-paper" />
        </label>
      </div>
      <label className="block">
        <span className="text-label text-crimson block mb-2">Event</span>
        <select value={form.event_id} onChange={onChange("event_id")} data-testid="rsvp-event-select" className="input-paper">
          {events.map((e) => (<option key={e.id} value={e.id}>{e.title} — {e.dateLabel}</option>))}
        </select>
      </label>
      <label className="block">
        <span className="text-label text-crimson block mb-2">A note <span className="text-ink-muted/70 lowercase tracking-normal">(optional)</span></span>
        <textarea rows={3} value={form.message} onChange={onChange("message")} data-testid="rsvp-message-input" className="input-paper" placeholder="Sankalpa, seva preference, accessibility needs…" />
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
      <section className="relative bg-paper border-b border-ink-muted/20">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 pt-10 sm:pt-16 pb-16">
          <Masthead date="The Temple Calendar" edition="Events & Notices" label="Chapter VI" />
          <Reveal delay={120}>
            <div className="text-center mt-12 max-w-4xl mx-auto">
              <div className="font-kannada text-crimson text-base mt-4">ಉತ್ಸವಗಳು</div>
              <h1 className="text-masthead text-ink mt-4">
                The temple year, <em className="italic text-crimson">unfolding.</em>
              </h1>
              <p className="mt-6 font-display italic text-ink-muted text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                “Small ceremonies and a few large ones — beginning with the praana pratishtha of the new Vidya Hayagreeva shrine.”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2" data-testid="events-list">
            {EVENTS.map((e, i) => {
              const { day, mon } = formatDay(e.date);
              return (
                <Reveal key={e.id} delay={i * 80}>
                  <article data-testid={`event-card-${e.id}`} className={`grid grid-cols-12 gap-5 py-8 border-b border-ink-muted/30 ${e.featured ? "bg-crimson/5 -mx-4 px-4 sm:-mx-6 sm:px-6" : ""}`}>
                    <div className="col-span-3 sm:col-span-2">
                      <div className="text-label-sm text-crimson">{mon}</div>
                      <div className="font-display text-5xl text-ink leading-none mt-1">{day}</div>
                    </div>
                    <div className="col-span-9 sm:col-span-10">
                      <div className="font-kannada text-crimson text-sm">{e.titleKn}</div>
                      <h3 className="font-display text-3xl text-ink mt-1">
                        {e.title}
                        {e.featured ? <span className="ml-3 align-middle inline-block text-[10px] tracking-[0.25em] uppercase bg-crimson text-paper px-2 py-1 font-label">Featured</span> : null}
                      </h3>
                      <div className="rule-thin mt-3 mb-3 w-12" />
                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted">
                        <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-crimson" />{e.dateLabel}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-crimson" />{e.time}</span>
                      </div>
                      <p className="mt-3 text-ink/90 leading-relaxed font-body">{e.description}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <aside className="space-y-8" data-testid="events-sidebar">
            <Reveal>
              <div className="border border-ink-muted/30 bg-paper-aged p-7">
                <div className="font-kannada text-crimson text-sm">ದೈನಂದಿನ ಸಮಯ</div>
                <h3 className="font-display text-2xl text-ink mt-1">Daily Timings</h3>
                <div className="rule-thin mt-4 mb-4 w-10" />
                <ul className="space-y-3">
                  {TIMINGS.map((t) => (
                    <li key={t.label} className="flex justify-between text-sm border-b border-ink-muted/15 pb-2 last:border-0 last:pb-0 font-body">
                      <span className="text-ink">{t.label}</span>
                      <span className="text-ink-muted">{t.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="border border-ink-muted/30 bg-paper-aged p-7">
                <div className="font-kannada text-crimson text-sm">ಸಂದೇಶ</div>
                <h3 className="font-display text-2xl text-ink mt-1">A note on RSVPs</h3>
                <div className="rule-thin mt-4 mb-4 w-10" />
                <p className="text-sm text-ink/85 leading-relaxed font-body">
                  Registrations help the trust plan annadana and seating. There is no entrance fee, and walk-ins are welcome.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <OrnamentDivider label="Devotee Registration" kn="ಪ್ರವೇಶ ನೋಂದಣಿ" theme="light" />

      <section className="bg-paper-aged border-y border-ink-muted/20 py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8" id="rsvp">
          <Reveal>
            <div className="text-label text-crimson">Register for an event</div>
            <h2 className="text-display-h1 text-ink mt-5">Tell us when you are coming.</h2>
            <div className="rule-crimson mt-7 w-16" />
            <p className="text-ink/85 mt-5 mb-8 leading-relaxed font-body">
              Tell us when you are coming and how many devotees are with you. We will note the sankalpa and reach out before the day.
            </p>
          </Reveal>
          <Reveal delay={120}><RsvpForm events={EVENTS} /></Reveal>
        </div>
      </section>
    </div>
  );
}
