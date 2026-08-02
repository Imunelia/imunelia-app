(() => {
  const loadStylesheet=(id,href)=>{if(document.getElementById(id))return;const l=document.createElement('link');l.id=id;l.rel='stylesheet';l.href=href;document.head.appendChild(l)};
  const loadScript=(id,src)=>new Promise((resolve,reject)=>{const old=document.getElementById(id);if(old){if(old.dataset.loaded==='true')resolve();else old.addEventListener('load',resolve,{once:true});return}const s=document.createElement('script');s.id=id;s.src=src;s.async=false;s.addEventListener('load',()=>{s.dataset.loaded='true';resolve()},{once:true});s.addEventListener('error',reject,{once:true});document.head.appendChild(s)});
  const fileName=location.pathname.split('/').pop()||'index.html';
  const isEnglish=document.documentElement.lang==='en'||fileName.endsWith('-en.html');
  const isHomepage=fileName==='index.html'||fileName==='index-en.html';
  const isProducts=document.body.classList.contains('products-page');
  const embeddedPhotoCache=new Map();

  document.querySelectorAll('a[href="veda.html"]').forEach(a=>a.textContent='Kvalita a vývoj');
  document.querySelectorAll('a[href="veda-en.html"]').forEach(a=>a.textContent='Quality & Development');

  const loadEmbeddedPhoto=svgUrl=>{if(embeddedPhotoCache.has(svgUrl))return embeddedPhotoCache.get(svgUrl);const p=fetch(svgUrl,{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error(String(r.status));return r.text()}).then(t=>{const m=t.match(/data:image\/(?:jpeg|jpg);base64,[A-Za-z0-9+/=]+/);if(!m)throw new Error('JPEG not found');return m[0]});embeddedPhotoCache.set(svgUrl,p);return p};
  const setCardPhoto=(selector,dataUrl,position='center 48%')=>{document.querySelectorAll(selector).forEach(el=>{if(!dataUrl)return;el.style.setProperty('--direct-product-photo',`url("${dataUrl}")`);el.style.setProperty('--direct-photo-position',position);el.classList.add('has-direct-photo')})};

  const syncEnglishProducts=()=>{if(fileName!=='produkty-en.html')return;document.body.classList.add('premium-collection-site');loadStylesheet('product-emotion','product-emotion.css?v=20260802-quality1');if(document.querySelector('.product-lifestyle'))return;const collection=document.querySelector('#collection');if(!collection)return;const section=document.createElement('section');section.className='product-lifestyle';section.setAttribute('aria-label','Choose by your daily rhythm');section.innerHTML=`<div class="product-lifestyle-head"><div><p class="section-kicker">Choose by your rhythm</p><h2>Great stories begin with everyday care.</h2></div><p>Five ways into the collection — from resilience and energy to performance, recovery and care for the whole family.</p></div><div class="product-lifestyle-grid"><a class="product-lifestyle-card lifestyle-immunity" href="#shield"><span class="product-lifestyle-copy"><strong>Immunity</strong><span>Everyday support for natural resilience.</span><em>View products</em></span></a><a class="product-lifestyle-card lifestyle-energy" href="#flow"><span class="product-lifestyle-copy"><strong>Energy</strong><span>Vitality and endurance for your daily rhythm.</span><em>View products</em></span></a><a class="product-lifestyle-card lifestyle-performance" href="#ultra"><span class="product-lifestyle-copy"><strong>Performance</strong><span>Support for active routines and exceptional demand.</span><em>View products</em></span></a><a class="product-lifestyle-card lifestyle-recovery" href="#night"><span class="product-lifestyle-copy"><strong>Recovery</strong><span>A calm evening ritual and space to restore.</span><em>View products</em></span></a><a class="product-lifestyle-card lifestyle-family" href="#balance"><span class="product-lifestyle-copy"><strong>For the whole family</strong><span>Everyday care for the people who matter most.</span><em>View products</em></span></a></div>`;collection.insertAdjacentElement('beforebegin',section)};

  const applyProductPhotos=async()=>{loadStylesheet('product-image-fixes','product-image-fixes.css?v=20260802-quality1');await Promise.all([loadScript('family-golden-hour-photo','assets/js/family-golden-hour-photo.js?v=20260802-quality1'),loadScript('night-premium-evening-photo','assets/js/night-premium-evening-photo.js?v=20260802-quality1')]).catch(()=>{});if(window.IMMUNALIA_FAMILY_PHOTO)setCardPhoto('.lifestyle-family',window.IMMUNALIA_FAMILY_PHOTO,'center 45%');if(window.IMMUNALIA_NIGHT_PHOTO){setCardPhoto('.lifestyle-recovery',window.IMMUNALIA_NIGHT_PHOTO,'center 48%');setCardPhoto('#night',window.IMMUNALIA_NIGHT_PHOTO,'center 48%')}try{const ultra=await loadEmbeddedPhoto('assets/photos/ultra-multisport-v2.svg?v=20260802-quality1');setCardPhoto('.lifestyle-performance',ultra,'center 47%');setCardPhoto('#ultra',ultra,'center 48%')}catch(e){console.warn('ULTRA photo failed',e)}};

  if(isHomepage){
    loadStylesheet('home-visual-fixes','home-visual-fixes.css?v=20260802-quality1');
    document.querySelectorAll('.home-life-feature').forEach(el=>el.remove());
  }
  if(isProducts){syncEnglishProducts();applyProductPhotos()}

  document.querySelectorAll('img').forEach(img=>{
    img.addEventListener('error',()=>{
      const media=img.closest('.home-product-media,.system-product-pack');
      if(media)media.classList.add('image-fallback');
      img.hidden=true;
    },{once:true});
  });

  const header=document.querySelector('[data-site-header]'),toggle=document.querySelector('[data-nav-toggle]'),nav=document.getElementById('site-nav');if(!header||!toggle||!nav)return;const close=()=>{header.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')};toggle.addEventListener('click',()=>{const open=header.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});nav.addEventListener('click',e=>{if(e.target instanceof HTMLAnchorElement)close()});addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();