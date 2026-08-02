(() => {
  const loadStylesheet = (id, href) => {
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  const loadScript = (id, src) => new Promise((resolve, reject) => {
    const existing = document.getElementById(id);
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else existing.addEventListener('load', resolve, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = false;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });

  const fileName = window.location.pathname.split('/').pop() || 'index.html';

  if (fileName === 'index.html') {
    loadStylesheet('home-visual-fixes', 'home-visual-fixes.css?v=20260802-icons1');
  }

  const applyGeneratedProductPhotos = async () => {
    loadStylesheet('product-image-fixes', 'product-image-fixes.css?v=20260802-emotional3');

    try {
      await loadScript('product-photo-sprite-1', 'assets/js/product-lifestyle-sprite-part01.js?v=20260802-emotional3');
      await loadScript('product-photo-sprite-2', 'assets/js/product-lifestyle-sprite-part02.js?v=20260802-emotional3');
      await loadScript('product-photo-sprite-3', 'assets/js/product-lifestyle-sprite-part03.js?v=20260802-emotional3');
      await loadScript('product-photo-sprite-build', 'assets/js/product-lifestyle-sprite-build.js?v=20260802-emotional3');
    } catch (error) {
      console.warn('Product photography could not be loaded.', error);
      return;
    }

    const spriteSource = window.IMMUNALIA_PRODUCT_PHOTO_SPRITE;
    if (!spriteSource) return;

    const sprite = new Image();
    sprite.decoding = 'async';
    sprite.onload = () => {
      const cellWidth = Math.round(sprite.naturalWidth / 3);
      const cellHeight = sprite.naturalHeight;
      const cache = new Map();

      const crop = (column) => {
        if (cache.has(column)) return cache.get(column);

        const canvas = document.createElement('canvas');
        canvas.width = cellWidth;
        canvas.height = cellHeight;
        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return '';
        context.drawImage(
          sprite,
          column * cellWidth,
          0,
          cellWidth,
          cellHeight,
          0,
          0,
          cellWidth,
          cellHeight
        );

        let dataUrl = canvas.toDataURL('image/webp', 0.92);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        }
        const cssUrl = `url("${dataUrl}")`;
        cache.set(column, cssUrl);
        return cssUrl;
      };

      const photoTargets = [
        { selector: '.lifestyle-performance', column: 0, position: 'center 46%', size: 'cover' },
        { selector: '.lifestyle-recovery', column: 1, position: 'center 42%', size: 'cover' },
        { selector: '.lifestyle-family', column: 2, position: 'center 47%', size: 'cover' },

        { selector: '#balance', column: 2, position: '52% 44%', size: '165%' },
        { selector: '#restart', column: 1, position: '48% 39%', size: '150%' },
        { selector: '#shield', column: 2, position: '82% 47%', size: '180%' },
        { selector: '#flow', column: 0, position: '26% 47%', size: '155%' },
        { selector: '#night', column: 1, position: '70% 48%', size: '172%' },
        { selector: '#ultra', column: 0, position: '73% 46%', size: '176%' }
      ];

      photoTargets.forEach(({ selector, column, position, size }) => {
        const element = document.querySelector(selector);
        if (!element) return;
        const photo = crop(column);
        if (!photo) return;
        element.style.setProperty('--generated-product-photo', photo);
        element.style.setProperty('--generated-photo-position', position);
        element.style.setProperty('--generated-photo-size', size);
        element.classList.add('has-generated-photo');
      });
    };
    sprite.onerror = () => console.warn('Generated product photography sprite is invalid.');
    sprite.src = spriteSource;
  };

  if (document.body.classList.contains('products-page')) {
    applyGeneratedProductPhotos();
  }

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
