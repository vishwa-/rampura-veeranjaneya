/* ============================================================
   Rampura Kubera Anjaneyaswamy — site behaviour
   Implements the Viranjanaya Swamy design system (warm reskin).
   - injects shared header + footer (single source of truth)
   - sticky header, mobile menu, scroll reveal
   - gallery lightbox, Formspree forms
   - footer chant-band parallax (जय श्री राम)
   ============================================================ */

const SITE = {
  nameKn: "ಶ್ರೀ ಕುಬೇರ ಆಂಜನೇಯಸ್ವಾಮಿ",
  trust: "Devatha Rampura Anjaneyaswamy Trust",
  email: "info@rampura.in",
  // Veeraanjaneya agrahara, Rampura — https://maps.app.goo.gl/99MbtNqZjRXX6s2n8 (12.4381665, 76.6725361)
  mapUrl: "https://maps.app.goo.gl/99MbtNqZjRXX6s2n8",
  mapDir: "https://www.google.com/maps/dir/?api=1&destination=12.4381665,76.6725361",
  mapEmbed: "https://maps.google.com/maps?q=12.4381665,76.6725361&z=16&output=embed",
  addr1: "Rampura village, Srirangapatna Taluk",
  addr2: "Mandya District, Karnataka — 571427",
  // Replace with your real Formspree form id (https://formspree.io) →
  formEndpoint: "https://formspree.io/f/your-form-id",
};

const NAV = [
  { href: "index.html", label: "Home", kn: "ಮುಖಪುಟ" },
  { href: "rampura.html", label: "Rampura", kn: "ರಾಂಪುರ" },
  { href: "temple.html", label: "The Temple", kn: "ದೇವಸ್ಥಾನ" },
  { href: "hayagreeva.html", label: "Vidya Hayagreeva", kn: "ವಿದ್ಯಾ ಹಯಗ್ರೀವ" },
  { href: "mantra.html", label: "Rama Mantra", kn: "ರಾಮ ಮಂತ್ರ" },
  { href: "gallery.html", label: "Gallery", kn: "ಚಿತ್ರ ಮಾಲಿಕೆ" },
  { href: "events.html", label: "Events", kn: "ಉತ್ಸವಗಳು" },
  { href: "visit.html", label: "Visit", kn: "ಭೇಟಿ" },
];

const TILAK = "assets/brand/tilak-mark.svg";

function currentFile() {
  const p = location.pathname.split("/").pop();
  return !p || p === "" ? "index.html" : p;
}

/* ---------- Header ---------- */
function buildHeader() {
  const here = currentFile();
  const links = NAV.filter((l) => l.href !== "visit.html").map(
    (l) => `<a href="${l.href}" class="nav-link px-3 py-2 rounded${l.href === here ? " active" : ""}" data-i18n-kn="${l.kn}">${l.label}</a>`
  ).join("");

  const mobileLinks = NAV.filter((l) => l.href !== "visit.html").map(
    (l) =>
      `<a href="${l.href}" class="block py-3" style="border-bottom:1px solid var(--border-hairline);font-family:var(--font-display);font-size:1.25rem;color:${l.href === here ? "var(--accent-primary)" : "var(--ink-900)"}" data-i18n-kn="${l.kn}">${l.label}</a>`
  ).join("");

  return `
  <header class="site-header" id="siteHeader">
    <div class="wrap flex items-center justify-between gap-6" style="padding-top:14px;padding-bottom:14px">
      <a href="index.html" class="flex items-center gap-3 shrink-0">
        <img src="${TILAK}" alt="" style="width:30px" />
        <span class="flex flex-col leading-none">
          <span style="font-family:var(--font-display);font-weight:500;font-size:19px;color:var(--ink-900);letter-spacing:.01em">Kubera Anjaneyaswamy</span>
          <span style="font-family:var(--font-ui);font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--accent-primary);margin-top:3px">Rampura Devasthanam</span>
        </span>
      </a>
      <nav class="hidden lg:flex items-center gap-1" aria-label="Primary">
        ${links}
        <a href="${SITE.mapDir}" target="_blank" rel="noopener" class="btn btn-primary" style="margin-left:10px;padding:.55rem 1.1rem;font-size:.8rem" data-i18n-kn="ದಾರಿ">Directions</a>
        <button type="button" class="lang-toggle" data-lang-toggle aria-label="Switch language" style="margin-left:10px">ಕನ್ನಡ</button>
      </nav>
      <button id="menuBtn" class="lg:hidden p-2 -mr-2" style="color:var(--ink-900)" aria-label="Open menu" aria-expanded="false">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
    <div id="mobileMenu" class="mobile-menu lg:hidden" style="background:var(--surface-page)">
      <nav class="wrap" style="padding-top:.5rem;padding-bottom:.5rem" aria-label="Mobile">${mobileLinks}
        <a href="${SITE.mapDir}" target="_blank" rel="noopener" class="flex items-center gap-2 py-3" style="color:var(--accent-primary);font-family:var(--font-ui);font-weight:600" data-i18n-kn="Google ನಕ್ಷೆಯಲ್ಲಿ ದಾರಿ →">Get Directions on Google Maps →</a>
        <button type="button" class="lang-toggle" data-lang-toggle style="margin:.75rem 0">ಕನ್ನಡ</button>
      </nav>
    </div>
  </header>`;
}

/* ---------- Footer ---------- */
function buildFooter() {
  const pageLinks = NAV.map(
    (l) => `<li><a href="${l.href}" style="font-family:var(--font-ui);font-size:14px;color:var(--text-on-dark-dim);text-decoration:none" data-i18n-kn="${l.kn}">${l.label}</a></li>`
  ).join("");

  return `
  <footer style="background:var(--maroon-900);color:var(--text-on-dark-dim)">
    <div id="chantBand" style="position:relative;overflow:hidden;min-height:clamp(420px,72vh,760px);background:radial-gradient(120% 90% at 50% 45%,#2A2622 0%,var(--surface-deep) 55%,var(--maroon-900) 100%)">
      <div style="position:absolute;inset:0;background:var(--glow-saffron);opacity:.7"></div>
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:1">
        <h2 id="chantJai" class="font-deva" style="margin:0;will-change:transform;transform:translate3d(0,-90px,0);font-weight:700;font-size:clamp(7rem,30vw,22rem);line-height:.8;color:var(--accent-primary);text-shadow:0 12px 90px rgba(238,90,42,0.45)">जय</h2>
      </div>
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:2">
        <h2 id="chantRam" class="font-deva" style="margin:0;will-change:transform;transform:translate3d(0,90px,0);font-weight:700;font-size:clamp(3.5rem,16vw,12rem);line-height:.85;color:var(--accent-primary);text-shadow:0 10px 60px rgba(238,90,42,0.5),0 3px 14px rgba(0,0,0,0.5)">श्री राम</h2>
      </div>
      <div id="chantMantra" style="position:absolute;bottom:clamp(24px,6vh,56px);left:0;right:0;text-align:center;z-index:3;will-change:transform;font-family:var(--font-ui);font-weight:500;font-size:1.05rem;color:var(--text-on-dark-dim);letter-spacing:.06em">॥ श्री राम जय राम जय जय राम ॥</div>
    </div>

    <div class="wrap" style="padding-top:4.5rem">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <div class="eyebrow" style="color:var(--brass-300)" data-i18n-kn="ಭೇಟಿ">Find us</div>
          <h2 style="font-family:var(--font-display);font-weight:500;font-size:clamp(1.8rem,3.5vw,2.6rem);color:var(--cream-50);margin:1rem 0 0;line-height:1.12" data-i18n-kn="ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ ನೀಡಿ">Visit the Devasthanam</h2>
          <p style="font-family:var(--font-serif);font-size:15px;line-height:1.7;color:var(--text-on-dark-dim);margin-top:1rem;max-width:40ch" data-i18n-kn="ರಾಂಪುರ ಗ್ರಾಮ, ಶ್ರೀರಂಗಪಟ್ಟಣ ತಾಲ್ಲೂಕು, ಮಂಡ್ಯ ಜಿಲ್ಲೆ — 571427. ಎಲ್ಲಾ ದಿನವೂ ತೆರೆದಿರುತ್ತದೆ, ಬೆಳಿಗ್ಗೆ 5:30 — ರಾತ್ರಿ 8:30. ಉಚಿತ ಪ್ರವೇಶ — ಶ್ರೀರಂಗಪಟ್ಟಣ (8 ಕಿ.ಮೀ) ಮತ್ತು ಮೈಸೂರಿನಿಂದ (22 ಕಿ.ಮೀ) ನೇರ ಆಟೋ-ಟ್ಯಾಕ್ಸಿ.">${SITE.addr1}, ${SITE.addr2}. Open all days, 5:30 AM – 8:30 PM. Free entry — direct auto-taxi from Srirangapatna (8 km) and Mysuru (22 km).</p>
          <div class="flex flex-wrap gap-3" style="margin-top:1.75rem">
            <a href="${SITE.mapDir}" target="_blank" rel="noopener" class="btn btn-light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span data-i18n-kn="ದಾರಿ ಪಡೆಯಿರಿ">Get Directions</span>
            </a>
            <a href="${SITE.mapUrl}" target="_blank" rel="noopener" class="btn btn-ghost-dark" data-i18n-kn="Google ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ">Open in Google Maps</a>
          </div>
        </div>
        <div style="border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--border-on-dark);box-shadow:var(--shadow-lg)">
          <iframe title="Rampura Kubera Anjaneyaswamy temple location" src="${SITE.mapEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="width:100%;height:330px;border:0;display:block"></iframe>
        </div>
      </div>
      <div style="height:1px;background:var(--border-on-dark);margin-top:4rem"></div>
    </div>

    <div class="wrap" style="padding-top:3rem;padding-bottom:2.5rem">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <img src="${TILAK}" alt="" style="width:34px" />
            <span style="font-family:var(--font-display);font-weight:500;font-size:20px;color:var(--cream-50)">Kubera Anjaneyaswamy</span>
          </div>
          <p style="font-family:var(--font-serif);font-size:15px;line-height:1.7;max-width:34ch;color:var(--text-on-dark-dim)" data-i18n-kn="ಕಾವೇರಿ ತೀರದ, ಮೈಸೂರು ಮತ್ತು ಶ್ರೀರಂಗಪಟ್ಟಣದ ಸಮೀಪದ ಪುರಾತನ ಕ್ಷೇತ್ರ — ಶ್ರೀ ವ್ಯಾಸರಾಜರು ಪ್ರತಿಷ್ಠಾಪಿಸಿದ 1,008 ಆಂಜನೇಯರಲ್ಲಿ ಒಂದು ಎಂದು ಹೇಳಲಾಗುತ್ತದೆ.">An ancient kshetra on the banks of the Cauvery, near Mysuru and Srirangapatna — said to be one of the 1,008 Hanumans consecrated by Sri Vyasaraja.</p>
        </div>
        <div>
          <div class="eyebrow" style="color:var(--brass-300);margin-bottom:1rem" data-i18n-kn="ಭೇಟಿ">Visit</div>
          <ul style="list-style:none;display:flex;flex-direction:column;gap:.5rem;font-family:var(--font-ui);font-size:14px;color:var(--text-on-dark-dim)">
            <li>${SITE.addr1}</li>
            <li>${SITE.addr2}</li>
            <li>Open daily 5:30 AM — 8:30 PM</li>
            <li><a href="${SITE.mapUrl}" target="_blank" rel="noopener" style="color:var(--text-on-dark-dim)">Open on Google Maps</a></li>
            <li><a href="mailto:${SITE.email}" style="color:var(--text-on-dark-dim)">${SITE.email}</a></li>
          </ul>
        </div>
        <div>
          <div class="eyebrow" style="color:var(--brass-300);margin-bottom:1rem" data-i18n-kn="ಪುಟಗಳು">Pages</div>
          <ul style="list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:.5rem">${pageLinks}</ul>
        </div>
        <div>
          <div class="eyebrow" style="color:var(--brass-300);margin-bottom:1rem" data-i18n-kn="ದೇವಸ್ಥಾನ">Devasthanam</div>
          <p style="font-family:var(--font-serif);font-size:14px;line-height:1.7;color:var(--text-on-dark-dim)" data-i18n-kn="ದೇವತಾ ರಾಂಪುರ ಆಂಜನೇಯಸ್ವಾಮಿ ಟ್ರಸ್ಟ್. ಎಲ್ಲಾ ದಿನವೂ ತೆರೆದಿರುತ್ತದೆ · ಉಚಿತ ಪ್ರವೇಶ. ಸೇವಾ ಸಂಕಲ್ಪಕ್ಕೆ ದೇವಸ್ಥಾನದ ಕಚೇರಿಯಲ್ಲಿ ಬೆಳಿಗ್ಗೆ 7–11.">${SITE.trust}. Open all days · free entry. Seva sankalpa at the temple office, 7–11 AM.</p>
        </div>
      </div>
      <div style="border-top:1px solid var(--border-on-dark);padding-top:1.25rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.75rem">
        <span style="font-family:var(--font-serif);font-style:italic;font-size:15px;color:var(--brass-300)">॥ Om Sri Anjaneyaya Namaha ॥</span>
        <span style="font-family:var(--font-ui);font-size:12px;color:var(--ink-300)">© ${new Date().getFullYear()} · ${SITE.trust}</span>
      </div>
    </div>
  </footer>`;
}

/* ---------- Behaviours ---------- */
function initHeader() {
  const header = document.getElementById("siteHeader");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 16);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  }
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const d = e.target.getAttribute("data-delay");
          if (d) e.target.style.transitionDelay = d + "ms";
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => obs.observe(el));
}

function initLightbox() {
  const triggers = document.querySelectorAll("[data-lightbox]");
  if (!triggers.length) return;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `
    <button class="absolute top-5 right-5 p-2" style="color:rgba(255,255,255,0.8)" aria-label="Close">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <figure class="flex flex-col items-center max-w-5xl">
      <img alt="" />
      <figcaption class="mt-4 text-sm text-center max-w-2xl" style="color:var(--text-on-dark-dim);font-family:var(--font-serif);font-style:italic"></figcaption>
    </figure>`;
  document.body.appendChild(box);
  const img = box.querySelector("img");
  const cap = box.querySelector("figcaption");
  const close = () => box.classList.remove("open");
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target.closest("button")) close();
  });
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  triggers.forEach((t) =>
    t.addEventListener("click", () => {
      img.src = t.getAttribute("data-src") || t.querySelector("img")?.src;
      cap.textContent = t.getAttribute("data-caption") || "";
      box.classList.add("open");
    })
  );
}

function initForms() {
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = form.querySelector("[data-form-status]");
      const btn = form.querySelector('[type="submit"]');
      const setStatus = (msg, ok) => {
        if (!status) return;
        status.textContent = msg;
        status.style.color = ok ? "var(--text-secondary)" : "var(--danger-500)";
      };
      const missing = [...form.querySelectorAll("[required]")].filter((f) => !f.value.trim());
      if (missing.length) {
        setStatus("Please fill in all required fields.", false);
        missing[0].focus();
        return;
      }
      const label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      setStatus("", true);
      const endpoint = form.getAttribute("action") || SITE.formEndpoint;
      try {
        if (endpoint.includes("your-form-id")) {
          await new Promise((r) => setTimeout(r, 600));
        } else {
          const res = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
          if (!res.ok) throw new Error("Request failed");
        }
        const successHtml = form.getAttribute("data-success");
        if (successHtml) {
          const done = document.createElement("div");
          done.className = "text-center";
          done.style.cssText = "border:1px solid var(--border-hairline);background:var(--surface-raised);border-radius:var(--radius-md);box-shadow:var(--shadow-sm);padding:2.5rem";
          done.innerHTML = successHtml;
          form.replaceWith(done);
        } else {
          setStatus("Sent. Namaskara — we will be in touch.", true);
          form.reset();
        }
      } catch (err) {
        if (btn) { btn.disabled = false; btn.textContent = label; }
        setStatus("Could not send right now. Please try again, or email " + SITE.email + ".", false);
      }
    });
  });
}

function initFooterParallax() {
  const band = document.getElementById("chantBand");
  if (!band) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const jai = document.getElementById("chantJai");
  const ram = document.getElementById("chantRam");
  const man = document.getElementById("chantMantra");
  let raf = null;
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      const rect = band.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const offset = (rect.top + rect.height / 2 - vh / 2) / vh;
      if (jai) jai.style.transform = `translate3d(${offset * -160}px, ${-90 + offset * 120}px, 0) rotate(${offset * -3}deg)`;
      if (ram) ram.style.transform = `translate3d(${offset * 170}px, ${90 + offset * -120}px, 0) rotate(${offset * 3}deg)`;
      if (man) man.style.transform = `translate3d(0, ${offset * 40}px, 0)`;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

/* ---------- Language toggle (English / Kannada) ----------
   Each translatable element keeps its English as its content and carries its
   Kannada in a data-i18n-kn attribute. We cache the original English on first
   run, then swap innerHTML between the two. Preference persists in localStorage. */
function applyLang(lang) {
  var kn = lang === "kn";
  document.documentElement.lang = kn ? "kn" : "en";
  document.documentElement.classList.toggle("lang-kn", kn);
  document.querySelectorAll("[data-i18n-kn]").forEach(function (el) {
    if (el.getAttribute("data-en-cache") === null) el.setAttribute("data-en-cache", el.innerHTML);
    el.innerHTML = kn ? el.getAttribute("data-i18n-kn") : el.getAttribute("data-en-cache");
  });
  document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
    b.textContent = kn ? "English" : "ಕನ್ನಡ";
  });
  try { localStorage.setItem("lang", lang); } catch (e) {}
}
function initLang() {
  var saved = "en";
  try { saved = localStorage.getItem("lang") || "en"; } catch (e) {}
  applyLang(saved);
  document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      applyLang(document.documentElement.classList.contains("lang-kn") ? "en" : "kn");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.outerHTML = buildHeader();
  if (f) f.outerHTML = buildFooter();
  initHeader();
  initLang();
  initReveal();
  initLightbox();
  initForms();
  initFooterParallax();
  // Hero video: honour reduced-motion (pause and show the poster frame)
  var heroVideo = document.querySelector("video[autoplay]");
  if (heroVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
  }
  // Vercel Web Analytics (enable Analytics in the Vercel project dashboard to collect data)
  var va = document.createElement("script");
  va.defer = true;
  va.src = "/_vercel/insights/script.js";
  document.head.appendChild(va);
});
