// ── Navbar scroll state ──────────────────────────────────
const nav = document.getElementById('navbar');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
  if (document.body.classList.contains('legal-page')) nav.classList.add('scrolled');
}

// ── Hamburger / Mobile Menu ──────────────────────────────
const hamburger  = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobileMenu');
if (hamburger && mobileMenu) {
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-nav-tel');
  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }
  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }
  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
}

// ── Scroll-reveal ─────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => io.observe(el));
}

// ── Galerie: erweitern / einklappen ──────────────────────
const galleryToggle = document.getElementById('galleryToggle');
const galleryGrid = document.getElementById('galleryGrid');
if (galleryToggle && galleryGrid) {
  const extraItems = galleryGrid.querySelectorAll('.g-extra');
  galleryToggle.addEventListener('click', () => {
    const isOpen = galleryGrid.classList.contains('open');
    if (!isOpen) {
      galleryGrid.classList.add('open');
      galleryToggle.setAttribute('aria-expanded', 'true');
      galleryToggle.querySelector('.gallery-toggle__label').textContent = 'Weniger anzeigen';
      galleryToggle.querySelector('.gallery-toggle__arrow').classList.add('rotated');
      extraItems.forEach((item, i) => {
        item.style.animationDelay = (i * 0.06) + 's';
        item.classList.add('entering');
      });
    } else {
      galleryGrid.classList.remove('open');
      galleryToggle.setAttribute('aria-expanded', 'false');
      galleryToggle.querySelector('.gallery-toggle__label').textContent = 'Alle Arbeiten ansehen';
      galleryToggle.querySelector('.gallery-toggle__arrow').classList.remove('rotated');
      extraItems.forEach(item => { item.classList.remove('entering'); item.style.animationDelay = ''; });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          galleryToggle.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      });
    }
  });
}
