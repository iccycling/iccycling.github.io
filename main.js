/* ============================================================
   ICCC — main.js
   Shared JS for all pages
   ============================================================ */

(function () {

  /* ── HIDE / SHOW NAV ON SCROLL ── */
  const nav = document.querySelector('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    // Always show nav when near top
    if (current < 80) {
      nav.classList.remove('nav-hidden');
    } else if (current > lastScroll + 4) {
      // Scrolling down — hide
      nav.classList.add('nav-hidden');
      closeDrawer();
    } else if (lastScroll > current + 4) {
      // Scrolling up — show
      nav.classList.remove('nav-hidden');
    }

    lastScroll = current;
  }, { passive: true });


  /* ── MOBILE DRAWER ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer    = document.querySelector('.nav-drawer');

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    hamburger && hamburger.classList.remove('open');
  }

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        drawer.classList.add('open');
        hamburger.classList.add('open');
      }
    });

    // Close on link click
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeDrawer);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) {
        closeDrawer();
      }
    });
  }


  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

})();
