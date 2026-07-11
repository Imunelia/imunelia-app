(() => {
  const ultraPackImages = document.querySelectorAll('.product-pack-photo--ultra');

  ultraPackImages.forEach((image) => {
    image.setAttribute('src', 'assets/immunalia-ultra-product.svg?v=20260711-aligned1');
    image.setAttribute('width', '1006');
    image.setAttribute('height', '800');
    image.classList.remove('product-pack-photo--ultra');

    if (!image.classList.contains('product-pack-photo--ultra-large')) {
      image.closest('.ultra-photo-stage')?.classList.remove('ultra-photo-stage');
    }
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