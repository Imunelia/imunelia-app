(() => {
  const stage = document.querySelector('[data-system-stage]');
  if (stage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const depthItems=[...stage.querySelectorAll('[data-depth]')];
    const applyPointer=(x,y)=>{stage.style.setProperty('--stage-rx',`${(-y*1.5).toFixed(2)}deg`);stage.style.setProperty('--stage-ry',`${(x*1.5).toFixed(2)}deg`);stage.style.setProperty('--network-x',`${(x*8).toFixed(2)}px`);stage.style.setProperty('--network-y',`${(y*8).toFixed(2)}px`);depthItems.forEach(item=>{const depth=Number(item.dataset.depth||1);item.style.setProperty('--offset-x',`${(x*depth*3.4).toFixed(2)}px`);item.style.setProperty('--offset-y',`${(y*depth*3.4).toFixed(2)}px`)})};
    stage.addEventListener('pointermove',event=>{const rect=stage.getBoundingClientRect();applyPointer(((event.clientX-rect.left)/rect.width-.5)*2,((event.clientY-rect.top)/rect.height-.5)*2)},{passive:true});
    stage.addEventListener('pointerleave',()=>applyPointer(0,0),{passive:true});
  }

  const homepage=document.querySelector('.brand-hero');
  if(!homepage)return;
  if(!document.getElementById('homepage-commercial-style')){const stylesheet=document.createElement('link');stylesheet.id='homepage-commercial-style';stylesheet.rel='stylesheet';stylesheet.href='homepage-commercial.css?v=20260802-quality2';document.head.appendChild(stylesheet)}

  const isEnglish=document.documentElement.lang==='en'||location.pathname.endsWith('index-en.html');
  const heroText=homepage.querySelector('.hero-text');
  const mainParagraph=heroText?[...heroText.children].find(element=>element.tagName==='P'&&!element.classList.contains('eyebrow')):null;
  if(mainParagraph){mainParagraph.classList.add('hero-commercial-intro');mainParagraph.textContent=isEnglish?'Premium food supplements for everyday balance, resilience, energy, recovery and demanding performance. Six clear product lines for different daily rhythms.':'Prémiové doplňky stravy pro každodenní rovnováhu, odolnost, energii, regeneraci a náročný výkon. Šest přehledných produktových linií pro různé životní rytmy.'}

  const products=isEnglish?[
    {id:'balance',name:'Balance',label:'Everyday balance',text:'A calm daily foundation for your regular routine.',image:'assets/imunelia-balance-product.svg?v=20260802-quality2'},
    {id:'restart',name:'Restart',label:'Return to rhythm',text:'For periods when you want to restore your everyday momentum.',image:'assets/imunelia-restart-product.svg?v=20260802-quality2'},
    {id:'shield',name:'Shield',label:'Resilience',text:'A focused line for everyday care and natural resilience.',image:'assets/imunelia-shield-product.svg?v=20260802-quality2'},
    {id:'flow',name:'Flow',label:'Energy',text:'For active days, vitality and a sustained daily rhythm.',image:'assets/imunelia-flow-product.svg?v=20260802-quality2'},
    {id:'night',name:'Night',label:'Evening recovery',text:'A calm evening ritual for rest and the next day.',image:'assets/imunelia-night-product.svg?v=20260802-quality2'},
    {id:'ultra',name:'ULTRA',label:'Demanding performance',text:'The premium line for exceptional physical demand and sport.',image:'assets/immunalia-ultra-product.jpg?v=20260711-ultraexact1'}
  ]:[
    {id:'balance',name:'Balance',label:'Každodenní rovnováha',text:'Klidný základ pro pravidelný každodenní režim.',image:'assets/imunelia-balance-product.svg?v=20260802-quality2'},
    {id:'restart',name:'Restart',label:'Návrat k rytmu',text:'Pro období, kdy se chcete vrátit ke svému běžnému tempu.',image:'assets/imunelia-restart-product.svg?v=20260802-quality2'},
    {id:'shield',name:'Shield',label:'Odolnost',text:'Cílená linie pro každodenní péči a přirozenou odolnost.',image:'assets/imunelia-shield-product.svg?v=20260802-quality2'},
    {id:'flow',name:'Flow',label:'Energie',text:'Pro aktivní dny, vitalitu a stabilní každodenní rytmus.',image:'assets/imunelia-flow-product.svg?v=20260802-quality2'},
    {id:'night',name:'Night',label:'Večerní regenerace',text:'Klidný večerní rituál pro odpočinek a další den.',image:'assets/imunelia-night-product.svg?v=20260802-quality2'},
    {id:'ultra',name:'ULTRA',label:'Náročný výkon',text:'Prémiová linie pro mimořádnou fyzickou zátěž a sport.',image:'assets/immunalia-ultra-product.jpg?v=20260711-ultraexact1'}
  ];

  if(!document.querySelector('.home-products-overview')){
    const section=document.createElement('section');section.className='home-products-overview';section.setAttribute('aria-label',isEnglish?'Immunalia product lines':'Produktové linie Immunalia');section.innerHTML=`<div class="home-products-heading"><div><p class="section-kicker">${isEnglish?'Immunalia collection':'Kolekce Immunalia'}</p><h2>${isEnglish?'See what you can choose.':'Hned víte, co si můžete vybrat.'}</h2></div><p>${isEnglish?'Six distinct lines. Choose according to your current daily rhythm, or open the complete product comparison.':'Šest odlišných linií. Vyberte si podle svého aktuálního rytmu, nebo otevřete kompletní porovnání produktů.'}</p></div><div class="home-products-grid">${products.map(product=>`<a class="home-product-card" href="${isEnglish?'produkty-en.html':'produkty.html'}#${product.id}"><span class="home-product-media" data-product-name="${product.name}"><img src="${product.image}" alt="${isEnglish?'Immunalia':'Obal Immunalia'} ${product.name}" loading="eager" decoding="async"></span><span class="home-product-copy"><small>${product.label}</small><h3>${product.name}</h3><p>${product.text}</p><span class="home-product-link">${isEnglish?'View product →':'Zobrazit produkt →'}</span></span></a>`).join('')}</div><div class="home-products-actions"><a class="button primary" href="${isEnglish?'produkty-en.html':'produkty.html'}">${isEnglish?'Compare all products':'Porovnat všechny produkty'}</a></div>`;
    homepage.insertAdjacentElement('afterend',section);
    section.querySelectorAll('.home-product-media img').forEach(img=>{const media=img.parentElement;const fail=()=>{img.hidden=true;media.classList.add('image-fallback')};img.addEventListener('error',fail,{once:true});if(img.complete&&img.naturalWidth===0)fail()});
  }
})();
