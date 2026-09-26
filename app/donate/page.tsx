import { Metadata } from "next";
import { DonationSection } from "@/components/DonationSection";

export const metadata: Metadata = {
  title: "E-Hundi & Seva Kanike · Sri Kshetra Rampura",
  description: "Offer your voluntary seva kanike to Lord Kubera Anjaneya Swamy at Sri Kshetra Rampura. Secure online payment via UPI, Card, or NetBanking.",
  openGraph: {
    title: "E-Hundi & Seva Kanike · Sri Kshetra Rampura",
    description: "Offer your voluntary seva kanike to Lord Kubera Anjaneya Swamy at Sri Kshetra Rampura.",
    images: ["/assets/brand/vaishnava-tilak.png"],
  },
};

export default function DonatePage() {
  return (
    <main className="min-h-screen pt-12 sm:pt-20 bg-[#1A1714]">
      <DonationSection embedded={false} />
    </main>
  );
}
