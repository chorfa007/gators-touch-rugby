// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
function closeMobile() {
  mobileMenu.classList.remove('open');
}

// Fade-up on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.card, .rule, .schedule__card, .about__text, .contact__info, .contact__form')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

// ── i18n ──────────────────────────────────────────────────────────────────────
const SUPPORTED = ['en', 'fr', 'nl'];

function detectLang() {
  const stored = localStorage.getItem('lang');
  if (stored && SUPPORTED.includes(stored)) return stored;
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return SUPPORTED.includes(browser) ? browser : 'en';
}

let currentLang = detectLang();

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  const t = TRANSLATIONS[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

applyLang(currentLang);

// ── Contact form ───────────────────────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  const btn  = e.target.querySelector('button[type="submit"]');
  const t    = TRANSLATIONS[currentLang];

  btn.textContent = t.form_sending;
  btn.disabled = true;

  setTimeout(() => {
    note.textContent = t.form_success;
    e.target.reset();
    btn.textContent = t.form_submit;
    btn.disabled = false;
    // Restore translated placeholders after form reset
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (t[key] !== undefined) el.placeholder = t[key];
    });
  }, 1000);
}
