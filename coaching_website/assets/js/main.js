
// Index html JS
// ===== Burger Menü =====
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');

    if (burger && nav) {
      burger.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          nav.classList.remove('nav-open');

          const targetId = link.getAttribute('href').substring(1);
          const targetEl = document.getElementById(targetId);
          if (!targetEl) return;

          const header = document.querySelector('header');
          let headerOffset = 0;

          // Fallback: nur berücksichtigen, wenn Header nicht transparent oder sticky ist
          if (header && window.getComputedStyle(header).position !== "static") {
            headerOffset = header.offsetHeight;
          }

          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        });
      });
    }

    // ===== Sprache automatisch auswählen =====
document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('language-select');
  if (!languageSelect) return;

  const supportedLangs = ['de', 'fr', 'en'];

  // 1️⃣ Gespeicherte Sprache oder Fallback auf Browser
  let lang = localStorage.getItem('selectedLang');
  if (!lang || !supportedLangs.includes(lang)) {
    const userLang = navigator.language.slice(0, 2);
    lang = supportedLangs.includes(userLang) ? userLang : 'de';
  }

  // 2️⃣ Setze select-Feld auf gespeicherte Sprache
  languageSelect.value = lang;

  // 3️⃣ Inhalte direkt aktualisieren
  const updateTexts = (language) => {
    document.querySelectorAll('[data-de]').forEach(el => {
      if (el.dataset[language]) el.innerHTML = el.dataset[language];
    });
  };
  updateTexts(lang);

  // 4️⃣ Listener für Änderungen + speichern
  languageSelect.addEventListener('change', e => {
    const newLang = e.target.value;
    localStorage.setItem('selectedLang', newLang);
    updateTexts(newLang);
  });
});



   
    // ===== Parallax für Hero Content =====
    const heroContent = document.querySelector('#hero-content');
    window.addEventListener('scroll', () => {
      if (!heroContent) return;
      const scrollY = window.scrollY;
      const speed = 0.3;
      heroContent.style.transform = `translateY(${-scrollY * speed}px)`;
    });

    // ===== Box Observer =====
    const boxes = document.querySelectorAll('.box');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.5 });

    boxes.forEach(box => observer.observe(box));

    // ===== Hero Content einblenden beim Laden =====
    window.addEventListener('load', () => {
      if (heroContent) heroContent.classList.add('load-visible');
    });

    // ===== Scroll-Pfeil Funktion =====
    const scrollArrow = document.querySelector('#scroll-arrow');
    if (scrollArrow) {
      scrollArrow.addEventListener('click', e => {
        e.preventDefault();
        window.scrollBy({ top: 200, left: 0, behavior: 'smooth' });
      });
    }
