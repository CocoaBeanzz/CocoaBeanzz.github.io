// Product pages (_layouts/product.html, _sass/_product.scss).
//
//   The voice switch   Which character speaks the page's bubbles. The choice
//                      is the page's data-voice, and is remembered.
//   Counters           The numbers count up the first time they are seen.
//   Reveals            .kp-reveal elements rise into place as they come into view.
//   The hero           The screenshot stands up as the page scrolls (--kp-lift).
//   Tilt               .kp-tilt pictures lean towards the pointer.
//
// Everything here is decoration over a page that reads complete without it.
(function () {
  var page = document.querySelector('.kp');
  if (!page) return;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('kp-js');

  // ── The voice switch ──
  var STORE = 'kp-voice';
  var buttons = page.querySelectorAll('.kp-voices button');
  function speak(voice) {
    page.setAttribute('data-voice', voice);
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-voice') === voice));
    });
    try { localStorage.setItem(STORE, voice); } catch (e) { /* private window: not remembered */ }
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { speak(b.getAttribute('data-voice')); });
  });
  try {
    var saved = localStorage.getItem(STORE);
    if (saved && page.querySelector('.kp-voices [data-voice="' + saved + '"]')) speak(saved);
  } catch (e) { /* storage unavailable */ }

  // ── Counters and reveals ──
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (still || !target) return;
    var start = performance.now(), length = 1400;
    (function frame(now) {
      var t = Math.min(1, (now - start) / length);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en');
      if (t < 1) requestAnimationFrame(frame);
    })(start);
  }

  if ('IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        var counter = entry.target.querySelector('[data-count]');
        if (counter) countUp(counter);
        seen.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    page.querySelectorAll('.kp-reveal').forEach(function (el) { seen.observe(el); });
  } else {
    page.querySelectorAll('.kp-reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  if (still) return;

  // ── The hero stands up as it is scrolled past ──
  var stage = page.querySelector('.kp-hero-stage');
  var queued = false;
  function lift() {
    queued = false;
    if (!stage) return;
    var box = stage.getBoundingClientRect();
    // 0 while the screenshot's top is at the bottom of the window, 1 once it
    // has risen to a third of the way down.
    var t = (window.innerHeight - box.top) / (window.innerHeight * 0.66);
    stage.style.setProperty('--kp-lift', Math.max(0, Math.min(1, t)).toFixed(3));
  }
  window.addEventListener('scroll', function () {
    if (!queued) { queued = true; requestAnimationFrame(lift); }
  }, { passive: true });
  lift();

  // ── Pictures lean towards the pointer ──
  page.querySelectorAll('.kp-tilt').forEach(function (frame) {
    frame.addEventListener('pointermove', function (e) {
      var box = frame.getBoundingClientRect();
      var x = (e.clientX - box.left) / box.width - 0.5;
      var y = (e.clientY - box.top) / box.height - 0.5;
      frame.style.setProperty('--ry', (x * 8).toFixed(2) + 'deg');
      frame.style.setProperty('--rx', (y * -6).toFixed(2) + 'deg');
    });
    frame.addEventListener('pointerleave', function () {
      frame.style.setProperty('--ry', '0deg');
      frame.style.setProperty('--rx', '0deg');
    });
  });
})();
