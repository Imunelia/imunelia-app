(() => {
  'use strict';

  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('site-nav');

  if (header && toggle && nav) {
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
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('review') === '1') localStorage.setItem('immunalia-review', '1');
  if (params.get('review') === '0') localStorage.removeItem('immunalia-review');

  const reviewEnabled = localStorage.getItem('immunalia-review') === '1';
  const fileName = window.location.pathname.split('/').pop() || 'index.html';
  const isHomepage = fileName === 'index.html' || fileName === '';
  if (!reviewEnabled || !isHomepage || !header) return;

  const style = document.createElement('style');
  style.textContent = `
    .im-version-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:9px 13px;border:1px solid rgba(184,139,67,.45);border-radius:9px;background:#fff;color:#08295b;font:800 .72rem/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
    .im-version-button svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
    .im-version-panel{position:fixed;z-index:10000;top:94px;right:18px;width:min(360px,calc(100vw - 28px));padding:18px;border:1px solid rgba(184,139,67,.35);border-radius:14px;background:rgba(255,255,255,.98);box-shadow:0 24px 70px rgba(3,25,54,.22);backdrop-filter:blur(18px);color:#26364e}
    .im-version-panel[hidden]{display:none}
    .im-version-panel h2{margin:0 0 6px;color:#08295b;font:400 1.45rem/1.15 Georgia,serif}
    .im-version-panel>p{margin:0 0 14px;color:#687182;font:400 .9rem/1.45 Arial,sans-serif}
    .im-version-list{display:grid;gap:8px}
    .im-version-item{display:block;padding:11px 12px;border:1px solid #e4d8c5;border-radius:9px;background:#fbfaf7;color:#08295b;font:700 .82rem/1.35 Arial,sans-serif}
    .im-version-item small{display:block;margin-top:3px;color:#687182;font-weight:400}
    .im-version-note{margin-top:12px;padding-top:12px;border-top:1px solid #e4d8c5;color:#687182;font:400 .78rem/1.45 Arial,sans-serif}
    .im-version-close{width:100%;margin-top:10px;min-height:40px;border:0;border-radius:8px;background:#08295b;color:#fff;font:800 .72rem/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}
    @media(max-width:980px){.im-version-button{order:3;padding:8px 10px}.im-version-panel{top:86px;right:12px}}
  `;
  document.head.appendChild(style);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'im-version-button';
  button.setAttribute('aria-expanded', 'false');
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/><path d="M7 4v6M12 9v6M17 14v6"/></svg><span>Verze</span>';

  const panel = document.createElement('aside');
  panel.className = 'im-version-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Kontrola verzí webu');
  panel.innerHTML = `
    <h2>Verze webu</h2>
    <p>Neveřejný kontrolní panel. Běžní návštěvníci ho bez parametru <strong>?review=1</strong> neuvidí.</p>
    <div class="im-version-list">
      <a class="im-version-item" href="index.html?review=1">Aktuální MAIN<small>Jediná větev používaná pro publikování.</small></a>
      <a class="im-version-item" href="produkty.html?review=1">Aktuální produkty<small>Kontrola produktové stránky v MAIN.</small></a>
      <a class="im-version-item" href="https://github.com/Imunelia/imunelia-app/tree/archive-main-before-single-branch-20260804" target="_blank" rel="noopener">Archiv původního MAIN<small>Stav před přechodem na jedinou větev.</small></a>
      <a class="im-version-item" href="https://github.com/Imunelia/imunelia-app/tree/archive-draft-before-single-branch-20260804" target="_blank" rel="noopener">Archiv posledního DRAFT<small>Záloha před odstavením draftu.</small></a>
      <a class="im-version-item" href="https://github.com/Imunelia/imunelia-app/commits/main" target="_blank" rel="noopener">Historie aktualizací<small>Každou změnu lze vrátit podle commitu.</small></a>
    </div>
    <div class="im-version-note">Přepínač slouží ke kontrole. Skutečné obnovení provedeme přesunem větve MAIN na vybraný archivní commit; tím se nic nemaže.</div>
    <button class="im-version-close" type="button">Skrýt panel verzí</button>
  `;

  header.insertBefore(button, toggle || null);
  document.body.appendChild(panel);

  const setOpen = open => {
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
  };

  button.addEventListener('click', () => setOpen(panel.hidden));
  panel.querySelector('.im-version-close')?.addEventListener('click', () => {
    localStorage.removeItem('immunalia-review');
    setOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('review');
    history.replaceState({}, '', url);
    button.remove();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setOpen(false);
  });
})();
