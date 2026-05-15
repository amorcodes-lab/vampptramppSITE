/* vampptrampp — scripts */

/* =====================================================================
   CONFIG — edit these when you have real content
   ===================================================================== */

/* EDIT: set to a real future date/time (ISO format) for the countdown.
   Example: "2026-08-15T20:00:00" */
const NEXT_SHOW_DATE = null;

/* EDIT: set to real fan/follower count */
const FAN_COUNT = 0;

/* EDIT: dates with shows this month (day numbers, 1-31) */
const SHOW_DAYS = [];

/* EDIT: NOW SPINNING track name shown in player bar */
const NOW_SPINNING_TRACK = "[ no track loaded ]";


/* =====================================================================
   TAB SWITCHER
   ===================================================================== */
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      const target = tab.dataset.tab;

      tabs.forEach(function(t) { t.classList.remove('active'); });
      panels.forEach(function(p) { p.classList.remove('active'); });

      tab.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });
}


/* =====================================================================
   VISITOR COUNTER
   ===================================================================== */
function initHitCounter() {
  let count = parseInt(localStorage.getItem('vt_hit_count'), 10);
  count = isNaN(count) ? 1 : count + 1;
  localStorage.setItem('vt_hit_count', count);

  const padded = String(count).padStart(6, '0');
  const box = document.getElementById('hitCounter');
  const inline = document.getElementById('hitInline');
  if (box) box.textContent = padded;
  if (inline) inline.textContent = count;
}


/* =====================================================================
   FAN COUNT
   ===================================================================== */
function initFanCount() {
  const el = document.querySelector('.fan-count-num');
  if (el && FAN_COUNT > 0) {
    el.textContent = FAN_COUNT.toLocaleString();
  }
}


/* =====================================================================
   COUNTDOWN TIMER
   ===================================================================== */
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el || !NEXT_SHOW_DATE) return;

  function tick() {
    const now = Date.now();
    const target = new Date(NEXT_SHOW_DATE).getTime();
    const diff = target - now;

    if (diff <= 0) {
      el.textContent = 'NOW';
      return;
    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.textContent = h + 'h ' + String(m).padStart(2,'0') + 'm ' + String(s).padStart(2,'0') + 's';
  }

  tick();
  setInterval(tick, 1000);
}


/* =====================================================================
   MINI CALENDAR
   ===================================================================== */
function initCalendar() {
  const wrap = document.getElementById('calendar');
  if (!wrap) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const monthNames = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];
  const dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let html = '<div class="cal-header">';
  html += '<span>' + monthNames[month] + ' ' + year + '</span>';
  html += '</div>';
  html += '<div class="cal-grid">';

  dayNames.forEach(function(d) {
    html += '<div class="cal-day-name">' + d + '</div>';
  });

  for (let i = 0; i < firstDay; i++) {
    html += '<div class="cal-day empty"></div>';
  }

  for (let d = 1; d <= daysInMonth; d++) {
    let cls = 'cal-day';
    if (d === today) cls += ' today';
    if (SHOW_DAYS.indexOf(d) !== -1) cls += ' has-event';
    html += '<div class="' + cls + '">' + d + '</div>';
  }

  html += '</div>';
  wrap.innerHTML = html;
}


/* =====================================================================
   PLAYER BAR
   ===================================================================== */
function initPlayer() {
  const track = document.getElementById('playerTrack');
  const disc = document.getElementById('playerDisc');
  const btnPlay = document.getElementById('btnPlay');

  if (track) {
    const link = document.getElementById('playerLink');
    if (link) link.textContent = NOW_SPINNING_TRACK;
  }

  if (btnPlay) {
    btnPlay.addEventListener('click', function() {
      disc.classList.toggle('spinning');
      btnPlay.textContent = disc.classList.contains('spinning') ? '⏸' : '▶';
    });
  }
}


/* =====================================================================
   SMOOTH SCROLL for nav links that point to tab sections
   ===================================================================== */
function initNavLinks() {
  const tabMap = {
    '#music':  'music',
    '#photos': 'photos',
    '#tour':   'tour',
    '#bio':    'bio',
    '#merch':  'merch',
  };

  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    const href = link.getAttribute('href');
    if (tabMap[href]) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const tabId = tabMap[href];
        const tab = document.querySelector('.tab[data-tab="' + tabId + '"]');
        if (tab) tab.click();
        const tabs = document.getElementById('contentTabs');
        if (tabs) tabs.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });
}


/* =====================================================================
   BOOT
   ===================================================================== */
document.addEventListener('DOMContentLoaded', function() {
  initTabs();
  initHitCounter();
  initFanCount();
  initCountdown();
  initCalendar();
  initPlayer();
  initNavLinks();
});
