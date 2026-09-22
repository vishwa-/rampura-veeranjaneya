import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · Sri Kshetra Rampura",
  description: "Privacy policy for devotees utilizing online seva booking and inquiries at Sri Kshetra Rampura.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-bg text-ink min-h-screen">
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">Trust &amp; Data Protection</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed font-serif">
              Devatha Rampura Anjaneyaswamy Trust is dedicated to safeguarding the personal and spiritual details shared by devotees.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="wrap py-16 sm:py-20 max-w-4xl">
        <div className="space-y-8 bg-surface p-8 sm:p-12 border border-line" style={{ borderRadius: "var(--radius-md)" }}>
          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">1. Information We Collect</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              When booking a pooja or submitting a spiritual inquiry, we collect information required to perform sacred sankalpas according to Vedic traditions. This includes:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-ink/90 font-serif text-sm">
              <li><strong>Personal Details:</strong> Devotee name, contact phone number (WhatsApp enabled), and email address.</li>
              <li><strong>Sankalpa Details:</strong> Gotra, Janma Nakshatra, Rashi, and names of family members to be chanted during the seva.</li>
              <li><strong>Transaction Data:</strong> Date of ritual, seva category, booking reference tokens, and transaction identifiers. We do not store credit card, debit card, or netbanking credentials.</li>
            </ul>
          </div>

          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">2. How Your Information Is Used</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              Your details are used solely for:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-ink/90 font-serif text-sm">
              <li>Performing the personalized archana and gotra sankalpa by the temple priests.</li>
              <li>Sending booking reference confirmations and ritual reminders via WhatsApp/SMS.</li>
              <li>Dispatching consecrated tirtha and prasadam if requested under postal seva arrangements.</li>
              <li>Responding to pilgrim inquiries and darshan coordination.</li>
            </ul>
            <p className="text-ink/90 leading-relaxed font-serif mt-3">
              We <strong>never sell, rent, trade, or commercialize</strong> devotee data to any third parties or marketing organizations.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">3. Data Security &amp; Storage</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              All electronic communications and database records are protected by industry-standard encryption (TLS/HTTPS). Access to the temple administrative portal is strictly restricted to authorized trust coordinators via secure cryptographic authentication.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">4. Third-Party Services</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              When electronic donations and dakshina are processed online, payments are securely routed through RBI-licensed payment gateways (such as Razorpay). Their handling of financial data is governed by PCI-DSS compliance standards.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl sm:text-3xl text-ink">5. Contact Information</h2>
            <div className="rule-faint my-3"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              For any questions regarding this Privacy Policy or to request correction/deletion of your details, please contact:
            </p>
            <p className="mt-2 text-sm text-ink/90 font-serif">
              <strong>Devatha Rampura Anjaneyaswamy Trust</strong><br />
              Email: <a href="mailto:info@rampura.in" className="text-accent underline">info@rampura.in</a><br />
              Address: Rampura Village, Srirangapatna Taluk, Mandya District, Karnataka – 571427
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
