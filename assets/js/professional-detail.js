(function(){
  const params=new URLSearchParams(location.search);
  const slug=params.get('product')||'dental';
  const products=window.IMMUNALIA_PRO_PRODUCTS||[];
  const product=products.find(p=>p.slug===slug)||products[0];
  const root=document.querySelector('[data-pro-detail]');
  if(!root||!product)return;

  if(!document.getElementById('pro-sprite-style')){
    const style=document.createElement('style');
    style.id='pro-sprite-style';
    style.textContent=`
      .pro-sprite{
        width:min(100%,360px);
        aspect-ratio:4/5;
        background-repeat:no-repeat;
        background-size:500% 300%;
        background-position:var(--pro-x) var(--pro-y);
        border-radius:8px;
        background-color:#f7f7f5;
      }
      @media(max-width:560px){.pro-sprite{width:min(100%,320px)}}
    `;
    document.head.appendChild(style);
  }

  const i=Math.max(0,products.indexOf(product));
  const x=(i%5)*25;
  const y=Math.floor(i/5)*50;
  document.title=`${product.name} | Immunalia Professional`;
  root.innerHTML=`
    <section class="pro-detail-hero">
      <div class="pro-detail-stage"><div class="pro-sprite" data-pro-sprite style="--pro-x:${x}%;--pro-y:${y}%" role="img" aria-label="${product.name}"></div></div>
      <div class="pro-detail-copy"><span class="label">${product.label}</span><h1>${product.name}</h1><p class="lead">${product.lead}</p><div class="pro-actions"><a class="pro-btn primary" href="professional-contact.html?product=${encodeURIComponent(product.slug)}">Najít zapojené pracoviště</a><a class="pro-btn secondary" href="professional.html">Zpět na přehled</a></div><div class="pro-disclaimer">Doplněk stravy. Produkt nenahrazuje diagnostiku, předepsanou léčbu ani pravidelné kontroly u lékaře. Konkrétní způsob použití a vhodnost zařazení posuzuje zapojený specialista.</div></div>
    </section>
    <section class="pro-detail-panels">
      <article class="pro-panel"><h2>Odborné zaměření</h2><ul>${product.areas.map(a=>`<li>${a}</li>`).join('')}</ul></article>
      <aside class="pro-panel"><h2>Pro koho je linie určena</h2><p>${product.specialists}</p><p><strong>Dostupnost:</strong> pouze prostřednictvím zapojených odborných pracovišť.</p></aside>
    </section>`;

  const sprite=root.querySelector('[data-pro-sprite]');
  if(sprite&&window.IMMUNALIA_PRO_SPRITE){
    sprite.style.backgroundImage=`url("${window.IMMUNALIA_PRO_SPRITE}")`;
  }
})();
