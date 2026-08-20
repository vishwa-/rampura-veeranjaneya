/* Booking flow for book.html: calendar -> sankalpa form -> Razorpay -> done.
   Bilingual: static labels use data-i18n-kn (handled by main.js); everything
   rendered here re-renders on the i18n:changed event. */
(function () {
  "use strict";
  if (!document.getElementById("bkPanelCal")) return;

  var API = "/api";
  var STR = {
    en: {
      months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      days: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      daysLong: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      all: "All poojas", available: "Available", left: function (n) { return n + " left"; },
      exclusive: "One family per day", soldOut: "Booked out", cancelled: "Cancelled",
      book: "Book →", pickDay: "Select a highlighted day to see the poojas offered.",
      noPoojas: "No poojas are offered on this day.", loading: "Loading the calendar…",
      apiDown: "Online booking is temporarily unavailable. Please call the temple office: +91 96206 36465.",
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
      forDate: "on", amountLabel: "Contribution"
    },
    kn: {
      months: ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಏಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟೆಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್"],
      days: ["ಭಾನು","ಸೋಮ","ಮಂಗಳ","ಬುಧ","ಗುರು","ಶುಕ್ರ","ಶನಿ"],
      daysLong: ["ಭಾನುವಾರ","ಸೋಮವಾರ","ಮಂಗಳವಾರ","ಬುಧವಾರ","ಗುರುವಾರ","ಶುಕ್ರವಾರ","ಶನಿವಾರ"],
      all: "ಎಲ್ಲಾ ಪೂಜೆಗಳು", available: "ಲಭ್ಯವಿದೆ", left: function (n) { return n + " ಉಳಿದಿದೆ"; },
      exclusive: "ದಿನಕ್ಕೆ ಒಂದು ಕುಟುಂಬ", soldOut: "ಬುಕ್ ಆಗಿದೆ", cancelled: "ರದ್ದಾಗಿದೆ",
      book: "ಬುಕ್ ಮಾಡಿ →", pickDay: "ಪೂಜೆಗಳನ್ನು ನೋಡಲು ಗುರುತಿಸಿದ ದಿನವನ್ನು ಆರಿಸಿ.",
      noPoojas: "ಈ ದಿನ ಪೂಜೆಗಳು ಇಲ್ಲ.", loading: "ಕ್ಯಾಲೆಂಡರ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ…",
      apiDown: "ಆನ್‌ಲೈನ್ ಬುಕಿಂಗ್ ಸದ್ಯಕ್ಕೆ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ದೇವಸ್ಥಾನದ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ: +91 96206 36465.",
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
      forDate: "ದಿನಾಂಕ", amountLabel: "ಕಾಣಿಕೆ"
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
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function todayStr() {
    return new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
  }
  function fmtDate(dateStr) {
    var p = dateStr.split("-").map(Number);
    var dow = new Date(Date.UTC(p[0], p[1] - 1, p[2])).getUTCDay();
    var t = T();
    return t.daysLong[dow] + ", " + p[2] + " " + t.months[p[1] - 1] + " " + p[0];
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  var state = {
    month: null,          // "YYYY-MM"
    filter: null,         // pooja id or null
    poojas: {},           // id -> pooja
    datesByDay: {},       // "YYYY-MM-DD" -> [date rows]
    selDay: null,
    selection: null,      // { dateRow, pooja }
    order: null,          // /api/book response
    loadError: false
  };

  var $ = function (id) { return document.getElementById(id); };
  var grid = $("bkGrid"), dow = $("bkDow"), monthLabel = $("bkMonthLabel"),
      chips = $("bkChips"), dayList = $("bkDayList"),
      panelCal = $("bkPanelCal"), panelForm = $("bkPanelForm"), panelDone = $("bkPanelDone"),
      form = $("bkForm"), formStatus = $("bkFormStatus"), summary = $("bkSummary"),
      payBtn = $("bkPay");

  /* ---------- data ---------- */

  function monthRange(ym) {
    var y = +ym.slice(0, 4), m = +ym.slice(5, 7);
    var last = new Date(Date.UTC(y, m, 0)).getUTCDate();
    var first = ym + "-01";
    var today = todayStr();
    return { from: first < today ? today : first, to: ym + "-" + pad(last) };
  }

  function loadMonth(ym, done) {
    var r = monthRange(ym);
    if (r.from > r.to) { state.datesByDay = {}; done(); return; }
    fetch(API + "/calendar?from=" + r.from + "&to=" + r.to)
      .then(function (res) { if (!res.ok) throw 0; return res.json(); })
      .then(function (data) {
        state.loadError = false;
        state.poojas = {};
        data.poojas.forEach(function (p) { state.poojas[p.id] = p; });
        state.datesByDay = {};
        data.dates.forEach(function (d) {
          (state.datesByDay[d.event_date] = state.datesByDay[d.event_date] || []).push(d);
        });
        done();
      })
      .catch(function () { state.loadError = true; done(); });
  }

  /* ---------- calendar rendering ---------- */

  function bookable(d) {
    return d.status === "open" && (d.remaining == null || d.remaining > 0) &&
      (!state.filter || d.pooja_id === state.filter);
  }
  function visible(d) { return !state.filter || d.pooja_id === state.filter; }

  function renderChips() {
    chips.textContent = "";
    var all = el("button", "bk-chip" + (state.filter ? "" : " active"), T().all);
    all.type = "button";
    all.onclick = function () { state.filter = null; renderChips(); renderGrid(); renderDayList(); };
    chips.appendChild(all);
    Object.keys(state.poojas).forEach(function (id) {
      var p = state.poojas[id];
      var c = el("button", "bk-chip" + (state.filter === id ? " active" : ""), kn() ? p.name_kn : p.name_en);
      c.type = "button";
      c.onclick = function () { state.filter = id; renderChips(); renderGrid(); renderDayList(); };
      chips.appendChild(c);
    });
  }

  function renderGrid() {
    var t = T();
    dow.textContent = "";
    t.days.forEach(function (d) { dow.appendChild(el("span", null, d)); });

    var y = +state.month.slice(0, 4), m = +state.month.slice(5, 7);
    monthLabel.textContent = t.months[m - 1] + " " + y;
    $("bkPrev").disabled = state.month <= todayStr().slice(0, 7);

    grid.textContent = "";
    var firstDow = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
    var daysIn = new Date(Date.UTC(y, m, 0)).getUTCDate();
    var today = todayStr();
    for (var i = 0; i < firstDow; i++) grid.appendChild(el("div", "bk-day other"));
    for (var d = 1; d <= daysIn; d++) {
      var ds = state.month + "-" + pad(d);
      var rows = (state.datesByDay[ds] || []).filter(visible);
      var cell = el("button", "bk-day", String(d));
      cell.type = "button";
      if (ds < today) cell.classList.add("other");
      if (rows.length) {
        cell.classList.add("has");
        if (!rows.some(bookable)) cell.classList.add("full");
        cell.appendChild(el("span", "dot"));
        (function (dsCopy) {
          cell.onclick = function () { state.selDay = dsCopy; renderGrid(); renderDayList(); };
        })(ds);
      }
      if (state.selDay === ds) cell.classList.add("sel");
      grid.appendChild(cell);
    }
  }

  function renderDayList() {
    var t = T();
    dayList.textContent = "";
    if (state.loadError) {
      dayList.appendChild(el("p", "bk-err", t.apiDown));
      return;
    }
    if (!state.selDay) {
      dayList.appendChild(el("p", "text-sm text-muted", t.pickDay));
      return;
    }
    dayList.appendChild(el("div", "eyebrow", fmtDate(state.selDay)));
    var rows = (state.datesByDay[state.selDay] || []).filter(visible);
    if (!rows.length) {
      dayList.appendChild(el("p", "text-sm text-muted mt-2", t.noPoojas));
      return;
    }
    rows.forEach(function (d) {
      var p = state.poojas[d.pooja_id];
      var card = el("article", "border border-line bg-surface p-6 flex items-start justify-between gap-4 flex-wrap");
      card.style.borderRadius = "var(--radius-md)";
      var left = el("div");
      left.appendChild(el("h3", "display text-xl", kn() ? p.name_kn : p.name_en));
      var desc = kn() ? p.desc_kn : p.desc_en;
      if (desc) left.appendChild(el("p", "text-sm text-muted mt-1 leading-relaxed", desc));
      var meta = el("div", "mt-3 flex items-center gap-3 flex-wrap");
      meta.appendChild(el("span", "numeral text-2xl text-accent", rupees(p.amount_paise)));
      var badge;
      if (d.status === "cancelled") badge = el("span", "bk-badge cancel", t.cancelled);
      else if (d.remaining != null && d.remaining <= 0) badge = el("span", "bk-badge full", t.soldOut);
      else if (p.capacity === 1) badge = el("span", "bk-badge ok", t.exclusive);
      else if (d.remaining != null) badge = el("span", "bk-badge ok", t.left(d.remaining));
      else badge = el("span", "bk-badge ok", t.available);
      meta.appendChild(badge);
      left.appendChild(meta);
      card.appendChild(left);
      if (bookable(d)) {
        var btn = el("button", "btn btn-primary", t.book);
        btn.type = "button";
        btn.onclick = function () { startBooking(d, p); };
        card.appendChild(btn);
      }
      dayList.appendChild(card);
    });
  }

  /* ---------- form ---------- */

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
    var line = el("div", "mt-2 text-sm text-muted");
    line.textContent = fmtDate(s.dateRow.event_date);
    summary.appendChild(line);
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
    panelCal.scrollIntoView({ behavior: "smooth", block: "start" });
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
    var t = T();
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
      panelCal.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    card.appendChild(again);
    panelDone.appendChild(card);
    panelDone.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- boot ---------- */

  function refresh() {
    loadMonth(state.month, function () {
      renderChips();
      renderGrid();
      renderDayList();
    });
  }

  function shiftMonth(delta) {
    var y = +state.month.slice(0, 4), m = +state.month.slice(5, 7) + delta;
    if (m < 1) { m = 12; y--; }
    if (m > 12) { m = 1; y++; }
    state.month = y + "-" + pad(m);
    state.selDay = null;
    dayList.textContent = "";
    dayList.appendChild(el("p", "text-sm text-muted", T().loading));
    refresh();
  }

  $("bkPrev").addEventListener("click", function () { shiftMonth(-1); });
  $("bkNext").addEventListener("click", function () { shiftMonth(1); });

  document.addEventListener("i18n:changed", function () {
    if (!state.month) return; // fires during initLang, before boot()
    renderChips();
    renderGrid();
    renderDayList();
    renderSummary();
    populateStaticInputs();
  });

  function boot() {
    var params = new URLSearchParams(location.search);
    state.month = (params.get("date") || todayStr()).slice(0, 7);
    populateStaticInputs();
    dayList.appendChild(el("p", "text-sm text-muted", T().loading));
    loadMonth(state.month, function () {
      var slugFilter = params.get("pooja");
      if (slugFilter) {
        Object.keys(state.poojas).forEach(function (id) {
          if (state.poojas[id].slug === slugFilter) state.filter = id;
        });
      }
      var wantDay = params.get("date");
      if (wantDay && state.datesByDay[wantDay]) state.selDay = wantDay;
      renderChips();
      renderGrid();
      renderDayList();
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
