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

  if (reduce || !("IntersectionObserver" in window)) return;

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    ".card, .post-card, .stat, .step, .site-cat"
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
