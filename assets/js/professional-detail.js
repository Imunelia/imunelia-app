(function(){
  const params=new URLSearchParams(location.search);
  const slug=params.get('product')||'dental';
  const products=window.IMMUNALIA_PRO_PRODUCTS||[];
  const product=products.find(p=>p.slug===slug)||products[0];
  const root=document.querySelector('[data-pro-detail]');
  if(!root||!product)return;

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const list=(items=[])=>items.map(x=>`<li>${esc(x)}</li>`).join('');
  const clinicalGoal=product.subtitle||'Odborně vedený klinický program';
  const programName=product.name.replace(/ Professional$/,'').replace(/ Recover$/,' Recover');

  document.title=`${product.name} | Immunalia Professional`;

  root.innerHTML=`
    <section class="med-detail-hero">
      <div class="med-detail-copy">
        <p class="med-kicker">Immunalia Professional · ${esc(product.label)}</p>
        <h1>${esc(product.name)}</h1>
        <p class="med-detail-lead">${esc(product.lead)}</p>
        <div class="med-actions">
          <a class="med-btn primary" href="professional-login.html">Professional Access</a>
          <a class="med-btn secondary" href="professional-contact.html?product=${encodeURIComponent(product.slug)}">Kontakt pro odborníky</a>
        </div>
        <div class="med-status"><strong>Odborný režim:</strong> program není určen k volnému spotřebitelskému nákupu. Konkrétní formulace, příprava, výdej a použití se řídí skutečným právním a farmaceutickým režimem.</div>
      </div>
      <div class="med-detail-stage" aria-label="Balení Immunalia Professional">
        <div class="med-bottle">
          <div class="med-cap"></div>
          <div class="med-bottle-label">
            <div class="med-bird">⌁</div>
            <div class="med-bottle-brand">Immunalia</div>
            <div class="med-bottle-sub">BIOTECH</div>
            <div class="med-rule"></div>
            <div class="med-bottle-program">${esc(programName)}</div>
            <div class="med-bottle-type">PROFESSIONAL</div>
            <div class="med-bottle-count">10 sublingválních tablet</div>
          </div>
        </div>
      </div>
    </section>

    <section class="med-detail-grid">
      <article class="med-info-card accent"><p class="med-kicker">Klinická oblast</p><h2>${esc(clinicalGoal)}</h2><p>${esc(product.card||product.lead)}</p></article>
      <article class="med-info-card"><p class="med-kicker">Pro koho</p><h2>Odborné pracoviště</h2><p>${esc(product.specialists)}</p></article>
    </section>

    <section class="med-detail-section">
      <div class="section-head"><p class="med-kicker">Clinical focus</p><h2>Co v programu sledujeme</h2><p>Program je strukturován tak, aby oddělil subjektivní zkušenost pacienta od objektivních klinických a laboratorních parametrů. Výsledek se hodnotí v časové ose před / během / po programu.</p></div>
      <div class="med-focus-grid">${(product.areas||[]).map((a,i)=>`<article class="med-focus"><span>0${i+1}</span><h3>${esc(a)}</h3></article>`).join('')}</div>
    </section>

    <section class="med-detail-section med-dark">
      <div class="section-head"><p class="med-kicker">Science</p><h2>Mechanismus je předmětem ověřování</h2><p>Professional vychází z výzkumného konceptu transmukózní enzymatické signalizace. Web záměrně rozlišuje biologickou hypotézu, jednotlivá pozorování a účinek potvrzený klinickým hodnocením. U konkrétní diagnózy se léčebný účinek nepovažuje za prokázaný, pokud pro něj nejsou odpovídající klinická data.</p></div>
      <div class="med-science-grid">
        <article><strong>01</strong><h3>Transmukózní podání</h3><p>Sledování biologické odpovědi po sublingválním podání v definované lékové/formulační formě.</p></article>
        <article><strong>02</strong><h3>Signalizační odpověď</h3><p>Výzkumný rámec pracuje s proteázovou signalizací, zánětlivými drahami a změnami vybraných biomarkerů.</p></article>
        <article><strong>03</strong><h3>Klinická korelace</h3><p>Biomarker nebo subjektivní změna není automaticky klinickým benefitem; musí být korelována s předem definovaným výsledkem.</p></article>
      </div>
    </section>

    <section class="med-detail-section">
      <div class="section-head"><p class="med-kicker">Protocol</p><h2>Standardní Professional workflow</h2></div>
      <div class="med-workflow">
        <article><b>1 · Vstup</b><p>Diagnóza, výchozí stav, souběžná léčba a definice sledovaných parametrů.</p></article>
        <article><b>2 · Příprava</b><p>Odborná specifikace formulace a příprava/výdej v odpovídajícím farmaceutickém režimu.</p></article>
        <article><b>3 · Aplikace</b><p>Standardizovaný způsob podání a dokumentace adherence, tolerance a časového průběhu.</p></article>
        <article><b>4 · Follow-up</b><p>Kontrolní klinické, laboratorní nebo zobrazovací parametry podle konkrétního programu.</p></article>
      </div>
    </section>

    <section class="med-detail-section med-evidence">
      <div class="section-head"><p class="med-kicker">Evidence</p><h2>Co je data a co je hypotéza</h2><p>Professional dokumentace rozlišuje kazuistická pozorování, objektivně měřené biomarkery a výsledky prospektivního klinického ověřování. Smyslem platformy je převádět jednotlivé zkušenosti do standardizovaných dat, nikoli je prezentovat jako hotový důkaz účinnosti.</p></div>
      <div class="med-evidence-row"><span>Kazuistiky</span><span>Biomarkery</span><span>Objektivní klinické parametry</span><span>Prospektivní ověřování</span></div>
    </section>
  `;

  if(product.flowProtocol){
    const fp=product.flowProtocol;
    root.insertAdjacentHTML('beforeend',`
      <section class="med-detail-section med-flow" aria-labelledby="flow-title">
        <div class="section-head"><p class="med-kicker">Flow Professional</p><h2 id="flow-title">Biomarkery a reprodukční výsledky</h2><p>U Flow programu jsou biologická, histologická a reprodukční odpověď hodnoceny odděleně.</p></div>
        <div class="med-flow-grid">
          <article class="med-info-card"><h3>Vstupní vyšetření</h3><ul>${list(fp.baseline)}</ul></article>
          <article class="med-info-card"><h3>Interpretace</h3><div class="med-outcomes">${fp.evaluation.map(e=>`<div><strong>${esc(e.title)}</strong><p>${esc(e.text)}</p></div>`).join('')}</div></article>
        </div>
        <div class="med-marker-wrap"><table class="med-marker-table"><thead><tr><th>Marker</th><th>Role</th><th>Interpretace</th></tr></thead><tbody>${fp.biomarkers.map(m=>`<tr><td><strong>${esc(m.name)}</strong></td><td>${esc(m.role)}</td><td>${esc(m.note)}</td></tr>`).join('')}</tbody></table></div>
        <div class="med-note"><strong>Důležité:</strong> ${esc(fp.note)}</div>
      </section>`);
  }

  root.insertAdjacentHTML('beforeend',`
    <section class="med-prof-access">
      <div><p class="med-kicker">For professionals</p><h2>Kompletní protokol je v Professional zóně.</h2><p>Odborná dokumentace, specifikace, postup přípravy, formuláře pro vstupní a kontrolní hodnocení a datové moduly jsou určeny zapojeným lékařům a lékárníkům.</p></div>
      <div class="med-actions"><a class="med-btn primary" href="professional-login.html">Vstoupit do Professional Access</a><a class="med-btn secondary" href="professional-partner.html">Zapojit pracoviště</a></div>
    </section>
    <section class="legal">Informace na této stránce popisují odborný a výzkumný rámec. Nejde o veřejnou reklamu na individuálně připravovaný léčivý přípravek ani o příslib léčebného účinku. Konkrétní použití musí odpovídat právní klasifikaci, odbornému posouzení a dokumentaci daného programu.</section>
  `);
})();
