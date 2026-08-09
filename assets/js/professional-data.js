window.IMMUNALIA_PRO_PRODUCTS = [
  {
    slug:'dental', name:'Dental Recover', label:'Stomatologie', icon:'◯',
    subtitle:'Podpůrná linie pro stomatologickou praxi',
    card:'Profesionální podpora pro stomatologické výkony, následný komfort a odborně vedenou rekonvalescenci.',
    lead:'Dental Recover je produktová linie určená pro spolupráci se stomatology a dentálními pracovišti. Je dostupná pouze prostřednictvím zapojených specialistů.',
    areas:['komfort po stomatologickém výkonu','odborně vedený režim po extrakci nebo implantaci','sledování citlivosti, otoku a návratu k běžné aktivitě'],
    specialists:'Stomatologové, dentální chirurgové a implantologická pracoviště.'
  },
  {
    slug:'postop', name:'Post‑Op Recover', label:'Chirurgie · Urologie · Dermatologie', icon:'✚',
    subtitle:'Podpůrná linie pro období po zákroku',
    card:'Profesionální podpora pooperačního komfortu, regenerace a návratu k běžné aktivitě.',
    lead:'Post‑Op Recover je určena pro odborně vedený podpůrný režim po ambulantních a operačních výkonech.',
    areas:['pooperační komfort','sledování otoku a citlivosti','návrat k běžné aktivitě'],
    specialists:'Chirurgové, urologové, dermatologové a další ambulantní specialisté.'
  },
  {
    slug:'flow', name:'Flow Professional', label:'Gynekologie · Reprodukční medicína', icon:'◇',
    subtitle:'Odborně vedené sledování zánětlivého prostředí endometria',
    card:'Professional protokol pro objektivní sledování změn zánětlivého prostředí endometria, histologického nálezu a následných reprodukčních výsledků.',
    lead:'Flow Professional je odborný program pro gynekology a pracoviště reprodukční medicíny zaměřený na standardizované sledování zánětlivého prostředí endometria. Program odděluje biologickou a histologickou odpověď od skutečného reprodukčního výsledku.',
    areas:['chronické zánětlivé prostředí endometria','standardizované vyhodnocení před a po programu','sledování histologické a cytokinové odpovědi','návazné sledování implantace, těhotenství a živě narozeného dítěte'],
    specialists:'Gynekologové, centra reprodukční medicíny a další specializovaná ambulantní pracoviště.',
    flowProtocol:{
      baseline:[
        'Biopsie endometria se standardním histopatologickým vyhodnocením.',
        'CD138: kvantifikace CD138+ plazmatických buněk v endometriu.',
        'MUM1 / IRF4: doplňkový marker plazmatických buněk.',
        'IL‑8 (CXCL8), IL‑10 a IL‑6; podle protokolu doplnit TNF‑α a hs‑CRP.',
        'Zaznamenat fázi menstruačního cyklu, klinický stav a relevantní souběžnou léčbu.'
      ],
      biomarkers:[
        {name:'CD138', role:'Primární histologický marker', note:'Hodnotí se imunohistochemicky ve vzorku endometria, nikoli z krve.'},
        {name:'MUM1 / IRF4', role:'Doplňkový histologický marker', note:'Doplňuje identifikaci plazmatických buněk a interpretaci CD138.'},
        {name:'IL‑8 / CXCL8', role:'Prozánětlivá a chemotaktická aktivita', note:'Sledovat změnu proti výchozí hodnotě; systémové a lokální hodnoty interpretovat odděleně.'},
        {name:'IL‑10', role:'Regulační / protizánětlivá odpověď', note:'Hodnotit v kontextu ostatních cytokinů, nikoli izolovaně.'},
        {name:'IL‑6', role:'Zánětlivá aktivita', note:'Doplňkový marker dynamiky zánětlivé odpovědi.'},
        {name:'hs‑CRP', role:'Systémový zánět', note:'Doplňkový a nespecifický marker; sám neprokazuje stav endometria.'}
      ],
      evaluation:[
        {title:'Biologická odpověď', text:'Změna cytokinového profilu proti výchozím hodnotám bez automatického závěru o fertilitě.'},
        {title:'Histologická odpověď', text:'Kvantitativní pokles nebo vymizení CD138+ plazmatických buněk při kontrolní biopsii, interpretované společně s histologií a MUM1 / IRF4.'},
        {title:'Kompletní sledovaná odpověď', text:'Příznivá změna histologického nálezu společně se změnou zánětlivého profilu.'},
        {title:'Reprodukční výsledek', text:'Samostatně zaznamenat implantaci, biochemické a klinické těhotenství, pokračující těhotenství, ztrátu těhotenství a živě narozené dítě.'}
      ],
      note:'Biologická nebo histologická odpověď sama o sobě neprokazuje zvýšení fertility. Účinek na chronickou endometritidu, pravděpodobnost otěhotnění nebo živě narozené dítě musí být potvrzen odpovídajícím klinickým hodnocením.'
    }
  },
  {
    slug:'skin', name:'Skin Professional', label:'Dermatologie · Estetická medicína', icon:'◌',
    subtitle:'Podpůrná linie pro problematickou pleť',
    card:'Profesionální balení pro dermatology a ambulantní specialisty se zaměřením na režim péče o problematickou pleť.',
    lead:'Skin Professional je dostupná prostřednictvím dermatologů a dalších zapojených specialistů.',
    areas:['režim péče o problematickou pleť','sledování kožního komfortu','návazná odborná konzultace'],
    specialists:'Dermatologové a pracoviště estetické medicíny.'
  },
  {
    slug:'procto', name:'Procto Professional', label:'Proktologie · Chirurgie', icon:'◎',
    subtitle:'Podpůrná linie pro proktologickou praxi',
    card:'Profesionální podpora lokálního komfortu a odborně vedené péče v proktologické praxi.',
    lead:'Procto Professional je dostupná prostřednictvím proktologů, chirurgů a zapojených odborných pracovišť.',
    areas:['lokální komfort','režim po ambulantním výkonu','sledování citlivosti a průběhu obtíží'],
    specialists:'Proktologové, chirurgové a gastroenterologové.'
  },
  {
    slug:'gastro', name:'Gastro Professional', label:'Gastroenterologie · Interna', icon:'≋',
    subtitle:'Podpůrná linie pro střevní komfort',
    card:'Profesionální podpora střevního komfortu, tolerance a odborně vedeného gastroenterologického režimu.',
    lead:'Gastro Professional je určena pro gastroenterology, internisty a další zapojené specialisty.',
    areas:['střevní komfort','sledování tolerance a subjektivních obtíží','návaznost na standardní odbornou péči'],
    specialists:'Gastroenterologové, internisté a praktičtí lékaři v návaznosti na odborné vyšetření.'
  },
  {
    slug:'postrad', name:'Post‑Rad Professional', label:'Onkologie · Radioterapie', icon:'✧',
    subtitle:'Podpůrná linie pro období po ozáření',
    card:'Profesionální podpůrný režim zaměřený na komfort a rekonvalescenci během a po radioterapii.',
    lead:'Post‑Rad Professional je určena pouze pro použití v návaznosti na doporučení ošetřujícího onkologického týmu.',
    areas:['celkový komfort','komfort sliznic a pokožky','rekonvalescence po léčebné zátěži'],
    specialists:'Radiační onkologové, kliničtí onkologové a týmy podpůrné péče.'
  },
  {
    slug:'retina', name:'Retina Professional', label:'Oftalmologie', icon:'◉',
    subtitle:'Podpůrná linie pro dlouhodobou péči o sítnici',
    card:'Profesionální podpora zrakového komfortu a odborně vedeného režimu u dlouhodobě sledovaných pacientů.',
    lead:'Retina Professional je dostupná prostřednictvím oftalmologů a specializovaných sítnicových ambulancí.',
    areas:['zrakový komfort','dlouhodobé odborné sledování','návaznost na standardní oftalmologickou léčbu'],
    specialists:'Oftalmologové a centra intravitreální léčby.'
  },
  {
    slug:'migra', name:'Migra Professional', label:'Neurologie · Ambulance bolesti', icon:'⌁',
    subtitle:'Podpůrná linie pro migrenózní komfort',
    card:'Profesionální podpora při odborně vedeném režimu pacientů s migrenózními a bolestivými epizodami.',
    lead:'Migra Professional je určena pro spolupráci s neurology a centry pro léčbu bolestí hlavy.',
    areas:['subjektivní komfort během epizody','sledování průběhu obtíží','návrat k běžné aktivitě'],
    specialists:'Neurologové, centra pro léčbu bolestí hlavy a ambulance bolesti.'
  },
  {
    slug:'rheuma', name:'Rheuma Professional', label:'Revmatologie · Interna', icon:'⌘',
    subtitle:'Podpůrná linie pro kloubní komfort a mobilitu',
    card:'Profesionální podpora kloubního komfortu, pohybové funkce a dlouhodobého odborného režimu.',
    lead:'Rheuma Professional je určena pro spolupráci s revmatology a dalšími odbornými pracovišti.',
    areas:['kloubní komfort','ranní ztuhlost a mobilita','dlouhodobé odborné sledování'],
    specialists:'Revmatologové, internisté a rehabilitační lékaři.'
  },
  {
    slug:'ortho', name:'Ortho Recover', label:'Ortopedie · Rehabilitace', icon:'⌇',
    subtitle:'Podpůrná linie pro klouby, šlachy a úpony',
    card:'Profesionální podpora pohybového komfortu, úponů, šlach a regenerace po mechanické zátěži.',
    lead:'Ortho Recover je určena pro ortopedy, rehabilitační lékaře a sportovní ambulance.',
    areas:['kloubní a úponový komfort','mobilita','regenerace po zátěži'],
    specialists:'Ortopedové, rehabilitační lékaři, fyzioterapeutická a sportovní pracoviště.'
  },
  {
    slug:'uro', name:'Uro Professional', label:'Urologie', icon:'⋈',
    subtitle:'Podpůrná linie pro urologický komfort',
    card:'Profesionální podpora urologického komfortu, ambulantních výkonů a následné rekonvalescence.',
    lead:'Uro Professional je dostupná prostřednictvím zapojených urologických pracovišť.',
    areas:['urologický komfort','režim po ambulantním výkonu','návrat k běžné aktivitě'],
    specialists:'Urologové a specializované ambulantní týmy.'
  },
  {
    slug:'tissue', name:'Tissue Repair Professional', label:'Chirurgie · Podiatrie · Dermatologie', icon:'╱',
    subtitle:'Podpůrná linie pro regeneraci měkkých tkání',
    card:'Profesionální podpora tkáňového komfortu a odborně vedeného režimu po drobných výkonech.',
    lead:'Tissue Repair Professional je určena pro odborně vedený režim v chirurgii, podiatrii a dermatologii.',
    areas:['tkáňový komfort','regenerace po drobném výkonu','odborné sledování průběhu hojení'],
    specialists:'Chirurgové, podiatři, dermatologové a ambulance hojení ran.'
  },
  {
    slug:'sport', name:'Sport Recover', label:'Sportovní medicína · Fyzioterapie', icon:'↗',
    subtitle:'Podpůrná linie pro zátěž a regeneraci',
    card:'Profesionální podpora fyzické zátěže, svalového komfortu a následné regenerace.',
    lead:'Sport Recover je určena pro sportovní lékaře, fyzioterapeuty a výkonnostní centra.',
    areas:['regenerace po fyzické zátěži','svalový komfort','návrat k tréninku'],
    specialists:'Sportovní lékaři, fyzioterapeuti a specializovaná sportovní pracoviště.'
  },
  {
    slug:'pulmo', name:'Pulmo Professional', label:'Pneumologie · Alergologie · Interna', icon:'⋔',
    subtitle:'Podpůrná linie pro dechový komfort',
    card:'Profesionální podpora dechového komfortu, tolerance zátěže a následné rekonvalescence.',
    lead:'Pulmo Professional je dostupná prostřednictvím pneumologů, alergologů a zapojených interních pracovišť.',
    areas:['dechový komfort','tolerance běžné zátěže','rekonvalescence po respiračním onemocnění'],
    specialists:'Pneumologové, alergologové, internisté a respirační rehabilitace.'
  }
];
