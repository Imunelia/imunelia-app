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
  const isEnglish = fileName.endsWith('-en.html');
  const isHomepage = fileName === 'index.html' || fileName === 'index-en.html';

  const injectHomeLifeFeature = () => {
    if (document.querySelector('.home-life-feature')) return;
    const hero = document.querySelector('.brand-hero');
    if (!hero) return;

    const copy = isEnglish ? {
      aria: 'Active life and a shared journey',
      kicker: 'Life in motion',
      title: 'Balance is not stillness. It is the ability to keep moving.',
      intro: 'Every day has a different rhythm — performance, recovery, closeness and space for yourself. Immunalia is created for life as it is actually lived.',
      firstAlt: 'A couple hiking a coastal trail at golden hour',
      firstTitle: 'Every shared journey has its own rhythm.',
      firstText: 'Movement, closeness and energy for moments that truly matter.',
      secondAlt: 'Professional athletes in demanding endurance and strength disciplines',
      secondTitle: 'Live fully. Without unnecessary noise.',
      secondText: 'A premium approach to an active everyday life.'
    } : {
      aria: 'Aktivní život a společná cesta',
      kicker: 'Život v pohybu',
      title: 'Rovnováha není klid bez pohybu. Je to schopnost pokračovat.',
      intro: 'Každý den přináší jiný rytmus — výkon, odpočinek, blízkost i prostor pro sebe. Immunalia vzniká pro život, který se skutečně žije.',
      firstAlt: 'Dvojice na pobřežní stezce při zlaté hodině',
      firstTitle: 'Společná cesta má vlastní rytmus.',
      firstText: 'Pohyb, blízkost a energie pro chvíle, které mají skutečný význam.',
      secondAlt: 'Profesionální sportovci při náročných vytrvalostních a silových výkonech',
      secondTitle: 'Žít naplno. Bez zbytečného hluku.',
      secondText: 'Prémiový přístup pro aktivní každodennost.'
    };

    const section = document.createElement('section');
    section.className = 'home-life-feature';
    section.setAttribute('aria-label', copy.aria);
    section.innerHTML = `
      <div class="home-life-feature__intro">
        <div><p class="section-kicker">${copy.kicker}</p><h2>${copy.title}</h2></div>
        <p>${copy.intro}</p>
      </div>
      <div class="home-life-feature__grid">
        <article class="home-life-feature__card">
          <img src="assets/photos/home-coastal-hike-v2.svg?v=20260802-valid3" alt="${copy.firstAlt}" width="640" height="360" loading="lazy" decoding="async">
          <div class="home-life-feature__caption"><strong>${copy.firstTitle}</strong><span>${copy.firstText}</span></div>
        </article>
        <article class="home-life-feature__card home-life-feature__card--secondary">
          <img src="assets/photos/ultra-multisport-v2.svg?v=20260802-valid3" alt="${copy.secondAlt}" width="720" height="405" loading="lazy" decoding="async">
          <div class="home-life-feature__caption"><strong>${copy.secondTitle}</strong><span>${copy.secondText}</span></div>
        </article>
      </div>`;
    hero.insertAdjacentElement('afterend', section);
  };

  if (isHomepage) {
    loadStylesheet('home-visual-fixes', 'home-visual-fixes.css?v=20260802-bilingual-final');
    injectHomeLifeFeature();
  }

  const applyGeneratedProductPhotos = async () => {
    loadStylesheet('product-image-fixes', 'product-image-fixes.css?v=20260802-valid-final');
    try {
      await loadScript('product-photo-sprite-1', 'assets/js/product-lifestyle-sprite-part01.js?v=20260802-emotional3');
      await loadScript('product-photo-sprite-2', 'assets/js/product-lifestyle-sprite-part02.js?v=20260802-emotional3');
      await loadScript('product-photo-sprite-3', 'assets/js/product-lifestyle-sprite-part03.js?v=20260802-emotional3');
      await loadScript('product-photo-sprite-build', 'assets/js/product-lifestyle-sprite-build.js?v=20260802-emotional3');
    } catch (error) {
      console.warn('Supplementary product photography could not be loaded.', error);
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
        context.drawImage(sprite, column * cellWidth, 0, cellWidth, cellHeight, 0, 0, cellWidth, cellHeight);
        let dataUrl = canvas.toDataURL('image/webp', 0.9);
        if (!dataUrl.startsWith('data:image/webp')) dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const cssUrl = `url("${dataUrl}")`;
        cache.set(column, cssUrl);
        return cssUrl;
      };
      [
        { selector: '.lifestyle-family', column: 2, position: 'center 47%', size: 'cover' },
        { selector: '#balance', column: 2, position: '52% 44%', size: '165%' },
        { selector: '#restart', column: 1, position: '48% 39%', size: '150%' },
        { selector: '#shield', column: 2, position: '82% 47%', size: '180%' },
        { selector: '#flow', column: 0, position: '26% 47%', size: '155%' }
      ].forEach(({ selector, column, position, size }) => {
        const element = document.querySelector(selector);
        if (!element) return;
        element.style.setProperty('--generated-product-photo', crop(column));
        element.style.setProperty('--generated-photo-position', position);
        element.style.setProperty('--generated-photo-size', size);
        element.classList.add('has-generated-photo');
      });
    };
    sprite.src = spriteSource;
  };

  if (document.body.classList.contains('products-page')) applyGeneratedProductPhotos();

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
