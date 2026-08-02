(() => {
  const loadStylesheet = (id, href) => {
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  const fileName = window.location.pathname.split('/').pop() || 'index.html';

  if (fileName === 'index.html') {
    loadStylesheet('home-visual-fixes', 'home-visual-fixes.css?v=20260802-icons1');
  }

  if (document.body.classList.contains('premium-collection-site')) {
    loadStylesheet('product-image-fixes', 'product-image-fixes.css?v=20260802-uniquephotos1');
  }

  document.querySelectorAll('img[src*="immunalia-ultra-product.jpg"]').forEach((image) => {
    image.src = 'assets/immunalia-ultra-product.svg?v=20260802-ultrasafe1';
    image.removeAttribute('srcset');
    image.decoding = 'async';
  });

  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('site-nav');

  if (!header || !toggle || !nav) return;

  const closeMenu = () => {
    header.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
})();
