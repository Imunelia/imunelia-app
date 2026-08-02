(() => {
  const loadStylesheet=(id,href)=>{if(document.getElementById(id))return;const l=document.createElement('link');l.id=id;l.rel='stylesheet';l.href=href;document.head.appendChild(l)};
  const loadScript=(id,src)=>new Promise((resolve,reject)=>{const old=document.getElementById(id);if(old){resolve();return}const s=document.createElement('script');s.id=id;s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
  const fileName=location.pathname.split('/').pop()||'index.html';
  const isHomepage=fileName==='index.html'||fileName==='index-en.html';
  const isProducts=document.body.classList.contains('products-page');
  document.querySelectorAll('a[href="veda.html"]').forEach(a=>a.textContent='Kvalita a vývoj');
  document.querySelectorAll('a[href="veda-en.html"]').forEach(a=>a.textContent='Quality & Development');

  const setPhoto=(selector,data,position='center 48%')=>document.querySelectorAll(selector).forEach(el=>{if(!data)return;el.style.setProperty('--direct-product-photo',`url("${data}")`);el.style.setProperty('--direct-photo-position',position);el.classList.add('has-direct-photo')});

  const syncEnglishProducts=()=>{if(fileName!=='produkty-en.html'||document.querySelector('.product-lifestyle'))return;document.body.classList.add('premium-collection-site');loadStylesheet('product-emotion','product-emotion.css?v=20260803-story1');const collection=document.querySelector('#collection');if(!collection)return;const section=document.createElement('section');section.className='product-lifestyle';section.innerHTML='<div class="product-lifestyle-head"><div><p class="section-kicker">Choose by your rhythm</p><h2>Stories begin with everyday care.</h2></div><p>Five clear branches — immunity, energy, performance, recovery and care for the whole family.</p></div><div class="product-lifestyle-grid"><a class="product-lifestyle-card lifestyle-immunity" href="#shield"><span class="product-lifestyle-copy"><strong>Immunity</strong><span>Everyday support for natural resilience.</span><em>View products</em></span></a><a class="product-lifestyle-card lifestyle-energy" href="#flow"><span class="product-lifestyle-copy"><strong>Energy</strong><span>Vitality for active days.</span><em>View products</em></span></a><a class="product-lifestyle-card lifestyle-performance" href="#ultra"><span class="product-lifestyle-copy"><strong>Performance</strong><span>For exceptional physical demand.</span><em>View products</em></span></a><a class="product-lifestyle-card lifestyle-recovery" href="#night"><span class="product-lifestyle-copy"><strong>Recovery</strong><span>Evening calm and renewal.</span><em>View products</em></span></a><a class="product-lifestyle-card lifestyle-family" href="#balance"><span class="product-lifestyle-copy"><strong>For the whole family</strong><span>Everyday care for the people who matter most.</span><em>View products</em></span></a></div>';collection.insertAdjacentElement('beforebegin',section)};

  const applyProductPhotos=async()=>{
    loadStylesheet('product-image-fixes','product-image-fixes.css?v=20260803-story1');
    await Promise.all([loadScript('family-photo-data','assets/js/family-golden-hour-photo.js?v=20260803-story1'),loadScript('night-photo-data','assets/js/night-premium-evening-photo.js?v=20260803-story1')]).catch(()=>{});
    if(window.IMMUNALIA_FAMILY_PHOTO){setPhoto('.lifestyle-family',window.IMMUNALIA_FAMILY_PHOTO,'center 44%');setPhoto('#balance',window.IMMUNALIA_FAMILY_PHOTO,'center 44%')}
    if(window.IMMUNALIA_NIGHT_PHOTO){setPhoto('.lifestyle-recovery',window.IMMUNALIA_NIGHT_PHOTO,'center 48%');setPhoto('#night',window.IMMUNALIA_NIGHT_PHOTO,'center 48%')}
  };

  if(isHomepage)document.querySelectorAll('.home-life-feature,.home-category-router,.home-products-overview').forEach(el=>el.remove());
  if(isProducts){syncEnglishProducts();applyProductPhotos()}

  const header=document.querySelector('[data-site-header]'),toggle=document.querySelector('[data-nav-toggle]'),nav=document.getElementById('site-nav');if(!header||!toggle||!nav)return;const close=()=>{header.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')};toggle.addEventListener('click',()=>{const open=header.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});nav.addEventListener('click',e=>{if(e.target instanceof HTMLAnchorElement)close()});addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();