import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Rampura from "@/pages/Rampura";
import Temple from "@/pages/Temple";
import Hayagreeva from "@/pages/Hayagreeva";
import Mantra from "@/pages/Mantra";
import Gallery from "@/pages/Gallery";
import Events from "@/pages/Events";
import Visit from "@/pages/Visit";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div data-testid="page-not-found" className="max-w-2xl mx-auto px-5 py-32 text-center bg-paper">
      <div className="font-kannada text-crimson text-sm">ಸಿಗಲಿಲ್ಲ</div>
      <h1 className="text-display-h1 text-ink mt-2">This page wasn&apos;t found.</h1>
      <p className="mt-4 text-ink-muted font-body">Use the menu above to find your way back.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rampura" element={<Rampura />} />
          <Route path="/temple" element={<Temple />} />
          <Route path="/hayagreeva" element={<Hayagreeva />} />
          <Route path="/mantra" element={<Mantra />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "hsl(18 27% 8%)",
            color: "hsl(41 50% 88%)",
            border: "1px solid hsl(0 56% 39% / 0.5)",
            fontFamily: "'Manrope', sans-serif",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
