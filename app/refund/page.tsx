import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy · Sri Kshetra Rampura",
  description: "Official cancellation, rescheduling, and refund policy for pooja bookings and religious sevas at Sri Kshetra Rampura.",
};

export default function RefundPage() {
  return (
    <div className="bg-bg text-ink min-h-screen">
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">Trust Guidelines</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">
              Refund &amp; Cancellation Policy
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed font-serif">
              Standard policy regarding cancellations, seva rescheduling, and dakshina contributions at Devatha Rampura Anjaneyaswamy Trust.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="wrap py-16 sm:py-20 max-w-4xl">
        <div className="space-y-8 bg-surface p-8 sm:p-12 border border-line" style={{ borderRadius: "var(--radius-md)" }}>
          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">1. Nature of Religious Contributions</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              Seva bookings, pooja contributions, and dakshina offerings made to the <strong>Devatha Rampura Anjaneyaswamy Trust</strong> are voluntary religious contributions utilized for sacred samagri (flowers, tulasi, ghee, fruits), temple upkeep, and ritual ceremonies. Consequently, seva fees are generally non-refundable once the preparations for the ritual have commenced.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">2. Rescheduling of Seva Dates</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              We understand that family exigencies and travel schedule changes can arise:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-ink/90 font-serif text-sm">
              <li>Devotees may request to <strong>reschedule</strong> their booked pooja to any available future date by intimating the temple office at least <strong>48 hours prior</strong> to the scheduled date.</li>
              <li>Requests can be submitted via email to <a href="mailto:info@rampura.in" className="text-accent underline">info@rampura.in</a> or by contacting the temple coordinator Mahadev (+91 91648 91591) mentioning the Booking Reference.</li>
            </ul>
          </div>

          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">3. Duplicate or Erroneous Transactions</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              In the event that an electronic transaction results in a duplicate payment or accidental excess debit due to network lag:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-ink/90 font-serif text-sm">
              <li>Please notify the temple office within <strong>7 days</strong> with transaction screenshots and booking reference.</li>
              <li>Upon reconciliation with the payment gateway partner, verified duplicate amounts will be refunded to the original payment source within <strong>5 to 7 business days</strong>.</li>
            </ul>
          </div>

          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">4. Temple Cancellation Due to Unforeseen Events</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              If an in-person seva cannot be conducted on a specific date due to severe weather, eclipses, or temple closures, the temple trust will either perform the seva in absentia with sankalpa for the devotee or offer a full rescheduling or refund as preferred by the devotee.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">5. Support &amp; Grievances</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              For any payment or cancellation assistance, feel free to contact:
            </p>
            <p className="mt-2 text-sm text-ink/90 font-serif">
              <strong>Devatha Rampura Anjaneyaswamy Trust</strong><br />
              Attn: Seva Accounts &amp; Coordination<br />
              Email: <a href="mailto:info@rampura.in" className="text-accent underline">info@rampura.in</a><br />
              Phone: +91 91648 91591 (Mahadev) / +91 96206 36465 (Gururaju)<br />
              Rampura Village, Srirangapatna Taluk, Mandya – 571427
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
