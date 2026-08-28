/* ============================================================
   CASE STUDY SHARED BEHAVIOUR
   Loaded by all three case pages. Page-specific visuals/behaviour
   stay inline on their own page — see case-0N.html.
   ============================================================ */

var Case = {};

/* ---- nav height sync (nav has no fixed height; DM Serif Display
   FOUT can shift it after first paint) ---- */
Case.syncNavHeight = function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
};

/* ---- generic step observer: given a .steps container, work out
   which .step[data-stage] is closest to viewport center and report
   it via callback(stage). Caller wires `check` into the shared
   scroll handler below — no IntersectionObserver here, since a
   plain rect comparison over a handful of known nodes is more
   deterministic than tuning IO thresholds with nothing to test
   against (see architecture notes in the plan). ---- */
Case.initStepper = function (root, callback) {
  var steps = Array.prototype.slice.call(root.querySelectorAll('.step[data-stage]'));
  var active = null;
  return function check() {
    var mid = window.innerHeight / 2;
    var best = null, bestDist = Infinity;
    for (var i = 0; i < steps.length; i++) {
      var r = steps[i].getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= window.innerHeight) continue;
      var dist = Math.abs((r.top + r.bottom) / 2 - mid);
      if (dist < bestDist) { bestDist = dist; best = steps[i]; }
    }
    if (best && best.dataset.stage !== active) {
      active = best.dataset.stage;
      callback(active);
    }
  };
};

/* ---- generic toggle-group wiring: any [data-toggle-group] button
   row sets an attribute on a target element and flips aria-pressed
   across the group. Used by case 01 & 02's Viz B. ---- */
Case.initToggleGroups = function () {
  var groups = document.querySelectorAll('[data-toggle-group]');
  groups.forEach(function (group) {
    var attr = group.dataset.toggleGroup;
    var targetSelector = group.dataset.toggleTarget;
    var target = targetSelector ? document.querySelector(targetSelector) : null;
    var buttons = group.querySelectorAll('button[data-toggle-value]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (target) target.dataset[attr] = btn.dataset.toggleValue;
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      });
    });
  });
};

/* ---- scroll progress bar + any registered stepper checks, folded into
   one passive, rAF-throttled scroll listener. Nav-border toggling used to
   live here too, but main.js's own scroll listener already does that
   (targeting #nav, which case pages now also carry) — doing it twice was
   the exact kind of drift this consolidation was meant to end. ---- */
Case.initScrollChrome = function (stepperChecks) {
  var prog = document.querySelector('.prog');
  var ticking = false;

  function update() {
    var scrollY = window.scrollY;
    if (prog) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (scrollY / max) * 100 : 0;
      prog.style.width = pct + '%';
    }
    (stepperChecks || []).forEach(function (check) { check(); });
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
};

/* ---- boot: every page calls this after wiring its own stepper(s)
   and defining its own stage-change handling ---- */
Case.init = function (stepperChecks) {
  Case.syncNavHeight();
  window.addEventListener('resize', Case.syncNavHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(Case.syncNavHeight);
  }
  Case.initToggleGroups();
  Case.initScrollChrome(stepperChecks || []);
};
