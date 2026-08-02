(function(){
  const params=new URLSearchParams(location.search);
  const slug=params.get('product')||'dental';
  const product=(window.IMMUNALIA_PRO_PRODUCTS||[]).find(p=>p.slug===slug)||window.IMMUNALIA_PRO_PRODUCTS?.[0];
  const root=document.querySelector('[data-pro-detail]');
  if(!root||!product)return;
  document.title=`${product.name} | Immunalia Professional`;
  const title=product.name.replace(' Professional','<br>Professional').replace(' Recover','<br>Recover').replace(' Repair','<br>Repair');
  root.innerHTML=`
    <section class="pro-detail-hero">
      <div class="pro-detail-stage"><div class="pro-box" aria-hidden="true"><div class="pro-box-side">Immunalia</div><div class="pro-box-brand">Immunalia</div><div class="pro-box-biotech">BIOTECH</div><div class="pro-box-prof">PROFESSIONAL</div><div class="pro-box-main"><div><div class="pro-box-title">${title}</div><div class="pro-box-copy">Professional support<br>for comfort &amp; recovery</div></div><div class="pro-box-icon">${product.icon}</div></div><div class="pro-box-count">10</div></div></div>
      <div class="pro-detail-copy"><span class="label">${product.label}</span><h1>${product.name}</h1><p class="lead">${product.lead}</p><div class="pro-actions"><a class="pro-btn primary" href="professional-contact.html?product=${encodeURIComponent(product.slug)}">Najít zapojené pracoviště</a><a class="pro-btn secondary" href="professional.html">Zpět na přehled</a></div><div class="pro-disclaimer">Doplněk stravy. Produkt nenahrazuje diagnostiku, předepsanou léčbu ani pravidelné kontroly u lékaře. Konkrétní způsob použití a vhodnost zařazení posuzuje zapojený specialista.</div></div>
    </section>
    <section class="pro-detail-panels">
      <article class="pro-panel"><h2>Odborné zaměření</h2><ul>${product.areas.map(a=>`<li>${a}</li>`).join('')}</ul></article>
      <aside class="pro-panel"><h2>Pro koho je linie určena</h2><p>${product.specialists}</p><p><strong>Dostupnost:</strong> pouze prostřednictvím zapojených odborných pracovišť.</p></aside>
    </section>`;
})();
