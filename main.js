/* ============================================================
   ICCC — main.js
   Shared JS for all pages
   ============================================================ */

(function () {

  /* ── MOBILE DRAWER ── */
  const nav       = document.querySelector('nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer    = document.querySelector('.nav-drawer');

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger && hamburger.classList.remove('open');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && drawer) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', drawer.id || 'nav-drawer');
    if (!drawer.id) drawer.id = 'nav-drawer';
    drawer.setAttribute('aria-hidden', 'true');

    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
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
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const item   = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        q && q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* ── WHATSAPP MODAL ── */
const waOverlay  = document.getElementById('waOverlay');
const waTriggers = document.querySelectorAll('[data-wa-trigger]');
const waClose    = document.querySelector('[data-wa-close]');
let lastTrigger = null;

function openModal(e) {
  lastTrigger = e.currentTarget;
  waOverlay.classList.add('open');
  waOverlay.setAttribute('aria-hidden', 'false');
  waClose && waClose.focus();
}

function closeModal() {
  waOverlay.classList.remove('open');
  waOverlay.setAttribute('aria-hidden', 'true');
  lastTrigger && lastTrigger.focus();
}

if (waOverlay && waTriggers.length) {
  waOverlay.setAttribute('role', 'dialog');
  waOverlay.setAttribute('aria-modal', 'true');
  waOverlay.setAttribute('aria-hidden', 'true');

  waTriggers.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  waClose?.addEventListener('click', closeModal);

  waOverlay.addEventListener('click', e => {
    if (e.target === waOverlay) closeModal();
  });
}

  /* ── ESCAPE KEY closes drawer and modal ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (drawer && drawer.classList.contains('open')) closeDrawer();
      if (waOverlay && waOverlay.classList.contains('open')) closeModal();
    }
  });

})();
