(() => {
  const stage=document.querySelector('[data-system-stage]');
  if(stage&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const depthItems=[...stage.querySelectorAll('[data-depth]')];
    const applyPointer=(x,y)=>{stage.style.setProperty('--stage-rx',`${(-y*1.5).toFixed(2)}deg`);stage.style.setProperty('--stage-ry',`${(x*1.5).toFixed(2)}deg`);stage.style.setProperty('--network-x',`${(x*8).toFixed(2)}px`);stage.style.setProperty('--network-y',`${(y*8).toFixed(2)}px`);depthItems.forEach(item=>{const depth=Number(item.dataset.depth||1);item.style.setProperty('--offset-x',`${(x*depth*3.4).toFixed(2)}px`);item.style.setProperty('--offset-y',`${(y*depth*3.4).toFixed(2)}px`)})};
    stage.addEventListener('pointermove',event=>{const rect=stage.getBoundingClientRect();applyPointer(((event.clientX-rect.left)/rect.width-.5)*2,((event.clientY-rect.top)/rect.height-.5)*2)},{passive:true});
    stage.addEventListener('pointerleave',()=>applyPointer(0,0),{passive:true});
  }

  const homepage=document.querySelector('.brand-hero');
  if(!homepage)return;
  if(!document.getElementById('homepage-commercial-style')){const stylesheet=document.createElement('link');stylesheet.id='homepage-commercial-style';stylesheet.rel='stylesheet';stylesheet.href='homepage-commercial.css?v=20260802-router2';document.head.appendChild(stylesheet)}

  document.querySelectorAll('.home-products-overview,.home-life-feature,.home-category-router').forEach(el=>el.remove());

  const isEnglish=document.documentElement.lang==='en'||location.pathname.endsWith('index-en.html');
  const heroText=homepage.querySelector('.hero-text');
  const mainParagraph=heroText?[...heroText.children].find(element=>element.tagName==='P'&&!element.classList.contains('eyebrow')):null;
  if(mainParagraph){mainParagraph.classList.add('hero-commercial-intro');mainParagraph.textContent=isEnglish?'Premium food supplements for immunity, energy, performance, recovery and everyday family care. Start with the area that best matches your current rhythm.':'Prémiové doplňky stravy pro imunitu, energii, výkon, regeneraci a každodenní péči o celou rodinu. Začněte oblastí, která nejlépe odpovídá vašemu současnému rytmu.'}

  const routes=isEnglish?[
    {slug:'immunity',title:'Immunity',text:'Everyday care focused on natural resilience.',href:'produkty-en.html#shield'},
    {slug:'energy',title:'Energy',text:'Vitality and momentum for active days.',href:'produkty-en.html#flow'},
    {slug:'performance',title:'Performance',text:'Support for demanding activity and exceptional physical load.',href:'produkty-en.html#ultra'},
    {slug:'recovery',title:'Recovery',text:'Space for rest, evening calm and return to rhythm.',href:'produkty-en.html#night'},
    {slug:'family',title:'For the whole family',text:'Everyday care for different ages and daily routines.',href:'produkty-en.html#balance'}
  ]:[
    {slug:'immunity',title:'Imunita',text:'Každodenní péče zaměřená na přirozenou odolnost.',href:'produkty.html#shield'},
    {slug:'energy',title:'Energie',text:'Vitalita a tempo pro aktivní dny.',href:'produkty.html#flow'},
    {slug:'performance',title:'Výkon',text:'Podpora pro náročnou aktivitu a mimořádnou fyzickou zátěž.',href:'produkty.html#ultra'},
    {slug:'recovery',title:'Regenerace',text:'Prostor pro odpočinek, večerní klid a návrat k rytmu.',href:'produkty.html#night'},
    {slug:'family',title:'Pro celou rodinu',text:'Každodenní péče pro různé věkové skupiny a životní režimy.',href:'produkty.html#balance'}
  ];

  const section=document.createElement('section');
  section.className='home-category-router';
  section.setAttribute('aria-label',isEnglish?'Choose by everyday need':'Vyberte podle každodenní potřeby');
  section.innerHTML=`<div class="home-router-heading"><p class="section-kicker">${isEnglish?'Choose by your rhythm':'Vyberte podle svého rytmu'}</p><h2>${isEnglish?'Stories begin with everyday care.':'Příběhy začínají každodenní péčí.'}</h2><p>${isEnglish?'Five clear branches. The complete product range remains in the Products section.':'Pět základních větví. Kompletní nabídka a jednotlivé produktové řady zůstávají přehledně v záložce Produkty.'}</p></div><div class="home-router-grid">${routes.map(route=>`<a class="home-router-card home-router-card--${route.slug}" href="${route.href}"><span class="home-router-overlay"></span><span class="home-router-copy"><small>${isEnglish?'Explore':'Objevte'}</small><strong>${route.title}</strong><span>${route.text}</span><em>${isEnglish?'View suitable products →':'Zobrazit vhodné produkty →'}</em></span></a>`).join('')}</div><div class="home-router-actions"><a class="button primary" href="${isEnglish?'produkty-en.html':'produkty.html'}">${isEnglish?'View all products':'Zobrazit všechny produkty'}</a></div>`;
  homepage.insertAdjacentElement('afterend',section);
})();