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
      .pro-sprite{width:min(100%,360px);aspect-ratio:4/5;background-repeat:no-repeat;background-size:500% 300%;background-position:var(--pro-x) var(--pro-y);border-radius:8px;background-color:#f7f7f5}
      .flow-protocol{max-width:1240px;margin:0 auto;padding:20px 24px 72px}.flow-protocol h2{margin-top:0}.flow-protocol-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin:22px 0}.flow-protocol-card{background:#fff;border:1px solid rgba(23,51,45,.12);border-radius:18px;padding:26px}.flow-protocol-card h3{margin:0 0 14px}.flow-protocol-card ul{margin:0;padding-left:20px}.flow-protocol-card li+li{margin-top:9px}.flow-marker-table{width:100%;border-collapse:collapse;margin-top:18px;background:#fff;border-radius:18px;overflow:hidden}.flow-marker-table th,.flow-marker-table td{text-align:left;vertical-align:top;padding:15px 16px;border-bottom:1px solid rgba(23,51,45,.1)}.flow-marker-table th{font-size:12px;letter-spacing:.08em;text-transform:uppercase}.flow-eval{margin-top:26px;background:#f4f0e8;border-radius:20px;padding:28px}.flow-eval-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.flow-eval-field{display:flex;flex-direction:column;gap:7px}.flow-eval-field label{font-size:13px;font-weight:700}.flow-eval-field input{width:100%;box-sizing:border-box;padding:12px 13px;border:1px solid rgba(23,51,45,.22);border-radius:10px;background:#fff;font:inherit}.flow-eval-results{margin-top:18px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.flow-result{background:#fff;border-radius:12px;padding:15px}.flow-result strong{display:block;margin-bottom:5px}.flow-result span{font-size:14px}.flow-note{margin-top:22px;padding:18px 20px;border-left:4px solid #17332d;background:#fff;line-height:1.6}.flow-section-label{margin:34px 0 8px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700}.flow-outcomes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:16px}.flow-outcome{background:#fff;border:1px solid rgba(23,51,45,.12);border-radius:14px;padding:18px}.flow-outcome h3{margin:0 0 8px;font-size:18px}.flow-outcome p{margin:0;line-height:1.55}
      @media(max-width:760px){.flow-protocol-grid,.flow-eval-grid,.flow-eval-results,.flow-outcomes{grid-template-columns:1fr}.flow-marker-table{display:block;overflow-x:auto}.flow-protocol{padding-left:18px;padding-right:18px}}
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
      <div class="pro-detail-copy"><span class="label">${product.label}</span><h1>${product.name}</h1><p class="lead">${product.lead}</p><div class="pro-actions"><a class="pro-btn primary" href="professional-contact.html?product=${encodeURIComponent(product.slug)}">Najít zapojené pracoviště</a><a class="pro-btn secondary" href="professional.html">Zpět na přehled</a></div><div class="pro-disclaimer">Professional program nenahrazuje diagnostiku, standardní léčbu ani pravidelné kontroly u lékaře. Konkrétní způsob použití a vhodnost zařazení posuzuje zapojený specialista.</div></div>
    </section>
    <section class="pro-detail-panels">
      <article class="pro-panel"><h2>Odborné zaměření</h2><ul>${product.areas.map(a=>`<li>${a}</li>`).join('')}</ul></article>
      <aside class="pro-panel"><h2>Pro koho je linie určena</h2><p>${product.specialists}</p><p><strong>Dostupnost:</strong> pouze prostřednictvím zapojených odborných pracovišť.</p></aside>
    </section>`;

  if(product.flowProtocol){
    const fp=product.flowProtocol;
    root.insertAdjacentHTML('beforeend',`
      <section class="flow-protocol" aria-labelledby="flow-protocol-title">
        <p class="flow-section-label">Professional protocol</p>
        <h2 id="flow-protocol-title">Základní instrukce a vyhodnocení</h2>
        <p>Cílem je porovnávat stav před zařazením do programu a při kontrolním vyšetření ve standardizovaném intervalu. Lokální nález endometria a systémové krevní markery se hodnotí odděleně.</p>

        <div class="flow-protocol-grid">
          <article class="flow-protocol-card">
            <h3>Před zahájením</h3>
            <ul>${fp.baseline.map(item=>`<li>${item}</li>`).join('')}</ul>
          </article>
          <article class="flow-protocol-card">
            <h3>Kontrolní vyšetření</h3>
            <ul>
              <li>Kontrolu provést podle odborného protokolu a pokud možno ve srovnatelné fázi menstruačního cyklu.</li>
              <li>Opakovat stejné laboratorní a histologické parametry jako při vstupu.</li>
              <li>Zaznamenat souběžnou léčbu a jiné faktory, které mohou ovlivnit zánětlivé markery.</li>
              <li>Reprodukční výsledek hodnotit samostatně od biologické a histologické odpovědi.</li>
            </ul>
          </article>
        </div>

        <p class="flow-section-label">Sledované markery</p>
        <table class="flow-marker-table">
          <thead><tr><th>Marker</th><th>Role</th><th>Interpretace</th></tr></thead>
          <tbody>${fp.biomarkers.map(m=>`<tr><td><strong>${m.name}</strong></td><td>${m.role}</td><td>${m.note}</td></tr>`).join('')}</tbody>
        </table>

        <div class="flow-eval" data-flow-eval>
          <h2>Rychlé vyhodnocení změny</h2>
          <p>Zadejte výchozí a kontrolní hodnoty. Výpočet ukazuje pouze procentní změnu laboratorní hodnoty; nejde o diagnostický ani léčebný závěr.</p>
          <div class="flow-eval-grid">
            ${['IL‑8','IL‑10','IL‑6'].map((name,idx)=>`
              <div class="flow-eval-field"><label for="flow-before-${idx}">${name} · před</label><input id="flow-before-${idx}" inputmode="decimal" data-before="${idx}" placeholder="hodnota"></div>
              <div class="flow-eval-field"><label for="flow-after-${idx}">${name} · po</label><input id="flow-after-${idx}" inputmode="decimal" data-after="${idx}" placeholder="hodnota"></div>
              <div class="flow-result"><strong>${name}</strong><span data-change="${idx}">Zadejte obě hodnoty</span></div>
            `).join('')}
          </div>
          <div class="flow-eval-results">
            <div class="flow-result"><strong>CD138 před</strong><span><input aria-label="CD138 před" inputmode="decimal" data-cd138-before placeholder="počet / HPF nebo dle laboratoře"></span></div>
            <div class="flow-result"><strong>CD138 po</strong><span><input aria-label="CD138 po" inputmode="decimal" data-cd138-after placeholder="stejná metodika"></span></div>
            <div class="flow-result"><strong>Změna CD138</strong><span data-cd138-change>Zadejte obě hodnoty</span></div>
          </div>
        </div>

        <p class="flow-section-label">Interpretace výsledku</p>
        <div class="flow-outcomes">
          ${fp.evaluation.map(e=>`<article class="flow-outcome"><h3>${e.title}</h3><p>${e.text}</p></article>`).join('')}
        </div>

        <div class="flow-note"><strong>Důležité:</strong> ${fp.note}</div>
      </section>`);

    const normalize=value=>Number(String(value||'').trim().replace(',','.'));
    const percentChange=(before,after)=>before!==0&&Number.isFinite(before)&&Number.isFinite(after)?((after-before)/Math.abs(before))*100:null;
    const formatChange=value=>value===null?'Zadejte obě hodnoty':`${value>0?'+':''}${value.toFixed(1)} %`;
    const updateEval=()=>{
      [0,1,2].forEach(idx=>{
        const before=normalize(root.querySelector(`[data-before="${idx}"]`)?.value);
        const after=normalize(root.querySelector(`[data-after="${idx}"]`)?.value);
        const el=root.querySelector(`[data-change="${idx}"]`);
        if(el)el.textContent=formatChange(percentChange(before,after));
      });
      const before=normalize(root.querySelector('[data-cd138-before]')?.value);
      const after=normalize(root.querySelector('[data-cd138-after]')?.value);
      const el=root.querySelector('[data-cd138-change]');
      if(el)el.textContent=formatChange(percentChange(before,after));
    };
    root.querySelectorAll('[data-flow-eval] input').forEach(input=>input.addEventListener('input',updateEval));
  }

  const sprite=root.querySelector('[data-pro-sprite]');
  if(sprite&&window.IMMUNALIA_PRO_SPRITE){
    sprite.style.backgroundImage=`url("${window.IMMUNALIA_PRO_SPRITE}")`;
  }
})();
