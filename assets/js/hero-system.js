(() => {
  const stage=document.querySelector('[data-system-stage]');
  if(stage&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const items=[...stage.querySelectorAll('[data-depth]')];
    const move=(x,y)=>{stage.style.setProperty('--stage-rx',`${(-y*1.5).toFixed(2)}deg`);stage.style.setProperty('--stage-ry',`${(x*1.5).toFixed(2)}deg`);items.forEach(item=>{const d=Number(item.dataset.depth||1);item.style.setProperty('--offset-x',`${(x*d*3.4).toFixed(2)}px`);item.style.setProperty('--offset-y',`${(y*d*3.4).toFixed(2)}px`)})};
    stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();move(((e.clientX-r.left)/r.width-.5)*2,((e.clientY-r.top)/r.height-.5)*2)},{passive:true});
    stage.addEventListener('pointerleave',()=>move(0,0),{passive:true});
  }

  const hero=document.querySelector('.brand-hero');
  if(!hero)return;
  const load=(id,src)=>new Promise((resolve,reject)=>{const old=document.getElementById(id);if(old){resolve();return}const s=document.createElement('script');s.id=id;s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
  if(!document.getElementById('homepage-commercial-style')){const l=document.createElement('link');l.id='homepage-commercial-style';l.rel='stylesheet';l.href='homepage-commercial.css?v=20260803-story2';document.head.appendChild(l)}
  document.querySelectorAll('.home-products-overview,.home-life-feature,.home-category-router,.home-story').forEach(el=>el.remove());

  const en=document.documentElement.lang==='en'||location.pathname.endsWith('index-en.html');
  const copy=en?{
    kicker:'A day with Immunalia',title:'Stories begin with everyday care.',intro:'One day brings different needs — energy, performance, resilience, recovery and time for the people closest to us.',cta:'View suitable products',all:'View all products',
    items:[
      ['energy','Morning begins in motion.','Energy for a rhythm you set yourself.','produkty-en.html#flow'],
      ['performance','When the day asks for more.','For demanding activity, focus and exceptional physical load.','produkty-en.html#ultra'],
      ['immunity','Care begins on ordinary days.','An everyday foundation for natural resilience.','produkty-en.html#shield'],
      ['recovery','Evening belongs to recovery.','Calm, slowing down and space for the next day.','produkty-en.html#night'],
      ['family','What matters most is shared.','Everyday care for the whole family.','produkty-en.html#balance']
    ]
  }:{
    kicker:'Jeden den s Immunalia',title:'Příběhy začínají každodenní péčí.',intro:'Jeden den přináší různé potřeby — energii, výkon, odolnost, regeneraci i čas pro ty nejbližší.',cta:'Zobrazit vhodné produkty',all:'Zobrazit všechny produkty',
    items:[
      ['energy','Ráno začíná pohybem.','Energie pro rytmus, který si určujete sami.','produkty.html#flow'],
      ['performance','Když je potřeba víc.','Pro náročnou aktivitu, soustředění a mimořádnou fyzickou zátěž.','produkty.html#ultra'],
      ['immunity','Péče začíná v běžných dnech.','Každodenní základ pro přirozenou odolnost.','produkty.html#shield'],
      ['recovery','Večer patří obnově.','Klid, zpomalení a prostor pro další den.','produkty.html#night'],
      ['family','To důležité sdílíme.','Každodenní péče pro celou rodinu.','produkty.html#balance']
    ]
  };

  const section=document.createElement('section');section.className='home-story';section.setAttribute('aria-label',copy.title);section.innerHTML=`<div class="home-story__intro"><p class="section-kicker">${copy.kicker}</p><h2>${copy.title}</h2><p>${copy.intro}</p></div><div class="home-story__sequence">${copy.items.map((item,index)=>`<a class="home-story__panel home-story__panel--${item[0]}" href="${item[3]}"><span class="home-story__shade"></span><span class="home-story__number">0${index+1}</span><span class="home-story__copy"><strong>${item[1]}</strong><span>${item[2]}</span><em>${copy.cta} →</em></span></a>`).join('')}</div><div class="home-story__actions"><a class="button primary" href="${en?'produkty-en.html':'produkty.html'}">${copy.all}</a></div>`;
  hero.insertAdjacentElement('afterend',section);

  const localPhotos={
    energy:'assets/photos/home-story-energy.jpg?v=20260803-story2',
    performance:'assets/photos/home-story-performance.jpg?v=20260803-story2',
    immunity:'assets/photos/home-story-immunity.jpg?v=20260803-story2'
  };
  Object.entries(localPhotos).forEach(([key,url])=>{const el=section.querySelector(`.home-story__panel--${key}`);if(el)el.style.backgroundImage=`url("${url}")`});

  Promise.all([load('family-story-data','assets/js/family-golden-hour-photo.js?v=20260803-story2'),load('recovery-story-data','assets/js/night-premium-evening-photo.js?v=20260803-story2')]).then(()=>{
    const family=section.querySelector('.home-story__panel--family');const recovery=section.querySelector('.home-story__panel--recovery');
    if(family&&window.IMMUNALIA_FAMILY_PHOTO)family.style.backgroundImage=`url("${window.IMMUNALIA_FAMILY_PHOTO}")`;
    if(recovery&&window.IMMUNALIA_NIGHT_PHOTO)recovery.style.backgroundImage=`url("${window.IMMUNALIA_NIGHT_PHOTO}")`;
  }).catch(()=>{});
})();