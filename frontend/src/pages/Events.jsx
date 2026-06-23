import React, { useState } from "react";
import axios from "axios";
import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { BilingualHeading, SectionDivider } from "@/components/BilingualHeading";
import { Reveal } from "@/components/Reveal";
import { EVENTS, TIMINGS } from "@/lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function RsvpForm({ events }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    attendees: 1,
    event_id: events[0]?.id ?? "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (k) => (e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
  };

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
      setForm({
        name: "",
        email: "",
        phone: "",
        attendees: 1,
        event_id: events[0]?.id ?? "",
        message: "",
      });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string"
          ? detail
          : "Could not send your registration. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        data-testid="rsvp-success"
        className="border border-border bg-jasmine/60 rounded-sm p-8 text-center"
      >
        <CheckCircle2 className="w-10 h-10 text-vermillion mx-auto" />
        <h3 className="font-serif-display text-2xl text-temple-ink mt-3">
          Namaskara — your sankalpa is noted.
        </h3>
        <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto">
          A volunteer from the temple office will reach out before the day with
          arrival instructions. Until then, may all be well.
        </p>
        <button
          type="button"
          data-testid="rsvp-reset-btn"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center gap-2 text-vermillion text-sm uppercase tracking-wider"
        >
          Register another devotee
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      data-testid="rsvp-form"
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
            data-testid="rsvp-name-input"
            className="w-full bg-background border border-input rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-vermillion focus:ring-1 focus:ring-vermillion/40"
            placeholder="Your full name"
          />
        </label>
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Phone
          </span>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={onChange("phone")}
            data-testid="rsvp-phone-input"
            className="w-full bg-background border border-input rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-vermillion focus:ring-1 focus:ring-vermillion/40"
            placeholder="+91 9XXXXXXXXX"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Email <span className="text-muted-foreground/70 normal-case tracking-normal">(optional)</span>
          </span>
          <input
            type="email"
            value={form.email}
            onChange={onChange("email")}
            data-testid="rsvp-email-input"
            className="w-full bg-background border border-input rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-vermillion focus:ring-1 focus:ring-vermillion/40"
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Number of devotees
          </span>
          <input
            type="number"
            min={1}
            max={50}
            value={form.attendees}
            onChange={onChange("attendees")}
            data-testid="rsvp-attendees-input"
            className="w-full bg-background border border-input rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-vermillion focus:ring-1 focus:ring-vermillion/40"
          />
        </label>
      </div>
      <label className="block">
        <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Event
        </span>
        <select
          value={form.event_id}
          onChange={onChange("event_id")}
          data-testid="rsvp-event-select"
          className="w-full bg-background border border-input rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-vermillion focus:ring-1 focus:ring-vermillion/40"
        >
          {events.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title} — {e.dateLabel}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          A note (optional)
        </span>
        <textarea
          rows={3}
          value={form.message}
          onChange={onChange("message")}
          data-testid="rsvp-message-input"
          className="w-full bg-background border border-input rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-vermillion focus:ring-1 focus:ring-vermillion/40"
          placeholder="Sankalpa, seva preference, accessibility needs, etc."
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        data-testid="rsvp-submit-btn"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink text-jasmine px-7 py-3 text-sm font-medium tracking-wide hover:bg-vermillion transition-colors disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Register devotee(s)"}
      </button>
    </form>
  );
}

export default function Events() {
  return (
    <div data-testid="page-events">
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-10">
        <Reveal>
          <BilingualHeading
            kannada="ಉತ್ಸವಗಳು & ಪ್ರಕಟಣೆಗಳು"
            english="Events & Live Updates"
            size="xl"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-3xl">
            The temple year unfolds in small ceremonies and a few large ones.
            Below are the upcoming utsavas at Rampura, beginning with the
            praana pratishtha of the new Vidya Hayagreeva shrine.
          </p>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 pb-16">
        <div className="lg:col-span-2 space-y-2" data-testid="events-list">
          {EVENTS.map((e, i) => (
            <Reveal key={e.id} delay={i * 80}>
              <article
                data-testid={`event-card-${e.id}`}
                className={`grid grid-cols-12 gap-5 py-7 border-b border-border ${
                  e.featured ? "bg-marigold/10 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-sm" : ""
                }`}
              >
                <div className="col-span-3 sm:col-span-2 flex flex-col items-start">
                  <div className="text-xs uppercase tracking-[0.25em] text-vermillion">
                    {formatDate(e.date).split(" ")[1]}
                  </div>
                  <div className="font-serif-display text-4xl text-temple-ink leading-none mt-1">
                    {formatDate(e.date).split(" ")[0]}
                  </div>
                </div>
                <div className="col-span-9 sm:col-span-10">
                  <div className="font-kannada text-vermillion/80 text-sm">
                    {e.titleKn}
                  </div>
                  <h3 className="font-serif-display text-2xl sm:text-3xl text-temple-ink mt-1">
                    {e.title}
                    {e.featured ? (
                      <span className="ml-3 align-middle inline-block text-[10px] uppercase tracking-[0.25em] bg-vermillion text-jasmine px-2 py-1 rounded-sm">
                        Featured
                      </span>
                    ) : null}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-vermillion" />
                      {e.dateLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-vermillion" />
                      {e.time}
                    </span>
                  </div>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {e.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <aside className="space-y-8" data-testid="events-sidebar">
          <Reveal>
            <div className="border border-border bg-sandstone/40 rounded-sm p-6">
              <div className="font-kannada text-vermillion text-sm">
                ದೈನಂದಿನ ಸಮಯ
              </div>
              <h3 className="font-serif-display text-2xl text-temple-ink mt-1">
                Daily Timings
              </h3>
              <ul className="mt-4 space-y-3">
                {TIMINGS.map((t) => (
                  <li
                    key={t.label}
                    className="flex justify-between text-sm border-b border-border/60 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-temple-ink">{t.label}</span>
                    <span className="text-muted-foreground">{t.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-border bg-ink text-jasmine rounded-sm p-6">
              <div className="font-kannada text-marigold text-sm">
                ಸಂದೇಶ
              </div>
              <h3 className="font-serif-display text-2xl mt-1">
                A note on RSVPs
              </h3>
              <p className="mt-3 text-sm text-jasmine/80 leading-relaxed">
                We send registrations to help the temple plan annadana and
                seating. There is no entrance fee, and walk-ins are welcome —
                but a quick note helps us prepare.
              </p>
            </div>
          </Reveal>
        </aside>
      </section>

      <SectionDivider label="ಪ್ರವೇಶ ನೋಂದಣಿ" />

      <section className="max-w-3xl mx-auto px-5 sm:px-8 pb-24" id="rsvp">
        <Reveal>
          <BilingualHeading
            kannada="ಭಕ್ತರ ನೋಂದಣಿ"
            english="Register for an event"
            size="md"
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="text-muted-foreground mt-4 mb-8 leading-relaxed">
            Tell us when you are coming and how many devotees are with you. We
            will note the sankalpa and reach out before the day.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <RsvpForm events={EVENTS} />
        </Reveal>
      </section>
    </div>
  );
}
