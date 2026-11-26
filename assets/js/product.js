// Product pages (_layouts/product.html, _sass/_product.scss).
//
//   Voices     Which character speaks the page's bubbles and notes. Picked
//              from the cast or the floating switch; the choice is the
//              page's data-voice, and is remembered.
//   The stage  The fixed layer behind the page plays the loop of the section
//              crossing the middle of the window (data-bg) and dims to that
//              section's data-dim.
//   Scroll     data-scroll elements get --p from 0 to 1 by their place in the
//              window: "enter" runs from entering at the bottom to a fifth of
//              the way down, "through" from entering to leaving at the top,
//              "leave" from where it starts to having scrolled off the top.
//   Turns      The four take turns in each [data-cycle] (the hero's welcome,
//              the closing line).
//   Skins      Pointing at a skin's name brings its picture to the front.
//   Clips      Videos of the app filmed coming up: a tab's charts playing in,
//              its numbers counting up. [data-clip="load"] plays once as the
//              page opens (the hero). [data-scrub="A B"] is played by the
//              scroll: its time follows the --p of the [data-scroll] round it
//              (or its own run through the window), start to end as that goes
//              from A% to B%. Each ends on the frame its poster shows, so with
//              reduced motion, save-data or no script the still is all there is.
//   Words      Headings are split into words for the stylesheet's scroll-driven
//              entrances (each word's --w is its place).
//   Counters   The numbers count up the first time they are seen.
//   Reveals    .kp-reveal elements rise into place as they come into view.
//
// Everything here is decoration over a page that reads complete without it.
(function () {
  var page = document.querySelector('.kp');
  if (!page) return;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // On a metered connection the stage shows its posters and never loads a clip.
  var light = still || !!(navigator.connection && navigator.connection.saveData);
  document.documentElement.classList.add('kp-js');

  // ── Voices ──
  var STORE = 'kp-voice';
  var pickers = page.querySelectorAll('.kp-voices button, .kp-member');
  function speak(voice) {
    page.setAttribute('data-voice', voice);
    pickers.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-voice') === voice));
    });
    try { localStorage.setItem(STORE, voice); } catch (e) { /* private window: not remembered */ }
  }
  pickers.forEach(function (b) {
    b.addEventListener('click', function () { speak(b.getAttribute('data-voice')); });
  });
  try {
    var saved = localStorage.getItem(STORE);
    if (saved && page.querySelector('.kp-voices [data-voice="' + saved + '"]')) speak(saved);
  } catch (e) { /* storage unavailable */ }

  // ── The stage ──
  var stage = page.querySelector('.kp-stage');
  var clips = stage ? stage.querySelectorAll('.kp-stage-clip') : [];
  var dim = stage && stage.querySelector('.kp-stage-dim');
  var base = stage ? stage.getAttribute('data-src') : '';
  var sections = page.querySelectorAll('[data-dim]');
  // How many cuts each set has ({"codec": 3, ...}); a set's cuts play in turn.
  var cuts = {};
  try { cuts = JSON.parse(stage.getAttribute('data-cuts')) || {}; } catch (e) { /* one cut each */ }
  var turn = {};                // the cut each set starts on next time it is shown
  var onStage = { name: null, cut: 0, shape: null };
  var front = 0;

  // Wide windows get the 16:9 version of a cut, phones the 9:16 one.
  function shape() { return window.innerWidth / window.innerHeight > 0.9 ? 'w' : 't'; }
  function count(name) { return Math.max(1, cuts[name] || 1); }

  // Fade the other clip in with `cut` of set `name`.
  function show(name, cut) {
    var form = shape();
    if (name === onStage.name && cut === onStage.cut && form === onStage.shape) return;
    onStage = { name: name, cut: cut, shape: form };
    var next = clips[1 - front];
    var prev = clips[front];
    var file = base + 'bg_' + name + '_' + cut + '_' + form;
    next.poster = file + '.jpg';
    next.loop = count(name) < 2;
    if (light) {
      next.removeAttribute('src');
    } else {
      next.src = file + '.mp4';
      var playing = next.play();
      if (playing && playing.catch) playing.catch(function () { /* autoplay refused: the poster stays */ });
    }
    next.classList.add('is-on');
    prev.classList.remove('is-on');
    front = 1 - front;
    // The old clip stops once it has faded out (unless it was asked back meanwhile).
    setTimeout(function () { if (!prev.classList.contains('is-on')) prev.pause(); }, 1000);
  }

  // A section takes the stage: its set, from the cut after the one last seen.
  function play(name) {
    if (!clips.length || (name === onStage.name && shape() === onStage.shape)) return;
    if (onStage.name) turn[onStage.name] = (onStage.cut + 1) % count(onStage.name);
    show(name, turn[name] || 0);
  }

  // Near the end of a cut, the set's next one fades in over it.
  clips.forEach(function (clip) {
    clip.addEventListener('timeupdate', function () {
      if (clip !== clips[front] || !clip.duration || count(onStage.name) < 2) return;
      if (clip.duration - clip.currentTime < 0.9) show(onStage.name, (onStage.cut + 1) % count(onStage.name));
    });
  });

  // The section crossing the middle of the window decides; one without a
  // loop of its own keeps the last one above it.
  function pickStage() {
    if (!sections.length) return;
    var middle = window.innerHeight * 0.5;
    var current = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= middle) current = i;
      else break;
    }
    var name = null;
    for (var j = current; j >= 0 && !name; j--) name = sections[j].getAttribute('data-bg');
    for (var k = 0; k < sections.length && !name; k++) name = sections[k].getAttribute('data-bg');
    if (dim) dim.style.opacity = sections[current].getAttribute('data-dim');
    if (name) play(name);
  }

  // ── The floating switch ──
  // Out from the moment the cast (which introduces the four) reaches the
  // middle of the window, and away again while the site's footer is in view
  // (it would sit on the footer's links).
  var dock = page.querySelector('.kp-voices');
  var cast = page.querySelector('#cast');
  var footer = document.querySelector('footer');
  function placeDock() {
    if (!dock || !cast) return;
    var height = window.innerHeight;
    var past = cast.getBoundingClientRect().top < height * 0.5;
    var atFooter = footer && footer.getBoundingClientRect().top < height;
    dock.classList.toggle('is-shown', past && !atFooter);
  }

  // ── Scroll progress ──
  var scrollers = page.querySelectorAll('[data-scroll]');
  function progress() {
    var height = window.innerHeight;
    scrollers.forEach(function (el) {
      var box = el.getBoundingClientRect();
      if (box.bottom < -height || box.top > 2 * height) return;     // far off screen: left as it was
      var mode = el.getAttribute('data-scroll');
      var p = mode === 'enter' ? (height - box.top) / (height * 0.8)
        : mode === 'leave' ? -box.top / (box.height * 0.9)
        : (height - box.top) / (height + box.height);
      el._p = Math.max(0, Math.min(1, p));
      el.style.setProperty('--p', el._p.toFixed(3));
    });
    scrubAll(height);
  }

  var queued = false;
  function frame() {
    queued = false;
    pickStage();
    placeDock();
    if (!still) progress();
  }
  function request() {
    if (!queued) { queued = true; requestAnimationFrame(frame); }
  }
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  frame();

  // ── Taking turns ──
  // In each [data-cycle] (the hero's welcome, the closing line) one
  // character at a time, the next every few seconds; with reduced motion the
  // first one stays (the stylesheet shows it without .is-cycling).
  if (!still) {
    page.querySelectorAll('[data-cycle]').forEach(function (cycle) {
      var speakers = cycle.children;
      if (speakers.length < 2) return;
      var speaking = 0;
      for (var i = 0; i < speakers.length; i++) speakers[i].classList.toggle('is-on', i === 0);
      cycle.classList.add('is-cycling');
      setInterval(function () {
        if (document.hidden) return;
        speakers[speaking].classList.remove('is-on');
        speaking = (speaking + 1) % speakers.length;
        speakers[speaking].classList.add('is-on');
      }, 5500);
    });
  }

  // ── Skins ──
  var skinNames = page.querySelectorAll('.kp-skin-list button');
  var skinShots = page.querySelectorAll('.kp-skin');
  function bringForward(index) {
    skinNames.forEach(function (b, i) { b.setAttribute('aria-pressed', String(i === index)); });
    var reorder = function () {
      skinShots.forEach(function (img, i) { img.classList.toggle('is-front', i === index); });
    };
    // The browser cross-fades the old stack into the new where it can.
    if (!still && document.startViewTransition && !skinShots[index].classList.contains('is-front')) {
      document.startViewTransition(reorder);
    } else {
      reorder();
    }
  }
  skinNames.forEach(function (b, i) {
    ['click', 'mouseenter', 'focus'].forEach(function (type) {
      b.addEventListener(type, function () { bringForward(i); });
    });
  });

  // ── Clips ──
  var openingClips = page.querySelectorAll('video[data-clip="load"]');
  // Back to the still for good: the hero's poster is its first frame, so it
  // gets its last one (data-still) instead.
  function toStill(video) {
    var last = video.getAttribute('data-still');
    if (last) video.poster = last;
    video.removeAttribute('autoplay');
    video.removeAttribute('src');
    video.load();
  }
  // Loaded ahead of time, whole, as a blob: a server that doesn't say it
  // takes range requests (Python's http.server) leaves a streamed video
  // unseekable, and these are a megabyte or two. Once it has data the
  // scroll sets its frame (a seek also takes the poster down).
  function arm(video) {
    if (video._armed) return;
    video._armed = true;
    fetch(video.currentSrc || video.src).then(function (response) {
      return response.blob();
    }).then(function (blob) {
      video.addEventListener('loadeddata', request, { once: true });
      video.preload = 'auto';
      video.src = URL.createObjectURL(blob);
    }).catch(function () { /* the poster stays */ });
  }
  // A seek is asked for only once the one before has landed, and then for
  // wherever the scroll is by then, so fast scrolling doesn't queue seeks up.
  function seekTo(video, time) {
    video._want = time;
    if (video.seeking || Math.abs(video.currentTime - time) < 0.02) return;
    video.currentTime = time;
  }
  function scrubAll(height) {
    if (!scrubs) return;                 // the first frame runs before the clips are found
    scrubs.forEach(function (video) {
      if (!video._armed || video.readyState < 2 || !video.duration) return;
      // One column (the stylesheet's narrow layout): a screenshot sits below
      // its text, so the section's run would finish the clip before it is on
      // screen. A feature's screenshot pins under the navbar instead while
      // the empty .kp-feature-run after it scrolls by (p: 0 as it pins, 1 as
      // it lets go, below 0 on the way up), and the clip plays on the way up,
      // from about when it is all in view to the moment it pins, as on wide
      // screens. Anything else goes by its own run through the window.
      var host = narrow.matches ? null : video._host;
      var run = narrow.matches && video._run;
      var p, from, to;
      if (run && run.offsetHeight) {
        var figure = video.parentNode.getBoundingClientRect();
        var hold = run.getBoundingClientRect();
        var pinnedAt = parseFloat(getComputedStyle(video.parentNode).top) || 0;
        p = (pinnedAt + figure.height - hold.top) / hold.height;
        from = -1.3; to = 0;
      } else if (host) {
        if (host._p === undefined) return;
        p = host._p;
      } else {
        var box = video.getBoundingClientRect();
        p = Math.max(0, Math.min(1, (height - box.top) / (height + box.height)));
      }
      if (from === undefined) {
        from = host ? video._from : 0.1;
        to = host ? video._to : 0.5;
      }
      var t = Math.max(0, Math.min(1, (p - from) / (to - from)));
      // Squared: the app's intros ease out, most of their movement in the
      // clip's first sixth, which straight on went by in a flick.
      seekTo(video, Math.min(t * t * video.duration, video.duration - 0.01));
    });
  }
  var scrubs = page.querySelectorAll('video[data-scrub]');
  var narrow = window.matchMedia('(max-width: 900px)');
  scrubs.forEach(function (video) {
    var range = video.getAttribute('data-scrub').split(' ');
    video._from = range[0] / 100;
    video._to = range[1] / 100;
    video._host = video.parentNode.closest('[data-scroll]');
    var next = video.parentNode.nextElementSibling;
    video._run = next && next.classList.contains('kp-feature-run') ? next : null;
    // Its first frame until the clip has loaded and the scroll takes over:
    // the poster in the page is the finished still, for when nothing plays.
    if (!light) video.poster = video.getAttribute('data-start');
    video.addEventListener('seeked', function () { seekTo(video, video._want); });
  });
  function playClip(video) {
    var started = video.play();
    if (started && started.catch) started.catch(function () { toStill(video); });
  }
  openingClips.forEach(function (video) {
    if (light) { toStill(video); return; }
    var stage = video.closest('.kp-hero-stage');
    video.addEventListener('ended', function () { if (stage) stage.classList.add('is-live'); });
    playClip(video);
  });
  if (!light && 'IntersectionObserver' in window) {
    var near = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { arm(entry.target); near.unobserve(entry.target); }
      });
    }, { rootMargin: '100% 0px' });
    scrubs.forEach(function (video) { near.observe(video); });
  }

  // ── Words ──
  if (!still) {
    page.querySelectorAll('h2').forEach(function (heading) {
      var n = 0;
      Array.prototype.slice.call(heading.childNodes).forEach(function (node) {
        if (node.nodeType !== 3) return;               // a <br> stays as it is
        var parts = node.textContent.split(/(\s+)/);
        var run = document.createDocumentFragment();
        parts.forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { run.appendChild(document.createTextNode(part)); return; }
          var word = document.createElement('span');
          word.className = 'kp-word';
          word.style.setProperty('--w', n++);
          word.textContent = part;
          run.appendChild(word);
        });
        heading.replaceChild(run, node);
      });
    });
  }

  // ── Counters and reveals ──
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (still || !target) return;
    var start = performance.now(), length = 1400;
    (function step(now) {
      var t = Math.min(1, (now - start) / length);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en');
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }

  var reveals = page.querySelectorAll('.kp-reveal');
  if ('IntersectionObserver' in window) {
    // Any part of it above the bottom tenth of the window: a tall block (the
    // feature table) is revealed when its top arrives, not once a share of
    // its height is on screen.
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        var counter = entry.target.querySelector('[data-count]');
        if (counter) countUp(counter);
        seen.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function (el) { seen.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
