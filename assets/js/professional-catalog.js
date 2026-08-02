(function(){
  const products=window.IMMUNALIA_PRO_PRODUCTS||[];
  const grid=document.querySelector('[data-pro-grid]');
  const filters=document.querySelectorAll('[data-pro-filter]');
  if(!grid)return;

  function packshot(p){
    const title=p.name.replace(' Professional','<br>Professional').replace(' Recover','<br>Recover').replace(' Repair','<br>Repair');
    return `<div class="pro-box" aria-hidden="true"><div class="pro-box-side">Immunalia</div><div class="pro-box-brand">Immunalia</div><div class="pro-box-biotech">BIOTECH</div><div class="pro-box-prof">PROFESSIONAL</div><div class="pro-box-main"><div><div class="pro-box-title">${title}</div><div class="pro-box-copy">Professional support<br>for comfort &amp; recovery</div></div><div class="pro-box-icon">${p.icon}</div></div><div class="pro-box-count">10</div></div>`;
  }

  function render(filter='all'){
    const shown=filter==='all'?products:products.filter(p=>p.slug===filter||p.label.toLowerCase().includes(filter));
    grid.innerHTML=shown.map(p=>`<a class="pro-card" href="professional-product.html?product=${encodeURIComponent(p.slug)}"><div class="pro-packstage">${packshot(p)}</div><div class="pro-card-copy"><small>${p.label}</small><h2>${p.name}</h2><p>${p.card}</p><span class="pro-card-link">Otevřít odbornou sekci →</span></div></a>`).join('');
  }

  filters.forEach(btn=>btn.addEventListener('click',()=>{
    filters.forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active');
    render(btn.dataset.proFilter||'all');
  }));

  render();
})();
