import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Rampura from "@/pages/Rampura";
import Temple from "@/pages/Temple";
import Hayagreeva from "@/pages/Hayagreeva";
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
    <div
      data-testid="page-not-found"
      className="max-w-2xl mx-auto px-5 py-32 text-center"
    >
      <div className="font-kannada text-vermillion text-sm">ಸಿಗಲಿಲ್ಲ</div>
      <h1 className="font-serif-display text-5xl text-temple-ink mt-2">
        This page wasn&apos;t found.
      </h1>
      <p className="mt-4 text-muted-foreground">
        Use the menu above to find your way back.
      </p>
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
            background: "hsl(22 28% 12%)",
            color: "hsl(48 100% 96%)",
            border: "1px solid hsl(38 95% 52% / 0.3)",
            fontFamily: "'Work Sans', sans-serif",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
