import type { Metadata } from "next";
import "@/assets/css/styles.css";
import { LanguageProvider } from "@/lib/context/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ActionBar } from "@/components/ActionBar";

export const metadata: Metadata = {
  title: "Sri Kshetra Rampura · Sri Kubera Anjaneyaswamy Temple",
  description:
    "Sri Kshetra Rampura: the ancient Kubera Anjaneyaswamy temple on the banks of the Cauvery near Mysuru and Srirangapatna. One of the 1,008 Hanumans consecrated by Sri Vyasaraja, reborn at the Maha Kumbhabhishekam of July 2026 and home to a new Vidya Hayagreeva shrine.",
  metadataBase: new URL("https://www.srikshetrarampura.in"),
  alternates: {
    canonical: "https://www.srikshetrarampura.in/",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/assets/brand/vaishnava-tilak.png",
  },
  openGraph: {
    type: "website",
    siteName: "Sri Kshetra Rampura · Kubera Anjaneyaswamy Temple",
    title: "Sri Kshetra Rampura · Sri Kubera Anjaneyaswamy Temple",
    description:
      "Sri Kshetra Rampura: the ancient Kubera Anjaneyaswamy temple on the banks of the Cauvery near Mysuru and Srirangapatna. One of the 1,008 Hanumans consecrated by Sri Vyasaraja, reborn at the Maha Kumbhabhishekam of July 2026.",
    url: "https://www.srikshetrarampura.in/",
    images: [
      {
        url: "https://www.srikshetrarampura.in/assets/img/reconstruction/recon-shikhara.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Kshetra Rampura · Sri Kubera Anjaneyaswamy Temple",
    description:
      "An ancient Anjaneya kshetra on the banks of the Cauvery, home to a new Vidya Hayagreeva shrine.",
    images: ["https://www.srikshetrarampura.in/assets/img/reconstruction/recon-shikhara.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500;1,6..72,600&family=Mukta:wght@400;500;600;700&family=Noto+Serif+Kannada:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-ink">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ActionBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
