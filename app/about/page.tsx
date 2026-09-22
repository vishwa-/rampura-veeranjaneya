import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us · Sri Kshetra Rampura",
  description: "Learn about the sacred heritage, lineage of Sri Vyasaraja, and Devatha Rampura Anjaneyaswamy Trust.",
};

export default function AboutPage() {
  return (
    <div className="bg-bg text-ink min-h-screen">
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap pt-16 sm:pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rule-faint"></span>
              <span className="eyebrow">The Kshetra &amp; Trust</span>
            </div>
            <h1 className="display text-4xl sm:text-6xl mt-6">
              About Sri Kshetra Rampura
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed font-serif">
              An ancient sacred sanctuary on the banks of the sacred Cauvery river, preserving the timeless worship of Sri Kubera Anjaneyaswamy and Sri Vidya Hayagreeva.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="wrap py-16 sm:py-20 max-w-4xl">
        <div className="space-y-12">
          <div className="bg-surface p-8 sm:p-10 border border-line" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="eyebrow text-accent">Sacred Heritage</div>
            <h2 className="display text-2xl sm:text-3xl mt-2">One of 1,008 Hanumans Consecrated by Sri Vyasaraja</h2>
            <div className="rule-faint my-4"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              Sri Kshetra Rampura is located in Srirangapatna Taluk, Mandya District, Karnataka. According to traditional sthala purana, the idol of Sri Kubera Anjaneyaswamy was consecrated over five centuries ago by the revered Dvaita saint and Rajaguru of the Vijayanagara Empire, Sri Vyasaraja Theertha, as one of his sacred 1,008 Hanuman pratishthas.
            </p>
            <p className="text-ink/90 leading-relaxed font-serif mt-4">
              Here, Anjaneya stands facing north-east in his rare Kubera-abhimukha posture, showering health, wisdom, and spiritual abundance upon those who seek his divine refuge.
            </p>
          </div>

          <div className="bg-surface p-8 sm:p-10 border border-line" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="eyebrow text-accent">The Trust &amp; Administration</div>
            <h2 className="display text-2xl sm:text-3xl mt-2">Devatha Rampura Anjaneyaswamy Trust</h2>
            <div className="rule-faint my-4"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              The temple is administered and lovingly maintained by the registered <strong>Devatha Rampura Anjaneyaswamy Trust</strong>. The Trust oversees all daily sanctum rituals, archana, nitya annadana, temple renovations, veda-pathashala initiatives, and major festivals including Sri Rama Navami, Hanuman Jayanti, and Maha Kumbhabhishekam.
            </p>
            <div className="mt-6 pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="font-semibold block text-ink">Registered Office:</span>
                <span className="text-muted">Rampura Village, Srirangapatna Taluk, Mandya District, Karnataka – 571427</span>
              </div>
              <div>
                <span className="font-semibold block text-ink">Official Contact:</span>
                <span className="text-muted">Email: info@rampura.in<br />Phone: +91 91648 91591 (Mahadev)</span>
              </div>
            </div>
          </div>

          <div className="bg-surface p-8 sm:p-10 border border-line" style={{ borderRadius: "var(--radius-md)" }}>
            <div className="eyebrow text-accent">Parihara &amp; Vidya Sanctum</div>
            <h2 className="display text-2xl sm:text-3xl mt-2">New Mandapams &amp; Sri Vidya Hayagreeva</h2>
            <div className="rule-faint my-4"></div>
            <p className="text-ink/90 leading-relaxed font-serif">
              The newly consecrated mandapams house 27 carved Nakshatra pillars and 12 Rasi sanctums, enabling devotees to offer dosha-nivarana pariharas tailored to their janma nakshatra and rasi. In addition, the temple hosts the deity of Sri Vidya Hayagreeva, carved in pure Krishna Shila, where children perform Aksharabyasa to invoke divine blessings for speech, learning, and academic excellence.
            </p>
            <div className="mt-6 flex gap-4 flex-wrap">
              <Link href="/temple" className="btn btn-primary">
                Explore the Temple Architecture →
              </Link>
              <Link href="/sevas" className="btn btn-secondary">
                View Sevas &amp; Bookings →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
