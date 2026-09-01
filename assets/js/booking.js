/* Booking flow for book.html: pooja cards -> open-date list -> sankalpa form
   -> Razorpay -> done. Availability-first: all open dates for the next ~3
   months load in one call, so the devotee never meets an empty calendar.
   Bilingual: static labels use data-i18n-kn (handled by main.js); everything
   rendered here re-renders on the i18n:changed event. */
(function () {
  "use strict";
  if (!document.getElementById("bkPanelChoose")) return;

  var API = "/api";
  var STR = {
    en: {
      months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      daysLong: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      daysShort: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      nextAvail: "Next available", nextShort: "Next", chooseDate: "Choose a date",
      count: function (n) { return n === 1 ? "1 pooja open" : n + " poojas open"; },
      bookCta: "Book →", selectedCta: "Selected ✓",
      available: "Available", left: function (n) { return n + " left"; },
      exclusive: "One family per day", exclusiveShort: "1 family/day",
      soldOut: "Booked out", cancelled: "Cancelled",
      loading: "Loading poojas…",
      apiDown: "Online booking is temporarily unavailable. Please call the temple office: +91 96206 36465.",
      noDatesCard: "No dates open right now",
      noDates: "No dates are open for this pooja right now. To arrange it, call the temple office:",
      moreSoon: "More dates are added by the temple office from time to time.",
      fillRequired: "Please enter your name and a valid 10-digit WhatsApp number.",
      holding: "Reserving your slot…",
      dismissed: "Payment was not completed. Your slot is held for 30 minutes.",
      retry: "Retry payment",
      sold_out: "Sorry, this date just filled up. Please choose another date.",
      already_booked: "This WhatsApp number already has a booking for this date.",
      too_many: "Too many pending bookings from this number. Please try again later.",
      date_closed: "This date is no longer open for booking.",
      payment_unavailable: "The payment service is unavailable right now. Please try again in a few minutes.",
      server_error: "Something went wrong. Please try again, or call the temple office.",
      confirmedTitle: "Booking confirmed",
      confirmedBody: "Namaskara! Your seva is booked. Please keep this reference:",
      waOk: "A confirmation has been sent to your WhatsApp number.",
      waPending: "Your WhatsApp confirmation is on its way. For help, call Gururaju: +91 96206 36465.",
      verifyFailed: "Your payment was received, but we could not confirm it automatically. Please call the temple office and mention your payment.",
      bookAnother: "Book another pooja",
      amountLabel: "Contribution"
    },
    kn: {
      months: ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಏಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟೆಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್"],
      daysLong: ["ಭಾನುವಾರ","ಸೋಮವಾರ","ಮಂಗಳವಾರ","ಬುಧವಾರ","ಗುರುವಾರ","ಶುಕ್ರವಾರ","ಶನಿವಾರ"],
      daysShort: ["ಭಾನು","ಸೋಮ","ಮಂಗಳ","ಬುಧ","ಗುರು","ಶುಕ್ರ","ಶನಿ"],
      nextAvail: "ಮುಂದಿನ ಲಭ್ಯ ದಿನ", nextShort: "ಮುಂದೆ", chooseDate: "ದಿನಾಂಕ ಆರಿಸಿ",
      count: function (n) { return n === 1 ? "1 ಪೂಜೆ ಲಭ್ಯ" : n + " ಪೂಜೆಗಳು ಲಭ್ಯ"; },
      bookCta: "ಬುಕ್ →", selectedCta: "ಆಯ್ಕೆಯಾಗಿದೆ ✓",
      available: "ಲಭ್ಯವಿದೆ", left: function (n) { return n + " ಉಳಿದಿದೆ"; },
      exclusive: "ದಿನಕ್ಕೆ ಒಂದು ಕುಟುಂಬ", exclusiveShort: "ದಿನಕ್ಕೆ 1 ಕುಟುಂಬ",
      soldOut: "ಬುಕ್ ಆಗಿದೆ", cancelled: "ರದ್ದಾಗಿದೆ",
      loading: "ಪೂಜೆಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ…",
      apiDown: "ಆನ್‌ಲೈನ್ ಬುಕಿಂಗ್ ಸದ್ಯಕ್ಕೆ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ದೇವಸ್ಥಾನದ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ: +91 96206 36465.",
      noDatesCard: "ಸದ್ಯ ದಿನಾಂಕಗಳು ಲಭ್ಯವಿಲ್ಲ",
      noDates: "ಈ ಪೂಜೆಗೆ ಸದ್ಯ ದಿನಾಂಕಗಳು ತೆರೆದಿಲ್ಲ. ಏರ್ಪಡಿಸಲು ದೇವಸ್ಥಾನದ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ:",
      moreSoon: "ದೇವಸ್ಥಾನದ ಕಚೇರಿಯು ಆಗಾಗ ಹೊಸ ದಿನಾಂಕಗಳನ್ನು ಸೇರಿಸುತ್ತದೆ.",
      fillRequired: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಸರಿಯಾದ 10-ಅಂಕಿಯ ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.",
      holding: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗುತ್ತಿದೆ…",
      dismissed: "ಪಾವತಿ ಪೂರ್ಣಗೊಂಡಿಲ್ಲ. ನಿಮ್ಮ ಸ್ಥಳ 30 ನಿಮಿಷ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
      retry: "ಮತ್ತೆ ಪಾವತಿಸಿ",
      sold_out: "ಕ್ಷಮಿಸಿ, ಈ ದಿನಾಂಕ ಈಗಷ್ಟೇ ಭರ್ತಿಯಾಯಿತು. ಬೇರೆ ದಿನಾಂಕ ಆರಿಸಿ.",
      already_booked: "ಈ ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಸಂಖ್ಯೆಗೆ ಈ ದಿನಾಂಕಕ್ಕೆ ಈಗಾಗಲೇ ಬುಕಿಂಗ್ ಇದೆ.",
      too_many: "ಈ ಸಂಖ್ಯೆಯಿಂದ ಹಲವು ಬಾಕಿ ಬುಕಿಂಗ್‌ಗಳಿವೆ. ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.",
      date_closed: "ಈ ದಿನಾಂಕ ಬುಕಿಂಗ್‌ಗೆ ಲಭ್ಯವಿಲ್ಲ.",
      payment_unavailable: "ಪಾವತಿ ಸೇವೆ ಸದ್ಯ ಲಭ್ಯವಿಲ್ಲ. ಕೆಲವು ನಿಮಿಷಗಳ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.",
      server_error: "ಏನೋ ತಪ್ಪಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ ದೇವಸ್ಥಾನದ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ.",
      confirmedTitle: "ಬುಕಿಂಗ್ ದೃಢವಾಯಿತು",
      confirmedBody: "ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಸೇವೆ ಬುಕ್ ಆಗಿದೆ. ಈ ಸಂಖ್ಯೆಯನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ:",
      waOk: "ನಿಮ್ಮ ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಸಂಖ್ಯೆಗೆ ದೃಢೀಕರಣ ಕಳುಹಿಸಲಾಗಿದೆ.",
      waPending: "ನಿಮ್ಮ ವಾಟ್ಸ್‌ಆ್ಯಪ್ ದೃಢೀಕರಣ ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತದೆ. ಸಹಾಯಕ್ಕೆ ಗುರುರಾಜು ಅವರಿಗೆ ಕರೆ ಮಾಡಿ: +91 96206 36465.",
      verifyFailed: "ನಿಮ್ಮ ಪಾವತಿ ತಲುಪಿದೆ, ಆದರೆ ಸ್ವಯಂಚಾಲಿತ ದೃಢೀಕರಣ ಆಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ದೇವಸ್ಥಾನದ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ.",
      bookAnother: "ಇನ್ನೊಂದು ಪೂಜೆ ಬುಕ್ ಮಾಡಿ",
      amountLabel: "ಕಾಣಿಕೆ"
    }
  };
  var RASHIS = [
    ["Mesha","ಮೇಷ"],["Vrishabha","ವೃಷಭ"],["Mithuna","ಮಿಥುನ"],["Karka","ಕರ್ಕ"],
    ["Simha","ಸಿಂಹ"],["Kanya","ಕನ್ಯಾ"],["Tula","ತುಲಾ"],["Vrischika","ವೃಶ್ಚಿಕ"],
    ["Dhanu","ಧನು"],["Makara","ಮಕರ"],["Kumbha","ಕುಂಭ"],["Meena","ಮೀನ"]
  ];

  function kn() { return document.documentElement.classList.contains("lang-kn"); }
  function T() { return kn() ? STR.kn : STR.en; }
  function rupees(paise) { return "₹" + (paise / 100).toLocaleString("en-IN"); }
  function istStr(days) {
    return new Date(Date.now() + 5.5 * 3600e3 + (days || 0) * 86400000).toISOString().slice(0, 10);
  }
  function parts(dateStr) {
    var p = dateStr.split("-").map(Number);
    return { y: p[0], m: p[1], d: p[2], dow: new Date(Date.UTC(p[0], p[1] - 1, p[2])).getUTCDay() };
  }
  function fmtDate(dateStr) {
    var p = parts(dateStr), t = T();
    return t.daysLong[p.dow] + ", " + p.d + " " + t.months[p.m - 1] + " " + p.y;
  }
  function fmtShort(dateStr) {
    var p = parts(dateStr), t = T();
    var month = kn() ? t.months[p.m - 1] : t.months[p.m - 1].slice(0, 3);
    return t.daysShort[p.dow] + ", " + p.d + " " + month;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  var state = {
    poojas: [],           // ordered array
    poojaById: {},
    dates: [],            // ordered by event_date, next ~3 months
    selPooja: null,       // pooja id
    selection: null,      // { dateRow, pooja }
    order: null,          // /api/book response
    loaded: false,
    loadError: false
  };

  var $ = function (id) { return document.getElementById(id); };
  var poojasBox = $("bkPoojas"), datesBox = $("bkDates"),
      panelChoose = $("bkPanelChoose"), panelForm = $("bkPanelForm"), panelDone = $("bkPanelDone"),
      form = $("bkForm"), formStatus = $("bkFormStatus"), summary = $("bkSummary"),
      payBtn = $("bkPay");

  /* ---------- data ---------- */

  function loadAll(done) {
    fetch(API + "/calendar?from=" + istStr() + "&to=" + istStr(92))
      .then(function (res) { if (!res.ok) throw 0; return res.json(); })
      .then(function (data) {
        state.loadError = false;
        state.loaded = true;
        state.poojas = data.poojas;
        state.poojaById = {};
        data.poojas.forEach(function (p) { state.poojaById[p.id] = p; });
        state.dates = data.dates.slice().sort(function (a, b) {
          return a.event_date < b.event_date ? -1 : 1;
        });
        done();
      })
      .catch(function () { state.loadError = true; state.loaded = true; done(); });
  }

  function bookable(d) {
    return d.status === "open" && (d.remaining == null || d.remaining > 0);
  }
  function datesFor(poojaId) {
    return state.dates.filter(function (d) { return d.pooja_id === poojaId; });
  }
  function nextAvailable(poojaId) {
    return datesFor(poojaId).find(bookable) || null;
  }

  /* ---------- step 1: pooja cards + date list ---------- */

  function renderPoojas() {
    var t = T();
    var countEl = $("bkCount");
    poojasBox.textContent = "";
    if (countEl) countEl.textContent = "";
    if (!state.loaded) {
      poojasBox.appendChild(el("p", "text-sm text-muted", t.loading));
      return;
    }
    if (state.loadError) {
      poojasBox.appendChild(el("p", "bk-err", t.apiDown));
      return;
    }
    if (countEl) countEl.textContent = t.count(state.poojas.length);

    state.poojas.forEach(function (p) {
      var selected = state.selPooja === p.id;
      var compact = state.selPooja && !selected;

      function pick() {
        state.selPooja = p.id;
        renderPoojas();
        renderDates();
        datesBox.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      var card = el("article", "bk-pcard" + (selected ? " sel" : "") + (compact ? " compact" : ""));
      card.setAttribute("role", "button");
      card.tabIndex = 0;
      card.addEventListener("click", pick);
      card.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); pick(); }
      });

      if (compact) {
        // Unselected poojas collapse to a slim switch row.
        card.appendChild(el("h3", "display text-lg", kn() ? p.name_kn : p.name_en));
        card.appendChild(el("span", "numeral text-lg text-accent shrink-0", rupees(p.amount_paise)));
        poojasBox.appendChild(card);
        return;
      }

      var row1 = el("div", "bk-prow1");
      row1.appendChild(el("h3", "display text-xl sm:text-2xl", kn() ? p.name_kn : p.name_en));
      row1.appendChild(el("div", "numeral text-2xl text-accent shrink-0", rupees(p.amount_paise)));
      card.appendChild(row1);

      // Selected cards drop the description to lift the date list, except
      // when it is the only pooja (nothing collapses, so keep the context).
      var desc = kn() ? p.desc_kn : p.desc_en;
      if (desc && (!selected || state.poojas.length === 1)) {
        card.appendChild(el("p", "bk-pdesc text-sm text-muted mt-1 leading-relaxed", desc));
      }

      var next = nextAvailable(p.id);
      var row3 = el("div", "bk-prow3");
      var info = el("span", "bk-pnext");
      if (next) {
        info.appendChild(el("b", null, t.nextShort));
        info.appendChild(el("span", null, fmtShort(next.event_date)));
        if (p.capacity === 1) info.appendChild(el("span", "bk-badge ok", t.exclusiveShort));
      } else {
        info.appendChild(el("span", "bk-badge full", t.noDatesCard));
      }
      row3.appendChild(info);
      if (next || selected) {
        var cta = el("button", "bk-pbook", selected ? t.selectedCta : t.bookCta);
        cta.type = "button";
        row3.appendChild(cta); // click bubbles to the card's pick()
      }
      card.appendChild(row3);
      poojasBox.appendChild(card);
    });
  }

  function renderDates() {
    var t = T();
    datesBox.textContent = "";
    if (!state.selPooja || state.loadError) return;
    var pooja = state.poojaById[state.selPooja];
    if (!pooja) return;

    datesBox.appendChild(el("div", "eyebrow mb-4", t.chooseDate));
    var rows = datesFor(state.selPooja);

    if (!rows.length) {
      var none = el("div", "bk-summary");
      none.style.borderRadius = "var(--radius-md)";
      none.appendChild(el("p", "text-sm text-ink/90 leading-relaxed", t.noDates));
      var call = el("a", "btn btn-primary mt-4", "Gururaju · +91 96206 36465");
      call.href = "tel:+919620636465";
      none.appendChild(call);
      datesBox.appendChild(none);
      return;
    }

    var list = el("div", "space-y-3");
    rows.forEach(function (d) {
      var ok = bookable(d);
      var row = el("button", "bk-drow");
      row.type = "button";
      if (!ok) row.disabled = true;
      var left = el("span", "bk-drow-date");
      var p = parts(d.event_date);
      var num = el("span", "numeral bk-drow-num", String(p.d));
      left.appendChild(num);
      var when = el("span");
      when.appendChild(el("span", "block", t.daysLong[p.dow]));
      when.appendChild(el("span", "block text-sm text-muted", t.months[p.m - 1] + " " + p.y));
      left.appendChild(when);
      row.appendChild(left);

      var right = el("span", "flex items-center gap-3");
      var badge;
      if (d.status === "cancelled") badge = el("span", "bk-badge cancel", t.cancelled);
      else if (!ok) badge = el("span", "bk-badge full", t.soldOut);
      else if (pooja.capacity === 1) badge = el("span", "bk-badge ok", t.exclusive);
      else if (d.remaining != null) badge = el("span", "bk-badge ok", t.left(d.remaining));
      else badge = el("span", "bk-badge ok", t.available);
      right.appendChild(badge);
      if (ok) right.appendChild(el("span", "text-accent", "→"));
      row.appendChild(right);

      if (ok) row.addEventListener("click", function () { startBooking(d, pooja); });
      list.appendChild(row);
    });
    datesBox.appendChild(list);
    datesBox.appendChild(el("p", "text-sm text-muted mt-4", t.moreSoon));
  }

  /* ---------- step 2: form ---------- */

  function startBooking(dateRow, pooja) {
    state.selection = { dateRow: dateRow, pooja: pooja };
    state.order = null;
    renderSummary();
    panelForm.classList.remove("bk-hidden");
    panelDone.classList.add("bk-hidden");
    setFormStatus("");
    panelForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderSummary() {
    if (!state.selection) return;
    var t = T(), s = state.selection;
    summary.textContent = "";
    summary.appendChild(el("div", "display text-2xl", kn() ? s.pooja.name_kn : s.pooja.name_en));
    summary.appendChild(el("div", "mt-2 text-sm text-muted", fmtDate(s.dateRow.event_date)));
    var amt = el("div", "mt-2");
    amt.appendChild(el("span", "eyebrow", t.amountLabel));
    amt.appendChild(el("span", "numeral text-3xl text-accent block mt-1", rupees(s.pooja.amount_paise)));
    summary.appendChild(amt);
  }

  function populateStaticInputs() {
    var dl = $("bkNakshatras");
    dl.textContent = "";
    var list = typeof NAKSHATRAS !== "undefined" ? NAKSHATRAS : [];
    list.forEach(function (n) {
      var o = document.createElement("option");
      o.value = n[kn() ? 1 : 0];
      dl.appendChild(o);
    });
    var sel = $("bkRashi");
    var current = sel.value;
    sel.textContent = "";
    sel.appendChild(el("option", null, "—"));
    RASHIS.forEach(function (r) {
      var o = el("option", null, r[kn() ? 1 : 0]);
      o.value = r[0];
      sel.appendChild(o);
    });
    if (current) sel.value = current;
  }

  function setFormStatus(msg, isError, extra) {
    formStatus.textContent = "";
    if (!msg) return;
    formStatus.appendChild(el("span", isError ? "bk-err" : "text-muted", msg));
    if (extra) formStatus.appendChild(extra);
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var t = T();
    var f = form.elements;
    var name = f.name.value.trim();
    var digits = f.phone.value.replace(/[^\d]/g, "");
    if (digits.length === 12 && digits.indexOf("91") === 0) digits = digits.slice(2);
    if (digits.length === 11 && digits.indexOf("0") === 0) digits = digits.slice(1);
    if (!name || !/^[6-9]\d{9}$/.test(digits)) {
      setFormStatus(t.fillRequired, true);
      return;
    }
    payBtn.disabled = true;
    setFormStatus(t.holding);
    fetch(API + "/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pooja_date_id: state.selection.dateRow.id,
        name: name,
        phone: "+91" + digits,
        email: f.email.value.trim(),
        gotra: f.gotra.value.trim(),
        nakshatra: f.nakshatra.value.trim(),
        rashi: f.rashi.value,
        family_names: f.family_names.value.trim(),
        note: f.note.value.trim(),
        lang: kn() ? "kn" : "en",
        website: f.website.value
      })
    })
      .then(function (res) { return res.json().then(function (b) { return { ok: res.ok, body: b }; }); })
      .then(function (r) {
        payBtn.disabled = false;
        if (!r.ok) {
          var code = r.body && r.body.error;
          setFormStatus(t[code] || t.server_error, true);
          if (code === "sold_out" || code === "date_closed") refresh();
          return;
        }
        state.order = r.body;
        setFormStatus("");
        openCheckout();
      })
      .catch(function () {
        payBtn.disabled = false;
        setFormStatus(t.server_error, true);
      });
  });

  $("bkBack").addEventListener("click", function () {
    panelForm.classList.add("bk-hidden");
    panelChoose.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------- Razorpay ---------- */

  var rzpScript = null;
  function loadRazorpay() {
    if (window.Razorpay) return Promise.resolve();
    if (!rzpScript) {
      rzpScript = new Promise(function (resolve, reject) {
        var s = document.createElement("script");
        s.src = "https://checkout.razorpay.com/v1/checkout.js";
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    return rzpScript;
  }

  function openCheckout() {
    var t = T(), o = state.order;
    try { sessionStorage.setItem("rmp_order", o.order_id); } catch (e) {}
    loadRazorpay()
      .then(function () {
        var rzp = new Razorpay({
          key: o.key_id,
          order_id: o.order_id,
          amount: o.amount_paise,
          currency: "INR",
          name: "Sri Kshetra Rampura",
          description: (kn() ? o.pooja_name_kn : o.pooja_name_en) + " · " + o.event_date,
          prefill: o.prefill,
          theme: { color: "#EE5A2A" },
          handler: onPaid,
          modal: {
            ondismiss: function () {
              var retryBtn = el("button", "btn btn-secondary", t.retry);
              retryBtn.type = "button";
              retryBtn.style.marginLeft = "12px";
              retryBtn.onclick = openCheckout;
              setFormStatus(t.dismissed, true, retryBtn);
            }
          }
        });
        rzp.open();
      })
      .catch(function () { setFormStatus(t.payment_unavailable, true); });
  }

  function onPaid(resp) {
    fetch(API + "/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resp)
    })
      .then(function (res) { return res.json().then(function (b) { return { ok: res.ok, body: b }; }); })
      .then(function (r) {
        if (r.ok && r.body.status === "paid") {
          showDone(r.body.booking_ref, r.body.wa_sent);
        } else {
          showDone(state.order.booking_ref, false, true);
        }
      })
      .catch(function () { showDone(state.order.booking_ref, false, true); });
  }

  function showDone(ref, waSent, verifyFailed) {
    var t = T();
    try { sessionStorage.removeItem("rmp_order"); } catch (e) {}
    panelForm.classList.add("bk-hidden");
    panelDone.classList.remove("bk-hidden");
    panelDone.textContent = "";
    var card = el("div", "border border-line bg-surface p-8 sm:p-10 text-center");
    card.style.borderRadius = "var(--radius-md)";
    card.appendChild(el("div", "eyebrow", verifyFailed ? "" : t.confirmedTitle));
    if (verifyFailed) {
      card.appendChild(el("p", "bk-err mt-3 leading-relaxed", t.verifyFailed));
      if (ref) card.appendChild(el("div", "bk-ref mt-4", ref));
    } else {
      card.appendChild(el("p", "mt-3 text-ink/90 leading-relaxed", t.confirmedBody));
      card.appendChild(el("div", "bk-ref mt-4", ref));
      if (state.selection) {
        card.appendChild(el("p", "mt-3 text-muted text-sm",
          (kn() ? state.selection.pooja.name_kn : state.selection.pooja.name_en) +
          " · " + fmtDate(state.selection.dateRow.event_date)));
      }
      card.appendChild(el("p", "mt-5 text-sm " + (waSent ? "text-ink/90" : "text-muted"),
        waSent ? t.waOk : t.waPending));
    }
    var again = el("button", "btn btn-secondary mt-7", t.bookAnother);
    again.type = "button";
    again.onclick = function () {
      panelDone.classList.add("bk-hidden");
      state.selection = null;
      state.order = null;
      form.reset();
      refresh();
      panelChoose.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    card.appendChild(again);
    panelDone.appendChild(card);
    panelDone.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- boot ---------- */

  function refresh() {
    loadAll(function () {
      if (!state.selPooja || !state.poojaById[state.selPooja]) {
        // Auto-select when there is exactly one pooja to choose from.
        state.selPooja = state.poojas.length === 1 ? state.poojas[0].id : null;
      }
      renderPoojas();
      renderDates();
    });
  }

  document.addEventListener("i18n:changed", function () {
    if (!state.loaded) return; // fires during initLang, before boot()
    renderPoojas();
    renderDates();
    renderSummary();
    populateStaticInputs();
  });

  function boot() {
    var params = new URLSearchParams(location.search);
    populateStaticInputs();
    renderPoojas(); // shows the loading line
    loadAll(function () {
      var slugFilter = params.get("pooja");
      if (slugFilter) {
        state.poojas.forEach(function (p) {
          if (p.slug === slugFilter) state.selPooja = p.id;
        });
      }
      if (!state.selPooja && state.poojas.length === 1) state.selPooja = state.poojas[0].id;
      renderPoojas();
      renderDates();
      var wantDay = params.get("date");
      if (wantDay && state.selPooja) {
        var row = datesFor(state.selPooja).find(function (d) {
          return d.event_date === wantDay && bookable(d);
        });
        if (row) startBooking(row, state.poojaById[state.selPooja]);
      }
      // Re-anchor deep links: the browser jumped to the hash before this
      // content rendered above it and pushed the target further down.
      if (location.hash && location.hash !== "#book" && !wantDay) {
        var target = document.querySelector(location.hash);
        if (target) {
          setTimeout(function () { target.scrollIntoView({ block: "start" }); }, 80);
        }
      }
    });

    // Dropped-client recovery: a paid order left in sessionStorage.
    var pending = null;
    try { pending = sessionStorage.getItem("rmp_order"); } catch (e) {}
    if (pending) {
      fetch(API + "/booking-status?order_id=" + encodeURIComponent(pending))
        .then(function (res) { if (!res.ok) throw 0; return res.json(); })
        .then(function (b) {
          if (b.status === "paid") {
            state.selection = null;
            showDone(b.booking_ref, true);
          } else if (b.status !== "pending") {
            try { sessionStorage.removeItem("rmp_order"); } catch (e) {}
          }
        })
        .catch(function () {});
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
