# Immunalia Biotech

Statický web značky Immunalia Biotech publikovaný přes GitHub Pages.

## Web

Po zapnutí GitHub Pages pro větev `main` bude web dostupný na:

https://imunelia.github.io/imunelia-app/

Veřejná část webu je postavená kolem hlavní produktové linie Immunalia Balance. Odborné a datové nástroje jsou oddělené od hlavní zákaznické navigace.

## Stránky

- `index.html` - veřejný úvod značky a Immunalia Balance
- `balance.html` - hlavní landing page produktové linie Balance
- `produkty.html` - produktová architektura Immunalia
- `veda.html` - veřejné vysvětlení vědy a biologických signálů
- `o-znacce.html` - příběh, jazyk a principy značky
- `kontakt.html` - kontaktní stránka a mailto workflow
- `odborna-sekce.html` - oddělený vstup do odborné/demo části
- `il-8.html` - pouze bezpečný demo panel se syntetickými daty

## Pravidla pro data a soukromí

Reálná laboratorní, pacientská, zdravotní, diagnostická, identifikační ani pseudonymizovaná data se nikdy nesmí commitovat do veřejného repozitáře ani publikovat přes GitHub Pages.

Soubor `assets/pl-odbery-vysledky.json` je z veřejného buildu odstraněn a je uvedený v `.gitignore`. Pro ukázky se smí používat pouze syntetická demo data bez jmen, diagnóz, roků narození, souhlasů, poznámek, reálných laboratorních hodnot nebo jiných reidentifikovatelných údajů.

Pokud byl původní soubor s reálnými daty někdy commitnutý do historie repozitáře, je nutné mimo tento commit vyčistit historii pomocí BFG Repo-Cleaner nebo `git filter-repo`, zneplatnit případné cache a znovu publikovat GitHub Pages.

## Komunikační pravidla

Veřejná produktová komunikace Immunalia nepoužívá léčebné sliby, diagnózy ani tvrzení o konkrétních účincích na laboratorní hodnoty. Preferovaný jazyk: rovnováha, rytmus, dlouhodobost, kontext, kvalita, regenerace, každodenní péče, biologické signály a odborná střídmost.
