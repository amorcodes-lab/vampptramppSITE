/* vampptrampp — front-end scripts. No build step, no backend. */

/* EDIT: track name shown in the Status widget and bottom bar */
const NOW_PLAYING = "[ untitled — dark electronic ]";

/* EDIT: visitor counter starting number */
const COUNTER_START = 1;

/* EDIT: digit padding for the counter (000001 = 6 digits) */
const COUNTER_DIGITS = 6;


/* =====================================================================
   1. PERSISTENT VISITOR COUNTER
   ===================================================================== */
function initHitCounter() {
  let count = parseInt(localStorage.getItem("vt_hit_count"), 10);
  if (isNaN(count)) {
    count = COUNTER_START;
  } else {
    count = count + 1;
  }
  localStorage.setItem("vt_hit_count", count);

  const padded = String(count).padStart(COUNTER_DIGITS, "0");
  const box = document.getElementById("hitCounter");
  const inline = document.getElementById("hitInline");
  if (box) box.textContent = padded;
  if (inline) inline.textContent = count;
}


/* =====================================================================
   2. STATUS BAR + "NOW PLAYING" WIDGET
   ===================================================================== */
function initStatus() {
  const statusText = document.getElementById("statusText");
  const npText = document.getElementById("npText");
  if (statusText) statusText.textContent = "Now playing: " + NOW_PLAYING;
  if (npText) npText.textContent = NOW_PLAYING;
}


/* =====================================================================
   3. FAKE INTERACTIONS
   ===================================================================== */
function fakeAction(kind) {
  const messages = {
    gallery:  "Gallery under construction — photos coming soon.",
    tickets:  "Ticket links not active yet — check back before the show.",
    link:     "This link isn't connected yet — placeholder only."
  };
  alert(messages[kind] || "This feature isn't active yet.");
}


/* =====================================================================
   4. MAILING LIST FORM
   ===================================================================== */
function submitMailingList() {
  const name = (document.getElementById("mlName") || {}).value || "";
  const email = (document.getElementById("mlEmail") || {}).value || "";

  if (!name.trim() || !email.trim()) {
    alert("Enter a name and an email first.");
    return;
  }
  alert("Mailing list isn't active yet — nothing was sent.");

  ["mlName", "mlEmail", "mlMsg"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}


/* =====================================================================
   5. GUESTBOOK
   ===================================================================== */
function signGuestbook() {
  alert("Guestbook is under construction.");
}


/* =====================================================================
   6. TITLE BAR FLICKER
   ===================================================================== */
function initTitleFlicker() {
  const titles = ["vampptrampp // dark electronic", "&#9760; ...enter... &#9760;"];
  let i = 0;
  setInterval(function () {
    i = (i + 1) % titles.length;
    const tmp = document.createElement("textarea");
    tmp.innerHTML = titles[i];
    document.title = tmp.value;
  }, 2500);
}


/* =====================================================================
   BOOT
   ===================================================================== */
document.addEventListener("DOMContentLoaded", function () {
  initHitCounter();
  initStatus();
  initTitleFlicker();
});
