(() => {
  const previewEnabled = new URLSearchParams(window.location.search).get("reviews-preview") === "1";
  const section = document.querySelector("[data-reviews-section]");
  if (!previewEnabled || !section || !window.ImmunaliaReviewsData) return;

  const language = document.documentElement.lang === "en" ? "en" : "cs";
  const reviews = window.ImmunaliaReviewsData[language] || [];
  const grid = section.querySelector("[data-reviews-grid]");
  const count = section.querySelector("[data-reviews-count]");
  const labels = language === "en"
    ? { more: "View product", reviews: "preview reviews" }
    : { more: "Zobrazit produkt", reviews: "náhledových recenzí" };

  if (!grid || reviews.length === 0) return;

  const createElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const fragment = document.createDocumentFragment();
  reviews.forEach((review) => {
    const card = createElement("article", "review-card");
    card.dataset.product = review.productId;
    card.dataset.reviewStatus = review.draft ? "draft" : "live";

    const top = createElement("div", "review-card-top");
    top.append(createElement("span", "review-product", review.product));
    const rating = createElement("span", "review-stars", "★".repeat(review.rating));
    rating.setAttribute("aria-label", `${review.rating} / 5`);
    top.append(rating);

    const quote = createElement("blockquote", "review-quote", review.quote);
    const footer = createElement("footer", "review-author");
    const identity = createElement("div", "review-identity");
    identity.append(createElement("strong", "", review.author));
    identity.append(createElement("span", "", review.location));
    footer.append(identity);

    const link = createElement("a", "review-link", labels.more);
    link.href = `${language === "en" ? "produkty-en.html" : "produkty.html"}#${review.productId}`;
    footer.append(link);
    card.append(top, quote, footer);
    fragment.append(card);
  });

  grid.replaceChildren(fragment);
  if (count) count.textContent = `${reviews.length} ${labels.reviews}`;
  section.hidden = false;

  document.querySelectorAll(".language-switch a").forEach((link) => {
    const url = new URL(link.href, window.location.href);
    url.searchParams.set("reviews-preview", "1");
    link.href = url.pathname.split("/").pop() + url.search;
  });
})();
