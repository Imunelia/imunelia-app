(() => {
  const storageKey = "immunalia-home-design";
  const options = Array.from(document.querySelectorAll("[data-design-option]"));
  const supportedDesigns = new Set(options.map((option) => option.dataset.designOption));

  if (!options.length) return;

  const setDesign = (design) => {
    const selected = supportedDesigns.has(design) ? design : "classic";
    document.body.dataset.homeDesign = selected;
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

  setDesign(savedDesign);
  options.forEach((option) => {
    option.addEventListener("click", () => setDesign(option.dataset.designOption));
  });
})();
