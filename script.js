// Walima: Tuesday 29 December 2026, 8:00 PM Pakistan Standard Time (UTC+5)
const EVENT = {
  title: "Walima Reception",
  start: new Date("2026-12-29T20:00:00+05:00"),
  end: new Date("2026-12-29T23:30:00+05:00"),
  location: "Zam Zam Diamond Hall, Thatta, Sindh, Pakistan",
  description: "You are cordially invited to the Walima reception. Dinner to follow.",
};

/* ---------- Opening overlay ---------- */
const opening = document.getElementById("opening");
document.body.classList.add("locked");
document.getElementById("openBtn").addEventListener("click", () => {
  opening.classList.add("hidden");
  document.body.classList.remove("locked");
  revealVisible();
});

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
const els = {
  d: document.getElementById("cd-days"),
  h: document.getElementById("cd-hours"),
  m: document.getElementById("cd-mins"),
  s: document.getElementById("cd-secs"),
};
function tick() {
  const diff = EVENT.start - Date.now();
  if (diff <= 0) {
    document.getElementById("countdown").hidden = true;
    document.getElementById("countdownDone").hidden = false;
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
document.getElementById("calendarBtn").addEventListener("click", () => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Walima Invite//EN",
    "BEGIN:VEVENT",
    `UID:walima-20261229@invite`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(EVENT.start)}`,
    `DTEND:${icsDate(EVENT.end)}`,
    `SUMMARY:${EVENT.title}`,
    `LOCATION:${EVENT.location.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${EVENT.description.replace(/,/g, "\\,")}`,
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
