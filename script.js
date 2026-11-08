/* =========================================================
   SETTINGS: edit these to customise the invitation
   ========================================================= */
const CONFIG = {
  // WhatsApp number for RSVPs, international format, digits only
  // e.g. "923001234567". Leave "" to hide the RSVP button.
  rsvpWhatsApp: "",

  // Optional hosts line under the names, e.g. "Mr & Mrs Sayyad".
  // Leave "" to hide it.
  hosts: "",
  hostsUrdu: "",

  // Background music file placed next to index.html (e.g. "music.mp3").
  // The music button only appears if this file exists and loads.
  music: "music.mp3",
};

// Walima: Tuesday 29 December 2026, 8:00 PM Pakistan Standard Time (UTC+5)
const EVENT = {
  title: "Walima Reception · Tashkeen & Anusha",
  start: new Date("2026-12-29T20:00:00+05:00"),
  end: new Date("2026-12-29T23:30:00+05:00"),
  location: "Zam Zam Lawn, Thatta, Sindh, Pakistan",
  description: "You are cordially invited to the Walima reception of Tashkeen & Anusha. Dinner to follow.",
};

const $ = (id) => document.getElementById(id);
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};
const params = new URLSearchParams(location.search);

/* ---------- Personal greeting: ?to=Ahmed+Family ---------- */
const guest = (params.get("to") || "").trim().slice(0, 60);
if (guest) {
  const g = $("greeting");
  g.textContent = `Dear ${guest}`;
  g.hidden = false;
  document.title = `${guest} · Walima · Tashkeen & Anusha`;
}

/* ---------- Hosts line ---------- */
const hostsEl = $("hosts");
if (CONFIG.hosts) {
  hostsEl.innerHTML = "";
  hostsEl.append("Hosted by ", Object.assign(document.createElement("span"), { textContent: CONFIG.hosts }));
  if (CONFIG.hostsUrdu) hostsEl.dataset.ur = `میزبان: ${CONFIG.hostsUrdu}`;
  hostsEl.hidden = false;
}

/* ---------- WhatsApp RSVP ---------- */
const rsvp = $("rsvpBtn");
if (CONFIG.rsvpWhatsApp) {
  const msg = [
    "Assalam-o-Alaikum! InshaAllah we will attend the Walima of Tashkeen & Anusha on 29 December 2026 at Zam Zam Lawn, Thatta.",
    `Name: ${guest}`,
    "Number of guests: ",
  ].join("\n");
  rsvp.href = `https://wa.me/${CONFIG.rsvpWhatsApp.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
  rsvp.hidden = false;
}

/* ---------- Music ---------- */
const audio = $("music");
const musicBtn = $("musicBtn");
if (CONFIG.music) {
  audio.addEventListener("canplay", () => { musicBtn.hidden = false; }, { once: true });
  audio.addEventListener("error", () => { musicBtn.hidden = true; }, { once: true });
  audio.src = CONFIG.music;
  audio.volume = 0.5;
}
function syncMusicBtn() {
  const playing = !audio.paused;
  musicBtn.classList.toggle("off", !playing);
  musicBtn.setAttribute("aria-label", playing ? "Pause music" : "Play music");
}
musicBtn.addEventListener("click", () => {
  if (audio.paused) audio.play().catch(() => {}); else audio.pause();
});
audio.addEventListener("play", syncMusicBtn);
audio.addEventListener("pause", syncMusicBtn);

/* ---------- Opening card ---------- */
document.body.classList.add("locked");
$("openBtn").addEventListener("click", () => {
  const opening = $("opening");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  opening.classList.add("open");
  setTimeout(() => opening.classList.add("hidden"), reduced ? 0 : 2100);
  document.body.classList.remove("locked");
  $("controls").hidden = false;
  if (CONFIG.music) { audio.load(); audio.play().catch(() => {}); }
  revealVisible();
  showerPetals();
});

/* ---------- Urdu / English toggle ---------- */
const langBtn = $("langBtn");
const translatable = document.querySelectorAll("[data-ur]");
function setLang(lang) {
  const ur = lang === "ur";
  document.documentElement.classList.toggle("lang-ur", ur);
  document.querySelectorAll("[data-ur]").forEach((el) => {
    if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    el.innerHTML = ur ? el.dataset.ur : el.dataset.en;
    el.classList.toggle("ur", ur);
    if (ur) { el.setAttribute("lang", "ur"); el.setAttribute("dir", "rtl"); }
    else { el.removeAttribute("lang"); el.removeAttribute("dir"); }
  });
  langBtn.innerHTML = ur ? '<span class="ctrl-en">EN</span>' : '<span class="ctrl-ur">اردو</span>';
  langBtn.setAttribute("aria-label", ur ? "Read in English" : "Read in Urdu");
  store.set("walima-lang", lang);
}
langBtn.addEventListener("click", () =>
  setLang(document.documentElement.classList.contains("lang-ur") ? "en" : "ur"));
const startLang = params.get("lang") || store.get("walima-lang");
if (startLang === "ur" && translatable.length) setLang("ur");

/* ---------- Rose, marigold & gold-flake shower ---------- */
function showerPetals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const box = $("petals");
  const colors = ["#d4af37", "#f1d98a", "#b8862b", "#c8233a", "#e3a21e", "#fbe7a1"];
  for (let i = 0; i < 36; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    const dur = 5 + Math.random() * 5;
    p.style.left = `${Math.random() * 100}%`;
    p.style.background = colors[i % colors.length];
    p.style.animationDuration = `${dur}s`;
    p.style.animationDelay = `${Math.random() * 2.5}s`;
    p.style.setProperty("--drift", `${(Math.random() - 0.5) * 160}px`);
    p.style.setProperty("--spin", `${360 + Math.random() * 540}deg`);
    p.style.transform = `scale(${0.6 + Math.random() * 0.7})`;
    box.appendChild(p);
  }
  setTimeout(() => (box.innerHTML = ""), 13000);
}

/* ---------- Reveal on scroll ---------- */
const reveals = document.querySelectorAll(".reveal");
let observer = null;
if ("IntersectionObserver" in window) {
  observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); }
    }),
    { threshold: 0.15 }
  );
}
function revealVisible() {
  reveals.forEach((el, i) => {
    if (observer) { el.style.transitionDelay = `${Math.min(i, 8) * 0.08}s`; observer.observe(el); }
    else el.classList.add("in");
  });
}

/* ---------- Countdown ---------- */
const pad = (n) => String(n).padStart(2, "0");
const els = { d: $("cd-days"), h: $("cd-hours"), m: $("cd-mins"), s: $("cd-secs") };
function tick() {
  const diff = EVENT.start - Date.now();
  if (diff <= 0) {
    $("countdown").hidden = true;
    $("countdownDone").hidden = false;
    clearInterval(timer);
    return;
  }
  const s = Math.floor(diff / 1000);
  els.d.textContent = pad(Math.floor(s / 86400));
  els.h.textContent = pad(Math.floor((s % 86400) / 3600));
  els.m.textContent = pad(Math.floor((s % 3600) / 60));
  els.s.textContent = pad(s % 60);
}
const timer = setInterval(tick, 1000);
tick();

/* ---------- Add to calendar (.ics) ---------- */
const icsDate = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsText = (t) => t.replace(/[\\;,]/g, (c) => `\\${c}`);
$("calendarBtn").addEventListener("click", () => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Walima Invite//EN",
    "BEGIN:VEVENT",
    "UID:walima-20261229@invite",
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(EVENT.start)}`,
    `DTEND:${icsDate(EVENT.end)}`,
    `SUMMARY:${icsText(EVENT.title)}`,
    `LOCATION:${icsText(EVENT.location)}`,
    `DESCRIPTION:${icsText(EVENT.description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Walima tomorrow at 8:00 PM",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "walima.ics" });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
