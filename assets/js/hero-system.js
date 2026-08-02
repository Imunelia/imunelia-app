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
  if(!document.getElementById('homepage-commercial-style')){const stylesheet=document.createElement('link');stylesheet.id='homepage-commercial-style';stylesheet.rel='stylesheet';stylesheet.href='homepage-commercial.css?v=20260802-router1';document.head.appendChild(stylesheet)}

  document.querySelectorAll('.home-products-overview,.home-life-feature').forEach(el=>el.remove());

  const isEnglish=document.documentElement.lang==='en'||location.pathname.endsWith('index-en.html');
  const heroText=homepage.querySelector('.hero-text');
  const mainParagraph=heroText?[...heroText.children].find(element=>element.tagName==='P'&&!element.classList.contains('eyebrow')):null;
  if(mainParagraph){mainParagraph.classList.add('hero-commercial-intro');mainParagraph.textContent=isEnglish?'Premium food supplements for everyday balance, resilience, energy and recovery. Start with what your day needs most.':'Prémiové doplňky stravy pro každodenní rovnováhu, odolnost, energii a regeneraci. Začněte podle toho, co právě potřebuje váš den.'}

  const routes=isEnglish?[
    {slug:'joints',title:'Joints',text:'Movement, comfort and an active everyday rhythm.',href:'produkty-en.html#restart'},
    {slug:'immunity',title:'Immunity',text:'Everyday care focused on natural resilience.',href:'produkty-en.html#shield'},
    {slug:'sleep',title:'Sleep',text:'Evening calm, recovery and space for the next day.',href:'produkty-en.html#night'},
    {slug:'energy',title:'Energy',text:'Vitality and momentum for active days.',href:'produkty-en.html#flow'}
  ]:[
    {slug:'joints',title:'Klouby',text:'Pohyb, komfort a aktivní každodenní rytmus.',href:'produkty.html#restart'},
    {slug:'immunity',title:'Imunita',text:'Každodenní péče zaměřená na přirozenou odolnost.',href:'produkty.html#shield'},
    {slug:'sleep',title:'Spánek',text:'Večerní klid, regenerace a prostor pro další den.',href:'produkty.html#night'},
    {slug:'energy',title:'Energie',text:'Vitalita a tempo pro aktivní dny.',href:'produkty.html#flow'}
  ];

  const section=document.createElement('section');
  section.className='home-category-router';
  section.setAttribute('aria-label',isEnglish?'Choose by everyday need':'Vyberte podle každodenní potřeby');
  section.innerHTML=`<div class="home-router-heading"><p class="section-kicker">${isEnglish?'Choose by your rhythm':'Vyberte podle svého rytmu'}</p><h2>${isEnglish?'Stories begin with everyday care.':'Příběhy začínají každodenní péčí.'}</h2><p>${isEnglish?'Four clear starting points. The complete product range remains in the Products section.':'Čtyři jasné vstupy. Kompletní nabídka a jednotlivé produktové řady zůstávají přehledně v záložce Produkty.'}</p></div><div class="home-router-grid">${routes.map(route=>`<a class="home-router-card home-router-card--${route.slug}" href="${route.href}"><span class="home-router-overlay"></span><span class="home-router-copy"><small>${isEnglish?'Explore':'Objevte'}</small><strong>${route.title}</strong><span>${route.text}</span><em>${isEnglish?'View suitable products →':'Zobrazit vhodné produkty →'}</em></span></a>`).join('')}</div><div class="home-router-actions"><a class="button primary" href="${isEnglish?'produkty-en.html':'produkty.html'}">${isEnglish?'View all products':'Zobrazit všechny produkty'}</a></div>`;
  homepage.insertAdjacentElement('afterend',section);
})();