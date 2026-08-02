(() => {
  const loadStylesheet=(id,href)=>{if(document.getElementById(id))return;const l=document.createElement('link');l.id=id;l.rel='stylesheet';l.href=href;document.head.appendChild(l)};
  const loadScript=(id,src)=>new Promise((resolve,reject)=>{const old=document.getElementById(id);if(old){if(old.dataset.loaded==='true')resolve();else old.addEventListener('load',resolve,{once:true});return}const s=document.createElement('script');s.id=id;s.src=src;s.async=false;s.addEventListener('load',()=>{s.dataset.loaded='true';resolve()},{once:true});s.addEventListener('error',reject,{once:true});document.head.appendChild(s)});
  const fileName=location.pathname.split('/').pop()||'index.html';
  const isEnglish=fileName.endsWith('-en.html');
  const isHomepage=fileName==='index.html'||fileName==='index-en.html';
  const isProducts=document.body.classList.contains('products-page');
  const embeddedPhotoCache=new Map();

  const loadEmbeddedPhoto=svgUrl=>{
    if(embeddedPhotoCache.has(svgUrl))return embeddedPhotoCache.get(svgUrl);
    const p=fetch(svgUrl,{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error(String(r.status));return r.text()}).then(t=>{const m=t.match(/data:image\/(?:jpeg|jpg);base64,[A-Za-z0-9+/=]+/);if(!m)throw new Error('JPEG not found');return m[0]});
    embeddedPhotoCache.set(svgUrl,p);return p;
  };

  const setCardPhoto=(selector,dataUrl,position='center 48%')=>{
    const el=document.querySelector(selector);if(!el||!dataUrl)return;
    el.style.setProperty('--direct-product-photo',`url("${dataUrl}")`);
    el.style.setProperty('--direct-photo-position',position);
    el.classList.add('has-direct-photo');
  };

  const injectHomeLifeFeature=async()=>{
    if(document.querySelector('.home-life-feature'))return;
    const hero=document.querySelector('.brand-hero');if(!hero)return;
    const copy=isEnglish?{
      aria:'Active life and a shared journey',kicker:'Life in motion',title:'Balance is not stillness. It is the ability to keep moving.',intro:'Every day has a different rhythm — performance, recovery, closeness and space for yourself. Immunalia is created for life as it is actually lived.',firstAlt:'A family together in warm golden-hour light',firstTitle:'Every shared journey has its own rhythm.',firstText:'Closeness, energy and everyday moments that truly matter.',secondAlt:'Professional athletes in demanding endurance and strength disciplines',secondTitle:'Live fully. Without unnecessary noise.',secondText:'A premium approach to an active everyday life.'
    }:{
      aria:'Aktivní život a společná cesta',kicker:'Život v pohybu',title:'Rovnováha není klid bez pohybu. Je to schopnost pokračovat.',intro:'Každý den přináší jiný rytmus — výkon, odpočinek, blízkost i prostor pro sebe. Immunalia vzniká pro život, který se skutečně žije.',firstAlt:'Rodina společně v teplém světle zlaté hodiny',firstTitle:'Společná cesta má vlastní rytmus.',firstText:'Blízkost, energie a každodenní chvíle, které mají skutečný význam.',secondAlt:'Profesionální sportovci při náročných vytrvalostních a silových výkonech',secondTitle:'Žít naplno. Bez zbytečného hluku.',secondText:'Prémiový přístup pro aktivní každodennost.'
    };
    const section=document.createElement('section');section.className='home-life-feature';section.setAttribute('aria-label',copy.aria);section.innerHTML=`<div class="home-life-feature__intro"><div><p class="section-kicker">${copy.kicker}</p><h2>${copy.title}</h2></div><p>${copy.intro}</p></div><div class="home-life-feature__grid"><article class="home-life-feature__card"><div class="home-life-feature__media" data-home-photo="family" role="img" aria-label="${copy.firstAlt}"></div><div class="home-life-feature__caption"><strong>${copy.firstTitle}</strong><span>${copy.firstText}</span></div></article><article class="home-life-feature__card home-life-feature__card--secondary"><div class="home-life-feature__media" data-home-photo="ultra" role="img" aria-label="${copy.secondAlt}"></div><div class="home-life-feature__caption"><strong>${copy.secondTitle}</strong><span>${copy.secondText}</span></div></article></div>`;
    hero.insertAdjacentElement('afterend',section);
    await loadScript('family-golden-hour-photo','assets/js/family-golden-hour-photo.js?v=20260802-final5');
    const family=section.querySelector('[data-home-photo="family"]');if(family&&window.IMMUNALIA_FAMILY_PHOTO){family.style.backgroundImage=`url("${window.IMMUNALIA_FAMILY_PHOTO}")`;family.classList.add('is-photo-ready')}
    try{const ultra=await loadEmbeddedPhoto('assets/photos/ultra-multisport-v2.svg?v=20260802-final5');const el=section.querySelector('[data-home-photo="ultra"]');if(el){el.style.backgroundImage=`url("${ultra}")`;el.classList.add('is-photo-ready')}}catch(e){console.warn('ULTRA homepage photo failed',e)}
  };

  const applyProductPhotos=async()=>{
    loadStylesheet('product-image-fixes','product-image-fixes.css?v=20260802-final5');
    await Promise.all([
      loadScript('family-golden-hour-photo','assets/js/family-golden-hour-photo.js?v=20260802-final5'),
      loadScript('night-premium-evening-photo','assets/js/night-premium-evening-photo.js?v=20260802-final5')
    ]).catch(e=>console.warn('Premium photos failed',e));
    if(window.IMMUNALIA_FAMILY_PHOTO)setCardPhoto('.lifestyle-family',window.IMMUNALIA_FAMILY_PHOTO,'center 45%');
    if(window.IMMUNALIA_NIGHT_PHOTO){setCardPhoto('.lifestyle-recovery',window.IMMUNALIA_NIGHT_PHOTO,'center 48%');setCardPhoto('#night',window.IMMUNALIA_NIGHT_PHOTO,'center 48%')}
    try{const ultra=await loadEmbeddedPhoto('assets/photos/ultra-multisport-v2.svg?v=20260802-final5');setCardPhoto('.lifestyle-performance',ultra,'center 47%');setCardPhoto('#ultra',ultra,'center 48%')}catch(e){console.warn('ULTRA product photo failed',e)}
    try{
      await loadScript('product-photo-sprite-1','assets/js/product-lifestyle-sprite-part01.js?v=20260802-emotional3');
      await loadScript('product-photo-sprite-2','assets/js/product-lifestyle-sprite-part02.js?v=20260802-emotional3');
      await loadScript('product-photo-sprite-3','assets/js/product-lifestyle-sprite-part03.js?v=20260802-emotional3');
      await loadScript('product-photo-sprite-build','assets/js/product-lifestyle-sprite-build.js?v=20260802-emotional3');
      const src=window.IMMUNALIA_PRODUCT_PHOTO_SPRITE;if(!src)return;const img=new Image();img.onload=()=>{const w=Math.round(img.naturalWidth/3),h=img.naturalHeight,cache=[];const crop=c=>{if(cache[c])return cache[c];const cv=document.createElement('canvas');cv.width=w;cv.height=h;const x=cv.getContext('2d');x.drawImage(img,c*w,0,w,h,0,0,w,h);return cache[c]=`url("${cv.toDataURL('image/jpeg',.9)}")`};[{s:'#balance',c:2,p:'52% 44%',z:'165%'},{s:'#restart',c:1,p:'48% 39%',z:'150%'},{s:'#shield',c:2,p:'82% 47%',z:'180%'},{s:'#flow',c:0,p:'26% 47%',z:'155%'}].forEach(o=>{const el=document.querySelector(o.s);if(!el)return;el.style.setProperty('--generated-product-photo',crop(o.c));el.style.setProperty('--generated-photo-position',o.p);el.style.setProperty('--generated-photo-size',o.z);el.classList.add('has-generated-photo')})};img.src=src;
    }catch(e){console.warn('Supplementary photography failed',e)}
  };

  if(isHomepage){loadStylesheet('home-visual-fixes','home-visual-fixes.css?v=20260802-final5');injectHomeLifeFeature()}
  if(isProducts)applyProductPhotos();

  const header=document.querySelector('[data-site-header]'),toggle=document.querySelector('[data-nav-toggle]'),nav=document.getElementById('site-nav');if(!header||!toggle||!nav)return;const close=()=>{header.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')};toggle.addEventListener('click',()=>{const open=header.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});nav.addEventListener('click',e=>{if(e.target instanceof HTMLAnchorElement)close()});addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
