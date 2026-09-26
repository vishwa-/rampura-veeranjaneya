import { Metadata } from "next";
import { DonationSection } from "@/components/DonationSection";

export const metadata: Metadata = {
  title: "Donation - corpus fund · Sri Kshetra Rampura",
  description: "Contribute to the Donation - corpus fund for Sri Kshetra Rampura. Secure online payment via UPI, Card, or NetBanking.",
  openGraph: {
    title: "Donation - corpus fund · Sri Kshetra Rampura",
    description: "Contribute to the Donation - corpus fund for Sri Kshetra Rampura.",
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
