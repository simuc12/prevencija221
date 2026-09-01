/* ===== Tamsus / šviesus režimas ===== */
(function () {
  const t = document.querySelector('[data-theme-toggle]'),
    r = document.documentElement;
  const sun =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moon =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  if (t) {
    t.innerHTML = d === 'dark' ? sun : moon;
    t.setAttribute('aria-label', d === 'dark' ? 'Perjungti į šviesų režimą' : 'Perjungti į tamsų režimą');
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      t.innerHTML = d === 'dark' ? sun : moon;
      t.setAttribute('aria-label', d === 'dark' ? 'Perjungti į šviesų režimą' : 'Perjungti į tamsų režimą');
    });
  }
})();

/* ===== Turinio atsiskleidimas slenkant ===== */
(function () {
  const targets = document.querySelectorAll(
    '.sec-h, .sec-lede, .probs li, .doc, .gal figure, .tbl-wrap, .plan, .faq, .callout, .free-vis, .cta-row'
  );
  if (!('IntersectionObserver' in window)) return;
  targets.forEach((el, i) => {
    el.classList.add('rv');
    el.style.transitionDelay = Math.min(i % 6, 5) * 45 + 'ms';
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  targets.forEach((el) => io.observe(el));
})();

/* ===== DUK: atidarytas tik vienas atsakymas ===== */
document.querySelectorAll('.faq details').forEach((d) => {
  d.addEventListener('toggle', () => {
    if (d.open) {
      document.querySelectorAll('.faq details').forEach((o) => {
        if (o !== d) o.open = false;
      });
    }
  });
});
