(() => {
  'use strict';

  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('site-nav');

  document.querySelectorAll('a[href="produkty.html"]').forEach(link => {
    const label = link.textContent.trim().toLowerCase();
    if (label === 'produkty' || label === 'naše produkty' || label === 'products') {
      link.textContent = document.documentElement.lang === 'en' ? 'Daily' : 'Daily';
    }
  });

  document.querySelectorAll('a[href="professional.html"]').forEach(link => {
    if (link.textContent.trim().toLowerCase() === 'professional products') {
      link.textContent = 'Professional';
    }
  });

  if (!header || !toggle || !nav) return;

  const close = () => {
    header.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', event => {
    if (event.target instanceof HTMLAnchorElement) close();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) close();
  }, { passive: true });
})();
