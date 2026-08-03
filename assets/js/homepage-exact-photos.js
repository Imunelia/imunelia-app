(() => {
  'use strict';

  const build = '20260804-story-photos1';

  const setPhoto = (selector, source, position) => {
    const element = document.querySelector(selector);
    if (!element || !source) return;
    element.style.setProperty('background-image', `url("${source}")`, 'important');
    element.style.backgroundPosition = position;
    element.style.backgroundSize = 'cover';
    element.style.backgroundRepeat = 'no-repeat';
  };

  const loadScript = (id, source) => new Promise((resolve, reject) => {
    const existing = document.getElementById(id);
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.src = source;
    script.async = true;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });

  const applyPhotos = () => {
    setPhoto('.exact-category--energy .exact-category__photo', `assets/photos/home-story-energy.jpg?v=${build}`, 'center 46%');
    setPhoto('.exact-category--performance .exact-category__photo', `assets/photos/home-story-performance.jpg?v=${build}`, 'center 45%');
    setPhoto('.exact-category--resilience .exact-category__photo', `assets/photos/home-story-immunity.jpg?v=${build}`, 'center 46%');

    const applyEmbedded = () => {
      setPhoto('.exact-category--recovery .exact-category__photo', window.IMMUNALIA_NIGHT_PHOTO, 'center 45%');
      setPhoto('.exact-category--family .exact-category__photo', window.IMMUNALIA_FAMILY_PHOTO, 'center 45%');
    };

    if (window.IMMUNALIA_NIGHT_PHOTO && window.IMMUNALIA_FAMILY_PHOTO) {
      applyEmbedded();
      return;
    }

    Promise.all([
      loadScript('immunalia-night-story-photo', `assets/js/night-premium-evening-photo.js?v=${build}`),
      loadScript('immunalia-family-story-photo', `assets/js/family-golden-hour-photo.js?v=${build}`)
    ]).then(applyEmbedded).catch(() => {
      document.documentElement.classList.add('homepage-story-photo-error');
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPhotos, { once: true });
  } else {
    applyPhotos();
  }
})();
