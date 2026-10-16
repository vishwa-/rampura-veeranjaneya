import { Metadata } from "next";
import { VidyaSevaSection } from "@/components/VidyaSevaSection";

export const metadata: Metadata = {
  title: "Vidhya Seva · Sri Vidya Hayagreeva · Sri Kshetra Rampura",
  description:
    "Sponsor notebooks, stationery, and student combos for school children at Sri Vidya Hayagreeva shrine, Sri Kshetra Rampura.",
  alternates: {
    canonical: "https://www.srikshetrarampura.in/vidya-seva",
  },
};

export default function VidyaSevaPage() {
  return (
    <main className="min-h-screen bg-[#181412]">
      <VidyaSevaSection />
    </main>
  );
}
