  var ANCHORS = ['profile', 'approach', 'work', 'contact'];

  function render() {
    var h = (location.hash || '').replace(/^#/, '');
    var anchor = ANCHORS.indexOf(h) !== -1 ? h : null;

    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.classList.toggle('is-current', a.dataset.nav === anchor);
    });

    if (anchor) {
      var el = document.getElementById(anchor);
      if (el) { el.scrollIntoView({ behavior: 'auto', block: 'start' }); return; }
    }
    window.scrollTo(0, 0);
  }

  // reveal on scroll
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

  // Safety timeout: reveal anything the observer never fired for (already
  // past the viewport on load, a script error elsewhere) rather than leave
  // it invisible. Added when .reveal became the shared reveal mechanism
  // across all four pages, not present in the original landing-page script.
  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
      el.classList.add('visible');
    });
  }, 2000);

  window.addEventListener('scroll', function () {
    var navEl = document.getElementById('nav');
    if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 40);
  });

  window.addEventListener('hashchange', render);
  render();
