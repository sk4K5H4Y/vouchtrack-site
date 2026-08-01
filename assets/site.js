/* VouchTrack — shared behaviors (progressive enhancement only).
   Everything motion-related respects prefers-reduced-motion. */
(function () {
  "use strict";

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header shadow on scroll (not motion; always on) ---------- */
  var header = document.querySelector("header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Nav dropdowns (functional — runs regardless of motion pref) ---------- */
  var menuItems = document.querySelectorAll(".nav-links li.has-menu");
  menuItems.forEach(function (li) {
    var trigger = li.querySelector(".menu-trigger");
    if (!trigger) return;
    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", function (ev) {
      // On narrow screens the trigger opens the submenu instead of navigating.
      if (window.innerWidth > 820) return;
      ev.preventDefault();
      var isOpen = li.classList.toggle("open");
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  // Close any open desktop menu on Escape.
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    menuItems.forEach(function (li) {
      li.classList.remove("open");
      var t = li.querySelector(".menu-trigger");
      if (t) {
        t.setAttribute("aria-expanded", "false");
        if (li.contains(document.activeElement)) t.focus();
      }
    });
  });

  /* ---------- Copyable prompt boxes ---------- */
  document.querySelectorAll(".prompt-copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.querySelector(btn.getAttribute("data-copy"));
      if (!target || !navigator.clipboard) return;
      navigator.clipboard.writeText(target.textContent.trim()).then(function () {
        var original = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("copied");
        }, 2000);
      });
    });
  });

  if (reduce || !("IntersectionObserver" in window)) return;

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    ".card, .post-card, .stat, .step, .site-cat, .vt-item, .tn-panel, .sk-panel"
  );
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("rv-in");
        io.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );
  revealTargets.forEach(function (el, i) {
    // Stagger siblings slightly within their row.
    var idx = 0, sib = el;
    while ((sib = sib.previousElementSibling) && idx < 5) idx++;
    el.style.transitionDelay = Math.min(idx * 70, 280) + "ms";
    el.classList.add("rv");
    io.observe(el);
  });

  /* ---------- Number helpers ---------- */
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function animateNumber(el, from, to, ms, fmt) {
    var t0 = null;
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / ms, 1);
      el.textContent = fmt(from + (to - from) * ease(p));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Stat count-ups (simple numeric stats only) ---------- */
  var statRe = /^(\$?)(\d{1,4})(%|\+)?$/;
  var bigs = document.querySelectorAll(".stat .big");
  var statIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        statIO.unobserve(e.target);
        var m = e.target.textContent.trim().match(statRe);
        if (!m) return;
        var pre = m[1] || "", val = parseInt(m[2], 10), suf = m[3] || "";
        if (!val) return;
        animateNumber(e.target, 0, val, 900, function (v) {
          return pre + Math.round(v) + suf;
        });
      });
    },
    { threshold: 0.4 }
  );
  bigs.forEach(function (el) { statIO.observe(el); });

  /* ---------- Hero lift-card sequence (homepage only) ---------- */
  var lift = document.querySelector(".lift-card");
  if (lift) {
    var score = lift.querySelector(".lift-after .lift-score");
    var count = lift.querySelector(".lift-after .lift-count");
    var stars = lift.querySelector(".lift-after .lift-stars");
    var ticks = lift.querySelectorAll(".ticker .tick");

    // Prepare initial states.
    ticks.forEach(function (t) { t.classList.add("tick-hide"); });
    var starSpans = [];
    if (stars) {
      var chars = stars.textContent.trim().split("");
      stars.textContent = "";
      chars.forEach(function (c) {
        var s = document.createElement("span");
        s.className = "st st-dim";
        s.textContent = c;
        stars.appendChild(s);
        starSpans.push(s);
      });
    }

    var played = false;
    var liftIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting || played) return;
          played = true;
          liftIO.unobserve(lift);

          if (score) {
            animateNumber(score, 3.9, 4.6, 1300, function (v) {
              return v.toFixed(1);
            });
          }
          if (count) {
            animateNumber(count, 47, 212, 1300, function (v) {
              return Math.round(v) + " reviews";
            });
          }
          starSpans.forEach(function (s, i) {
            setTimeout(function () { s.classList.remove("st-dim"); }, 350 + i * 140);
          });
          ticks.forEach(function (t, i) {
            setTimeout(function () { t.classList.remove("tick-hide"); }, 1500 + i * 650);
          });
          if (stars) {
            setTimeout(function () { stars.classList.add("shimmer"); }, 3600);
          }
        });
      },
      { threshold: 0.35 }
    );
    liftIO.observe(lift);
  }

  /* ---------- Hero platform simulator (homepage) ---------- */
  var sim = document.getElementById("hero-sim");
  if (sim) {
    var SCENES = [
      { skin: "sim-gpt", brand: "ChatGPT", glyph: "\u25CF",
        q: "Best plumber in Brooklyn, NY? Give me your top three.",
        intro: "Here are three well-reviewed options:",
        rows: [["Greenpoint Pipe & Drain"], ["Bedford Ave Plumbing Co."], ["Five Boro Flow"]] },
      { skin: "sim-maps", brand: "", glyph: "",
        q: "hair salons near me",
        intro: "Results",
        rows: [["Studio Marlowe", "\u2605 4.9 (312) \u00B7 Open \u00B7 0.4 mi"],
               ["The Gilded Comb", "\u2605 4.8 (196) \u00B7 Open \u00B7 0.7 mi"],
               ["Salon Verano", "\u2605 4.8 (154) \u00B7 Closes 7 PM \u00B7 1.1 mi"]] },
      { skin: "sim-pplx", brand: "Perplexity", glyph: "\u25C9",
        q: "Trusted BMW repair shop near me?",
        intro: "Based on recent reviews, three stand out:",
        rows: [["Autohaus Meridian", null, "1"], ["Precision Bay Motors", null, "2"], ["Kessler Automotive", null, "3"]] },
      { skin: "sim-gem", brand: "Gemini", glyph: "\u2726",
        q: "Who's the best dentist in Austin for nervous patients?",
        intro: "Three practices come up consistently:",
        rows: [["Cedar Smile Studio"], ["Lantern Dental"], ["Bluebonnet Family Dental"]] }
    ];
    var head = document.getElementById("sim-head");
    var brand = document.getElementById("sim-brand");
    var qEl = document.getElementById("sim-q");
    var cursor = document.getElementById("sim-cursor");
    var introEl = document.getElementById("sim-intro");
    var rowsEl = document.getElementById("sim-rows");
    var youEl = document.getElementById("sim-you");

    function renderScene(sc) {
      sim.className = "sim sim-swap " + sc.skin;
      if (sc.skin === "sim-maps") {
        head.innerHTML = '<span class="sim-search"><span class="sim-glyph">\u2315</span><span id="sim-q"></span><span class="ac-cursor" id="sim-cursor" hidden></span></span>';
      } else {
        head.innerHTML = '<span class="sim-glyph" aria-hidden="true">' + sc.glyph + '</span><span class="sim-brand" id="sim-brand">' + sc.brand + '</span>';
      }
      var isMaps = sc.skin === "sim-maps";
      var body = "";
      if (!isMaps) {
        body += '<p class="sim-q"><span id="sim-q"></span><span class="ac-cursor" id="sim-cursor" hidden></span></p>';
      }
      body += '<p class="sim-intro sim-step" id="sim-intro">' + sc.intro + '</p><ol class="sim-rows" id="sim-rows">';
      sc.rows.forEach(function (r, i) {
        body += '<li class="sim-row sim-step">';
        if (isMaps) body += '<span class="sim-thumb"></span>';
        else body += '<span class="sim-rank">' + (i + 1) + '</span>';
        body += '<span><span class="sim-name">' + r[0] + '</span>';
        if (r[2]) body += '<span class="sim-cite">' + r[2] + '</span>';
        if (r[1]) body += '<div class="sim-meta"><span class="sim-stars">\u2605</span> ' + r[1].slice(2) + '</div>';
        body += '</span></li>';
      });
      body += '</ol><div class="sim-you sim-step" id="sim-you"><span class="sim-you-label">Your business</span><span class="sim-you-status">Not mentioned</span></div>';
      document.getElementById("sim-body").innerHTML = body;
      qEl = document.getElementById("sim-q");
      cursor = document.getElementById("sim-cursor");
    }

    function typeText(text, done) {
      qEl.textContent = "";
      cursor.hidden = false;
      var i = 0;
      (function tick() {
        if (i <= text.length) {
          qEl.textContent = text.slice(0, i); i++;
          setTimeout(tick, 26);
        } else { cursor.hidden = true; done(); }
      })();
    }

    function playScene(idx) {
      var sc = SCENES[idx % SCENES.length];
      sim.classList.add("out");
      setTimeout(function () {
        renderScene(sc);
        sim.classList.remove("out");
        var steps = [].slice.call(sim.querySelectorAll(".sim-step"));
        typeText(sc.q, function () {
          steps.forEach(function (el, i) {
            setTimeout(function () { el.classList.add("sim-in"); }, 220 + i * 280);
          });
          setTimeout(function () { playScene(idx + 1); }, 220 + steps.length * 280 + 2600);
        });
      }, idx === 0 ? 0 : 340);
    }

    var simPlayed = false;
    var simIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || simPlayed) return;
        simPlayed = true;
        simIO.unobserve(sim);
        playScene(0);
      });
    }, { threshold: 0.35 });
    simIO.observe(sim);
  }

  /* ---------- Gap bar fills (pillar page) ---------- */
  var fills = document.querySelectorAll(".gb-fill[data-w]");
  if (fills.length) {
    var barIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        barIO.unobserve(e.target);
        var w = Math.max(parseFloat(e.target.dataset.w), 1.2);
        requestAnimationFrame(function () { e.target.style.width = w + "%"; });
      });
    }, { threshold: 0.5 });
    fills.forEach(function (el) { barIO.observe(el); });
  }

  /* ---------- Calculator output tick (free-tools pages) ---------- */
  var outs = document.querySelectorAll(".calc-line strong");
  if (outs.length) {
    var mo = new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        var el = m.target.nodeType === 3 ? m.target.parentElement : m.target;
        if (!el || !el.classList) return;
        el.classList.remove("calc-tick");
        void el.offsetWidth; // restart animation
        el.classList.add("calc-tick");
      });
    });
    outs.forEach(function (el) {
      mo.observe(el, { childList: true, characterData: true, subtree: true });
    });
  }
})();
