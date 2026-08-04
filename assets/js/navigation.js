(() => {
  'use strict';

  const visualStylesheet = document.createElement('link');
  visualStylesheet.rel = 'stylesheet';
  visualStylesheet.href = 'visual-completion.css?v=20260804-visual2';
  document.head.appendChild(visualStylesheet);

  const fallbackImages = [
    'assets/photos/home-story-energy.jpg?v=20260804-visual2',
    'assets/photos/home-story-performance.jpg?v=20260804-visual2',
    'assets/photos/home-story-immunity.jpg?v=20260804-visual2',
    'assets/photos/night-evening.webp?v=20260804-visual2',
    'assets/photos/home-coastal-group.jpg?v=20260804-visual2'
  ];

  const chooseFallback = (img, index) => {
    const text = `${img.alt || ''} ${img.closest('article,section')?.textContent || ''}`.toLowerCase();
    if (text.includes('night') || text.includes('večer') || text.includes('regener')) return fallbackImages[3];
    if (text.includes('sport') || text.includes('výkon') || text.includes('ultra')) return fallbackImages[1];
    if (text.includes('rodin') || text.includes('family') || text.includes('balance')) return fallbackImages[4];
    if (text.includes('odol') || text.includes('shield') || text.includes('professional')) return fallbackImages[2];
    return fallbackImages[index % fallbackImages.length];
  };

  document.querySelectorAll('img').forEach((img, index) => {
    const applyFallback = () => {
      if (img.dataset.vcFallback === 'true') return;
      img.dataset.vcFallback = 'true';
      img.src = chooseFallback(img, index);
      img.removeAttribute('srcset');
    };
    img.addEventListener('error', applyFallback, { once: true });
    if (!img.getAttribute('src') || (img.complete && img.naturalWidth === 0)) applyFallback();
  });

  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('site-nav');

  document.querySelectorAll('a[href="produkty.html"]').forEach(link => {
    const label = link.textContent.trim().toLowerCase();
    if (label === 'produkty' || label === 'naše produkty' || label === 'products') link.textContent = 'Daily';
  });

  document.querySelectorAll('a[href="professional.html"]').forEach(link => {
    if (link.textContent.trim().toLowerCase() === 'professional products') link.textContent = 'Professional';
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
