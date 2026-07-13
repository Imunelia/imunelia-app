(() => {
  const storageKey = "immunalia-home-design";
  const options = Array.from(document.querySelectorAll("[data-design-option]"));
  const supportedDesigns = new Set(options.map((option) => option.dataset.designOption));
  const standardHome = document.querySelector("[data-standard-home]");
  const zymogenHome = document.querySelector("[data-zymogen-home]");
  const standardFooter = document.querySelector("[data-standard-footer]");
  const navigationLinks = Array.from(document.querySelectorAll(".site-header .nav a"));
  const headerCta = document.querySelector(".site-header .header-cta");
  const language = document.documentElement.lang === "en" ? "en" : "cs";
  const originalNavigation = navigationLinks.map((link) => ({
    link,
    href: link.getAttribute("href"),
    text: link.textContent,
    hidden: link.hidden
  }));
  const originalHeaderCta = headerCta ? { href: headerCta.getAttribute("href"), text: headerCta.textContent } : null;

  if (!options.length) return;

  const setDesign = (design) => {
    const selected = supportedDesigns.has(design) ? design : "classic";
    const isZymogen = selected === "zymogen";
    document.body.dataset.homeDesign = selected;
    if (standardHome) standardHome.hidden = isZymogen;
    if (zymogenHome) zymogenHome.hidden = !isZymogen;
    if (standardFooter) standardFooter.hidden = isZymogen;

    originalNavigation.forEach(({ link, href, text, hidden }) => {
      link.setAttribute("href", href);
      link.textContent = text;
      link.hidden = hidden;
    });

    if (isZymogen && navigationLinks.length >= 5) {
      navigationLinks[0].hidden = true;
      navigationLinks[1].textContent = language === "en" ? "Products" : "Produkty";
      navigationLinks[2].textContent = "FAQ";
      navigationLinks[2].setAttribute("href", "#zymogen-faq");
      navigationLinks[3].textContent = language === "en" ? "About" : "O nás";
      navigationLinks[3].setAttribute("href", "#zymogen-about");
      navigationLinks[4].textContent = language === "en" ? "Contact" : "Kontakt";
    }

    if (headerCta && originalHeaderCta) {
      headerCta.textContent = isZymogen ? (language === "en" ? "Shop" : "Nakoupit") : originalHeaderCta.text;
      headerCta.setAttribute("href", isZymogen ? (language === "en" ? "produkty-en.html" : "produkty.html") : originalHeaderCta.href);
    }

    options.forEach((option) => {
      const active = option.dataset.designOption === selected;
      option.classList.toggle("is-active", active);
      option.setAttribute("aria-pressed", String(active));
    });
    try {
      window.localStorage.setItem(storageKey, selected);
    } catch (_) {
      // The preview remains usable when browser storage is unavailable.
    }
  };

  let savedDesign = "classic";
  try {
    savedDesign = window.localStorage.getItem(storageKey) || savedDesign;
  } catch (_) {
    // Use the default preview when browser storage is unavailable.
  }

  const requestedDesign = new URLSearchParams(window.location.search).get("design") || window.location.hash.slice(1);
  if (supportedDesigns.has(requestedDesign)) savedDesign = requestedDesign;

  setDesign(savedDesign);
  options.forEach((option) => {
    option.addEventListener("click", () => setDesign(option.dataset.designOption));
  });
})();
