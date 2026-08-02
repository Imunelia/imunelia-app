(function(){
  const products=window.IMMUNALIA_PRO_PRODUCTS||[];
  const grid=document.querySelector('[data-pro-grid]');
  const filters=document.querySelectorAll('[data-pro-filter]');
  if(!grid)return;

  if(!document.getElementById('pro-sprite-style')){
    const style=document.createElement('style');
    style.id='pro-sprite-style';
    style.textContent=`
      .pro-sprite{
        width:min(100%,300px);
        aspect-ratio:4/5;
        background-repeat:no-repeat;
        background-size:500% 300%;
        background-position:var(--pro-x) var(--pro-y);
        border-radius:8px;
        background-color:#f7f7f5;
      }
      .pro-detail-stage .pro-sprite{width:min(100%,360px)}
      @media(max-width:560px){.pro-detail-stage .pro-sprite{width:min(100%,320px)}}
    `;
    document.head.appendChild(style);
  }

  function sprite(p){
    const i=Math.max(0,products.indexOf(p));
    const col=i%5;
    const row=Math.floor(i/5);
    const x=col*25;
    const y=row*50;
    return `<div class="pro-sprite" data-pro-sprite style="--pro-x:${x}%;--pro-y:${y}%" role="img" aria-label="${p.name}"></div>`;
  }

  function applySprite(){
    if(!window.IMMUNALIA_PRO_SPRITE)return;
    document.querySelectorAll('[data-pro-sprite]').forEach(el=>{
      el.style.backgroundImage=`url("${window.IMMUNALIA_PRO_SPRITE}")`;
    });
  }

  function render(filter='all'){
    const shown=filter==='all'?products:products.filter(p=>p.slug===filter||p.label.toLowerCase().includes(filter));
    grid.innerHTML=shown.map(p=>`<a class="pro-card" href="professional-product.html?product=${encodeURIComponent(p.slug)}"><div class="pro-packstage">${sprite(p)}</div><div class="pro-card-copy"><small>${p.label}</small><h2>${p.name}</h2><p>${p.card}</p><span class="pro-card-link">Otevřít odbornou sekci →</span></div></a>`).join('');
    applySprite();
  }

  filters.forEach(btn=>btn.addEventListener('click',()=>{
    filters.forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active');
    render(btn.dataset.proFilter||'all');
  }));

  render();
})();
